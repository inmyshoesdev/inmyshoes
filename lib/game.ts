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
  preloadImages() {},
}

export interface Game {
  name: string
  currentSceneId: number
  globalState: State

  mainCharacter: MainCharacter
  npcs: NPC[]

  scenes: Scene[]
  getScene(sceneId: number): Scene | undefined

  preloadImages(): void
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

    preloadImages() {
      const imageSources: string[] = []

      let characters = [this.mainCharacter, ...this.npcs]
      characters.forEach((char) => {
        for (const [_, src] of Object.entries(char.images)) {
          imageSources.push(src)
        }
      })

      this.scenes.forEach((scene) => {
        imageSources.push(scene.background)

        scene.images.forEach((image) => {
          imageSources.push(image.src)
        })
      })

      imageSources.forEach((source) => {
        const img = new Image()
        img.src = source
      })
    },
  }
}
