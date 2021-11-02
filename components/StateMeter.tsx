import { useEffect, useState } from 'react'
import { Tooltip } from '@chakra-ui/react'
import { Line } from 'rc-progress'
import { useStore } from '../stores/store'
import { usePreviousDebounced } from '../hooks/useDebounce'
import { Transition } from '@headlessui/react'

export interface StateMeterProps {
  title: string
  state: string
  iconImage?: string
  color?: string
}

function getStateChangeText(curr: number, prev: number): string {
  const diff = curr - prev
  return diff === 0 ? '' : diff > 0 ? `+${diff}` : diff.toString()
}

export default function StateMeter({
  title,
  state,
  iconImage,
  color,
}: StateMeterProps) {
  const stateObj = useStore(
    (gameState) => gameState.game.globalState.innerState[state]
  )

  const [min] = useState(stateObj.min || 0)
  const [max] = useState(stateObj.max || (stateObj.value as number))
  const [value, setValue] = useState(stateObj.value)
  const [progress, setProgress] = useState(0)

  const debounced = usePreviousDebounced<number>(
    typeof value === 'number' ? value : 0,
    100
  )

  useEffect(() => {
    let stateValue = (stateObj.value as number) || 0
    if (stateValue < min) stateValue = min

    let progressvalue = (stateValue / max) * 100
    if (progressvalue < 0) progressvalue = 0
    else if (progressvalue > 100) progressvalue = 100

    setValue(stateValue)
    setProgress(progressvalue)
  }, [max, min, stateObj.value])

  return (
    <div className="relative flex flex-col ml-7">
      <div className="flex mobile:hidden items-end justify-center ml-2 pt-1 h-1/3">
        <span className="text-2xs capitalize sm:text-xs lg:text-sm">
          {title}
        </span>
      </div>
      <div className="flex flex-auto items-center h-2/3 sm:space-x-1">
        <div className="min-w-5 max-w-10 flex items-center justify-between w-1/5 h-full">
          <div className="relative px-1 h-full">
            {iconImage && (
              <img
                src={iconImage}
                className="w-full h-full object-contain"
                alt={`${title} icon`}
              />
            )}
            <Transition
              show={debounced.updated && debounced.prev !== undefined}
              leave="transition duration-1000 delay-1000"
              leaveFrom={
                'scale-100 opacity-100 -translate-y-7 lg:-translate-y-8 ' +
                'mobile:translate-y-0 mobile:-translate-x-4 mobile:sm:-translate-x-5 mobile:md:-translate-x-7'
              }
              leaveTo="scale-30 opacity-10 translate-y-0 translate-x-0 "
              className="absolute inset-0 grid place-items-center m-auto whitespace-nowrap overflow-y-visible"
            >
              <span className="w-full text-center 2xl:text-2xl text-xs font-bold sm:text-sm md:text-base lg:text-lg xl:text-xl">
                {debounced.prev !== undefined &&
                  getStateChangeText(debounced.curr, debounced.prev)}
              </span>
              <style jsx>{`
                span {
                  -webkit-text-stroke: 1px black;
                  -webkit-text-fill-color: ${color};
                }

                @media (max-width: 640px) {
                  span {
                    -webkit-text-stroke: 0.75px black;
                  }
                }
              `}</style>
            </Transition>
          </div>
        </div>
        <Tooltip label={`${value}/${max}`} bg="gray.600">
          <div className="relative border border-gray-600 rounded-sm overflow-hidden md:rounded-md lg:rounded-lg">
            <Line
              percent={progress}
              strokeColor={color || '#00BFFF'}
              strokeLinecap="square"
              strokeWidth={10}
              trailWidth={10}
              style={{
                width: '106%',
                height: '100%',
                transform: 'translateX(-4%)',
              }}
            />
            <div className="absolute left-0 right-0 top-0 h-2/5 bg-gradient-to-b rounded-full from-white opacity-60" />
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t rounded-full from-gray-600 opacity-40" />
            <div className="absolute bottom-1 left-0 top-1 w-1/50 bg-gradient-to-r rounded-full from-gray-900 mix-blend-overlay" />
            <div className="absolute bottom-1 right-0 top-1 w-1/50 bg-gradient-to-l rounded-full from-gray-900 mix-blend-overlay" />
            <style jsx global>{`
              .rc-progress-line-path {
                --easing-function: cubic-bezier(0.39, 1.49, 0.84, 1);
                --transition-duration: 0.6s;
                --transition-delay: 1s;
                transition: stroke-dashoffset var(--transition-duration)
                    var(--easing-function) var(--transition-delay),
                  stroke-dasharray var(--transition-duration)
                    var(--easing-function) var(--transition-delay),
                  stroke var(--transition-duration) linear
                    var(--transition-delay) !important;
              }
            `}</style>
          </div>
        </Tooltip>
      </div>
    </div>
  )
}
