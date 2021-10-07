import Video from './Video'

function CharacterInfo({
  url,
  hidden,
  setHidden,
}: {
  url: string
  hidden: boolean
  setHidden: (hidden: boolean) => void
}) {
  return (
    <div
      className={`${
        hidden ? 'hidden' : ''
      } absolute sm:top-40 w-full top-32 flex flex-col items-center gap-4`}
    >
      {/* todo implement reselect */}
      {/* <button className="justify-content flex mx-auto px-2 font-semibold bg-yellow-600 rounded-sm focus:outline-none">
        Reselect
      </button> */}
      <h1 className="px-2 font-bold bg-yellow-50">Character Information</h1>
      <Video url={url} />
      <div className="flex items-center justify-center">
        <button
          className="px-4 text-center text-lg font-semibold bg-green-400 rounded focus:outline-none"
          onClick={() => setHidden(true)}
        >
          Resume
        </button>
      </div>
    </div>
  )
}

export default CharacterInfo
