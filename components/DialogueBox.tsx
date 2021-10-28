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

export enum DialogBoxType {
  NARRATION,
  SPEECH,
  THOUGHT,
}

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
  showNavigations?: boolean
  type?: DialogBoxType
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
  showNavigations = true,
  type,
}) => {
  const template = useStateTemplater()
  const [skipTyping, setSkipTyping] = useState<boolean>(false)

  const onClick = useCallback(
    (e) => {
      e.stopPropagation()
      if (!skipTyping) {
        setSkipTyping(true)
        return
      }

      if (gotoNext) {
        gotoNext()
        setSkipTyping(false)
      }
    },
    [skipTyping, gotoNext]
  )

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
      <div className="scrollbar-thin scrollbar-thumb-gray-500 scrollbar-thumb-rounded scroll scrollbar-track-gray-100 scrollbar-track-rounded flex flex-col-reverse pl-1 pr-2 max-h-full overflow-y-auto">
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

  const buttonSize = useBreakpointValue(['2xs', 'xs', 'sm', 'sm'])
  const buttons = (
    <div className="flex flex-wrap-reverse justify-between">
      <IconButton
        aria-label="previous"
        variant="ghost"
        onClick={resetTypewriter(gotoPrev)}
        size={buttonSize}
        icon={
          prevEnabled ? (
            <ArrowBackIcon
              className={`${prevEnabled ? 'cursor-pointer' : ''} `}
              boxSize={[3, 4, 5, 6]}
            />
          ) : undefined
        }
        isDisabled={!prevEnabled}
      />
      <IconButton
        aria-label="next"
        variant="ghost"
        onClick={resetTypewriter(gotoNext)}
        size={buttonSize}
        icon={
          nextEnabled ? (
            <ArrowForwardIcon
              className={`${nextEnabled ? 'cursor-pointer' : ''}`}
              boxSize={[3, 4, 5, 6]}
            />
          ) : undefined
        }
        isDisabled={!nextEnabled}
      />
    </div>
  )

  const content = (
    <>
      {header}
      {body}
      {showNavigations ? buttons : undefined}
    </>
  )

  const typeStyling = () => {
    switch (type) {
      case DialogBoxType.NARRATION:
        return 'border-narration rounded-narration'
      case DialogBoxType.SPEECH:
        return 'border-speech rounded-dialog'
      case DialogBoxType.THOUGHT:
        return 'border-3 rounded-dialog'
      default:
        return 'border-3 rounded-handdrawn'
    }
  }

  return (
    <>
      {image ? (
        <div className="absolute left-0 top-0 w-full h-full" onClick={onClick}>
          <Box
            bgImage={image}
            bgSize="100% 100%"
            className="px-[2%] py-[1.5%] absolute flex flex-col"
            style={{
              top: position ? position.top : 'unset',
              left: position ? position.left : '20%',
              right: position ? position.right : 'unset',
              bottom: position ? position.bottom : '10%',
              width: dimension?.width || '60%',
              height: dimension?.height || 'unset',
            }}
          >
            {content}
          </Box>
        </div>
      ) : (
        <div className="absolute left-0 top-0 w-full h-full" onClick={onClick}>
          <div
            className={
              'opacity-90 absolute bg-white border-gray-900 shadow-sm ' +
              typeStyling()
            }
            style={{
              top: position ? position.top : 'unset',
              left: position ? position.left : '20%',
              right: position ? position.right : 'unset',
              bottom: position ? position.bottom : '10%',
              width: dimension?.width || '60%',
              height: dimension?.height || 'unset',
            }}
          >
            <div className="px-[1%] py-[1.5%] md:py-[2%] md:px-[1.75%] flex flex-col justify-around w-full h-full">
              {content}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DialogueBox
