import useSound from 'use-sound'
import { useStateTemplater } from '../hooks/useStateTemplater'
import { Dimension, Position } from '../lib/elements'
import { getAnimationClass, renderMdToHtml } from './utils'

interface ClickableTextProps {
  text: string
  position?: Position
  dimension?: Dimension
  effect?: string //'none' | 'pulse' | 'bounce' | 'ping' | 'spin' | 'wiggle'
  onClick: () => void
}

const ClickableText = ({
  text,
  position = {},
  dimension = {},
  effect = 'none',
  onClick,
}: ClickableTextProps) => {
  const template = useStateTemplater()

  const positionDefined =
    position?.top || position?.left || position?.right || position?.bottom
  const [play] = useSound('/sounds/pop-down.mp3', { volume: 0.2 })
  return (
    <button
      className={
        `positioned text-xs sm:text-sm lg:text-base text-center absolute px-4 py-3  
        font-medium text-white border border-gray-300 
        rounded shadow cursor-pointer bg-gray-700
         hover:bg-gray-800 bg-opacity-80` + getAnimationClass(effect)
      }
      onClick={() => {
        play()
        onClick()
      }}
      style={{
        top: positionDefined ? position?.top || 'unset' : '50%',
        left: positionDefined ? position?.left || 'unset' : '50%',
        right: positionDefined ? position?.right || 'unset' : 'unset',
        bottom: positionDefined ? position?.bottom || 'unset' : 'unset',
        width: dimension?.width || 'auto',
        height: dimension?.height || 'auto',
        transform: positionDefined ? 'unset' : 'translate(-50%, -50%)',
      }}
      dangerouslySetInnerHTML={{ __html: template(renderMdToHtml(text)) }}
    />
  )
}

export default ClickableText
