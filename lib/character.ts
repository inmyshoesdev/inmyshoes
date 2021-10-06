import { MainCharacterSchema, NPCSchema } from '../schema/character'
import { Scene, makeScene } from './scene'

export interface Character {
  name: string
  images: {
    default: string
    [name: string]: string
  }
}

export interface MainCharacter extends Character {
  info: string
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
  mainCharacter.scenes = schema.scenes.map((schema) =>
    makeScene(schema, characters)
  )

  return mainCharacter
}

export interface NPC extends Character {}

export function makeNPC(schema: NPCSchema): NPC {
  return {
    name: schema.name,
    images: schema.images,
  }
}
