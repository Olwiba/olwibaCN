"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type Mode = "default" | "playful" | "smooth" | "glass";

const modes: Mode[] = ["default", "playful", "smooth", "glass"];

export default function InputDemo() {
  const [mode, setMode] = useState<Mode>("default");
  const [disabled, setDisabled] = useState(false);

  const modeAttr = mode !== "default" ? ` mode="${mode}"` : "";
  const disabledAttr = disabled ? " disabled" : "";
  useUsageCode(
    `<div className="flex flex-col gap-4 w-[300px]">\n  <Input type="text" placeholder="Text"${modeAttr}${disabledAttr} />\n  <Input type="password" placeholder="Password"${modeAttr}${disabledAttr} />\n</div>`
  );

  return (
    <>
      <div className="flex flex-col gap-4 w-[300px]">
        <Input
          type="text"
          placeholder="Text"
          mode={mode === "default" ? undefined : mode}
          disabled={disabled}
        />
        <Input
          type="password"
          placeholder="Password"
          mode={mode === "default" ? undefined : mode}
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

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="input-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="input-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
