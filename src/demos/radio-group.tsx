"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls } from "@/components/docs/ComponentPreview";

export default function RadioGroupDemo() {
  const [groupDisabled, setGroupDisabled] = useState(false);
  const [compactDisabled, setCompactDisabled] = useState(false);

  return (
    <>
      <RadioGroup defaultValue="comfortable" disabled={groupDisabled}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1" className={groupDisabled ? "text-muted-foreground" : ""}>Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2" className={groupDisabled ? "text-muted-foreground" : ""}>Comfortable</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="compact" id="r3" disabled={compactDisabled} />
          <Label htmlFor="r3" className={groupDisabled || compactDisabled ? "text-muted-foreground" : ""}>Compact</Label>
        </div>
      </RadioGroup>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="rg-group-disabled"
                  checked={groupDisabled}
                  onCheckedChange={setGroupDisabled}
                />
                <Label htmlFor="rg-group-disabled" className="text-xs">Group disabled</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="rg-item-disabled"
                  checked={compactDisabled}
                  onCheckedChange={setCompactDisabled}
                />
                <Label htmlFor="rg-item-disabled" className="text-xs">Item disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
