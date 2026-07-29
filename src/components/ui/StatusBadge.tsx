import type { StatusColor } from '../../utils/types'

const variantStyles: Record<StatusColor, string> = {
  success: 'bg-success-neon text-black',
  primary: 'bg-primary text-black blinking',
}

interface StatusBadgeProps {
  label: string
  variant: StatusColor
  className?: string
}

/**
 * A small themed badge that shows a status label.
 * Supports `success` (solid green) and `primary` (yellow, blinking) variants.
 */
export default function StatusBadge({ label, variant, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`px-1.5 py-0.5 text-[8px] font-bold ${variantStyles[variant]} ${className}`}
    >
      {label}
    </span>
  )
}
