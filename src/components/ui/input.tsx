import * as React from "react"

import { cn } from "@/lib/utils"
import { useUIVariant } from "./ui-variant-context"

export interface InputProps extends React.ComponentProps<"input"> {
  mode?: "playful" | "smooth"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, mode: modeProp, ...props }, ref) => {
    const mode = modeProp ?? useUIVariant()

    const input = (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/20",
          mode === "smooth" && "rounded-full",
          mode === "playful" && "relative z-10",
          className
        )}
        ref={ref}
        {...props}
      />
    )

    if (mode === "playful") {
      return (
        <span className="group/playful relative inline-flex w-full">
          <span
            aria-hidden="true"
            className="absolute inset-0 z-0 translate-x-[3px] translate-y-[3px] -rotate-[0.4deg] rounded-md bg-foreground/8 transition-transform duration-200 group-hover/playful:-rotate-[1deg] group-focus-within/playful:-rotate-[1deg] dark:bg-foreground/10"
          />
          {input}
        </span>
      )
    }

    return input
  }
)
Input.displayName = "Input"

export { Input }
