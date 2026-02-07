"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls } from "@/components/docs/ComponentPreview";

export default function CheckboxDemo() {
  const [checked, setChecked] = useState<boolean | "indeterminate">(true);
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="demo"
          checked={checked}
          onCheckedChange={setChecked}
          disabled={disabled}
        />
        <Label htmlFor="demo" className={disabled ? "text-muted-foreground" : ""}>
          Accept terms and conditions
        </Label>
      </div>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="checkbox-checked"
                  checked={checked === true}
                  onCheckedChange={(v) => setChecked(v)}
                />
                <Label htmlFor="checkbox-checked" className="text-xs">Checked</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="checkbox-disabled"
                  checked={disabled}
                  onCheckedChange={setDisabled}
                />
                <Label htmlFor="checkbox-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
