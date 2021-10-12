import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Tooltip } from '@chakra-ui/react'

export default function ScreenSizeAdjustment({
  setSizeAdjustment,
}: {
  setSizeAdjustment: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element {
  return (
    <div className="absolute right-10 top-1 mx-4 focus:outline-none">
      <Tooltip label="Reduce Screen Size">
        <IconButton
          aria-label="reduce"
          variant="ghost"
          icon={<MinusIcon className="cursor-pointer" />}
          onClick={() =>
            setSizeAdjustment((state) => Math.max(state - 16 / 9, -64 / 9))
          }
        />
      </Tooltip>
      <Tooltip label="Enlarge Screen Size">
        <IconButton
          aria-label="enlarge"
          variant="ghost"
          icon={<AddIcon className="cursor-pointer" />}
          onClick={() =>
            setSizeAdjustment((state) => Math.min(state + 16 / 9, 64 / 9))
          }
        />
      </Tooltip>
    </div>
  )
}
