import { useEffect, useState } from 'react'
function Footer({ gameOn }: { gameOn: boolean }) {
  const [musicOn, setMusicOn] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined)
  useEffect(() => {
    const audioElement = new Audio()
    audioElement.volume = 0.05
    audioElement.src = '/music/bensound-jazzcomedy.mp3'
    audioElement.loop = true
    setAudio(audioElement)
  }, [])

  // comment out autoplay for now
  //   useEffect(() => {
  //     if (audio) {
  //       const tryToPlay = setInterval(() => {
  //         audio
  //           .play()
  //           .then(() => {
  //             clearInterval(tryToPlay)
  //             setMusicOn(true)
  //           })
  //           .catch((error) => {
  //             console.info('User has not interacted with document yet:)')
  //           })
  //       }, 1000)
  //     }
  //   }, [audio])

  return (
    <div id="footer" className={`w-96 flex justify-around items-center`}>
      <div>
        <button
          id="profile"
          className="focus:outline-none"
          aria-label="check current character"
          disabled={!gameOn}
        >
          {gameOn ? (
            <div className="w-12">
              <img
                className="cursor-hand"
                src="/images/curtis.png"
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
          setMusicOn(!musicOn)
          if (musicOn && audio !== undefined) {
            audio.muted = true
          } else if (audio !== undefined) {
            audio.play()
            audio.muted = false
          }
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
  )
}

export default Footer
