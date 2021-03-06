import { RulesLogic } from 'json-logic-js'
import {
  ClickableGroupSchema,
  ClickableItemSchema,
  DialogType,
  DialogueSchema,
  ImageSchema,
  LinkSchema,
  NarrationSchema,
  SpeechSchema,
} from '../schema/elements'
import { EventSchema } from '../schema/events'
import { Action, compileActions } from './actions'
import { Character } from './character'
import { evalCondition, makeLogic } from './logic'
import { State } from './state'

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

export type AfterInteractionCallback = () => void
export interface Element {
  shown: boolean
  name: string
  position: Position
  dimension: Dimension
  afterInteractionCallback?: AfterInteractionCallback
}

export interface Narration extends Element {
  texts: string[]
  textBoxImage?: string
  showNavigations?: boolean
}

export function makeNarration(schema: NarrationSchema): Narration {
  return {
    shown: false,
    name: schema.name,
    position: schema.position || { top: '10%', left: '20%' }, // TODO: settle on a proper default position
    dimension: schema.dimension || { height: '30%' },
    texts: schema.texts,
    textBoxImage: schema.textBoxImage,
    showNavigations: schema.showNavigations,
  }
}

export interface Speech {
  text: string
  character: string
  characterImage: string
  isMainCharacter: boolean
  type?: DialogType
  textBoxImage?: string
  characterPosition?: Position
  characterDimension?: Dimension
  textPosition?: Position
  textDimension?: Dimension
  showNavigations?: boolean
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
    textDimension: schema.textDimension || { height: '32%' },
    showNavigations: schema.showNavigations,
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
  effect?: string
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
    effect: schema.effect,
  }
}

export interface Link extends Element {
  url: string
  text: string
  effect?: string
}

export function makeLink(schema: LinkSchema): Link {
  return {
    shown: false,
    name: schema.name,
    position: schema.position || {},
    dimension: schema.dimension || {},
    url: schema.url,
    text: schema.text,
    effect: schema.effect,
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
  disabledCondition?: RulesLogic
  disabledLabel?: string
  isDisabled(globalState: State, currSceneState?: State): boolean | undefined
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
  sceneId: number,
  eventSchemas: Map<string, EventSchema>
): ClickableGroup {
  return {
    shown: false,
    name: schema.name,
    clickables: schema.options.map((option) => {
      const onClickActions = compileActions(
        option.onClick,
        sceneId,
        eventSchemas
      )
      return makeClickable(option, onClickActions)
    }),
  }
}

function makeClickable(
  schema: ClickableItemSchema,
  onClickActions: Action[]
): Clickable {
  return {
    ...schema,
    onClickActions: onClickActions,
    disabledCondition: makeLogic(schema.disabled?.if),
    disabledLabel: schema.disabled?.label,
    isDisabled(
      globalState: State,
      currSceneState?: State
    ): boolean | undefined {
      if (!this.disabledCondition) {
        return undefined
      } else {
        return evalCondition(
          this.disabledCondition,
          globalState,
          currSceneState
        )
      }
    },
  }
}
