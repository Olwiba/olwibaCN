import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { source } from '@/lib/source';
import browserCollections from 'fumadocs-mdx:collections/browser';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import * as React from 'react';
import { Suspense } from 'react';
import { mdxComponents } from '@/lib/mdx-components';
import { type TocItem } from '@/docs/components/DocsToc';
import { DocsLayout, extractTextFromReactNode, type PageLoaderData } from '@/docs/components/DocsLayout';
import { type SidebarSection } from '@/docs/components/DocsSidebar';
import { findNeighbour } from 'fumadocs-core/page-tree';
import { ErrorPage } from '@/components/ui/error-page';

function DocsNotFound() {
  return (
    <div className="flex flex-1 min-h-[calc(100svh-var(--header-height)-var(--footer-height))] items-center justify-center p-6">
      <ErrorPage
        renderLink={({ href, children }) => <Link to={href}>{children}</Link>}
        backAction={{ label: 'Go back', onClick: () => window.history.back() }}
      />
    </div>
  );
}

const sidebarSections: SidebarSection[] = [
  { name: 'Get Started', href: '/docs' },
  { name: 'Themes', href: '/docs/themes' },
  { name: 'Modes', href: '/docs/modes' },
  { name: 'Icons', href: '/docs/icons' },
  { name: 'Mechanics', href: '/docs/mechanics' },
  { name: 'Components', href: '/docs/components', enchanted: true },
];

export const Route = createFileRoute('/docs/$')({
  component: Page,
  notFoundComponent: DocsNotFound,
  loader: async ({ params }) => {
    const slugs = params._splat?.split('/') ?? [];
    const data = await serverLoader({ data: slugs });
    await clientLoader.preload(data.path);
    return data;
  },
});

const serverLoader = createServerFn({
  method: 'GET',
})
  .inputValidator((slugs: string[]) => slugs)
  .handler(async ({ data: slugs }) => {
    const page = source.getPage(slugs);
    if (!page) throw notFound();

    const pageTree = source.getPageTree();
    const neighbours = findNeighbour(pageTree, page.url);
    const rawContent = await page.data.getText('raw');

    return {
      path: page.path,
      url: page.url,
      pageTree: await source.serializePageTree(pageTree),
      frontmatter: {
        title: page.data.title,
        description: page.data.description,
      },
      toc: (page.data.toc ?? []).map((item: { title?: React.ReactNode; url: string; depth: number }) => ({
        title: extractTextFromReactNode(item.title),
        url: item.url,
        depth: item.depth,
      })) as TocItem[],
      rawContent,
      neighbours: {
        previous: neighbours.previous ? { url: neighbours.previous.url, name: extractTextFromReactNode(neighbours.previous.name) } : null,
        next: neighbours.next ? { url: neighbours.next.url, name: extractTextFromReactNode(neighbours.next.name) } : null,
      },
    };
  });

const clientLoader = browserCollections.docs.createClientLoader({
  component({ default: MDX }) {
    return (
      <div className="w-full flex-1">
        <MDX
          components={{
            ...defaultMdxComponents,
            ...mdxComponents,
          }}
        />
      </div>
    );
  },
});

function Page() {
  const loaderData = Route.useLoaderData() as PageLoaderData;
  const data = useFumadocsLoader(loaderData);

  return (
    <DocsLayout loaderData={loaderData} pageTree={data.pageTree} sections={sidebarSections} defaultOpenFolders>
      <Suspense fallback={<div className="animate-pulse h-64 bg-muted rounded-lg" />}>
        {clientLoader.useContent(data.path, undefined)}
      </Suspense>
    </DocsLayout>
  );
}
