"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { DemoControls, useUsageCode } from "@/components/docs/ComponentPreview";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type CalendarSize = "default" | "sm" | "lg";
type CalendarMode = "default" | "playful" | "smooth";

const sizes: CalendarSize[] = ["default", "sm", "lg"];
const modes: CalendarMode[] = ["default", "playful", "smooth"];

export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [size, setSize] = React.useState<CalendarSize>("default");
  const [mode, setMode] = React.useState<CalendarMode>("default");
  const [disabled, setDisabled] = React.useState(false);

  const resolvedUIMode = mode === "default" ? undefined : mode as "playful" | "smooth";

  const usageProps = [
    size !== "default" && `size="${size}"`,
    resolvedUIMode && `uiMode="${resolvedUIMode}"`,
    disabled && "disabled",
  ].filter(Boolean).join("\n  ");
  useUsageCode(`<Calendar\n  mode="single"\n  selected={date}\n  onSelect={setDate}${usageProps ? "\n  " + usageProps : ""}\n/>`);

  return (
    <>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        size={size}
        uiMode={resolvedUIMode}
        disabled={disabled}
      />

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
                <Switch id="calendar-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="calendar-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
