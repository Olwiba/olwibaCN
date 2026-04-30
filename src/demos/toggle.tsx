"use client";

import { useState } from "react";
import { Italic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type ToggleSize = "sm" | "default" | "lg";
type ToggleVariant = "default" | "outline";
type ToggleMode = "default" | "playful" | "smooth";

const sizes: ToggleSize[] = ["default", "sm", "lg"];
const variants: ToggleVariant[] = ["default", "outline"];
const modes: ToggleMode[] = ["default", "playful", "smooth"];

function getToggleUsageCode({
  size,
  variant,
  mode,
  disabled,
}: {
  size: ToggleSize;
  variant: ToggleVariant;
  mode: ToggleMode;
  disabled: boolean;
}) {
  const props = [
    size !== "default" && `size="${size}"`,
    variant !== "default" && `variant="${variant}"`,
    mode !== "default" && `mode="${mode}"`,
    disabled && "disabled",
  ].filter(Boolean).join(" ");

  return `<Toggle ${props}>
  <Italic />
  Italic
</Toggle>`;
}

export default function ToggleDemo() {
  const [size, setSize] = useState<ToggleSize>("default");
  const [variant, setVariant] = useState<ToggleVariant>("default");
  const [mode, setMode] = useState<ToggleMode>("default");
  const [disabled, setDisabled] = useState(false);

  useUsageCode(getToggleUsageCode({ size, variant, mode, disabled }));

  return (
    <>
      <Toggle
        defaultPressed
        size={size}
        variant={variant}
        mode={mode === "default" ? undefined : mode}
        disabled={disabled}
      >
        <Italic />
        Italic
      </Toggle>

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
            <span className="text-xs font-medium text-fd-muted-foreground">Variant</span>
            <div className="flex gap-1.5">
              {variants.map((value) => (
                <Button
                  key={value}
                  variant={variant === value ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setVariant(value)}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Mode</span>
            <div className="flex gap-1.5">
              {modes.map((value) => (
                <Button
                  key={value}
                  variant={mode === value ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setMode(value)}
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
                <Switch id="toggle-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="toggle-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
