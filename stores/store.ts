import produce from 'immer'
import { WritableDraft } from 'immer/dist/internal'
import create, { SetState } from 'zustand'
import { Action, FinishAction, isCallable } from '../lib/actions'
import { EmptyGame, Game } from '../lib/game'
import { evalCondition } from '../lib/logic'

type GameStore = {
  game: Game
  loadGame: (game: Game) => void
  gotoScene: (sceneId: number) => void
  resetScene: (sceneId: number) => void
  hideClickable: (sceneId: number, name: string) => void
  executeActions: (...actions: Action[]) => () => void
}

function updateState(
  set: SetState<GameStore>,
  fn: (state: WritableDraft<GameStore>) => void
) {
  set(produce<GameStore>(fn))
}

export const useStore = create<GameStore>((set) => ({
  game: EmptyGame,

  loadGame: async (game: Game) => {
    set({ game: { ...game, loading: true } })

    await game.preloadImages()

    updateState(set, (state) => {
      state.game.loading = false
    })
  },

  gotoScene: (sceneId: number) =>
    updateState(set, (state) => {
      state.game.currentSceneId = sceneId
    }),

  resetScene: (sceneId: number) => {
    updateState(set, (state) => {
      const scene = state.game.getScene(sceneId)
      if (!scene) {
        return
      }

      scene.narrations.forEach((narration) => (narration.shown = false))
      scene.dialogues.forEach((dialogue) => (dialogue.shown = false))
      scene.images.forEach((image) => (image.shown = false))
      scene.clickables.forEach((clickable) => (clickable.shown = false))
      scene.links.forEach((link) => (link.shown = false))
      // TODO: may need to add more to reset other states
    })
  },

  hideClickable(sceneId: number, name: string) {
    updateState(set, (state) => {
      const clickable = state.game
        .getScene(sceneId)
        ?.getElement(name, 'clickables')

      if (clickable) {
        clickable.shown = false
      }
    })
  },

  executeActions: (...allActions: Action[]) => {
    // compute the appropriate timings for each action to trigger
    let { actions } = allActions.reduce<{
      nextTiming: number
      actions: { timing: number; action: Action }[]
    }>(
      (accum, action) => {
        const { nextTiming, actions } = accum
        const { name, duration, args } = action
        const { waitForInteraction = true } = args

        const shouldWaitForInteraction =
          name.startsWith('show') && waitForInteraction === true

        // if this action should wait for interaction, reset the next timing.
        // the next action will be triggered via click instead of via
        // the timing
        if (shouldWaitForInteraction) {
          return {
            nextTiming: 0,
            actions: [...actions, { timing: nextTiming, action }],
          }
        }

        return {
          nextTiming: nextTiming + duration,
          actions: [...actions, { timing: nextTiming, action }],
        }
      },
      { nextTiming: 0, actions: [] }
    )

    const executor = makeExecutor(set)

    // perform reduce starting from the back
    let res = actions.reverse().reduce<RuntimeAction[]>((accum, elem) => {
      const { timing, action } = elem
      const { name, args } = action
      const { waitForInteraction = true } = args

      const deferredActions: DeferredActions = {
        runtimeActions: [],
        deferredExecutor: executor,
      }

      const shouldWaitForInteraction =
        name.startsWith('show') && waitForInteraction === true

      if (shouldWaitForInteraction) {
        // if this action should wait for interaction, then we include the prior
        // actions to execute after the interaction as a callback

        deferredActions.runtimeActions.push(...accum)
        return [{ action, timing, deferredActions }]
      }

      return [{ action, timing, deferredActions }, ...accum]
    }, [])

    // execute all accumulated callbacks
    const cleanupFns = res.map((runtimeAction) => {
      return executor(runtimeAction)
    })

    return () => cleanupFns.forEach((fn) => fn())
  },
}))

export type RuntimeAction = {
  action: Action
  timing: number
  deferredActions?: DeferredActions
}

export type RuntimeActionExecutor = (runtimeAction: RuntimeAction) => () => void

export type DeferredActions = {
  runtimeActions: RuntimeAction[]
  deferredExecutor: RuntimeActionExecutor
}

function makeExecutor(set: SetState<GameStore>): RuntimeActionExecutor {
  return (runtimeAction: RuntimeAction) => {
    const { action, timing, deferredActions } = runtimeAction
    const { duration, condition, args, sceneId, execute } = action

    let timerIds: ReturnType<typeof setTimeout>[] = []
    let finishAction: FinishAction = undefined

    // schedule the action at the specified timing
    let id = setTimeout(() => {
      updateState(set, (state) => {
        const scene = state.game.getScene(sceneId)

        // check for the condition, if any. if the current state does not
        // fulfill the conditions, return without executing the action.
        if (condition) {
          const fulfilled = evalCondition(
            condition,
            state.game.globalState,
            scene?.state
          )

          if (!fulfilled) {
            if (!deferredActions) {
              return
            }

            // if there are deferred actions, execute them immediately.
            const res = deferredActions.runtimeActions.map(
              deferredActions.deferredExecutor
            )
            return () => res.forEach((fn) => fn())
          }
        }

        if (scene) {
          finishAction = execute({
            duration,
            args,
            scene,
            game: state.game,
            deferredActions,
          })
        }
      })
    }, timing)

    timerIds.push(id)

    // schedule a finish action at the end if necessary
    id = setTimeout(() => {
      if (isCallable(finishAction)) {
        const executeFinish = finishAction
        updateState(set, (state) => {
          const scene = state.game.getScene(sceneId)
          if (scene) {
            executeFinish({ scene, game: state.game })
          }
        })
      }
    }, timing + duration)

    timerIds.push(id)

    return () => timerIds.forEach(clearTimeout)
  }
}
