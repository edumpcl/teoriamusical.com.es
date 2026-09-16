'use strict';
/**
 * Audita las demostraciones de agógica de /diccionario-musical/agogica/.
 *
 *   node tools/verificar-agogica-audio.js     (necesita node tools/serve.js en 8099)
 *
 * No se fía de las etiquetas: MIDE los pulsos que se programan en el reloj de Web
 * Audio y comprueba que el tempo hace lo que dice el término:
 *   accelerando  el hueco entre pulsos se va acortando y acaba cerca de 132
 *   ritardando   se va alargando y acaba cerca de 60
 *   ritenuto     salto brusco de 120 a 84 (y nada de bajada gradual antes)
 *   a tempo      frena y luego RECUPERA la velocidad inicial
 *   calderón     un hueco mucho más largo que los demás, y después sigue igual
 *   rubato       va y viene alrededor del tempo base, sin acabar más lento ni más rápido
 */
const { chromium } = require('playwright');

const URL = 'http://localhost:8099/diccionario-musical/agogica/';
let fallos = 0;
const mal = (donde, msg) => { console.log(`  ✗ ${donde}: ${msg}`); fallos++; };
const bpm = (a, b) => 60 / (b - a);          // pulsaciones por minuto entre dos clics

(async () => {
  const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  p.on('console', m => { if (m.type() === 'error' && !/403|ERR_|adsbygoogle|googlesyndication/.test(m.text())) errs.push(m.text()); });
  await p.goto(URL, { waitUntil: 'networkidle' });
  await p.evaluate(() => { const o = document.getElementById('tm-cookie-overlay'); if (o) o.remove(); });

  const botones = p.locator('.tm-ag-play');
  const n = await botones.count();
  if (!n) mal('página', 'no hay botones de demostración');
  const ocultos = await p.locator('.tm-ag-play:not([hidden])').count();
  if (ocultos !== n) mal('página', `${n - ocultos} botones siguen ocultos con el JS cargado`);

  let medidas = 0;
  for (let i = 0; i < n; i++) {
    const btn = botones.nth(i);
    const tipo = await btn.getAttribute('data-tipo');
    const demo = await p.evaluate(t => window.tmAgogicaAudio.DEMOS[t], tipo);
    await btn.click();
    await p.waitForTimeout(demo.dura * 1000 + 700);          // la demo entera
    const pulsos = await p.evaluate(() => window.tmAgogicaAudio.pulsos());
    if (pulsos.length < 6) { mal(tipo, `solo ${pulsos.length} pulsos`); continue; }
    const t = pulsos.map(x => x.t);
    const primero = bpm(t[0], t[1]);
    const ultimo = bpm(t[t.length - 2], t[t.length - 1]);
    const huecos = t.slice(1).map((x, k) => x - t[k]);
    const cerca = (a, b, tol) => Math.abs(a - b) <= tol;

    if (tipo === 'accelerando' || tipo === 'ritardando') {
      const sube = tipo === 'accelerando';
      const monotono = huecos.every((h, k) => k === 0 || (sube ? h <= huecos[k - 1] + 1e-6 : h >= huecos[k - 1] - 1e-6));
      if (!monotono) mal(tipo, 'el cambio de tempo no es progresivo');
      /* La rampa, calculada aparte: cada hueco tiene que corresponder al tempo que
         toca en ESE instante. El último pulso arranca antes de acabar la rampa, así
         que comparar solo el final daría un falso error. */
      const rampa = t => demo.de + (demo.a - demo.de) * Math.min(1, t / demo.dura);
      let peor = 0, dondePeor = 0;
      huecos.forEach((h, k) => {
        const d = Math.abs(60 / h - rampa(t[k]));
        if (d > peor) { peor = d; dondePeor = t[k]; }
      });
      if (peor > 4) mal(tipo, `en el segundo ${dondePeor.toFixed(1)} el tempo se aparta ${peor.toFixed(1)} bpm de la rampa`);
      if (!cerca(primero, demo.de, 4)) mal(tipo, `empieza a ${primero.toFixed(0)} y debería ser ${demo.de}`);
      // El último pulso tiene que llegar casi al final del recorrido.
      if (t[t.length - 1] < demo.dura - 60 / demo.a * 1.5) mal(tipo, `la demostración se corta en el segundo ${t[t.length - 1].toFixed(1)} de ${demo.dura}`);
      const finalTeorico = rampa(t[t.length - 2]);
      if (!cerca(ultimo, finalTeorico, 4)) mal(tipo, `acaba a ${ultimo.toFixed(0)} y la rampa pedía ${finalTeorico.toFixed(0)}`);
      medidas++;
    } else if (tipo === 'ritenuto') {
      const antes = huecos.slice(0, 3), despues = huecos.slice(-3);
      const iguales = antes.every(h => cerca(60 / h, demo.de, 3));
      if (!iguales) mal(tipo, 'antes del golpe el tempo ya se movía: el ritenuto es súbito');
      if (!despues.every(h => cerca(60 / h, demo.a, 3))) mal(tipo, `después del golpe no se queda en ${demo.a}`);
      medidas++;
    } else if (tipo === 'a-tempo') {
      const medio = huecos[Math.floor(huecos.length / 2) - 1];
      if (!(60 / medio < demo.de - 8)) mal(tipo, 'no llega a frenar antes del «a tempo»');
      if (!cerca(ultimo, demo.de, 5)) mal(tipo, `no recupera el tempo inicial (acaba a ${ultimo.toFixed(0)})`);
      medidas++;
    } else if (tipo === 'calderon') {
      const mayor = Math.max(...huecos), normal = huecos.slice().sort((a, c) => a - c)[Math.floor(huecos.length / 2)];
      if (mayor < normal * 2) mal(tipo, 'el calderón no alarga el pulso lo suficiente');
      if (!cerca(ultimo, demo.de, 4)) mal(tipo, 'después del calderón no vuelve al mismo tempo');
      medidas++;
    } else if (tipo === 'rubato') {
      const min = Math.min(...huecos.map(h => 60 / h)), max = Math.max(...huecos.map(h => 60 / h));
      if (max - min < 10) mal(tipo, 'apenas se mueve: no se oye el rubato');
      if (!cerca((min + max) / 2, demo.de, 8)) mal(tipo, 'el vaivén no gira alrededor del tempo base');
      medidas++;
    }

    const pulsados = await p.locator('.tm-ag-play[aria-pressed="true"]').count();
    if (pulsados > 1) mal(tipo, `${pulsados} demostraciones sonando a la vez`);
    await p.evaluate(() => window.tmAgogicaAudio.parar());
  }

  if (errs.length) mal('página', 'errores: ' + errs.slice(0, 3).join(' | '));
  await b.close();
  console.log(`\n  ${n} demostraciones · ${medidas} medidas en el navegador · ${fallos} problema(s).`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
