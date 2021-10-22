import {
  StateComponent,
  StateDisplay as _StateDisplay,
  StateMeter as _StateMeter,
} from '../lib/component'
import { COMPONENT_TYPE } from '../schema/component'
import StateMeter from './StateMeter'
import StateDisplay from './StateDisplay'
import useLocalStorage from '../hooks/useLocalStorage'

export interface HeaderProps {
  header?: StateComponent[]
  screenWidth: number
}

export default function Header({ header = [], screenWidth }: HeaderProps) {
  return (
    <div
      id="header"
      className="flex flex-wrap items-stretch justify-between max-h-16 text-center md:justify-around md:px-2"
      style={{
        width: `${screenWidth}vw`,
        height: `${((9 / 16) * screenWidth) / 2}vh`,
      }}
    >
      {header.map((component) => {
        switch (component.component) {
          case COMPONENT_TYPE.METER:
            const meter = component as _StateMeter
            return <StateMeter {...meter} key={component.title} />
          case COMPONENT_TYPE.DISPLAY:
            const display = component as _StateDisplay
            return <StateDisplay {...display} key={component.title} />
        }
      })}
    </div>
  )
}
