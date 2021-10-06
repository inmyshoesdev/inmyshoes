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
  globalState: {},

  characterName: '',
  currentSceneId: 0,

  mainCharacters: [] as MainCharacter[],
  npcs: [] as NPC[],
  getScenes() {
    return []
  },
  getScene(sceneId: number) {
    return undefined
  },
}

export interface Game {
  name: string
  globalState: State

  characterName: string
  currentSceneId: number

  mainCharacters: MainCharacter[]
  npcs: NPC[]

  getScenes(): Scene[] // Get all scenes of current playing character
  getScene(sceneId: number): Scene | undefined
}

export function makeGame(schema: GameSchema): Game {
  const npcs = schema.npcs.map((npcSchema) => makeNPC(npcSchema))
  const mainCharacters = schema.mainCharacters.map((character) =>
    makeMainCharacter(character, npcs)
  )

  return {
    name: schema.name,

    globalState: {
      ...(schema.globalState ?? {}),
    },

    characterName: mainCharacters[0].name,
    currentSceneId: mainCharacters[0].scenes[0].id,

    mainCharacters: mainCharacters,
    npcs: npcs,

    getScenes() {
      // Get current playing character
      let character = this.mainCharacters.find(
        (character) => character.name === this.characterName
      )
      if (!character) {
        console.error('no current playing character')
        return []
      }
      return character.scenes
    },
    getScene(sceneId: number) {
      // Get current playing character
      let character = this.mainCharacters.find(
        (character) => character.name === this.characterName
      )
      if (!character) {
        console.error('no current playing character')
        return
      }
      return character.getScene(sceneId)
    },
  }
}
