import siteData from '../data/site.json';
import { gameCard, gameHref, bindReveal } from '../components/gameCard.js';

const POWERS = {
  1: {
    meter: '26%',
    copy: 'A cheap shot for the small school. Learn the multipliers before you spend on a boss.',
  },
  2: {
    meter: '58%',
    copy: 'Costs more, and it reaches the targets a light shot only nicks. This is the usual seat.',
  },
  3: {
    meter: '94%',
    copy: 'Rare creatures carry the large rewards. An expensive bullet on one of them is how a short visit gets expensive.',
  },
};

const LANE = [
  { kind: 'tang', y: '6%', w: '118px', dur: '13s', delay: '-2s', back: false },
  { kind: 'angel', y: '8%', w: '78px', dur: '16s', delay: '-8s', back: true },
  { kind: 'clown', y: '52%', w: '108px', dur: '11s', delay: '-5s', back: false },
  { kind: 'grouper', y: '18%', w: '160px', dur: '18s', delay: '-11s', back: true },
  { kind: 'shark', y: '46%', w: '200px', dur: '22s', delay: '-3s', back: false },
];

const SCHOOL = [
  { kind: 'dart', tier: 1, y: 0.0, x: 0.04, speed: 50, dir: 1, size: 128 },
  { kind: 'tang', tier: 1, y: 0.0, x: 0.58, speed: 34, dir: -1, size: 82 },
  { kind: 'koi', tier: 2, y: 0.26, x: 0.1, speed: 16, dir: -1, size: 136 },
  { kind: 'clown', tier: 1, y: 0.28, x: 0.66, speed: 28, dir: 1, size: 76 },
  { kind: 'shark', tier: 3, y: 0.5, x: 0.36, speed: 10, dir: -1, size: 196 },
  { kind: 'angel', tier: 1, y: 0.46, x: 0.78, speed: 15, dir: 1, size: 62 },
  { kind: 'grouper', tier: 2, y: 0.96, x: 0.42, speed: 12, dir: 1, size: 142 },
];

let stopReveal = () => {};
let stopTank = () => {};

function creature(kind) {
  return `<img src="/media/about-fish/${kind}.png" alt="" draggable="false">`;
}

function swimmer(item) {
  return `<span class="about-swimmer${item.back ? ' is-back' : ''}" style="--y:${item.y};--w:${item.w};--dur:${item.dur};--delay:${item.delay}">${creature(item.kind)}</span>`;
}

