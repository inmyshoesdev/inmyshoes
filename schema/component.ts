import {
  type,
  string,
  intersection,
  Infer,
  enums,
  object,
  dynamic,
  literal,
  omit,
} from 'superstruct'

export enum COMPONENT_TYPE {
  METER = 'meter',
}

export const ComponentSchema = object({
  component: enums(Object.values(COMPONENT_TYPE)),
  title: string(),
})

export type ComponentSchema = Infer<typeof ComponentSchema>

export const MeterSchema = object({
  component: literal(COMPONENT_TYPE.METER),
  title: string(),
  state: string(),
  fullImage: string(),
  emptyImage: string(),
})

export type MeterSchema = Infer<typeof MeterSchema>
