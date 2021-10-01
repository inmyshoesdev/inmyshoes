import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Character1 from '../public/character1.png'
import Character2 from '../public/images/girl-1.svg'

const Dialog: NextPage = () => {
  const [dialog, setDialog] = useState('Dialog 1')
  return (
    <div>
      <Head>
        <title>Dialog</title>
      </Head>

      <main className="justify-content w-full overflow-y-hidden">
        <div className="absolute bottom-5 left-5">
          <Image src={Character1} />
        </div>
        <div className="dialog-box absolute inset-x-0 bottom-5 border-gray-600 border w-5/6 md:w-3/5 xl:w-1/2 mx-auto overflow-y-auto min-h-48 flex flex-col">
          <div className="dialog p-4 font-semibold prose-sm lg:prose-md xl:prose-lg text-xs sm:text-base">
            {dialog}
          </div>
        </div>
        <img src="/images/girl-1.svg" height={400} width={141} />
      </main>
    </div>
  )
}

export default Dialog
