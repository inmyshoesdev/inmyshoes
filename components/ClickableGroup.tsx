import { useCallback } from 'react'
import { Transition } from '@headlessui/react'
import { useRunCleanupFnsOnUnmount } from '../hooks/useRunCleanupFnsOnUnmount'
import { Action } from '../lib/actions'
import {
  ClickableGroup as ClickableGroupInterface,
  isClickableImg,
  isClickableText,
} from '../lib/elements'
import { useStore } from '../stores/store'
import ClickableImg from './ClickableImg'
import ClickableText from './ClickableText'
import { ActionSequence } from '../lib/action-sequence'

type ClickableGroupProps = {
  sceneId: number
} & ClickableGroupInterface

const ClickableGroup: React.FC<ClickableGroupProps> = ({
  name,
  shown,
  clickables,
  sceneId,
  afterInteractionCallback,
}) => {
  const globalState = useStore((state) => state.game.globalState)
  const currSceneState = useStore(
    (state) => state.game.getScene(state.game.currentSceneId)?.state
  )
  const executeActions = useStore((state) => state.executeActions)
  const hideClickable = useStore((state) => state.hideClickable)
  const { addCleanupFns } = useRunCleanupFnsOnUnmount()

  const onClick = useCallback(
    (clickableName: string) => {
      const actions =
        clickables.find((clickable) => clickable.name === clickableName)
          ?.onClickActions ?? ([] as Action[])

      hideClickable(sceneId, name)
      let cleanupFn = executeActions(
        new ActionSequence(...actions)
      )
      addCleanupFns(cleanupFn)

      if (afterInteractionCallback) {
        afterInteractionCallback()
      }
    },
    [
      executeActions,
      hideClickable,
      addCleanupFns,
      clickables,
      name,
      sceneId,
      afterInteractionCallback,
    ]
  )

  return (
    <Transition
      show={shown}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      {clickables.map((clickable, idx) => {
        if (isClickableText(clickable)) {
          return (
            <ClickableText
              key={idx}
              text={clickable.text}
              position={clickable.position}
              dimension={clickable.dimension}
              effect={clickable.effect}
              disabled={clickable.isDisabled(globalState, currSceneState)}
              disabledLabel={clickable.disabledLabel}
              onClick={() => onClick(clickable.name)}
            />
          )
        } else if (isClickableImg(clickable)) {
          return (
            <ClickableImg
              key={idx}
              src={clickable.src}
              altText={clickable.altText || ''}
              blendMode={clickable.blendMode}
              position={clickable.position}
              dimension={clickable.dimension}
              effect={clickable.effect}
              disabled={clickable.isDisabled(globalState, currSceneState)}
              disabledLabel={clickable.disabledLabel}
              onClick={() => onClick(clickable.name)}
            />
          )
        }
      })}
    </Transition>
  )
}

export default ClickableGroup
