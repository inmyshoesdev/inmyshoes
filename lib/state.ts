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
