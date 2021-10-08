import { useEffect } from 'react'
import { Scene } from '../lib/scene'
import { useStore } from '../stores/store'
import ClickableGroup from './ClickableGroup'
import Dialogue from './Dialogue'
import ImageElement from './ImageElement'
import Narration from './Narration'

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
        <Narration {...narration} key={narration.name} />
      ))}
      {scene.dialogues.map((dialogue) => (
        <Dialogue {...dialogue} key={dialogue.name} />
      ))}
      {scene.images.map((image) => (
        <ImageElement {...image} key={image.name}></ImageElement>
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
