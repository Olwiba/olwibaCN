import react from '@vitejs/plugin-react';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import mdx from 'fumadocs-mdx/vite';
import { createDevBannerPlugin, resolveDevPort } from '@olwiba/dx';
import { projectBanner } from './src/project.config';

export default defineConfig({
  server: {
    port: await resolveDevPort(3000),
    allowedHosts: true,
  },
  plugins: [
    createDevBannerPlugin(projectBanner),
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
