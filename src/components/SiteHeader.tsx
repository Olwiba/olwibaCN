'use client';

import { DocsHeader } from '@/docs/components/DocsHeader';

const navItems = [
  { label: 'Docs', href: '/docs' },
  { label: 'Components', href: '/docs/components' },
];

export function SiteHeader() {
  return (
    <DocsHeader
      logo={<>olwiba<span className="text-primary">CN</span></>}
      navItems={navItems}
      githubUrl="https://github.com/Olwiba/olwibaCN"
    />
  );
}
