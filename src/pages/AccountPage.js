import { signupMarkup } from '../components/signupForm.js';

export const AccountPage = {
  render(container) {
    container.className = 'site-main';
    container.innerHTML = `
      <div class="page">
        <div class="split">
          <div>
            <p class="eyebrow">Create free account</p>
            <h1>Get a Fire Kirin player account</h1>
            <p class="lede">Player signup is coming soon. The form shows the request that will open: your name, email, a photo ID, and a short note for the fish tables, slots, and the phone lobby.</p>
            <p class="lede">Browse the <a href="/games" data-route="/games">game list</a> while this desk is closed.</p>
          </div>
          <div class="signup-card coming-soon-card">
            <p class="coming-soon-flag">Coming soon</p>
            ${signupMarkup()}
          </div>
        </div>
      </div>`;
  },
};
