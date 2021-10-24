import { MainCharacter } from '../lib/character'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, EffectCube, Mousewheel } from 'swiper'
import { useState } from 'react'
import { useStore } from '../stores/store'
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
    <>
      <div
        className={`${
          characterSelected ? 'hidden' : ''
        } bg relative w-auto mx-auto flex flex-col items-center justify-evenly`}
        style={{
          aspectRatio: '16/9',
        }}
      >
        <h1 className="px-2 py-1 text-white text-xs bg-gray-700 rounded opacity-95 sm:text-sm md:px-3 md:py-2 md:text-base lg:text-lg xl:text-xl">
          Character Selection
        </h1>
        <div className="w-1/2 h-1/2 text-xs sm:w-full sm:text-base md:h-2/3">
          <Swiper
            modules={[A11y, Mousewheel, EffectCube]}
            effect="cube"
            mousewheel={true}
            className="w-[25vw] h-full"
            onSlideChange={(swiper) => {
              setCharacterIndex(swiper.activeIndex)
            }}
          >
            {mainCharacters.map((character) => (
              <SwiperSlide
                key={character.name}
                className="flex items-center justify-evenly bg-gray-100 md:block"
              >
                <div className="my-2 h-full md:mb-0 md:h-4/5">
                  <img
                    src={character.images.default}
                    alt={character.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-md grid place-items-center h-1/5 md:text-xl lg:text-2xl xl:text-3xl">
                  <span className="text-center text-gray-800 italic font-medium">
                    {character.name}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="z-10 mt-1 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
          <button
            className="px-4 py-1 font-medium bg-green-400 hover:bg-green-500 rounded-md focus:outline-none shadow-md cursor-pointer md:px-6 md:py-2"
            onClick={finishSelection}
          >
            Go
          </button>
        </div>
      </div>
      <style jsx>{`
        .bg {
          background-color: #f6cfcf;
          background-image: url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%23891818' fill-opacity='0.4'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </>
  )
}

export default CharacterSelect
