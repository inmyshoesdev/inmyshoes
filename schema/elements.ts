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
  enums,
  defaulted,
  boolean,
} from 'superstruct'
import { ActionSchema } from './actions'
import { LogicSchema } from './logic'

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
    texts: array(string()),
    textBoxImage: optional(string()),
    showNavigations: optional(boolean()),
  }),
])

export type NarrationSchema = Infer<typeof NarrationSchema>

export enum DialogType {
  SPEECH = 'speech',
  THOUGHT = 'thought',
}
// {
//   "name": "hello",
//   "speeches": [
//     {
//         "character": "Julie",
//         "variant": "happy",
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
  variant: optional(string()),
  type: optional(optional(enums(Object.values(DialogType)))),
  textBoxImage: optional(string()),
  characterPosition: optional(
    type({
      top: optional(string()),
      left: optional(string()),
      bottom: optional(string()),
      right: optional(string()),
    })
  ),
  characterDimension: optional(
    type({
      width: optional(string()),
      height: optional(string()),
    })
  ),
  textPosition: optional(
    type({
      top: optional(string()),
      left: optional(string()),
      bottom: optional(string()),
      right: optional(string()),
    })
  ),
  textDimension: optional(
    type({
      width: optional(string()),
      height: optional(string()),
    })
  ),
  showNavigations: optional(boolean()),
})

export type SpeechSchema = Infer<typeof SpeechSchema>

export const DialogueSchema = intersection([
  ElementSchema,
  type({ speeches: array(SpeechSchema) }),
])

export type DialogueSchema = Infer<typeof DialogueSchema>

const BlendModes = enums([
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
])

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
    blendMode: optional(BlendModes),
    effect: optional(string()),
  }),
])

export type ImageSchema = Infer<typeof ImageSchema>

export const LinkSchema = intersection([
  ElementSchema,
  type({
    url: string(),
    text: string(),
    effect: optional(string()),
  }),
])

export type LinkSchema = Infer<typeof LinkSchema>

// can have either text content or image, such as:
// {
//     "name": "yes",
//     "text": "yes",
//     "position": {
//         "left": "10px",
//         "top": "50%"
//     },
//     "effect": "bounce",
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
  type({
    onClick: defaulted(array(ActionSchema), () => []),
    effect: optional(string()),
    disabled: optional(
      type({
        if: optional(LogicSchema),
        label: optional(string()),
      })
    ),
  }),
  union([
    type({ text: string() }),
    type({
      src: string(),
      altText: optional(string()),
      blendMode: optional(BlendModes),
    }),
  ]),
])

export type ClickableItemSchema = Infer<typeof ClickableItemSchema>

export const ClickableGroupSchema = intersection([
  type({ name: string() }),
  type({ options: size(array(ClickableItemSchema), 0, Infinity) }),
])

export type ClickableGroupSchema = Infer<typeof ClickableGroupSchema>
