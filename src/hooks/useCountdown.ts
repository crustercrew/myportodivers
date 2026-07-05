import { useEffect, useState } from 'react'

/** Returns a T-minus countdown string (HH:MM:SS) showing time remaining until midnight. */
export function useCountdown(): string {
  const getRemainder = () => {
    const now = new Date()
    const midnight = new Date(now)
    midnight.setHours(24, 0, 0, 0)
    const diff = midnight.getTime() - now.getTime()

    const hours = Math.floor(diff / 3_600_000)
    const minutes = Math.floor((diff % 3_600_000) / 60_000)
    const seconds = Math.floor((diff % 60_000) / 1_000)

    return [hours, minutes, seconds]
      .map((n) => String(n).padStart(2, '0'))
      .join(':')
  }

  const [remaining, setRemaining] = useState<string>(getRemainder)

  useEffect(() => {
    const interval = setInterval(() => setRemaining(getRemainder()), 1000)
    return () => clearInterval(interval)
  }, [])

  return remaining
}
