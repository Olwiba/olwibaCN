"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DemoControls } from "@/components/docs/ComponentPreview";

type Mode = "default" | "playful" | "smooth";

const modes: Mode[] = ["default", "playful", "smooth"];

export default function BadgeDemo() {
  const [mode, setMode] = useState<Mode>("default");

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Badge playful={mode === "playful"} smooth={mode === "smooth"}>Default</Badge>
        <Badge variant="secondary" playful={mode === "playful"} smooth={mode === "smooth"}>Secondary</Badge>
        <Badge variant="outline" playful={mode === "playful"} smooth={mode === "smooth"}>Outline</Badge>
        <Badge variant="destructive" playful={mode === "playful"} smooth={mode === "smooth"}>Destructive</Badge>
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
        </div>
      </DemoControls>
    </>
  );
}
