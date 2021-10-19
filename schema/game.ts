import {
  array,
  defaulted,
  Infer,
  object,
  optional,
  string,
  size,
  union,
  type,
} from 'superstruct'
import { MainCharacterSchema, NPCSchema } from './character'
import { StateDisplaySchema, StateMeterSchema } from './component'
import { StateSchema } from './state'

const LogoSchema = type({
  src: defaulted(string(), '/images/mainlogo.png'),
  width: defaulted(string(), '150'),
  height: defaulted(string(), '50'),
})
export const AboutSchema = type({
  logo: optional(LogoSchema),
  backgroundMusic: optional(string()),
  credits: optional(string()),
})

export type AboutSchema = Infer<typeof AboutSchema>

export const GameSchema = object({
  name: string(),
  about: AboutSchema,
  header: optional(array(union([StateMeterSchema, StateDisplaySchema]))),
  mainCharacters: size(array(MainCharacterSchema), 1, Infinity),
  npcs: defaulted(array(NPCSchema), () => []),
  globalState: optional(StateSchema),
})

export type GameSchema = Infer<typeof GameSchema>
