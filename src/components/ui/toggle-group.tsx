"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"
import {
  UIVariantProvider,
  type UIVariant,
  useUIVariant,
} from "./ui-variant-context"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & { mode?: UIVariant }
>({
  size: "default",
  variant: "default",
})

type ToggleGroupProps =
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants> & {
      mode?: UIVariant
    }

type ToggleGroupItemProps =
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants> & {
      mode?: UIVariant
    }

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ className, variant, size, mode: modeProp, children, ...props }, ref) => {
  const inheritedMode = useUIVariant()
  const mode = modeProp ?? inheritedMode

  return (
    <UIVariantProvider mode={mode}>
      <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn("flex items-center justify-center gap-1", className)}
        {...props}
      >
        <ToggleGroupContext.Provider value={{ variant, size, mode }}>
          {children}
        </ToggleGroupContext.Provider>
      </ToggleGroupPrimitive.Root>
    </UIVariantProvider>
  )
})

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, children, variant, size, mode: modeProp, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)
  const inheritedMode = useUIVariant()
  const mode = modeProp ?? context.mode ?? inheritedMode
  const item = (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        mode === "smooth" && "rounded-full",
        mode === "playful" &&
          "relative z-10 rounded-md data-[state=on]:shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )

  if (mode === "playful") {
    return (
      <span className="group/toggle-group-item relative inline-flex [&:nth-child(even)>span:first-child]:rotate-[1.5deg] [&:nth-child(odd)>span:first-child]:-rotate-[1.5deg]">
        <span
          aria-hidden="true"
          className="absolute inset-0 z-0 origin-center translate-x-[3px] translate-y-[3px] rounded-md bg-primary/30 opacity-0 transition-[opacity,transform] duration-200 group-has-[button[data-state=on]]/toggle-group-item:opacity-100"
        />
        {item}
      </span>
    )
  }

  return item
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
