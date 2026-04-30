"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type SliderSize = "sm" | "default" | "lg";

const sizes: SliderSize[] = ["default", "sm", "lg"];

export default function SliderDemo() {
  const [size, setSize] = useState<SliderSize>("default");
  const sizeAttr = size !== "default" ? ` size="${size}"` : "";

  useUsageCode(`<div className="w-[300px]">
  <Slider defaultValue={[50]} max={100} step={1}${sizeAttr} />
</div>`);

  return (
    <>
      <div className="w-[300px]">
        <Slider defaultValue={[50]} max={100} step={1} size={size} />
      </div>

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
        </div>
      </DemoControls>
    </>
  );
}
