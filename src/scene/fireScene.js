import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let state = null;

function glowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const glow = ctx.createRadialGradient(128, 128, 8, 128, 128, 128);
  glow.addColorStop(0, 'rgba(120,255,150,0.95)');
  glow.addColorStop(0.28, 'rgba(40,255,80,0.35)');
  glow.addColorStop(0.6, 'rgba(0,80,30,0.08)');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 256, 256);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function addMesh(parent, geometry, material, position, rotation, scale) {
  const mesh = new THREE.Mesh(geometry, material);
  if (position) mesh.position.set(position[0], position[1], position[2]);
  if (rotation) mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
  if (scale) mesh.scale.set(scale[0], scale[1], scale[2]);
  parent.add(mesh);
  return mesh;
}

function createFishGeometry() {
  const body = new THREE.SphereGeometry(0.26, 20, 14);
  body.scale(0.58, 0.42, 1.2);

  const tail = new THREE.ConeGeometry(0.16, 0.36, 10);
  tail.rotateX(Math.PI / 2);
  tail.translate(0, 0, 0.46);

  const dorsal = new THREE.ConeGeometry(0.07, 0.24, 6);
  dorsal.translate(0, 0.2, -0.05);

  const finL = new THREE.ConeGeometry(0.055, 0.2, 6);
  finL.rotateZ(1.15);
  finL.translate(0.18, -0.02, 0.05);

  const finR = new THREE.ConeGeometry(0.055, 0.2, 6);
  finR.rotateZ(-1.15);
  finR.translate(-0.18, -0.02, 0.05);

  return mergeGeometries([body, tail, dorsal, finL, finR]);
}

