// https://stackoverflow.com/a/63249329/13725861
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ReactGA from 'react-ga'

const usePageTracking = () => {
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // Won't track localhost activities
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize('UA-209499763-1')
    }
    setInitialized(true)
  }, [])

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(router.pathname)
    }
  }, [initialized, router])
}

export default usePageTracking
