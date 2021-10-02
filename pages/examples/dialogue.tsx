import type { NextPage } from 'next'
import Head from 'next/head'
import React, {
  PropsWithChildren,
  ReactChild,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { DialogueSchema } from '../../schema/elements'
import { Action, ActionPayload, useAction } from '../../hooks/useAction'
import { Button } from '@chakra-ui/button'
import { ActionSchema } from '../../schema/actions'

interface ActionContainerProps {
  action: ActionPayload
}

const ActionContainer: React.FC<PropsWithChildren<ActionContainerProps>> = ({
  action,
  children,
}) => {
  const renderAction = useAction(action.type)

  return (
    <div className="absolute left-0 top-0 w-screen h-screen">
      {renderAction(action)}
      {children}
    </div>
  )
}

const DialogueSequence: NextPage = () => {
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

  function getAction(): ActionPayload {
    return {
      ...actions[currentIdx],
      onClick: nextDialogue,
    }
  }

  return (
    <div>
      <Head>
        <title>Dialogue</title>
      </Head>

      <div className="w-screen h-screen">
        {currentIdx >= 0 && currentIdx < actions.length && (
          <ActionContainer action={getAction()}></ActionContainer>
        )}
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
