import {
  PostGameForm,
  PreGameForm,
  SurveyFormWrapper,
} from '../components/Surveys'

const Surveys: React.FC = () => {
  return (
    <main className="flex flex-col items-center py-10 space-y-8">
      <p className="-mb-4 text-gray-700 text-sm">
        Note that these forms are configured to not actually send any form data
        to Google Forms
      </p>
      <SurveyFormWrapper
        formComponent={PreGameForm}
        onSubmit={() => console.log('yay')}
        noSubmit={true}
      />
      <SurveyFormWrapper
        formComponent={PostGameForm}
        onSubmit={() => console.log('yayy')}
        noSubmit={true}
      />
    </main>
  )
}

export default Surveys
