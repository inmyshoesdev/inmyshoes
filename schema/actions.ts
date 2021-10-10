import {
  any,
  defaulted,
  Infer,
  intersection,
  number,
  optional,
  record,
  string,
  type,
} from 'superstruct'
import { LogicSchema } from './logic'

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
    if: optional(LogicSchema),
  }),
  record(string(), any()),
])

export type ActionSchema = Infer<typeof ActionSchema>
