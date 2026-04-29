"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type LabelSize = "sm" | "default" | "lg";

const sizes: LabelSize[] = ["default", "sm", "lg"];

export default function LabelDemo() {
  const [size, setSize] = useState<LabelSize>("default");
  const sizeAttr = size !== "default" ? ` size="${size}"` : "";

  useUsageCode(`<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email"${sizeAttr}>Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>`);

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email" size={size}>Email</Label>
        <Input type="email" id="email" placeholder="Email" />
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
