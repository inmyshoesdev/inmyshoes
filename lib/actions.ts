import { ActionSchema } from '../schema/actions'
import { Clickable, Dialogue, Image, Narration } from './elements'
import { Game } from './game'
import { ElementValues, KeyInSceneOf, Scene } from './scene'

// modify any property to have the changes persisted to the game state
// if called via the `executeActions` method of the store
export type ModifiableArgs = {
  scene: Scene // scene of the action
  game: Game
}

export type FinishAction = (({ scene, game }: ModifiableArgs) => void) | void

export function isCallable(
  finishAction: FinishAction
): finishAction is ({ scene, game }: { scene: Scene; game: Game }) => void {
  return finishAction instanceof Object
}

export type ActionArgs = {
  duration: number
  args: Record<string, any>
} & ModifiableArgs

export interface Action {
  name: string
  duration: number
  args: Record<string, any>
  sceneId: number
  execute: (args: ActionArgs) => FinishAction // like useEffect
}

export const makeAction = (
  schema: ActionSchema,
  sceneId: number
): Action | undefined => {
  const { type, duration, ...rest } = schema

  const action = DefinedActions[type]
  if (!action) {
    console.log(`no action matching type ${type}`)
    return undefined
  }

  return {
    name: schema.type,
    duration: schema.duration,
    args: rest,
    sceneId: sceneId,
    execute: action,
  }
}

// Add all actions here!
export const DefinedActions: Partial<
  Record<string, (args: ActionArgs) => FinishAction>
> = {
  gotoScene: ({ args, game }) => {
    const { sceneId } = args
    if (typeof sceneId === 'number') {
      game.currentSceneId = sceneId
    }
  },

  showNarration: show<Narration, 'narrations'>('narrations'),
  hideNarration: hide<Narration, 'narrations'>('narrations'),

  showDialogue: show<Dialogue, 'dialogues'>('dialogues'),
  hideDialogue: hide<Dialogue, 'dialogues'>('dialogues'),

  showImage: show<Image, 'images'>('images'),
  hideImage: hide<Image, 'images'>('images'),

  showClickable: show<Clickable, 'clickables'>('clickables'),
  hideClickable: hide<Clickable, 'clickables'>('clickables'),

  wait: () => {},
}

function show<T extends ElementValues, S extends KeyInSceneOf<T>>(
  elementKey: S
) {
  return ({ args, scene }: ActionArgs): FinishAction => {
    const { value, hideAfterShow, position } = args

    const element = scene.getElement<T>(value, elementKey)
    if (!element) {
      return
    }

    if (position) {
      element.position = position
    }
    element.shown = true

    if (hideAfterShow) {
      return ({ scene }) => {
        const element = scene.getElement<T>(value, elementKey)
        if (!element) {
          return
        }

        element.shown = false
      }
    }
  }
}

function hide<T extends ElementValues, S extends KeyInSceneOf<T>>(
  elementKey: S
) {
  return ({ args, scene }: ActionArgs): FinishAction => {
    const { value } = args

    const element = scene.getElement<T>(value, elementKey)
    if (element) {
      element.shown = false
    }
  }
}
