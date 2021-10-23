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
    <div
      className={`${
        characterSelected ? 'hidden' : ''
      } absolute inset-[10%] top-0 flex flex-col items-center `}
      style={{
        aspectRatio: '16/9',
      }}
    >
      <div className="h-[10%] flex items-center">
        <h1 className="px-2 text-white text-2xs bg-gray-700 opacity-90 sm:text-base md:text-lg lg:text-xl">
          Character Selection
        </h1>
      </div>
      <div className="h-[80%] flex items-center w-1/2 text-xs sm:w-full sm:text-base">
        <Swiper
          modules={[A11y, Mousewheel, EffectCube]}
          effect="cube"
          mousewheel={true}
          className="h-[80%] w-[30vw]"
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
      </div>
      <div className="h-[10%] z-10 flex items-center justify-center">
        <button
          className="px-2 py-1 text-center text-2xs font-medium bg-green-400 hover:bg-green-500 rounded-md focus:outline-none shadow-md cursor-pointer sm:px-4 sm:text-base md:px-5 md:py-2 md:text-lg lg:px-6 lg:text-xl"
          onClick={finishSelection}
        >
          Go
        </button>
      </div>
    </div>
  )
}

export default CharacterSelect
