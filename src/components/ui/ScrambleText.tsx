import { useScramble } from '../../hooks/useScramble'

interface ScrambleTextProps {
  /** The text to scramble-resolve to. */
  text: string
  /** Total animation duration in ms. Default: 800 */
  duration?: number
  /** Delay before starting in ms. Default: 0 */
  delay?: number
  /** Additional className forwarded to the wrapping span. */
  className?: string
  /** HTML tag to render. Default: 'span' */
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p'
}

/**
 * Drop-in text element that plays a terminal scramble/decrypt animation on mount.
 * Re-animates whenever `text` changes.
 *
 * Example:
 *   <ScrambleText text="Muhammad Fachreal Bernov" className="font-bold text-white" />
 */
export default function ScrambleText({
  text,
  duration = 800,
  delay = 0,
  className = '',
  as: Tag = 'span',
}: ScrambleTextProps) {
  const { output } = useScramble({ text, duration, delay })

  return <Tag className={className}>{output}</Tag>
}
