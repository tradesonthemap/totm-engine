import { defineConfig } from 'astro/config';

// Pilot: prove Python→JSON→Astro factory shape + CWV-by-construction.
// (sitemap integration dropped for the pilot — re-add @astrojs/sitemap once on a pinned matching version.)
export default defineConfig({
  site: 'https://totm-astro-pilot.pages.dev',
  build: { format: 'directory' },
});
