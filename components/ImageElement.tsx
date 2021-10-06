import { useAfterInteractionCallback } from '../hooks/useAfterInteractionCallback'
import type { Image } from '../lib/elements'

const ImageElement: React.FC<Image> = ({
  shown,
  src,
  altText,
  position,
  dimension,
  blendMode,
  afterInteractionCallback,
}) => {
  const handleInteraction = useAfterInteractionCallback(
    afterInteractionCallback
  )

  if (!shown) {
    return null
  }

  return (
    <div className="container absolute mx-auto" onClick={handleInteraction}>
      <img
        src={src}
        alt={altText || ''}
        className="image w-full h-full object-fill"
      />
      <style jsx>{`
        .container {
          top: ${position.top || 'unset'};
          right: ${position.right || 'unset'};
          left: ${position.left || 'unset'};
          bottom: ${position.bottom || 'unset'};
          width: ${dimension.width || 'auto'};
          height: ${dimension.height || 'unset'};
        }

        .image {
          mix-blend-mode: ${blendMode || 'unset'};
        }
      `}</style>
    </div>
  )
}

export default ImageElement
