import { ActionSchema } from '../schema/actions'
import { Game } from './game'
import { Scene } from './scene'

export type FinishAction = (() => void) | void

export function isCallable(
  finishAction: FinishAction
): finishAction is () => void {
  return finishAction instanceof Object
}

export type ActionArgs = {
  duration: number
  args: Record<string, any>
  scene: Scene
  game: Game
}
export interface Action {
  name: string
  duration: number
  args: Record<string, any>
  sceneId: number
  action: (args: ActionArgs) => FinishAction // like useEffect
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
    action,
  }
}

export const DefinedActions: Partial<
  Record<string, (args: ActionArgs) => FinishAction>
> = {
  gotoScene: ({ args, game }) => {
    const { sceneId } = args
    if (typeof sceneId === 'number') {
      game.gotoScene(sceneId)
    }
  },

  showNarration: ({ args, scene }) => {
    const { value, hideAfterShow, position } = args

    let narration = scene.getNarration(value)
    if (!narration) {
      return
    }

    narration.show(position)

    if (hideAfterShow) {
      return () => narration?.hide()
    }
  },

  hideNarration: ({ args, scene }) => {
    const { value } = args

    let narration = scene.getNarration(value)
    if (narration) {
      narration.hide()
    }
  },

  showDialogue: ({ args, scene }) => {
    const { value, hideAfterShow, position } = args

    let dialogue = scene.getDialogue(value)
    if (!dialogue) {
      return
    }

    dialogue.show(position)

    if (hideAfterShow) {
      return () => dialogue?.hide()
    }
  },

  hideDialogue: ({ args, scene }) => {
    const { value } = args

    let dialogue = scene.getDialogue(value)
    if (dialogue) {
      dialogue.hide()
    }
  },

  showImage: ({ args, scene }) => {
    const { value, hideAfterShow, position } = args

    let image = scene.getImage(value)
    if (!image) {
      return
    }

    image.show(position)

    if (hideAfterShow) {
      return () => image?.hide()
    }
  },

  hideImage: ({ args, scene }) => {
    const { value } = args

    let image = scene.getImage(value)
    if (image) {
      image.hide()
    }
  },

  showClickable: ({ args, scene }) => {
    const { value, hideAfterShow, position } = args

    let clickable = scene.getClickable(value)
    if (!clickable) {
      return
    }

    clickable.show(position)

    if (hideAfterShow) {
      return () => clickable?.hide()
    }
  },

  hideClickable: ({ args, scene }) => {
    const { value } = args

    let clickable = scene.getClickable(value)
    if (clickable) {
      clickable.hide()
    }
  },
}
