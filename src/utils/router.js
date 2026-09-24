import { Header } from '../components/Header.js';
import { setSceneMode } from '../scene/loadScene.js';
import { applyHead } from '../seo/head.js';
import { canonicalPath, pageSeo } from '../seo/pages.js';
import { HomePage } from '../pages/HomePage.js';
import { AboutPage } from '../pages/AboutPage.js';
import { GameListPage } from '../pages/GameListPage.js';
import { FishGamesPage } from '../pages/FishGamesPage.js';
import { SlotsPage } from '../pages/SlotsPage.js';
import { BlogPage } from '../pages/BlogPage.js';
import { ContactPage } from '../pages/ContactPage.js';
import { AccountPage } from '../pages/AccountPage.js';
import { VendorPage } from '../pages/VendorPage.js';
import { GameDetailPage } from '../pages/GameDetailPage.js';

const routes = {
  '/': HomePage,
  '/about': AboutPage,
  '/games': GameListPage,
  '/fish-games': FishGamesPage,
  '/slots': SlotsPage,
  '/blog': BlogPage,
  '/contact': ContactPage,
  '/account': AccountPage,
  '/vendor': VendorPage,
};

let activePage = null;

function showMissing(container) {
  container.className = 'site-main';
  container.innerHTML = `
    <div class="page">
      <div class="page-head">
        <p class="eyebrow">404</p>
        <h1>Lost in the deep</h1>
        <p class="lede">That table isn't on the floor. Head back to the lobby.</p>
        <div class="inline-actions">
          <a class="btn btn-gold" href="/" data-route="/">Back home</a>
        </div>
      </div>
    </div>`;
}

export const router = {
  init() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[data-route]');
      if (!link) return;
      event.preventDefault();
      this.navigate(link.getAttribute('data-route'));
    });
  },

  navigate(path) {
    window.history.pushState({}, '', path);
    const main = document.getElementById('main-content');
    if (main) this.renderPage(main);
  },

  renderPage(container) {
    activePage?.destroy?.();
    activePage = null;
    const requested = window.location.pathname;
    const canonical = canonicalPath(requested);
    if (canonical !== requested && canonical !== '/404') {
      window.history.replaceState({}, '', canonical);
    }
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    const home = path === '/';
    document.body.classList.toggle('is-home', home);
    setSceneMode(home ? 'hero' : 'ambient');
    Header.setActive(path);

    if (parts.length === 2 && ['fish-games', 'slots', 'games'].includes(parts[0])) {
      activePage = GameDetailPage;
      GameDetailPage.render(container, parts[1]);
    } else if (routes[path]) {
      activePage = routes[path];
      routes[path].render(container);
    } else {
      showMissing(container);
    }

    applyHead(pageSeo(window.location.pathname));
    window.scrollTo(0, 0);
  },
};
