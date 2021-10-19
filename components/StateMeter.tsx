import { useEffect, useState } from 'react'
import { Tooltip } from '@chakra-ui/react'
import { Line } from 'rc-progress'
import { useStore } from '../stores/store'

export interface StateMeterProps {
  title: string
  state: string
  iconImage?: string
  color?: string
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
    <div className="flex flex-col w-1/4 h-full overflow-hidden">
      <p className="h-1/3 text-sm capitalize">{title}</p>
      <div className="flex flex-grow flex-shrink items-center h-2/3">
        <div className="flex items-center h-full">
          {iconImage && (
            <img
              src={iconImage}
              className="px-2 w-1/5 h-full object-contain"
              alt={`${title} icon`}
            />
          )}

          <Tooltip label={`${value}/${max}`} bg="gray.600">
            <div className="relative border border-gray-600 rounded-sm overflow-hidden md:rounded-md lg:rounded-lg">
              <div className="absolute left-0 right-0 top-0 h-2/5 bg-gradient-to-b rounded-full from-white opacity-60" />
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t rounded-full from-gray-600 opacity-40" />
              <div className="w-1/50 absolute bottom-1 left-0 top-1 bg-gradient-to-r rounded-full from-gray-900 mix-blend-overlay" />
              <div className="w-1/50 absolute bottom-1 right-0 top-1 bg-gradient-to-l rounded-full from-gray-900 mix-blend-overlay" />
              <Line
                percent={progress}
                strokeColor={color || '#00BFFF'}
                strokeLinecap="square"
                strokeWidth={10}
                trailWidth={10}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
              <style jsx global>{`
                .rc-progress-line-path {
                  --easing-function: cubic-bezier(0.39, 1.49, 0.84, 1);
                  transition: stroke-dashoffset 0.5s var(--easing-function) 0.1s,
                    stroke-dasharray 0.5s var(--easing-function) 0.1s,
                    stroke 0.5s linear 0.1s !important;
                }
              `}</style>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
