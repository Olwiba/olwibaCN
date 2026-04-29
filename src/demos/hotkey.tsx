"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Hotkey } from "@/components/ui/hotkey";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type Shortcut = "mod+K" | "mod+P" | "mod+T" | "shift+mod+Z";

const shortcuts: Shortcut[] = ["mod+K", "mod+P", "mod+T", "shift+mod+Z"];
const shortcutLabels: Record<Shortcut, string> = {
  "mod+K": "Open command menu",
  "mod+P": "Open file",
  "mod+T": "New tab",
  "shift+mod+Z": "Redo",
};

function getHotkeyUsageCode({
  shortcut,
  asKbd,
}: {
  shortcut: Shortcut;
  asKbd: boolean;
}) {
  if (asKbd) {
    return `<Hotkey shortcut="${shortcut}" asKbd />`;
  }

  return `<div className="flex w-64 items-center justify-between rounded-md border px-3 py-2 text-sm">
  <span>${shortcutLabels[shortcut]}</span>
  <Hotkey
    shortcut="${shortcut}"
    className="ml-auto text-xs tracking-widest text-muted-foreground"
  />
</div>`;
}

export default function HotkeyDemo() {
  const [shortcut, setShortcut] = useState<Shortcut>("mod+K");
  const [asKbd, setAsKbd] = useState(false);

  useUsageCode(getHotkeyUsageCode({ shortcut, asKbd }));

  return (
    <>
      {asKbd ? (
        <Hotkey shortcut={shortcut} asKbd />
      ) : (
        <div className="flex w-64 items-center justify-between rounded-md border px-3 py-2 text-sm">
          <span>{shortcutLabels[shortcut]}</span>
          <Hotkey
            shortcut={shortcut}
            className="ml-auto text-xs tracking-widest text-muted-foreground"
          />
        </div>
      )}

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Shortcut</span>
            <div className="flex flex-wrap gap-1.5">
              {shortcuts.map((value) => (
                <Button
                  key={value}
                  variant={shortcut === value ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setShortcut(value)}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="hotkey-as-kbd" checked={asKbd} onCheckedChange={setAsKbd} />
                <Label htmlFor="hotkey-as-kbd" className="text-xs">Standalone keycap</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
