import { useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { Game } from '../lib/game'
import { useStore } from '../stores/store'
import Footer from './Footer'
import SceneDisplay from './SceneDisplay'
import Status from './Status'

type GameProps = {
  game?: Game
}

const GameDisplay: React.FC<GameProps> = ({ game: newGame }) => {
  const game = useStore((state) => state.game)
  const loadGame = useStore((state) => state.loadGame)

  useEffect(() => {
    if (newGame) {
      loadGame(newGame)
    }
  }, [newGame, loadGame])

  return (
    <div className="flex flex-col items-center my-2 w-full space-y-2">
      {game && (
        <div className="text-gray-900 text-2xl font-semibold">{game.name}</div>
      )}
      <Status />
      <div className="w-[80vw] h-[45vw] relative bg-white border shadow overflow-hidden">
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
      <Footer gameOn={true} />
    </div>
  )
}

export default GameDisplay
