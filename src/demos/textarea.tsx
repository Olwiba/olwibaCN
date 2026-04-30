"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type Mode = "default" | "playful" | "smooth";
type TextareaSize = "sm" | "default" | "lg";

const modes: Mode[] = ["default", "playful", "smooth"];
const sizes: TextareaSize[] = ["default", "sm", "lg"];

export default function TextareaDemo() {
  const [size, setSize] = useState<TextareaSize>("default");
  const [mode, setMode] = useState<Mode>("default");
  const [disabled, setDisabled] = useState(false);

  const usageProps = [
    size !== "default" && `size="${size}"`,
    mode !== "default" && `mode="${mode}"`,
    disabled && "disabled",
  ].filter(Boolean).join(" ");
  useUsageCode(`<div className="w-[300px]">
  <Textarea${usageProps ? " " + usageProps : ""} placeholder="Type your message here." />
</div>`);

  return (
    <>
      <div className="w-[300px]">
        <Textarea
          placeholder="Type your message here."
          size={size}
          mode={mode === "default" ? undefined : mode}
          disabled={disabled}
        />
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
                <Switch id="textarea-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="textarea-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
