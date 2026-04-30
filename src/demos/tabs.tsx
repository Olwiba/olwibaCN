"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type TabsSize = "sm" | "default" | "lg";
type TabsMode = "default" | "playful" | "smooth";

const sizes: TabsSize[] = ["default", "sm", "lg"];
const modes: TabsMode[] = ["default", "playful", "smooth"];

function getTabsUsageCode(size: TabsSize, disabled: boolean, mode: TabsMode) {
  const modeAttr = mode !== "default" ? ` mode="${mode}"` : "";
  const sizeAttr = size !== "default" ? ` size="${size}"` : "";
  const disabledAttr = disabled ? " disabled" : "";

  return `<Tabs defaultValue="account"${modeAttr} className="w-[400px]">
  <TabsList${sizeAttr} className="grid w-full grid-cols-2">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password"${disabledAttr}>Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account" className="rounded-md border p-4 text-sm text-muted-foreground">
    Make changes to your account here.
  </TabsContent>
  <TabsContent value="password" className="rounded-md border p-4 text-sm text-muted-foreground">
    Change your password here.
  </TabsContent>
</Tabs>`;
}

export default function TabsDemo() {
  const [size, setSize] = useState<TabsSize>("default");
  const [mode, setMode] = useState<TabsMode>("default");
  const [disabled, setDisabled] = useState(false);

  useUsageCode(getTabsUsageCode(size, disabled, mode));

  return (
    <>
      <Tabs
        defaultValue="account"
        mode={mode === "default" ? undefined : mode}
        className="w-[400px]"
      >
        <TabsList size={size} className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password" disabled={disabled}>
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="rounded-md border p-4 text-sm text-muted-foreground">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password" className="rounded-md border p-4 text-sm text-muted-foreground">
          Change your password here.
        </TabsContent>
      </Tabs>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Size</span>
            <div className="flex gap-1.5">
              {sizes.map((value) => (
                <Button
                  key={value}
                  variant={size === value ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSize(value)}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Mode</span>
            <div className="flex gap-1.5">
              {modes.map((value) => (
                <Button
                  key={value}
                  variant={mode === value ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setMode(value)}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="tabs-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="tabs-disabled" className="text-xs">Disabled tab</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
