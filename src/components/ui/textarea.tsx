import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  playful?: boolean
  smooth?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, playful = false, smooth = false, ...props }, ref) => {
    if (playful) {
      return (
        <span className="group/playful relative inline-flex w-full">
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 rounded-md bg-foreground/8 dark:bg-foreground/10 transition-transform duration-200 translate-x-[3px] translate-y-[3px] -rotate-[0.4deg] group-hover/playful:-rotate-[1deg]",
              smooth && "rounded-2xl"
            )}
          />
          <textarea
            className={cn(
              "relative flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm -rotate-[0.3deg] focus-visible:rotate-0 transition-transform duration-200",
              smooth && "rounded-2xl",
              className
            )}
            ref={ref}
            {...props}
          />
        </span>
      )
    }

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          smooth && "rounded-2xl",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
