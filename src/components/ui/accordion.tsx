import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

type AccordionMode = "playful" | "smooth"
type AccordionSize = "sm" | "default"

const AccordionContext = React.createContext<{ mode?: AccordionMode; size?: AccordionSize }>({})

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
    mode?: AccordionMode
    size?: AccordionSize
  }
>(({ mode, size, ...props }, ref) => (
  <AccordionContext.Provider value={{ mode, size }}>
    <AccordionPrimitive.Root ref={ref} {...props} />
  </AccordionContext.Provider>
))
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const { mode } = React.useContext(AccordionContext)
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        !mode && "border-b",
        mode === "smooth" && "rounded-xl border bg-card mb-2 last:mb-0",
        mode === "playful" && "border-b border-l-4 border-l-primary/40",
        "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const { mode, size } = React.useContext(AccordionContext)
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between font-medium transition-all [&[data-state=open]>svg]:rotate-180",
          size === "sm" ? "py-2" : "py-4",
          !mode && "hover:underline",
          mode === "smooth" && "px-4 hover:opacity-70",
          mode === "playful" && "pl-4 hover:underline",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          mode === "smooth" && "mr-4",
        )} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { mode, size } = React.useContext(AccordionContext)
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn(
        size === "sm" ? "pb-2 pt-0" : "pb-4 pt-0",
        mode === "smooth" && "px-4",
        mode === "playful" && "pl-4",
        className,
      )}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
})
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
