"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type BadgeVariant = "default" | "secondary" | "outline" | "destructive";
type BadgeSize = "sm" | "default" | "lg";

const variants: BadgeVariant[] = ["default", "secondary", "outline", "destructive"];
const sizes: BadgeSize[] = ["default", "sm", "lg"];

export default function BadgeDemo() {
  const [variant, setVariant] = useState<BadgeVariant>("default");
  const [size, setSize] = useState<BadgeSize>("default");
  const [disabled, setDisabled] = useState(false);

  const usageProps = [
    variant !== "default" && `variant="${variant}"`,
    size !== "default" && `size="${size}"`,
    disabled && "disabled",
  ].filter(Boolean).join(" ");
  useUsageCode(`<Badge${usageProps ? " " + usageProps : ""}>Badge</Badge>`);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Badge variant={variant} size={size} disabled={disabled}>Badge</Badge>
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
                <Switch id="badge-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="badge-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
