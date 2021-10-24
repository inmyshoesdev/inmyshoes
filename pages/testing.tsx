import demoJson from '../schema/mvp.json'
import exampleJson from '../schema/example-schema.json'
import GameSchemaInput from '../components/debugging/GameSchemaInput'

export const TestingPage: React.FC = () => {
  return (
    <GameSchemaInput
      examples={[
        {
          jsonData: demoJson,
          name: 'Demo',
        },
        {
          jsonData: exampleJson,
          name: 'Example',
        },
      ]}
    />
  )
}

export default TestingPage

export async function getStaticProps() {
  return {
    notFound: true, // set to true when live for testing
    props: {},
  }
}
