import { Infer, number, optional, string, type } from 'superstruct'

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
export const ActionSchema = type({
  type: string(),
  duration: optional(number()),
})

export type ActionSchema = Infer<typeof ActionSchema>
