import { Box, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { is } from 'superstruct'
import { useAfterInteractionCallback } from '../hooks/useAfterInteractionCallback'
import { Dialogue as DialogueProps } from '../lib/elements'
import Speech, { SpeechProps } from './Speech'

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

  function nextDialogue() {
    if (speechIdx < speeches.length) {
      setSpeechIdx(speechIdx + 1)
    }
  }

  function getSpeech(): SpeechProps {
    const speech = speeches[speechIdx]
    return {
      text: speech.text,
      character: speech.character,
      characterImg: testCharacterImg[speech.character],
      isMainCharacter: isMainCharacter[speech.character],
      onClick: nextDialogue,
    }
  }

  return (
    <div className="w-screen h-screen">
      {speechIdx >= 0 && speechIdx < speeches.length && (
        <Speech {...getSpeech()} />
      )}
    </div>
  )
}

export default Dialogue

const testCharacterImg: { [name: string]: string } = {
  Julie: '/images/Julie.svg',
  Jason: '/images/Jason.svg',
}
const isMainCharacter: { [name: string]: boolean } = {
  Julie: true,
  Jason: false,
}
