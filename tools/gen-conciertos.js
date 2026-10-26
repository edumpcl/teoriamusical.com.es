'use strict';
/*
 * Agenda de conciertos por comunidades, desde data/conciertos.json.
 *
 *  - Portal:      /agenda-conciertos-bandas-orquestas/            (elige comunidad + próximos conciertos)
 *  - Comunidades: /agenda-conciertos-bandas-orquestas/<slug>/     (una página por comunidad)
 *  - Agrupaciones:/agenda-conciertos-bandas-orquestas/agrupaciones/<slug>/  (una página por orquesta, banda,
 *                 sociedad o conservatorio con datos suficientes; índice en .../agrupaciones/)
 *                 Une nombres de una misma entidad con data/entidades.json. Umbral: 3 conciertos (2 en bandas,
 *                 sociedades y escuelas), contando los pasados de los últimos 12 meses.
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

// ---------- agrupaciones: una página por entidad con datos suficientes ----------
const ENT_FILE = path.join(ROOT, 'data', 'entidades.json');
const ALIAS = fs.existsSync(ENT_FILE) ? JSON.parse(fs.readFileSync(ENT_FILE, 'utf8')).entidades : [];
const sinAcentos = s => s.normalize('NFKD').replace(/[̀-ͯ]/g, '');
const norm = a => sinAcentos(a.replace(/\s*\(.*?\)/g, '').trim()).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const slugify = s => norm(s).replace(/ /g, '-');
const limpio = s => s.replace(/\s*\(.*?\)/g, '').trim();
const mapaAlias = {};
for (const e of ALIAS) for (const a of e.agrupaciones) mapaAlias[norm(a)] = e;
function entidadDe(c) {
  const e = mapaAlias[norm(c.agrupacion)];
  return e ? { slug: e.slug || slugify(e.nombre), nombre: e.nombre } : { slug: slugify(c.agrupacion), nombre: c.agrupacion };
}
const sumarDias = (iso, n) => { const [y, m, d] = partes(iso); return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10); };
const DESDE_HIST = sumarDias(hoy, -365);
const BASE_AGR = `${BASE}/agrupaciones`;
const ENVIAR = `${BASE}/enviar-concierto`;   // formulario para que las agrupaciones nos manden sus conciertos
const dirAgr = slug => path.join(ROOT, BASE_AGR, slug);
const urlAgr = slug => `/${BASE_AGR}/${slug}/`;
const porFecha = (a, b) => (a.fecha + (a.hora || '00:00')).localeCompare(b.fecha + (b.hora || '00:00'));
const masFrecuente = arr => { const n = {}; arr.forEach(x => { n[x] = (n[x] || 0) + 1; }); return Object.keys(n).sort((a, b) => n[b] - n[a])[0]; };
const ents = {};
for (const c of data.conciertos.filter(c => c.fecha >= DESDE_HIST)) {
  const e = entidadDe(c);
  const o = ents[e.slug] = ents[e.slug] || { slug: e.slug, nombre: e.nombre, nombres: [], conciertos: [] };
  o.nombres.push(c.agrupacion); o.conciertos.push(c);
}
for (const o of Object.values(ents)) {
  if (!mapaAlias[norm(o.nombres[0])]) o.nombre = o.nombres.slice().sort((a, b) => a.length - b.length)[0];   // sin alias: el nombre más corto
  o.proximos = o.conciertos.filter(c => c.fecha >= hoy).sort(porFecha);
  o.pasados = o.conciertos.filter(c => c.fecha < hoy).sort((a, b) => porFecha(b, a));
  o.tipo = masFrecuente(o.conciertos.map(c => c.tipo));
  o.ccaa = masFrecuente(o.conciertos.map(c => c.comunidad));
  o.todasCcaa = [...new Set(o.conciertos.map(c => c.comunidad))];
  o.umbral = ['banda', 'sociedad', 'escuela'].includes(o.tipo) ? 2 : 3;
  o.pagina = o.conciertos.length >= o.umbral || fs.existsSync(path.join(dirAgr(o.slug), 'index.html'));
}
const entPagina = Object.values(ents).filter(o => o.pagina).sort((a, b) => limpio(a.nombre).localeCompare(limpio(b.nombre), 'es'));
const urlAgrupacion = c => { const o = ents[entidadDe(c).slug]; return o && o.pagina ? urlAgr(o.slug) : null; };

// ---------- piezas HTML ----------
function fila(k, v) { return v ? `<dt>${k}</dt><dd>${esc(v)}</dd>` : ''; }

function tarjeta(c, op = {}) {
  const fuentes = (c.fuentes || []).map(f => `<a href="${esc(f.url)}" rel="noopener">${esc(f.texto)}</a>`).join(' · ');
  const donde = [c.lugar, c.ciudad].filter(Boolean).join(', ');
  const eu = op.sinEnlace ? null : urlAgrupacion(c);
  const ag = eu ? `<a href="${eu}">${esc(c.agrupacion)}</a>` : esc(c.agrupacion);
  const cls = op.pasado ? 'tm-op tm-co-pasado' : 'tm-op tm-co';
  return `<div class="${cls}" data-tipo="${c.tipo}" data-ccaa="${esc(c.comunidad)}" data-fecha="${c.fecha}">
  <p class="tm-op-meta"><span class="tm-op-tipo tm-op-tipo--${c.tipo}">${TIPOS[c.tipo]}</span><span>${esc(c.comunidad)}</span></p>
  <h3>${esc(c.titulo)}</h3>
  <p class="tm-op-entidad">${ag}</p>
  <p class="tm-op-plazo"><strong>${fechaLarga(c.fecha)}${c.hora ? ` · ${c.hora} h` : ''}</strong></p>
  <dl class="tm-op-datos">${fila('Dónde', donde)}${fila('Programa', c.programa)}${fila('Entrada', c.entrada)}</dl>
  ${c.nota ? `<p class="tm-op-nota">${esc(c.nota)}</p>` : ''}
  <p class="tm-op-fuentes">Fuente: ${fuentes}.${op.pasado ? '' : ' <span class="tm-op-nota">Confirma fecha y hora en la fuente enlazada.</span>'}</p>
</div>`;
}

// «offers» solo cuando el precio está claro en el dato: gratuito (0) o una cifra / lista de cifras en €.
// Si la entrada dice «Venta de entradas en la web...» sin importe, NO se inventa ningún precio.
function ofertas(c, url) {
  const t = (c.entrada || '').trim();
  if (!t) return null;
  const principal = t.split('(')[0].split(';')[0];   // paréntesis y lo que sigue a «;» (abonos, descuentos, recargos) no es el precio general
  const base = { priceCurrency: 'EUR', url };
  if (/gratu|gratis|libre|sin coste|sense cost|acc[eé]s lliure|invitaci/i.test(principal)) return { '@type': 'Offer', price: 0, ...base };
  if (!principal.includes('€')) return null;
  const nums = (principal.match(/\d+(?:[.,]\d+)?/g) || []).map(x => Number(x.replace(',', '.')));
  if (!nums.length) return null;
  const lo = Math.min(...nums), hi = Math.max(...nums);
  if (nums.length === 1 && !/desde|a partir/i.test(principal)) return { '@type': 'Offer', price: lo, ...base };
  return { '@type': 'AggregateOffer', lowPrice: lo, ...(hi > lo ? { highPrice: hi } : {}), ...base };
}

function evento(c) {
  if (!c.ciudad) return null;
  const inicio = c.hora ? `${c.fecha}T${c.hora}:00${offset(c.fecha)}` : c.fecha;
  const url = (c.fuentes && c.fuentes[0] && c.fuentes[0].url) || undefined;
  const e = {
    '@type': 'Event',
    name: `${c.titulo} — ${c.agrupacion}`,
    startDate: inicio,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: { '@type': 'Place', name: c.lugar || c.ciudad, address: { '@type': 'PostalAddress', addressLocality: c.ciudad, addressCountry: 'ES' } },
    organizer: { '@type': 'Organization', name: c.agrupacion },
    performer: { '@type': 'PerformingGroup', name: c.agrupacion },
    // Sin programa publicado, la descripción se arma con lo que sí sabemos (nada inventado)
    description: c.programa || `${c.titulo}. ${c.agrupacion}${c.lugar ? ' en ' + c.lugar : ''}, ${c.ciudad}.`,
    url,
  };
  const o = ofertas(c, url);
  if (o) e.offers = o;
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
  return meses.map(g => `<h2 class="co-mes" id="co-${g.k}">${g.t}</h2>\n<div class="tm-op-lista co-lista">\n${g.items.map(c => tarjeta(c)).join('\n')}\n</div>`).join('\n\n');
}

// Filtros: tipo (siempre) y fechas (solo en las páginas de comunidad: en el portal solo se ven los próximos).
function filtros(lista, fechas, global) {
  const tipos = Object.keys(TIPOS).filter(t => lista.some(c => c.tipo === t));
  const ccaas = [...new Set(lista.map(c => c.comunidad))].sort((a, b) => a.localeCompare(b, 'es'));
  const rapidos = [['todas', 'Todas'], ['hoy', 'Hoy'], ['semana', 'Esta semana'], ['proxima', 'Próxima semana'], ['finde', 'Este fin de semana'], ['mes', 'Este mes']];
  const bloqueFechas = fechas ? `
  <div class="co-fechas">
    <span class="co-fechas-t" id="co-fechas-t">Fecha</span>
    <div class="co-rapidos" role="group" aria-labelledby="co-fechas-t">
      ${rapidos.map(([k, t]) => `<button type="button" data-rango="${k}" aria-pressed="${k === 'todas'}">${t}</button>`).join('\n      ')}
    </div>
    <div class="co-rango">
      <label>Desde <input type="date" id="co-f-desde"></label>
      <label>Hasta <input type="date" id="co-f-hasta"></label>
    </div>
  </div>` : '';
  const selCcaa = global ? `
  <label>Comunidad <select id="co-f-ccaa"><option value="">Todas</option>${ccaas.map(n => `<option value="${esc(n)}">${esc(n)}</option>`).join('')}</select></label>` : '';
  return `<form class="tm-op-filtros" id="co-filtros" aria-label="Buscar conciertos"${global ? ` data-global="/${BASE}/conciertos.json"` : ''}>
  <label>Tipo <select id="co-f-tipo"><option value="">Todos</option>${tipos.map(t => `<option value="${t}">${TIPOS[t]}</option>`).join('')}</select></label>${selCcaa}${bloqueFechas}
</form>
<p class="tm-op-contador" id="co-contador" role="status" aria-live="polite"></p>
<p class="co-vacio" id="co-vacio" hidden>No hay conciertos con esos filtros. Prueba con otras fechas o con otro tipo de agrupación.</p>`;
}

function navMeses(lista) {
  const ms = [...new Set(lista.map(c => c.fecha.slice(0, 7)))];
  if (ms.length < 2) return '';
  return `<nav class="co-nav" aria-label="Ir a un mes"><span>Ir a:</span> ${ms.map(k => `<a href="#co-${k}">${cap(MESES[Number(k.slice(5)) - 1])} ${k.slice(0, 4)}</a>`).join(' ')}</nav>`;
}

const comprobado = `<p class="tm-op-comprobado">Última comprobación: <strong>${fechaLarga(data.comprobado)}</strong>.</p>`;
const otrasEnlaces = actual => conPagina.filter(n => n !== actual).map(n => `<li><a href="${urlDe(n)}">${esc(n)}</a></li>`).join('\n');

function agrupacionesDe(nombre) {
  const agrs = entPagina.filter(o => o.ccaa === nombre);
  if (!agrs.length) return '';
  return `
<h2>Orquestas, bandas y conservatorios ${CCAA[nombre][1]}</h2>
<p>Estas agrupaciones tienen su propia página, con sus próximos conciertos y su programación anterior.</p>
<ul>
${agrs.map(o => `<li><a href="${urlAgr(o.slug)}">${esc(o.nombre)}</a> <span class="tm-op-nota">(${o.proximos.length} ${o.proximos.length === 1 ? 'próximo' : 'próximos'})</span></li>`).join('\n')}
</ul>
<p><a href="/${BASE_AGR}/">Ver todas las agrupaciones</a></p>
`;
}

function bloqueComunidad(nombre) {
  const lista = porCcaa[nombre] || [];
  const otras = otrasEnlaces(nombre);
  return `<!-- CO:START (generado por tools/gen-conciertos.js; no editar a mano) -->
${comprobado}

${avisoEnvio()}

${lista.length ? `${filtros(lista, true)}\n${navMeses(lista)}\n\n${porMeses(lista)}` : `<p>Ahora mismo no tenemos conciertos próximos confirmados ${CCAA[nombre][1]}. Si tu agrupación da uno, <a href="/${ENVIAR}/">envíanoslo</a>.</p>`}
${ld(lista)}
${agrupacionesDe(nombre)}
<h2>Otras comunidades</h2>
<ul>
<li><a href="/${BASE}/">Todas las comunidades</a></li>
${otras}
</ul>
<!-- CO:END -->`;
}

function bloqueEntidad(o) {
  const nl = limpio(o.nombre);
  const ccaas = o.todasCcaa.map(n => conPagina.includes(n) ? `<a href="${urlDe(n)}">${esc(n)}</a>` : esc(n)).join(', ');
  const vistas = new Set(); const fuentes = [];
  for (const c of o.conciertos) for (const f of (c.fuentes || [])) if (!vistas.has(f.url)) { vistas.add(f.url); fuentes.push(f); }
  const distintos = [...new Set(o.nombres)];
  const incluye = distintos.length > 1 && mapaAlias[norm(o.nombres[0])]
    ? `<p class="tm-op-nota">Reúne los conciertos de: ${distintos.map(esc).join('; ')}.</p>` : '';
  const prox = o.proximos.length
    ? `<div class="tm-op-lista co-lista">\n${o.proximos.map(c => tarjeta(c, { sinEnlace: true })).join('\n')}\n</div>`
    : `<p>Ahora mismo no tenemos conciertos próximos confirmados de ${esc(nl)}. Si los conoces, <a href="/${ENVIAR}/">envíanoslos</a>.</p>`;
  const pas = o.pasados.length
    ? `\n<h2 id="anteriores">Conciertos anteriores</h2>\n<p class="tm-op-nota">Estos conciertos figuraban en la programación oficial de la agrupación. Si hubo cambios o cancelaciones, manda la fuente de cada ficha.</p>\n<div class="tm-op-lista co-lista">\n${o.pasados.map(c => tarjeta(c, { sinEnlace: true, pasado: true })).join('\n')}\n</div>\n` : '';
  const enlacesCcaa = o.todasCcaa.filter(n => conPagina.includes(n)).map(n => `<li><a href="${urlDe(n)}">Conciertos ${CCAA[n][1]}</a></li>`).join('\n');
  return `<!-- CO:START (generado por tools/gen-conciertos.js; no editar a mano) -->
${comprobado}

<p class="co-meta"><strong>${TIPOS[o.tipo]}</strong> · ${ccaas} · ${o.proximos.length} ${o.proximos.length === 1 ? 'concierto próximo' : 'conciertos próximos'}${o.pasados.length ? ` · ${o.pasados.length} anteriores` : ''}</p>
<p>Aquí tienes los conciertos de ${esc(nl)} que figuran en nuestra agenda, siempre con el enlace a su fuente oficial.</p>
${incluye}

<h2 id="proximos">Próximos conciertos</h2>
${prox}
${pas}
${avisoEnvio(`¿Falta algún concierto de ${esc(nl)}? Mándanoslo con el enlace a su publicación oficial.`)}

<h2>Fuentes oficiales</h2>
<ul>
${fuentes.slice(0, 14).map(f => `<li><a href="${esc(f.url)}" rel="noopener">${esc(f.texto)}</a></li>`).join('\n')}
</ul>

<h2>Más en la agenda</h2>
<ul>
${enlacesCcaa}
<li><a href="/${BASE_AGR}/">Todas las orquestas, bandas y conservatorios</a></li>
<li><a href="/${BASE}/">Agenda de conciertos de toda España</a></li>
</ul>
<!-- CO:END -->`;
}

function bloqueIndice() {
  const grupos = Object.keys(CCAA).map(n => [n, entPagina.filter(o => o.ccaa === n)]).filter(([, l]) => l.length);
  return `<!-- CO:START (generado por tools/gen-conciertos.js; no editar a mano) -->
${comprobado}

${avisoEnvio('¿Tu agrupación no tiene página? Cuando reúna suficientes conciertos en la agenda, tendrá la suya. Empieza mandándonos el próximo.')}

<p>${entPagina.length} agrupaciones con página propia, ordenadas por comunidad. Una agrupación tiene página cuando reúne suficientes conciertos en la agenda.</p>
${grupos.map(([n, l]) => `\n<h2>${esc(n)}</h2>\n<ul>\n${l.map(o => `<li><a href="${urlAgr(o.slug)}">${esc(o.nombre)}</a> <span class="tm-op-nota">· ${TIPOS[o.tipo]} · ${o.proximos.length} ${o.proximos.length === 1 ? 'próximo' : 'próximos'}</span></li>`).join('\n')}\n</ul>`).join('\n')}
<!-- CO:END -->`;
}

/* Aviso visible (dentro de los bloques generados, así llega a todas las páginas): quien lo lea puede mandar su concierto. */
function avisoEnvio(texto) {
  return `<aside class="tm-op co-envia">
  <h3>¿Falta el concierto de tu banda u orquesta?</h3>
  <p>${texto || 'Mándanoslo en un minuto. Vale la publicación oficial de tu agrupación en Facebook o Instagram, además de su web.'}</p>
  <p><a href="/${ENVIAR}/"><strong>Enviar un concierto</strong></a></p>
</aside>`;
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

<h2 id="buscar">Buscar conciertos por fechas</h2>
<p>Elige un rango de fechas, una comunidad o un tipo de agrupación y verás todos los conciertos que caen dentro, de toda España.</p>
${filtros(futuros, true, true)}
<div id="co-resultados" hidden></div>

${avisoEnvio()}

<div id="co-estatico">
<h2 id="comunidades">Elige tu comunidad</h2>
<div class="tm-op-lista co-ccaas">
${cards}
</div>
<p>¿Buscas una agrupación concreta? <a href="/${BASE_AGR}/">Mira todas las orquestas, bandas y conservatorios</a> (${entPagina.length} con página propia).</p>
${pendientes.length ? `<p class="tm-op-nota">Aún sin conciertos confirmados: ${pendientes.map(esc).join(', ')}. Si tu agrupación está en una de ellas, <a href="/${ENVIAR}/">envíanos su concierto</a>.</p>` : ''}


<h2 class="co-mes" id="co-proximos">Próximos conciertos</h2>
<div class="tm-op-lista co-lista">
${prox.map(c => tarjeta(c)).join('\n')}
</div>
${resto.length ? `\n<h2 class="co-mes" id="co-otras">Otras comunidades</h2>\n<div class="tm-op-lista co-lista">\n${resto.map(c => tarjeta(c)).join('\n')}\n</div>\n${ld(resto)}` : ''}
</div>
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

function scaffold(cfg0, cuerpo) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'co-'));
  const bodyFile = path.join(tmp, 'body.html');
  fs.writeFileSync(bodyFile, cuerpo);
  const cfg = { ...cfg0, bodyFile, wide: true, datePublished: data.comprobado };
  const cfgFile = path.join(tmp, 'config.json');
  fs.writeFileSync(cfgFile, JSON.stringify(cfg));
  const r = spawnSync('node', [path.join(__dirname, 'nueva-pagina.js'), cfgFile], { encoding: 'utf8' });
  if (r.status !== 0) { console.error('nueva-pagina falló:', r.stderr || r.stdout); process.exit(1); }
  const file = path.join(ROOT, cfg.dir, 'index.html');
  let page = fs.readFileSync(file, 'utf8')
    .replace('<a href="/diccionario-musical/" class="is-active">', '<a href="/diccionario-musical/" class="">')
    .replace('<a href="/agenda/" class="">Agenda</a>', '<a href="/agenda/" class="is-active">Agenda</a>');
  const tag = '<script src="/assets/js/main.js';
  page = page.replace(tag, '<script src="/assets/js/conciertos.js" defer></script>\n' + tag);
  fs.writeFileSync(file, page);
}

