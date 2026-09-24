import siteData from '../data/site.json';
import { gameCard, bindReveal } from '../components/gameCard.js';

export const FishGamesPage = {
  render(container) {
    this.destroy?.();
    container.className = 'site-main';
    const games = siteData.games.filter((game) => game.category === 'fish');
    container.innerHTML = `
      <div class="page">
        <div class="page-head">
          <p class="eyebrow">Fish games</p>
          <h1>Underwater tables</h1>
          <p class="lede">Cannons, bosses, and schools that cross the screen. These are the titles the lobby leads with.</p>
        </div>
        <div class="card-grid">${games.map(gameCard).join('')}</div>
      </div>`;
    this.cleanup = bindReveal(container);
  },
  destroy() {
    this.cleanup?.();
  },
};
