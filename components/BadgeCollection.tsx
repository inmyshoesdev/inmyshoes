import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Navigation, Mousewheel } from 'swiper'
import { useStore } from '../stores/store'
import { Badge } from '../lib/state'

function BadgeCollection({
  hidden,
  setHidden,
  setBlurBackground,
}: {
  hidden: boolean
  setHidden: (hidden: boolean) => void
  setBlurBackground: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const characterIndex = useStore((state) => state.game.characterIndex)
  const badges = useStore(
    (state) => state.game.globalState.innerState['badges']?.value as Badge[]
  )
  return (
    <div
      className={`${
        hidden ? 'hidden' : ''
      }  h-full w-full flex pt-1 flex-col items-center gap-2 md:gap-3 lg:gap-4 xl:gap-6 md:pt-2`}
    >
      <h1 className="px-2 bg-gray-700 border border-gray-900 rounded-handdrawn opacity-90 select-none md:px-3 md:py-1 md:border-2">
        <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
          My Badge Collection
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
          right: 3%;
          cursor: url(https://soristic.sgp1.digitaloceanspaces.com/general/curhand.cur),
            auto !important;
        }

        .swiper-parent :global(.swiper-button-prev) {
          left: 3%;
          cursor: url(https://soristic.sgp1.digitaloceanspaces.com/general/curhand.cur),
            auto !important;
        }
      `}</style>
      {badges && (
        <div className="swiper-parent w-3/5">
          <Swiper
            modules={[A11y, Mousewheel, Navigation]}
            navigation={true}
            mousewheel={true}
            className="h-full"
            key={characterIndex}
          >
            {badges.map((info) => (
              <SwiperSlide
                key={info.name}
                className="aspect-w-16 aspect-h-9 relative"
              >
                <img
                  className="object-contain"
                  src={info.src}
                  alt={info.text}
                />
                <div className="bg-gray-900/80 absolute top-unset mx-auto p-1 w-max max-w-full h-max text-center">
                  <span className="text-gray-100 text-2xs leading-3 sm:text-xs md:text-sm lg:text-base">
                    {info.text}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div className="z-10 flex gap-3 items-center justify-center my-2 lg:flex-col lg:my-1 xl:gap-6 xl:my-3">
        <button
          className="px-3 text-center font-medium bg-green-400 hover:bg-green-500 rounded cursor-pointer md:px-4 md:py-1"
          onClick={() => {
            setHidden(true)
            setBlurBackground(false)
          }}
        >
          <span className="text-xs cursor-pointer sm:text-sm md:text-base lg:text-lg">
            Resume
          </span>
        </button>
      </div>
    </div>
  )
}

export default BadgeCollection
