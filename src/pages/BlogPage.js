import { posts } from '../data/posts.js';

export const BlogPage = {
  render(container) {
    container.className = 'site-main';
    container.innerHTML = `
      <div class="page">
        <div class="page-head">
          <p class="eyebrow">Fire Kirin blog</p>
          <h1>Fire Kirin game guides</h1>
          <p class="lede">How to play Fire Kirin games, what Fire Kirin XYZ means, and how to open the lobby in a browser on Android, iPhone, or a Chromebook.</p>
        </div>
        <div class="post-grid">
          ${posts.map((post) => `
            <a class="post-card" href="/blog/${post.slug}" data-route="/blog/${post.slug}">
              <img src="${post.image}" alt="${post.imageAlt}">
              <p class="kicker">${post.kicker}</p>
              <h2>${post.title}</h2>
              <p>${post.excerpt}</p>
            </a>`).join('')}
        </div>
      </div>`;
  },
};
