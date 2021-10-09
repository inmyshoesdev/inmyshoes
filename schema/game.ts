import {
  array,
  defaulted,
  Infer,
  object,
  optional,
  string,
  size,
  dynamic,
  union,
} from 'superstruct'
import { MainCharacterSchema, NPCSchema } from './character'
import { ComponentSchema, MeterSchema } from './component'
import { StateSchema } from './state'

export const GameSchema = object({
  name: string(),
  header: optional(array(union([MeterSchema, ComponentSchema]))),
  mainCharacters: size(array(MainCharacterSchema), 1, Infinity),
  npcs: defaulted(array(NPCSchema), () => []),
  globalState: optional(StateSchema),
})

export type GameSchema = Infer<typeof GameSchema>
