import {
  array,
  defaulted,
  Infer,
  object,
  optional,
  string,
  size,
  union,
  refine,
  validate,
} from 'superstruct'
import { TriggerEvents } from '../lib/defined-actions'
import { MainCharacterSchema, NPCSchema } from './character'
import { StateDisplaySchema, StateMeterSchema } from './component'
import { TriggerEventsSchema } from './events'
import { StateSchema } from './state'

const gameSchema = object({
  name: string(),
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

    character.scenes.forEach((scene) => {
      scene.intro.forEach((action) => {
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
      })
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
