import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { mountScene } from './scene/loadScene.js';
import { router } from './utils/router.js';

export const App = {
  render(container) {
    const canvas = document.createElement('canvas');
    canvas.id = 'fire-canvas';
    const vignette = document.createElement('div');
    vignette.id = 'vignette';
    document.body.prepend(vignette);
    document.body.prepend(canvas);
    mountScene(canvas);

    container.innerHTML = '';
    const shell = document.createElement('div');
    shell.className = 'app-shell';

    const header = document.createElement('header');
    shell.appendChild(header);
    Header.render(header);

    const main = document.createElement('main');
    main.id = 'main-content';
    main.className = 'site-main';
    shell.appendChild(main);

    const footer = document.createElement('footer');
    shell.appendChild(footer);
    Footer.render(footer);

    container.appendChild(shell);
    router.renderPage(main);
    window.addEventListener('popstate', () => router.renderPage(main));
  },
};
