import { SITE_URL, pageSeo } from '../data/seo.js';

function upsertMeta(selector, create, content) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    Object.entries(create).forEach(([key, value]) => el.setAttribute(key, value));
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function applyHead(pathname) {
  const seo = pageSeo(pathname);
  const url = `${SITE_URL}${seo.path === '/' ? '/' : seo.path}`;
  const image = seo.image.startsWith('http') ? seo.image : `${SITE_URL}${seo.image}`;

  document.title = seo.title;
  upsertMeta('meta[name="description"]', { name: 'description' }, seo.description);
  upsertMeta('meta[name="robots"]', { name: 'robots' }, seo.robots);
  upsertLink('canonical', url);

  upsertMeta('meta[property="og:title"]', { property: 'og:title' }, seo.title);
  upsertMeta('meta[property="og:description"]', { property: 'og:description' }, seo.description);
  upsertMeta('meta[property="og:url"]', { property: 'og:url' }, url);
  upsertMeta('meta[property="og:image"]', { property: 'og:image' }, image);
  upsertMeta('meta[property="og:type"]', { property: 'og:type' }, 'website');
  upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, 'Fire Kirin');
  upsertMeta('meta[property="og:locale"]', { property: 'og:locale' }, 'en_US');

  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, seo.title);
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, seo.description);
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, image);

  let script = document.getElementById('seo-jsonld');
  if (!script) {
    script = document.createElement('script');
    script.id = 'seo-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(seo.jsonLd);
}
