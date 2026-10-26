import { resolve } from 'node:path';
import { cpSync } from 'node:fs';
import { defineConfig } from 'vite';

// The mockup lives in dulce-de-leche/: the customer site (index.html), the counter view (admin.html),
// and lib/ (the shared data layer and translations, loaded as plain scripts so the files also open directly).
export default defineConfig({
  root: 'dulce-de-leche',
  base: './', // relative asset paths, so the build also works from a subfolder (GitHub Pages)
  server: { host: true },
  preview: { host: true },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'dulce-de-leche/index.html'),
        admin: resolve(import.meta.dirname, 'dulce-de-leche/admin.html'),
      },
    },
  },
  plugins: [{
    name: 'copy-lib',
    closeBundle() { cpSync(resolve(import.meta.dirname, 'dulce-de-leche/lib'), resolve(import.meta.dirname, 'dist/lib'), { recursive: true }); },
  }],
});
