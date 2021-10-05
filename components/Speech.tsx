import { Box } from '@chakra-ui/react'

export interface SpeechProps {
  text: string
  character: string
  characterImage: string
  isMainCharacter: boolean
  onClick?: () => void
}

const Speech: React.FC<SpeechProps> = ({
  text,
  character,
  characterImage,
  isMainCharacter = false,
  onClick,
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
      <div
        className="inline-block p-3 w-3/5 h-40 bg-white border border-gray-200 rounded shadow cursor-pointer select-none"
        onClick={onClick}
      >
        <p className="text-lg font-bold cursor-pointer">{character}</p>
        <p className="mt-2 cursor-pointer">{text}</p>
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
