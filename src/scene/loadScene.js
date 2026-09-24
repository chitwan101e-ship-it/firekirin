let ready = null;

function load() {
  return import('./fireScene.js').then((module) => module.fireScene);
}

export function mountScene(canvas) {
  ready = load().then((scene) => {
    scene.mount(canvas);
    return scene;
  });
  return ready;
}

export function setSceneMode(mode) {
  const apply = () => load().then((scene) => scene.setMode(mode));
  return ready ? ready.then(apply) : apply();
}
