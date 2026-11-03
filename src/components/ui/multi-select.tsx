"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { useUIVariant } from "@/components/ui/ui-variant-context"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  pickerTriggerClass,
  useControllableValue,
  type ComboboxOption,
} from "@/components/ui/combobox"

type MultiSelectMode = "playful" | "smooth" | "glass"
type MultiSelectSize = "sm" | "default" | "lg"

export type MultiSelectOption = ComboboxOption

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  defaultValue?: string[]
  /** Values are always emitted in option order, not click order. */
  onValueChange?: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: React.ReactNode
  /**
   * How many selections show as chips before collapsing into "+N". `"auto"`
   * fits as many as the trigger's width allows, keeping room for the count.
   */
  maxVisible?: number | "auto"
  /** Adds "Select all" and "Clear" actions under the list. */
  showActions?: boolean
  disabled?: boolean
  mode?: MultiSelectMode
  size?: MultiSelectSize
  /** Submitted as one hidden input per selected value. */
  name?: string
  id?: string
  className?: string
  contentClassName?: string
  "aria-label"?: string
}

const EMPTY: string[] = []

const useIsomorphicLayoutEffect = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect

/**
 * How many chips fit in the row: each one is placed while it still leaves room
 * for the "+N" count after it, and the first chip always shows (truncated if
 * it must). Re-measured whenever the row resizes or the selection changes.
 * Until measured (and on the server) every chip renders and the row clips.
 */
