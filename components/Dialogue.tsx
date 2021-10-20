import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { Dialogue as DialogueProps } from '../lib/elements'
import Speech from './Speech'

const Dialogue: React.FC<DialogueProps> = ({
  shown,
  speeches,
  afterInteractionCallback,
}) => {
  const [speechIdx, setSpeechIdx] = useState(-1)

  useEffect(() => {
    if (shown && speeches.length > 0) setSpeechIdx(0)
  }, [shown, speeches])

  function prevDialogue() {
    if (speechIdx > 0) {
      setSpeechIdx(speechIdx - 1)
    }
  }

  function nextDialogue() {
    if (speechIdx < speeches.length) {
      setSpeechIdx(speechIdx + 1)
    }

    // if speech is the last one, also run the after interaction action
    if (speechIdx + 1 >= speeches.length) {
      if (afterInteractionCallback) {
        afterInteractionCallback()
      }
    }
  }

  return (
    <Transition
      show={shown}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      {speechIdx >= 0 && speechIdx < speeches.length && (
        <Speech
          {...speeches[speechIdx]}
          onNext={nextDialogue}
          onPrev={prevDialogue}
          prevEnabled={!(speechIdx === 0)}
          nextEnabled={
            speechIdx < speeches.length - 1 || !!afterInteractionCallback
          }
        />
      )}
    </Transition>
  )
}

export default Dialogue
