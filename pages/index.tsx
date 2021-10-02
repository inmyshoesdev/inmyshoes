import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center p-5 space-y-5">
        <h1 className="text-4xl">Examples</h1>
        <Link href="/examples/toastable">
          <a className="text-blue-600">toastable</a>
        </Link>
        <Link href="/examples/hoverable">
          <a className="text-blue-600">hoverable</a>
        </Link>
        <Link href="/examples/clickable">
          <a className="text-blue-600">clickable</a>
        </Link>
        <h2 className="text-lg">
          For testing the game, go to{' '}
          <Link href="/testing">
            <a className="text-blue-600">/testing</a>
          </Link>
        </h2>
      </main>
    </div>
  )
}

export default Home
