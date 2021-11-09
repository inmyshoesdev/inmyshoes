import React, { useState, useEffect } from 'react'
import { Tooltip } from '@chakra-ui/react'
import { useSound } from 'use-sound'
import { useStore } from '../stores/store'
import { renderMdToHtml } from './utils'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure, useBreakpointValue } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import { log } from '../lib/utils'
import { useIsMobileLandscape } from '../hooks/useBreakpoint'

function Footer({
  characterSelected,
  characterIndex,
  setBlurBackground,
  setHideCharacterInfo,
}: {
  characterSelected: boolean
  characterIndex: number
  setBlurBackground: React.Dispatch<React.SetStateAction<boolean>>
  setHideCharacterInfo: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const isMobileLandscape = useIsMobileLandscape()

  const [musicOn, setMusicOn] = useState(true)
  const game = useStore((state) => state.game)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [play, { stop }] = useSound(
    game.about.backgroundMusic ?? '/music/bgm.mp3',
    {
      volume: 0.2,
      loop: true,
    }
  )

  useEffect(() => {
    if (musicOn) {
      log('play')
      play()
    } else {
      log('stop')
      stop()
    }
    return () => {
      stop()
    }
  }, [musicOn, play, stop])

  const modalSize = useBreakpointValue(['lg', 'xl', '3xl', '4xl'])

  return (
    <>
      <div
        id="footer"
        className="mobile:sm:pl-1 relative flex mobile:flex-col items-center justify-around w-full max-w-xl h-full overflow-hidden"
      >
        <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>About Us</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div
                dangerouslySetInnerHTML={{
                  __html: renderMdToHtml(game.about.credits ?? ''),
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <div className="grid flex-none place-items-center mobile:w-full mobile:h-20 h-full">
          <button
            className="flex items-center justify-center w-full h-full focus:outline-none cursor-pointer"
            aria-label="check current character"
            disabled={!characterSelected}
            onClick={() => {
              setHideCharacterInfo((state) => !state)
              setBlurBackground((state) => !state)
            }}
          >
            {characterSelected ? (
              <Tooltip
                label="Character Information"
                aria-label="Character Information"
                placement="top"
              >
                <div className="flex justify-center my-1 w-7 h-14 max-h-full md:w-9 md:h-16 lg:w-11 lg:h-20">
                  <img
                    className="cursor-pointer object-contain drop-shadow-sm"
                    src={game.mainCharacters[characterIndex].images.default}
                    alt="Current character image"
                  />
                </div>
              </Tooltip>
            ) : (
              <Tooltip
                label="Character Not Selected"
                aria-label="Character Not Selected"
                placement="top"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-user-plus w-7 h-7 mobile:translate-x-1 md:w-9 md:h-9 lg:w-11 lg:h-11"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#000000"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
              </Tooltip>
            )}
          </button>
        </div>
        <Tooltip
          label="About Us"
          aria-label="About Us"
          placement="top"
          className="text-center"
        >
          <img
            src={
              isMobileLandscape
                ? game.about.logoSmall?.src ??
                  'https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/mainlogo-small.png'
                : game.about.logo?.src ??
                  'https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/mainlogo.png'
            }
            alt="Logo"
            width={
              isMobileLandscape
                ? game.about.logoSmall?.width ?? 36
                : game.about.logo?.width ?? 150
            }
            height={
              isMobileLandscape
                ? game.about.logoSmall?.height ?? 36
                : game.about.logo?.height ?? 50
            }
            className="mobile:md:scale-100 cursor-pointer scale-50 mobile:scale-75 md:scale-75 lg:scale-100"
            onClick={onOpen}
          />
        </Tooltip>
        <div className="grid flex-none place-items-center mobile:w-full mobile:h-20 h-full">
          <Tooltip
            label="Toggle Background Music"
            aria-label="Toggle Background Music"
            placement="top"
          >
            <button
              className="z-10 focus:outline-none"
              id="soundOnBtn"
              onClick={() => {
                setMusicOn(!musicOn)
              }}
              aria-label="sound on off button"
            >
              {musicOn ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-volume w-7 h-7 cursor-pointer md:w-9 md:h-9 lg:w-11 lg:h-11"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M15 8a5 5 0 0 1 0 8" />
                  <path d="M17.7 5a9 9 0 0 1 0 14" />
                  <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-volume-3 w-7 h-7 cursor-pointer md:w-9 md:h-9 lg:w-11 lg:h-11"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
                  <path d="M16 10l4 4m0 -4l-4 4" />
                </svg>
              )}
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  )
}

export default Footer
