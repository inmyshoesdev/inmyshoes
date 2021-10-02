import { ActionSchema } from '../schema/actions'
import { Clickable, Dialogue, Image, Narration } from './elements'
import { Game } from './game'
import { Scene } from './scene'

// modify any property to have the changes persisted to the game state
// if called via the `executeActions` method of the store
export type ModifyableArgs = {
  scene: Scene // scene of the action
  game: Game
}

export type FinishAction = (({ scene, game }: ModifyableArgs) => void) | void

export function isCallable(
  finishAction: FinishAction
): finishAction is ({ scene, game }: { scene: Scene; game: Game }) => void {
  return finishAction instanceof Object
}

export type ActionArgs = {
  duration: number
  args: Record<string, any>
} & ModifyableArgs

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

  showNarration: ({ args, scene }) => {
    const { value, hideAfterShow, position } = args

    const narration = scene.getElement<Narration>(value, 'narrations')
    if (!narration) {
      return
    }

    // directly mutate the objects derived from `scene` or `game`, changes
    // will be persisted
    if (position) {
      narration.position = position
    }
    narration.shown = true

    if (hideAfterShow) {
      // dont reuse the `scene` variable from the above scope!
      return ({ scene }) => {
        const narration = scene.getElement<Narration>(value, 'narrations')
        if (!narration) {
          return
        }

        narration.shown = false
      }
    }
  },

  hideNarration: ({ args, scene }) => {
    const { value } = args

    const narration = scene.getElement<Narration>(value, 'narrations')
    if (narration) {
      narration.shown = false
    }
  },

  showDialogue: ({ args, scene }) => {
    const { value, hideAfterShow, position } = args

    const dialogue = scene.getElement<Dialogue>(value, 'dialogues')
    if (!dialogue) {
      return
    }

    if (position) {
      dialogue.position = position
    }
    dialogue.shown = true

    if (hideAfterShow) {
      return ({ scene }) => {
        const dialogue = scene.getElement<Dialogue>(value, 'dialogues')
        if (!dialogue) {
          return
        }

        dialogue.shown = false
      }
    }
  },

  hideDialogue: ({ args, scene }) => {
    const { value } = args

    const dialogue = scene.getElement<Dialogue>(value, 'dialogues')
    if (dialogue) {
      dialogue.shown = false
    }
  },

  showImage: ({ args, scene }) => {
    const { value, hideAfterShow, position } = args

    const image = scene.getElement<Image>(value, 'images')
    if (!image) {
      return
    }

    if (position) {
      image.position = position
    }
    image.shown = true

    if (hideAfterShow) {
      return ({ scene }) => {
        const image = scene.getElement<Image>(value, 'images')
        if (!image) {
          return
        }

        image.shown = false
      }
    }
  },

  hideImage: ({ args, scene }) => {
    const { value } = args

    const image = scene.getElement<Image>(value, 'images')
    if (image) {
      image.shown = false
    }
  },

  showClickable: ({ args, scene }) => {
    const { value, hideAfterShow, position } = args

    const clickable = scene.getElement<Clickable>(value, 'clickables')
    if (!clickable) {
      return
    }

    if (position) {
      clickable.position = position
    }
    clickable.shown = true

    if (hideAfterShow) {
      return ({ scene }) => {
        const clickable = scene.getElement<Clickable>(value, 'clickables')
        if (!clickable) {
          return
        }

        clickable.shown = false
      }
    }
  },

  hideClickable: ({ args, scene }) => {
    const { value } = args

    const clickable = scene.getElement<Clickable>(value, 'clickables')
    if (clickable) {
      clickable.shown = false
    }
  },

  wait: () => {},
}
