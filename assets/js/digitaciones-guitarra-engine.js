/* Diapasón interactivo de la guitarra — notas en el mástil.
   Muestra CADA nota (pitch real) en las 6 cuerdas y los 12 primeros trastes,
   sobre DOS diagramas sincronizados: una FOTO real del mástil con marcadores
   y un diapasón DIBUJADO; más su TABLATURA (todas las posiciones), el
   PENTAGRAMA (clave de sol, se escribe una 8ª por encima de lo que suena) y el
   SONIDO real de guitarra. Afinación estándar (sonido real):
   6ª Mi2 · 5ª La2 · 4ª Re3 · 3ª Sol3 · 2ª Si3 · 1ª Mi4.
   Uso: <div id="x"></div><script>tmGuitarraEngine('x');</script> */
(function () {
  'use strict';

  // Cuerdas al aire (MIDI real), i=0 -> 6ª (Mi grave) ... i=5 -> 1ª (Mi agudo)
  var OPEN = [40, 45, 50, 55, 59, 64];
  var CUERDA_NOM = ['6ª (Mi)', '5ª (La)', '4ª (Re)', '3ª (Sol)', '2ª (Si)', '1ª (Mi)'];
  var NFRETS = 12;

  // --- Calibración de la FOTO del mástil, EN HORIZONTAL (viewBox 1190 x 430) ---
  // Posición de tocar (vista del guitarrista): cejuela a la izquierda, cuerpo a
  // la derecha; 6ª (Mi grave) ARRIBA y 1ª (Mi aguda) abajo.
  var IMG_W = 1190, IMG_H = 430;
  var nut6 = [37, 179], nut1 = [37, 346];   // cejuela: lado 6ª (arriba) / lado 1ª (abajo)
  var f6   = [1130, 75], f1 = [1130, 273];  // traste 12
  function tOf(n) { return 2 * (1 - Math.pow(2, -n / 12)); }        // t(12)=1
  function markT(n) { return n === 0 ? 0 : (tOf(n - 1) + tOf(n)) / 2; } // punto en el espacio
  function lerp(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; }
  function photoXY(i, n) {
    var u = i / 5, t = markT(n);              // u: 0 -> 6ª, 1 -> 1ª
    var atNut = lerp(nut6, nut1, u), atF12 = lerp(f6, f1, u);
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
  // Audio / ficheros por nota REAL (E2..E5)
  var LET = ['C', 'C', 'D', 'D', 'E', 'F', 'F', 'G', 'G', 'A', 'A', 'B'];
  var ISS = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
  function sampleFile(m) { return LET[pc(m)] + (ISS[pc(m)] ? 's' : '') + octave(m); }
  // VexFlow: se ESCRIBE una 8ª por encima de lo que suena (clave de sol 8vb)
  function vfKey(m) {
    var w = m + 12; // pitch escrito
    var p = pc(w), acc = ISS[p] ? '#' : null;
    return { key: LET[p].toLowerCase() + (acc || '') + '/' + octave(w), acc: acc };
  }

  // pitches disponibles: del Mi2 (40) al Mi5 (76)
  var PMIN = OPEN[0], PMAX = OPEN[5] + NFRETS;   // 40 .. 76
  function positions(m) { // [{i, fret}] donde suena esa nota (trastes 0..12)
    var r = [];
    for (var i = 0; i < 6; i++) { var f = m - OPEN[i]; if (f >= 0 && f <= NFRETS) r.push({ i: i, fret: f }); }
    return r;
  }

  var CSS = [
    '.tm-gt-wrap{margin:18px 0;}',
    '.tm-gt-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;}',
    '.tm-gt-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-gt-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-gt-staff svg{max-width:100%;height:auto;}',
    '.tm-gt-noterow{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;}',
    '.tm-gt-name{font-size:1.5rem;font-weight:800;color:#1a1a1a;}',
    '.tm-gt-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-gt-play:hover{background:#6b5010;}',
    '.tm-gt-sub{font-size:.9rem;color:#666;margin-top:4px;}',
    '.tm-gt-diagrams{display:flex;flex-direction:column;gap:14px;justify-content:center;align-items:center;}',
    '.tm-gt-col{display:flex;flex-direction:column;align-items:center;gap:6px;width:min(100%,600px);}',
    '.tm-gt-cap{font-size:.82rem;color:#777;}',
    '.tm-gt-photo-wrap{position:relative;width:min(100%,600px);}',
    '.tm-gt-photo,.tm-gt-drawn{width:min(100%,600px);height:auto;display:block;}',
    '.tm-gt-photo{border:1px solid #e8e0cc;border-radius:8px;background:#fff;}',
    '.tm-gt-mk{fill:#c0392b;stroke:#fff;stroke-width:2;}',
    '.tm-gt-mk-open{fill:none;stroke:#c0392b;stroke-width:4;}',
    '.tm-gt-mklab{fill:#fff;font-family:Arial;font-weight:bold;text-anchor:middle;}',
    '.tm-gt-tabwrap{margin:14px auto 0;max-width:520px;overflow-x:auto;}',
    '.tm-gt-tab{font-family:"Courier New",monospace;font-size:1rem;line-height:1.5;white-space:pre;color:#1a1a1a;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:10px 14px;display:inline-block;text-align:left;min-width:100%;box-sizing:border-box;}',
    '.tm-gt-btns{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:16px;}',
    '.tm-gt-btn{min-width:44px;padding:9px 8px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.92rem;}',
    '.tm-gt-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-gt-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-gt-btn .o{font-size:.7em;color:#999;}',
    '.tm-gt-btn.sel .o{color:#f0e6cc;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-gt-css')) return;
    var s = document.createElement('style'); s.id = 'tm-gt-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  // ---- Diapasón DIBUJADO (horizontal, cejuela a la izquierda) ----
  // Vista del guitarrista: 6ª (Mi grave) arriba, 1ª (Mi aguda) abajo, igual que la foto.
  var DW = 680, DH = 250, DNUTX = 40, DEND = 650, DTOP = 40, DBOT = 210;
  function drawnStrY(i) { return DTOP + (DBOT - DTOP) * (i / 5); } // i=0 6ª arriba, i=5 1ª abajo
  function drawnFretX(n) { return DNUTX + (DEND - DNUTX) * tOf(n); }
  function drawnMarkX(n) { return n === 0 ? DNUTX - 18 : DNUTX + (DEND - DNUTX) * markT(n); }
  function buildDrawn() {
    var by = DTOP - 8, bh = (DBOT - DTOP) + 16, mid = (DTOP + DBOT) / 2;
    var s = '<svg class="tm-gt-drawn" viewBox="0 0 ' + DW + ' ' + DH + '" role="img" aria-label="Diapasón de la guitarra dibujado en posición de tocar: la cejuela a la izquierda y las seis cuerdas (6ª Mi grave arriba, 1ª Mi aguda abajo)">';
    s += '<rect x="' + DNUTX + '" y="' + by + '" width="' + (DEND - DNUTX) + '" height="' + bh + '" fill="#5a3a24"/>';
    // cejuela
    s += '<rect x="' + (DNUTX - 6) + '" y="' + by + '" width="6" height="' + bh + '" fill="#f5efe0"/>';
    // trastes
    for (var n = 1; n <= NFRETS; n++) { var x = drawnFretX(n); s += '<line x1="' + x + '" y1="' + by + '" x2="' + x + '" y2="' + (by + bh) + '" stroke="#c9c9c9" stroke-width="2"/>'; }
    // inlays
    [3, 5, 7, 9].forEach(function (n) { var xi = drawnMarkX(n); s += '<circle cx="' + xi + '" cy="' + mid + '" r="6" fill="#efe4c8"/>'; });
    var x12 = drawnMarkX(12); s += '<circle cx="' + x12 + '" cy="' + (DTOP + (DBOT - DTOP) * 0.3) + '" r="6" fill="#efe4c8"/><circle cx="' + x12 + '" cy="' + (DTOP + (DBOT - DTOP) * 0.7) + '" r="6" fill="#efe4c8"/>';
    // cuerdas (6ª la más gruesa)
    for (var i = 0; i < 6; i++) { var y = drawnStrY(i); s += '<line x1="' + DNUTX + '" y1="' + y + '" x2="' + DEND + '" y2="' + y + '" stroke="#e8e2d0" stroke-width="' + (1 + (5 - i) * 0.5) + '"/>'; }
    // números de traste (debajo)
    for (var n2 = 1; n2 <= NFRETS; n2++) { if ([3, 5, 7, 9, 12].indexOf(n2) >= 0) { s += '<text x="' + drawnMarkX(n2) + '" y="' + (DBOT + 30) + '" font-family="Arial" font-size="13" fill="#8b6914" text-anchor="middle">' + n2 + '</text>'; } }
    s += '<g class="tm-gt-dmarks"></g></svg>';
    return s;
  }

  function tmGuitarraEngine(id) {
    injectCSS();
    var wrap = document.getElementById(id); if (!wrap) return;
    var uid = id;
    var btns = '';
    for (var m = PMIN; m <= PMAX; m++) {
      var p = pc(m), lab = SHARP[p] + '<span class="o">' + sub(octave(m)) + '</span>';
      btns += '<button class="tm-gt-btn" data-m="' + m + '">' + lab + '</button>';
    }
    wrap.innerHTML =
      '<div class="tm-gt-wrap">' +
        '<div class="tm-gt-readout" id="' + uid + '_ro"><span class="tm-gt-hint">Elige una nota para verla en el mástil, en tablatura y en el pentagrama</span></div>' +
        '<div class="tm-gt-diagrams">' +
          '<div class="tm-gt-col"><div class="tm-gt-photo-wrap">' +
            '<picture><source type="image/webp" srcset="/assets/img/guitarra/mastil.webp"><img class="tm-gt-photo" src="/assets/img/guitarra/mastil.jpg" alt="Mástil de una guitarra clásica en posición de tocar, foto real"></picture>' +
            '<svg class="tm-gt-photo-ov" viewBox="0 0 ' + IMG_W + ' ' + IMG_H + '" preserveAspectRatio="xMidYMid meet" style="position:absolute;left:0;top:0;width:100%;height:100%;"><g class="tm-gt-pmarks"></g></svg>' +
          '</div><div class="tm-gt-cap">Foto real</div></div>' +
          '<div class="tm-gt-col">' + buildDrawn() + '<div class="tm-gt-cap">Diapasón</div></div>' +
        '</div>' +
        '<div class="tm-gt-tabwrap"><div class="tm-gt-tab" id="' + uid + '_tab"></div></div>' +
        '<div class="tm-gt-btns">' + btns + '</div>' +
      '</div>';

    var ro = document.getElementById(uid + '_ro');
    var tab = document.getElementById(uid + '_tab');
    var pov = wrap.querySelector('.tm-gt-pmarks');
    var dov = wrap.querySelector('.tm-gt-dmarks');
    var audio = new Audio();

    function play(m) {
      try { audio.pause(); } catch (e) {}
      audio.src = '/assets/audio/guitarra/' + sampleFile(m) + '.mp3';
      audio.currentTime = 0; var pr = audio.play(); if (pr && pr.catch) pr.catch(function () {});
    }

    function renderStaff(m) {
      var el = document.getElementById(uid + '_staff'); if (!el || typeof Vex === 'undefined') return;
      el.innerHTML = '';
      var V = Vex.Flow, r = new V.Renderer(el, V.Renderer.Backends.SVG);
      r.resize(160, 150); var ctx = r.getContext(); ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(2, 30, 150); stave.addClef('treble').setContext(ctx).draw();
      var vn = vfKey(m);
      var note = new V.StaveNote({ keys: [vn.key], duration: 'w', clef: 'treble' });
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
      // orden tab estándar: 1ª (mi agudo) arriba ... 6ª (Mi grave) abajo
      var lab = ['e', 'B', 'G', 'D', 'A', 'E'];
      var byS = {}; pos.forEach(function (p) { byS[p.i] = p.fret; });
      var out = [];
      for (var row = 0; row < 6; row++) {
        var i = 5 - row;                       // row 0 -> 1ª (i=5)
        var f = (i in byS) ? byS[i] : null;
        var cell = f === null ? '───' : (f < 10 ? ('─' + f + '─') : ('─' + f));
        out.push(lab[row] + ' │──' + cell + '──│');
      }
      return out.join('\n');
    }

    function pick(m, btn) {
      wrap.querySelectorAll('.tm-gt-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var pos = positions(m);
      // marcadores foto
      var ps = '';
      pos.forEach(function (p) {
        var xy = photoXY(p.i, p.fret);
        if (p.fret === 0) ps += '<circle class="tm-gt-mk-open" cx="' + xy[0].toFixed(1) + '" cy="' + xy[1].toFixed(1) + '" r="11"/>';
        else ps += '<circle class="tm-gt-mk" cx="' + xy[0].toFixed(1) + '" cy="' + xy[1].toFixed(1) + '" r="13"/>';
      });
      pov.innerHTML = ps;
      // marcadores dibujado
      var ds = '';
      pos.forEach(function (p) {
        var x = drawnMarkX(p.fret), y = drawnStrY(p.i);
        if (p.fret === 0) ds += '<circle class="tm-gt-mk-open" cx="' + x + '" cy="' + y + '" r="9"/>';
        else { ds += '<circle class="tm-gt-mk" cx="' + x + '" cy="' + y + '" r="11"/>'; ds += '<text class="tm-gt-mklab" x="' + x + '" y="' + (y + 4) + '" font-size="10">' + p.fret + '</text>'; }
      });
      dov.innerHTML = ds;
      // lista de posiciones legible
      var human = pos.map(function (p) { return p.fret === 0 ? (CUERDA_NOM[p.i] + ' al aire') : (CUERDA_NOM[p.i] + ' traste ' + p.fret); }).join(' · ');
      ro.innerHTML =
        '<div class="tm-gt-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-gt-noterow"><span class="tm-gt-name">' + nameFull(m) + '</span>' +
        '<button class="tm-gt-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-gt-sub">' + human + '</div>' +
        '<div class="tm-gt-sub">Se escribe una 8ª más arriba de lo que suena (clave de sol).</div>';
      tab.textContent = tabLines(pos);
      renderStaff(m);
      var pb = ro.querySelector('.tm-gt-play'); if (pb) pb.addEventListener('click', function () { play(m); });
      play(m);
    }

    wrap.querySelectorAll('.tm-gt-btn').forEach(function (b) { b.addEventListener('click', function () { pick(+b.dataset.m, b); }); });
  }

  window.tmGuitarraEngine = tmGuitarraEngine;
})();
