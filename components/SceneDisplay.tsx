import { useEffect, useLayoutEffect } from 'react'
import { ActionSequence } from '../lib/action-sequence'
import { NoBackground, Scene } from '../lib/scene'
import { useStore } from '../stores/store'
import ClickableGroup from './ClickableGroup'
import Dialogue from './Dialogue'
import ImageElement from './ImageElement'
import LinkElement from './LinkElement'
import Narration from './Narration'

type SceneProps = {
  scene: Scene
}

const SceneDisplay: React.FC<SceneProps> = ({ scene }) => {
  const executeActions = useStore((state) => state.executeActions)
  const resetScene = useStore((state) => state.resetScene)

  useLayoutEffect(() => {
    resetScene(scene.id)
  }, [resetScene, scene.id])

  useEffect(() => {
    return executeActions(new ActionSequence(...scene.intro))
  }, [scene.intro, executeActions])

  return (
    <>
      <div className="relative w-full h-full select-none overflow-hidden">
        {scene.background !== NoBackground && (
          <img
            className={`m-auto w-full h-full object-cover transition-filter duration-500 ${
              scene.blurBackground ? 'blur-sm' : ''
            }`}
            src={scene.background}
            alt={scene.backgroundAltText ?? ''}
          />
        )}
        {scene.images.map((image) => (
          <ImageElement
            {...image}
            blurSceneBackground={scene.blurBackground}
            key={image.name}
          ></ImageElement>
        ))}
        {scene.narrations.map((narration) => (
          <Narration {...narration} key={narration.name} />
        ))}
        {scene.dialogues.map((dialogue) => (
          <Dialogue {...dialogue} key={dialogue.name} />
        ))}
        {scene.clickables.map((clickableGroup) => (
          <ClickableGroup
            sceneId={scene.id}
            {...clickableGroup}
            key={clickableGroup.name}
          />
        ))}
        {scene.links.map((link) => (
          <LinkElement {...link} key={link.name} />
        ))}
      </div>
      <style jsx>{`
        div > :global(*) {
          pointer-events: auto;
        }
      `}</style>
    </>
  )
}

export default SceneDisplay
