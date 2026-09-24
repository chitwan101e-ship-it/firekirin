import siteData from '../data/site.json';

export const AboutPage = {
  render(container) {
    container.className = 'site-main';
    container.innerHTML = `
      <div class="page">
        <div class="page-head">
          <p class="eyebrow">About</p>
          <h1>What exactly is Fire Kirin?</h1>
          <p class="lede">A sweepstakes lobby for people who like fish tables first and slots a close second. The floor is built to be played from home, in a browser or on a phone.</p>
        </div>
        <div class="pillars">
          <article class="pillar glass-card"><h3>Variety of games</h3><p>Fast fish tables, themed slots, and keno when you want a board instead of a cannon.</p></article>
          <article class="pillar glass-card"><h3>Play anywhere</h3><p>Start online. Keep the same account if you move to the Android or iOS app.</p></article>
          <article class="pillar glass-card"><h3>A clear desk</h3><p>Navigation stays short, support has a phone number, and vendors have their own request form.</p></article>
        </div>
        <img src="${siteData.assets.lobby}" alt="Fire Kirin fish and slot games" style="width:100%;height:360px;object-fit:cover;border-radius:24px;margin:22px 0">
        <div class="glass-card" style="padding:28px">
          <h2 class="section-title" style="text-align:left">How the lobby is organized</h2>
          <p class="section-copy" style="text-align:left;margin-left:0">Fish games sit together: Ocean Monster, Arc of Templar, Baby Octopus, Crab King 2, Fire Kirin 2, and Eagle Eyes. Slots have their own row, from 4th of July to Fantasy Forest. The signup on the home page is the front door. Vendors use a separate request so player accounts and floor partners don't share a form.</p>
          <div class="inline-actions" style="justify-content:flex-start">
            <a class="btn btn-gold" href="/account" data-route="/account">Create free account</a>
            <a class="btn btn-ghost" href="/games" data-route="/games">Browse the game list</a>
          </div>
        </div>
      </div>`;
  },
};
