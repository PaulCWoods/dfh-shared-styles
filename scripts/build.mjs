/* ==========================================================================
   Build: src/index.css and its imports, in their cascade layers, as one
   minified dist/dfh-site.css; and each component on its own, in the same
   layer, as dist/components/<name>.css for a site that needs only one (the
   components docs take the brand frame). No targets, so nesting and other
   modern CSS stay as written.
   ========================================================================== */
import { bundle, transform } from 'lightningcss';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)));
const entry = new URL('../src/index.css', import.meta.url);
const banner = `/* DFH Shared Styles ${pkg.version}, for DFH Components ${pkg.config.library} */\n`;
const kb = (code) => `${(code.length / 1024).toFixed(1)} KB`;

mkdirSync(new URL('../dist/components/', import.meta.url), { recursive: true });

const { code } = bundle({ filename: entry.pathname, minify: true });
writeFileSync(new URL('../dist/dfh-site.css', import.meta.url), banner + code);
console.log(`dist/dfh-site.css: ${pkg.version}, ${kb(code)}`);

// Each component, wrapped in the layer index.css imports it into
const imports = readFileSync(entry, 'utf8').matchAll(/@import url\("components\/([\w-]+)\.css"\) layer\(([\w-]+)\);/g);
for (const [, name, layer] of imports) {
  const source = readFileSync(new URL(`../src/components/${name}.css`, import.meta.url), 'utf8');
  const { code } = transform({ filename: `${name}.css`, code: Buffer.from(`@layer ${layer} {\n${source}\n}`), minify: true });
  writeFileSync(new URL(`../dist/components/${name}.css`, import.meta.url), banner + code);
  console.log(`dist/components/${name}.css: ${kb(code)}`);
}
