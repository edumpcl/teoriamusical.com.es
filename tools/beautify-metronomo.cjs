#!/usr/bin/env node
/*
 * Formateador SEGURO para assets/tools/metronomo.js (que está minificado a una línea).
 * SOLO inserta saltos de línea e indentación FUERA de cadenas/plantillas/comentarios.
 * No renombra ni cambia tokens: el resultado es funcionalmente idéntico.
 *
 * Verificación: tras formatear, comprueba que normalizar (quitar espacios de las
 * zonas de código) el original y el formateado da EXACTAMENTE lo mismo. Si no
 * coincide, aborta sin escribir nada.
 *
 * Uso:  node tools/beautify-metronomo.cjs
 * Salida: assets/tools/metronomo.src.js  (fuente legible)
 */
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'assets', 'tools', 'metronomo.js');
const OUT = path.join(__dirname, 'metronomo.src.js');
const code = fs.readFileSync(FILE, 'utf8');

// ── Tokenizer: parte el código en segmentos {type, text} ──
// type: 'code' | 'lit' (cadena/plantilla) | 'com' (comentario). lit/com se copian VERBATIM.
function readString(s, i, q) { let j = i + 1; while (j < s.length) { if (s[j] === '\\') { j += 2; continue; } if (s[j] === q) return j + 1; j++; } return j; }
function readTemplate(s, i) {
  let j = i + 1;
  while (j < s.length) {
    const c = s[j];
    if (c === '\\') { j += 2; continue; }
    if (c === '`') return j + 1;
    if (c === '$' && s[j + 1] === '{') {
      j += 2; let depth = 1;
      while (j < s.length && depth > 0) {
        const d = s[j];
        if (d === '\\') { j += 2; continue; }
        if (d === '{') { depth++; j++; continue; }
        if (d === '}') { depth--; j++; continue; }
        if (d === "'" || d === '"') { j = readString(s, j, d); continue; }
        if (d === '`') { j = readTemplate(s, j); continue; }
        j++;
      }
      continue;
    }
    j++;
  }
  return j;
}
function tokenize(s) {
  const segs = []; let i = 0, codeStart = 0;
  const flushCode = (end) => { if (end > codeStart) segs.push({ type: 'code', text: s.slice(codeStart, end) }); };
  while (i < s.length) {
    const c = s[i];
    if (c === "'" || c === '"') { flushCode(i); const e = readString(s, i, c); segs.push({ type: 'lit', text: s.slice(i, e) }); i = e; codeStart = i; continue; }
    if (c === '`') { flushCode(i); const e = readTemplate(s, i); segs.push({ type: 'lit', text: s.slice(i, e) }); i = e; codeStart = i; continue; }
    if (c === '/' && s[i + 1] === '/') { flushCode(i); let e = i; while (e < s.length && s[e] !== '\n') e++; segs.push({ type: 'com', text: s.slice(i, e) }); i = e; codeStart = i; continue; }
    if (c === '/' && s[i + 1] === '*') { flushCode(i); let e = i + 2; while (e < s.length && !(s[e] === '*' && s[e + 1] === '/')) e++; e += 2; segs.push({ type: 'com', text: s.slice(i, e) }); i = e; codeStart = i; continue; }
    i++;
  }
  flushCode(s.length);
  return segs;
}

const segs = tokenize(code);

// ── Formateo ──
let out = '', depth = 0, paren = 0;
const IND = '  ';
function nl() { out = out.replace(/[ \t]+$/, ''); out += '\n' + IND.repeat(Math.max(0, depth)); }
for (const seg of segs) {
  if (seg.type !== 'code') { out += seg.text; continue; }
  for (let k = 0; k < seg.text.length; k++) {
    const c = seg.text[k];
    if (c === '(' || c === '[') { paren++; out += c; continue; }
    if (c === ')' || c === ']') { paren = Math.max(0, paren - 1); out += c; continue; }
    if (c === '{') { out += '{'; depth++; nl(); continue; }
    if (c === '}') { depth = Math.max(0, depth - 1); nl(); out += '}'; continue; }
    if (c === ';') { out += ';'; nl(); continue; }
    if (c === ',' && paren === 0) { out += ','; nl(); continue; }
    if (c === '\n' || c === '\r') { continue; } // ya formateamos nosotros
    out += c;
  }
}
out = out.replace(/\n[ \t]*\n+/g, '\n').replace(/[ \t]+\n/g, '\n').trim() + '\n';

// ── Verificación de equivalencia: normalizar (quitar espacios de zonas 'code') ──
function normalize(s) {
  return tokenize(s).map(t => t.type === 'code' ? t.text.replace(/\s+/g, '') : t.text).join('');
}
const a = normalize(code), b = normalize(out);
if (a !== b) {
  // localizar primera diferencia para depurar
  let p = 0; while (p < a.length && p < b.length && a[p] === b[p]) p++;
  console.error('❌ MISMATCH en pos', p, '\n  orig: …' + a.slice(Math.max(0, p - 30), p + 30) + '…\n  form: …' + b.slice(Math.max(0, p - 30), p + 30) + '…');
  process.exit(1);
}

const header = '/*\n * FUENTE LEGIBLE del metrónomo (formateada desde metronomo.js, minificado).\n * Mismo comportamiento, solo con saltos de línea e indentación.\n * Generado por tools/beautify-metronomo.cjs. Para desplegar cambios hace falta\n * re-minificar a metronomo.js (p. ej. con terser).\n */\n';
fs.writeFileSync(OUT, header + out);
console.log('✅ Equivalencia verificada. Escrito', path.relative(path.join(__dirname, '..'), OUT), '(' + out.split('\n').length + ' líneas)');
