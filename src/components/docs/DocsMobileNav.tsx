'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from '@tanstack/react-router';
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PageTree } from 'fumadocs-core/source';

const TOP_LEVEL_SECTIONS = [
  { name: 'Get Started', href: '/docs' },
  { name: 'Components', href: '/docs/components' },
  { name: 'Themes', href: '/docs/themes' },
];

interface DocsMobileNavProps {
  tree: PageTree.Root;
}

export function DocsMobileNav({ tree }: DocsMobileNavProps) {
  const [open, setOpen] = React.useState(false);
  const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(null);
  const location = useLocation();
  const pathname = location.pathname;

  React.useEffect(() => {
    setPortalTarget(document.getElementById('docs-mobile-nav-trigger'));
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const trigger = (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7"
      onClick={() => setOpen(true)}
    >
      <PanelLeft className="size-4" />
      <span className="sr-only">Toggle Navigation</span>
    </Button>
  );

  return (
    <>
      {portalTarget && createPortal(trigger, portalTarget)}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[280px] p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <ScrollArea className="h-full w-full">
            <div className="px-4 py-6">
              <div className="mb-4">
                <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
                  Sections
                </p>
                <div className="flex flex-col gap-0.5">
                  {TOP_LEVEL_SECTIONS.map(({ name, href }) => (
                    <Link
                      key={name}
                      to={href}
                      className={cn(
                        'rounded-md px-2 py-1.5 text-[0.8rem] font-medium',
                        (href === '/docs'
                          ? pathname === href
                          : pathname.startsWith(href))
                          ? 'border border-accent bg-accent'
                          : 'border border-transparent text-muted-foreground hover:bg-accent/50'
                      )}
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </div>

              {tree.children.map((item) => {
                if (item.$id === 'root:index.mdx') return null;
                if (item.$id === 'root:themes.mdx') return null;
                if (item.type !== 'folder') return null;

                return (
                  <div key={item.$id} className="mb-4">
                    <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
                      {item.name}
                    </p>
                    <div className="flex flex-col gap-0.5">
                      {item.children
                        .filter(
                          (child) =>
                            child.type === 'page' &&
                            child.url !== '/docs' &&
                            !child.$id?.endsWith('index.mdx')
                        )
                        .map((child) => (
                          <Link
                            key={child.url}
                            to={child.url}
                            className={cn(
                              'rounded-md px-2 py-1.5 text-[0.8rem] font-medium',
                              child.url === pathname
                                ? 'border border-accent bg-accent'
                                : 'border border-transparent text-muted-foreground hover:bg-accent/50'
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
