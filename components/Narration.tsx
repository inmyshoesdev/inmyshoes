import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { Transition } from '@headlessui/react'
import { useAfterInteractionCallback } from '../hooks/useAfterInteractionCallback'
import { Narration as NarrationProps } from '../lib/elements'
import { renderMdToHtml } from './utils'

import DialogueBox from './DialogueBox'
import Typewriter from 'typewriter-effect'

const Narration: React.FC<NarrationProps> = ({
  shown,
  name,
  position,
  dimension,
  text,
  afterInteractionCallback,
}) => {
  // TODO remove later, this is to test implementation only
  const textArray = text
  
  const afterAction = useAfterInteractionCallback(afterInteractionCallback)

  const [textIdx, setTextIdx] = useState(-1)

  useEffect(() => {
    if (shown && text.length > 0) setTextIdx(0)
  }, [shown]) // TODO update when text variable changes

  function prevText() {
    if (textIdx < textArray.length) {
      setTextIdx(textIdx - 1)
    }
  }

  function nextText() {
    if (textIdx < textArray.length) {
      setTextIdx(textIdx + 1)
    }
    
    // if speech is the last one, also run the after interaction action
    if (textIdx + 1 >= textArray.length) {
      afterAction()
    }
  }

  const NarrationBox: React.FC = () => {
    if (textIdx >= textArray.length) {
      return null
    }

    const prevEnabled = textIdx > 0
    const nextEnabled = true
    // const nextEnabled = textIdx < textArray.length - 1
    
    return (
      <DialogueBox
        image={""} // could replace this with an image eventually
        position={position}
        dimension={dimension}
      >
        <div
          className="sm:text-[10px] md:text-[14px] lg:text-[20px] h-3/5"
          style={{
            fontStyle: 'italic',
          }}
        >
          <Typewriter
            key={textArray[textIdx]}
            onInit={(typewriter) => {
              typewriter.typeString(renderMdToHtml(textArray[textIdx])).start()
            }}
            options={{
              cursor: '',
              delay: 30, // speed adjustment
            }}
          />
        </div>
        <div className="sm:text-[8px] md:text-[12px] lg:text-[18px] flex justify-between h-1/5 text-blue-400">
          <button
            onClick={prevText}
            className={prevEnabled ? 'cursor-pointer' : 'text-blue-200'}
            disabled={!prevEnabled}
          >
            Prev
          </button>
          <button
            onClick={nextText}
            className={nextEnabled ? 'cursor-pointer' : 'text-blue-200'}
            disabled={!nextEnabled}
          >
            Next
          </button>
        </div>
      </DialogueBox>
    )
  }

  return (
    <Transition
      show={shown}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      className="absolute bottom-0 flex items-center justify-evenly w-full"
    >
    <Box height={400} className="inline-block w-1/5" />
    <NarrationBox/>
    <Box height={400} className="inline-block w-1/5" />
    </Transition>
  )
}

export default Narration
