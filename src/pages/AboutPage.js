import siteData from '../data/site.json';

const ICONS = {
  crosshair: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7.2"/><path d="M12 2.4v3.1M12 18.5v3.1M2.4 12h3.1M18.5 12h3.1"/>',
  people: '<circle cx="9" cy="8" r="2.2"/><circle cx="16" cy="9.2" r="1.7"/><path d="M4.6 18.4c.6-2.5 2.5-3.8 4.4-3.8s3.8 1.3 4.4 3.8"/><path d="M13.2 18.4c.4-1.7 1.5-2.8 2.8-2.8 1.1 0 2 .7 2.6 2"/>',
  phone: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18.2h2"/>',
  fish: '<path d="M14.2 12c0-3.3-2.5-5.4-6.4-5.4C4.4 6.6 3 9 3 12s1.4 5.4 4.8 5.4c3.9 0 6.4-2.1 6.4-5.4z"/><path d="M14 12.2 20.2 7.4v9.2L14 12.2z"/><circle cx="7.2" cy="11" r="0.7" fill="currentColor" stroke="none"/>',
  shield: '<path d="M12 3.2 19 6v5.5c0 4.1-2.7 7-7 8.8-4.3-1.8-7-4.7-7-8.8V6L12 3.2z"/>',
  coin: '<circle cx="12" cy="12" r="7.4"/><path d="m12 8 1.05 2.25 2.45.3-1.8 1.65.48 2.45L12 13.45 9.82 14.65l.48-2.45-1.8-1.65 2.45-.3L12 8z"/>',
  globe: '<circle cx="12" cy="12" r="7.4"/><path d="M4.6 12h14.8M12 4.6c1.9 2.1 2.9 4.5 2.9 7.4s-1 5.3-2.9 7.4c-1.9-2.1-2.9-4.5-2.9-7.4s1-5.3 2.9-7.4z"/>',
};

function aboutIcon(name, extra = '') {
  return `<span class="about-icon ${extra}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg></span>`;
}

