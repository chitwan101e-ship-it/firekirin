import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { SITE_URL, indexablePages, snapshotHtml } from './src/seo/pages.js';

function escapeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function seoHtmlPlugin() {
  return {
    name: 'seo-html',
    apply: 'build',
    closeBundle() {
      const dist = resolve(__dirname, 'dist');
      const homePath = resolve(dist, 'index.html');
      const template = readFileSync(homePath, 'utf8');
      indexablePages().forEach((seo) => {
        let html = template
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(seo.title)}</title>`)
          .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escapeAttr(seo.description)}$2`)
          .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeAttr(seo.title)}$2`)
          .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escapeAttr(seo.description)}$2`)
          .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${SITE_URL}${seo.path === '/' ? '/' : seo.path}$2`)
          .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${seo.image}$2`)
          .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeAttr(seo.title)}$2`)
          .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escapeAttr(seo.description)}$2`)
          .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${seo.image}$2`)
          .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${SITE_URL}${seo.path === '/' ? '/' : seo.path}$2`)
          .replace('<div id="app"></div>', `<div id="app">${snapshotHtml(seo)}</div>`);
        if (seo.path === '/') {
          writeFileSync(homePath, html);
          return;
        }
        const dir = resolve(dist, seo.path.slice(1));
        mkdirSync(dir, { recursive: true });
        writeFileSync(resolve(dir, 'index.html'), html);
      });
    },
  };
}

export default defineConfig({
  root: './src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    open: true
  },
  plugins: [seoHtmlPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@data': resolve(__dirname, './src/data'),
      '@assets': resolve(__dirname, './firekirin.com/wp-content')
    }
  }
});

