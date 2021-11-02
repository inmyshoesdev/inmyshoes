import { Tooltip } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { toggleFullScreen } from './utils'

export default function FullscreenBtn(): JSX.Element {
  const [fullscreen, setFullscreen] = useState<boolean>(false)
  function exitHandler() {
    const doc = document as any
    if (
      doc.webkitIsFullScreen === false ||
      doc.mozFullScreen === false ||
      doc.msFullscreenElement === null ||
      doc.fullscreenElement === null
    ) {
      setFullscreen(false)
    }
  }
  useEffect(() => {
    document.addEventListener('fullscreenchange', exitHandler)
    document.addEventListener('webkitfullscreenchange', exitHandler)
    document.addEventListener('mozfullscreenchange', exitHandler)
    document.addEventListener('MSFullscreenChange', exitHandler)
  }, [])

  return (
    <Tooltip label="Toggle Fullscreen" placement="bottom">
      <button
        className="absolute right-1 top-1 focus:outline-none"
        onClick={() => {
          toggleFullScreen()
          setFullscreen(!fullscreen)
        }}
        aria-label="fullscreen on off button"
      >
        {fullscreen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 cursor-pointer sm:w-8 sm:h-8 md:w-10 md:h-10"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2c3e50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 19v-2a2 2 0 0 1 2 -2h2" />
            <path d="M15 5v2a2 2 0 0 0 2 2h2" />
            <path d="M5 15h2a2 2 0 0 1 2 2v2" />
            <path d="M5 9h2a2 2 0 0 0 2 -2v-2" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 cursor-pointer sm:w-8 sm:h-8 md:w-10 md:h-10"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2c3e50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
            <path d="M4 16v2a2 2 0 0 0 2 2h2" />
            <path d="M16 4h2a2 2 0 0 1 2 2v2" />
            <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
          </svg>
        )}
      </button>
    </Tooltip>
  )
}
