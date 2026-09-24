import siteData from '../data/site.json';
import { gameCard, bindReveal } from '../components/gameCard.js';

export const GameListPage = {
  render(container) {
    this.destroy?.();
    container.className = 'site-main';
    container.innerHTML = `
      <div class="page">
        <div class="page-head">
          <p class="eyebrow">Game list</p>
          <h1>Every table in the lobby</h1>
          <p class="lede">Fish games and slots on one floor. Open a card to see the table, then head to signup if you want an account.</p>
        </div>
        <div class="card-grid">${siteData.games.map(gameCard).join('')}</div>
      </div>`;
    this.cleanup = bindReveal(container);
  },
  destroy() {
    this.cleanup?.();
  },
};
