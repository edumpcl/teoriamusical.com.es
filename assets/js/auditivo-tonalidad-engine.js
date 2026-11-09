/* Motor — Ejercicios auditivos «¿Qué tonalidad mayor es?», «¿Qué tonalidad menor es?», «¿Qué tonalidad es?»
   y «Compás y tonalidad» (opción compas: true)
   Suena el La4 de referencia y después una melodía de 8 compases al piano en una tonalidad mayor o
   menor (según la página: solo mayores, solo menores o mezcladas, modo 'mixto'); hay que decir cuál es,
   con el constructor de tonalidad (nota + alteración, y en el mixto también el modo),
   como en el ejercicio de tonalidades vecinas: siempre están las 7 notas y las 3 alteraciones, sea cual
   sea el nivel. Tres niveles: fácil (hasta 2 alteraciones), medio (hasta 4) y difícil (todas). Las
   enarmónicas valen, porque suenan igual (Do♯ mayor = Re♭ mayor); si la respuesta es una tonalidad que
   no se usa (Sol♯ mayor, 8 sostenidos), también vale, pero se avisa de cómo se escribe.

   La melodía sale del generador de «¿Mayor o menor?» (auditivo-modo-engine.js): arpegio de la tónica
   al empezar, semicadencia en el compás 4, sensible-tónica al final (en menor, la menor armónica) y
   filtro de Krumhansl-Kessler que exige que la tonalidad buscada sea, con margen, la que se percibe.

   Con la opción compas (nivel de prueba de acceso a profesional) hay que decir también el compás: la
   melodía sale entonces del generador del ejercicio de compás (auditivo-compas-engine.js: 1.er tiempo
   acentuado, subdivisión a la vista, semicorcheas), con los 6 compases en todos los niveles, y solo
   cuenta como acierto si están bien el compás y la tonalidad. */
