import produce from 'immer'
import create from 'zustand'
import {
  Action,
  afterInteractionCallback,
  FinishAction,
  isCallable,
  waitForInteraction,
} from '../lib/actions'
import { Clickable } from '../lib/elements'
import { EmptyGame, Game } from '../lib/game'

type GameStore = {
  game: Game
  loadGame: (game: Game) => void
  gotoScene: (sceneId: number) => void
  resetScene: (sceneId: number) => void
  hideClickable: (sceneId: number, name: string) => void
  executeActions: (...actions: Action[]) => () => void
}

export const useStore = create<GameStore>((set) => ({
  game: EmptyGame,

  loadGame: (game: Game) => {
    set({ game })
  },

  gotoScene: (sceneId: number) =>
    set(
      produce<GameStore>((state) => {
        state.game.globalState.currentSceneId = sceneId
      })
    ),

  resetScene: (sceneId: number) => {
    set(
      produce<GameStore>((state) => {
        const scene = state.game.getScene(sceneId)
        if (!scene) {
          return
        }

        scene.narrations.forEach((narration) => (narration.shown = false))
        scene.dialogues.forEach((dialogue) => (dialogue.shown = false))
        scene.images.forEach((image) => (image.shown = false))
        scene.clickables.forEach((clickable) => (clickable.shown = false))
        // TODO: may need to add more to reset other states
      })
    )
  },

  hideClickable(sceneId: number, name: string) {
    set(
      produce<GameStore>((state) => {
        const clickable = state.game
          .getScene(sceneId)
          ?.getElement(name, 'clickables')

        if (clickable) {
          clickable.shown = false
        }
      })
    )
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

        const shouldWaitForInteraction = name === waitForInteraction

        // if this action should wait for click, reset the next timing.
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

    // perform reduce starting from the back
    let res = actions.reverse().reduce<(() => () => void)[]>((accum, elem) => {
      const { timing, action } = elem
      const { name, duration, args, sceneId, execute } = action
      let afterInteractionCallback: (() => () => void) | undefined = undefined

      const shouldWaitForInteraction = name === waitForInteraction

      if (shouldWaitForInteraction) {
        // if this action should wait for interaction, then we pass the actions
        // to execute after the click as a callback
        afterInteractionCallback = () => {
          const cleanupFns = accum.map((fn) => fn())
          return () => cleanupFns.forEach((fn) => fn())
        }
      }

      // package the actions into a callback that returns a cleanup function
      let fn = () => {
        let timerIds: ReturnType<typeof setTimeout>[] = []
        let finishAction: FinishAction = undefined

        // schedule the action at the specified timing
        let id = setTimeout(() => {
          set((state) => {
            const newGame = produce<Game>(state.game, (game) => {
              const scene = game.getScene(sceneId)
              if (scene) {
                finishAction = execute({
                  duration,
                  args,
                  scene,
                  game,
                  afterInteractionCallback,
                })
              }
            })

            return { game: newGame }
          })
        }, timing)

        timerIds.push(id)

        // schedule a finish action at the end if necessary
        id = setTimeout(() => {
          if (isCallable(finishAction)) {
            const executeFinish = finishAction
            set((state) => {
              const newGame = produce<Game>(state.game, (game) => {
                const scene = game.getScene(sceneId)
                if (scene) {
                  executeFinish({ scene, game })
                }
              })

              return { game: newGame }
            })
          }
        }, timing + duration)

        timerIds.push(id)

        return () => timerIds.forEach(clearTimeout)
      }

      // if we should wait for interaction, we stop accumulating the current
      // accumulated functions, those will be executed after the click
      return shouldWaitForInteraction ? [fn] : [...accum, fn]
    }, [])

    const cleanupFns = res.map((fn) => fn())

    return () => cleanupFns.forEach((fn) => fn())
  },
}))
