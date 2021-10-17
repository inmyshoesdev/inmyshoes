import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { Game } from '../lib/game'
import { useStore } from '../stores/store'
import Footer from './Footer'
import SceneDisplay from './SceneDisplay'
import Header from './Header'
import { Spinner } from '@chakra-ui/spinner'
import { DisplayControl } from './DisplayControl'
import useLocalStorage from '../hooks/useLocalStorage'
import CharacterInfo from './CharacterInfo'
import CharacterSelect from './CharacterSelect'
type GameProps = {
  game?: Game
}

const GameDisplay: React.FC<GameProps> = ({ game: newGame }) => {
  const game = useStore((state) => state.game)
  const loadGame = useStore((state) => state.loadGame)
  const updateCharacter = useStore((state) => state.updateCharacter)
  const [characterSelected, setCharacterSelected] = useState(false)
  const [blurBackground, setBlurBackground] = useState(false)
  const [hideCharacterInfo, setHideCharacterInfo] = useState(true)
  const [hideCharacterSelect, setHideCharacterSelect] = useState(false)
  const [storedScreenWidth, setStoredScreenWidth] = useLocalStorage(
    'ims-screenWidth',
    72
  )
  useEffect(() => {
    if (newGame) {
      loadGame(newGame)
    }
  }, [newGame, loadGame])
  return (
    <div className="flex flex-col items-center my-2 w-full space-y-2">
      <Header header={game.header} />
      <DisplayControl setStoredScreenWidth={setStoredScreenWidth} />

      <div
        className={`relative bg-white border shadow overflow-hidden`}
        style={{
          aspectRatio: '16/9',
          width: `${storedScreenWidth}vw`,
        }}
      >
        {characterSelected &&
          game?.getScenes().map((scene, idx) => (
            <Transition
              show={!game.loading && game?.currentSceneId === scene.id}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              key={idx}
              className={`absolute inset-0 ${blurBackground ? 'blur-sm' : ''}`}
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
          hidden={hideCharacterInfo}
          setHidden={setHideCharacterInfo}
          setBlurBackground={setBlurBackground}
          characterInfo={game.characterInfo}
        />
        <CharacterSelect
          hidden={hideCharacterSelect}
          setHidden={setHideCharacterSelect}
          mainCharacters={game.mainCharacters}
          setCharacterSelected={setCharacterSelected}
          updateCharacter={updateCharacter}
        />
      </div>
      <Footer
        gameOn={characterSelected}
        characterImage={game.characterImage}
        setBlurBackground={setBlurBackground}
        setHideCharacterInfo={setHideCharacterInfo}
      />
    </div>
  )
}

export default GameDisplay
