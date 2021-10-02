import {
  any,
  defaulted,
  Infer,
  intersection,
  number,
  record,
  string,
  type,
} from 'superstruct'

// should have type and optional duration, can have other properties, eg:
// {
//     "type": "nextScene",
//     "sceneId": 1
// }
//
// or:
// {
//     "type": "showNarration",
//     "value": "intro",
//     "duration": 3000
// }
export const ActionSchema = intersection([
  type({
    type: string(),
    duration: defaulted(number(), 0),
  }),
  record(string(), any()),
])

export type ActionSchema = Infer<typeof ActionSchema>
