import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
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
      className="mt-1 h-full text-2xs overflow-y-auto sm:text-xs md:text-sm lg:text-base"
      style={bodyStyle || {}}
    >
      <div className="scrollbar-thin scrollbar-thumb-gray-500 scrollbar-thumb-rounded scrollbar-track-gray-100 flex flex-col-reverse pl-1 pr-2 max-h-full overflow-y-auto">
        {skipTyping ? (
          <p
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
            }}
          />
        )}
      </div>
    </div>
  )

  const buttons = (
    <div className="flex justify-between text-blue-400 text-2xs sm:text-xs md:text-sm lg:text-lg">
      <IconButton
        aria-label="previous"
        variant="ghost"
        onClick={resetTypewriter(gotoPrev)}
        icon={
          <ArrowBackIcon
            className={`${prevEnabled ? 'cursor-pointer' : ''} `}
            boxSize={6}
          />
        }
        className={`px-2 md:py-1 rounded ${
          prevEnabled ? 'cursor-pointer hover:bg-blue-50' : 'text-blue-200'
        }`}
        isDisabled={!prevEnabled}
      />
      <IconButton
        aria-label="next"
        variant="ghost"
        onClick={resetTypewriter(gotoNext)}
        icon={
          <ArrowForwardIcon
            className={`${nextEnabled ? 'cursor-pointer' : ''}`}
            boxSize={6}
          />
        }
        className={`px-2 md:py-1 rounded ${
          nextEnabled ? 'cursor-pointer hover:bg-blue-50' : 'text-blue-200'
        }`}
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
          className="p-[5px] absolute border-2 border-gray-600 rounded-lg"
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
          <div className="p-[1%] md:p-[1.5%] flex flex-col justify-around w-full h-full bg-white rounded-lg">
            {content}
          </div>
        </div>
      )}
    </>
  )
}

export default DialogueBox
