"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

type MenubarMode = "default" | "playful" | "smooth";
const modes: MenubarMode[] = ["default", "playful", "smooth"];

function getMenubarUsageCode({
  mode,
  disabled,
}: {
  mode: MenubarMode;
  disabled: boolean;
}) {
  const modeAttr = mode !== "default" ? ` mode="${mode}"` : "";
  const disabledAttr = disabled ? " disabled" : "";

  return `<Menubar${modeAttr}>
  <MenubarMenu>
    <MenubarTrigger${disabledAttr}>File</MenubarTrigger>
    <MenubarContent${modeAttr}>
      <MenubarItem>
        New Tab <MenubarShortcut shortcut="mod+T" />
      </MenubarItem>
      <MenubarItem>
        New Window <MenubarShortcut shortcut="mod+N" />
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Share</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Print</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger${disabledAttr}>Edit</MenubarTrigger>
    <MenubarContent${modeAttr}>
      <MenubarItem>
        Undo <MenubarShortcut shortcut="mod+Z" />
      </MenubarItem>
      <MenubarItem>
        Redo <MenubarShortcut shortcut="shift+mod+Z" />
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Cut</MenubarItem>
      <MenubarItem>Copy</MenubarItem>
      <MenubarItem>Paste</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger${disabledAttr}>View</MenubarTrigger>
    <MenubarContent${modeAttr}>
      <MenubarItem>Zoom In</MenubarItem>
      <MenubarItem>Zoom Out</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Fullscreen</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`;
}

export default function MenubarDemo() {
  const [mode, setMode] = useState<MenubarMode>("default");
  const [disabled, setDisabled] = useState(false);

  useUsageCode(getMenubarUsageCode({ mode, disabled }));

  const modeProp = mode === "default" ? undefined : mode;

  return (
    <>
      <Menubar mode={modeProp}>
        <MenubarMenu>
          <MenubarTrigger disabled={disabled}>File</MenubarTrigger>
          <MenubarContent mode={modeProp}>
            <MenubarItem>
              New Tab <MenubarShortcut shortcut="mod+T" />
            </MenubarItem>
            <MenubarItem>
              New Window <MenubarShortcut shortcut="mod+N" />
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger disabled={disabled}>Edit</MenubarTrigger>
          <MenubarContent mode={modeProp}>
            <MenubarItem>
              Undo <MenubarShortcut shortcut="mod+Z" />
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut shortcut="shift+mod+Z" />
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger disabled={disabled}>View</MenubarTrigger>
          <MenubarContent mode={modeProp}>
            <MenubarItem>Zoom In</MenubarItem>
            <MenubarItem>Zoom Out</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Fullscreen</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

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
                <Switch id="menubar-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="menubar-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
