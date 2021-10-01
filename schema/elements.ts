import {
  array,
  Infer,
  intersection,
  size,
  optional,
  string,
  type,
  union,
} from 'superstruct'
import { ActionSchema } from './actions'

// {
//     "name": "hello",
//     "position": {
//         "left": "10px",
//         "top": "50%"
//     }
// }
export const ElementSchema = type({
  name: string(),
  position: optional(
    type({
      top: optional(string()),
      left: optional(string()),
      bottom: optional(string()),
      right: optional(string()),
    })
  ),
})

export type ElementScema = Infer<typeof ElementSchema>

// {
//     "name": "hello",
//     "text": "hello world",
// }
export const NarrationSchema = intersection([
  ElementSchema,
  type({
    text: string(),
  }),
])

export type NarrationScema = Infer<typeof NarrationSchema>

// {
//     "name": "hello",
//     "text": "hello world",
//     "character": "paul",
// }
export const DialogueSchema = intersection([
  ElementSchema,
  type({
    text: string(),
    character: string(),
  }),
])

export type DialogueScema = Infer<typeof DialogueSchema>

// {
//     "name": "hello",
//     "src": "https://example.com/photo.png",
//     "altText": "example pic"
// }
export const ImageSchema = intersection([
  ElementSchema,
  type({
    src: string(),
    altText: optional(string()),
  }),
])

export type ImageScema = Infer<typeof ImageSchema>

// can have either text content or image, such as:
// {
//     "name": "yes",
//     "text": "yes",
//     "onClick": [
//         {
//             "type": "nextScene",
//             "sceneId": 2
//         }
//     ]
// }
//
// or:
// {
//     "name": "yes",
//     "src": "/public/lala.png",
//     "altText": "example pic",
//     "onClick": [
//         {
//             "type": "showDialogue",
//             "value": "hello dialogue",
//             "duration": 3000
//         }
//     ]
// }
export const ClickableOptionSchema = intersection([
  type({
    name: string(),
    onClick: array(ActionSchema),
  }),
  union([
    type({ text: string() }),
    type({ src: string(), altText: optional(string()) }),
  ]),
])

export const ClickableSchema = intersection([
  ElementSchema,
  type({
    options: size(array(ClickableOptionSchema), 0, Infinity),
  }),
])

export type ClickableSchema = Infer<typeof ClickableSchema>
