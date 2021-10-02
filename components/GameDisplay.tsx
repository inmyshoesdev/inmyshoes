import { useEffect } from 'react'
import { Game } from '../lib/game'
import { useStore } from '../stores/store'
import SceneDisplay from './SceneDisplay'

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
    <div className="flex flex-col items-center w-full my-2 space-y-2">
      {game && (
        <div className="text-2xl font-semibold text-gray-900">{game.name}</div>
      )}
      <div className="w-[80vw] h-[45vw] border shadow">
        {game.scenes.map((scene, idx) => {
          if (game?.currentSceneId === scene.id) {
            return <SceneDisplay scene={scene} key={idx} />
          }
        })}
      </div>
    </div>
  )
}

export default GameDisplay
