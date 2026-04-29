import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { UIVariantProvider, useUIVariant, type UIVariant } from "@/components/ui/ui-variant-context"

function ItemGroup({
  className,
  mode: modeProp,
  ...props
}: React.ComponentProps<"div"> & {
  mode?: UIVariant
}) {
  const mode = modeProp ?? useUIVariant()

  if (mode === "playful") {
    return (
      <UIVariantProvider mode="playful">
        <div className="grid w-fit max-w-full">
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none col-start-1 row-start-1 rounded-lg bg-foreground/10",
              "translate-x-[4px] translate-y-[4px] -rotate-[0.6deg]"
            )}
          />
          <div
            role="list"
            data-slot="item-group"
            className={cn(
              "group/item-group relative col-start-1 row-start-1 flex flex-col bg-fd-background",
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
        role="list"
        data-slot="item-group"
        className={cn(
          "group/item-group flex flex-col",
          className,
          mode === "smooth" && "rounded-2xl shadow-sm"
        )}
        {...props}
      />
    </UIVariantProvider>
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "group/item [a]:hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 [a]:transition-colors flex flex-wrap items-center rounded-md border border-transparent text-sm outline-none transition-colors duration-100 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50",
      },
      size: {
        default: "gap-4 p-4 ",
        sm: "gap-2.5 px-4 py-3",
        lg: "gap-5 p-5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Item({
  className,
  variant = "default",
  size = "default",
  mode: modeProp,
  disabled = false,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & {
    mode?: UIVariant
    disabled?: boolean
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "div"
  const mode = modeProp ?? useUIVariant()

  return (
    <UIVariantProvider mode={mode}>
      <Comp
        data-slot="item"
        data-variant={variant}
        data-size={size}
        data-disabled={disabled ? "true" : undefined}
        aria-disabled={disabled || undefined}
        className={cn(
          itemVariants({ variant, size }),
          mode === "smooth" && "rounded-xl",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      />
    </UIVariantProvider>
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted size-8 rounded-sm border [&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  const mode = useUIVariant()

  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(
        itemMediaVariants({ variant }),
        mode === "smooth" && variant !== "default" && "rounded-lg",
        className
      )}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "flex w-fit items-center gap-2 text-sm font-medium leading-snug",
        className
      )}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "text-muted-foreground line-clamp-2 text-balance text-sm font-normal leading-normal",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
