import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { Game } from '../lib/game'
import { useStore } from '../stores/store'
import Footer from './Footer'
import SceneDisplay from './SceneDisplay'
import Status from './Status'
import Header from './Header'

type GameProps = {
  game?: Game
}

const GameDisplay: React.FC<GameProps> = ({ game: newGame }) => {
  const game = useStore((state) => state.game)
  const loadGame = useStore((state) => state.loadGame)
  const [blurBackground, setBlurBackground] = useState(false)
  useEffect(() => {
    if (newGame) {
      loadGame(newGame)
    }
  }, [newGame, loadGame])

  return (
    <div className="flex flex-col items-center my-2 w-full space-y-2">
      <Header header={game?.header} />
      <div
        className={`w-[72vw] h-[40.5vw] relative bg-white border shadow overflow-hidden ${
          blurBackground ? 'blur-sm' : ''
        }`}
      >
        {game?.getScenes().map((scene, idx) => (
          <Transition
            show={game?.currentSceneId === scene.id}
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
