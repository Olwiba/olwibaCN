"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/components/docs/ComponentPreview";

type StatusTone = "default" | "success" | "muted" | "destructive";
type StatusSize = "sm" | "default" | "lg";

const tones: StatusTone[] = ["default", "success", "muted", "destructive"];
const sizes: StatusSize[] = ["sm", "default", "lg"];

export default function StatusIndicatorDemo() {
  const [tone, setTone] = useState<StatusTone>("success");
  const [size, setSize] = useState<StatusSize>("default");
  const [pulse, setPulse] = useState(true);
  const [showLabel, setShowLabel] = useState(true);

  const usageProps = [
    tone !== "default" && `tone="${tone}"`,
    size !== "default" && `size="${size}"`,
    pulse && "pulse",
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
      <div className="flex flex-col items-center gap-4">
        <StatusIndicator
          tone={tone}
          size={size}
          pulse={pulse}
          aria-label={showLabel ? undefined : "Live status"}
          className="text-sm font-medium"
        >
          {showLabel ? "Operational" : null}
        </StatusIndicator>
        <div className="flex items-center gap-4 rounded-md border px-3 py-2 text-xs text-muted-foreground">
          <StatusIndicator tone={tone} size={size} pulse={pulse} aria-label="Decorative example" />
          <span>Dot only</span>
        </div>
      </div>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Tone</span>
            <div className="flex gap-1.5">
              {tones.map((value) => (
                <Button
                  key={value}
                  variant={tone === value ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setTone(value)}
                >
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Button>
              ))}
            </div>
          </div>

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
                  {value === "default" ? "Default" : value.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Switch id="status-pulse" checked={pulse} onCheckedChange={setPulse} />
                <Label htmlFor="status-pulse" className="text-xs">Pulse</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="status-label" checked={showLabel} onCheckedChange={setShowLabel} />
                <Label htmlFor="status-label" className="text-xs">Visible label</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
