import GameSchemaInput from '../../components/debugging/GameSchemaInput'
import Status from '../../components/Status'
import exampleJson from '../../schema/example-dialogue.json'

export default function DialogueExample() {
  return (
    <div>
      <GameSchemaInput
        examples={[
          {
            jsonData: exampleJson,
            name: 'Example',
          },
        ]}
      />
      <Status />
    </div>
  )
}
