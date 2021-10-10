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
  optional,
} from 'superstruct'

export enum COMPONENT_TYPE {
  METER = 'state_meter',
  DISPLAY="state_display"
}

export const StateComponentSchema = object({
  component: enums(Object.values(COMPONENT_TYPE)),
  title: string(),
})

export type StateComponentSchema = Infer<typeof StateComponentSchema>

// {
//   "component": "state_meter",
//   "title": "Health",
//   "state": "health",
//   "fullImage": "/images/full-bar.png",
//   "emptyImage": "/images/empty-bar.png"
// }
export const StateMeterSchema = object({
  component: literal(COMPONENT_TYPE.METER),
  title: string(),
  state: string(),
  // Might make images optional
  fullImage: string(),
  emptyImage: string(),
})

export type StateMeterSchema = Infer<typeof StateMeterSchema>


export const StateDisplaySchema = object({
  component: literal(COMPONENT_TYPE.DISPLAY),
  title: string(),
  state: string(),
  labelImage: optional(string()),
})

export type StateDisplaySchema = Infer<typeof StateDisplaySchema>