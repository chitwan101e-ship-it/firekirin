let ready = null;
let mode = 'ambient';

function load() {
  return import('./fireScene.js').then((module) => module.fireScene);
}

export function mountScene(canvas) {
  if (ready) return ready;
  ready = load().then((scene) => {
    scene.mount(canvas);
    scene.setMode(mode);
    return scene;
  });
  return ready;
}

export function setSceneMode(next) {
  mode = next;
  if (ready) ready.then((scene) => scene.setMode(next));
}
