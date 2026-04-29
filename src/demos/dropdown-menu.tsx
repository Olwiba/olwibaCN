"use client";

import { useState } from "react";
import {
  CreditCard,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DropdownMenuMode = "default" | "playful" | "smooth";
const modes: DropdownMenuMode[] = ["default", "playful", "smooth"];

function getDropdownMenuUsageCode({
  mode,
  disabled,
}: {
  mode: DropdownMenuMode;
  disabled: boolean;
}) {
  const modeAttr = mode !== "default" ? ` mode="${mode}"` : "";
  const disabledAttr = disabled ? " disabled" : "";

  return `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline"${modeAttr}${disabledAttr}>Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56"${modeAttr}>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
        <DropdownMenuShortcut shortcut="shift+mod+P" />
      </DropdownMenuItem>
      <DropdownMenuItem>
        <CreditCard className="mr-2 h-4 w-4" />
        <span>Billing</span>
        <DropdownMenuShortcut shortcut="mod+B" />
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
        <DropdownMenuShortcut shortcut="mod+S" />
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
      <DropdownMenuShortcut shortcut="shift+mod+Q" />
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;
}

export default function DropdownMenuDemo() {
  const [mode, setMode] = useState<DropdownMenuMode>("default");
  const [disabled, setDisabled] = useState(false);

  useUsageCode(getDropdownMenuUsageCode({ mode, disabled }));

  const modeProp = mode === "default" ? undefined : mode;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" mode={modeProp} disabled={disabled}>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" mode={modeProp}>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut shortcut="shift+mod+P" />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <DropdownMenuShortcut shortcut="mod+B" />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut shortcut="mod+S" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut shortcut="shift+mod+Q" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
                <Switch id="dropdown-menu-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="dropdown-menu-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
