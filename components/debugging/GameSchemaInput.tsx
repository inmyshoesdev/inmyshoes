import { ChangeEventHandler, useEffect, useState } from 'react'
import { create, object } from 'superstruct'
import { useDebounce } from '../../hooks/useDebounce'
import { Game, makeGame } from '../../lib/game'
import { GameSchema } from '../../schema/game'
import { useStore } from '../../stores/store'
import GameDisplay from '../GameDisplay'
import { StateSchemaInput } from './StateSchemaInput'

type GameSchemaArgs = {
  examples: { jsonData: any; name: string }[]
}

export const GameSchemaInput: React.FC<GameSchemaArgs> = ({
  examples = [],
}) => {
  const [inputSchema, setInputSchema] = useState<string>('')
  const debouncedSchema = useDebounce(inputSchema, 500)

  const [game, setGame] = useState<Game | undefined>()
  const [gameError, setGameError] = useState<string | undefined>()

  const currentSceneId = useStore((state) => state.game.currentSceneId)
  const globalState = useStore((state) => state.game.globalState)
  const updateGlobalState = useStore((state) => state.replaceGlobalState)
  const currentSceneState = useStore(
    (state) => state.game.getScene(currentSceneId)?.state
  )
  const updateCurrentSceneState = useStore(
    (state) => state.replaceCurrentSceneState
  )
  const gotoScene = useStore((state) => state.gotoScene)

  const handleInput: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInputSchema(e.target.value)
  }

  const loadExample = (idx: number) => {
    setInputSchema(JSON.stringify(examples[idx].jsonData, null, 2))
  }

  const updateScene: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.valueAsNumber === NaN) {
      return
    }
    gotoScene(e.target.valueAsNumber)
  }

  useEffect(() => {
    let schema
    try {
      schema = create(JSON.parse(debouncedSchema), GameSchema)
      setGame(makeGame(schema))
    } catch (e) {
      console.log({ e })
      setGameError(`${e}`)
      setGame(undefined)
      return
    }

    setGameError(undefined)
  }, [debouncedSchema])

  return (
    <main className="flex flex-col items-center py-5 space-y-6">
      <textarea
        className="m-2 w-full max-w-3xl font-mono"
        spellCheck={false}
        rows={16}
        onChange={handleInput}
        value={inputSchema}
      />
      <div className="flex items-center space-x-5">
        {examples.map((example, idx) => (
          <button
            className="px-2 py-1 bg-gray-200 shadow"
            onClick={() => loadExample(idx)}
            key={idx}
          >
            Load {example.name}
          </button>
        ))}
      </div>
      {debouncedSchema !== '' && gameError && (
        <p className="text-red-600 text-lg">Validation Error: {gameError}</p>
      )}
      <div className="grid gap-4 grid-cols-1 place-items-center p-4 w-4/5 font-semibold bg-gray-100 rounded-lg sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-center sm:col-span-2 lg:col-span-1">
          Current Scene:{' '}
          <input
            className="rounded-md"
            type="number"
            value={currentSceneId}
            onChange={updateScene}
          />
        </div>
        <StateSchemaInput
          state={globalState}
          stateName="Global State"
          updateState={updateGlobalState}
        />
        <StateSchemaInput
          state={currentSceneState}
          stateName="Current Scene State"
          updateState={updateCurrentSceneState}
        />
      </div>

      {game && <GameDisplay game={game} />}
    </main>
  )
}

export default GameSchemaInput
