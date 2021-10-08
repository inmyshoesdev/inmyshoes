import { Dimension, Position } from '../lib/elements'
import { getAnimationClass } from './utils'

interface ClickableTextProps {
  text: string
  position?: Position
  dimension?: Dimension
  effect?: string //'none' | 'pulse' | 'bounce' | 'ping' | 'spin' | 'wiggle'
  onClick: () => void
}

const ClickableText = ({
  text,
  position = {},
  dimension = {},
  effect = 'none',
  onClick,
}: ClickableTextProps) => {
  const positionDefined =
    position?.top || position?.left || position?.right || position?.bottom

  return (
    <span
      className={
        `select-none positioned text-md absolute px-4 py-3 text-gray-900 
        font-semibold bg-gray-100 border border-gray-700 
        rounded shadow cursor-pointer 
         hover:bg-gray-300` + getAnimationClass(effect)
      }
      onClick={onClick}
      style={{
        top: positionDefined ? position?.top || 'unset' : '50%',
        left: positionDefined ? position?.left || 'unset' : '50%',
        right: positionDefined ? position?.right || 'unset' : 'unset',
        bottom: positionDefined ? position?.bottom || 'unset' : 'unset',
        width: dimension?.width || 'auto',
        height: dimension?.height || 'auto',
        transform: positionDefined ? 'unset' : 'translate(-50%, -50%)',
      }}
    >
      {text}
    </span>
  )
}

export default ClickableText
