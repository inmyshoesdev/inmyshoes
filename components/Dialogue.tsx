import React, { useEffect, useState } from 'react'
import { useAfterInteractionCallback } from '../hooks/useAfterInteractionCallback'
import { Dialogue as DialogueProps } from '../lib/elements'
import Speech from './Speech'

const Dialogue: React.FC<DialogueProps> = ({
  shown,
  speeches,
  afterInteractionCallback,
}) => {
  const afterAction = useAfterInteractionCallback(afterInteractionCallback)
  const [speechIdx, setSpeechIdx] = useState(-1)

  useEffect(() => {
    if (shown && speeches.length > 0) setSpeechIdx(0)
  }, [shown, speeches])

  function nextDialogue() {
    if (speechIdx < speeches.length) {
      setSpeechIdx(speechIdx + 1)
    }

    // if speech is the last one, also run the after interaction action
    if (speechIdx + 1 >= speeches.length) {
      afterAction()
    }
  }

  if (!shown) {
    return null
  }

  return (
    <>
      {speechIdx >= 0 && speechIdx < speeches.length && (
        <Speech {...speeches[speechIdx]} onClick={nextDialogue} />
      )}
    </>
  )
}

export default Dialogue
