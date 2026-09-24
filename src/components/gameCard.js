export function gameHref(game) {
  const root = game.category === 'slot' ? '/slots' : '/fish-games';
  return `${root}/${game.id}`;
}

export function artMarkup(game) {
  if (game.image) {
    return `<div class="art art-photo"><img src="${game.image}" alt="${game.title}"></div>`;
  }
  return `<div class="art art-${game.art}" style="--hue:${game.hue}">${artInner(game.art, game.title)}</div>`;
}

function artInner(art, title) {
  if (art === 'slot') {
    const columns = [
      ['7', '★', 'BAR', '◆'],
      ['★', '7', '◆', 'BAR'],
      ['BAR', '◆', '7', '★'],
    ];
    return `<div class="reels">${columns
      .map(
        (col, index) => `
        <div class="reel" style="--delay:${index * -0.4}s">
          <div class="reel-strip">${[...col, ...col].map((symbol) => `<span>${symbol}</span>`).join('')}</div>
        </div>`
      )
      .join('')}</div>`;
  }

  if (art === 'tentacle') {
    return `
      <svg class="tentacles" viewBox="0 0 240 150" aria-hidden="true">
        <ellipse cx="120" cy="58" rx="28" ry="22"/>
        <path d="M96 70 C70 90, 80 130, 60 142"/>
        <path d="M108 74 C90 110, 120 120, 100 146"/>
        <path d="M120 76 C120 110, 140 120, 130 148"/>
        <path d="M134 74 C160 100, 150 128, 176 140"/>
        <circle cx="110" cy="54" r="3"/>
        <circle cx="130" cy="54" r="3"/>
      </svg>`;
  }

  if (art === 'crab') {
    return `
      <svg class="crab" viewBox="0 0 240 150" aria-hidden="true">
        <ellipse cx="120" cy="78" rx="42" ry="26"/>
        <path d="M78 70 C40 40, 30 90, 62 96"/>
        <path d="M162 70 C200 40, 210 90, 178 96"/>
        <circle cx="104" cy="70" r="4"/>
        <circle cx="136" cy="70" r="4"/>
      </svg>`;
  }

  if (art === 'eagle') {
    return `
      <svg class="eagle" viewBox="0 0 240 150" aria-hidden="true">
        <path d="M120 78 L40 50 L78 84 Z"/>
        <path d="M120 78 L200 50 L162 84 Z"/>
        <ellipse cx="120" cy="86" rx="16" ry="22"/>
        <path d="M120 64 L112 48 L128 48 Z"/>
      </svg>`;
  }

  if (art === 'lamp') {
    return `
      <svg class="lamp" viewBox="0 0 240 150" aria-hidden="true">
        <path d="M120 28 C150 28, 168 52, 160 78 C210 86, 196 122, 120 122 C44 122, 30 86, 80 78 C72 52, 90 28, 120 28 Z"/>
        <rect x="108" y="122" width="24" height="8" rx="2"/>
      </svg>`;
  }

  if (art === 'crest') {
    const letter = title.trim().charAt(0);
    return `<div class="crest"><span>${letter}</span></div>`;
  }

  return `
    <svg class="swimmer" viewBox="0 0 220 120" aria-hidden="true">
      <path d="M28 60 C62 22, 126 22, 150 60 C126 98, 62 98, 28 60 Z"/>
      <path d="M150 60 L188 34 L176 60 L188 86 Z"/>
      <circle cx="62" cy="54" r="4"/>
    </svg>
    <span class="bubble b1"></span>
    <span class="bubble b2"></span>`;
}

export function gameCard(game) {
  const href = gameHref(game);
  const kicker = game.category === 'slot' ? 'Slot' : 'Fish Game';
  return `
    <a class="game-card reveal" href="${href}" data-route="${href}">
      ${artMarkup(game)}
      <div class="game-card-body">
        <p class="kicker">${kicker}</p>
        <h3>${game.title}</h3>
        <p>${game.blurb}</p>
        <span class="text-link">Enter table</span>
      </div>
    </a>`;
}

export function bindReveal(root) {
  const nodes = [...root.querySelectorAll('.reveal')];
  if (!nodes.length) return () => {};
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in');
      });
    },
    { threshold: 0.16 }
  );
  nodes.forEach((node) => observer.observe(node));
  return () => observer.disconnect();
}
