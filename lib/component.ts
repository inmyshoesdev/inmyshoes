import {
  ComponentSchema,
  COMPONENT_TYPE,
  MeterSchema,
} from '../schema/component'
import { State } from './state'

export interface Component {
  component: COMPONENT_TYPE
  title: string
}

export function makeComponent(
  schema: ComponentSchema,
  state: State
): Component {
  switch (schema.component) {
    case COMPONENT_TYPE.METER:
      return makeMeter(schema as MeterSchema, state)
    default:
      throw `no component of type ${schema.component}`
  }
}

export interface Meter extends Component {
  state: string
  fullImage: string
  emptyImage: string
}

export function makeMeter(schema: MeterSchema, state: State): Meter {
  if (!state.hasKey(schema.state)) throw `no state ${schema.state} found`

  return {
    component: schema.component,
    title: schema.title,
    state: schema.state,
    fullImage: schema.fullImage,
    emptyImage: schema.emptyImage,
  }
}
