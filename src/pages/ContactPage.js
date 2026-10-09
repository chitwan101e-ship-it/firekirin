const FACEBOOK_URL = 'https://www.facebook.com/share/1KJhLtD1S6/';

const channels = [
  {
    name: 'Facebook',
    href: FACEBOOK_URL,
    line: 'Open the page.',
    status: 'This channel is connected.',
    icon: `<span class="social-icon social-icon-facebook" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M14.2 8.4V6.9c0-.6.4-.8 1-.8H16.5V4h-1.8C12.2 4 11 5.2 11 7.2v1.2H9.2v2.4H11V20h3.2v-9.2h2l.4-2.4h-2.4z"/></svg></span>`,
  },
  {
    name: 'Telegram',
    icon: `<span class="social-icon social-icon-telegram" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M20.8 4.4 3.6 11c-1 .4-1 1.1-.2 1.4l4.4 1.4 1.7 5.3c.2.6.1.9.7.9.4 0 .6-.2.8-.4l2.5-2.4 4.4 3.2c.8.5 1.4.2 1.6-.8l2.9-13.4c.3-1.2-.5-1.8-1.6-1.4zM9.4 13.7l8.6-5.4c.4-.2.8 0 .5.3l-7.3 6.6-.3 3.1-1.5-4.6z"/></svg></span>`,
  },
  {
    name: 'Messenger',
    icon: `<span class="social-icon social-icon-messenger" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 3C6.8 3 2.8 6.7 2.8 11.3c0 2.6 1.3 5 3.4 6.5v3.4l3.1-1.7c.8.2 1.7.4 2.7.4 5.2 0 9.2-3.7 9.2-8.3S17.2 3 12 3zm.9 11.1-2.3-2.5-4.5 2.5 5-5.3 2.4 2.5 4.4-2.5-5 5.3z"/></svg></span>`,
  },
  {
    name: 'Instagram',
    icon: `<span class="social-icon social-icon-instagram" aria-hidden="true"><svg viewBox="0 0 24 24"><rect width="24" height="24" rx="7" fill="url(#ig-grad)"/><circle cx="12" cy="12" r="4.1" fill="none" stroke="#fff" stroke-width="1.7"/><circle cx="17.1" cy="6.9" r="1.05" fill="#fff"/></svg></span>`,
  },
];

export const ContactPage = {
  render(container) {
    container.className = 'site-main';
    const cards = channels.map((channel) => {
      const body = `
        ${channel.icon}
        <h3>${channel.name}</h3>
        <p>${channel.line || 'Link coming soon.'}</p>
        <p class="social-status">${channel.status || 'This channel is not connected yet.'}</p>`;
      if (!channel.href) return `<article class="social-card">${body}</article>`;
      return `<a class="social-card" href="${channel.href}" target="_blank" rel="noopener noreferrer">${body}</a>`;
    }).join('');

    container.innerHTML = `
      <div class="page">
        <div class="page-head">
          <p class="eyebrow">Contact</p>
          <h1>Talk to the desk</h1>
          <p class="lede">Facebook is open. The other social channels and the message form are not open yet. Vendors still have a separate door.</p>
        </div>
        <section class="social-corners" aria-labelledby="social-corners-title">
          <h2 id="social-corners-title">Our social corners.</h2>
          <svg class="social-defs" aria-hidden="true" width="0" height="0">
            <defs>
              <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stop-color="#f9ce34"/>
                <stop offset="0.5" stop-color="#ee2a7b"/>
                <stop offset="1" stop-color="#6228d7"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="social-grid">${cards}</div>
        </section>
        <div class="split contact-split">
          <div class="glass-card contact-aside">
            <p class="kicker">Desk</p>
            <h2 class="section-title">Message form</h2>
            <p class="section-copy">The form on this page is closed for now. If you want to run tables rather than play them, use the vendor request.</p>
            <a class="btn btn-ghost" href="/vendor" data-route="/vendor">Become a vendor</a>
          </div>
          <div class="glass-card coming-soon-card">
            <p class="coming-soon-flag">Coming soon</p>
            <form class="plain-form is-disabled" aria-disabled="true">
              <input disabled placeholder="Name" aria-label="Name" autocomplete="name">
              <input disabled type="email" placeholder="Email" aria-label="Email" autocomplete="email">
              <textarea disabled rows="5" placeholder="Message" aria-label="Message"></textarea>
              <button class="btn btn-gold" type="submit" disabled>Coming soon</button>
              <p class="form-note">This form is not open yet.</p>
            </form>
          </div>
        </div>
      </div>`;
  },
};
