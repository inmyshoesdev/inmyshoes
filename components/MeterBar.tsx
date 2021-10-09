import { Box } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'

export interface MeterBarProps {
  fullImage: string
  emptyImage: string
}

export default function MeterBar({ fullImage, emptyImage }: MeterBarProps) {
  const [progress, setProgress] = useState(0)

  return (
    // <div className="w-[186px] h-[30px] relative">
    //   <div
    //     style={{
    //       width: '100%',
    //       height: '100%',
    //       overflow: 'clip',
    //       position: 'absolute',
    //     }}
    //   >
    //     <img
    //       src="/images/empty-bar.png"
    //       className="object-none object-left"
    //       style={{ height: '100%' }}
    //     />
    //   </div>
    //   <div
    //     style={{
    //       width: '10%',
    //       height: '100%',
    //       overflow: 'clip',
    //       position: 'absolute',
    //     }}
    //   >
    //     <img
    //       src="/images/full-bar.png"
    //       className="object-none object-left"
    //       style={{ height: '100%' }}
    //     />
    //   </div>
    // </div>
    <div className="relative">
      <div
        style={{
          width: 'max-content',
          height: 'max-content',
        }}
      >
        <img
          src={emptyImage}
          className="object-none object-left"
          // style={{ height: '100%' }}
        />
      </div>
      <div
        className="absolute left-0 top-0"
        style={{
          width: '10%',
          height: '100%',
          overflow: 'clip',
        }}
      >
        <img
          src={fullImage}
          className="object-none object-left"
          style={{ height: '100%' }}
        />
      </div>
    </div>
  )
}
