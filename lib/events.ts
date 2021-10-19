import { EventSchema } from '../schema/events'
import { Character } from './character'
import { HideActions, ShowActions } from './defined-actions'
import {
  clickables,
  dialogues,
  images,
  links,
  makeClickableGroup,
  makeDialogue,
  makeImage,
  makeLink,
  makeNarration,
  narrations,
} from './elements'
import { ElementKeys, ElementValueFor, NoBackground, Scene } from './scene'
import { makeState } from './state'

export const EventsSceneId = -1000

// returns the "EventScene", a scene with all the elements for the event,
// and a map of event names to the event schema
export function compileEvents(
  schema: EventSchema[],
  characters: Character[]
): [Scene, Map<string, EventSchema>] {
  // create a map of event name to the event
  const map = new Map<string, EventSchema>(
    schema.map((event) => {
      const sequence = event.sequence.map((action) => {
        const { type, duration, if: condition, ...args } = action

        // override the value in show/hide actions to point to the new
        // element names
        if (type in HideActions || type in ShowActions) {
          const newArgs = { ...args, value: `${event.name}_${args.value}` }
          return { ...action, ...newArgs }
        }

        return action
      })

      return [event.name, { ...event, sequence }]
    })
  )

  // combine the elements from all the events into 1 scene, which will
  // be overlayed on top of the normal scene. to prevent name collisions,
  // with prefix the element name with the name of the event, which should
  // be unique.
  const eventNarrations = schema.flatMap((event) =>
    event.narrations.map((narration) => {
      return makeNarration({
        ...narration,
        name: `${event.name}_${narration.name}`,
      })
    })
  )

  const eventDialogues = schema.flatMap((event) =>
    event.dialogues.map((dialogue) => {
      return makeDialogue(
        { ...dialogue, name: `${event.name}_${dialogue.name}` },
        characters
      )
    })
  )

  const eventImages = schema.flatMap((event) =>
    event.images.map((images) => {
      return makeImage({ ...images, name: `${event.name}_${images.name}` })
    })
  )

  const eventClickables = schema.flatMap((event) =>
    event.clickables.map((clickable) => {
      return makeClickableGroup(
        { ...clickable, name: `${event.name}_${clickable.name}` },
        EventsSceneId,
        map
      )
    })
  )

  const eventLinks = schema.flatMap((event) =>
    event.links.map((links) => {
      return makeLink({ ...links, name: `${event.name}_${links.name}` })
    })
  )

  const eventScene: Scene = {
    id: EventsSceneId,
    background: NoBackground,

    [narrations]: eventNarrations,
    [dialogues]: eventDialogues,
    [images]: eventImages,
    [clickables]: eventClickables,
    [links]: eventLinks,

    intro: [],
    outro: [],

    state: makeState({}),

    getElement<T extends ElementKeys>(
      name: string,
      type: T
    ): ElementValueFor<T> | undefined {
      return (this[type] as ElementValueFor<T>[])?.find((x) => x.name === name)
    },
  }

  return [eventScene, map]
}
