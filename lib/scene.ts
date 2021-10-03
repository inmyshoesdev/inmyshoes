import { SceneSchema } from '../schema/scene'
import { Action, makeAction } from './actions'
import {
  allElements,
  Clickable,
  clickables,
  Dialogue,
  dialogues,
  Image,
  images,
  makeClickable,
  makeDialogue,
  makeImage,
  makeNarration,
  Narration,
  narrations,
} from './elements'
import { State } from './state'
import { isDefined } from './utils'

export type ElementKeys = typeof allElements[number]

export function isElementKey(s: string): s is ElementKeys {
  return (allElements as readonly string[]).includes(s)
}

export type ElementValues = Scene[ElementKeys][0]

export type ElementValueFor<T extends ElementKeys> = Scene[T][0]

export interface Scene {
  id: number
  background: string
  backgroundAltText?: string | undefined

  // use the defined element keys to index Scene
  [narrations]: Narration[]
  [dialogues]: Dialogue[]
  [images]: Image[]
  [clickables]: Clickable[]

  intro: Action[]
  outro: Action[]

  state: State

  getElement<T extends ElementKeys>(
    name: string,
    type: T
  ): ElementValueFor<T> | undefined
}

export function makeScene(schema: SceneSchema): Scene {
  const id = schema.id

  return {
    id: schema.id,
    background: schema.background,
    backgroundAltText: schema.backgroundAltText,

    [narrations]: schema.narrations.map((narrationSchema) =>
      makeNarration(narrationSchema)
    ),

    [dialogues]: schema.dialogues.map((dialogueSchema) =>
      makeDialogue(dialogueSchema)
    ),

    [images]: schema.images.map((imageSchema) => makeImage(imageSchema)),

    [clickables]: schema.clickables.map((clickableSchema) =>
      makeClickable(clickableSchema, id)
    ),

    intro: schema.intro.map((x) => makeAction(x, id)).filter(isDefined),
    outro: schema.outro.map((x) => makeAction(x, id)).filter(isDefined),

    state: { ...(schema.state ?? {}) },

    getElement<T extends ElementKeys>(
      name: string,
      type: T
    ): ElementValueFor<T> | undefined {
      return (this[type] as ElementValueFor<T>[])?.find((x) => x.name === name)
    },
  }
}
