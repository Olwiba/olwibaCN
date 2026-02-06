"use client";

import { useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { DemoControls } from "@/components/docs/ComponentPreview";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

const variants: NonNullable<ButtonProps["variant"]>[] = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
];

const sizes: NonNullable<ButtonProps["size"]>[] = [
  "default",
  "sm",
  "lg",
  "icon",
];

export default function ButtonDemo() {
  const [size, setSize] = useState<ButtonProps["size"]>("default");
  const [playful, setPlayful] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        {variants.map((v) => (
          <Button
            key={v}
            variant={v}
            size={size}
            playful={playful}
            disabled={disabled}
          >
            {size === "icon" ? <Mail /> : v.charAt(0).toUpperCase() + v.slice(1)}
          </Button>
        ))}
      </div>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Size</span>
            <div className="flex gap-1.5">
              {sizes.map((s) => (
                <Button
                  key={s}
                  variant={size === s ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSize(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="playful"
                  checked={playful}
                  onCheckedChange={setPlayful}
                />
                <Label htmlFor="playful" className="text-xs">Playful</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="disabled"
                  checked={disabled}
                  onCheckedChange={setDisabled}
                />
                <Label htmlFor="disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
