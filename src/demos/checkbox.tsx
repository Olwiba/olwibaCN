"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/components/docs/ComponentPreview";

type Mode = "default" | "playful" | "smooth";

const modes: Mode[] = ["default", "playful", "smooth"];

export default function CheckboxDemo() {
  const [mode, setMode] = useState<Mode>("default");
  const [disabled, setDisabled] = useState(false);

  const usageProps = [
    mode !== "default" && `mode="${mode}"`,
    disabled && "disabled",
  ].filter(Boolean).join(" ");
  useUsageCode(`<Checkbox${usageProps ? " " + usageProps : ""} />`);

  return (
    <>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="demo"
          mode={mode === "default" ? undefined : mode}
          disabled={disabled}
        />
        <Label htmlFor="demo" className={disabled ? "text-muted-foreground" : ""}>
          Accept terms and conditions
        </Label>
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

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="checkbox-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="checkbox-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
