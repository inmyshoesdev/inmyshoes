import { SceneSchema } from '../schema/scene'
import { Action, makeAction } from './actions'
import {
  Clickable,
  Dialogue,
  Element,
  Image,
  makeClickable,
  makeDialogue,
  makeImage,
  makeNarration,
  Narration,
} from './elements'
import { State } from './state'
import { isDefined } from './utils'

type ElementKeys = NonNullable<
  {
    [Key in keyof Scene]: Scene[Key] extends Element[] ? Key : never
  }[keyof Scene]
>

type ElementValues = Scene[ElementKeys][0]

export interface Scene {
  id: number
  background: string
  backgroundAltText?: string | undefined

  narrations: Narration[]
  dialogues: Dialogue[]
  images: Image[]
  clickables: Clickable[]

  intro: Action[]
  outro: Action[]

  state: State

  getElement<T extends ElementValues>(
    name: string,
    type: {
      [Key in keyof Scene]: T[] extends Scene[Key]
        ? Scene[Key] extends T[]
          ? Key
          : never
        : never
    }[ElementKeys]
  ): T | undefined
}

export function makeScene(schema: SceneSchema): Scene {
  let id = schema.id

  return {
    id: schema.id,
    background: schema.background,
    backgroundAltText: schema.backgroundAltText,

    narrations: schema.narrations.map((narrationSchema) =>
      makeNarration(narrationSchema)
    ),

    dialogues: schema.dialogues.map((dialogueSchema) =>
      makeDialogue(dialogueSchema)
    ),

    images: schema.images.map((imageSchema) => makeImage(imageSchema)),

    clickables: schema.clickables.map((clickableSchema) =>
      makeClickable(clickableSchema, id)
    ),

    intro: schema.intro.map((x) => makeAction(x, id)).filter(isDefined),
    outro: schema.outro.map((x) => makeAction(x, id)).filter(isDefined),

    state: { ...(schema.state ?? {}) },

    getElement<T extends ElementValues>(
      name: string,
      type: {
        [Key in keyof Scene]: T[] extends Scene[Key]
          ? Scene[Key] extends T[]
            ? Key
            : never
          : never
      }[ElementKeys]
    ): T | undefined {
      return (this[type] as T[]).find((x) => x.name === name)
    },
  }
}
