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
  mode?: "playful"
}

const playfulBackdrop: Record<string, string> = {
  default: "bg-primary/30 dark:bg-primary/20",
  destructive: "bg-destructive/30 dark:bg-destructive/20",
  secondary: "bg-foreground/10 dark:bg-foreground/10",
  outline: "bg-foreground/10 dark:bg-foreground/10",
}

function Badge({ className, variant, size, disabled = false, mode: modeProp, ...props }: BadgeProps) {
  const mode = modeProp ?? useUIVariant()

  if (mode === "playful") {
    return (
      <span
        className={cn(
          "group/playful relative inline-flex",
          disabled && "opacity-50 pointer-events-none",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 rounded-full transition-transform duration-200 translate-x-[3px] translate-y-[3px] -rotate-[0.5deg] group-hover/playful:-rotate-[1.5deg] group-hover/playful:scale-[1.01]",
            playfulBackdrop[variant ?? "default"],
          )}
        />
        <div
          className={cn(badgeVariants({ variant, size }), "relative rotate-[0.3deg]", className)}
          {...props}
        />
      </span>
    )
  }

  return (
    <div
      className={cn(
        badgeVariants({ variant, size }),
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
