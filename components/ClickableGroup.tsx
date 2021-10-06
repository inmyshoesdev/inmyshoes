import { useCallback } from 'react'
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
  const executeActions = useStore((state) => state.executeActions)
  const hideClickable = useStore((state) => state.hideClickable)
  const { addCleanupFns } = useRunCleanupFnsOnUnmount()

  const onClick = useCallback(
    (clickableName: string) => {
      const actions =
        clickables.find((clickable) => clickable.name === clickableName)
          ?.onClickActions ?? ([] as Action[])

      hideClickable(sceneId, name)
      let cleanupFn = executeActions(...actions)
      addCleanupFns(cleanupFn)

      if (afterInteractionCallback) {
        cleanupFn = afterInteractionCallback()
        addCleanupFns(cleanupFn)
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

  if (!shown) {
    return null
  }

  return (
    <>
      {clickables.map((clickable, idx) => {
        if (isClickableText(clickable)) {
          return (
            <ClickableText
              key={idx}
              text={clickable.text}
              position={clickable.position}
              dimension={clickable.dimension}
              effect={clickable.effect}
              onClick={() => onClick(clickable.name)}
            />
          )
        } else if (isClickableImg(clickable)) {
          return (
            <ClickableImg
              key={idx}
              src={clickable.src}
              altText={clickable.altText || ''}
              position={clickable.position}
              dimension={clickable.dimension}
              effect={clickable.effect}
              onClick={() => onClick(clickable.name)}
            />
          )
        }
      })}
    </>
  )
}

export default ClickableGroup
