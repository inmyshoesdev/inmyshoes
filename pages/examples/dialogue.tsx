import type { NextPage } from 'next'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import { DialogueScema } from '../../schema/elements'
import { Action, useAction } from '../../hooks/useAction'
import { Button } from '@chakra-ui/button'

const DialogueSequence: NextPage = () => {
  const showDialogue = useAction('showDialogue')
  const [actions, setActions] = useState<any[]>([])
  const [currentIdx, setCurrentIdx] = useState(-1)

  useEffect(() => {
    // TODO: Use ActionSchema
    setActions(testDialogueActions)
    setCurrentIdx(0)
  }, [])

  function nextDialogue() {
    if (currentIdx < actions.length) {
      setCurrentIdx(currentIdx + 1)
    }
  }

  function renderAction() {
    // const actionSchema = actions[currentIdx]
    // const action = useAction(actionSchema.type)
    return showDialogue({
      ...actions[currentIdx],
      onClick: nextDialogue,
    })
  }

  return (
    <div>
      <Head>
        <title>Dialogue</title>
      </Head>

      <div className="relative w-screen h-screen">
        {currentIdx >= 0 && currentIdx < actions.length && renderAction()}
        <Button className="left-1/2 top-1/2" onClick={() => setCurrentIdx(0)}>
          Restart
        </Button>
      </div>
    </div>
  )
}

export default DialogueSequence

const testDialogueActions = [
  {
    type: 'showDialogue',
    value: 'julie_intro',
  },
  {
    type: 'showDialogue',
    value: 'jason_intro',
  },
]
