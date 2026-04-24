"use client";

import { useState } from "react";
import { Mouse } from "lucide-react";
import { DemoControls, useUsageCode } from "@/components/docs/ComponentPreview";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export default function ContextMenuDemo() {
  const [disabled, setDisabled] = useState(false);

  useUsageCode(`<ContextMenu>\n  <ContextMenuTrigger>Right click here</ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem>Back</ContextMenuItem>\n    <ContextMenuItem>Forward</ContextMenuItem>\n    <ContextMenuItem>Reload</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>`);

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger
          className={cn(
            "flex h-[150px] w-[300px] items-center justify-center gap-2 rounded-md border border-dashed border-primary text-sm transition-opacity",
            disabled && "pointer-events-none opacity-50"
          )}
        >
          <Mouse className="h-4 w-4" />
          Right click here
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem>
            Back
            <ContextMenuShortcut shortcut="mod+[" />
          </ContextMenuItem>
          <ContextMenuItem disabled>
            Forward
            <ContextMenuShortcut shortcut="mod+]" />
          </ContextMenuItem>
          <ContextMenuItem>
            Reload
            <ContextMenuShortcut shortcut="mod+R" />
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            Save Page As...
            <ContextMenuShortcut shortcut="mod+S" />
          </ContextMenuItem>
          <ContextMenuItem>Print...</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="ctx-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="ctx-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
