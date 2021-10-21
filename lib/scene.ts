import { EventSchema } from '../schema/events'
import { SceneSchema } from '../schema/scene'
import { Action, compileActions } from './actions'
import { Character } from './character'
import {
  allElements,
  ClickableGroup,
  clickables,
  Dialogue,
  dialogues,
  Image,
  images,
  Link,
  links,
  makeClickableGroup,
  makeDialogue,
  makeImage,
  makeLink,
  makeNarration,
  Narration,
  narrations,
} from './elements'
import { makeState, State } from './state'

export type ElementKeys = typeof allElements[number]

export function isElementKey(s: string): s is ElementKeys {
  return (allElements as readonly string[]).includes(s)
}

export type ElementValues = Scene[ElementKeys][0]

export type ElementValueFor<T extends ElementKeys> = Scene[T][0]

export const NoBackground = 'none'

export interface Scene {
  id: number
  background: string
  backgroundAltText?: string | undefined
  blurBackground: boolean

  // use the defined element keys to index Scene
  [narrations]: Narration[]
  [dialogues]: Dialogue[]
  [images]: Image[]
  [clickables]: ClickableGroup[]
  [links]: Link[]

  intro: Action[]
  outro: Action[]

  state: State

  getElement<T extends ElementKeys>(
    name: string,
    type: T
  ): ElementValueFor<T> | undefined
}

export function makeScene(
  schema: SceneSchema,
  characters: Character[],
  eventSchemas: Map<string, EventSchema>
): Scene {
  const id = schema.id

  return {
    id: schema.id,
    background: schema.background,
    backgroundAltText: schema.backgroundAltText,
    blurBackground: false,

    [narrations]: schema.narrations.map((narrationSchema) =>
      makeNarration(narrationSchema)
    ),

    [dialogues]: schema.dialogues.map((dialogueSchema) =>
      makeDialogue(dialogueSchema, characters)
    ),

    [images]: schema.images.map((imageSchema) => makeImage(imageSchema)),

    [clickables]: schema.clickables.map((clickableGroupSchema) =>
      makeClickableGroup(clickableGroupSchema, id, eventSchemas)
    ),

    [links]: schema.links.map((linkSchema) => makeLink(linkSchema)),

    intro: compileActions(schema.intro, id, eventSchemas),
    outro: compileActions(schema.outro, id, eventSchemas),

    state: makeState(schema.state ?? {}),

    getElement<T extends ElementKeys>(
      name: string,
      type: T
    ): ElementValueFor<T> | undefined {
      return (this[type] as ElementValueFor<T>[])?.find((x) => x.name === name)
    },
  }
}
