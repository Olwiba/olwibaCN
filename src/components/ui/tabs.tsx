import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import {
  UIVariantProvider,
  type UIVariant,
  useUIVariant,
} from "./ui-variant-context"

type TabsSize = "sm" | "default" | "lg"

interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  mode?: UIVariant
}

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  size?: TabsSize
}

const TabsSizeContext = React.createContext<TabsSize>("default")

const tabsListSizes: Record<TabsSize, string> = {
  sm: "h-8 p-1",
  default: "h-10 p-1",
  lg: "h-11 p-1",
}

const tabsTriggerSizes: Record<TabsSize, string> = {
  sm: "px-2.5 py-1 text-xs",
  default: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-sm",
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ mode: modeProp, ...props }, ref) => {
  const inheritedMode = useUIVariant()
  const mode = modeProp ?? inheritedMode

  return (
    <UIVariantProvider mode={mode}>
      <TabsPrimitive.Root ref={ref} {...props} />
    </UIVariantProvider>
  )
})
Tabs.displayName = TabsPrimitive.Root.displayName

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, size = "default", ...props }, ref) => {
  const mode = useUIVariant()

  return (
    <TabsSizeContext.Provider value={size}>
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md bg-muted text-muted-foreground",
          tabsListSizes[size],
          mode === "smooth" && "rounded-full",
          mode === "playful" &&
            "box-content overflow-visible rounded-lg bg-muted/70 pr-[7px] pb-[7px]",
          className
        )}
        {...props}
      />
    </TabsSizeContext.Provider>
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const size = React.useContext(TabsSizeContext)
  const mode = useUIVariant()

  const trigger = (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        tabsTriggerSizes[size],
        mode === "smooth" && "rounded-full data-[state=active]:shadow-none",
        mode === "playful" &&
          "z-10 w-full rounded-md data-[state=active]:shadow-none",
        className
      )}
      {...props}
    />
  )

  if (mode === "playful") {
    return (
      <span className="group/tabs-trigger relative inline-flex min-w-0">
        <span
          className="absolute inset-0 z-0 translate-x-[3px] translate-y-[3px] -rotate-[0.5deg] rounded-md bg-primary/25 opacity-0 transition-opacity duration-200 group-has-[button[data-state=active]]/tabs-trigger:opacity-100"
          aria-hidden="true"
        />
        {trigger}
      </span>
    )
  }

  return trigger
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
