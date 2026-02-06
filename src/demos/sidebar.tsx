"use client";

import { Home, Settings, User, ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", icon: Home },
  { title: "Profile", icon: User },
  { title: "Settings", icon: Settings },
];

export default function SidebarDemo() {
  return (
    <div className="relative w-full max-w-md h-[300px] border rounded-lg overflow-hidden">
      <SidebarProvider defaultOpen={true}>
        <Sidebar className="absolute inset-y-0 left-0 w-[200px] border-r">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="ml-[200px] p-4">
          <div className="flex items-center gap-2 mb-4">
            <SidebarTrigger />
            <span className="text-sm text-muted-foreground">Toggle Sidebar</span>
          </div>
          <p className="text-sm">Main content area</p>
        </main>
      </SidebarProvider>
    </div>
  );
}
