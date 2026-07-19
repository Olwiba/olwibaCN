"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { UIVariantProvider, useUIVariant } from "@/components/ui/ui-variant-context"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]
type CarouselSize = "sm" | "default" | "lg"

const navDim: Record<CarouselSize, string> = {
  sm: "h-6 w-6",
  default: "h-8 w-8",
  lg: "h-10 w-10",
}

const navOffset: Record<CarouselSize, { prevH: string; nextH: string; prevV: string; nextV: string }> = {
  sm:      { prevH: "-left-9",  nextH: "-right-9",  prevV: "-top-9",  nextV: "-bottom-9"  },
  default: { prevH: "-left-12", nextH: "-right-12", prevV: "-top-12", nextV: "-bottom-12" },
  lg:      { prevH: "-left-14", nextH: "-right-14", prevV: "-top-14", nextV: "-bottom-14" },
}

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
  mode?: "playful" | "smooth" | "glass"
  size?: CarouselSize
  disabled?: boolean
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  mode?: "playful" | "smooth" | "glass"
  carouselSize: CarouselSize
  disabled?: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error("useCarousel must be used within a <Carousel />")
  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      mode: modeProp,
      size = "default",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const mode = modeProp ?? useUIVariant()

    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => { api?.scrollPrev() }, [api])
    const scrollNext = React.useCallback(() => { api?.scrollNext() }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); scrollPrev() }
        else if (event.key === "ArrowRight") { event.preventDefault(); scrollNext() }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) return
      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) return
      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)
      return () => { api?.off("select", onSelect) }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef, api, opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev, scrollNext, canScrollPrev, canScrollNext,
          mode, carouselSize: size, disabled,
        }}
      >
        <UIVariantProvider mode={mode}>
          <div
            ref={ref}
            onKeyDownCapture={handleKeyDown}
            className={cn("relative", disabled && "opacity-50 pointer-events-none", className)}
            role="region"
            aria-roledescription="carousel"
            {...props}
          >
            {children}
          </div>
        </UIVariantProvider>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev, mode, carouselSize } = useCarousel()

  const dim = navDim[carouselSize]
  const posH = `${navOffset[carouselSize].prevH} top-1/2 -translate-y-1/2`
  const posV = `${navOffset[carouselSize].prevV} left-1/2 -translate-x-1/2 rotate-90`
  const position = orientation === "horizontal" ? posH : posV

  if (mode === "playful") {
    return (
      <span className={cn("group/playful absolute", dim, position)}>
        <span
          className="absolute inset-0 rounded-md bg-border translate-x-[3px] translate-y-[3px] -rotate-[0.5deg] transition-transform duration-200 group-hover/playful:-rotate-[1.5deg] group-hover/playful:translate-x-[4px] group-hover/playful:translate-y-[4px]"
          aria-hidden
        />
        <UIVariantProvider mode={undefined}>
          <Button
            ref={ref}
            variant={variant}
            size={size}
            className={cn("relative h-full w-full rotate-[0.3deg]", className)}
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            {...props}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
        </UIVariantProvider>
      </span>
    )
  }

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      mode={mode === "smooth" ? "smooth" : undefined}
      className={cn(
        "absolute",
        dim,
        mode === "smooth" && "rounded-full",
        position,
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext, mode, carouselSize } = useCarousel()

  const dim = navDim[carouselSize]
  const posH = `${navOffset[carouselSize].nextH} top-1/2 -translate-y-1/2`
  const posV = `${navOffset[carouselSize].nextV} left-1/2 -translate-x-1/2 rotate-90`
  const position = orientation === "horizontal" ? posH : posV

  if (mode === "playful") {
    return (
      <span className={cn("group/playful absolute", dim, position)}>
        <span
          className="absolute inset-0 rounded-md bg-border translate-x-[3px] translate-y-[3px] -rotate-[0.5deg] transition-transform duration-200 group-hover/playful:-rotate-[1.5deg] group-hover/playful:translate-x-[4px] group-hover/playful:translate-y-[4px]"
          aria-hidden
        />
        <UIVariantProvider mode={undefined}>
          <Button
            ref={ref}
            variant={variant}
            size={size}
            className={cn("relative h-full w-full rotate-[0.3deg]", className)}
            disabled={!canScrollNext}
            onClick={scrollNext}
            {...props}
          >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
        </UIVariantProvider>
      </span>
    )
  }

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      mode={mode === "smooth" ? "smooth" : undefined}
      className={cn(
        "absolute",
        dim,
        mode === "smooth" && "rounded-full",
        position,
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
