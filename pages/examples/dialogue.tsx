import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { create } from 'superstruct'
import Dialogue from '../../components/Dialogue'
import { useDebounce } from '../../hooks/useDebounce'
import { Game, makeGame } from '../../lib/game'
import { Scene } from '../../lib/scene'
import { GameSchema } from '../../schema/game'
import { useStore } from '../../stores/store'
import exampleJson from '../../schema/example-dialogue.json'
import { useAfterInteractionCallback } from '../../hooks/useAfterInteractionCallback'
import { useRunCleanupFnsOnUnmount } from '../../hooks/useRunCleanupFnsOnUnmount'
import { Action } from '../../lib/actions'
import {
  Narration,
  Clickable,
  isClickableText,
  isClickableImg,
  Image,
} from '../../lib/elements'
import ClickableGroup from '../../components/ClickableGroup'

const SchemaInput: React.FC = () => {
  const [inputSchema, setInputSchema] = useState<string>('')
  const debouncedSchema = useDebounce(inputSchema, 500)

  const [game, setGame] = useState<Game | undefined>()
  const [error, setError] = useState<string | undefined>()

  const handleInput: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInputSchema(e.target.value)
  }

  const loadExample = () => {
    setInputSchema(JSON.stringify(exampleJson, null, 2))
  }

  useEffect(() => {
    let schema
    try {
      schema = create(JSON.parse(debouncedSchema), GameSchema)
    } catch (e) {
      console.log({ e })
      setError(`${e}`)
      setGame(undefined)
      return
    }

    setError(undefined)
    setGame(makeGame(schema))
  }, [debouncedSchema])

  return (
    <main className="flex flex-col items-center py-5 space-y-5">
      <textarea
        className="m-2 w-full max-w-2xl font-mono"
        spellCheck={false}
        rows={16}
        onChange={handleInput}
        value={inputSchema}
      />
      <button className="p-1 bg-gray-200 shadow" onClick={loadExample}>
        Load Example
      </button>
      {debouncedSchema !== '' && error && (
        <p className="text-red-600 text-lg">Validation Error: {error}</p>
      )}
      {game && <GameDisplay game={game} />}
    </main>
  )
}

export default SchemaInput

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

type GameProps = {
  game?: Game
}

const GameDisplay: React.FC<GameProps> = ({ game: newGame }) => {
  const game = useStore((state) => state.game)
  const loadGame = useStore((state) => state.loadGame)

  useEffect(() => {
    if (newGame) {
      loadGame(newGame)
    }
  }, [newGame, loadGame])

  return (
    <div className="flex flex-col items-center my-2 w-full space-y-2">
      {game && (
        <div className="text-gray-900 text-2xl font-semibold">{game.name}</div>
      )}
      <div className="w-[80vw] h-[45vw] border shadow">
        {game.scenes.map((scene, idx) => {
          if (game?.currentSceneId === scene.id) {
            return <SceneDisplay scene={scene} key={idx} />
          }
        })}
      </div>
    </div>
  )
}

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

const exampleCharacters = {
  mainCharacter: {
    name: 'Julie',
    images: {
      default: '/images/Julie.svg',
    },
    info: '',
  },
  npcs: [
    {
      name: 'Jason',
      images: {
        default: '/images/Jason.svg',
      },
    },
  ],
}