function createKirin(materials, flameMat) {
  const kirin = new THREE.Group();
  const { gold, goldDark, ember, hoof, eyeWhite, pupil } = materials;

  addMesh(kirin, new THREE.SphereGeometry(0.78, 36, 28), gold, [0, 0.15, 0], null, [0.78, 0.62, 1.12]);
  addMesh(kirin, new THREE.SphereGeometry(0.52, 28, 22), gold, [0, 0.32, 0.78], null, [0.95, 0.82, 0.9]);
  addMesh(kirin, new THREE.SphereGeometry(0.46, 28, 22), gold, [0, 0.18, -0.82], null, [0.9, 0.78, 0.95]);

  const neck = addMesh(
    kirin,
    new THREE.CylinderGeometry(0.2, 0.34, 0.86, 18),
    gold,
    [0, 0.78, 1.08],
    [0.9, 0, 0]
  );
  neck.scale.set(1, 1, 0.86);

  const head = new THREE.Group();
  head.position.set(0, 1.22, 1.48);
  kirin.add(head);

  addMesh(head, new THREE.SphereGeometry(0.42, 28, 22), gold, [0, 0.05, 0], null, [0.95, 0.88, 1.05]);
  addMesh(head, new THREE.CylinderGeometry(0.12, 0.2, 0.52, 16), gold, [0, -0.02, 0.42], [Math.PI / 2, 0, 0]);
  addMesh(head, new THREE.BoxGeometry(0.22, 0.1, 0.34), goldDark, [0, -0.18, 0.36]);
  addMesh(head, new THREE.SphereGeometry(0.07, 12, 10), ember, [0.07, -0.02, 0.66]);
  addMesh(head, new THREE.SphereGeometry(0.07, 12, 10), ember, [-0.07, -0.02, 0.66]);

  addMesh(head, new THREE.ConeGeometry(0.11, 0.85, 12), gold, [0, 0.58, -0.04], [0.2, 0, 0]);
  addMesh(head, new THREE.ConeGeometry(0.07, 0.42, 10), goldDark, [-0.16, 0.42, 0], [0.2, 0, 0.45]);

  const hornCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0.02, 0.28, 0.02),
    new THREE.Vector3(0.28, 0.72, -0.05),
    new THREE.Vector3(0.02, 0.98, 0.12)
  );
  head.add(new THREE.Mesh(new THREE.TubeGeometry(hornCurve, 16, 0.035, 6, false), gold));

  addMesh(head, new THREE.ConeGeometry(0.08, 0.22, 8), ember, [0.22, 0.12, 0.02], [0.4, 0, -0.8]);
  addMesh(head, new THREE.ConeGeometry(0.08, 0.22, 8), ember, [-0.22, 0.12, 0.02], [0.4, 0, 0.8]);

  addMesh(head, new THREE.SphereGeometry(0.07, 12, 10), eyeWhite, [0.16, 0.08, 0.28]);
  addMesh(head, new THREE.SphereGeometry(0.07, 12, 10), eyeWhite, [-0.16, 0.08, 0.28]);
  addMesh(head, new THREE.SphereGeometry(0.035, 10, 8), pupil, [0.18, 0.08, 0.33]);
  addMesh(head, new THREE.SphereGeometry(0.035, 10, 8), pupil, [-0.18, 0.08, 0.33]);

  const mane = [];
  const maneSpots = [
    [0.22, 0.95, 1.15, 0.55, 0.9],
    [-0.18, 1.02, 1.02, 0.7, 1.05],
    [0.05, 0.72, 0.95, 0.85, 1.15],
    [0.28, 0.58, 0.72, 0.5, 0.8],
    [-0.24, 0.64, 0.78, 0.62, 0.85],
    [0.02, 1.18, 1.28, 0.4, 0.7],
  ];
  maneSpots.forEach(([x, y, z, s, h], index) => {
    const flame = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 1.05), flameMat);
    flame.position.set(x, y, z);
    flame.scale.set(s, h, 1);
    flame.rotation.y = index * 0.55;
    flame.renderOrder = 3;
    kirin.add(flame);
    mane.push(flame);
  });

  const legs = [];
  const legSpots = [
    [0.32, 0.62],
    [-0.32, 0.62],
    [0.28, -0.72],
    [-0.28, -0.72],
  ];
  legSpots.forEach(([x, z], index) => {
    const leg = new THREE.Group();
    leg.position.set(x, 0.05, z);
    addMesh(leg, new THREE.CylinderGeometry(0.09, 0.11, 0.48, 12), gold, [0, -0.18, 0]);
    addMesh(leg, new THREE.CylinderGeometry(0.07, 0.085, 0.42, 12), goldDark, [0, -0.58, 0]);
    addMesh(leg, new THREE.BoxGeometry(0.16, 0.1, 0.2), hoof, [0, -0.82, 0.03]);
    if (index < 2) leg.rotation.x = -0.65;
    kirin.add(leg);
    legs.push(leg);
  });

  const tail = new THREE.Group();
  tail.position.set(0, 0.28, -1.28);
  kirin.add(tail);
  addMesh(tail, new THREE.SphereGeometry(0.16, 14, 12), gold, [0, 0.05, -0.05], null, [0.8, 0.8, 1.3]);
  addMesh(tail, new THREE.SphereGeometry(0.12, 12, 10), gold, [0, 0.18, -0.28], null, [0.7, 0.7, 1.2]);
  addMesh(tail, new THREE.SphereGeometry(0.09, 12, 10), goldDark, [0, 0.32, -0.48]);
  const tailFlame = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 1.1), flameMat);
  tailFlame.position.set(0, 0.55, -0.72);
  tailFlame.renderOrder = 3;
  tail.add(tailFlame);
  mane.push(tailFlame);

  for (let i = 0; i < 18; i += 1) {
    const along = -0.85 + (i % 9) * 0.2;
    const side = i < 9 ? -1 : 1;
    addMesh(
      kirin,
      new THREE.SphereGeometry(0.09, 10, 8),
      goldDark,
      [side * 0.42, 0.28 + Math.sin(i) * 0.05, along],
      [0, 0, side * 0.5],
      [1.1, 0.35, 0.85]
    );
  }

  kirin.rotation.set(0.08, 0.72, 0);
  kirin.position.y = 0.15;
  kirin.scale.setScalar(0.92);
  return { kirin, head, tail, legs, mane };
}

