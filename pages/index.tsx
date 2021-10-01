import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Examples</h1>
        <ul>
          <li>
            <a href="/examples/clickable">Clickable</a>
          </li>
        </ul>
      </main>
    </div>
  )
}

export default Home
