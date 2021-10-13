import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Tooltip } from '@chakra-ui/react'

export default function ScreenSizeAdjustment({
  setStoredScreenWidth,
}: {
  setStoredScreenWidth: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element {
  return (
    <div className="absolute right-10 top-1 mx-4 focus:outline-none">
      <Tooltip label="Reduce Screen Size">
        <IconButton
          aria-label="reduce"
          variant="ghost"
          icon={<MinusIcon className="cursor-pointer" />}
          onClick={() =>
            setStoredScreenWidth((state: number) =>
              Math.max(state - 0.5625, 69.75)
            )
          }
        />
      </Tooltip>
      <Tooltip label="Enlarge Screen Size">
        <IconButton
          aria-label="enlarge"
          variant="ghost"
          icon={<AddIcon className="cursor-pointer" />}
          onClick={() =>
            setStoredScreenWidth((state: number) =>
              Math.min(state + 0.5625, 80)
            )
          }
        />
      </Tooltip>
    </div>
  )
}
