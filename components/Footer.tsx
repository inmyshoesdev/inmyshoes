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
import { useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'

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
  const [musicOn, setMusicOn] = useState(true)
  const game = useStore((state) => state.game)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [play, { stop }] = useSound(
    game.about.backgroundMusic ?? '/music/bensound-jazzcomedy.mp3',
    {
      volume: 0.5,
      loop: true,
    }
  )

  useEffect(() => {
    if (musicOn) {
      console.log('play')
      play()
    } else {
      console.log('stop')
      stop()
    }
    return () => {
      stop()
    }
  }, [musicOn, play, stop])

  return (
    <>
      <div
        id="footer"
        className={`relative w-96 flex justify-around items-center`}
      >
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
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
        <div>
          <button
            className="focus:outline-none cursor-pointer"
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
                <div className="flex w-12">
                  <img
                    className="justify-center cursor-pointer"
                    src={game.mainCharacters[characterIndex].images.default}
                    alt="Current character image"
                    width={20}
                    height={50}
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
                  className="icon icon-tabler icon-tabler-user-plus"
                  width="44"
                  height="44"
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
            src={game.about.logo?.src ?? '/images/mainlogo.png'}
            alt="Logo"
            width={game.about.logo?.width ?? 150}
            height={game.about.logo?.height ?? 50}
            className="cursor-pointer"
            onClick={onOpen}
          />
        </Tooltip>
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
                className="icon icon-tabler icon-tabler-volume cursor-pointer"
                width="44"
                height="44"
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
                className="icon icon-tabler icon-tabler-volume-3 cursor-pointer"
                width="44"
                height="44"
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
    </>
  )
}

export default Footer
