import siteData from '../data/site.json';
import { getPost, posts, postSnapshotHtml } from '../data/posts.js';

export const SITE_URL = 'https://www.firekirin.games';

const HOME_DESCRIPTION = 'Play Fire Kirin games online. Fish tables and slots, including Ocean Monster, Arc of Templar, Baby Octopus, and Buffalo 777, in one sweepstakes lobby.';

const INDEX = 'index, follow, max-image-preview:large';

const pages = {
  '/': {
    crumb: 'Home',
    title: 'Play Fire Kirin Online: Fish Games and Slots',
    description: HOME_DESCRIPTION,
    image: siteData.assets.lobby,
    imageAlt: 'Fire Kirin fish games and slot games collage',
  },
  '/about': {
    crumb: 'About',
    title: 'About Fire Kirin: Fish Tables, Slots, and Keno',
    description: 'Fire Kirin is a multiplayer arcade fishing game from East Asia. Shared tables, cannons, fish games, slots, and keno on the web and on the phone. 18+.',
    image: siteData.assets.lobby,
    imageAlt: 'Fire Kirin fish games and slot games collage',
  },
  '/games': {
    crumb: 'Game List',
    title: 'Fire Kirin Game List: Fish Games and Slots',
    description: 'Browse every Fire Kirin fish game and slot, from Ocean Monster and Crab King 2 to Buffalo 777, Olympus, and Caribbean Pirates.',
    image: siteData.assets.lobby,
    imageAlt: 'Fire Kirin fish games and slot games collage',
  },
  '/fish-games': {
    crumb: 'Fish Games',
    title: 'Fire Kirin Fish Games',
    description: 'Play Fire Kirin fish games: Ocean Monster, Arc of Templar, Baby Octopus, Crab King 2, Fire Kirin 2, Eagle Eyes, Golden Toad, and Circus.',
    image: siteData.assets.fishBanner,
    imageAlt: 'Play Fire Kirin fish games',
  },
  '/slots': {
    crumb: 'Slots',
    title: 'Fire Kirin Slots',
    description: 'Play Fire Kirin slots: 4th of July, Aladdin\'s Lamp, Buffalo 777, Pink Perfume, Olympus, Fantasy Forest, China Town, and Caribbean Pirates.',
    image: siteData.assets.slotBanner,
    imageAlt: 'Play Fire Kirin slots',
  },
  '/blog': {
    crumb: 'Blog',
    title: 'Fire Kirin Blog: Games, Download, and XYZ Guides',
    description: 'Fire Kirin game guides for 2026: how to play, lobby bonuses, what Fire Kirin XYZ means, Chromebook play, and the Android and iPhone path.',
    image: siteData.assets.fishBanner,
    imageAlt: 'Play Fire Kirin fish games',
  },
  '/contact': {
    crumb: 'Contact',
    title: 'Contact Fire Kirin',
    description: 'Reach Fire Kirin on Facebook. The other social channels and the message form are not open yet. Vendors use a separate desk.',
    image: siteData.assets.lobby,
    imageAlt: 'Fire Kirin fish games and slot games collage',
  },
  '/account': {
    crumb: 'Account',
    title: 'Create a Free Fire Kirin Account',
    description: 'Fire Kirin player signup for fish games, slots, and the phone lobby is coming soon.',
    image: siteData.assets.lobby,
    imageAlt: 'Fire Kirin fish games and slot games collage',
    robots: 'noindex, follow',
  },
  '/vendor': {
    crumb: 'Become a Vendor',
    title: 'Become a Fire Kirin Vendor',
    description: 'Request a Fire Kirin vendor account if you run fish tables or slot cabinets. This desk is separate from player signup.',
    image: siteData.assets.lobby,
    imageAlt: 'Fire Kirin fish games and slot games collage',
  },
};

function absolute(path) {
  if (!path) return `${SITE_URL}${siteData.assets.lobby}`;
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path}`;
}

function organization() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Fire Kirin',
    url: `${SITE_URL}/`,
    logo: absolute(siteData.assets.logo),
  };
}

function website() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: 'Fire Kirin',
    description: HOME_DESCRIPTION,
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

function pageUrl(path) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

function clip(text, max = 158) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const last = cut.lastIndexOf(' ');
  return `${(last > 80 ? cut.slice(0, last) : cut).replace(/[.,;:\s]+$/, '')}.`;
}

function breadcrumb(items) {
  const path = items.at(-1).path;
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl(path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: pageUrl(item.path),
    })),
  };
}

function webPage({ title, description, path, image }) {
  const url = pageUrl(path);
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    primaryImageOfPage: image,
    breadcrumb: { '@id': `${url}#breadcrumb` },
  };
}

