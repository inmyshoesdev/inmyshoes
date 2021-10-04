import {
  array,
  Infer,
  intersection,
  size,
  optional,
  string,
  type,
  union,
  object,
} from 'superstruct'
import { ActionSchema } from './actions'

// {
//     "name": "hello",
//     "position": {
//         "left": "10px",
//         "top": "50%"
//     },
//     "dimension": {
//         "width": "100px",
//         "height": "100px"
//     },
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
  dimension: optional(
    type({
      width: optional(string()),
      height: optional(string()),
    })
  ),
})

export type ElementSchema = Infer<typeof ElementSchema>

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

export type NarrationSchema = Infer<typeof NarrationSchema>

// {
//   "name": "hello",
//   "speeches": [
//     {
//         "character": "Julie",
//         "text": "Hello"
//     },
//     {
//         "character": "James",
//         "text": "Hey!"
//     }
//   ]
// }
export const SpeechSchema = object({
  text: string(),
  character: string(),
})

export type SpeechSchema = Infer<typeof SpeechSchema>

export const DialogueSchema = intersection([
  ElementSchema,
  type({ speeches: array(SpeechSchema) }),
])

export type DialogueSchema = Infer<typeof DialogueSchema>

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

export type ImageSchema = Infer<typeof ImageSchema>

// can have either text content or image, such as:
// {
//     "name": "yes",
//     "text": "yes",
//     "position": {
//         "left": "10px",
//         "top": "50%"
//     },
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
//     "position": {
//         "left": "10px",
//         "top": "50%"
//     },
//     "dimension": {
//         "width": "10px",
//         "height": "50%"
//     },
//     "onClick": [
//         {
//             "type": "showDialogue",
//             "value": "hello dialogue",
//             "duration": 3000
//         }
//     ]
// }
export const ClickableItemSchema = intersection([
  ElementSchema,
  type({ onClick: array(ActionSchema) }),
  union([
    type({ text: string() }),
    type({ src: string(), altText: optional(string()) }),
  ]),
])

export const ClickableGroupSchema = intersection([
  type({ name: string() }),
  type({ clickables: size(array(ClickableItemSchema), 0, Infinity) }),
])

export type ClickableGroupSchema = Infer<typeof ClickableGroupSchema>
