import { Transition } from '@headlessui/react'
import type { Image } from '../lib/elements'

type ImageElementProps = {
  blurSceneBackground?: boolean
} & Image

const ImageElement: React.FC<ImageElementProps> = ({
  shown,
  src,
  altText,
  position,
  dimension,
  blendMode,
  afterInteractionCallback,
  blurSceneBackground = false,
}) => {
  const positionDefined =
    position?.top || position?.left || position?.right || position?.bottom

  // hacky, but should work for now
  const isBackground =
    dimension && dimension.height === '100%' && dimension.width === '100%'

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
          className={`image w-full h-full object-contain transition-filter duration-500 ${
            isBackground && blurSceneBackground ? 'blur-sm' : ''
          }`}
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
