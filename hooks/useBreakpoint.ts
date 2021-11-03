import { useMedia } from 'react-use'
import { TailwindBreakpoint, TailwindBreakpointValues } from '../lib/constants'
import { useHasMounted } from './useHasMounted'

function useBreakpoint(breakpoint: TailwindBreakpoint): boolean {
  const mounted = useHasMounted()
  const val = useMedia(`(min-width: ${TailwindBreakpointValues[breakpoint]})`)

  return mounted && val
}

function useIsMobileLandscape(): boolean {
  const mounted = useHasMounted()
  const val = useMedia('(min-aspect-ratio: 31/18) and (max-width: 1024px)')

  return mounted && val
}

export { useBreakpoint, useIsMobileLandscape }
