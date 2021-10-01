import produce from 'immer'
import create from 'zustand'
import { Action, FinishAction, isCallable } from '../lib/actions'
import { EmptyGame, Game, getClickable } from '../lib/game'

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
        const scene = state.game.scenes.find((scene) => scene.id === sceneId)
        if (!scene) {
          return
        }

        scene.narrations.forEach((narration) => (narration.shown = false))
        scene.dialogues.forEach((dialogue) => (dialogue.shown = false))
        scene.images.forEach((image) => (image.shown = false))
        scene.clickables.forEach((clickable) => (clickable.shown = false))
      })
    )
  },

  hideClickable(sceneId: number, name: string) {
    set(
      produce<GameStore>((state) => {
        const clickable = getClickable(state.game, sceneId, name)
        console.log({ clickable, sceneId, name })
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
            let newGame = produce<Game>(state.game, (game) => {
              finishAction = execute({ duration, args, sceneId, game })
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
              let newGame = produce<Game>(state.game, (game) => {
                executeFinish(game)
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
