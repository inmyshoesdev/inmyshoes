import { useToast, Box } from '@chakra-ui/react'

export interface ToastableProps {
  text: string
  imageUrl: string
  effect?: 'none' | 'pulse' | 'bounce' | 'ping' | 'spin' | 'wiggle'
  width?: string
  top?: string
  left?: string
}

const Toastable = ({
  text,
  imageUrl,
  effect = 'none',
  width = '5rem',
  top = '0%',
  left = '0%',
}: ToastableProps) => {
  const toast = useToast()
  return (
    <div
      className={`cursor-pointer absolute`}
      style={{ top: top, left: left, width: width }}
      onClick={() =>
        toast({
          position: 'top',
          render: () => (
            <Box color="white" p={3} bg="blue.500">
              {text}
            </Box>
          ),
        })
      }
    >
      <img
        className={`animate-${effect} object-cover`}
        src={imageUrl}
        alt={text}
      />
    </div>
  )
}

export default Toastable
