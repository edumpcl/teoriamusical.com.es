#!/usr/bin/env node
/**
 * Índice del buscador interno: recorre las páginas HTML publicadas y escribe
 *   assets/search/indice-es.json   (páginas en castellano)
 *   assets/search/indice-en.json   (páginas en inglés, bajo /en/)
 * con, de cada una, título, descripción, encabezados y preguntas frecuentes. Es lo único que el buscador (assets/js/buscador.js) lee.
 *
 * Después actualiza las dos constantes de versión (INDICE_V en buscador.js y BUSCADOR_V en main.js), para que los navegadores vuelvan a bajar
 * el índice y el buscador solo cuando cambian (/assets es inmutable). Idempotente: dos ejecuciones seguidas no cambian nada.
 *
 *   node tools/build-search-index.js            construye el índice y las versiones
 *   node tools/build-search-index.js --solo-ver  lista lo que entraría, sin escribir
 *
 * Reglas: entran las páginas indexables (sin noindex, sin redirección). No entran: avisos legales, iframes de los juegos (/juego/ y /play/),
 * las fichas individuales de agrupaciones y comunidades de la agenda (inundarían los resultados de «banda» u «orquesta»), ni herramientas internas.
 * Hay que relanzarlo al crear, borrar o retitular páginas (el cierre del flujo /nueva-pagina lo recuerda).
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const SOLO_VER = process.argv.includes('--solo-ver');
const OMITIR_DIR = new Set(['node_modules', '.git', 'tools', 'assets', 'api', 'panel', 'scratch', 'data', '.claude', '.playwright-mcp', 'vercel', 'supabase']);
const OMITIR_RUTA = [
  /^(aviso-legal|politica-de-privacidad|politica-de-cookies|contacto|buscar)\//, /^404/,
  /^en\/(legal-notice|privacy-policy|cookie-policy|search)\//,
  /\/juego\//, /\/play\//,
  /^agenda-conciertos-bandas-orquestas\/[a-z0-9-]+\//,   // fichas por agrupación y por comunidad: solo entra la página principal de la agenda
];

function archivos(dir, acc) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    // las carpetas internas se omiten solo en la raíz (en/tools es la herramienta inglesa y SÍ entra)
    if (e.isDirectory()) { if (!(dir === ROOT && OMITIR_DIR.has(e.name)) && !e.name.startsWith('.')) archivos(path.join(dir, e.name), acc); }
    else if (e.name === 'index.html') acc.push(path.join(dir, e.name));
  }
  return acc;
}

const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&apos;': "'", '&nbsp;': ' ', '&middot;': '·', '&rsquo;': '’', '&lsquo;': '‘', '&ndash;': '–', '&mdash;': '—', '&hellip;': '…' };
function texto(html) {
  return html.replace(/<(script|style|svg)[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (m, d) => String.fromCodePoint(+d))
    .replace(/&[a-z]+;/gi, (m) => ENT[m.toLowerCase()] || ' ').replace(/\s+/g, ' ').trim();
}

/** Sección por ruta: teoria, ejercicio, juego, herramienta, blog, compositor, agenda, laboratorio, otro */
function seccion(ruta, en) {
  const r = en ? ruta.replace(/^en\//, '') : ruta;
  if (/^(diccionario-musical|music-dictionary)\//.test(r)) return 'teoria';
  if (/^(ejercicios|exercises)\//.test(r)) return 'ejercicio';
  if (/^(juegos|games)\//.test(r)) return 'juego';
  if (/^(herramientas|tools)\//.test(r)) return 'herramienta';
  if (/^blog\//.test(r)) return 'blog';
  if (/^(compositores|composers)\//.test(r)) return 'compositor';
  if (/^(agenda|oposiciones|concert|competitive)/.test(r)) return 'agenda';
  if (/^tecnico-especialista/.test(r)) return 'laboratorio';
  return 'otro';
}

function leer(f) {
  const ruta = path.relative(ROOT, f).replace(/\\/g, '/').replace(/index\.html$/, '');
  const en = ruta.startsWith('en/');
  if (OMITIR_RUTA.some((re) => re.test(ruta))) return null;
  const h = fs.readFileSync(f, 'utf8');
  if (/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(h)) return null;
  if (/http-equiv=["']refresh["']/i.test(h)) return null;
  const t = (/<title>([\s\S]*?)<\/title>/i.exec(h) || [])[1];
  if (!t) return null;
  const titulo = texto(t).replace(/\s*[|·–-]\s*(Teor[ií]a Musical|teoriamusical\.com\.es)\s*$/i, '');
  const d = (/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i.exec(h) || [])[1] || '';
  const art = (/<article[\s\S]*<\/article>/i.exec(h) || [h])[0];
  const hs = [...art.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi)].map((m) => texto(m[1])).filter((x) => x && !/^(Preguntas|Frequently|P[aá]ginas relacionadas|Related)/i.test(x));
  const qs = [...h.matchAll(/<div class="tm-faq-q">([\s\S]*?)<\/div>/gi)].map((m) => texto(m[1])).filter(Boolean);
  const h1 = (/<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(h) || [])[1];
  return {
    en, e: {
      u: '/' + ruta, t: titulo, h: texto(h1 || '') && texto(h1 || '') !== titulo ? texto(h1) : undefined,
      d: texto(d), c: [...new Set(hs)].slice(0, 30).join(' · '), q: [...new Set(qs)].slice(0, 12).join(' · '), s: seccion(ruta, en)
    }
  };
}

const todos = archivos(ROOT, []).map(leer).filter(Boolean);
const porIdioma = { es: [], en: [] };
for (const x of todos) porIdioma[x.en ? 'en' : 'es'].push(x.e);
const ORDEN = ['teoria', 'ejercicio', 'herramienta', 'juego', 'blog', 'compositor', 'agenda', 'laboratorio', 'otro'];
for (const k of Object.keys(porIdioma)) porIdioma[k].sort((a, b) => ORDEN.indexOf(a.s) - ORDEN.indexOf(b.s) || a.u.localeCompare(b.u));

const resumen = (k) => { const c = {}; porIdioma[k].forEach((e) => { c[e.s] = (c[e.s] || 0) + 1; }); return k + ': ' + porIdioma[k].length + ' páginas ' + JSON.stringify(c); };
console.log(resumen('es')); console.log(resumen('en'));
if (SOLO_VER) process.exit(0);

const dirIdx = path.join(ROOT, 'assets/search');
fs.mkdirSync(dirIdx, { recursive: true });
const escribir = (f, s) => { if (!fs.existsSync(f) || fs.readFileSync(f, 'utf8') !== s) { fs.writeFileSync(f, s); return true; } return false; };
let cambios = 0;
for (const k of ['es', 'en']) {
  const s = JSON.stringify(porIdioma[k].map((e) => { const o = {}; for (const c of Object.keys(e)) if (e[c] !== undefined && e[c] !== '') o[c] = e[c]; return o; }));
  if (escribir(path.join(dirIdx, 'indice-' + k + '.json'), s)) cambios++;
  console.log('indice-' + k + '.json', Math.round(Buffer.byteLength(s) / 1024) + ' KB');
}

// versiones: hash de los dos índices → INDICE_V en buscador.js; hash del buscador → BUSCADOR_V en main.js
const hash = (bufs) => { const h = crypto.createHash('sha1'); bufs.forEach((b) => h.update(b)); return h.digest('hex').slice(0, 8); };
function fijar(f, nombre, valor) {
  const raw = fs.readFileSync(f, 'utf8');
  const re = new RegExp("(var " + nombre + " = ')[0-9a-f]*(')");
  if (!re.test(raw)) { console.log('(aviso) no encuentro ' + nombre + ' en ' + path.relative(ROOT, f)); return false; }
  const nuevo = raw.replace(re, '$1' + valor + '$2');
  if (nuevo !== raw) { fs.writeFileSync(f, nuevo); return true; }
  return false;
}
const bus = path.join(ROOT, 'assets/js/buscador.js'), main = path.join(ROOT, 'assets/js/main.js');
if (fs.existsSync(bus)) {
  const vi = hash(['es', 'en'].map((k) => fs.readFileSync(path.join(dirIdx, 'indice-' + k + '.json'))));
  if (fijar(bus, 'INDICE_V', vi)) cambios++;
  const vb = hash([fs.readFileSync(bus)]);
  if (fs.existsSync(main) && fijar(main, 'BUSCADOR_V', vb)) cambios++;
}
console.log(cambios ? 'actualizado' : 'sin cambios');
