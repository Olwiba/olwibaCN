import { defineConfig } from 'tsup';
import { resolve } from 'path';

export default defineConfig({
  entry: ['src/components/ui/index.ts'],
  format: ['esm'],
  dts: false, // TODO: Fix react-resizable-panels type issue, then re-enable
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'tailwindcss'],
  treeshake: true,
  minify: false,
  esbuildOptions(options) {
    options.alias = {
      '@': resolve(__dirname, 'src'),
    };
    // Bundle .flf font files as raw text (used by AsciiText)
    // The ?raw suffix is a Vite convention; esbuild just needs the text loader.
    options.loader = { ...options.loader, '.flf': 'text' };
  },
  esbuildPlugins: [
    {
      name: 'strip-raw-query',
      setup(build) {
        // Resolve `?raw` query imports (Vite convention) to the bare file path
        build.onResolve({ filter: /\?raw$/ }, (args) => ({
          path: resolve(__dirname, 'src', args.path.replace(/\?raw$/, '').replace(/^@\//, '')),
        }));
      },
    },
  ],
  // Preserve "use client" directives
  banner: {
    js: '"use client";',
  },
});
