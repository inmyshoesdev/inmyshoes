import { useCallback } from 'react'
import { useRunCleanupFnsOnUnmount } from './useRunCleanupFnsOnUnmount'

export function useAfterInteractionCallback(
  afterInteractionCallback?: () => () => void
) {
  const { addCleanupFns } = useRunCleanupFnsOnUnmount()

  return useCallback(() => {
    if (afterInteractionCallback) {
      const cleanupFn = afterInteractionCallback()
      addCleanupFns(cleanupFn)
    }
  }, [afterInteractionCallback, addCleanupFns])
}
