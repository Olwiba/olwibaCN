import * as React from "react"

import { cn } from "@/lib/utils"
import { useUIVariant } from "./ui-variant-context"

export interface KbdProps extends React.ComponentProps<"kbd"> {
  mode?: "playful" | "smooth"
}

function Kbd({ className, mode: modeProp, ...props }: KbdProps) {
  const mode = modeProp ?? useUIVariant()

  const baseClasses = cn(
    "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 px-1 font-sans text-xs font-medium",
    "[&_svg:not([class*='size-'])]:size-3",
    "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
    !mode && "rounded-sm",
    mode === "smooth" && "rounded-md",
    mode === "playful" && "rounded-sm"
  )

  if (mode === "playful") {
    return (
      <span className="group/playful relative inline-flex">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-sm bg-primary/30 dark:bg-primary/20 transition-transform duration-200 translate-x-[2px] translate-y-[2px] -rotate-[3deg] group-hover/playful:-rotate-[5deg]"
        />
        <kbd
          data-slot="kbd"
          className={cn(baseClasses, "relative rotate-[1.5deg]", className)}
          {...props}
        />
      </span>
    )
  }

  return <kbd data-slot="kbd" className={cn(baseClasses, className)} {...props} />
}

function KbdGroup({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
