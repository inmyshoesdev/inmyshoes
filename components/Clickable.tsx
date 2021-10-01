export interface ClickableProps {
  action: () => void
  text?: string
  imageUrl?: string
  effect?: 'none' | 'pulse' | 'bounce' | 'ping' | 'spin' | 'wiggle'
  width?: string
  top?: string
  left?: string
  bg?: string
}

const Clickable = ({
  action,
  text,
  imageUrl,
  width = '5rem',
  effect = 'none',
  bg = 'none',
  top = '0%',
  left = '0%',
}: ClickableProps) => {
  return (
    <div
      className={`absolute cursor-pointer`}
      style={{
        top: top,
        left: left,
        width: width,
      }}
      onClick={action}
    >
      {text && <div className={`p-2 border rounded-lg bg-${bg}`}>{text}</div>}
      {imageUrl && (
        <img
          className={`animate-${effect} object-cover`}
          src={imageUrl}
          alt={text}
        />
      )}
    </div>
  )
}

export default Clickable
