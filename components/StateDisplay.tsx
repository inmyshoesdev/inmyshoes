import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useEffect, useState } from 'react'
import { useStore } from '../stores/store'
import { Tooltip } from '@chakra-ui/tooltip'
import useSound from 'use-sound'

export interface StateDisplayProps {
  title: string
  state: string
  iconImage?: string
  setHideBadgeCollection: React.Dispatch<React.SetStateAction<boolean>>
  setBlurBackground: React.Dispatch<React.SetStateAction<boolean>>
}

export default function StateDisplay({
  title,
  state,
  iconImage,
  setHideBadgeCollection,
  setBlurBackground,
}: StateDisplayProps) {
  const stateObj = useStore(
    (gameState) => gameState.game.globalState.innerState[state]
  )
  const [value, setValue] = useState<any>(undefined)
  const [buttonClickPlay] = useSound('/sounds/switch-on.mp3', { volume: 0.2 })

  useEffect(() => {
    if (stateObj) {
      setValue(stateObj.value)
    }
  }, [stateObj])

  return (
    <div className="flex flex-col items-center w-1/6 h-full overflow-hidden">
      <div className="flex mobile:hidden items-end justify-center -ml-2 pt-1 h-1/3">
        <span className="text-2xs capitalize sm:text-xs lg:text-sm">
          {title}
        </span>
      </div>
      <Tooltip
        label={`${
          value === undefined || value.length === 0
            ? 'Empty'
            : 'View Collected Badges'
        }`}
      >
        <div className="flex flex-grow flex-shrink items-center justify-center w-full h-2/3">
          {iconImage && (
            <img
              className="mx-2 w-1/5 h-full cursor-pointer object-contain sm:w-1/4 lg:w-1/3"
              src={iconImage}
              alt={`${title} display`}
              onClick={() => {
                if (value === undefined || value.length === 0) {
                  return
                }
                buttonClickPlay()
                setHideBadgeCollection((state) => !state)
                setBlurBackground((state) => !state)
              }}
            />
          )}
          <div className="w-4 overflow-hidden">
            <TransitionGroup>
              <CSSTransition
                key={value?.length ?? 0}
                timeout={300}
                classNames="state-value"
              >
                <p className="text-yellow-500 whitespace-nowrap text-xs font-bold overflow-hidden sm:text-sm md:text-lg lg:text-base xl:text-xl">
                  {value?.length ?? 0}
                </p>
              </CSSTransition>
            </TransitionGroup>
          </div>
          <style jsx global>{`
            .state-value-enter {
              transform: translateY(-100%);
            }
            .state-value-enter-active {
              transform: translateY(0%);
              transition: all 500ms ease;
            }
            .state-value-exit {
              transform: translateY(0%);
            }
            .state-value-exit-active {
              transform: translateY(100%);
              transition: all 500ms ease;
            }
          `}</style>
        </div>
      </Tooltip>
    </div>
  )
}
