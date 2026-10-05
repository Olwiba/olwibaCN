/**
 * A brand theme from a single colour.
 *
 * A theme needs the brand in two schemes, and a person picking a custom colour
 * picks one. Light mode uses it exactly as chosen. Dark mode keeps its hue and
 * lifts its lightness (in OKLCH, so the lift looks even across hues) until it
 * reads on a dark page, trimming chroma back inside sRGB where the lift would
 * push it out. Each scheme's foreground is black or white, whichever contrasts
 * more with that scheme's brand colour.
 */

export interface BrandColorTokens {
  light: { primary: string; foreground: string }
  dark: { primary: string; foreground: string }
}

/** Lightness a dark-mode brand colour is lifted to, at least. */
const DARK_MIN_LIGHTNESS = 0.72

const NEAR_WHITE = "oklch(0.985 0 0)"
const NEAR_BLACK = "oklch(0.145 0 0)"

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

function hexToLinearRgb(hex: string): [number, number, number] {
  const n = Number.parseInt(hex.replace(/^#/, ""), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((channel) => {
    const x = channel / 255
    return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
  }) as [number, number, number]
}

function linearRgbToOklch([r, g, b]: [number, number, number]) {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  const h = (Math.atan2(bb, a) * 180) / Math.PI
  return { l: L, c: Math.hypot(a, bb), h: h < 0 ? h + 360 : h }
}

function oklchToLinearRgb(l: number, c: number, h: number): [number, number, number] {
  const hr = (h * Math.PI) / 180
  const a = c * Math.cos(hr)
  const b = c * Math.sin(hr)
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ]
}

const inGamut = (rgb: [number, number, number]) => rgb.every((x) => x >= -0.0005 && x <= 1.0005)

function relativeLuminance([r, g, b]: [number, number, number]) {
  return 0.2126 * clamp(r) + 0.7152 * clamp(g) + 0.0722 * clamp(b)
}

/**
 * Black or white text on a colour.
 *
 * Not WCAG 2's contrast ratio, which flips to black at a luminance of about
 * 0.18 and so puts black text on blue-500, violet-500 and orange-500: legible
 * by the formula, wrong to the eye. Perceptual contrast (APCA) keeps white on
 * those well past that point; switching at 0.4 follows it, giving white on
 * blue, emerald and orange, and black on lime, amber and yellow.
 */
function foregroundFor(linearRgb: [number, number, number]) {
  return relativeLuminance(linearRgb) > 0.4 ? NEAR_BLACK : NEAR_WHITE
}

const round = (value: number, places: number) => Number(value.toFixed(places))

export function brandColorTokens(hex: string): BrandColorTokens {
  const light = hexToLinearRgb(hex)
  const { l, c, h } = linearRgbToOklch(light)

  const darkL = Math.max(l, DARK_MIN_LIGHTNESS)
  let darkC = c
  while (darkC > 0 && !inGamut(oklchToLinearRgb(darkL, darkC, h))) darkC -= 0.002
  darkC = Math.max(0, darkC)

  return {
    light: { primary: hex, foreground: foregroundFor(light) },
    dark: {
      primary: `oklch(${round(darkL, 3)} ${round(darkC, 3)} ${round(h, 3)})`,
      foreground: foregroundFor(oklchToLinearRgb(darkL, darkC, h)),
    },
  }
}

/** The stylesheet that sets `--primary`, its foreground and `--ring` from one colour. */
export function brandColorCss(hex: string): string {
  const { light, dark } = brandColorTokens(hex)
  return (
    `:root { --primary: ${light.primary}; --primary-foreground: ${light.foreground}; --ring: ${light.primary}; }\n` +
    `.dark { --primary: ${dark.primary}; --primary-foreground: ${dark.foreground}; --ring: ${dark.primary}; }`
  )
}
