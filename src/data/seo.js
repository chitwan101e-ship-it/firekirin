import siteData from './site.json';

export const SITE_URL = 'https://firekirin.com';

const HOME_DESCRIPTION = 'Play Fire Kirin fish games and slots online. Ocean Monster, Arc of Templar, Baby Octopus, Buffalo 777, and more in one sweepstakes lobby.';

const PAGES = {
  '/': {
    title: 'Play Fire Kirin Online: Fish Games and Slots',
    description: HOME_DESCRIPTION,
    image: siteData.assets.lobby,
  },
  '/about': {
    title: 'About Fire Kirin | Fish Games and Slots',
    description: 'Fire Kirin is a sweepstakes lobby for fish tables, slots, and keno. See how the games are organized and how to play from home.',
    image: siteData.assets.lobby,
  },
  '/games': {
    title: 'Fire Kirin Game List | Fish Games and Slots',
    description: 'Browse every Fire Kirin fish game and slot, from Ocean Monster and Crab King 2 to Buffalo 777, Olympus, and Caribbean Pirates.',
    image: siteData.assets.lobby,
  },
  '/fish-games': {
    title: 'Fire Kirin Fish Games | Ocean Monster and More',
    description: 'Play Fire Kirin fish games: Ocean Monster, Arc of Templar, Baby Octopus, Crab King 2, Fire Kirin 2, Eagle Eyes, Golden Toad, and Circus.',
    image: siteData.assets.fishBanner,
  },
  '/slots': {
    title: 'Fire Kirin Slots | Buffalo 777 and More',
    description: 'Play Fire Kirin slots: 4th of July, Aladdin\'s Lamp, Buffalo 777, Pink Perfume, Olympus, Fantasy Forest, China Town, and Caribbean Pirates.',
    image: siteData.assets.slotBanner,
  },
  '/blog': {
    title: 'Fire Kirin Blog | Fish Tables and Slots',
    description: 'Short notes on Fire Kirin fish tables, slot cabinets, and playing the lobby from a browser or a phone.',
    image: siteData.assets.fishBanner,
  },
  '/contact': {
    title: 'Contact Fire Kirin | (844) 660-7600',
    description: 'Contact Fire Kirin at (844) 660-7600 for lobby help, or open the vendor desk if you run fish tables or slot cabinets.',
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

function gameNode(game) {
  const path = game.category === 'slot' ? `/slots/${game.id}` : `/fish-games/${game.id}`;
  return {
    '@type': 'Game',
    '@id': `${SITE_URL}${path}#game`,
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
  const base = {
    path,
    robots: 'index, follow, max-image-preview:large',
    image: siteData.assets.lobby,
  };

  if (parts.length === 2 && (parts[0] === 'fish-games' || parts[0] === 'slots')) {
    const game = siteData.games.find((item) => item.id === parts[1]);
    if (!game) {
      return {
        ...base,
        path: pathname,
        title: 'Page not found | Fire Kirin',
        description: 'That Fire Kirin page is not on the floor.',
        robots: 'noindex, follow',
        jsonLd: { '@context': 'https://schema.org', '@graph': [organization(), website()] },
      };
    }
    const section = game.category === 'slot'
      ? { name: 'Slots', path: '/slots' }
      : { name: 'Fish Games', path: '/fish-games' };
    const kind = game.category === 'slot' ? 'Slot' : 'Fish Game';
    return {
      ...base,
      title: `${game.title} ${kind} | Fire Kirin`,
      description: `${game.title} is a Fire Kirin ${kind.toLowerCase()}. ${game.blurb}`.slice(0, 160),
      image: game.image,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          organization(),
          website(),
          gameNode(game),
          breadcrumb([
            { name: 'Home', path: '/' },
            section,
            { name: game.title, path },
          ]),
        ],
      },
    };
  }

  const page = PAGES[path];
  if (!page) {
    return {
      ...base,
      path: pathname,
      title: 'Page not found | Fire Kirin',
      description: 'That Fire Kirin page is not on the floor.',
      robots: 'noindex, follow',
      jsonLd: { '@context': 'https://schema.org', '@graph': [organization(), website()] },
    };
  }

  const extra = [];
  if (path === '/games' || path === '/fish-games' || path === '/slots') {
    const list = siteData.games.filter((game) => {
      if (path === '/fish-games') return game.category === 'fish';
      if (path === '/slots') return game.category === 'slot';
      return true;
    });
    extra.push({
      '@type': 'ItemList',
      itemListElement: list.map((game, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: game.title,
        url: `${SITE_URL}${game.category === 'slot' ? '/slots' : '/fish-games'}/${game.id}`,
      })),
    });
  }

  return {
    ...base,
    title: page.title,
    description: page.description,
    image: page.image,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [organization(), website(), breadcrumb([{ name: 'Home', path: '/' }, ...(path === '/' ? [] : [{ name: page.title.split('|')[0].trim(), path }])], ...extra],
    },
  };
}

export function indexablePages() {
  const staticPages = Object.keys(PAGES);
  const games = siteData.games.map((game) => (game.category === 'slot' ? `/slots/${game.id}` : `/fish-games/${game.id}`));
  return [...staticPages, ...games];
}
