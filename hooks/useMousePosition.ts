import { useState, useEffect } from 'react'

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const setFromEvent = (e: MouseEvent) =>
    setPosition({ x: e.clientX, y: e.clientY })
  useEffect(() => {
    window.addEventListener('mousemove', setFromEvent)
    return () => {
      window.removeEventListener('mousemove', setFromEvent)
    }
  }, [])
  return position
}
