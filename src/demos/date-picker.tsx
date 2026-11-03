"use client";

import { useState } from "react";
import { DatePicker, DateRangePicker, type DateRange } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type Mode = "default" | "playful" | "smooth" | "glass";

const modes: Mode[] = ["default", "playful", "smooth", "glass"];

export default function DatePickerDemo() {
  const [mode, setMode] = useState<Mode>("default");
  const [presets, setPresets] = useState(true);
  const [noFuture, setNoFuture] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [range, setRange] = useState<DateRange | undefined>();
  const [preset, setPreset] = useState<string | null>("7d");

  const modeAttr = mode !== "default" ? `\n  mode="${mode}"` : "";
  useUsageCode(
    `<DateRangePicker\n  value={range}\n  preset={preset}\n  onValueChange={(range, presetId) => {\n    setRange(range)\n    setPreset(presetId ?? null)\n  }}${
      noFuture ? "\n  max={new Date()}" : ""
    }${presets ? "" : "\n  presets={false}"}${modeAttr}${disabled ? "\n  disabled" : ""}\n/>`
  );

  const modeProp = mode === "default" ? undefined : mode;
  const max = noFuture ? new Date() : undefined;

  return (
    <>
      <div className="flex w-full max-w-[560px] flex-col gap-3 sm:flex-row">
        <DatePicker
          value={date}
          onValueChange={setDate}
          aria-label="Date"
          max={max}
          mode={modeProp}
          disabled={disabled}
          className="sm:w-[200px]"
        />
        <DateRangePicker
          value={range}
          preset={preset}
          onValueChange={(next, presetId) => {
            setRange(next);
            setPreset(presetId ?? null);
          }}
          aria-label="Date range"
          max={max}
          presets={presets ? undefined : false}
          mode={modeProp}
          disabled={disabled}
          className="sm:w-[280px]"
        />
      </div>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Mode</span>
            <div className="flex gap-1.5">
              {modes.map((m) => (
                <Button key={m} variant={mode === m ? "default" : "secondary"} size="sm" onClick={() => setMode(m)}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="date-picker-presets" checked={presets} onCheckedChange={setPresets} />
                <Label htmlFor="date-picker-presets" className="text-xs">
                  Presets
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="date-picker-no-future" checked={noFuture} onCheckedChange={setNoFuture} />
                <Label htmlFor="date-picker-no-future" className="text-xs">
                  No future dates
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="date-picker-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="date-picker-disabled" className="text-xs">
                  Disabled
                </Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
