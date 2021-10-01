import { Tooltip } from '@chakra-ui/react'
export interface HoverableProps {
  text: string
  imageUrl: string
  effect?: 'none' | 'pulse' | 'bounce' | 'ping' | 'spin' | 'wiggle'
  width?: string
  top?: string
  left?: string
}

const Hoverable = ({
  text,
  imageUrl,
  width = '5rem',
  effect = 'none',
  top = '0%',
  left = '0%',
}: HoverableProps) => {
  return (
    <div className={`absolute`} style={{ top: top, left: left, width: width }}>
      <Tooltip label={text} bg="gray.100" p={3} color="black" placement="right">
        <img
          className={`animate-${effect} object-cover`}
          src={imageUrl}
          alt={text}
        />
      </Tooltip>
    </div>
  )
}

export default Hoverable
