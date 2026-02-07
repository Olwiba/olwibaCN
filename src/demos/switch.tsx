"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DemoControls } from "@/components/docs/ComponentPreview";

export default function SwitchDemo() {
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" disabled={disabled} />
        <Label htmlFor="airplane-mode" className={disabled ? "text-muted-foreground" : ""}>
          Airplane Mode
        </Label>
      </div>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="switch-disabled"
                  checked={disabled}
                  onCheckedChange={setDisabled}
                />
                <Label htmlFor="switch-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
