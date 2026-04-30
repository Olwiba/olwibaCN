"use client";

import { Home, Inbox, Settings, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DemoControls, useUsageCode } from "@/docs/components/ComponentPreview";

type SidebarCollapsible = "offcanvas" | "icon" | "none";
type SidebarMenuSize = "sm" | "default" | "lg";
type SidebarMode = "default" | "playful" | "smooth";

const items = [
  { title: "Home", icon: Home },
  { title: "Inbox", icon: Inbox },
  { title: "Settings", icon: Settings },
];

const collapsibleOptions: SidebarCollapsible[] = ["offcanvas", "icon", "none"];
const menuSizes: SidebarMenuSize[] = ["default", "sm", "lg"];
const modes: SidebarMode[] = ["default", "playful", "smooth"];
const collapsibleLabels: Record<SidebarCollapsible, string> = {
  offcanvas: "Default",
  icon: "Icon",
  none: "None",
};
const sidebarIconWidths: Record<SidebarMenuSize, string> = {
  sm: "2.75rem",
  default: "3rem",
  lg: "4rem",
};

function getSidebarUsageCode({
  collapsible,
  menuSize,
  mode,
}: {
  collapsible: SidebarCollapsible;
  menuSize: SidebarMenuSize;
  mode: SidebarMode;
}) {
  const collapsibleAttr = collapsible !== "offcanvas" ? ` collapsible="${collapsible}"` : "";
  const menuSizeAttr = menuSize !== "default" ? ` size="${menuSize}"` : "";
  const modeAttr = mode !== "default" ? ` mode="${mode}"` : "";
  const sidebarIconWidthAttr =
    collapsible === "icon" && menuSize !== "default"
      ? ` sidebarWidthIcon="${sidebarIconWidths[menuSize]}"`
      : "";
  const triggerCode = collapsible !== "none" ? "\n      <SidebarTrigger />" : "";

  return `<SidebarProvider${sidebarIconWidthAttr} defaultOpen>
  <Sidebar${collapsibleAttr}${modeAttr}>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton${menuSizeAttr}>
            <Home />
            <span>Olwiba</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive${menuSizeAttr}>
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton${menuSizeAttr}>
                <Inbox />
                <span>Inbox</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton${menuSizeAttr}>
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton${menuSizeAttr}>
            <User />
            <span>User</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
  <SidebarInset>
    <header className="flex h-12 items-center gap-2 border-b px-4">${triggerCode}
      <span className="text-sm font-medium">Dashboard</span>
    </header>
    <div className="p-4 text-sm text-muted-foreground">Main content area</div>
  </SidebarInset>
</SidebarProvider>`;
}

export default function SidebarDemo() {
  const [collapsible, setCollapsible] = useState<SidebarCollapsible>("offcanvas");
  const [menuSize, setMenuSize] = useState<SidebarMenuSize>("default");
  const [mode, setMode] = useState<SidebarMode>("default");
  const modeProp = mode === "default" ? undefined : mode;
  const sidebarIconWidth = sidebarIconWidths[menuSize];

  useUsageCode(getSidebarUsageCode({ collapsible, menuSize, mode }));

  return (
    <>
      <div className="h-[320px] w-[560px] max-w-full overflow-hidden rounded-lg border">
        <SidebarProvider
          layout="embedded"
          mobileBreakpoint={0}
          sidebarWidthIcon={sidebarIconWidth}
          defaultOpen
        >
          <Sidebar sidebarPosition="contained" collapsible={collapsible} mode={modeProp}>
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size={menuSize}>
                    <Home />
                    <span>Olwiba</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton size={menuSize} isActive={item.title === "Home"}>
                          <item.icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size={menuSize}>
                    <User />
                    <span>User</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <header className="flex h-12 items-center gap-2 border-b px-4">
              {collapsible !== "none" && <SidebarTrigger />}
              <span className="text-sm font-medium">Dashboard</span>
            </header>
            <div className="p-4 text-sm text-muted-foreground">
              Main content area
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>

      <DemoControls>
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-fd-muted-foreground">Menu Size</span>
            <div className="flex gap-1.5">
              {menuSizes.map((size) => (
                <Button
                  key={size}
                  variant={menuSize === size ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setMenuSize(size)}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
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
            <span className="text-xs font-medium text-fd-muted-foreground">Collapse</span>
            <div className="flex gap-1.5">
              {collapsibleOptions.map((option) => (
                <Button
                  key={option}
                  variant={collapsible === option ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setCollapsible(option)}
                >
                  {collapsibleLabels[option]}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DemoControls>
    </>
  );
}
