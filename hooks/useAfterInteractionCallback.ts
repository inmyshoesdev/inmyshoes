import { useCallback } from 'react'
import { AfterInteractionCallback } from '../lib/elements'
import { useRunCleanupFnsOnUnmount } from './useRunCleanupFnsOnUnmount'

export function useAfterInteractionCallback(
  afterInteractionCallback?: AfterInteractionCallback
) {
  const { addCleanupFns } = useRunCleanupFnsOnUnmount()

  return useCallback(() => {
    if (afterInteractionCallback) {
      const cleanupFn = afterInteractionCallback()
      addCleanupFns(cleanupFn)
    }
  }, [afterInteractionCallback, addCleanupFns])
}
