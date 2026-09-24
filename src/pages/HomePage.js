import siteData from '../data/site.json';
import { gameCard, bindReveal } from '../components/gameCard.js';

let stopReveal = () => {};
let carouselTimer = 0;

const names = siteData.games.map((game) => game.title).join('<span>◆</span>');

export const HomePage = {
  render(container) {
    this.destroy();
    container.className = 'site-main';
    const hot = siteData.games.slice(0, 8);
    container.innerHTML = `
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">The Ultimate Fish Games and Slots</p>
          <h1 class="hero-title"><span>Fire Kirin</span><span>Online Sweepstakes</span></h1>
          <p class="lede">A lobby built for fish tables, slots, and keno. Same account in the browser or on your phone, with the creature holding the floor.</p>
          <div class="hero-actions">
            <a class="btn btn-gold" href="/account" data-route="/account">Join Now</a>
            <a class="btn btn-ghost" href="/games" data-route="/games">Play FK</a>
          </div>
          <p class="status-chip"><span class="pulse"></span> Fish tables, slots, and keno in one lobby</p>
        </div>
        <div class="hero-stage" aria-hidden="true"></div>
      </section>

      <section class="band">
        <div class="wrap">
          <p class="eyebrow">What exactly is Fire Kirin?</p>
          <h2 class="section-title">A sweepstakes lobby with a pulse</h2>
          <p class="section-copy">Fire Kirin is a sweepstakes gaming floor: fish games up front, slots beside them, and keno when you want a slower read. The point is the same on every title. Keep playing, learn the table, and stay in the action from home.</p>
          <div class="pillars">
            <article class="pillar glass-card reveal"><h3>Fish tables</h3><p>Ocean Monster, Arc of Templar, Baby Octopus, Crab King 2, and the namesake Fire Kirin 2.</p></article>
            <article class="pillar glass-card reveal"><h3>Slots</h3><p>4th of July, Aladdin's Lamp, Buffalo 777, Olympus, and a few quieter cabinets.</p></article>
            <article class="pillar glass-card reveal"><h3>From home</h3><p>No extra launcher required to look around. Open the lobby, then take it to your phone when you want.</p></article>
          </div>
        </div>
      </section>

      <section class="band">
        <div class="wrap">
          <div class="row-head">
            <div>
              <p class="eyebrow">Check out some of the hottest Fire Kirin games</p>
              <h2 class="section-title">Hottest tables tonight</h2>
            </div>
            <div class="row-controls">
              <button class="icon-btn" type="button" data-prev aria-label="Previous slide">←</button>
              <button class="icon-btn" type="button" data-next aria-label="Next slide">→</button>
            </div>
          </div>
          <div class="hot-row">${hot.map(gameCard).join('')}</div>
        </div>
      </section>

      <div class="marquee" aria-hidden="true">
        <div class="marquee-track">${names}<span>◆</span>${names}<span>◆</span></div>
      </div>

      <section class="band">
        <div class="wrap story-grid">
          <div class="reveal">
            <h2 class="section-title">Fire Kirin fish games and slots</h2>
            <p class="section-copy" style="text-align:left;margin-left:0">The floor mixes fast fish tables with slot cabinets: Arc of Templar, Ocean Monster, Baby Octopus, Circus, Crocodile Adventure, Eagle Eyes, Golden Toad, Meteor Shower, Buffalo 777, Fruit Party, Keno Ball, and Happy Farm. Play them in the browser, then keep the session on a phone.</p>
            <div class="inline-actions" style="justify-content:flex-start">
              <a class="btn btn-gold" href="/fish-games" data-route="/fish-games">Fish games</a>
              <a class="btn btn-ghost" href="/slots" data-route="/slots">Play slots</a>
            </div>
          </div>
          <div class="story-photos reveal">
            <img src="${siteData.assets.fishBanner}" alt="Play Fire Kirin fish games">
            <img src="${siteData.assets.slotBanner}" alt="Play Fire Kirin slots">
          </div>
        </div>
      </section>

      <section class="band">
        <div class="wrap">
          <p class="eyebrow">Cabinet stills</p>
          <h2 class="section-title">Art from the floor</h2>
          <div class="still-grid">
            ${siteData.stills.map((still) => `
              <figure class="still reveal">
                <img src="${still.src}" alt="${still.alt}">
                <figcaption>${still.alt}</figcaption>
              </figure>`).join('')}
          </div>
        </div>
      </section>

      <section class="band">
        <div class="wrap">
          <p class="eyebrow">Download Fire Kirin for Android and iOS, or play online</p>
          <h2 class="section-title">Play online, or take the lobby with you</h2>
          <p class="section-copy">The browser lobby is the fastest way in. Android and Apple builds sit behind a free account so the same profile follows you.</p>
          <div class="download-grid">
            <article class="download-card reveal">
              <img src="${siteData.assets.androidIcon}" alt="Android">
              <h3>Android</h3>
              <p>Ask for the Android build when you request an account. This demo does not host an APK.</p>
              <div class="inline-actions" style="justify-content:flex-start"><a class="btn btn-gold" href="/account" data-route="/account">Get the account</a></div>
            </article>
            <article class="download-card reveal">
              <img src="${siteData.assets.iosIcon}" alt="Apple iOS">
              <h3>Apple iOS</h3>
              <p>The iOS path uses the same signup. Open the online lobby first if you want to look around tonight.</p>
              <div class="inline-actions" style="justify-content:flex-start"><a class="btn btn-ghost" href="/games" data-route="/games">Play online</a></div>
            </article>
          </div>
        </div>
      </section>
    `;

    stopReveal = bindReveal(container);

    const scroller = container.querySelector('.hot-row');
    const advance = (direction) => {
      const amount = Math.max(280, scroller.clientWidth * 0.8) * direction;
      const atEnd = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 12;
      if (direction > 0 && atEnd) scroller.scrollTo({ left: 0, behavior: 'smooth' });
      else scroller.scrollBy({ left: amount, behavior: 'smooth' });
    };
    container.querySelector('[data-next]').addEventListener('click', () => advance(1));
    container.querySelector('[data-prev]').addEventListener('click', () => advance(-1));
    carouselTimer = window.setInterval(() => advance(1), 4200);
  },

  destroy() {
    window.clearInterval(carouselTimer);
    stopReveal();
    stopReveal = () => {};
  },
};
