import { Box } from '@chakra-ui/react'
import { Fragment, PropsWithChildren } from 'react'
import { Position, Dimension } from '../lib/elements'

export interface DialogueBoxProps {
  image?: string
  position?: Position
  dimension?: Dimension
}

const DialogueBox: React.FC<PropsWithChildren<DialogueBoxProps>> = ({
  image,
  position,
  dimension,
  children,
}) => {
  return (
    <Fragment>
      {image ? (
        <Box
          bgImage={image}
          bgSize="100% 100%"
          className="p-[2%] absolute"
          style={{
            top: position?.top || 'unset',
            left: position?.left || '20%',
            right: position?.right || 'unset',
            bottom: position?.bottom || '10%',
            width: dimension?.width || '60%',
            height: dimension?.height || '30%',
          }}
        >
          {children}
        </Box>
      ) : (
        <div
          className="p-[5px] absolute border-2 border-gray-600 rounded-lg"
          style={{
            top: position?.top || 'unset',
            left: position?.left || '20%',
            right: position?.right || 'unset',
            bottom: position?.bottom || '10%',
            width: dimension?.width || '60%',
            height: dimension?.height || '30%',
          }}
        >
          <div className="p-[1.5%] bg-grad bg-gradient-from-center flex flex-col w-full h-full bg-white rounded-lg">
            {children}
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default DialogueBox
