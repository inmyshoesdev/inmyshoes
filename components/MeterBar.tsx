import { Box } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { useStore } from '../stores/store'

export interface MeterBarProps {
  state: string
  fullImage: string
  emptyImage: string
  max: number
}

export default function MeterBar({
  state,
  fullImage,
  emptyImage,
  max,
}: MeterBarProps) {
  const game = useStore((state) => state.game)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let stateValue = (game?.globalState.innerState[state] as number) || 0
    let progressvalue = max !== 0 ? (stateValue / max) * 100 : 0
    if (progressvalue < 0) progressvalue = 0
    else if (progressvalue > 100) progressvalue = 100
    setProgress(progressvalue)
  }, [game.globalState.innerState[state]])

  return (
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
  )
}
