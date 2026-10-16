'use strict';
/**
 * Banco de /diccionario-musical/intervalos/tono-y-semitono/:
 *   1. el TECLADO (assets/js/tono-semitono-engine.js): sus 24 teclas son Do4–Si5 en orden cromático con las negras donde toca;
 *      para las 576 parejas ordenadas de teclas, el resultado dice los semitonos y los tonos que SALEN DE LOS NOMBRES de las notas
 *      (se calcula aparte, no se lee del motor), el intervalo de la tabla de la página, numera tantos pasos como semitonos y suena
 *      lo que toca (A al pulsar la primera, B al pulsar la segunda); los 5 botones de ejemplo eligen la pareja que dicen;
 *   2. lo que AFIRMA la página: la fila «una octava» y «escala mayor completa» de la tabla resumen, la escala de Do mayor
 *      (lo que suena = lo dibujado = la tabla de tonos y semitonos), las figuras Mi–Fa y Do–Re, el FAQ y el JSON-LD, y que
 *      los enlaces a ejercicios existen.
 *
 * Lo que SUENA al pulsar los ▶ de las figuras lo comprueba tools/verificar-melodias-audio.js (leyendo las notas que se tocan de verdad):
 * aquí solo se mira el atributo data-tm-melody. Y esta página NO debe llevar data-tm-intervals en el <article>: ese atributo pone un ▶
 * automático en cada imagen cuyo alt nombre notas (aquí tocaba «Do4 Do5 Re5 Mi5…») y se adelanta al de la melodía.
 *
 *   node tools/test-tono-semitono.js [--puerto=8080] [--sabotaje]
 */
const path = require('path');
const { chromium } = require(path.join(__dirname, '..', 'node_modules/playwright'));
const args = process.argv.slice(2);
const PUERTO = (args.find((a) => a.startsWith('--puerto=')) || '--puerto=8080').split('=')[1];
const SABOTAJE = args.includes('--sabotaje');
const URL = `http://localhost:${PUERTO}/diccionario-musical/intervalos/tono-y-semitono/`;

let fallos = 0;
const falla = (m) => { fallos++; if (fallos <= 25) console.log('  ✗ ' + m); };

const PCS = { Do: 0, 'Do♯': 1, Re: 2, 'Re♯': 3, Mi: 4, Fa: 5, 'Fa♯': 6, Sol: 7, 'Sol♯': 8, La: 9, 'La♯': 10, Si: 11 };
const SUBS = { '₄': 4, '₅': 5 };
const midiDeNombre = (nom) => { const m = /^(.*?)([₄₅])$/.exec(nom); return (SUBS[m[2]] + 1) * 12 + PCS[m[1]]; };
const esperado = (n) => {
  const t = Math.floor(n / 2), s = n % 2;
  if (n === 0) return 'ninguna distancia (la misma nota)';
  if (n === 1) return '1 semitono';
  return n + ' semitonos = ' + (t ? t + (t === 1 ? ' tono' : ' tonos') : '') + (t && s ? ' y ' : '') + (s ? '1 semitono' : '');
};

