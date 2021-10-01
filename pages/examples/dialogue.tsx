import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { DialogueScema } from '../../schema/elements'
import Dialogue from '../../components/Dialogue'

const DialogueSequence: NextPage = () => {
  const [dialogues, setDialogues] = useState<DialogueScema[]>([])
  const [currentIdx, setCurrentIdx] = useState(-1)

  useEffect(() => {
    setDialogues(testDialogue)
    setCurrentIdx(0)
  }, [])

  function nextDialogue() {
    if (currentIdx < dialogues.length - 1) {
      setCurrentIdx(currentIdx + 1)
    }
  }

  return (
    <div>
      <Head>
        <title>Dialogue</title>
      </Head>

      <div className="relative w-screen h-screen">
        {currentIdx >= 0 && currentIdx < dialogues.length && (
          <Dialogue dialogue={dialogues[currentIdx]} onNext={nextDialogue} />
        )}
      </div>
    </div>
  )
}

export default DialogueSequence

const testDialogue: DialogueScema[] = [
  {
    name: 'dialogue_1',
    character: 'Julie',
    text: 'Hello',
  },
  {
    name: 'dialogue_2',
    character: 'Jason',
    text: 'Hey!',
  },
]
