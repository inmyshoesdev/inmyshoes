import {
  StateComponentSchema,
  COMPONENT_TYPE,
  StateMeterSchema,
} from '../schema/component'
import { State } from './state'

export interface StateComponent {
  component: COMPONENT_TYPE
  title: string
}

export function makeStateComponent(
  schema: StateComponentSchema,
  state: State
): StateComponent {
  switch (schema.component) {
    case COMPONENT_TYPE.METER:
      return makeMeter(schema as StateMeterSchema, state)
    default:
      throw `no component of type ${schema.component}`
  }
}

export interface StateMeter extends StateComponent {
  state: string
  fullImage: string
  emptyImage: string
}

export function makeMeter(schema: StateMeterSchema, state: State): StateMeter {
  if (!state.hasKey(schema.state)) throw `no state "${schema.state}" found`
  let stateType = typeof state.get(schema.state)
  if (!(stateType === 'number'))
    throw `state "${schema.state}" is of type ${stateType}, expected number`

  return {
    component: schema.component,
    title: schema.title,
    state: schema.state,
    fullImage: schema.fullImage,
    emptyImage: schema.emptyImage,
  }
}
