import { useEffect, useState } from 'react'
import { useMousePosition } from '../hooks/useMousePosition'
import { Scene } from '../lib/scene'
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
  const [css, setCss] = useState({})
  useEffect(() => {
    resetScene(scene.id)
  }, [resetScene, scene.id])

  useEffect(() => {
    return executeActions(...scene.intro)
  }, [scene.intro, executeActions])
  const position = useMousePosition()
  useEffect(() => {
    const wHeight = window.innerHeight
    const wWidth = window.innerWidth
    const around1 = -1 * (((position.y * 100) / wHeight) * 0.2 - 10) + 'deg'
    const around2 = 1 * (((position.x * 100) / wWidth) * 0.2 - 10) + 'deg'
    const trans1 = ((position.x * 100) / wHeight) * 0.3 + 'px'
    const trans2 = ((position.y * 100) / wHeight) * 0.3 + 'px'
    const mousePositionX = (position.x / wWidth) * 100
    const mousePositionY = 50 + (position.y / wHeight) * 10
    const css = {
      backgroundImage: `url(${scene.background})`,
      '-webkit-transform':
        'translate3d(' +
        trans1 +
        ', ' +
        trans2 +
        ', 0) scale(1) rotatex(' +
        around1 +
        ') rotatey(' +
        around2 +
        ')',
      'background-position':
        mousePositionX + '%' + ' ' + (position.y / wHeight) * 50 + '%',
    }
    setCss(css)
  }, [position])

  return (
    <div
      className={'relative w-full h-full select-none overflow-hidden'}
      style={css}
    >
      {/* <img
        className="m-auto w-full h-full object-cover"
        src={scene.background}
        alt={scene.backgroundAltText ?? ''}
      /> */}
      {scene.images.map((image) => (
        <ImageElement {...image} key={image.name}></ImageElement>
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
  )
}

export default SceneDisplay
