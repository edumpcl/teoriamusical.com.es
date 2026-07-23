/* Diagrama de digitaciones del TROMBÓN BAJO (config B♭/F/G♭/D) — interactivo.
   Como el tenor, la nota se elige con la VARA (7 posiciones) y el armónico de los
   labios; pero el bajo añade DOS VÁLVULAS (gatillos de pulgar): la de Fa y la de
   Sol♭. Juntas dan Re, y sirven para bajar al registro grave y rellenar el hueco
   cromático entre el Si♭ pedal y el Mi grave (Si₁, Do₂, Do♯₂, Re₂, Re♯₂).
   NO transpone: lo escrito es lo que suena (clave de fa). Rango Si♭₁–Si♭₄.
   Digitaciones preferentes de la tabla cromática B♭/F/G♭/D (Micah Everett, Univ. of
   Mississippi); de Mi₂ hacia arriba coinciden con el trombón tenor.
   Uso: <div id="x"></div><script>tmTrombonBajoEngine('x');</script> */
(function () {
  'use strict';

  var MP_X = 68, SLIDE_X0 = 105, SOCKET_X = 330;
  var SLIDE_Y1 = 122, SLIDE_Y2 = 136;
  var TIP_MIN = 130, TIP_STEP = 30;
  function tipX(pos) { return TIP_MIN + (pos - 1) * TIP_STEP; }

  // Nota escrita -> { pos: 1-7, harm: armónico (solo notas al aire), valves: null|'F'|'Gb'|'both' }
  var FING = {
    // --- Extensión grave con válvulas (lo propio del bajo) ---
    'La#1': { pos: 5, valves: 'both' },   // Si♭1 (pedal) — Δ5
    'Si1':  { pos: 4, valves: 'both' },   // Δ4
    'Do2':  { pos: 3, valves: 'both' },   // Δ3
    'Do#2': { pos: 2, valves: 'both' },   // Δ2
    'Re2':  { pos: 1, valves: 'both' },   // Δ1
    'Re#2': { pos: 3, valves: 'F' },      // V3
    // --- De aquí arriba, igual que el trombón tenor (al aire) ---
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
    'La#1', 'Si1', 'Do2', 'Do#2', 'Re2', 'Re#2',
    'Mi2', 'Fa2', 'Fa#2', 'Sol2', 'Sol#2', 'La2', 'La#2',
    'Si2', 'Do3', 'Do#3', 'Re3', 'Re#3', 'Mi3', 'Fa3',
    'Fa#3', 'Sol3', 'Sol#3', 'La3', 'La#3',
    'Si3', 'Do4', 'Do#4', 'Re4', 'Re#4', 'Mi4', 'Fa4',
    'Fa#4', 'Sol4', 'Sol#4', 'La4', 'La#4'
  ];
  var FUND = { 1: 'Si♭', 2: 'La', 3: 'La♭', 4: 'Sol', 5: 'Fa♯', 6: 'Fa', 7: 'Mi' };
  var ORDINAL = { 1: '1ª', 2: '2ª', 3: '3ª', 4: '4ª', 5: '5ª', 6: '6ª', 7: '7ª' };
  var VTXT = { 'F': 'válvula F', 'Gb': 'válvula G♭', 'both': 'válvulas F + G♭ (dan Re)' };

  var SUB = { '1': '₁', '2': '₂', '3': '₃', '4': '₄' };
  var FLAT = {
    'La#1': 'Si♭₁', 'Do#2': 'Re♭₂', 'Re#2': 'Mi♭₂',
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
    if (i <= ORDEN.indexOf('Re#2')) return 'Registro subgrave (con válvulas)';
    if (i <= ORDEN.indexOf('Si2')) return 'Registro grave';
    if (i <= ORDEN.indexOf('Si3')) return 'Registro medio';
    return 'Registro agudo';
  }
  var LETTER = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  var AUDIO_BASE = '/assets/audio/trombon-bajo/';
  var AUDIO_V = '1';
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
    '.tm-tbj-wrap{margin:18px 0;}',
    '.tm-tbj-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-tbj-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-tbj-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-tbj-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-tbj-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;display:flex;justify-content:center;}',
    '.tm-tbj-svg{display:block;max-width:600px;width:100%;height:auto;margin:0 auto;}',
    '.tm-tbj-tick{fill:#e9eaee;stroke:#8f9199;stroke-width:1.4;}',
    '.tm-tbj-tick.on{fill:#8b6914;stroke:#6b5010;}',
    '.tm-tbj-ticklab{font-family:Arial,Helvetica,sans-serif;font-size:11px;fill:#777;text-anchor:middle;}',
    '.tm-tbj-ticklab.on{fill:#8b6914;font-weight:bold;}',
    '.tm-tbj-valve .v-cap{fill:#e9eaee;stroke:#8f9199;stroke-width:1.6;transition:all .15s;}',
    '.tm-tbj-valve.on .v-cap{fill:#ff9500;stroke:#c9730a;filter:drop-shadow(0 0 5px #ff9500);}',
    '.tm-tbj-valve .v-num{font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;fill:#777;text-anchor:middle;dominant-baseline:central;}',
    '.tm-tbj-valve.on .v-num{fill:#3a2b00;}',
    '.tm-tbj-klab{font-family:Arial,Helvetica,sans-serif;font-size:11px;fill:#555;text-anchor:middle;}',
    '.tm-tbj-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-tbj-btn{min-width:44px;padding:9px 11px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-tbj-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-tbj-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-tbj-btn.val{border-color:#c9930a;}',
    '.tm-tbj-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-tbj-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-tbj-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-tbj-play:hover{background:#6b5010;}',
    '.tm-tbj-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-tbj-staff svg{max-width:100%;height:auto;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-tbj-css')) return;
    var s = document.createElement('style'); s.id = 'tm-tbj-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  var TUBE_MIDY = (SLIDE_Y1 + SLIDE_Y2) / 2;
  var DECO_FIXED =
    '<defs><linearGradient id="tmTbjBrass" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#f4d06a"/><stop offset="0.4" stop-color="#d9a520"/>' +
      '<stop offset="0.75" stop-color="#b8860b"/><stop offset="1" stop-color="#7a5a08"/>' +
    '</linearGradient></defs>' +
    '<circle cx="' + MP_X + '" cy="' + TUBE_MIDY + '" r="11" fill="#c8b060" stroke="#7a5a08" stroke-width="1.4"/>' +
    '<circle cx="' + MP_X + '" cy="' + TUBE_MIDY + '" r="5" fill="#5e2432"/>' +
    '<rect x="' + (MP_X + 9) + '" y="' + (TUBE_MIDY - 4) + '" width="' + (SLIDE_X0 - MP_X - 9) + '" height="8" rx="4" fill="url(#tmTbjBrass)" stroke="#7a5a08" stroke-width="1"/>' +
    '<line x1="' + SLIDE_X0 + '" y1="' + SLIDE_Y1 + '" x2="' + SOCKET_X + '" y2="' + SLIDE_Y1 + '" stroke="#cfd0d6" stroke-width="4" stroke-linecap="round" stroke-dasharray="1,5"/>' +
    '<line x1="' + SLIDE_X0 + '" y1="' + SLIDE_Y2 + '" x2="' + SOCKET_X + '" y2="' + SLIDE_Y2 + '" stroke="#cfd0d6" stroke-width="4" stroke-linecap="round" stroke-dasharray="1,5"/>' +
    '<rect x="' + SOCKET_X + '" y="118" width="26" height="30" rx="6" fill="url(#tmTbjBrass)" stroke="#7a5a08" stroke-width="1.2"/>' +
    '<path d="M356 120 C380 110 390 90 390 66 C390 48 380 40 366 40" stroke="url(#tmTbjBrass)" stroke-width="11" fill="none" stroke-linecap="round"/>' +
    '<path d="M366 40 L366 128" stroke="url(#tmTbjBrass)" stroke-width="11" fill="none" stroke-linecap="round"/>' +
    '<path d="M366 128 C366 150 380 160 402 160" stroke="url(#tmTbjBrass)" stroke-width="11" fill="none" stroke-linecap="round"/>' +
    '<path d="M402 160 C480 168 540 164 580 150" stroke="url(#tmTbjBrass)" stroke-width="12" fill="none" stroke-linecap="round"/>' +
    '<path d="M574 138 C620 122 658 122 676 130 L676 176 C658 184 620 184 574 168 C584 158 584 148 574 138 Z" fill="url(#tmTbjBrass)" stroke="#7a5a08" stroke-width="1.2"/>' +
    '<ellipse cx="677" cy="153" rx="7" ry="24" fill="#c8960f" stroke="#7a5a08" stroke-width="1"/>' +
    '<text class="tm-tbj-klab" x="68" y="100">Boquilla</text>' +
    '<text class="tm-tbj-klab" x="677" y="115">Campana</text>' +
    '<text class="tm-tbj-klab" x="378" y="30">Vara de afinación</text>' +
    '<text class="tm-tbj-klab" x="217" y="165">Posición de la vara</text>' +
    // etiqueta de las válvulas
    '<text class="tm-tbj-klab" x="118" y="40">Válvulas (gatillos)</text>';

  // dos válvulas de pulgar (F y G♭) que se encienden
  var VALVES = [
    { id: 'F',  x: 96,  label: 'F' },
    { id: 'Gb', x: 140, label: 'G♭' }
  ];
  function valvesSvg() {
    return VALVES.map(function (v) {
      return '<g class="tm-tbj-valve" data-v="' + v.id + '">' +
        '<circle class="v-cap" cx="' + v.x + '" cy="60" r="14"/>' +
        '<text class="v-num" x="' + v.x + '" y="60">' + v.label + '</text></g>';
    }).join('');
  }

  function ruler() {
    var out = '';
    for (var p = 1; p <= 7; p++) {
      var x = tipX(p);
      out += '<g class="tm-tbj-tickgrp" data-pos="' + p + '">' +
        '<circle class="tm-tbj-tick" cx="' + x + '" cy="185" r="9"/>' +
        '<text class="tm-tbj-ticklab" x="' + x + '" y="204">' + p + '</text></g>';
    }
    return out;
  }

  function tmTrombonBajoEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var btns = ORDEN.map(function (n) {
      var val = FING[n] && FING[n].valves ? ' val' : '';
      return '<button class="tm-tbj-btn' + val + '" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-tbj-wrap">' +
        '<div class="tm-tbj-readout" id="' + uid + '_ro"><span class="tm-tbj-hint">Elige una nota para ver su posición y válvulas</span></div>' +
        '<div class="tm-tbj-diagram"><svg class="tm-tbj-svg" id="' + uid + '_svg" viewBox="0 0 700 220" role="img" aria-label="Diagrama de digitación del trombón bajo: boquilla fija a la izquierda, vara deslizante hacia la campana de la derecha, dos válvulas de pulgar (Fa y Sol bemol) arriba a la izquierda y una regla con las siete posiciones">' +
          DECO_FIXED +
          valvesSvg() +
          '<g id="' + uid + '_slide">' +
            '<line id="' + uid + '_tubeTop" x1="' + SLIDE_X0 + '" y1="' + SLIDE_Y1 + '" x2="' + SLIDE_X0 + '" y2="' + SLIDE_Y1 + '" stroke="url(#tmTbjBrass)" stroke-width="8" stroke-linecap="round"/>' +
            '<line id="' + uid + '_tubeBot" x1="' + SLIDE_X0 + '" y1="' + SLIDE_Y2 + '" x2="' + SLIDE_X0 + '" y2="' + SLIDE_Y2 + '" stroke="url(#tmTbjBrass)" stroke-width="8" stroke-linecap="round"/>' +
            '<rect id="' + uid + '_cap" x="' + (SLIDE_X0 - 5) + '" y="114" width="10" height="30" rx="5" fill="url(#tmTbjBrass)" stroke="#7a5a08" stroke-width="1.2"/>' +
          '</g>' +
          ruler() +
        '</svg></div>' +
        '<div class="tm-tbj-btns">' + btns + '</div>' +
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
      wrap.querySelectorAll('.tm-tbj-tickgrp').forEach(function (g) {
        var on = parseInt(g.dataset.pos, 10) === pos;
        g.querySelector('.tm-tbj-tick').classList.toggle('on', on);
        g.querySelector('.tm-tbj-ticklab').classList.toggle('on', on);
      });
    }
    function setValves(v) {
      var onF = v === 'F' || v === 'both';
      var onG = v === 'Gb' || v === 'both';
      wrap.querySelectorAll('.tm-tbj-valve').forEach(function (g) {
        var id = g.dataset.v;
        g.classList.toggle('on', (id === 'F' && onF) || (id === 'Gb' && onG));
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
      if (!el || typeof Vex === 'undefined') return;
      el.innerHTML = '';
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
      if (s) {
        var vb = '0 0 150 150';
        try { var bb = s.getBBox(); if (bb && bb.height) { var p = 6; vb = (bb.x - p) + ' ' + (bb.y - p) + ' ' + (bb.width + 2 * p) + ' ' + (bb.height + 2 * p); } } catch (e) {}
        s.setAttribute('viewBox', vb);
        s.style.width = '130px'; s.style.maxWidth = '100%'; s.style.height = 'auto';
      }
    }

    function pick(n, btn) {
      wrap.querySelectorAll('.tm-tbj-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = FING[n];
      if (data) { setSlide(data.pos); setValves(data.valves || null); }
      var detail = data
        ? ORDINAL[data.pos] + ' posición' + (data.valves ? ' · ' + VTXT[data.valves]
            : (data.harm ? ' · armónico ' + data.harm + 'º sobre el ' + FUND[data.pos] : ''))
        : '';
      ro.innerHTML =
        '<div class="tm-tbj-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-tbj-noterow"><span class="tm-tbj-intl">' + label(n) + (FLAT[n] ? ' (' + FLAT[n] + ')' : '') + '</span>' +
        '<button class="tm-tbj-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-tbj-reg">' + intl(n) + ' · ' + registro(n) + '</div>' +
        '<div class="tm-tbj-keysline">' + detail + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-tbj-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    setSlide(1); setValves(null);
    wrap.querySelectorAll('.tm-tbj-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmTrombonBajoEngine = tmTrombonBajoEngine;
})();
