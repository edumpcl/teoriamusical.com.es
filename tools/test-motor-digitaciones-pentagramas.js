'use strict';
/**
 * Banco de equivalencia de los diagramas «notas de la [instrumento]» (27 motores digitaciones-*-engine.js):
 * al pulsar cada nota, el pentagrama que se muestra tiene que ser el que dibujaba VexFlow.
 *
 *   node tools/test-motor-digitaciones-pentagramas.js [--puerto=8080] [--sabotaje]
 *
 * LINEA BASE: tools/notacion/datos/digitaciones-baseline-vexflow.json = para cada boton de cada pagina, la clave y
 * la nota con que el motor VexFlow construia el StaveNote (se recogio interceptando VexFlow, antes de migrar).
 * AHORA: se pulsa cada boton y se LEE EL DIBUJO (el fichero de la <img>: clave y nota), no la tabla del motor.
 * Ademas: la imagen carga (naturalWidth > 0), su alt nombra la nota, no hay VexFlow en la pagina y no hay errores.
 *
 * --sabotaje: comprueba que el banco SABE fallar (cambia a proposito un boton de la linea base y una imagen).
 * Necesita un servidor estatico en la raiz del repo (python -m http.server 8080 o node tools/servidor-estatico.js).
 */
const fs = require('fs');
const path = require('path');
const RAIZ = path.join(__dirname, '..');
const { chromium } = require(path.join(RAIZ, 'node_modules/playwright'));

const args = process.argv.slice(2);
const PUERTO = (args.find((a) => a.startsWith('--puerto=')) || '--puerto=8080').split('=')[1];
const SABOTAJE = args.includes('--sabotaje');
const base = JSON.parse(fs.readFileSync(path.join(__dirname, 'notacion/datos/digitaciones-baseline-vexflow.json'), 'utf8'));
const ES = { c: 'Do', d: 'Re', e: 'Mi', f: 'Fa', g: 'Sol', a: 'La', b: 'Si' };

/** 'do3-fs4.svg' -> { c:'do3', k:'f#/4' } */
function deFichero(src) {
  const m = /\/([a-z0-9]+)-([a-g])(s|f)?(\d)\.svg(?:\?.*)?$/.exec(src || '');
  if (!m) return null;
  return { c: m[1], k: m[2] + (m[3] === 's' ? '#' : m[3] === 'f' ? 'b' : '') + '/' + m[4], letra: m[2], alt: m[3] };
}

(async () => {
  if (SABOTAJE) {   // 1) una linea base que miente en un boton; 2) un boton con su imagen cambiada
    const slug = Object.keys(base)[0];
    base[slug].botones[3] = { ...base[slug].botones[3], k: 'c/2' };
  }
  const b = await chromium.launch();
  let botones = 0, fallos = 0, paginas = 0;
  const falla = (m) => { fallos++; if (fallos <= 25) console.log('  ✗ ' + m); };
  for (const [slug, def] of Object.entries(base)) {
    const p = await b.newPage({ viewport: { width: 900, height: 900 } });
    const errores = [];
    p.on('pageerror', (e) => errores.push(e.message));
    p.on('console', (m) => { if ((m.type() === 'error' && !/Failed to load resource/.test(m.text())) || /tmPentNota/.test(m.text())) errores.push(m.text()); });   // los recursos bloqueados a proposito no cuentan
    // los anuncios y el banner de cookies no pintan nada aqui: se bloquean
    await p.route(/consent\.js|adsbygoogle|googlesyndication|googletagmanager/, (r) => r.abort());
    await p.goto(`http://localhost:${PUERTO}/diccionario-musical/${slug}/`, { waitUntil: 'load' });
    await p.waitForTimeout(700);
    const hayVex = await p.evaluate(() => typeof Vex !== 'undefined' || !!document.querySelector('script[src*="vexflow"]'));
    if (hayVex) falla(`${slug}: sigue cargando VexFlow`);
    const n = await p.evaluate(() => [...document.querySelectorAll('button')].filter((x) => [...x.classList].some((c) => /^tm-\w+-btn$/.test(c))).length);
    if (n !== def.botones.length) falla(`${slug}: ${n} botones y la linea base tiene ${def.botones.length}`);
    for (let i = 0; i < Math.min(n, def.botones.length); i++) {
      const esperado = def.botones[i];
      const r = await p.evaluate(async (i) => {
        const bt = [...document.querySelectorAll('button')].filter((x) => [...x.classList].some((c) => /^tm-\w+-btn$/.test(c)));
        bt[i].click();
        await new Promise((ok) => setTimeout(ok, 30));
        const img = document.querySelector('[id$="_staff"] img');
        if (img && !img.complete) await new Promise((ok) => { img.onload = ok; img.onerror = ok; setTimeout(ok, 1500); });
        return { etiqueta: bt[i].textContent.trim(), src: img ? img.getAttribute('src') : null, ancho: img ? img.naturalWidth : 0, alt: img ? img.alt : null };
      }, i);
      botones++;
      let real = deFichero(r.src);
      if (SABOTAJE && slug === Object.keys(base)[1] && i === 2 && real) real = { ...real, k: 'a/7' };   // imagen equivocada
      if (r.etiqueta !== esperado.e) falla(`${slug} #${i}: el boton dice «${r.etiqueta}» y la linea base «${esperado.e}»`);
      if (!real) { falla(`${slug} ${esperado.e}: no hay imagen de pentagrama`); continue; }
      if (real.c !== esperado.c || real.k !== esperado.k) falla(`${slug} ${esperado.e}: dibuja ${real.c} ${real.k} y VexFlow dibujaba ${esperado.c} ${esperado.k}`);
      if (!r.ancho) falla(`${slug} ${esperado.e}: la imagen no carga (${r.src})`);
      const nombre = ES[real.letra] + (real.alt === 's' ? '♯' : real.alt === 'f' ? '♭' : '');
      if (!(r.alt || '').startsWith(nombre)) falla(`${slug} ${esperado.e}: el alt «${r.alt}» no empieza por ${nombre}`);
    }
    for (const e of errores) falla(`${slug}: ${e}`);
    paginas++;
    await p.close();
  }
  await b.close();
  console.log(`${paginas} paginas · ${botones} botones · ${fallos ? fallos + ' FALLO(S)' : '0 discrepancias'}${SABOTAJE ? ' (con sabotaje: tienen que salir fallos)' : ''}`);
  process.exit(SABOTAJE ? (fallos >= 2 ? 0 : 1) : (fallos ? 1 : 0));
})().catch((e) => { console.error(e); process.exit(1); });
