import siteData from '../data/site.json';
import { gameCard, bindReveal } from '../components/gameCard.js';

export const SlotsPage = {
  render(container) {
    this.destroy?.();
    container.className = 'site-main';
    const games = siteData.games.filter((game) => game.category === 'slot');
    container.innerHTML = `
      <div class="page">
        <div class="page-head">
          <p class="eyebrow">Slots</p>
          <h1>Reels beside the fish tables</h1>
          <p class="lede">Fireworks, lamps, buffalo, and a few quieter cabinets when you want the lobby without the cannon.</p>
        </div>
        <div class="card-grid">${games.map(gameCard).join('')}</div>
      </div>`;
    this.cleanup = bindReveal(container);
  },
  destroy() {
    this.cleanup?.();
  },
};
