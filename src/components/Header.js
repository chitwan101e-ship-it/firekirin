import siteData from '../data/site.json';

function itemMarkup(item) {
  if (item.children?.length) {
    return `
      <div class="has-sub">
        <a href="${item.path}" data-route="${item.path}" data-nav>${item.label}</a>
        <div class="menu-sub">
          ${item.children.map((child) => `<a href="${child.path}" data-route="${child.path}" data-nav>${child.label}</a>`).join('')}
        </div>
      </div>`;
  }
  const accent = item.accent ? ' accent' : '';
  return `<a class="${accent.trim()}" href="${item.path}" data-route="${item.path}" data-nav>${item.label}</a>`;
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
        <a class="btn btn-gold header-join" href="/account" data-route="/account">Join Now</a>
        <button class="nav-toggle" type="button" aria-label="Menu Toggle" aria-expanded="false" aria-controls="site-nav">
          <span></span>
        </button>
      </div>
    `;

    const toggle = container.querySelector('.nav-toggle');
    const nav = container.querySelector('.nav-links');
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
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
  },
};
