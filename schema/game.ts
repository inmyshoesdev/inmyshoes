import {
  array,
  defaulted,
  Infer,
  object,
  optional,
  string,
  size,
  union,
  type,
  refine,
  validate,
} from 'superstruct'
import { TriggerEvents } from '../lib/defined-actions'
import { ActionSchema } from './actions'
import { MainCharacterSchema, NPCSchema } from './character'
import { StateDisplaySchema, StateMeterSchema } from './component'
import { TriggerEventsSchema } from './events'
import { StateSchema } from './state'

const LogoSchema = type({
  src: defaulted(string(), '/images/mainlogo.png'),
  width: defaulted(string(), '150'),
  height: defaulted(string(), '50'),
})
export const AboutSchema = type({
  logo: optional(LogoSchema),
  backgroundMusic: optional(string()),
  credits: optional(string()),
})

export type AboutSchema = Infer<typeof AboutSchema>

const gameSchema = object({
  name: string(),
  about: AboutSchema,
  header: optional(array(union([StateMeterSchema, StateDisplaySchema]))),
  mainCharacters: size(array(MainCharacterSchema), 1, Infinity),
  npcs: defaulted(array(NPCSchema), () => []),
  globalState: optional(StateSchema),
})

export const GameSchema = refine(gameSchema, 'GameSchema', (value) => {
  let valid = true
  let errMsg = ''
  value.mainCharacters.forEach((character) => {
    const eventNames = new Set(character.events.map((event) => event.name))

    const validateActionSchema = (action: ActionSchema) => {
      if (action.type === TriggerEvents) {
        const [err, events] = validate(action['events'], TriggerEventsSchema)

        if (err || !events) {
          valid = false
          errMsg = err?.message || ''
          return
        }

        Object.keys(events).forEach((eventName) => {
          if (!eventNames.has(eventName)) {
            valid = false
            errMsg = `No event with name "${eventName}" found, please ensure all "${TriggerEvents}" actions refer to existing events`
            return
          }
        })
      }
    }

    character.scenes.forEach((scene) => {
      scene.clickables.forEach((clickable) =>
        clickable.options.forEach((option) =>
          option.onClick.forEach(validateActionSchema)
        )
      )
      scene.intro.forEach(validateActionSchema)
      scene.outro.forEach(validateActionSchema)
    })
  })

  if (!valid) {
    return {
      message: errMsg,
    }
  }

  return valid
})

export type GameSchema = Infer<typeof GameSchema>
