import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Character1 from '../public/character1.png'

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
      </main>
    </div>
  )
}

export default Dialog
