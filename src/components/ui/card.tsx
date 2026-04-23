import * as React from "react"

import { cn } from "@/lib/utils"
import { UIVariantProvider, useUIVariant } from "./ui-variant-context"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: "playful" | "smooth"
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, mode: modeProp, ...props }, ref) => {
    const mode = modeProp ?? useUIVariant()
    if (mode === "playful") {
      return (
        <UIVariantProvider mode="playful">
          <div className="group/playful relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-lg bg-border transition-transform duration-200 translate-x-[5px] translate-y-[5px] -rotate-[0.5deg] group-hover/playful:-rotate-[1.5deg] group-hover/playful:translate-x-[6px] group-hover/playful:translate-y-[6px]"
            />
            <div
              ref={ref}
              className={cn(
                "relative rounded-lg border bg-card text-card-foreground shadow-sm rotate-[0.3deg]",
                className
              )}
              {...props}
            />
          </div>
        </UIVariantProvider>
      )
    }

    return (
      <UIVariantProvider mode={mode}>
        <div
          ref={ref}
          className={cn(
            "rounded-lg border bg-card text-card-foreground shadow-sm",
            mode === "smooth" && "rounded-3xl",
            className
          )}
          {...props}
        />
      </UIVariantProvider>
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
