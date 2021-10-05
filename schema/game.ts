import {
  array,
  defaulted,
  Infer,
  object,
  optional,
  size,
  string,
} from 'superstruct'
import { MainCharacterSchema, NPCSchema } from './characters'
import { SceneSchema } from './scene'
import { StateSchema } from './state'

export const GameSchema = object({
  name: string(),
  mainCharacter: MainCharacterSchema,
  npcs: defaulted(array(NPCSchema), () => []),
  globalState: optional(StateSchema),
  scenes: size(array(SceneSchema), 1, Infinity),
})

export type GameSchema = Infer<typeof GameSchema>
