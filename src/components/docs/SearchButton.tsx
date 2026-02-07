'use client';

import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { Button } from '@/components/ui/button';
import { Hotkey } from '@/components/ui/hotkey';
import { cn } from '@/lib/utils';

export function SearchButton() {
  const { setOpenSearch } = useSearchContext();

  return (
    <Button
      className={cn(
        'relative h-8 w-full max-w-[75%] justify-start bg-muted/50 font-normal text-sm text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64'
      )}
      onClick={() => setOpenSearch(true)}
      variant="outline"
    >
      <span className="hidden lg:inline-flex">Search documentation...</span>
      <span className="inline-flex lg:hidden">Search...</span>
      <Hotkey shortcut="mod+K" asKbd className="pointer-events-none absolute top-[0.3rem] right-[0.3rem] hidden sm:flex" />
    </Button>
  );
}
