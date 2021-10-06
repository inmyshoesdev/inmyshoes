import { ChangeEventHandler, useEffect, useState } from 'react'
import { create } from 'superstruct'
import { useDebounce } from '../hooks/useDebounce'
import { GameSchema } from '../schema/game'
import { Game, makeGame } from '../lib/game'
import exampleJson from '../schema/mvp.json'
import GameDisplay from '../components/GameDisplay'

export const GenericSchemaInput = (jsonData: any) => function SchemaInput() {
  const [inputSchema, setInputSchema] = useState<string>('')
  const debouncedSchema = useDebounce(inputSchema, 500)

  const [game, setGame] = useState<Game | undefined>()
  const [error, setError] = useState<string | undefined>()

  const handleInput: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInputSchema(e.target.value)
  }

  const loadExample = () => {
    setInputSchema(JSON.stringify(jsonData, null, 2))
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


export default GenericSchemaInput(exampleJson)
