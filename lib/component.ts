import {
  ComponentSchema,
  COMPONENT_TYPE,
  MeterSchema,
} from '../schema/component'

export interface Component {
  component: COMPONENT_TYPE
  title: string
}

export function makeComponent(schema: ComponentSchema): Component {
  switch (schema.component) {
    case COMPONENT_TYPE.METER:
      return makeMeter(schema as MeterSchema)
    default:
      throw `no component of type ${schema.component}`
  }
}

export interface Meter extends Component {
  fullImage: string
  emptyImage: string
}

export function makeMeter(schema: MeterSchema): Meter {
  return {
    component: schema.component,
    title: schema.title,
    fullImage: schema.fullImage,
    emptyImage: schema.emptyImage,
  }
}
