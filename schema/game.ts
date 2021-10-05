import {
  array,
  defaulted,
  Infer,
  object,
  optional,
  string,
  size,
} from 'superstruct'
import { MainCharacterSchema, NPCSchema } from './character'
import { StateSchema } from './state'

export const GameSchema = object({
  name: string(),
  mainCharacters: size(array(MainCharacterSchema), 1, Infinity),
  npcs: defaulted(array(NPCSchema), () => []),
  globalState: optional(StateSchema),
})

export type GameSchema = Infer<typeof GameSchema>
