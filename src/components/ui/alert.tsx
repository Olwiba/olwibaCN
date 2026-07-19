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
        info: "border-blue-100 bg-blue-50/50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-200 [&>svg]:text-blue-500",
        warning:
          "border-yellow-100 bg-yellow-50/50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-200 [&>svg]:text-yellow-500",
        tip: "border-emerald-100 bg-emerald-50/50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200 [&>svg]:text-emerald-500",
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
