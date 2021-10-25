import '../styles/globals.css'
import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/effect-cube'
import 'swiper/css/pagination'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { enableMapSet } from 'immer'
import usePageTracking from '../hooks/usePageTracking'

enableMapSet()

// tailwind breakpoints
const breakpoints = createBreakpoints({
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
})

function MyApp({ Component, pageProps }: AppProps) {
  usePageTracking()
  return (
    <ChakraProvider theme={extendTheme({ breakpoints })}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp
