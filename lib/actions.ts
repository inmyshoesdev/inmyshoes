import { ActionSchema } from '../schema/actions'
import { Game } from './game'
import { ElementKeys, isElementKey, Scene } from './scene'

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
  afterInteractionCallback?: () => () => void
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

// names of const actions and arguments
export const waitForInteraction = 'waitForInteraction'
export const afterInteractionCallback = 'afterInteractionCallback'

// Add all actions here!
export const DefinedActions: Partial<
  Record<string, (args: ActionArgs) => FinishAction>
> = {
  // TODO: consider cancelling or not accepting any actions that come
  // after a gotoScene action, may lead to weird unforceed circumstances
  gotoScene: ({ args, game }) => {
    const { sceneId } = args
    if (typeof sceneId === 'number') {
      game.currentSceneId = sceneId
    }
  },

  showNarration: show('narrations'),
  hideNarration: hide('narrations'),

  showDialogue: show('dialogues'),
  hideDialogue: hide('dialogues'),

  showImage: show('images'),
  hideImage: hide('images'),

  showClickable: show('clickables'),
  hideClickable: hide('clickables'),

  wait: () => {},

  [waitForInteraction]: ({ args, scene, afterInteractionCallback }) => {
    const { elementType, value } = args

    if (typeof elementType !== 'string') {
      console.warn(
        `"type" argument in "waitForInteraction" action should be a string!`
      )
      return
    }

    // TODO: consider whether we should set any element that is currently
    // not shown to shown if it is the target of his action (otherwise,
    // users may not be able to interact with it)
    if (isElementKey(elementType)) {
      const elem = scene.getElement(value, elementType)
      if (!elem) {
        console.warn(`no ${elementType} called ${value}!`)
        return
      }

      elem.afterInteractionCallback = afterInteractionCallback
    }
  },
}

function show(elementKey: ElementKeys) {
  return ({ args, scene }: ActionArgs): FinishAction => {
    const { value, hideAfterShow, position } = args

    const element = scene.getElement(value, elementKey)
    if (!element) {
      console.warn(`no element called ${value}`)
      return
    }

    // if (position) {
    //   element.position = position
    // }
    element.shown = true

    if (hideAfterShow) {
      return ({ scene }) => {
        const element = scene.getElement(value, elementKey)
        if (!element) {
          console.warn(`no element called ${value}`)
          return
        }

        element.shown = false
      }
    }
  }
}

function hide(elementKey: ElementKeys) {
  return ({ args, scene }: ActionArgs): FinishAction => {
    const { value } = args

    const element = scene.getElement(value, elementKey)
    if (element) {
      element.shown = false
    } else {
      console.warn(`no element called ${value}`)
    }
  }
}
