"use client";

import { useState } from "react";
import { PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";
import { fireConfetti } from "@/lib/confetti";
import { cn } from "@/lib/utils";

type BurstSize = "default" | "light" | "heavy";

const burstCounts: Record<BurstSize, number> = {
  light: 40,
  default: 120,
  heavy: 300,
};

const burstSizes: BurstSize[] = ["default", "light", "heavy"];

type ColorPreset = {
  label: string;
  swatch: string;
  colors?: string[];
};

const colorPresets: ColorPreset[] = [
  { label: "Theme", swatch: "var(--primary)" },
  { label: "Red", swatch: "#ef4444", colors: ["#ef4444", "#fca5a5", "#dc2626"] },
  { label: "Orange", swatch: "#f97316", colors: ["#f97316", "#fed7aa", "#ea580c"] },
  { label: "Yellow", swatch: "#eab308", colors: ["#eab308", "#fef08a", "#ca8a04"] },
  { label: "Green", swatch: "#22c55e", colors: ["#22c55e", "#bbf7d0", "#16a34a"] },
  { label: "Blue", swatch: "#3b82f6", colors: ["#3b82f6", "#bfdbfe", "#2563eb"] },
  { label: "Purple", swatch: "#a855f7", colors: ["#a855f7", "#e9d5ff", "#9333ea"] },
  { label: "Pink", swatch: "#ec4899", colors: ["#ec4899", "#fbcfe8", "#db2777"] },
];

export default function ConfettiDemo() {
  const [centered, setCentered] = useState(false);
  const [burst, setBurst] = useState<BurstSize>("default");
  const [colorIndex, setColorIndex] = useState(0);

  const particleCount = burstCounts[burst];
  const colorPreset = colorPresets[colorIndex];

  const opts: string[] = [];
  if (centered) opts.push("centered: true");
  if (burst !== "default") opts.push(`particleCount: ${particleCount}`);
  if (colorPreset.colors) opts.push(`colors: ${JSON.stringify(colorPreset.colors)}`);

  useUsageCode(`fireConfetti(${opts.length ? `{ ${opts.join(", ")} }` : ""})`);

  return (
    <>
      <Button
        onClick={() => fireConfetti({ centered, particleCount, colors: colorPreset.colors })}
        size="lg"
        className="gap-2"
      >
        <PartyPopper className="h-4 w-4" />
        Fire confetti
      </Button>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Burst</span>
            <div className="flex gap-1.5">
              {burstSizes.map((s) => (
                <Button
                  key={s}
                  variant={burst === s ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setBurst(s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Color</span>
            <div className="flex h-9 items-center gap-1.5">
              {colorPresets.map((preset, i) => (
                <button
                  key={preset.label}
                  title={preset.label}
                  onClick={() => setColorIndex(i)}
                  className={cn(
                    "h-6 w-6 rounded-full border-2 transition-all",
                    colorIndex === i
                      ? "border-foreground scale-110"
                      : "border-transparent hover:border-muted-foreground/50"
                  )}
                  style={{ background: preset.swatch }}
                  aria-label={preset.label}
                />
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="confetti-centered" checked={centered} onCheckedChange={setCentered} />
                <Label htmlFor="confetti-centered" className="text-xs">Centered</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
