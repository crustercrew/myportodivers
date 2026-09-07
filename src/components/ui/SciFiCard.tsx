import { type ReactNode } from 'react'

interface SciFiCardProps {
  children: ReactNode
  className?: string
}

/**
 * SciFiCard
 * Clean, stationary sci-fi border framing directly modeled from HUD reference:
 * - Stepped top-left corner bracket
 * - Dual-tone top-right corner reticle (accent gold + primary yellow)
 * - Subtle bottom corner ticks
 * - Crisp static borders (no jumping/busy hover animations)
 */
export default function SciFiCard({
  children,
  className = '',
}: SciFiCardProps) {
  return (
    <div
      className={`relative border border-primary/30 bg-surface-container/50 hover:border-primary/60 transition-colors duration-200 flex flex-col justify-between p-4 ${className}`}
    >
      {/* ── Top-Left Stepped Outer Bracket (matching reference) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-primary/80"
      />

      {/* ── Top-Right Dual-Tone Reticle (Gold inner + Primary outer from reference) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-primary/80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-amber-400/90"
      />

      {/* ── Bottom-Left Accent ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-primary/40"
      />

      {/* ── Bottom-Right Accent ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-primary/40"
      />

      {children}
    </div>
  )
}
