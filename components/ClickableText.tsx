import { Dimension, Position } from '../lib/elements'

interface ClickableTextProps {
  text: string
  position?: Position
  dimension?: Dimension
  onClick: () => void
}

const ClickableText = ({
  text,
  position = {},
  dimension = {},
  onClick,
}: ClickableTextProps) => {
  return (
    <span
      className="positioned text-md absolute px-4 py-3 text-gray-900 font-semibold bg-gray-100 border border-gray-700 rounded shadow cursor-pointer"
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
