import { GameSchema } from '../schema/game'
import { makeScene, Scene } from './scene'

import { State } from './state'

export const EmptyGame: Game = {
  name: '',
  currentSceneId: 0,
  globalState: {},
  scenes: [] as Scene[],
  getScene(sceneId: number) {
    return this.scenes.find((scene) => scene.id === sceneId)
  },
}

export interface Game {
  name: string
  currentSceneId: number
  globalState: State
  scenes: Scene[]
  getScene(sceneId: number): Scene | undefined
}

export function makeGame(schema: GameSchema): Game {
  return {
    name: schema.name,
    currentSceneId: schema.scenes[0].id,
    globalState: { ...(schema.globalState ?? {}) },
    scenes: schema.scenes.map((schema) => makeScene(schema)),
    getScene(sceneId: number) {
      return this.scenes.find((scene) => scene.id === sceneId)
    },
  }
}
