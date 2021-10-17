import { GameSchema } from '../schema/game'
import { StateComponent, makeStateComponent } from './component'
import {
  makeMainCharacter,
  makeNPC,
  MainCharacter,
  NPC,
  CharacterInfoSlide,
} from './character'
import { Scene } from './scene'
import { makeState, State } from './state'
import { clickables, isClickableImg } from './elements'

type PreloadImageOptions = {
  timeout?: number
  minPercentageLoaded?: number
}

export const EmptyGame: Game = {
  name: '',
  globalState: makeState({}),
  loading: false,

  characterName: '',
  characterInfo: [
    { text: 'Charater Information', backgroundImage: '/images/water.png' },
  ],
  currentSceneId: 0,

  header: [],
  mainCharacters: [] as MainCharacter[],
  npcs: [] as NPC[],
  getScenes() {
    return []
  },
  getScene(sceneId: number) {
    return undefined
  },

  preloadImages() {
    return Promise.resolve()
  },
}

export interface Game {
  name: string
  globalState: State
  loading: boolean

  characterName: string
  characterInfo: CharacterInfoSlide[]
  currentSceneId: number

  header: StateComponent[]
  mainCharacters: MainCharacter[]
  npcs: NPC[]

  getScenes(): Scene[] // Get all scenes of current playing character
  getScene(sceneId: number): Scene | undefined

  preloadImages(options?: PreloadImageOptions): Promise<void>
}

export function makeGame(schema: GameSchema): Game {
  const npcs = schema.npcs.map((npcSchema) => makeNPC(npcSchema))
  const mainCharacters = schema.mainCharacters.map((character) =>
    makeMainCharacter(character, npcs)
  )
  const globalState = makeState(schema.globalState ?? {})

  return {
    name: schema.name,

    globalState: globalState,
    loading: false,

    characterName: mainCharacters[0].name,
    characterInfo: mainCharacters[0].info,
    currentSceneId: mainCharacters[0].scenes[0].id,

    header:
      schema.header?.map((component) =>
        makeStateComponent(component, globalState)
      ) || [],
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

    preloadImages({
      timeout = 3000,
      minPercentageLoaded = 50,
    } = {}): Promise<void> {
      // gather all the images
      const imageSources = new Set<string>()

      let characters = [...this.mainCharacters, ...this.npcs]
      characters.forEach((char) => {
        for (const [_, src] of Object.entries(char.images)) {
          imageSources.add(src)
        }
      })

      this.mainCharacters.forEach((char) => {
        char.scenes.forEach((scene) => {
          imageSources.add(scene.background)

          scene.images.forEach((image) => {
            imageSources.add(image.src)
          })

          scene.clickables.forEach((group) => {
            group.clickables.forEach((clickable) => {
              if (isClickableImg(clickable)) {
                imageSources.add(clickable.src)
              }
            })
          })
        })
      })

      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, timeout)

        let loaded = 0
        const total = imageSources.size

        imageSources.forEach((source) => {
          const img = new Image()
          img.onload = () => {
            loaded++

            if (loaded / total > minPercentageLoaded / 100) {
              resolve()
            }
          }

          img.src = source
        })
      })
    },
  }
}
