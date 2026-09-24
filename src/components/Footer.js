import siteData from '../data/site.json';

const fish = siteData.games.filter((game) => game.category === 'fish');
const slots = siteData.games.filter((game) => game.category === 'slot');

export const Footer = {
  render(container) {
    container.className = 'site-footer';
    container.innerHTML = `
      <div class="footer-grid">
        <div>
          <h3>Fire Kirin</h3>
          <p>Fish tables, slots, and keno in one sweepstakes lobby. Play in the browser, or take the same account to your phone.</p>
          <div class="tag-row">
            <a href="/games" data-route="/games">Fire Kirin Online</a>
            <a href="/fish-games" data-route="/fish-games">Fish Games</a>
            <a href="/slots" data-route="/slots">Slots</a>
            <a href="/account" data-route="/account">Login</a>
          </div>
        </div>
        <div>
          <h4>Lobby</h4>
          <ul>
            <li><a href="/" data-route="/">Home</a></li>
            <li><a href="/about" data-route="/about">About</a></li>
            <li><a href="/games" data-route="/games">Game List</a></li>
            <li><a href="/blog" data-route="/blog">Blog</a></li>
            <li><a href="/contact" data-route="/contact">Contact</a></li>
            <li><a href="/vendor" data-route="/vendor">Become A Vendor</a></li>
          </ul>
        </div>
        <div>
          <h4>Fish Games</h4>
          <ul>
            ${fish.map((game) => `<li><a href="/fish-games/${game.id}" data-route="/fish-games/${game.id}">${game.title}</a></li>`).join('')}
          </ul>
        </div>
        <div>
          <h4>Slots</h4>
          <ul>
            ${slots.map((game) => `<li><a href="/slots/${game.id}" data-route="/slots/${game.id}">${game.title}</a></li>`).join('')}
          </ul>
        </div>
      </div>
      <p class="legal">Copyright &copy; ${new Date().getFullYear()} Fire Kirin Online Game. All Rights Reserved.</p>
    `;
  },
};
