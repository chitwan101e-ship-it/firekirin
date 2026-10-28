import siteData from '../data/site.json';

function itemMarkup(item) {
  if (item.children?.length) {
    const menuId = `menu-${item.path.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')}`;
    return `
      <div class="has-sub">
        <div class="sub-head">
          <a href="${item.path}" data-route="${item.path}" data-nav>${item.label}</a>
          <button class="sub-toggle" type="button" aria-expanded="false" aria-controls="${menuId}" aria-label="Show ${item.label}">
            <svg viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
        <div class="menu-sub" id="${menuId}">
          ${item.children.map((child) => `<a href="${child.path}" data-route="${child.path}" data-nav>${child.label}</a>`).join('')}
        </div>
      </div>`;
  }
  return `<a href="${item.path}" data-route="${item.path}" data-nav>${item.label}</a>`;
}

export const Header = {
  render(container) {
    container.className = 'site-header';
    container.innerHTML = `
      <div class="progress" aria-hidden="true"><span></span></div>
      <div class="header-bar">
        <a class="brand" href="/" data-route="/" data-nav aria-label="Fire Kirin home">
          <img class="brand-logo" src="${siteData.assets.logo}" alt="Fire Kirin">
        </a>
        <nav class="nav-links" id="site-nav">
          ${siteData.navigation.map(itemMarkup).join('')}
        </nav>
        <a class="btn btn-gold header-join" href="/contact" data-route="/contact">Join Now</a>
        <button class="nav-toggle" type="button" aria-label="Menu Toggle" aria-expanded="false" aria-controls="site-nav">
          <span></span>
        </button>
      </div>
    `;

    const toggle = container.querySelector('.nav-toggle');
    const nav = container.querySelector('.nav-links');
    const closeSubs = () => {
      nav.querySelectorAll('.has-sub.is-open').forEach((item) => {
        item.classList.remove('is-open');
        item.querySelector('.sub-toggle')?.setAttribute('aria-expanded', 'false');
      });
    };
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (!open) closeSubs();
    });
    nav.querySelectorAll('.sub-toggle').forEach((button) => {
      button.addEventListener('click', () => {
        const item = button.closest('.has-sub');
        const open = !item.classList.contains('is-open');
        closeSubs();
        item.classList.toggle('is-open', open);
        button.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });

    const bar = container.querySelector('.progress > span');
    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    }, { passive: true });
  },

  setActive(path) {
    document.querySelectorAll('[data-nav]').forEach((link) => {
      const href = link.getAttribute('data-route');
      const active = href === path || (href !== '/' && path.startsWith(href));
      link.classList.toggle('is-active', active);
    });
    document.querySelector('.nav-links')?.classList.remove('is-open');
    document.querySelector('.nav-toggle')?.setAttribute('aria-expanded', 'false');
    document.querySelectorAll('.has-sub.is-open').forEach((item) => {
      item.classList.remove('is-open');
      item.querySelector('.sub-toggle')?.setAttribute('aria-expanded', 'false');
    });
  },
};
