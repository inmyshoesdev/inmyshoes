import { GameSchema, GameStage } from '../schema/game'
import { StateComponent, makeStateComponent } from './component'
import { makeMainCharacter, makeNPC, MainCharacter, NPC } from './character'
import { makeScene, NoBackground, Scene } from './scene'
import { makeState, State } from './state'
import { isClickableImg } from './elements'
import { characterSelectBg, gameBackgroundTexture } from './constants'
import { EventSchema } from '../schema/events'

type PreloadImageOptions = {
  timeout?: number
  minPercentageLoaded?: number
}

export const EmptyGame: Game = {
  name: '',
  globalState: makeState({}),
  loading: false,

  about: {
    logo: {
      src: 'https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/mainlogo.png',
    },
    backgroundMusic: '/music/bgm.mp3',
    credits: 'This is supported by markdown for ease of formatting',
  },
  stage: GameStage.INTRO,
  characterIndex: 0,
  characterSelected: false,
  currentSceneId: 0,

  header: [],
  intro: [],
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

interface Logo {
  src?: string
  width?: string
  height?: string
}

export interface About {
  description?: string
  author?: string
  favicon?: string

  logo?: Logo
  logoSmall?: Logo

  backgroundMusic?: string
  credits?: string
}

export interface Game {
  name: string
  about: About
  globalState: State
  loading: boolean

  stage: GameStage
  characterSelected: boolean
  characterIndex: number
  currentSceneId: number

  header: StateComponent[]
  intro: Scene[]
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
  const intro = schema.intro.map((scene) =>
    makeScene(
      scene,
      [...mainCharacters, ...npcs],
      new Map<string, EventSchema>()
    )
  )
  var stage = GameStage.INTRO
  if (intro.length < 1) stage = GameStage.CHAR_SELEC

  return {
    name: schema.name,
    about: schema.about,
    globalState: globalState,
    loading: false,

    stage: stage,
    characterIndex: 0,
    characterSelected: false,
    currentSceneId:
      stage === GameStage.INTRO ? intro[0].id : mainCharacters[0].scenes[0].id,

    header:
      schema.header?.map((component) =>
        makeStateComponent(component, globalState)
      ) || [],
    intro: intro,
    mainCharacters: mainCharacters,
    npcs: npcs,

    getScenes() {
      if (this.stage === GameStage.INTRO) {
        return this.intro
      } else {
        // Get current playing character
        const character = this.mainCharacters[this.characterIndex]
        if (!character) {
          console.error('no current playing character')
          return []
        }
        return character.scenes
      }
    },
    getScene(sceneId: number) {
      if (this.stage === GameStage.INTRO) {
        return this.intro.find((scene) => scene.id === sceneId)
      } else {
        // Get current playing character
        const character = this.mainCharacters[this.characterIndex]
        if (!character) {
          console.error('no current playing character')
          return
        }
        return character.getScene(sceneId)
      }
    },

    preloadImages({
      timeout = 4000,
      minPercentageLoaded = 50,
    } = {}): Promise<void> {
      // gather all the images
      const imageSources = new Set<string>([
        characterSelectBg,
        gameBackgroundTexture,
      ])

      let characters = [...this.mainCharacters, ...this.npcs]
      characters.forEach((char) => {
        for (const [_, src] of Object.entries(char.images)) {
          imageSources.add(src)
        }
      })

      this.mainCharacters.forEach((char) => {
        char.scenes.forEach((scene) => {
          if (scene.background !== NoBackground) {
            imageSources.add(scene.background)
          }

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