const RELACIONADAS = [
  { text: 'Agenda de conciertos de bandas y orquestas en España', url: `/${BASE}/` },
  { text: 'Oposiciones de música en España: convocatorias abiertas', url: '/oposiciones-de-musica/' },
];

function crearPagina(nombre) {
  const [slug, en] = CCAA[nombre];
  scaffold({
    dir: `${BASE}/${slug}`,
    title: `Conciertos de bandas y orquestas ${en}`,
    desc: `Agenda de conciertos de bandas sinfónicas, orquestas y bandas de sociedades musicales ${en}, comprobados en fuentes oficiales y actualizados cada semana.`,
    h1: `Conciertos de bandas y orquestas ${en}`,
    breadcrumb: [{ name: 'Agenda de conciertos', url: `/${BASE}/` }],
    faq: [
      { q: `¿Dónde puedo ver los conciertos de bandas y orquestas ${en}?`, a: `En esta página, ordenados por fecha, con el lugar, el programa y el enlace a la web oficial de cada agrupación.` },
      { q: '¿Cada cuánto se actualiza?', a: 'Cada semana. En la parte superior figura la fecha de la última comprobación.' },
      { q: '¿Cómo añado el concierto de mi banda u orquesta?', a: 'Usa el formulario de envío con la fecha, la hora, el lugar, el programa y un enlace a la página oficial (o a la publicación oficial de tu agrupación en Facebook o Instagram) donde figure. Es gratis.' },
    ],
    related: RELACIONADAS,
  }, `<p>Conciertos de bandas sinfónicas, orquestas y bandas de sociedades musicales ${en}. Solo incluimos lo que hemos podido comprobar en una fuente oficial (la web de la agrupación, del auditorio o del ayuntamiento), y cada ficha lleva su enlace. Se actualiza cada semana.</p>

<p><strong>La fuente enlazada manda:</strong> fechas, horas y programas pueden cambiar, así que confírmalo en la web de la agrupación antes de desplazarte.</p>

<!-- CO:START -->
<!-- CO:END -->

<h2>¿Tu banda o tu orquesta da un concierto ${en}?</h2>
<p><a href="/${ENVIAR}/">Envíanoslo con el formulario</a> con el nombre de la agrupación, la fecha, la hora, el lugar, el programa, el precio y <strong>un enlace a la página oficial donde figure</strong>. Lo comprobamos y lo añadimos. Es gratis.</p>
`);
}

