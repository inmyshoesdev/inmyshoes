import { Transition } from '@headlessui/react'
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
  const positionDefined =
    position?.top || position?.left || position?.right || position?.bottom

  return (
    <Transition
      show={shown}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <div
        className="container absolute mx-auto"
        onClick={afterInteractionCallback}
      >
        <img
          src={src}
          alt={altText || ''}
          className="image w-full h-full object-fill"
        />
      </div>
      <style jsx>{`
        .container {
          top: ${positionDefined ? position?.top || 'unset' : '50%'};
          left: ${positionDefined ? position?.left || 'unset' : '50%'};
          right: ${positionDefined ? position?.right || 'unset' : 'unset'};
          bottom: ${positionDefined ? position?.bottom || 'unset' : 'unset'};
          width: ${dimension.width || 'max-content'};
          height: ${dimension.height || 'unset'};
          transform: ${positionDefined ? 'unset' : 'translate(-50%, -50%)'};
        }

        .image {
          mix-blend-mode: ${blendMode || 'unset'};
        }
      `}</style>
    </Transition>
  )
}

export default ImageElement
