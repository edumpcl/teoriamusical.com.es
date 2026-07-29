/* Diagrama de digitaciones del requinto (clarinete en Mi♭, sistema Boehm) — interactivo.
   MISMA digitación que el clarinete en Si♭ (foto real del frente + diagramas de
   meñiques y dorso, reutilizados del soprano). Transposición: suena una 3ª menor
   (3 semitonos) por ENCIMA de lo escrito. Datos = carta oficial Yamaha, Mi3–La6
   escritos; el sonido usa el banco del clarinete en Si♭ ajustado a la altura real.
   Uso: <div id="x"></div><script>tmRequintoEngine('x');</script> */
(function () {
  'use strict';

  // ── FRENTE: foto real del requinto (Yamaha YCL-881), marcadores calibrados (viewBox 221×730) ──
  var FRONT_W = 221, FRONT_H = 730;
  var FRONT_KEYS = [
    { id: 'GS',   x: 153, y: 151, r: 7 },            // Sol♯ de garganta
    { id: 'A',    x: 109, y: 135, r: 8 },            // La de garganta
    { id: 'H1',   x: 106, y: 180, r: 11, num: 1 },
    { id: 'H2',   x: 108, y: 249, r: 11, num: 2 },
    { id: 'EBBA', x: 111, y: 279, r: 7 },            // banana Mi♭/Si♭ (entre 2 y 3)
    { id: 'H3',   x: 114, y: 307, r: 11, num: 3 },
    { id: 'H4',   x: 107, y: 411, r: 11, num: 4 },
    { id: 'SLI',  x: 100, y: 498, r: 7 },            // deslizante Si/Fa♯ (entre 4 y 5)
    { id: 'H5',   x: 109, y: 472, r: 11, num: 5 },
    { id: 'H6',   x: 107, y: 527, r: 11, num: 6 }
  ];

  // ── MEÑIQUES (dibujo, idéntico al soprano: misma digitación Boehm) ──
  var PK_IZQ_VB = '0 0 200 180', PK_DER_VB = '0 0 190 130';
  var PK_IZQ = [
    { id: 'CSGS', cx: 96,  cy: 50,  w: 58, h: 26, a: -20 },
    { id: 'LFCS', cx: 120, cy: 78,  w: 58, h: 24, a: -8 },
    { id: 'LEB',  cx: 80,  cy: 92,  w: 56, h: 24, a: -13 },
    { id: 'LAB',  cx: 110, cy: 120, w: 54, h: 24, a: -5 }
  ];
  var PK_DER = [
    { id: 'RFCS', cx: 74,  cy: 40, w: 56, h: 24, a: 12 },
    { id: 'RAB',  cx: 132, cy: 50, w: 56, h: 24, a: 8 },
    { id: 'REB',  cx: 74,  cy: 82, w: 56, h: 24, a: 7 },
    { id: 'RFC',  cx: 120, cy: 90, w: 56, h: 24, a: 4 }
  ];
  function pkGrad() {
    return '<defs><linearGradient id="tmrqPkMet" x1="0" y1="0" x2="0.4" y2="1">' +
      '<stop offset="0" stop-color="#fdfdfe"/><stop offset="0.45" stop-color="#d8dae0"/>' +
      '<stop offset="0.75" stop-color="#b3b6bd"/><stop offset="1" stop-color="#9a9da5"/></linearGradient>' +
      '<linearGradient id="tmrqPkMetOn" x1="0" y1="0" x2="0.4" y2="1">' +
      '<stop offset="0" stop-color="#ffd98a"/><stop offset="0.5" stop-color="#ff9f1a"/>' +
      '<stop offset="1" stop-color="#e07d00"/></linearGradient></defs>';
  }
  function pkSpat(s) {
    var hw = s.w / 2, hh = s.h / 2;
    return '<g class="tm-rq-key" data-k="' + s.id + '" transform="translate(' + s.cx + ' ' + s.cy + ') rotate(' + s.a + ')">' +
      '<rect class="tm-rq-pk-pad" x="' + (-hw) + '" y="' + (-hh) + '" width="' + s.w + '" height="' + s.h + '" rx="' + hh + '"/>' +
      '<rect class="tm-rq-pk-hl" x="' + (-hw + 5) + '" y="' + (-hh + 3) + '" width="' + (s.w - 10) + '" height="' + (s.h * 0.28).toFixed(1) + '" rx="' + (s.h * 0.14).toFixed(1) + '"/>' +
      '</g>';
  }
  function buildPinkySvg(list, vb, label) {
    return '<div class="tm-rq-pkcluster">' +
      '<svg class="tm-rq-pksvg" viewBox="' + vb + '" role="img" aria-label="Espátulas del ' + label + '; la que se pulsa se ilumina en dorado">' +
      pkGrad() + list.map(pkSpat).join('') + '</svg>' +
      '<p class="tm-rq-pkcap">' + label + '</p></div>';
  }
  function buildBack() {
    return '<svg class="tm-rq-backsvg" viewBox="46 104 112 158" role="img" aria-label="Parte de atrás del requinto (diagrama): la llave de registro (arriba) y el agujero del pulgar (abajo) se iluminan al usarse">' +
      pkGrad() +
      '<g class="tm-rq-key" data-k="R">' +
        '<rect class="tm-rq-pk-pad" x="70" y="118" width="62" height="20" rx="10" transform="rotate(-6 101 128)"/>' +
        '<circle class="tm-rq-pk-pad" cx="84" cy="150" r="13"/>' +
      '</g>' +
      '<g class="tm-rq-key" data-k="T"><circle class="tm-rq-holeD" cx="91" cy="222" r="21"/></g>' +
      '</svg>';
  }
  function keyShape(k) {
    var s = '<g class="tm-rq-key" data-k="' + k.id + '"><circle class="k-dot" cx="' + k.x + '" cy="' + k.y + '" r="' + k.r + '"/>';
    if (k.num) s += '<text class="k-num" x="' + k.x + '" y="' + k.y + '" style="font-size:' + (k.r + 3) + 'px">' + k.num + '</text>';
    return s + '</g>';
  }

  var NAMES = {
    R: 'registro', T: 'pulgar', A: 'La (garganta)', GS: 'Sol♯ (garganta)',
    H1: 'agujero 1', H2: 'agujero 2', H3: 'agujero 3', H4: 'agujero 4', H5: 'agujero 5', H6: 'agujero 6',
    EBBA: 'banana Mi♭/Si♭', SLI: 'deslizante Si/Fa♯',
    LEB: 'Mi/Si (meñique izq.)', LFCS: 'Fa♯/Do♯ (meñique izq.)', CSGS: 'Do♯/Sol♯ (meñique izq.)', LAB: 'La♭/Mi♭ (meñique izq.)',
    RFC: 'Fa/Do (meñique dcho.)', RAB: 'La♭/Mi♭ (meñique dcho.)',
    REB: 'Mi/Si (meñique dcho.)', RFCS: 'Fa♯/Do♯ (meñique dcho.)'
  };

  var ALL6 = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
  var FING = {
    'Mi3':  { keys: ['T'].concat(ALL6, ['LEB']) },
    'Fa3':  { keys: ['T'].concat(ALL6, ['RFC']) },
    'Fa#3': { keys: ['T'].concat(ALL6, ['LFCS']) },
    'Sol3': { keys: ['T'].concat(ALL6) },
    'Sol#3':{ keys: ['T'].concat(ALL6, ['RAB']) },
    'La3':  { keys: ['T', 'H1', 'H2', 'H3', 'H4', 'H5'] },
    'La#3': { keys: ['T', 'H1', 'H2', 'H3', 'H4'] },
    'Si3':  { keys: ['T', 'H1', 'H2', 'H3', 'H5'] },
    'Do4':  { keys: ['T', 'H1', 'H2', 'H3'] },
    'Do#4': { keys: ['T', 'H1', 'H2', 'H3', 'CSGS'] },
    'Re4':  { keys: ['T', 'H1', 'H2'] },
    'Re#4': { keys: ['T', 'H1', 'H2', 'EBBA'] },
    'Mi4':  { keys: ['T', 'H1'] },
    'Fa4':  { keys: ['T'] },
    'Fa#4': { keys: ['H1'] },
    'Sol4': { keys: [] },
    'Sol#4':{ keys: ['GS'] },
    'La4':  { keys: ['A'] },
    'La#4': { keys: ['A', 'R'] },
    'Si4':  { keys: ['R', 'T'].concat(ALL6, ['LEB']) },
    'Do5':  { keys: ['R', 'T'].concat(ALL6, ['RFC']) },
    'Do#5': { keys: ['R', 'T'].concat(ALL6, ['LFCS']) },
    'Re5':  { keys: ['R', 'T'].concat(ALL6) },
    'Re#5': { keys: ['R', 'T'].concat(ALL6, ['RAB']) },
    'Mi5':  { keys: ['R', 'T', 'H1', 'H2', 'H3', 'H4', 'H5'] },
    'Fa5':  { keys: ['R', 'T', 'H1', 'H2', 'H3', 'H4'] },
    'Fa#5': { keys: ['R', 'T', 'H1', 'H2', 'H3', 'H5'] },
    'Sol5': { keys: ['R', 'T', 'H1', 'H2', 'H3'] },
    'Sol#5':{ keys: ['R', 'T', 'H1', 'H2', 'H3', 'CSGS'] },
    'La5':  { keys: ['R', 'T', 'H1', 'H2'] },
    'La#5': { keys: ['R', 'T', 'H1', 'H2', 'EBBA'] },
    'Si5':  { keys: ['R', 'T', 'H1'] },
    'Do6':  { keys: ['R', 'T'] },
    'Do#6': { keys: ['R', 'T', 'H2', 'H3', 'H4', 'H5'] },
    'Re6':  { keys: ['R', 'T', 'H2', 'H3', 'H4', 'RAB'] },
    'Re#6': { keys: ['R', 'T', 'H2', 'H3', 'H4', 'SLI', 'RAB'] },
    'Mi6':  { keys: ['R', 'T', 'H2', 'H3', 'RAB'] },
    'Fa6':  { keys: ['R', 'T', 'H2', 'CSGS', 'RAB'] },
    'Fa#6': { keys: ['R', 'T', 'H2', 'RAB'] },
    'Sol6': { keys: ['R', 'T', 'H2', 'H4', 'H5', 'RAB'] },
    'Sol#6':{ keys: ['R', 'T', 'H2', 'H3', 'H4', 'SLI', 'RAB'] },
    'La6':  { keys: ['R', 'T', 'H2', 'H3', 'LFCS', 'RAB'] }
  };
  var ORDEN = [
    'Mi3', 'Fa3', 'Fa#3', 'Sol3', 'Sol#3', 'La3', 'La#3', 'Si3',
    'Do4', 'Do#4', 'Re4', 'Re#4', 'Mi4', 'Fa4', 'Fa#4', 'Sol4', 'Sol#4', 'La4', 'La#4', 'Si4',
    'Do5', 'Do#5', 'Re5', 'Re#5', 'Mi5', 'Fa5', 'Fa#5', 'Sol5', 'Sol#5', 'La5', 'La#5', 'Si5',
    'Do6', 'Do#6', 'Re6', 'Re#6', 'Mi6', 'Fa6', 'Fa#6', 'Sol6', 'Sol#6', 'La6'
  ];
  var SUB = { '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇' };
  var FLAT = {
    'Fa#3': 'Sol♭₃', 'Sol#3': 'La♭₃', 'La#3': 'Si♭₃', 'Do#4': 'Re♭₄', 'Re#4': 'Mi♭₄',
    'Fa#4': 'Sol♭₄', 'Sol#4': 'La♭₄', 'La#4': 'Si♭₄', 'Do#5': 'Re♭₅', 'Re#5': 'Mi♭₅',
    'Fa#5': 'Sol♭₅', 'Sol#5': 'La♭₅', 'La#5': 'Si♭₅', 'Do#6': 'Re♭₆', 'Re#6': 'Mi♭₆',
    'Fa#6': 'Sol♭₆', 'Sol#6': 'La♭₆'
  };
  function label(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return n;
    return m[1] + (m[2] ? '♯' : '') + SUB[m[3]];
  }
  function registro(n) {
    var i = ORDEN.indexOf(n);
    if (i >= 0 && i <= ORDEN.indexOf('Fa#4')) return 'Chalumeau (grave)';
    if (i <= ORDEN.indexOf('La#4')) return 'Garganta';
    if (i <= ORDEN.indexOf('Do6')) return 'Clarín (medio)';
    return 'Sobreagudo';
  }
  var LETTER = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  var ES_FLAT = ['Do', 'Re♭', 'Re', 'Mi♭', 'Mi', 'Fa', 'Sol♭', 'Sol', 'La♭', 'La', 'Si♭', 'Si'];
  function midiOf(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return null;
    var semis = { Do: 0, Re: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 };
    return semis[m[1]] + (m[2] ? 1 : 0) + (parseInt(m[3], 10) + 1) * 12;
  }
  function suena(n) {
    var midi = midiOf(n) + 3;
    return ES_FLAT[midi % 12] + SUB[String(Math.floor(midi / 12) - 1)];
  }
  var AUDIO_BASE = '/assets/audio/clarinete/';
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
    '.tm-rq-wrap{margin:18px 0;}',
    '.tm-rq-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-rq-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-rq-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-rq-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-rq-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:10px 8px;}',
    '.tm-rq-photos{display:flex;gap:16px;justify-content:center;align-items:flex-start;flex-wrap:wrap;}',
    '.tm-rq-photo{position:relative;flex:0 0 auto;}',
    '.tm-rq-front img{display:block;height:min(50vh,440px);width:auto;border-radius:6px;}',
    '.tm-rq-back{display:flex;flex-direction:column;align-items:center;gap:6px;flex:0 0 auto;align-self:center;}',
    '.tm-rq-img{display:block;border-radius:6px;}',
    '.tm-rq-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;}',
    '.tm-rq-backcap{font-size:.8rem;color:#777;max-width:180px;text-align:center;margin:0;line-height:1.3;}',
    '.tm-rq-backcap strong{color:#555;}',
    '.tm-rq-pinky{display:flex;flex-direction:column;align-items:center;flex:0 0 auto;align-self:center;gap:10px;}',
    '.tm-rq-pkcluster{display:flex;flex-direction:column;align-items:center;gap:2px;}',
    '.tm-rq-pksvg{width:min(38vw,170px);height:auto;}',
    '.tm-rq-backsvg{width:min(22vw,100px);height:auto;}',
    '.tm-rq-pk-pad{fill:url(#tmrqPkMet);stroke:#7f828a;stroke-width:1.5;transition:fill .15s,stroke .15s;}',
    '.tm-rq-key.on .tm-rq-pk-pad{fill:url(#tmrqPkMetOn);stroke:#b06a00;}',
    '.tm-rq-pk-hl{fill:#fff;opacity:.5;pointer-events:none;}',
    '.tm-rq-holeD{fill:#241f1b;stroke:#0c0a08;stroke-width:2;transition:fill .15s,stroke .15s;}',
    '.tm-rq-key.on .tm-rq-holeD{fill:#ff9500;stroke:#fff;}',
    '.tm-rq-pkcap{font-size:.8rem;color:#777;max-width:230px;text-align:center;margin:2px 0 0;line-height:1.3;}',
    '.tm-rq-key .k-dot{fill:#ff9500;fill-opacity:0;stroke:rgba(255,255,255,0);stroke-width:0;transition:all .16s;}',
    '.tm-rq-key.on .k-dot{fill:#ff9500;fill-opacity:.92;stroke:#fff;stroke-width:2.4;filter:drop-shadow(0 0 6px #ff9500);}',
    '.tm-rq-key .k-num{font-family:Arial,Helvetica,sans-serif;font-weight:bold;fill:#fff;fill-opacity:.55;text-anchor:middle;dominant-baseline:central;paint-order:stroke;stroke:#000;stroke-width:.6px;stroke-opacity:.5;transition:all .16s;pointer-events:none;}',
    '.tm-rq-key.on .k-num{fill:#3a2b00;fill-opacity:1;stroke-opacity:0;}',
    '.tm-rq-credit{font-size:.72rem;color:#9a9a9a;text-align:center;margin-top:8px;}',
    '.tm-rq-credit a{color:inherit;}',
    '.tm-rq-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-rq-btn{min-width:46px;padding:10px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-rq-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-rq-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-rq-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-rq-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-rq-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-rq-play:hover{background:#6b5010;}',
    '.tm-rq-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-rq-staff svg{max-width:100%;height:auto;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-rq-css')) return;
    var s = document.createElement('style'); s.id = 'tm-rq-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function tmRequintoEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var frontSvg = FRONT_KEYS.map(keyShape).join('');
    var pinkyIzq = buildPinkySvg(PK_IZQ, PK_IZQ_VB, 'meñique izquierdo');
    var pinkyDer = buildPinkySvg(PK_DER, PK_DER_VB, 'meñique derecho');
    var btns = ORDEN.map(function (n) {
      return '<button class="tm-rq-btn" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-rq-wrap">' +
        '<div class="tm-rq-readout" id="' + uid + '_ro"><span class="tm-rq-hint">Elige una nota para ver su digitación</span></div>' +
        '<div class="tm-rq-diagram">' +
          '<div class="tm-rq-photos">' +
            '<div class="tm-rq-photo tm-rq-front">' +
              '<picture><source type="image/webp" srcset="/assets/img/requinto/digitacion-frente.webp">' +
              '<img class="tm-rq-img" src="/assets/img/requinto/digitacion-frente.jpg" width="' + FRONT_W + '" height="' + FRONT_H + '" loading="lazy" alt="Requinto (clarinete en Mi♭) visto de frente; los agujeros y llaves que se pulsan se iluminan en dorado"></picture>' +
              '<svg class="tm-rq-svg" viewBox="0 0 ' + FRONT_W + ' ' + FRONT_H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Digitación del requinto sobre una fotografía real (cara frontal)">' + frontSvg + '</svg>' +
            '</div>' +
            '<div class="tm-rq-back">' +
              buildBack() +
              '<p class="tm-rq-backcap"><strong>Parte de atrás</strong><br>el pulgar izquierdo tapa su agujero y aprieta la <strong>llave de registro</strong> (la 12ª).</p>' +
            '</div>' +
            '<div class="tm-rq-pinky">' +
              pinkyIzq + pinkyDer +
              '<p class="tm-rq-pkcap">Los <strong>meñiques</strong>: racimos laterales que no se ven de frente.</p>' +
            '</div>' +
          '</div>' +
          '<p class="tm-rq-credit">Foto del frente: requinto Yamaha YCL-881, Yamaha Corporation vía <a href="https://commons.wikimedia.org/wiki/File:Yamaha_E-flat_clarinet_YCL-881.jpg" target="_blank" rel="noopener">Wikimedia Commons</a>, CC BY-SA 4.0. Dorso y meñiques: diagrama propio.</p>' +
        '</div>' +
        '<div class="tm-rq-btns">' + btns + '</div>' +
      '</div>';

    var ro = document.getElementById(uid + '_ro');
    var audio = new Audio();

    function play(n) {
      var f = sampleFile(n);
      if (!f) return;
      try { audio.pause(); } catch (e) {}
      audio.src = AUDIO_BASE + f + '.mp3';
      // banco de clarinete en Si♭ (suena escrito−2); +5 st lo lleva al concert del requinto (escrito+3).
      audio.preservesPitch = false;
      audio.mozPreservesPitch = false;
      audio.webkitPreservesPitch = false;
      audio.playbackRate = Math.pow(2, 5 / 12);
      audio.currentTime = 0;
      var pr = audio.play();
      if (pr && pr.catch) pr.catch(function () {});
    }

    function renderStaff(n) {
      var el = document.getElementById(uid + '_staff');
      if (!el || typeof Vex === 'undefined') return;
      el.innerHTML = '';
      var vn = vfNote(n); if (!vn) return;
      var V = Vex.Flow, r = new V.Renderer(el, V.Renderer.Backends.SVG);
      r.resize(150, 150);
      var ctx = r.getContext(); ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(2, 34, 132); stave.addClef('treble').setContext(ctx).draw();
      var note = new V.StaveNote({ keys: [vn.key], duration: 'w', clef: 'treble' });
      if (vn.acc) note.addModifier(new V.Accidental(vn.acc), 0);
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([note]);
      new V.Formatter().joinVoices([voice]).format([voice], 80); voice.draw(ctx, stave);
      var s = el.querySelector('svg');
      if (s) {
        var vb = '0 0 150 150';
        try { var bb = s.getBBox(); if (bb && bb.height) { var p = 6; vb = (bb.x - p) + ' ' + (bb.y - p) + ' ' + (bb.width + 2 * p) + ' ' + (bb.height + 2 * p); } } catch (e) {}
        s.setAttribute('viewBox', vb); s.style.width = '140px'; s.style.maxWidth = '100%'; s.style.height = 'auto';
      }
    }

    function pick(n, btn) {
      wrap.querySelectorAll('.tm-rq-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = FING[n];
      wrap.querySelectorAll('.tm-rq-key').forEach(function (c) { c.classList.remove('on'); });
      var nombres = [];
      if (data) data.keys.forEach(function (id) {
        wrap.querySelectorAll('.tm-rq-key[data-k="' + id + '"]').forEach(function (c) { c.classList.add('on'); });
        if (NAMES[id]) nombres.push(NAMES[id]);
      });
      ro.innerHTML =
        '<div class="tm-rq-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-rq-noterow"><span class="tm-rq-intl">' + label(n) + (FLAT[n] ? ' (' + FLAT[n] + ')' : '') + '</span>' +
        '<button class="tm-rq-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-rq-reg">' + intl(n) + ' · ' + registro(n) + ' · suena ' + suena(n) + '</div>' +
        '<div class="tm-rq-keysline">' + (nombres.length ? nombres.join(' · ') : 'al aire (nada pulsado)') + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-rq-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    wrap.querySelectorAll('.tm-rq-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmRequintoEngine = tmRequintoEngine;
})();
