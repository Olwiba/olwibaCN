"use client";

import { useState } from "react";
import { Combobox, type ComboboxOption } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type Mode = "default" | "playful" | "smooth" | "glass";
type Size = "sm" | "default" | "lg";

const modes: Mode[] = ["default", "playful", "smooth", "glass"];
const sizes: Size[] = ["sm", "default", "lg"];

const timezones: ComboboxOption[] = [
  { value: "europe-london", label: "London", description: "GMT / BST", group: "Europe" },
  { value: "europe-lisbon", label: "Lisbon", description: "WET / WEST", group: "Europe" },
  { value: "europe-berlin", label: "Berlin", description: "CET / CEST", group: "Europe" },
  { value: "asia-bangkok", label: "Bangkok", description: "ICT", group: "Asia", keywords: ["thailand"] },
  { value: "asia-tokyo", label: "Tokyo", description: "JST", group: "Asia", keywords: ["japan"] },
  { value: "pacific-auckland", label: "Auckland", description: "NZST / NZDT", group: "Pacific", keywords: ["new zealand"] },
  { value: "america-new-york", label: "New York", description: "EST / EDT", group: "Americas" },
  { value: "america-mexico-city", label: "Mexico City", description: "CST", group: "Americas", disabled: true },
];

export default function ComboboxDemo() {
  const [mode, setMode] = useState<Mode>("default");
  const [size, setSize] = useState<Size>("default");
  const [clearable, setClearable] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState<string | null>("asia-bangkok");

  useUsageCode(
    `<Combobox\n  options={timezones}\n  value={value}\n  onValueChange={setValue}\n  placeholder="Select a timezone"${
      size !== "default" ? `\n  size="${size}"` : ""
    }${mode !== "default" ? `\n  mode="${mode}"` : ""}${clearable ? "\n  clearable" : ""}${disabled ? "\n  disabled" : ""}\n/>`
  );

  return (
    <>
      <div className="w-[280px]">
        <Combobox
          options={timezones}
          value={value}
          onValueChange={setValue}
          placeholder="Select a timezone"
          searchPlaceholder="Search cities..."
          aria-label="Timezone"
          size={size}
          mode={mode === "default" ? undefined : mode}
          clearable={clearable}
          disabled={disabled}
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
            <span className="text-xs font-medium text-fd-muted-foreground">Size</span>
            <div className="flex gap-1.5">
              {sizes.map((s) => (
                <Button key={s} variant={size === s ? "default" : "secondary"} size="sm" onClick={() => setSize(s)}>
                  {s}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="combobox-clearable" checked={clearable} onCheckedChange={setClearable} />
                <Label htmlFor="combobox-clearable" className="text-xs">
                  Clearable
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="combobox-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="combobox-disabled" className="text-xs">
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
