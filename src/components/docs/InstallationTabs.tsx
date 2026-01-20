'use client';

import * as React from 'react';
import { CopyButton } from './CopyButton';

interface InstallationTabsProps {
  name: string;
}

const packageManagers = [
  { id: 'bun', label: 'bun', command: (pkg: string) => `bunx shadcn@latest add @olwibacn/${pkg}` },
  { id: 'pnpm', label: 'pnpm', command: (pkg: string) => `pnpm dlx shadcn@latest add @olwibacn/${pkg}` },
  { id: 'npm', label: 'npm', command: (pkg: string) => `npx shadcn@latest add @olwibacn/${pkg}` },
  { id: 'yarn', label: 'yarn', command: (pkg: string) => `npx shadcn@latest add @olwibacn/${pkg}` },
];

export function InstallationTabs({ name }: InstallationTabsProps) {
  const [active, setActive] = React.useState('bun');
  const activeManager = packageManagers.find((pm) => pm.id === active)!;
  const command = activeManager.command(name);

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
      <div className="relative">
        <pre className="bg-fd-secondary border border-fd-border rounded-lg p-4 pr-12 text-sm font-mono overflow-x-auto">
          {command}
        </pre>
        <CopyButton text={command} className="absolute top-3 right-3" />
      </div>
    </div>
  );
}
