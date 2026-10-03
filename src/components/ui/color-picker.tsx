"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useUIVariant } from "./ui-variant-context"
import { Input } from "./input"

/**
 * A colour picker: a saturation/brightness field, a hue strip, a hex field and
 * optional preset swatches.
 *
 * The value is a hex string, which is what forms, tokens and emails want, but
 * the picker works in HSV underneath. Hex alone forgets the hue the moment a
 * colour reaches grey or black, so dragging the field into a corner and back
 * out would snap the hue to red. The HSV state is only replaced when the value
 * changes from outside, never by the picker's own edits.
 *
 * Works controlled (`value` + `onValueChange`) or uncontrolled
 * (`defaultValue`). Both thumbs are sliders: arrow keys move them by 1%, or by
 * 10% with Shift; the hue strip also takes Home and End.
 *
 * `variant="grid"` swaps the field and hue strip for Tailwind's palette: a
 * column per colour family, a row per step from 50 to 950, so moving up or
 * down a column is a consistent run of tints and shades. The dot snaps from
 * cell to cell under the pointer or the arrow keys.
 */

export interface ColorPickerProps
  extends Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> {
  /** Hex colour, `#rrggbb` or `#rgb`. */
  value?: string
  /** @default "#10b981" */
  defaultValue?: string
  /** Called with a lowercase `#rrggbb` on every change. */
  onValueChange?: (hex: string) => void
  /** Hex colours offered as one-click swatches under the picker. */
  presets?: string[]
  /** `spectrum` picks any colour; `grid` picks from an evenly stepped palette. @default "spectrum" */
  variant?: "spectrum" | "grid"
  disabled?: boolean
  mode?: "playful" | "smooth" | "glass"
}

type Hsv = { h: number; s: number; v: number }

/** `#rgb`, `#rrggbb`, with or without the hash, to a lowercase `#rrggbb`; null if invalid. */
export function parseHexColor(input: string): string | null {
  const raw = input.trim().replace(/^#/, "").toLowerCase()
  if (/^[0-9a-f]{3}$/.test(raw)) {
    return `#${raw[0]}${raw[0]}${raw[1]}${raw[1]}${raw[2]}${raw[2]}`
  }
  return /^[0-9a-f]{6}$/.test(raw) ? `#${raw}` : null
}

function hexToHsv(hex: string): Hsv {
  const n = Number.parseInt(hex.slice(1), 16)
  const r = ((n >> 16) & 255) / 255
  const g = ((n >> 8) & 255) / 255
  const b = (n & 255) / 255
  const max = Math.max(r, g, b)
  const delta = max - Math.min(r, g, b)
  let h = 0
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6
    else if (max === g) h = (b - r) / delta + 2
    else h = (r - g) / delta + 4
    h *= 60
    if (h < 0) h += 360
  }
  return { h, s: max === 0 ? 0 : delta / max, v: max }
}

function hsvToHex({ h, s, v }: Hsv): string {
  const f = (n: number) => {
    const k = (n + h / 60) % 6
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1))
  }
  return `#${[f(5), f(3), f(1)]
    .map((channel) => Math.round(channel * 255).toString(16).padStart(2, "0"))
    .join("")}`
}

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

/**
 * Tailwind's colour palette, as the hex values it publishes: each family's
 * eleven steps from 50 to 950, so 500 sits in the middle with tints above it
 * and shades below. The grid variant lays these out as columns.
 *
 * Hand-tuned rather than computed. An evenly stepped OKLCH ramp is tidier on
 * paper, but next to the colours people already use (and pass as presets) it
 * reads as slightly off; these are the ones they recognise.
 */
