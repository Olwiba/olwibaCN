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
      { title: "olwibaCN" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
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
          <nav className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="font-semibold">
                olwibaCN
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
