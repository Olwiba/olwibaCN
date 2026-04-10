import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useUIVariant } from "./ui-variant-context"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-sm shadow-destructive/20 hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm shadow-zinc-800/5 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm shadow-zinc-800/5 hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline underline-offset-4 decoration-primary/20 hover:decoration-primary/40",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  mode?: "playful" | "smooth"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, mode: modeProp, ...props }, ref) => {
    const mode = modeProp ?? useUIVariant()
    const Comp = asChild ? Slot : "button"

    const hasBackdrop = mode === "playful" && variant !== "ghost" && variant !== "link"

    const backdropColor: Record<string, string> = {
      default: "bg-primary/30 dark:bg-primary/20",
      destructive: "bg-destructive/30 dark:bg-destructive/20",
      secondary: "bg-foreground/10 dark:bg-foreground/10",
      outline: "bg-foreground/10 dark:bg-foreground/10",
    }

    if (hasBackdrop) {
      return (
        <span className="group/playful relative inline-flex">
          <span
            className={cn(
              "absolute inset-0 rounded-md transition-transform duration-200 translate-x-[3px] translate-y-[3px] -rotate-[0.5deg] group-hover/playful:-rotate-[1.5deg] group-hover/playful:scale-[1.01]",
              backdropColor[variant ?? "default"],
            )}
            aria-hidden="true"
          />
          <Comp
            className={cn(buttonVariants({ variant, size, className }), "relative rotate-[0.3deg]")}
            ref={ref}
            {...props}
          />
        </span>
      )
    }

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          mode === "smooth" && "rounded-full shadow-none",
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
