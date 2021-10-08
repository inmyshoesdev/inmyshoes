import { Fragment, useCallback, useState } from 'react'
import Typewriter from 'typewriter-effect'
import { useStateTemplater } from '../hooks/useStateTemplater'
import { Position, Dimension } from '../lib/elements'
import DialogueBox from './DialogueBox'
import { renderMdToHtml } from './utils'

export interface SpeechProps {
  text: string
  character: string
  characterImage: string
  isMainCharacter: boolean
  type?: string
  textBoxImage?: string
  characterPosition?: Position
  characterDimension?: Dimension
  textPosition?: Position
  textDimension?: Dimension
  prevEnabled?: boolean
  nextEnabled?: boolean
  onNext?: () => void
  onPrev?: () => void
}

const Speech: React.FC<SpeechProps> = ({
  text,
  character,
  characterImage,
  isMainCharacter = false,
  type = '',
  textBoxImage,
  characterPosition,
  characterDimension,
  textPosition,
  textDimension,
  prevEnabled = true,
  nextEnabled = true,
  onNext,
  onPrev,
}) => {
  const [skipTyping, setSkipTyping] = useState<boolean>(false)
  const template = useStateTemplater()

  const onDialogueBoxClicked = useCallback(() => {
    if (!skipTyping) {
      setSkipTyping(true)
      return
    }

    if (onNext) {
      onNext()
    }
  }, [skipTyping, onNext])

  const resetTyping = (fn?: () => void) => {
    return () => {
      setSkipTyping(false)
      if (fn) {
        fn()
      }
    }
  }

  return (
    <Fragment>
      <div
        className="absolute"
        style={{
          top: characterPosition?.top || 'unset',
          left: characterPosition?.left || '5%',
          right: characterPosition?.right || 'unset',
          bottom: characterPosition?.bottom || '5%',
          height: characterDimension?.height || 'auto',
          width: characterDimension?.width || '15%',
        }}
      >
        {isMainCharacter && (
          <img
            src={characterImage}
            alt={character}
            className="m-auto h-full object-contain"
          />
        )}
      </div>
      <DialogueBox
        image={textBoxImage}
        position={textPosition}
        dimension={textDimension}
        onClick={onDialogueBoxClicked}
      >
        <div className="h-1/4">
          <p
            className="sm:text-[14px] md:text-[18px] lg:text-[22px] h-full font-bold leading-none"
            style={{
              fontStyle: type === 'monologue' ? 'italic' : 'normal',
            }}
          >
            {character}
          </p>
        </div>

        <div
          className="sm:text-[10px] md:text-[14px] lg:text-[20px] h-3/5"
          style={{
            fontStyle: type === 'monologue' ? 'italic' : 'normal',
          }}
        >
          {skipTyping ? (
            <p>{template(renderMdToHtml(text))}</p>
          ) : (
            <Typewriter
              key={text}
              onInit={(typewriter) => {
                typewriter.typeString(template(renderMdToHtml(text))).start()
              }}
              options={{
                cursor: '',
                delay: 30, // speed adjustment
              }}
            />
          )}
        </div>
        <div className="sm:text-[8px] md:text-[12px] lg:text-[18px] flex justify-between h-1/5 text-blue-400">
          <button
            onClick={resetTyping(onPrev)}
            className={prevEnabled ? 'cursor-pointer' : 'text-blue-200'}
            disabled={!prevEnabled}
          >
            Prev
          </button>
          <button
            onClick={resetTyping(onNext)}
            className={nextEnabled ? 'cursor-pointer' : 'text-blue-200'}
            disabled={!nextEnabled}
          >
            Next
          </button>
        </div>
      </DialogueBox>

      <div
        className="absolute"
        style={{
          top: characterPosition?.top || 'unset',
          left: characterPosition?.left || 'unset',
          right: characterPosition?.right || '5%',
          bottom: characterPosition?.bottom || '5%',
          height: characterDimension?.height || 'auto',
          width: characterDimension?.width || '15%',
        }}
      >
        {!isMainCharacter && (
          <img
            src={characterImage}
            alt={character}
            className="m-auto h-full object-contain"
          />
        )}
      </div>
    </Fragment>
  )
}

export default Speech
