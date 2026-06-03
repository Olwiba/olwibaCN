import * as React from 'react';
import { createRouter } from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

function RootErrorFallback({ error, reset }: ErrorComponentProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-lg font-semibold">Something went wrong</p>
      <p className="max-w-md text-sm text-muted-foreground">{error.message || 'An unexpected error occurred.'}</p>
      <button onClick={reset} className="rounded-md border px-4 py-2 text-sm hover:bg-muted">Try again</button>
    </div>
  );
}

export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultErrorComponent: RootErrorFallback,
  });
  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
