"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"
import { UIVariantProvider, useUIVariant } from "@/components/ui/ui-variant-context"

type HoverCardMode = "playful" | "smooth"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> & { mode?: HoverCardMode }
>(({ className, align = "center", sideOffset = 4, mode: modeProp, children, ...props }, ref) => {
  const inheritedMode = useUIVariant()
  const mode = modeProp ?? inheritedMode

  return (
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-64 border bg-popover p-4 text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-hover-card-content-transform-origin]",
        !mode && "rounded-md shadow-md",
        mode === "smooth" && "rounded-2xl shadow-xl",
        mode === "playful" && "rounded-xl border-2 shadow-lg shadow-primary/10",
        className
      )}
      {...props}
    >
      <UIVariantProvider mode={mode}>
        {children}
      </UIVariantProvider>
    </HoverCardPrimitive.Content>
  )
})
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
