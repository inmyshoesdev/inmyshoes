import Dialogue from '../components/Dialogue'
import { DialogueScema } from '../schema/elements'
import { MainCharacterSchema, NPCSchema } from '../schema/characters'

enum ACTION {
  SHOW_DIALOGUE = 'showDialogue',
}

type ActionPayload = {
  value: string
  duration?: number
  onClick?: () => void
}

export function useAction(action: string, payload: ActionPayload) {
  switch (action) {
    case ACTION.SHOW_DIALOGUE:
      return showDialogue(payload)
    default:
      break
  }
}

// TODO: maybe dialogues and chanracters can be in the state and function reads from state
function showDialogue({ value, duration, onClick }: ActionPayload) {
  const dialogue = testDialogues.find((d) => d.name === value)
  const character = [mainCharacter, ...npcs].find(
    (c) => c.name === dialogue?.character
  )

  if (!dialogue)
    return <p className="text-red-600 text-lg">Error: No dialogue found</p>
  else if (!character) {
    return <p className="text-red-600 text-lg">Error: No character found</p>
  } else {
    return (
      <Dialogue dialogue={dialogue} character={character} onClick={onClick} />
    )
  }
}

const testDialogues: DialogueScema[] = [
  {
    name: 'julie_intro',
    character: 'Julie',
    text: 'Hello',
  },
  {
    name: 'jason_intro',
    character: 'Jason',
    text: 'Hey!',
  },
]

const mainCharacter: MainCharacterSchema = {
  name: 'Julie',
  images: {
    default: '/images/Julie.svg',
  },
  info: '',
}

const npcs: NPCSchema[] = [
  {
    name: 'Jason',
    images: {
      default: '/images/Jason.svg',
    },
  },
]
