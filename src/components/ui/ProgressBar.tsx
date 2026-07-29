import type { BarColor } from '../../utils/types'

// Also accept StatusColor values that map to BarColor equivalents
type ProgressBarColor = BarColor | 'success'

const colorMap: Record<ProgressBarColor, string> = {
  primary: 'bg-primary',
  'success-neon': 'bg-success-neon',
  success: 'bg-success-neon',
}

interface ProgressBarProps {
  /** Current value (0–100). */
  value: number
  /** Bar fill color. Defaults to `'primary'`. */
  barColor?: ProgressBarColor
  /** Show tick marks inside the bar. */
  showTicks?: boolean
  /** Optional label displayed to the left of the value. */
  label?: string
  /** Whether to show the percentage text to the right. */
  showValue?: boolean
  /** Background class for the track. Defaults to `'bg-surface-container'`. */
  trackClassName?: string
  className?: string
}

/**
 * A horizontal progress bar with optional label, value display, and tick marks.
 * Used for metrics, readiness gauges, and tech-stack power levels.
 */
export default function ProgressBar({
  value,
  barColor = 'primary',
  showTicks = false,
  label,
  showValue = false,
  trackClassName = 'bg-surface-container',
  className = '',
}: ProgressBarProps) {
  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex justify-between text-[8px] text-primary mb-1">
          {label && <span>{label}</span>}
          {showValue && <span>{value}%</span>}
        </div>
      )}
      <div className={`h-1 ${trackClassName} relative`}>
        <div
          className={`h-full ${colorMap[barColor]}`}
          style={{ width: `${value}%` }}
        />
        {showTicks && (
          <div className="absolute inset-0 flex justify-between px-2">
            <div className="w-px h-full bg-white/10" />
            <div className="w-px h-full bg-white/10" />
            <div className="w-px h-full bg-white/10" />
          </div>
        )}
      </div>
    </div>
  )
}
