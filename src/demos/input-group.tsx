"use client";

import { useState } from "react";
import { Search, Mail } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type InputGroupMode = "default" | "playful" | "smooth";

const modes: InputGroupMode[] = ["default", "playful", "smooth"];

function getInputGroupUsageCode({
  mode,
  disabled,
}: {
  mode: InputGroupMode;
  disabled: boolean;
}) {
  const modeAttr = mode !== "default" ? ` mode="${mode}"` : "";
  const disabledAttr = disabled ? " disabled" : "";

  return `<div className="flex flex-col gap-4 w-full max-w-sm">
  <InputGroup${modeAttr}${disabledAttr}>
    <InputGroupAddon>
      <Search className="h-4 w-4" />
    </InputGroupAddon>
    <InputGroupInput placeholder="Search..." />
  </InputGroup>
  <InputGroup${modeAttr}${disabledAttr}>
    <InputGroupAddon>
      <Mail className="h-4 w-4" />
    </InputGroupAddon>
    <InputGroupInput type="email" placeholder="Email address" />
    <InputGroupAddon align="inline-end">
      <InputGroupText>@example.com</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
</div>`;
}

export default function InputGroupDemo() {
  const [mode, setMode] = useState<InputGroupMode>("default");
  const [disabled, setDisabled] = useState(false);

  useUsageCode(getInputGroupUsageCode({ mode, disabled }));

  const modeProp = mode === "default" ? undefined : mode;

  return (
    <>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <InputGroup mode={modeProp} disabled={disabled}>
          <InputGroupAddon>
            <Search className="h-4 w-4" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." />
        </InputGroup>

        <InputGroup mode={modeProp} disabled={disabled}>
          <InputGroupAddon>
            <Mail className="h-4 w-4" />
          </InputGroupAddon>
          <InputGroupInput type="email" placeholder="Email address" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>@example.com</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
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
                <Switch
                  id="input-group-disabled"
                  checked={disabled}
                  onCheckedChange={setDisabled}
                />
                <Label htmlFor="input-group-disabled" className="text-xs">
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
