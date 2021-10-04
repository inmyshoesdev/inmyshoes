import {
  Infer,
  intersection,
  literal,
  object,
  optional,
  record,
  string,
  type,
} from 'superstruct'

export const CharacterSchema = type({
  name: string(),
  images: intersection([
    // must be a struct of strings to strings with a DEFAULT image
    type({ default: string() }),
    record(string(), string()),
  ]),
})
export type CharacterSchema = Infer<typeof CharacterSchema>

// To be fleshed out
export const NPCSchema = intersection([CharacterSchema])
export type NPCSchema = Infer<typeof NPCSchema>

// To be fleshed out
export const MainCharacterSchema = intersection([
  CharacterSchema,
  type({
    info: string(),
  }),
])
export type MainCharacterSchema = Infer<typeof MainCharacterSchema>
