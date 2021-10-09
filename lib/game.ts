import { Img } from '@chakra-ui/image'
import { GameSchema } from '../schema/game'
import {
  makeMainCharacter,
  makeNPC,
  Character,
  MainCharacter,
  NPC,
} from './character'
import { images } from './elements'
import { makeScene, Scene } from './scene'

import { makeState, State } from './state'

export const EmptyGame: Game = {
  name: '',
  globalState: makeState({}),

  characterName: '',
  characterInfo: '',
  currentSceneId: 0,

  mainCharacters: [] as MainCharacter[],
  npcs: [] as NPC[],
  getScenes() {
    return []
  },
  getScene(sceneId: number) {
    return undefined
  },
  preloadImages() {},
}

export interface Game {
  name: string
  globalState: State

  characterName: string
  characterInfo: string
  currentSceneId: number

  mainCharacters: MainCharacter[]
  npcs: NPC[]

  getScenes(): Scene[] // Get all scenes of current playing character
  getScene(sceneId: number): Scene | undefined

  preloadImages(): void
}

export function makeGame(schema: GameSchema): Game {
  const npcs = schema.npcs.map((npcSchema) => makeNPC(npcSchema))
  const mainCharacters = schema.mainCharacters.map((character) =>
    makeMainCharacter(character, npcs)
  )

  return {
    name: schema.name,

    globalState: makeState(schema.globalState ?? {}),

    characterName: mainCharacters[0].name,
    characterInfo: mainCharacters[0].info,
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

    preloadImages() {
      const imageSources: string[] = []

      let characters = [...this.mainCharacters, ...this.npcs]
      characters.forEach((char) => {
        for (const [_, src] of Object.entries(char.images)) {
          imageSources.push(src)
        }
      })

      this.mainCharacters.forEach((char) => {
        char.scenes.forEach((scene) => {
          imageSources.push(scene.background)

          scene.images.forEach((image) => {
            imageSources.push(image.src)
          })
        })
      })

      imageSources.forEach((source) => {
        const img = new Image()
        img.src = source
      })
    },
  }
}
