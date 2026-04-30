import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statusIndicatorDotVariants = cva(
  "relative inline-flex shrink-0 rounded-full bg-current text-primary",
  {
    variants: {
      size: {
        sm: "size-1.5",
        default: "size-2",
        lg: "size-2.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusIndicatorDotVariants> {
  pulse?: boolean
  disabled?: boolean
  dotClassName?: string
}

function StatusIndicator({
  className,
  dotClassName,
  color,
  size,
  pulse = false,
  disabled = false,
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
      data-disabled={disabled ? true : undefined}
      aria-disabled={disabled ? true : undefined}
      className={cn(
        "inline-flex items-center gap-2 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className
      )}
      aria-hidden={hasAccessibleLabel ? undefined : true}
      {...props}
    >
      <span
        data-slot="status-indicator-dot"
        className={cn(statusIndicatorDotVariants({ size }), dotClassName)}
        style={color ? { color } : undefined}
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
