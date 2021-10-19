import { useEffect, useState } from 'react'
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

          <div className="border border-gray-800 rounded-full overflow-hidden">
            <Line
              percent={progress}
              strokeColor={color || '#00BFFF'}
              strokeLinecap="square"
              strokeWidth={10}
              trailWidth={10}
              className="fix-transitions"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
            <style jsx global>{`
              .rc-progress-line-path {
                --easing-function: cubic-bezier(0.39, 1.49, 0.84, 1);
                transition: stroke-dashoffset 0.4s var(--easing-function) 0s,
                  stroke-dasharray 0.4s var(--easing-function) 0s,
                  stroke 0.4s linear 0s !important;
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  )
}
