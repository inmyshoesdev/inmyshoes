import { useCallback, useEffect } from 'react'
import { Action } from '../lib/actions'
import {
  Clickable,
  Dialogue,
  Image,
  isClickableImg,
  isClickableText,
  Narration,
} from '../lib/elements'
import { Scene } from '../lib/scene'
import { useStore } from '../stores/store'

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
        className="object-contain w-full m-auto"
        src={scene.background}
        alt={scene.backgroundAltText ?? ''}
      />
      {scene.narrations.map((narration) => (
        <TempNarration {...narration} key={narration.name} />
      ))}
      {scene.dialogues.map((dialogue) => (
        <TempDialogue {...dialogue} key={dialogue.name} />
      ))}
      {scene.images.map((image) => (
        <TempImage {...image} key={image.name}></TempImage>
      ))}
      {scene.clickables.map((clickable) => (
        <TempClickable sceneId={scene.id} {...clickable} key={clickable.name} />
      ))}
    </div>
  )
}

export default SceneDisplay

const TempNarration: React.FC<Narration> = ({ shown, text, position }) => {
  if (!shown) {
    return null
  }

  return (
    <div className="absolute px-4 py-3 m-auto bg-gray-100 border border-gray-700 rounded positioned h-max w-max">
      <span className="font-semibold text-gray-900 text-md">{text}</span>
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

const TempDialogue: React.FC<Dialogue> = ({
  shown,
  text,
  character,
  position,
}) => {
  if (!shown) {
    return null
  }

  return (
    <div className="absolute px-4 py-3 m-auto bg-gray-100 border border-gray-700 rounded positioned h-max w-max">
      <div className="-mt-1">
        <span className="text-sm font-bold text-gray-500 leading-wide">
          {character}
        </span>
      </div>
      <div className="px-8">
        <span className="font-semibold text-gray-900 text-md">{text}</span>
      </div>
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

const TempImage: React.FC<Image> = ({ shown, src, altText, position }) => {
  if (!shown) {
    return null
  }

  return (
    <div className="absolute w-1/5 positioned">
      <img
        src={src}
        alt={altText || ''}
        className="object-cover mix-blend-lighten"
      />
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

type TempClickableProps = {
  sceneId: number
} & Clickable

const TempClickable: React.FC<TempClickableProps> = ({
  name,
  shown,
  options,
  position,
  sceneId,
}) => {
  const executeActions = useStore((state) => state.executeActions)
  const hideClickable = useStore((state) => state.hideClickable)

  const onClick = useCallback(
    (optionName: string) => {
      const actions =
        options.find((option) => option.name === optionName)?.onClickActions ??
        ([] as Action[])
      hideClickable(sceneId, name)
      executeActions(...actions)
    },
    [executeActions, hideClickable, options, name, sceneId]
  )

  if (!shown) {
    return null
  }

  return (
    <div className="absolute flex items-center justify-around w-1/3 mx-auto positioned">
      {options.map((option, idx) => (
        <div
          onClick={() => onClick(option.name)}
          className="px-4 py-3 bg-gray-100 border border-gray-700 rounded shadow w-max"
          key={idx}
        >
          {isClickableText(option) ? (
            <span className="font-semibold text-gray-900 text-md">
              {option.text}
            </span>
          ) : isClickableImg(option) ? (
            <img
              src={option.src}
              alt={option.altText || ''}
              className="object-cover"
            />
          ) : null}
        </div>
      ))}
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
