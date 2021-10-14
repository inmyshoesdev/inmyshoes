import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react'
import {
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useState,
} from 'react'
import Typewriter from 'typewriter-effect'
import { useStateTemplater } from '../hooks/useStateTemplater'
import { Position, Dimension } from '../lib/elements'
import { renderMdToHtml } from './utils'

export interface DialogueBoxProps {
  image?: string
  position?: Position
  dimension?: Dimension
  header?: ReactNode
  bodyClass?: string
  bodyStyle?: CSSProperties
  bodyText?: string
  gotoNext?: () => void
  gotoPrev?: () => void
  prevEnabled?: boolean
  nextEnabled?: boolean
}

const DialogueBox: React.FC<DialogueBoxProps> = ({
  image,
  position,
  dimension,
  header,
  bodyStyle,
  bodyText = '',
  gotoNext,
  gotoPrev,
  prevEnabled = true,
  nextEnabled = true,
}) => {
  const template = useStateTemplater()
  const [skipTyping, setSkipTyping] = useState<boolean>(false)

  const onClick = useCallback(() => {
    if (!skipTyping) {
      setSkipTyping(true)
      return
    }

    if (gotoNext) {
      setSkipTyping(false)
      gotoNext()
    }
  }, [skipTyping, gotoNext])

  function resetTypewriter(
    fn?: () => void
  ): MouseEventHandler<HTMLButtonElement> {
    return (e) => {
      e.stopPropagation()
      setSkipTyping(false)
      if (fn) {
        fn()
      }
    }
  }

  const body = (
    <div
      className="mt-1 h-full text-xs overflow-y-auto sm:text-sm md:text-base lg:text-lg xl:text-xl"
      style={bodyStyle || {}}
    >
      <div className="scrollbar-thin scrollbar-thumb-gray-500 scrollbar-thumb-rounded scrollbar-track-gray-100 flex flex-col-reverse pl-1 pr-2 max-h-full overflow-y-auto">
        {skipTyping ? (
          <span
            className="font-handwritten leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: template(renderMdToHtml(bodyText)),
            }}
          />
        ) : (
          <Typewriter
            key={bodyText}
            onInit={(typewriter) => {
              typewriter
                .typeString(template(renderMdToHtml(bodyText)))
                .callFunction(() => setSkipTyping(true))
                .start()
            }}
            options={{
              cursor: '',
              delay: 25, // speed adjustment
              wrapperClassName:
                'Typewriter__wrapper font-handwritten leading-relaxed',
            }}
          />
        )}
      </div>
    </div>
  )

  const buttonSize = useBreakpointValue(['xs', 'sm', 'sm', 'md'])
  const buttons = (
    <div className="flex justify-between text-blue-400">
      <IconButton
        aria-label="previous"
        variant="ghost"
        onClick={resetTypewriter(gotoPrev)}
        size={buttonSize}
        icon={
          <ArrowBackIcon
            className={`${prevEnabled ? 'cursor-pointer' : ''} `}
            boxSize={[3, 4, 5, 6]}
          />
        }
        isDisabled={!prevEnabled}
      />
      <IconButton
        aria-label="next"
        variant="ghost"
        onClick={resetTypewriter(gotoNext)}
        size={buttonSize}
        icon={
          <ArrowForwardIcon
            className={`${nextEnabled ? 'cursor-pointer' : ''}`}
            boxSize={[3, 4, 5, 6]}
          />
        }
        isDisabled={!nextEnabled}
      />
    </div>
  )

  const content = (
    <>
      {header}
      {body}
      {buttons}
    </>
  )

  return (
    <>
      {image ? (
        <Box
          onClick={onClick}
          bgImage={image}
          bgSize="100% 100%"
          className="px-[3%] py-[2%] absolute flex flex-col"
          style={{
            top: position?.top || 'unset',
            left: position?.left || '20%',
            right: position?.right || 'unset',
            bottom: position?.bottom || '10%',
            width: dimension?.width || '60%',
            height: dimension?.height || '32%',
          }}
        >
          {content}
        </Box>
      ) : (
        <div
          className="rounded-handdrawn border-3 absolute bg-white border-gray-900 shadow-sm"
          onClick={onClick}
          style={{
            top: position?.top || 'unset',
            left: position?.left || '20%',
            right: position?.right || 'unset',
            bottom: position?.bottom || '10%',
            width: dimension?.width || '60%',
            height: dimension?.height || '32%',
          }}
        >
          <div className="px-[1%] md:px-[1.75%] flex flex-col justify-around py-1 w-full h-full md:pb-2 md:pt-3">
            {content}
          </div>
        </div>
      )}
    </>
  )
}

export default DialogueBox
