import { useEffect, useState } from 'react'
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
    <div className="flex flex-col">
      <p className="text-sm capitalize">{title}</p>
      <div className="flex justify-center">
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
      </div>
    </div>
  )
}
