/* Diagrama del VIOLONCHELO — FOTO REAL + dónde pisar la cuerda, interactivo.
   A diferencia del viento, la nota no está en un botón: es el PUNTO exacto donde el dedo
   acorta la cuerda. Aquí se marca sobre una foto real dónde hay que pisar (no el número de
   dedo, que confunde al principiante). El violonchelo NO tiene trastes: los puntos son la posición
   física de cada nota, calculada con la fórmula de la cuerda (d = L·(1−2^(−n/12))).
   4 cuerdas por QUINTAS JUSTAS: Do₂·Sol₂·Re₃·La₃ (una 8ª bajo la viola). No transpone, clave de FA. Vertical (voluta arriba).
   La MISMA nota vive en varios sitios (Re₄ = 4.º dedo en Sol o Re al aire) → se marcan todos.
   Toggle arco/pizzicato (dos bancos de sonido). Sonido: violonchelo de MuseScore / Muse Sounds.
   Uso: <div id="x"></div><script>tmCelloEngine('x');</script> */
(function () {
  'use strict';

  var SVG_W = 207, SVG_H = 655;   // = píxeles de diagrama.jpg (VIOLONCHELO ENTERO vertical, voluta arriba = como se toca, de pie)
  // Punto donde se pisa cada nota (x,y sobre la foto del violonchelo entero), de la cuerda al aire (n:0)
  // a la OCTAVA (n:12). Se marca hasta la octava porque cae en la mitad EXACTA de la cuerda
  // (verificable); más arriba no podemos garantizar el punto sobre la foto (se dice en el texto).
  var PTS = [
    {s:'Do',n:0,x:95,y:63,nota:'C2',midi:36},
    {s:'Do',n:1,x:95,y:81,nota:'Cs2',midi:37},
    {s:'Do',n:2,x:95,y:97,nota:'D2',midi:38},
    {s:'Do',n:3,x:95,y:113,nota:'Ds2',midi:39},
    {s:'Do',n:4,x:94,y:127,nota:'E2',midi:40},
    {s:'Do',n:5,x:94,y:141,nota:'F2',midi:41},
    {s:'Do',n:6,x:94,y:154,nota:'Fs2',midi:42},
    {s:'Do',n:7,x:94,y:167,nota:'G2',midi:43},
    {s:'Do',n:8,x:94,y:178,nota:'Gs2',midi:44},
    {s:'Do',n:9,x:94,y:189,nota:'A2',midi:45},
    {s:'Do',n:10,x:94,y:200,nota:'As2',midi:46},
    {s:'Do',n:11,x:94,y:210,nota:'B2',midi:47},
    {s:'Do',n:12,x:94,y:219,nota:'C3',midi:48},
    {s:'Sol',n:0,x:100,y:63,nota:'G2',midi:43},
    {s:'Sol',n:1,x:100,y:81,nota:'Gs2',midi:44},
    {s:'Sol',n:2,x:100,y:97,nota:'A2',midi:45},
    {s:'Sol',n:3,x:100,y:113,nota:'As2',midi:46},
    {s:'Sol',n:4,x:100,y:127,nota:'B2',midi:47},
    {s:'Sol',n:5,x:100,y:141,nota:'C3',midi:48},
    {s:'Sol',n:6,x:100,y:154,nota:'Cs3',midi:49},
    {s:'Sol',n:7,x:100,y:167,nota:'D3',midi:50},
    {s:'Sol',n:8,x:100,y:178,nota:'Ds3',midi:51},
    {s:'Sol',n:9,x:100,y:189,nota:'E3',midi:52},
    {s:'Sol',n:10,x:100,y:200,nota:'F3',midi:53},
    {s:'Sol',n:11,x:100,y:210,nota:'Fs3',midi:54},
    {s:'Sol',n:12,x:100,y:219,nota:'G3',midi:55},
    {s:'Re',n:0,x:104,y:63,nota:'D3',midi:50},
    {s:'Re',n:1,x:105,y:81,nota:'Ds3',midi:51},
    {s:'Re',n:2,x:105,y:97,nota:'E3',midi:52},
    {s:'Re',n:3,x:105,y:113,nota:'F3',midi:53},
    {s:'Re',n:4,x:105,y:127,nota:'Fs3',midi:54},
    {s:'Re',n:5,x:105,y:141,nota:'G3',midi:55},
    {s:'Re',n:6,x:106,y:154,nota:'Gs3',midi:56},
    {s:'Re',n:7,x:106,y:167,nota:'A3',midi:57},
    {s:'Re',n:8,x:106,y:178,nota:'As3',midi:58},
    {s:'Re',n:9,x:106,y:189,nota:'B3',midi:59},
    {s:'Re',n:10,x:106,y:200,nota:'C4',midi:60},
    {s:'Re',n:11,x:106,y:210,nota:'Cs4',midi:61},
    {s:'Re',n:12,x:106,y:219,nota:'D4',midi:62},
    {s:'La',n:0,x:109,y:63,nota:'A3',midi:57},
    {s:'La',n:1,x:109,y:81,nota:'As3',midi:58},
    {s:'La',n:2,x:110,y:97,nota:'B3',midi:59},
    {s:'La',n:3,x:110,y:113,nota:'C4',midi:60},
    {s:'La',n:4,x:111,y:127,nota:'Cs4',midi:61},
    {s:'La',n:5,x:111,y:141,nota:'D4',midi:62},
    {s:'La',n:6,x:111,y:154,nota:'Ds4',midi:63},
    {s:'La',n:7,x:111,y:167,nota:'E4',midi:64},
    {s:'La',n:8,x:112,y:178,nota:'F4',midi:65},
    {s:'La',n:9,x:112,y:189,nota:'Fs4',midi:66},
    {s:'La',n:10,x:112,y:200,nota:'G4',midi:67},
    {s:'La',n:11,x:113,y:210,nota:'Gs4',midi:68},
    {s:'La',n:12,x:113,y:219,nota:'A4',midi:69}
  ];
  var CUERDA_NOM = { Do:'Do', Sol:'Sol', Re:'Re', La:'La' };

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

  var AUDIO = { arco: '/assets/audio/violonchelo/', pizz: '/assets/audio/violonchelo-pizz/' };
  var AUDIO_V = '1';

  var CSS = [
    '.tm-vc-wrap{margin:18px 0;}',
    '.tm-vc-main{display:flex;gap:14px;align-items:flex-start;}',
    '.tm-vc-diagram{flex:0 0 auto;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;}',
    '.tm-vc-photo{position:relative;width:-moz-fit-content;width:fit-content;margin:0 auto;}',
    '.tm-vc-img{display:block;height:auto;max-height:min(46vh,360px);width:auto;max-width:100%;border-radius:6px;}',
    '.tm-vc-svg{position:absolute;inset:0;width:100%;height:100%;}',
    '.tm-vc-cuerdas{text-align:center;font-size:.72rem;color:#777;margin-top:6px;line-height:1.3;}',
    '.tm-vc-mk{opacity:0;transition:opacity .15s;}',
    '.tm-vc-mk.on{opacity:1;}',
    '.tm-vc-mk circle{fill:#ff9500;stroke:#fff;stroke-width:3;filter:drop-shadow(0 0 5px rgba(0,0,0,.6));}',
    '.tm-vc-mk.aire circle{fill:#4da3ff;}',
    '.tm-vc-side{flex:1 1 auto;min-width:0;}',
    '.tm-vc-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:10px;margin-bottom:10px;min-height:48px;}',
    '.tm-vc-hint{font-size:1rem;color:#999;font-weight:600;}',
    '.tm-vc-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-vc-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-vc-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-vc-play:hover{background:#6b5010;}',
    '.tm-vc-donde{font-size:.9rem;color:#555;margin-top:4px;}',
    '.tm-vc-multi{font-size:.82rem;color:#8b6914;margin-top:4px;}',
    '.tm-vc-staff{display:flex;justify-content:center;align-items:center;min-height:96px;}',
    '.tm-vc-staff svg{max-width:100%;height:auto;}',
    '.tm-vc-modo{display:flex;gap:0;justify-content:center;margin:0 0 10px;}',
    '.tm-vc-modo button{padding:7px 16px;border:1px solid #d8d0b8;background:#f5f2ea;font-family:inherit;font-weight:600;cursor:pointer;}',
    '.tm-vc-modo button:first-child{border-radius:6px 0 0 6px;}',
    '.tm-vc-modo button:last-child{border-radius:0 6px 6px 0;border-left:none;}',
    '.tm-vc-modo button.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-vc-btns{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;}',
    '.tm-vc-btn{min-width:42px;padding:7px 9px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.9rem;}',
    '.tm-vc-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-vc-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-vc-legend{text-align:center;font-size:.76rem;color:#777;margin-top:10px;}',
    '.tm-vc-sw{display:inline-block;width:11px;height:11px;border-radius:50%;margin:0 4px 0 10px;vertical-align:-1px;}',
    '.tm-vc-credit{font-size:.72rem;color:#9a9a9a;text-align:center;margin-top:8px;}',
    '.tm-vc-credit a{color:inherit;}',
    '@media (max-width:560px){' +
      '.tm-vc-main{gap:8px;}' +
      '.tm-vc-img{max-height:30vh;}' +
      '.tm-vc-readout{padding:8px;margin-bottom:8px;}' +
      '.tm-vc-staff{min-height:70px;}' +
      '.tm-vc-intl{font-size:1.25rem;}' +
      '.tm-vc-donde{font-size:.82rem;}' +
      '.tm-vc-multi{font-size:.76rem;}' +
      '.tm-vc-modo button{padding:6px 11px;}' +
      '.tm-vc-btn{min-width:34px;padding:6px 5px;font-size:.78rem;}' +
      '.tm-vc-cuerdas{font-size:.64rem;}' +
    '}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-vc-css')) return;
    var s = document.createElement('style'); s.id = 'tm-vc-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function tmCelloEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId, modo = 'arco';

    var marks = PTS.map(function (p, i) {
      var r = p.n === 0 ? 7 : 5;
      return '<g class="tm-vc-mk' + (p.n === 0 ? ' aire' : '') + '" data-i="' + i + '">' +
        '<circle cx="' + p.x + '" cy="' + p.y + '" r="' + r + '"/></g>';
    }).join('');

    var btns = ORDEN.map(function (f) {
      return '<button class="tm-vc-btn" data-n="' + f + '">' + label(f) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-vc-wrap">' +
        '<div class="tm-vc-readout" id="' + uid + '_ro"><span class="tm-vc-hint">Elige una nota y verás dónde pisar la cuerda</span></div>' +
        '<div class="tm-vc-main">' +
          '<div class="tm-vc-diagram">' +
            '<div class="tm-vc-photo">' +
              '<picture><source type="image/webp" srcset="/assets/img/violonchelo/diagrama.webp">' +
              '<img class="tm-vc-img" src="/assets/img/violonchelo/diagrama.jpg" width="207" height="655" loading="lazy" alt="Un violonchelo entero visto de frente, de pie; sobre su diapasón se marca el punto exacto donde pisar cada nota"></picture>' +
              '<svg class="tm-vc-svg" viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '" preserveAspectRatio="none" role="img" aria-label="Sobre la foto de un violonchelo entero se ilumina el punto del diapasón donde poner el dedo para cada nota">' +
                marks +
              '</svg>' +
            '</div>' +
            '<div class="tm-vc-cuerdas">Cuerdas (izq.→der.):<br><strong>Do · Sol · Re · La</strong></div>' +
          '</div>' +
          '<div class="tm-vc-side">' +
            '<div class="tm-vc-modo" role="group" aria-label="Tipo de sonido">' +
              '<button data-m="arco" class="sel">🎻 Arco</button><button data-m="pizz">Pizzicato</button>' +
            '</div>' +
            '<div class="tm-vc-btns">' + btns + '</div>' +
            '<div class="tm-vc-legend">' +
              '<span class="tm-vc-sw" style="background:#4da3ff"></span>cuerda al aire' +
              '<span class="tm-vc-sw" style="background:#ff9500"></span>dónde pisar · <em>no tiene trastes: es el punto exacto</em>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<p class="tm-vc-credit">Foto: Georg Feitscher vía <a href="https://commons.wikimedia.org/wiki/File:Cello_front_side.png" target="_blank" rel="noopener">Wikimedia Commons</a> (CC BY 3.0) · Sonido: violonchelo de MuseScore / Muse Sounds</p>' +
      '</div>';

    var ro = document.getElementById(uid + '_ro');
    var svg = wrap.querySelector('.tm-vc-svg');
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
      stave.addClef('bass').setContext(ctx).draw();
      var note = new V.StaveNote({ keys: [vfKey(f)], duration: 'w', clef: 'bass' });
      if (m[2]) note.addModifier(new V.Accidental('#'), 0);
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([note]);
      new V.Formatter().joinVoices([voice]).format([voice], 80);
      voice.draw(ctx, stave);
      var s = el.querySelector('svg');
      if (s) {
        var vb = '0 0 150 150';
        try { var bb = s.getBBox(); if (bb && bb.height) { var p = 6; vb = (bb.x - p) + ' ' + (bb.y - p) + ' ' + (bb.width + 2 * p) + ' ' + (bb.height + 2 * p); } } catch (e) {}
        s.setAttribute('viewBox', vb);
        s.style.width = '128px'; s.style.maxWidth = '100%'; s.style.height = 'auto';
      }
    }

    var currentNote = null;
    function pick(f, btn) {
      currentNote = f;
      wrap.querySelectorAll('.tm-vc-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      svg.querySelectorAll('.tm-vc-mk').forEach(function (g) { g.classList.remove('on'); });

      var sitios = BYNOTE[f] || [];
      sitios.forEach(function (p) {
        var idx = PTS.indexOf(p);
        var g = svg.querySelector('.tm-vc-mk[data-i="' + idx + '"]');
        if (g) g.classList.add('on');
      });
      var txt = sitios.map(function (p) {
        return p.n === 0 ? 'cuerda <strong>' + CUERDA_NOM[p.s] + '</strong> al aire'
                         : 'en la cuerda <strong>' + CUERDA_NOM[p.s] + '</strong> (donde marca el punto)';
      }).join(' &nbsp;·&nbsp; o bien &nbsp;·&nbsp; ');

      ro.innerHTML =
        '<div class="tm-vc-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-vc-noterow"><span class="tm-vc-intl">' + label(f) + '</span>' +
        '<button class="tm-vc-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-vc-donde">' + txt + '</div>' +
        (sitios.length > 1
          ? '<div class="tm-vc-multi">La misma nota en ' + sitios.length + ' sitios: al aire suena más brillante; pisada, más cálida y admite vibrato.</div>'
          : '');
      renderStaff(f);
      var pb = ro.querySelector('.tm-vc-play');
      if (pb) pb.addEventListener('click', function () { play(f); });
      play(f);
    }

    wrap.querySelectorAll('.tm-vc-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
    wrap.querySelectorAll('.tm-vc-modo button').forEach(function (b) {
      b.addEventListener('click', function () {
        modo = b.dataset.m;
        wrap.querySelectorAll('.tm-vc-modo button').forEach(function (x) { x.classList.remove('sel'); });
        b.classList.add('sel');
        if (currentNote) play(currentNote);
      });
    });
  }

  window.tmCelloEngine = tmCelloEngine;
})();
