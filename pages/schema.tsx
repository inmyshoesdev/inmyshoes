import { ChangeEventHandler, useEffect, useState } from 'react'
import { create } from 'superstruct'
import { useDebounce } from '../hooks/useDebounce'
import { GameSchema } from '../schema/game'
import exampleJson from '../schema/example-schema.json'

const SchemaInput: React.FC = () => {
  const [inputSchema, setInputSchema] = useState<string>('')
  const debouncedSchema = useDebounce(inputSchema, 500)

  const [gameSchema, setGameSchema] = useState<GameSchema | undefined>()
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
      setGameSchema(undefined)
      return
    }

    setError(undefined)
    setGameSchema(schema)
  }, [debouncedSchema])

  return (
    <main className="flex flex-col items-center p-5 space-y-5">
      <textarea
        className="m-2 w-full max-w-2xl font-mono"
        spellCheck={false}
        rows={16}
        onChange={handleInput}
        value={inputSchema}
      />
      <button className="p-1 bg-gray-200" onClick={loadExample}>
        Load Example
      </button>
      {debouncedSchema !== '' && error && (
        <p className="text-red-600 text-lg">Validation Error: {error}</p>
      )}
      {gameSchema && (
        <pre className="p-2 max-w-2xl whitespace-pre-wrap border-2 border-green-500 shadow">
          {JSON.stringify(gameSchema, null, 2)}
        </pre>
      )}
    </main>
  )
}

export default SchemaInput
