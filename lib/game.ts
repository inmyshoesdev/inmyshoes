import { GameSchema } from '../schema/game'
import { Action, FinishAction, isCallable } from './actions'
import { Scene } from './scene'
import { State } from './state'

export class Game {
  name: string
  currentSceneId: number
  scenes: Map<number, Scene>
  globalState: State

  constructor(schema: GameSchema) {
    this.name = schema.name
    this.currentSceneId = schema.scenes[0].id
    this.scenes = new Map(
      schema.scenes.map((schema) => [
        schema.id,
        new Scene(schema, this.execute),
      ])
    )
    this.globalState = new State(schema.globalState)
  }

  get currentScene() {
    return this.scenes.get(this.currentSceneId)
  }

  gotoScene(sceneId: number) {
    this.currentSceneId = sceneId
  }

  // Returns a function that when called, sets up each action to run in
  // the order defined. Each action will run for its specified duration,
  // before the next action runs. If the action returns a finish action,
  // the finish actions is also run at the end of the specified duration.
  // The returned function also returns a cleanup function after being
  // called.
  execute(...actions: Action[]): () => void {
    const res = actions.reduce<{
      timing: number
      timerIds: ReturnType<typeof setTimeout>[]
    }>(
      (accum, item) => {
        const { timing, timerIds } = accum
        const { name, duration, args, action, sceneId } = item

        const scene = this.scenes.get(sceneId)
        if (!scene) {
          console.log(
            `invalid sceneId: ${scene} for action: ${name}, something went wrong`
          )
          return accum
        }

        let finishAction: FinishAction = undefined
        let newTimerIds = []

        // schedule the action at the specified timing
        let id = setTimeout(() => {
          finishAction = action({
            duration,
            args,
            game: this,
            scene: scene,
          })
        }, timing)

        newTimerIds.push(id)

        // if a finish action is returned, schedule it at the
        // specified timing + duration of the action
        if (isCallable(finishAction)) {
          const action = finishAction
          id = setTimeout(() => {
            action()
          }, timing + duration)

          newTimerIds.push(id)
        }

        return {
          timing: timing + duration,
          timerIds: [...timerIds, ...newTimerIds],
        }
      },
      {
        timing: 0,
        timerIds: [],
      }
    )

    return () => res.timerIds.forEach(clearTimeout)
  }
}
