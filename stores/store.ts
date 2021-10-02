import produce from 'immer'
import create from 'zustand'
import { Action, FinishAction, isCallable } from '../lib/actions'
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
        state.game.currentSceneId = sceneId
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
          ?.getElement<Clickable>(name, 'clickables')

        if (clickable) {
          clickable.shown = false
        }
      })
    )
  },

  executeActions: (...actions: Action[]) => {
    let res = actions.reduce<{
      timing: number
      timerIds: ReturnType<typeof setTimeout>[]
    }>(
      (accum, action) => {
        const { timing, timerIds } = accum
        const { duration, args, sceneId, execute } = action

        let finishAction: FinishAction = undefined
        let newTimerIds = []

        // schedule the action at the specified timing
        let id = setTimeout(() => {
          set((state) => {
            const newGame = produce<Game>(state.game, (game) => {
              const scene = game.getScene(sceneId)
              if (scene) {
                finishAction = execute({ duration, args, scene, game })
              }
            })

            return { game: newGame }
          })
        }, timing)

        newTimerIds.push(id)

        // schedule an action at the end if necessary
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

        newTimerIds.push(id)

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
  },
}))