function crearEntidad(o) {
  const nl = limpio(o.nombre);
  const relacion = conPagina.includes(o.ccaa) ? [{ text: `Conciertos de bandas y orquestas ${CCAA[o.ccaa][1]}`, url: urlDe(o.ccaa) }] : [];
  scaffold({
    dir: `${BASE_AGR}/${o.slug}`,
    title: `Conciertos de ${nl}`,
    desc: `Próximos conciertos y programación de ${nl}: fechas, lugares y programas, con enlace a la fuente oficial.`,
    h1: `Conciertos de ${nl}`,
    breadcrumb: [{ name: 'Agenda de conciertos', url: `/${BASE}/` }, { name: 'Agrupaciones', url: `/${BASE_AGR}/` }],
    faq: [
      { q: `¿Dónde puedo ver los próximos conciertos de ${nl}?`, a: 'En esta página, con la fecha, el lugar, el programa y el enlace a la fuente oficial de cada concierto.' },
      { q: '¿Cómo se comprueban estos conciertos?', a: 'Solo se incluyen conciertos que figuran en la web oficial de la agrupación, del auditorio o del ayuntamiento. Cada ficha enlaza a esa fuente.' },
      { q: '¿Los conciertos anteriores se celebraron?', a: 'Son los que figuraban en la programación oficial. Si hubo cambios o cancelaciones, manda la fuente enlazada en cada ficha.' },
    ],
    related: [...relacion, { text: 'Todas las orquestas, bandas y conservatorios', url: `/${BASE_AGR}/` }, ...RELACIONADAS],
  }, `<!-- CO:START -->
<!-- CO:END -->

<h2>¿Falta algún concierto?</h2>
<p>Si conoces un concierto de ${esc(nl)} que no está aquí, <a href="/${ENVIAR}/">envíanoslo con el formulario</a> con la fecha, la hora, el lugar y un enlace a la página oficial donde figure. Lo comprobamos y lo añadimos.</p>
`);
}

