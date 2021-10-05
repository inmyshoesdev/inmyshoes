import { useEffect, useState } from 'react'

export default function Meter({
  name,
  hasBar = false,
  children,
}: {
  name: string
  hasBar?: boolean
  children?: JSX.Element | JSX.Element[]
}) {
  interface Meter {
    [index: string]: string | number
  }
  const meter: Meter = {
    date: 'Monday',
    health: 50,
    social: 45,
    wealth: 100,
  }
  const [barBg, setBarBg] = useState('bg-green-600')
  useEffect(() => {
    const meter: Meter = {
      date: 'Monday',
      health: 50,
      social: 45,
      wealth: 100,
    }
    if (meter[name] >= 50) {
      setBarBg('bg-green-600')
    } else if (meter[name] >= 11) {
      setBarBg('bg-yellow-400')
    } else {
      setBarBg('bg-red-600')
    }
  }, [name])
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-sm capitalize">{name}</p>
      <div className="flex items-center">
        {children}
        {hasBar ? (
          <>
            <div className="mr-2 w-4 h-6 bg-gray-300 rounded-md sm:w-24">
              <div
                className={`${barBg} h-6 rounded-lg`}
                style={{ width: `${meter[name] > 100 ? '100' : meter[name]}%` }}
              ></div>
            </div>
            <p>{meter[name]}</p>
          </>
        ) : (
          <div
            className={`${
              name === 'wealth' && meter[name] < 0 ? 'text-red-600' : ''
            }`}
          >
            {meter[name]}
          </div>
        )}
      </div>
    </div>
  )
}
