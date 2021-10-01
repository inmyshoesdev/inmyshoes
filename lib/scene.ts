import { SceneSchema } from '../schema/scene'
import { Action, makeAction } from './actions'
import {
  Clickable,
  Dialogue,
  Image,
  makeClickable,
  makeDialogue,
  makeImage,
  makeNarration,
  Narration,
} from './elements'
import { State } from './state'
import { isDefined } from './utils'

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
  }
}
