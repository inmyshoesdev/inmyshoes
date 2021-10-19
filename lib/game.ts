import { GameSchema } from '../schema/game'
import { StateComponent, makeStateComponent } from './component'
import { makeMainCharacter, makeNPC, MainCharacter, NPC } from './character'
import { Scene } from './scene'
import { makeState, State } from './state'
import { isClickableImg } from './elements'

type PreloadImageOptions = {
  timeout?: number
  minPercentageLoaded?: number
}

export const EmptyGame: Game = {
  name: '',
  globalState: makeState({}),
  loading: false,
  about: {
    logo: { src: '/images/mainlogo.png' },
    backgroundMusic: '/music/bensound-jazzcomedy.mp3',
    credits: 'This is supported by markdown for ease of formatting',
  },
  characterIndex: 0,
  characterSelected: false,
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

export interface About {
  description?: string
  author?: string
  favicon?: string
  logo?: {
    src?: string
    width?: string
    height?: string
  }
  backgroundMusic?: string
  credits?: string
}
export interface Game {
  name: string
  about: About
  globalState: State
  loading: boolean

  characterSelected: boolean
  characterIndex: number
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
    about: schema.about,
    globalState: globalState,
    loading: false,
    characterIndex: 0,
    characterSelected: false,
    currentSceneId: mainCharacters[0].scenes[0].id,

    header:
      schema.header?.map((component) =>
        makeStateComponent(component, globalState)
      ) || [],
    mainCharacters: mainCharacters,
    npcs: npcs,

    getScenes() {
      // Get current playing character
      const character = this.mainCharacters[this.characterIndex]
      if (!character) {
        console.error('no current playing character')
        return []
      }
      return character.scenes
    },
    getScene(sceneId: number) {
      // Get current playing character
      const character = this.mainCharacters[this.characterIndex]
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
