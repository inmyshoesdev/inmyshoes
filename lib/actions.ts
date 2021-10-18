import { RulesLogic } from 'json-logic-js'
import { ActionSchema } from '../schema/actions'
import { AfterInteractionCallback } from './elements'
import { Game } from './game'
import { makeLogic } from './logic'
import { ElementKeys, Scene } from './scene'

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
  afterInteractionCallback?: AfterInteractionCallback
} & ModifiableArgs

export interface Action {
  name: string
  duration: number
  condition?: RulesLogic
  args: Record<string, any>
  sceneId: number
  execute: (args: ActionArgs) => FinishAction // like useEffect
}

export function compileActions(
  schemas: ActionSchema[],
  sceneId: number
): Action[] {
  return schemas.reduce<Action[]>((accum, schema) => {
    const action = makeAction(schema, sceneId)
    if (!action) {
      return accum
    }

    const { name, args, duration } = action
    const { value, autoHide = true, waitForInteraction = true } = args

    if (
      name in ShowActions &&
      autoHide &&
      (duration != 0 || waitForInteraction)
    ) {
      const hideActionName = name.replace('show', 'hide') as `hide${string}`
      const hideAction = HideActions[hideActionName]

      if (!hideAction) {
        console.warn(`no hide action with name ${hideActionName}`)
        return [...accum, action]
      }

      return [
        ...accum,
        action,
        {
          name: hideActionName,
          duration: duration,
          args: { value },
          sceneId: sceneId,
          execute: HideActions[hideActionName],
        },
      ]
    }

    return [...accum, action]
  }, [])
}

export function makeAction(
  schema: ActionSchema,
  sceneId: number
): Action | undefined {
  const { type, duration, ...rest } = schema

  const action = DefinedActions[type]
  if (!action) {
    console.warn(`no action matching type ${type}`)
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

const elements: Record<string, ElementKeys> = {
  Narration: 'narrations',
  Dialogue: 'dialogues',
  Image: 'images',
  Clickable: 'clickables',
  Link: 'links',
}

const ShowActions: Record<`show${string}`, (args: ActionArgs) => FinishAction> =
  Object.fromEntries(
    Object.entries(elements).map(([name, key]) => [`show${name}`, show(key)])
  )

const HideActions: Record<`hide${string}`, (args: ActionArgs) => FinishAction> =
  Object.fromEntries(
    Object.entries(elements).map(([name, key]) => [`hide${name}`, hide(key)])
  )

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

  reselectCharacter: ({ game }) => {
    game.characterSelected = false
  },

  ...ShowActions,
  ...HideActions,
}

function show(elementKey: ElementKeys) {
  return ({
    args,
    scene,
    afterInteractionCallback,
  }: ActionArgs): FinishAction => {
    const { value } = args

    const element = scene.getElement(value, elementKey)
    if (!element) {
      console.warn(`no element called ${value}`)
      return
    }

    // if (position) {
    //   element.position = position
    // }
    element.shown = true

    // set the after interaction callback if required
    if (afterInteractionCallback) {
      element.afterInteractionCallback = afterInteractionCallback
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
