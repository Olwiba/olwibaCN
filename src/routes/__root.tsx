/// <reference types="vite/client" />
import {
  HeadContent,
  Scripts,
  createRootRoute,
  Link,
  Outlet,
} from "@tanstack/react-router";
import * as React from "react";
import appCss from "~/styles/app.css?url";
import { ThemeToggle } from "~/components/ThemeToggle";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "olwibaCN - Custom shadcn/ui Registry" },
      { name: "description", content: "Custom shadcn/ui component registry. Copy and paste components into your apps." },
      { property: "og:title", content: "olwibaCN" },
      { property: "og:description", content: "Custom shadcn/ui component registry" },
      { property: "og:image", content: "https://cn.olwiba.com/og-image.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon/favicon-16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon/favicon-48.png" },
      { rel: "icon", type: "image/png", sizes: "64x64", href: "/favicon/favicon-64.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white min-h-screen transition-colors">
        <header className="border-b border-neutral-200 dark:border-neutral-800">
          <nav className="max-w-5xl mx-auto px-8 h-14 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="font-bold">
                olwiba<span className="text-green-400">CN</span>
              </Link>
              <Link
                to="/components"
                className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                activeProps={{ className: "text-neutral-900 dark:text-white" }}
              >
                Components
              </Link>
            </div>
            <ThemeToggle />
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
        <Scripts />
      </body>
    </html>
  );
}
