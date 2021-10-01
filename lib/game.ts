import { GameSchema } from '../schema/game'
import { Clickable, Dialogue, Image, Narration } from './elements'
import { makeScene, Scene } from './scene'

import { State } from './state'

export const EmptyGame: Game = {
  name: '',
  currentSceneId: 0,
  globalState: {},
  scenes: [] as Scene[],
}

export interface Game {
  name: string
  currentSceneId: number
  globalState: State
  scenes: Scene[]
}

export function makeGame(schema: GameSchema): Game {
  return {
    name: schema.name,
    currentSceneId: schema.scenes[0].id,
    globalState: { ...(schema.globalState ?? {}) },
    scenes: schema.scenes.map((schema) => makeScene(schema)),
  }
}

export function getNarration(
  game: Game,
  sceneId: number,
  name: string
): Narration | undefined {
  return game.scenes
    .find((scene) => scene.id === sceneId)
    ?.narrations.find((x) => x.name === name)
}

export function getDialogue(
  game: Game,
  sceneId: number,
  name: string
): Dialogue | undefined {
  return game.scenes
    .find((scene) => scene.id === sceneId)
    ?.dialogues.find((x) => x.name === name)
}

export function getImage(
  game: Game,
  sceneId: number,
  name: string
): Image | undefined {
  return game.scenes
    .find((scene) => scene.id === sceneId)
    ?.images.find((x) => x.name === name)
}

export function getClickable(
  game: Game,
  sceneId: number,
  name: string
): Clickable | undefined {
  return game.scenes
    .find((scene) => scene.id === sceneId)
    ?.clickables.find((x) => x.name === name)
}
