export interface IState {
  getState(): Record<string, any>
  newState(newState: Record<string, any>): Record<string, any>
}

export class State implements IState {
  private state: Record<string, any>

  constructor(state: Record<string, any> | undefined | null) {
    this.state = state ?? {}
  }

  getState(): Record<string, any> {
    return this.state
  }

  newState(newState: Record<string, any>): Record<string, any> {
    return { ...this.state, ...newState }
  }
}