function gameNode(game, path) {
  return {
    '@type': 'Game',
    name: game.title,
    url: `${SITE_URL}${path}`,
    description: game.blurb,
    image: absolute(game.image),
    genre: game.category === 'slot' ? 'Slot' : 'Fish game',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function canonicalPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 2 && parts[0] === 'games') {
    const game = siteData.games.find((item) => item.id === parts[1]);
    if (game) return game.category === 'slot' ? `/slots/${game.id}` : `/fish-games/${game.id}`;
  }
  return pathname || '/';
}

function articleSeo(post) {
  const path = `/blog/${post.slug}`;
  return {
    title: `${post.title} | Fire Kirin`,
    description: post.description,
    path,
    image: absolute(post.image),
    imageAlt: post.imageAlt || post.title,
    published: post.date,
    robots: INDEX,
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        organization(),
        website(),
        webPage({ title: `${post.title} | Fire Kirin`, description: post.description, path, image: absolute(post.image) }),
        {
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          image: absolute(post.image),
          url: `${SITE_URL}${path}`,
          mainEntityOfPage: `${SITE_URL}${path}`,
          author: { '@id': `${SITE_URL}/#organization` },
          publisher: { '@id': `${SITE_URL}/#organization` },
        },
        {
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        },
        breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path },
        ]),
      ],
    },
  };
}

export function pageSeo(pathname) {
  const path = canonicalPath(pathname);
  const parts = path.split('/').filter(Boolean);
  const post = parts[0] === 'blog' && parts.length === 2 ? getPost(parts[1]) : null;
  if (parts[0] === 'blog' && parts.length === 2) {
    return post ? articleSeo(post) : missingSeo();
  }

  const game = parts.length === 2 ? siteData.games.find((item) => item.id === parts[1]) : null;

  if (parts.length === 2 && !game) {
    return missingSeo();
  }

  if (game && (parts[0] === 'fish-games' || parts[0] === 'slots')) {
    const section = game.category === 'slot' ? 'Slots' : 'Fish Games';
    const sectionPath = game.category === 'slot' ? '/slots' : '/fish-games';
    const kind = game.category === 'slot' ? 'Slot' : 'Fish Game';
    const named = /slot|fish game/i.test(game.title) ? game.title : `${game.title} ${kind}`;
    const title = `${named} | Fire Kirin`;
    const description = clip(`${game.title} on Fire Kirin. ${game.blurb}`);
    return {
      title,
      description,
      path,
      image: absolute(game.image),
      imageAlt: `${game.title} gameplay`,
      robots: INDEX,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          organization(),
          website(),
          webPage({ title, description, path, image: absolute(game.image) }),
          gameNode(game, path),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: section, path: sectionPath },
            { name: game.title, path },
          ]),
        ],
      },
    };
  }

  const page = pages[path];
  if (!page) return missingSeo();

  const list = path === '/games'
    ? siteData.games
    : path === '/fish-games'
      ? siteData.games.filter((item) => item.category === 'fish')
      : path === '/slots'
        ? siteData.games.filter((item) => item.category === 'slot')
        : null;

  const extra = [];
  if (list) {
    extra.push({
      '@type': 'ItemList',
      itemListElement: list.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        url: `${SITE_URL}${item.category === 'slot' ? '/slots' : '/fish-games'}/${item.id}`,
      })),
    });
  }

  const crumbs = path === '/'
    ? [{ name: 'Home', path: '/' }]
    : [{ name: 'Home', path: '/' }, { name: page.crumb, path }];

  return {
    title: page.title,
    description: page.description,
    path,
    image: absolute(page.image),
    imageAlt: page.imageAlt,
    robots: page.robots || INDEX,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        organization(),
        website(),
        webPage({ title: page.title, description: page.description, path, image: absolute(page.image) }),
        breadcrumb(crumbs),
        ...extra,
      ],
    },
  };
}

function missingSeo() {
  return {
    title: 'Page not found | Fire Kirin',
    description: 'That Fire Kirin page is not on the floor. Go back to the fish games and slots lobby.',
    path: '/404',
    image: absolute(siteData.assets.lobby),
    robots: 'noindex, follow',
    jsonLd: null,
  };
}

