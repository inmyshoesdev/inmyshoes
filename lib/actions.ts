import { ActionSchema } from '../schema/actions'
import { Game, getClickable, getDialogue, getImage, getNarration } from './game'

export type FinishAction = ((game: Game) => void) | void

export function isCallable(
  finishAction: FinishAction
): finishAction is (game: Game) => void {
  return finishAction instanceof Object
}

export type ActionArgs = {
  duration: number
  args: Record<string, any>
  sceneId: number
  game: Game
}
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

export const DefinedActions: Partial<
  Record<string, (args: ActionArgs) => FinishAction>
> = {
  gotoScene: ({ args, game }) => {
    const { sceneId } = args
    if (typeof sceneId === 'number') {
      game.currentSceneId = sceneId
    }
  },

  showNarration: ({ args, game, sceneId }) => {
    const { value, hideAfterShow, position } = args

    let narration = getNarration(game, sceneId, value)
    if (!narration) {
      return
    }

    if (position) {
      narration.position = position
    }
    narration.shown = true

    if (hideAfterShow) {
      return (game) => {
        let narration = getNarration(game, sceneId, value)
        if (!narration) {
          return
        }

        narration.shown = false
      }
    }
  },

  hideNarration: ({ args, game, sceneId }) => {
    const { value } = args

    let narration = getNarration(game, sceneId, value)
    if (narration) {
      narration.shown = false
    }
  },

  showDialogue: ({ args, game, sceneId }) => {
    const { value, hideAfterShow, position } = args

    let dialogue = getDialogue(game, sceneId, value)
    if (!dialogue) {
      return
    }

    if (position) {
      dialogue.position = position
    }
    dialogue.shown = true

    if (hideAfterShow) {
      return (game) => {
        let dialogue = getDialogue(game, sceneId, value)
        if (!dialogue) {
          return
        }

        dialogue.shown = false
      }
    }
  },

  hideDialogue: ({ args, game, sceneId }) => {
    const { value } = args

    let dialogue = getDialogue(game, sceneId, value)
    if (dialogue) {
      dialogue.shown = false
    }
  },

  showImage: ({ args, game, sceneId }) => {
    const { value, hideAfterShow, position } = args

    let image = getImage(game, sceneId, value)
    if (!image) {
      return
    }

    if (position) {
      image.position = position
    }
    image.shown = true

    if (hideAfterShow) {
      return (game) => {
        let image = getImage(game, sceneId, value)
        if (!image) {
          return
        }

        image.shown = false
      }
    }
  },

  hideImage: ({ args, game, sceneId }) => {
    const { value } = args

    let image = getImage(game, sceneId, value)
    if (image) {
      image.shown = false
    }
  },

  showClickable: ({ args, game, sceneId }) => {
    const { value, hideAfterShow, position } = args

    let clickable = getClickable(game, sceneId, value)
    if (!clickable) {
      return
    }

    if (position) {
      clickable.position = position
    }
    clickable.shown = true

    if (hideAfterShow) {
      return (game) => {
        let clickable = getClickable(game, sceneId, value)
        if (!clickable) {
          return
        }

        clickable.shown = false
      }
    }
  },

  hideClickable: ({ args, game, sceneId }) => {
    const { value } = args

    let clickable = getClickable(game, sceneId, value)
    if (clickable) {
      clickable.shown = false
    }
  },

  wait: () => {},
}
