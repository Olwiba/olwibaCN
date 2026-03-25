"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DemoControls, useUsageCode } from "@/components/docs/ComponentPreview";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Info, TriangleAlert, Lightbulb, CircleX } from "lucide-react";

type AlertMode = "default" | "playful" | "smooth";
type AlertSize = "default" | "sm" | "lg";

const modes: AlertMode[] = ["default", "playful", "smooth"];
const sizes: AlertSize[] = ["default", "sm", "lg"];

export default function AlertDemo() {
  const [mode, setMode] = useState<AlertMode>("default");
  const [size, setSize] = useState<AlertSize>("default");
  const [disabled, setDisabled] = useState(false);

  const resolvedMode = mode === "default" ? undefined : mode;

  const usageProps = [
    resolvedMode && `mode="${resolvedMode}"`,
    size !== "default" && `size="${size}"`,
    disabled && "disabled",
  ].filter(Boolean).join(" ");
  useUsageCode(`<Alert${usageProps ? " " + usageProps : ""}>\n  <AlertTitle>Heads up!</AlertTitle>\n  <AlertDescription>Description.</AlertDescription>\n</Alert>`);

  return (
    <>
      <div className="w-full max-w-md space-y-4">
        <Alert mode={resolvedMode} size={size} disabled={disabled}>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>
        <Alert variant="info" mode={resolvedMode} size={size} disabled={disabled}>
          <Info className="h-4 w-4" />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>
            Your account has been updated with the latest changes.
          </AlertDescription>
        </Alert>
        <Alert variant="warning" mode={resolvedMode} size={size} disabled={disabled}>
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Your trial expires in 3 days. Upgrade to keep access.
          </AlertDescription>
        </Alert>
        <Alert variant="tip" mode={resolvedMode} size={size} disabled={disabled}>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Tip</AlertTitle>
          <AlertDescription>
            Use keyboard shortcuts to navigate faster.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive" mode={resolvedMode} size={size} disabled={disabled}>
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
