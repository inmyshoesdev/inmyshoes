import { useState } from 'react'
import { Tooltip } from '@chakra-ui/react'
import { useSound } from 'use-sound'

function Footer({
  gameOn,
  setBlurBackground,
  setHideCharacterInfo,
}: {
  gameOn: boolean
  setBlurBackground: React.Dispatch<React.SetStateAction<boolean>>
  setHideCharacterInfo: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [musicOn, setMusicOn] = useState(false)
  const [play, { stop }] = useSound('/music/bensound-jazzcomedy.mp3', {
    volume: 0.5,
  })
  return (
    <>
      <div id="footer" className={`w-96 flex justify-around items-center`}>
        <div>
          <Tooltip
            label="Character Information"
            aria-label="Character Information"
            placement="top"
          >
            <button
              className="focus:outline-none cursor-pointer"
              aria-label="check current character"
              // disabled={!gameOn}
              onClick={() => {
                setHideCharacterInfo((state) => !state)
                setBlurBackground((state) => !state)
              }}
            >
              {gameOn ? (
                <div className="flex w-12">
                  <img
                    className="justify-center cursor-pointer"
                    src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/curtis.png"
                    alt="Current character image"
                    width={20}
                    height={50}
                  />
                </div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-user-plus"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#000000"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
              )}
            </button>
          </Tooltip>
        </div>
        <div className="text-center">
          <img
            src="/images/mainlogo.png"
            alt="Soristic Logo"
            width={150}
            height={50}
          />
        </div>
        <button
          className="z-10 focus:outline-none"
          id="soundOnBtn"
          onClick={() => {
            if (musicOn) {
              stop()
            } else {
              play()
            }
            setMusicOn(!musicOn)
          }}
          aria-label="sound on off button"
        >
          {musicOn ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-volume cursor-pointer"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 8a5 5 0 0 1 0 8" />
              <path d="M17.7 5a9 9 0 0 1 0 14" />
              <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-volume-3 cursor-pointer"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
              <path d="M16 10l4 4m0 -4l-4 4" />
            </svg>
          )}
        </button>
      </div>
    </>
  )
}

export default Footer
