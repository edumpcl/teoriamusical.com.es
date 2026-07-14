/* Diagrama de digitaciones del trombón de varas (tenor, Si♭) — interactivo.
   Primer instrumento de VARA del cluster: no hay pistones ni agujeros, la nota se
   elige alargando o acortando la vara en una de SIETE POSICIONES y ajustando el
   armónico con los labios (igual mecánica que la trompeta, pero con vara en vez
   de pistones). El trombón NO transpone: lo escrito es exactamente lo que suena.
   Uso: <div id="x"></div><script>tmTrombonEngine('x');</script>
   Digitaciones estándar del trombón tenor, Mi2–Si♭4, calculadas desde la física real
   de la serie armónica de cada posición (verificable: 1ª posición = serie de Si♭,
   cada posición siguiente baja un semitono). */
(function () {
  'use strict';

  var MP_X = 68;           // x FIJA de la boquilla (nunca se mueve: siempre en los labios)
  var SLIDE_X0 = 105;      // x FIJA donde arranca la vara (tras la boquilla)
  var SOCKET_X = 330;      // x fija donde empieza el cuerpo fijo (vara de afinación + campana)
  var SLIDE_Y1 = 122, SLIDE_Y2 = 136; // las dos varas paralelas
  var TIP_MIN = 130, TIP_STEP = 30;   // recorrido de la punta móvil: 1ª pos. corta -> 7ª larga

  // x de la punta móvil de la vara: crece desde la boquilla hacia la campana
  // a medida que sube la posición (1ª = recogida y corta, 7ª = extendida y larga).
  function tipX(pos) { return TIP_MIN + (pos - 1) * TIP_STEP; }

  // Nota escrita -> { pos: posición de vara (1-7), harm: armónico usado }
  // NO hay transposición: escrito = sonido real.
  var FING = {
    'Mi2':  { pos: 7, harm: 2 }, 'Fa2':  { pos: 6, harm: 2 }, 'Fa#2': { pos: 5, harm: 2 },
    'Sol2': { pos: 4, harm: 2 }, 'Sol#2':{ pos: 3, harm: 2 }, 'La2':  { pos: 2, harm: 2 },
    'La#2': { pos: 1, harm: 2 },
    'Si2':  { pos: 7, harm: 3 }, 'Do3':  { pos: 6, harm: 3 }, 'Do#3': { pos: 5, harm: 3 },
    'Re3':  { pos: 4, harm: 3 }, 'Re#3': { pos: 3, harm: 3 }, 'Mi3':  { pos: 2, harm: 3 },
    'Fa3':  { pos: 1, harm: 3 },
    'Fa#3': { pos: 5, harm: 4 }, 'Sol3': { pos: 4, harm: 4 }, 'Sol#3':{ pos: 3, harm: 4 },
    'La3':  { pos: 2, harm: 4 }, 'La#3': { pos: 1, harm: 4 },
    'Si3':  { pos: 4, harm: 5 }, 'Do4':  { pos: 3, harm: 5 }, 'Do#4': { pos: 2, harm: 5 },
    'Re4':  { pos: 1, harm: 5 },
    'Re#4': { pos: 3, harm: 6 }, 'Mi4':  { pos: 2, harm: 6 }, 'Fa4':  { pos: 1, harm: 6 },
    'Fa#4': { pos: 5, harm: 8 }, 'Sol4': { pos: 4, harm: 8 }, 'Sol#4':{ pos: 3, harm: 8 },
    'La4':  { pos: 2, harm: 8 }, 'La#4': { pos: 1, harm: 8 }
  };
  var ORDEN = [
    'Mi2', 'Fa2', 'Fa#2', 'Sol2', 'Sol#2', 'La2', 'La#2',
    'Si2', 'Do3', 'Do#3', 'Re3', 'Re#3', 'Mi3', 'Fa3',
    'Fa#3', 'Sol3', 'Sol#3', 'La3', 'La#3',
    'Si3', 'Do4', 'Do#4', 'Re4', 'Re#4', 'Mi4', 'Fa4',
    'Fa#4', 'Sol4', 'Sol#4', 'La4', 'La#4'
  ];
  // Fundamental (nota al aire, 1er armónico) de cada una de las 7 posiciones
  var FUND = { 1: 'Si♭', 2: 'La', 3: 'La♭', 4: 'Sol', 5: 'Fa♯', 6: 'Fa', 7: 'Mi' };
  var ORDINAL = { 1: '1ª', 2: '2ª', 3: '3ª', 4: '4ª', 5: '5ª', 6: '6ª', 7: '7ª' };

  var SUB = { '2': '₂', '3': '₃', '4': '₄' };
  var FLAT = {
    'Fa#2': 'Sol♭₂', 'Sol#2': 'La♭₂', 'La#2': 'Si♭₂', 'Do#3': 'Re♭₃', 'Re#3': 'Mi♭₃',
    'Fa#3': 'Sol♭₃', 'Sol#3': 'La♭₃', 'La#3': 'Si♭₃', 'Do#4': 'Re♭₄', 'Re#4': 'Mi♭₄',
    'Fa#4': 'Sol♭₄', 'Sol#4': 'La♭₄', 'La#4': 'Si♭₄'
  };
  function label(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return n;
    return m[1] + (m[2] ? '♯' : '') + SUB[m[3]];
  }
  function registro(n) {
    var i = ORDEN.indexOf(n);
    if (i >= 0 && i <= ORDEN.indexOf('Si2')) return 'Registro grave';
    if (i <= ORDEN.indexOf('Si3')) return 'Registro medio';
    return 'Registro agudo';
  }

  var LETTER = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  var AUDIO_BASE = '/assets/audio/trombon/';
  var AUDIO_V = '4'; // bumpear al corregir cualquier fichero de audio (evita cache de navegador)
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
    '.tm-tb-wrap{margin:18px 0;}',
    '.tm-tb-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-tb-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-tb-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-tb-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-tb-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;display:flex;justify-content:center;}',
    '.tm-tb-svg{display:block;max-width:600px;width:100%;height:auto;margin:0 auto;}',
    '.tm-tb-tick{fill:#e9eaee;stroke:#8f9199;stroke-width:1.4;}',
    '.tm-tb-tick.on{fill:#8b6914;stroke:#6b5010;}',
    '.tm-tb-ticklab{font-family:Arial,Helvetica,sans-serif;font-size:11px;fill:#777;text-anchor:middle;}',
    '.tm-tb-ticklab.on{fill:#8b6914;font-weight:bold;}',
    '.tm-tb-klab{font-family:Arial,Helvetica,sans-serif;font-size:11px;fill:#555;text-anchor:middle;}',
    '.tm-tb-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-tb-btn{min-width:46px;padding:10px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-tb-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-tb-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-tb-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-tb-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-tb-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-tb-play:hover{background:#6b5010;}',
    '.tm-tb-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-tb-staff svg{max-width:100%;height:auto;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-tb-css')) return;
    var s = document.createElement('style'); s.id = 'tm-tb-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  // Dibujo estático: boquilla FIJA a la izquierda (nunca se mueve, siempre en
  // los labios) y cuerpo fijo (vara de afinación + campana) a la derecha. Entre
  // ambas, un carril tenue marca todo el recorrido posible y, encima, la VARA
  // móvil (dos tubos con una U de agarre en la punta) crece desde la boquilla
  // hacia la campana según la posición. Debajo, una regla con las 7 posiciones.
  var TUBE_MIDY = (SLIDE_Y1 + SLIDE_Y2) / 2;
  var DECO_FIXED =
    '<defs><linearGradient id="tmTbBrass" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#f4d06a"/><stop offset="0.4" stop-color="#d9a520"/>' +
      '<stop offset="0.75" stop-color="#b8860b"/><stop offset="1" stop-color="#7a5a08"/>' +
    '</linearGradient></defs>' +
    // boquilla fija (siempre en los labios del intérprete)
    '<circle cx="' + MP_X + '" cy="' + TUBE_MIDY + '" r="11" fill="#c8b060" stroke="#7a5a08" stroke-width="1.4"/>' +
    '<circle cx="' + MP_X + '" cy="' + TUBE_MIDY + '" r="5" fill="#5e2432"/>' +
    // tubo corto fijo (boquilla -> arranque de la vara)
    '<rect x="' + (MP_X + 9) + '" y="' + (TUBE_MIDY - 4) + '" width="' + (SLIDE_X0 - MP_X - 9) + '" height="8" rx="4" fill="url(#tmTbBrass)" stroke="#7a5a08" stroke-width="1"/>' +
    // carril fijo: todo el recorrido posible de la vara, de fondo (discontinuo para
    // distinguirlo claramente del tramo dorado = vara realmente extendida)
    '<line x1="' + SLIDE_X0 + '" y1="' + SLIDE_Y1 + '" x2="' + SOCKET_X + '" y2="' + SLIDE_Y1 + '" stroke="#cfd0d6" stroke-width="4" stroke-linecap="round" stroke-dasharray="1,5"/>' +
    '<line x1="' + SLIDE_X0 + '" y1="' + SLIDE_Y2 + '" x2="' + SOCKET_X + '" y2="' + SLIDE_Y2 + '" stroke="#cfd0d6" stroke-width="4" stroke-linecap="round" stroke-dasharray="1,5"/>' +
    // receptor fijo donde la vara entra en el cuerpo
    '<rect x="' + SOCKET_X + '" y="118" width="26" height="30" rx="6" fill="url(#tmTbBrass)" stroke="#7a5a08" stroke-width="1.2"/>' +
    // codo + vara de afinación (sube y vuelve) hacia la campana
    '<path d="M356 120 C380 110 390 90 390 66 C390 48 380 40 366 40" stroke="url(#tmTbBrass)" stroke-width="11" fill="none" stroke-linecap="round"/>' +
    '<path d="M366 40 L366 128" stroke="url(#tmTbBrass)" stroke-width="11" fill="none" stroke-linecap="round"/>' +
    '<path d="M366 128 C366 150 380 160 402 160" stroke="url(#tmTbBrass)" stroke-width="11" fill="none" stroke-linecap="round"/>' +
    // tubo hacia la campana
    '<path d="M402 160 C480 168 540 164 580 150" stroke="url(#tmTbBrass)" stroke-width="12" fill="none" stroke-linecap="round"/>' +
    // campana abocinada
    '<path d="M574 138 C620 122 658 122 676 130 L676 176 C658 184 620 184 574 168 C584 158 584 148 574 138 Z" fill="url(#tmTbBrass)" stroke="#7a5a08" stroke-width="1.2"/>' +
    '<ellipse cx="677" cy="153" rx="7" ry="24" fill="#c8960f" stroke="#7a5a08" stroke-width="1"/>' +
    // etiquetas
    '<text class="tm-tb-klab" x="68" y="100">Boquilla</text>' +
    '<text class="tm-tb-klab" x="677" y="115">Campana</text>' +
    '<text class="tm-tb-klab" x="378" y="30">Vara de afinación</text>' +
    '<text class="tm-tb-klab" x="217" y="165">Posición de la vara</text>';

  function ruler() {
    var out = '';
    for (var p = 1; p <= 7; p++) {
      var x = tipX(p);
      out += '<g class="tm-tb-tickgrp" data-pos="' + p + '">' +
        '<circle class="tm-tb-tick" cx="' + x + '" cy="185" r="9"/>' +
        '<text class="tm-tb-ticklab" x="' + x + '" y="204">' + p + '</text></g>';
    }
    return out;
  }

  function tmTrombonEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var btns = ORDEN.map(function (n) {
      return '<button class="tm-tb-btn" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-tb-wrap">' +
        '<div class="tm-tb-readout" id="' + uid + '_ro"><span class="tm-tb-hint">Elige una nota para ver su posición de vara</span></div>' +
        '<div class="tm-tb-diagram"><svg class="tm-tb-svg" id="' + uid + '_svg" viewBox="0 0 700 220" role="img" aria-label="Diagrama de digitación del trombón: la boquilla está fija a la izquierda, siempre en los labios, y la vara (dos tubos con una U de agarre en la punta) se extiende desde la boquilla hacia la campana fija de la derecha según la posición; una regla debajo señala la posición activa">' +
          DECO_FIXED +
          '<g id="' + uid + '_slide">' +
            '<line id="' + uid + '_tubeTop" x1="' + SLIDE_X0 + '" y1="' + SLIDE_Y1 + '" x2="' + SLIDE_X0 + '" y2="' + SLIDE_Y1 + '" stroke="url(#tmTbBrass)" stroke-width="8" stroke-linecap="round"/>' +
            '<line id="' + uid + '_tubeBot" x1="' + SLIDE_X0 + '" y1="' + SLIDE_Y2 + '" x2="' + SLIDE_X0 + '" y2="' + SLIDE_Y2 + '" stroke="url(#tmTbBrass)" stroke-width="8" stroke-linecap="round"/>' +
            '<rect id="' + uid + '_cap" x="' + (SLIDE_X0 - 5) + '" y="114" width="10" height="30" rx="5" fill="url(#tmTbBrass)" stroke="#7a5a08" stroke-width="1.2"/>' +
          '</g>' +
          ruler() +
        '</svg></div>' +
        '<div class="tm-tb-btns">' + btns + '</div>' +
      '</div>';

    var ro = document.getElementById(uid + '_ro');
    var audio = new Audio();
    var tubeTop = document.getElementById(uid + '_tubeTop');
    var tubeBot = document.getElementById(uid + '_tubeBot');
    var cap = document.getElementById(uid + '_cap');

    function setSlide(pos) {
      var x = tipX(pos);
      tubeTop.setAttribute('x2', x);
      tubeBot.setAttribute('x2', x);
      cap.setAttribute('x', x - 5);
      wrap.querySelectorAll('.tm-tb-tickgrp').forEach(function (g) {
        var on = parseInt(g.dataset.pos, 10) === pos;
        g.querySelector('.tm-tb-tick').classList.toggle('on', on);
        g.querySelector('.tm-tb-ticklab').classList.toggle('on', on);
      });
    }

    function play(n) {
      var f = sampleFile(n);
      if (!f) return;
      try { audio.pause(); } catch (e) {}
      audio.src = AUDIO_BASE + f + '.mp3?v=' + AUDIO_V;
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
      stave.addClef('bass').setContext(ctx).draw();
      var note = new V.StaveNote({ keys: [vn.key], duration: 'w', clef: 'bass' });
      if (vn.acc) note.addModifier(new V.Accidental(vn.acc), 0);
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([note]);
      new V.Formatter().joinVoices([voice]).format([voice], 80);
      voice.draw(ctx, stave);
      var s = el.querySelector('svg');
      if (s) { s.setAttribute('viewBox', '0 0 150 150'); s.style.width = '130px'; s.style.maxWidth = '100%'; s.style.height = 'auto'; }
    }

    function pick(n, btn) {
      wrap.querySelectorAll('.tm-tb-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = FING[n];
      if (data) setSlide(data.pos);
      ro.innerHTML =
        '<div class="tm-tb-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-tb-noterow"><span class="tm-tb-intl">' + label(n) + (FLAT[n] ? ' (' + FLAT[n] + ')' : '') + '</span>' +
        '<button class="tm-tb-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-tb-reg">' + intl(n) + ' · ' + registro(n) + '</div>' +
        '<div class="tm-tb-keysline">' + (data ? ORDINAL[data.pos] + ' posición · armónico ' + data.harm + 'º sobre el ' + FUND[data.pos] : '') + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-tb-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    setSlide(1);
    wrap.querySelectorAll('.tm-tb-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmTrombonEngine = tmTrombonEngine;
})();
