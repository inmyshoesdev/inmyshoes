import { useEffect, useRef } from 'react'

export function useRunCleanupFnsOnUnmount() {
  const cleanupRef = useRef([] as (() => void)[])

  useEffect(() => {
    const cleanup = cleanupRef.current
    return () => cleanup.forEach((fn) => fn())
  }, [])

  return {
    addCleanupFns(...cleanupFns: ((() => void) | undefined)[]) {
      cleanupFns.forEach((fn) => {
        if (fn) {
          cleanupRef.current.push(fn)
        }
      })
    },
  }
}
