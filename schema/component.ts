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
  DISPLAY = 'state_display',
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
//   "iconImage": "/images/Health.png"
//   "color": "#800000"
// }
export const StateMeterSchema = object({
  component: literal(COMPONENT_TYPE.METER),
  title: string(),
  state: string(),
  iconImage: optional(string()),
  color: optional(string()),
})

export type StateMeterSchema = Infer<typeof StateMeterSchema>

// {
//   "component": "state_display",
//   "title": "Date",
//   "state": "date",
//   "iconImage": "/images/calendar.png"
// }
export const StateDisplaySchema = object({
  component: literal(COMPONENT_TYPE.DISPLAY),
  title: string(),
  state: string(),
  iconImage: optional(string()),
})

export type StateDisplaySchema = Infer<typeof StateDisplaySchema>
