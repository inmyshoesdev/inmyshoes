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
import BadgeCollection from './BadgeCollection'

type GameProps = {
  game?: Game
}

const GameDisplay: React.FC<GameProps> = ({ game: newGame }) => {
  const game = useStore((state) => state.game)
  const header = useStore((state) => state.game.header)
  const loadGame = useStore((state) => state.loadGame)
  const updateCharacter = useStore((state) => state.updateCharacter)
  const [blurBackground, setBlurBackground] = useState(false)
  const [hideCharacterInfo, setHideCharacterInfo] = useState(true)
  const [hideBadgeCollection, setHideBadgeCollection] = useState(true)

  useEffect(() => {
    if (newGame) {
      loadGame(newGame)
    }
  }, [newGame, loadGame])

  return (
    <div className="flex flex-col items-center my-2 w-full space-y-2">
      <Header
        header={header}
        setHideBadgeCollection={setHideBadgeCollection}
        setBlurBackground={setBlurBackground}
      />
      <DisplayControl />
      <div className="w-[72vw] h-[40.5vw] relative bg-white shadow overflow-hidden">
        {game.characterSelected &&
          game?.getScenes().map((scene, idx) => (
            <Transition
              show={
                !game.loading &&
                (game?.currentSceneId === scene.id ||
                  scene.id === EventsSceneId)
              }
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              key={idx}
              className={`absolute inset-0 transition-filter duration-200 ${
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
        <BadgeCollection
          hidden={hideBadgeCollection}
          setHidden={setHideBadgeCollection}
          setBlurBackground={setBlurBackground}
        />
      </div>
      <Footer
        characterSelected={game.characterSelected}
        characterIndex={game.characterIndex}
        setBlurBackground={setBlurBackground}
        setHideCharacterInfo={setHideCharacterInfo}
      />
    </div>
  )
}

export default GameDisplay
