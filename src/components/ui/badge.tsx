import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
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
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const badgeBackdropColor: Record<string, string> = {
  default: "bg-primary/30 dark:bg-primary/20",
  secondary: "bg-foreground/10 dark:bg-foreground/10",
  destructive: "bg-destructive/30 dark:bg-destructive/20",
  outline: "bg-foreground/10 dark:bg-foreground/10",
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  playful?: boolean
  smooth?: boolean
}

function Badge({ className, variant, playful = false, smooth = false, ...props }: BadgeProps) {
  if (playful) {
    return (
      <span className="group/playful relative inline-flex">
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 rounded-full transition-transform duration-200 translate-x-[2px] translate-y-[2px] -rotate-[1deg] group-hover/playful:-rotate-[2.5deg] group-hover/playful:scale-[1.02]",
            smooth && "rounded-xl",
            badgeBackdropColor[variant ?? "default"],
          )}
        />
        <div className={cn(badgeVariants({ variant }), "relative rotate-[0.5deg]", smooth && "rounded-xl", className)} {...props} />
      </span>
    )
  }

  return (
    <div className={cn(badgeVariants({ variant }), smooth && "rounded-xl", className)} {...props} />
  )
}

export { Badge, badgeVariants }
