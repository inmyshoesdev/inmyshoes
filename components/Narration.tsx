import { Box } from '@chakra-ui/react'
import { useAfterInteractionCallback } from '../hooks/useAfterInteractionCallback'
import { Narration as NarrationProps } from '../lib/elements'

const Narration: React.FC<NarrationProps> = ({
  shown,
  text,
  afterInteractionCallback,
}) => {
  const afterAction = useAfterInteractionCallback(afterInteractionCallback)

  if (!shown) {
    return null
  }

  return (
    <div className="w-screen h-screen">
      <div className="absolute bottom-0 flex items-center justify-evenly w-full">
        <Box height={400} className="inline-block w-1/5" />
        <div
          className="inline-block p-3 w-3/5 h-40 bg-white border border-gray-200 rounded shadow"
          onClick={afterAction}
        >
          <p className="mt-2 italic">{text}</p>
        </div>
        <Box height={400} className="inline-block w-1/5" />
      </div>
    </div>
  )
}

export default Narration
