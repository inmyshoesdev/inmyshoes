import produce from 'immer'
import { WritableDraft } from 'immer/dist/internal'
import create, { SetState } from 'zustand'
import { ActionSequence } from '../lib/action-sequence'
import { EmptyGame, Game } from '../lib/game'
import { StateMap } from '../lib/state'

type GameStore = {
  game: Game
  loadGame: (game: Game) => void
  gotoScene: (sceneId: number) => void
  resetScene: (sceneId: number) => void
  hideClickable: (sceneId: number, name: string) => void
  replaceGlobalState: (newState: StateMap) => void
  replaceCurrentSceneState: (newState: StateMap) => void
  executeActions: (actionSequence: ActionSequence) => () => void
  updateCharacter: (characterIndex: number) => void
  setCharacterSelected: (newState: boolean) => void
}

function update(
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

    update(set, (state) => {
      state.game.loading = false
    })
  },

  setCharacterSelected: (newState: boolean) => {
    update(set, (state) => {
      state.game.characterSelected = newState
    })
  },

  updateCharacter: (characterIndex: number) => {
    update(set, (state) => {
      state.game.characterIndex = characterIndex
      state.game.currentSceneId =
        state.game.mainCharacters[characterIndex].scenes[0].id
    })
  },
  gotoScene: (sceneId: number) =>
    update(set, (state) => {
      state.game.currentSceneId = sceneId
    }),

  resetScene: (sceneId: number) => {
    update(set, (state) => {
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
    update(set, (state) => {
      const clickable = state.game
        .getScene(sceneId)
        ?.getElement(name, 'clickables')

      if (clickable) {
        clickable.shown = false
      }
    })
  },

  replaceGlobalState(newState: StateMap) {
    update(set, (state) => {
      state.game.globalState.innerState = newState
    })
  },

  replaceCurrentSceneState(newState: StateMap) {
    update(set, (state) => {
      const currSceneId = state.game.currentSceneId
      const currScene = state.game.getScene(currSceneId)

      if (currScene) {
        currScene.state.innerState = newState
      }
    })
  },

  executeActions(actionSequence: ActionSequence) {
    const actions = actionSequence.actions()

    // execute as a callback so the function can return
    setTimeout(async () => {
      for await (const action of actions) {
        const { sceneId } = action

        action.execute((updateFn) => {
          update(set, (state) => {
            const scene = state.game.getScene(sceneId)

            if (scene) {
              updateFn(state.game, scene)
            }
          })
        })
      }
    }, 0)

    return () => actions.finish()
  },
}))
