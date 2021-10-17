import {
  StateComponent,
  StateDisplay as _StateDisplay,
  StateMeter as _StateMeter,
} from '../lib/component'
import { COMPONENT_TYPE } from '../schema/component'
import StateMeter from './StateMeter'
import StateDisplay from './StateDisplay'
import useLocalStorage from '../hooks/useLocalStorage'
import { Fragment, useState } from 'react'

export interface HeaderProps {
  header?: StateComponent[]
}

export default function Header({ header = [] }: HeaderProps) {
  const [storedScreenWidth, setStoredScreenWidth] = useLocalStorage(
    'ims-screenWidth',
    72
  )
  return (
    <div
      id="header"
      className="flex flex-wrap items-stretch justify-around w-2/3 max-h-16 text-center"
      style={{
        height: `${((9 / 16) * storedScreenWidth) / 2}vh`,
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
