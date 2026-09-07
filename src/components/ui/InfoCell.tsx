import ScrambleText from './ScrambleText'

interface InfoCellProps {
  /** Upper label text. */
  label: string
  /** Lower value text. */
  value: string
  /** Optional class applied to the value text (e.g. for color overrides). */
  valueClassName?: string
  className?: string
  /** If true, the value text plays a scramble/decrypt animation on mount. */
  scramble?: boolean
  /** Delay in ms before the scramble starts. Default: 0 */
  delay?: number
}

/**
 * A compact bordered cell that displays a label above a value.
 * Used for key-value displays like security clearance, bio-status, etc.
 */
export default function InfoCell({
  label,
  value,
  valueClassName = 'text-primary',
  className = '',
  scramble = false,
  delay = 0,
}: InfoCellProps) {
  return (
    <div className={`border border-primary/25 p-1.5 bg-surface-container/70 ${className}`}>
      <p className="text-[9px] text-primary/80 uppercase font-headline font-medium tracking-wider">{label}</p>
      {scramble ? (
        <ScrambleText
          text={value}
          duration={700}
          delay={delay}
          className={`text-xs font-headline font-bold tracking-wide ${valueClassName}`}
        />
      ) : (
        <p className={`text-xs font-headline font-bold tracking-wide ${valueClassName}`}>{value}</p>
      )}
    </div>
  )
}
