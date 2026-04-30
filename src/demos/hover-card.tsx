"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type HoverCardMode = "default" | "playful" | "smooth";
const modes: HoverCardMode[] = ["default", "playful", "smooth"];

function getHoverCardUsageCode({
  mode,
  disabled,
}: {
  mode: HoverCardMode;
  disabled: boolean;
}) {
  const modeAttr = mode !== "default" ? ` mode="${mode}"` : "";
  const disabledAttr = disabled ? " disabled" : "";

  return `<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link"${modeAttr}${disabledAttr}>@olwiba</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80"${modeAttr}>
    <div className="flex justify-between space-x-4">
      <Avatar${modeAttr}>
        <AvatarImage src="/favicon/favicon-512.png" />
        <AvatarFallback>OB</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@olwiba</h4>
        <p className="text-sm">
          Crafting interfaces and developer tools. Building in the open.
        </p>
        <div className="flex items-center pt-2">
          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
          <span className="text-xs text-muted-foreground">
            Joined December 2021
          </span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`;
}

export default function HoverCardDemo() {
  const [mode, setMode] = useState<HoverCardMode>("default");
  const [disabled, setDisabled] = useState(false);

  useUsageCode(getHoverCardUsageCode({ mode, disabled }));

  const modeProp = mode === "default" ? undefined : mode;

  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" mode={modeProp} disabled={disabled}>@olwiba</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80" mode={modeProp}>
          <div className="flex justify-between space-x-4">
            <Avatar mode={modeProp}>
              <AvatarImage src="/favicon/favicon-512.png" />
              <AvatarFallback>OB</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@olwiba</h4>
              <p className="text-sm">
                Crafting interfaces and developer tools. Building in the open.
              </p>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-xs text-muted-foreground">
                  Joined December 2021
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

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
                <Switch id="hover-card-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="hover-card-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
