'use strict';
/**
 * Compara la TABLA de la corneta (armonico x serie, con la nota dibujada) y la ficha PDF con el DIAGRAMA interactivo de
 * la misma pagina, nota por nota. Del diagrama se lee lo que MUESTRA: la palometa (girada o en do), el armonico que dice
 * su linea de texto y el nombre de la nota. De la tabla: la celda de esa fila (armonico) y esa columna (serie) tiene que
 * llevar el mismo nombre de nota, y su pentagrama tiene que decir esa nota y estar en clave de sol; el «calante» solo en
 * las notas que el diagrama avisa. Y la ficha: mismos armonico, serie y nota.
 *
 *   node tools/test-tabla-corneta.js [--puerto=8080] [--sabotaje]
 */
const path = require('path');
const { chromium } = require(path.join(__dirname, '..', 'node_modules/playwright'));
const args = process.argv.slice(2);
const PUERTO = (args.find((a) => a.startsWith('--puerto=')) || '--puerto=8080').split('=')[1];
const SABOTAJE = args.includes('--sabotaje');
const ficha = require('./generate-fichas-digitaciones.js').datos('corneta').filas;

(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1000, height: 900 } });
  await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
  await p.goto(`http://localhost:${PUERTO}/diccionario-musical/notas-de-la-corneta/`, { waitUntil: 'load' });
  await p.waitForTimeout(700);
  await p.evaluate(() => document.querySelectorAll('table.tm-digitaciones img').forEach((i) => { i.loading = 'eager'; }));
  await p.waitForTimeout(1200);
  const tabla = await p.evaluate(() => [...document.querySelectorAll('table.tm-digitaciones tbody tr')].map((tr) => ({
    h: parseInt(tr.children[0].textContent, 10),
    celdas: [1, 2].map((k) => { const td = tr.children[k]; const img = td.querySelector('img');
      return { nombre: td.querySelector('strong').textContent.trim(), calante: !!td.querySelector('small'), alt: img.alt, ok: img.complete && img.naturalWidth > 0 }; }),
  })));
  const botones = await p.evaluate(() => [...document.querySelectorAll('.tm-co-btn')].map((x) => x.textContent.trim()));
  let fallos = 0; const falla = (m) => { fallos++; if (fallos <= 20) console.log('  ✗ ' + m); };
  if (tabla.length !== 8) falla(`${tabla.length} filas de armónico y tenían que ser 8`);
  if (SABOTAJE) tabla[2].celdas[1].nombre = 'Sol₅';
  for (let i = 0; i < botones.length; i++) {
    const r = await p.evaluate(async (i) => {
      document.querySelectorAll('.tm-co-btn')[i].click();
      await new Promise((ok) => setTimeout(ok, 20));
      const arm = (document.querySelector('.tm-co-armline') || {}).textContent || '';
      const m = /^(\d+)\.º armónico de (Do|Re♭)/.exec(arm.trim());
      return { nombre: document.querySelectorAll('.tm-co-btn')[i].textContent.trim(), h: m ? Number(m[1]) : null, serie: m ? (m[2] === 'Do' ? 'do' : 'reb') : null,
        girada: document.querySelector('.tm-co-pal').classList.contains('girada'), calante: !!document.querySelector('.tm-co-warn') };
    }, i);
    if (r.girada !== (r.serie === 'reb')) falla(`${r.nombre}: la palometa dice ${r.girada ? 'girada' : 'en do'} y la serie es ${r.serie}`);
    const fila = tabla.find((t) => t.h === r.h);
    if (!fila) { falla(`${r.nombre}: no hay fila de armónico ${r.h}`); continue; }
    const c = fila.celdas[r.serie === 'do' ? 0 : 1];
    if (c.nombre !== r.nombre) falla(`${r.nombre}: en la tabla, armónico ${r.h}.º / serie ${r.serie}, está «${c.nombre}»`);
    if (!c.alt.startsWith(r.nombre)) falla(`${r.nombre}: el pentagrama de esa celda dice «${c.alt}»`);
    if (!/en clave de sol$/.test(c.alt)) falla(`${r.nombre}: pentagrama «${c.alt}» (tenía que ser clave de sol)`);
    if (!c.ok) falla(`${r.nombre}: la imagen no carga`);
    if (c.calante !== r.calante) falla(`${r.nombre}: «calante» ${c.calante} en la tabla y ${r.calante} en el diagrama`);
    const f = ficha[i];
    if (!f || f.lbl !== r.nombre || f.h !== r.h || f.serie !== r.serie || f.calante !== r.calante) falla(`${r.nombre}: la ficha PDF dice ${JSON.stringify(f && { lbl: f.lbl, h: f.h, serie: f.serie, calante: f.calante })}`);
  }
  await b.close();
  console.log(`${botones.length} notas · ${fallos ? fallos + ' FALLO(S)' : '0 discrepancias'}${SABOTAJE ? ' (con sabotaje: tiene que salir 1+)' : ''}`);
  process.exit(SABOTAJE ? (fallos ? 0 : 1) : (fallos ? 1 : 0));
})().catch((e) => { console.error(e); process.exit(1); });
