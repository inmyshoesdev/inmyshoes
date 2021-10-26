import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useEffect, useState } from 'react'
import { useStore } from '../stores/store'

export interface StateDisplayProps {
  title: string
  state: string
  iconImage?: string
}

export default function StateDisplay({
  title,
  state,
  iconImage,
}: StateDisplayProps) {
  const stateObj = useStore(
    (gameState) => gameState.game.globalState.innerState[state]
  )
  const [value, setValue] = useState<any>(undefined)

  useEffect(() => {
    if (stateObj) {
      setValue(stateObj.value)
    }
  }, [stateObj])

  return (
    <div className="flex flex-col items-center w-1/6 h-full overflow-hidden">
      <p className="h-1/3 text-xs capitalize md:text-sm">{title}</p>
      <div className="flex flex-grow flex-shrink items-center w-full h-2/3">
        {iconImage && (
          <img
            className="mx-2 w-1/5 h-full object-contain sm:w-1/4 lg:w-1/3"
            src={iconImage}
            alt={`${title} display`}
          />
        )}
        <div className="overflow-hidden">
          <TransitionGroup>
            <CSSTransition key={value} timeout={300} classNames="state-value">
              <p className="whitespace-nowrap text-xs font-bold overflow-hidden sm:text-xs md:text-sm lg:text-base xl:text-lg">
                {value}
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
    </div>
  )
}
