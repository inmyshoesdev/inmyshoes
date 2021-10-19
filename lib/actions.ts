import { RulesLogic } from 'json-logic-js'
import { ActionSchema } from '../schema/actions'
import { EventSchema } from '../schema/events'
import {
  DefinedActions,
  isDefinedAction,
  TriggerEvents,
} from './defined-actions'
import { AfterInteractionCallback } from './elements'
import { Game } from './game'
import { makeLogic } from './logic'
import { Scene } from './scene'

// modify any property to have the changes persisted to the game state
// if called via the `executeActions` method of the store
export type ModifiableArgs = {
  scene: Scene // scene of the action
  game: Game
}

export type FinishAction = ({ scene, game }: ModifiableArgs) => void

export type ActionArgs<TArgs = Record<string, any>> = {
  duration: number
  args: TArgs
  afterInteractionCallback?: AfterInteractionCallback
} & ModifiableArgs

export type ActionReturnType = {
  followupActions?: Action<any>[]
  finishAction?: FinishAction
}

export function isActionReturnType(
  actionReturnType: ActionReturnType | void
): actionReturnType is ActionReturnType {
  return actionReturnType instanceof Object
}

export interface Action<TArgs = Record<string, any>> {
  name: string
  duration: number
  condition?: RulesLogic
  args: TArgs
  sceneId: number
  execute: (args: ActionArgs<TArgs>) => ActionReturnType | void
}

export function compileActions(
  actionSchemas: ActionSchema[],
  sceneId: number,
  eventSchemas: Map<string, EventSchema> = new Map<string, EventSchema>()
): Action<any>[] {
  return actionSchemas.reduce<Action[]>((accum, actionSchema) => {
    const { type } = actionSchema

    const action =
      type === TriggerEvents
        ? makeAction({ ...actionSchema, eventSchemas }, sceneId)
        : makeAction(actionSchema, sceneId)

    if (!action) {
      return accum
    }

    return [...accum, action]
  }, [])
}

export function makeAction(
  schema: ActionSchema,
  sceneId: number
): Action<any> | undefined {
  const { type, duration, if: condition, ...rest } = schema

  if (!isDefinedAction(type)) {
    console.warn(`no defined action matching type ${type}`)
    return undefined
  }

  const { validateArgs, execute } = DefinedActions[type]
  if (!validateArgs || !execute) {
    console.warn(`could not find action matching type ${type}`)
    return undefined
  }

  const [validationErr, args] = validateArgs(rest)
  if (validationErr) {
    throw validationErr
  }

  return {
    name: schema.type,
    duration: schema.duration,
    condition: makeLogic(schema.if),
    args: args,
    sceneId: sceneId,
    execute: execute,
  }
}
