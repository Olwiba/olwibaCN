"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls } from "@/components/docs/ComponentPreview";
import { fireConfetti } from "@/lib/confetti";

export default function ConfettiDemo() {
  const [centered, setCentered] = useState(false);

  const run = () => {
    fireConfetti({ centered });
  };

  return (
    <>
      <Button onClick={run} size="lg" className="gap-2">
        <Play className="h-4 w-4" />
        Fire confetti
      </Button>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="confetti-centered"
                  checked={centered}
                  onCheckedChange={setCentered}
                />
                <Label htmlFor="confetti-centered" className="text-xs">
                  Centered
                </Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
