import { Box } from '@chakra-ui/react'
import { Fragment } from 'react'
import Typewriter from 'typewriter-effect'
import { Position, Dimension } from '../lib/elements'

export interface SpeechProps {
  text: string
  character: string
  characterImage: string
  isMainCharacter: boolean
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
  characterPosition,
  characterDimension,
  textPosition,
  textDimension,
  prevEnabled = true,
  nextEnabled = true,
  onNext,
  onPrev,
}) => {
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
      <div
        className="absolute flex flex-col p-3 bg-white border border-gray-200 rounded shadow select-none"
        style={{
          top: textPosition?.top || 'unset',
          left: textPosition?.left || '20%',
          right: textPosition?.right || 'unset',
          bottom: textPosition?.bottom || '10%',
          width: textDimension?.height || '60%',
          height: textDimension?.width || '30%',
        }}
      >
        <p className="h-1/5 text-lg font-bold">{character}</p>

        <div className="h-3/5">
          <Typewriter
            key={text}
            onInit={(typewriter) => {
              typewriter.typeString(`<div>${text}</div>`).start()
            }}
            options={{
              cursor: '',
              delay: 30, // speed adjustment
            }}
          />
        </div>
        <div className="flex justify-between h-1/5">
          <button onClick={onPrev} className="cursor-pointer">
            Prev
          </button>
          <button onClick={onNext} className="cursor-pointer">
            Next
          </button>
        </div>
      </div>

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
