import type { ReactNode } from 'react'

interface SectionHeaderProps {
  /** Main heading text. */
  title: string
  /** Smaller text rendered below or beside the title. */
  subtitle?: string
  /** Material Symbols icon name shown on the right side. */
  icon?: string
  /** Arbitrary content rendered on the right side (takes precedence over `icon`). */
  rightContent?: ReactNode
  className?: string
}

/**
 * A tactical-style section header used across panels.
 * Renders a bold tracking-widest title with optional subtitle and right-side content.
 */
export default function SectionHeader({
  title,
  subtitle,
  icon,
  rightContent,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <div>
        <h2 className="text-lg font-headline-lg text-white font-bold tracking-widest">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[10px] text-primary/70">{subtitle}</p>
        )}
      </div>
      {rightContent
        ? rightContent
        : icon
          ? <span className="material-symbols-outlined text-sm text-primary">{icon}</span>
          : null}
    </div>
  )
}
