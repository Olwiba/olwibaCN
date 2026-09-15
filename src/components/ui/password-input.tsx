"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input, type InputProps } from "./input"

export interface PasswordInputProps extends Omit<InputProps, "type"> {
  /**
   * Hides the reveal control while keeping the field a password input.
   *
   * For the rare field where showing the value is the wrong offer regardless of
   * who is asking — a shared terminal, a kiosk, a recorded screen share.
   */
  hideToggle?: boolean
}

/**
 * A password field with a reveal toggle.
 *
 * Typing a password blind is the reason people paste from a password manager
 * into a plain text field first, or give up and reset an account they already
 * had. Every password field is a place someone can be silently wrong about what
 * they typed, and the fix has been standard for years — but only if it is
 * shipped once. Left to each form, half of them get it and half do not, which
 * is what happened here before this existed.
 *
 * Wraps `Input` rather than reimplementing the field, so mode variants, invalid
 * styling and the playful backing all keep working. The extra right padding is
 * on this component instead of `inputBase`, since it exists only because the
 * button is sitting there.
 *
 * The toggle is a real `button` with `tabIndex={-1}`: it must be reachable by
 * pointer and by screen reader, but landing on it while tabbing from the field
 * to the submit button puts an obstacle in the middle of the most common path
 * through a login form. `aria-pressed` carries the state, and the label says
 * what pressing it will do rather than what it currently is.
 *
 * The field is never `type="text"` at rest — revealing is transient state that
 * resets whenever the component remounts, so a revealed password cannot survive
 * a navigation back to the form.
 */
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, hideToggle, disabled, ...props }, ref) => {
    const [revealed, setRevealed] = React.useState(false)

    if (hideToggle) {
      return (
        <Input
          type="password"
          className={className}
          disabled={disabled}
          ref={ref}
          {...props}
        />
      )
    }

    return (
      <div className="relative w-full">
        <Input
          type={revealed ? "text" : "password"}
          // Room for the button. Matches its 2rem inset plus the gap that keeps
          // a long value from running underneath it.
          className={cn("pr-10", className)}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          // Not in the tab order: see the component comment. Still focusable by
          // click and still announced, because it is a button with a label.
          tabIndex={-1}
          disabled={disabled}
          aria-pressed={revealed}
          aria-label={revealed ? "Hide password" : "Show password"}
          onClick={() => setRevealed((current) => !current)}
          className={cn(
            "absolute inset-y-0 right-0 z-10 flex w-10 items-center justify-center",
            "text-muted-foreground transition-colors hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "rounded-md disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          {revealed ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
