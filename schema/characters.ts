import { intersection, object, record, string, type } from 'superstruct'

// To be fleshed out
export const NPCSchema = object({
  name: string(),
  images: intersection([
    // must be a struct of strings to strings with a DEFAULT image
    type({ DEFAULT: string() }),
    record(string(), string()),
  ]),
})

// To be fleshed out
export const MainCharacterSchema = type({
  name: string(),
})
