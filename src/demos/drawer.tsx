"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type DrawerMode = "default" | "playful" | "smooth";
const modes: DrawerMode[] = ["default", "playful", "smooth"];

function getDrawerUsageCode({
  mode,
  disabled,
}: {
  mode: DrawerMode;
  disabled: boolean;
}) {
  const modeAttr = mode !== "default" ? ` mode="${mode}"` : "";
  const disabledAttr = disabled ? " disabled" : "";

  return `<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline"${modeAttr}${disabledAttr}>Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent${modeAttr}>
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>Move Goal</DrawerTitle>
        <DrawerDescription>Set your daily activity goal.</DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pb-0">
        <div className="flex items-center justify-center space-x-2">
          <div className="flex-1 text-center">
            <div className="text-7xl font-bold tracking-tighter">350</div>
            <div className="text-[0.70rem] uppercase text-muted-foreground">
              Calories/day
            </div>
          </div>
        </div>
      </div>
      <DrawerFooter>
        <Button${modeAttr}>Submit</Button>
        <DrawerClose asChild>
          <Button variant="outline"${modeAttr}>Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  </DrawerContent>
</Drawer>`;
}

export default function DrawerDemo() {
  const [mode, setMode] = useState<DrawerMode>("default");
  const [disabled, setDisabled] = useState(false);

  useUsageCode(getDrawerUsageCode({ mode, disabled }));

  const modeProp = mode === "default" ? undefined : mode;
  const drawerPreview = (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" mode={modeProp} disabled={disabled}>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent mode={modeProp}>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">350</div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Calories/day
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button mode={modeProp}>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline" mode={modeProp}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );

  return (
    <>
      {drawerPreview}

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
                <Switch id="drawer-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="drawer-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
