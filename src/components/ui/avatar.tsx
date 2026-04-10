"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"
import { useUIVariant } from "./ui-variant-context"

type AvatarMode = "playful" | "smooth"
type AvatarSize = "sm" | "default" | "lg"

const AvatarContext = React.createContext<{ mode?: AvatarMode }>({})

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-8 w-8",
  default: "h-10 w-10",
  lg: "h-14 w-14",
}

const blobKeyframes = `
  @keyframes avatar-blob-1 {
    0%   { border-radius: 52% 48% 51% 49% / 50% 52% 48% 50%; transform: rotate(0deg)   scale(0.82); }
    12%  { border-radius: 56% 44% 54% 46% / 46% 56% 45% 55%; transform: rotate(43deg)   scale(0.88); }
    25%  { border-radius: 64% 36% 60% 40% / 40% 62% 42% 58%; transform: rotate(90deg)   scale(1.00); }
    38%  { border-radius: 56% 44% 54% 46% / 46% 55% 45% 55%; transform: rotate(137deg)  scale(0.88); }
    50%  { border-radius: 52% 48% 51% 49% / 50% 52% 48% 50%; transform: rotate(180deg)  scale(0.82); }
    65%  { border-radius: 54% 46% 53% 47% / 48% 54% 46% 54%; transform: rotate(234deg)  scale(0.85); }
    78%  { border-radius: 60% 40% 58% 42% / 42% 60% 44% 56%; transform: rotate(281deg)  scale(0.97); }
    90%  { border-radius: 54% 46% 52% 48% / 47% 54% 46% 54%; transform: rotate(324deg)  scale(0.85); }
    100% { border-radius: 52% 48% 51% 49% / 50% 52% 48% 50%; transform: rotate(360deg)  scale(0.82); }
  }
  @keyframes avatar-blob-2 {
    0%   { border-radius: 50% 50% 53% 47% / 48% 52% 50% 50%; transform: rotate(0deg)   scale(0.84); }
    18%  { border-radius: 54% 46% 57% 43% / 44% 56% 46% 54%; transform: rotate(-58deg)  scale(0.91); }
    32%  { border-radius: 44% 56% 63% 37% / 58% 42% 40% 60%; transform: rotate(-103deg) scale(1.00); }
    46%  { border-radius: 53% 47% 56% 44% / 45% 55% 46% 54%; transform: rotate(-148deg) scale(0.90); }
    58%  { border-radius: 50% 50% 52% 48% / 49% 51% 50% 50%; transform: rotate(-186deg) scale(0.83); }
    78%  { border-radius: 52% 48% 54% 46% / 47% 53% 48% 52%; transform: rotate(-250deg) scale(0.83); }
    100% { border-radius: 50% 50% 53% 47% / 48% 52% 50% 50%; transform: rotate(-360deg) scale(0.84); }
  }
  @keyframes avatar-blob-3 {
    0%   { border-radius: 51% 49% 50% 50% / 52% 48% 51% 49%; transform: rotate(0deg)   scale(0.83); }
    22%  { border-radius: 51% 49% 52% 48% / 51% 49% 52% 48%; transform: rotate(79deg)   scale(0.83); }
    42%  { border-radius: 55% 45% 57% 43% / 46% 54% 47% 53%; transform: rotate(151deg)  scale(0.88); }
    58%  { border-radius: 62% 38% 65% 35% / 38% 62% 42% 58%; transform: rotate(209deg)  scale(1.00); }
    72%  { border-radius: 55% 45% 57% 43% / 46% 54% 47% 53%; transform: rotate(259deg)  scale(0.88); }
    86%  { border-radius: 52% 48% 51% 49% / 51% 49% 52% 48%; transform: rotate(310deg)  scale(0.83); }
    100% { border-radius: 51% 49% 50% 50% / 52% 48% 51% 49%; transform: rotate(360deg)  scale(0.83); }
  }
`

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    mode?: AvatarMode
    size?: AvatarSize
    disabled?: boolean
  }
>(({ className, mode: modeProp, size = "default", disabled, ...props }, ref) => {
  const mode = (modeProp ?? useUIVariant()) as AvatarMode | undefined
  if (mode === "playful") {
    return (
      <AvatarContext.Provider value={{ mode }}>
        <div className={cn("relative overflow-visible", sizeClasses[size], disabled && "opacity-50 pointer-events-none")}>
          <style dangerouslySetInnerHTML={{ __html: blobKeyframes }} />
          <div
            className="absolute opacity-[0.22]"
            style={{ inset: "-3px", background: "var(--primary)", animation: "avatar-blob-1 9s ease-in-out infinite", animationDelay: "-2s" }}
          />
          <div
            className="absolute opacity-[0.16]"
            style={{ inset: "-3px", background: "var(--primary)", animation: "avatar-blob-2 13s ease-in-out infinite", animationDelay: "-6s" }}
          />
          <div
            className="absolute opacity-[0.10]"
            style={{ inset: "-3px", background: "var(--primary)", animation: "avatar-blob-3 17s ease-in-out infinite", animationDelay: "-11s" }}
          />
          <AvatarPrimitive.Root
            ref={ref}
            className={cn(
              "relative z-10 flex shrink-0 overflow-hidden rounded-full",
              sizeClasses[size],
              className
            )}
            {...props}
          />
        </div>
      </AvatarContext.Provider>
    )
  }

  return (
    <AvatarContext.Provider value={{ mode }}>
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-xl",
          sizeClasses[size],
          mode === "smooth" && "rounded-full ring-1 ring-border/50 shadow-sm",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        {...props}
      />
    </AvatarContext.Provider>
  )
})
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
>(({ className, ...props }, ref) => {
  const { mode } = React.useContext(AvatarContext)
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-xl bg-muted text-xs font-medium leading-none",
        (mode === "smooth" || mode === "playful") && "rounded-full",
        className
      )}
      {...props}
    />
  )
})
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
