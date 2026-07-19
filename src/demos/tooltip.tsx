"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type TooltipMode = "default" | "playful" | "smooth" | "glass";
type TooltipSide = "top" | "right" | "bottom" | "left";

const modes: TooltipMode[] = ["default", "playful", "smooth", "glass"];
const sides: TooltipSide[] = ["top", "right", "bottom", "left"];

function getTooltipUsageCode({
  mode,
  side,
}: {
  mode: TooltipMode;
  side: TooltipSide;
}) {
  const modeAttr = mode !== "default" ? ` mode="${mode}"` : "";
  const sideAttr = side !== "top" ? ` side="${side}"` : "";

  return `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline"${modeAttr}>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent${sideAttr}${modeAttr}>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`;
}

export default function TooltipDemo() {
  const [mode, setMode] = useState<TooltipMode>("default");
  const [side, setSide] = useState<TooltipSide>("top");

  useUsageCode(getTooltipUsageCode({ mode, side }));

  const modeProp = mode === "default" ? undefined : mode;

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" mode={modeProp}>
              Hover me
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side} mode={modeProp}>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

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
            <span className="text-xs font-medium text-fd-muted-foreground">Position</span>
            <div className="flex gap-1.5">
              {sides.map((s) => (
                <Button
                  key={s}
                  variant={side === s ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSide(s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
