interface StatusIndicatorProps {
  /** Text displayed next to the dot. */
  label?: string
  /** Dot color class. Defaults to `'bg-success-neon'`. */
  colorClassName?: string
  /** Whether the dot pulses. Defaults to `true`. */
  blinking?: boolean
  className?: string
}

/**
 * A small blinking status dot with an optional text label.
 * Used for live-system indicators (e.g. "SYSTEM STATUS: ONLINE").
 */
export default function StatusIndicator({
  label,
  colorClassName = 'bg-success-neon',
  blinking = true,
  className = '',
}: StatusIndicatorProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div
        className={`h-2 w-2 rounded-full ${colorClassName} ${blinking ? 'blinking' : ''}`}
      />
      {label && (
        <span className="hidden sm:inline text-success-neon text-xs font-bold tracking-widest">
          {label}
        </span>
      )}
    </div>
  )
}