export const AboutPage = {
  render(container) {
    this.destroy();
    container.className = 'site-main';
    const fish = siteData.games.filter((game) => game.category === 'fish');
    const featured = fish.slice(0, 6);
    const tickerBits = ['Boss incoming', 'Shared table', 'Raise the cannon', ...siteData.games.map((game) => game.title)];
    const ticker = `${tickerBits.join('<span>◆</span>')}<span>◆</span>`;
    const chips = siteData.games.map((game) => {
      const href = gameHref(game);
      return `<a href="${href}" data-route="${href}">${game.title}</a>`;
    }).join('');

    container.innerHTML = `
      <div class="about-page">
        <section class="about-hero">
          <img class="about-hero-photo" src="${siteData.assets.lobby}" alt="Fire Kirin fish tables and slot games">
          <div class="about-hero-shade"></div>
          <div class="about-hero-copy">
            <p class="eyebrow">About Fire Kirin</p>
            <h1>One cannon.<br>One school.<br>The whole room.</h1>
            <p class="lede">A shared fish table. You set the firepower. The room shoots with you.</p>
            <p class="about-aside">Fire Kirin started in East Asia and caught on across phones and the web. Players share a table and shoot stylized fish, bosses, and sea creatures for points. This lobby is fish tables, slots, and keno, in the browser or on a phone. It is for adults, and the play is entertainment.</p>
            <div class="hero-actions">
              <a class="btn btn-gold" href="/fish-games" data-route="/fish-games">Open the fish tables</a>
              <a class="btn btn-ghost" href="/slots" data-route="/slots">Hit the slots</a>
            </div>
            <p class="status-chip"><span class="pulse"></span> 18+ · the splash is yours, the hit is the server's</p>
          </div>
        </section>

        <div class="marquee" aria-hidden="true">
          <div class="marquee-track">${ticker}${ticker}</div>
        </div>

        <section class="band">
          <div class="wrap">
            <p class="eyebrow">How a round feels</p>
            <h2 class="section-title">Turn the firepower up</h2>
            <div class="about-stage">
              <div class="about-tank" data-power="2" tabindex="0" aria-label="Aim the cannon and click to shoot. Arrow keys aim and change firepower. Space fires.">
                <p class="about-aim-hint">Drag to aim. Click to shoot.</p>
                <span class="about-bubble" style="--x:18%;--s:6px;--dur:9s;--delay:-2s"></span>
                <span class="about-bubble" style="--x:46%;--s:4px;--dur:12s;--delay:-7s"></span>
                <span class="about-bubble" style="--x:68%;--s:8px;--dur:10s;--delay:-4s"></span>
                <span class="about-bubble" style="--x:86%;--s:5px;--dur:8s;--delay:-1s"></span>
                <div class="about-school"></div>
                <div class="about-rig">
                  <span class="about-beam" aria-hidden="true"></span>
                  <svg class="about-gun" viewBox="0 0 150 72" aria-hidden="true">
                    <path fill="#14532d" d="M8 64c16 6 32 6 44-2V34H18c-6 8-10 18-10 30z"/>
                    <path fill="#39ff4a" opacity="0.35" d="M18 42h22v8H20c-3 0-4-3-2-6z"/>
                    <rect fill="#166534" x="40" y="30" width="78" height="16" rx="8"/>
                    <rect fill="#86efac" opacity="0.45" x="44" y="32" width="70" height="5" rx="2.5"/>
                    <rect fill="#052e16" x="110" y="24" width="26" height="28" rx="6"/>
                    <rect fill="#022c16" x="116" y="30" width="14" height="16" rx="3"/>
                    <circle fill="#39ff4a" cx="34" cy="40" r="15"/>
                    <circle fill="#052e16" cx="34" cy="40" r="6"/>
                  </svg>
                </div>
              </div>
              <div class="about-dial glass-card">
                <p class="eyebrow">Firepower</p>
                <div class="about-dial-btns" role="group" aria-label="Firepower">
                  <button type="button" data-power="1" aria-pressed="false">Light</button>
                  <button type="button" data-power="2" aria-pressed="true">Heavy</button>
                  <button type="button" data-power="3" aria-pressed="false">Boss</button>
                </div>
                <div class="about-meter" aria-hidden="true"><span style="width:${POWERS[2].meter}"></span></div>
                <p class="about-dial-copy" aria-live="polite">${POWERS[2].copy}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="band about-band-tight">
          <div class="wrap">
            <div class="about-moments">
              <article class="about-moment glass-card reveal">
                <p class="kicker">01</p>
                <h3>The cannon</h3>
                <p>You set the firepower and can switch to a special bullet. A heavier shot costs more and reaches the targets a light shot only nicks. Each creature pays a different multiplier, and the rare ones carry the large rewards.</p>
                <b aria-hidden="true">01</b>
              </article>
              <article class="about-moment glass-card reveal">
                <p class="kicker">02</p>
                <h3>The school</h3>
                <p>Small fish pay a small multiplier. Bosses and rare creatures are the jackpot targets. The table shows which is which once you have watched a round.</p>
                <b aria-hidden="true">02</b>
              </article>
              <article class="about-moment glass-card reveal">
                <p class="kicker">03</p>
                <h3>The room</h3>
                <p>Several players sit on the same playfield in real time. Your phone draws the splash. The server records the hit and the points.</p>
                <b aria-hidden="true">03</b>
              </article>
            </div>
          </div>
        </section>

        <section class="band">
          <div class="wrap">
            <p class="eyebrow">On this floor</p>
            <h2 class="section-title">Tables with a pulse</h2>
            <div class="about-games">${featured.map(gameCard).join('')}</div>
          </div>
        </section>

        <div class="about-lane" aria-hidden="true">${LANE.slice(0, 3).map(swimmer).join('')}</div>

        <section class="band about-air">
          <div class="wrap">
            <p class="eyebrow">Phone, web, cabinet</p>
            <h2 class="section-title">Same loop. New skin.</h2>
            <div class="about-lines">
              <p>Fire Kirin ships as a phone app, a web lobby, and a module for arcade cabinets and online rooms. A publisher in one country will re-skin the creatures, run its own holiday events, and plug in its own payments. The cannon-and-school loop stays recognizable underneath.</p>
            </div>
            <div class="about-shots">
              <a class="about-shot reveal" href="/blog/how-to-download-fire-kirin-android-iphone" data-route="/blog/how-to-download-fire-kirin-android-iphone">
                <img src="/media/fire-kirin-app.jpg" alt="Fire Kirin app on a phone">
                <span><b>Phone</b><em>iPhone and Android</em></span>
              </a>
              <a class="about-shot reveal" href="/fish-games" data-route="/fish-games">
                <img src="${siteData.assets.fishBanner}" alt="Play Fire Kirin fish games">
                <span><b>Browser</b><em>HTML5 lobby, Chromebook included</em></span>
              </a>
              <a class="about-shot reveal" href="/slots" data-route="/slots">
                <img src="${siteData.assets.slotBanner}" alt="Play Fire Kirin slots">
                <span><b>Cabinet</b><em>Local rooms keep the engine and change the art</em></span>
              </a>
            </div>
            <p class="about-one">On this site, open the <a href="/fish-games" data-route="/fish-games">fish games</a> or the <a href="/slots" data-route="/slots">slots</a> in the browser, including on a <a href="/blog/play-fire-kirin-on-chromebook" data-route="/blog/play-fire-kirin-on-chromebook">Chromebook</a>. The phone install is in the <a href="/blog/how-to-download-fire-kirin-android-iphone" data-route="/blog/how-to-download-fire-kirin-android-iphone">Android and iPhone guide</a>.</p>
          </div>
        </section>

        <section class="about-poster">
          <img src="${siteData.stills[0].src}" alt="${siteData.stills[0].alt}">
          <div class="about-poster-shade"></div>
          <div class="about-poster-copy">
            <p class="eyebrow">Credits, events, VIP</p>
            <h2>Walk in free.<br>Sit down loud.</h2>
            <ul class="about-pills">
              <li>Free to enter</li>
              <li>Credits</li>
              <li>Premium bullets</li>
              <li>VIP rooms</li>
              <li>Holiday events</li>
              <li>18+</li>
            </ul>
          </div>
        </section>

        <section class="band about-air">
          <div class="wrap">
            <div class="about-lines">
              <p>Most Fire Kirin rooms let you in free, then sell credits, premium bullets, short-lived props, and a VIP tier. Holiday events and limited rooms are how a local operator makes a season feel different from the last one.</p>
              <p>Friends lists, leaderboards, and a back office for the operator are common around the game, because the engine was built to be licensed and reskinned.</p>
              <p>Some of those rooms are social play with virtual credits. Others are run as gambling, and the legal line is the one in your jurisdiction. This lobby is the entertainment floor: fish tables, slots, and keno. Play if you are 18 or older, and treat a session as entertainment.</p>
            </div>
            <div class="about-chips">${chips}</div>
            <p class="about-one">The fish row is Ocean Monster, Arc of Templar, Baby Octopus, Crab King 2, Fire Kirin 2, and Eagle Eyes, plus Golden Toad and Circus. Slots sit beside them: Buffalo 777, Aladdin's Lamp, Olympus, and the rest of the <a href="/games" data-route="/games">game list</a>. Keno is there when you want a board. The same player ID is meant to follow you from the browser to the phone.</p>
          </div>
        </section>

        <div class="about-lane" aria-hidden="true">${LANE.slice(2).map(swimmer).join('')}</div>

        <section class="band about-air">
          <div class="wrap">
            <p class="eyebrow">Who plays</p>
            <div class="about-regions">
              <article class="reveal"><span>01</span><h3>Southeast Asia</h3></article>
              <article class="reveal"><span>02</span><h3>China</h3></article>
              <article class="reveal"><span>03</span><h3>Latin America</h3></article>
            </div>
            <p class="about-one">The strongest following is there, usually under a local brand rather than one global app. The same shoot-to-capture table shows up in social apps, in arcade halls that run tournaments, and on casino-style sites.</p>
            <div class="about-moments about-scenes">
              <article class="about-moment glass-card reveal">
                <p class="kicker">Social apps</p>
                <h3>A festival on the calendar</h3>
                <p>A phone room licenses the engine, redraws the creatures for local taste, and hangs a holiday event on the season.</p>
              </article>
              <article class="about-moment glass-card reveal">
                <p class="kicker">Arcade halls</p>
                <h3>Several players, one cabinet</h3>
                <p>The hall puts a group on the same machine and pays the winners of a local tournament.</p>
              </article>
              <article class="about-moment glass-card reveal">
                <p class="kicker">Web portals</p>
                <h3>A quieter VIP room</h3>
                <p>More play opens a stronger cannon and a ladder. The shoot-to-capture table stays the same underneath.</p>
              </article>
            </div>
          </div>
        </section>

        <section class="band about-air">
          <div class="wrap">
            <div class="about-sit">
              <article class="reveal">
                <p class="kicker">Players</p>
                <h3>Name the session before the boss.</h3>
                <p>Learn the multiplier on the fish in front of you. Decide the size of the session before the first boss. An expensive bullet aimed at a rare target is the usual way a short visit gets expensive.</p>
              </article>
              <article class="reveal">
                <p class="kicker">Operators</p>
                <h3>A separate desk.</h3>
                <p>Age checks, spend limits, and odds a player can read belong on any room that sells credits. If you run tables, use the <a href="/vendor" data-route="/vendor">vendor desk</a>. That request stays separate from player signup.</p>
              </article>
            </div>
            <p class="about-note">Public descriptions of the Fire Kirin franchise, through 2024, are the source for the shared-table and licensing picture above. Art, events, payments, and legal status change with the publisher and the country. The games linked on this page are the ones on this floor.</p>
            <div class="inline-actions">
              <a class="btn btn-gold" href="/games" data-route="/games">Browse the game list</a>
              <a class="btn btn-ghost" href="/blog/how-to-download-fire-kirin-android-iphone" data-route="/blog/how-to-download-fire-kirin-android-iphone">Android and iPhone guide</a>
            </div>
          </div>
        </section>
      </div>`;

    stopReveal = bindReveal(container);
    stopTank = bindCannon(container);
  },

  destroy() {
    stopReveal();
    stopReveal = () => {};
    stopTank();
    stopTank = () => {};
  },
};

