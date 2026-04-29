"use client";

import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type SheetMode = "default" | "playful" | "smooth";
type SheetSide = "right" | "left" | "top" | "bottom";

const modes: SheetMode[] = ["default", "playful", "smooth"];
const sides: SheetSide[] = ["right", "left", "top", "bottom"];

function getSheetUsageCode({
  mode,
  side,
  disabled,
}: {
  mode: SheetMode;
  side: SheetSide;
  disabled: boolean;
}) {
  const modeAttr = mode !== "default" ? ` mode="${mode}"` : "";
  const sideAttr = side !== "right" ? ` side="${side}"` : "";
  const disabledAttr = disabled ? " disabled" : "";

  return `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline"${modeAttr}${disabledAttr}>Open Sheet</Button>
  </SheetTrigger>
  <SheetContent${sideAttr}${modeAttr}>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="Pedro Duarte" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@peduarte" />
      </div>
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button type="submit"${modeAttr}>Save changes</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`;
}

export default function SheetDemo() {
  const [mode, setMode] = useState<SheetMode>("default");
  const [side, setSide] = useState<SheetSide>("right");
  const [disabled, setDisabled] = useState(false);

  useUsageCode(getSheetUsageCode({ mode, side, disabled }));

  const modeProp = mode === "default" ? undefined : mode;

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" mode={modeProp} disabled={disabled}>
            Open Sheet
          </Button>
        </SheetTrigger>
        <SheetContent side={side} mode={modeProp}>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" mode={modeProp}>
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

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
            <span className="text-xs font-medium text-fd-muted-foreground">Side</span>
            <div className="flex gap-1.5">
              {sides.map((s) => (
                <Button
                  key={s}
                  variant={side === s ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSide(s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="sheet-disabled"
                  checked={disabled}
                  onCheckedChange={setDisabled}
                />
                <Label htmlFor="sheet-disabled" className="text-xs">
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
