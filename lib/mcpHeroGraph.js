/**
 * MCP hero graph — cinematic neon shaders + bloom.
 * Majico motion: slow choreography orbit, stream-cadence packets, reduced-motion still.
 */
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

export function mountMcpHeroGraph(art) {
if (!art) throw new Error("hero-art missing");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const COLORS = {
  cyan: new THREE.Color("#00e5ff"),
  magenta: new THREE.Color("#ff2ec7"),
  lime: new THREE.Color("#b8ff3d"),
  ink: new THREE.Color("#04060f"),
  soft: new THREE.Color("#eef7ff"),
};

const TOOLS = [
  { label: "Secrets", color: COLORS.cyan },
  { label: "Mail", color: COLORS.magenta },
  { label: "Search", color: COLORS.lime },
  { label: "Database", color: COLORS.cyan },
  { label: "Storage", color: COLORS.magenta },
  { label: "Literature", color: COLORS.lime },
  { label: "Writing", color: COLORS.soft },
];

/* —— Fresnel chrome hub —— */
const hubVert = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(mat3(modelMatrix) * normal);
    vView = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;
const hubFrag = /* glsl */ `
  uniform float uTime;
  uniform vec3 uCyan;
  uniform vec3 uMagenta;
  uniform vec3 uLime;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.4);
    float sheen = 0.5 + 0.5 * sin(uTime * 1.4 + fresnel * 6.0);
    vec3 fringe = mix(uCyan, uMagenta, sheen);
    fringe = mix(fringe, uLime, fresnel * 0.35);
    vec3 base = vec3(0.08, 0.12, 0.18);
    vec3 col = mix(base, fringe, fresnel * 1.15);
    col += fringe * fresnel * fresnel * 1.8;
    gl_FragColor = vec4(col, 1.0);
  }
`;

/* —— Flowing neon tube —— */
const tubeVert = /* glsl */ `
  varying float vPath;
  void main() {
    vPath = uv.x;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const tubeFrag = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vPath;
  void main() {
    float pulse = fract(vPath * 3.0 - uTime * uSpeed);
    float head = smoothstep(0.0, 0.08, pulse) * smoothstep(0.45, 0.12, pulse);
    float body = 0.12 + 0.18 * sin((vPath + uTime * 0.2) * 12.0);
    float glow = head * 1.6 + body;
    vec3 col = uColor * (0.35 + glow);
    float alpha = (0.2 + head * 0.85) * uOpacity;
    gl_FragColor = vec4(col, alpha);
  }
`;

/* —— Soft node core —— */
const nodeVert = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(mat3(modelMatrix) * normal);
    vView = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;
const nodeFrag = /* glsl */ `
  uniform vec3 uColor;
  uniform float uPulse;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.0);
    vec3 col = uColor * (0.55 + uPulse * 0.45);
    col += vec3(1.0) * fresnel * 0.65;
    col += uColor * fresnel * 1.4;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x04060f, 0.038);

const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
camera.position.set(3.2, 1.8, 10.5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setClearColor(0x04060f, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
art.insertBefore(renderer.domElement, art.firstChild);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.85, 0.55, 0.2);
composer.addPass(bloom);
composer.addPass(new OutputPass());

scene.add(new THREE.AmbientLight(0x1a2a40, 0.55));
const key = new THREE.DirectionalLight(0xffffff, 0.55);
key.position.set(5, 8, 4);
scene.add(key);
const lightC = new THREE.PointLight(0x00e5ff, 3.2, 22, 2);
lightC.position.set(-3.5, 2.2, 3);
scene.add(lightC);
const lightM = new THREE.PointLight(0xff2ec7, 2.6, 20, 2);
lightM.position.set(4.2, -1.2, 2.5);
scene.add(lightM);
const lightL = new THREE.PointLight(0xb8ff3d, 1.4, 16, 2);
lightL.position.set(0.5, 3.5, -2);
scene.add(lightL);

const root = new THREE.Group();
scene.add(root);

const hubUniforms = {
  uTime: { value: 0 },
  uCyan: { value: COLORS.cyan },
  uMagenta: { value: COLORS.magenta },
  uLime: { value: COLORS.lime },
};
const hubMat = new THREE.ShaderMaterial({
  uniforms: hubUniforms,
  vertexShader: hubVert,
  fragmentShader: hubFrag,
});
const hub = new THREE.Mesh(new THREE.SphereGeometry(0.62, 64, 64), hubMat);
root.add(hub);

const hubRing = new THREE.Mesh(
  new THREE.TorusGeometry(0.95, 0.025, 16, 96),
  new THREE.MeshBasicMaterial({ color: COLORS.cyan, transparent: true, opacity: 0.55 })
);
hubRing.rotation.x = Math.PI / 2.3;
root.add(hubRing);

const hubRing2 = hubRing.clone();
hubRing2.scale.setScalar(1.18);
hubRing2.material = new THREE.MeshBasicMaterial({
  color: COLORS.magenta,
  transparent: true,
  opacity: 0.28,
});
hubRing2.rotation.x = Math.PI / 2.6;
hubRing2.rotation.z = 0.4;
root.add(hubRing2);

const nodes = [];
const tubes = [];
const packets = [];
const R = 3.85;

TOOLS.forEach((tool, i) => {
  const a = (i / TOOLS.length) * Math.PI * 2 - Math.PI / 2;
  const y = Math.sin(i * 1.55) * 0.95;
  const home = new THREE.Vector3(Math.cos(a) * R, y, Math.sin(a) * R * 0.82);

  const uniforms = {
    uColor: { value: tool.color.clone() },
    uPulse: { value: 0.5 },
  };
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.26, 40, 40),
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: nodeVert,
      fragmentShader: nodeFrag,
    })
  );
  mesh.position.copy(home);
  root.add(mesh);

  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(0.42, 24, 24),
    new THREE.MeshBasicMaterial({
      color: tool.color,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    })
  );
  mesh.add(halo);

  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(home.x * 0.42, home.y + 1.05, home.z * 0.42),
    home.clone()
  );
  const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.028, 10, false);
  const tubeUniforms = {
    uTime: { value: 0 },
    uSpeed: { value: 0.55 + (i % 3) * 0.12 },
    uColor: { value: tool.color.clone() },
    uOpacity: { value: 0.95 },
  };
  const tube = new THREE.Mesh(
    tubeGeo,
    new THREE.ShaderMaterial({
      uniforms: tubeUniforms,
      vertexShader: tubeVert,
      fragmentShader: tubeFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  root.add(tube);
  tubes.push({ mesh: tube, uniforms: tubeUniforms, curve });

  nodes.push({
    mesh,
    home: home.clone(),
    phase: i * 0.85,
    uniforms,
    tool,
  });

  for (let p = 0; p < 2; p++) {
    const pkt = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 12, 12),
      new THREE.MeshBasicMaterial({ color: tool.color })
    );
    root.add(pkt);
    packets.push({
      mesh: pkt,
      curve,
      t: Math.random(),
      speed: 0.18 + Math.random() * 0.16,
      outward: p === 0,
    });
  }
});

/* neighbor arcs */
for (let i = 0; i < nodes.length; i++) {
  const j = (i + 2) % nodes.length;
  const a = nodes[i].home;
  const b = nodes[j].home;
  const mid = a.clone().add(b).multiplyScalar(0.5);
  mid.y += 0.55;
  const curve = new THREE.QuadraticBezierCurve3(a.clone(), mid, b.clone());
  const tubeGeo = new THREE.TubeGeometry(curve, 48, 0.014, 8, false);
  const tubeUniforms = {
    uTime: { value: 0 },
    uSpeed: { value: 0.35 },
    uColor: { value: COLORS.cyan.clone().lerp(COLORS.magenta, 0.5) },
    uOpacity: { value: 0.45 },
  };
  const tube = new THREE.Mesh(
    tubeGeo,
    new THREE.ShaderMaterial({
      uniforms: tubeUniforms,
      vertexShader: tubeVert,
      fragmentShader: tubeFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  root.add(tube);
  tubes.push({ mesh: tube, uniforms: tubeUniforms, curve });
}

function resize() {
  const rect = art.getBoundingClientRect();
  const w = Math.max(rect.width, 1);
  const h = Math.max(rect.height, 1);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
  composer.setSize(w, h);
  bloom.setSize(w, h);
}
resize();
window.addEventListener("resize", resize, { passive: true });

let raf = 0;
const clock = new THREE.Clock();
let camAngle = 0.35;
const look = new THREE.Vector3(0.55, 0.15, 0);

/* Cinematic easing helpers (Majico-ish expressive feel) */
function smooth(t) {
  return t * t * (3 - 2 * t);
}

function frame() {
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;

  hubUniforms.uTime.value = t;
  tubes.forEach((tb) => {
    tb.uniforms.uTime.value = t;
  });

  if (!reduceMotion) {
    // slow choreography orbit (~2800ms-scale language)
    camAngle += dt * 0.085;
    const radius = 10.2 + Math.sin(t * 0.22) * 0.55;
    const targetX = Math.sin(camAngle) * radius + 1.1;
    const targetZ = Math.cos(camAngle) * radius;
    const targetY = 1.55 + Math.sin(t * 0.28) * 0.35;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.04;
    camera.lookAt(look);

    root.rotation.y = Math.sin(t * 0.12) * 0.1;
    hub.scale.setScalar(1 + Math.sin(t * 1.6) * 0.045);
    hubRing.rotation.z = t * 0.25;
    hubRing2.rotation.z = -t * 0.18;
    hubRing.material.opacity = 0.35 + 0.25 * (0.5 + 0.5 * Math.sin(t * 2.0));

    lightC.intensity = 2.6 + Math.sin(t * 1.7) * 0.5;
    lightM.intensity = 2.1 + Math.sin(t * 1.9 + 1.2) * 0.45;

    nodes.forEach((n) => {
      const breathe = Math.sin(t * 1.05 + n.phase);
      n.mesh.position.copy(n.home);
      n.mesh.position.y += breathe * 0.16;
      n.mesh.position.x += Math.cos(t * 0.6 + n.phase) * 0.04;
      const pulse = 0.45 + 0.55 * smooth(0.5 + 0.5 * Math.sin(t * 2.2 + n.phase));
      n.uniforms.uPulse.value = pulse;
      n.mesh.scale.setScalar(0.92 + pulse * 0.18);
    });

    packets.forEach((pk) => {
      pk.t += pk.speed * dt;
      if (pk.t > 1) pk.t -= 1;
      const u = pk.outward ? pk.t : 1 - pk.t;
      const e = smooth(u);
      pk.mesh.position.copy(pk.curve.getPoint(e));
      const s = 0.7 + Math.sin(t * 8.0 + pk.t * 10.0) * 0.25;
      pk.mesh.scale.setScalar(s);
    });

    bloom.strength = 0.72 + 0.18 * (0.5 + 0.5 * Math.sin(t * 1.3));
  } else {
    camera.position.set(3.4, 1.7, 10);
    camera.lookAt(look);
    bloom.strength = 0.55;
  }

  composer.render();
  if (!reduceMotion) raf = requestAnimationFrame(frame);
}

frame();
if (reduceMotion) composer.render();

return function dispose() {
  cancelAnimationFrame(raf);
  window.removeEventListener("resize", resize);
  renderer.dispose();
  if (renderer.domElement.parentNode) {
    renderer.domElement.parentNode.removeChild(renderer.domElement);
  }
};
}
