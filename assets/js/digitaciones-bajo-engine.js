/* Diapasón interactivo del bajo eléctrico — notas en el mástil.
   Muestra CADA nota (pitch real) en las 4 cuerdas y los 12 primeros trastes,
   sobre DOS diagramas sincronizados: una FOTO real del mástil con marcadores
   y un diapasón DIBUJADO; más su TABLATURA (todas las posiciones), el
   PENTAGRAMA (clave de fa, se escribe una 8ª por encima de lo que suena) y el
   SONIDO real de bajo. Afinación estándar (sonido real):
   4ª Mi1 · 3ª La1 · 2ª Re2 · 1ª Sol2.
   Uso: <div id="x"></div><script>tmBajoEngine('x');</script> */
(function () {
  'use strict';

  // Cuerdas al aire (MIDI real), i=0 -> 4ª (Mi grave) ... i=3 -> 1ª (Sol agudo)
  var OPEN = [28, 33, 38, 43];
  var CUERDA_NOM = ['4ª (Mi)', '3ª (La)', '2ª (Re)', '1ª (Sol)'];
  var NFRETS = 12;

  // --- Calibración de la FOTO del mástil, EN HORIZONTAL (viewBox 1470 x 350) ---
  // Posición de tocar (vista del bajista): cejuela a la izquierda, cuerpo a la
  // derecha; 4ª (Mi grave) ARRIBA y 1ª (Sol aguda) abajo.
  var IMG_W = 1470, IMG_H = 350;
  var nut4 = [43, 190], nut1 = [43, 285];   // cejuela: lado 4ª (arriba) / lado 1ª (abajo)
  var f4   = [1400, 55], f1 = [1400, 175];  // traste 12
  function tOf(n) { return 2 * (1 - Math.pow(2, -n / 12)); }        // t(12)=1
  function markT(n) { return n === 0 ? 0 : (tOf(n - 1) + tOf(n)) / 2; } // punto en el espacio
  function lerp(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; }
  function photoXY(i, n) {
    var u = i / 3, t = markT(n);              // u: 0 -> 4ª, 1 -> 1ª
    var atNut = lerp(nut4, nut1, u), atF12 = lerp(f4, f1, u);
    return lerp(atNut, atF12, t);
  }

  // --- Nombres de nota ---
  var SHARP = ['Do', 'Do♯', 'Re', 'Re♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si'];
  var FLAT  = ['Do', 'Re♭', 'Re', 'Mi♭', 'Mi', 'Fa', 'Sol♭', 'Sol', 'La♭', 'La', 'Si♭', 'Si'];
  var SUB = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇' };
  function sub(o) { return String(o).split('').map(function (c) { return SUB[c] || c; }).join(''); }
  function pc(m) { return ((m % 12) + 12) % 12; }
  function octave(m) { return Math.floor(m / 12) - 1; }
  function nameSharp(m) { return SHARP[pc(m)] + sub(octave(m)); }
  function nameFull(m) {
    var p = pc(m), s = SHARP[p] + sub(octave(m));
    if (SHARP[p] !== FLAT[p]) s += ' (' + FLAT[p] + sub(octave(m)) + ')';
    return s;
  }
  // Audio / ficheros por nota REAL (E1..G3)
  var LET = ['C', 'C', 'D', 'D', 'E', 'F', 'F', 'G', 'G', 'A', 'A', 'B'];
  var ISS = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
  function sampleFile(m) { return LET[pc(m)] + (ISS[pc(m)] ? 's' : '') + octave(m); }
  // VexFlow: se ESCRIBE una 8ª por encima de lo que suena (clave de fa)
  function vfKey(m) {
    var w = m + 12; // pitch escrito
    var p = pc(w), acc = ISS[p] ? '#' : null;
    return { key: LET[p].toLowerCase() + (acc || '') + '/' + octave(w), acc: acc };
  }

  // pitches disponibles: del Mi1 (28) al Sol3 (55)
  var PMIN = OPEN[0], PMAX = OPEN[3] + NFRETS;   // 28 .. 55
  function positions(m) { // [{i, fret}] donde suena esa nota (trastes 0..12)
    var r = [];
    for (var i = 0; i < 4; i++) { var f = m - OPEN[i]; if (f >= 0 && f <= NFRETS) r.push({ i: i, fret: f }); }
    return r;
  }

  var CSS = [
    '.tm-bj-wrap{margin:18px 0;}',
    '.tm-bj-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;}',
    '.tm-bj-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-bj-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-bj-staff svg{max-width:100%;height:auto;}',
    '.tm-bj-noterow{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;}',
    '.tm-bj-name{font-size:1.5rem;font-weight:800;color:#1a1a1a;}',
    '.tm-bj-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-bj-play:hover{background:#6b5010;}',
    '.tm-bj-sub{font-size:.9rem;color:#666;margin-top:4px;}',
    '.tm-bj-diagrams{display:flex;flex-direction:column;gap:14px;justify-content:center;align-items:center;}',
    '.tm-bj-col{display:flex;flex-direction:column;align-items:center;gap:6px;width:min(100%,620px);}',
    '.tm-bj-cap{font-size:.82rem;color:#777;}',
    '.tm-bj-photo-wrap{position:relative;width:min(100%,620px);}',
    '.tm-bj-photo,.tm-bj-drawn{width:min(100%,620px);height:auto;display:block;}',
    '.tm-bj-photo{border:1px solid #e8e0cc;border-radius:8px;background:#fff;}',
    '.tm-bj-mk{fill:#c0392b;stroke:#fff;stroke-width:2;}',
    '.tm-bj-mk-open{fill:none;stroke:#c0392b;stroke-width:4;}',
    '.tm-bj-mklab{fill:#fff;font-family:Arial;font-weight:bold;text-anchor:middle;}',
    '.tm-bj-tabwrap{margin:14px auto 0;max-width:520px;overflow-x:auto;}',
    '.tm-bj-tab{font-family:"Courier New",monospace;font-size:1rem;line-height:1.5;white-space:pre;color:#1a1a1a;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:10px 14px;display:inline-block;text-align:left;min-width:100%;box-sizing:border-box;}',
    '.tm-bj-btns{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:16px;}',
    '.tm-bj-btn{min-width:44px;padding:9px 8px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.92rem;}',
    '.tm-bj-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-bj-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-bj-btn .o{font-size:.7em;color:#999;}',
    '.tm-bj-btn.sel .o{color:#f0e6cc;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-bj-css')) return;
    var s = document.createElement('style'); s.id = 'tm-bj-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  // ---- Diapasón DIBUJADO (horizontal, cejuela a la izquierda) ----
  // Vista del bajista: 4ª (Mi grave) arriba, 1ª (Sol aguda) abajo, igual que la foto.
  var DW = 760, DH = 210, DNUTX = 42, DEND = 738, DTOP = 40, DBOT = 170;
  function drawnStrY(i) { return DTOP + (DBOT - DTOP) * (i / 3); } // i=0 4ª arriba, i=3 1ª abajo
  function drawnFretX(n) { return DNUTX + (DEND - DNUTX) * tOf(n); }
  function drawnMarkX(n) { return n === 0 ? DNUTX - 18 : DNUTX + (DEND - DNUTX) * markT(n); }
  function buildDrawn() {
    var by = DTOP - 10, bh = (DBOT - DTOP) + 20, mid = (DTOP + DBOT) / 2;
    var s = '<svg class="tm-bj-drawn" viewBox="0 0 ' + DW + ' ' + DH + '" role="img" aria-label="Diapasón del bajo dibujado en posición de tocar: la cejuela a la izquierda y las cuatro cuerdas (4ª Mi grave arriba, 1ª Sol aguda abajo)">';
    s += '<rect x="' + DNUTX + '" y="' + by + '" width="' + (DEND - DNUTX) + '" height="' + bh + '" fill="#5a3a24"/>';
    // cejuela
    s += '<rect x="' + (DNUTX - 6) + '" y="' + by + '" width="6" height="' + bh + '" fill="#f5efe0"/>';
    // trastes
    for (var n = 1; n <= NFRETS; n++) { var x = drawnFretX(n); s += '<line x1="' + x + '" y1="' + by + '" x2="' + x + '" y2="' + (by + bh) + '" stroke="#c9c9c9" stroke-width="2"/>'; }
    // inlays
    [3, 5, 7, 9].forEach(function (n) { var xi = drawnMarkX(n); s += '<circle cx="' + xi + '" cy="' + mid + '" r="6" fill="#efe4c8"/>'; });
    var x12 = drawnMarkX(12); s += '<circle cx="' + x12 + '" cy="' + (DTOP + (DBOT - DTOP) * 0.28) + '" r="6" fill="#efe4c8"/><circle cx="' + x12 + '" cy="' + (DTOP + (DBOT - DTOP) * 0.72) + '" r="6" fill="#efe4c8"/>';
    // cuerdas (4ª la más gruesa)
    for (var i = 0; i < 4; i++) { var y = drawnStrY(i); s += '<line x1="' + DNUTX + '" y1="' + y + '" x2="' + DEND + '" y2="' + y + '" stroke="#e8e2d0" stroke-width="' + (1.4 + (3 - i) * 0.9) + '"/>'; }
    // números de traste (debajo)
    for (var n2 = 1; n2 <= NFRETS; n2++) { if ([3, 5, 7, 9, 12].indexOf(n2) >= 0) { s += '<text x="' + drawnMarkX(n2) + '" y="' + (DBOT + 30) + '" font-family="Arial" font-size="13" fill="#8b6914" text-anchor="middle">' + n2 + '</text>'; } }
    s += '<g class="tm-bj-dmarks"></g></svg>';
    return s;
  }

  function tmBajoEngine(id) {
    injectCSS();
    var wrap = document.getElementById(id); if (!wrap) return;
    var uid = id;
    var btns = '';
    for (var m = PMIN; m <= PMAX; m++) {
      var p = pc(m), lab = SHARP[p] + '<span class="o">' + sub(octave(m)) + '</span>';
      btns += '<button class="tm-bj-btn" data-m="' + m + '">' + lab + '</button>';
    }
    wrap.innerHTML =
      '<div class="tm-bj-wrap">' +
        '<div class="tm-bj-readout" id="' + uid + '_ro"><span class="tm-bj-hint">Elige una nota para verla en el mástil, en tablatura y en el pentagrama</span></div>' +
        '<div class="tm-bj-diagrams">' +
          '<div class="tm-bj-col"><div class="tm-bj-photo-wrap">' +
            '<picture><source type="image/webp" srcset="/assets/img/bajo/mastil.webp"><img class="tm-bj-photo" src="/assets/img/bajo/mastil.jpg" alt="Mástil de un bajo eléctrico en posición de tocar, foto real"></picture>' +
            '<svg class="tm-bj-photo-ov" viewBox="0 0 ' + IMG_W + ' ' + IMG_H + '" preserveAspectRatio="xMidYMid meet" style="position:absolute;left:0;top:0;width:100%;height:100%;"><g class="tm-bj-pmarks"></g></svg>' +
          '</div><div class="tm-bj-cap">Foto real</div></div>' +
          '<div class="tm-bj-col">' + buildDrawn() + '<div class="tm-bj-cap">Diapasón</div></div>' +
        '</div>' +
        '<div class="tm-bj-tabwrap"><div class="tm-bj-tab" id="' + uid + '_tab"></div></div>' +
        '<div class="tm-bj-btns">' + btns + '</div>' +
      '</div>';

    var ro = document.getElementById(uid + '_ro');
    var tab = document.getElementById(uid + '_tab');
    var pov = wrap.querySelector('.tm-bj-pmarks');
    var dov = wrap.querySelector('.tm-bj-dmarks');
    var audio = new Audio();

    function play(m) {
      try { audio.pause(); } catch (e) {}
      audio.src = '/assets/audio/bajo/' + sampleFile(m) + '.mp3';
      audio.currentTime = 0; var pr = audio.play(); if (pr && pr.catch) pr.catch(function () {});
    }

    function renderStaff(m) {
      var el = document.getElementById(uid + '_staff'); if (!el || typeof Vex === 'undefined') return;
      el.innerHTML = '';
      var V = Vex.Flow, r = new V.Renderer(el, V.Renderer.Backends.SVG);
      r.resize(160, 150); var ctx = r.getContext(); ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(2, 30, 150); stave.addClef('bass').setContext(ctx).draw();
      var vn = vfKey(m);
      var note = new V.StaveNote({ keys: [vn.key], duration: 'w', clef: 'bass' });
      if (vn.acc) note.addModifier(new V.Accidental(vn.acc), 0);
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([note]);
      new V.Formatter().joinVoices([voice]).format([voice], 90); voice.draw(ctx, stave);
      var svg = el.querySelector('svg');
      if (svg) {
        var vb = '0 0 160 150';
        try { var bb = svg.getBBox(); if (bb && bb.height) { var q = 6; vb = (bb.x - q) + ' ' + (bb.y - q) + ' ' + (bb.width + 2 * q) + ' ' + (bb.height + 2 * q); } } catch (e) {}
        svg.setAttribute('viewBox', vb); svg.style.width = '150px'; svg.style.maxWidth = '100%'; svg.style.height = 'auto';
      }
    }

    function tabLines(pos) {
      // orden tab estándar: 1ª (Sol agudo) arriba ... 4ª (Mi grave) abajo
      var lab = ['G', 'D', 'A', 'E'];
      var byS = {}; pos.forEach(function (p) { byS[p.i] = p.fret; });
      var out = [];
      for (var row = 0; row < 4; row++) {
        var i = 3 - row;                       // row 0 -> 1ª (i=3)
        var f = (i in byS) ? byS[i] : null;
        var cell = f === null ? '───' : (f < 10 ? ('─' + f + '─') : ('─' + f));
        out.push(lab[row] + ' │──' + cell + '──│');
      }
      return out.join('\n');
    }

    function pick(m, btn) {
      wrap.querySelectorAll('.tm-bj-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var pos = positions(m);
      // marcadores foto
      var ps = '';
      pos.forEach(function (p) {
        var xy = photoXY(p.i, p.fret);
        if (p.fret === 0) ps += '<circle class="tm-bj-mk-open" cx="' + xy[0].toFixed(1) + '" cy="' + xy[1].toFixed(1) + '" r="12"/>';
        else ps += '<circle class="tm-bj-mk" cx="' + xy[0].toFixed(1) + '" cy="' + xy[1].toFixed(1) + '" r="14"/>';
      });
      pov.innerHTML = ps;
      // marcadores dibujado
      var ds = '';
      pos.forEach(function (p) {
        var x = drawnMarkX(p.fret), y = drawnStrY(p.i);
        if (p.fret === 0) ds += '<circle class="tm-bj-mk-open" cx="' + x + '" cy="' + y + '" r="10"/>';
        else { ds += '<circle class="tm-bj-mk" cx="' + x + '" cy="' + y + '" r="12"/>'; ds += '<text class="tm-bj-mklab" x="' + x + '" y="' + (y + 4) + '" font-size="11">' + p.fret + '</text>'; }
      });
      dov.innerHTML = ds;
      // lista de posiciones legible
      var human = pos.map(function (p) { return p.fret === 0 ? (CUERDA_NOM[p.i] + ' al aire') : (CUERDA_NOM[p.i] + ' traste ' + p.fret); }).join(' · ');
      ro.innerHTML =
        '<div class="tm-bj-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-bj-noterow"><span class="tm-bj-name">' + nameFull(m) + '</span>' +
        '<button class="tm-bj-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-bj-sub">' + human + '</div>' +
        '<div class="tm-bj-sub">Se escribe una 8ª más arriba de lo que suena (clave de fa).</div>';
      tab.textContent = tabLines(pos);
      renderStaff(m);
      var pb = ro.querySelector('.tm-bj-play'); if (pb) pb.addEventListener('click', function () { play(m); });
      play(m);
    }

    wrap.querySelectorAll('.tm-bj-btn').forEach(function (b) { b.addEventListener('click', function () { pick(+b.dataset.m, b); }); });
  }

  window.tmBajoEngine = tmBajoEngine;
})();
