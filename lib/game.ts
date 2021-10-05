import { GameSchema } from '../schema/game'
import {
  makeMainCharacter,
  makeNPC,
  Character,
  MainCharacter,
  NPC,
} from './character'
import { makeScene, Scene } from './scene'

import { State } from './state'

export const EmptyGame: Game = {
  name: '',
  currentSceneId: 0,
  globalState: {},
  mainCharacter: {
    name: '',
    images: { default: '' },
    info: '',
  },
  npcs: [] as NPC[],
  scenes: [] as Scene[],
  getScene(sceneId: number) {
    return this.scenes.find((scene) => scene.id === sceneId)
  },
}

export interface Game {
  name: string
  currentSceneId: number
  globalState: State

  mainCharacter: MainCharacter
  npcs: NPC[]

  scenes: Scene[]
  getScene(sceneId: number): Scene | undefined
}

export function makeGame(schema: GameSchema): Game {
  const mainCharacter = makeMainCharacter(schema.mainCharacter)
  const npcs = schema.npcs.map((npcSchema) => makeNPC(npcSchema))
  const characters: Character[] = [mainCharacter, ...npcs]
  return {
    name: schema.name,
    currentSceneId: schema.scenes[0].id,
    globalState: { ...(schema.globalState ?? {}) },

    mainCharacter: mainCharacter,
    npcs: npcs,

    scenes: schema.scenes.map((schema) => makeScene(schema, characters)),
    getScene(sceneId: number) {
      return this.scenes.find((scene) => scene.id === sceneId)
    },
  }
}
