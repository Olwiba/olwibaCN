"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

type ResizableOrientation = "horizontal" | "vertical";

function getResizableUsageCode({
  orientation,
  withHandle,
}: {
  orientation: ResizableOrientation;
  withHandle: boolean;
}) {
  const orientationAttr = orientation !== "horizontal" ? ` orientation="${orientation}"` : "";
  const handleAttr = withHandle ? " withHandle" : "";
  return `<ResizablePanelGroup${orientationAttr} className="h-[200px] rounded-lg border">
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Panel One</span>
    </div>
  </ResizablePanel>
  <ResizableHandle${handleAttr} />
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Panel Two</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`;
}

export default function ResizableDemo() {
  const [orientation, setOrientation] = useState<ResizableOrientation>("horizontal");
  const [withHandle, setWithHandle] = useState(true);

  useUsageCode(getResizableUsageCode({ orientation, withHandle }));

  return (
    <>
      <div className="h-[200px] w-full rounded-lg border overflow-hidden">
        <ResizablePanelGroup orientation={orientation}>
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Panel One</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle={withHandle} />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Panel Two</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Orientation</span>
            <div className="flex gap-1.5">
              {(["horizontal", "vertical"] as ResizableOrientation[]).map((o) => (
                <Button key={o} variant={orientation === o ? "default" : "secondary"} size="sm" onClick={() => setOrientation(o)}>
                  {o.charAt(0).toUpperCase() + o.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="resizable-handle" checked={withHandle} onCheckedChange={setWithHandle} />
                <Label htmlFor="resizable-handle" className="text-xs">Handle</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
