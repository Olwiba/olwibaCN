import * as React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { useUIVariant } from "./ui-variant-context"
import { glassControl } from "./glass"
import { inputBase, inputPlayfulBacking } from "./input"

/**
 * A number field whose steppers follow the theme.
 *
 * Why this exists rather than a prop on Input: a browser's native spin buttons
 * cannot be themed. `::-webkit-inner-spin-button` accepts almost nothing beyond
 * `appearance: none`, and Firefox exposes no hook at all, so on every mode —
 * and especially glass and playful — they render as a piece of unstyled OS
 * chrome sitting inside a themed control. The only way to style them is to hide
 * them and draw your own, which is what this does.
 *
 * `Input` is deliberately left alone. A bare `<Input type="number">` keeps its
 * native spinners, because silently removing them there would take the control
 * away from consumers and give them nothing back.
 *
 * Works controlled or uncontrolled. Stepping writes through the prototype's
 * value setter and then dispatches `input`, which is what makes React see the
 * change: React's value tracker is installed on the element instance, so a
 * prototype-level write bypasses it and leaves the tracker stale — exactly the
 * condition React treats as "the value changed".
 */

export interface NumberInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  mode?: "playful" | "smooth" | "glass"
  /** Hide the stepper buttons, keeping only the native-spinner suppression. */
  hideStepper?: boolean
  /** Accessible name for the increment control. */
  incrementLabel?: string
  /** Accessible name for the decrement control. */
  decrementLabel?: string
}

/** Native spin buttons, suppressed in both engines. */
const spinnerReset =
  "[appearance:textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"

function toNumber(value: string | number | readonly string[] | undefined): number | null {
  if (value === undefined || value === null || value === "") return null
  const parsed = Number.parseFloat(String(value))
  return Number.isNaN(parsed) ? null : parsed
}

/** Decimal places implied by the step, so 0.1 steps don't accrue float dust. */
function decimalsOf(step: number): number {
  const fraction = String(step).split(".")[1]
  return fraction ? fraction.length : 0
}

function writeValue(input: HTMLInputElement, next: string) {
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )?.set
  setter?.call(input, next)
  input.dispatchEvent(new Event("input", { bubbles: true }))
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      mode: modeProp,
      hideStepper = false,
      incrementLabel = "Increase",
      decrementLabel = "Decrease",
      min,
      max,
      step,
      disabled,
      ...props
    },
    forwardedRef
  ) => {
    const contextMode = useUIVariant()
    const mode = modeProp ?? contextMode

    const innerRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(forwardedRef, () => innerRef.current as HTMLInputElement)

    // Mirrors the field so the buttons can disable themselves at the bounds.
    // Seeded from value/defaultValue and kept current by the input's own
    // events, which covers typing, stepping and controlled updates alike.
    const [current, setCurrent] = React.useState<number | null>(() =>
      toNumber(props.value ?? props.defaultValue)
    )

    React.useEffect(() => {
      if (props.value !== undefined) setCurrent(toNumber(props.value))
    }, [props.value])

    const minNum = toNumber(min)
    const maxNum = toNumber(max)
    const stepNum = toNumber(step) ?? 1

    const atMin = minNum !== null && current !== null && current <= minNum
    const atMax = maxNum !== null && current !== null && current >= maxNum

    const stepBy = (direction: 1 | -1) => {
      const input = innerRef.current
      if (!input || disabled) return

      // An empty field starts from the floor rather than jumping to ±step, so
      // the first press on a blank "min bedrooms" gives you the minimum.
      const start = toNumber(input.value)
      const base = start ?? minNum ?? 0
      let next = start === null ? base : base + direction * stepNum

      if (minNum !== null) next = Math.max(minNum, next)
      if (maxNum !== null) next = Math.min(maxNum, next)

      const places = decimalsOf(stepNum)
      writeValue(input, places > 0 ? next.toFixed(places) : String(next))
      input.focus()
    }

    const stepperButton = (direction: 1 | -1) => {
      const isUp = direction === 1
      const Icon = isUp ? ChevronUp : ChevronDown
      return (
        <button
          type="button"
          tabIndex={-1}
          aria-label={isUp ? incrementLabel : decrementLabel}
          disabled={disabled || (isUp ? atMax : atMin)}
          onClick={() => stepBy(direction)}
          className={cn(
            "flex h-1/2 w-full items-center justify-center text-muted-foreground transition-colors",
            "hover:text-foreground hover:bg-accent/60",
            "disabled:pointer-events-none disabled:opacity-30",
            mode === "smooth" ? "rounded-full" : "rounded-sm",
            isUp ? "rounded-b-none" : "rounded-t-none"
          )}
        >
          <Icon className="size-3" aria-hidden="true" />
        </button>
      )
    }

    const field = (
      <span className={cn("relative inline-flex w-full", mode === "playful" && "z-10")}>
        <input
          {...props}
          type="number"
          ref={innerRef}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onInput={(event) => {
            setCurrent(toNumber(event.currentTarget.value))
            props.onInput?.(event)
          }}
          className={cn(
            inputBase,
            spinnerReset,
            !hideStepper && "pr-9",
            mode === "smooth" && "rounded-full",
            mode === "glass" && glassControl,
            className
          )}
        />

        {!hideStepper && (
          // Inside the border, so the control reads as one field. `tabIndex={-1}`
          // on the buttons keeps Tab moving between fields — the keyboard already
          // has ArrowUp/ArrowDown for stepping, natively, and a keyboard user
          // gains nothing from two extra stops per number.
          <span
            className={cn(
              "absolute inset-y-1 flex w-7 flex-col",
              mode === "smooth" ? "right-1.5" : "right-1"
            )}
          >
            {stepperButton(1)}
            {stepperButton(-1)}
          </span>
        )}
      </span>
    )

    if (mode === "playful") {
      return (
        <span className="group/playful relative inline-flex w-full">
          <span aria-hidden="true" className={inputPlayfulBacking} />
          {field}
        </span>
      )
    }

    return field
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput }
