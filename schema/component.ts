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

// {
//   "component": "meter",
//   "title": "Health",
//   "state": "health",
//   "fullImage": "/images/full-bar.png",
//   "emptyImage": "/images/empty-bar.png"
// }
export const MeterSchema = object({
  component: literal(COMPONENT_TYPE.METER),
  title: string(),
  state: string(),
  // Might make images optional
  fullImage: string(),
  emptyImage: string(),
})

export type MeterSchema = Infer<typeof MeterSchema>