function useFittingChipCount(
  rowRef: React.RefObject<HTMLSpanElement | null>,
  measureRef: React.RefObject<HTMLSpanElement | null>,
  enabled: boolean,
  selectionKey: string,
) {
  const [count, setCount] = React.useState(Number.POSITIVE_INFINITY)

  useIsomorphicLayoutEffect(() => {
    const row = rowRef.current
    const measure = measureRef.current
    if (!enabled || !row || !measure) return

    const fit = () => {
      const available = row.clientWidth
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0
      const chips = Array.from(measure.querySelectorAll<HTMLElement>("[data-chip]"))
      const more = (measure.querySelector<HTMLElement>("[data-more]")?.offsetWidth ?? 0) + gap
      let used = 0
      let fits = 0
      for (let i = 0; i < chips.length; i++) {
        const width = chips[i].offsetWidth + (i > 0 ? gap : 0)
        const reserve = i < chips.length - 1 ? more : 0
        if (used + width + reserve > available) break
        used += width
        fits++
      }
      setCount(Math.max(1, fits))
    }

    fit()
    if (typeof ResizeObserver !== "function") return
    const observer = new ResizeObserver(fit)
    observer.observe(row)
    return () => observer.disconnect()
  }, [enabled, selectionKey, rowRef, measureRef])

  return count
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      value: valueProp,
      defaultValue = EMPTY,
      onValueChange,
      placeholder = "Select options",
      searchPlaceholder = "Search...",
      emptyText = "No results.",
      maxVisible = "auto",
      showActions = true,
      disabled = false,
      mode: modeProp,
      size = "default",
      name,
      id,
      className,
      contentClassName,
      "aria-label": ariaLabel,
    },
    ref,
  ) => {
    const inheritedMode = useUIVariant()
    const mode = modeProp ?? inheritedMode
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = useControllableValue<string[]>(valueProp, defaultValue, onValueChange)

    const selectedSet = new Set(value)
    const selected = options.filter((option) => selectedSet.has(option.value))
    const auto = maxVisible === "auto"
    const rowRef = React.useRef<HTMLSpanElement>(null)
    const measureRef = React.useRef<HTMLSpanElement>(null)
    const autoCount = useFittingChipCount(rowRef, measureRef, auto, selected.map((o) => o.value).join("|"))
    const visibleCount = auto ? Math.min(autoCount, selected.length) : Math.max(0, maxVisible)
    const visible = selected.slice(0, visibleCount)
    const overflow = selected.length - visible.length
    const selectable = options.filter((option) => !option.disabled)

    const commit = (next: Set<string>) => setValue(options.filter((o) => next.has(o.value)).map((o) => o.value))

    const toggle = (optionValue: string) => {
      const next = new Set(selectedSet)
      if (next.has(optionValue)) next.delete(optionValue)
      else next.add(optionValue)
      commit(next)
    }

    const chipClass = cn(
      "inline-flex max-w-[10rem] items-center rounded-sm bg-secondary px-1.5 py-0.5 text-xs font-medium text-secondary-foreground",
      mode === "smooth" && "rounded-md",
      mode === "playful" && "rounded-md border border-foreground/15",
    )

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            id={id}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-label={ariaLabel}
            disabled={disabled}
            className={cn(pickerTriggerClass(mode, size), className)}
          >
            {selected.length === 0 ? (
              <span className="truncate text-muted-foreground">{placeholder}</span>
            ) : (
              <span ref={rowRef} className="relative flex min-w-0 flex-1 items-center gap-1 overflow-hidden">
                {visible.map((option) => (
                  // A lone chip may shrink and truncate; otherwise chips keep their size and the count absorbs the rest.
                  <span key={option.value} className={cn(chipClass, visible.length === 1 ? "min-w-0 shrink" : "shrink-0")}>
                    <span className="truncate">{option.label}</span>
                  </span>
                ))}
                {overflow > 0 ? <span className="shrink-0 text-xs text-muted-foreground">+{overflow}</span> : null}
                {auto ? (
                  // Every chip at its natural width, measured to decide how many fit. Never seen or read.
                  <span
                    ref={measureRef}
                    aria-hidden="true"
                    className="pointer-events-none invisible absolute left-0 top-0 flex items-center gap-1 whitespace-nowrap"
                  >
                    {selected.map((option) => (
                      <span key={option.value} data-chip="" className={cn(chipClass, "shrink-0")}>
                        <span className="truncate">{option.label}</span>
                      </span>
                    ))}
                    <span data-more="" className="text-xs">+{selected.length}</span>
                  </span>
                ) : null}
              </span>
            )}
            <ChevronsUpDown className="size-4 shrink-0 opacity-50" aria-hidden="true" />
          </button>
        </PopoverTrigger>
        {name ? value.map((v) => <input key={v} type="hidden" name={name} value={v} />) : null}
        <PopoverContent
          mode={mode}
          align="start"
          className={cn("w-[var(--radix-popover-trigger-width)] min-w-[14rem] p-0", contentClassName)}
        >
          <Command className="bg-transparent">
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedSet.has(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      keywords={[option.label, ...(option.keywords ?? [])]}
                      disabled={option.disabled}
                      onSelect={() => toggle(option.value)}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-primary/60",
                          isSelected ? "bg-primary text-primary-foreground" : "bg-transparent [&_svg]:invisible",
                        )}
                      >
                        <Check className="size-3" />
                      </span>
                      {option.icon}
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate">{option.label}</span>
                        {option.description ? (
                          <span className="truncate text-xs text-muted-foreground">{option.description}</span>
                        ) : null}
                      </span>
                      {/* cmdk owns aria-selected for the keyboard highlight, so checked state is spoken here. */}
                      <span className="sr-only">{isSelected ? ", selected" : ""}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
            {showActions ? (
              <>
                <CommandSeparator />
                <div className="flex items-center justify-between gap-2 p-1">
                  <button
                    type="button"
                    className="rounded-sm px-2 py-1.5 text-xs font-medium hover:bg-accent disabled:opacity-50"
                    disabled={selectable.every((o) => selectedSet.has(o.value))}
                    onClick={() => commit(new Set([...value, ...selectable.map((o) => o.value)]))}
                  >
                    Select all
                  </button>
                  <span className="text-xs text-muted-foreground" aria-live="polite">
                    {selected.length} selected
                  </span>
                  <button
                    type="button"
                    className="rounded-sm px-2 py-1.5 text-xs font-medium hover:bg-accent disabled:opacity-50"
                    disabled={selected.length === 0}
                    onClick={() => commit(new Set(options.filter((o) => o.disabled && selectedSet.has(o.value)).map((o) => o.value)))}
                  >
                    Clear
                  </button>
                </div>
              </>
            ) : null}
          </Command>
        </PopoverContent>
      </Popover>
    )
  },
)
MultiSelect.displayName = "MultiSelect"

export { MultiSelect }
