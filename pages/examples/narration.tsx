import GameSchemaInput from '../../components/GameSchemaInput'
import exampleJson from '../../schema/example-narration.json'

export default function DialogueExample() {
  return (
    <GameSchemaInput
      examples={[
        {
          jsonData: exampleJson,
          name: 'Example',
        },
      ]}
    />
  )
}
