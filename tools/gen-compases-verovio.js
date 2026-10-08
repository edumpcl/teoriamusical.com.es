'use strict';
/**
 * Compases con cifra (pulso, subdivision, melodia, hemiolia) dibujados con Verovio y guardados como SVG.
 *
 *   node tools/gen-compases-verovio.js              # prueba: genera y verifica todo, no toca las paginas
 *   node tools/gen-compases-verovio.js --poner      # ademas sustituye los <img> PNG de las paginas
 *   node tools/gen-compases-verovio.js --sabotaje   # comprueba que la verificacion SABE fallar
 *
 * Los datos (notas, figuras, barras, acentos) son los de los generate-*.js de VexFlow de siempre
 * (tools/notacion/datos/compases-cifra.js). Verovio decide plicas, barras y espaciado.
 *
 * Cada imagen se comprueba por varias vias que no salen del mismo sitio:
 *   1. los datos: cada compas suma exactamente lo que dice la cifra;
 *   2. el MEI releido por un interprete aparte = los datos;
 *   3. lo que AFIRMA LA PAGINA: el alt (numero de compases, cuantas figuras y de que tipo, grupos 3+3,
 *      cifra, tiempos acentuados) y el data-tm-melody que usa el audio (notas y duraciones);
 *   4. el dibujo: cifra, cabezas (glifo y altura contra las lineas del pentagrama), puntillos, plicas,
 *      barras, corchetes (banderas), acentos y barras de compas.
 */
const fs = require('fs');
const path = require('path');
const G = require('./gen-escalas-verovio.js');
const { RAIZ, ESPACIO, OPCIONES, hash, preparar } = G;

const SALIDA = 'assets/img/notacion/compases';
const DATOS = require('./notacion/datos/compases-cifra.js');
const PAGINAS = fs.readdirSync(path.join(RAIZ, 'diccionario-musical/compases'), { withFileTypes: true })
  .filter((d) => d.isDirectory()).map((d) => 'diccionario-musical/compases/' + d.name);

const DUR = { w: 64, h: 32, q: 16, 8: 8, 16: 4 };
const DUR_MEI = { w: 1, h: 2, q: 4, 8: 8, 16: 16 };
const GLIFO_CABEZA = { w: 'E0A2', h: 'E0A3', q: 'E0A4', 8: 'E0A4', 16: 'E0A4' };
const LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const PASO_Y = ESPACIO / 2;
const PASO_E4 = 4 * 7 + 2;   // linea inferior de la clave de sol
const norm = (s) => String(s).normalize('NFC');
const durTotal = (e) => DUR[e.d] * (e.puntillo ? 1.5 : 1);
const pasoDe = (key) => { const [l, o] = key.split('/'); return Number(o) * 7 + LETRAS.indexOf(l); };
const NUM = { un: 1, una: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, doce: 12 };
const FIGURA_ALT = { negras: 'q', corcheas: '8', blancas: 'h', semicorcheas: '16', redondas: 'w' };

/* ---------- MEI ---------- */
function aMEI(spec) {
  let k = 0;
  const ms = spec.compases.map((c, i) => {
    let cuerpo = '';
    for (let j = 0; j < c.length;) {
      const e = c[j];
      const nota = (x) => `<note xml:id="n${k++}" pname="${x.key.split('/')[0]}" oct="${x.key.split('/')[1]}" dur="${DUR_MEI[x.d]}"${x.puntillo ? ' dots="1"' : ''}>${x.acento ? '<artic artic="acc" place="above"/>' : ''}</note>`;
      if (e.barra === undefined) { cuerpo += nota(e); j++; continue; }
      let f = j; const grupo = [];
      while (f < c.length && c[f].barra === e.barra) grupo.push(nota(c[f++]));
      cuerpo += grupo.length > 1 ? `<beam>${grupo.join('')}</beam>` : grupo[0];
      j = f;
    }
    return `<measure n="${i + 1}"><staff n="1"><layer n="1">${cuerpo}</layer></staff></measure>`;
  }).join('');
  const metro = spec.corte ? `meter.sym="cut"` : `meter.count="${spec.num}" meter.unit="${spec.den}"`;
  return '<?xml version="1.0" encoding="UTF-8"?><mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0"><meiHead><fileDesc><titleStmt><title/></titleStmt><pubStmt/></fileDesc></meiHead><music><body><mdiv><score><scoreDef><staffGrp>'
    + `<staffDef n="1" lines="5" clef.shape="G" clef.line="2" ${metro}/></staffGrp></scoreDef><section>${ms}</section></score></mdiv></body></music></mei>`;
}

