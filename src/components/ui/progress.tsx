"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"
import { useUIVariant } from "./ui-variant-context"

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  disabled?: boolean
  mode?: "playful" | "smooth"
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, disabled = false, mode: modeProp, ...props }, ref) => {
  const mode = modeProp ?? useUIVariant()

  const bar = (
    <ProgressPrimitive.Root
      ref={ref}
      aria-disabled={disabled || undefined}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        disabled && "opacity-50",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )

  // The track is already fully rounded, so smooth has nothing to soften —
  // only playful changes the rendering. Backdrop follows the card treatment
  // (neutral, barely rotated) since this is a wide surface, not a control.
  if (mode === "playful") {
    return (
      <div className="group/playful relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-border transition-transform duration-200 translate-x-[3px] translate-y-[3px] -rotate-[0.5deg] group-hover/playful:-rotate-[1.5deg]"
        />
        <div className="relative">{bar}</div>
      </div>
    )
  }

  return bar
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
