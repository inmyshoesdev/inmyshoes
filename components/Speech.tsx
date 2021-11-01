import { Position, Dimension } from '../lib/elements'
import DialogueBox from './DialogueBox'

export interface SpeechProps {
  text: string
  character: string
  characterImage: string
  isMainCharacter: boolean
  type?: string
  textBoxImage?: string
  characterPosition?: Position
  characterDimension?: Dimension
  textPosition?: Position
  textDimension?: Dimension
  prevEnabled?: boolean
  nextEnabled?: boolean
  onNext?: () => void
  onPrev?: () => void
  showNavigations?: boolean
}

const Speech: React.FC<SpeechProps> = ({
  text,
  character,
  characterImage,
  isMainCharacter = false,
  type = '',
  textBoxImage,
  characterPosition,
  characterDimension,
  textPosition,
  textDimension,
  prevEnabled,
  nextEnabled,
  onNext,
  onPrev,
  showNavigations,
}) => {
  const header = (
    <div className="h-1/5">
      <p
        className="h-full text-xs font-bold leading-none md:text-base lg:text-xl"
        style={{
          fontStyle: type === 'monologue' ? 'italic' : 'normal',
        }}
      >
        {character}
      </p>
    </div>
  )

  return (
    <>
      <div
        className="absolute"
        style={{
          top: characterPosition ? characterPosition.top : 'unset',
          left: characterPosition ? characterPosition.left : '5%',
          right: characterPosition ? characterPosition.right : 'unset',
          bottom: characterPosition ? characterPosition.bottom : '5%',
          height: characterDimension?.height || '70%',
          width: characterDimension?.width || '15%',
        }}
      >
        {!isMainCharacter && (
          <img
            src={characterImage}
            alt={character}
            className="m-auto h-full object-contain"
          />
        )}
      </div>
      <div
        className="absolute"
        style={{
          top: characterPosition ? characterPosition.top : 'unset',
          left: characterPosition ? characterPosition.left : 'unset',
          right: characterPosition ? characterPosition.right : '5%',
          bottom: characterPosition ? characterPosition.bottom : '5%',
          height: characterDimension?.height || '70%',
          width: characterDimension?.width || '15%',
        }}
      >
        {isMainCharacter && (
          <img
            src={characterImage}
            alt={character}
            className="m-auto h-full object-contain"
          />
        )}
      </div>
      <DialogueBox
        image={textBoxImage}
        position={textPosition}
        dimension={textDimension}
        header={header}
        bodyStyle={{
          fontStyle: type === 'monologue' ? 'italic' : 'normal',
        }}
        bodyText={text}
        gotoNext={onNext}
        gotoPrev={onPrev}
        prevEnabled={prevEnabled}
        nextEnabled={nextEnabled}
        showNavigations={showNavigations}
      />
    </>
  )
}

export default Speech
