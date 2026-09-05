interface InfoCellProps {
  /** Upper label text. */
  label: string
  /** Lower value text. */
  value: string
  /** Optional class applied to the value text (e.g. for color overrides). */
  valueClassName?: string
  className?: string
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
}: InfoCellProps) {
  return (
    <div className={`border border-primary/25 p-1.5 bg-surface-container/70 ${className}`}>
      <p className="text-[9px] text-primary/80 uppercase font-headline font-medium tracking-wider">{label}</p>
      <p className={`text-xs font-headline font-bold tracking-wide ${valueClassName}`}>{value}</p>
    </div>
  )
}
