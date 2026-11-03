"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useUIVariant, type UIVariant } from "@/components/ui/ui-variant-context"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

type ComboboxMode = "playful" | "smooth" | "glass"
type ComboboxSize = "sm" | "default" | "lg"

export type ComboboxOption = {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  /** Extra search terms, matched alongside the label. */
  keywords?: string[]
  disabled?: boolean
  /** Options sharing a group render under one heading, in first-seen order. */
  group?: string
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: React.ReactNode
  /** Shows a clear button once something is selected. */
  clearable?: boolean
  disabled?: boolean
  mode?: ComboboxMode
  size?: ComboboxSize
  /** Submitted through a hidden input, so the combobox works in native forms. */
  name?: string
  id?: string
  className?: string
  contentClassName?: string
  "aria-label"?: string
}

function groupOptions(options: ComboboxOption[]) {
  const groups = new Map<string, ComboboxOption[]>()
  for (const option of options) {
    const key = option.group ?? ""
    const bucket = groups.get(key)
    if (bucket) bucket.push(option)
    else groups.set(key, [option])
  }
  return [...groups.entries()]
}

/**
 * Trigger styling shared by the picker family (Combobox, MultiSelect,
 * DatePicker) so they line up with SelectTrigger in a form.
 */
function pickerTriggerClass(mode: UIVariant, size: ComboboxSize) {
  return cn(
    "flex w-full items-center justify-between gap-2 rounded-md border border-input bg-background text-left ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    size === "sm" && "min-h-9 px-3 py-1.5 text-xs",
    size === "default" && "min-h-10 px-3 py-2 text-sm",
    size === "lg" && "min-h-11 px-4 py-2.5 text-base",
    mode === "smooth" && "rounded-xl shadow-sm",
    mode === "playful" && "rotate-[0.3deg] [box-shadow:3px_3px_0px_0px_color-mix(in_srgb,currentColor_12%,transparent)]",
    mode === "glass" && "bg-background/40 backdrop-blur-md",
  )
}

function useControllableValue<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (next: T) => void,
) {
  const [inner, setInner] = React.useState(defaultValue)
  const controlled = value !== undefined
  const current = controlled ? value : inner
  const setValue = React.useCallback(
    (next: T) => {
      if (!controlled) setInner(next)
      onChange?.(next)
    },
    [controlled, onChange],
  )
  return [current, setValue] as const
}

const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options,
      value: valueProp,
      defaultValue = null,
      onValueChange,
      placeholder = "Select an option",
      searchPlaceholder = "Search...",
      emptyText = "No results.",
      clearable = false,
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
    const [value, setValue] = useControllableValue<string | null>(valueProp, defaultValue, onValueChange)
    const selected = options.find((option) => option.value === value)
    const showClear = clearable && Boolean(selected) && !disabled

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <div className={cn("relative w-full", className)}>
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
              // The clear button sits at the right edge; reserve just its width so the chevron sits beside it.
              className={cn(pickerTriggerClass(mode, size), showClear && (size === "lg" ? "pr-10" : "pr-9"))}
            >
              <span className={cn("flex min-w-0 items-center gap-2", !selected && "text-muted-foreground")}>
                {selected?.icon}
                <span className="truncate">{selected ? selected.label : placeholder}</span>
              </span>
              <ChevronsUpDown className="size-4 shrink-0 opacity-50" aria-hidden="true" />
            </button>
          </PopoverTrigger>
          {showClear ? (
            <button
              type="button"
              aria-label="Clear selection"
              onClick={() => setValue(null)}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                size === "lg" ? "right-3" : "right-2.5",
              )}
            >
              <X className="size-3.5" />
            </button>
          ) : null}
          {name ? <input type="hidden" name={name} value={value ?? ""} /> : null}
        </div>
        <PopoverContent
          mode={mode}
          align="start"
          className={cn("w-[var(--radix-popover-trigger-width)] min-w-[12rem] p-0", contentClassName)}
        >
          <Command className="bg-transparent">
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              {groupOptions(options).map(([group, items]) => (
                <CommandGroup key={group || "__ungrouped"} heading={group || undefined}>
                  {items.map((option) => {
                    const isSelected = option.value === value
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        keywords={[option.label, ...(option.keywords ?? [])]}
                        disabled={option.disabled}
                        onSelect={() => {
                          // Picking the current value again clears it only when clearing is allowed.
                          setValue(isSelected && clearable ? null : option.value)
                          setOpen(false)
                        }}
                      >
                        {option.icon}
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate">{option.label}</span>
                          {option.description ? (
                            <span className="truncate text-xs text-muted-foreground">{option.description}</span>
                          ) : null}
                        </span>
                        <Check className={cn("ml-auto", isSelected ? "opacity-100" : "opacity-0")} aria-hidden="true" />
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  },
)
Combobox.displayName = "Combobox"

export { Combobox, pickerTriggerClass, useControllableValue }
