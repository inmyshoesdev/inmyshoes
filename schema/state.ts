import { boolean, Infer, number, record, string, union } from 'superstruct'

// any object with string keys
export const StateSchema = record(
  string(),
  union([string(), number(), boolean()])
)

export type StateSchema = Infer<typeof StateSchema>
