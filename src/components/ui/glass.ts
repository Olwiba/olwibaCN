/**
 * Central glassmorphism recipe for mode="glass".
 *
 * Distilled from glasscn-ui (translucent bg + backdrop-blur + hairline
 * border, dark-mode opacity drop) and Apple-style glass kits (backdrop
 * saturation for the color pop, white-alpha borders, deep soft shadow).
 * Unlike those kits we stay on theme tokens (background/popover) so glass
 * follows every theme and brand color instead of hardcoded white/gray.
 *
 * One recipe per surface class — components pick the constant matching
 * their role instead of hand-rolling classes, so the glass look stays
 * consistent and tunable in one place.
 *
 * Notes:
 * - Glass needs content behind it to blur; over a flat page background it
 *   reads as a lower-contrast default. That's the consumer's call.
 * - Foreground text stays on solid tokens for contrast — only surfaces
 *   go translucent.
 * - Tiny controls (checkbox, radio, switch, kbd) stay no-op in glass:
 *   frosted chrome is illegible at 16px.
 */

/** Shared blur/saturation core. */
export const glassBlur = "backdrop-blur-xl backdrop-saturate-150"

/** Large containers: Card, Dialog, Sheet, Drawer. */
export const glassSurface =
  "border border-white/20 bg-background/60 backdrop-blur-xl backdrop-saturate-150 shadow-lg shadow-black/10 dark:border-white/10 dark:bg-background/40"

/** Floating panels: Popover, Tooltip, menus. Popover token, lighter blur. */
export const glassPanel =
  "border border-white/20 bg-popover/70 backdrop-blur-lg backdrop-saturate-150 shadow-lg shadow-black/10 dark:border-white/10 dark:bg-popover/50"

/** Interactive controls: Input, form fields. Light blur keeps text crisp. */
export const glassControl =
  "border border-white/25 bg-background/50 backdrop-blur-md backdrop-saturate-150 shadow-sm shadow-black/10 dark:border-white/10 dark:bg-background/30"
