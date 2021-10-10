import { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { Transition } from '@headlessui/react'
import { useAfterInteractionCallback } from '../hooks/useAfterInteractionCallback'
import { useStateTemplater } from '../hooks/useStateTemplater'
import { Narration as NarrationProps } from '../lib/elements'
import { renderMdToHtml } from './utils'

import DialogueBox from './DialogueBox'
import Typewriter from 'typewriter-effect'

const Narration: React.FC<NarrationProps> = ({
  shown,
  position,
  dimension,
  texts,
  afterInteractionCallback,
}) => {
  const afterAction = useAfterInteractionCallback(afterInteractionCallback)
  const template = useStateTemplater()

  const [textIdx, setTextIdx] = useState(-1)
  const [skipTyping, setSkipTyping] = useState<boolean>(false)

  useEffect(() => {
    if (shown && texts.length > 0) setTextIdx(0)
  }, [shown, texts])

  function prevText() {
    if (textIdx < texts.length) {
      setSkipTyping(false)
      setTextIdx(textIdx - 1)
    }
  }

  const nextText = useCallback(() => {
    if (textIdx < texts.length) {
      setSkipTyping(false)
      setTextIdx(textIdx + 1)
    }

    // if speech is the last one, also run the after interaction action
    if (textIdx + 1 >= texts.length) {
      afterAction()
    }
  }, [afterAction, textIdx, texts.length])

  const onNarrationBoxClicked = useCallback(() => {
    if (!skipTyping) {
      setSkipTyping(true)
      return
    }

    setSkipTyping(false)
    nextText()
  }, [skipTyping, nextText])

  function stopPropagation(
    callback: () => void
  ): MouseEventHandler<HTMLButtonElement> {
    return (e) => {
      e.stopPropagation()
      callback()
    }
  }

  const NarrationBox: React.FC = () => {
    if (textIdx >= texts.length) {
      return null
    }

    const prevEnabled = textIdx > 0
    const nextEnabled = true

    return (
      <DialogueBox
        image={''} // could replace this with an image eventually
        position={position}
        dimension={dimension}
        onClick={onNarrationBoxClicked}
      >
        <div
          className="h-4/5 text-2xs overflow-y-auto sm:text-sm md:text-sm lg:text-base"
          style={{
            fontStyle: 'italic',
          }}
        >
          <div className="scrollbar-thin scrollbar-thumb-gray-500 scrollbar-thumb-rounded scrollbar-track-gray-100 flex flex-col-reverse pr-3 max-h-full overflow-y-auto">
            {skipTyping ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: template(renderMdToHtml(texts[textIdx])),
                }}
              />
            ) : (
              <Typewriter
                key={texts[textIdx]}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(template(renderMdToHtml(texts[textIdx])))
                    .callFunction(() => setSkipTyping(true))
                    .start()
                }}
                options={{
                  cursor: '',
                  delay: 25, // speed adjustment
                }}
              />
            )}
          </div>
        </div>
        <div className="lg:text-[18px] flex justify-between -mb-1 text-blue-400 text-xs sm:text-sm md:text-base">
          <button
            onClick={stopPropagation(prevText)}
            className={`px-2 py-1 rounded ${
              prevEnabled ? 'cursor-pointer hover:bg-blue-50' : 'text-blue-200'
            }`}
            disabled={!prevEnabled}
          >
            Prev
          </button>
          <button
            onClick={stopPropagation(nextText)}
            className={`px-2 py-1 rounded ${
              nextEnabled ? 'cursor-pointer hover:bg-blue-50' : 'text-blue-200'
            }`}
            disabled={!nextEnabled}
          >
            Next
          </button>
        </div>
      </DialogueBox>
    )
  }

  return (
    <Transition
      show={shown}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      className="absolute top-0 flex items-center justify-evenly w-full h-full"
    >
      <NarrationBox />
    </Transition>
  )
}

export default Narration
