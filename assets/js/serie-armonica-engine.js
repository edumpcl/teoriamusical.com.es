/* Explorador interactivo de la serie armónica — teoriamusical.com.es
   Muestra los 16 primeros armónicos de un fundamental Do₂ (65,4 Hz): cada uno con
   su nota en el pentagrama, su frecuencia, su razón con el fundamental y su desviación
   en cents respecto al temperamento igual. Al pulsar un armónico se oye (síntesis Web
   Audio), se dibuja en el pentagrama y se ve la cuerda vibrando en n partes. Botones
   para sonar la serie entera y para oír todos los armónicos a la vez (el timbre).
   Uso: <div id="x"></div><script>tmSerieArmonicaEngine('x');</script> */
(function () {
  'use strict';

  var F1 = 65.40639; // Do₂
  // Datos de cada armónico: nota (VexFlow key + acc), nombre ES, clave, midi de la
  // nota más cercana del temperamento igual (para calcular los cents).
  var HARM = [
    { n: 1,  key: 'c/2',  es: 'Do',  acc: null, clef: 'bass',   midi: 36 },
    { n: 2,  key: 'c/3',  es: 'Do',  acc: null, clef: 'bass',   midi: 48 },
    { n: 3,  key: 'g/3',  es: 'Sol', acc: null, clef: 'bass',   midi: 55 },
    { n: 4,  key: 'c/4',  es: 'Do',  acc: null, clef: 'treble', midi: 60 },
    { n: 5,  key: 'e/4',  es: 'Mi',  acc: null, clef: 'treble', midi: 64 },
    { n: 6,  key: 'g/4',  es: 'Sol', acc: null, clef: 'treble', midi: 67 },
    { n: 7,  key: 'bb/4', es: 'Si♭', acc: 'b',  clef: 'treble', midi: 70 },
    { n: 8,  key: 'c/5',  es: 'Do',  acc: null, clef: 'treble', midi: 72 },
    { n: 9,  key: 'd/5',  es: 'Re',  acc: null, clef: 'treble', midi: 74 },
    { n: 10, key: 'e/5',  es: 'Mi',  acc: null, clef: 'treble', midi: 76 },
    { n: 11, key: 'f#/5', es: 'Fa♯', acc: '#',  clef: 'treble', midi: 78 },
    { n: 12, key: 'g/5',  es: 'Sol', acc: null, clef: 'treble', midi: 79 },
    { n: 13, key: 'ab/5', es: 'La♭', acc: 'b',  clef: 'treble', midi: 80 },
    { n: 14, key: 'bb/5', es: 'Si♭', acc: 'b',  clef: 'treble', midi: 82 },
    { n: 15, key: 'b/5',  es: 'Si',  acc: null, clef: 'treble', midi: 83 },
    { n: 16, key: 'c/6',  es: 'Do',  acc: null, clef: 'treble', midi: 84 }
  ];
  HARM.forEach(function (h) {
    h.freq = F1 * h.n;
    var etHz = 440 * Math.pow(2, (h.midi - 69) / 12);
    h.cents = Math.round(1200 * Math.log2(h.freq / etHz));
    // "desafinado" (no encaja en el temperamento igual): cabeza rellena por convención
    h.det = Math.abs(h.cents) >= 30;
  });
  // interpretación de cada armónico (razón con el fundamental)
  var INFO = {
    1: 'el fundamental', 2: 'una 8ª justa', 3: 'una 8ª + 5ª justa (12ª)',
    4: 'dos 8ª (15ª)', 5: 'dos 8ª + 3ª mayor', 6: 'dos 8ª + 5ª justa',
    7: 'dos 8ª + 7ª menor «natural»', 8: 'tres 8ª', 9: 'tres 8ª + 2ª mayor',
    10: 'tres 8ª + 3ª mayor', 11: 'tres 8ª + 4ª aumentada', 12: 'tres 8ª + 5ª justa',
    13: 'tres 8ª + 6ª menor', 14: 'tres 8ª + 7ª menor', 15: 'tres 8ª + 7ª mayor',
    16: 'cuatro 8ª'
  };

  var CSS = [
    '.tm-ha-wrap{margin:18px 0;}',
    '.tm-ha-top{display:grid;grid-template-columns:1fr;gap:12px;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;}',
    '@media(min-width:620px){.tm-ha-top{grid-template-columns:150px 1fr;align-items:center;}}',
    '.tm-ha-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-ha-staff svg{max-width:100%;height:auto;}',
    '.tm-ha-info{text-align:center;}',
    '.tm-ha-big{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.15;}',
    '.tm-ha-big .tm-ha-num{color:#8b6914;}',
    '.tm-ha-sub{font-size:.92rem;color:#666;margin-top:4px;}',
    '.tm-ha-tune{display:inline-block;margin-top:6px;font-size:.85rem;font-weight:700;padding:3px 10px;border-radius:20px;}',
    '.tm-ha-tune.just{background:#e7f2e7;color:#2e6b2e;}',
    '.tm-ha-tune.off{background:#fbeee0;color:#a25a12;}',
    '.tm-ha-string{width:100%;height:70px;display:block;margin:2px 0 4px;}',
    '.tm-ha-string .st-line{stroke:#c9b78a;stroke-width:1;}',
    '.tm-ha-string .st-wave{fill:none;stroke:#8b6914;stroke-width:2.5;}',
    '.tm-ha-string .st-node{fill:#6b5010;}',
    '.tm-ha-hint{font-size:1.02rem;color:#999;font-weight:600;text-align:center;}',
    '.tm-ha-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:6px;}',
    '@media(max-width:560px){.tm-ha-grid{grid-template-columns:repeat(4,1fr);}}',
    '.tm-ha-cell{border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;padding:7px 3px;cursor:pointer;text-align:center;font-family:inherit;line-height:1.15;}',
    '.tm-ha-cell:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-ha-cell.sel{background:#8b6914;border-color:#8b6914;}',
    '.tm-ha-cell.sel .tm-ha-cn,.tm-ha-cell.sel .tm-ha-cnote,.tm-ha-cell.sel .tm-ha-cc{color:#fff;}',
    '.tm-ha-cn{font-size:1.05rem;font-weight:800;color:#8b6914;}',
    '.tm-ha-cnote{font-size:.9rem;font-weight:700;color:#1a1a1a;margin-top:1px;}',
    '.tm-ha-cc{font-size:.72rem;color:#a25a12;margin-top:1px;min-height:.85em;}',
    '.tm-ha-cell.just .tm-ha-cc{color:#2e6b2e;}',
    '.tm-ha-ctrls{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-ha-btn{padding:10px 16px;border:1px solid #8b6914;background:#8b6914;color:#fff;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-ha-btn.sec{background:#f5f2ea;color:#8b6914;}',
    '.tm-ha-btn:hover{background:#6b5010;color:#fff;}',
    '.tm-ha-btn.sec:hover{background:#fdf8ee;color:#8b6914;}',
    '.tm-ha-note-lbl{font-size:.8rem;color:#888;text-align:center;margin-top:8px;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-ha-css')) return;
    var s = document.createElement('style'); s.id = 'tm-ha-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function tmSerieArmonicaEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;
    var actx = null, sel = null;

    function ac() {
      if (!actx) { var C = window.AudioContext || window.webkitAudioContext; if (C) actx = new C(); }
      if (actx && actx.state === 'suspended') actx.resume();
      return actx;
    }
    // toca una frecuencia con envolvente suave; type triangle = audible y "cálido"
    function tone(freq, t0, dur, gain, type) {
      var c = ac(); if (!c) return;
      var o = c.createOscillator(), g = c.createGain();
      o.type = type || 'triangle'; o.frequency.value = freq;
      o.connect(g); g.connect(c.destination);
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(gain, t0 + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.start(t0); o.stop(t0 + dur + 0.02);
    }
    function playOne(h) { var c = ac(); if (!c) return; tone(h.freq, c.currentTime, 1.2, 0.28); }
    function playSeries() {
      var c = ac(); if (!c) return; var t = c.currentTime + 0.05;
      HARM.forEach(function (h, i) { tone(h.freq, t + i * 0.42, 0.5, 0.26); });
    }
    // todos los armónicos a la vez, con amplitud 1/n (≈ diente de sierra): el "timbre"
    function playChord() {
      var c = ac(); if (!c) return; var t = c.currentTime + 0.03;
      HARM.forEach(function (h) { tone(h.freq, t, 2.4, 0.16 / h.n, 'sine'); });
    }

    function stringSvg(n) {
      var W = 300, H = 60, y0 = 30, amp = 20, seg = W / n, pts = [];
      for (var i = 0; i <= 60; i++) {
        var x = (i / 60) * W;
        var y = y0 - amp * Math.sin(Math.PI * n * (x / W));
        pts.push((i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1));
      }
      var nodes = '';
      for (var k = 0; k <= n; k++) nodes += '<circle class="st-node" cx="' + (k * seg).toFixed(1) + '" cy="' + y0 + '" r="3"/>';
      return '<svg class="tm-ha-string" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
        '<line class="st-line" x1="0" y1="' + y0 + '" x2="' + W + '" y2="' + y0 + '"/>' +
        '<path class="st-wave" d="' + pts.join(' ') + '"/>' + nodes + '</svg>';
    }

    function renderStaff(h) {
      var el = document.getElementById(uid + '_staff');
      if (!el) return; el.innerHTML = '';
      if (typeof Vex === 'undefined') return;
      var V = Vex.Flow;
      var r = new V.Renderer(el, V.Renderer.Backends.SVG);
      r.resize(140, 150);
      var ctx = r.getContext(); ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(2, 30, 124);
      stave.addClef(h.clef).setContext(ctx).draw();
      var note = new V.StaveNote({ keys: [h.key], duration: 'w', clef: h.clef });
      if (h.acc) note.addModifier(new V.Accidental(h.acc), 0);
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([note]);
      new V.Formatter().joinVoices([voice]).format([voice], 70);
      voice.draw(ctx, stave);
      var s = el.querySelector('svg');
      // cabeza rellena (negra) para los armónicos desafinados, como en la notación clásica
      if (s && h.det) {
        try {
          var head = note.noteHeads[0];
          var e = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
          e.setAttribute('cx', head.getAbsoluteX() + head.getWidth() / 2);
          e.setAttribute('cy', note.getYs()[0]);
          e.setAttribute('rx', 6.2); e.setAttribute('ry', 4.7); e.setAttribute('fill', '#1a1a1a');
          s.appendChild(e);
        } catch (err) {}
      }
      if (s) { s.setAttribute('viewBox', '0 0 140 150'); s.style.width = '130px'; s.style.maxWidth = '100%'; s.style.height = 'auto'; }
    }

    function noteName(h) { return h.es + (h.n === 1 ? '₂' : '') ; }

    function pick(h) {
      sel = h;
      wrap.querySelectorAll('.tm-ha-cell').forEach(function (c) { c.classList.remove('sel'); });
      var cell = wrap.querySelector('.tm-ha-cell[data-n="' + h.n + '"]');
      if (cell) cell.classList.add('sel');
      var just = Math.abs(h.cents) <= 2;
      var centsTxt = h.cents === 0 ? '' : (h.cents > 0 ? '+' + h.cents : '' + h.cents) + ' cents';
      var ro = document.getElementById(uid + '_ro');
      ro.innerHTML =
        '<div class="tm-ha-big"><span class="tm-ha-num">Armónico ' + h.n + '</span> · ' + h.es + '</div>' +
        stringSvg(h.n) +
        '<div class="tm-ha-sub">' + h.freq.toFixed(1) + ' Hz · razón ' + h.n + ':1 · ' + INFO[h.n] + ' sobre el Do₂</div>' +
        '<div class="tm-ha-tune ' + (just ? 'just' : 'off') + '">' +
          (just ? 'Afinación justa' : 'Se sale del temperamento igual: ' + centsTxt) + '</div>';
      var staffHost = document.getElementById(uid + '_staff');
      if (!staffHost) {
        var left = document.getElementById(uid + '_left');
        left.innerHTML = '<div class="tm-ha-staff" id="' + uid + '_staff"></div>';
      }
      renderStaff(h);
      playOne(h);
    }

    var cells = HARM.map(function (h) {
      var just = Math.abs(h.cents) <= 2;
      var cc = h.cents === 0 ? '&nbsp;' : (h.cents > 0 ? '+' + h.cents : '' + h.cents);
      return '<button class="tm-ha-cell' + (just ? ' just' : '') + '" data-n="' + h.n + '" type="button" aria-label="Armónico ' + h.n + ', ' + h.es + '">' +
        '<div class="tm-ha-cn">' + h.n + '</div>' +
        '<div class="tm-ha-cnote">' + h.es + '</div>' +
        '<div class="tm-ha-cc">' + cc + '</div></button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-ha-wrap">' +
        '<div class="tm-ha-top">' +
          '<div id="' + uid + '_left"><div class="tm-ha-staff" id="' + uid + '_staff"></div></div>' +
          '<div class="tm-ha-info" id="' + uid + '_ro"><span class="tm-ha-hint">Pulsa un armónico para verlo y oírlo</span></div>' +
        '</div>' +
        '<div class="tm-ha-grid">' + cells + '</div>' +
        '<div class="tm-ha-note-lbl">Fundamental: Do₂ (65,4 Hz). Los números son el orden del armónico; debajo, la nota y su desviación en cents.</div>' +
        '<div class="tm-ha-ctrls">' +
          '<button class="tm-ha-btn" id="' + uid + '_series" type="button">▶ Sonar la serie</button>' +
          '<button class="tm-ha-btn sec" id="' + uid + '_chord" type="button">♫ Todos a la vez (el timbre)</button>' +
        '</div>' +
      '</div>';

    wrap.querySelectorAll('.tm-ha-cell').forEach(function (c) {
      c.addEventListener('click', function () {
        var h = HARM[parseInt(c.dataset.n, 10) - 1]; pick(h);
      });
    });
    document.getElementById(uid + '_series').addEventListener('click', playSeries);
    document.getElementById(uid + '_chord').addEventListener('click', playChord);
  }

  window.tmSerieArmonicaEngine = tmSerieArmonicaEngine;
})();
