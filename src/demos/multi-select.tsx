"use client";

import { useState } from "react";
import { MultiSelect, type MultiSelectOption } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type Mode = "default" | "playful" | "smooth" | "glass";

const modes: Mode[] = ["default", "playful", "smooth", "glass"];

const environments: MultiSelectOption[] = [
  { value: "production", label: "Production" },
  { value: "staging", label: "Staging" },
  { value: "preview", label: "Preview", description: "One per pull request" },
  { value: "development", label: "Development" },
  { value: "test", label: "Test" },
  { value: "archived", label: "Archived", disabled: true },
];

export default function MultiSelectDemo() {
  const [mode, setMode] = useState<Mode>("default");
  const [maxVisible, setMaxVisible] = useState<number | "auto">("auto");
  const [showActions, setShowActions] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState<string[]>(["production", "staging", "preview"]);

  useUsageCode(
    `<MultiSelect\n  options={environments}\n  value={value}\n  onValueChange={setValue}\n  placeholder="All environments"${
      maxVisible !== "auto" ?`\n  maxVisible={${maxVisible}}` : ""
    }${mode !== "default" ? `\n  mode="${mode}"` : ""}${showActions ? "" : "\n  showActions={false}"}${
      disabled ? "\n  disabled" : ""
    }\n/>`
  );

  return (
    <>
      <div className="w-[300px]">
        <MultiSelect
          options={environments}
          value={value}
          onValueChange={setValue}
          placeholder="All environments"
          aria-label="Environments"
          maxVisible={maxVisible}
          showActions={showActions}
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
                <Button key={m} variant={mode === m ? "default" : "secondary"} size="sm" onClick={() => setMode(m)}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Visible chips</span>
            <div className="flex gap-1.5">
              {(["auto", 1, 2, 3] as const).map((n) => (
                <Button key={n} variant={maxVisible === n ? "default" : "secondary"} size="sm" onClick={() => setMaxVisible(n)}>
                  {n === "auto" ? "Auto" : n}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="multi-select-actions" checked={showActions} onCheckedChange={setShowActions} />
                <Label htmlFor="multi-select-actions" className="text-xs">
                  Actions
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="multi-select-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="multi-select-disabled" className="text-xs">
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
