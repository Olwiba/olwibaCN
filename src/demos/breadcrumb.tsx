"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DemoControls, useUsageCode } from "@/components/docs/ComponentPreview";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type BreadcrumbSize = "sm" | "default" | "lg";

const sizes: BreadcrumbSize[] = ["default", "sm", "lg"];

export default function BreadcrumbDemo() {
  const [size, setSize] = useState<BreadcrumbSize>("default");
  const [disabled, setDisabled] = useState(false);

  const usageProps = [
    size !== "default" && `size="${size}"`,
  ].filter(Boolean).join(" ");
  const disabledProp = disabled ? " disabled" : "";
  useUsageCode(`<Breadcrumb>\n  <BreadcrumbList${usageProps ? " " + usageProps : ""}>\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/"${disabledProp}>Home</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/components"${disabledProp}>Components</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>\n    </BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList size={size}>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" disabled={disabled}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#" disabled={disabled}>Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="breadcrumb-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="breadcrumb-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
