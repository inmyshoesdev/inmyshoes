import { Position, Dimension } from '../lib/elements'
import DialogueBox, { DialogBoxType } from './DialogueBox'
import { DialogType } from '../schema/elements'

export interface SpeechProps {
  text: string
  character: string
  characterImage: string
  isMainCharacter: boolean
  type?: DialogType
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
  type,
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
        className="sm:text-[12px] md:text-[16px] lg:text-[20px] h-full text-xs font-bold leading-none"
        style={{
          fontStyle: type === DialogType.THOUGHT ? 'italic' : 'normal',
        }}
      >
        {character}
      </p>
    </div>
  )

  const boxType = () => {
    switch (type) {
      case DialogType.SPEECH:
        return DialogBoxType.SPEECH
      case DialogType.THOUGHT:
        return DialogBoxType.THOUGHT
      default:
        return undefined
    }
  }

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
          fontStyle: type === DialogType.THOUGHT ? 'italic' : 'normal',
        }}
        bodyText={text}
        gotoNext={onNext}
        gotoPrev={onPrev}
        prevEnabled={prevEnabled}
        nextEnabled={nextEnabled}
        showNavigations={showNavigations}
        type={
          type === DialogType.THOUGHT
            ? DialogBoxType.THOUGHT
            : DialogBoxType.SPEECH
        }
      />
    </>
  )
}

export default Speech
