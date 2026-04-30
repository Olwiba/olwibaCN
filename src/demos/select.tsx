"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type SelectSize = "sm" | "default" | "lg";
type SelectMode = "default" | "playful" | "smooth";

const sizes: SelectSize[] = ["default", "sm", "lg"];
const modes: SelectMode[] = ["default", "playful", "smooth"];

function getSelectUsageCode({
  size,
  mode,
  disabled,
}: {
  size: SelectSize;
  mode: SelectMode;
  disabled: boolean;
}) {
  const sizeAttr = size !== "default" ? ` size="${size}"` : "";
  const modeAttr = mode !== "default" ? ` mode="${mode}"` : "";
  const disabledAttr = disabled ? " disabled" : "";

  return `<Select${disabledAttr}>
  <SelectTrigger className="w-[180px]"${sizeAttr}${modeAttr}>
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent${modeAttr}>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="blueberry">Blueberry</SelectItem>
      <SelectItem value="grapes">Grapes</SelectItem>
      <SelectItem value="pineapple">Pineapple</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`;
}

export default function SelectDemo() {
  const [size, setSize] = useState<SelectSize>("default");
  const [mode, setMode] = useState<SelectMode>("default");
  const [disabled, setDisabled] = useState(false);
  const modeProp = mode === "default" ? undefined : mode;

  useUsageCode(getSelectUsageCode({ size, mode, disabled }));

  return (
    <>
      <Select disabled={disabled}>
        <SelectTrigger className="w-[180px]" size={size} mode={modeProp}>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent mode={modeProp}>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Size</span>
            <div className="flex gap-1.5">
              {sizes.map((s) => (
                <Button
                  key={s}
                  variant={size === s ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSize(s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Button>
              ))}
            </div>
          </div>

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
                <Switch id="select-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="select-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
