import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import { Button } from '@chakra-ui/button'
import { MainCharacter } from '../lib/character'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Mousewheel, EffectCube } from 'swiper'
import { useState } from 'react'
export function CharacterSelection({
  isOpen,
  onClose,
  mainCharacters,
  setCharacterSelected,
  updateCharacter,
}: {
  isOpen: boolean
  onClose: () => void
  mainCharacters: MainCharacter[]
  setCharacterSelected: (isSelected: boolean) => void
  updateCharacter: (characterIndex: number) => void
}) {
  const [characterIndex, setCharacterIndex] = useState(0)
  function finishSelection() {
    updateCharacter(characterIndex)
    setCharacterSelected(true)
    onClose()
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={finishSelection}
        size="4xl"
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Character Selection</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Swiper
              modules={[A11y, Mousewheel, EffectCube]}
              effect="cube"
              mousewheel={true}
              className="h-[50vh] w-[20vw]"
              onSlideChange={(swiper) => {
                setCharacterIndex(swiper.activeIndex)
              }}
            >
              {mainCharacters.map((character) => (
                <SwiperSlide key={character.name} className="flex bg-gray-100">
                  <img src={character.images.default} alt={character.name} />
                  <p className="self-center mx-auto p-1 text-center text-white bg-gray-800 opacity-90">
                    {character.name}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              size="lg"
              onClick={finishSelection}
            >
              Go
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
