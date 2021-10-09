import { Component, Meter } from '../lib/component'
import { COMPONENT_TYPE } from '../schema/component'
import MeterBar from './MeterBar'

export interface HeaderProps {
  header?: Component[]
}

export default function Header({ header = [] }: HeaderProps) {
  return (
    <div
      id="header"
      className="flex items-center justify-around w-2/3 text-center"
    >
      {header.map((component) => {
        switch (component.component) {
          case COMPONENT_TYPE.METER:
            const meter = component as Meter
            return <MeterBar {...meter} max={20} />
        }
      })}
    </div>
  )
}
