import { MainCharacter } from '../lib/character'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, EffectCards, Navigation, Mousewheel } from 'swiper'
import { useState } from 'react'
import Image from 'next/image'
import { useStore } from '../stores/store'
import Tape from './Tape'
import { Tooltip } from '@chakra-ui/tooltip'
import { characterSelectBg } from '../lib/constants'

function CharacterSelect({
  characterSelected,
  mainCharacters,
  updateCharacter,
}: {
  characterSelected: boolean
  mainCharacters: MainCharacter[]
  updateCharacter: (characterIndex: number) => void
}) {
  const setCharacterSelected = useStore((state) => state.setCharacterSelected)
  const [characterIndex, setCharacterIndex] = useState(0)

  function finishSelection() {
    updateCharacter(characterIndex)
    setCharacterSelected(true)
  }

  return (
    <div
      className={`relative mx-auto flex flex-col items-center justify-evenly h-full`}
    >
      <Image
        className="absolute z-0 inset-0"
        src={characterSelectBg}
        alt="background of corkboard"
        layout="fill"
      />
      <h1 className="px-2 bg-gray-700 border border-gray-900 rounded-handdrawn opacity-90 select-none md:px-3 md:py-1 md:border-2">
        <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
          Character Selection
        </span>
      </h1>
      <style jsx>{`
        .swiper-parent {
          --swiper-navigation-color: #1f2937;
          --swiper-navigation-size: 22px;
        }

        @media (min-width: 640px) {
          .swiper-parent {
            --swiper-navigation-size: 33px;
          }
        }

        @media (min-width: 768px) {
          .swiper-parent {
            --swiper-navigation-size: 44px;
          }
        }

        @media (min-width: 1280px) {
          .swiper-parent {
            --swiper-navigation-size: 55px;
          }
        }

        .swiper-parent :global(.swiper-button-next) {
          right: -25%;
          cursor: url(https://soristic.sgp1.digitaloceanspaces.com/general/curhand.cur),
            auto !important;
        }

        .swiper-parent :global(.swiper-button-prev) {
          left: -25%;
          cursor: url(https://soristic.sgp1.digitaloceanspaces.com/general/curhand.cur),
            auto !important;
        }
      `}</style>
      <div className="swiper-parent w-1/2 h-1/2 text-xs sm:w-full sm:text-base md:h-2/3">
        <Swiper
          modules={[A11y, Mousewheel, EffectCards, Navigation]}
          effect="cards"
          navigation={true}
          mousewheel={true}
          className="w-[25vw] h-full"
          onSlideChange={(swiper) => {
            setCharacterIndex(swiper.activeIndex)
          }}
        >
          {mainCharacters.map((character, idx) => (
            <SwiperSlide
              key={character.name}
              className="flex items-center justify-evenly p-2 bg-white shadow-md select-none md:block md:p-4 md:pb-0"
            >
              <div className="relative flex-grow h-full bg-gray-100 shadow-sm md:mb-0 md:h-4/5">
                <div className="absolute -left-1 top-0 md:-left-2 xl:top-1">
                  <Tape rotation={-45 + ((idx * 20) % 7)}></Tape>
                </div>
                <div className="absolute -right-1 top-0 md:-right-2 xl:top-1">
                  <Tape rotation={36 + ((idx * 30) % 11)}></Tape>
                </div>
                <img
                  src={character.images.default}
                  alt={character.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="grid place-items-center ml-2 h-1/5 text-sm md:-mt-1 md:text-base lg:text-xl xl:text-2xl">
                <Tooltip label="Swipe" placement="bottom">
                  <span className="text-center text-gray-800 italic font-medium">
                    {character.name}
                  </span>
                </Tooltip>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="z-10 mt-1 text-center font-handwritten text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        <button
          className="hover:bg-gray-100/25 px-4 py-1 font-medium border-2 border-gray-900 rounded-handdrawn focus:outline-none cursor-pointer md:px-6 md:py-2 md:border-3"
          onClick={finishSelection}
        >
          Go
        </button>
      </div>
    </div>
  )
}

export default CharacterSelect
