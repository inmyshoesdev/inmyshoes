import { useToast } from '@chakra-ui/toast'
import { Transition } from '@headlessui/react'
import Head from 'next/head'
import { useState } from 'react'
import { PostGameForm, SurveyFormWrapper } from '../../components/Surveys'

const Feedback: React.FC = () => {
  const [postgameSurveyDone, setPostgameSurveyDone] = useState<boolean>(false)
  const toast = useToast()

  const handleSubmitPostgameSurvey = () => {
    setPostgameSurveyDone(true)
    toast({
      position: 'top-left',
      description: '🚀 Submitted, thank you so much!',
      duration: 2500,
      status: 'success',
      isClosable: true,
      variant: 'subtle',
    })
  }

  return (
    <>
      <Head>
        <title>{Feedback}</title>
        <meta name="description" content="In Their Shoes | Soristic" />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#01948e" />
        <meta name="title" content="In My Shoes | Soristic" />
        <meta
          name="Description"
          property="og:description"
          content="Simulation game, developed by Soristic"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="In My Shoes | Soristic" />
        <meta
          property="og:description"
          content="Simulation game, developed by Soristic"
        />
        <meta name="author" content="Soristic" />
      </Head>
      <main className="relative h-screen overflow-y-hidden">
        {postgameSurveyDone && (
          <div className="absolute inset-0 grid place-items-center h-full text-5xl font-bold tracking-wide">
            <h1 className="p-5 text-transparent bg-gradient-to-r bg-clip-text from-teal-500 to-blue-500 animate-bounce">
              Thanks For Playing!
            </h1>
          </div>
        )}
        <Transition
          show={!postgameSurveyDone}
          enter="transition duration-1000"
          enterFrom="opacity-0 translate-y-2/3"
          enterTo="opacity-100 translate-y-0"
          leave="transition duration-1000"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-2/3"
          className="grid place-items-center py-8 w-full h-full overflow-y-scroll"
        >
          <SurveyFormWrapper
            formComponent={PostGameForm}
            onSubmit={handleSubmitPostgameSurvey}
            noSubmit={process.env.NODE_ENV === 'development'}
          />
        </Transition>
      </main>
    </>
  )
}

export default Feedback
