"use client";

import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";
import { cn } from "@/lib/utils";

type NavMode = "default" | "playful" | "smooth";

const modes: NavMode[] = ["default", "playful", "smooth"];

const itemClass = (mode: NavMode) => cn(
  "block select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
  mode === "smooth" ? "rounded-xl" : "rounded-md"
);

function getUsageCode({ mode, disabled }: { mode: NavMode; disabled: boolean }) {
  const modeAttr = mode !== "default" ? ` mode="${mode}"` : "";
  const triggerDisabled = disabled ? " disabled" : "";
  const linkDisabled = disabled ? ` aria-disabled="true" className={cn(navigationMenuTriggerStyle(), "pointer-events-none opacity-50")}` : ` className={navigationMenuTriggerStyle()}`;

  return `<NavigationMenu${modeAttr}>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger${triggerDisabled}>Getting started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-[400px]">
          <li>
            <NavigationMenuLink asChild>
              <a href="#" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Introduction</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </p>
              </a>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="#"${linkDisabled}>
        Documentation
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`;
}

export default function NavigationMenuDemo() {
  const [mode, setMode] = useState<NavMode>("default");
  const [disabled, setDisabled] = useState(false);

  useUsageCode(getUsageCode({ mode, disabled }));

  return (
    <>
      <NavigationMenu mode={mode === "default" ? undefined : mode}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger disabled={disabled}>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 w-[400px]">
                <li>
                  <NavigationMenuLink asChild>
                    <a className={itemClass(mode)} href="#">
                      <div className="text-sm font-medium leading-none">Introduction</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Re-usable components built using Radix UI and Tailwind CSS.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a className={itemClass(mode)} href="#">
                      <div className="text-sm font-medium leading-none">Installation</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        How to install dependencies and structure your app.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              aria-disabled={disabled || undefined}
              className={cn(navigationMenuTriggerStyle(), disabled && "pointer-events-none opacity-50")}
            >
              Documentation
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

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
            <span className="text-xs font-medium text-fd-muted-foreground">Options</span>
            <div className="flex h-9 items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="nav-disabled" checked={disabled} onCheckedChange={setDisabled} />
                <Label htmlFor="nav-disabled" className="text-xs">Disabled</Label>
              </div>
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
