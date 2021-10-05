import { MainCharacterSchema, NPCSchema } from '../schema/characters'

export interface Character {
  name: string
  images: {
    default: string
    [name: string]: string
  }
}

export interface MainCharacter extends Character {
  info: string
}

export function makeMainCharacter(schema: MainCharacterSchema): MainCharacter {
  return {
    name: schema.name,
    images: schema.images,
    info: schema.info,
  }
}

export interface NPC extends Character {}

export function makeNPC(schema: NPCSchema): NPC {
  return {
    name: schema.name,
    images: schema.images,
  }
}
