import { Box } from '@chakra-ui/react'
import Typewriter from 'typewriter-effect'

export interface SpeechProps {
  text: string
  character: string
  characterImage: string
  isMainCharacter: boolean
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
  prevEnabled = true,
  nextEnabled = true,
  onNext,
  onPrev,
}) => {
  return (
    <div className="absolute bottom-0 flex items-center justify-evenly w-full">
      <Box height={400} className="inline-block mx-5 w-1/5">
        {!isMainCharacter && (
          <img
            src={characterImage}
            alt={character}
            className="m-auto h-full object-contain"
          />
        )}
      </Box>
      <div className="flex flex-col p-3 w-3/5 h-40 bg-white border border-gray-200 rounded shadow select-none">
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

      <Box height={400} className="inline-block mx-5 w-1/5">
        {isMainCharacter && (
          <img
            src={characterImage}
            alt={character}
            className="m-auto h-full object-contain"
          />
        )}
      </Box>
    </div>
  )
}

export default Speech
