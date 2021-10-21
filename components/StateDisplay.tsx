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
      <div className="flex flex-grow flex-shrink items-center h-2/3">
        {iconImage && (
          <img
            className="mx-2 w-4 h-full object-contain sm:w-1/4 xl:w-1/3"
            src={iconImage}
            alt={`${title} icon`}
          />
        )}
        <p className="w-2/3 text-2xs font-bold sm:text-xs md:text-sm lg:text-base">
          {value}
        </p>
      </div>
    </div>
  )
}
