interface RadarBackgroundProps {
  /** Diameters (in px) for the concentric rings. Defaults to [500, 350, 200]. */
  ringSizes?: number[]
  className?: string
}

/**
 * Purely decorative, absolutely-positioned radar rings.
 * Place inside a `position: relative` container so the rings and
 * radial-gradient overlay align correctly.
 */
export default function RadarBackground({
  ringSizes = [500, 350, 200],
  className = '',
}: RadarBackgroundProps) {
  // Build nested rings from outermost inward
  const rings = ringSizes.reduce<React.ReactNode>(
    (inner, size) => (
      <div
        className="border border-primary/20 rounded-full flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {inner}
      </div>
    ),
    // Innermost element: the radar sweep
    <div className="radar-sweep" />,
  )

  return (
    <>
      <div
        className={`absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center overflow-hidden ${className}`}
      >
        {rings}
      </div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, transparent 30%, #0B0C10 100%)',
        }}
      />
    </>
  )
}