(function () {
  'use strict';
  const EN = document.documentElement.lang === 'en';
  const T = (es, en) => EN ? en : es;

  var LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
  var NOMBRE = EN ? { c: 'C', d: 'D', e: 'E', f: 'F', g: 'G', a: 'A', b: 'B' } : { c: 'Do', d: 'Re', e: 'Mi', f: 'Fa', g: 'Sol', a: 'La', b: 'Si' };
  var MODO_TXT = { mayor: T('mayor', 'major'), menor: T('menor', 'minor') };
  var LA_NOMBRE = NOMBRE.a;
  var NAT = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
  /* armadura de la tonalidad sobre cada nota natural */
  var ARM_NAT = { mayor: { c: 0, g: 1, d: 2, a: 3, e: 4, b: 5, f: -1 }, menor: { a: 0, e: 1, b: 2, d: -1, g: -2, c: -3, f: -4 } };
  var SOST = ['f', 'c', 'g', 'd', 'a', 'e', 'b'], BEM = ['b', 'e', 'a', 'd', 'g', 'c', 'f'];
  /* Las 15 tonalidades de cada modo. Tónicas entre La3 y Sol♯4, para que la melodía quede en el centro
     de la clave de sol. */
  var TONOS = {
    mayor: [
      { l: 'c', a: 0, m: 60 }, { l: 'g', a: 0, m: 67 }, { l: 'd', a: 0, m: 62 }, { l: 'a', a: 0, m: 57 }, { l: 'e', a: 0, m: 64 },
      { l: 'b', a: 0, m: 59 }, { l: 'f', a: 1, m: 66 }, { l: 'c', a: 1, m: 61 },
      { l: 'f', a: 0, m: 65 }, { l: 'b', a: -1, m: 58 }, { l: 'e', a: -1, m: 63 }, { l: 'a', a: -1, m: 68 },
      { l: 'd', a: -1, m: 61 }, { l: 'g', a: -1, m: 66 }, { l: 'c', a: -1, m: 59 }
    ],
    menor: [
      { l: 'a', a: 0, m: 57 }, { l: 'e', a: 0, m: 64 }, { l: 'b', a: 0, m: 59 }, { l: 'f', a: 1, m: 66 }, { l: 'c', a: 1, m: 61 },
      { l: 'g', a: 1, m: 68 }, { l: 'd', a: 1, m: 63 }, { l: 'a', a: 1, m: 58 },
      { l: 'd', a: 0, m: 62 }, { l: 'g', a: 0, m: 67 }, { l: 'c', a: 0, m: 60 }, { l: 'f', a: 0, m: 65 },
      { l: 'b', a: -1, m: 58 }, { l: 'e', a: -1, m: 63 }, { l: 'a', a: -1, m: 68 }
    ]
  };
  ['mayor', 'menor'].forEach(function (modo) { TONOS[modo].forEach(function (t) { t.arm = armadura(t.l, t.a, modo); t.modo = modo; }); });
  var NIVELES = [
    { nombre: T('Fácil', 'Easy'), desc: T('Hasta 2 alteraciones', 'Up to 2 sharps or flats'), max: 2 },
    { nombre: T('Medio', 'Medium'), desc: T('Hasta 4 alteraciones', 'Up to 4 sharps or flats'), max: 4 },
    { nombre: T('Difícil', 'Hard'), desc: T('Todas las tonalidades', 'All keys'), max: 7 }
  ];
  var LA4 = 69, PAUSA = 1.6, MAX_ESCUCHAS = 3, TOTAL = 10;
  /* grados por semitonos sobre la tónica (en menor, la armónica: la que suena en las melodías) */
  var G1 = T('1.er grado (la tónica)', '1st degree (the tonic)'), G2 = T('2.º grado', '2nd degree'), G3 = T('3.er grado', '3rd degree'), G4 = T('4.º grado', '4th degree'),
    G5 = T('5.º grado (la dominante)', '5th degree (the dominant)'), G6 = T('6.º grado', '6th degree'), G7 = T('7.º grado (la sensible)', '7th degree (the leading tone)');
  var GRADO = {
    mayor: { 0: G1, 2: G2, 4: G3, 5: G4, 7: G5, 9: G6, 11: G7 },
    menor: { 0: G1, 2: G2, 3: G3, 5: G4, 7: G5, 8: G6, 11: G7 }
  };
  var ORD = [G1, G2, G3, G4, G5, G6, G7];
  var EJEMPLO = EN ? { mayor: 'C♯ major and D♭ major', menor: 'G♯ minor and A♭ minor', mixto: 'C♯ major and D♭ major, or G♯ minor and A♭ minor,' } :
    { mayor: 'Do♯ mayor y Re♭ mayor', menor: 'Sol♯ menor y La♭ menor', mixto: 'Do♯ mayor y Re♭ mayor, o Sol♯ menor y La♭ menor,' };

  function armadura(l, a, modo) { return ARM_NAT[modo][l] + 7 * a; }
  function pc(l, a) { return (NAT[l] + a + 12) % 12; }
  function alt(a) { return a > 0 ? '♯' : a < 0 ? '♭' : ''; }
  function nombreTono(l, a, modo) { return NOMBRE[l] + alt(a) + ' ' + MODO_TXT[modo]; }
  function listaArmadura(arm) {
    if (!arm) return T('sin alteraciones', 'no sharps or flats');
    var n = Math.abs(arm), notas = (arm > 0 ? SOST : BEM).slice(0, n).map(function (l) { return NOMBRE[l] + (arm > 0 ? '♯' : '♭'); });
    return n + (arm > 0 ? (n === 1 ? T(' sostenido', ' sharp') : T(' sostenidos', ' sharps')) : (n === 1 ? T(' bemol', ' flat') : T(' bemoles', ' flats'))) + ' (' + notas.join(', ') + ')';
  }
  function cuentaArmadura(arm) {
    var n = Math.abs(arm);
    return n + (arm > 0 ? (n === 1 ? T(' sostenido', ' sharp') : T(' sostenidos', ' sharps')) : (n === 1 ? T(' bemol', ' flat') : T(' bemoles', ' flats')));
  }
  var nota = function (t, modo, g) { var M = window.tmAudModo; return M.nombreNota(M.deletrear(t, modo, g)); };
  /* Qué es el La de referencia dentro de la tonalidad: un grado de la escala o, si no está en ella,
     qué grado lleva la letra La (La♭ o La♯). En menor, si el La es el 7.º grado natural, se dice que
     en la melodía suena subido (la sensible de la menor armónica). */
  function papelDelLa(t, modo) {
    var d = (9 - pc(t.l, t.a) + 12) % 12, nombre = nombreTono(t.l, t.a, modo);
    if (GRADO[modo][d]) {
      var gi = ORD.indexOf(GRADO[modo][d]), escrito = nota(t, modo, gi);
      if (escrito === LA_NOMBRE) return T('El La de referencia es el ' + GRADO[modo][d] + ' de ' + nombre + '.', 'The reference A is the ' + GRADO[modo][d] + ' of ' + nombre + '.');
      return T('El La de referencia suena igual que el ' + GRADO[modo][d] + ' de ' + nombre + ', que se escribe ' + escrito + '.', 'The reference A sounds the same as the ' + GRADO[modo][d] + ' of ' + nombre + ', which is written ' + escrito + '.');
    }
    var g = (LETRAS.indexOf('a') - LETRAS.indexOf(t.l) + 7) % 7, n = nota(t, modo, g);
    if (modo === 'menor' && d === 10) return T('El La de referencia es el 7.º grado de ' + nombre + ' natural; en la melodía suena subido, ' + n + ', porque hace de sensible.', 'The reference A is the 7th degree of natural ' + nombre + '; in the melody it sounds raised, ' + n + ', because it acts as the leading tone.');
    return T('El La natural no está en la escala de ' + nombre + ': su ' + ORD[g] + ' es ' + n + ', medio tono ' + (/♯|sostenido/.test(n) ? 'por encima' : 'por debajo') + ' del La.', 'A natural is not in the scale of ' + nombre + ': its ' + ORD[g] + ' is ' + n + ', a half step ' + (/♯|sharp/.test(n) ? 'above' : 'below') + ' A.');
  }
  /* la relativa (misma armadura) y, en menor, la sensible, que no está en la armadura */
  function extra(t, modo) {
    if (modo === 'mayor') return T(' Su relativa es ' + nota(t, 'mayor', 5) + ' menor, con la misma armadura.', ' Its relative is ' + nota(t, 'mayor', 5) + ' minor, with the same key signature.');
    return T(' Su relativa es ' + nota(t, 'menor', 2) + ' mayor, con la misma armadura. La sensible, ' + nota(t, 'menor', 6) + ', no está en la armadura: se sube con una alteración, como en la escala menor armónica.',
      ' Its relative is ' + nota(t, 'menor', 2) + ' major, with the same key signature. The leading tone, ' + nota(t, 'menor', 6) + ', is not in the key signature: it is raised with an accidental, as in the harmonic minor scale.');
  }
  /* ¿la respuesta es la relativa de la tonalidad que sonaba? Por el sonido, no por la armadura, para que
     valga también escrita con la enarmónica */
  function esRelativa(t, real, l, a, m) {
    return m !== real && pc(l, a) === (t.m + (real === 'mayor' ? 9 : 3)) % 12;
  }
  function barajar(a) {   // Fisher-Yates
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; }
    return a;
  }
  /* Las 10 tonalidades del test: todas las del nivel salen las mismas veces (o una de diferencia), sin
     la misma dos veces seguidas. En el difícil, 10 sonidos distintos de los 12, y la enarmónica que se
     escribe (Do♯ o Re♭ mayor; Sol♯ o La♭ menor...), al azar. */
  function ordenTest(nivel, modo) {
    if (modo === 'mixto') {   // sin la misma tónica dos veces seguidas (Do mayor y luego Do menor)
      var mix, tonica = function (t) { return t.m % 12; };
      for (var k = 0; k < 100; k++) {
        mix = barajar(ordenModo(nivel, 'mayor', TOTAL / 2).concat(ordenModo(nivel, 'menor', TOTAL / 2)));
        if (mix.every(function (t, i) { return i === 0 || tonica(t) !== tonica(mix[i - 1]); })) break;
      }
      return mix;
    }
    return ordenModo(nivel, modo, TOTAL);
  }
  /* En el mixto, 5 mayores y 5 menores: en el fácil salen las 10 tonalidades del nivel, una vez cada una. */
  function ordenModo(nivel, modo, total) {
    var lista = TONOS[modo].filter(function (t) { return Math.abs(t.arm) <= nivel.max; });
    var grupos = {};
    lista.forEach(function (t) { var k = t.m % 12; (grupos[k] = grupos[k] || []).push(t); });
    var sonidos = Object.keys(grupos), orden;
    for (var intento = 0; intento < 100; intento++) {
      orden = [];
      while (orden.length + sonidos.length <= total) orden = orden.concat(sonidos);
      orden = barajar(orden.concat(barajar(sonidos).slice(0, total - orden.length)));
      if (orden.every(function (s, i) { return i === 0 || s !== orden[i - 1]; })) break;
    }
    return orden.map(function (s) { var g = grupos[s]; return g[Math.floor(Math.random() * g.length)]; });
  }
  function generar(tono, modo, compas) {
    var M = window.tmAudModo, t = { l: tono.l, a: tono.a, m: tono.m, arm: tono.arm };
    if (compas) return window.tmAudCompas.generar(compas, modo, t);
    for (var k = 0; k < 400; k++) {
      var mel = M.intentar(modo, t, M.COMPASES[Math.floor(Math.random() * M.COMPASES.length)]);
      if (mel) return mel;
    }
    throw new Error('no se ha podido generar la melodía');
  }

  /* Los compases del test: los 6 repartidos lo más igual posible, sin el mismo dos veces seguidas. */
  function ordenCompases(total) {
    var C = window.tmAudCompas.COMPASES, orden;
    for (var k = 0; k < 100; k++) {
      orden = [];
      while (orden.length + C.length <= total) orden = orden.concat(C);
      orden = barajar(orden.concat(barajar(C).slice(0, total - orden.length)));
      if (orden.every(function (c, i) { return i === 0 || c !== orden[i - 1]; })) break;
    }
    return orden;
  }
  var nomC = function (c) { return c.num + '/' + c.den; };

  var CSS_EXTRA = [
    '.tm-aud-wrap .tm-audt-comps{grid-template-columns:repeat(6,minmax(0,1fr))}',
    '.tm-aud-wrap .tm-audt-comps .tm-aud-opt{font-size:1.15rem}',
    '@media(max-width:480px){.tm-aud-wrap .tm-audt-comps{grid-template-columns:repeat(3,minmax(0,1fr))}}',
    '.tm-aud-wrap .tm-audt-niveles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:18px 0 6px}',
    '.tm-aud-wrap .tm-audt-niv{display:flex;flex-direction:column;gap:4px;padding:14px 8px;text-align:center}',
    '.tm-aud-wrap .tm-audt-niv b{font-size:1.1rem}.tm-aud-wrap .tm-audt-niv span{font-size:.85rem;font-weight:400}',
    '.tm-aud-wrap .tm-audt-nivres{display:block;margin-top:8px;font-size:1rem;font-weight:600;opacity:.9}',
    '.tm-aud-wrap .tm-audt-prev{background:#f5f2ea;border-radius:8px;padding:14px;text-align:center;font-size:1.3rem;font-weight:800;color:#1a1a2e;margin-bottom:14px;min-height:1.4em}',
    '.tm-aud-wrap .tm-audt-prev.tm-ok{background:#e8f5e9;color:#1b5e20}.tm-aud-wrap .tm-audt-prev.tm-ko{background:#ffebee;color:#b71c1c}',
    '.tm-aud-wrap .tm-audt-lbl{font-size:.75rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#777;margin:0 0 6px}',
    '.tm-aud-wrap .tm-audt-fila{display:grid;gap:6px;margin-bottom:12px}',
    '.tm-aud-wrap .tm-audt-notas{grid-template-columns:repeat(7,minmax(0,1fr))}',
    '.tm-aud-wrap .tm-audt-alts{grid-template-columns:repeat(3,minmax(0,1fr))}',
    '.tm-aud-wrap .tm-audt-modos{grid-template-columns:repeat(2,minmax(0,1fr))}',
    '.tm-aud-wrap .tm-audt-fila .tm-aud-opt{padding:12px 2px;font-size:1rem;font-weight:700}',
    '.tm-aud-wrap .tm-audt-alts .tm-aud-opt{font-size:1.35rem;padding:8px 2px}',
    '.tm-aud-wrap .tm-audt-fila .tm-aud-opt.tm-on{border-color:#8b6914;background:#8b6914;color:#fff;opacity:1}',
    '.tm-aud-wrap .tm-audt-resp{font:inherit;width:100%;padding:14px;border-radius:6px;border:0;background:#1a1a1a;color:#fff;cursor:pointer;font-weight:700;font-size:1rem}',
    '.tm-aud-wrap .tm-audt-resp[disabled]{background:#cfc6ae;cursor:default}',
    '@media(max-width:480px){.tm-aud-wrap .tm-audt-niveles{grid-template-columns:1fr}.tm-aud-wrap .tm-audt-fila{gap:4px}.tm-aud-wrap .tm-audt-fila .tm-aud-opt{font-size:.88rem;padding:11px 0}}'
  ].join('');

  function tmAudTonalidadEngine(containerId, opciones) {
    var conCompas = !!(opciones && opciones.compas);
    var modo = conCompas ? 'mixto' : opciones && (opciones.modo === 'menor' || opciones.modo === 'mixto') ? opciones.modo : 'mayor';
    var mixto = modo === 'mixto', deQue = mixto ? '' : ' ' + MODO_TXT[modo];   // «¿Qué tonalidad es?» / «¿Qué tonalidad mayor es?»
    var M = window.tmAudModo;
    M.injectCSS();
    if (!document.getElementById('tm-audt-css')) { var st = document.createElement('style'); st.id = 'tm-audt-css'; st.textContent = CSS_EXTRA; document.head.appendChild(st); }
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-aud-wrap';
    var uid = containerId;
    var n, aciertos, mel, escuchas, respondido, sonando = 0, timer = 0, gen = 0, orden = [], ordenC = [], nivel = NIVELES[0];
    var selL = '', selA = null, selM = mixto ? '' : modo, selC = -1;
    var queSe = conCompas ? T('¿En qué compás y en qué tonalidad está?', 'What time signature and key is it in?') : T('¿En qué tonalidad' + deQue + ' está?', 'What' + deQue + ' key is it in?');
    var $ = function (s) { return document.getElementById(uid + s); };

    function inicio() {
      wrap.innerHTML = '<div class="tm-card"><div class="tm-aud-ini">' +
        (conCompas ? '<h2 class="tm-aud-tit">' + T('¿Qué compás y qué tonalidad? — ' + TOTAL + ' melodías', 'Which time signature and key? — ' + TOTAL + ' melodies') + '</h2>' +
        '<p class="tm-aud-sub">' + T('Primero suena el <strong>La4</strong> de referencia y después una melodía de 8 compases al piano. Di en qué <strong>compás</strong> está (2/4, 3/4, 4/4, 6/8, 9/8 o 12/8) y en qué <strong>tonalidad</strong>, con el constructor: nota, alteración y modo. Solo cuenta como acierto si están bien las dos cosas. Las enarmónicas valen. Puedes escuchar cada melodía hasta ' + MAX_ESCUCHAS + ' veces y responder mientras suena. Los seis compases salen en todos los niveles; lo que cambia es la tonalidad. Elige el nivel para empezar:',
          'First the reference <strong>A4</strong> sounds, then an 8-measure melody on the piano. Say which <strong>time signature</strong> it is in (2/4, 3/4, 4/4, 6/8, 9/8 or 12/8) and which <strong>key</strong>, using the builder: note, accidental and mode. It only counts as correct if both are right. Enharmonic keys count. You can listen to each melody up to ' + MAX_ESCUCHAS + ' times and answer while it plays. All six time signatures appear at every level; what changes is the key. Choose a level to start:') + '</p>' :
        '<h2 class="tm-aud-tit">' + T('¿Qué tonalidad' + deQue + ' es? — ' + TOTAL + ' melodías', 'Which' + deQue + ' key is it? — ' + TOTAL + ' melodies') + '</h2>' +
        '<p class="tm-aud-sub">' + T('Primero suena el <strong>La4</strong> de referencia y después una melodía de 8 compases al piano en una tonalidad ' + (mixto ? 'mayor o menor' : modo) + '. Escríbela con el constructor: ' + (mixto ? 'nota, alteración y modo.' : 'nota y alteración.') + ' Las enarmónicas valen (' + EJEMPLO[modo] + ' suenan igual). Puedes escuchar cada melodía hasta ' + MAX_ESCUCHAS + ' veces y responder mientras suena. Elige el nivel para empezar:',
          'First the reference <strong>A4</strong> sounds, then an 8-measure melody on the piano in a ' + (mixto ? 'major or minor' : MODO_TXT[modo]) + ' key. Build it with the builder: ' + (mixto ? 'note, accidental and mode.' : 'note and accidental.') + ' Enharmonic keys count (' + EJEMPLO[modo] + ' sound the same). You can listen to each melody up to ' + MAX_ESCUCHAS + ' times and answer while it plays. Choose a level to start:') + '</p>') +
        '<div class="tm-audt-niveles" role="group" aria-label="' + T('Nivel', 'Level') + '">' + NIVELES.map(function (v, i) {
          return '<button class="tm-aud-opt tm-audt-niv" type="button" data-n="' + i + '"><b>' + v.nombre + '</b><span>' + v.desc + '</span></button>';
        }).join('') + '</div></div></div>';
      Array.prototype.forEach.call(wrap.querySelectorAll('.tm-audt-niv'), function (b) {
        b.addEventListener('click', function () { empezar(NIVELES[+b.dataset.n]); });
      });
    }
    function empezar(v) {
      nivel = v; n = 0; aciertos = 0;
      if (window.tmNotacion) window.tmNotacion.listo().catch(function () {});   // la partitura (Verovio) se va cargando mientras se escucha
      orden = ordenTest(v, modo);
      if (conCompas) ordenC = ordenCompases(TOTAL);
      montar(); siguiente();
    }
    function montar() {
      wrap.innerHTML = '<div class="tm-card">' +
        '<div class="tm-aud-head"><div class="tm-aud-prog"><div class="tm-aud-bar"><div class="tm-aud-fill" id="' + uid + '_fill"></div></div>' +
        '<span class="tm-aud-cnt" id="' + uid + '_cnt"></span></div><span class="tm-aud-badge" id="' + uid + '_badge">✓ 0</span></div>' +
        '<div class="tm-aud-play"><button class="tm-aud-btnplay" id="' + uid + '_play" type="button"></button>' +
        '<p class="tm-aud-estado" id="' + uid + '_estado" aria-live="polite"></p></div>' +
        '<div class="tm-audt-prev" id="' + uid + '_prev" aria-live="polite">…</div>' +
        (conCompas ? '<p class="tm-audt-lbl">' + T('Compás', 'Time signature') + '</p><div class="tm-audt-fila tm-audt-comps" role="group" aria-label="' + T('Compás', 'Time signature') + '">' +
          window.tmAudCompas.COMPASES.map(function (c, i) { return '<button class="tm-aud-opt" type="button" data-c="' + i + '" aria-label="' + c.num + T(' por ', ' over ') + c.den + '">' + nomC(c) + '</button>'; }).join('') + '</div>' +
          '<p class="tm-audt-lbl">' + T('Tonalidad · 1 · Nota', 'Key · 1 · Note') + '</p>' : '<p class="tm-audt-lbl">' + T('1 · Nota', '1 · Note') + '</p>') +
        '<div class="tm-audt-fila tm-audt-notas" role="group" aria-label="' + T('Nota', 'Note') + '">' +
        LETRAS.map(function (l) { return '<button class="tm-aud-opt" type="button" data-l="' + l + '">' + NOMBRE[l] + '</button>'; }).join('') + '</div>' +
        '<p class="tm-audt-lbl">' + T('2 · Alteración', '2 · Accidental') + '</p><div class="tm-audt-fila tm-audt-alts" role="group" aria-label="' + T('Alteración', 'Accidental') + '">' +
        [[-1, '♭', T('bemol', 'flat')], [0, '—', T('sin alteración', 'natural')], [1, '♯', T('sostenido', 'sharp')]].map(function (x) {
          return '<button class="tm-aud-opt" type="button" data-a="' + x[0] + '" aria-label="' + x[2] + '">' + x[1] + '</button>';
        }).join('') + '</div>' +
        (mixto ? '<p class="tm-audt-lbl">' + T('3 · Modo', '3 · Mode') + '</p><div class="tm-audt-fila tm-audt-modos" role="group" aria-label="' + T('Modo', 'Mode') + '">' +
          '<button class="tm-aud-opt" type="button" data-m="mayor">' + T('Mayor', 'Major') + '</button><button class="tm-aud-opt" type="button" data-m="menor">' + T('menor', 'minor') + '</button></div>' : '') +
        '<button class="tm-audt-resp" id="' + uid + '_resp" type="button">' + (conCompas ? T('Corregir', 'Check') : T('Responder', 'Answer')) + '</button>' +
        '<div class="tm-aud-fb" id="' + uid + '_fb"></div>' +
        '<div class="tm-aud-part" id="' + uid + '_part"></div>' +
        '<div class="tm-aud-acc" id="' + uid + '_acc"><button class="tm-aud-sec" id="' + uid + '_otra" type="button">' + T('▶ Escuchar otra vez', '▶ Listen again') + '</button>' +
        '<button class="tm-aud-nxt" id="' + uid + '_nxt" type="button">' + T('Siguiente →', 'Next →') + '</button></div></div>';
      $('_play').addEventListener('click', function () { if (!respondido && escuchas < MAX_ESCUCHAS) { escuchas++; tocar(); } });
      $('_otra').addEventListener('click', tocar);
      $('_nxt').addEventListener('click', siguiente);
      $('_resp').addEventListener('click', responder);
      botonesNota().forEach(function (b) { b.addEventListener('click', function () { selL = b.dataset.l; selA = null; refrescar(); }); });
      botonesAlt().forEach(function (b) { b.addEventListener('click', function () { selA = +b.dataset.a; refrescar(); }); });
      botonesModo().forEach(function (b) { b.addEventListener('click', function () { selM = b.dataset.m; refrescar(); }); });
      botonesComp().forEach(function (b) { b.addEventListener('click', function () { selC = +b.dataset.c; refrescar(); }); });
    }
    var botonesComp = function () { return Array.prototype.slice.call(wrap.querySelectorAll('.tm-audt-comps .tm-aud-opt')); };
    var botonesNota = function () { return Array.prototype.slice.call(wrap.querySelectorAll('.tm-audt-notas .tm-aud-opt')); };
    var botonesAlt = function () { return Array.prototype.slice.call(wrap.querySelectorAll('.tm-audt-alts .tm-aud-opt')); };
    var botonesModo = function () { return Array.prototype.slice.call(wrap.querySelectorAll('.tm-audt-modos .tm-aud-opt')); };
    /* el constructor: se puede usar en cuanto empieza a sonar */
    function refrescar() {
      var activo = !respondido && escuchas > 0;
      botonesNota().forEach(function (b) { b.disabled = !activo; b.classList.toggle('tm-on', b.dataset.l === selL); });
      botonesAlt().forEach(function (b) { b.disabled = !activo || !selL; b.classList.toggle('tm-on', selA !== null && +b.dataset.a === selA); });
      botonesModo().forEach(function (b) { b.disabled = !activo; b.classList.toggle('tm-on', b.dataset.m === selM); });
      botonesComp().forEach(function (b) { b.disabled = !activo; b.classList.toggle('tm-on', +b.dataset.c === selC); });
      // con compás, Corregir se puede pulsar desde que empieza a sonar: si falta algo, lo dice
      $('_resp').disabled = !activo || (!conCompas && (!selL || selA === null || !selM));
      $('_resp').style.display = respondido ? 'none' : '';
      if (!respondido) $('_prev').textContent = (conCompas ? (selC >= 0 ? nomC(window.tmAudCompas.COMPASES[selC]) : '…') + ' · ' : '') + (selL ? NOMBRE[selL] + (selA === null ? '' : alt(selA)) : '…') + (selM && (selA !== null || mixto) ? ' ' + MODO_TXT[selM] : '');
    }
    function siguiente() {
      parar();
      if (n >= TOTAL) { resultado(); return; }
      n++; escuchas = 0; respondido = false; selL = ''; selA = null; selM = mixto ? '' : modo; selC = -1;
      mel = generar(orden[n - 1], orden[n - 1].modo, conCompas ? ordenC[n - 1] : null);
      $('_fill').style.width = ((n - 1) / TOTAL * 100) + '%';
      $('_cnt').textContent = nivel.nombre + T(' · Melodía ' + n + ' de ' + TOTAL, ' · Melody ' + n + ' of ' + TOTAL);
      $('_fb').className = 'tm-aud-fb'; $('_part').className = 'tm-aud-part'; $('_acc').className = 'tm-aud-acc';
      $('_prev').className = 'tm-audt-prev';
      botonesNota().concat(botonesAlt(), botonesModo(), botonesComp()).forEach(function (b) { b.className = 'tm-aud-opt'; });
      $('_estado').textContent = T('Pulsa para escuchar: primero el La4 y después la melodía.', 'Press to listen: first the A4, then the melody.');
      refrescar(); actualizarPlay();
    }
    function actualizarPlay() {
      var b = $('_play'), quedan = MAX_ESCUCHAS - escuchas;
      if (respondido) { b.style.display = 'none'; return; }
      b.style.display = '';
      b.disabled = !!sonando || quedan <= 0;
      b.textContent = sonando ? T('Sonando…', 'Playing…') : escuchas === 0 ? T('▶ Escuchar', '▶ Listen') : quedan > 0 ? T('▶ Escuchar otra vez (' + quedan + (quedan === 1 ? ' vez más)' : ' veces más)'), '▶ Listen again (' + quedan + (quedan === 1 ? ' more time)' : ' more times)')) : T('Sin más escuchas', 'No listens left');
    }
    function parar() { gen++; clearTimeout(timer); sonando = 0; if (window.tmPiano && window.tmPiano.stopAll) window.tmPiano.stopAll(); }
    /* La4, una pausa y la melodía */
    function tocar() {
      parar();
      var g = gen, ev = [{ midi: LA4, when: 0, dur: 1.1 }].concat(mel.ev.map(function (e) { return { midi: e.midi, when: e.when + PAUSA, dur: e.dur }; }));
      sonando = 1; actualizarPlay(); refrescar();
      $('_estado').textContent = respondido ? '' : T('Suena el La4…', 'The A4 is playing…');
      window.tmPiano.playEvents(ev).then(function (d) {
        if (g !== gen) return;
        if (!d) {   // sin sonido (no cargan las muestras o el navegador no deja): no gasta la escucha
          sonando = 0; escuchas--; actualizarPlay(); refrescar();
          $('_estado').textContent = T('No se ha podido reproducir el sonido. Comprueba la conexión y vuelve a pulsar.', 'The sound could not be played. Check your connection and press again.');
          return;
        }
        timer = setTimeout(function () { if (g === gen && !respondido) $('_estado').textContent = T('Suena la melodía…', 'The melody is playing…'); }, PAUSA * 1000);
        setTimeout(function () {
          if (g !== gen) return;
          sonando = 0;
          if (!respondido) $('_estado').textContent = escuchas < MAX_ESCUCHAS ? queSe : T('Ya no quedan escuchas: ¿e' + queSe.slice(2), 'No listens left: ' + queSe.charAt(0).toLowerCase() + queSe.slice(1));
          actualizarPlay();
        }, (PAUSA + mel.dur + 0.4) * 1000);
      });
    }
    function responder() {
      if (conCompas && !respondido && escuchas > 0) {
        var falta = [selC < 0 && T('el compás', 'the time signature'), !selL && T('la nota', 'the note'), selL && selA === null && T('la alteración (— si no lleva)', 'the accidental (— if none)'), !selM && T('el modo', 'the mode')].filter(Boolean);
        if (falta.length) {
          $('_estado').textContent = T('Te falta elegir ', 'You still need to choose ') + (falta.length > 1 ? falta.slice(0, -1).join(', ') + T(' y ', ' and ') + falta[falta.length - 1] : falta[0]) + '.';
          return;
        }
      }
      if (respondido || escuchas === 0 || !selL || selA === null || !selM || (conCompas && selC < 0)) return;
      respondido = true; parar();
      var t = mel.tono, real = mel.modo, nombre = nombreTono(t.l, t.a, real), dicho = nombreTono(selL, selA, selM);
      var tonicaOk = pc(selL, selA) === t.m % 12, modoOk = selM === real, tonOk = tonicaOk && modoOk, armDicha = armadura(selL, selA, selM);
      var C = conCompas ? window.tmAudCompas.COMPASES : null, cReal = conCompas ? C.filter(function (c) { return c.num === mel.compas.num && c.den === mel.compas.den; })[0] : null;
      var compOk = !conCompas || C[selC] === cReal, ok = tonOk && compOk;
      if (ok) aciertos++;
      $('_badge').textContent = '✓ ' + aciertos;
      var prev = $('_prev');
      prev.className = 'tm-audt-prev ' + (ok ? 'tm-ok' : 'tm-ko');
      prev.textContent = (ok ? '✓ ' : '✗ ') + (conCompas ? nomC(C[selC]) + ' · ' : '') + dicho;
      if (conCompas) botonesComp().forEach(function (b) { var cb = C[+b.dataset.c]; if (cb === cReal) b.classList.add('tm-ok'); else if (+b.dataset.c === selC) b.classList.add('tm-ko'); });
      var txt, okTodo = ok; ok = tonOk;   // primero, el texto de la tonalidad, como en los otros ejercicios
      if (!ok && tonicaOk) txt = T('<strong>✗ Casi:</strong> la tónica es correcta, pero el modo no. Estaba en <strong>' + nombre + '</strong>.', '<strong>✗ Almost:</strong> the tonic is right, but the mode is not. It was in <strong>' + nombre + '</strong>.');
      else if (!ok && esRelativa(t, real, selL, selA, selM)) {
        var rel = real === 'mayor' ? nota(t, 'mayor', 5) + ' ' + MODO_TXT.menor : nota(t, 'menor', 2) + ' ' + MODO_TXT.mayor;
        txt = T('<strong>✗ No:</strong> ' + (rel === dicho ? dicho + ' es su relativa' : dicho + ' suena como su relativa, ' + rel) + ', con la misma armadura pero otra tónica. Estaba en <strong>' + nombre + '</strong>.',
          '<strong>✗ No:</strong> ' + (rel === dicho ? dicho + ' is its relative' : dicho + ' sounds like its relative, ' + rel) + ', with the same key signature but a different tonic. It was in <strong>' + nombre + '</strong>.');
      }
      else if (!ok && modoOk && mixto) txt = T('<strong>✗ No.</strong> El modo es correcto, pero estaba en <strong>' + nombre + '</strong>.', '<strong>✗ No.</strong> The mode is right, but it was in <strong>' + nombre + '</strong>.');
      else if (!ok) txt = T('<strong>✗ No.</strong> Estaba en <strong>' + nombre + '</strong>.', '<strong>✗ No.</strong> It was in <strong>' + nombre + '</strong>.');
      else if (selL === t.l && selA === t.a) txt = T('<strong>✓ ¡Correcto!</strong> Estaba en <strong>' + nombre + '</strong>.', '<strong>✓ Correct!</strong> It was in <strong>' + nombre + '</strong>.');
      else if (Math.abs(armDicha) <= 7) txt = T('<strong>✓ ¡Correcto!</strong> La melodía estaba escrita en <strong>' + nombre + '</strong>, que suena igual que ' + dicho + ': son tonalidades enarmónicas.', '<strong>✓ Correct!</strong> The melody was written in <strong>' + nombre + '</strong>, which sounds the same as ' + dicho + ': they are enharmonic keys.');
      else txt = T('<strong>✓ Suena igual,</strong> pero ' + dicho + ' no se usa en la práctica: tendría ' + cuentaArmadura(armDicha) + '. Se escribe <strong>' + nombre + '</strong>.', '<strong>✓ Same sound,</strong> but ' + dicho + ' is not used in practice: it would have ' + cuentaArmadura(armDicha) + '. It is written <strong>' + nombre + '</strong>.');
      ok = okTodo;
      if (conCompas) {   // compás y tonalidad, cada uno con su línea
        var sinVeredicto = txt.replace(/<strong>[^<]*<\/strong>\s*/, '').replace(/<\/?strong>/g, '');
        txt = T((ok ? '<strong>✓ ¡Correcto!</strong> Compás de ' + nomC(cReal) + ' y ' + nombre + '.'
          : '<strong>✗ ' + (compOk || tonOk ? 'Solo una de las dos.' : 'No.') + '</strong> Era compás de <strong>' + nomC(cReal) + '</strong> y <strong>' + nombre + '</strong>.') +
          '<br><span style="font-weight:400"><b>Compás:</b> ' + (compOk ? '✓ ' : '✗ has dicho ' + nomC(C[selC]) + '. ') + window.tmAudCompas.explicar(cReal, compOk ? null : C[selC]) + '</span>' +
          '<br><span style="font-weight:400"><b>Tonalidad:</b> ' + (tonOk ? '✓ ' : '✗ ') + sinVeredicto.charAt(0).toUpperCase() + sinVeredicto.slice(1) + '</span>',
          (ok ? '<strong>✓ Correct!</strong> ' + nomC(cReal) + ' time and ' + nombre + '.'
          : '<strong>✗ ' + (compOk || tonOk ? 'Only one of the two.' : 'No.') + '</strong> It was <strong>' + nomC(cReal) + '</strong> time and <strong>' + nombre + '</strong>.') +
          '<br><span style="font-weight:400"><b>Time signature:</b> ' + (compOk ? '✓ ' : '✗ you said ' + nomC(C[selC]) + '. ') + window.tmAudCompas.explicar(cReal, compOk ? null : C[selC]) + '</span>' +
          '<br><span style="font-weight:400"><b>Key:</b> ' + (tonOk ? '✓ ' : '✗ ') + sinVeredicto.charAt(0).toUpperCase() + sinVeredicto.slice(1) + '</span>');
      }
      $('_fb').className = 'tm-aud-fb tm-show ' + (ok ? 'tm-ok' : 'tm-ko');
      $('_fb').innerHTML = txt + '<br><span style="font-weight:400">' + T('Armadura de ', 'Key signature of ') + nombre + ': ' + listaArmadura(t.arm) + '.' + (mixto ? T(' La 3.ª de la tónica, ' + nota(t, real, 0) + '-' + nota(t, real, 2) + ', es ' + real + '.', ' The 3rd above the tonic, ' + nota(t, real, 0) + '-' + nota(t, real, 2) + ', is ' + MODO_TXT[real] + '.') : '') + extra(t, real) + ' ' + papelDelLa(t, real) +
        (conCompas ? '' : T(' Melodía en compás de ' + mel.compas.num + '/' + mel.compas.den + '.', ' Melody in ' + mel.compas.num + '/' + mel.compas.den + ' time.')) + '</span>';
      $('_estado').textContent = '';
      refrescar(); actualizarPlay();
      var part = $('_part');
      part.className = 'tm-aud-part tm-show';
      var ancho = Math.max(240, part.clientWidth - 16), porFila = ancho < 520 ? 2 : 4, fs = M.filas(mel, porFila);
      part.innerHTML = fs.map(function (f, k) { return '<div id="' + uid + '_s' + k + '"></div>'; }).join('');
      window.tmNotacion.listo().then(function () {
        fs.forEach(function (f, k) {
          window.tmNotacion.dibujarAAncho($('_s' + k), f, ancho, { escala: 0.9, id: uid + 's' + k, alt: T('La melodía escrita en ' + nombre + ', compases ' + (k * porFila + 1) + ' a ' + (k * porFila + porFila), 'The melody written in ' + nombre + ', measures ' + (k * porFila + 1) + ' to ' + (k * porFila + porFila)) });
        });
      }).catch(function () {});
      $('_acc').className = 'tm-aud-acc tm-show';
      if (n >= TOTAL) $('_nxt').textContent = T('Ver resultado →', 'See results →');
    }
    function resultado() {
      parar();
      var sig = NIVELES[NIVELES.indexOf(nivel) + 1];
      wrap.innerHTML = '<div class="tm-card"><div class="tm-aud-score"><b>' + aciertos + '/' + TOTAL + '</b><span>' + Math.round(aciertos / TOTAL * 100) + '%</span>' +
        '<span class="tm-audt-nivres">' + nivel.nombre + ' · ' + nivel.desc.toLowerCase() + '</span></div>' +
        '<div class="tm-aud-acc tm-show"><button class="tm-aud-sec" id="' + uid + '_ini" type="button">' + T('Elegir nivel', 'Choose level') + '</button>' +
        '<button class="tm-aud-sec" id="' + uid + '_re" type="button">' + T('Repetir', 'Repeat') + '</button>' +
        (sig ? '<button class="tm-aud-nxt" id="' + uid + '_sig" type="button">' + sig.nombre + ' →</button>' : '') + '</div></div>';
      $('_ini').addEventListener('click', inicio);
      $('_re').addEventListener('click', function () { empezar(nivel); });
      if (sig) $('_sig').addEventListener('click', function () { empezar(sig); });
    }
    inicio();
  }

  window.tmAudTonalidadEngine = tmAudTonalidadEngine;
  window.tmAudTonalidad = { TONOS: TONOS, NIVELES: NIVELES, ordenTest: ordenTest, pc: pc, generar: generar, armadura: armadura, papelDelLa: papelDelLa, listaArmadura: listaArmadura, extra: extra, nombreTono: nombreTono };
})();
