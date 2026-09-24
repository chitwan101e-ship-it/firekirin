const posts = [
  {
    title: 'How to read a fish table',
    image: '/firekirin.com/wp-content/uploads/2024/06/Play-Fire-Kirin-Fish-Games.jpg',
    body: 'Watch the boss before you spend the whole cannon. Tables like Ocean Monster and Crab King 2 telegraph the big targets. Smaller fish keep the round moving while you wait.',
  },
  {
    title: 'Slots when the reef gets loud',
    image: '/firekirin.com/wp-content/uploads/2024/06/Play-Fire-Kirin-Slots.jpg',
    body: 'Buffalo 777 and 4th of July are the palate cleansers: fixed reels, readable symbols, and a bonus you can see coming. Use them between fish sessions.',
  },
  {
    title: 'Browser first, phone second',
    image: '/firekirin.com/wp-content/uploads/2024/06/fire-krin-app-download.jpg',
    body: 'The online lobby is the fastest way to learn the floor. Once the account exists, the same profile is what the Android and iOS builds expect.',
  },
];

export const BlogPage = {
  render(container) {
    container.className = 'site-main';
    container.innerHTML = `
      <div class="page">
        <div class="page-head">
          <p class="eyebrow">Blog</p>
          <h1>Notes from the lobby</h1>
          <p class="lede">Short reads on fish tables, slots, and playing from home. No fake strategy that promises a result.</p>
        </div>
        <div class="post-grid">
          ${posts.map((post) => `
            <article class="post-card">
              <img src="${post.image}" alt="">
              <p class="kicker">Floor notes</p>
              <h3>${post.title}</h3>
              <p>${post.body}</p>
            </article>`).join('')}
        </div>
      </div>`;
  },
};
