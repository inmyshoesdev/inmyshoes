import {
  array,
  defaulted,
  Infer,
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
  NarrationSchema,
} from './elements'
import { StateSchema } from './state'

export const SceneSchema = object({
  id: number(),
  background: string(),
  backgroundAltText: optional(string()),

  narrations: defaulted(array(NarrationSchema), () => []),
  dialogues: defaulted(array(DialogueSchema), () => []),
  images: defaulted(array(ImageSchema), () => []),
  clickables: defaulted(array(ClickableGroupSchema), () => []),

  intro: defaulted(array(ActionSchema), () => []),
  outro: defaulted(array(ActionSchema), () => []),

  state: optional(StateSchema),
})

export type SceneSchema = Infer<typeof SceneSchema>
