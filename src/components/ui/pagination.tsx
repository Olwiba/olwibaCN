import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { UIVariantProvider, useUIVariant, type UIVariant } from "@/components/ui/ui-variant-context"

const Pagination = ({
  className,
  mode: modeProp,
  ...props
}: React.ComponentProps<"nav"> & {
  mode?: UIVariant
}) => {
  const mode = modeProp ?? useUIVariant()

  return (
    <UIVariantProvider mode={mode}>
      <nav
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
      />
    </UIVariantProvider>
  )
}
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
  disabled?: boolean
  mode?: UIVariant
  size?: "sm" | "default" | "lg" | "icon"
} & Omit<React.ComponentProps<"a">, "size">

type PaginationTextLinkProps = Omit<PaginationLinkProps, "size"> & {
  size?: "sm" | "default" | "lg"
}

const paginationLinkSizes = {
  sm: "h-9 w-9",
  default: "h-10 w-10",
  lg: "h-11 w-11 text-base",
  icon: "h-10 w-10",
}

const paginationTextLinkSizes = {
  sm: "h-9 px-3 text-sm",
  default: "h-10 px-4 py-2",
  lg: "h-11 px-5 text-base",
}

const PaginationLink = ({
  className,
  isActive,
  disabled = false,
  mode: modeProp,
  size = "default",
  ...props
}: PaginationLinkProps) => (
  <Button
    asChild
    variant={isActive ? "outline" : "ghost"}
    size="icon"
    mode={modeProp}
    className={cn(
      paginationLinkSizes[size],
      disabled && "pointer-events-none opacity-50",
      className
    )}
  >
    <a
      aria-current={isActive ? "page" : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : props.tabIndex}
      {...props}
    />
  </Button>
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  size = "default",
  ...props
}: PaginationTextLinkProps) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn(paginationTextLinkSizes[size], "w-auto gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  size = "default",
  ...props
}: PaginationTextLinkProps) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn(paginationTextLinkSizes[size], "w-auto gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