export function sitemapXml() {
  const urls = indexablePages().filter((seo) => !seo.robots.includes('noindex')).map((seo) => {
    const loc = `${SITE_URL}${seo.path === '/' ? '/' : seo.path}`;
    const post = seo.path.startsWith('/blog/') ? getPost(seo.path.slice('/blog/'.length)) : null;
    const lastmod = post?.date || '2026-10-28';
    return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function indexablePages() {
  const staticPaths = Object.keys(pages);
  const gamePaths = siteData.games.map((game) => (
    game.category === 'slot' ? `/slots/${game.id}` : `/fish-games/${game.id}`
  ));
  const postPaths = posts.map((post) => `/blog/${post.slug}`);
  return [...staticPaths, ...gamePaths, ...postPaths].map((path) => pageSeo(path));
}

function gameLinks(games) {
  return games.map((game) => {
    const href = game.category === 'slot' ? `/slots/${game.id}` : `/fish-games/${game.id}`;
    return `<li><a href="${href}">${escapeHtml(game.title)}</a></li>`;
  }).join('');
}

export function snapshotHtml(seo) {
  if (seo.path === '/') {
    return `<article><h1>Fire Kirin Online Sweepstakes</h1><p>A lobby built for fish tables, slots, and keno. Same account in the browser or on your phone.</p><p>${escapeHtml(seo.description)}</p><ul>${gameLinks(siteData.games)}</ul></article>`;
  }
  if (seo.path === '/about') {
    return `<article><h1>One cannon. One school. The whole room.</h1><p>A shared fish table. You set the firepower. The room shoots with you.</p><p>Fire Kirin started in East Asia and caught on across phones and the web. Players share a table and shoot stylized fish, bosses, and sea creatures for points. This lobby is fish games, slots, and keno, in the browser or on a phone. It is for adults, and the play is entertainment.</p><h2>Same loop. New skin.</h2><p>Fire Kirin ships as a phone app, a web lobby, and a module for arcade cabinets. Open the <a href="/fish-games">fish games</a>, the <a href="/slots">slots</a>, or the <a href="/blog/how-to-download-fire-kirin-android-iphone">Android and iPhone guide</a>. Operators use the <a href="/vendor">vendor desk</a>.</p></article>`;
  }
  if (seo.path === '/contact') {
    return `<article><h1>Talk to the desk</h1><p>${escapeHtml(seo.description)}</p><p><a href="https://www.facebook.com/share/1KJhLtD1S6/">Facebook</a> <a href="/vendor">Become a vendor</a></p></article>`;
  }
  if (seo.path === '/vendor') {
    return `<article><h1>Run a Fire Kirin floor</h1><p>${escapeHtml(seo.description)}</p><p><a href="/contact">Contact</a> <a href="/games">Game list</a></p></article>`;
  }
  if (seo.path === '/account') {
    return `<article><h1>Get a Fire Kirin player account</h1><p>${escapeHtml(seo.description)}</p><p><a href="/games">Browse the game list</a></p></article>`;
  }
  if (seo.path === '/blog') {
    const items = posts.map((post) => `<li><a href="/blog/${post.slug}">${escapeHtml(post.title)}</a></li>`).join('');
    return `<article><h1>Fire Kirin game guides</h1><p>${escapeHtml(seo.description)}</p><ul>${items}</ul></article>`;
  }
  if (seo.path.startsWith('/blog/')) {
    const post = getPost(seo.path.slice('/blog/'.length));
    if (post) return postSnapshotHtml(post);
  }
  const parts = seo.path.split('/').filter(Boolean);
  const game = parts.length === 2 ? siteData.games.find((item) => item.id === parts[1]) : null;
  if (game) {
    const sectionPath = game.category === 'slot' ? '/slots' : '/fish-games';
    const section = game.category === 'slot' ? 'Slots' : 'Fish Games';
    const related = siteData.games.filter((item) => item.category === game.category && item.id !== game.id).slice(0, 3);
    return `<article><nav><a href="/">Home</a> <a href="${sectionPath}">${section}</a></nav><h1>${escapeHtml(game.title)}</h1><p>${escapeHtml(game.blurb)}</p><p><a href="${sectionPath}">More ${section.toLowerCase()}</a></p><ul>${gameLinks(related)}</ul></article>`;
  }
  const games = seo.path === '/slots'
    ? siteData.games.filter((item) => item.category === 'slot')
    : seo.path === '/fish-games'
      ? siteData.games.filter((item) => item.category === 'fish')
      : seo.path === '/games'
        ? siteData.games
        : [];
  const links = gameLinks(games);
  return `<article><h1>${escapeHtml(pages[seo.path]?.crumb || seo.title.replace(/ \| Fire Kirin$/, ''))}</h1><p>${escapeHtml(seo.description)}</p>${links ? `<ul>${links}</ul>` : ''}</article>`;
}

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
