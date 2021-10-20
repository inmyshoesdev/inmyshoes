import {
  array,
  defaulted,
  Infer,
  max,
  min,
  number,
  object,
  optional,
  record,
  size,
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
import { LogicSchema } from './logic'

export const EventSchema = object({
  name: string(),
  sequence: size(array(ActionSchema), 1, Infinity),
  if: optional(LogicSchema),

  narrations: defaulted(array(NarrationSchema), () => []),
  dialogues: defaulted(array(DialogueSchema), () => []),
  images: defaulted(array(ImageSchema), () => []),
  clickables: defaulted(array(ClickableGroupSchema), () => []),
  links: defaulted(array(LinkSchema), () => []),
})

export type EventSchema = Infer<typeof EventSchema>

export const TriggerEventsSchema = record(
  string(),
  object({
    chance: defaulted(min(max(number(), 100), 0), 100),
  })
)

export type TriggerEventsSchema = Infer<typeof TriggerEventsSchema>
