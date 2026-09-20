import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hello-menopausia-cursos.pages.dev',
  output: 'static',
  compressHTML: true,
  build: {
    format: 'directory',
  },
});
