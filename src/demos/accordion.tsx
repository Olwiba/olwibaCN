"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DemoControls } from "@/components/docs/ComponentPreview";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type AccordionVariant = "default" | "playful" | "smooth";
type AccordionSize = "default" | "sm";

const variants: AccordionVariant[] = ["default", "playful", "smooth"];
const sizes: AccordionSize[] = ["default", "sm"];

export default function AccordionDemo() {
  const [variant, setVariant] = useState<AccordionVariant>("default");
  const [size, setSize] = useState<AccordionSize>("default");
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-md"
        variant={variant === "default" ? undefined : variant}
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
