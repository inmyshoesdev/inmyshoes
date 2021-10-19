import {
  array,
  defaulted,
  Infer,
  min,
  number,
  object,
  optional,
  string,
} from 'superstruct'
import { ActionSchema } from './actions'
import {
  ClickableGroupSchema,
  DialogueSchema,
  ImageSchema,
  LinkSchema,
  NarrationSchema,
} from './elements'
import { StateSchema } from './state'

export const SceneSchema = object({
  id: min(number(), 0),
  background: string(),
  backgroundAltText: optional(string()),

  narrations: defaulted(array(NarrationSchema), () => []),
  dialogues: defaulted(array(DialogueSchema), () => []),
  images: defaulted(array(ImageSchema), () => []),
  clickables: defaulted(array(ClickableGroupSchema), () => []),
  links: defaulted(array(LinkSchema), () => []),

  intro: defaulted(array(ActionSchema), () => []),
  outro: defaulted(array(ActionSchema), () => []),

  state: optional(StateSchema),
})

export type SceneSchema = Infer<typeof SceneSchema>
