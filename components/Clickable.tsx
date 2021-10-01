import { useToast, Box } from '@chakra-ui/react'

export interface ClickableProps {
  action: () => void
  text?: string
  imageUrl: string
  effect: string
  top?: number
  left?: number
  bottom?: number
  right?: number
}

const Clickable = ({
  action,
  text,
  imageUrl,
  effect,
  top = 0,
  left = 0,
}: ClickableProps) => {
  const toast = useToast()
  return (
    <div
      className={`cursor-pointer flex flex-col w-24 absolute 
        top-${top} left-${left}`}
      onClick={() =>
        toast({
          position: 'bottom-left',
          render: () => (
            <Box color="white" p={3} bg="blue.500">
              Hello World
            </Box>
          ),
        })
      }
    >
      <p>{text}</p>
      <img className={`animate-${effect}`} src={imageUrl} alt={text}></img>
    </div>
  )
}

export default Clickable
