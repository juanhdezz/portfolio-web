import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://juanhdezz.github.io',
  base: '/portfolio-web',
  integrations: [
    tailwind(), 
    react(),
    sitemap()
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});