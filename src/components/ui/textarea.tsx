import * as React from "react"

import { cn } from "@/lib/utils"
import { useUIVariant } from "./ui-variant-context"

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  size?: "sm" | "default" | "lg"
  mode?: "playful" | "smooth"
}

const textareaSizes = {
  sm: "min-h-16 px-3 py-2 text-sm",
  default: "min-h-20 px-3 py-2 text-base md:text-sm",
  lg: "min-h-28 px-4 py-3 text-base",
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size = "default", mode: modeProp, ...props }, ref) => {
    const mode = modeProp ?? useUIVariant()

    const textarea = (
      <textarea
        className={cn(
          "flex w-full rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/20",
          textareaSizes[size],
          mode === "smooth" && "rounded-2xl",
          mode === "playful" && "relative z-10 rounded-md",
          className
        )}
        ref={ref}
        {...props}
      />
    )

    if (mode === "playful") {
      return (
        <span className="group/playful relative flex w-full">
          <span
            aria-hidden="true"
            className="absolute inset-0 z-0 translate-x-[3px] translate-y-[3px] -rotate-[0.4deg] rounded-md bg-foreground/8 transition-transform duration-200 group-hover/playful:-rotate-[1deg] dark:bg-foreground/10"
          />
          {textarea}
        </span>
      )
    }

    return textarea
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
