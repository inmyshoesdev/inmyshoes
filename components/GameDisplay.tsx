import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { Game } from '../lib/game'
import { useStore } from '../stores/store'
import Footer from './Footer'
import SceneDisplay from './SceneDisplay'
import Header from './Header'
import { Spinner } from '@chakra-ui/spinner'
import { DisplayControl } from './DisplayControl'
import CharacterInfo from './CharacterInfo'
import CharacterSelect from './CharacterSelect'
import { EventsSceneId } from '../lib/events'
import { useHasMounted } from '../hooks/useHasMounted'
import { useIsMobileLandscape } from '../hooks/useBreakpoint'

type GameProps = {
  game?: Game
}

const GameDisplay: React.FC<GameProps> = ({ game: newGame }) => {
  const mounted = useHasMounted()
  const isMobileLandscape = useIsMobileLandscape()

  const game = useStore((state) => state.game)
  const headerInfo = useStore((state) => state.game.header)
  const loadGame = useStore((state) => state.loadGame)
  const updateCharacter = useStore((state) => state.updateCharacter)

  const [blurBackground, setBlurBackground] = useState(false)
  const [hideCharacterInfo, setHideCharacterInfo] = useState(true)

  useEffect(() => {
    if (newGame) {
      loadGame(newGame)
    }
  }, [newGame, loadGame])

  const gameBody = (
    <>
      {game.characterSelected &&
        game?.getScenes().map((scene, idx) => (
          <Transition
            show={
              !game.loading &&
              (game?.currentSceneId === scene.id || scene.id === EventsSceneId)
            }
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            key={idx}
            className={`absolute h-full inset-0 transition-filter duration-200 ${
              blurBackground ? 'blur-sm' : ''
            } ${scene.id === EventsSceneId ? 'pointer-events-none' : ''}`}
          >
            <SceneDisplay scene={scene} />
          </Transition>
        ))}
      <Transition
        show={game.loading}
        leave="transition-opacity duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute inset-0 grid place-items-center bg-gray-800"
      >
        {game.loading && (
          <Spinner
            thickness="4px"
            speed="1.1s"
            emptyColor="gray.100"
            color="blue.300"
            size="xl"
            label="loading..."
          />
        )}
      </Transition>
      {!game.loading && (
        <>
          <CharacterInfo
            characterSelected={game.characterSelected}
            hidden={hideCharacterInfo}
            setHidden={setHideCharacterInfo}
            setBlurBackground={setBlurBackground}
          />
          <CharacterSelect
            characterSelected={game.characterSelected}
            mainCharacters={game.mainCharacters}
            updateCharacter={updateCharacter}
          />
        </>
      )}
    </>
  )

  const header = <Header header={headerInfo} />

  const footer = (
    <Footer
      characterSelected={game.characterSelected}
      characterIndex={game.characterIndex}
      setBlurBackground={setBlurBackground}
      setHideCharacterInfo={setHideCharacterInfo}
    />
  )

  if (!mounted) {
    return null
  }

  return isMobileLandscape ? (
    <div className="relative flex items-start justify-center w-full h-full max-h-screen md:space-x-1">
      <DisplayControl />
      <div className="w-[160vh] flex flex-col items-center h-screen">
        <div className="w-[160vh] h-[10vh] flex-auto">{header}</div>
        <div className="w-[160vh] h-[90vh] relative flex-none mb-1 bg-white shadow overflow-hidden">
          {gameBody}
        </div>
      </div>
      <div className="h-[90vh] flex-shrink self-end overflow-hidden">
        {footer}
      </div>
    </div>
  ) : (
    <div className="relative flex flex-col items-center w-full h-full max-h-screen">
      <div className="w-[144vh] h-[9.5vh] flex-none max-w-screen">{header}</div>
      <DisplayControl />
      <div className="w-[144vh] h-[81vh] max-h-[56.25vw] relative flex-none bg-white shadow overflow-hidden">
        {gameBody}
      </div>
      <div className="w-[144vh] h-[9.5vh] grid place-items-center max-w-screen">
        {footer}
      </div>
    </div>
  )
}

export default GameDisplay
