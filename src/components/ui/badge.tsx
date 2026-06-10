import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useUIVariant } from "./ui-variant-context"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
      size: {
        sm: "px-2 py-px text-[10px]",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  disabled?: boolean
  mode?: "playful" | "smooth"
}

function Badge({ className, variant, size, disabled = false, mode: modeProp, ...props }: BadgeProps) {
  const mode = modeProp ?? useUIVariant()

  return (
    <div
      className={cn(
        badgeVariants({ variant, size }),
        disabled && "opacity-50 pointer-events-none",
        mode === "smooth" && "shadow-sm",
        mode === "playful" && "rotate-[0.5deg] [box-shadow:2px_2px_0px_0px_color-mix(in_srgb,currentColor_15%,transparent)]",
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
