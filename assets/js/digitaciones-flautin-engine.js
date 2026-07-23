/* Diagrama de digitaciones del flautín / piccolo (sistema Boehm) — interactivo.
   Flautín horizontal propio: cabeza de madera con embocadura a la izquierda y cuerpo
   de granadillo SIN pata (el flautín no tiene las llaves de Do/Do♯ del pie de la
   flauta). Llave plateada = abierta, llave dorada = pulsada.
   Uso: <div id="x"></div><script>tmFlautinEngine('x');</script>
   Digitaciones = las de la flauta travesera (mismo sistema Boehm, misma carta ya
   verificada en digitaciones-flauta-engine.js) para las notas escritas Re4–Do7;
   las dos notas del pie (Do4 y Do♯4) no existen en el flautín.
   El flautín TRANSPone a la octava: suena una octava POR ENCIMA de lo escrito;
   el marcador muestra ambas alturas y el audio reproduce la altura real
   (muestras de Sonatina Symphonic Orchestra). */
(function () {
  'use strict';

  var KEYS = [
    { id: 'T',   sh: 'spat',  x: 215, y: 156, w: 18, h: 11 }, // pulgar Si
    { id: 'Tb',  sh: 'spat',  x: 243, y: 163, w: 15, h: 10 }, // pulgar Si♭
    { id: 'LI',  sh: 'plate', x: 255, y: 120 },
    { id: 'LM',  sh: 'plate', x: 290, y: 120 },
    { id: 'LA',  sh: 'plate', x: 325, y: 120 },
    { id: 'LG',  sh: 'loop',  x: 352, y: 150 },               // Sol#
    { id: 'RI',  sh: 'plate', x: 415, y: 120 },
    { id: 'Tr1', sh: 'trill', x: 432, y: 94 },
    { id: 'Tr2', sh: 'trill', x: 467, y: 91 },
    { id: 'RM',  sh: 'plate', x: 450, y: 120 },
    { id: 'RA',  sh: 'plate', x: 485, y: 120 },
    { id: 'REb', sh: 'loop',  x: 505, y: 152 }                // Mi♭
  ];
  var SVG_W = 680, SVG_H = 220;

  var NAMES = {
    T: 'pulgar (Si)', Tb: 'pulgar (Si♭)', LI: 'índice izq.', LM: 'medio izq.', LA: 'anular izq.',
    LG: 'Sol♯ (meñique izq.)', RI: 'índice dcho.', RM: 'medio dcho.', RA: 'anular dcho.',
    Tr1: 'trino 1', Tr2: 'trino 2', REb: 'Mi♭ (meñique dcho.)'
  };

  // Digitaciones de la flauta (Boehm) sin las notas del pie: escritas Re4–Do7.
  var FING = {
    'Re4':  { keys: ['T', 'LI', 'LM', 'LA', 'RI', 'RM', 'RA', 'REb'] },
    'Re#4': { keys: ['T', 'LI', 'LM', 'LA', 'RI', 'RA', 'REb'] },
    'Mi4':  { keys: ['T', 'LI', 'LM', 'LA', 'RI', 'RM', 'REb'] },
    'Fa4':  { keys: ['T', 'LI', 'LM', 'LA', 'RI', 'REb'] },
    'Fa#4': { keys: ['T', 'LI', 'LM', 'LA', 'RA', 'REb'] },
    'Sol4': { keys: ['T', 'LI', 'LM', 'LA', 'REb'] },
    'Sol#4':{ keys: ['T', 'LI', 'LM', 'LA', 'LG', 'REb'] },
    'La4':  { keys: ['T', 'LI', 'LM', 'REb'] },
    'La#4': { keys: ['T', 'LI', 'RI', 'REb'] },
    'Si4':  { keys: ['T', 'LI', 'REb'] },
    'Do5':  { keys: ['LI', 'REb'] },
    'Do#5': { keys: ['REb'] },
    'Re5':  { keys: ['T', 'LI', 'LM', 'LA', 'RI', 'RM', 'RA', 'REb'] },
    'Re#5': { keys: ['T', 'LI', 'LM', 'LA', 'RI', 'RA', 'REb'] },
    'Mi5':  { keys: ['T', 'LI', 'LM', 'LA', 'RI', 'RM', 'REb'] },
    'Fa5':  { keys: ['T', 'LI', 'LM', 'LA', 'RI', 'REb'] },
    'Fa#5': { keys: ['T', 'LI', 'LM', 'LA', 'RA', 'REb'] },
    'Sol5': { keys: ['T', 'LI', 'LM', 'LA', 'REb'] },
    'Sol#5':{ keys: ['T', 'LI', 'LM', 'LA', 'LG', 'REb'] },
    'La5':  { keys: ['T', 'LI', 'LM', 'REb'] },
    'La#5': { keys: ['T', 'LI', 'RI', 'REb'] },
    'Si5':  { keys: ['T', 'LI', 'REb'] },
    'Do6':  { keys: ['LI', 'REb'] },
    'Do#6': { keys: ['REb'] },
    'Re6':  { keys: ['Tb', 'LM', 'LA', 'REb'] },
    'Re#6': { keys: ['Tb', 'LI', 'LM', 'LA', 'LG', 'RI', 'RM', 'RA', 'REb'] },
    'Mi6':  { keys: ['Tb', 'LI', 'LM', 'RI', 'RM', 'REb'] },
    'Fa6':  { keys: ['Tb', 'LI', 'LA', 'RI', 'REb'] },
    'Fa#6': { keys: ['Tb', 'LI', 'LA', 'RA', 'REb'] },
    'Sol6': { keys: ['LI', 'LM', 'LA', 'REb'] },
    'Sol#6':{ keys: ['LM', 'LA', 'LG', 'REb'] },
    'La6':  { keys: ['Tb', 'LM', 'RI', 'REb'] },
    'La#6': { keys: ['Tb', 'LI', 'Tr1', 'REb'] },
    'Si6':  { keys: ['Tb', 'LI', 'LA', 'Tr2'] },
    'Do7':  { keys: ['LI', 'LM', 'LA', 'LG', 'RI'] }
  };
  var ORDEN = [
    'Re4', 'Re#4', 'Mi4', 'Fa4', 'Fa#4', 'Sol4', 'Sol#4', 'La4', 'La#4', 'Si4',
    'Do5', 'Do#5', 'Re5', 'Re#5', 'Mi5', 'Fa5', 'Fa#5', 'Sol5', 'Sol#5', 'La5', 'La#5', 'Si5',
    'Do6', 'Do#6', 'Re6', 'Re#6', 'Mi6', 'Fa6', 'Fa#6', 'Sol6', 'Sol#6', 'La6', 'La#6', 'Si6', 'Do7'
  ];
  var SUB = { '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈' };
  var FLAT = {
    'Re#4': 'Mi♭₄', 'Sol#4': 'La♭₄', 'La#4': 'Si♭₄', 'Do#5': 'Re♭₅', 'Re#5': 'Mi♭₅',
    'Sol#5': 'La♭₅', 'La#5': 'Si♭₅', 'Do#6': 'Re♭₆', 'Re#6': 'Mi♭₆', 'Sol#6': 'La♭₆', 'La#6': 'Si♭₆'
  };
  function label(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return n;
    return m[1] + (m[2] ? '♯' : '') + SUB[m[3]];
  }
  function registro(n) {
    var o = parseInt(n.replace(/\D/g, ''), 10);
    if (o <= 4) return 'Registro grave';
    if (o === 5) return 'Registro medio';
    if (o === 6) return 'Registro agudo';
    return 'Registro agudo';
  }
  // El flautín suena una octava POR ENCIMA de lo escrito
  function suena(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return '';
    return m[1] + (m[2] ? '♯' : '') + SUB[String(parseInt(m[3], 10) + 1)];
  }

  var AUDIO_BASE = '/assets/audio/flautin/';
  var LETTER = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  function audioFile(n) {
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
    '.tm-fn-wrap{margin:18px 0;}',
    '.tm-fn-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-fn-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-fn-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-fn-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-fn-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;display:flex;justify-content:center;}',
    '.tm-fn-svg{display:block;max-width:640px;width:100%;height:auto;margin:0 auto;}',
    '.tm-fn-key .k-pad{fill:#e9eaee;stroke:#8f9199;stroke-width:1.5;}',
    '.tm-fn-key.on .k-pad{fill:#8b6914;stroke:#6b5010;}',
    '.tm-fn-key .k-ring{fill:none;stroke:#8f9199;stroke-width:1.2;}',
    '.tm-fn-key.on .k-ring{stroke:#e8dcc0;}',
    '.tm-fn-klab{font-family:Arial,Helvetica,sans-serif;font-size:11px;fill:#555;text-anchor:middle;}',
    '.tm-fn-grp{font-family:Arial,Helvetica,sans-serif;font-size:12px;fill:#8b6914;text-anchor:middle;font-weight:bold;}',
    '.tm-fn-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-fn-btn{min-width:48px;padding:10px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-fn-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-fn-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-fn-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-fn-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-fn-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-fn-play:hover{background:#6b5010;}',
    '.tm-fn-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-fn-staff svg{max-width:100%;height:auto;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-fn-css')) return;
    var s = document.createElement('style'); s.id = 'tm-fn-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function tmFlautinEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    /* Dibujo del flautín: cabeza y cuerpo de granadillo casi negro, mecánica plateada,
       SIN pata (el tubo termina tras el anular derecho). */
    var body =
      '<defs><linearGradient id="tmFnWood" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#4a453f"/><stop offset="0.3" stop-color="#2c2825"/>' +
        '<stop offset="0.6" stop-color="#1a1715"/><stop offset="1" stop-color="#0d0b0a"/>' +
      '</linearGradient><linearGradient id="tmFnMetal" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#ffffff"/><stop offset="0.35" stop-color="#e6e7ea"/>' +
        '<stop offset="0.55" stop-color="#c7c9cf"/><stop offset="1" stop-color="#a9abb2"/>' +
      '</linearGradient></defs>' +
      // cabeza de madera con corona
      '<rect x="70" y="110" width="115" height="21" rx="10" fill="url(#tmFnWood)" stroke="#0d0b0a" stroke-width="1"/>' +
      '<rect x="52" y="107" width="22" height="27" rx="7" fill="url(#tmFnWood)" stroke="#0d0b0a" stroke-width="1"/>' +
      '<rect x="72" y="113" width="110" height="2.5" rx="1" fill="#6e655c" opacity="0.7"/>' +
      // embocadura (óvalo tallado en la madera)
      '<ellipse cx="118" cy="120" rx="17" ry="10" fill="url(#tmFnWood)" stroke="#3a332c" stroke-width="1.2"/>' +
      '<ellipse cx="118" cy="120" rx="7" ry="4.5" fill="#0a0806"/>' +
      // anilla de unión cabeza-cuerpo
      '<rect x="185" y="107" width="7" height="27" rx="2" fill="#cdced3" stroke="#9a9ca3" stroke-width="0.8"/>' +
      // cuerpo (termina SIN pata tras el anular derecho)
      '<rect x="192" y="110" width="338" height="21" rx="6" fill="url(#tmFnWood)" stroke="#0d0b0a" stroke-width="1"/>' +
      '<rect x="196" y="113" width="330" height="2.5" rx="1" fill="#6e655c" opacity="0.7"/>' +
      '<rect x="524" y="108" width="7" height="25" rx="2" fill="#cdced3" stroke="#9a9ca3" stroke-width="0.8"/>' +
      '<ellipse cx="531" cy="120.5" rx="3.5" ry="10" fill="#3a322b"/>' +
      // eje longitudinal del mecanismo
      '<line x1="200" y1="108" x2="520" y2="108" stroke="#b9bbc1" stroke-width="1.6"/>' +
      // varillas: pulgar (T, Tb), Sol#, Mib, trinos
      '<line x1="215" y1="131" x2="215" y2="151" stroke="#b9bbc1" stroke-width="1.4"/>' +
      '<line x1="243" y1="131" x2="243" y2="158" stroke="#b9bbc1" stroke-width="1.4"/>' +
      '<line x1="352" y1="131" x2="352" y2="144" stroke="#b9bbc1" stroke-width="1.4"/>' +
      '<line x1="505" y1="131" x2="505" y2="146" stroke="#b9bbc1" stroke-width="1.4"/>' +
      '<line x1="432" y1="109" x2="432" y2="99" stroke="#b9bbc1" stroke-width="1.4"/>' +
      '<line x1="467" y1="109" x2="467" y2="96" stroke="#b9bbc1" stroke-width="1.4"/>' +
      // etiquetas
      '<text class="tm-fn-klab" x="118" y="150">Embocadura</text>' +
      '<text class="tm-fn-klab" x="255" y="98">Í</text><text class="tm-fn-klab" x="290" y="98">M</text><text class="tm-fn-klab" x="325" y="98">A</text>' +
      '<text class="tm-fn-klab" x="415" y="98">Í</text><text class="tm-fn-klab" x="450" y="98">M</text><text class="tm-fn-klab" x="485" y="98">A</text>' +
      '<text class="tm-fn-klab" x="432" y="80">T1</text><text class="tm-fn-klab" x="467" y="77">T2</text>' +
      '<text class="tm-fn-klab" x="208" y="180">Si</text><text class="tm-fn-klab" x="250" y="184">Si♭</text>' +
      '<text class="tm-fn-klab" x="352" y="172">Sol♯</text><text class="tm-fn-klab" x="505" y="172">Mi♭</text>' +
      '<text class="tm-fn-klab" x="600" y="124">sin pata</text>' +
      '<text class="tm-fn-grp" x="215" y="212">Pulgar</text>' +
      '<text class="tm-fn-grp" x="325" y="212">Mano izquierda</text>' +
      '<text class="tm-fn-grp" x="470" y="212">Mano derecha</text>';

    var keysSvg = KEYS.map(function (k) {
      var b;
      if (k.sh === 'plate') {
        b = '<circle class="k-pad" cx="' + k.x + '" cy="' + k.y + '" r="11"/>' +
            '<circle class="k-ring" cx="' + k.x + '" cy="' + k.y + '" r="4.5"/>';
      } else if (k.sh === 'trill') {
        b = '<circle class="k-pad" cx="' + k.x + '" cy="' + k.y + '" r="5"/>';
      } else if (k.sh === 'loop') {
        b = '<ellipse class="k-pad" cx="' + k.x + '" cy="' + k.y + '" rx="8" ry="6"/>';
      } else { // spat
        b = '<rect class="k-pad" x="' + (k.x - k.w / 2) + '" y="' + (k.y - k.h / 2) +
            '" width="' + k.w + '" height="' + k.h + '" rx="5"/>';
      }
      return '<g class="tm-fn-key" data-k="' + k.id + '">' + b + '</g>';
    }).join('');

    var btns = ORDEN.map(function (n) {
      return '<button class="tm-fn-btn" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-fn-wrap">' +
        '<div class="tm-fn-readout" id="' + uid + '_ro"><span class="tm-fn-hint">Elige una nota para ver su digitación</span></div>' +
        '<div class="tm-fn-diagram"><svg class="tm-fn-svg" viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '" role="img" aria-label="Diagrama de digitación del flautín: instrumento horizontal con la embocadura a la izquierda y el cuerpo sin pata; las llaves pulsadas se muestran en dorado">' +
          body + keysSvg +
        '</svg></div>' +
        '<div class="tm-fn-btns">' + btns + '</div>' +
      '</div>';

    var svg = wrap.querySelector('.tm-fn-svg');
    var ro = document.getElementById(uid + '_ro');
    var audio = new Audio();

    function play(n) {
      var f = audioFile(n);
      if (!f) return;
      try { audio.pause(); } catch (e) {}
      audio.src = AUDIO_BASE + f + '.mp3';
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
      wrap.querySelectorAll('.tm-fn-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = FING[n];
      svg.querySelectorAll('.tm-fn-key').forEach(function (c) { c.classList.remove('on'); });
      var nombres = [];
      if (data) data.keys.forEach(function (id) {
        var c = svg.querySelector('.tm-fn-key[data-k="' + id + '"]'); if (c) c.classList.add('on');
        if (NAMES[id]) nombres.push(NAMES[id]);
      });
      ro.innerHTML =
        '<div class="tm-fn-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-fn-noterow"><span class="tm-fn-intl">' + label(n) + (FLAT[n] ? ' (' + FLAT[n] + ')' : '') + '</span>' +
        '<button class="tm-fn-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-fn-reg">' + intl(n) + ' · ' + registro(n) + ' · suena ' + suena(n) + ' (octava aguda)</div>' +
        '<div class="tm-fn-keysline">' + (nombres.length ? nombres.join(' · ') : '—') + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-fn-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    wrap.querySelectorAll('.tm-fn-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmFlautinEngine = tmFlautinEngine;
})();