function crearEnvio() {
  const url = 'https://www.teoriamusical.com.es/' + ENVIAR + '/';
  const opcionesCcaa = Object.keys(CCAA).map(n => `<option value="${esc(n)}">${esc(n)}</option>`).join('');
  scaffold({
    dir: ENVIAR,
    title: 'Envía el concierto de tu banda u orquesta a la agenda',
    desc: 'Formulario gratuito para que bandas, sociedades musicales, orquestas y conservatorios nos manden sus conciertos y salgan en la agenda, con enlace a su web o a su publicación oficial en redes.',
    h1: 'Envía el concierto de tu banda u orquesta a la agenda',
    breadcrumb: [{ name: 'Agenda de conciertos', url: `/${BASE}/` }],
    faq: [
      { q: '¿Cuesta algo salir en la agenda?', a: 'No. Es gratis y no hay ninguna condición: solo comprobamos que el concierto figura en una fuente oficial.' },
      { q: '¿Vale una publicación de Facebook o Instagram?', a: 'Sí, siempre que sea la publicación oficial de la propia agrupación (su perfil o página, no el comentario de un tercero) y nos mandes el enlace directo a esa publicación.' },
      { q: '¿Cuándo aparece mi concierto?', a: 'Lo revisamos cada semana, normalmente los lunes. Si falta algún dato (hora, lugar, programa) te escribimos al correo que nos indiques.' },
    ],
    related: RELACIONADAS,
  }, `
<p>Si tu <strong>banda, sociedad musical, orquesta o conservatorio</strong> da un concierto, mándanoslo y lo incluimos en la <a href="/${BASE}/">agenda de conciertos</a>. Es gratis y sin condiciones. Muchas bandas casi no usan su web y publican sus conciertos en redes: por eso <strong>también vale la publicación oficial de tu agrupación en Facebook o Instagram</strong>.</p>

<h2>Qué necesitamos</h2>
<ul>
<li>El nombre de la agrupación y de qué tipo es.</li>
<li>La fecha, la hora y el lugar del concierto.</li>
<li>El programa, si lo tienes, y el precio de la entrada (o si es libre).</li>
<li><strong>Un enlace donde figure el concierto</strong>, si lo tienes: la web de la agrupación, del auditorio o del ayuntamiento, o la publicación oficial de la agrupación en Facebook o Instagram (el enlace directo a esa publicación). <strong>Si no tienes enlace, mándanoslo igualmente</strong> y dinos dónde se anuncia: te escribiremos para confirmarlo.</li>
</ul>

<h2>Qué cuenta como fuente oficial</h2>
<p>Solo publicamos lo que figura en una fuente de la propia agrupación o de quien organiza el concierto: su web, su página o perfil en redes, el auditorio, el ayuntamiento o la federación de bandas. No sirven la prensa, los agregadores ni los mensajes sin enlace. Si el cartel solo está en una imagen, súbela a la publicación oficial y mándanos el enlace. Si todavía no tienes ninguno, envía el formulario sin enlace: para publicarlo necesitaremos confirmarlo en una fuente oficial, y te escribiremos si hace falta.</p>

<h2>Formulario</h2>
<form class="tm-contact-form" action="https://formsubmit.co/3e2cc4c937fc5f3f0495fd4f63601ebc" method="POST">
  <input type="hidden" name="_subject" value="Concierto para la agenda de conciertos">
  <input type="hidden" name="_captcha" value="false">
  <input type="hidden" name="_next" value="${url}gracias/">
  <input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off">
  <label>Nombre de la agrupación (requerido)
    <input type="text" name="agrupacion" required>
  </label>
  <label>Tipo de agrupación
    <select name="tipo" style="width:100%;font:inherit;padding:.5rem .6rem;border:1px solid var(--border-strong);border-radius:var(--radius-sm);background:var(--surface);color:var(--text)">
      <option>Banda de música o sociedad musical</option>
      <option>Banda sinfónica profesional o municipal</option>
      <option>Orquesta</option>
      <option>Conservatorio o escuela de música</option>
      <option>Otra</option>
    </select>
  </label>
  <label>Comunidad autónoma (requerido)
    <select name="comunidad" required style="width:100%;font:inherit;padding:.5rem .6rem;border:1px solid var(--border-strong);border-radius:var(--radius-sm);background:var(--surface);color:var(--text)"><option value="">Elige tu comunidad…</option>${opcionesCcaa}</select>
  </label>
  <label>Localidad
    <input type="text" name="localidad">
  </label>
  <label>Fecha del concierto (requerido)
    <input type="date" name="fecha" required>
  </label>
  <label>Hora
    <input type="time" name="hora">
  </label>
  <label>Lugar o sala
    <input type="text" name="lugar">
  </label>
  <label>Programa (obras, director, solistas…)
    <textarea name="programa" rows="4"></textarea>
  </label>
  <label>Entrada (precio o «libre»)
    <input type="text" name="entrada">
  </label>
  <label>Enlace donde figura el concierto (si lo tienes)
    <input type="url" name="enlace" placeholder="https://">
  </label>
  <label>Si no tienes enlace, ¿dónde se anuncia? (cartel, Facebook, Instagram, programa de fiestas…)
    <input type="text" name="donde_se_anuncia">
  </label>
  <label>Tu correo electrónico, por si necesitamos algún dato (requerido)
    <input type="email" name="email" required>
  </label>
  <label>Tu nombre
    <input type="text" name="name">
  </label>
  <button type="submit">Enviar el concierto</button>
  <p class="tm-form-note">Al enviar este formulario aceptas la <a href="/politica-de-privacidad/">política de privacidad</a>. Usamos tu correo solo para este envío.</p>
</form>

<h2>Qué pasa después</h2>
<p>Comprobamos el concierto en la fuente que nos indicas y lo añadimos en la revisión semanal. Cuando una agrupación reúne suficientes conciertos, tiene <a href="/${BASE_AGR}/">su propia página</a> con su programación. ¿Tienes varios conciertos? Rellena el formulario una vez por cada uno, o escríbelos todos en el campo «Programa» y el enlace donde figuran.</p>
`);
}

