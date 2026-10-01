import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useUIVariant } from "./ui-variant-context"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        info: "border-info-border bg-info-surface text-info-foreground [&>svg]:text-info",
        warning:
          "border-warning-border bg-warning-surface text-warning-foreground [&>svg]:text-warning",
        attention:
          "border-attention-border bg-attention-surface text-attention-foreground [&>svg]:text-attention",
        success:
          "border-success-border bg-success-surface text-success-foreground [&>svg]:text-success",
        tip: "border-success-border bg-success-surface text-success-foreground [&>svg]:text-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type AlertMode = "playful" | "smooth"
type AlertSize = "sm" | "default" | "lg"

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof alertVariants> & {
      mode?: AlertMode
      size?: AlertSize
      disabled?: boolean
    }
>(({ className, variant, mode: modeProp, size, disabled, ...props }, ref) => {
  const mode = modeProp ?? useUIVariant()

  return (
  <div
    ref={ref}
    role="alert"
    className={cn(
      alertVariants({ variant }),
      size === "sm" && "p-3 text-xs [&>svg]:top-3 [&>svg]:left-3",
      size === "lg" && "p-6 text-base [&>svg]:top-6 [&>svg]:left-6",
      mode === "smooth" && "rounded-2xl",
      mode === "playful" && "border-l-4",
      disabled && "opacity-50 pointer-events-none",
      className,
    )}
    {...props}
  />
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
