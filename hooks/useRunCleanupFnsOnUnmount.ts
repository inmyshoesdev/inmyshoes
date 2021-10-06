import { useEffect, useRef } from 'react'

export function useRunCleanupFnsOnUnmount() {
  const cleanupRef = useRef([] as (() => void)[])

  useEffect(() => {
    const cleanup = cleanupRef.current
    return () => cleanup.forEach((fn) => fn())
  }, [])

  return {
    addCleanupFns(...cleanupFns: (() => void)[]) {
      cleanupRef.current.push(...cleanupFns)
    },
  }
}
