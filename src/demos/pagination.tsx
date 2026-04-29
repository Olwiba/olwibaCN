"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type PaginationSize = "sm" | "default" | "lg";
type PaginationMode = "default" | "playful" | "smooth";

const sizes: PaginationSize[] = ["default", "sm", "lg"];
const modes: PaginationMode[] = ["default", "playful", "smooth"];

function getPaginationUsageCode({
  size,
  mode,
  disabled,
}: {
  size: PaginationSize;
  mode: PaginationMode;
  disabled: boolean;
}) {
  const modeAttr = mode !== "default" ? ` mode="${mode}"` : "";
  const sizeAttr = size !== "default" ? ` size="${size}"` : "";
  const disabledAttr = disabled ? " disabled" : "";

  return `<Pagination${modeAttr}>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#"${sizeAttr}${disabledAttr} />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#"${sizeAttr}${disabledAttr}>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive${sizeAttr}${disabledAttr}>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#"${sizeAttr}${disabledAttr}>3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#"${sizeAttr}${disabledAttr} />
    </PaginationItem>
  </PaginationContent>
</Pagination>`;
}

export default function PaginationDemo() {
  const [size, setSize] = useState<PaginationSize>("default");
  const [mode, setMode] = useState<PaginationMode>("default");
  const [disabled, setDisabled] = useState(false);
  const linkSize = size === "default" ? undefined : size;

  useUsageCode(getPaginationUsageCode({ size, mode, disabled }));

  return (
    <>
      <Pagination mode={mode === "default" ? undefined : mode}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" size={linkSize} disabled={disabled} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" size={linkSize} disabled={disabled}>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive size={linkSize} disabled={disabled}>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" size={linkSize} disabled={disabled}>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" size={linkSize} disabled={disabled} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

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
                <Switch id="pagination-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="pagination-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
