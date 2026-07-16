/* Diagrama de digitaciones del BOMBARDINO (eufonio) en Si♭, 4 pistones — interactivo.
   La nota se elige combinando los pistones (que alargan el tubo) sobre el armónico
   que ajusta el intérprete con los labios, como la trompeta pero en Si♭ y con una 4ª
   válvula (baja una 4ª justa) que abre el registro grave. En la notación de banda
   española el bombardino se lee a SONIDO REAL en clave de fa (no transpone).
   Rango Si♭1–Si♭4. La 4ª válvula suele ser lateral (mano izquierda).
   Digitaciones estándar del sistema de válvulas (a revisar por especialista).
   Uso: <div id="x"></div><script>tmBombardinoEngine('x');</script> */
(function () {
  'use strict';

  // 4 pistones sobre la FOTO (viewBox 680×1089): 1·2·3 arriba, 4 lateral izquierdo.
  var KEYS = [
    { id: 'V1', x: 155, y: 293 },
    { id: 'V2', x: 210, y: 290 },
    { id: 'V3', x: 265, y: 290 },
    { id: 'V4', x: 28,  y: 690 }
  ];
  var SVG_W = 680, SVG_H = 1089, VAL_R = 18;

  // Nota escrita (= sonido real, no transpone) -> pistones. [] = al aire.
  var FING = {
    'La#1':[], 'Si1':['V1','V2','V3','V4'], 'Do2':['V1','V3','V4'], 'Do#2':['V2','V3','V4'],
    'Re2':['V1','V2','V4'], 'Re#2':['V1','V4'], 'Mi2':['V2','V4'], 'Fa2':['V4'],
    'Fa#2':['V2','V3'], 'Sol2':['V1','V2'], 'Sol#2':['V1'], 'La2':['V2'], 'La#2':[],
    'Si2':['V2','V4'], 'Do3':['V4'], 'Do#3':['V2','V3'], 'Re3':['V1','V2'], 'Re#3':['V1'],
    'Mi3':['V2'], 'Fa3':[], 'Fa#3':['V2','V3'], 'Sol3':['V1','V2'], 'Sol#3':['V1'],
    'La3':['V2'], 'La#3':[], 'Si3':['V1','V2'], 'Do4':['V1'], 'Do#4':['V2'], 'Re4':[],
    'Re#4':['V1'], 'Mi4':['V2'], 'Fa4':[], 'Fa#4':['V1'], 'Sol4':['V2'], 'Sol#4':[],
    'La4':['V2'], 'La#4':[]
  };
  var ORDEN = [
    'La#1','Si1','Do2','Do#2','Re2','Re#2','Mi2','Fa2','Fa#2','Sol2','Sol#2','La2','La#2',
    'Si2','Do3','Do#3','Re3','Re#3','Mi3','Fa3','Fa#3','Sol3','Sol#3','La3','La#3',
    'Si3','Do4','Do#4','Re4','Re#4','Mi4','Fa4','Fa#4','Sol4','Sol#4','La4','La#4'
  ];
  var SUB = { '1':'₁','2':'₂','3':'₃','4':'₄' };
  var FLAT = {
    'La#1':'Si♭₁','Do#2':'Re♭₂','Re#2':'Mi♭₂','Fa#2':'Sol♭₂','Sol#2':'La♭₂','La#2':'Si♭₂',
    'Do#3':'Re♭₃','Re#3':'Mi♭₃','Fa#3':'Sol♭₃','Sol#3':'La♭₃','La#3':'Si♭₃',
    'Do#4':'Re♭₄','Re#4':'Mi♭₄','Fa#4':'Sol♭₄','Sol#4':'La♭₄','La#4':'Si♭₄'
  };
  function label(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    return m ? m[1] + (m[2] ? '♯' : '') + SUB[m[3]] : n;
  }
  function registro(n) {
    var i = ORDEN.indexOf(n);
    if (i <= ORDEN.indexOf('La#2')) return 'Registro grave';
    if (i <= ORDEN.indexOf('La#3')) return 'Registro medio';
    return 'Registro agudo';
  }
  function combo(v) {
    if (!v || !v.length) return 'al aire (sin pistones)';
    return v.map(function (k) { return k.slice(1); }).join('·');
  }
  var LETTER = { Do:'C', Re:'D', Mi:'E', Fa:'F', Sol:'G', La:'A', Si:'B' };
  var AUDIO_BASE = '/assets/audio/bombardino/';
  var AUDIO_V = '2';
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
    '.tm-bo-wrap{margin:18px 0;}',
    '.tm-bo-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-bo-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-bo-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-bo-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-bo-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;}',
    '.tm-bo-photo{position:relative;max-width:300px;margin:0 auto;}',
    '.tm-bo-img{display:block;width:100%;height:auto;border-radius:6px;}',
    '.tm-bo-svg{position:absolute;inset:0;width:100%;height:100%;}',
    '.tm-bo-key .k-cap{fill:#fff;fill-opacity:.12;stroke:rgba(120,90,0,.4);stroke-width:2.5;transition:all .15s;}',
    '.tm-bo-key.on .k-cap{fill:#ff9500;fill-opacity:.92;stroke:#fff;stroke-width:5;filter:drop-shadow(0 0 9px #ff9500);}',
    '.tm-bo-key .k-num{font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:bold;fill:#fff;fill-opacity:.5;text-anchor:middle;dominant-baseline:central;transition:all .15s;}',
    '.tm-bo-key.on .k-num{fill:#3a2b00;fill-opacity:1;}',
    '.tm-bo-credit{font-size:.72rem;color:#9a9a9a;text-align:center;margin-top:6px;}',
    '.tm-bo-credit a{color:inherit;}',
    '.tm-bo-btns{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;margin-top:14px;}',
    '.tm-bo-btn{min-width:44px;padding:9px 11px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-bo-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-bo-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-bo-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-bo-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-bo-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-bo-play:hover{background:#6b5010;}',
    '.tm-bo-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-bo-staff svg{max-width:100%;height:auto;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-bo-css')) return;
    var s = document.createElement('style'); s.id = 'tm-bo-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function keyShape(k) {
    return '<g class="tm-bo-key" data-k="' + k.id + '">' +
      '<circle class="k-cap" cx="' + k.x + '" cy="' + k.y + '" r="' + VAL_R + '"/>' +
      '<text class="k-num" x="' + k.x + '" y="' + k.y + '">' + k.id.slice(1) + '</text></g>';
  }

  function tmBombardinoEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var keysSvg = KEYS.map(keyShape).join('');
    var btns = ORDEN.map(function (n) {
      return '<button class="tm-bo-btn" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-bo-wrap">' +
        '<div class="tm-bo-readout" id="' + uid + '_ro"><span class="tm-bo-hint">Elige una nota para ver su digitación</span></div>' +
        '<div class="tm-bo-diagram">' +
          '<div class="tm-bo-photo">' +
            '<picture><source type="image/webp" srcset="/assets/img/bombardino/instrumento.webp">' +
            '<img class="tm-bo-img" src="/assets/img/bombardino/instrumento.jpg" width="680" height="1089" loading="lazy" alt="Bombardino (eufonio) en Si bemol vertical, con la campana arriba, tres pistones en el centro y un cuarto pistón lateral"></picture>' +
            '<svg class="tm-bo-svg" viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Diagrama de digitación del bombardino sobre una fotografía real: se iluminan los pistones que se pulsan">' +
              keysSvg +
            '</svg>' +
          '</div>' +
          '<p class="tm-bo-credit">Foto: Buffet Crampon / Besson vía <a href="https://commons.wikimedia.org/wiki/File:BC_Euphonium_ed1.jpg" target="_blank" rel="noopener">Wikimedia Commons</a>, CC BY-SA 4.0 · Sonido: euphonium (MuseScore / Muse Sounds)</p>' +
        '</div>' +
        '<div class="tm-bo-btns">' + btns + '</div>' +
      '</div>';

    var ro = document.getElementById(uid + '_ro');
    var svg = wrap.querySelector('.tm-bo-svg');
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
      wrap.querySelectorAll('.tm-bo-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var v = FING[n] || [];
      svg.querySelectorAll('.tm-bo-key').forEach(function (g) { g.classList.remove('on'); });
      v.forEach(function (id) {
        var g = svg.querySelector('.tm-bo-key[data-k="' + id + '"]'); if (g) g.classList.add('on');
      });
      ro.innerHTML =
        '<div class="tm-bo-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-bo-noterow"><span class="tm-bo-intl">' + label(n) + (FLAT[n] ? ' (' + FLAT[n] + ')' : '') + '</span>' +
        '<button class="tm-bo-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-bo-reg">' + intl(n) + ' · ' + registro(n) + '</div>' +
        '<div class="tm-bo-keysline">Pistones: ' + combo(v) + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-bo-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    wrap.querySelectorAll('.tm-bo-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmBombardinoEngine = tmBombardinoEngine;
})();
