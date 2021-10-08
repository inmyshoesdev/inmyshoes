import GameSchemaInput from '../../components/GameSchemaInput'
import exampleJson from '../../schema/example-clickable.json'

export default function ClickableExample() {
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