/* Página a la que formsubmit lleva tras enviar (campo _next). noindex, sin anuncios y fuera del sitemap. */
function crearGracias() {
  scaffold({
    dir: `${ENVIAR}/gracias`,
    title: 'Concierto recibido: gracias',
    desc: 'Hemos recibido el concierto de tu agrupación. Lo comprobamos en la fuente oficial y lo añadimos en la revisión semanal.',
    h1: '¡Gracias! Hemos recibido tu concierto',
    breadcrumb: [{ name: 'Agenda de conciertos', url: `/${BASE}/` }, { name: 'Enviar un concierto', url: `/${ENVIAR}/` }],
    related: RELACIONADAS,
  }, `<p>Comprobamos el concierto en la fuente que nos has indicado y lo añadimos en la <strong>revisión semanal</strong>, normalmente los lunes. Si necesitamos algún dato más (hora, lugar, programa), te escribiremos al correo que nos has dejado.</p>

<h2>¿Y ahora?</h2>
<ul>
<li><a href="/${ENVIAR}/"><strong>Enviar otro concierto</strong></a>, si tu agrupación tiene más fechas.</li>
<li>Ver la <a href="/${BASE}/">agenda de conciertos</a> y buscar tu comunidad.</li>
<li>Mirar las <a href="/${BASE_AGR}/">agrupaciones con página propia</a>.</li>
</ul>
`);
  const file = path.join(ROOT, ENVIAR, 'gracias', 'index.html');
  let page = fs.readFileSync(file, 'utf8');
  page = page.replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex, follow">');
  fs.writeFileSync(file, page);
}

function crearIndice() {
  scaffold({
    dir: BASE_AGR,
    title: 'Orquestas, bandas y conservatorios de la agenda de conciertos',
    desc: 'Orquestas, bandas de música, sociedades musicales y conservatorios con página propia en la agenda de conciertos: próximos conciertos y programación.',
    h1: 'Orquestas, bandas y conservatorios de la agenda de conciertos',
    breadcrumb: [{ name: 'Agenda de conciertos', url: `/${BASE}/` }],
    faq: [
      { q: '¿Qué agrupaciones tienen página propia?', a: 'Las orquestas, bandas, sociedades musicales y conservatorios que reúnen suficientes conciertos en la agenda. La lista crece a medida que se publican más programaciones.' },
      { q: '¿Cómo puedo conseguir una página para mi banda u orquesta?', a: 'Mándanos sus conciertos con el formulario de envío y un enlace a la web oficial (o a la publicación oficial de la agrupación en redes) donde figuren. Cuando haya suficientes, tendrá su página.' },
    ],
    related: RELACIONADAS,
  }, `<p>Todas las agrupaciones de la <a href="/${BASE}/">agenda de conciertos</a> que tienen su propia página, agrupadas por comunidad.</p>

<!-- CO:START -->
<!-- CO:END -->
`);
}

