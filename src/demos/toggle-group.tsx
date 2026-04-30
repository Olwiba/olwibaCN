"use client";

import { useState } from "react";
import { Bold, Italic, Underline } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type ToggleGroupSize = "sm" | "default" | "lg";
type ToggleGroupVariant = "default" | "outline";
type ToggleGroupMode = "default" | "playful" | "smooth";

const sizes: ToggleGroupSize[] = ["default", "sm", "lg"];
const variants: ToggleGroupVariant[] = ["default", "outline"];
const modes: ToggleGroupMode[] = ["default", "playful", "smooth"];

function getToggleGroupUsageCode({
  size,
  variant,
  mode,
  disabled,
}: {
  size: ToggleGroupSize;
  variant: ToggleGroupVariant;
  mode: ToggleGroupMode;
  disabled: boolean;
}) {
  const props = [
    'type="multiple"',
    'defaultValue={["bold"]}',
    size !== "default" && `size="${size}"`,
    variant !== "default" && `variant="${variant}"`,
    mode !== "default" && `mode="${mode}"`,
    disabled && "disabled",
  ].filter(Boolean).join(" ");

  return `<ToggleGroup ${props}>
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <Bold />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <Italic />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle underline">
    <Underline />
  </ToggleGroupItem>
</ToggleGroup>`;
}

export default function ToggleGroupDemo() {
  const [size, setSize] = useState<ToggleGroupSize>("default");
  const [variant, setVariant] = useState<ToggleGroupVariant>("default");
  const [mode, setMode] = useState<ToggleGroupMode>("default");
  const [disabled, setDisabled] = useState(false);

  useUsageCode(getToggleGroupUsageCode({ size, variant, mode, disabled }));

  return (
    <>
      <ToggleGroup
        type="multiple"
        defaultValue={["bold"]}
        size={size}
        variant={variant}
        mode={mode === "default" ? undefined : mode}
        disabled={disabled}
      >
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline />
        </ToggleGroupItem>
      </ToggleGroup>

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
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="toggle-group-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="toggle-group-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
