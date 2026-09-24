import { signupMarkup, bindSignup } from '../components/signupForm.js';

export const AccountPage = {
  render(container) {
    container.className = 'site-main';
    container.innerHTML = `
      <div class="page">
        <div class="split">
          <div>
            <p class="eyebrow">Create free account</p>
            <h1>Get a Fire Kirin player account</h1>
            <p class="lede">Same form as the home page. Use it to request access to the fish tables, slots, and the phone lobby.</p>
          </div>
          <div class="signup-card">${signupMarkup()}</div>
        </div>
      </div>`;
    bindSignup(container);
  },
};
