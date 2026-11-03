"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { endOfDay, format, isSameYear, startOfDay, subDays, subMonths } from "date-fns"
import type { DateRange, Matcher } from "react-day-picker"

import { cn } from "@/lib/utils"
import { useUIVariant } from "@/components/ui/ui-variant-context"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { pickerTriggerClass } from "@/components/ui/combobox"

type DatePickerMode = "playful" | "smooth" | "glass"
type DatePickerSize = "sm" | "default" | "lg"

export type { DateRange }

/**
 * A named window that is recomputed from "now" each time it is applied, so a
 * saved "last 7 days" keeps meaning the last seven days rather than freezing
 * the dates it first resolved to. Persist the `id`, not the dates.
 */
export type DateRangePreset = {
  id: string
  label: string
  range: (now: Date) => { from: Date; to: Date }
}

export const defaultDateRangePresets: DateRangePreset[] = [
  { id: "today", label: "Today", range: (now) => ({ from: startOfDay(now), to: now }) },
  { id: "24h", label: "Last 24 hours", range: (now) => ({ from: subDays(now, 1), to: now }) },
  { id: "7d", label: "Last 7 days", range: (now) => ({ from: subDays(now, 7), to: now }) },
  { id: "30d", label: "Last 30 days", range: (now) => ({ from: subDays(now, 30), to: now }) },
  // subMonths clamps to the last day of shorter months, so 31 March minus one month is 28/29 February.
  { id: "3m", label: "Last 3 months", range: (now) => ({ from: subMonths(now, 3), to: now }) },
  { id: "12m", label: "Last 12 months", range: (now) => ({ from: subMonths(now, 12), to: now }) },
]

/** Resolves a preset id to concrete dates at `now`, or undefined for an unknown id. */
export function resolveDateRangePreset(
  id: string | null | undefined,
  presets: DateRangePreset[] = defaultDateRangePresets,
  now: Date = new Date(),
): { from: Date; to: Date } | undefined {
  return presets.find((preset) => preset.id === id)?.range(now)
}

/**
 * Normalises picked calendar days to a full-day window. With `max`, the end
 * never runs past it, so a range ending today stops at the current moment.
 */
export function normaliseDateRange(range: DateRange, max?: Date): { from: Date; to: Date } | undefined {
  if (!range.from) return undefined
  const from = startOfDay(range.from)
  let to = endOfDay(range.to ?? range.from)
  if (max && to > max) to = max
  return { from, to }
}

export function formatDateRange(range: DateRange | undefined, dateFormat = "d MMM yyyy") {
  if (!range?.from) return ""
  const to = range.to ?? range.from
  if (startOfDay(range.from).getTime() === startOfDay(to).getTime()) return format(range.from, dateFormat)
  const shortFormat = dateFormat.replace(/[\s,]*y+/, "")
  const start = isSameYear(range.from, to) && shortFormat !== dateFormat ? format(range.from, shortFormat) : format(range.from, dateFormat)
  return `${start} - ${format(to, dateFormat)}`
}

function disabledMatchers(min?: Date, max?: Date, extra?: Matcher | Matcher[]): Matcher[] {
  const matchers: Matcher[] = []
  if (min) matchers.push({ before: startOfDay(min) })
  if (max) matchers.push({ after: max })
  if (extra) matchers.push(...(Array.isArray(extra) ? extra : [extra]))
  return matchers
}

/* -------------------------------------------------------------------------- */

export interface DatePickerProps {
  value?: Date | null
  defaultValue?: Date | null
  onValueChange?: (value: Date | null) => void
  placeholder?: string
  /** date-fns format string for the trigger label. */
  dateFormat?: string
  min?: Date
  max?: Date
  disabledDates?: Matcher | Matcher[]
  disabled?: boolean
  mode?: DatePickerMode
  size?: DatePickerSize
  align?: "start" | "center" | "end"
  /** Submitted as an ISO date (yyyy-MM-dd) through a hidden input. */
  name?: string
  id?: string
  className?: string
  "aria-label"?: string
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value: valueProp,
      defaultValue = null,
      onValueChange,
      placeholder = "Pick a date",
      dateFormat = "d MMM yyyy",
      min,
      max,
      disabledDates,
      disabled = false,
      mode: modeProp,
      size = "default",
      align = "start",
      name,
      id,
      className,
      "aria-label": ariaLabel,
    },
    ref,
  ) => {
    const inheritedMode = useUIVariant()
    const mode = modeProp ?? inheritedMode
    const [open, setOpen] = React.useState(false)
    const [inner, setInner] = React.useState<Date | null>(defaultValue)
    const value = valueProp !== undefined ? valueProp : inner

    const select = (next: Date | null) => {
      if (valueProp === undefined) setInner(next)
      onValueChange?.(next)
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            id={id}
            type="button"
            aria-label={ariaLabel}
            aria-haspopup="dialog"
            disabled={disabled}
            className={cn(pickerTriggerClass(mode, size), className)}
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value ? format(value, dateFormat) : placeholder}
            </span>
            <CalendarIcon className="size-4 shrink-0 opacity-50" aria-hidden="true" />
          </button>
        </PopoverTrigger>
        {name ? <input type="hidden" name={name} value={value ? format(value, "yyyy-MM-dd") : ""} /> : null}
        <PopoverContent mode={mode} align={align} className="w-auto p-0">
          <Calendar
            mode="single"
            uiMode={mode === "smooth" || mode === "playful" ? mode : undefined}
            className="bg-transparent"
            selected={value ?? undefined}
            defaultMonth={value ?? max ?? undefined}
            onSelect={(day) => {
              select(day ?? null)
              if (day) setOpen(false)
            }}
            disabled={disabledMatchers(min, max, disabledDates)}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    )
  },
)
DatePicker.displayName = "DatePicker"

