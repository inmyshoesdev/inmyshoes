import { RulesLogic } from 'json-logic-js'
import { ActionSchema } from '../schema/actions'
import { DeferredActions } from '../stores/store'
import { Game } from './game'
import { makeLogic } from './logic'
import { ElementKeys, Scene } from './scene'
import { once } from './utils'

// modify any property to have the changes persisted to the game state
// if called via the `executeActions` method of the store
export type ModifiableArgs = {
  scene: Scene // scene of the action
  game: Game
}

export type FinishAction = (({ scene, game }: ModifiableArgs) => void) | void

export function isCallable(
  finishAction: FinishAction
): finishAction is ({ scene, game }: ModifiableArgs) => void {
  return finishAction instanceof Object
}

export type ActionArgs = {
  duration: number
  args: Record<string, any>
  deferredActions?: DeferredActions
} & ModifiableArgs

export interface Action {
  name: string
  duration: number
  condition?: RulesLogic
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
    condition: makeLogic(schema.if),
    args: rest,
    sceneId: sceneId,
    execute: action,
  }
}

const ShowActions: Record<`show${string}`, (args: ActionArgs) => FinishAction> =
  {
    showNarration: show('narrations'),
    showDialogue: show('dialogues'),
    showImage: show('images'),
    showClickable: show('clickables'),
    showLink: show('links'),
  }

const HideActions: Record<`hide${string}`, (args: ActionArgs) => FinishAction> =
  {
    hideDialogue: hide('dialogues'),
    hideNarration: hide('narrations'),
    hideImage: hide('images'),
    hideClickable: hide('clickables'),
    hideLink: hide('links'),
  }

// Add all actions here!
export const DefinedActions: Partial<
  Record<string, (args: ActionArgs) => FinishAction>
> = {
  // TODO: consider cancelling or not accepting any actions that come
  // after a gotoScene action, may lead to weird unforseen circumstances
  gotoScene: ({ args, game }) => {
    const { sceneId } = args
    if (typeof sceneId === 'number') {
      game.currentSceneId = sceneId
    }
  },

  wait: () => {},

  updateState: ({ args, scene }) => {
    const { newState = {} } = args
    scene.state.update(newState)
  },

  updateGlobalState: ({ args, game }) => {
    const { newState = {} } = args
    game.globalState.update(newState)
  },

  resetGlobalState: ({ game }) => {
    game.globalState.reset()
  },

  reselectCharacter: () => {
    location.reload()
  },

  ...ShowActions,
  ...HideActions,
}

function show(elementKey: ElementKeys) {
  return ({
    args,
    scene,
    duration,
    deferredActions,
  }: ActionArgs): FinishAction => {
    const { value, autoHide = true } = args

    const element = scene.getElement(value, elementKey)
    if (!element) {
      console.warn(`no element called ${value}`)
      return
    }

    // if (position) {
    //   element.position = position
    // }
    element.shown = true

    // if autoHide, then include a hide action in the after interaction callback
    if (autoHide && deferredActions) {
      deferredActions.runtimeActions = [
        {
          action: {
            name: `hide${elementKey}`,
            duration: duration,
            args: { value },
            sceneId: scene.id,
            execute: hide(elementKey),
          },
          timing: 0,
        },
        ...deferredActions.runtimeActions,
      ]
    }

    const afterInteractionCallback = deferredActions
      ? once(() => {
          const cleanupFns = deferredActions.runtimeActions.map((action) =>
            deferredActions.deferredExecutor(action)
          )

          return cleanupFns ? () => cleanupFns.forEach((fn) => fn()) : () => {}
        })
      : undefined

    // set the after interaction callback if required
    if (afterInteractionCallback) {
      element.afterInteractionCallback = afterInteractionCallback
    }

    if (duration > 0) {
      return ({ scene }) => {
        if (afterInteractionCallback) {
          afterInteractionCallback()

          // if after interaction callback is not defined, then we manually hide the element here
        } else if (autoHide) {
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
