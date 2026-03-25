"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

type AvatarVariant = "playful" | "smooth"
type AvatarSize = "sm" | "default" | "lg"

const AvatarContext = React.createContext<{ variant?: AvatarVariant }>({})

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-8 w-8",
  default: "h-10 w-10",
  lg: "h-14 w-14",
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    variant?: AvatarVariant
    size?: AvatarSize
    disabled?: boolean
  }
>(({ className, variant, size = "default", disabled, ...props }, ref) => (
  <AvatarContext.Provider value={{ variant }}>
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        sizeClasses[size],
        variant === "smooth" && "ring-1 ring-border/50 shadow-sm",
        variant === "playful" && "ring-2 ring-primary/40 rotate-[3deg]",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    />
  </AvatarContext.Provider>
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-xs font-medium leading-none",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
