import { RulesLogic, apply } from 'json-logic-js'
import { LogicSchema } from '../schema/logic'
import { getStateTemplater, State } from './state'
import { tryConvertBool, tryConvertNumeric } from './utils'

export function makeLogic(schema?: LogicSchema): RulesLogic | undefined {
  if (!schema) {
    return undefined
  }
  return schema as RulesLogic
}

export function evalCondition(
  condition: RulesLogic,
  globalState: State,
  currSceneState?: State
): boolean {
  const templater = getStateTemplater(globalState, currSceneState)
  const templatedCondition = templateLogic(condition, templater) as RulesLogic

  const result = apply(templatedCondition, {
    ...globalState,
    ...currSceneState,
  })

  if (typeof result !== 'boolean') {
    return false
  }

  return result
}

function templateLogic(logic: any, templater: (s: string) => string): any {
  // if is primitive, just return the value. if it is a string,
  // template before returning
  if (typeof logic !== 'object') {
    if (typeof logic === 'string') {
      const res = templater(logic)

      // try converting to the actual values. for example, if templated
      // into "5", we want the actual value to be 5
      const [num, numSuccess] = tryConvertNumeric(res)
      if (numSuccess) {
        return num
      }

      const [bool, boolSuccess] = tryConvertBool(res)
      if (boolSuccess) {
        return bool
      }

      return res
    }

    return logic
  }

  if (Array.isArray(logic)) {
    return logic.map((item) => templateLogic(item, templater))
  }

  // otherwise, it is an object. recurse on each key-value pair
  // of the object.
  const obj: Record<string, any> = {}
  for (const [key, val] of Object.entries(logic)) {
    obj[key] = templateLogic(val, templater)
  }

  return obj
}
