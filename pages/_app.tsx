import '../styles/globals.css'
import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { enableMapSet } from 'immer'
import usePageTracking from '../hooks/usePageTracking'
import { TailwindBreakpointValues } from '../lib/constants'

enableMapSet()

// tailwind breakpoints
const breakpoints = createBreakpoints(TailwindBreakpointValues)

function MyApp({ Component, pageProps }: AppProps) {
  usePageTracking()

  return (
    <ChakraProvider theme={extendTheme({ breakpoints })}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp
