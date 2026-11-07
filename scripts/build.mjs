/* ==========================================================================
   Build: src/index.css and its imports, in their cascade layers, as one
   minified dist/dfh-site.css. No targets, so nesting and other modern CSS
   stay as written.
   ========================================================================== */
import { bundle } from 'lightningcss';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)));
const { code } = bundle({ filename: new URL('../src/index.css', import.meta.url).pathname, minify: true });

const banner = `/* DFH Shared Styles ${pkg.version}, for DFH Components ${pkg.config.library} */\n`;
mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
writeFileSync(new URL('../dist/dfh-site.css', import.meta.url), banner + code);
console.log(`dist/dfh-site.css: ${pkg.version}, ${(code.length / 1024).toFixed(1)} KB`);
