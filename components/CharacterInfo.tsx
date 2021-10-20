import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, EffectCards, Mousewheel } from 'swiper'
import { Button } from '@chakra-ui/button'
import { useStore } from '../stores/store'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'
function CharacterInfo({
  characterSelected,
  hidden,
  setHidden,
  setBlurBackground,
}: {
  characterSelected: boolean
  hidden: boolean
  setHidden: (hidden: boolean) => void
  setBlurBackground: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const setCharacterSelected = useStore((state) => state.setCharacterSelected)
  const characterIndex = useStore((state) => state.game.characterIndex)
  const game = useStore((state) => state.game)
  return (
    <div
      className={`${
        hidden ? 'hidden' : ''
      } w-[45vw] mx-auto flex flex-col items-center gap-4`}
      style={{
        aspectRatio: '16/9',
      }}
    >
      <h1 className="px-2 text-white text-xl bg-gray-700 opacity-90">
        Character Information
      </h1>
      <div className="w-1/2 h-full text-xs sm:w-full sm:text-base">
        <Swiper
          modules={[A11y, Mousewheel, EffectCards]}
          effect="cards"
          mousewheel={true}
          className="h-full"
          key={characterIndex}
        >
          {characterSelected &&
            game.mainCharacters[characterIndex].info.map((info) => (
              <SwiperSlide
                key={info.text}
                className="flex"
                style={{
                  backgroundImage: `url(${info.backgroundImage})`,
                  backgroundSize: 'cover',
                }}
              >
                <p className="self-end mx-auto p-1 text-center text-white bg-gray-800 opacity-90">
                  {info.text}
                </p>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="z-10 flex flex-col gap-6 items-center justify-center mt-8">
        <button
          className="px-4 py-1 text-center text-lg font-medium bg-green-400 hover:bg-green-500 rounded cursor-pointer"
          onClick={() => {
            setHidden(true)
            setBlurBackground((state) => !state)
          }}
        >
          Resume
        </button>
        <Popover>
          <PopoverTrigger>
            <button className="justify-content z-20 flex mx-auto px-2 py-1 font-medium bg-yellow-400 hover:bg-yellow-500 rounded cursor-pointer">
              Reselect
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Confirmation!</PopoverHeader>
            <PopoverBody>
              Are you sure you want to go back to the character selection stage?
              <Button
                variant="outline"
                size="sm"
                colorScheme="green"
                className="ml-2 cursor-pointer"
                onClick={() => {
                  setHidden(true)
                  setBlurBackground((state) => !state)
                  setCharacterSelected(false)
                }}
              >
                Yes
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default CharacterInfo