export const AboutPage = {
  render(container) {
    container.className = 'site-main';
    container.innerHTML = `
      <div class="page">
        <div class="page-head">
          <p class="eyebrow">About</p>
          <h1>What Fire Kirin is</h1>
          <p class="lede">Fire Kirin is a multiplayer, arcade-style fishing game that started in East Asia and caught on across phones and the web. Players share a table, aim a cannon, and shoot stylized fish, bosses, and sea creatures for points. This site is one lobby for that floor: fish tables, slots, and keno, in the browser or on a phone. It is for adults, and the play is entertainment.</p>
        </div>
        <div class="pillars">
          <article class="pillar glass-card">${aboutIcon('crosshair', 'is-gold')}<h3>Shoot to capture</h3><p>A cannon with adjustable firepower. Each creature pays a different multiplier, and the rare ones carry the large rewards.</p></article>
          <article class="pillar glass-card">${aboutIcon('people')}<h3>One shared table</h3><p>Several players sit on the same playfield in real time. The server decides the hit.</p></article>
          <article class="pillar glass-card">${aboutIcon('phone', 'is-gold')}<h3>Phone, web, cabinet</h3><p>iPhone, Android, an HTML5 lobby, and arcade cabinets. Local rooms often keep the engine and change the art.</p></article>
        </div>
        <div class="about-highlights">
          <article class="about-highlight is-green">
            <div>
              <h3>For adults</h3>
              <p>18 and older. Fish tables, slots, and keno, played as entertainment.</p>
            </div>
            ${aboutIcon('shield')}
          </article>
          <article class="about-highlight is-gold">
            <div>
              <h3>Credits and VIP</h3>
              <p>Free to enter, then credits, special bullets, events, and VIP rooms.</p>
            </div>
            ${aboutIcon('coin')}
          </article>
          <article class="about-highlight is-deep">
            <div>
              <h3>Local rooms</h3>
              <p>Southeast Asia, China, and Latin America, usually under a local brand.</p>
            </div>
            ${aboutIcon('globe')}
          </article>
        </div>
        <img class="about-banner" src="${siteData.assets.lobby}" alt="Fire Kirin fish tables and slot games">
        <div class="about-stack">
          <section class="glass-card about-block">
            <h2>${aboutIcon('crosshair', 'is-gold')}How a round works</h2>
            <ul class="feature-list">
              <li class="about-point">${aboutIcon('crosshair', 'is-gold')}<div><strong>The cannon.</strong> You set the firepower and can switch to a special bullet. A heavier shot costs more and reaches the targets a light shot only nicks.</div></li>
              <li class="about-point">${aboutIcon('fish')}<div><strong>The fish.</strong> Small fish pay a small multiplier. Bosses and rare creatures are the jackpot targets. The table shows which is which once you have watched a round.</div></li>
              <li class="about-point">${aboutIcon('people')}<div><strong>The room.</strong> Other players are shooting the same school. Your phone draws the splash. The server records the hit and the points.</div></li>
            </ul>
          </section>
          <div class="split">
            <section class="glass-card about-block">
              <h2>${aboutIcon('phone')}Where people open it</h2>
              <p>Fire Kirin ships as a phone app, a web lobby, and a module for arcade cabinets and online rooms. A publisher in one country will re-skin the creatures, run its own holiday events, and plug in its own payments. The cannon-and-school loop stays recognizable underneath.</p>
              <p>On this site, open the <a href="/fish-games" data-route="/fish-games">fish games</a> or the <a href="/slots" data-route="/slots">slots</a> in the browser, including on a <a href="/blog/play-fire-kirin-on-chromebook" data-route="/blog/play-fire-kirin-on-chromebook">Chromebook</a>. The phone install is in the <a href="/blog/how-to-download-fire-kirin-android-iphone" data-route="/blog/how-to-download-fire-kirin-android-iphone">Android and iPhone guide</a>.</p>
            </section>
            <section class="glass-card about-block">
              <h2>${aboutIcon('fish')}This lobby</h2>
              <p>The fish row is <a href="/fish-games/ocean-monster" data-route="/fish-games/ocean-monster">Ocean Monster</a>, <a href="/fish-games/arc-of-templar" data-route="/fish-games/arc-of-templar">Arc of Templar</a>, <a href="/fish-games/baby-octopus" data-route="/fish-games/baby-octopus">Baby Octopus</a>, <a href="/fish-games/crab-king-2" data-route="/fish-games/crab-king-2">Crab King 2</a>, <a href="/fish-games/fire-kirin-2" data-route="/fish-games/fire-kirin-2">Fire Kirin 2</a>, and <a href="/fish-games/eagle-eyes" data-route="/fish-games/eagle-eyes">Eagle Eyes</a>, plus Golden Toad and Circus.</p>
              <p>Slots sit beside them: <a href="/slots/buffalo-777" data-route="/slots/buffalo-777">Buffalo 777</a>, Aladdin's Lamp, Olympus, and the rest of the <a href="/games" data-route="/games">game list</a>. Keno is there when you want a board. The same player ID is meant to follow you from the browser to the phone.</p>
            </section>
          </div>
          <section class="glass-card about-block">
            <h2>${aboutIcon('coin', 'is-gold')}Credits, events, and VIP rooms</h2>
            <p>Most Fire Kirin rooms let you in free, then sell credits, premium bullets, short-lived props, and a VIP tier. Holiday events and limited rooms are how a local operator makes a season feel different from the last one. Friends lists, leaderboards, and a back office for the operator are common around the game, because the engine was built to be licensed and reskinned.</p>
            <p>Some of those rooms are social play with virtual credits. Others are run as gambling, and the legal line is the one in your jurisdiction. This lobby is the entertainment floor: fish tables, slots, and keno. Play if you are 18 or older, and treat a session as entertainment.</p>
          </section>
          <section class="glass-card about-block">
            <h2>${aboutIcon('globe')}Who plays it</h2>
            <p>The strongest following is in Southeast Asia, China, and parts of Latin America, usually under a local brand rather than one global app. You will find the same shoot-to-capture table in social apps, in arcade halls that run tournaments, and on casino-style sites.</p>
            <p>A typical phone room licenses the engine, redraws the creatures for local taste, and hangs a festival event on the calendar. A typical arcade room puts several players on one cabinet and pays the winners of a local tournament. A VIP ladder, where more play opens a stronger cannon and a quieter room, shows up on the web portals.</p>
          </section>
          <section class="glass-card about-block">
            <h2>${aboutIcon('shield')}Before you sit down</h2>
            <ul class="feature-list">
              <li class="about-point">${aboutIcon('crosshair', 'is-gold')}<div><strong>Players.</strong> Learn the multiplier on the fish in front of you. Decide the size of the session before the first boss. An expensive bullet aimed at a rare target is the usual way a short visit gets expensive.</div></li>
              <li class="about-point">${aboutIcon('shield')}<div><strong>Operators.</strong> Age checks, spend limits, and odds a player can read belong on any room that sells credits. If you run tables, use the <a href="/vendor" data-route="/vendor">vendor desk</a>. That request stays separate from player signup.</div></li>
            </ul>
            <p class="about-note">Public descriptions of the Fire Kirin franchise, through 2024, are the source for the shared-table and licensing picture above. Art, events, payments, and legal status change with the publisher and the country. The games linked on this page are the ones on this floor.</p>
          </section>
          <div class="inline-actions">
            <a class="btn btn-gold" href="/games" data-route="/games">Browse the game list</a>
            <a class="btn btn-ghost" href="/blog/how-to-download-fire-kirin-android-iphone" data-route="/blog/how-to-download-fire-kirin-android-iphone">Android and iPhone guide</a>
          </div>
        </div>
      </div>`;
  },
};
