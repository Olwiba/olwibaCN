"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type AccordionMode = "default" | "playful" | "smooth";
type AccordionSize = "default" | "sm";

const modes: AccordionMode[] = ["default", "playful", "smooth"];
const sizes: AccordionSize[] = ["default", "sm"];

export default function AccordionDemo() {
  const [mode, setMode] = useState<AccordionMode>("default");
  const [size, setSize] = useState<AccordionSize>("default");
  const [disabled, setDisabled] = useState(false);

  const usageProps = [
    mode !== "default" && `mode="${mode}"`,
    size !== "default" && `size="${size}"`,
  ].filter(Boolean).join(" ");
  useUsageCode(`<Accordion type="single" collapsible${usageProps ? " " + usageProps : ""}>\n  <AccordionItem value="item-1"${disabled ? " disabled" : ""}>\n    <AccordionTrigger>Is it accessible?</AccordionTrigger>\n    <AccordionContent>Yes.</AccordionContent>\n  </AccordionItem>\n</Accordion>`);

  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-md"
        mode={mode === "default" ? undefined : mode}
        size={size}
      >
        <AccordionItem value="item-1" disabled={disabled}>
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" disabled={disabled}>
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that match your theme.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" disabled={disabled}>
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default with smooth transitions.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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
                <Switch id="accordion-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="accordion-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