/** Lee el MEI como lo leeria un musico: por compas, [{key, d, puntillo, acento, grupo}] (grupo = n.º de <beam> o -1). */
function leerMEI(mei) {
  const compases = [];
  let nb = 0;
  for (const m of mei.match(/<measure [\s\S]*?<\/measure>/g) || []) {
    const evs = [];
    const re = /<beam>|<\/beam>|<note [^>]*?(?:\/>|>[\s\S]*?<\/note>)/g;
    let x, dentro = -1;
    while ((x = re.exec(m))) {
      if (x[0] === '<beam>') { dentro = nb++; continue; }
      if (x[0] === '</beam>') { dentro = -1; continue; }
      const a = (nom) => (new RegExp('\\b' + nom + '="([^"]*)"').exec(x[0]) || [])[1];
      const d = Object.keys(DUR_MEI).find((q) => DUR_MEI[q] === Number(a('dur')));
      evs.push({ key: a('pname') + '/' + a('oct'), d, puntillo: Number(a('dots') || 0), acento: /artic="acc"/.test(x[0]), grupo: dentro });
    }
    compases.push(evs);
  }
  return compases;
}
const meiMeter = (mei) => ({ count: (/meter\.count="(\d+)"/.exec(mei) || [])[1], unit: (/meter\.unit="(\d+)"/.exec(mei) || [])[1], sym: (/meter\.sym="(\w+)"/.exec(mei) || [])[1] });

/* ---------- lo que afirma la pagina ---------- */
function melodiaDeData(txt) {
  return txt.split('|').map((c) => c.trim().split(/\s+/).map((t) => {
    const m = /^([a-g]\/\d):(w|h|q|8|16)(\.?)$/.exec(t);
    if (!m) throw new Error('data-tm-melody ilegible: ' + t);
    return m[1] + ':' + m[2] + m[3];
  }));
}
const eventoTxt = (e) => `${e.key}:${e.d}${e.puntillo ? '.' : ''}`;

function coherenciaConPagina(spec, leido, alt, melodia) {
  const err = [];
  const esMel = /melod/i.test(alt);
  // numero de compases
  const nc = /de (\w+) compases/.exec(alt);
  const quiereComp = nc ? NUM[nc[1]] : 1;
  if (leido.length !== quiereComp) err.push(`el alt dice ${quiereComp} compas(es) y el dibujo tiene ${leido.length}`);
  // cifra
  const cif = /\b(\d+)\/(\d+)\b/.exec(alt);
  if (cif && (Number(cif[1]) !== spec.num || Number(cif[2]) !== spec.den)) err.push(`el alt habla de ${cif[0]} y el compas es ${spec.num}/${spec.den}`);
  if (/partido|alla breve/i.test(alt) !== !!spec.corte) err.push('el alt y el dibujo no coinciden en si es compas partido (2/2 cortado)');
  // pulso / subdivision: «cuatro negras», «seis corcheas», «dos blancas con puntillo»
  const cu = /(?:\bcon |^)(dos|tres|cuatro|cinco|seis|siete|ocho|nueve|doce) (negras|corcheas|blancas|semicorcheas|redondas)( con puntillo)?/i.exec(alt);
  if (cu && !esMel) {
    const evs = leido.flat();
    const n = NUM[cu[1].toLowerCase()], d = FIGURA_ALT[cu[2].toLowerCase()], p = cu[3] ? 1 : 0;
    if (evs.length !== n) err.push(`el alt dice ${n} figuras y hay ${evs.length}`);
    if (evs.some((e) => e.d !== d || e.puntillo !== p)) err.push(`el alt dice «${cu[2]}${cu[3] || ''}» y alguna figura es otra`);
  }
  // grupos de barra: (3+3), (2+2+2)... solo si las figuras llevan barra
  const gr = /(\d(?:\+\d)+)/.exec(alt);
  const tamanos = [];
  leido.forEach((c) => { const cuenta = {}; c.forEach((e) => { if (e.grupo >= 0) cuenta[e.grupo] = (cuenta[e.grupo] || 0) + 1; }); tamanos.push(...Object.values(cuenta)); });
  if (gr) {
    const lista = gr[1].split('+').map(Number);
    if (!esMel && /agrupad/.test(alt) && tamanos.length) {
      if (JSON.stringify(tamanos) !== JSON.stringify(lista)) err.push(`el alt dice grupos ${lista.join('+')} y las barras son ${tamanos.join('+')}`);
    }
    if (esMel && tamanos.some((t) => !lista.includes(t))) err.push(`el alt dice grupos ${lista.join('+')} y hay una barra de ${tamanos.find((t) => !lista.includes(t))} figuras`);
  }
  if (/hemiolia/i.test(alt)) {
    const acc = leido.flat().map((e, i) => (e.acento ? i + 1 : 0)).filter(Boolean);
    const dice = (/tiempos ([\d, y]+)/.exec(alt) || [])[1];
    const q = dice ? dice.split(/[, y]+/).filter(Boolean).map(Number) : [];
    if (JSON.stringify(acc) !== JSON.stringify(q)) err.push(`el alt dice acentos en ${q} y el dibujo los lleva en ${acc}`);
  } else if (leido.flat().some((e) => e.acento)) err.push('hay acentos que la pagina no menciona');
  // la melodia que suena = la que se ve
  if (esMel) {
    if (!melodia) err.push('es una melodia y la figura no tiene data-tm-melody (no se puede contrastar con el audio)');
    else {
      const suena = melodiaDeData(melodia), se_ve = leido.map((c) => c.map(eventoTxt));
      if (JSON.stringify(suena) !== JSON.stringify(se_ve)) err.push('la melodia del audio (data-tm-melody) no es la que se dibuja');
    }
  }
  return err;
}

