import {
  array,
  boolean,
  Describe,
  lazy,
  nullable,
  number,
  record,
  refine,
  string,
  union,
} from 'superstruct'
import jsonLogic, { RulesLogic } from 'json-logic-js'

export type LogicValue = string | number | boolean | null | LogicValue[]

export const LogicValue: Describe<LogicValue> = nullable(
  union([string(), number(), boolean(), lazy(() => array(LogicValue))])
)

export type LogicSchema = {
  [key: string]: LogicValue | LogicSchema | (LogicValue | LogicSchema)[]
}

const logicSchema: Describe<LogicSchema> = record(
  string(),
  union([
    union([LogicValue, lazy(() => LogicSchema)]),
    array(union([LogicValue, lazy(() => LogicSchema)])),
  ])
)

export const LogicSchema = refine<LogicSchema, null>(
  logicSchema,
  'LogicSchema',
  (value) => {
    const len = Object.keys(value).length
    if (len !== 1) {
      return {
        message: `JsonLogic Error: must have only 1 operator, found ${len}`,
      }
    }

    try {
      jsonLogic.apply(value as RulesLogic)
    } catch (e) {
      return { message: `JsonLogic ${e}` }
    }
    return true
  }
)
