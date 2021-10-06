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
        top: position?.top || '50%',
        left: position?.left || '50%',
        right: position?.right || 'unset',
        bottom: position?.bottom || 'unset',
        width: dimension?.width || 'auto',
        height: dimension?.height || 'auto',
        transform:
          position?.top || position?.left || position?.right || position?.bottom
            ? 'unset'
            : 'translate(-50%, -50%)',
      }}
    >
      {text}
    </span>
  )
}

export default ClickableText
