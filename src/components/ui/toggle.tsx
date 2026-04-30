import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { type UIVariant, useUIVariant } from "./ui-variant-context"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3 min-w-10",
        sm: "h-9 px-2.5 min-w-9",
        lg: "h-11 px-5 min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants> & {
      mode?: UIVariant
    }
>(({ className, variant, size, mode: modeProp, ...props }, ref) => {
  const inheritedMode = useUIVariant()
  const mode = modeProp ?? inheritedMode
  const toggle = (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(
        toggleVariants({ variant, size }),
        mode === "smooth" && "rounded-full",
        mode === "playful" &&
          "relative z-10 rounded-md data-[state=on]:shadow-sm",
        className
      )}
      {...props}
    />
  )

  if (mode === "playful") {
    return (
      <span className="group/toggle relative inline-flex">
        <span
          aria-hidden="true"
          className="absolute inset-0 z-0 origin-center translate-x-[3px] translate-y-[3px] -rotate-[1.5deg] rounded-md bg-primary/30 opacity-0 transition-[opacity,transform] duration-200 group-has-[[data-state=on]]/toggle:opacity-100"
        />
        {toggle}
      </span>
    )
  }

  return toggle
})

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
