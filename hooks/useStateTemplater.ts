import { getStateTemplater } from '../lib/state'
import { useStore } from '../stores/store'

export function useStateTemplater() {
  const globalState = useStore((state) => state.game.globalState)
  const currSceneState = useStore(
    (state) => state.game.getScene(state.game.currentSceneId)?.state
  )

  return getStateTemplater(globalState, currSceneState)
}
