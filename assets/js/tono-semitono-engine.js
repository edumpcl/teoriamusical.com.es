/* Teclado para medir tonos y semitonos — /diccionario-musical/intervalos/tono-y-semitono/
   Dos octavas de piano (Do₄–Si₅). Pulsa una tecla y luego otra: suenan las dos y la página cuenta los semitonos que hay
   entre ellas y los pasa a tonos. Sobre las teclas aparece cada paso numerado (1, 2, 3…), que es justo lo que se hace al
   contar «con el dedo». Los botones de ejemplo (Mi–Fa, Do–Re, Si–Do…) eligen la pareja por ti.
   Uso: <div id="x"></div><script>tmTonoSemitonoEngine('x');</script>
   Si existe window.tmPiano (assets/js/tm-piano-audio.js) las teclas suenan con las muestras de piano del sitio. */
(function () {
  'use strict';

  var NOMBRES = ['Do', 'Do♯', 'Re', 'Re♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si'];
  var NEGRA = [false, true, false, true, false, false, true, false, true, false, true, false];
  var SUB = { 4: '₄', 5: '₅' };
  var MIDI0 = 60, N_TECLAS = 24;                  // Do4 (60) … Si5 (83)
  var BLANCA_W = 40, BLANCA_H = 150, NEGRA_W = 24, NEGRA_H = 94, MARGEN = 4;
  var INTERVALOS = ['unísono (la misma tecla)', '2ª menor', '2ª mayor', '3ª menor', '3ª mayor', '4ª justa', 'tritono (4ª aumentada o 5ª disminuida)',
    '5ª justa', '6ª menor', '6ª mayor', '7ª menor', '7ª mayor', 'octava'];
  var EJEMPLOS = [
    { txt: 'Mi → Fa', a: 64, b: 65 }, { txt: 'Si → Do', a: 71, b: 72 }, { txt: 'Do → Re', a: 60, b: 62 },
    { txt: 'Do → Mi', a: 60, b: 64 }, { txt: 'Do → Do (octava)', a: 60, b: 72 }
  ];

  function nombre(midi) {
    var i = midi - MIDI0, pc = ((midi % 12) + 12) % 12, oct = Math.floor(midi / 12) - 1;
    return NOMBRES[pc] + (SUB[oct] || oct);
  }

  /* «4 semitonos = 2 tonos», «3 semitonos = 1 tono y 1 semitono», «1 semitono». */
  function texto(n) {
    var t = Math.floor(n / 2), s = n % 2;
    var semis = n + (n === 1 ? ' semitono' : ' semitonos');
    if (n === 0) return 'ninguna distancia (la misma nota)';
    if (n === 1) return semis;
    return semis + ' = ' + (t ? t + (t === 1 ? ' tono' : ' tonos') : '') + (t && s ? ' y ' : '') + (s ? '1 semitono' : '');
  }

  var CSS = [
    '.tm-ts-wrap{margin:18px 0;}',
    '.tm-ts-ej{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:12px;}',
    '.tm-ts-bt{padding:8px 14px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.92rem;}',
    '.tm-ts-bt:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-ts-panel{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:12px 10px 8px;}',
    '.tm-ts-sc{overflow-x:auto;-webkit-overflow-scrolling:touch;}',
    '.tm-ts-svg{display:block;width:100%;min-width:460px;height:auto;max-width:720px;margin:0 auto;user-select:none;-webkit-user-select:none;}',
    '.tm-ts-k{cursor:pointer;outline:none;}',
    '.tm-ts-k:focus-visible .tm-ts-kr{stroke:#8b6914;stroke-width:3;}',
    '.tm-ts-kr.b{fill:#fffdf8;stroke:#7a6a4a;stroke-width:1.2;}',
    '.tm-ts-kr.n{fill:#2b2212;stroke:#1a1409;stroke-width:1;}',
    '.tm-ts-k:hover .tm-ts-kr.b{fill:#fdf2d8;}',
    '.tm-ts-k:hover .tm-ts-kr.n{fill:#4a3a1c;}',
    '.tm-ts-k.a .tm-ts-kr{fill:#b8860b;}',
    '.tm-ts-k.z .tm-ts-kr{fill:#6b5010;}',
    '.tm-ts-k.paso .tm-ts-kr.b{fill:#f6e3b4;}',
    '.tm-ts-k.paso .tm-ts-kr.n{fill:#8a6a14;}',
    '.tm-ts-nom{font-family:Arial,Helvetica,sans-serif;font-size:13px;fill:#555;text-anchor:middle;pointer-events:none;}',
    '.tm-ts-k.a .tm-ts-nom,.tm-ts-k.z .tm-ts-nom{fill:#fff;font-weight:bold;}',
    '.tm-ts-num{font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;text-anchor:middle;pointer-events:none;}',
    '.tm-ts-bola{fill:#fff;stroke:#8b6914;stroke-width:1.5;pointer-events:none;}',
    '.tm-ts-res{text-align:center;margin:10px 4px 2px;min-height:3.4em;}',
    '.tm-ts-res .gr{font-size:1.15rem;font-weight:800;color:#1a1a1a;}',
    '.tm-ts-res .pe{font-size:.92rem;color:#555;margin-top:2px;}',
    '.tm-ts-res .ay{font-size:.98rem;color:#686868;}',
    '.tm-ts-hint{display:none;font-size:.8rem;color:#686868;text-align:center;margin:4px 0 0;}',
    '@media(max-width:600px){.tm-ts-hint{display:block;}}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-ts-css')) return;
    var s = document.createElement('style'); s.id = 'tm-ts-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function sonar(midi) {
    try { if (window.tmPiano && window.tmPiano.playMidi) window.tmPiano.playMidi(midi); } catch (e) {}
  }

  function tmTonoSemitonoEngine(containerId) {
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    injectCSS();

    // posiciones de las teclas: blancas en fila; negras entre blancas (salvo entre Mi–Fa y Si–Do)
    var teclas = [], nBlancas = 0;
    for (var i = 0; i < N_TECLAS; i++) {
      var midi = MIDI0 + i, pc = midi % 12;
      if (!NEGRA[pc]) { teclas.push({ midi: midi, negra: false, x: MARGEN + nBlancas * BLANCA_W, w: BLANCA_W, h: BLANCA_H }); nBlancas++; }
      else teclas.push({ midi: midi, negra: true, x: MARGEN + nBlancas * BLANCA_W - NEGRA_W / 2, w: NEGRA_W, h: NEGRA_H });
    }
    var W = MARGEN * 2 + nBlancas * BLANCA_W, H = BLANCA_H + 8;

    var blancasSvg = '', negrasSvg = '';
    teclas.forEach(function (k, idx) {
      k.idx = idx;
      var nom = nombre(k.midi);
      var g = '<g class="tm-ts-k" data-midi="' + k.midi + '" role="button" tabindex="0" aria-label="' + nom + '">' +
        '<rect class="tm-ts-kr ' + (k.negra ? 'n' : 'b') + '" x="' + k.x + '" y="2" width="' + k.w + '" height="' + k.h + '" rx="' + (k.negra ? 3 : 4) + '"/>' +
        (k.negra ? '' : '<text class="tm-ts-nom" x="' + (k.x + k.w / 2) + '" y="' + (BLANCA_H - 10) + '">' + nom + '</text>') +
        '<g class="tm-ts-paso" data-paso></g></g>';
      if (k.negra) negrasSvg += g; else blancasSvg += g;
    });

    wrap.innerHTML =
      '<div class="tm-ts-wrap">' +
        '<div class="tm-ts-ej" role="group" aria-label="Ejemplos">' +
          EJEMPLOS.map(function (e, n) { return '<button type="button" class="tm-ts-bt" data-ej="' + n + '">' + e.txt + '</button>'; }).join('') +
        '</div>' +
        '<div class="tm-ts-panel">' +
          '<div class="tm-ts-sc"><svg class="tm-ts-svg" viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="Teclado de dos octavas, de Do₄ a Si₅">' + blancasSvg + negrasSvg + '</svg></div>' +
          '<p class="tm-ts-hint">Desliza el teclado hacia los lados para ver todas las teclas.</p>' +
          '<div class="tm-ts-res" aria-live="polite"></div>' +
        '</div>' +
      '</div>';

    var svg = wrap.querySelector('svg');
    var res = wrap.querySelector('.tm-ts-res');
    var porMidi = {};
    Array.prototype.forEach.call(svg.querySelectorAll('.tm-ts-k'), function (g) { porMidi[g.getAttribute('data-midi')] = g; });
    var A = null, B = null;

    function limpiar() {
      Array.prototype.forEach.call(svg.querySelectorAll('.tm-ts-k'), function (g) {
        g.classList.remove('a', 'z', 'paso');
        g.querySelector('[data-paso]').innerHTML = '';
      });
    }

    function pintar() {
      limpiar();
      if (A === null) { res.innerHTML = '<div class="ay">Pulsa una tecla para empezar y otra para medir la distancia.</div>'; return; }
      porMidi[A].classList.add('a');
      if (B === null) { res.innerHTML = '<div class="gr">' + nombre(A) + '</div><div class="ay">Ahora pulsa otra tecla.</div>'; return; }
      var n = Math.abs(B - A), paso = B > A ? 1 : -1;
      porMidi[B].classList.add('z');
      // cada tecla entre las dos, con su número de paso
      for (var k = 1; k <= n; k++) {
        var m = A + paso * k, g = porMidi[String(m)], t = teclas[m - MIDI0];
        if (k < n) g.classList.add('paso');
        var cx = t.x + t.w / 2, cy = t.negra ? NEGRA_H - 22 : BLANCA_H - 38;
        g.querySelector('[data-paso]').innerHTML = '<circle class="tm-ts-bola" cx="' + cx + '" cy="' + cy + '" r="10"/><text class="tm-ts-num" x="' + cx + '" y="' + (cy + 4.5) + '" fill="#6b5010">' + k + '</text>';
      }
      var int = n <= 12 ? INTERVALOS[n] : 'más de una octava';
      res.innerHTML = '<div class="gr">' + nombre(A) + ' → ' + nombre(B) + ': ' + texto(n) + '</div>' +
        '<div class="pe">' + (n === 0 ? int : 'Intervalo: ' + int) + (n && B < A ? ' (descendente)' : '') + '</div>';
    }

    function elegir(midi) {
      sonar(midi);
      if (A === null || B !== null) { A = midi; B = null; }
      else B = midi;   // la primera tecla ya sonó al pulsarla: se oye A y luego B
      pintar();
    }

    function pareja(a, b) {
      A = a; B = b; pintar();
      sonar(a); if (a !== b) setTimeout(function () { sonar(b); }, 650);
    }

    Array.prototype.forEach.call(svg.querySelectorAll('.tm-ts-k'), function (g) {
      var m = Number(g.getAttribute('data-midi'));
      g.addEventListener('click', function () { elegir(m); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); elegir(m); } });
    });
    Array.prototype.forEach.call(wrap.querySelectorAll('.tm-ts-bt'), function (b) {
      b.addEventListener('click', function () { var e = EJEMPLOS[Number(b.getAttribute('data-ej'))]; pareja(e.a, e.b); });
    });
    pintar();
  }

  window.tmTonoSemitonoEngine = tmTonoSemitonoEngine;
})();
