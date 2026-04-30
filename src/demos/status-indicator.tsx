"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";
import { cn } from "@/lib/utils";

type StatusSize = "sm" | "default" | "lg";

const sizes: StatusSize[] = ["default", "sm", "lg"];

type ColorPreset = {
  label: string;
  swatch: string;
  color?: string;
};

const colorPresets: ColorPreset[] = [
  { label: "Primary", swatch: "var(--primary)" },
  { label: "Red", swatch: "#ef4444", color: "#ef4444" },
  { label: "Orange", swatch: "#f97316", color: "#f97316" },
  { label: "Yellow", swatch: "#eab308", color: "#eab308" },
  { label: "Green", swatch: "#22c55e", color: "#22c55e" },
  { label: "Blue", swatch: "#3b82f6", color: "#3b82f6" },
  { label: "Purple", swatch: "#a855f7", color: "#a855f7" },
  { label: "Pink", swatch: "#ec4899", color: "#ec4899" },
];

export default function StatusIndicatorDemo() {
  const [size, setSize] = useState<StatusSize>("default");
  const [colorIndex, setColorIndex] = useState(0);
  const [pulse, setPulse] = useState(true);
  const [showLabel, setShowLabel] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const colorPreset = colorPresets[colorIndex];

  const usageProps = [
    colorPreset.color && `color="${colorPreset.color}"`,
    size !== "default" && `size="${size}"`,
    pulse && "pulse",
    disabled && "disabled",
    !showLabel && 'aria-label="Live status"',
  ]
    .filter(Boolean)
    .join(" ");

  useUsageCode(
    showLabel
      ? `<StatusIndicator${usageProps ? " " + usageProps : ""}>Operational</StatusIndicator>`
      : `<StatusIndicator${usageProps ? " " + usageProps : ""} />`
  );

  return (
    <>
      <div className="flex items-center gap-4">
        <StatusIndicator
          color={colorPreset.color}
          size={size}
          pulse={pulse}
          disabled={disabled}
          aria-label={showLabel ? undefined : "Live status"}
          className="text-sm font-medium"
        >
          {showLabel ? "Operational" : null}
        </StatusIndicator>
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
            <span className="text-xs font-medium text-fd-muted-foreground">Color</span>
            <TooltipProvider delayDuration={150}>
              <div className="flex h-9 items-center gap-1.5">
                {colorPresets.map((preset, index) => (
                  <Tooltip key={preset.label}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => setColorIndex(index)}
                        className={cn(
                          "h-6 w-6 rounded-full border-2 transition-all",
                          colorIndex === index
                            ? "scale-110 border-foreground"
                            : "border-transparent hover:border-muted-foreground/50"
                        )}
                        style={{ background: preset.swatch }}
                        aria-label={preset.label}
                      />
                    </TooltipTrigger>
                    <TooltipContent>{preset.label}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex min-h-9 flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-2">
                <Switch id="status-pulse" checked={pulse} onCheckedChange={setPulse} />
                <Label htmlFor="status-pulse" className="text-xs">Pulse</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="status-label" checked={showLabel} onCheckedChange={setShowLabel} />
                <Label htmlFor="status-label" className="text-xs">Visible label</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="status-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="status-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
