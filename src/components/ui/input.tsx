import * as React from "react"

import { cn } from "@/lib/utils"
import { useUIVariant } from "./ui-variant-context"

export interface InputProps extends React.ComponentProps<"input"> {
  mode?: "playful" | "smooth"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, mode: modeProp, ...props }, ref) => {
    const mode = modeProp ?? useUIVariant()
    if (mode === "playful") {
      return (
        <span className="group/playful relative inline-flex w-full">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-md bg-foreground/8 dark:bg-foreground/10 transition-transform duration-200 translate-x-[3px] translate-y-[3px] -rotate-[0.4deg] group-hover/playful:-rotate-[1deg]"
          />
          <input
            type={type}
            className={cn(
              "relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm -rotate-[0.3deg] focus-visible:rotate-0 transition-transform duration-200",
              className
            )}
            ref={ref}
            {...props}
          />
        </span>
      )
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          mode === "smooth" && "rounded-full",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
