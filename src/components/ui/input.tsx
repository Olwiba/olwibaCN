import * as React from "react"

import { cn } from "@/lib/utils"
import { useUIVariant } from "./ui-variant-context"

export interface InputProps extends React.ComponentProps<"input"> {
  mode?: "playful" | "smooth"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, mode: modeProp, ...props }, ref) => {
    const mode = modeProp ?? useUIVariant()

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/20",
          mode === "smooth" && "rounded-full",
          mode === "playful" && "rotate-[0.3deg] [box-shadow:3px_3px_0px_0px_color-mix(in_srgb,currentColor_12%,transparent)]",
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
