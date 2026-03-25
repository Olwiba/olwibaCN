"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DemoControls } from "@/components/docs/ComponentPreview";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type AvatarVariant = "default" | "playful" | "smooth";
type AvatarSize = "default" | "sm" | "lg";

const variants: AvatarVariant[] = ["default", "playful", "smooth"];
const sizes: AvatarSize[] = ["default", "sm", "lg"];

export default function AvatarDemo() {
  const [variant, setVariant] = useState<AvatarVariant>("default");
  const [size, setSize] = useState<AvatarSize>("default");
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4">
        <Avatar
          variant={variant === "default" ? undefined : variant}
          size={size}
          disabled={disabled}
        >
          <AvatarImage src="/favicon/favicon-512.png" alt="@olwiba" />
          <AvatarFallback>OB</AvatarFallback>
        </Avatar>
        <Avatar
          variant={variant === "default" ? undefined : variant}
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
            <span className="text-xs font-medium text-fd-muted-foreground">Variant</span>
            <div className="flex gap-1.5">
              {variants.map((v) => (
                <Button
                  key={v}
                  variant={variant === v ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setVariant(v)}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
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
