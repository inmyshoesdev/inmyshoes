import { any, Infer, record, string } from 'superstruct'

// any object with string keys
export const StateSchema = record(string(), any())

export type StateSchema = Infer<typeof StateSchema>
