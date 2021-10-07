export default function Video({ url }: { url: string }) {
  return (
    <video
      className="w-2/5 sm:w-3/5"
      loop
      muted
      autoPlay
      playsInline
      src={url}
    />
  )
}
