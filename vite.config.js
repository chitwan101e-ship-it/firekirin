import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { SITE_URL, indexablePages, sitemapXml, snapshotHtml } from './src/seo/pages.js';

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
        const url = `${SITE_URL}${seo.path === '/' ? '/' : seo.path}`;
        const jsonLd = seo.jsonLd
          ? `<script type="application/ld+json" id="seo-jsonld">${JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c')}</script>`
          : '';
        let html = template
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(seo.title)}</title>`)
          .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escapeAttr(seo.description)}$2`)
          .replace(/(<meta name="robots" content=")[^"]*(")/, `$1${escapeAttr(seo.robots)}$2`)
          .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeAttr(seo.title)}$2`)
          .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escapeAttr(seo.description)}$2`)
          .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
          .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${seo.image}$2`)
          .replace(/(<meta property="og:image:alt" content=")[^"]*(")/, `$1${escapeAttr(seo.imageAlt || 'Fire Kirin')}$2`)
          .replace(/(<meta property="og:type" content=")[^"]*(")/, `$1${seo.ogType || 'website'}$2`)
          .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeAttr(seo.title)}$2`)
          .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escapeAttr(seo.description)}$2`)
          .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${seo.image}$2`)
          .replace(/(<meta name="twitter:image:alt" content=")[^"]*(")/, `$1${escapeAttr(seo.imageAlt || 'Fire Kirin')}$2`)
          .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
          .replace('</head>', `${seo.published ? `<meta property="article:published_time" content="${seo.published}">` : ''}${jsonLd}</head>`)
          .replace('<div id="app"></div>', `<div id="app">${snapshotHtml(seo)}</div>`);
        if (seo.path === '/') {
          writeFileSync(homePath, html);
          return;
        }
        const dir = resolve(dist, seo.path.slice(1));
        mkdirSync(dir, { recursive: true });
        writeFileSync(resolve(dir, 'index.html'), html);
      });
      const sitemap = sitemapXml();
      writeFileSync(resolve(dist, 'sitemap.xml'), sitemap);
      writeFileSync(resolve(__dirname, 'public/sitemap.xml'), sitemap);
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
      '@data': resolve(__dirname, './src/data')
    }
  }
});

