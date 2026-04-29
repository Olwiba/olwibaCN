"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type AvatarMode = "default" | "playful" | "smooth";
type AvatarSize = "default" | "sm" | "lg";

const modes: AvatarMode[] = ["default", "playful", "smooth"];
const sizes: AvatarSize[] = ["default", "sm", "lg"];

export default function AvatarDemo() {
  const [mode, setMode] = useState<AvatarMode>("default");
  const [size, setSize] = useState<AvatarSize>("default");
  const [disabled, setDisabled] = useState(false);

  const usageProps = [
    size !== "default" && `size="${size}"`,
    mode !== "default" && `mode="${mode}"`,
    disabled && "disabled",
  ].filter(Boolean).join(" ");
  useUsageCode(`<Avatar${usageProps ? " " + usageProps : ""}>\n  <AvatarImage src="/avatar.png" alt="@olwiba" />\n  <AvatarFallback>OB</AvatarFallback>\n</Avatar>`);

  return (
    <>
      <div className="flex items-center gap-4">
        <Avatar
          mode={mode === "default" ? undefined : mode}
          size={size}
          disabled={disabled}
        >
          <AvatarImage src="/favicon/favicon-512.png" alt="@olwiba" />
          <AvatarFallback>OB</AvatarFallback>
        </Avatar>
        <Avatar
          mode={mode === "default" ? undefined : mode}
          size={size}
          disabled={disabled}
        >
          <AvatarFallback>OB</AvatarFallback>
        </Avatar>
      </div>

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
                <Switch id="avatar-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="avatar-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
