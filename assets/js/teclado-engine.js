/* Piano completo interactivo (88 teclas, La0–Do8) con sonido.
   El sonido usa muestras de piano (cada 3 semitonos) afinadas al vuelo con Web Audio.
   Uso: <div id="x"></div><script>tmTecladoEngine('x');</script> */
(function () {
  'use strict';

  var ES = ['Do', 'Do♯/Re♭', 'Re', 'Re♯/Mi♭', 'Mi', 'Fa', 'Fa♯/Sol♭', 'Sol', 'Sol♯/La♭', 'La', 'La♯/Si♭', 'Si'];
  var EN = ['C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B'];
  var ES_WHITE = { 0: 'Do', 2: 'Re', 4: 'Mi', 5: 'Fa', 7: 'Sol', 9: 'La', 11: 'Si' };
  var WHITE = { 0: 1, 2: 1, 4: 1, 5: 1, 7: 1, 9: 1, 11: 1 };
  var SUB = { '-': '₋', '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉' };
  function sub(o) { return ('' + o).replace(/[-0-9]/g, function (d) { return SUB[d]; }); }

  var MIDI_LO = 21, MIDI_HI = 108;           /* La0 .. Do8 */
  var WW = 23, WH = 128, BW = 13, BH = 80, LABELZONE = 30;
  var SVG_H = WH + LABELZONE;

  /* ---- Audio: muestra más cercana (C, D#, F#, A cada octava) + afinado ±1 semitono ---- */
  var AUDIO_BASE = '/assets/audio/piano/';
  var SAMP = { 0: ['C', 0, 0], 1: ['C', 0, 1], 2: ['Ds', 0, -1], 3: ['Ds', 0, 0], 4: ['Ds', 0, 1], 5: ['Fs', 0, -1], 6: ['Fs', 0, 0], 7: ['Fs', 0, 1], 8: ['A', 0, -1], 9: ['A', 0, 0], 10: ['A', 0, 1], 11: ['C', 1, -1] };
  var actx = null, bufCache = {};
  function ctx() { if (!actx) { var AC = window.AudioContext || window.webkitAudioContext; if (AC) actx = new AC(); } return actx; }
  function loadBuf(file) {
    if (bufCache[file]) return bufCache[file];
    bufCache[file] = fetch(AUDIO_BASE + file + '.ogg')
      .then(function (r) { return r.arrayBuffer(); })
      .then(function (a) { return new Promise(function (res, rej) { ctx().decodeAudioData(a, res, rej); }); });
    return bufCache[file];
  }
  function playMidi(m) {
    var c = ctx(); if (!c) return;
    if (c.state === 'suspended') c.resume();
    var s = ((m % 12) + 12) % 12, oct = Math.floor(m / 12) - 1;
    var map = SAMP[s];
    var file = map[0] + (oct + map[1]);
    var rate = Math.pow(2, map[2] / 12);
    loadBuf(file).then(function (buf) {
      var src = c.createBufferSource(); src.buffer = buf; src.playbackRate.value = rate;
      var g = c.createGain(); g.gain.value = 0.85;
      src.connect(g).connect(c.destination); src.start(0);
    }).catch(function () {});
  }

  var CSS = [
    '.tm-kbd-wrap{margin:18px 0;}',
    '.tm-kbd-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:58px;display:flex;flex-direction:column;justify-content:center;}',
    '.tm-kbd-note{font-size:1.6rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-kbd-sub{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-kbd-hint{font-size:1.05rem;color:#999;font-weight:600;}',
    '.tm-kbd-svgwrap{overflow-x:auto;-webkit-overflow-scrolling:touch;border:1px solid #e8e0cc;border-radius:8px;background:#fdfcf9;}',
    '.tm-kbd-svg{display:block;height:auto;user-select:none;touch-action:manipulation;}',
    '.tm-wkey{fill:#fff;stroke:#444;stroke-width:1;cursor:pointer;}',
    '.tm-wkey:hover{fill:#f3eede;}',
    '.tm-wkey.tm-active{fill:#f0e0b8;}',
    '.tm-bkey{fill:#1a1a1a;stroke:#000;stroke-width:1;cursor:pointer;}',
    '.tm-bkey:hover{fill:#4a3a1a;}',
    '.tm-bkey.tm-active{fill:#8b6914;}',
    '.tm-klabel{font-family:Arial,Helvetica,sans-serif;font-size:9px;fill:#1a1a1a;text-anchor:middle;pointer-events:none;opacity:0;}',
    '.tm-kbd-svg.tm-show-names .tm-klabel{opacity:1;}',
    '.tm-koct{font-family:Arial,Helvetica,sans-serif;font-size:9px;fill:#8b6914;text-anchor:middle;pointer-events:none;font-weight:bold;}',
    '.tm-kbd-mid{fill:#8b6914;pointer-events:none;}',
    '.tm-kbd-btn{display:inline-block;margin-top:12px;padding:10px 16px;background:#8b6914;color:#fff;border:none;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.92rem;}',
    '.tm-kbd-btn:hover{background:#6b5010;}'
  ].join('');
  function injectCSS() { if (document.getElementById('tm-kbd-css')) return; var s = document.createElement('style'); s.id = 'tm-kbd-css'; s.textContent = CSS; document.head.appendChild(s); }

  function tmTecladoEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    /* Generar las 88 teclas */
    var whites = [], blacks = [], wi = 0;
    for (var m = MIDI_LO; m <= MIDI_HI; m++) {
      var s = m % 12, oct = Math.floor(m / 12) - 1;
      if (WHITE[s]) { whites.push({ m: m, s: s, oct: oct, wi: wi }); wi++; }
      else { blacks.push({ m: m, s: s, oct: oct, left: wi - 1 }); }
    }
    var SVG_W = whites.length * WW;

    var svgParts = ['<svg class="tm-kbd-svg" viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '" role="img" aria-label="Teclado de piano completo">'];
    whites.forEach(function (w) {
      var x = w.wi * WW;
      svgParts.push('<rect class="tm-wkey" data-m="' + w.m + '" x="' + x + '" y="0" width="' + (WW - 1) + '" height="' + WH + '" rx="2"></rect>');
      svgParts.push('<text class="tm-klabel" x="' + (x + WW / 2) + '" y="' + (WH + 12) + '">' + ES_WHITE[w.s] + '</text>');
      if (w.s === 0) {
        svgParts.push('<text class="tm-koct" x="' + (x + WW / 2) + '" y="' + (WH + 24) + '">' + w.oct + '</text>');
        if (w.m === 60) svgParts.push('<circle class="tm-kbd-mid" cx="' + (x + WW / 2) + '" cy="7" r="3.2"></circle>');
      }
    });
    blacks.forEach(function (b) {
      var x = (b.left + 1) * WW - BW / 2;
      svgParts.push('<rect class="tm-bkey" data-m="' + b.m + '" x="' + x + '" y="0" width="' + BW + '" height="' + BH + '" rx="2"></rect>');
    });
    svgParts.push('</svg>');

    wrap.innerHTML =
      '<div class="tm-kbd-wrap">' +
        '<div class="tm-kbd-readout" id="' + uid + '_ro"><span class="tm-kbd-hint">Pulsa una tecla para oírla y ver su nota</span></div>' +
        '<div class="tm-kbd-svgwrap" id="' + uid + '_sw">' + svgParts.join('') + '</div>' +
        '<div style="text-align:center"><button class="tm-kbd-btn" id="' + uid + '_toggle" type="button">Mostrar los nombres</button></div>' +
      '</div>';

    var svgEl = wrap.querySelector('.tm-kbd-svg');
    svgEl.style.width = SVG_W + 'px';
    var ro = document.getElementById(uid + '_ro');

    function readout(m) {
      var s = ((m % 12) + 12) % 12, oct = Math.floor(m / 12) - 1, isW = !!WHITE[s];
      var note, eng;
      if (isW) { note = ES[s] + sub(oct); eng = 'En inglés: ' + EN[s] + sub(oct); }
      else {
        var p = ES[s].split('/'); note = p[0] + sub(oct) + ' / ' + p[1] + sub(oct);
        eng = 'En inglés: ' + EN[s];
      }
      ro.innerHTML = '<span class="tm-kbd-note">' + note + '</span><span class="tm-kbd-sub">' + eng + '</span>';
    }

    function activate(rect) {
      svgEl.querySelectorAll('.tm-active').forEach(function (r) { r.classList.remove('tm-active'); });
      rect.classList.add('tm-active');
      var m = parseInt(rect.getAttribute('data-m'), 10);
      readout(m); playMidi(m);
    }

    svgEl.querySelectorAll('.tm-wkey,.tm-bkey').forEach(function (rect) {
      rect.addEventListener('pointerdown', function (e) { e.preventDefault(); activate(rect); });
    });

    var btn = document.getElementById(uid + '_toggle');
    btn.addEventListener('click', function () {
      var on = svgEl.classList.toggle('tm-show-names');
      btn.textContent = on ? 'Ocultar los nombres' : 'Mostrar los nombres';
    });

    /* centrar el Do central al cargar */
    var sw = document.getElementById(uid + '_sw');
    requestAnimationFrame(function () {
      var midC = svgEl.querySelector('.tm-wkey[data-m="60"]');
      if (midC && sw) {
        var scale = (svgEl.getBoundingClientRect().width || SVG_W) / SVG_W;
        var cx = (parseFloat(midC.getAttribute('x')) + WW / 2) * scale;
        sw.scrollLeft = cx - sw.clientWidth / 2;
      }
    });
  }

  window.tmTecladoEngine = tmTecladoEngine;
})();
