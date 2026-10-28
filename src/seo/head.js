import { SITE_URL } from './pages.js';

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export function applyHead(seo) {
  document.title = seo.title;
  upsertMeta('name', 'description', seo.description);
  upsertMeta('name', 'robots', seo.robots);
  upsertMeta('property', 'og:title', seo.title);
  upsertMeta('property', 'og:description', seo.description);
  const url = seo.path === '/' || seo.path === '/404' ? `${SITE_URL}/` : `${SITE_URL}${seo.path}`;
  upsertMeta('property', 'og:url', url);
  upsertMeta('property', 'og:image', seo.image);
  upsertMeta('property', 'og:image:alt', seo.imageAlt || 'Fire Kirin');
  upsertMeta('property', 'og:locale', 'en_US');
  upsertMeta('property', 'og:type', seo.ogType || 'website');
  upsertMeta('property', 'og:site_name', 'Fire Kirin');
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', seo.title);
  upsertMeta('name', 'twitter:description', seo.description);
  upsertMeta('name', 'twitter:image', seo.image);
  upsertMeta('name', 'twitter:image:alt', seo.imageAlt || 'Fire Kirin');
  const published = document.head.querySelector('meta[property="article:published_time"]');
  if (seo.published) upsertMeta('property', 'article:published_time', seo.published);
  else published?.remove();
  if (seo.path !== '/404') upsertLink('canonical', url);
  else document.head.querySelector('link[rel="canonical"]')?.remove();

  let script = document.getElementById('seo-jsonld');
  if (!seo.jsonLd) {
    script?.remove();
    return;
  }
  if (!script) {
    script = document.createElement('script');
    script.id = 'seo-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(seo.jsonLd);
}