let creadas = 0;
for (const n of conPagina) {
  const file = path.join(dirDe(n), 'index.html');
  if (!fs.existsSync(file)) { crearPagina(n); creadas++; }
  escribirBloque(file, bloqueComunidad(n));
}
escribirBloque(HUB, bloqueHub());
// Datos del buscador por fechas del portal (assets/js/conciertos.js): todos los conciertos próximos, sin HTML
fs.writeFileSync(path.join(ROOT, BASE, 'conciertos.json'), JSON.stringify({
  generado: hoy,
  conciertos: futuros.map(c => ({
    f: c.fecha, h: c.hora || '', t: c.titulo, a: c.agrupacion, au: urlAgrupacion(c) || '',
    c: c.comunidad, cu: conPagina.includes(c.comunidad) ? urlDe(c.comunidad) : '', ty: c.tipo,
    l: [c.lugar, c.ciudad].filter(Boolean).join(', '), p: c.programa || '', e: c.entrada || '', n: c.nota || '',
    s: (c.fuentes || []).map(x => [x.texto, x.url]),
  })),
}));
const PAG_ENVIO = path.join(ROOT, ENVIAR, 'index.html');
if (!fs.existsSync(PAG_ENVIO)) { crearEnvio(); creadas++; }
if (!fs.existsSync(path.join(ROOT, ENVIAR, 'gracias', 'index.html'))) { crearGracias(); creadas++; }
const INDICE_AGR = path.join(ROOT, BASE_AGR, 'index.html');
if (!fs.existsSync(INDICE_AGR)) { crearIndice(); creadas++; }
escribirBloque(INDICE_AGR, bloqueIndice());
for (const o of entPagina) {
  const file = path.join(dirAgr(o.slug), 'index.html');
  if (!fs.existsSync(file)) { crearEntidad(o); creadas++; }
  escribirBloque(file, bloqueEntidad(o));
}

// ---------- sitemap ----------
const SM = path.join(ROOT, 'sitemap.xml');
let sm = fs.readFileSync(SM, 'utf8');
const loc = u => `https://www.teoriamusical.com.es${u}`;
for (const u of [`/${BASE}/`, `/${ENVIAR}/`, ...conPagina.map(urlDe), `/${BASE_AGR}/`, ...entPagina.map(o => urlAgr(o.slug))]) {
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
for (const f of [HUB, ...conPagina.map(n => path.join(dirDe(n), 'index.html')), INDICE_AGR, ...entPagina.map(o => path.join(dirAgr(o.slug), 'index.html'))]) {
  const r = spawnSync('python', [path.join(__dirname, 'insert_ads.py'), '--apply', f], { encoding: 'utf8' });
  if (r.status !== 0) console.error('insert_ads falló en', f, r.stderr || r.stdout);
}
console.log(`OK: ${futuros.length} conciertos próximos (${data.conciertos.length - futuros.length} pasados omitidos); páginas de comunidad: ${conPagina.length}; agrupaciones con página: ${entPagina.length}; páginas nuevas: ${creadas} (hoy=${hoy})`);
