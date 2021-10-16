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
    <div className="flex flex-col items-center w-1/6 h-full overflow-hidden">
      <p className="h-1/3 text-sm capitalize">{title}</p>
      <div className="flex flex-grow flex-shrink items-center h-2/3">
        {labelImage && (
          <img className="mx-2 w-1/3 h-full object-contain" src={labelImage} />
        )}
        <p className="w-2/3 font-bold">{value}</p>
      </div>
    </div>
  )
}
