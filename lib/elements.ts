import {
  ClickableSchema,
  DialogueSchema,
  ImageSchema,
  NarrationSchema,
} from '../schema/elements'
import { Action, makeAction } from './actions'
import { isDefined } from './utils'

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
  show(args: ShowArgs): void
  hide(): void
}

export class Narration implements Element {
  shown: boolean
  name: string
  position: Position
  text: string

  constructor(schema: NarrationSchema) {
    this.shown = false
    this.name = schema.name
    this.position = schema.position || { top: '10%' } // TODO: settle on a proper default position
    this.text = schema.text
  }

  show({ position }: ShowArgs): void {
    this.shown = true
    if (position) {
      this.position = position
    }
  }

  hide(): void {
    this.shown = false
  }
}

export class Dialogue implements Element {
  shown: boolean
  name: string
  position: Position
  text: string
  character: string

  constructor(schema: DialogueSchema) {
    this.shown = false
    this.name = schema.name
    this.position = schema.position || { bottom: '10%' } // TODO: settle on a proper default position
    this.text = schema.text
    this.character = schema.character
  }

  show({ position }: ShowArgs): void {
    this.shown = true
    if (position) {
      this.position = position
    }
  }

  hide(): void {
    this.shown = false
  }
}

export class Image implements Element {
  shown: boolean
  name: string
  position: Position
  src: string
  altText: string | undefined

  constructor(schema: ImageSchema) {
    this.shown = false
    this.name = schema.name
    this.position = schema.position || {} // TODO: settle on a proper default position
    this.src = schema.src
    this.altText = schema.altText
  }

  show({ position }: ShowArgs): void {
    this.shown = true
    if (position) {
      this.position = position
    }
  }

  hide(): void {
    this.shown = false
  }
}

export type ClickableOption = {
  name: string
  onClick: () => () => void // returns a cleanup function
} & ({ text: string } | { src: string; altText?: string | undefined })

export class Clickable implements Element {
  shown: boolean
  name: string
  position: Position
  options: ClickableOption[]

  constructor(
    schema: ClickableSchema,
    sceneId: number,
    executeActions: (...actions: Action[]) => () => void
  ) {
    this.shown = false
    this.name = schema.name
    this.position = schema.position || {} // TODO: settle on a proper default position
    this.options = schema.options.map((option) => {
      return {
        ...option,
        onClick: () =>
          executeActions(
            ...option.onClick
              .map((x) => makeAction(x, sceneId))
              .filter(isDefined)
          ),
      }
    })
  }

  show({ position }: ShowArgs): void {
    this.shown = true
    if (position) {
      this.position = position
    }
  }

  hide(): void {
    this.shown = false
  }
}
