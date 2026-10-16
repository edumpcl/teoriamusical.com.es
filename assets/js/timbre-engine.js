/* Demostración del TIMBRE — /diccionario-musical/cualidades-del-sonido/
   La misma nota (La₄, 440 Hz) tocada por cinco instrumentos con nuestras muestras, y debajo los armónicos que
   componen cada sonido, MEDIDOS en esas muestras (assets/js/timbre-datos.js, generado por
   tools/medir-armonicos-timbre.js). Lo que cambia entre un instrumento y otro no es la nota ni el volumen:
   es el reparto de energía entre los armónicos.
   Uso: <div id="x"></div><script>tmTimbreEngine('x');</script>  (necesita timbre-datos.js antes) */
(function () {
  'use strict';

  /* Qué fijarse en cada instrumento. Las afirmaciones las comprueba tools/test-timbre.js contra los datos medidos. */
  var NOTAS = {
    piano: 'El ataque es percusivo y el sonido se apaga solo. Casi toda la energía está en los cuatro primeros armónicos.',
    flauta: 'Un sonido suave y limpio: los tres primeros armónicos dominan y a partir del cuarto casi no queda nada.',
    oboe: 'Es el timbre nasal: aquí el fundamental es más débil que el 2.º y el 3.º armónico, y el más fuerte es el 3.º.',
    clarinete: 'Los armónicos impares (1, 3, 5…) pesan mucho más que los pares: es lo que le da su sonido «hueco» y oscuro.',
    trompeta: 'Muchos armónicos fuertes, hasta el 11.º: de ahí su sonido brillante. Es el más «rico» de los cinco.'
  };
  var ORDEN = ['piano', 'flauta', 'oboe', 'clarinete', 'trompeta'];

  var W = 600, H = 232, X0 = 44, ANCHO = 36, HUECO = 8, BASE = 170, ALTO = 150;

  var CSS = [
    '.tm-tm-wrap{margin:18px 0;}',
    '.tm-tm-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:12px;}',
    '.tm-tm-btn{padding:10px 16px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-tm-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-tm-btn[aria-pressed="true"]{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-tm-panel{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:12px 14px;}',
    '.tm-tm-top{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:4px;}',
    '.tm-tm-nombre{font-size:1.25rem;font-weight:800;color:#1a1a1a;}',
    '.tm-tm-play{width:36px;height:36px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.9rem;cursor:pointer;line-height:1;}',
    '.tm-tm-play:hover{background:#6b5010;}',
    '.tm-tm-stat{font-size:.88rem;color:#686868;margin-left:auto;}',
    '.tm-tm-stat b{color:#1a1a1a;}',
    '.tm-tm-desc{font-size:.98rem;color:#333;margin:2px 0 8px;line-height:1.5;}',
    '.tm-tm-svg{display:block;width:100%;height:auto;max-width:640px;margin:0 auto;}',
    '.tm-tm-bar{fill:#b8860b;transition:height .25s,y .25s;}',
    '.tm-tm-bar.fund{fill:#6b5010;}',
    '.tm-tm-ax{font-family:Arial,Helvetica,sans-serif;font-size:13px;fill:#555;text-anchor:middle;}',
    '.tm-tm-axh{font-family:Arial,Helvetica,sans-serif;font-size:9.5px;fill:#777;text-anchor:middle;}',
    '.tm-tm-ay{font-family:Arial,Helvetica,sans-serif;font-size:10px;fill:#777;}',
    '.tm-tm-cap{font-size:.8rem;color:#686868;text-align:center;margin-top:6px;}',
    '@media(max-width:600px){.tm-tm-axh{display:none;}.tm-tm-ay{font-size:13px;}.tm-tm-btn{padding:9px 12px;}.tm-tm-stat{margin-left:0;}}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-tm-css')) return;
    var s = document.createElement('style'); s.id = 'tm-tm-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function fmtHz(n) { return String(Math.round(n)); }

  function tmTimbreEngine(containerId) {
    var wrap = document.getElementById(containerId);
    var D = window.tmTimbreDatos;
    if (!wrap || !D) return;
    injectCSS();
    var N = D.armonicos;

    var botones = ORDEN.map(function (id) {
      return '<button type="button" class="tm-tm-btn" data-id="' + id + '" aria-pressed="false">' + D.instrumentos[id].nombre + '</button>';
    }).join('');

    var barras = '', ejes = '';
    for (var k = 1; k <= N; k++) {
      var x = X0 + (k - 1) * (ANCHO + HUECO);
      barras += '<rect class="tm-tm-bar' + (k === 1 ? ' fund' : '') + '" data-k="' + k + '" x="' + x + '" y="' + BASE + '" width="' + ANCHO + '" height="0" rx="2"/>';
      ejes += '<text class="tm-tm-ax" x="' + (x + ANCHO / 2) + '" y="' + (BASE + 16) + '">' + k + '</text>' +
              '<text class="tm-tm-axh" x="' + (x + ANCHO / 2) + '" y="' + (BASE + 30) + '">' + fmtHz(k * D.f0) + '</text>';
    }
    wrap.innerHTML =
      '<div class="tm-tm-wrap">' +
        '<div class="tm-tm-btns" role="group" aria-label="Instrumento">' + botones + '</div>' +
        '<div class="tm-tm-panel">' +
          '<div class="tm-tm-top"><span class="tm-tm-nombre" data-r="nombre">Elige un instrumento</span>' +
            '<button type="button" class="tm-tm-play" data-r="play" aria-label="Volver a escuchar" hidden>▶</button>' +
            '<span class="tm-tm-stat" data-r="stat"></span></div>' +
          '<p class="tm-tm-desc" data-r="desc">Pulsa un instrumento: oirás el mismo ' + D.nota + ' y verás sus armónicos.</p>' +
          '<svg class="tm-tm-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Armónicos del ' + D.nota + ' (' + D.f0 + ' Hz) en el instrumento elegido">' +
            '<line x1="' + (X0 - 4) + '" y1="' + BASE + '" x2="' + (W - 4) + '" y2="' + BASE + '" stroke="#c9bfa4"/>' +
            '<text class="tm-tm-ay" x="' + (X0 - 8) + '" y="' + (BASE - ALTO + 4) + '" text-anchor="end">1</text>' +
            '<text class="tm-tm-ay" x="' + (X0 - 8) + '" y="' + (BASE + 4) + '" text-anchor="end">0</text>' +
            barras + ejes +
            '<text class="tm-tm-axh" x="' + (X0 - 36) + '" y="' + (BASE + 16) + '" text-anchor="start">n.º</text>' +
            '<text class="tm-tm-axh" x="' + (X0 - 36) + '" y="' + (BASE + 30) + '" text-anchor="start">Hz</text>' +
          '</svg>' +
          '<p class="tm-tm-cap">Armónicos del ' + D.nota + ' (' + D.f0 + ' Hz): altura de cada barra = su fuerza relativa, medida en nuestras muestras. Las cinco suenan al mismo nivel.</p>' +
        '</div>' +
      '</div>';

    var audio = new Audio();
    var actual = null;
    var q = function (r) { return wrap.querySelector('[data-r="' + r + '"]'); };

    function reproducir() {
      if (!actual) return;
      try { audio.pause(); } catch (e) {}
      audio.src = D.instrumentos[actual].ruta;
      audio.currentTime = 0;
      var pr = audio.play();
      if (pr && pr.catch) pr.catch(function () {});
    }

    function mostrar(id) {
      actual = id;
      var d = D.instrumentos[id];
      Array.prototype.forEach.call(wrap.querySelectorAll('.tm-tm-btn'), function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-id') === id ? 'true' : 'false'); });
      q('nombre').textContent = d.nombre + ' · ' + D.nota;
      q('desc').textContent = NOTAS[id];
      q('stat').innerHTML = 'Energía de armónicos impares ÷ pares: <b>' + String(d.imparesSobrePares).replace('.', ',') + '</b>';
      q('play').hidden = false;
      Array.prototype.forEach.call(wrap.querySelectorAll('.tm-tm-bar'), function (r) {
        var v = d.armonicos[Number(r.getAttribute('data-k')) - 1];
        var h = Math.max(0, v) * ALTO;
        r.setAttribute('height', h.toFixed(1));
        r.setAttribute('y', (BASE - h).toFixed(1));
      });
      wrap.querySelector('svg').setAttribute('aria-label', 'Armónicos del ' + D.nota + ' en ' + d.nombre + ': ' +
        d.armonicos.map(function (v, i) { return (i + 1) + '.º ' + Math.round(v * 100) + ' %'; }).join(', '));
      reproducir();
    }

    Array.prototype.forEach.call(wrap.querySelectorAll('.tm-tm-btn'), function (b) {
      b.addEventListener('click', function () { mostrar(b.getAttribute('data-id')); });
    });
    q('play').addEventListener('click', reproducir);
  }

  window.tmTimbreEngine = tmTimbreEngine;
})();
