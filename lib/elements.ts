import {
  ClickableGroupSchema,
  DialogueSchema,
  ImageSchema,
  NarrationSchema,
  SpeechSchema,
} from '../schema/elements'
import { Action, makeAction } from './actions'
import { isDefined } from './utils'

// Add a key here and keep the `AllElements` list below in-sync when adding new elements
export const narrations = 'narrations'
export const dialogues = 'dialogues'
export const images = 'images'
export const clickables = 'clickables'

export const allElements = [narrations, dialogues, images, clickables] as const

export type Position = {
  top?: string
  left?: string
  bottom?: string
  right?: string
}

export type Dimension = {
  width?: string
  height?: string
}

export type ShowArgs = { position?: Position }

export interface Element {
  shown: boolean
  name: string
  position: Position
  afterInteractionCallback?: () => () => void
}

export interface Narration extends Element {
  text: string
}

export function makeNarration(schema: NarrationSchema): Narration {
  return {
    shown: false,
    name: schema.name,
    position: schema.position || { top: '10%' }, // TODO: settle on a proper default position
    text: schema.text,
  }
}

// TODO: Change character from string to object
export interface Speech {
  text: string
  character: string
}

export function makeSpeech(schema: SpeechSchema): Speech {
  return {
    text: schema.text,
    character: schema.character,
  }
}

export interface Dialogue extends Element {
  speeches: Speech[]
}

export function makeDialogue(schema: DialogueSchema): Dialogue {
  return {
    shown: false,
    name: schema.name,
    position: schema.position || { bottom: '10%' }, // TODO: settle on a proper default position
    speeches: schema.speeches.map((speech) => makeSpeech(speech)),
  }
}

export interface Image extends Element {
  src: string
  altText?: string
}

export function makeImage(schema: ImageSchema): Image {
  return {
    shown: false,
    name: schema.name,
    position: schema.position || {}, // TODO: settle on a proper default position
    src: schema.src,
    altText: schema.altText,
  }
}
type ClickableText = {
  text: string
}

type ClickableImg = {
  src: string
  altText?: string
}
export type Clickable = {
  name: string
  position?: Position
  dimension?: Dimension
  onClickActions: Action[]
} & (ClickableText | ClickableImg)

export function isClickableText(
  clickable: Clickable
): clickable is Clickable & ClickableText {
  return 'text' in clickable
}

export function isClickableImg(
  clickable: Clickable
): clickable is Clickable & ClickableImg {
  return 'src' in clickable
}

export interface ClickableGroup {
  shown: boolean
  name: string
  afterInteractionCallback?: () => () => void
  clickables: Clickable[]
}

export function makeClickableGroup(
  schema: ClickableGroupSchema,
  sceneId: number
): ClickableGroup {
  return {
    shown: false,
    name: schema.name,
    clickables: schema.clickables.map((clickable) => {
      return {
        ...clickable,
        onClickActions: clickable.onClick
          .map((x) => makeAction(x, sceneId))
          .filter(isDefined),
      }
    }),
  }
}
