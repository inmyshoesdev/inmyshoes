import { Action, ActionReturnType, isActionReturnType } from './actions'
import { Game } from './game'
import { evalCondition } from './logic'
import { Scene } from './scene'
import { Deferred } from './utils'

export type ActionExecutor = (
  updateFn: (game: Game, scene: Scene) => void
) => void

export class ActionSequence {
  private _actions: Action[]

  constructor(...actions: Action[]) {
    this._actions = actions
  }

  actions() {
    let ongoingTimerIds: ReturnType<typeof setTimeout>[] = []
    let _actions = this._actions
    let finished = false

    async function* generateActionSequence(
      ...actions: Action[]
    ): AsyncIterable<{
      sceneId: number
      execute(executor: ActionExecutor): void
    }> {
      let idx = 0

      while (idx < actions.length && !finished) {
        const curr = actions[idx]
        const { name, sceneId, duration, condition, args } = curr

        const { waitForInteraction = true } = args
        const shouldWaitForInteraction =
          name.startsWith('show') && waitForInteraction === true

        const done = new Deferred<void>()
        let retVal: ActionReturnType | void

        yield {
          sceneId,
          execute(executor: ActionExecutor) {
            executor((game, scene) => {
              if (condition) {
                const fulfilled = evalCondition(
                  condition,
                  game.globalState,
                  scene.state
                )

                if (!fulfilled) {
                  done.resolve()
                  return
                }
              }

              const afterInteractionCallback = shouldWaitForInteraction
                ? () => done.resolve()
                : undefined

              retVal = curr.execute({
                game,
                scene,
                duration,
                args,
                afterInteractionCallback,
              })
            })

            let id = setTimeout(() => {
              executor((game, scene) => {
                if (isActionReturnType(retVal) && retVal.finishAction) {
                  retVal.finishAction({ game, scene })
                }
              })

              if (!shouldWaitForInteraction || duration > 0) {
                done.resolve()
              }
            }, curr.duration)

            ongoingTimerIds.push(id)
          },
        }

        await done

        if (isActionReturnType(retVal) && retVal.followupActions) {
          yield* generateActionSequence(...retVal.followupActions)
        }
        idx++
      }
    }

    return {
      async *[Symbol.asyncIterator]() {
        yield* generateActionSequence(..._actions)
      },

      finish() {
        finished = true
        ongoingTimerIds.forEach(clearTimeout)
      },
    }
  }
}
