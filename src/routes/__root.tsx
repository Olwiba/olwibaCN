import { createRootRoute, HeadContent, Link, Outlet, Scripts } from '@tanstack/react-router';
import * as React from 'react';
import { ErrorPage } from '@/components/ui/error-page';
import appCss from '@/styles/app.css?url';
import { RootProvider } from 'fumadocs-ui/provider/tanstack';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { SearchDialog } from '@/components/docs/SearchDialog';
import { ActiveThemeProvider } from '@/components/active-theme';
import { projectThemeStyleVars } from '@/project.config';

function NotFound() {
  return (
    <div className="flex flex-1 min-h-[calc(100svh-var(--header-height)-var(--footer-height))] items-center justify-center p-6">
      <ErrorPage
        renderLink={({ href, children }) => <Link to={href}>{children}</Link>}
        backAction={{ label: "Go back", onClick: () => window.history.back() }}
      />
    </div>
  );
}

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'olwibaCN - Custom shadcn/ui Component Registry' },
      { name: 'description', content: 'A custom shadcn/ui registry of beautifully crafted, copy-paste components. Built to extend and make your own.' },
      { property: 'og:title', content: 'olwibaCN - Custom shadcn/ui Component Registry' },
      { property: 'og:description', content: 'A custom shadcn/ui registry of beautifully crafted, copy-paste components. Built to extend and make your own.' },
      { property: 'og:image', content: 'https://cn.olwiba.com/og-image.png' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32.png' },
      { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon/favicon-48.png' },
      { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/favicon/favicon-64.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={projectThemeStyleVars as React.CSSProperties}
    >
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col antialiased [--header-height:3.5rem] [--footer-height:3.5rem]">
        <ActiveThemeProvider>
          <RootProvider
            search={{
              SearchDialog,
            }}
          >
            <SiteHeader />
            <div className="flex flex-1 justify-center overflow-x-clip">
              <div className="w-4 shrink-0 border-dashed blueprint-pattern lg:w-12 lg:border-l" aria-hidden="true" />
              <div className="relative z-10 min-w-0 max-w-[1600px] flex-1 border-l border-r border-dashed bg-background">
                {children}
              </div>
              <div className="w-4 shrink-0 border-dashed blueprint-pattern lg:w-12 lg:border-r" aria-hidden="true" />
            </div>
            <SiteFooter />
          </RootProvider>
        </ActiveThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
