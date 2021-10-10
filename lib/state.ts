type StateMap = Record<string, string | number | boolean>

export interface State {
  innerState: StateMap
  hasKey(key: string): boolean
  get(key: string): string | number | boolean | undefined
  update(newState: any): void
}

export function makeState(state: any): State {
  return {
    innerState: state,

    hasKey(key: string): boolean {
      return key in this.innerState
    },

    get(key: string): string | number | boolean | undefined {
      return this.innerState[key]
    },

    update(newState: StateMap) {
      for (const [key, val] of Object.entries(newState)) {
        if (key in this.innerState) {
          if (
            typeof val === 'number' &&
            typeof this.innerState[key] === 'number'
          ) {
            ;(this.innerState as any as Record<string, number>)[key] += val
            continue
          }

          if (
            typeof val === 'string' &&
            typeof this.innerState[key] === 'string'
          ) {
            this.innerState[key] = val
            continue
          }

          if (
            typeof val === 'boolean' &&
            typeof this.innerState[key] === 'boolean'
          ) {
            this.innerState[key] = val
            continue
          }

          console.warn(
            `update of type ${typeof val} applied to key "${key}" in state, expected ${typeof this
              .innerState[key]}`
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
