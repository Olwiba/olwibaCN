"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DemoControls } from "@/components/docs/ComponentPreview";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Info, TriangleAlert, Lightbulb, CircleX } from "lucide-react";

type AlertVariant = "default" | "playful" | "smooth";
type AlertSize = "default" | "sm" | "lg";

const variants: AlertVariant[] = ["default", "playful", "smooth"];
const sizes: AlertSize[] = ["default", "sm", "lg"];

export default function AlertDemo() {
  const [variant, setVariant] = useState<AlertVariant>("default");
  const [size, setSize] = useState<AlertSize>("default");
  const [disabled, setDisabled] = useState(false);

  const mode = variant === "default" ? undefined : variant;

  return (
    <>
      <div className="w-full max-w-md space-y-4">
        <Alert mode={mode} size={size} disabled={disabled}>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>
        <Alert variant="info" mode={mode} size={size} disabled={disabled}>
          <Info className="h-4 w-4" />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>
            Your account has been updated with the latest changes.
          </AlertDescription>
        </Alert>
        <Alert variant="warning" mode={mode} size={size} disabled={disabled}>
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Your trial expires in 3 days. Upgrade to keep access.
          </AlertDescription>
        </Alert>
        <Alert variant="tip" mode={mode} size={size} disabled={disabled}>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Tip</AlertTitle>
          <AlertDescription>
            Use keyboard shortcuts to navigate faster.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive" mode={mode} size={size} disabled={disabled}>
          <CircleX className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
          </AlertDescription>
        </Alert>
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
                <Switch id="alert-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="alert-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
