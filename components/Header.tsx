import {
  StateComponent,
  StateDisplay as _StateDisplay,
  StateMeter as _StateMeter,
} from '../lib/component'
import { COMPONENT_TYPE } from '../schema/component'
import StateMeter from './StateMeter'
import StateDisplay from './StateDisplay'

export interface HeaderProps {
  header?: StateComponent[]
}

export default function Header({ header = [] }: HeaderProps) {
  return (
    <div
      id="header"
      className="flex items-stretch justify-between pr-7 px-1 w-full h-full text-center md:justify-around"
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
