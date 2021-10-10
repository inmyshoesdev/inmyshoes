export type StateObj = {
  value: string | number | boolean
  min?: number
  max?: number
}

export type StateMap = Record<string, StateObj>

export type UpdateStateValues = Record<string, string | number | boolean>

export interface State {
  innerState: StateMap
  hasKey(key: string): boolean
  get(key: string): string | number | boolean | undefined
  update(newState: UpdateStateValues): void
}

export function makeState(state: any): State {
  let stateMap: StateMap = {}
  for (const [key, val] of Object.entries(state)) {
    switch (typeof val) {
      case 'string':
      case 'number':
      case 'boolean':
        stateMap[key] = { value: val } as StateObj
        continue
      default:
        stateMap[key] = val as StateObj
    }
  }

  return {
    innerState: stateMap,

    hasKey(key: string): boolean {
      return key in this.innerState
    },

    get(key: string): string | number | boolean | undefined {
      return this.innerState[key].value
    },

    update(newState: UpdateStateValues) {
      for (const [key, val] of Object.entries(newState)) {
        if (key in this.innerState) {
          if (
            typeof val === 'number' &&
            typeof this.innerState[key].value === 'number'
          ) {
            let newValue = (this.innerState[key].value as number) + val
            let min = this.innerState[key].min
            let max = this.innerState[key].max
            if (min && newValue < min) {
              newValue = min
            } else if (max && newValue > max) {
              newValue = max
            }
            ;(this.innerState[key].value as number) = newValue
            continue
          }

          if (
            typeof val === 'string' &&
            typeof this.innerState[key].value === 'string'
          ) {
            this.innerState[key].value = val
            continue
          }

          if (
            typeof val === 'boolean' &&
            typeof this.innerState[key].value === 'boolean'
          ) {
            this.innerState[key].value = val
            continue
          }

          console.warn(
            `update of type ${typeof val} applied to key "${key}" in state, expected ${typeof this
              .innerState[key].value}`
          )
          continue
        }

        console.warn(`update applied with non-existent key "${key}"`)
      }
    },
  }
}

const fallbacks = new Map<string, Map<string, string | number | boolean>>()

export function getStateTemplater(globalState: State, currSceneState?: State) {
  const regex = /\{(.+?)\}/g // matches anything in curly brackes, for eg, "{hello}"

  return (template: string) => {
    if (!fallbacks.has(template)) {
      fallbacks.set(template, new Map<string, string | number | boolean>())
    }

    return template.replaceAll(regex, (substr, match) => {
      if (currSceneState && currSceneState.hasKey(match)) {
        const val = currSceneState.get(match)

        if (val !== undefined) {
          fallbacks.get(template)?.set(match, val)
        }
        return `${val}`
      }

      if (globalState.hasKey(match)) {
        const val = globalState.get(match)

        if (val !== undefined) {
          fallbacks.get(template)?.set(match, val)
        }
        return `${val}`
      }

      if (fallbacks.get(template)?.has(match)) {
        return `${fallbacks.get(template)?.get(match)}`
      }

      console.warn(
        `templated variable "${substr}" not found in global state or the current scene's state`
      )
      return substr
    })
  }
}
