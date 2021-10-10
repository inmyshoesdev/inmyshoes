import { Box } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { useStore } from '../stores/store'

export interface StateDisplayProps {
  title: string
  state: string
  labelImage?: string
}

export default function StateDisplay({
  title,
  state,
  labelImage,
}: StateDisplayProps) {
  const stateObj = useStore(
    (gameState) => gameState.game.globalState.innerState[state]
  )
  const [value, setValue] = useState<any>(undefined)

  useEffect(() => {
    setValue(stateObj.value)
  }, [stateObj.value])

  return (
    <div className="flex flex-col items-center h-full">
      <p className="text-sm capitalize">{title}</p>
      <div className="flex flex-grow items-center">
        {labelImage && <img src={labelImage} />}
        <p className="mx-[10px] font-bold">{value}</p>
      </div>
    </div>
  )
}
