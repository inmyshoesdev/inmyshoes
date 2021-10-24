import GameSchemaInput from '../../components/debugging/GameSchemaInput'
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

export async function getStaticProps() {
  return {
    notFound: false, // set to true when live for testing
    props: {},
  }
}
