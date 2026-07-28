import fs from "fs";

const p = new URL("../lib/mcpHeroGraph.js", import.meta.url);
let s = fs.readFileSync(p, "utf8");

s = s.replace(
  '{ label: "Agents", color: COLORS.soft },',
  '{ label: "Writing", color: COLORS.soft },',
);

if (!s.includes("export function mountMcpHeroGraph")) {
  s = s.replace(
    /const art = document\.getElementById\("hero-art"\);\r?\nif \(!art\) throw new Error\("hero-art missing"\);/,
    'export function mountMcpHeroGraph(art) {\nif (!art) throw new Error("hero-art missing");',
  );
}

if (!s.includes("let raf")) {
  s = s.replace(
    "const clock = new THREE.Clock();",
    "let raf = 0;\nconst clock = new THREE.Clock();",
  );
}

s = s.replace(
  /requestAnimationFrame\(frame\);/g,
  "raf = requestAnimationFrame(frame);",
);

if (!s.trimEnd().endsWith("}")) {
  s = s.replace(
    /frame\(\);\r?\nif \(reduceMotion\) composer\.render\(\);\s*$/,
    `frame();
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
`,
  );
}

fs.writeFileSync(p, s);
console.log("wrapped", p.pathname);
