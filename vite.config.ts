import react from '@vitejs/plugin-react';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import mdx from 'fumadocs-mdx/vite';
import { createDevBannerPlugin } from './scripts/dev-banner';

export default defineConfig({
  server: {
    port: 3000,
    allowedHosts: true,
  },
  plugins: [
    createDevBannerPlugin({
      segments: [
        { text: 'olwiba' },
        { text: 'CN', colorHex: '#22D3EE' },
      ],
    }),
    mdx(await import('./source.config')),
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart({
      srcDirectory: 'src',
    }),
    react(),
  ],
});
