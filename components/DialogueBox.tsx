import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import {
  CSSProperties,
  Fragment,
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
  bodyClass,
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
    <div className={bodyClass || ''} style={bodyStyle || {}}>
      {skipTyping ? (
        <p>{template(renderMdToHtml(bodyText))}</p>
      ) : (
        <Typewriter
          key={bodyText}
          onInit={(typewriter) => {
            typewriter.typeString(template(renderMdToHtml(bodyText))).start()
          }}
          options={{
            cursor: '',
            delay: 30, // speed adjustment
          }}
        />
      )}
    </div>
  )

  const buttons = (
    <div className="sm:text-[8px] md:text-[12px] lg:text-[18px] flex justify-between -mb-1 text-blue-400 text-3xs">
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
        className={`px-2 py-1 rounded ${
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
        className={`px-2 py-1 rounded ${
          nextEnabled ? 'cursor-pointer hover:bg-blue-50' : 'text-blue-200'
        }`}
        isDisabled={!nextEnabled}
      />
    </div>
  )

  const content = (
    <Fragment>
      {header}
      {body}
      {buttons}
    </Fragment>
  )

  return (
    <Fragment>
      {image ? (
        <Box
          onClick={onClick}
          bgImage={image}
          bgSize="100% 100%"
          className="p-[3%] absolute"
          style={{
            top: position?.top || 'unset',
            left: position?.left || '20%',
            right: position?.right || 'unset',
            bottom: position?.bottom || '10%',
            width: dimension?.width || '60%',
            height: dimension?.height || '30%',
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
            height: dimension?.height || '30%',
          }}
        >
          <div className="p-[1.5%] flex flex-col w-full h-full bg-white rounded-lg">
            {content}
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default DialogueBox