(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1000, height: 900 } });
  const errores = []; p.on('pageerror', (e) => errores.push(e.message)); p.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errores.push(m.text()); });
  await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
  await p.goto(URL, { waitUntil: 'load' }); await p.waitForTimeout(900);
  await p.evaluate(() => document.querySelectorAll('img').forEach((i) => { i.loading = 'eager'; }));
  await p.waitForTimeout(600);

  if (SABOTAJE) {
    await p.evaluate(() => {
      document.querySelector('#tmtonosemi .tm-ts-k[data-midi="65"]').setAttribute('data-midi', '66');                       // una tecla con el midi cambiado
      const f = document.querySelector('figure[data-tm-melody^="c/4:h d/4"]'); f.setAttribute('data-tm-melody', 'c/4:h e/4:h'); // el «tono» pasa a ser un Do–Mi
    });
  }

  /* ---- 1. teclado ---- */
  const teclas = await p.evaluate(() => [...document.querySelectorAll('#tmtonosemi .tm-ts-k')].map((g) => ({ nombre: g.getAttribute('aria-label'), midi: Number(g.getAttribute('data-midi')), negra: g.querySelector('rect').classList.contains('n'), x: Number(g.querySelector('rect').getAttribute('x')) })));
  if (teclas.length !== 24) falla(`${teclas.length} teclas y tenían que ser 24`);
  const porX = [...teclas].sort((a, b) => a.x - b.x);
  // en orden cromático (blancas y negras intercaladas por posición): se ordena por x del CENTRO
  const cent = (t) => t.x + (t.negra ? 12 : 20);
  const orden = [...teclas].sort((a, b) => cent(a) - cent(b));
  orden.forEach((t, i) => {
    const m = midiDeNombre(t.nombre);
    if (m !== 60 + i) falla(`la tecla ${i + 1} es ${t.nombre} (midi ${m}) y tenía que ser el midi ${60 + i}`);
    if (t.midi !== m) falla(`${t.nombre}: el motor le da el midi ${t.midi} y por su nombre es el ${m}`);
    if (t.negra !== /♯/.test(t.nombre)) falla(`${t.nombre}: ${t.negra ? 'negra' : 'blanca'} y por su nombre no`);
  });

  // tabla de intervalos de la página (fuente independiente de los nombres de intervalo)
  const tabla = await p.evaluate(() => {
    const t = [...document.querySelectorAll('table')].find((x) => /Equivalente en tonos/.test(x.textContent));
    return [...t.querySelectorAll('tbody tr')].map((tr) => [...tr.children].map((c) => c.textContent.trim()));
  });
  const nombreIntervalo = {}; tabla.forEach((r) => { nombreIntervalo[Number(r[0])] = r[2]; });

  const n = teclas.length;
  await p.evaluate(() => { window.__sonidos = []; window.tmPiano = { playMidi: (m) => window.__sonidos.push(m) }; });
  // diccionario midi real (por el NOMBRE de la tecla) → tecla: se pulsa por nombre, no por el data-midi del motor
  await p.evaluate((nm) => { window.__nom = nm; }, Object.fromEntries(teclas.map((t) => [midiDeNombre(t.nombre), t.nombre])));
  let parejas = 0;
  const todas = orden.map((t) => midiDeNombre(t.nombre));
  for (const A of todas) {
    for (const B of todas) {
      const r = await p.evaluate(([a, b]) => {
        const porNombre = (m) => [...document.querySelectorAll('#tmtonosemi .tm-ts-k')].find((g) => g.getAttribute('aria-label') === window.__nom[m]);
        window.__sonidos.length = 0;
        porNombre(a).dispatchEvent(new MouseEvent('click', { bubbles: true }));
        const tras1 = window.__sonidos.slice();
        porNombre(b).dispatchEvent(new MouseEvent('click', { bubbles: true }));
        const res = document.querySelector('#tmtonosemi .tm-ts-res');
        return { tras1, sonidos: window.__sonidos.slice(), gr: (res.querySelector('.gr') || {}).textContent, pe: (res.querySelector('.pe') || {}).textContent,
          nums: [...document.querySelectorAll('#tmtonosemi .tm-ts-num')].map((x) => Number(x.textContent)).sort((x, y) => x - y) };
      }, [A, B]);
      comprobar(A, B, r); parejas++;
    }
  }
  function comprobar(A, B, r) {
    const d = Math.abs(B - A), nomA = teclas.find((t) => midiDeNombre(t.nombre) === A).nombre, nomB = teclas.find((t) => midiDeNombre(t.nombre) === B).nombre;
    const quiere = `${nomA} → ${nomB}: ${esperado(d)}`;
    if (r.gr !== quiere) falla(`${nomA}→${nomB}: dice «${r.gr}» y tenía que decir «${quiere}»`);
    // tonos y semitonos coherentes: n = 2·tonos + semitonos y sobra a lo sumo 1 semitono
    const m = /(\d+) semitonos? = (?:(\d+) tonos?)?(?: y )?(?:(1) semitono)?/.exec(r.gr || '');
    if (d >= 2 && m && Number(m[1]) !== 2 * (Number(m[2]) || 0) + (m[3] ? 1 : 0)) falla(`${nomA}→${nomB}: los tonos y semitonos de «${r.gr}» no suman ${d}`);
    if (JSON.stringify(r.nums) !== JSON.stringify(Array.from({ length: d }, (_, i) => i + 1))) falla(`${nomA}→${nomB}: pasos numerados ${JSON.stringify(r.nums)} y tenían que ser 1..${d}`);
    if (d >= 1 && d <= 12) {
      const tab = nombreIntervalo[d].split('(')[0].trim().toLowerCase();
      const eng = (r.pe || '').replace('Intervalo: ', '').toLowerCase();
      if (!eng.startsWith(tab.slice(0, tab.startsWith('tritono') ? 7 : tab.length))) falla(`${nomA}→${nomB}: intervalo «${r.pe}» y la tabla de la página dice «${nombreIntervalo[d]}» para ${d} semitonos`);
    }
    if (JSON.stringify(r.tras1) !== JSON.stringify([A])) falla(`${nomA}: al pulsar la 1.ª tecla sonó ${JSON.stringify(r.tras1)} y tenía que sonar [${A}]`);
    if (JSON.stringify(r.sonidos) !== JSON.stringify([A, B])) falla(`${nomA}→${nomB}: sonó ${JSON.stringify(r.sonidos)} y tenía que sonar [${A}, ${B}]`);
  }

  // los 5 botones de ejemplo
  const ejemplos = await p.evaluate(() => [...document.querySelectorAll('#tmtonosemi .tm-ts-bt')].map((x) => x.textContent.trim()));
  const EJ = [['Mi', 'Fa', 'Mi₄', 'Fa₄'], ['Si', 'Do', 'Si₄', 'Do₅'], ['Do', 'Re', 'Do₄', 'Re₄'], ['Do', 'Mi', 'Do₄', 'Mi₄'], ['Do', 'Do', 'Do₄', 'Do₅']];
  if (ejemplos.length !== 5) falla(`${ejemplos.length} botones de ejemplo y tenían que ser 5`);
  for (let i = 0; i < Math.min(5, ejemplos.length); i++) {
    const [na, nb, ta, tb] = EJ[i];
    if (!ejemplos[i].startsWith(`${na} → ${nb}`)) falla(`el ejemplo ${i + 1} dice «${ejemplos[i]}» y debería nombrar ${na} → ${nb}`);
    await p.evaluate(() => { window.__sonidos.length = 0; });
    await p.evaluate((i) => document.querySelectorAll('#tmtonosemi .tm-ts-bt')[i].click(), i);
    const gr = await p.evaluate(() => document.querySelector('#tmtonosemi .tm-ts-res .gr').textContent);
    const quiere = `${ta} → ${tb}: ${esperado(Math.abs(midiDeNombre(tb) - midiDeNombre(ta)))}`;
    if (gr !== quiere) falla(`ejemplo «${ejemplos[i]}»: dice «${gr}» y tenía que decir «${quiere}»`);
  }

  /* ---- 2. lo que afirma la página ---- */
  if (await p.evaluate(() => !!document.querySelector('article[data-tm-intervals]'))) falla('el <article> lleva data-tm-intervals: pone ▶ automáticos que pisan las melodías de las figuras');
  const pag = await p.evaluate(() => {
    const filas = (t) => [...t.querySelectorAll('tbody tr')].map((tr) => [...tr.children].map((c) => c.textContent.trim().replace(/\s+/g, ' ')));
    const tablas = [...document.querySelectorAll('table')];
    const resumen = filas(tablas[0]);
    const grados = filas(tablas.find((t) => /Grados/.test(t.textContent) && /Do → Re/.test(t.textContent)));
    const fig = (sel) => { const f = document.querySelector(sel); return f ? { melodia: f.getAttribute('data-tm-melody'), alt: f.querySelector('img').alt, pie: f.querySelector('figcaption').textContent.trim(), boton: !!f.querySelector('.tm-play-scale'), ok: f.querySelector('img').complete && f.querySelector('img').naturalWidth > 0 } : null; };
    return {
      resumen, grados,
      escala: fig('figure[data-tm-melody^="c/4:q"]'), semitono: fig('figure[data-tm-melody^="e/4:h"]'), tono: fig('figure[data-tm-melody^="c/4:h"]'),
      faqVisible: [...document.querySelectorAll('.tm-faq-q')].map((x) => x.textContent.trim()),
      jsonld: (() => { const j = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent)).find((o) => o['@type'] === 'FAQPage'); return j ? j.mainEntity.map((q) => q.name) : []; })(),
      enlaces: [...document.querySelectorAll('aside.tm-callout a')].map((a) => a.getAttribute('href')),
      credito: (document.body.textContent.match(/Salamander Grand Piano/g) || []).length,
    };
  });
  const rOctava = pag.resumen.find((r) => /octava/i.test(r[0]));
  if (!rOctava || !rOctava[1].startsWith(esperado(12))) falla(`la fila «una octava» dice «${rOctava && rOctava[1]}» y el teclado dice ${esperado(12)}`);
  const tonos = pag.grados.filter((r) => /^Tono$/i.test(r[2])).length, semis = pag.grados.filter((r) => /^Semitono$/i.test(r[2])).length;
  const rEscala = pag.resumen.find((r) => /escala mayor completa/i.test(r[0]));
  if (!rEscala || !rEscala[1].startsWith(`${tonos} tonos y ${semis} semitonos`) || tonos * 2 + semis !== 12) falla(`la escala mayor completa dice «${rEscala && rEscala[1]}» y la tabla de grados da ${tonos} tonos y ${semis} semitonos (${tonos * 2 + semis} semitonos)`);
  // la escala suena = dibuja = tabla
  if (!pag.escala || !pag.escala.boton || !pag.escala.ok) falla('la escala de Do mayor no tiene ▶ o no carga');
  else {
    const PC = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
    const toks = pag.escala.melodia.split(' ').map((t) => t.split(':')[0]);
    const mm = toks.map((k) => { const q = /^([a-g])\/(\d)$/.exec(k); return PC[q[1]] + (Number(q[2]) + 1) * 12; });
    const difs = mm.slice(1).map((v, i) => v - mm[i]);
    const quiere = pag.grados.map((r) => (/^Semitono$/i.test(r[2]) ? 1 : 2));
    if (JSON.stringify(difs) !== JSON.stringify(quiere)) falla(`la escala suena con pasos ${difs.join(',')} y la tabla dice ${quiere.join(',')}`);
    const nombres = [...pag.escala.alt.slice(pag.escala.alt.indexOf(':') + 1).matchAll(/\b(Do|Re|Mi|Fa|Sol|La|Si)\b/g)].map((m) => m[1]).slice(0, 8).join(' ');
    const NOM = { c: 'Do', d: 'Re', e: 'Mi', f: 'Fa', g: 'Sol', a: 'La', b: 'Si' };
    if (nombres !== toks.map((k) => NOM[k[0]]).join(' ')) falla(`el alt de la escala nombra «${nombres}» y suena «${toks.map((k) => NOM[k[0]]).join(' ')}»`);
  }
  const dist = (f) => { const PC = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 }; const k = f.melodia.split(' ').map((t) => t.split(':')[0]).map((x) => { const q = /^([a-g])\/(\d)$/.exec(x); return PC[q[1]] + (Number(q[2]) + 1) * 12; }); return Math.abs(k[1] - k[0]); };
  if (!pag.semitono || !pag.tono) falla('faltan las figuras Mi–Fa o Do–Re');
  else {
    if (dist(pag.semitono) !== 1 || !/semitono/.test(pag.semitono.pie) || !/Mi y Fa/.test(pag.semitono.alt)) falla(`la figura Mi–Fa: distancia ${dist(pag.semitono)}, pie «${pag.semitono.pie}»`);
    if (dist(pag.tono) !== 2 || !/tono/.test(pag.tono.pie) || !/Do y Re/.test(pag.tono.alt)) falla(`la figura Do–Re: distancia ${dist(pag.tono)}, pie «${pag.tono.pie}»`);
    if (!pag.semitono.boton || !pag.tono.boton || !pag.semitono.ok || !pag.tono.ok) falla('las figuras Mi–Fa y Do–Re no tienen ▶ o no cargan');
  }
  if (pag.faqVisible.length !== pag.jsonld.length || pag.faqVisible.join('|') !== pag.jsonld.join('|')) falla(`FAQ visible (${pag.faqVisible.length}) y JSON-LD (${pag.jsonld.length}) no coinciden`);
  if (pag.credito !== 1) falla(`el piano se cita ${pag.credito} veces`);
  for (const href of pag.enlaces) {
    const st = await p.evaluate(async (h) => (await fetch(h)).status, href);
    if (st !== 200) falla(`el enlace ${href} da ${st}`);
  }
  await b.close();
  console.log(`teclado: ${todas.length} teclas, ${parejas} parejas · ejemplos: 5 · figuras, tablas, FAQ (${pag.faqVisible.length}) y ${pag.enlaces.length} enlaces · ${errores.length ? errores.length + ' error(es) de consola: ' + errores.join(' | ') : 'sin errores de consola'} · ${fallos ? fallos + ' FALLO(S)' : '0 discrepancias'}${SABOTAJE ? ' (con sabotaje: tiene que salir 1+)' : ''}`);
  process.exit(SABOTAJE ? (fallos ? 0 : 1) : (fallos || errores.length ? 1 : 0));
})().catch((e) => { console.error(e); process.exit(1); });
