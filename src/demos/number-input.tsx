"use client";

import { useState } from "react";
import { NumberInput } from "@/components/ui/number-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type Mode = "default" | "playful" | "smooth" | "glass";

const modes: Mode[] = ["default", "playful", "smooth", "glass"];

/** "" means the prop is left off entirely, which is the default state. */
function asNumber(raw: string): number | undefined {
  if (raw.trim() === "") return undefined;
  const parsed = Number(raw);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function attr(name: string, value: number | undefined): string {
  return value === undefined ? "" : ` ${name}={${value}}`;
}

export default function NumberInputDemo() {
  const [mode, setMode] = useState<Mode>("default");
  const [disabled, setDisabled] = useState(false);
  const [hideStepper, setHideStepper] = useState(false);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [step, setStep] = useState("");

  const minNum = asNumber(min);
  const maxNum = asNumber(max);
  const stepNum = asNumber(step);

  useUsageCode(
    `<NumberInput\n  placeholder="0"${attr("min", minNum)}${attr("max", maxNum)}${attr("step", stepNum)}${
      mode !== "default" ? `\n  mode="${mode}"` : ""
    }${hideStepper ? "\n  hideStepper" : ""}${disabled ? "\n  disabled" : ""}\n/>`
  );

  return (
    <>
      <div className="w-[300px]">
        <NumberInput
          placeholder="0"
          min={minNum}
          max={maxNum}
          step={stepNum}
          mode={mode === "default" ? undefined : mode}
          hideStepper={hideStepper}
          disabled={disabled}
        />
      </div>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
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

          {/* Left empty by default so the field starts unbounded, and the
              stepper's bound behaviour is something you switch on rather than
              something you have to switch off to see the plain case.

              These use NumberInput with the stepper hidden: a native number
              input here would put unthemed spin buttons directly beside the
              component they exist to replace. */}
          <div className="space-y-1.5">
            <div className="flex items-end gap-2">
              <div className="space-y-1">
                <Label htmlFor="number-min" className="text-xs">
                  Min
                </Label>
                <NumberInput
                  id="number-min"
                  hideStepper
                  placeholder="—"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  className="h-9 w-20"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="number-max" className="text-xs">
                  Max
                </Label>
                <NumberInput
                  id="number-max"
                  hideStepper
                  placeholder="—"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  className="h-9 w-20"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="number-step" className="text-xs">
                  Step
                </Label>
                <NumberInput
                  id="number-step"
                  hideStepper
                  placeholder="1"
                  value={step}
                  onChange={(e) => setStep(e.target.value)}
                  className="h-9 w-20"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="number-hide-stepper"
                  checked={hideStepper}
                  onCheckedChange={setHideStepper}
                />
                <Label htmlFor="number-hide-stepper" className="text-xs">
                  Hide stepper
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="number-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="number-disabled" className="text-xs">
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
