import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { useAfterInteractionCallback } from '../hooks/useAfterInteractionCallback'
import { useStateTemplater } from '../hooks/useStateTemplater'
import { Narration as NarrationProps } from '../lib/elements'

import DialogueBox from './DialogueBox'

const Narration: React.FC<NarrationProps> = ({
  shown,
  name,
  position,
  dimension,
  texts,
  afterInteractionCallback,
}) => {
  const afterAction = useAfterInteractionCallback(afterInteractionCallback)
  const template = useStateTemplater()

  const [textIdx, setTextIdx] = useState(-1)

  useEffect(() => {
    if (shown && texts.length > 0) setTextIdx(0)
  }, [shown, texts])

  function prevText() {
    if (textIdx < texts.length) {
      setTextIdx(textIdx - 1)
    }
  }

  function nextText() {
    if (textIdx < texts.length) {
      setTextIdx(textIdx + 1)
    }
    
    // if speech is the last one, also run the after interaction action
    if (textIdx + 1 >= texts.length) {
      afterAction()
    }
  }

  const NarrationBox: React.FC = () => {
    if (textIdx >= texts.length) {
      return null
    }

    const prevEnabled = textIdx > 0
    const nextEnabled = true
    
    return (
      <DialogueBox
        position={position}
        dimension={dimension}
        bodyClass="sm:text-[10px] md:text-[14px] lg:text-[20px] h-4/5"
        bodyStyle={{
          fontStyle: 'italic',
        }}
        bodyText={texts[textIdx]}
        gotoNext={nextText}
        gotoPrev={prevText}
        prevEnabled={prevEnabled}
        nextEnabled={nextEnabled}
      />
    )
  }

  return (
    <Transition
      show={shown}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      className="absolute top-0 flex items-center justify-evenly w-full h-full"
    >
    <NarrationBox/>
    </Transition>
  )
}

export default Narration
