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
          <a className="text-blue-600 cursor-pointer">toastable</a>
        </Link>
        <Link href="/examples/hoverable">
          <a className="text-blue-600 cursor-pointer">hoverable</a>
        </Link>
        <Link href="/examples/dialogue">
          <a className="text-blue-600 cursor-pointer">dialogue</a>
        </Link>
        <Link href="/examples/clickable">
          <a className="text-blue-600 cursor-pointer">clickable</a>
        </Link>
        <Link href="/examples/narration">
          <a className="text-blue-600">narration</a>
        </Link>
        <Link href="/surveys">
          <a className="text-blue-600">surveys</a>
        </Link>
        <h2 className="text-lg">
          For testing the game, go to{' '}
          <Link href="/testing">
            <a className="text-blue-600 cursor-pointer">/testing</a>
          </Link>
        </h2>
        <h2 className="text-lg">
          To play the Demo game, go to{' '}
          <Link href="/demo">
            <a className="text-blue-600 cursor-pointer">/demo</a>
          </Link>
        </h2>
      </main>
    </div>
  )
}

export default Home

export async function getStaticProps() {
  return {
    notFound: process.env.NODE_ENV === 'production',
    props: {},
  }
}
