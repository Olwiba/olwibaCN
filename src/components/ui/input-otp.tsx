import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"
import { UIVariantProvider, useUIVariant } from "./ui-variant-context"

type InputOTPSize = "sm" | "default" | "lg"

const InputOTPSizeContext = React.createContext<InputOTPSize>("default")

function useInputOTPSize() {
  return React.useContext(InputOTPSizeContext)
}

export type InputOTPProps = Omit<React.ComponentPropsWithoutRef<typeof OTPInput>, "size"> & {
  mode?: "playful" | "smooth"
  size?: InputOTPSize
}

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  InputOTPProps
>(({ className, containerClassName, mode, size = "default", ...props }, ref) => {
  const otpInputProps = props as React.ComponentPropsWithoutRef<typeof OTPInput>

  return (
    <UIVariantProvider mode={mode}>
      <InputOTPSizeContext.Provider value={size}>
        <OTPInput
          ref={ref}
          containerClassName={cn(
            "flex items-center gap-2 has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50",
            mode === "playful" && "rotate-[0.3deg]",
            containerClassName
          )}
          className={cn("disabled:cursor-not-allowed", className)}
          {...otpInputProps}
        />
      </InputOTPSizeContext.Provider>
    </UIVariantProvider>
  )
})
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]
  const mode = useUIVariant()
  const size = useInputOTPSize()

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center justify-center border-y border-r border-input text-sm transition-all first:border-l",
        size === "sm" && "h-8 w-8 text-xs",
        size === "default" && "h-10 w-10 text-sm",
        size === "lg" && "h-12 w-12 text-base",
        mode === "smooth" ? "first:rounded-l-xl last:rounded-r-xl" : "first:rounded-l-md last:rounded-r-md",
        mode === "playful" && "[box-shadow:3px_3px_0px_0px_color-mix(in_srgb,currentColor_12%,transparent)]",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
