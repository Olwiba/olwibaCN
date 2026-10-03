"use client";

import { useState } from "react";
import { ColorPicker } from "@/components/ui/color-picker";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type Mode = "default" | "playful" | "smooth" | "glass";

const modes: Mode[] = ["default", "playful", "smooth", "glass"];

const presets = ["#10b981", "#3b82f6", "#a855f7", "#f43f5e", "#f97316", "#84cc16", "#64748b"];

export default function ColorPickerDemo() {
  const [color, setColor] = useState("#10b981");
  const [mode, setMode] = useState<Mode>("default");
  const [showPresets, setShowPresets] = useState(true);
  const [grid, setGrid] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useUsageCode(
    `const [color, setColor] = useState("${color}")\n\n<ColorPicker\n  value={color}\n  onValueChange={setColor}${
      grid ? `\n  variant="grid"` : ""
    }${
      showPresets ? `\n  presets={["#10b981", "#3b82f6", "#a855f7", "#f43f5e"]}` : ""
    }${mode !== "default" ? `\n  mode="${mode}"` : ""}${disabled ? "\n  disabled" : ""}\n/>`
  );

  return (
    <>
      <div className="flex w-[280px] flex-col gap-3">
        <ColorPicker
          value={color}
          onValueChange={setColor}
          presets={showPresets ? presets : undefined}
          variant={grid ? "grid" : "spectrum"}
          mode={mode === "default" ? undefined : mode}
          disabled={disabled}
        />
        <p className="text-xs text-muted-foreground">
          Selected <span className="font-mono text-foreground">{color}</span>
        </p>
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

          <div className="flex items-center gap-2 pt-6">
            <Switch id="color-grid" checked={grid} onCheckedChange={setGrid} />
            <Label htmlFor="color-grid" className="text-xs">
              Grid
            </Label>
          </div>

          <div className="flex items-center gap-2 pt-6">
            <Switch id="color-presets" checked={showPresets} onCheckedChange={setShowPresets} />
            <Label htmlFor="color-presets" className="text-xs">
              Presets
            </Label>
          </div>

          <div className="flex items-center gap-2 pt-6">
            <Switch id="color-disabled" checked={disabled} onCheckedChange={setDisabled} />
            <Label htmlFor="color-disabled" className="text-xs">
              Disabled
            </Label>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
