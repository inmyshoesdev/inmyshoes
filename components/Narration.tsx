import { Box } from '@chakra-ui/react'
import { useAfterInteractionCallback } from '../hooks/useAfterInteractionCallback'
import { Narration as NarrationProps } from '../lib/elements'
import { renderMdToHtml } from './utils'

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
    <div className="absolute bottom-0 flex items-center justify-evenly w-full">
      <Box height={400} className="inline-block w-1/5" />
      <div
        className="inline-block mt-2 p-3 w-3/5 h-40 italic bg-white border border-gray-200 rounded shadow"
        onClick={afterAction}
        dangerouslySetInnerHTML={{ __html: renderMdToHtml(text) }}
      ></div>
      <Box height={400} className="inline-block w-1/5" />
    </div>
  )
}

export default Narration