/* ---------- el dibujo ---------- */
const cuenta = (svg, re) => (svg.match(re) || []).length;
function cabezas(svg) {
  const res = [];
  const re = /<g id="(n\d+)" class="note"[^>]*>[\s\S]*?<g class="notehead"[^>]*>\s*<use [^>]*href="#(E0[0-9A-F]+)[^>]*transform="translate\(([\d.]+), ([\d.]+)\)/g;
  let m;
  while ((m = re.exec(svg))) res.push({ id: Number(m[1].slice(1)), g: m[2], x: Number(m[3]), y: Number(m[4]) });
  return res.sort((a, b) => a.id - b.id);
}
const lineas = (svg) => [...new Set([...svg.matchAll(/<path d="M\d+ (\d+) L\d+ \1" stroke-width="13"/g)].map((m) => Number(m[1])))].sort((x, y) => x - y);

function verificarDatos(spec) {
  const err = [];
  const total = spec.num * (64 / spec.den);
  spec.compases.forEach((c, i) => { const s = c.reduce((a, e) => a + durTotal(e), 0); if (s !== total) err.push(`el compas ${i + 1} suma ${s}/64 y ${spec.num}/${spec.den} son ${total}/64`); });
  spec.compases.forEach((c, i) => c.forEach((e) => { if (e.barra !== undefined && DUR[e.d] > 8) err.push(`en el compas ${i + 1} hay una figura con barra que no es corchea ni menor`); }));
  return err;
}

