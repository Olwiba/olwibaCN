import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { AsciiText } from '@/components/AsciiText';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-[calc(100svh-var(--header-height)-var(--footer-height))] justify-center items-center px-4 py-16 text-center">
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
  );
}
