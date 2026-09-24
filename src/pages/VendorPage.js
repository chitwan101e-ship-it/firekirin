export const VendorPage = {
  render(container) {
    container.className = 'site-main';
    container.innerHTML = `
      <div class="page">
        <div class="split">
          <div>
            <p class="eyebrow">Contact / Become a vendor</p>
            <h1>Run a Fire Kirin floor</h1>
            <p class="lede">Tell us about the location and how players reach you. This desk is separate from player signup.</p>
          </div>
          <form class="signup-card plain-form" data-vendor>
            <input required placeholder="Business name" aria-label="Business name">
            <input required placeholder="Your name" aria-label="Your name" autocomplete="name">
            <input required type="email" placeholder="Email" aria-label="Email" autocomplete="email">
            <input required placeholder="Phone" aria-label="Phone" autocomplete="tel">
            <textarea required rows="5" placeholder="Where you operate and what you need" aria-label="Message"></textarea>
            <button class="btn btn-gold" type="submit">Request a vendor account</button>
            <p class="form-note" data-done hidden>Demo only. This request stayed in the browser.</p>
          </form>
        </div>
      </div>`;
    const form = container.querySelector('[data-vendor]');
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
