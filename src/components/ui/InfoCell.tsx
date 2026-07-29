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
    <div className={`border border-primary/20 p-1 bg-surface-container ${className}`}>
      <p className="text-[8px] text-primary/50 uppercase">{label}</p>
      <p className={`text-[10px] ${valueClassName}`}>{value}</p>
    </div>
  )
}
