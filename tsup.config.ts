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
  },
  // Preserve "use client" directives
  banner: {
    js: '"use client";',
  },
});
