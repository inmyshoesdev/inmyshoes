import { SceneSchema } from '../schema/scene'
import { Action, makeAction } from './actions'
import { Clickable, Dialogue, Image, Narration } from './elements'
import { State } from './state'
import { isDefined } from './utils'

export class Scene {
  id: number
  background: string
  backgroundAltText?: string | undefined

  narrations: Map<string, Narration>
  dialogues: Map<string, Dialogue>
  images: Map<string, Image>
  clickables: Map<string, Clickable>

  execute: (...actions: Action[]) => () => void
  intro: Action[]
  outro: Action[]

  state: State

  constructor(
    schema: SceneSchema,
    executeActions: (...actions: Action[]) => () => void
  ) {
    this.id = schema.id
    this.background = schema.background
    this.backgroundAltText = schema.backgroundAltText

    this.narrations = new Map(
      schema.narrations.map((narrationSchema) => [
        narrationSchema.name,
        new Narration(narrationSchema),
      ])
    )

    this.dialogues = new Map(
      schema.dialogues.map((dialogueSchema) => [
        dialogueSchema.name,
        new Dialogue(dialogueSchema),
      ])
    )

    this.images = new Map(
      schema.images.map((imageSchema) => [
        imageSchema.name,
        new Image(imageSchema),
      ])
    )

    this.clickables = new Map(
      schema.clickables.map((clickableSchema) => [
        clickableSchema.name,
        new Clickable(clickableSchema, this.id, executeActions),
      ])
    )

    this.execute = executeActions
    this.intro = schema.intro.map(x => makeAction(x, this.id)).filter(isDefined)
    this.outro = schema.outro.map(x => makeAction(x, this.id)).filter(isDefined)

    this.state = new State(schema.state)
  }

  executeIntro() {
    return this.execute(...this.intro)
  }

  executeOutro() {
    return this.execute(...this.outro)
  }

  getNarration(name: string): Narration | undefined {
    return this.narrations.get(name)
  }

  getDialogue(name: string): Dialogue | undefined {
    return this.dialogues.get(name)
  }

  getImage(name: string): Image | undefined {
    return this.images.get(name)
  }

  getClickable(name: string): Clickable | undefined {
    return this.clickables.get(name)
  }
}
