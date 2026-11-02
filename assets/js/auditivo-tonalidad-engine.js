/* Motor — Ejercicio auditivo «¿Qué tonalidad mayor es?»
   Suena el La4 de referencia y después una melodía de 8 compases al piano en una tonalidad mayor; hay
   que decir cuál es, con el constructor de tonalidad (nota + alteración), como en el ejercicio de
   tonalidades vecinas: siempre están las 7 notas y las 3 alteraciones, sea cual sea el nivel.
   Tres niveles: fácil (hasta 2 alteraciones), medio (hasta 4) y difícil (todas). Las enarmónicas valen,
   porque suenan igual (Do♯ mayor = Re♭ mayor); si la respuesta es una tonalidad que no se usa
   (Sol♯ mayor, 8 sostenidos), también vale, pero se avisa de cómo se escribe.

   La melodía sale del generador de «¿Mayor o menor?» (auditivo-modo-engine.js): arpegio de la tónica
   al empezar, semicadencia en el compás 4, sensible-tónica al final y filtro de Krumhansl-Kessler que
   exige que la tonalidad buscada sea, con margen, la que se percibe. */
(function () {
  'use strict';

  var LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
  var NOMBRE = { c: 'Do', d: 'Re', e: 'Mi', f: 'Fa', g: 'Sol', a: 'La', b: 'Si' };
  var NAT = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
  var ARM_NAT = { c: 0, g: 1, d: 2, a: 3, e: 4, b: 5, f: -1 };   // armadura de la mayor sobre la nota natural
  var SOST = ['f', 'c', 'g', 'd', 'a', 'e', 'b'], BEM = ['b', 'e', 'a', 'd', 'g', 'c', 'f'];
  /* Las 15 tonalidades mayores. Tónicas entre La3 y Sol♯4, para que la melodía quede en el centro
     de la clave de sol. */
  var TONOS = [
    { l: 'c', a: 0, m: 60 }, { l: 'g', a: 0, m: 67 }, { l: 'd', a: 0, m: 62 }, { l: 'a', a: 0, m: 57 }, { l: 'e', a: 0, m: 64 },
    { l: 'b', a: 0, m: 59 }, { l: 'f', a: 1, m: 66 }, { l: 'c', a: 1, m: 61 },
    { l: 'f', a: 0, m: 65 }, { l: 'b', a: -1, m: 58 }, { l: 'e', a: -1, m: 63 }, { l: 'a', a: -1, m: 68 },
    { l: 'd', a: -1, m: 61 }, { l: 'g', a: -1, m: 66 }, { l: 'c', a: -1, m: 59 }
  ];
  TONOS.forEach(function (t) { t.arm = armadura(t.l, t.a); });
  var NIVELES = [
    { nombre: 'Fácil', desc: 'Hasta 2 alteraciones', max: 2 },
    { nombre: 'Medio', desc: 'Hasta 4 alteraciones', max: 4 },
    { nombre: 'Difícil', desc: 'Todas las tonalidades', max: 7 }
  ];
  var LA4 = 69, PAUSA = 1.6, MAX_ESCUCHAS = 3, TOTAL = 10;
  var GRADO = { 0: '1.er grado (la tónica)', 2: '2.º grado', 4: '3.er grado', 5: '4.º grado', 7: '5.º grado (la dominante)', 9: '6.º grado', 11: '7.º grado (la sensible)' };
  var ORD = ['1.er grado (la tónica)', '2.º grado', '3.er grado', '4.º grado', '5.º grado (la dominante)', '6.º grado', '7.º grado (la sensible)'];

  function armadura(l, a) { return ARM_NAT[l] + 7 * a; }
  function pc(l, a) { return (NAT[l] + a + 12) % 12; }
  function alt(a) { return a > 0 ? '♯' : a < 0 ? '♭' : ''; }
  function nombreTono(l, a) { return NOMBRE[l] + alt(a) + ' mayor'; }
  function listaArmadura(arm) {
    if (!arm) return 'sin alteraciones';
    var n = Math.abs(arm), notas = (arm > 0 ? SOST : BEM).slice(0, n).map(function (l) { return NOMBRE[l] + (arm > 0 ? '♯' : '♭'); });
    return n + (arm > 0 ? (n === 1 ? ' sostenido' : ' sostenidos') : (n === 1 ? ' bemol' : ' bemoles')) + ' (' + notas.join(', ') + ')';
  }
  function cuentaArmadura(arm) {
    var n = Math.abs(arm);
    return n + (arm > 0 ? (n === 1 ? ' sostenido' : ' sostenidos') : (n === 1 ? ' bemol' : ' bemoles'));
  }
  /* Qué es el La de referencia dentro de la tonalidad: un grado de la escala o, si no está en ella,
     qué grado lleva la letra La (La♭ o La♯) */
  function papelDelLa(t) {
    var d = (9 - pc(t.l, t.a) + 12) % 12;
    if (GRADO[d]) return 'El La de referencia es el ' + GRADO[d] + ' de ' + nombreTono(t.l, t.a) + '.';
    var g = (LETRAS.indexOf('a') - LETRAS.indexOf(t.l) + 7) % 7;
    var M = window.tmAudModo, nota = M.nombreNota(M.deletrear(t, 'mayor', g));
    return 'El La natural no está en la escala de ' + nombreTono(t.l, t.a) + ': su ' + ORD[g] + ' es ' + nota + ', medio tono ' + (nota.indexOf('♯') > 0 ? 'por encima' : 'por debajo') + ' del La.';
  }
  function barajar(a) {   // Fisher-Yates
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; }
    return a;
  }
  /* Las 10 tonalidades del test: todas las del nivel salen las mismas veces (o una de diferencia), sin
     la misma dos veces seguidas. En el difícil, 10 sonidos distintos de los 12, y la enarmónica que se
     escribe (Do♯ o Re♭, Fa♯ o Sol♭, Si o Do♭), al azar. */
  function ordenTest(nivel) {
    var lista = TONOS.filter(function (t) { return Math.abs(t.arm) <= nivel.max; });
    var grupos = {};
    lista.forEach(function (t) { var k = t.m % 12; (grupos[k] = grupos[k] || []).push(t); });
    var sonidos = Object.keys(grupos), orden;
    for (var intento = 0; intento < 100; intento++) {
      orden = [];
      while (orden.length + sonidos.length <= TOTAL) orden = orden.concat(sonidos);
      orden = barajar(orden.concat(barajar(sonidos).slice(0, TOTAL - orden.length)));
      if (orden.every(function (s, i) { return i === 0 || s !== orden[i - 1]; })) break;
    }
    return orden.map(function (s) { var g = grupos[s]; return g[Math.floor(Math.random() * g.length)]; });
  }
  function generar(tono) {
    var M = window.tmAudModo, t = { l: tono.l, a: tono.a, m: tono.m, arm: tono.arm };
    for (var k = 0; k < 400; k++) {
      var mel = M.intentar('mayor', t, M.COMPASES[Math.floor(Math.random() * M.COMPASES.length)]);
      if (mel) return mel;
    }
    throw new Error('no se ha podido generar la melodía');
  }

  var CSS_EXTRA = [
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
    '.tm-aud-wrap .tm-audt-fila .tm-aud-opt{padding:12px 2px;font-size:1rem;font-weight:700}',
    '.tm-aud-wrap .tm-audt-alts .tm-aud-opt{font-size:1.35rem;padding:8px 2px}',
    '.tm-aud-wrap .tm-audt-fila .tm-aud-opt.tm-on{border-color:#8b6914;background:#8b6914;color:#fff;opacity:1}',
    '.tm-aud-wrap .tm-audt-resp{font:inherit;width:100%;padding:14px;border-radius:6px;border:0;background:#1a1a1a;color:#fff;cursor:pointer;font-weight:700;font-size:1rem}',
    '.tm-aud-wrap .tm-audt-resp[disabled]{background:#cfc6ae;cursor:default}',
    '@media(max-width:480px){.tm-aud-wrap .tm-audt-niveles{grid-template-columns:1fr}.tm-aud-wrap .tm-audt-fila{gap:4px}.tm-aud-wrap .tm-audt-fila .tm-aud-opt{font-size:.88rem;padding:11px 0}}'
  ].join('');

  function tmAudTonalidadEngine(containerId) {
    var M = window.tmAudModo;
    M.injectCSS();
    if (!document.getElementById('tm-audt-css')) { var st = document.createElement('style'); st.id = 'tm-audt-css'; st.textContent = CSS_EXTRA; document.head.appendChild(st); }
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-aud-wrap';
    var uid = containerId;
    var n, aciertos, mel, escuchas, respondido, sonando = 0, timer = 0, gen = 0, orden = [], nivel = NIVELES[0];
    var selL = '', selA = null;
    var $ = function (s) { return document.getElementById(uid + s); };

    function inicio() {
      wrap.innerHTML = '<div class="tm-card"><div class="tm-aud-ini">' +
        '<h2 class="tm-aud-tit">¿Qué tonalidad mayor es? — ' + TOTAL + ' melodías</h2>' +
        '<p class="tm-aud-sub">Primero suena el <strong>La4</strong> de referencia y después una melodía de 8 compases al piano en una tonalidad mayor. Escríbela con el constructor: nota y alteración. Las enarmónicas valen (Do♯ mayor y Re♭ mayor suenan igual). Puedes escuchar cada melodía hasta ' + MAX_ESCUCHAS + ' veces y responder mientras suena. Elige el nivel para empezar:</p>' +
        '<div class="tm-audt-niveles" role="group" aria-label="Nivel">' + NIVELES.map(function (v, i) {
          return '<button class="tm-aud-opt tm-audt-niv" type="button" data-n="' + i + '"><b>' + v.nombre + '</b><span>' + v.desc + '</span></button>';
        }).join('') + '</div></div></div>';
      Array.prototype.forEach.call(wrap.querySelectorAll('.tm-audt-niv'), function (b) {
        b.addEventListener('click', function () { empezar(NIVELES[+b.dataset.n]); });
      });
    }
    function empezar(v) {
      nivel = v; n = 0; aciertos = 0;
      if (window.tmNotacion) window.tmNotacion.listo().catch(function () {});   // la partitura (Verovio) se va cargando mientras se escucha
      orden = ordenTest(v);
      montar(); siguiente();
    }
    function montar() {
      wrap.innerHTML = '<div class="tm-card">' +
        '<div class="tm-aud-head"><div class="tm-aud-prog"><div class="tm-aud-bar"><div class="tm-aud-fill" id="' + uid + '_fill"></div></div>' +
        '<span class="tm-aud-cnt" id="' + uid + '_cnt"></span></div><span class="tm-aud-badge" id="' + uid + '_badge">✓ 0</span></div>' +
        '<div class="tm-aud-play"><button class="tm-aud-btnplay" id="' + uid + '_play" type="button"></button>' +
        '<p class="tm-aud-estado" id="' + uid + '_estado" aria-live="polite"></p></div>' +
        '<div class="tm-audt-prev" id="' + uid + '_prev" aria-live="polite">…</div>' +
        '<p class="tm-audt-lbl">1 · Nota</p><div class="tm-audt-fila tm-audt-notas" role="group" aria-label="Nota">' +
        LETRAS.map(function (l) { return '<button class="tm-aud-opt" type="button" data-l="' + l + '">' + NOMBRE[l] + '</button>'; }).join('') + '</div>' +
        '<p class="tm-audt-lbl">2 · Alteración</p><div class="tm-audt-fila tm-audt-alts" role="group" aria-label="Alteración">' +
        [[-1, '♭', 'bemol'], [0, '—', 'sin alteración'], [1, '♯', 'sostenido']].map(function (x) {
          return '<button class="tm-aud-opt" type="button" data-a="' + x[0] + '" aria-label="' + x[2] + '">' + x[1] + '</button>';
        }).join('') + '</div>' +
        '<button class="tm-audt-resp" id="' + uid + '_resp" type="button">Responder</button>' +
        '<div class="tm-aud-fb" id="' + uid + '_fb"></div>' +
        '<div class="tm-aud-part" id="' + uid + '_part"></div>' +
        '<div class="tm-aud-acc" id="' + uid + '_acc"><button class="tm-aud-sec" id="' + uid + '_otra" type="button">▶ Escuchar otra vez</button>' +
        '<button class="tm-aud-nxt" id="' + uid + '_nxt" type="button">Siguiente →</button></div></div>';
      $('_play').addEventListener('click', function () { if (!respondido && escuchas < MAX_ESCUCHAS) { escuchas++; tocar(); } });
      $('_otra').addEventListener('click', tocar);
      $('_nxt').addEventListener('click', siguiente);
      $('_resp').addEventListener('click', responder);
      botonesNota().forEach(function (b) { b.addEventListener('click', function () { selL = b.dataset.l; selA = null; refrescar(); }); });
      botonesAlt().forEach(function (b) { b.addEventListener('click', function () { selA = +b.dataset.a; refrescar(); }); });
    }
    var botonesNota = function () { return Array.prototype.slice.call(wrap.querySelectorAll('.tm-audt-notas .tm-aud-opt')); };
    var botonesAlt = function () { return Array.prototype.slice.call(wrap.querySelectorAll('.tm-audt-alts .tm-aud-opt')); };
    /* el constructor: se puede usar en cuanto empieza a sonar */
    function refrescar() {
      var activo = !respondido && escuchas > 0;
      botonesNota().forEach(function (b) { b.disabled = !activo; b.classList.toggle('tm-on', b.dataset.l === selL); });
      botonesAlt().forEach(function (b) { b.disabled = !activo || !selL; b.classList.toggle('tm-on', selA !== null && +b.dataset.a === selA); });
      $('_resp').disabled = !activo || !selL || selA === null;
      $('_resp').style.display = respondido ? 'none' : '';
      if (!respondido) $('_prev').textContent = selL ? NOMBRE[selL] + (selA === null ? '' : alt(selA) + ' mayor') : '…';
    }
    function siguiente() {
      parar();
      if (n >= TOTAL) { resultado(); return; }
      n++; escuchas = 0; respondido = false; selL = ''; selA = null;
      mel = generar(orden[n - 1]);
      $('_fill').style.width = ((n - 1) / TOTAL * 100) + '%';
      $('_cnt').textContent = nivel.nombre + ' · Melodía ' + n + ' de ' + TOTAL;
      $('_fb').className = 'tm-aud-fb'; $('_part').className = 'tm-aud-part'; $('_acc').className = 'tm-aud-acc';
      $('_prev').className = 'tm-audt-prev';
      botonesNota().concat(botonesAlt()).forEach(function (b) { b.className = 'tm-aud-opt'; });
      $('_estado').textContent = 'Pulsa para escuchar: primero el La4 y después la melodía.';
      refrescar(); actualizarPlay();
    }
    function actualizarPlay() {
      var b = $('_play'), quedan = MAX_ESCUCHAS - escuchas;
      if (respondido) { b.style.display = 'none'; return; }
      b.style.display = '';
      b.disabled = !!sonando || quedan <= 0;
      b.textContent = sonando ? 'Sonando…' : escuchas === 0 ? '▶ Escuchar' : quedan > 0 ? '▶ Escuchar otra vez (' + quedan + (quedan === 1 ? ' vez más)' : ' veces más)') : 'Sin más escuchas';
    }
    function parar() { gen++; clearTimeout(timer); sonando = 0; if (window.tmPiano && window.tmPiano.stopAll) window.tmPiano.stopAll(); }
    /* La4, una pausa y la melodía */
    function tocar() {
      parar();
      var g = gen, ev = [{ midi: LA4, when: 0, dur: 1.1 }].concat(mel.ev.map(function (e) { return { midi: e.midi, when: e.when + PAUSA, dur: e.dur }; }));
      sonando = 1; actualizarPlay(); refrescar();
      $('_estado').textContent = respondido ? '' : 'Suena el La4…';
      window.tmPiano.playEvents(ev).then(function (d) {
        if (g !== gen) return;
        if (!d) {   // sin sonido (no cargan las muestras o el navegador no deja): no gasta la escucha
          sonando = 0; escuchas--; actualizarPlay(); refrescar();
          $('_estado').textContent = 'No se ha podido reproducir el sonido. Comprueba la conexión y vuelve a pulsar.';
          return;
        }
        timer = setTimeout(function () { if (g === gen && !respondido) $('_estado').textContent = 'Suena la melodía…'; }, PAUSA * 1000);
        setTimeout(function () {
          if (g !== gen) return;
          sonando = 0;
          if (!respondido) $('_estado').textContent = escuchas < MAX_ESCUCHAS ? '¿En qué tonalidad mayor está?' : 'Ya no quedan escuchas: ¿en qué tonalidad mayor está?';
          actualizarPlay();
        }, (PAUSA + mel.dur + 0.4) * 1000);
      });
    }
    function responder() {
      if (respondido || escuchas === 0 || !selL || selA === null) return;
      respondido = true; parar();
      var t = mel.tono, nombre = nombreTono(t.l, t.a), dicho = nombreTono(selL, selA);
      var ok = pc(selL, selA) === t.m % 12, armDicha = armadura(selL, selA);
      if (ok) aciertos++;
      $('_badge').textContent = '✓ ' + aciertos;
      var prev = $('_prev');
      prev.className = 'tm-audt-prev ' + (ok ? 'tm-ok' : 'tm-ko');
      prev.textContent = (ok ? '✓ ' : '✗ ') + dicho;
      var txt;
      if (!ok) txt = '<strong>✗ No.</strong> Estaba en <strong>' + nombre + '</strong>.';
      else if (selL === t.l && selA === t.a) txt = '<strong>✓ ¡Correcto!</strong> Estaba en <strong>' + nombre + '</strong>.';
      else if (Math.abs(armDicha) <= 7) txt = '<strong>✓ ¡Correcto!</strong> La melodía estaba escrita en <strong>' + nombre + '</strong>, que suena igual que ' + dicho + ': son tonalidades enarmónicas.';
      else txt = '<strong>✓ Suena igual,</strong> pero ' + dicho + ' no se usa en la práctica: tendría ' + cuentaArmadura(armDicha) + '. Se escribe <strong>' + nombre + '</strong>.';
      $('_fb').className = 'tm-aud-fb tm-show ' + (ok ? 'tm-ok' : 'tm-ko');
      $('_fb').innerHTML = txt + '<br><span style="font-weight:400">Armadura de ' + nombre + ': ' + listaArmadura(t.arm) + '. ' + papelDelLa(t) +
        ' Melodía en compás de ' + mel.compas.num + '/' + mel.compas.den + '.</span>';
      $('_estado').textContent = '';
      refrescar(); actualizarPlay();
      var part = $('_part');
      part.className = 'tm-aud-part tm-show';
      var ancho = Math.max(240, part.clientWidth - 16), porFila = ancho < 520 ? 2 : 4, fs = M.filas(mel, porFila);
      part.innerHTML = fs.map(function (f, k) { return '<div id="' + uid + '_s' + k + '"></div>'; }).join('');
      window.tmNotacion.listo().then(function () {
        fs.forEach(function (f, k) {
          window.tmNotacion.dibujarAAncho($('_s' + k), f, ancho, { escala: 0.9, id: uid + 's' + k, alt: 'La melodía escrita en ' + nombre + ', compases ' + (k * porFila + 1) + ' a ' + (k * porFila + porFila) });
        });
      }).catch(function () {});
      $('_acc').className = 'tm-aud-acc tm-show';
      if (n >= TOTAL) $('_nxt').textContent = 'Ver resultado →';
    }
    function resultado() {
      parar();
      var sig = NIVELES[NIVELES.indexOf(nivel) + 1];
      wrap.innerHTML = '<div class="tm-card"><div class="tm-aud-score"><b>' + aciertos + '/' + TOTAL + '</b><span>' + Math.round(aciertos / TOTAL * 100) + '%</span>' +
        '<span class="tm-audt-nivres">' + nivel.nombre + ' · ' + nivel.desc.toLowerCase() + '</span></div>' +
        '<div class="tm-aud-acc tm-show"><button class="tm-aud-sec" id="' + uid + '_ini" type="button">Elegir nivel</button>' +
        '<button class="tm-aud-sec" id="' + uid + '_re" type="button">Repetir</button>' +
        (sig ? '<button class="tm-aud-nxt" id="' + uid + '_sig" type="button">' + sig.nombre + ' →</button>' : '') + '</div></div>';
      $('_ini').addEventListener('click', inicio);
      $('_re').addEventListener('click', function () { empezar(nivel); });
      if (sig) $('_sig').addEventListener('click', function () { empezar(sig); });
    }
    inicio();
  }

  window.tmAudTonalidadEngine = tmAudTonalidadEngine;
  window.tmAudTonalidad = { TONOS: TONOS, NIVELES: NIVELES, ordenTest: ordenTest, generar: generar, armadura: armadura, papelDelLa: papelDelLa, listaArmadura: listaArmadura };
})();
