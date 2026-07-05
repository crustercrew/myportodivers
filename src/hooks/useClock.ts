import { useEffect, useState } from 'react'
import { formatTime } from '../utils/time'

/** Returns the current time as an HH:MM:SS string, updating every second. */
export function useClock(): string {
  const [time, setTime] = useState<string>(() => formatTime(new Date()))

  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime(new Date())), 1000)
    return () => clearInterval(interval)
  }, [])

  return time
}
