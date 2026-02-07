"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls } from "@/components/docs/ComponentPreview";

export default function InputDemo() {
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 w-[300px]">
        <Input type="text" placeholder="Text" disabled={disabled} />
        <Input type="password" placeholder="Password" disabled={disabled} />
      </div>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="input-disabled"
                  checked={disabled}
                  onCheckedChange={setDisabled}
                />
                <Label htmlFor="input-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
