import {
  ClickableGroupSchema,
  DialogueSchema,
  ImageSchema,
  LinkSchema,
  NarrationSchema,
  SpeechSchema,
} from '../schema/elements'
import { Action, makeAction } from './actions'
import { Character } from './character'
import { isDefined } from './utils'

// Add a key here and keep the `AllElements` list below in-sync when adding new elements
export const narrations = 'narrations'
export const dialogues = 'dialogues'
export const images = 'images'
export const clickables = 'clickables'
export const links = 'links'

export const allElements = [
  narrations,
  dialogues,
  images,
  clickables,
  links,
] as const

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

export type AfterInteractionCallback = () => (() => void) | undefined // returns a cleanup func or undefined

export interface Element {
  shown: boolean
  name: string
  position: Position
  dimension: Dimension
  afterInteractionCallback?: AfterInteractionCallback
}

export interface Narration extends Element {
  texts: string[]
}

export function makeNarration(schema: NarrationSchema): Narration {
  return {
    shown: false,
    name: schema.name,
    position: schema.position || { top: '10%' }, // TODO: settle on a proper default position
    dimension: schema.dimension || { width: '60%', height: '30%' },
    texts: schema.texts,
  }
}

export interface Speech {
  text: string
  character: string
  characterImage: string
  isMainCharacter: boolean
  type?: string
  textBoxImage?: string
  characterPosition?: Position
  characterDimension?: Dimension
  textPosition?: Position
  textDimension?: Dimension
}

export function makeSpeech(
  schema: SpeechSchema,
  characters: Character[]
): Speech {
  const character = characters.find(
    (character) => character.name === schema.character
  )
  if (!character) throw `no character ${schema.character} found!`

  let characterImage: string = ''
  if (schema.variant) {
    characterImage = character.images[schema.variant]
  }
  if (!characterImage) characterImage = character.images.default

  let isMainCharacter = false
  if ('scenes' in character) isMainCharacter = true

  return {
    text: schema.text,
    character: schema.character,
    characterImage: characterImage,
    isMainCharacter: isMainCharacter,
    type: schema.type,
    textBoxImage: schema.textBoxImage,
    characterPosition: schema.characterPosition,
    characterDimension: schema.characterDimension,
    textPosition: schema.textPosition,
    textDimension: schema.textDimension,
  }
}

export interface Dialogue extends Element {
  speeches: Speech[]
}

export function makeDialogue(
  schema: DialogueSchema,
  characters: Character[]
): Dialogue {
  return {
    shown: false,
    name: schema.name,
    position: schema.position || { bottom: '10%' }, // TODO: settle on a proper default position
    dimension: schema.dimension || {},
    speeches: schema.speeches.map((speech) => makeSpeech(speech, characters)),
  }
}

export interface Image extends Element {
  src: string
  altText?: string
  blendMode?: string
}

export function makeImage(schema: ImageSchema): Image {
  return {
    shown: false,
    name: schema.name,
    position: schema.position || {}, // TODO: settle on a proper default position
    dimension: schema.dimension || {},
    src: schema.src,
    altText: schema.altText,
    blendMode: schema.blendMode,
  }
}

export interface Link extends Element {
  url: string
  text: string
}

export function makeLink(schema: LinkSchema): Link {
  return {
    shown: false,
    name: schema.name,
    position: schema.position || {},
    dimension: schema.dimension || {},
    url: schema.url,
    text: schema.text,
  }
}

type ClickableText = {
  text: string
}

type ClickableImg = {
  src: string
  altText?: string
  blendMode?: string
}
export type Clickable = {
  name: string
  position?: Position
  dimension?: Dimension
  effect?: string
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
  afterInteractionCallback?: AfterInteractionCallback
  clickables: Clickable[]
}

export function makeClickableGroup(
  schema: ClickableGroupSchema,
  sceneId: number
): ClickableGroup {
  return {
    shown: false,
    name: schema.name,
    clickables: schema.options.map((option) => {
      return {
        ...option,
        onClickActions: option.onClick
          .map((x) => makeAction(x, sceneId))
          .filter(isDefined),
      }
    }),
  }
}