export const tailwindPalette: Record<string, string[]> = {
  red: ["#fef2f2", "#fee2e2", "#fecaca", "#fca5a5", "#f87171", "#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d", "#450a0a"],
  orange: ["#fff7ed", "#ffedd5", "#fed7aa", "#fdba74", "#fb923c", "#f97316", "#ea580c", "#c2410c", "#9a3412", "#7c2d12", "#431407"],
  amber: ["#fffbeb", "#fef3c7", "#fde68a", "#fcd34d", "#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e", "#78350f", "#451a03"],
  yellow: ["#fefce8", "#fef9c3", "#fef08a", "#fde047", "#facc15", "#eab308", "#ca8a04", "#a16207", "#854d0e", "#713f12", "#422006"],
  lime: ["#f7fee7", "#ecfccb", "#d9f99d", "#bef264", "#a3e635", "#84cc16", "#65a30d", "#4d7c0f", "#3f6212", "#365314", "#1a2e05"],
  green: ["#f0fdf4", "#dcfce7", "#bbf7d0", "#86efac", "#4ade80", "#22c55e", "#16a34a", "#15803d", "#166534", "#14532d", "#052e16"],
  emerald: ["#ecfdf5", "#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#10b981", "#059669", "#047857", "#065f46", "#064e3b", "#022c22"],
  teal: ["#f0fdfa", "#ccfbf1", "#99f6e4", "#5eead4", "#2dd4bf", "#14b8a6", "#0d9488", "#0f766e", "#115e59", "#134e4a", "#042f2e"],
  cyan: ["#ecfeff", "#cffafe", "#a5f3fc", "#67e8f9", "#22d3ee", "#06b6d4", "#0891b2", "#0e7490", "#155e75", "#164e63", "#083344"],
  sky: ["#f0f9ff", "#e0f2fe", "#bae6fd", "#7dd3fc", "#38bdf8", "#0ea5e9", "#0284c7", "#0369a1", "#075985", "#0c4a6e", "#082f49"],
  blue: ["#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a", "#172554"],
  indigo: ["#eef2ff", "#e0e7ff", "#c7d2fe", "#a5b4fc", "#818cf8", "#6366f1", "#4f46e5", "#4338ca", "#3730a3", "#312e81", "#1e1b4b"],
  violet: ["#f5f3ff", "#ede9fe", "#ddd6fe", "#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95", "#2e1065"],
  purple: ["#faf5ff", "#f3e8ff", "#e9d5ff", "#d8b4fe", "#c084fc", "#a855f7", "#9333ea", "#7e22ce", "#6b21a8", "#581c87", "#3b0764"],
  fuchsia: ["#fdf4ff", "#fae8ff", "#f5d0fe", "#f0abfc", "#e879f9", "#d946ef", "#c026d3", "#a21caf", "#86198f", "#701a75", "#4a044e"],
  pink: ["#fdf2f8", "#fce7f3", "#fbcfe8", "#f9a8d4", "#f472b6", "#ec4899", "#db2777", "#be185d", "#9d174d", "#831843", "#500724"],
  rose: ["#fff1f2", "#ffe4e6", "#fecdd3", "#fda4af", "#fb7185", "#f43f5e", "#e11d48", "#be123c", "#9f1239", "#881337", "#4c0519"],
  zinc: ["#fafafa", "#f4f4f5", "#e4e4e7", "#d4d4d8", "#a1a1aa", "#71717a", "#52525b", "#3f3f46", "#27272a", "#18181b", "#09090b"],
}

const PALETTE_STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]
const PALETTE_FAMILIES = Object.keys(tailwindPalette)
const GRID_COLUMNS = PALETTE_FAMILIES.length

/** Rows of the grid: one per step, each holding every family's colour at that step. */
const COLOR_GRID: string[][] = PALETTE_STEPS.map((_, step) =>
  PALETTE_FAMILIES.map((family) => tailwindPalette[family][step])
)

function findGridCell(hex: string): { row: number; col: number } | null {
  for (let row = 0; row < COLOR_GRID.length; row++) {
    const col = COLOR_GRID[row].indexOf(hex)
    if (col !== -1) return { row, col }
  }
  return null
}

