import Video from './Video'

function CharacterInfo({
  url,
  hidden,
  setHidden,
  setBlurBackground,
}: {
  url: string
  hidden: boolean
  setHidden: (hidden: boolean) => void
  setBlurBackground: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div
      className={`${
        hidden ? 'hidden' : ''
      } absolute w-full top-20 flex flex-col items-center gap-4`}
    >
      {/* todo implement reselect */}
      {/* <button className="justify-content flex mx-auto px-2 font-semibold bg-yellow-600 rounded-sm focus:outline-none">
        Reselect
      </button> */}
      <h1 className="px-2 font-bold bg-yellow-50">Character Information</h1>
      <div className="w-2/6 sm:w-1/2">
        <Video url={url} />
      </div>

      <div className="flex items-center justify-center">
        <button
          className="px-4 text-center text-lg font-semibold bg-green-400 rounded focus:outline-none"
          onClick={() => {
            setHidden(true)
            setBlurBackground((state) => !state)
          }}
        >
          Resume
        </button>
      </div>
    </div>
  )
}

export default CharacterInfo
