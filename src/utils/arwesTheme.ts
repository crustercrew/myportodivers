import { createThemeColor, createThemeMultiplier } from '@arwes/react'

/**
 * Shared Arwes theme tokens.
 *
 * The `createAppTheme` / `createAppStylesBaseline` helpers don't exist in
 * the current Arwes @next release, so we build the color/spacing primitives
 * ourselves with the low-level theme factories.
 *
 * Usage:  import { arwesColors, space } from '../utils/arwesTheme'
 *         arwesColors.primary(4)   →  "hsl(180, 75%, 40%)"
 *         space(2)                 →  16  (8 * 2)
 */

/* ── colour palettes ──────────────────────────────────────────────── */

export const arwesColors = {
  /** Cyan / teal — main UI accent */
  primary: createThemeColor((i) => [180, 75, 10 + i * 10]),
  /** Green — success / online indicators */
  success: createThemeColor((i) => [120, 80, 10 + i * 10]),
  /** Red-orange — warnings / alerts */
  error: createThemeColor((i) => [10, 90, 10 + i * 10]),
  /** Neutral — text, backgrounds */
  neutral: createThemeColor((i) => [180, 5, 2 + i * 8]),
}

/* ── spacing scale (base = 8 px) ─────────────────────────────────── */

export const space = createThemeMultiplier((i) => i * 8)