/** WCAG relative luminance, to pick a selection dot that shows up on the cell. */
function luminance(hex: string): number {
  const n = Number.parseInt(hex.slice(1), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const x = c / 255
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Fraction of an element's box at a pointer position, each axis clamped to 0-1. */
function pointerFraction(event: React.PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect()
  return {
    x: clamp((event.clientX - rect.left) / rect.width),
    y: clamp((event.clientY - rect.top) / rect.height),
  }
}

const HUE_GRADIENT =
  "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)"

const thumbClass =
  "absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgb(0_0_0/0.25),0_1px_3px_rgb(0_0_0/0.35)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const fieldRadius = {
  default: "rounded-md",
  playful: "rounded-xl",
  smooth: "rounded-lg",
  glass: "rounded-lg",
} as const

const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value,
      defaultValue = "#10b981",
      onValueChange,
      presets,
      variant = "spectrum",
      disabled = false,
      mode: modeProp,
      className,
      ...props
    },
    ref
  ) => {
    const contextMode = useUIVariant()
    const mode = modeProp ?? contextMode
    const radius = fieldRadius[mode ?? "default"]

    const controlled = value !== undefined
    const [uncontrolled, setUncontrolled] = React.useState(
      () => parseHexColor(defaultValue) ?? "#000000"
    )
    const hex = controlled ? (parseHexColor(value) ?? "#000000") : uncontrolled

    const [hsv, setHsv] = React.useState<Hsv>(() => hexToHsv(hex))
    // Resynced only when the value changes from outside: the picker's own
    // edits record the hex they produced, so they never trigger it.
    const [syncedHex, setSyncedHex] = React.useState(hex)
    if (hex !== syncedHex) {
      setSyncedHex(hex)
      setHsv(hexToHsv(hex))
    }

    const commit = (next: Hsv) => {
      const nextHex = hsvToHex(next)
      setHsv(next)
      setSyncedHex(nextHex)
      if (!controlled) setUncontrolled(nextHex)
      if (nextHex !== hex) onValueChange?.(nextHex)
    }

    const commitHex = (nextHex: string) => {
      setHsv(hexToHsv(nextHex))
      setSyncedHex(nextHex)
      if (!controlled) setUncontrolled(nextHex)
      if (nextHex !== hex) onValueChange?.(nextHex)
    }

    // The hex field shows the value unless someone is mid-edit; a draft that
    // is not a colour on blur is dropped rather than committed.
    const [draft, setDraft] = React.useState<string | null>(null)

    const areaThumb = React.useRef<HTMLDivElement>(null)
    const hueThumb = React.useRef<HTMLDivElement>(null)

    const onAreaPointer = (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return
      if (event.type === "pointerdown") {
        event.currentTarget.setPointerCapture(event.pointerId)
        areaThumb.current?.focus()
      } else if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
        return
      }
      const { x, y } = pointerFraction(event)
      commit({ h: hsv.h, s: x, v: 1 - y })
    }

    const onHuePointer = (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return
      if (event.type === "pointerdown") {
        event.currentTarget.setPointerCapture(event.pointerId)
        hueThumb.current?.focus()
      } else if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
        return
      }
      const { x } = pointerFraction(event)
      commit({ ...hsv, h: x * 360 })
    }

    const onAreaKey = (event: React.KeyboardEvent) => {
      const step = event.shiftKey ? 0.1 : 0.01
      const moves: Record<string, Partial<Hsv>> = {
        ArrowLeft: { s: clamp(hsv.s - step) },
        ArrowRight: { s: clamp(hsv.s + step) },
        ArrowUp: { v: clamp(hsv.v + step) },
        ArrowDown: { v: clamp(hsv.v - step) },
      }
      const move = moves[event.key]
      if (!move) return
      event.preventDefault()
      commit({ ...hsv, ...move })
    }

    const onHueKey = (event: React.KeyboardEvent) => {
      const step = event.shiftKey ? 36 : 3.6
      const next: Record<string, number> = {
        ArrowLeft: hsv.h - step,
        ArrowDown: hsv.h - step,
        ArrowRight: hsv.h + step,
        ArrowUp: hsv.h + step,
        Home: 0,
        End: 360,
      }
      if (!(event.key in next)) return
      event.preventDefault()
      commit({ ...hsv, h: clamp(next[event.key], 0, 360) })
    }

    const brightness = Math.round(hsv.v * 100)
    const saturation = Math.round(hsv.s * 100)

    const gridRef = React.useRef<HTMLDivElement>(null)
    const gridCell = variant === "grid" ? findGridCell(hex) : null
    // The cell that takes Tab: the selected one, or the first when the value
    // is not on the grid, so the palette is always one Tab away.
    const tabCell = gridCell ?? { row: 0, col: 0 }

    const pickCell = (row: number, col: number, focus: boolean) => {
      const r = clamp(row, 0, COLOR_GRID.length - 1)
      const c = clamp(col, 0, GRID_COLUMNS - 1)
      commitHex(COLOR_GRID[r][c])
      if (focus) {
        gridRef.current
          ?.querySelector<HTMLButtonElement>(`[data-cell="${r}-${c}"]`)
          ?.focus()
      }
    }

    // Pointer capture on the grid itself, so a drag slides the dot across
    // cells rather than selecting only the one pressed.
    const onGridPointer = (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return
      if (event.type === "pointerdown") {
        event.currentTarget.setPointerCapture(event.pointerId)
      } else if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
        return
      }
      const { x, y } = pointerFraction(event)
      pickCell(
        Math.min(Math.floor(y * COLOR_GRID.length), COLOR_GRID.length - 1),
        Math.min(Math.floor(x * GRID_COLUMNS), GRID_COLUMNS - 1),
        event.type === "pointerdown"
      )
    }

    const onGridKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const from = gridCell ?? tabCell
      const moves: Record<string, [number, number]> = {
        ArrowUp: [from.row - 1, from.col],
        ArrowDown: [from.row + 1, from.col],
        ArrowLeft: [from.row, from.col - 1],
        ArrowRight: [from.row, from.col + 1],
        Home: [from.row, 0],
        End: [from.row, GRID_COLUMNS - 1],
      }
      const move = moves[event.key]
      if (!move) return
      event.preventDefault()
      pickCell(move[0], move[1], true)
    }

    const spectrum = (
      <>
        <div
          className={cn(
            "relative h-40 w-full touch-none select-none",
            radius,
            disabled ? "cursor-not-allowed" : "cursor-crosshair"
          )}
          style={{
            backgroundColor: `hsl(${hsv.h} 100% 50%)`,
            backgroundImage:
              "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",
          }}
          onPointerDown={onAreaPointer}
          onPointerMove={onAreaPointer}
        >
          <div
            ref={areaThumb}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-label="Saturation and brightness"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={saturation}
            aria-valuetext={`Saturation ${saturation}%, brightness ${brightness}%`}
            aria-disabled={disabled || undefined}
            onKeyDown={disabled ? undefined : onAreaKey}
            className={thumbClass}
            style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, backgroundColor: hex }}
          />
        </div>

        <div
          className={cn(
            "relative h-3 w-full touch-none select-none rounded-full",
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          )}
          style={{ backgroundImage: HUE_GRADIENT }}
          onPointerDown={onHuePointer}
          onPointerMove={onHuePointer}
        >
          <div
            ref={hueThumb}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-label="Hue"
            aria-valuemin={0}
            aria-valuemax={360}
            aria-valuenow={Math.round(hsv.h)}
            aria-valuetext={`Hue ${Math.round(hsv.h)} degrees`}
            aria-disabled={disabled || undefined}
            onKeyDown={disabled ? undefined : onHueKey}
            className={cn(thumbClass, "top-1/2")}
            style={{ left: `${(hsv.h / 360) * 100}%`, backgroundColor: `hsl(${hsv.h} 100% 50%)` }}
          />
        </div>
      </>
    )

    const grid = (
      <div
        ref={gridRef}
        role="radiogroup"
        aria-label="Colour shades"
        aria-disabled={disabled || undefined}
        // Not clipped: a hovered cell grows past its neighbours, and an edge
        // cell would be cut off by overflow-hidden. Cells round themselves.
        className={cn(
          "grid w-full touch-none select-none gap-0.5",
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        )}
        style={{ gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))` }}
        onPointerDown={onGridPointer}
        onPointerMove={onGridPointer}
        onKeyDown={disabled ? undefined : onGridKey}
      >
        {COLOR_GRID.map((rowColors, row) =>
          rowColors.map((cell, col) => {
            const selected = gridCell?.row === row && gridCell.col === col
            const tabbable = tabCell.row === row && tabCell.col === col
            return (
              <button
                key={cell + row + col}
                type="button"
                role="radio"
                data-cell={`${row}-${col}`}
                aria-checked={selected}
                aria-label={`${PALETTE_FAMILIES[col]}-${PALETTE_STEPS[row]}`}
                title={`${PALETTE_FAMILIES[col]}-${PALETTE_STEPS[row]} ${cell}`}
                tabIndex={disabled || !tabbable ? -1 : 0}
                disabled={disabled}
                // Hover lifts the cell in its own shade: it eases up in scale
                // and casts a soft shadow tinted with its colour, so moving
                // across the grid reads as one cell rising after another. The
                // hairline ring keeps the palest row visible on a light page.
                className={cn(
                  "relative flex aspect-square cursor-pointer items-center justify-center rounded-[3px] outline-none",
                  "transition-[transform,box-shadow] duration-200 ease-out",
                  "hover:z-10 hover:scale-[1.3] hover:shadow-[0_3px_10px_-1px_var(--cell)] hover:ring-1 hover:ring-black/10 dark:hover:ring-white/25",
                  "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring",
                  "disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none",
                  "motion-reduce:transition-none"
                )}
                style={{ backgroundColor: cell, "--cell": cell } as React.CSSProperties}
              >
                {selected ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-2 rounded-full ring-2",
                      // A dark dot on light cells, a white one on dark cells.
                      luminance(cell) > 0.4 ? "bg-black/80 ring-black/20" : "bg-white ring-white/30"
                    )}
                  />
                ) : null}
              </button>
            )
          })
        )}
      </div>
    )

    return (
      <div
        ref={ref}
        data-slot="color-picker"
        data-variant={variant}
        aria-disabled={disabled || undefined}
        className={cn("flex w-full flex-col gap-3", disabled && "opacity-50", className)}
        {...props}
      >
        {variant === "grid" ? grid : spectrum}

        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cn("size-9 shrink-0 border border-border", radius)}
            style={{ backgroundColor: hex }}
          />
          <Input
            aria-label="Hex colour"
            value={draft ?? hex}
            disabled={disabled}
            spellCheck={false}
            autoComplete="off"
            maxLength={7}
            className="font-mono uppercase"
            mode={mode}
            onChange={(event) => {
              const text = event.target.value
              setDraft(text)
              // A complete six-digit colour applies while typing; anything
              // shorter waits for blur, so "#12" is not read as "#112222".
              const parsed = text.replace(/^#/, "").length === 6 ? parseHexColor(text) : null
              if (parsed) commitHex(parsed)
            }}
            onBlur={() => {
              const parsed = draft === null ? null : parseHexColor(draft)
              if (parsed) commitHex(parsed)
              setDraft(null)
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") event.currentTarget.blur()
              if (event.key === "Escape") setDraft(null)
            }}
          />
        </div>

        {presets && presets.length > 0 ? (
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Preset colours">
            {presets.map((preset) => {
              const parsed = parseHexColor(preset)
              if (!parsed) return null
              const active = parsed === hex
              return (
                <button
                  key={preset}
                  type="button"
                  disabled={disabled}
                  aria-label={`Use ${parsed}`}
                  aria-pressed={active}
                  onClick={() => commitHex(parsed)}
                  className={cn(
                    "size-6 rounded-full border border-black/10 transition-transform outline-none hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none dark:border-white/15",
                    active && "ring-2 ring-ring ring-offset-2 ring-offset-background"
                  )}
                  style={{ backgroundColor: parsed }}
                />
              )
            })}
          </div>
        ) : null}
      </div>
    )
  }
)
ColorPicker.displayName = "ColorPicker"

export { ColorPicker }
