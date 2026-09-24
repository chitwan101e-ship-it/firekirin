import siteData from '../data/site.json';
import { gameCard, artMarkup, bindReveal } from '../components/gameCard.js';

export const GameDetailPage = {
  render(container, gameId) {
    this.destroy?.();
    container.className = 'site-main';
    const game = siteData.games.find((item) => item.id === gameId);
    if (!game) {
      container.innerHTML = `
        <div class="page">
          <div class="page-head">
            <p class="eyebrow">Missing table</p>
            <h1>That game isn't on the floor</h1>
            <a class="btn btn-gold" href="/games" data-route="/games">Back to the game list</a>
          </div>
        </div>`;
      return;
    }

    const related = siteData.games.filter((item) => item.category === game.category && item.id !== game.id).slice(0, 3);
    const back = game.category === 'slot' ? '/slots' : '/fish-games';
    container.innerHTML = `
      <div class="page game-detail">
        <nav class="crumbs" aria-label="Breadcrumb">
          <a href="/" data-route="/">Home</a>
          <a href="${back}" data-route="${back}">${game.category === 'slot' ? 'Slots' : 'Fish Games'}</a>
          <span aria-current="page">${game.title}</span>
        </nav>
        <div class="detail-hero">
          ${artMarkup(game)}
          <div>
            <p class="eyebrow">${game.category === 'slot' ? 'Slot' : 'Fish game'}</p>
            <h1>${game.title}</h1>
            <p class="lede">${game.blurb}</p>
            <div class="inline-actions" style="justify-content:flex-start">
              <a class="btn btn-gold" href="/account" data-route="/account">Play with a free account</a>
              <a class="btn btn-ghost" href="${back}" data-route="${back}">More like this</a>
            </div>
          </div>
        </div>
        ${game.shots?.length ? `<div class="shot-row">${game.shots.map((src) => `<figure class="shot"><img src="${src}" alt="${game.title} gameplay"></figure>`).join('')}</div>` : ''}
        <div class="glass-card" style="padding:24px">
          <h2 class="section-title" style="text-align:left">At the table</h2>
          <ul class="feature-list">
            <li><strong>Short rounds.</strong> Built for sessions you can start from the couch and leave when you want.</li>
            <li><strong>Lobby neighbors.</strong> Jump to a related ${game.category === 'slot' ? 'slot' : 'fish table'} without going back through the home page.</li>
            <li><strong>Same account.</strong> Browser, Android, and iOS are meant to share one signup.</li>
          </ul>
        </div>
        <div>
          <h2 class="section-title" style="text-align:left">Also on this floor</h2>
          <div class="card-grid">${related.map(gameCard).join('')}</div>
        </div>
      </div>`;
    this.cleanup = bindReveal(container);
  },
  destroy() {
    this.cleanup?.();
  },
};
