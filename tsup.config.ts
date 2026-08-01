import { defineConfig } from 'tsup';
import { resolve } from 'path';
import { createTsupBannerHook } from '@olwiba/dx';
import { projectBanner } from './src/project.config';

const shared = {
  format: ['esm' as const],
  dts: true,
  sourcemap: true,
  treeshake: true,
  minify: false,
  esbuildOptions(options: { alias?: Record<string, string>; loader?: Record<string, string> }) {
    options.alias = {
      '@': resolve(__dirname, 'src'),
    };
    options.loader = { ...options.loader, '.flf': 'text' };
  },
  esbuildPlugins: [
    {
      name: 'strip-raw-query',
      setup(build: {
        onResolve: (
          options: { filter: RegExp },
          callback: (args: { path: string }) => { path: string },
        ) => void;
      }) {
        build.onResolve({ filter: /\?raw$/ }, (args) => ({
          path: resolve(__dirname, 'src', args.path.replace(/\?raw$/, '').replace(/^@\//, '')),
        }));
      },
    },
  ],
};

export default defineConfig([
  {
    ...shared,
    entry: ['src/components/ui/index.ts'],
    outDir: 'dist',
    // Cleaning here raced the email config below (both build concurrently
    // from one `tsup` invocation; email's output nests under dist/email, so
    // this config's clean could delete it mid-write). Cleaning now happens
    // once, sequentially, via scripts/clean-dist.ts before tsup even starts.
    clean: false,
    external: ['react', 'react-dom', 'tailwindcss'],
    splitting: false,
    banner: {
      js: '"use client";',
    },
    onSuccess: createTsupBannerHook(projectBanner),
  },
  {
    ...shared,
    entry: ['src/email/index.ts'],
    outDir: 'dist/email',
    clean: false,
    external: ['react', 'react-dom', '@react-email/components'],
    onSuccess: createTsupBannerHook(projectBanner),
  },
]);
