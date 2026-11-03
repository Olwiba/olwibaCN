import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: async () => {
        const [{ docsLlmsResponse }, { source }] = await Promise.all([import('@olwiba/docs/agent'), import('@/lib/source')]);
        return docsLlmsResponse(source, {
          full: false,
          title: 'olwibaCN',
          description:
            'Themeable React primitives for Tailwind v4 (@olwiba/cn), installable through the shadcn CLI or as a package. Every component supports default, playful, smooth and glass modes. App-level blocks live in @olwiba/ui.',
        });
      },
    },
  },
});
