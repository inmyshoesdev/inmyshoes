import { array, object, optional, size, string } from 'superstruct'
import { ActionSchema } from './actions'
import { LogicSchema } from './logic'

export const EventSchema = object({
  name: string(),
  actions: size(array(ActionSchema), 1, Infinity),
  if: optional(LogicSchema),
})
