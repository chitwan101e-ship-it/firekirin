const DISMISS_KEY = 'fk-connect-dismissed';

export const ConnectCard = {
  render(container) {
    container.className = 'connect-card';
    container.setAttribute('role', 'dialog');
    container.setAttribute('aria-label', 'Follow Fire Kirin');
    container.hidden = true;
    container.innerHTML = `
      <span class="connect-notch" aria-hidden="true"></span>
      <button class="connect-close" type="button" aria-label="Close">
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.2 3.2l9.6 9.6M12.8 3.2L3.2 12.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      </button>
      <div class="connect-icons" aria-hidden="true">
        <span class="connect-fb">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 8.5V6.8c0-.7.5-1 1.2-1H17V3h-2.1C12.2 3 11 4.4 11 6.6v1.9H9v2.7h2V21h3.5v-9.8h2.3l.4-2.7h-2.7z"/></svg>
        </span>
        <span class="connect-chat">
          <svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="M6 7.5h12a2 2 0 0 1 2 2v5.2a2 2 0 0 1-2 2H11l-3.6 2.6v-2.6H6a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2z"/></svg>
        </span>
      </div>
      <p class="connect-kicker">Fire Kirin · Let's connect</p>
      <p class="connect-title">Follow the stories.<br>Say hello.</p>
      <p class="connect-copy">Find us on Facebook or send a message when our page goes live.</p>
      <button class="connect-cta" type="button">
        <span>Facebook · Coming soon</span>
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h10M11 6l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    `;

    const dismiss = () => {
      container.classList.remove('is-visible');
      sessionStorage.setItem(DISMISS_KEY, '1');
      window.setTimeout(() => {
        container.hidden = true;
      }, 420);
    };

    container.querySelector('.connect-close').addEventListener('click', dismiss);

    if (sessionStorage.getItem(DISMISS_KEY) === '1') return;

    let shown = false;
    const reveal = () => {
      if (shown || sessionStorage.getItem(DISMISS_KEY) === '1') return;
      if (window.scrollY < 140) return;
      shown = true;
      container.hidden = false;
      requestAnimationFrame(() => container.classList.add('is-visible'));
    };

    window.addEventListener('scroll', reveal, { passive: true });
    reveal();
  },
};
