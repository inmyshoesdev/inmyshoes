import { useEffect } from 'react'
import { useAfterInteractionCallback } from '../hooks/useAfterInteractionCallback'
import { Image, Narration } from '../lib/elements'
import { Scene } from '../lib/scene'
import { useStore } from '../stores/store'
import ClickableGroup from './ClickableGroup'
import Dialogue from './Dialogue'

type SceneProps = {
  scene: Scene
}

const SceneDisplay: React.FC<SceneProps> = ({ scene }) => {
  const executeActions = useStore((state) => state.executeActions)
  const resetScene = useStore((state) => state.resetScene)

  useEffect(() => {
    resetScene(scene.id)
  }, [resetScene, scene.id])

  useEffect(() => {
    return executeActions(...scene.intro)
  }, [scene.intro, executeActions])

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        className="m-auto w-full h-full object-cover"
        src={scene.background}
        alt={scene.backgroundAltText ?? ''}
      />
      {scene.narrations.map((narration) => (
        <TempNarration {...narration} key={narration.name} />
      ))}
      {scene.dialogues.map((dialogue) => (
        <Dialogue {...dialogue} key={dialogue.name} />
      ))}
      {scene.images.map((image) => (
        <TempImage {...image} key={image.name}></TempImage>
      ))}
      {scene.clickables.map((clickableGroup) => (
        <ClickableGroup
          sceneId={scene.id}
          {...clickableGroup}
          key={clickableGroup.name}
        />
      ))}
    </div>
  )
}

export default SceneDisplay

const TempNarration: React.FC<Narration> = ({
  shown,
  text,
  position,
  afterInteractionCallback,
}) => {
  const handleInteraction = useAfterInteractionCallback(
    afterInteractionCallback
  )

  if (!shown) {
    return null
  }

  return (
    <div
      className="positioned h-max absolute m-auto px-4 py-3 w-max bg-gray-100 border border-gray-700 rounded"
      onClick={handleInteraction}
    >
      <span className="text-md text-gray-900 font-semibold">{text}</span>
      <style jsx>{`
        .positioned {
          top: ${position.top || '10%'};
          right: ${position.right || '0px'};
          left: ${position.left || '0px'};
          bottom: ${position.bottom || 'unset'};
        }
      `}</style>
    </div>
  )
}

const TempImage: React.FC<Image> = ({
  shown,
  src,
  altText,
  position,
  afterInteractionCallback,
}) => {
  const handleInteraction = useAfterInteractionCallback(
    afterInteractionCallback
  )

  if (!shown) {
    return null
  }

  return (
    <div className="positioned absolute w-1/5" onClick={handleInteraction}>
      <img src={src} alt={altText || ''} className="object-cover" />
      <style jsx>{`
        .positioned {
          top: ${position.top || 'unset'};
          right: ${position.right || '0px'};
          left: ${position.left || '0px'};
          bottom: ${position.bottom || '5%'};
        }
      `}</style>
    </div>
  )
}
