"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";
import { cn } from "@/lib/utils";

export default function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  useUsageCode(
    `<Collapsible${disabled ? " disabled" : ""}>\n` +
    `  <div className="flex items-center justify-between px-4">\n` +
    `    <h4>Nexus Inc / engineering</h4>\n` +
    `    <CollapsibleTrigger asChild>\n` +
    `      <Button variant="ghost" size="sm">\n` +
    `        <ChevronsUpDown className="h-4 w-4" />\n` +
    `      </Button>\n` +
    `    </CollapsibleTrigger>\n` +
    `  </div>\n` +
    `  <div className="rounded-md border px-4 py-3 font-mono text-sm">design-system</div>\n` +
    `  <CollapsibleContent>\n` +
    `    <div className="rounded-md border px-4 py-3 font-mono text-sm">marketing-site</div>\n` +
    `    <div className="rounded-md border px-4 py-3 font-mono text-sm">admin-console</div>\n` +
    `  </CollapsibleContent>\n` +
    `</Collapsible>`
  );

  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        disabled={disabled}
        className={cn("w-[350px] space-y-2 transition-opacity", disabled && "opacity-50")}
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Nexus Inc / engineering</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          design-system
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            marketing-site
          </div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            admin-console
          </div>
        </CollapsibleContent>
      </Collapsible>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="collapsible-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="collapsible-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
