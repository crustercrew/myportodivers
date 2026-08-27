import type { ReactNode } from 'react'
import { Animator, Text } from '@arwes/react'

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
 * Renders a bold tracking-widest title with Arwes decipher text animation.
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
        <Animator key={title}>
          <Text
            as="h2"
            manager="decipher"
            className="text-lg font-headline-lg text-white font-bold tracking-widest block"
          >
            {title}
          </Text>
        </Animator>
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

