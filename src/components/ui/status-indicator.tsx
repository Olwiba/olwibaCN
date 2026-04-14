import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statusIndicatorDotVariants = cva(
  "relative inline-flex shrink-0 rounded-full bg-current",
  {
    variants: {
      tone: {
        default: "text-foreground",
        success: "text-primary",
        muted: "text-muted-foreground",
        destructive: "text-destructive",
      },
      size: {
        sm: "size-1.5",
        default: "size-2",
        lg: "size-2.5",
      },
    },
    defaultVariants: {
      tone: "default",
      size: "default",
    },
  }
)

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusIndicatorDotVariants> {
  pulse?: boolean
  dotClassName?: string
}

function StatusIndicator({
  className,
  dotClassName,
  tone,
  size,
  pulse = false,
  children,
  ...props
}: StatusIndicatorProps) {
  const hasAccessibleLabel =
    props["aria-label"] != null ||
    props["aria-labelledby"] != null ||
    React.Children.count(children) > 0

  return (
    <span
      data-slot="status-indicator"
      className={cn("inline-flex items-center gap-2", className)}
      aria-hidden={hasAccessibleLabel ? undefined : true}
      {...props}
    >
      <span
        data-slot="status-indicator-dot"
        className={cn(statusIndicatorDotVariants({ tone, size }), dotClassName)}
      >
        {pulse ? (
          <span
            data-slot="status-indicator-pulse"
            className="absolute inset-0 rounded-full bg-current opacity-70 animate-ping"
          />
        ) : null}
        <span className="relative block size-full rounded-full bg-current" />
      </span>
      {children ? (
        <span data-slot="status-indicator-label">{children}</span>
      ) : null}
    </span>
  )
}

export { StatusIndicator, statusIndicatorDotVariants }
