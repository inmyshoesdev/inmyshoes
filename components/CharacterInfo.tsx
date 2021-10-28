import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, EffectCards, Navigation, Mousewheel } from 'swiper'
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
import 'swiper/css'
import 'swiper/css/navigation'

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
      }  h-full w-full flex pt-1 flex-col items-center gap-2 md:gap-3 lg:gap-4 xl:gap-6 md:pt-2`}
    >
      <h1 className="px-2 bg-gray-700 border border-gray-900 rounded-handdrawn opacity-90 select-none md:px-3 md:py-1 md:border-2">
        <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
          Character Information
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
        }

        .swiper-parent :global(.swiper-button-prev) {
          left: -25%;
        }
      `}</style>
      <div className="swiper-parent w-1/2 h-full">
        <Swiper
          modules={[A11y, Mousewheel, EffectCards, Navigation]}
          effect="cards"
          navigation={true}
          mousewheel={true}
          className="h-full"
          key={characterIndex}
        >
          {characterSelected &&
            game.mainCharacters[characterIndex].info.map((info) => (
              <SwiperSlide
                key={info.text}
                className="relative h-2"
                style={{
                  backgroundImage: `url(${info.backgroundImage})`,
                  backgroundSize: 'cover',
                }}
              >
                {/* <img
                  src={info.backgroundImage}
                  alt={`image showing character information for ${game.mainCharacters[characterIndex].name}`}
                /> */}
                <div className="bg-gray-900/80 absolute bottom-0 inset-x-0 mx-auto p-1 w-max max-w-full text-center">
                  <span className="text-gray-100 text-2xs leading-3 sm:text-xs md:text-sm lg:text-base">
                    {info.text}
                  </span>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="z-10 flex flex-col gap-2 items-center justify-center my-1 md:gap-3 lg:gap-4 lg:my-3 xl:gap-8 xl:my-6">
        <button
          className="px-3 text-center font-medium bg-green-400 hover:bg-green-500 rounded cursor-pointer md:px-4 md:py-1"
          onClick={() => {
            setHidden(true)
            setBlurBackground((state) => !state)
          }}
        >
          <span className="text-xs sm:text-sm md:text-base lg:text-lg">
            Resume
          </span>
        </button>
        <Popover>
          <PopoverTrigger>
            <button className="mx-auto px-1 font-medium bg-yellow-400 hover:bg-yellow-500 rounded cursor-pointer md:px-2 md:py-1">
              <span className="text-2xs sm:text-xs md:text-sm lg:text-base">
                Reselect
              </span>
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
