import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="font-bold">
          olwiba<span className="text-green-400">CN</span>
        </span>
      ),
    },
    links: [
      {
        text: 'Components',
        url: '/docs/components',
      },
    ],
    githubUrl: 'https://github.com/Olwiba/olwibaCN',
  };
}
