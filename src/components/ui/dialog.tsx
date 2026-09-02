"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { UIVariantProvider, useUIVariant } from "@/components/ui/ui-variant-context"
import { glassSurface } from "@/components/ui/glass"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

type DialogMode = "playful" | "smooth" | "glass"
type DialogPresentation = "default" | "form"

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  mode?: DialogMode
  /**
   * Geometry for the interaction being presented.
   *
   * `form` keeps substantial content inset, top-aligned, viewport-constrained,
   * and internally scrollable on compact screens. It returns to the standard
   * centred dialog geometry from `sm` upward.
   */
  presentation?: DialogPresentation
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, mode: modeProp, presentation = "default", children, ...props }, ref) => {
  const mode = modeProp ?? useUIVariant()

  return (
  <DialogPortal>
    {/* Glass content blurs whatever sits behind it — a nearly opaque black
        overlay would frost to a flat dark pane, so lighten it in glass. */}
    <DialogOverlay className={mode === "glass" ? "bg-black/40" : undefined} />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] z-50 grid translate-x-[-50%] gap-4 border bg-background duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-full data-[state=open]:slide-in-from-top-full",
        presentation === "default" &&
          "top-[50%] w-full max-w-lg translate-y-[-50%] p-6",
        presentation === "form" &&
          "top-4 max-h-[calc(100dvh-2rem)] w-[calc(100vw-1rem)] max-w-lg translate-y-0 overflow-y-auto rounded-lg p-4 pb-6 sm:top-[50%] sm:max-h-[85dvh] sm:w-full sm:translate-y-[-50%] sm:p-6",
        !mode && "shadow-lg sm:rounded-lg",
        mode === "smooth" && "rounded-2xl shadow-xl",
        mode === "playful" && "rounded-xl border-2 shadow-lg shadow-primary/10",
        mode === "glass" && cn(glassSurface, "rounded-2xl"),
        className
      )}
      {...props}
    >
      <UIVariantProvider mode={mode}>
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </UIVariantProvider>
    </DialogPrimitive.Content>
  </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  type DialogContentProps,
  type DialogPresentation,
}
