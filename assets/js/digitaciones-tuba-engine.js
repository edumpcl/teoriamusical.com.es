/* Diagrama de digitaciones de la TUBA en Do (CC), 4 válvulas — interactivo.
   La nota se elige combinando las válvulas (que alargan el tubo) sobre el armónico
   que ajusta el intérprete con los labios, igual que la trompeta pero en Do y con
   una 4ª válvula que baja una 4ª justa (arregla el grave). La tuba en Do NO transpone:
   se lee a sonido real en clave de fa. Rango Mi1–Si3.
   Existen también tubas en Si♭ y en Fa (cambian las digitaciones), y modelos de
   pistones y de cilindros; aquí se muestran las digitaciones de la tuba en Do.
   Digitaciones estándar del sistema de válvulas (a revisar por especialista).
   Uso: <div id="x"></div><script>tmTubaEngine('x');</script> */
(function () {
  'use strict';

  // Las 4 válvulas (se ENCIENDEN) sobre la FOTO (viewBox 760×1280). Coordenadas de
  // las palancas de dedo (1 arriba → 4 abajo). Pendiente de confirmar por especialista.
  var KEYS = [
    { id: 'V1', x: 395, y: 783 },
    { id: 'V2', x: 396, y: 823 },
    { id: 'V3', x: 393, y: 863 },
    { id: 'V4', x: 387, y: 906 }
  ];
  var SVG_W = 760, SVG_H = 1280, VAL_R = 17;

  // Nota escrita (= sonido real, no transpone) -> válvulas pulsadas. [] = al aire.
  var V1=['V1'],V2=['V2'],V3=['V3'],V4=['V4'];
  var FING = {
    'Mi1': ['V1','V2','V4'], 'Fa1': ['V1','V4'], 'Fa#1':['V2','V4'], 'Sol1':['V4'],
    'Sol#1':['V2','V3'], 'La1':['V1','V2'], 'La#1':['V1'], 'Si1':['V2'],
    'Do2': [], 'Do#2':['V2','V4'], 'Re2':['V4'], 'Re#2':['V2','V3'], 'Mi2':['V1','V2'],
    'Fa2':['V1'], 'Fa#2':['V2'], 'Sol2':[], 'Sol#2':['V2','V3'], 'La2':['V1','V2'],
    'La#2':['V1'], 'Si2':['V2'], 'Do3':[], 'Do#3':['V1','V2'], 'Re3':['V1'], 'Re#3':['V2'],
    'Mi3':[], 'Fa3':['V1'], 'Fa#3':['V2'], 'Sol3':[], 'Sol#3':['V1'], 'La3':['V2'],
    'La#3':[], 'Si3':['V2']
  };
  var ORDEN = [
    'Mi1','Fa1','Fa#1','Sol1','Sol#1','La1','La#1','Si1',
    'Do2','Do#2','Re2','Re#2','Mi2','Fa2','Fa#2','Sol2','Sol#2','La2','La#2','Si2',
    'Do3','Do#3','Re3','Re#3','Mi3','Fa3','Fa#3','Sol3','Sol#3','La3','La#3','Si3'
  ];
  var SUB = { '1':'₁','2':'₂','3':'₃' };
  var FLAT = {
    'Fa#1':'Sol♭₁','Sol#1':'La♭₁','La#1':'Si♭₁','Do#2':'Re♭₂','Re#2':'Mi♭₂',
    'Fa#2':'Sol♭₂','Sol#2':'La♭₂','La#2':'Si♭₂','Do#3':'Re♭₃','Re#3':'Mi♭₃',
    'Fa#3':'Sol♭₃','Sol#3':'La♭₃','La#3':'Si♭₃'
  };
  function label(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    return m ? m[1] + (m[2] ? '♯' : '') + SUB[m[3]] : n;
  }
  function registro(n) {
    var i = ORDEN.indexOf(n);
    if (i <= ORDEN.indexOf('Si1')) return 'Registro grave';
    if (i <= ORDEN.indexOf('Si2')) return 'Registro medio';
    return 'Registro agudo';
  }
  function combo(v) {
    if (!v || !v.length) return 'al aire (sin válvulas)';
    return v.map(function (k) { return k.slice(1); }).join('·');
  }
  var LETTER = { Do:'C', Re:'D', Mi:'E', Fa:'F', Sol:'G', La:'A', Si:'B' };
  var AUDIO_BASE = '/assets/audio/tuba/';
  var AUDIO_V = '2'; // v2: agudos (Fa#3+) regenerados con samples sostenidos (no staccato)
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
    '.tm-tu-wrap{margin:18px 0;}',
    '.tm-tu-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-tu-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-tu-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-tu-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-tu-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;}',
    '.tm-tu-photo{position:relative;max-width:300px;margin:0 auto;}',
    '.tm-tu-img{display:block;width:100%;height:auto;border-radius:6px;}',
    '.tm-tu-svg{position:absolute;inset:0;width:100%;height:100%;}',
    '.tm-tu-key .k-cap{fill:#fff;fill-opacity:.12;stroke:rgba(120,90,0,.4);stroke-width:2.5;transition:all .15s;}',
    '.tm-tu-key.on .k-cap{fill:#ff9500;fill-opacity:.92;stroke:#fff;stroke-width:5;filter:drop-shadow(0 0 9px #ff9500);}',
    '.tm-tu-key .k-num{font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:bold;fill:#fff;fill-opacity:.5;text-anchor:middle;dominant-baseline:central;transition:all .15s;}',
    '.tm-tu-key.on .k-num{fill:#3a2b00;fill-opacity:1;}',
    '.tm-tu-credit{font-size:.72rem;color:#9a9a9a;text-align:center;margin-top:6px;}',
    '.tm-tu-credit a{color:inherit;}',
    '.tm-tu-btns{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;margin-top:14px;}',
    '.tm-tu-btn{min-width:44px;padding:9px 11px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-tu-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-tu-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-tu-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-tu-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-tu-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-tu-play:hover{background:#6b5010;}',
    '.tm-tu-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-tu-staff svg{max-width:100%;height:auto;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-tu-css')) return;
    var s = document.createElement('style'); s.id = 'tm-tu-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function keyShape(k) {
    return '<g class="tm-tu-key" data-k="' + k.id + '">' +
      '<circle class="k-cap" cx="' + k.x + '" cy="' + k.y + '" r="' + VAL_R + '"/>' +
      '<text class="k-num" x="' + k.x + '" y="' + k.y + '">' + k.id.slice(1) + '</text></g>';
  }

  function tmTubaEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var keysSvg = KEYS.map(keyShape).join('');
    var btns = ORDEN.map(function (n) {
      return '<button class="tm-tu-btn" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-tu-wrap">' +
        '<div class="tm-tu-readout" id="' + uid + '_ro"><span class="tm-tu-hint">Elige una nota para ver su digitación</span></div>' +
        '<div class="tm-tu-diagram">' +
          '<div class="tm-tu-photo">' +
            '<picture><source type="image/webp" srcset="/assets/img/tuba/instrumento.webp">' +
            '<img class="tm-tu-img" src="/assets/img/tuba/instrumento.jpg" width="760" height="1280" loading="lazy" alt="Tuba en Do vertical con la campana arriba y las cuatro válvulas en el centro"></picture>' +
            '<svg class="tm-tu-svg" viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Diagrama de digitación de la tuba sobre una fotografía real: se iluminan las válvulas que se pulsan">' +
              keysSvg +
            '</svg>' +
          '</div>' +
          '<p class="tm-tu-credit">Foto: Buffet Crampon vía <a href="https://commons.wikimedia.org/wiki/File:Tuba_Melton_Meinl_Weston.png" target="_blank" rel="noopener">Wikimedia Commons</a>, CC BY-SA 4.0 · Audio: Sonatina Symphonic Orchestra</p>' +
        '</div>' +
        '<div class="tm-tu-btns">' + btns + '</div>' +
      '</div>';

    var ro = document.getElementById(uid + '_ro');
    var svg = wrap.querySelector('.tm-tu-svg');
    var audio = new Audio();

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
      if (s) { s.setAttribute('viewBox', '0 0 150 150'); s.style.width = '130px'; s.style.maxWidth = '100%'; s.style.height = 'auto'; }
    }

    function pick(n, btn) {
      wrap.querySelectorAll('.tm-tu-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var v = FING[n] || [];
      svg.querySelectorAll('.tm-tu-key').forEach(function (g) { g.classList.remove('on'); });
      v.forEach(function (id) {
        var g = svg.querySelector('.tm-tu-key[data-k="' + id + '"]'); if (g) g.classList.add('on');
      });
      ro.innerHTML =
        '<div class="tm-tu-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-tu-noterow"><span class="tm-tu-intl">' + label(n) + (FLAT[n] ? ' (' + FLAT[n] + ')' : '') + '</span>' +
        '<button class="tm-tu-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-tu-reg">' + intl(n) + ' · ' + registro(n) + '</div>' +
        '<div class="tm-tu-keysline">Válvulas: ' + combo(v) + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-tu-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    wrap.querySelectorAll('.tm-tu-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmTubaEngine = tmTubaEngine;
})();
