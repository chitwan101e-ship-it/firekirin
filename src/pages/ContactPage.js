export const ContactPage = {
  render(container) {
    container.className = 'site-main';
    container.innerHTML = `
      <div class="page">
        <div class="page-head">
          <p class="eyebrow">Contact</p>
          <h1>Talk to the desk</h1>
          <p class="lede">Questions about an account, a table, or the phone app. Vendors have a separate door.</p>
        </div>
        <div class="split">
          <div class="glass-card" style="padding:28px">
            <p class="kicker">Desk</p>
            <h2 class="section-title" style="text-align:left">Send a note</h2>
            <p class="section-copy" style="text-align:left;margin-left:0">Questions about a table or the lobby can go through the form. If you want to run tables rather than play them, use the vendor request.</p>
            <a class="btn btn-ghost" href="/vendor" data-route="/vendor">Become a vendor</a>
          </div>
          <form class="glass-card plain-form" style="padding:28px" data-contact>
            <input required placeholder="Name" aria-label="Name" autocomplete="name">
            <input required type="email" placeholder="Email" aria-label="Email" autocomplete="email">
            <textarea required rows="5" placeholder="Message" aria-label="Message"></textarea>
            <button class="btn btn-gold" type="submit">Send message</button>
            <p class="form-note" data-done hidden>This demo keeps the note on this page. Nothing was sent.</p>
          </form>
        </div>
      </div>`;
    const form = container.querySelector('[data-contact]');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.reset();
      form.querySelector('[data-done]').hidden = false;
    });
  },
};
