export default function Video({ url }: { url: string }) {
  return <video loop muted autoPlay playsInline src={url} />
}
