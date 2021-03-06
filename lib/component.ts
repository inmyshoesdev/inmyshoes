import {
  StateComponentSchema,
  COMPONENT_TYPE,
  StateMeterSchema,
  StateDisplaySchema,
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
      return makeStateMeter(schema as StateMeterSchema, state)
    case COMPONENT_TYPE.DISPLAY:
      return makeStateDisplay(schema as StateDisplaySchema, state)
    default:
      throw `no component of type ${schema.component}`
  }
}

export interface StateMeter extends StateComponent {
  state: string
  iconImage?: string
  color?: string
}

export function makeStateMeter(
  schema: StateMeterSchema,
  state: State
): StateMeter {
  if (!state.hasKey(schema.state)) throw `no state "${schema.state}" found`
  // the following check no longer works due to badges
  // let stateType = typeof state.get(schema.state)
  // if (!(stateType === 'number'))
  //   throw `state "${schema.state}" is of type ${stateType}, expected number`

  return {
    component: schema.component,
    title: schema.title,
    state: schema.state,
    iconImage: schema.iconImage,
    color: schema.color,
  }
}

export interface StateDisplay extends StateComponent {
  state: string
  iconImage?: string
}

export function makeStateDisplay(
  schema: StateDisplaySchema,
  state: State
): StateDisplay {
  if (!state.hasKey(schema.state)) throw `no state "${schema.state}" found`

  return {
    component: schema.component,
    title: schema.title,
    state: schema.state,
    iconImage: schema.iconImage,
  }
}
