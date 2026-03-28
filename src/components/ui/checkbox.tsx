import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  mode?: "playful" | "smooth"
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, mode, ...props }, ref) => {
  if (mode === "playful") {
    return (
      <span className="group/playful relative inline-flex">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-sm bg-primary/30 dark:bg-primary/20 transition-transform duration-200 translate-x-[2px] translate-y-[2px] -rotate-[3deg] group-hover/playful:-rotate-[5deg]"
        />
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(
            "relative grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground rotate-[1.5deg]",
            className
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator className={cn("grid place-content-center text-current")}>
            <Check className="h-4 w-4" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
      </span>
    )
  }

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        mode === "smooth" && "rounded-md",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn("grid place-content-center text-current")}>
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
