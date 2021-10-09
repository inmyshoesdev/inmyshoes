import GameSchemaInput from '../../components/GameSchemaInput'
import Meter from '../../components/Meter'
import MeterBar from '../../components/MeterBar'
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
    </div>
  )
}
