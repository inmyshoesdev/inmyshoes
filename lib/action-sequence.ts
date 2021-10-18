import { Action, FinishAction, isCallable } from './actions'
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
    let actions = [...this._actions]
    let finished = false

    return {
      async *[Symbol.asyncIterator]() {
        let idx = 0

        while (idx < actions.length && !finished) {
          const curr = actions[idx]
          const { name, sceneId, duration, condition, args } = curr

          const { waitForInteraction = true } = args
          const shouldWaitForInteraction =
            name.startsWith('show') && waitForInteraction === true

          const done = new Deferred<void>()

          yield {
            sceneId,
            execute(executor: ActionExecutor) {
              let finishAction: FinishAction

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

                finishAction = curr.execute({
                  game,
                  scene,
                  duration,
                  args,
                  afterInteractionCallback,
                })
              })

              let id = setTimeout(() => {
                executor((game, scene) => {
                  if (isCallable(finishAction)) {
                    finishAction({ game, scene })
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
          idx++
        }
      },

      finish() {
        finished = true
        ongoingTimerIds.forEach(clearTimeout)
      },
    }
  }
}
