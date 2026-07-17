/* Diagrama del VIOLÍN (1.ª posición) — FOTO REAL + dónde pisar la cuerda, interactivo.
   A diferencia del viento, la nota no está en un botón: es el PUNTO exacto donde el dedo
   acorta la cuerda. Aquí se marca sobre una foto real dónde hay que pisar (no el número de
   dedo, que confunde al principiante). El violín NO tiene trastes: los puntos son la posición
   física de cada nota, calculada con la fórmula de la cuerda (d = L·(1−2^(−n/12))).
   4 cuerdas por QUINTAS JUSTAS: Sol₃·Re₄·La₄·Mi₅. No transpone, clave de sol. Rango Sol₃–Si₅.
   La MISMA nota vive en varios sitios (Re₄ = 4.º dedo en Sol o Re al aire) → se marcan todos.
   Toggle arco/pizzicato (dos bancos de sonido). Sonido: violín de MuseScore / Muse Sounds.
   Uso: <div id="x"></div><script>tmViolinEngine('x');</script> */
(function () {
  'use strict';

  var SVG_W = 3089, SVG_H = 1213;   // = píxeles de diagrama.jpg (VIOLÍN ENTERO horizontal, voluta izq., mentonera abajo = como en las fotos reales)
  // Punto donde se pisa cada nota (x,y sobre la foto del violín entero), de la cuerda al aire (n:0)
  // a la OCTAVA (n:12). Se marca hasta la octava porque cae en la mitad EXACTA de la cuerda
  // (verificable); más arriba no podemos garantizar el punto sobre la foto (se dice en el texto).
  var PTS = [
    {s:'Sol',n:0,x:519,y:560,nota:'G3',midi:55},
    {s:'Sol',n:1,x:615,y:563,nota:'Gs3',midi:56},
    {s:'Sol',n:2,x:705,y:565,nota:'A3',midi:57},
    {s:'Sol',n:3,x:791,y:568,nota:'As3',midi:58},
    {s:'Sol',n:4,x:871,y:570,nota:'B3',midi:59},
    {s:'Sol',n:5,x:947,y:572,nota:'C4',midi:60},
    {s:'Sol',n:6,x:1019,y:574,nota:'Cs4',midi:61},
    {s:'Sol',n:7,x:1087,y:576,nota:'D4',midi:62},
    {s:'Sol',n:8,x:1151,y:578,nota:'Ds4',midi:63},
    {s:'Sol',n:9,x:1211,y:580,nota:'E4',midi:64},
    {s:'Sol',n:10,x:1268,y:581,nota:'F4',midi:65},
    {s:'Sol',n:11,x:1322,y:583,nota:'Fs4',midi:66},
    {s:'Sol',n:12,x:1372,y:584,nota:'G4',midi:67},
    {s:'Re',n:0,x:519,y:531,nota:'D4',midi:62},
    {s:'Re',n:1,x:615,y:531,nota:'Ds4',midi:63},
    {s:'Re',n:2,x:705,y:532,nota:'E4',midi:64},
    {s:'Re',n:3,x:791,y:533,nota:'F4',midi:65},
    {s:'Re',n:4,x:871,y:533,nota:'Fs4',midi:66},
    {s:'Re',n:5,x:947,y:534,nota:'G4',midi:67},
    {s:'Re',n:6,x:1019,y:534,nota:'Gs4',midi:68},
    {s:'Re',n:7,x:1087,y:535,nota:'A4',midi:69},
    {s:'Re',n:8,x:1151,y:535,nota:'As4',midi:70},
    {s:'Re',n:9,x:1211,y:536,nota:'B4',midi:71},
    {s:'Re',n:10,x:1268,y:536,nota:'C5',midi:72},
    {s:'Re',n:11,x:1322,y:536,nota:'Cs5',midi:73},
    {s:'Re',n:12,x:1372,y:537,nota:'D5',midi:74},
    {s:'La',n:0,x:519,y:507,nota:'A4',midi:69},
    {s:'La',n:1,x:615,y:505,nota:'As4',midi:70},
    {s:'La',n:2,x:705,y:503,nota:'B4',midi:71},
    {s:'La',n:3,x:791,y:501,nota:'C5',midi:72},
    {s:'La',n:4,x:871,y:499,nota:'Cs5',midi:73},
    {s:'La',n:5,x:947,y:498,nota:'D5',midi:74},
    {s:'La',n:6,x:1019,y:496,nota:'Ds5',midi:75},
    {s:'La',n:7,x:1087,y:495,nota:'E5',midi:76},
    {s:'La',n:8,x:1151,y:493,nota:'F5',midi:77},
    {s:'La',n:9,x:1211,y:492,nota:'Fs5',midi:78},
    {s:'La',n:10,x:1268,y:491,nota:'G5',midi:79},
    {s:'La',n:11,x:1322,y:490,nota:'Gs5',midi:80},
    {s:'La',n:12,x:1372,y:489,nota:'A5',midi:81},
    {s:'Mi',n:0,x:519,y:480,nota:'E5',midi:76},
    {s:'Mi',n:1,x:615,y:476,nota:'F5',midi:77},
    {s:'Mi',n:2,x:705,y:473,nota:'Fs5',midi:78},
    {s:'Mi',n:3,x:791,y:470,nota:'G5',midi:79},
    {s:'Mi',n:4,x:871,y:467,nota:'Gs5',midi:80},
    {s:'Mi',n:5,x:947,y:464,nota:'A5',midi:81},
    {s:'Mi',n:6,x:1019,y:462,nota:'As5',midi:82},
    {s:'Mi',n:7,x:1087,y:459,nota:'B5',midi:83},
    {s:'Mi',n:8,x:1151,y:457,nota:'C6',midi:84},
    {s:'Mi',n:9,x:1211,y:455,nota:'Cs6',midi:85},
    {s:'Mi',n:10,x:1268,y:453,nota:'D6',midi:86},
    {s:'Mi',n:11,x:1322,y:451,nota:'Ds6',midi:87},
    {s:'Mi',n:12,x:1372,y:449,nota:'E6',midi:88}
  ];
  var CUERDA_NOM = { Sol:'Sol', Re:'Re', La:'La', Mi:'Mi' };

  // orden de botones: cromático por altura real (Sol₃…Si₅), sin duplicar las notas de solape
  var BYNOTE = {};
  PTS.forEach(function (p) { (BYNOTE[p.nota] = BYNOTE[p.nota] || []).push(p); });
  var ORDEN = Object.keys(BYNOTE).sort(function (a, b) { return BYNOTE[a][0].midi - BYNOTE[b][0].midi; });

  var NM = {C:'Do',D:'Re',E:'Mi',F:'Fa',G:'Sol',A:'La',B:'Si'};
  var SUB = {'0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈'};
  function parse(f) { return /^([A-G])(s?)(\d)$/.exec(f); }
  function label(f) {   // 'Gs3' -> 'Sol♯₃'
    var m = parse(f); return m ? NM[m[1]] + (m[2] ? '♯' : '') + SUB[m[3]] : f;
  }
  function vfKey(f) { var m = parse(f); return m[1].toLowerCase() + (m[2] ? '#' : '') + '/' + m[3]; }

  var AUDIO = { arco: '/assets/audio/violin/', pizz: '/assets/audio/violin-pizz/' };
  var AUDIO_V = '1';

  var CSS = [
    '.tm-vl-wrap{margin:18px 0;}',
    '.tm-vl-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-vl-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-vl-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-vl-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-vl-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-vl-play:hover{background:#6b5010;}',
    '.tm-vl-donde{font-size:.92rem;color:#555;margin-top:4px;}',
    '.tm-vl-multi{font-size:.84rem;color:#8b6914;margin-top:4px;}',
    '.tm-vl-staff{display:flex;justify-content:center;align-items:center;min-height:118px;}',
    '.tm-vl-staff svg{max-width:100%;height:auto;}',
    '.tm-vl-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:8px;}',
    '.tm-vl-photo{position:relative;max-width:100%;margin:0 auto;}',
    '.tm-vl-img{display:block;width:100%;height:auto;border-radius:6px;}',
    '.tm-vl-svg{position:absolute;inset:0;width:100%;height:100%;}',
    '.tm-vl-cuerdas{text-align:center;font-size:.8rem;color:#777;margin-top:8px;}',
    '.tm-vl-mk{opacity:0;transition:opacity .15s;}',
    '.tm-vl-mk.on{opacity:1;}',
    '.tm-vl-mk circle{fill:#ff9500;stroke:#fff;stroke-width:3;filter:drop-shadow(0 0 5px rgba(0,0,0,.6));}',
    '.tm-vl-mk.aire circle{fill:#4da3ff;}',
    '.tm-vl-legend{text-align:center;font-size:.78rem;color:#777;margin-top:8px;}',
    '.tm-vl-sw{display:inline-block;width:11px;height:11px;border-radius:50%;margin:0 4px 0 10px;vertical-align:-1px;}',
    '.tm-vl-credit{font-size:.72rem;color:#9a9a9a;text-align:center;margin-top:6px;}',
    '.tm-vl-credit a{color:inherit;}',
    '.tm-vl-modo{display:flex;gap:0;justify-content:center;margin:12px 0 0;}',
    '.tm-vl-modo button{padding:7px 16px;border:1px solid #d8d0b8;background:#f5f2ea;font-family:inherit;font-weight:600;cursor:pointer;}',
    '.tm-vl-modo button:first-child{border-radius:6px 0 0 6px;}',
    '.tm-vl-modo button:last-child{border-radius:0 6px 6px 0;border-left:none;}',
    '.tm-vl-modo button.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-vl-btns{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:12px;}',
    '.tm-vl-btn{min-width:44px;padding:8px 10px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.92rem;}',
    '.tm-vl-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-vl-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-vl-css')) return;
    var s = document.createElement('style'); s.id = 'tm-vl-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function tmViolinEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId, modo = 'arco';

    var marks = PTS.map(function (p, i) {
      var r = p.n === 0 ? 32 : 26;
      return '<g class="tm-vl-mk' + (p.n === 0 ? ' aire' : '') + '" data-i="' + i + '">' +
        '<circle cx="' + p.x + '" cy="' + p.y + '" r="' + r + '"/></g>';
    }).join('');

    var btns = ORDEN.map(function (f) {
      return '<button class="tm-vl-btn" data-n="' + f + '">' + label(f) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-vl-wrap">' +
        '<div class="tm-vl-readout" id="' + uid + '_ro"><span class="tm-vl-hint">Elige una nota y verás dónde pisar la cuerda</span></div>' +
        '<div class="tm-vl-diagram">' +
          '<div class="tm-vl-photo">' +
            '<picture><source type="image/webp" srcset="/assets/img/violin/diagrama.webp">' +
            '<img class="tm-vl-img" src="/assets/img/violin/diagrama.jpg" width="3089" height="1213" loading="lazy" alt="Un violín entero visto de frente; sobre su diapasón se marca el punto exacto donde pisar cada nota, para ver a qué altura de la cuerda queda"></picture>' +
            '<svg class="tm-vl-svg" viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '" preserveAspectRatio="none" role="img" aria-label="Sobre la foto de un violín entero se ilumina el punto del diapasón donde poner el dedo para cada nota">' +
              marks +
            '</svg>' +
          '</div>' +
          '<div class="tm-vl-cuerdas">Cuerdas (de arriba abajo): <strong>Mi · La · Re · Sol</strong></div>' +
          '<div class="tm-vl-legend">' +
            '<span class="tm-vl-sw" style="background:#4da3ff"></span>cuerda al aire' +
            '<span class="tm-vl-sw" style="background:#ff9500"></span>dónde pisar · <em>el violín no tiene trastes: es el punto exacto</em>' +
          '</div>' +
          '<div class="tm-vl-modo" role="group" aria-label="Tipo de sonido">' +
            '<button data-m="arco" class="sel">🎻 Arco</button><button data-m="pizz">Pizzicato</button>' +
          '</div>' +
          '<p class="tm-vl-credit">Foto: Just plain Bill / A. Kniesel vía <a href="https://commons.wikimedia.org/wiki/File:Violin_front.jpg" target="_blank" rel="noopener">Wikimedia Commons</a> · Sonido: violín de MuseScore / Muse Sounds</p>' +
        '</div>' +
        '<div class="tm-vl-btns">' + btns + '</div>' +
      '</div>';

    var ro = document.getElementById(uid + '_ro');
    var svg = wrap.querySelector('.tm-vl-svg');
    var audio = new Audio();

    function play(f) {
      try { audio.pause(); } catch (e) {}
      audio.src = AUDIO[modo] + f + '.mp3?v=' + AUDIO_V;
      audio.currentTime = 0;
      var pr = audio.play(); if (pr && pr.catch) pr.catch(function () {});
    }

    function renderStaff(f) {
      var el = document.getElementById(uid + '_staff');
      if (!el || typeof Vex === 'undefined') return;
      el.innerHTML = '';
      var m = parse(f); if (!m) return;
      var V = Vex.Flow;
      var r = new V.Renderer(el, V.Renderer.Backends.SVG);
      r.resize(150, 150);
      var ctx = r.getContext(); ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(2, 34, 132);
      stave.addClef('treble').setContext(ctx).draw();
      var note = new V.StaveNote({ keys: [vfKey(f)], duration: 'w', clef: 'treble' });
      if (m[2]) note.addModifier(new V.Accidental('#'), 0);
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([note]);
      new V.Formatter().joinVoices([voice]).format([voice], 80);
      voice.draw(ctx, stave);
      var s = el.querySelector('svg');
      if (s) { s.setAttribute('viewBox', '0 0 150 150'); s.style.width = '128px'; s.style.maxWidth = '100%'; s.style.height = 'auto'; }
    }

    var currentNote = null;
    function pick(f, btn) {
      currentNote = f;
      wrap.querySelectorAll('.tm-vl-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      svg.querySelectorAll('.tm-vl-mk').forEach(function (g) { g.classList.remove('on'); });

      var sitios = BYNOTE[f] || [];
      sitios.forEach(function (p) {
        var idx = PTS.indexOf(p);
        var g = svg.querySelector('.tm-vl-mk[data-i="' + idx + '"]');
        if (g) g.classList.add('on');
      });
      var txt = sitios.map(function (p) {
        return p.n === 0 ? 'cuerda <strong>' + CUERDA_NOM[p.s] + '</strong> al aire'
                         : 'en la cuerda <strong>' + CUERDA_NOM[p.s] + '</strong> (donde marca el punto)';
      }).join(' &nbsp;·&nbsp; o bien &nbsp;·&nbsp; ');

      ro.innerHTML =
        '<div class="tm-vl-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-vl-noterow"><span class="tm-vl-intl">' + label(f) + '</span>' +
        '<button class="tm-vl-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-vl-donde">' + txt + '</div>' +
        (sitios.length > 1
          ? '<div class="tm-vl-multi">La misma nota en ' + sitios.length + ' sitios: al aire suena más brillante; pisada, más cálida y admite vibrato.</div>'
          : '');
      renderStaff(f);
      var pb = ro.querySelector('.tm-vl-play');
      if (pb) pb.addEventListener('click', function () { play(f); });
      play(f);
    }

    wrap.querySelectorAll('.tm-vl-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
    wrap.querySelectorAll('.tm-vl-modo button').forEach(function (b) {
      b.addEventListener('click', function () {
        modo = b.dataset.m;
        wrap.querySelectorAll('.tm-vl-modo button').forEach(function (x) { x.classList.remove('sel'); });
        b.classList.add('sel');
        if (currentNote) play(currentNote);
      });
    });
  }

  window.tmViolinEngine = tmViolinEngine;
})();
