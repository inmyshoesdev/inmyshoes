import { ChangeEventHandler, useEffect, useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { State, StateMap } from '../../lib/state'

type StateSchemaInputProps = {
  state?: State
  stateName?: string
  updateState(newState: StateMap): void
}

export const StateSchemaInput: React.FC<StateSchemaInputProps> = ({
  state,
  stateName = 'State',
  updateState,
}) => {
  const [stateInput, setStateInput] = useState<string>('{}')
  const [stateError, setStateError] = useState<string | undefined>()
  const debouncedState = useDebounce(stateInput, 500)

  useEffect(() => {
    setStateInput(JSON.stringify(state?.innerState || {}, null, 2))
  }, [state])

  useEffect(() => {
    let newState
    try {
      newState = JSON.parse(debouncedState)
    } catch (e) {
      console.log({ e })
      setStateError(`${e}`)
      return
    }

    setStateError(undefined)
    updateState(newState as StateMap)
  }, [updateState, debouncedState])

  const handleStateInput: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setStateInput(e.target.value)
  }

  if (!state) {
    return <p className="text-red-600">State undefined!</p>
  }

  return (
    <div className="flex flex-col items-center w-full">
      {stateName}:{' '}
      <textarea
        className="w-full max-w-full font-mono"
        rows={6}
        spellCheck={false}
        onChange={handleStateInput}
        value={stateInput}
      />
      {debouncedState !== '' && stateError && (
        <p className="text-red-600 text-lg">
          State Validation Error: {stateError}
        </p>
      )}
    </div>
  )
}
