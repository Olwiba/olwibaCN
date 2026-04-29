"use client"

import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import { cn } from "@/lib/utils"

type ToasterProps = React.ComponentProps<typeof Sonner>
type ToasterMode = "playful" | "smooth"

const Toaster = ({ mode, className, style, ...props }: ToasterProps & { mode?: ToasterMode }) => {
  const { theme = "system" } = useTheme()

  return (
    <>
      {mode === "smooth" && (
        <style>{`[data-sonner-toaster].toaster-smooth { --border-radius: 1.5rem; }`}</style>
      )}
      {mode === "playful" && (
        <style>{`
          [data-sonner-toaster].toaster-playful [data-sonner-toast][data-mounted=true] {
            transform: var(--y) rotate(0.3deg);
            filter: drop-shadow(4px 4px 0 var(--border));
          }
          [data-sonner-toaster].toaster-playful [data-sonner-toast][data-mounted=true]:nth-child(even) {
            transform: var(--y) rotate(-0.3deg);
          }
        `}</style>
      )}
      <Sonner
        theme={theme as ToasterProps["theme"]}
        className={cn("toaster group", mode && `toaster-${mode}`, className)}
        style={{ zIndex: 9999999, ...style }}
        icons={{
          success: <CircleCheck className="h-4 w-4" />,
          info: <Info className="h-4 w-4" />,
          warning: <TriangleAlert className="h-4 w-4" />,
          error: <OctagonX className="h-4 w-4" />,
          loading: <LoaderCircle className="h-4 w-4 animate-spin" />,
        }}
        toastOptions={{
          classNames: {
            toast: cn(
              "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            ),
            description: "group-[.toast]:text-muted-foreground",
            actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          },
        }}
        {...props}
      />
    </>
  )
}

export { Toaster }
