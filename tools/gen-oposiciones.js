'use strict';
/*
 * Pinta la página /oposiciones-de-musica/ desde data/oposiciones.json.
 * Sustituye lo que hay entre <!-- OP:START --> y <!-- OP:END --> en su index.html.
 * El contenido va en el HTML (indexable); assets/js/oposiciones.js solo filtra y marca plazos.
 *
 * Uso:  node tools/gen-oposiciones.js            (hoy = fecha del sistema)
 *       node tools/gen-oposiciones.js 2026-10-20 (simular otra fecha)
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const DATA = path.join(ROOT, 'data', 'oposiciones.json');
const PAGE = path.join(ROOT, 'oposiciones-de-musica', 'index.html');
const DIAS_CERRADAS = 60;

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const TIPOS = { orquesta: 'Orquesta', banda: 'Banda', docencia: 'Conservatorio o escuela' };

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fecha = iso => { const [y, m, d] = iso.split('-').map(Number); return `${d} de ${MESES[m - 1]} de ${y}`; };
const dias = (a, b) => Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 864e5);
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

const hoy = process.argv[2] || new Date().toISOString().slice(0, 10);
const data = JSON.parse(fs.readFileSync(DATA, 'utf8'));

function fila(k, v) { return v ? `<dt>${k}</dt><dd>${esc(v)}</dd>` : ''; }

function tarjeta(c, anunciada) {
  const instr = (c.instrumentos || []).join('|');
  const fuentes = (c.fuentes || []).map(f => `<a href="${esc(f.url)}" rel="noopener">${esc(f.texto)}</a>`).join(' · ');
  const aviso = anunciada ? '' : ' <span class="tm-op-nota">Confirma el plazo en el boletín enlazado.</span>';
  let plazo = '';
  if (c.fin) plazo = `<p class="tm-op-plazo"><strong>Plazo hasta el ${fecha(c.fin)}</strong> <span class="tm-op-dias" data-op-dias></span>${c.nota_plazo ? `<br><span class="tm-op-nota">${esc(c.nota_plazo)}</span>` : ''}</p>`;
  const cuerpo = anunciada
    ? `<p class="tm-op-estado">${esc(c.estado)}</p>`
    : `<dl class="tm-op-datos">${fila('Plazas', c.plazas)}${fila('Acceso', c.acceso)}${fila('Requisitos', c.requisitos)}${fila('Pruebas', c.pruebas)}${fila('Tasa', c.tasa)}</dl>`;
  return `<div class="tm-op" data-tipo="${c.tipo}" data-instr="${esc(instr)}" data-ccaa="${esc(c.comunidad)}"${c.fin ? ` data-fin="${c.fin}"` : ''}>
  <p class="tm-op-meta"><span class="tm-op-tipo tm-op-tipo--${c.tipo}">${TIPOS[c.tipo]}</span><span>${esc(c.comunidad)}</span></p>
  <h3>${esc(c.titulo)}</h3>
  <p class="tm-op-entidad">${esc(c.entidad)}</p>
  ${cuerpo}
  ${plazo}
  <p class="tm-op-fuentes">Fuente: ${fuentes}${aviso}</p>
</div>`;
}

const todas = data.convocatorias;
const abiertas = todas.filter(c => dias(hoy, c.fin) >= 0).sort((a, b) => a.fin.localeCompare(b.fin));
const cerradas = todas.filter(c => dias(hoy, c.fin) < 0 && dias(hoy, c.fin) >= -DIAS_CERRADAS).sort((a, b) => b.fin.localeCompare(a.fin));
const anunciadas = data.anunciadas || [];

const todosItems = [...todas, ...anunciadas];
const opciones = (valores, etiqueta) => valores.map(v => `<option value="${esc(v)}">${esc(etiqueta ? etiqueta(v) : cap(v))}</option>`).join('');
const instrs = [...new Set(todosItems.flatMap(c => c.instrumentos || []))].filter(i => i !== 'varios').sort((a, b) => a.localeCompare(b, 'es'));
const ccaa = [...new Set(todosItems.map(c => c.comunidad))].sort((a, b) => a.localeCompare(b, 'es'));
const tipos = Object.keys(TIPOS).filter(t => todosItems.some(c => c.tipo === t));

const html = `<!-- OP:START (generado por tools/gen-oposiciones.js; no editar a mano) -->
<p class="tm-op-comprobado">Última comprobación: <strong>${fecha(data.comprobado)}</strong>.</p>

<form class="tm-op-filtros" id="op-filtros" aria-label="Filtrar convocatorias">
  <label>Tipo <select id="op-f-tipo"><option value="">Todos</option>${opciones(tipos, t => TIPOS[t])}</select></label>
  <label>Instrumento <select id="op-f-instr"><option value="">Todos</option>${opciones(instrs)}<option value="varios">Varios (bolsas generales)</option></select></label>
  <label>Comunidad <select id="op-f-ccaa"><option value="">Todas</option>${opciones(ccaa, v => v)}</select></label>
</form>
<p class="tm-op-contador" id="op-contador" role="status" aria-live="polite"></p>

<h2 id="op-abiertas-titulo">Con plazo abierto ahora</h2>
<div class="tm-op-lista" id="op-abiertas">
${abiertas.map(c => tarjeta(c, false)).join('\n')}
</div>

<h2 id="op-anunciadas-titulo">Anunciadas, sin plazo confirmado</h2>
<div class="tm-op-lista" id="op-anunciadas">
${anunciadas.map(c => tarjeta(c, true)).join('\n')}
</div>

<h2 id="op-cerradas-titulo"${cerradas.length ? '' : ' hidden'}>Cerradas recientemente</h2>
<div class="tm-op-lista" id="op-cerradas"${cerradas.length ? '' : ' hidden'}>
${cerradas.map(c => tarjeta(c, false)).join('\n')}
</div>
<!-- OP:END -->`;

let page = fs.readFileSync(PAGE, 'utf8');
const re = /<!-- OP:START[\s\S]*?<!-- OP:END -->/;
if (!re.test(page)) { console.error('Faltan los marcadores OP:START/OP:END en', PAGE); process.exit(1); }
page = page.replace(re, () => html);
fs.writeFileSync(PAGE, page);

// Señal de actualización honesta: dateModified del Article y lastmod del sitemap = fecha de la última comprobación.
page = fs.readFileSync(PAGE, 'utf8').replace(/("@type":"Article"[\s\S]*?"dateModified":")[\d-]+(")/, `$1${data.comprobado}$2`);
fs.writeFileSync(PAGE, page);
const SITEMAP = path.join(ROOT, 'sitemap.xml');
const sm = fs.readFileSync(SITEMAP, 'utf8');
const sm2 = sm.replace(/(<loc>https:\/\/www\.teoriamusical\.com\.es\/oposiciones-de-musica\/<\/loc><lastmod>)[\d-]+(<)/, `$1${data.comprobado}$2`);
if (sm2 !== sm) fs.writeFileSync(SITEMAP, sm2);
// El bloque generado puede llevar un anuncio dentro: se regenera y se reinserta (insert_ads es idempotente).
const r = require('child_process').spawnSync('python', [path.join(__dirname, 'insert_ads.py'), '--apply', PAGE], { encoding: 'utf8' });
if (r.status !== 0) console.error('insert_ads falló:', r.stderr || r.stdout);
console.log(`OK: ${abiertas.length} abiertas, ${anunciadas.length} anunciadas, ${cerradas.length} cerradas (hoy=${hoy})`);
