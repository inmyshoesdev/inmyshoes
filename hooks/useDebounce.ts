import { useEffect, useRef, useState } from 'react'

// T is a generic type for value parameter
export function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay] // Only re-call effect if value or delay changes
  )
  return debouncedValue
}

type Debounced<T> = {
  prev?: T
  curr: T
  updated: boolean
}

export function usePreviousDebounced<T>(value: T, delay: number): Debounced<T> {
  const pending = useRef<boolean>(false)
  const prev = useRef<T>()
  const prevDebounced = useRef<T>()
  const [debounced, setDebounced] = useState<Debounced<T>>({
    curr: value,
    updated: false,
  })

  useEffect(() => {
    if (!pending.current) {
      prevDebounced.current = prev.current
    }
    pending.current = true

    const id = setTimeout(() => {
      const val = { prev: prevDebounced.current, curr: value }

      setDebounced({ ...val, updated: true })
      pending.current = false
      setDebounced({ ...val, updated: false })
    }, delay)

    return () => clearTimeout(id)
  }, [value, delay])

  useEffect(() => {
    prev.current = value
  })

  return debounced
}
