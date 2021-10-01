import { Box } from '@chakra-ui/react'
import { Fragment } from 'react'
import { DialogueScema } from '../schema/elements'

export interface DialogueProps {
  dialogue: DialogueScema
  onNext: () => void
}

const Dialogue = ({ dialogue, onNext }: DialogueProps) => {
  return (
    <div className="absolute bottom-5 flex items-center justify-evenly w-full">
      <div className="inline-block w-1/5">
        <img
          src="/images/Jason.svg"
          height={400}
          width={141}
          className="m-auto"
        />
      </div>
      <div
        className="inline-block p-3 w-3/5 h-40 border border-gray-200 rounded shadow cursor-pointer"
        onClick={onNext}
      >
        <p className="text-lg font-bold">{dialogue.character}</p>
        <p className="mt-2">{dialogue.text}</p>
      </div>

      <div className="inline-block w-1/5">
        <img
          src="/images/Julie.svg"
          height={400}
          width={141}
          className="m-auto"
        />
      </div>
    </div>
  )
}

export default Dialogue
