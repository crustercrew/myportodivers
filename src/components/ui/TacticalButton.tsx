interface TacticalButtonProps {
  /** Button label text. */
  label: string
  /** Material Symbols icon name. */
  icon?: string
  /** Visual variant. Defaults to `'outline'`. */
  variant?: 'outline' | 'filled'
  onClick?: () => void
  className?: string
}

const variantStyles: Record<'outline' | 'filled', string> = {
  outline:
    'border border-primary/50 text-primary hover:bg-primary hover:text-black transition-all cursor-pointer',
  filled: 'bg-primary text-black cursor-pointer',
}

/**
 * A tactical-themed button with optional icon and two variants.
 * - `outline`: bordered, fills on hover.
 * - `filled`: solid primary background.
 */
export default function TacticalButton({
  label,
  icon,
  variant = 'outline',
  onClick,
  className = '',
}: TacticalButtonProps) {
  return (
    <button
      className={`py-2 text-[10px] font-bold flex items-center justify-center gap-2 ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {icon && (
        <span className="material-symbols-outlined text-sm">{icon}</span>
      )}
      {label}
    </button>
  )
}
