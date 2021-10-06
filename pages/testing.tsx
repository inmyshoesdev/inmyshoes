import { ChangeEventHandler, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { create } from 'superstruct'
import { useDebounce } from '../hooks/useDebounce'
import { GameSchema } from '../schema/game'
import { Game, makeGame } from '../lib/game'
import GameDisplay from '../components/GameDisplay'
import demoJson from '../schema/mvp.json'
import exampleJson from '../schema/example-schema.json'

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      examples: [
        {
          jsonData: demoJson,
          name: 'Demo',
        },
        {
          jsonData: exampleJson,
          name: 'Example',
        },
      ],
    },
  }
}

type SchemaArgs = {
  examples: { jsonData: any; name: string }[]
}

export const SchemaInput: React.FC<SchemaArgs> = ({ examples = [] }) => {
  const [inputSchema, setInputSchema] = useState<string>('')
  const debouncedSchema = useDebounce(inputSchema, 500)

  const [game, setGame] = useState<Game | undefined>()
  const [error, setError] = useState<string | undefined>()

  const handleInput: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInputSchema(e.target.value)
  }

  const loadExample = (idx: number) => {
    setInputSchema(JSON.stringify(examples[idx].jsonData, null, 2))
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

      {debouncedSchema !== '' && error && (
        <p className="text-red-600 text-lg">Validation Error: {error}</p>
      )}
      {game && <GameDisplay game={game} />}
    </main>
  )
}

export default SchemaInput
