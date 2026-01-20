import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="flex flex-col flex-1 justify-center items-center px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          olwiba<span className="text-green-400">CN</span>
        </h1>
        <p className="text-fd-muted-foreground text-lg mb-8 max-w-md">
          Custom shadcn/ui component registry. Copy and paste components into your apps.
        </p>
        <div className="flex gap-4">
          <Link
            to="/docs/$"
            params={{ _splat: '' }}
            className="px-4 py-2 rounded-lg bg-fd-primary text-fd-primary-foreground font-medium text-sm"
          >
            Get Started
          </Link>
          <Link
            to="/docs/$"
            params={{ _splat: 'components' }}
            className="px-4 py-2 rounded-lg border border-fd-border font-medium text-sm hover:bg-fd-accent"
          >
            Components
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}
