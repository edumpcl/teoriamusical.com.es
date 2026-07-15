/* Digitaciones de la trompa (trompa DOBLE en Fa/Si♭) — interactivo.
   Muestra DOS diagramas sobre foto real: digitación por el lado de FA (pulgar
   pulsado) y por el lado de SI♭ (pulgar suelto). Se iluminan los rotores usados
   (T = pulgar/cambio, 1·2·3 = dedos). El intérprete elige el lado que suene mejor.
   La trompa en Fa TRANSPONE: suena una 5ª justa (7 semitonos) por debajo de lo escrito.
   Rango escrito Do2–Do6. Audio real de Fa2 a Do6; las 5 graves (Do2–Mi2), pendientes.
   Uso: <div id="x"></div><script>tmTrompaEngine('x');</script>
   Convención (según la trompa del autor): pulgar SUELTO = Si♭, pulgar PULSADO = Fa. */
(function () {
  'use strict';

  // Rotores sobre la FOTO (viewBox 1000×642). T = válvula del pulgar (cambio Fa/Si♭).
  // Coordenadas marcadas por el usuario sobre la foto (herramienta de clic).
  // De ARRIBA a abajo los rotores son: 1, 2, 3, 4 (4 = pulgar/cambio, la de abajo).
  var KEYS = {
    V1: { x: 841, y: 293 },
    V2: { x: 830, y: 348 },
    V3: { x: 819, y: 406 },
    T:  { x: 817, y: 465 }
  };
  var SVG_W = 1000, SVG_H = 642, ROT_R = 25;

  // Digitación por lado, "fa|sib". 0=al aire, dígitos=válvulas, '-'=ese lado no se usa.
  // (Primera digitación —la más afinada— de la tabla de trompa doble.)
  var CHART = {
    'Do2':'0|13','Do#2':'-|23','Re2':'-|12','Re#2':'-|1','Mi2':'-|2','Fa2':'-|0',
    'Fa#2':'123|-','Sol2':'13|-','Sol#2':'23|-','La2':'12|-','La#2':'1|-','Si2':'2|123',
    'Do3':'0|13','Do#3':'123|23','Re3':'13|12','Re#3':'23|1','Mi3':'12|2','Fa3':'1|0',
    'Fa#3':'2|123','Sol3':'0|13','Sol#3':'23|23','La3':'12|12','La#3':'1|1','Si3':'2|2',
    'Do4':'0|0','Do#4':'12|23','Re4':'1|12','Re#4':'2|1','Mi4':'0|2','Fa4':'1|0',
    'Fa#4':'2|12','Sol4':'0|1','Sol#4':'23|23','La4':'12|12','La#4':'1|1','Si4':'2|2',
    'Do5':'0|0','Do#5':'12|23','Re5':'0|12','Re#5':'2|1','Mi5':'0|2','Fa5':'1|0',
    'Fa#5':'2|2','Sol5':'0|0','Sol#5':'23|23','La5':'12|12','La#5':'1|1','Si5':'2|2',
    'Do6':'0|0'
  };
  var ORDEN = Object.keys(CHART);
  // Las 5 graves aún no tienen audio (las grabará el autor con su trompa).
  var SIN_AUDIO = { 'Do2':1, 'Do#2':1, 'Re2':1, 'Re#2':1, 'Mi2':1 };

  function parseVal(s) {
    if (s === '-') return null;
    if (s === '0') return [];
    return s.split('').map(function (d) { return 'V' + d; });
  }
  function comboText(valves, thumb) {
    if (valves === null) return null;
    var parts = [];
    if (thumb) parts.push('pulgar');
    if (valves.length) parts.push(valves.map(function (v) { return v.slice(1); }).join('·'));
    return parts.length ? parts.join(' + ') : 'al aire';
  }

  var SUB = { '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆' };
  function label(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    return m ? m[1] + (m[2] ? '♯' : '') + SUB[m[3]] : n;
  }
  var LETTER = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  var ES = ['Do', 'Do♯', 'Re', 'Re♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si'];
  function midiOf(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return null;
    var semis = { Do: 0, Re: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 };
    return semis[m[1]] + (m[2] ? 1 : 0) + (parseInt(m[3], 10) + 1) * 12;
  }
  // La trompa en Fa suena una 5ª justa (7 semitonos) por debajo de lo escrito.
  function suena(n) {
    var midi = midiOf(n) - 7;
    return ES[((midi % 12) + 12) % 12] + (SUB[String(Math.floor(midi / 12) - 1)] || ('' + (Math.floor(midi / 12) - 1)));
  }
  function registro(n) {
    var i = ORDEN.indexOf(n);
    if (i <= ORDEN.indexOf('Si2')) return 'Registro grave';
    if (i <= ORDEN.indexOf('Si3')) return 'Registro medio-grave';
    if (i <= ORDEN.indexOf('Si4')) return 'Registro medio';
    return 'Registro agudo';
  }
  function sampleFile(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    return m ? LETTER[m[1]] + (m[2] ? 's' : '') + m[3] : null;
  }
  function vfNote(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return null;
    var acc = m[2] ? '#' : null;
    return {
      key: LETTER[m[1]].toLowerCase() + (acc || '') + '/' + m[3],
      acc: acc,
      clef: midiOf(n) < 60 ? 'bass' : 'treble'
    };
  }
  var AUDIO_BASE = '/assets/audio/trompa/';

  var CSS = [
    '.tm-tp-wrap{margin:18px 0;}',
    '.tm-tp-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-tp-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-tp-fings{font-size:.9rem;color:#8b6914;margin-top:6px;line-height:1.5;}',
    '.tm-tp-fings b{color:#6b5010;}',
    '.tm-tp-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-tp-diagram{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;}',
    '.tm-tp-side{flex:1 1 300px;min-width:0;max-width:420px;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:8px;}',
    '.tm-tp-side-lbl{text-align:center;font-weight:800;color:#1a1a1a;margin-bottom:4px;}',
    '.tm-tp-side-lbl span{font-weight:600;color:#8b6914;font-size:.85rem;}',
    '.tm-tp-photo{position:relative;}',
    '.tm-tp-img{display:block;width:100%;height:auto;border-radius:6px;}',
    '.tm-tp-svg{position:absolute;inset:0;width:100%;height:100%;}',
    '.tm-tp-dim .tm-tp-img{filter:grayscale(1) opacity(.45);}',
    '.tm-tp-na{position:absolute;inset:0;display:none;align-items:center;justify-content:center;font-weight:700;color:#8b6914;background:rgba(253,252,249,.72);border-radius:6px;text-align:center;padding:10px;}',
    '.tm-tp-na.show{display:flex;}',
    '.tm-tp-rot .r-cap{fill:#fff;fill-opacity:.10;stroke:rgba(120,90,0,.4);stroke-width:2;transition:all .15s;}',
    '.tm-tp-rot.on .r-cap{fill:#ff9500;fill-opacity:.9;stroke:#fff;stroke-width:4;filter:drop-shadow(0 0 8px #ff9500);}',
    '.tm-tp-rot .r-num{font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:bold;fill:#fff;fill-opacity:.5;text-anchor:middle;dominant-baseline:central;transition:all .15s;}',
    '.tm-tp-rot.on .r-num{fill:#3a2b00;fill-opacity:1;}',
    '.tm-tp-credit{font-size:.72rem;color:#9a9a9a;text-align:center;margin-top:6px;}',
    '.tm-tp-credit a{color:inherit;}',
    '.tm-tp-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-tp-btn{min-width:46px;padding:10px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-tp-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-tp-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-tp-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-tp-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-tp-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-tp-play:hover{background:#6b5010;}',
    '.tm-tp-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-tp-staff svg{max-width:100%;height:auto;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-tp-css')) return;
    var s = document.createElement('style'); s.id = 'tm-tp-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function rotorsSvg() {
    return Object.keys(KEYS).map(function (id) {
      var k = KEYS[id], lbl = id === 'T' ? '4' : id.slice(1);
      return '<g class="tm-tp-rot" data-c="' + id + '">' +
        '<circle class="r-cap" cx="' + k.x + '" cy="' + k.y + '" r="' + ROT_R + '"/>' +
        '<text class="r-num" x="' + k.x + '" y="' + k.y + '">' + lbl + '</text></g>';
    }).join('');
  }
  function sideBlock(uid, side, title, sub) {
    return '<div class="tm-tp-side">' +
      '<div class="tm-tp-side-lbl">' + title + ' <span>' + sub + '</span></div>' +
      '<div class="tm-tp-photo" id="' + uid + '_' + side + '">' +
        '<picture><source type="image/webp" srcset="/assets/img/trompa/instrumento.webp">' +
        '<img class="tm-tp-img" src="/assets/img/trompa/instrumento.jpg" width="1000" height="642" loading="lazy" alt="Trompa doble en Fa/Si bemol con la campana a la izquierda y las cuatro válvulas de rotor a la derecha"></picture>' +
        '<svg class="tm-tp-svg" viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Diagrama de válvulas de la trompa (' + title + '): se iluminan los rotores que se pulsan">' + rotorsSvg() + '</svg>' +
        '<div class="tm-tp-na">Esta nota no se toca por este lado</div>' +
      '</div></div>';
  }

  function tmTrompaEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var btns = ORDEN.map(function (n) {
      return '<button class="tm-tp-btn" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-tp-wrap">' +
        '<div class="tm-tp-readout" id="' + uid + '_ro"><span class="tm-tp-hint">Elige una nota para ver su digitación</span></div>' +
        '<div class="tm-tp-diagram">' +
          sideBlock(uid, 'fa', 'Digitación en Fa', 'pulgar pulsado') +
          sideBlock(uid, 'sib', 'Digitación en Si♭', 'pulgar suelto') +
        '</div>' +
        '<p class="tm-tp-credit">Foto: Yamaha Corporation vía <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Horn_YHR-667V.png" target="_blank" rel="noopener">Wikimedia Commons</a>, CC BY-SA 4.0 · Audio: Univ. of Iowa Musical Instrument Samples</p>' +
        '<div class="tm-tp-btns">' + btns + '</div>' +
      '</div>';

    var ro = document.getElementById(uid + '_ro');
    var audio = new Audio();

    function play(n) {
      if (SIN_AUDIO[n]) return;
      var f = sampleFile(n);
      if (!f) return;
      try { audio.pause(); } catch (e) {}
      audio.src = AUDIO_BASE + f + '.mp3';
      audio.currentTime = 0;
      var pr = audio.play();
      if (pr && pr.catch) pr.catch(function () {});
    }

    function setSide(side, valves, thumb) {
      var box = document.getElementById(uid + '_' + side);
      var na = box.querySelector('.tm-tp-na');
      box.querySelectorAll('.tm-tp-rot').forEach(function (g) { g.classList.remove('on'); });
      if (valves === null) { na.classList.add('show'); box.classList.add('tm-tp-dim'); return; }
      na.classList.remove('show'); box.classList.remove('tm-tp-dim');
      var lit = valves.slice(); if (thumb) lit.push('T');
      lit.forEach(function (id) {
        var g = box.querySelector('.tm-tp-rot[data-c="' + id + '"]'); if (g) g.classList.add('on');
      });
    }

    function renderStaff(n) {
      var el = document.getElementById(uid + '_staff');
      if (!el || typeof Vex === 'undefined') return;
      el.innerHTML = '';
      var vn = vfNote(n); if (!vn) return;
      var V = Vex.Flow;
      var r = new V.Renderer(el, V.Renderer.Backends.SVG);
      r.resize(160, 150);
      var ctx = r.getContext(); ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(2, 24, 140);
      stave.addClef(vn.clef).setContext(ctx).draw();
      var note = new V.StaveNote({ keys: [vn.key], duration: 'w', clef: vn.clef });
      if (vn.acc) note.addModifier(new V.Accidental(vn.acc), 0);
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([note]);
      new V.Formatter().joinVoices([voice]).format([voice], 90);
      voice.draw(ctx, stave);
      var s = el.querySelector('svg');
      if (s) { s.setAttribute('viewBox', '0 0 160 150'); s.style.width = '150px'; s.style.maxWidth = '100%'; s.style.height = 'auto'; }
    }

    function pick(n, btn) {
      wrap.querySelectorAll('.tm-tp-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');

      var parts = CHART[n].split('|');
      var fa = parseVal(parts[0]), sib = parseVal(parts[1]);
      setSide('fa', fa, true);    // FA = pulgar pulsado
      setSide('sib', sib, false); // SI♭ = pulgar suelto

      var faTxt = comboText(fa, true), sibTxt = comboText(sib, false);
      var playBtn = SIN_AUDIO[n]
        ? '<span class="tm-tp-play" title="Sonido pendiente de grabar" style="background:#c9bfa3;cursor:default">·</span>'
        : '<button class="tm-tp-play" type="button" aria-label="Reproducir la nota">▶</button>';
      ro.innerHTML =
        '<div class="tm-tp-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-tp-noterow"><span class="tm-tp-intl">' + label(n) + '</span>' + playBtn + '</div>' +
        '<div class="tm-tp-reg">' + registro(n) + ' · suena ' + suena(n) + (SIN_AUDIO[n] ? ' · <em>sonido pendiente</em>' : '') + '</div>' +
        '<div class="tm-tp-fings"><b>Fa</b> (pulgar ↓): ' + (faTxt || '—') + ' &nbsp;·&nbsp; <b>Si♭</b> (pulgar ↑): ' + (sibTxt || '—') + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('button.tm-tp-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    wrap.querySelectorAll('.tm-tp-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmTrompaEngine = tmTrompaEngine;
})();
