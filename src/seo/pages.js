import siteData from '../data/site.json';

export const SITE_URL = 'https://firekirin.com';

const HOME_DESCRIPTION = 'Play Fire Kirin fish games and slots online. Ocean Monster, Arc of Templar, Baby Octopus, Buffalo 777, and more in one sweepstakes lobby.';

const pages = {
  '/': {
    title: 'Play Fire Kirin Online: Fish Games and Slots',
    description: HOME_DESCRIPTION,
    image: siteData.assets.lobby,
  },
  '/about': {
    title: 'About Fire Kirin Fish Games and Slots',
    description: 'Fire Kirin is a sweepstakes lobby for fish tables, slots, and keno. See how the games are organized and how to play from home.',
    image: siteData.assets.lobby,
  },
  '/games': {
    title: 'Fire Kirin Game List: Fish Games and Slots',
    description: 'Browse every Fire Kirin fish game and slot, from Ocean Monster and Crab King 2 to Buffalo 777, Olympus, and Caribbean Pirates.',
    image: siteData.assets.lobby,
  },
  '/fish-games': {
    title: 'Fire Kirin Fish Games',
    description: 'Play Fire Kirin fish games: Ocean Monster, Arc of Templar, Baby Octopus, Crab King 2, Fire Kirin 2, Eagle Eyes, Golden Toad, and Circus.',
    image: siteData.assets.fishBanner,
  },
  '/slots': {
    title: 'Fire Kirin Slots',
    description: 'Play Fire Kirin slots: 4th of July, Aladdin\'s Lamp, Buffalo 777, Pink Perfume, Olympus, Fantasy Forest, China Town, and Caribbean Pirates.',
    image: siteData.assets.slotBanner,
  },
  '/blog': {
    title: 'Fire Kirin Blog: Fish Tables and Slots',
    description: 'Short notes on Fire Kirin fish tables, slot cabinets, and playing the lobby from a browser or a phone.',
    image: siteData.assets.fishBanner,
  },
  '/contact': {
    title: 'Contact Fire Kirin',
    description: 'Contact Fire Kirin at (844) 660-7600 for lobby help, or open the vendor desk if you run fish tables.',
    image: siteData.assets.lobby,
  },
  '/account': {
    title: 'Create a Free Fire Kirin Account',
    description: 'Request a free Fire Kirin player account for fish games, slots, and the same profile on Android and iOS.',
    image: siteData.assets.lobby,
  },
  '/vendor': {
    title: 'Become a Fire Kirin Vendor',
    description: 'Request a Fire Kirin vendor account if you run fish tables or slot cabinets. This desk is separate from player signup.',
    image: siteData.assets.lobby,
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
    telephone: '+1-844-660-7600',
  };
}

function website() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: 'Fire Kirin',
    description: HOME_DESCRIPTION,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

function breadcrumb(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
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

export function pageSeo(pathname) {
  const path = canonicalPath(pathname);
  const parts = path.split('/').filter(Boolean);
  const game = parts.length === 2 ? siteData.games.find((item) => item.id === parts[1]) : null;

  if (parts.length === 2 && !game) {
    return missingSeo();
  }

  if (game && (parts[0] === 'fish-games' || parts[0] === 'slots')) {
    const section = game.category === 'slot' ? 'Slots' : 'Fish Games';
    const sectionPath = game.category === 'slot' ? '/slots' : '/fish-games';
    const description = `${game.title} on Fire Kirin. ${game.blurb}`.slice(0, 160);
    return {
      title: `${game.title} | Fire Kirin`,
      description,
      path,
      image: absolute(game.image),
      robots: 'index, follow, max-image-preview:large',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          organization(),
          website(),
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

  return {
    title: page.title,
    description: page.description,
    path,
    image: absolute(page.image),
    robots: 'index, follow, max-image-preview:large',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [organization(), website(), breadcrumb([{ name: 'Home', path: '/' }, ...(path === '/' ? [] : [{ name: page.title, path }])]), ...extra],
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

export function indexablePages() {
  const staticPaths = Object.keys(pages);
  const gamePaths = siteData.games.map((game) => (
    game.category === 'slot' ? `/slots/${game.id}` : `/fish-games/${game.id}`
  ));
  return [...staticPaths, ...gamePaths].map((path) => pageSeo(path));
}

export function snapshotHtml(seo) {
  const games = seo.path === '/slots'
    ? siteData.games.filter((game) => game.category === 'slot')
    : seo.path === '/fish-games'
      ? siteData.games.filter((game) => game.category === 'fish')
      : seo.path === '/games' || seo.path === '/'
        ? siteData.games
        : [];
  const links = games.map((game) => {
    const href = game.category === 'slot' ? `/slots/${game.id}` : `/fish-games/${game.id}`;
    return `<li><a href="${href}">${game.title}</a></li>`;
  }).join('');
  return `<article><h1>${escapeHtml(seo.title.replace(/ \| Fire Kirin$/, ''))}</h1><p>${escapeHtml(seo.description)}</p>${links ? `<ul>${links}</ul>` : ''}</article>`;
}

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
