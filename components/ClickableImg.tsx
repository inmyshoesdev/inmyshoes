import { Dimension, Position } from '../lib/elements'

interface ClickableImgProps {
  src: string
  altText: string
  position?: Position
  dimension?: Dimension
  onClick: () => void
}

const ClickableImg = ({
  src,
  altText,
  position = {},
  dimension = {},
  onClick,
}: ClickableImgProps) => {
  return (
    <img
      className="positioned absolute cursor-pointer object-cover"
      onClick={onClick}
      alt={altText}
      src={src}
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
    />
  )
}

export default ClickableImg