function bindCannon(container) {
  const tank = container.querySelector('.about-tank');
  const school = tank.querySelector('.about-school');
  const rig = container.querySelector('.about-rig');
  const copy = container.querySelector('.about-dial-copy');
  const meter = container.querySelector('.about-meter > span');
  const buttons = [...container.querySelectorAll('.about-dial-btns button')];
  const fish = SCHOOL.map((item, index) => {
    const el = document.createElement('div');
    el.className = `about-fish is-${item.kind}`;
    el.style.setProperty('--s', `${item.size}px`);
    el.innerHTML = `<span class="about-body">${creature(item.kind)}</span>`;
    school.appendChild(el);
    return {
      ...item,
      el,
      x: 0,
      phase: index * 1.4,
      deadUntil: 0,
      nickUntil: 0,
    };
  });
  const bullets = [];
  const bursts = [];
  let aim = 16;
  let power = 2;
  let firing = false;
  let lastShot = 0;
  let flashUntil = 0;
  let frame = 0;
  let ready = false;
  let previous = performance.now();

  const reachFor = (level, width) => {
    if (level <= 1) return width * 0.4;
    if (level === 2) return width * 0.82;
    return width - 12;
  };

  const cooldownFor = (level) => (level >= 3 ? 460 : level === 2 ? 320 : 240);

  const setPower = (level) => {
    power = Number(level);
    tank.dataset.power = String(power);
    copy.textContent = POWERS[power].copy;
    meter.style.width = POWERS[power].meter;
    buttons.forEach((item) => {
      item.setAttribute('aria-pressed', String(Number(item.dataset.power) === power));
    });
  };

  const aimAt = (clientX, clientY) => {
    const rect = tank.getBoundingClientRect();
    const dx = clientX - (rect.left + 58);
    const dy = rect.bottom - 54 - clientY;
    if (dx < 16) return;
    aim = Math.min(64, Math.max(-8, (Math.atan2(dy, dx) * 180) / Math.PI));
    tank.classList.add('is-aimed');
  };

  const muzzle = (rect) => {
    const rad = (aim * Math.PI) / 180;
    return {
      x: 58 + Math.cos(rad) * 104,
      y: rect.height - 54 - Math.sin(rad) * 104,
      vx: Math.cos(rad) * 980,
      vy: -Math.sin(rad) * 980,
    };
  };

  const burst = (x, y) => {
    const el = document.createElement('span');
    el.className = 'about-splash';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    tank.appendChild(el);
    bursts.push({ el, until: performance.now() + 460 });
  };

  const shoot = (now, rect) => {
    if (now - lastShot < cooldownFor(power)) return;
    lastShot = now;
    flashUntil = now + 90;
    const shot = muzzle(rect);
    const el = document.createElement('span');
    el.className = `about-bullet is-p${power}`;
    tank.appendChild(el);
    bullets.push({
      el,
      x: shot.x,
      y: shot.y,
      vx: shot.vx,
      vy: shot.vy,
      traveled: 0,
      max: reachFor(power, rect.width),
      tier: power,
    });
  };

  const onPointerDown = (event) => {
    firing = true;
    aimAt(event.clientX, event.clientY);
    shoot(performance.now(), tank.getBoundingClientRect());
  };

  const onPointerMove = (event) => {
    if (event.pointerType === 'touch' && event.buttons === 0) return;
    aimAt(event.clientX, event.clientY);
  };

  const onPointerUp = () => {
    firing = false;
  };

  const onKey = (event) => {
    if (event.key === 'ArrowUp') aim = Math.min(64, aim + 6);
    else if (event.key === 'ArrowDown') aim = Math.max(-8, aim - 6);
    else if (event.key === 'ArrowRight') setPower(Math.min(3, power + 1));
    else if (event.key === 'ArrowLeft') setPower(Math.max(1, power - 1));
    else if (event.key === ' ') shoot(performance.now(), tank.getBoundingClientRect());
    else return;
    event.preventDefault();
    tank.classList.add('is-aimed');
  };

  const placeFish = (item, width, height, now) => {
    if (now < item.deadUntil) {
      item.el.classList.add('is-dead');
      return;
    }
    if (item.el.classList.contains('is-dead')) {
      item.el.classList.remove('is-dead');
      item.x = item.dir > 0 ? -item.size : width + 12;
    }
    const bob = Math.sin(now / 680 + item.phase) * 6;
    const bodyH = item.el.offsetHeight || 48;
    const span = Math.max(16, height - bodyH - 20);
    const y = 8 + item.y * span + bob;
    item.el.style.left = `${item.x}px`;
    item.el.style.top = `${y}px`;
    item.el.style.transform = `scaleX(${item.dir})`;
    item.el.classList.toggle('is-nick', now < item.nickUntil);
  };

  const tick = (now) => {
    const dt = Math.min(0.034, (now - previous) / 1000);
    previous = now;
    const rect = tank.getBoundingClientRect();
    if (!ready && rect.width > 0) {
      ready = true;
      fish.forEach((item, index) => {
        item.x = rect.width * SCHOOL[index].x;
      });
    }
    rig.style.setProperty('--aim', `${-aim}deg`);
    tank.classList.toggle('is-firing', now < flashUntil);
    if (firing) shoot(now, rect);

    fish.forEach((item) => {
      if (now >= item.deadUntil) {
        item.x += item.dir * item.speed * dt;
        if (item.dir > 0 && item.x > rect.width + item.size) item.x = -item.size;
        if (item.dir < 0 && item.x < -item.size) item.x = rect.width + 16;
      }
      placeFish(item, rect.width, rect.height, now);
    });

    for (let i = bullets.length - 1; i >= 0; i -= 1) {
      const shot = bullets[i];
      const step = dt;
      shot.x += shot.vx * step;
      shot.y += shot.vy * step;
      shot.traveled += Math.hypot(shot.vx, shot.vy) * step;
      shot.el.style.left = `${shot.x}px`;
      shot.el.style.top = `${shot.y}px`;
      shot.el.style.transform = `rotate(${Math.atan2(shot.vy, shot.vx) * 180 / Math.PI}deg)`;
      let spent = shot.traveled > shot.max || shot.x > rect.width + 20 || shot.y < -20 || shot.y > rect.height + 20;
      let hit = false;
      if (!spent) {
        fish.some((item) => {
          if (now < item.deadUntil) return false;
          const box = item.el.getBoundingClientRect();
          const cx = box.left + box.width / 2 - rect.left;
          const cy = box.top + box.height / 2 - rect.top;
          const near = Math.abs(shot.x - cx) < box.width * 0.42 && Math.abs(shot.y - cy) < box.height * 0.4;
          if (!near) return false;
          spent = true;
          hit = true;
          burst(cx, cy);
          if (item.tier <= shot.tier) {
            item.deadUntil = now + (item.tier === 3 ? 2800 : item.tier === 2 ? 2000 : 1400);
            item.el.classList.add('is-dead');
          } else {
            item.nickUntil = now + 220;
          }
          return true;
        });
      }
      if (spent) {
        if (!hit && shot.y > 8 && shot.y < rect.height - 8 && shot.x < rect.width - 8) burst(shot.x, shot.y);
        shot.el.remove();
        bullets.splice(i, 1);
      }
    }

    for (let i = bursts.length - 1; i >= 0; i -= 1) {
      if (now < bursts[i].until) continue;
      bursts[i].el.remove();
      bursts.splice(i, 1);
    }

    frame = requestAnimationFrame(tick);
  };

  tank.addEventListener('pointerdown', onPointerDown);
  tank.addEventListener('pointermove', onPointerMove);
  tank.addEventListener('pointerup', onPointerUp);
  tank.addEventListener('pointercancel', onPointerUp);
  tank.addEventListener('pointerleave', onPointerUp);
  tank.addEventListener('keydown', onKey);
  container.querySelector('.about-dial').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-power]');
    if (!button) return;
    setPower(button.dataset.power);
  });
  frame = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frame);
    tank.removeEventListener('pointerdown', onPointerDown);
    tank.removeEventListener('pointermove', onPointerMove);
    tank.removeEventListener('pointerup', onPointerUp);
    tank.removeEventListener('pointercancel', onPointerUp);
    tank.removeEventListener('pointerleave', onPointerUp);
    tank.removeEventListener('keydown', onKey);
    bullets.forEach((shot) => shot.el.remove());
    bursts.forEach((item) => item.el.remove());
  };
}
