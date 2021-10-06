import {
  array,
  Infer,
  intersection,
  record,
  size,
  string,
  type,
} from 'superstruct'
import { SceneSchema } from './scene'

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
    scenes: size(array(SceneSchema), 1, Infinity),
  }),
])
export type MainCharacterSchema = Infer<typeof MainCharacterSchema>
