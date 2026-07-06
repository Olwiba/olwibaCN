import { createFileRoute, Link } from '@tanstack/react-router';
import browserCollections from 'fumadocs-mdx:collections/browser';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import { Suspense } from 'react';
import { mdxComponents } from '@/lib/mdx-components';
import { DocsLayout, type PageLoaderData } from '@/docs/components/DocsLayout';
import { type SidebarSection } from '@/docs/components/DocsSidebar';
import { ErrorPage } from '@/components/ui/error-page';
import { FeedbackSidebarItem } from '@/feedback/FeedbackSidebarItem';
import { getFeedbackConfig, submitFeedback } from '@/feedback/server';
import { serverLoader } from './-loader';

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
  { name: 'Mechanics', href: '/docs/mechanics', collapsedByDefault: true },
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
    <DocsLayout
      loaderData={loaderData}
      pageTree={data.pageTree}
      sections={sidebarSections}
      defaultOpenFolders
      sidebarBottomSlot={
        <FeedbackSidebarItem
          getConfig={() => getFeedbackConfig()}
          submit={(payload) => submitFeedback({ data: payload })}
        />
      }
    >
      <Suspense fallback={<div className="animate-pulse h-64 bg-muted rounded-lg" />}>
        {clientLoader.useContent(data.path, undefined)}
      </Suspense>
    </DocsLayout>
  );
}
