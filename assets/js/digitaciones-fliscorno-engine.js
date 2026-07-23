/* Diagrama de digitaciones del fliscorno en Si♭ (3 pistones) — interactivo.
   El fliscorno (flugelhorn) es primo hermano de la trompeta: mismo sistema de tres
   pistones, misma afinación en Si♭ y misma transposición (suena un tono por debajo de
   lo escrito). Se diferencia por su tubo más cónico y ancho, que le da un timbre más
   redondo, dulce y oscuro. Pistón pulsado = dorado.
   Uso: <div id="x"></div><script>tmFliscornoEngine('x');</script>
   Digitaciones escritas Fa♯3–Do6, con sonido real de fliscorno. El marcador muestra la
   nota escrita y la que suena (una 2ª mayor por debajo). */
(function () {
  'use strict';

  // Los 3 pistones se ENCIENDEN sobre la FOTO real (viewBox 820×401): x/y = botón
  // plateado, cx = borde izq. del cuerpo del pistón (casing), que también se ilumina.
  var KEYS = [
    { id: 'V1', x: 337, y: 49, cx: 322 },
    { id: 'V2', x: 377, y: 49, cx: 362 },
    { id: 'V3', x: 417, y: 49, cx: 402 }
  ];
  var SVG_W = 820, SVG_H = 401;
  var CASING_Y = 66, CASING_W = 30, CASING_H = 150, BTN_R = 19;

  var NAMES = { V1: '1er pistón', V2: '2º pistón', V3: '3er pistón' };

  // Digitaciones estándar (trompeta en Si♭), notas ESCRITAS Fa♯3–Do6.
  // [] = al aire (ningún pistón).
  var FING = {
    'Fa#3': { keys: ['V1', 'V2', 'V3'] },
    'Sol3': { keys: ['V1', 'V3'] },
    'Sol#3':{ keys: ['V2', 'V3'] },
    'La3':  { keys: ['V1', 'V2'] },
    'La#3': { keys: ['V1'] },
    'Si3':  { keys: ['V2'] },
    'Do4':  { keys: [] },
    'Do#4': { keys: ['V1', 'V2', 'V3'] },
    'Re4':  { keys: ['V1', 'V3'] },
    'Re#4': { keys: ['V2', 'V3'] },
    'Mi4':  { keys: ['V1', 'V2'] },
    'Fa4':  { keys: ['V1'] },
    'Fa#4': { keys: ['V2'] },
    'Sol4': { keys: [] },
    'Sol#4':{ keys: ['V2', 'V3'] },
    'La4':  { keys: ['V1', 'V2'] },
    'La#4': { keys: ['V1'] },
    'Si4':  { keys: ['V2'] },
    'Do5':  { keys: [] },
    'Do#5': { keys: ['V1', 'V2'] },
    'Re5':  { keys: ['V1'] },
    'Re#5': { keys: ['V2'] },
    'Mi5':  { keys: [] },
    'Fa5':  { keys: ['V1'] },
    'Fa#5': { keys: ['V2'] },
    'Sol5': { keys: [] },
    'Sol#5':{ keys: ['V2', 'V3'] },
    'La5':  { keys: ['V1', 'V2'] },
    'La#5': { keys: ['V1'] },
    'Si5':  { keys: ['V2'] },
    'Do6':  { keys: [] }
  };
  var ORDEN = [
    'Fa#3', 'Sol3', 'Sol#3', 'La3', 'La#3', 'Si3',
    'Do4', 'Do#4', 'Re4', 'Re#4', 'Mi4', 'Fa4', 'Fa#4', 'Sol4', 'Sol#4', 'La4', 'La#4', 'Si4',
    'Do5', 'Do#5', 'Re5', 'Re#5', 'Mi5', 'Fa5', 'Fa#5', 'Sol5', 'Sol#5', 'La5', 'La#5', 'Si5', 'Do6'
  ];
  var SUB = { '3': '₃', '4': '₄', '5': '₅', '6': '₆' };
  var FLAT = {
    'Fa#3': 'Sol♭₃', 'Sol#3': 'La♭₃', 'La#3': 'Si♭₃', 'Do#4': 'Re♭₄', 'Re#4': 'Mi♭₄',
    'Fa#4': 'Sol♭₄', 'Sol#4': 'La♭₄', 'La#4': 'Si♭₄', 'Do#5': 'Re♭₅', 'Re#5': 'Mi♭₅',
    'Fa#5': 'Sol♭₅', 'Sol#5': 'La♭₅', 'La#5': 'Si♭₅', 'Do#6': 'Re♭₆'
  };
  function label(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return n;
    return m[1] + (m[2] ? '♯' : '') + SUB[m[3]];
  }
  function registro(n) {
    var i = ORDEN.indexOf(n);
    if (i >= 0 && i <= ORDEN.indexOf('Si3')) return 'Registro grave';
    if (i <= ORDEN.indexOf('Si4')) return 'Registro medio';
    return 'Registro agudo';
  }
  // combinación de pistones como texto: "1·2·3" o "al aire"
  function combo(data) {
    if (!data || !data.keys.length) return 'al aire (sin pistones)';
    return data.keys.map(function (k) { return k.slice(1); }).join('·');
  }

  var LETTER = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  var ES_FLAT = ['Do', 'Re♭', 'Re', 'Mi♭', 'Mi', 'Fa', 'Sol♭', 'Sol', 'La♭', 'La', 'Si♭', 'Si'];
  function midiOf(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return null;
    var semis = { Do: 0, Re: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 };
    return semis[m[1]] + (m[2] ? 1 : 0) + (parseInt(m[3], 10) + 1) * 12;
  }
  // La trompeta en Si♭ suena un tono (2 semitonos) por debajo de lo escrito
  function suena(n) {
    var midi = midiOf(n) - 2;
    return ES_FLAT[midi % 12] + SUB[String(Math.floor(midi / 12) - 1)];
  }
  var AUDIO_BASE = '/assets/audio/fliscorno/';
  function sampleFile(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    return m ? LETTER[m[1]] + (m[2] ? 's' : '') + m[3] : null;
  }
  function intl(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    return m ? LETTER[m[1]] + (m[2] ? '♯' : '') + m[3] : n;
  }
  function vfNote(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return null;
    var acc = m[2] ? '#' : null;
    return { key: LETTER[m[1]].toLowerCase() + (acc || '') + '/' + m[3], acc: acc };
  }

  var CSS = [
    '.tm-fl-wrap{margin:18px 0;}',
    '.tm-fl-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-fl-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-fl-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-fl-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-fl-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;}',
    '.tm-fl-photo{position:relative;max-width:520px;margin:0 auto;}',
    '.tm-fl-img{display:block;width:100%;height:auto;border-radius:6px;}',
    '.tm-fl-svg{position:absolute;inset:0;width:100%;height:100%;}',
    '.tm-fl-key .k-casing{fill:#ff9500;opacity:0;transition:opacity .15s;}',
    '.tm-fl-key.on .k-casing{opacity:.4;}',
    '.tm-fl-key .k-btn{fill:#fff;fill-opacity:.12;stroke:rgba(120,90,0,.35);stroke-width:1.5;transition:all .15s;}',
    '.tm-fl-key.on .k-btn{fill:#ff9500;fill-opacity:.92;stroke:#fff;stroke-width:3;filter:drop-shadow(0 0 7px #ff9500);}',
    '.tm-fl-key .k-num{font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;fill:#fff;fill-opacity:.45;text-anchor:middle;dominant-baseline:central;transition:all .15s;}',
    '.tm-fl-key.on .k-num{fill:#3a2b00;fill-opacity:1;}',
    '.tm-fl-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-fl-btn{min-width:46px;padding:10px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-fl-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-fl-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-fl-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-fl-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-fl-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-fl-play:hover{background:#6b5010;}',
    '.tm-fl-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-fl-staff svg{max-width:100%;height:auto;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-fl-css')) return;
    var s = document.createElement('style'); s.id = 'tm-fl-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  // Cada pistón: cuerpo del pistón (casing) + botón + número, todos dentro del
  // grupo que se ilumina al pulsar. Se dibujan ENCIMA de la foto (viewBox 820×401).
  function keyShape(k) {
    return '<g class="tm-fl-key" data-k="' + k.id + '">' +
      '<rect class="k-casing" x="' + k.cx + '" y="' + CASING_Y + '" width="' + CASING_W + '" height="' + CASING_H + '" rx="10"/>' +
      '<circle class="k-btn" cx="' + k.x + '" cy="' + k.y + '" r="' + BTN_R + '"/>' +
      '<text class="k-num" x="' + k.x + '" y="' + k.y + '">' + k.id.slice(1) + '</text></g>';
  }

  function tmFliscornoEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var keysSvg = KEYS.map(keyShape).join('');
    var btns = ORDEN.map(function (n) {
      return '<button class="tm-fl-btn" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-fl-wrap">' +
        '<div class="tm-fl-readout" id="' + uid + '_ro"><span class="tm-fl-hint">Elige una nota para ver su digitación</span></div>' +
        '<div class="tm-fl-diagram">' +
          '<div class="tm-fl-photo">' +
            '<picture><source type="image/webp" srcset="/assets/img/fliscorno/instrumento.webp">' +
            '<img class="tm-fl-img" src="/assets/img/fliscorno/instrumento.jpg" width="820" height="401" loading="lazy" alt="Fliscorno en Si bemol con la boquilla a la izquierda, los tres pistones en el centro y la campana a la derecha"></picture>' +
            '<svg class="tm-fl-svg" viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Diagrama de digitación del fliscorno sobre una fotografía real: los pistones que se pulsan se iluminan en dorado">' +
              keysSvg +
            '</svg>' +
          '</div>' +
        '</div>' +
        '<div class="tm-fl-btns">' + btns + '</div>' +
      '</div>';

    var svg = wrap.querySelector('.tm-fl-svg');
    var ro = document.getElementById(uid + '_ro');
    var audio = new Audio();

    function play(n) {
      var f = sampleFile(n);
      if (!f) return;
      try { audio.pause(); } catch (e) {}
      audio.src = AUDIO_BASE + f + '.mp3?v=2';  // v2: samples normalizados a RMS común
      audio.currentTime = 0;
      var pr = audio.play();
      if (pr && pr.catch) pr.catch(function () {});
    }

    function renderStaff(n) {
      var el = document.getElementById(uid + '_staff');
      if (!el) return;
      el.innerHTML = '';
      if (typeof Vex === 'undefined') return;
      var vn = vfNote(n); if (!vn) return;
      var V = Vex.Flow;
      var r = new V.Renderer(el, V.Renderer.Backends.SVG);
      r.resize(150, 150);
      var ctx = r.getContext(); ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(2, 34, 132);
      stave.addClef('treble').setContext(ctx).draw();
      var note = new V.StaveNote({ keys: [vn.key], duration: 'w', clef: 'treble' });
      if (vn.acc) note.addModifier(new V.Accidental(vn.acc), 0);
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([note]);
      new V.Formatter().joinVoices([voice]).format([voice], 80);
      voice.draw(ctx, stave);
      var s = el.querySelector('svg');
      if (s) {
        var vb = '0 0 150 150';
        try { var bb = s.getBBox(); if (bb && bb.height) { var p = 6; vb = (bb.x - p) + ' ' + (bb.y - p) + ' ' + (bb.width + 2 * p) + ' ' + (bb.height + 2 * p); } } catch (e) {}
        s.setAttribute('viewBox', vb);
        s.style.width = '140px'; s.style.maxWidth = '100%'; s.style.height = 'auto';
      }
    }

    function pick(n, btn) {
      wrap.querySelectorAll('.tm-fl-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = FING[n];
      svg.querySelectorAll('.tm-fl-key').forEach(function (c) { c.classList.remove('on'); });
      if (data) data.keys.forEach(function (id) {
        var c = svg.querySelector('.tm-fl-key[data-k="' + id + '"]'); if (c) c.classList.add('on');
      });
      ro.innerHTML =
        '<div class="tm-fl-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-fl-noterow"><span class="tm-fl-intl">' + label(n) + (FLAT[n] ? ' (' + FLAT[n] + ')' : '') + '</span>' +
        '<button class="tm-fl-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-fl-reg">' + intl(n) + ' · ' + registro(n) + ' · suena ' + suena(n) + '</div>' +
        '<div class="tm-fl-keysline">Pistones: ' + combo(data) + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-fl-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    wrap.querySelectorAll('.tm-fl-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmFliscornoEngine = tmFliscornoEngine;
})();
