import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import * as React from 'react';
import appCss from '@/styles/app.css?url';
import { RootProvider } from 'fumadocs-ui/provider/tanstack';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import SearchDialog from '@/components/docs/SearchDialog';
import { ActiveThemeProvider } from '@/components/active-theme';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'olwibaCN - Custom shadcn/ui Registry' },
      { name: 'description', content: 'Custom shadcn/ui component registry. Copy and paste components into your apps.' },
      { property: 'og:title', content: 'olwibaCN' },
      { property: 'og:description', content: 'Custom shadcn/ui component registry' },
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
    <html lang="en" suppressHydrationWarning>
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
            <div className="mx-auto w-full max-w-[1400px] flex-1 border-r border-l border-dashed">
              {children}
            </div>
            <SiteFooter />
          </RootProvider>
        </ActiveThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
