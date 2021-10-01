import { array, Infer, object, optional, size, string } from 'superstruct'
import { SceneSchema } from './scene'
import { StateSchema } from './state'

export const GameSchema = object({
  name: string(),
  globalState: optional(StateSchema),
  scenes: size(array(SceneSchema), 1, Infinity),
})

export type GameSchema = Infer<typeof GameSchema>
