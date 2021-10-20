import { useCallback, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { Narration as NarrationProps } from '../lib/elements'

import DialogueBox from './DialogueBox'

const Narration: React.FC<NarrationProps> = ({
  shown,
  position,
  dimension,
  texts,
  textBoxImage,
  afterInteractionCallback,
  showNavigations,
}) => {
  const [textIdx, setTextIdx] = useState(0)
  const text = texts[textIdx] || ''

  useEffect(() => {
    if (shown && texts.length > 0) setTextIdx(0)
  }, [shown, texts])

  function prevText() {
    if (textIdx > 0) {
      setTextIdx(textIdx - 1)
    }
  }

  const nextText = useCallback(() => {
    if (textIdx + 1 < texts.length) {
      setTextIdx(textIdx + 1)
    }

    // if speech is the last one, also run the after interaction action
    if (textIdx + 1 >= texts.length) {
      if (afterInteractionCallback) {
        afterInteractionCallback()
      }
    }
  }, [afterInteractionCallback, textIdx, texts.length])

  const prevEnabled = textIdx > 0
  const nextEnabled = textIdx < texts.length - 1 || !!afterInteractionCallback

  return (
    <Transition
      show={shown}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <DialogueBox
        image={textBoxImage}
        position={position}
        dimension={dimension}
        bodyStyle={{
          fontStyle: 'italic',
        }}
        bodyText={text}
        gotoNext={nextText}
        gotoPrev={prevText}
        prevEnabled={prevEnabled}
        nextEnabled={nextEnabled}
        showNavigations={showNavigations}
      />
    </Transition>
  )
}

export default Narration
