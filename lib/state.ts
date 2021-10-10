type StateObj = {
  value: string | number | boolean
  min?: number
  max?: number
}
type StateMap = Record<string, StateObj>

export interface State {
  innerState: StateMap
  hasKey(key: string): boolean
  get(key: string): string | number | boolean | undefined
  update(newState: any): void
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

    update(newState: StateMap) {
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
