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

  useEffect(() => {
    if (speechIdx >= speeches.length) afterAction()
  }, [speechIdx])

  function prevDialogue() {
    if (speechIdx < speeches.length) {
      setSpeechIdx(speechIdx - 1)
    }
  }

  function nextDialogue() {
    if (speechIdx < speeches.length) {
      setSpeechIdx(speechIdx + 1)
    }
  }

  return (
    <div className="w-screen h-screen">
      {speechIdx >= 0 && speechIdx < speeches.length && (
        <Speech
          {...speeches[speechIdx]}
          onNext={nextDialogue}
          onPrev={prevDialogue}
          prevEnabled={!(speechIdx === 0)}
        />
      )}
    </div>
  )
}

export default Dialogue
