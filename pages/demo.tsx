import Head from 'next/head'
import { useEffect, useState } from 'react'
import { create } from 'superstruct'
import { GameSchema } from '../schema/game'
import { Game, makeGame } from '../lib/game'
import mvpJson from '../schema/mvp.json'
import GameDisplay from '../components/GameDisplay'

const Demo: React.FC = () => {
  const [game, setGame] = useState<Game | undefined>()

  useEffect(() => {
    let schema
    try {
      schema = create(JSON.parse(JSON.stringify(mvpJson, null, 2)), GameSchema)
    } catch (e) {
      console.log({ e })
      setGame(undefined)
      return
    }
    setGame(makeGame(schema))
  }, [])

  return (
    <>
      <Head>
        <title>{game?.name}</title>
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
      <main>{game && <GameDisplay game={game} />}</main>
    </>
  )
}

export default Demo
