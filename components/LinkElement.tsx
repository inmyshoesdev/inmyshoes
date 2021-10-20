import { Transition } from '@headlessui/react'
import NextLink from 'next/link'
import { useStateTemplater } from '../hooks/useStateTemplater'
import { Link } from '../lib/elements'
import { renderMdToHtml } from './utils'

const LinkElement: React.FC<Link> = ({
  shown,
  url,
  text,
  position,
  dimension,
  afterInteractionCallback,
}) => {
  const template = useStateTemplater()

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
        className="positioned absolute mx-auto px-4 py-3 max-w-sm bg-gray-100 hover:bg-gray-200 border border-gray-700 rounded shadow"
        onClick={afterInteractionCallback}
      >
        <NextLink href={url}>
          <a className="text-md !text-gray-900 !no-underline font-medium cursor-pointer">
            {template(renderMdToHtml(text))}
          </a>
        </NextLink>
      </div>
      <style jsx>{`
        .positioned {
          top: ${positionDefined ? position?.top || 'unset' : '50%'};
          left: ${positionDefined ? position?.left || 'unset' : '50%'};
          right: ${positionDefined ? position?.right || 'unset' : 'unset'};
          bottom: ${positionDefined ? position?.bottom || 'unset' : 'unset'};
          width: ${dimension.width || 'max-content'};
          height: ${dimension.height || 'unset'};
          transform: ${positionDefined ? 'unset' : 'translate(-50%, -50%)'};
        }
      `}</style>
    </Transition>
  )
}

export default LinkElement
