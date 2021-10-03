import {
  ClickableSchema,
  DialogueSchema,
  ImageSchema,
  NarrationSchema,
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
  top?: string | undefined
  left?: string | undefined
  bottom?: string | undefined
  right?: string | undefined
}

export type ShowArgs = { position: Position | undefined }

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

export interface Dialogue extends Element {
  text: string
  character: string
}

export function makeDialogue(schema: DialogueSchema): Dialogue {
  return {
    shown: false,
    name: schema.name,
    position: schema.position || { bottom: '10%' }, // TODO: settle on a proper default position
    text: schema.text,
    character: schema.character,
  }
}

export interface Image extends Element {
  src: string
  altText: string | undefined
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

export type ClickableOption = {
  name: string
  onClickActions: Action[]
} & ({ text: string } | { src: string; altText?: string | undefined })

export function isClickableText(
  option: ClickableOption
): option is ClickableOption & { text: string } {
  return 'text' in option
}

export function isClickableImg(
  option: ClickableOption
): option is ClickableOption & { src: string; altText?: string | undefined } {
  return 'src' in option
}

export interface Clickable extends Element {
  options: ClickableOption[]
}

export function makeClickable(
  schema: ClickableSchema,
  sceneId: number
): Clickable {
  return {
    shown: false,
    name: schema.name,
    position: schema.position || {}, // TODO: settle on a proper default position
    options: schema.options.map((option) => {
      return {
        ...option,
        onClickActions: option.onClick
          .map((x) => makeAction(x, sceneId))
          .filter(isDefined),
      }
    }),
  }
}
