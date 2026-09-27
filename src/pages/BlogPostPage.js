import { getPost, postBodyHtml } from '../data/posts.js';

export const BlogPostPage = {
  render(container, slug) {
    container.className = 'site-main';
    const post = getPost(slug);
    if (!post) {
      container.innerHTML = `
        <div class="page">
          <div class="page-head">
            <p class="eyebrow">Blog</p>
            <h1>That Fire Kirin guide is not on the floor</h1>
            <a class="btn btn-gold" href="/blog" data-route="/blog">Back to the blog</a>
          </div>
        </div>`;
      return;
    }

    container.innerHTML = `
      <div class="page">
        <nav class="crumbs" aria-label="Breadcrumb">
          <a href="/" data-route="/">Home</a>
          <a href="/blog" data-route="/blog">Blog</a>
          <span aria-current="page">${post.title}</span>
        </nav>
        <article class="article">
          <header class="page-head">
            <p class="eyebrow">${post.kicker}</p>
            <h1>${post.title}</h1>
            <p class="lede">${post.description}</p>
          </header>
          <img class="article-hero" src="${post.image}" alt="${post.imageAlt}">
          <div class="article-body">
            ${postBodyHtml(post)}
          </div>
          <div class="inline-actions">
            <a class="btn btn-gold" href="/account" data-route="/account">Join Now</a>
            <a class="btn btn-ghost" href="/games" data-route="/games">Fire Kirin game list</a>
          </div>
        </article>
      </div>`;
  },
};
