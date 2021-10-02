import { Box } from '@chakra-ui/react'
import { is } from 'superstruct'
import { CharacterSchema, MainCharacterSchema } from '../schema/characters'
import { DialogueScema } from '../schema/elements'

export interface DialogueProps {
  dialogue: DialogueScema
  character: CharacterSchema
  onClick?: () => void
}

const Dialogue: React.FC<DialogueProps> = ({
  dialogue,
  character,
  onClick,
}) => {
  return (
    <div className="absolute bottom-5 flex items-center justify-evenly w-full">
      <Box height={400} className="inline-block w-1/5">
        {!is(character, MainCharacterSchema) && (
          <img
            src={character.images.default}
            height={400}
            width={141}
            alt="npc"
            className="m-auto"
          />
        )}
      </Box>
      <div
        className="inline-block p-3 w-3/5 h-40 border border-gray-200 rounded shadow cursor-pointer"
        onClick={onClick}
      >
        <p className="text-lg font-bold">{dialogue.character}</p>
        <p className="mt-2">{dialogue.text}</p>
      </div>

      <Box height={400} className="inline-block w-1/5">
        {is(character, MainCharacterSchema) && (
          <img
            src={character.images.default}
            height={400}
            width={141}
            alt="main character"
            className="m-auto"
          />
        )}
      </Box>
    </div>
  )
}

export default Dialogue
