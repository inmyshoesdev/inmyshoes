import { MainCharacter } from '../lib/character'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, EffectCube, Mousewheel } from 'swiper'
import { useState } from 'react'
function CharacterSelect({
  mainCharacters,
  setCharacterSelected,
  updateCharacter,
  hidden,
  setHidden,
}: {
  mainCharacters: MainCharacter[]
  hidden: boolean
  setHidden: (hidden: boolean) => void
  setCharacterSelected: (isSelected: boolean) => void
  updateCharacter: (characterIndex: number) => void
}) {
  const [characterIndex, setCharacterIndex] = useState(0)
  function finishSelection() {
    setHidden(true)
    updateCharacter(characterIndex)
    setCharacterSelected(true)
  }
  return (
    <div
      className={`${
        hidden ? 'hidden' : ''
      } w-auto mx-auto flex flex-col items-center gap-4`}
      style={{
        aspectRatio: '16/9',
      }}
    >
      <h1 className="px-2 text-white text-xl bg-gray-700 opacity-90">
        Character Selection
      </h1>
      <div className="w-1/2 h-auto text-xs sm:w-full sm:text-base">
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
      </div>
      <div className="z-10 flex items-center justify-center">
        <button
          className="px-4 text-center text-lg font-semibold bg-green-400 rounded focus:outline-none"
          onClick={finishSelection}
        >
          Go
        </button>
      </div>
    </div>
  )
}

export default CharacterSelect
