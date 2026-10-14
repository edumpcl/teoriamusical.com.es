'use strict';
/**
 * Compara la TABLA de posiciones de los trombones de vara (tenor y bajo) con el DIAGRAMA interactivo de la misma
 * pagina, nota por nota. Se lee lo que el diagrama MUESTRA, no la tabla de datos del motor:
 *   - la posicion de la vara = la marca de la regla que se enciende (.on) debajo de la vara,
 *   - el armonico = lo que dice la linea de texto («armónico 5º sobre el La♭»),
 *   - las valvulas del bajo = los gatillos F / G♭ que se encienden.
 * y se compara con el punto (●) de la tabla, su columna de armonico y su columna de valvulas. Tambien: la imagen del
 * pentagrama carga y dice la nota (clave de fa), y los datos de la ficha PDF coinciden con el diagrama.
 *
 *   node tools/test-tabla-trombones.js [--puerto=8080] [--sabotaje]
 */
const path = require('path');
const { chromium } = require(path.join(__dirname, '..', 'node_modules/playwright'));
const args = process.argv.slice(2);
const PUERTO = (args.find((a) => a.startsWith('--puerto=')) || '--puerto=8080').split('=')[1];
const SABOTAJE = args.includes('--sabotaje');
const PAGINAS = [
  { slug: 'notas-del-trombon', inst: 'trombon', p: 'tm-tb', valvulas: false },
  { slug: 'notas-del-trombon-bajo', inst: 'trombon-bajo', p: 'tm-tbj', valvulas: true },
];
const fichas = require('./generate-fichas-digitaciones.js');

(async () => {
  const b = await chromium.launch();
  let notas = 0, fallos = 0;
  const falla = (m) => { fallos++; if (fallos <= 25) console.log('  ✗ ' + m); };
  for (const pg of PAGINAS) {
    const p = await b.newPage({ viewport: { width: 1000, height: 900 } });
    await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
    await p.goto(`http://localhost:${PUERTO}/diccionario-musical/${pg.slug}/`, { waitUntil: 'load' });
    await p.waitForTimeout(700);
    await p.evaluate(() => document.querySelectorAll('table.tm-digitaciones img').forEach((i) => { i.loading = 'eager'; }));
    await p.waitForTimeout(1200);
    const filas = await p.evaluate((valvulas) => [...document.querySelectorAll('table.tm-digitaciones tbody tr')].map((tr) => {
      const c = [...tr.children], pts = [...c[2].querySelectorAll('.tm-dg-on,.tm-dg-off')];
      const img = tr.querySelector('img');
      return { nota: c[0].childNodes[0].textContent.trim(), pos: pts.findIndex((e) => e.classList.contains('tm-dg-on')) + 1, marcas: pts.filter((e) => e.classList.contains('tm-dg-on')).length,
        harm: c[3].querySelector('.tm-dg-na') ? null : parseInt(c[3].textContent, 10), valv: valvulas ? (c[4].querySelector('.tm-dg-na') ? null : c[4].textContent.trim()) : undefined,
        alt: img.alt, ok: img.complete && img.naturalWidth > 0 };
    }), pg.valvulas);
    const botones = await p.evaluate((px) => [...document.querySelectorAll('.' + px + '-btn')].map((x) => x.dataset.n), pg.p);
    const ficha = fichas.datos(pg.inst).filas;
    if (SABOTAJE && pg.inst === 'trombon') filas[4] = { ...filas[4], pos: filas[4].pos === 1 ? 2 : 1 };   // la tabla dice otra posicion
    if (filas.length !== botones.length) falla(`${pg.inst}: ${filas.length} filas y ${botones.length} botones`);
    for (let i = 0; i < botones.length; i++) {
      const r = await p.evaluate(async ([i, px]) => {
        document.querySelectorAll('.' + px + '-btn')[i].click();
        await new Promise((ok) => setTimeout(ok, 20));
        const on = [...document.querySelectorAll('.' + px + '-tick')].findIndex((e) => e.classList.contains('on')) + 1;
        const linea = (document.querySelector('.' + px + '-keysline') || {}).textContent || '';
        const m = /armónico (\d+)º/.exec(linea);
        const v = [...document.querySelectorAll('.' + px + '-valve.on')].map((g) => g.dataset.v).sort().join('+');
        return { on, harm: m ? Number(m[1]) : null, v };
      }, [i, pg.p]);
      notas++;
      const f = filas[i]; if (!f) continue;
      if (f.pos !== r.on) falla(`${pg.inst} ${botones[i]}: la tabla dice la posición ${f.pos} y el diagrama la ${r.on}`);
      if (f.marcas !== 1) falla(`${pg.inst} ${botones[i]}: ${f.marcas} marcas en la fila`);
      if (f.harm !== r.harm) falla(`${pg.inst} ${botones[i]}: armónico ${f.harm} en la tabla y ${r.harm} en el diagrama`);
      if (pg.valvulas) {
        const quiere = ({ F: 'F', Gb: 'G♭', both: 'F + G♭' })[({ '': null, F: 'F', Gb: 'Gb', 'F+Gb': 'both' })[r.v] || ''] || null;
        if ((f.valv || null) !== quiere) falla(`${pg.inst} ${botones[i]}: válvulas «${f.valv}» en la tabla y «${r.v}» en el diagrama`);
      }
      if (!f.ok) falla(`${pg.inst} ${botones[i]}: la imagen del pentagrama no carga`);
      if (!/en clave de fa$/.test(f.alt)) falla(`${pg.inst} ${botones[i]}: pentagrama «${f.alt}»`);
      const fi = ficha[i];
      if (!fi || fi.clave !== botones[i] || fi.pos !== r.on || (fi.harm || null) !== r.harm || (fi.valves || null) !== (({ '': null, F: 'F', Gb: 'Gb', 'F+Gb': 'both' })[r.v] || null)) {
        falla(`${pg.inst} ${botones[i]}: la ficha PDF dice ${JSON.stringify(fi && { clave: fi.clave, pos: fi.pos, harm: fi.harm, valves: fi.valves })} y el diagrama ${JSON.stringify(r)}`);
      }
    }
    await p.close();
  }
  await b.close();
  console.log(`${PAGINAS.length} páginas · ${notas} notas · ${fallos ? fallos + ' FALLO(S)' : '0 discrepancias'}${SABOTAJE ? ' (con sabotaje: tiene que salir 1+)' : ''}`);
  process.exit(SABOTAJE ? (fallos ? 0 : 1) : (fallos ? 1 : 0));
})().catch((e) => { console.error(e); process.exit(1); });
