import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/pages/')({
  server: {
    handlers: {
      GET: async () => {
        const { source } = await import('@/lib/source');
        const pages = source.getPages().map((page) => ({
          title: page.data.title,
          description: page.data.description,
          url: page.url,
        }));
        return Response.json(pages);
      },
    },
  },
});
