import Head from 'next/head'
import { useEffect, useState } from 'react'
import { create } from 'superstruct'
import { useToast } from '@chakra-ui/react'
import { GameSchema } from '../../schema/game'
import { Game, makeGame } from '../../lib/game'
import GameDisplay from '../../components/GameDisplay'
import { PreGameForm, SurveyFormWrapper } from '../../components/Surveys'
import { Transition } from '@headlessui/react'
import { useHasMounted } from '../../hooks/useHasMounted'
import { useLocalStorage, useMedia } from 'react-use'
import Image from 'next/image'
import mvpJson from '../../schema/mvp.json'
import { gameBackgroundTexture } from '../../lib/constants'

const Demo: React.FC = () => {
  const mounted = useHasMounted()
  const [pregameSurveyDone, setPregameSurveyDone] = useLocalStorage(
    'ims-pregameSurveyDone',
    false
  )

  const [game, setGame] = useState<Game | undefined>()
  const [showGame, setShowGame] = useState<boolean>(false)

  const toast = useToast()

  const handleSubmitPregameSurvey = () => {
    setPregameSurveyDone(true)
    toast({
      position: 'top-left',
      description: '🚀 Submitted, thank you so much!',
      duration: 2500,
      status: 'success',
      isClosable: true,
      variant: 'subtle',
    })
  }

  useEffect(() => {
    let schema
    try {
      schema = create(mvpJson, GameSchema)
    } catch (e) {
      console.log({ e })
      setGame(undefined)
      return
    }
    setGame(makeGame(schema))
  }, [])

  useEffect(() => {
    if (pregameSurveyDone) {
      const id = setTimeout(() => {
        setShowGame(true)
      }, 500)

      return () => clearTimeout(id)
    }
  }, [pregameSurveyDone])

  const isPortrait = useMedia('(orientation: portrait) and (max-width: 1024px)')
  const [landscapePromptShown, setLandscapePromptShown] =
    useState<boolean>(false)

  useEffect(() => {
    if (isPortrait && showGame && !landscapePromptShown) {
      toast({
        position: 'bottom',
        description: 'View in landscape mode for a better experience!',
        duration: 5000,
        status: 'info',
        isClosable: true,
        variant: 'subtle',
      })

      setLandscapePromptShown(true)
    }
  }, [isPortrait, showGame, landscapePromptShown, toast])

  return (
    <>
      <Head>
        <title>{game?.name}</title>
        <meta name="description" content="In My Shoes | Soristic" />
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
          content="Live through the daily lives of the characters and understand the challenges they face by placing yourself in their shoes."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="In My Shoes | Soristic" />
        <meta
          property="og:description"
          content="Live through the daily lives of the characters and understand the challenges they face by placing yourself in their shoes."
        />
        <meta name="author" content="Soristic" />
      </Head>
      <main className="relative h-screen overflow-y-scroll">
        <div className="absolute inset-0 bg-r-bg">
          <div
            aria-hidden={true}
            className="fixed top-0 w-full h-screen pointer-events-none"
          >
            <Image
              className="opacity-[7%] mix-blend-soft-light"
              aria-hidden={true}
              src={gameBackgroundTexture}
              alt="background texture"
              layout="fill"
            />
          </div>
          <Transition
            show={showGame}
            enter="transition duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            className="w-full h-full"
          >
            {game && <GameDisplay game={game} />}
          </Transition>
        </div>
        <div
          className={`absolute inset-0 pt-8 px-2 grid place-items-center w-full h-screen ${
            showGame ? 'pointer-events-none' : ''
          }`}
        >
          <Transition
            show={
              mounted && pregameSurveyDone !== undefined && !pregameSurveyDone
            }
            enter="transition duration-500"
            enterFrom="opacity-0 translate-y-2/3"
            enterTo="opacity-100 translate-y-0"
            leave="transition duration-500"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2/3"
          >
            <SurveyFormWrapper
              formComponent={PreGameForm}
              onSubmit={handleSubmitPregameSurvey}
              noSubmit={process.env.NODE_ENV === 'development'}
            />
          </Transition>
        </div>
      </main>
    </>
  )
}

export default Demo
