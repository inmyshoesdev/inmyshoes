import { useStore } from '../stores/store'

const memoized = new Map<string, Map<string, string | number | boolean>>()

export function useStateTemplater() {
  const globalState = useStore((state) => state.game.globalState)
  const currSceneState = useStore(
    (state) => state.game.getScene(state.game.currentSceneId)?.state
  )

  const regex = /\{(.+?)\}/g // matches anything in curly brackes, for eg, "{hello}"

  return (template: string) => {
    if (!memoized.has(template)) {
      memoized.set(template, new Map<string, string | number | boolean>())
    }

    return template.replaceAll(regex, (substr, match) => {
      if (currSceneState && currSceneState.hasKey(match)) {
        const val = currSceneState.get(match)

        if (val !== undefined) {
          memoized.get(template)?.set(match, val)
        }
        return `${val}`
      }

      if (globalState.hasKey(match)) {
        const val = globalState.get(match)

        if (val !== undefined) {
          memoized.get(template)?.set(match, val)
        }
        return `${val}`
      }

      if (memoized.get(template)?.has(match)) {
        return `${memoized.get(template)?.get(match)}`
      }

      console.warn(
        `templated variable "${substr}" not found in global state or the current scene's state`
      )
      return substr
    })
  }
}
