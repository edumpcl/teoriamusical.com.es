'use strict';
/**
 * Compara la TABLA de digitaciones de la trompa doble con el DIAGRAMA interactivo de la misma pagina:
 * para cada nota, los rotores que se iluminan en cada lado (Fa y Si♭) tienen que ser los que la tabla dibuja
 * con ● y ○ (1, 2, 3 y 4 = pulgar), y «—» solo donde el diagrama dice que la nota no se toca por ese lado.
 * Tambien: la clave del pentagrama (fa por debajo de Do4, sol desde Do4) y que cada imagen cargue.
 *
 *   node tools/test-tabla-trompa.js [--puerto=8080] [--sabotaje]
 */
const path = require('path');
const { chromium } = require(path.join(__dirname, '..', 'node_modules/playwright'));
const args = process.argv.slice(2);
const PUERTO = (args.find((a) => a.startsWith('--puerto=')) || '--puerto=8080').split('=')[1];
const SABOTAJE = args.includes('--sabotaje');
const ficha = require('./generate-fichas-digitaciones.js').datos('trompa').filas;   // los datos con que se escriben las HOJAS PDF
(async () => {
  if (SABOTAJE) ficha[7] = { ...ficha[7], sib: [true, false, true, true] };   // la ficha PDF dice otra cosa que el diagrama
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1000, height: 900 } });
  await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
  await p.goto(`http://localhost:${PUERTO}/diccionario-musical/notas-de-la-trompa/`, { waitUntil: 'load' });
  await p.waitForTimeout(800);
  // las imagenes son loading=lazy: se fuerza la carga para poder comprobarlas todas
  await p.evaluate(() => document.querySelectorAll('table.tm-digitaciones img').forEach((i) => { i.loading = 'eager'; }));
  await p.waitForTimeout(1500);
  const filas = await p.evaluate(() => [...document.querySelectorAll('table.tm-digitaciones tbody tr')].map((tr) => {
    const celdas = [...tr.children];
    const dib = (td) => (td.querySelector('.tm-dg-na') ? null : [...td.querySelectorAll('.tm-dg-on,.tm-dg-off')].map((e) => e.classList.contains('tm-dg-on')));
    const img = tr.querySelector('img');
    return { nota: celdas[0].childNodes[0].textContent.trim(), fa: dib(celdas[2]), sib: dib(celdas[3]), alt: img.alt, ok: img.complete && img.naturalWidth > 0 };
  }));
  const botones = await p.evaluate(() => [...document.querySelectorAll('.tm-tp-btn')].map((x) => x.dataset.n));
  let fallos = 0; const falla = (m) => { fallos++; if (fallos <= 20) console.log('  ✗ ' + m); };
  if (filas.length !== botones.length) falla(`${filas.length} filas y ${botones.length} botones`);
  for (let i = 0; i < botones.length; i++) {
    const r = await p.evaluate(async (i) => {
      document.querySelectorAll('.tm-tp-btn')[i].click();
      await new Promise((ok) => setTimeout(ok, 20));
      const lado = (id) => { const box = document.querySelector('[id$="_' + id + '"]'); const na = box.querySelector('.tm-tp-na').classList.contains('show');
        const on = (c) => !!box.querySelector('.tm-tp-rot[data-c="' + c + '"].on'); return na ? null : [on('V1'), on('V2'), on('V3'), on('T')]; };
      return { fa: lado('fa'), sib: lado('sib') };
    }, i);
    let f = filas[i]; if (!f) continue;
    if (SABOTAJE && i === 5) f = { ...f, fa: f.fa ? f.fa.map((v, k) => (k === 1 ? !v : v)) : [true, true, true, true] };
    const igual = (a, c) => JSON.stringify(a) === JSON.stringify(c);
    if (!igual(f.fa, r.fa)) falla(`${botones[i]}: lado de Fa — tabla ${JSON.stringify(f.fa)} y diagrama ${JSON.stringify(r.fa)}`);
    if (!igual(f.sib, r.sib)) falla(`${botones[i]}: lado de Si♭ — tabla ${JSON.stringify(f.sib)} y diagrama ${JSON.stringify(r.sib)}`);
    // la ficha PDF (otro lector del motor) tiene que decir lo mismo que el diagrama
    const fi = ficha[i];
    if (!fi || fi.clave !== botones[i]) falla(`${botones[i]}: la ficha PDF tiene en ese puesto ${fi && fi.clave}`);
    else {
      if (JSON.stringify(fi.fa) !== JSON.stringify(r.fa)) falla(`${botones[i]}: ficha PDF, lado de Fa ${JSON.stringify(fi.fa)} y diagrama ${JSON.stringify(r.fa)}`);
      if (JSON.stringify(fi.sib) !== JSON.stringify(r.sib)) falla(`${botones[i]}: ficha PDF, lado de Si♭ ${JSON.stringify(fi.sib)} y diagrama ${JSON.stringify(r.sib)}`);
    }
    const m = /^([A-Za-z]+)(#?)(\d)$/.exec(botones[i]); const midi = ({ Do: 0, Re: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 })[m[1]] + (m[2] ? 1 : 0) + (Number(m[3]) + 1) * 12;
    const clave = midi < 60 ? 'clave de fa' : 'clave de sol';
    if (!f.alt.endsWith(clave)) falla(`${botones[i]}: pentagrama «${f.alt}», tenia que ser ${clave}`);
    if (!f.ok) falla(`${botones[i]}: la imagen no carga`);
  }
  await b.close();
  console.log(`${botones.length} notas · ${fallos ? fallos + ' FALLO(S)' : '0 discrepancias'}${SABOTAJE ? ' (con sabotaje: tiene que salir 1+)' : ''}`);
  process.exit(SABOTAJE ? (fallos ? 0 : 1) : (fallos ? 1 : 0));
})().catch((e) => { console.error(e); process.exit(1); });
