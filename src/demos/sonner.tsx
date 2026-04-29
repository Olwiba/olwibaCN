"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type SonnerMode = "default" | "playful" | "smooth";
type SonnerPosition = "top-right" | "bottom-right";

const modes: SonnerMode[] = ["default", "playful", "smooth"];
const positions: SonnerPosition[] = ["top-right", "bottom-right"];

function getSonnerUsageCode({ mode, position }: { mode: SonnerMode; position: SonnerPosition }) {
  const modeAttr = mode !== "default" ? ` mode="${mode}"` : "";
  const positionAttr = position !== "bottom-right" ? ` position="top-right"` : "";
  const btnModeAttr = mode !== "default" ? ` mode="${mode}"` : "";

  return `<Toaster${modeAttr}${positionAttr} />
<Button${btnModeAttr} onClick={() => toast("Event has been created", { description: "Sunday, December 03, 2023 at 9:00 AM" })}>
  Show Toast
</Button>
<Button${btnModeAttr} onClick={() => toast.success("Successfully saved!")}>Success</Button>
<Button${btnModeAttr} onClick={() => toast.error("Something went wrong")}>Error</Button>`;
}

export default function SonnerDemo() {
  const [mode, setMode] = useState<SonnerMode>("default");
  const [position, setPosition] = useState<SonnerPosition>("bottom-right");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const modeProp = mode === "default" ? undefined : mode;

  useUsageCode(getSonnerUsageCode({ mode, position }));

  return (
    <>
      {mounted && createPortal(<Toaster mode={modeProp} position={position} />, document.body)}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          mode={modeProp}
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
            })
          }
        >
          Show Toast
        </Button>
        <Button
          variant="outline"
          mode={modeProp}
          onClick={() => toast.success("Successfully saved!")}
        >
          Success
        </Button>
        <Button
          variant="outline"
          mode={modeProp}
          onClick={() => toast.error("Something went wrong")}
        >
          Error
        </Button>
      </div>

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
            <div className="flex flex-wrap gap-1.5">
              {positions.map((p) => (
                <Button
                  key={p}
                  variant={position === p ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setPosition(p)}
                >
                  {p === "top-right" ? "Top" : "Bottom"}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
