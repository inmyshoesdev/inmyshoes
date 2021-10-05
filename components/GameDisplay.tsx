import { useEffect } from 'react'
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
      <div className="w-[80vw] h-[45vw] border shadow">
        {game?.getScenes().map((scene, idx) => {
          if (game?.globalState.currentSceneId === scene.id) {
            return <SceneDisplay scene={scene} key={idx} />
          }
        })}
      </div>
      <Footer gameOn={true} />
    </div>
  )
}

export default GameDisplay