function verificarSVG(svg, spec, leido) {
  const err = [];
  const evs = spec.compases.flat();
  const raiz = (svg.match(/<svg [^>]* id="([^"]+)"/) || [])[1];
  if (!raiz || !new RegExp('#' + raiz + ' path').test(svg)) err.push('el estilo de Verovio no esta ligado al id de la raiz');
  // clave y cifra
  const claves = [...svg.matchAll(/class="clef"[\s\S]{0,260}?href="#(E0[0-9A-F]+)/g)].map((m) => m[1]);
  if (JSON.stringify(claves) !== JSON.stringify(['E050'])) err.push('clave dibujada ' + JSON.stringify(claves) + ', prevista clave de sol');
  const metro = (svg.match(/<g[^>]* class="meterSig"[\s\S]*?<\/g>\s*<\/g>/) || [''])[0];
  const glifosMetro = [...metro.matchAll(/href="#(E08[0-9A-F])/g)].map((m) => m[1]);
  const dig = (n) => String(n).split('').map((d) => 'E08' + d);
  const quiereMetro = spec.corte ? ['E08B'] : [...dig(spec.num), ...dig(spec.den)];
  if (JSON.stringify(glifosMetro) !== JSON.stringify(quiereMetro)) err.push('cifra dibujada ' + JSON.stringify(glifosMetro) + ', prevista ' + JSON.stringify(quiereMetro));
  // cabezas: glifo y altura contra las lineas del propio pentagrama
  const cabs = cabezas(svg);
  if (cabs.length !== evs.length) err.push(`${cabs.length} cabezas, debian ser ${evs.length}`);
  const ls = lineas(svg);
  if (ls.length !== 5 || ls.some((y, k) => k && y - ls[k - 1] !== ESPACIO)) err.push('el pentagrama no tiene 5 lineas');
  else {
    cabs.forEach((c, k) => {
      const e = evs[k]; if (!e) return;
      const quiere = ls[4] - (pasoDe(e.key) - PASO_E4) * PASO_Y;
      if (c.y !== quiere) err.push(`la nota ${k + 1} (${e.key}) esta a y=${c.y} y le corresponde y=${quiere}`);
      if (c.g !== GLIFO_CABEZA[e.d]) err.push(`la cabeza de la nota ${k + 1} es ${c.g} y para «${e.d}» deberia ser ${GLIFO_CABEZA[e.d]}`);
    });
  }
  // puntillos, plicas, barras, banderas, acentos, barras de compas
  if (cuenta(svg, /class="dots"/g) !== evs.filter((e) => e.puntillo).length) err.push('numero de puntillos distinto del previsto');
  const conPlica = evs.filter((e) => e.d !== 'w').length;
  if (cuenta(svg, /class="stem"/g) !== conPlica) err.push(`${cuenta(svg, /class="stem"/g)} plicas, debian ser ${conPlica}`);
  const grupos = {};
  evs.forEach((e) => { if (e.barra !== undefined) grupos[e.barra] = (grupos[e.barra] || 0) + 1; });
  const nBarras = Object.values(grupos).filter((n) => n > 1).length;
  if (cuenta(svg, /class="beam"/g) !== nBarras) err.push(`${cuenta(svg, /class="beam"/g)} barras, debian ser ${nBarras}`);
  const sueltas = evs.filter((e) => DUR[e.d] <= 8 && (e.barra === undefined || grupos[e.barra] < 2)).length;
  if (cuenta(svg, /class="flag"/g) !== sueltas) err.push(`${cuenta(svg, /class="flag"/g)} corchetes de figura suelta, debian ser ${sueltas}`);
  const acentos = evs.filter((e) => e.acento).length;
  if (cuenta(svg, /class="artic"/g) !== acentos || cuenta(svg, /class="artic"[\s\S]{0,200}?href="#E4A0/g) !== acentos) err.push('acentos dibujados distintos de los previstos (o no estan encima)');
  if (cuenta(svg, /class="barLine"/g) !== spec.compases.length) err.push(`${cuenta(svg, /class="barLine"/g)} barras de compas, debian ser ${spec.compases.length}`);
  if (cuenta(svg, /<text/g)) err.push('hay texto en el dibujo');
  // el dibujo agrupa en barras las mismas figuras que el MEI
  void leido;
  return err;
}

/* ---------- construir una imagen ---------- */
function construir(tk, spec, alt, melodia, tocar, soloDibujo) {
  const e = verificarDatos(spec);
  let mei = aMEI(spec);
  const meiDibujo = tocar && soloDibujo ? tocar(mei) : mei;   // sabotaje del dibujo, sin tocar lo que lee el verificador del MEI
  if (tocar && !soloDibujo) mei = tocar(mei);
  const leido = leerMEI(mei);
  // MEI releido = datos
  const m = meiMeter(mei);
  if (spec.corte ? m.sym !== 'cut' : (Number(m.count) !== spec.num || Number(m.unit) !== spec.den || m.sym)) e.push('el MEI escribe otra cifra de compas');
  if (leido.length !== spec.compases.length) e.push(`el MEI tiene ${leido.length} compases y debian ser ${spec.compases.length}`);
  spec.compases.forEach((c, i) => {
    const l = leido[i] || [];
    if (l.length !== c.length || c.some((x, j) => !l[j] || eventoTxt(l[j]) !== eventoTxt(x) || l[j].acento !== x.acento)) e.push(`el MEI escribe mal el compas ${i + 1}`);
    c.forEach((x, j) => { if (l[j] && (l[j].grupo >= 0) !== (x.barra !== undefined && c.filter((y) => y.barra === x.barra).length > 1)) e.push(`el MEI agrupa mal la figura ${j + 1} del compas ${i + 1}`); });
  });
  if (alt !== null) e.push(...coherenciaConPagina(spec, leido, alt, melodia));
  tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: hash(spec.slug), spacingLinear: 0.25, spacingNonLinear: 0.6 }));
  if (!tk.loadData(meiDibujo)) throw new Error('Verovio no lee el MEI');
  if (tk.getPageCount() !== 1) e.push('sale en mas de una pagina');
  const svg = tk.renderToSVG(1);
  e.push(...verificarSVG(svg, spec, leido));
  return { svg, errores: e };
}

/* ---------- sabotajes: la verificacion tiene que fallar, y por la razon prevista ---------- */
const SABOTAJES = [
  ['otra nota', (mei) => mei.replace('pname="g"', 'pname="a"'), /MEI escribe mal|esta a y|alt|melodia/i, ['compas-4-4-pulso']],
  ['sin puntillo', (mei) => mei.replace(' dots="1"', ''), /MEI escribe mal|puntillos|figuras|alt/i, ['compas-6-8-pulso']],
  ['figura de otro valor', (mei) => mei.replace('dur="4"', 'dur="2"'), /MEI escribe mal|suma|alt|plicas|cabeza/i, ['compas-4-4-pulso']],
  ['sin barra', (mei) => mei.replace('<beam>', '').replace('</beam>', ''), /agrupa mal|barras|corchetes/i, ['compas-6-8-subdivision']],
  ['sin acento', (mei) => mei.replace('<artic artic="acc" place="above"/>', ''), /MEI escribe mal|acentos|alt/i, ['compas-6-4-hemiolia']],
  ['otra cifra', (mei) => mei.replace('meter.count="6"', 'meter.count="3"'), /cifra/i, ['compas-6-8-pulso']],
  ['melodia distinta', (mei) => mei.replace('pname="e"', 'pname="f"'), /MEI escribe mal|melodia|esta a y/i, ['compas-4-4-melodia']],
];

const SABOTAJES_DIBUJO = [
  ['nota movida', (mei) => mei.replace('pname="g"', 'pname="a"'), /esta a y/, 'compas-4-4-pulso'],
  ['sin puntillo', (mei) => mei.replace(' dots="1"', ''), /puntillos/, 'compas-6-8-pulso'],
  ['figura de otro valor', (mei) => mei.replace('dur="4"', 'dur="2"'), /cabeza|plicas/, 'compas-4-4-pulso'],
  ['sin barra', (mei) => mei.replace('<beam>', '').replace('</beam>', ''), /barras|corchetes/, 'compas-6-8-subdivision'],
  ['sin acento', (mei) => mei.replace('<artic artic="acc" place="above"/>', ''), /acentos/, 'compas-6-4-hemiolia'],
  ['otra cifra', (mei) => mei.replace('meter.count="6"', 'meter.count="3"'), /cifra dibujada/, 'compas-6-8-pulso'],
  ['sin cifra de compas', (mei) => mei.replace(/ meter\.count="\d+" meter\.unit="\d+"/, ''), /cifra dibujada/, 'compas-4-4-pulso'],
];

/* ---------- main ---------- */
async function main() {
  const poner = process.argv.includes('--poner');
  const sabotaje = process.argv.includes('--sabotaje');
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const tk = new VerovioToolkit(await createVerovioModule());
  const porArchivo = new Map();
  DATOS.forEach((d) => d.archivos.forEach((a) => porArchivo.set(norm(a), d)));
  fs.mkdirSync(path.join(RAIZ, SALIDA), { recursive: true });

  // 1. localizar las imagenes en las paginas (con su alt y su data-tm-melody)
  const reImg = /(?:<a [^>]*>)?(?:<picture>(?:<source[^>]*>)*)?<img\b[^>]*>(?:<\/picture>)?(?:<\/a>)?/g;
  const paginas = [];
  for (const pag of PAGINAS) {
    const ruta = path.join(RAIZ, pag, 'index.html');
    if (!fs.existsSync(ruta)) continue;
    let html = fs.readFileSync(ruta, 'utf8');
    const imgs = [];
    let m;
    while ((m = reImg.exec(html))) {
      const src = (/src="([^"]+)"/.exec(m[0]) || [])[1] || '';
      const base = norm(decodeURIComponent(src.split('/').pop()));
      const spec = porArchivo.get(base);
      if (!spec) continue;
      const alt = ((/alt="([^"]*)"/.exec(m[0]) || [])[1] || '').replace(/&amp;/g, '&');
      const fig = html.lastIndexOf('<figure', m.index);
      const tag = fig >= 0 ? html.slice(fig, html.indexOf('>', fig) + 1) : '';
      imgs.push({ trozo: m[0], spec, alt, melodia: (/data-tm-melody="([^"]*)"/.exec(tag) || [])[1] || null });
    }
    if (imgs.length) paginas.push({ pag, ruta, html, imgs });
  }

  if (sabotaje) {
    let mal = 0;
    for (const [nombre, tocar, esperado, slugs] of SABOTAJES) {
      for (const slug of slugs) {
        const im = paginas.flatMap((p) => p.imgs).find((i) => i.spec.slug === slug);
        if (!im) { console.log(`✗ sabotaje «${nombre}»: no encuentro ${slug}`); mal++; continue; }
        const r = construir(tk, im.spec, im.alt, im.melodia, tocar);
        const ok = r.errores.length && r.errores.some((x) => esperado.test(x));
        console.log(`${ok ? '✓' : '✗'} sabotaje «${nombre}» en ${slug}: ${r.errores.length ? r.errores[0] : 'NO SE DETECTO'}`);
        if (!ok) mal++;
      }
    }
    // sabotajes que SOLO cambian el dibujo (el MEI releido sigue bien): los tiene que pillar la verificacion del SVG
  for (const [nombre, tocar, esperado, slug] of SABOTAJES_DIBUJO) {
    const im = paginas.flatMap((p) => p.imgs).find((i) => i.spec.slug === slug);
    const r = construir(tk, im.spec, im.alt, im.melodia, tocar, true);
    const ok = r.errores.some((x) => esperado.test(x));
    console.log(`${ok ? '✓' : '✗'} sabotaje del dibujo «${nombre}» en ${slug}: ${r.errores.length ? r.errores[0] : 'NO SE DETECTO'}`);
    if (!ok) mal++;
  }
  // control positivo: sin sabotaje todo pasa
    const im = paginas[0].imgs[0];
    const r0 = construir(tk, im.spec, im.alt, im.melodia, null);
    console.log(`${r0.errores.length ? '✗' : '✓'} control sin sabotaje (${im.spec.slug}): ${r0.errores.length ? r0.errores.join(' / ') : 'sin errores'}`);
    process.exit(mal || r0.errores.length ? 1 : 0);
  }

  // 2. construir cada imagen una vez, verificarla y escribirla
  const hechos = new Map();
  let fallos = 0;
  for (const p of paginas) {
    for (const im of p.imgs) {
      const slug = im.spec.slug;
      if (hechos.has(slug)) { im.hecho = hechos.get(slug); continue; }
      try {
        const r = construir(tk, im.spec, im.alt, im.melodia, null);
        if (r.errores.length) throw new Error(r.errores.join('\n   - '));
        const listo = preparar(r.svg, im.alt);
        fs.writeFileSync(path.join(RAIZ, SALIDA, slug + '.svg'), listo.svg);
        const hecho = { slug, w: listo.w, h: listo.h };
        hechos.set(slug, hecho); im.hecho = hecho;
        console.log(`✓ ${slug.padEnd(32)} ${String(listo.svg.length).padStart(5)} B · ${listo.w}×${listo.h}`);
      } catch (err) {
        fallos++;
        console.log(`✗ ${slug}  (alt: ${im.alt.slice(0, 70)})\n   - ${err.message}`);
      }
    }
  }
  const total = new Set(paginas.flatMap((p) => p.imgs.map((i) => i.spec.slug))).size;
  console.log(`\n${hechos.size}/${total} imagenes distintas verificadas en ${paginas.length} paginas`);
  if (fallos) { console.log(`${fallos} no pasan la verificacion: no se toca ninguna pagina`); process.exit(1); }

  if (poner) {
    for (const p of paginas) {
      let html = p.html;
      for (const im of p.imgs) {
        const alt = (/alt="([^"]*)"/.exec(im.trozo) || [])[0] || 'alt=""';
        const resto = (/<img\b([^>]*)>/.exec(im.trozo) || [])[1] || '';
        const loading = /loading="lazy"/.test(resto) ? ' loading="lazy"' : '';
        const nuevo = `<img src="/${SALIDA}/${im.hecho.slug}.svg" width="${im.hecho.w}" height="${im.hecho.h}" ${alt}${loading} decoding="async">`;
        html = html.replace(im.trozo, () => nuevo);
      }
      fs.writeFileSync(p.ruta, html);
      console.log(`escrito ${p.pag}/index.html: ${p.imgs.length} imagenes`);
    }
  }
}

if (require.main === module) main().catch((e) => { console.error('✗', e.message); process.exit(1); });
