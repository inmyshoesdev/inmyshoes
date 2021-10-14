import { CharacterInfoSlide } from '../lib/character'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, EffectCards, Mousewheel } from 'swiper'
function CharacterInfo({
  characterInfo,
  hidden,
  setHidden,
  setBlurBackground,
}: {
  characterInfo: CharacterInfoSlide[]
  hidden: boolean
  setHidden: (hidden: boolean) => void
  setBlurBackground: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div
      className={`${
        hidden ? 'hidden' : ''
      } absolute w-[55vw] top-20 xl:top-24 flex flex-col items-center gap-4`}
      style={{
        aspectRatio: '16/9',
      }}
    >
      {/* todo implement reselect */}
      {/* <button className="justify-content flex mx-auto px-2 font-semibold bg-yellow-600 rounded-sm focus:outline-none">
        Reselect
      </button> */}
      <h1 className="px-2 text-white bg-gray-700 opacity-90">
        Character Information
      </h1>
      <div className="w-1/2 h-full text-xs sm:w-full sm:text-base">
        <Swiper
          modules={[A11y, Mousewheel, EffectCards]}
          effect="cards"
          mousewheel={true}
          className="h-full"
        >
          {characterInfo.map((info) => (
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

      <div className="flex items-center justify-center">
        <button
          className="px-4 text-center text-lg font-semibold bg-green-400 rounded focus:outline-none"
          onClick={() => {
            setHidden(true)
            setBlurBackground((state) => !state)
          }}
        >
          Resume
        </button>
      </div>
    </div>
  )
}

export default CharacterInfo
