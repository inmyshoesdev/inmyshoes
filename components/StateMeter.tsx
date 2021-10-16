import { useEffect, useState } from 'react'
import { Progress } from '@chakra-ui/react'
import { Line, Circle } from 'rc-progress'
import { useStore } from '../stores/store'

export interface StateMeterProps {
  title: string
  state: string
  fullImage: string
  emptyImage: string
}

export default function StateMeter({
  title,
  state,
  fullImage,
  emptyImage,
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
  }, [stateObj.value])

  return (
    <div className="flex flex-col w-1/4 h-full overflow-hidden">
      <p className="h-1/3 text-sm capitalize">{title}</p>
      <div className="flex flex-grow flex-shrink items-center h-2/3">
        <div className="flex items-center h-full">
          <img
            src="/images/Social.png"
            className="px-2 w-1/5 h-full object-contain"
          />

          <Line
            percent={progress}
            strokeColor="#ed239A"
            strokeLinecap="round"
            strokeWidth={10}
            trailWidth={10}
            style={{
              width: '80%',
              height: '50%',
              // borderRadius: 10,
            }}
          />
        </div>
      </div>

      {/* <div className="flex justify-center">
        <div className="relative">
          <div
            style={{
              width: 'max-content',
              height: 'max-content',
            }}
          >
            <img src={emptyImage} className="object-none object-left" />
          </div>
          <div
            className="absolute left-0 top-0"
            style={{
              width: `${progress}%`,
              height: '100%',
              overflow: 'clip',
            }}
          >
            <img
              src={fullImage}
              className="object-none object-left"
              style={{ height: '100%' }}
            />
          </div>
        </div>
        <p className="mx-[10px] mt-2 font-bold">{value}</p>
      </div> */}
    </div>
  )
}
