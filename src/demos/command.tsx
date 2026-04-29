"use client";

import { useState } from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type CommandMode = "default" | "playful" | "smooth";
const modes: CommandMode[] = ["default", "playful", "smooth"];

export default function CommandDemo() {
  const [mode, setMode] = useState<CommandMode>("default");
  const [disabled, setDisabled] = useState(false);

  const modeAttr = mode !== "default" ? ` mode="${mode}"` : "";
  const disabledAttr = disabled ? " disabled" : "";

  useUsageCode(
    `<Command${modeAttr}${disabledAttr} className="rounded-lg border shadow-md w-[300px]">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem><Calendar className="h-4 w-4" /><span>Calendar</span></CommandItem>
      <CommandItem><Smile className="h-4 w-4" /><span>Search Emoji</span></CommandItem>
      <CommandItem><Calculator className="h-4 w-4" /><span>Calculator</span></CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem><User className="h-4 w-4" /><span>Profile</span><CommandShortcut shortcut="mod+P" /></CommandItem>
      <CommandItem><CreditCard className="h-4 w-4" /><span>Billing</span><CommandShortcut shortcut="mod+B" /></CommandItem>
      <CommandItem><Settings className="h-4 w-4" /><span>Settings</span><CommandShortcut shortcut="mod+S" /></CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`
  );

  return (
    <>
      <Command
        mode={mode === "default" ? undefined : mode}
        disabled={disabled}
        className="rounded-lg border shadow-md w-[300px]"
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut shortcut="mod+P" />
            </CommandItem>
            <CommandItem>
              <CreditCard className="h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut shortcut="mod+B" />
            </CommandItem>
            <CommandItem>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut shortcut="mod+S" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>

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
                <Switch id="command-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="command-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
