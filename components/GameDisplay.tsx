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
type GameProps = {
  game?: Game
}

const GameDisplay: React.FC<GameProps> = ({ game: newGame }) => {
  const game = useStore((state) => state.game)
  const loadGame = useStore((state) => state.loadGame)
  const [blurBackground, setBlurBackground] = useState(false)
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
        className={`relative bg-white border shadow overflow-hidden ${
          blurBackground ? 'blur-sm' : ''
        } `}
        style={{
          aspectRatio: '16/9',
          width: `${storedScreenWidth}vw`,
        }}
      >
        {game?.getScenes().map((scene, idx) => (
          <Transition
            show={!game.loading && game?.currentSceneId === scene.id}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            key={idx}
            className="absolute inset-0"
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
      </div>
      <Footer
        gameOn={true}
        characterInfo={game.characterInfo}
        setBlurBackground={setBlurBackground}
      />
    </div>
  )
}

export default GameDisplay