function createGridMaterial() {
  return new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uFade: { value: 1 },
    },
    vertexShader: `
      out vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      in vec2 vUv;
      uniform float uTime;
      uniform float uFade;
      out vec4 fragColor;
      void main() {
        vec2 gv = vUv * vec2(34.0, 22.0);
        gv.y += uTime * 0.55;
        vec2 grid = abs(fract(gv) - 0.5);
        float line = min(grid.x, grid.y);
        float glow = smoothstep(0.08, 0.0, line);
        float dist = length((vUv - vec2(0.5, 0.42)) * vec2(1.35, 1.0));
        float fade = smoothstep(0.78, 0.12, dist);
        float pulse = 0.75 + 0.25 * sin(uTime * 1.6 + vUv.y * 10.0);
        vec3 col = vec3(0.18, 1.0, 0.38) * glow * fade * pulse;
        fragColor = vec4(col, glow * fade * 0.9 * uFade);
      }
    `,
  });
}

function createFlameMaterial() {
  return new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      out vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      in vec2 vUv;
      uniform float uTime;
      out vec4 fragColor;
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      void main() {
        float n = noise(vec2(vUv.x * 3.5, vUv.y * 5.5 - uTime * 1.8));
        float side = smoothstep(0.0, 0.18, vUv.x) * smoothstep(1.0, 0.82, vUv.x);
        float mask = smoothstep(0.0, 0.25, vUv.y) * side;
        float flame = smoothstep(0.28, 0.86, n) * mask;
        vec3 hot = mix(vec3(1.0, 0.22, 0.02), vec3(1.0, 0.86, 0.25), pow(vUv.y, 0.65));
        fragColor = vec4(hot, flame * 0.92);
      }
    `,
  });
}

function boot(canvas) {
  const mobile = window.innerWidth < 800;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !mobile,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.6));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.setClearColor(0x020403, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020403, 0.045);
  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 80);
  camera.position.set(0, 2.35, mobile ? 12.4 : 10.6);

  try {
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();
  } catch {
    /* lights carry the scene if the room probe fails */
  }

  scene.add(new THREE.HemisphereLight(0xc8ffe0, 0x2a1204, 0.55));
  const key = new THREE.DirectionalLight(0xfff1c9, 2.6);
  key.position.set(4.5, 7.5, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x39ff6a, 2.2);
  rim.position.set(-6, 2.2, -4);
  scene.add(rim);
  const maneLight = new THREE.PointLight(0xff6a1a, 6, 7, 2);
  maneLight.position.set(0.4, 1.4, 1.4);
  scene.add(maneLight);
  const fill = new THREE.PointLight(0x39ff6a, 4, 10, 2);
  fill.position.set(-2.2, 0.4, 2.4);
  scene.add(fill);

  const gold = new THREE.MeshPhysicalMaterial({
    color: 0xffc14d,
    metalness: 1,
    roughness: 0.22,
    emissive: 0x4a1800,
    emissiveIntensity: 0.08,
    clearcoat: 0.65,
    clearcoatRoughness: 0.28,
  });
  const goldDark = new THREE.MeshStandardMaterial({
    color: 0xc9841a,
    metalness: 0.92,
    roughness: 0.38,
    emissive: 0x3a1400,
    emissiveIntensity: 0.12,
  });
  const ember = new THREE.MeshStandardMaterial({
    color: 0xff3b1f,
    emissive: 0xff2a00,
    emissiveIntensity: 0.85,
    roughness: 0.42,
  });
  const hoof = new THREE.MeshStandardMaterial({
    color: 0x8c140c,
    emissive: 0x4a0804,
    emissiveIntensity: 0.4,
    roughness: 0.5,
  });
  const eyeWhite = new THREE.MeshStandardMaterial({
    color: 0xf4ffe4,
    emissive: 0xb6ff4a,
    emissiveIntensity: 0.8,
  });
  const pupil = new THREE.MeshStandardMaterial({
    color: 0x102008,
    emissive: 0x39ff4a,
    emissiveIntensity: 1.4,
  });

  const gridMat = createGridMaterial();
  const flameMat = createFlameMaterial();
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(18, 72),
    new THREE.MeshBasicMaterial({ color: 0x03140c })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.62;
  scene.add(floor);

  const grid = new THREE.Mesh(new THREE.PlaneGeometry(36, 36), gridMat);
  grid.rotation.x = -Math.PI / 2;
  grid.position.y = -1.5;
  scene.add(grid);

  const portal = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  portal.position.set(0, -1.7, 0.2);
  portal.scale.set(7.5, 7.5, 1);
  scene.add(portal);

  const creature = createKirin({ gold, goldDark, ember, hoof, eyeWhite, pupil }, flameMat);
  scene.add(creature.kirin);

  const rings = [];
  [1.7, 2.15, 2.55].forEach((radius, index) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.012, 12, 90),
      new THREE.MeshBasicMaterial({
        color: index === 1 ? 0xffb000 : 0x39ff4a,
        transparent: true,
        opacity: 0.45,
      })
    );
    ring.position.y = -1.45;
    ring.rotation.x = Math.PI / 2 + index * 0.08;
    scene.add(ring);
    rings.push(ring);
  });

  const fishGeo = createFishGeometry();
  const fishCount = mobile ? 16 : 42;
  const fishMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.28,
    roughness: 0.42,
    emissive: 0x042818,
    emissiveIntensity: 0.2,
  });
  const school = new THREE.InstancedMesh(fishGeo, fishMat, fishCount);
  const palette = [0x7dffc0, 0xffc14a, 0x5ad7ff, 0xff6a3c, 0xf4fff6, 0x39ff6a];
  const fishData = [];
  const color = new THREE.Color();
  for (let i = 0; i < fishCount; i += 1) {
    color.setHex(palette[i % palette.length]);
    school.setColorAt(i, color);
    fishData.push({
      radius: 2.1 + (i % 6) * 0.48,
      speed: 0.22 + (i % 5) * 0.05,
      phase: (i / fishCount) * Math.PI * 2,
      y: -0.2 + (i % 7) * 0.18,
      scale: 0.32 + (i % 4) * 0.12,
    });
  }
  school.instanceColor.needsUpdate = true;
  scene.add(school);

  const heroFish = [];
  for (let i = 0; i < (mobile ? 2 : 4); i += 1) {
    const mat = fishMat.clone();
    mat.color.setHex(palette[i % palette.length]);
    mat.emissive = new THREE.Color(0x0a3a22);
    const fish = new THREE.Mesh(fishGeo, mat);
    fish.scale.setScalar(0.48 + i * 0.12);
    scene.add(fish);
    heroFish.push({
      mesh: fish,
      speed: 0.18 + i * 0.05,
      y: -0.15 + i * 0.18,
      z: -0.2 + (i % 2) * 0.7,
      phase: i * 1.7,
    });
  }

  const coins = [];
  const coinGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.045, 24);
  const coinMat = new THREE.MeshPhysicalMaterial({
    color: 0xffd56a,
    metalness: 1,
    roughness: 0.18,
    emissive: 0x8a4a00,
    emissiveIntensity: 0.35,
  });
  for (let i = 0; i < (mobile ? 6 : 12); i += 1) {
    const coin = new THREE.Mesh(coinGeo, coinMat);
    scene.add(coin);
    coins.push({
      mesh: coin,
      radius: 1.8 + (i % 4) * 0.45,
      speed: 0.35 + (i % 3) * 0.12,
      phase: (i / 12) * Math.PI * 2,
      y: -1.05 + (i % 5) * 0.22,
    });
  }

  const sparkCount = mobile ? 220 : 560;
  const sparkPositions = new Float32Array(sparkCount * 3);
  const sparkSeeds = [];
  for (let i = 0; i < sparkCount; i += 1) {
    sparkPositions[i * 3] = (Math.random() - 0.5) * 16;
    sparkPositions[i * 3 + 1] = Math.random() * 7 - 1.2;
    sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    sparkSeeds.push(0.15 + Math.random() * 0.7);
  }
  const sparkGeo = new THREE.BufferGeometry();
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
  const sparks = new THREE.Points(
    sparkGeo,
    new THREE.PointsMaterial({
      color: 0xb8ffc8,
      size: mobile ? 0.045 : 0.035,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
  );
  scene.add(sparks);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.22,
    0.45,
    0.58
  );
  composer.addPass(bloom);

  const clock = new THREE.Clock();
  const pointer = { x: 0, y: 0 };
  const dummy = new THREE.Object3D();

  state = {
    canvas,
    renderer,
    composer,
    scene,
    camera,
    clock,
    gridMat,
    flameMat,
    creature,
    rings,
    school,
    fishData,
    heroFish,
    coins,
    sparks,
    sparkSeeds,
    portal,
    maneLight,
    pointer,
    dummy,
    mode: 'hero',
    modeMix: 0,
    scroll: 0,
    dive: 0,
    raf: 0,
    mobile,
  };

  const onResize = () => {
    if (!state) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    state.camera.aspect = width / height;
    state.camera.updateProjectionMatrix();
    state.renderer.setSize(width, height, false);
    state.composer.setSize(width, height);
  };
  const onPointer = (event) => {
    if (!state) return;
    state.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    state.pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
  };
  const onScroll = () => {
    if (!state) return;
    const span = window.innerHeight * 1.35;
    state.scroll = Math.min(Math.max(window.scrollY / span, 0), 1);
  };

  window.addEventListener('resize', onResize);
  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  state.unbind = () => {
    window.removeEventListener('resize', onResize);
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('scroll', onScroll);
  };

  const tick = () => {
    if (!state) return;
    state.raf = requestAnimationFrame(tick);
    const t = state.clock.getElapsedTime();
    const hero = state.mode === 'hero' ? 1 : 0;
    state.modeMix += (hero - state.modeMix) * 0.045;
    const diveTarget = state.mode === 'hero' ? state.scroll : 0;
    state.dive += (diveTarget - state.dive) * 0.05;
    const dive = state.dive;
    const away = 1 - state.modeMix;

    state.gridMat.uniforms.uTime.value = t;
    state.gridMat.uniforms.uFade.value = 1 - dive * 0.45 - away * 0.35;
    state.flameMat.uniforms.uTime.value = t;

    const { kirin, head, tail, legs, mane } = state.creature;
    const bob = reducedMotion ? 0 : Math.sin(t * 0.9) * 0.07;
    kirin.position.y = 0.15 + bob - dive * 1.3 - away * 0.2;
    kirin.position.x = away * 2.1;
    kirin.rotation.y = 0.48 + Math.sin(t * 0.32) * 0.1 + state.pointer.x * 0.22 + dive * 0.5;
    kirin.rotation.z = 0.04 + Math.sin(t * 0.5) * 0.03;
    head.rotation.x = Math.sin(t * 0.8) * 0.06;
    head.rotation.y = Math.sin(t * 0.45) * 0.08;
    tail.rotation.y = Math.sin(t * 1.3) * 0.35;
    tail.rotation.z = Math.sin(t * 1.1) * 0.12;
    legs.forEach((leg, index) => {
      const front = index < 2;
      leg.rotation.x = (front ? -0.65 : 0.15) + Math.sin(t * 1.6 + index) * (front ? 0.08 : 0.05);
    });
    mane.forEach((flame, index) => {
      const flicker = 0.92 + Math.sin(t * 7 + index) * 0.08;
      flame.scale.y = (0.7 + (index % 3) * 0.15) * flicker;
    });

    state.rings.forEach((ring, index) => {
      ring.rotation.z = t * (0.15 + index * 0.07) * (index % 2 === 0 ? 1 : -1);
      ring.position.y = -1.55 + Math.sin(t * 0.8 + index) * 0.05 - dive * 0.3;
    });

    state.fishData.forEach((fish, index) => {
      const angle = fish.phase + t * fish.speed * (reducedMotion ? 0 : 1);
      const radius = fish.radius + dive * 0.4;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius * 0.72;
      const y = fish.y + Math.sin(t * 1.4 + fish.phase) * 0.16 + dive * 0.35;
      const next = angle + 0.08;
      state.dummy.position.set(x, y, z);
      state.dummy.lookAt(Math.cos(next) * radius, y, Math.sin(next) * radius * 0.72);
      state.dummy.scale.setScalar(fish.scale);
      state.dummy.updateMatrix();
      state.school.setMatrixAt(index, state.dummy.matrix);
    });
    state.school.instanceMatrix.needsUpdate = true;

    state.heroFish.forEach((fish) => {
      const x = Math.sin(t * fish.speed + fish.phase) * 6.5;
      fish.mesh.position.set(x, fish.y + dive * 0.5, fish.z);
      fish.mesh.rotation.y = Math.cos(t * fish.speed + fish.phase) > 0 ? Math.PI / 2 : -Math.PI / 2;
      fish.mesh.rotation.z = Math.sin(t * 2 + fish.phase) * 0.18;
    });

    state.coins.forEach((coin) => {
      const angle = coin.phase + t * coin.speed;
      coin.mesh.position.set(Math.cos(angle) * coin.radius, coin.y + Math.sin(t + coin.phase) * 0.12, Math.sin(angle) * coin.radius * 0.8);
      coin.mesh.rotation.x = t * 1.4;
      coin.mesh.rotation.z = 0.4;
    });

    const positions = state.sparks.geometry.attributes.position;
    if (!reducedMotion) {
      for (let i = 0; i < state.sparkSeeds.length; i += 1) {
        let y = positions.getY(i) + state.sparkSeeds[i] * 0.016;
        if (y > 5.5) y = -1.4;
        positions.setY(i, y);
      }
      positions.needsUpdate = true;
    }

    state.portal.scale.setScalar(7.2 + Math.sin(t * 1.4) * 0.35);
    state.maneLight.intensity = 5 + Math.sin(t * 6) * 1.2;

    const desired = new THREE.Vector3(
      state.pointer.x * 0.45 + away * 1.8,
      5.1 - dive * 0.35 + state.pointer.y * 0.08,
      (state.mobile ? 13.2 : 11.6) + dive * 1.1 + away * 1.2
    );
    state.camera.position.lerp(desired, 0.045);
    state.camera.lookAt(away * 0.4, 2.55 - dive * 0.2, 0);
    state.composer.render();
  };

  tick();
  if (reducedMotion) {
    cancelAnimationFrame(state.raf);
    state.composer.render();
  }
}

export const fireScene = {
  mount(canvas) {
    if (state?.canvas === canvas) return;
    if (state) this.destroy();
    try {
      boot(canvas);
      document.body.classList.remove('no-webgl');
    } catch (error) {
      console.error(error);
      document.body.classList.add('no-webgl');
    }
  },
  setMode(mode) {
    if (state) state.mode = mode;
  },
  destroy() {
    if (!state) return;
    cancelAnimationFrame(state.raf);
    state.unbind?.();
    state.composer?.dispose();
    state.renderer?.dispose();
    state.scene?.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((mat) => {
          if (mat.map) mat.map.dispose();
          mat.dispose?.();
        });
      }
    });
    state = null;
  },
};
