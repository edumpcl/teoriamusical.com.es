#!/usr/bin/env node
/*
 * Re-minifica el fuente legible del metrónomo a la versión desplegada.
 *   tools/metronomo.src.js   →   assets/tools/metronomo.js
 *
 * Flujo de trabajo para mejorar el metrónomo:
 *   1. Edita  tools/metronomo.src.js  (versión legible).
 *   2. node tools/build-metronomo.cjs        (re-minifica → metronomo.js)
 *   3. node tools/version_assets.cjs         (cache-busting del ?v=)
 *
 * Requiere terser:  npm install   (terser está en devDependencies).
 * Para regenerar el fuente desde el minificado actual: node tools/beautify-metronomo.cjs
 */
const fs = require('fs');
const path = require('path');
let terser;
try { terser = require('terser'); }
catch (e) { console.error('❌ Falta terser. Ejecuta primero: npm install'); process.exit(1); }

const SRC = path.join(__dirname, 'metronomo.src.js');
const OUT = path.join(__dirname, '..', 'assets', 'tools', 'metronomo.js');

(async () => {
  const code = fs.readFileSync(SRC, 'utf8');
  const r = await terser.minify(code, { compress: true, mangle: true });
  if (r.error) { console.error('❌ Error de terser:', r.error); process.exit(1); }
  fs.writeFileSync(OUT, r.code);
  console.log('✅ metronomo.js re-minificado (' + r.code.length + ' bytes).');
  console.log('   Recuerda: node tools/version_assets.cjs  (para el cache-busting)');
})();
