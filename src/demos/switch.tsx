"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type SwitchSize = "sm" | "default" | "lg";

const sizes: SwitchSize[] = ["default", "sm", "lg"];

export default function SwitchDemo() {
  const [size, setSize] = useState<SwitchSize>("default");
  const [disabled, setDisabled] = useState(false);

  const usageProps = [
    size !== "default" && `size="${size}"`,
    disabled && "disabled",
  ].filter(Boolean).join(" ");
  useUsageCode(`<div className="flex items-center space-x-2">
  <Switch id="airplane-mode"${usageProps ? " " + usageProps : ""} />
  <Label htmlFor="airplane-mode"${disabled ? ' className="text-muted-foreground"' : ""}>Airplane Mode</Label>
</div>`);

  return (
    <>
      <div className="flex items-center space-x-2">
        <Switch
          id="airplane-mode"
          size={size}
          disabled={disabled}
        />
        <Label htmlFor="airplane-mode" className={disabled ? "text-muted-foreground" : ""}>
          Airplane Mode
        </Label>
      </div>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Size</span>
            <div className="flex gap-1.5">
              {sizes.map((value) => (
                <Button
                  key={value}
                  variant={size === value ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSize(value)}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="switch-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="switch-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
