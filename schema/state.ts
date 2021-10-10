import {
  boolean,
  Infer,
  number,
  optional,
  record,
  string,
  type,
  union,
} from 'superstruct'

// any object with string keys
export const StateSchema = record(
  string(),
  union([
    string(),
    number(),
    boolean(),
    type({
      value: number(),
      min: optional(number()),
      max: optional(number()),
    }),
  ])
)

export type StateSchema = Infer<typeof StateSchema>
