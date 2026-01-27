'use client';

import { Link, useLocation } from '@tanstack/react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { PageTree } from 'fumadocs-core/source';

const TOP_LEVEL_SECTIONS = [
  { name: 'Get Started', href: '/docs' },
  { name: 'Components', href: '/docs/components' },
  { name: 'Themes', href: '/docs/themes' },
];

interface DocsSidebarProps extends React.ComponentProps<typeof Sidebar> {
  tree: PageTree.Root;
}

export function DocsSidebar({ tree, ...props }: DocsSidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Sidebar
      className="fixed top-[calc(var(--header-height)+1px)] left-auto z-30 hidden w-[220px] lg:w-[240px] h-[calc(100svh-var(--header-height)-1px)] overscroll-none bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="relative no-scrollbar overflow-x-hidden">
        <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-8 bg-gradient-to-b from-background to-transparent" />
        <ScrollArea className="h-full w-full">
          <div className="h-[var(--top-spacing)] shrink-0" />
          <div className="px-2 pb-12">
            <SidebarGroup>
            <SidebarGroupLabel className="font-medium text-muted-foreground">
              Sections
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {TOP_LEVEL_SECTIONS.map(({ name, href }) => (
                  <SidebarMenuItem key={name}>
                    <SidebarMenuButton
                      asChild
                      className="relative h-[30px] w-fit overflow-visible border border-transparent font-medium text-[0.8rem] data-[active=true]:border-accent data-[active=true]:bg-accent"
                      isActive={
                        href === '/docs'
                          ? pathname === href
                          : pathname.startsWith(href)
                      }
                    >
                      <Link to={href}>{name}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {tree.children.map((item) => {
            if (item.$id === 'root:index.mdx') return null;
            if (item.$id === 'root:themes.mdx') return null;

            return (
              <SidebarGroup key={item.$id}>
                <SidebarGroupLabel className="font-medium text-muted-foreground">
                  {item.name}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  {item.type === 'folder' && (
                    <SidebarMenu className="gap-0.5">
                      {item.children
                        .filter((childItem) => {
                          if (childItem.type !== 'page') return false;
                          if (childItem.url === '/docs') return false;
                          if (childItem.$id?.endsWith('index.mdx')) return false;
                          return true;
                        })
                        .map((childItem) => (
                          <SidebarMenuItem key={childItem.url}>
                            <SidebarMenuButton
                              asChild
                              className="relative h-[30px] w-fit overflow-visible border border-transparent font-medium text-[0.8rem] data-[active=true]:border-accent data-[active=true]:bg-accent"
                              isActive={childItem.url === pathname}
                            >
                              <Link to={childItem.url}>{childItem.name}</Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                  )}
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}
          </div>
        </ScrollArea>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-12 bg-gradient-to-t from-background to-transparent" />
      </SidebarContent>
    </Sidebar>
  );
}
