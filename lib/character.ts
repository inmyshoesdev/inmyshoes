import { MainCharacterSchema, NPCSchema } from '../schema/character'
import { compileEvents } from './events'
import { Scene, makeScene } from './scene'

export interface Character {
  name: string
  images: {
    default: string
    [name: string]: string
  }
}

export interface CharacterInfoSlide {
  text: string
  backgroundImage: string
}
export interface MainCharacter extends Character {
  info: CharacterInfoSlide[]
  scenes: Scene[]
  getScene(sceneId: number): Scene | undefined
}

export function makeMainCharacter(
  schema: MainCharacterSchema,
  npcs: NPC[]
): MainCharacter {
  let mainCharacter: MainCharacter = {
    name: schema.name,
    images: schema.images,
    info: schema.info,
    scenes: [],
    getScene(sceneId: number) {
      return this.scenes.find((scene) => scene.id === sceneId)
    },
  }

  const characters: Character[] = [mainCharacter, ...npcs]
  const [eventScene, eventSchemas] = compileEvents(schema.events, characters)

  mainCharacter.scenes = schema.scenes.map((sceneSchema) =>
    makeScene(sceneSchema, characters, eventSchemas)
  )

  mainCharacter.scenes.push(eventScene)

  return mainCharacter
}

export interface NPC extends Character {}

export function makeNPC(schema: NPCSchema): NPC {
  return {
    name: schema.name,
    images: schema.images,
  }
}