/* -------------------------------------------------------------------------- */

export interface DateRangePickerProps {
  value?: DateRange
  defaultValue?: DateRange
  /**
   * Called with the applied range. `presetId` is set when a preset was chosen;
   * store it to keep the window rolling on the next visit.
   */
  onValueChange?: (range: DateRange | undefined, presetId?: string) => void
  /** The active preset id. Labels the trigger and highlights the preset. */
  preset?: string | null
  /** Pass `false` to hide the preset list. */
  presets?: DateRangePreset[] | false
  placeholder?: string
  dateFormat?: string
  min?: Date
  /** Latest selectable moment, e.g. `new Date()` for analytics. Range ends clamp to it. */
  max?: Date
  disabledDates?: Matcher | Matcher[]
  /** Defaults to 2 months side by side, 1 on small screens. */
  numberOfMonths?: number
  disabled?: boolean
  mode?: DatePickerMode
  size?: DatePickerSize
  align?: "start" | "center" | "end"
  id?: string
  className?: string
  "aria-label"?: string
}

const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      preset: presetProp,
      presets = defaultDateRangePresets,
      placeholder = "Pick a date range",
      dateFormat = "d MMM yyyy",
      min,
      max,
      disabledDates,
      numberOfMonths,
      disabled = false,
      mode: modeProp,
      size = "default",
      align = "start",
      id,
      className,
      "aria-label": ariaLabel,
    },
    ref,
  ) => {
    const inheritedMode = useUIVariant()
    const mode = modeProp ?? inheritedMode
    const isMobile = useIsMobile()
    const [open, setOpen] = React.useState(false)
    const [innerValue, setInnerValue] = React.useState<DateRange | undefined>(defaultValue)
    const [innerPreset, setInnerPreset] = React.useState<string | null>(null)
    const value = valueProp !== undefined ? valueProp : innerValue
    const activePresetId = presetProp !== undefined ? presetProp : innerPreset
    const presetList = presets === false ? [] : presets
    const activePreset = presetList.find((p) => p.id === activePresetId)

    // Calendar picks are staged until Apply, so a half-picked range never reaches the caller.
    const [draft, setDraft] = React.useState<DateRange | undefined>(value)
    const onOpenChange = (next: boolean) => {
      if (next) setDraft(value)
      setOpen(next)
    }

    const apply = (range: DateRange | undefined, presetId?: string) => {
      if (valueProp === undefined) setInnerValue(range)
      if (presetProp === undefined) setInnerPreset(presetId ?? null)
      onValueChange?.(range, presetId)
      setOpen(false)
    }

    const label = activePreset ? activePreset.label : formatDateRange(value, dateFormat)

    return (
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            id={id}
            type="button"
            aria-label={ariaLabel}
            aria-haspopup="dialog"
            disabled={disabled}
            className={cn(pickerTriggerClass(mode, size), className)}
          >
            <span className={cn("truncate", !label && "text-muted-foreground")}>{label || placeholder}</span>
            <CalendarIcon className="size-4 shrink-0 opacity-50" aria-hidden="true" />
          </button>
        </PopoverTrigger>
        <PopoverContent mode={mode} align={align} className="w-auto max-w-[calc(100vw-2rem)] p-0">
          <div className="flex flex-col sm:flex-row">
            {presetList.length > 0 ? (
              <div
                role="group"
                aria-label="Presets"
                className="flex gap-1 overflow-x-auto border-b p-2 sm:w-40 sm:flex-col sm:overflow-visible sm:border-b-0 sm:border-r"
              >
                {presetList.map((p) => (
                  <Button
                    key={p.id}
                    type="button"
                    size="sm"
                    variant={p.id === activePresetId ? "secondary" : "ghost"}
                    aria-pressed={p.id === activePresetId}
                    className="h-8 shrink-0 justify-start px-2 font-normal"
                    onClick={() => apply(p.range(new Date()), p.id)}
                  >
                    {p.label}
                  </Button>
                ))}
              </div>
            ) : null}
            <div className="flex flex-col">
              <Calendar
                mode="range"
                uiMode={mode === "smooth" || mode === "playful" ? mode : undefined}
                className="bg-transparent"
                classNames={{ root: "w-fit" }}
                numberOfMonths={numberOfMonths ?? (isMobile ? 1 : 2)}
                selected={draft}
                defaultMonth={draft?.from ?? (max ? subMonths(max, isMobile ? 0 : 1) : undefined)}
                onSelect={setDraft}
                disabled={disabledMatchers(min, max, disabledDates)}
                autoFocus
              />
              <div className="flex items-center justify-between gap-2 border-t p-2">
                <span className="truncate text-xs text-muted-foreground" aria-live="polite">
                  {draft?.from ? formatDateRange(draft, dateFormat) : "Select a start date"}
                </span>
                <div className="flex shrink-0 gap-2">
                  <Button type="button" size="sm" variant="ghost" className="h-8" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className="h-8"
                    disabled={!draft?.from}
                    onClick={() => draft && apply(normaliseDateRange(draft, max))}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  },
)
DateRangePicker.displayName = "DateRangePicker"

export { DatePicker, DateRangePicker }
