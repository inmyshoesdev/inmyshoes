import { useEffect } from 'react'
import { useAfterInteractionCallback } from '../hooks/useAfterInteractionCallback'
import { Image } from '../lib/elements'
import { Scene } from '../lib/scene'
import { useStore } from '../stores/store'
import ClickableGroup from './ClickableGroup'
import Dialogue from './Dialogue'
import Narration from './Narration'

type SceneProps = {
  scene: Scene
}

const SceneDisplay: React.FC<SceneProps> = ({ scene }) => {
  const executeActions = useStore((state: any) => state.executeActions)
  const resetScene = useStore((state: any) => state.resetScene)

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
        <Narration {...narration} key={narration.name} />
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
