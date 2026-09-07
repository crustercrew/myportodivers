import { useEffect, useRef, useState } from 'react'

// Characters to randomize through during the scramble
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_-=+<>[]{}|'

interface UseScrambleOptions {
  /** The final text to resolve to. */
  text: string
  /** Duration of the full scramble animation in ms. Default: 800 */
  duration?: number
  /** How many ms to wait before starting. Default: 0 */
  delay?: number
  /** If true, re-scrambles every time `text` changes. Default: true */
  playOnChange?: boolean
}

/**
 * A hook that animates a string by cycling through random characters
 * before resolving to the target text — like a terminal decryption effect.
 *
 * Usage:
 *   const { output } = useScramble({ text: 'HELLO' })
 *   return <span>{output}</span>
 */
export function useScramble({
  text,
  duration = 800,
  delay = 0,
  playOnChange = true,
}: UseScrambleOptions) {
  const [output, setOutput] = useState(text)
  const frameRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scramble = () => {
    // Cancel any in-progress animation
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    startRef.current = null

    const tick = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)

      // How many chars from the left are already "resolved"
      const resolvedCount = Math.floor(progress * text.length)

      const scrambled = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ' // preserve spaces
          if (i < resolvedCount) return char // resolved chars stay fixed
          // Unresolved chars cycle through random characters
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      setOutput(scrambled)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setOutput(text) // Ensure perfect final output
      }
    }

    frameRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    // Clear existing timers on re-render
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current)
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)

    delayTimerRef.current = setTimeout(scramble, delay)

    return () => {
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, playOnChange ? [text, duration, delay] : [])

  return { output, replay: scramble }
}
