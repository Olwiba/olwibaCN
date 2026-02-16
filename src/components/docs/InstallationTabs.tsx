'use client';

import * as React from 'react';
import { CodeFence } from './CodeFence';

interface InstallationTabsProps {
  name: string;
  variant?: 'shorthand' | 'url';
}

const packageManagers = [
  {
    id: 'bun',
    label: 'bun',
    shorthand: (pkg: string) => `bunx shadcn@latest add @olwibacn/${pkg}`,
    url: (pkg: string) => `bunx shadcn@latest add https://cn.olwiba.com/r/${pkg}.json`,
  },
  {
    id: 'pnpm',
    label: 'pnpm',
    shorthand: (pkg: string) => `pnpm dlx shadcn@latest add @olwibacn/${pkg}`,
    url: (pkg: string) => `pnpm dlx shadcn@latest add https://cn.olwiba.com/r/${pkg}.json`,
  },
  {
    id: 'npm',
    label: 'npm',
    shorthand: (pkg: string) => `npx shadcn@latest add @olwibacn/${pkg}`,
    url: (pkg: string) => `npx shadcn@latest add https://cn.olwiba.com/r/${pkg}.json`,
  },
  {
    id: 'yarn',
    label: 'yarn',
    shorthand: (pkg: string) => `npx shadcn@latest add @olwibacn/${pkg}`,
    url: (pkg: string) => `npx shadcn@latest add https://cn.olwiba.com/r/${pkg}.json`,
  },
];

export function InstallationTabs({ name, variant = 'shorthand' }: InstallationTabsProps) {
  const [active, setActive] = React.useState('bun');
  const activeManager = packageManagers.find((pm) => pm.id === active)!;
  const command = activeManager[variant](name);

  return (
    <div className="not-prose my-6">
      <div className="flex border-b border-fd-border mb-4">
        {packageManagers.map((pm) => (
          <button
            key={pm.id}
            onClick={() => setActive(pm.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              active === pm.id
                ? 'border-b-2 border-fd-primary text-fd-foreground'
                : 'text-fd-muted-foreground hover:text-fd-foreground'
            }`}
          >
            {pm.label}
          </button>
        ))}
      </div>
      <CodeFence code={command} language="bash" className="my-0" />
    </div>
  );
}
