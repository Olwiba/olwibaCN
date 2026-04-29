"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

export default function ProgressDemo() {
  const [value, setValue] = useState(66);
  const [disabled, setDisabled] = useState(false);

  useUsageCode(`<div className="w-[300px]">
  <Progress value={${value}} aria-label="Upload progress"${disabled ? " disabled" : ""} />
</div>`);

  return (
    <>
      <div className="w-[300px]">
        <Progress value={value} aria-label="Upload progress" disabled={disabled} />
      </div>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="w-56 space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Value</span>
            <div className="flex h-9 items-center gap-3">
              <Slider
                aria-label="Progress value"
                value={[value]}
                max={100}
                step={1}
                onValueChange={([nextValue]) => setValue(nextValue ?? 0)}
              />
              <span className="w-9 shrink-0 text-right text-xs tabular-nums text-fd-muted-foreground">
                {value}%
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="progress-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="progress-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
