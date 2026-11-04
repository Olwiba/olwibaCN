import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { AsciiText } from '@/components/AsciiText';
import { IsometricPlane, isoImagesByTheme } from '@/components/IsometricPlane';
import rawManifest from '@/iso-previews-manifest.json';

// Light captures on a light page, dark on a dark one. The plane picks the set
// itself, so every docs site that syncs it behaves the same way.
const isoImages = isoImagesByTheme(rawManifest);

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="relative flex flex-col flex-1 min-h-[calc(100svh-var(--header-height)-var(--footer-height))] justify-center items-center px-4 py-16 text-center">
      {isoImages.light.length > 0 && <IsometricPlane images={isoImages} />}

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-24 sm:h-40 bg-gradient-to-b from-background/90 to-transparent dark:h-24 sm:dark:h-64 dark:from-background dark:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-40 bg-gradient-to-t from-background/90 to-transparent dark:h-24 sm:dark:h-64 dark:from-background dark:to-transparent" />
        <div className="absolute inset-y-0 left-0 w-12 sm:w-40 bg-gradient-to-r from-background/90 to-transparent dark:w-12 sm:dark:w-64 dark:from-background dark:to-transparent" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-40 bg-gradient-to-l from-background/90 to-transparent dark:w-12 sm:dark:w-64 dark:from-background dark:to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <AsciiText text="olwibaCN" accent="CN" accentColor="var(--primary)" />
        <p className="text-muted-foreground text-lg mb-8 max-w-md">
          Custom shadcn/ui component registry. Copy and paste components into your apps.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link to="/docs/$" params={{ _splat: '' }}>
              Get Started
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/docs/$" params={{ _splat: 'components' }}>
              Components
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
