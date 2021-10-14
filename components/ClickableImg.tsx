import { Tooltip } from '@chakra-ui/tooltip'
import useSound from 'use-sound'
import { Dimension, Position } from '../lib/elements'
import { getAnimationClass } from './utils'

interface ClickableImgProps {
  src: string
  altText: string
  blendMode?: string
  position?: Position
  dimension?: Dimension
  effect?: string //'none' | 'pulse' | 'bounce' | 'ping' | 'spin' | 'wiggle'
  onClick: () => void
}

const ClickableImg = ({
  src,
  altText,
  blendMode,
  position = {},
  dimension = {},
  effect = 'none',
  onClick,
}: ClickableImgProps) => {
  const positionDefined =
    position?.top || position?.left || position?.right || position?.bottom
  const [play] = useSound('/sounds/pop-down.mp3', { volume: 0.2 })

  return (
    <>
      <Tooltip
        label={altText}
        bg="gray.100"
        p={3}
        color="black"
        placement="top"
      >
        <img
          className={
            'positioned image absolute cursor-pointer object-cover ' +
            getAnimationClass(effect)
          }
          onClick={() => {
            play()
            onClick()
          }}
          alt={altText}
          src={src}
          style={{
            top: positionDefined ? position?.top || 'unset' : '50%',
            left: positionDefined ? position?.left || 'unset' : '50%',
            right: positionDefined ? position?.right || 'unset' : 'unset',
            bottom: positionDefined ? position?.bottom || 'unset' : 'unset',
            width: dimension?.width || 'auto',
            height: dimension?.height || 'auto',
            transform: positionDefined ? 'unset' : 'translate(-50%, -50%)',
          }}
        />
      </Tooltip>
      <style jsx>{`
        .image {
          mix-blend-mode: ${blendMode || 'unset'};
        }
      `}</style>
    </>
  )
}

export default ClickableImg
