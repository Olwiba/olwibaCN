"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type CarouselMode = "default" | "playful" | "smooth";
type CarouselSize = "default" | "sm" | "lg";

const sizes: CarouselSize[] = ["default", "sm", "lg"];
const modes: CarouselMode[] = ["default", "playful", "smooth"];

export default function CarouselDemo() {
  const [size, setSize] = useState<CarouselSize>("default");
  const [mode, setMode] = useState<CarouselMode>("default");
  const [disabled, setDisabled] = useState(false);

  const resolvedMode = mode === "default" ? undefined : mode as "playful" | "smooth";

  const usageProps = [
    size !== "default" && `size="${size}"`,
    resolvedMode && `mode="${resolvedMode}"`,
    disabled && "disabled",
  ].filter(Boolean).join(" ");
  useUsageCode(`<Carousel${usageProps ? " " + usageProps : ""} className="w-full max-w-xs">\n  <CarouselContent>\n    {items.map((item, index) => (\n      <CarouselItem key={index}>\n        <Card>\n          <CardContent className="flex aspect-square items-center justify-center p-6">\n            <span className="text-4xl font-semibold">{item}</span>\n          </CardContent>\n        </Card>\n      </CarouselItem>\n    ))}\n  </CarouselContent>\n  <CarouselPrevious />\n  <CarouselNext />\n</Carousel>`);

  return (
    <>
      <Carousel size={size} mode={resolvedMode} disabled={disabled} className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Size</span>
            <div className="flex gap-1.5">
              {sizes.map((s) => (
                <Button
                  key={s}
                  variant={size === s ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSize(s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Mode</span>
            <div className="flex gap-1.5">
              {modes.map((m) => (
                <Button
                  key={m}
                  variant={mode === m ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setMode(m)}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="carousel-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="carousel-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
