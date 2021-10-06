import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { enableMapSet } from 'immer'
import usePageTracking from '../hooks/usePageTracking'

enableMapSet()

function MyApp({ Component, pageProps }: AppProps) {
  usePageTracking()
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp
