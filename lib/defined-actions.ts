import { RulesLogic } from 'json-logic-js'
import {
  array,
  boolean,
  defaulted,
  map,
  max,
  min,
  number,
  object,
  optional,
  record,
  string,
  union,
  validate,
} from 'superstruct'
import { Howl } from 'howler'
import { ActionSchema } from '../schema/actions'
import { EventSchema, TriggerEventsSchema } from '../schema/events'
import { Action, ActionArgs, ActionReturnType, compileActions } from './actions'
import { EventsSceneId } from './events'
import { makeLogic } from './logic'
import { ElementKeys } from './scene'
import { UpdateStateValues } from './state'
import { isDefined, shuffleArray } from './utils'

type ActionDefinition<TArgs> = {
  validateArgs: (args: unknown) => [Error, undefined] | [undefined, TArgs]
  execute: (args: ActionArgs<TArgs>) => ActionReturnType | void
}

const elements: {
  [K in 'Narration' | 'Dialogue' | 'Image' | 'Clickable' | 'Link']: ElementKeys
} = {
  Narration: 'narrations',
  Dialogue: 'dialogues',
  Image: 'images',
  Clickable: 'clickables',
  Link: 'links',
}

type ShowActionArgs = {
  value: string
  waitForInteraction: boolean
  autoHide: boolean
}

type HideActionArgs = { value: string }

export const ShowActions: {
  readonly [K in keyof typeof elements as `show${K}`]: ActionDefinition<ShowActionArgs>
} = {
  showNarration: show('narrations'),
  showDialogue: show('dialogues'),
  showImage: show('images'),
  showClickable: show('clickables'),
  showLink: show('links'),
}

export const HideActions: {
  readonly [K in keyof typeof elements as `hide${K}`]: ActionDefinition<HideActionArgs>
} = {
  hideNarration: hide('narrations'),
  hideDialogue: hide('dialogues'),
  hideImage: hide('images'),
  hideClickable: hide('clickables'),
  hideLink: hide('links'),
}

export function isDefinedAction(
  type: string
): type is keyof DefinedActionsToArgs {
  return type in DefinedActions
}

// names of some events that are used elsewhere
export const TriggerEvents = 'triggerEvents'
export const ExecuteActionGroup = 'executeActionGroup'

// Add all actions here!
export type DefinedActionsToArgs = {
  gotoScene: { sceneId: number }
  wait: any
  updateState: { newState: UpdateStateValues }
  updateGlobalState: { newState: UpdateStateValues }
  resetGlobalState: any
  reselectCharacter: any
  playSound: { src: string; volume: number; interrupt: boolean }
  blurBackground: any
  deblurBackground: any
  toggleBackgroundBlur: any
  [ExecuteActionGroup]: { actions: ActionSchema[] }
  [TriggerEvents]: {
    events: TriggerEventsSchema
    eventSchemas: Map<string, EventSchema> // not provided by user
    maxTriggered?: number
  }
} & {
  [K in keyof typeof ShowActions]: ShowActionArgs
} & {
  [K in keyof typeof HideActions]: HideActionArgs
}

