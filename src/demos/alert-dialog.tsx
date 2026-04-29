"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { UIVariantProvider } from "@/components/ui/ui-variant-context";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type AlertDialogMode = "default" | "playful" | "smooth";
const modes: AlertDialogMode[] = ["default", "playful", "smooth"];

export default function AlertDialogDemo() {
  const [mode, setMode] = useState<AlertDialogMode>("default");
  const [disabled, setDisabled] = useState(false);

  const modeAttr = mode !== "default" ? ` mode="${mode}"` : "";
  const disabledAttr = disabled ? " disabled" : "";
  useUsageCode(
    `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button${disabledAttr}>Click me</Button>
  </AlertDialogTrigger>
  <AlertDialogContent${modeAttr}>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`
  );

  return (
    <>
      <UIVariantProvider mode={mode === "default" ? undefined : mode}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={disabled}>Click me</Button>
        </AlertDialogTrigger>
        <AlertDialogContent mode={mode === "default" ? undefined : mode}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </UIVariantProvider>

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
                <Switch id="alert-dialog-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="alert-dialog-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
