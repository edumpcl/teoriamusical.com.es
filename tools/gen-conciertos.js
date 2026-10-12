'use strict';
/*
 * Agenda de conciertos por comunidades, desde data/conciertos.json.
 *
 *  - Portal:      /agenda-conciertos-bandas-orquestas/            (elige comunidad + próximos conciertos)
 *  - Comunidades: /agenda-conciertos-bandas-orquestas/<slug>/     (una página por comunidad)
 *
 * Una comunidad tiene página propia cuando tiene MIN_PAGINA conciertos próximos (o ya la tenía).
 * Las que aún no llegan salen en el portal, en «Otras comunidades». La página se crea sola con el scaffold.
 * Cada ejecución regenera lo que hay entre <!-- CO:START --> y <!-- CO:END -->, quita lo pasado,
 * actualiza dateModified y sitemap, y relanza insert_ads.
 *
 * Uso:  node tools/gen-conciertos.js            (hoy = fecha del sistema)
 *       node tools/gen-conciertos.js 2026-11-10 (simular otra fecha)
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const DATA = path.join(ROOT, 'data', 'conciertos.json');
const BASE = 'agenda-conciertos-bandas-orquestas';
const HUB = path.join(ROOT, BASE, 'index.html');
const MIN_PAGINA = 3;

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const TIPOS = { orquesta: 'Orquesta', banda: 'Banda profesional', sociedad: 'Banda de música', conservatorio: 'Conservatorio', escuela: 'Escuela de música' };

// Nombre (el del JSON) -> slug y expresión «en ...» para títulos
const CCAA = {
  'Andalucía': ['andalucia', 'en Andalucía'],
  'Aragón': ['aragon', 'en Aragón'],
  'Asturias': ['asturias', 'en Asturias'],
  'Islas Baleares': ['islas-baleares', 'en las Islas Baleares'],
  'Canarias': ['canarias', 'en Canarias'],
  'Cantabria': ['cantabria', 'en Cantabria'],
  'Castilla y León': ['castilla-y-leon', 'en Castilla y León'],
  'Castilla-La Mancha': ['castilla-la-mancha', 'en Castilla-La Mancha'],
  'Cataluña': ['cataluna', 'en Cataluña'],
  'Comunidad Valenciana': ['comunidad-valenciana', 'en la Comunidad Valenciana'],
  'Extremadura': ['extremadura', 'en Extremadura'],
  'Galicia': ['galicia', 'en Galicia'],
  'Comunidad de Madrid': ['comunidad-de-madrid', 'en la Comunidad de Madrid'],
  'Región de Murcia': ['region-de-murcia', 'en la Región de Murcia'],
  'Navarra': ['navarra', 'en Navarra'],
  'País Vasco': ['pais-vasco', 'en el País Vasco'],
  'La Rioja': ['la-rioja', 'en La Rioja'],
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const partes = iso => iso.split('-').map(Number);
const diaSemana = iso => { const [y, m, d] = partes(iso); return DIAS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()]; };
const fechaLarga = iso => { const [y, m, d] = partes(iso); return `${cap(diaSemana(iso))} ${d} de ${MESES[m - 1]} de ${y}`; };
const fechaCorta = iso => { const [, m, d] = partes(iso); return `${d} de ${MESES[m - 1]}`; };
const mesTitulo = iso => { const [y, m] = partes(iso); return `${cap(MESES[m - 1])} de ${y}`; };

// Horario de España: CEST (+02:00) entre el último domingo de marzo y el último domingo de octubre.
function ultimoDomingo(y, m) { const d = new Date(Date.UTC(y, m + 1, 0)); d.setUTCDate(d.getUTCDate() - d.getUTCDay()); return d; }
function offset(iso) {
  const [y, m, d] = partes(iso); const t = Date.UTC(y, m - 1, d, 12);
  return (t >= ultimoDomingo(y, 2).getTime() && t < ultimoDomingo(y, 9).getTime()) ? '+02:00' : '+01:00';
}

const hoy = process.argv[2] || new Date().toISOString().slice(0, 10);
const data = JSON.parse(fs.readFileSync(DATA, 'utf8'));

for (const c of data.conciertos) {
  if (!CCAA[c.comunidad]) { console.error(`Comunidad desconocida en «${c.id}»: ${c.comunidad}`); process.exit(1); }
  if (!TIPOS[c.tipo]) { console.error(`Tipo desconocido en «${c.id}»: ${c.tipo}`); process.exit(1); }
}

const futuros = data.conciertos.filter(c => c.fecha >= hoy)
  .sort((a, b) => (a.fecha + (a.hora || '99:99')).localeCompare(b.fecha + (b.hora || '99:99')));
const dirDe = nombre => path.join(ROOT, BASE, CCAA[nombre][0]);
const urlDe = nombre => `/${BASE}/${CCAA[nombre][0]}/`;
const porCcaa = {};
for (const c of futuros) (porCcaa[c.comunidad] = porCcaa[c.comunidad] || []).push(c);
const conPagina = Object.keys(CCAA).filter(n => (porCcaa[n] || []).length >= MIN_PAGINA || fs.existsSync(path.join(dirDe(n), 'index.html')));

// ---------- piezas HTML ----------
function fila(k, v) { return v ? `<dt>${k}</dt><dd>${esc(v)}</dd>` : ''; }

function tarjeta(c) {
  const fuentes = (c.fuentes || []).map(f => `<a href="${esc(f.url)}" rel="noopener">${esc(f.texto)}</a>`).join(' · ');
  const donde = [c.lugar, c.ciudad].filter(Boolean).join(', ');
  return `<div class="tm-op tm-co" data-tipo="${c.tipo}" data-ccaa="${esc(c.comunidad)}" data-fecha="${c.fecha}">
  <p class="tm-op-meta"><span class="tm-op-tipo tm-op-tipo--${c.tipo}">${TIPOS[c.tipo]}</span><span>${esc(c.comunidad)}</span></p>
  <h3>${esc(c.titulo)}</h3>
  <p class="tm-op-entidad">${esc(c.agrupacion)}</p>
  <p class="tm-op-plazo"><strong>${fechaLarga(c.fecha)}${c.hora ? ` · ${c.hora} h` : ''}</strong></p>
  <dl class="tm-op-datos">${fila('Dónde', donde)}${fila('Programa', c.programa)}${fila('Entrada', c.entrada)}</dl>
  ${c.nota ? `<p class="tm-op-nota">${esc(c.nota)}</p>` : ''}
  <p class="tm-op-fuentes">Fuente: ${fuentes}. <span class="tm-op-nota">Confirma fecha y hora en la fuente enlazada.</span></p>
</div>`;
}

function evento(c) {
  if (!c.ciudad) return null;
  const inicio = c.hora ? `${c.fecha}T${c.hora}:00${offset(c.fecha)}` : c.fecha;
  const e = {
    '@type': 'Event',
    name: `${c.titulo} — ${c.agrupacion}`,
    startDate: inicio,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: { '@type': 'Place', name: c.lugar || c.ciudad, address: { '@type': 'PostalAddress', addressLocality: c.ciudad, addressCountry: 'ES' } },
    organizer: { '@type': 'Organization', name: c.agrupacion },
    url: (c.fuentes && c.fuentes[0] && c.fuentes[0].url) || undefined,
  };
  if (c.programa) e.description = c.programa;
  return e;
}

const ld = lista => {
  const ev = lista.map(evento).filter(Boolean);
  return ev.length ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': ev })}</script>` : '';
};

function porMeses(lista) {
  const meses = [];
  for (const c of lista) {
    const k = c.fecha.slice(0, 7);
    let g = meses[meses.length - 1];
    if (!g || g.k !== k) { g = { k, t: mesTitulo(c.fecha), items: [] }; meses.push(g); }
    g.items.push(c);
  }
  return meses.map(g => `<h2 class="co-mes" id="co-${g.k}">${g.t}</h2>\n<div class="tm-op-lista co-lista">\n${g.items.map(tarjeta).join('\n')}\n</div>`).join('\n\n');
}

function filtros(lista) {
  const tipos = Object.keys(TIPOS).filter(t => lista.some(c => c.tipo === t));
  return `<form class="tm-op-filtros" id="co-filtros" aria-label="Filtrar conciertos">
  <label>Tipo <select id="co-f-tipo"><option value="">Todos</option>${tipos.map(t => `<option value="${t}">${TIPOS[t]}</option>`).join('')}</select></label>
</form>
<p class="tm-op-contador" id="co-contador" role="status" aria-live="polite"></p>`;
}

function navMeses(lista) {
  const ms = [...new Set(lista.map(c => c.fecha.slice(0, 7)))];
  if (ms.length < 2) return '';
  return `<nav class="co-nav" aria-label="Ir a un mes"><span>Ir a:</span> ${ms.map(k => `<a href="#co-${k}">${cap(MESES[Number(k.slice(5)) - 1])} ${k.slice(0, 4)}</a>`).join(' ')}</nav>`;
}

const comprobado = `<p class="tm-op-comprobado">Última comprobación: <strong>${fechaLarga(data.comprobado)}</strong>.</p>`;
const otrasEnlaces = actual => conPagina.filter(n => n !== actual).map(n => `<li><a href="${urlDe(n)}">${esc(n)}</a></li>`).join('\n');

function bloqueComunidad(nombre) {
  const lista = porCcaa[nombre] || [];
  const otras = otrasEnlaces(nombre);
  return `<!-- CO:START (generado por tools/gen-conciertos.js; no editar a mano) -->
${comprobado}

${lista.length ? `${filtros(lista)}\n${navMeses(lista)}\n\n${porMeses(lista)}` : `<p>Ahora mismo no tenemos conciertos próximos confirmados ${CCAA[nombre][1]}. Si tu agrupación da uno, <a href="/contacto/">envíanoslo</a>.</p>`}
${ld(lista)}

<h2>Otras comunidades</h2>
<ul>
<li><a href="/${BASE}/">Todas las comunidades</a></li>
${otras}
</ul>
<!-- CO:END -->`;
}

function bloqueHub() {
  const prox = futuros.slice(0, 8);
  const sinPagina = Object.keys(CCAA).filter(n => !conPagina.includes(n) && (porCcaa[n] || []).length);
  const resto = futuros.filter(c => sinPagina.includes(c.comunidad));
  const pendientes = Object.keys(CCAA).filter(n => !conPagina.includes(n) && !(porCcaa[n] || []).length);
  const cards = conPagina.map(n => {
    const l = porCcaa[n] || [];
    return `<a class="tm-op co-ccaa" href="${urlDe(n)}">
  <h3>${esc(n)}</h3>
  <p>${l.length} ${l.length === 1 ? 'concierto próximo' : 'conciertos próximos'}</p>
  ${l.length ? `<p class="tm-op-nota">Próximo: ${fechaCorta(l[0].fecha)}</p>` : ''}
</a>`;
  }).join('\n');
  return `<!-- CO:START (generado por tools/gen-conciertos.js; no editar a mano) -->
${comprobado}

<h2 id="comunidades">Elige tu comunidad</h2>
<div class="tm-op-lista co-ccaas">
${cards}
</div>
${pendientes.length ? `<p class="tm-op-nota">Aún sin conciertos confirmados: ${pendientes.map(esc).join(', ')}. Si tu agrupación está en una de ellas, <a href="/contacto/">envíanos su concierto</a>.</p>` : ''}

${filtros(futuros)}

<h2 class="co-mes" id="co-proximos">Próximos conciertos</h2>
<div class="tm-op-lista co-lista">
${prox.map(tarjeta).join('\n')}
</div>
${resto.length ? `\n<h2 class="co-mes" id="co-otras">Otras comunidades</h2>\n<div class="tm-op-lista co-lista">\n${resto.map(tarjeta).join('\n')}\n</div>\n${ld(resto)}` : ''}
<!-- CO:END -->`;
}

// ---------- páginas ----------
function escribirBloque(file, bloque) {
  let page = fs.readFileSync(file, 'utf8');
  const re = /<!-- CO:START[\s\S]*?<!-- CO:END -->/;
  if (!re.test(page)) { console.error('Faltan los marcadores CO:START/CO:END en', file); process.exit(1); }
  page = page.replace(re, () => bloque);
  page = page.replace(/("@type":"Article"[\s\S]*?"dateModified":")[\d-]+(")/, `$1${data.comprobado}$2`);
  fs.writeFileSync(file, page);
}

function crearPagina(nombre) {
  const [slug, en] = CCAA[nombre];
  const dir = `${BASE}/${slug}`;
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'co-'));
  const bodyFile = path.join(tmp, 'body.html');
  fs.writeFileSync(bodyFile, `<p>Conciertos de bandas sinfónicas, orquestas y bandas de sociedades musicales ${en}. Solo incluimos lo que hemos podido comprobar en una fuente oficial (la web de la agrupación, del auditorio o del ayuntamiento), y cada ficha lleva su enlace. Se actualiza cada semana.</p>

<p><strong>La fuente enlazada manda:</strong> fechas, horas y programas pueden cambiar, así que confírmalo en la web de la agrupación antes de desplazarte.</p>

<!-- CO:START -->
<!-- CO:END -->

<h2>¿Tu banda o tu orquesta da un concierto ${en}?</h2>
<p><a href="/contacto/">Escríbenos desde la página de contacto</a> con el nombre de la agrupación, la fecha, la hora, el lugar, el programa, el precio y <strong>un enlace a la página oficial donde figure</strong>. Lo comprobamos y lo añadimos. Es gratis.</p>
`);
  const cfg = {
    dir,
    title: `Conciertos de bandas y orquestas ${en}`,
    desc: `Agenda de conciertos de bandas sinfónicas, orquestas y bandas de sociedades musicales ${en}, comprobados en fuentes oficiales y actualizados cada semana.`,
    h1: `Conciertos de bandas y orquestas ${en}`,
    breadcrumb: [{ name: 'Agenda de conciertos', url: `/${BASE}/` }],
    bodyFile,
    faq: [
      { q: `¿Dónde puedo ver los conciertos de bandas y orquestas ${en}?`, a: `En esta página, ordenados por fecha, con el lugar, el programa y el enlace a la web oficial de cada agrupación.` },
      { q: '¿Cada cuánto se actualiza?', a: 'Cada semana. En la parte superior figura la fecha de la última comprobación.' },
      { q: '¿Cómo añado el concierto de mi banda u orquesta?', a: 'Escribe desde la página de contacto con la fecha, la hora, el lugar, el programa y un enlace a la página oficial donde figure. Es gratis.' },
    ],
    related: [
      { text: 'Agenda de conciertos de bandas y orquestas en España', url: `/${BASE}/` },
      { text: 'Oposiciones de música en España: convocatorias abiertas', url: '/oposiciones-de-musica/' },
    ],
    wide: true,
    datePublished: data.comprobado,
  };
  const cfgFile = path.join(tmp, 'config.json');
  fs.writeFileSync(cfgFile, JSON.stringify(cfg));
  const r = spawnSync('node', [path.join(__dirname, 'nueva-pagina.js'), cfgFile], { encoding: 'utf8' });
  if (r.status !== 0) { console.error('nueva-pagina falló:', r.stderr || r.stdout); process.exit(1); }
  const file = path.join(ROOT, dir, 'index.html');
  let page = fs.readFileSync(file, 'utf8')
    .replace('<a href="/diccionario-musical/" class="is-active">', '<a href="/diccionario-musical/" class="">');
  const tag = '<script src="/assets/js/main.js';
  page = page.replace(tag, '<script src="/assets/js/conciertos.js" defer></script>\n' + tag);
  fs.writeFileSync(file, page);
  return true;
}

let creadas = 0;
for (const n of conPagina) {
  const file = path.join(dirDe(n), 'index.html');
  if (!fs.existsSync(file)) { crearPagina(n); creadas++; }
  escribirBloque(file, bloqueComunidad(n));
}
escribirBloque(HUB, bloqueHub());

// ---------- sitemap ----------
const SM = path.join(ROOT, 'sitemap.xml');
let sm = fs.readFileSync(SM, 'utf8');
const loc = u => `https://www.teoriamusical.com.es${u}`;
for (const u of [`/${BASE}/`, ...conPagina.map(urlDe)]) {
  const entrada = `  <url><loc>${loc(u)}</loc><lastmod>${data.comprobado}</lastmod></url>\n`;
  const re = new RegExp(`  <url><loc>${loc(u).replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}</loc><lastmod>[\\d-]+</lastmod></url>\\n`);
  if (re.test(sm)) sm = sm.replace(re, entrada);
  else sm = sm.replace(/(  <url><loc>https:\/\/www\.teoriamusical\.com\.es\/oposiciones-de-musica\/<\/loc>[^\n]*\n)/, `$1${entrada}`);
}
fs.writeFileSync(SM, sm);

// ---------- OG, anuncios, versionado ----------
if (creadas) {
  spawnSync('python', [path.join(__dirname, 'gen_og_pages.py')], { encoding: 'utf8' });
  spawnSync('node', [path.join(__dirname, 'version_assets.cjs')], { encoding: 'utf8' });
}
for (const f of [HUB, ...conPagina.map(n => path.join(dirDe(n), 'index.html'))]) {
  const r = spawnSync('python', [path.join(__dirname, 'insert_ads.py'), '--apply', f], { encoding: 'utf8' });
  if (r.status !== 0) console.error('insert_ads falló en', f, r.stderr || r.stdout);
}
console.log(`OK: ${futuros.length} conciertos próximos (${data.conciertos.length - futuros.length} pasados omitidos); páginas de comunidad: ${conPagina.length} (${creadas} nuevas) -> ${conPagina.join(', ')} (hoy=${hoy})`);