// Add implementation of the actions here!
export const DefinedActions: {
  readonly [K in keyof DefinedActionsToArgs]: ActionDefinition<
    DefinedActionsToArgs[K]
  >
} = {
  // TODO: consider cancelling or not accepting any actions that come
  // after a gotoScene action, may lead to weird unforseen circumstances
  gotoScene: {
    validateArgs(args: unknown) {
      return validate(args, object({ sceneId: number() }))
    },

    execute({ args, game }) {
      const { sceneId } = args
      if (typeof sceneId === 'number') {
        game.currentSceneId = sceneId
      }
    },
  },

  wait: {
    validateArgs: UnitValidator,
    execute() {},
  },

  updateState: {
    validateArgs(args: unknown) {
      return validate(
        args,
        object({
          newState: record(string(), union([string(), number(), boolean()])),
        })
      )
    },

    execute({ args, scene }) {
      const { newState = {} } = args
      scene.state.update(newState)
    },
  },

  updateGlobalState: {
    validateArgs(args: unknown) {
      return validate(
        args,
        object({
          newState: record(string(), union([string(), number(), boolean()])),
        })
      )
    },

    execute({ args, game }) {
      const { newState = {} } = args
      game.globalState.update(newState)
    },
  },

  resetGlobalState: {
    validateArgs: UnitValidator,
    execute({ game }) {
      game.globalState.reset()
    },
  },

  reselectCharacter: {
    validateArgs: UnitValidator,
    execute({ game }) {
      game.characterSelected = false
    },
  },

  playSound: {
    validateArgs(args: unknown) {
      return validate(
        args,
        object({
          src: string(),
          volume: defaulted(max(min(number(), 0), 1), 1),
          interrupt: defaulted(boolean(), false),
        }),
        { coerce: true }
      )
    },

    execute: ((): ((
      args: ActionArgs<DefinedActionsToArgs['playSound']>
    ) => ActionReturnType | void) => {
      let sound: Howl | undefined

      return ({ args }) => {
        const { src, volume, interrupt } = args

        if (interrupt && sound) {
          sound.stop()
        }

        sound = new Howl({ src, volume })
        sound.play()
      }
    })(),
  },

  blurBackground: {
    validateArgs: UnitValidator,
    execute({ game }) {
      const scene = game.getScene(game.currentSceneId)

      if (scene) {
        scene.blurBackground = true
      }
    },
  },

  deblurBackground: {
    validateArgs: UnitValidator,
    execute({ game }) {
      const scene = game.getScene(game.currentSceneId)

      if (scene) {
        scene.blurBackground = false
      }
    },
  },

  toggleBackgroundBlur: {
    validateArgs: UnitValidator,
    execute({ game }) {
      const scene = game.getScene(game.currentSceneId)

      if (scene) {
        scene.blurBackground = !scene.blurBackground
      }
    },
  },

  [ExecuteActionGroup]: {
    validateArgs(args: unknown) {
      return validate(args, object({ actions: array(ActionSchema) }), {
        coerce: true,
      })
    },
    execute: executeActionGroup,
  },

  [TriggerEvents]: {
    validateArgs(args: unknown) {
      return validate(
        args,
        object({
          events: TriggerEventsSchema,
          eventSchemas: map(string(), EventSchema),
          maxTriggered: optional(number()),
        }),
        {
          coerce: true,
        }
      )
    },

    execute({ args }) {
      const { events, eventSchemas, maxTriggered } = args

      let actions = Object.entries(events)
        .map(([eventName, { chance }]) => {
          const eventSchema = eventSchemas.get(eventName)
          if (!eventSchema) {
            return undefined
          }

          if (Math.random() * 100 > chance) {
            return undefined
          }

          const action: Action<{ actions: ActionSchema[] }> = {
            name: ExecuteActionGroup,
            duration: 0,
            args: { actions: eventSchema.sequence },
            sceneId: EventsSceneId,
            execute: executeActionGroup,
            condition: makeLogic(eventSchema.if),
          }
          return action
        })
        .filter(isDefined)

      if (maxTriggered !== undefined) {
        // take the first n elements from a randomly shuffled array of indices
        // for the actions, where n === maxTriggered
        let indices = Array.from(Array(actions.length).keys())
        shuffleArray(indices)
        indices = indices.slice(0, maxTriggered)

        // take the actions corresponding to those indices, sorted. this ensures a
        // fair chance for each event to be triggered, while at the same time
        // respecting the ordering of events.
        actions = indices.sort().map((idx) => actions[idx])
      }

      return {
        followupActions: actions,
      }
    },
  },

  ...ShowActions,
  ...HideActions,
}

function show(elementKey: ElementKeys): ActionDefinition<ShowActionArgs> {
  return {
    validateArgs(args: unknown) {
      return validate(
        args,
        object({
          value: string(),
          waitForInteraction: defaulted(boolean(), true),
          autoHide: defaulted(boolean(), true),
        }),
        { coerce: true }
      )
    },
    execute({
      args,
      scene,
      afterInteractionCallback,
      duration,
    }: ActionArgs<ShowActionArgs>) {
      const { value, autoHide, waitForInteraction } = args

      const element = scene.getElement(value, elementKey)
      if (!element) {
        console.warn(
          `no element of type "${elementKey}" called ${value} to show`
        )
        return
      }

      // if (position) {
      //   element.position = position
      // }
      element.shown = true

      // set the after interaction callback if required
      if (afterInteractionCallback) {
        element.afterInteractionCallback = afterInteractionCallback
      }

      if (autoHide && (duration != 0 || waitForInteraction)) {
        let [name, _] = Object.entries(elements).find(
          ([_, key]) => key === elementKey
        ) ?? ['']

        return {
          followupActions: [
            {
              name: `hide${name}`,
              duration: 0,
              args: { value },
              sceneId: scene.id,
              execute: hide(elementKey).execute,
            },
          ],
        }
      }
    },
  }
}

function hide(elementKey: ElementKeys): ActionDefinition<HideActionArgs> {
  return {
    validateArgs(args: unknown) {
      return validate(args, object({ value: string() }))
    },
    execute({ args, scene }: ActionArgs<HideActionArgs>) {
      const { value } = args

      const element = scene.getElement(value, elementKey)
      if (element) {
        element.shown = false
      } else {
        console.warn(
          `no element of type "${elementKey}" called ${value} to hide`
        )
      }
    },
  }
}

function executeActionGroup({
  args,
  scene,
}: ActionArgs<{ actions: ActionSchema[] }>): void | ActionReturnType {
  const { actions: actionSchemas } = args

  const actions = compileActions(actionSchemas, scene.id)

  return {
    followupActions: actions,
  }
}

function UnitValidator(args: unknown): [undefined, any] {
  return [undefined, args as any]
}
