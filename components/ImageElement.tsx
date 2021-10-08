import { Transition } from '@headlessui/react'
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

  return (
    <Transition
      show={shown}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <div className="container absolute mx-auto" onClick={handleInteraction}>
        <img
          src={src}
          alt={altText || ''}
          className="image w-full h-full object-fill"
        />
      </div>
      <style jsx>{`
        .container {
          top: ${position.top || '50%'};
          left: ${position.left || '50%'};
          right: ${position.right || 'unset'};
          bottom: ${position.bottom || 'unset'};
          width: ${dimension.width || 'auto'};
          height: ${dimension.height || 'unset'};
          transform: ${position.top ||
          position.left ||
          position.right ||
          position.bottom
            ? 'unset'
            : 'translate(-50%, -50%)'};
        }

        .image {
          mix-blend-mode: ${blendMode || 'unset'};
        }
      `}</style>
    </Transition>
  )
}

export default ImageElement
