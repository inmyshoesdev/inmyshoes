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
      className="flex items-center justify-around w-2/3 h-16 text-center"
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
