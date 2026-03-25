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
import { DemoControls } from "@/components/docs/ComponentPreview";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type AlertDialogVariant = "default" | "playful" | "smooth";
const variants: AlertDialogVariant[] = ["default", "playful", "smooth"];

export default function AlertDialogDemo() {
  const [variant, setVariant] = useState<AlertDialogVariant>("default");
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" disabled={disabled}>Delete Account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent variant={variant === "default" ? undefined : variant}>
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

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
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
