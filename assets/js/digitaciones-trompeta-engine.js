/* Diagrama de digitaciones de la trompeta en Si♭ (3 pistones) — interactivo.
   A diferencia de la madera, el metal no tiene agujeros: la nota se elige combinando
   los TRES PISTONES (0 = al aire, y las 7 combinaciones) sobre el armónico al que
   ajusta el intérprete con los labios. Pistón pulsado = dorado.
   Uso: <div id="x"></div><script>tmTrompetaEngine('x');</script>
   Digitaciones estándar de la trompeta en Si♭, escritas Fa♯3–Do6. Es transpositor:
   suena un tono (2 semitonos) por debajo de lo escrito; el marcador muestra ambas
   alturas y el audio reproduce el sonido real. */
(function () {
  'use strict';

  // Los 3 pistones se ENCIENDEN sobre la FOTO real. Coordenadas en el sistema
  // del viewBox de la imagen (1800×982): x/y = botón (perilla plateada), cx =
  // borde izq. del cuerpo del pistón (casing) que también se ilumina.
  var KEYS = [
    { id: 'V1', x: 700, y: 338, cx: 677 },
    { id: 'V2', x: 780, y: 338, cx: 757 },
    { id: 'V3', x: 857, y: 338, cx: 834 }
  ];
  var SVG_W = 1800, SVG_H = 982;
  var CASING_Y = 380, CASING_W = 46, CASING_H = 360, BTN_R = 31;

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
  var AUDIO_BASE = '/assets/audio/trompeta/';
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
    '.tm-tr-wrap{margin:18px 0;}',
    '.tm-tr-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-tr-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-tr-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-tr-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-tr-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;}',
    '.tm-tr-photo{position:relative;max-width:520px;margin:0 auto;}',
    '.tm-tr-img{display:block;width:100%;height:auto;border-radius:6px;}',
    '.tm-tr-svg{position:absolute;inset:0;width:100%;height:100%;}',
    '.tm-tr-key .k-casing{fill:#ff9500;opacity:0;transition:opacity .15s;}',
    '.tm-tr-key.on .k-casing{opacity:.4;}',
    '.tm-tr-key .k-btn{fill:#fff;fill-opacity:.12;stroke:rgba(120,90,0,.35);stroke-width:2;transition:all .15s;}',
    '.tm-tr-key.on .k-btn{fill:#ff9500;fill-opacity:.92;stroke:#fff;stroke-width:5;filter:drop-shadow(0 0 12px #ff9500);}',
    '.tm-tr-key .k-num{font-family:Arial,Helvetica,sans-serif;font-size:34px;font-weight:bold;fill:#fff;fill-opacity:.42;text-anchor:middle;dominant-baseline:central;transition:all .15s;}',
    '.tm-tr-key.on .k-num{fill:#3a2b00;fill-opacity:1;}',
    '.tm-tr-credit{font-size:.72rem;color:#9a9a9a;text-align:center;margin-top:6px;}',
    '.tm-tr-credit a{color:inherit;}',
    '.tm-tr-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-tr-btn{min-width:46px;padding:10px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-tr-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-tr-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-tr-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-tr-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-tr-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-tr-play:hover{background:#6b5010;}',
    '.tm-tr-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-tr-staff svg{max-width:100%;height:auto;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-tr-css')) return;
    var s = document.createElement('style'); s.id = 'tm-tr-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  // Cada pistón: cuerpo del pistón (casing) + botón + número, todos dentro del
  // grupo que se ilumina al pulsar. Se dibujan ENCIMA de la foto (viewBox 1800×982).
  function keyShape(k) {
    return '<g class="tm-tr-key" data-k="' + k.id + '">' +
      '<rect class="k-casing" x="' + k.cx + '" y="' + CASING_Y + '" width="' + CASING_W + '" height="' + CASING_H + '" rx="18"/>' +
      '<circle class="k-btn" cx="' + k.x + '" cy="' + k.y + '" r="' + BTN_R + '"/>' +
      '<text class="k-num" x="' + k.x + '" y="' + k.y + '">' + k.id.slice(1) + '</text></g>';
  }

  function tmTrompetaEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var keysSvg = KEYS.map(keyShape).join('');
    var btns = ORDEN.map(function (n) {
      return '<button class="tm-tr-btn" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-tr-wrap">' +
        '<div class="tm-tr-readout" id="' + uid + '_ro"><span class="tm-tr-hint">Elige una nota para ver su digitación</span></div>' +
        '<div class="tm-tr-diagram">' +
          '<div class="tm-tr-photo">' +
            '<picture><source type="image/webp" srcset="/assets/img/trompeta/pistones.webp">' +
            '<img class="tm-tr-img" src="/assets/img/trompeta/pistones.jpg" width="1800" height="982" loading="lazy" alt="Trompeta en Si bemol con la boquilla a la izquierda, los tres pistones en el centro y la campana a la derecha"></picture>' +
            '<svg class="tm-tr-svg" viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Diagrama de digitación de la trompeta sobre una fotografía real: los pistones que se pulsan se iluminan en dorado">' +
              keysSvg +
            '</svg>' +
          '</div>' +
          '<p class="tm-tr-credit">Foto: Yamaha Corporation vía <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Trumpet_YTR-8335LA_crop.jpg" target="_blank" rel="noopener">Wikimedia Commons</a>, CC BY-SA 4.0</p>' +
        '</div>' +
        '<div class="tm-tr-btns">' + btns + '</div>' +
      '</div>';

    var svg = wrap.querySelector('.tm-tr-svg');
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
      if (s) { s.setAttribute('viewBox', '0 0 150 150'); s.style.width = '140px'; s.style.maxWidth = '100%'; s.style.height = 'auto'; }
    }

    function pick(n, btn) {
      wrap.querySelectorAll('.tm-tr-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = FING[n];
      svg.querySelectorAll('.tm-tr-key').forEach(function (c) { c.classList.remove('on'); });
      if (data) data.keys.forEach(function (id) {
        var c = svg.querySelector('.tm-tr-key[data-k="' + id + '"]'); if (c) c.classList.add('on');
      });
      ro.innerHTML =
        '<div class="tm-tr-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-tr-noterow"><span class="tm-tr-intl">' + label(n) + (FLAT[n] ? ' (' + FLAT[n] + ')' : '') + '</span>' +
        '<button class="tm-tr-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-tr-reg">' + intl(n) + ' · ' + registro(n) + ' · suena ' + suena(n) + '</div>' +
        '<div class="tm-tr-keysline">Pistones: ' + combo(data) + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-tr-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    wrap.querySelectorAll('.tm-tr-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmTrompetaEngine = tmTrompetaEngine;
})();
