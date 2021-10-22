import { Button } from '@chakra-ui/button'
import { Tooltip } from '@chakra-ui/tooltip'
import useSound from 'use-sound'
import { useStateTemplater } from '../hooks/useStateTemplater'
import { Dimension, Position } from '../lib/elements'
import { getAnimationClass, renderMdToHtml } from './utils'

interface ClickableTextProps {
  text: string
  position?: Position
  dimension?: Dimension
  effect?: string //'none' | 'pulse' | 'bounce' | 'ping' | 'spin' | 'wiggle'
  disabled?: boolean
  disabledLabel?: string
  onClick: () => void
}

const ClickableText = ({
  text,
  position = {},
  dimension = {},
  effect = 'none',
  disabled,
  disabledLabel,
  onClick,
}: ClickableTextProps) => {
  const template = useStateTemplater()

  const positionDefined =
    position?.top || position?.left || position?.right || position?.bottom
  const [play] = useSound('/sounds/pop-down.mp3', { volume: 0.2 })

  return (
    <Tooltip
      label={disabled ? disabledLabel : ''}
      bg={disabled ? 'red.400' : 'gray.100'}
      p={3}
      color="black"
      placement="top"
    >
      <button
        className={
          `positioned mx-auto text-3xs sm:text-2xs md:text-xs lg:text-sm xl:text-base text-center absolute
        px-2 py-1 md:px-4 md:py-3  
        font-medium text-white border border-gray-300 
        rounded shadow bg-opacity-80 ` +
          (disabled
            ? 'cursor-default bg-gray-400 '
            : 'cursor-pointer bg-gray-700 hover:bg-gray-800 ') +
          getAnimationClass(effect)
        }
        onClick={
          disabled
            ? undefined
            : () => {
                play()
                onClick()
              }
        }
        style={{
          top: positionDefined ? position?.top || 'unset' : '50%',
          left: positionDefined ? position?.left || 'unset' : '50%',
          right: positionDefined ? position?.right || 'unset' : 'unset',
          bottom: positionDefined ? position?.bottom || 'unset' : 'unset',
          width: dimension?.width || 'max-content',
          height: dimension?.height || 'unset',
          transform: positionDefined ? 'unset' : 'translate(-50%, -50%)',
        }}
        dangerouslySetInnerHTML={{ __html: template(renderMdToHtml(text)) }}
      />
    </Tooltip>
  )
}

export default ClickableText
