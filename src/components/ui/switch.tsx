import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"
import { useUIVariant } from "./ui-variant-context"

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  size?: "sm" | "default" | "lg"
  mode?: "playful" | "smooth"
}

const switchSizes = {
  sm: {
    root: "h-5 w-9",
    thumb: "size-4 data-[state=checked]:translate-x-4",
  },
  default: {
    root: "h-6 w-11",
    thumb: "size-5 data-[state=checked]:translate-x-5",
  },
  lg: {
    root: "h-7 w-14",
    thumb: "size-6 data-[state=checked]:translate-x-7",
  },
} as const

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size = "default", mode: modeProp, ...props }, ref) => {
  const mode = modeProp ?? useUIVariant()
  const sizes = switchSizes[size]

  // The track and thumb are already fully rounded, so smooth has nothing to
  // soften — only playful changes the rendering.
  if (mode === "playful") {
    return (
      <span className="group/playful relative inline-flex">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-primary/30 dark:bg-primary/20 transition-transform duration-200 translate-x-[2px] translate-y-[2px] -rotate-[3deg] group-hover/playful:-rotate-[5deg]"
        />
        <SwitchPrimitives.Root
          className={cn(
            "relative peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input rotate-[1.5deg]",
            sizes.root,
            className
          )}
          {...props}
          ref={ref}
        >
          <SwitchPrimitives.Thumb
            className={cn(
              "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0",
              sizes.thumb
            )}
          />
        </SwitchPrimitives.Root>
      </span>
    )
  }

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        sizes.root,
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0",
          sizes.thumb
        )}
      />
    </SwitchPrimitives.Root>
  )
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
