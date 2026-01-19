import * as React from "react";
import { CopyButton } from "./CopyButton";

interface InstallationTabsProps {
  packageName: string;
}

const packageManagers = [
  { id: "bun", label: "bun", command: (pkg: string) => `bunx shadcn@latest add @olwibacn/${pkg}` },
  { id: "pnpm", label: "pnpm", command: (pkg: string) => `pnpm dlx shadcn@latest add @olwibacn/${pkg}` },
  { id: "npm", label: "npm", command: (pkg: string) => `npx shadcn@latest add @olwibacn/${pkg}` },
  { id: "yarn", label: "yarn", command: (pkg: string) => `npx shadcn@latest add @olwibacn/${pkg}` },
];

export function InstallationTabs({ packageName }: InstallationTabsProps) {
  const [active, setActive] = React.useState("bun");
  const activeManager = packageManagers.find((pm) => pm.id === active)!;
  const command = activeManager.command(packageName);

  return (
    <div>
      <div className="flex border-b border-neutral-200 dark:border-neutral-800 mb-4">
        {packageManagers.map((pm) => (
          <button
            key={pm.id}
            onClick={() => setActive(pm.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              active === pm.id
                ? "border-b-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white"
                : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            }`}
          >
            {pm.label}
          </button>
        ))}
      </div>
      <div className="relative">
        <pre className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 pr-12 text-sm font-mono overflow-x-auto">
          {command}
        </pre>
        <CopyButton text={command} className="absolute top-3 right-3" />
      </div>
    </div>
  );
}
