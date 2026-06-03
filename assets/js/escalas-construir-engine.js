/* Motor — Construir Escalas Mayores v1 */
(function () {
  'use strict';

  var NS       = [0, 2, 4, 5, 7, 9, 11];
  var VF_NAMES = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
  var NOTE_NAMES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
  var ACC_SYM  = { '-2': '♭♭', '-1': '♭', '0': '', '1': '♯', '2': '♯♯' };

  function accStr(a) {
    if (a ===  2) return '##';
    if (a ===  1) return '#';
    if (a === -1) return 'b';
    if (a === -2) return 'bb';
    return null;
  }
  function accNum(s) {
    if (s === '##') return 2;
    if (s === '#')  return 1;
    if (s === 'b')  return -1;
    if (s === 'bb') return -2;
    return 0;
  }

  var SCALES = [
    { name: 'Do Mayor',   numAlts: 0, notes: ['c/4','d/4','e/4','f/4','g/4','a/4','b/4','c/5'], acc: {} },
    { name: 'Sol Mayor',  numAlts: 1, notes: ['g/4','a/4','b/4','c/5','d/5','e/5','f/5','g/5'], acc: {'f/5':'#'} },
    { name: 'Re Mayor',   numAlts: 2, notes: ['d/4','e/4','f/4','g/4','a/4','b/4','c/5','d/5'], acc: {'f/4':'#','c/5':'#'} },
    { name: 'La Mayor',   numAlts: 3, notes: ['a/4','b/4','c/5','d/5','e/5','f/5','g/5','a/5'], acc: {'c/5':'#','f/5':'#','g/5':'#'} },
    { name: 'Mi Mayor',   numAlts: 4, notes: ['e/4','f/4','g/4','a/4','b/4','c/5','d/5','e/5'], acc: {'f/4':'#','g/4':'#','c/5':'#','d/5':'#'} },
    { name: 'Si Mayor',   numAlts: 5, notes: ['b/3','c/4','d/4','e/4','f/4','g/4','a/4','b/4'], acc: {'c/4':'#','d/4':'#','f/4':'#','g/4':'#','a/4':'#'} },
    { name: 'Fa♯ Mayor', numAlts: 6, notes: ['f/4','g/4','a/4','b/4','c/5','d/5','e/5','f/5'], acc: {'f/4':'#','g/4':'#','a/4':'#','c/5':'#','d/5':'#','e/5':'#','f/5':'#'} },
    { name: 'Do♯ Mayor', numAlts: 7, notes: ['c/4','d/4','e/4','f/4','g/4','a/4','b/4','c/5'], acc: {'c/4':'#','d/4':'#','e/4':'#','f/4':'#','g/4':'#','a/4':'#','b/4':'#','c/5':'#'} },
    { name: 'Fa Mayor',   numAlts: 1, notes: ['f/4','g/4','a/4','b/4','c/5','d/5','e/5','f/5'], acc: {'b/4':'b'} },
    { name: 'Si♭ Mayor', numAlts: 2, notes: ['b/3','c/4','d/4','e/4','f/4','g/4','a/4','b/4'], acc: {'b/3':'b','e/4':'b','b/4':'b'} },
    { name: 'Mi♭ Mayor', numAlts: 3, notes: ['e/4','f/4','g/4','a/4','b/4','c/5','d/5','e/5'], acc: {'e/4':'b','a/4':'b','b/4':'b','e/5':'b'} },
    { name: 'La♭ Mayor', numAlts: 4, notes: ['a/3','b/3','c/4','d/4','e/4','f/4','g/4','a/4'], acc: {'a/3':'b','b/3':'b','d/4':'b','e/4':'b','a/4':'b'} },
    { name: 'Re♭ Mayor', numAlts: 5, notes: ['d/4','e/4','f/4','g/4','a/4','b/4','c/5','d/5'], acc: {'d/4':'b','e/4':'b','g/4':'b','a/4':'b','b/4':'b','d/5':'b'} },
    { name: 'Sol♭ Mayor',numAlts: 6, notes: ['g/3','a/3','b/3','c/4','d/4','e/4','f/4','g/4'], acc: {'g/3':'b','a/3':'b','b/3':'b','c/4':'b','d/4':'b','e/4':'b','g/4':'b'} },
    { name: 'Do♭ Mayor', numAlts: 7, notes: ['c/4','d/4','e/4','f/4','g/4','a/4','b/4','c/5'], acc: {'c/4':'b','d/4':'b','e/4':'b','f/4':'b','g/4':'b','a/4':'b','b/4':'b','c/5':'b'} }
  ];

  function parseScale(scale) {
    return scale.notes.map(function (key) {
      var p = key.split('/');
      return { vfn: p[0], oct: parseInt(p[1], 10), acc: accNum(scale.acc[key] || '') };
    });
  }

  function pitchVal(p) {
    return p.oct * 12 + NS[VF_NAMES.indexOf(p.vfn)];
  }

  var PREGUNTAS = 10;
  var ICONOS = ['☀️', '⚡', '🔥'];
  var DIFICULTADES = [
    { lbl: 'F\xe1cil',    desc: 'Sin alteraciones o con 1',    maxAlts: 1  },
    { lbl: 'Medio',       desc: 'Hasta 4 alteraciones',        maxAlts: 4  },
    { lbl: 'Dif\xedcil', desc: 'Las 15 escalas mayores',       maxAlts: 99 }
  ];

  var SVG_W = 520, SVG_H = 200, STAVE_Y = 55, STAVE_W = 480;

  var ROWS = [
    { vfn:'b', n:6, oct:5, line:-1.5 },
    { vfn:'a', n:5, oct:5, line:-1   },
    { vfn:'g', n:4, oct:5, line:-0.5 },
    { vfn:'f', n:3, oct:5, line: 0   },
    { vfn:'e', n:2, oct:5, line: 0.5 },
    { vfn:'d', n:1, oct:5, line: 1   },
    { vfn:'c', n:0, oct:5, line: 1.5 },
    { vfn:'b', n:6, oct:4, line: 2   },
    { vfn:'a', n:5, oct:4, line: 2.5 },
    { vfn:'g', n:4, oct:4, line: 3   },
    { vfn:'f', n:3, oct:4, line: 3.5 },
    { vfn:'e', n:2, oct:4, line: 4   },
    { vfn:'d', n:1, oct:4, line: 4.5 },
    { vfn:'c', n:0, oct:4, line: 5   },
    { vfn:'b', n:6, oct:3, line: 5.5 },
    { vfn:'a', n:5, oct:3, line: 6   },
    { vfn:'g', n:4, oct:3, line: 6.5 },
    { vfn:'f', n:3, oct:3, line: 7   },
    { vfn:'e', n:2, oct:3, line: 7.5 },
    { vfn:'d', n:1, oct:3, line: 8   },
    { vfn:'c', n:0, oct:3, line: 8.5 }
  ];
  var FIRST_ROW_SVGY = STAVE_Y + ROWS[0].line * 10; /* 55 + (-1.5)*10 = 40 */

  var CSS = [
    '.tm-ec-wrap *{box-sizing:border-box;margin:0;padding:0;}',
    '.tm-ec-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:24px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,0.05);}',
    '.tm-ec-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-ec-wrap .tm-submit{width:100%;margin-top:20px;padding:15px;background:#d8d0b8;color:#fff;border:none;border-radius:6px;font-weight:800;cursor:not-allowed;font-family:inherit;}',
    '.tm-ec-wrap .tm-submit.tm-ready{background:#8b6914;cursor:pointer;}',
    '.tm-ec-wrap .tm-fb{display:none;margin-top:15px;padding:15px;border-radius:6px;font-weight:600;line-height:1.5;}',
    '.tm-ec-wrap .tm-fb.tm-show{display:block;}',
    '.tm-ec-wrap .tm-fb.tm-ok{background:#e8f5e9;color:#2e7d32;}',
    '.tm-ec-wrap .tm-fb.tm-ko{background:#ffebee;color:#c62828;}',
    '.tm-ec-wrap .tm-nxt{display:none;width:100%;margin-top:10px;padding:15px;background:#1a1a1a;color:#fff;border:none;border-radius:6px;cursor:pointer;font-family:inherit;}',
    '.tm-ec-wrap .tm-nxt.tm-show{display:block;}',
    '.tm-ec-wrap .tm-iv-mode-screen{text-align:center;padding:.5rem 0 1rem;}',
    '.tm-ec-wrap .tm-iv-title{font-size:1.35rem;font-weight:700;margin:0 0 .3rem;color:#1a1a2e;}',
    '.tm-ec-wrap .tm-iv-subtitle{color:#666;margin:0 0 1.5rem;font-size:.92rem;}',
    '.tm-ec-wrap .tm-iv-modes{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}',
    '.tm-ec-wrap .tm-iv-mode-btn{background:#fff;border:2px solid #d8d0b8;border-radius:12px;padding:1.2rem 1.8rem;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:.4rem;min-width:120px;font-family:inherit;}',
    '.tm-ec-wrap .tm-iv-mode-btn:hover{border-color:#8b6914;background:#fdf8ee;}',
    '.tm-ec-wrap .tm-iv-mode-icon{font-size:1.5rem;line-height:1;}',
    '.tm-ec-wrap .tm-iv-mode-lbl{font-size:.88rem;font-weight:700;color:#1a1a2e;}',
    '.tm-ec-wrap .tm-iv-mode-desc{font-size:.75rem;color:#888;text-align:center;line-height:1.3;}',
    '.tm-ec-wrap .tm-iv-header{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap;}',
    '.tm-ec-wrap .tm-iv-progress-wrap{flex:1;display:flex;flex-direction:column;gap:.3rem;min-width:0;}',
    '.tm-ec-wrap .tm-iv-bar{height:6px;background:#e4e9f2;border-radius:3px;overflow:hidden;}',
    '.tm-ec-wrap .tm-iv-fill{height:100%;background:#8b6914;border-radius:3px;transition:width .4s ease;width:0%;}',
    '.tm-ec-wrap .tm-iv-counter{font-size:.82rem;color:#666;font-weight:500;}',
    '.tm-ec-wrap .tm-iv-badge{font-size:.92rem;font-weight:700;color:#8b6914;background:#fdf8ee;padding:.2rem .7rem;border-radius:8px;white-space:nowrap;}',
    '.tm-ec-wrap .tm-iv-score-box{text-align:center;padding:2rem;background:linear-gradient(135deg,#8b6914,#6b5010);border-radius:16px;color:#fff;margin-bottom:1.5rem;}',
    '.tm-ec-wrap .tm-iv-score-num{font-size:3rem;font-weight:800;line-height:1;}',
    '.tm-ec-wrap .tm-iv-score-pct{font-size:1.3rem;font-weight:600;opacity:.9;margin:.3rem 0;}',
    '.tm-ec-wrap .tm-construir-q{text-align:center;font-size:1.05rem;margin:10px 0;}',
    '.tm-ec-wrap .tm-staff-construir{position:relative;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;margin:15px 0;cursor:crosshair;user-select:none;touch-action:none;overflow:hidden;}',
    '.tm-ec-wrap .tm-staff-construir.tm-answered{cursor:default;}',
    '.tm-ec-wrap .tm-high{position:absolute;left:0;right:0;height:2px;background:rgba(139,105,20,0.45);pointer-events:none;display:none;}',
    '.tm-ec-wrap .tm-tools-row{display:flex;align-items:center;gap:8px;margin:10px 0;flex-wrap:wrap;}',
    '.tm-ec-wrap .tm-tools-acc{display:flex;gap:6px;}',
    '.tm-ec-wrap .tm-tool{font-size:1.1rem;padding:8px 14px;border:1px solid #d8d0b8;background:#f5f2ea;cursor:pointer;border-radius:6px;font-family:inherit;transition:.15s;}',
    '.tm-ec-wrap .tm-tool.tm-active{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-ec-wrap .tm-tools-edit{display:flex;gap:6px;margin-left:auto;}',
    '.tm-ec-wrap .tm-tool-edit{font-size:.82rem;padding:8px 12px;border:1px solid #d8d0b8;background:#f5f2ea;cursor:pointer;border-radius:6px;font-family:inherit;color:#555;transition:.15s;}',
    '.tm-ec-wrap .tm-tool-edit:hover{border-color:#8b6914;color:#8b6914;}',
    '.tm-ec-wrap .tm-note-count{font-size:.82rem;color:#666;margin:4px 0 0;text-align:center;}',
    '.tm-ec-wrap .tm-iv-loupe{position:fixed;display:none;pointer-events:none;z-index:9999;background:#fdfcf9;border:2px solid #333;border-radius:12px;padding:6px 8px;box-shadow:0 8px 28px rgba(0,0,0,0.35);transform:translate(-50%,calc(-100% - 18px));}',
    '.tm-ec-wrap .tm-iv-loupe::after{content:"";position:absolute;bottom:-13px;left:50%;transform:translateX(-50%);border:11px solid transparent;border-top-color:#333;border-bottom:none;}',
    '.tm-ec-wrap .tm-iv-loupe::before{content:"";position:absolute;bottom:-9px;left:50%;transform:translateX(-50%);border:9px solid transparent;border-top-color:#fdfcf9;border-bottom:none;z-index:1;}',
    '.tm-ec-wrap .tm-iv-loupe-staff{line-height:0;}',
    '@media(max-width:500px){.tm-ec-wrap .tm-iv-modes{flex-direction:column;align-items:center;}.tm-ec-wrap .tm-iv-mode-btn{width:100%;max-width:220px;}}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-ec-css')) return;
    var s = document.createElement('style');
    s.id = 'tm-ec-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function tmEsConstrEngine(containerId, config) {
    injectCSS();
    config = config || {};

    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-ec-wrap';
    var uid = containerId;

    var totalQ = PREGUNTAS;
    var currentQ, score, maxAlts, cQ, answered, placedNotes, activeTool, lastLoupeKey, currentSvg;

    function showModeScreen() {
      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-iv-mode-screen">',
            '<h2 class="tm-iv-title">Test — Construir Escalas Mayores</h2>',
            '<p class="tm-iv-subtitle">Elige el nivel de dificultad — ' + totalQ + ' preguntas</p>',
            '<div class="tm-iv-modes">',
              DIFICULTADES.map(function (d, i) {
                return '<button class="tm-iv-mode-btn" data-i="' + i + '"><span class="tm-iv-mode-icon">' + ICONOS[i] + '</span><span class="tm-iv-mode-lbl">' + d.lbl + '</span><span class="tm-iv-mode-desc">' + d.desc + '</span></button>';
              }).join(''),
            '</div>',
          '</div>',
        '</div>'
      ].join('');
      wrap.querySelectorAll('.tm-iv-mode-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          maxAlts = DIFICULTADES[parseInt(btn.dataset.i, 10)].maxAlts;
          currentQ = 0; score = 0;
          startQuiz();
        });
      });
    }

    function startQuiz() {
      var tools = [[-1,'♭'],[0,'♮'],[1,'♯']].map(function (t) {
        return '<button class="tm-tool" data-acc="' + t[0] + '">' + t[1] + '</button>';
      }).join('');

      wrap.innerHTML = [
        '<div class="tm-card" id="' + uid + '_card">',
          '<div class="tm-iv-header">',
            '<div class="tm-iv-progress-wrap">',
              '<div class="tm-iv-bar"><div class="tm-iv-fill" id="' + uid + '_fill"></div></div>',
              '<span class="tm-iv-counter" id="' + uid + '_cnt">1 / ' + totalQ + '</span>',
            '</div>',
            '<span class="tm-iv-badge" id="' + uid + '_badge">✓ 0</span>',
          '</div>',
          '<p class="tm-construir-q" id="' + uid + '_q"></p>',
          '<div class="tm-staff-construir" id="' + uid + '_wrap">',
            '<div id="' + uid + '_not"></div>',
            '<div class="tm-high" id="' + uid + '_high"></div>',
          '</div>',
          '<p class="tm-note-count" id="' + uid + '_nc">Notas colocadas: 0 / 8</p>',
          '<div class="tm-tools-row">',
            '<div class="tm-tools-acc">' + tools + '</div>',
            '<div class="tm-tools-edit">',
              '<button class="tm-tool-edit" id="' + uid + '_undo">↩ Deshacer</button>',
              '<button class="tm-tool-edit" id="' + uid + '_clear">\xd7 Limpiar</button>',
            '</div>',
          '</div>',
          '<button class="tm-submit" id="' + uid + '_btn">Comprobar</button>',
          '<div class="tm-fb" id="' + uid + '_fb"></div>',
          '<button class="tm-nxt" id="' + uid + '_nxt">Siguiente →</button>',
        '</div>',
        '<div class="tm-iv-loupe" id="' + uid + '_loupe">',
          '<div class="tm-iv-loupe-staff" id="' + uid + '_lstaff"></div>',
        '</div>'
      ].join('');

      activeTool = 0; placedNotes = []; currentSvg = null; lastLoupeKey = null;

      wrap.querySelectorAll('.tm-tool').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeTool = parseInt(btn.dataset.acc, 10);
          lastLoupeKey = null;
          wrap.querySelectorAll('.tm-tool').forEach(function (b) { b.classList.remove('tm-active'); });
          btn.classList.add('tm-active');
        });
      });
      var nat = wrap.querySelector('.tm-tool[data-acc="0"]');
      if (nat) nat.classList.add('tm-active');

      document.getElementById(uid + '_undo').addEventListener('click', function () {
        if (answered || !placedNotes.length) return;
        placedNotes.pop(); drawStaff(); updateBtn();
      });
      document.getElementById(uid + '_clear').addEventListener('click', function () {
        if (answered) return;
        placedNotes = []; drawStaff(); updateBtn();
      });
      document.getElementById(uid + '_btn').addEventListener('click', checkAnswer);
      document.getElementById(uid + '_nxt').addEventListener('click', nextQ);

      attachInteraction();
      nextQ();
    }

    function genQ() {
      var pool = SCALES.filter(function (s) { return s.numAlts <= maxAlts; });
      if (!pool.length) pool = SCALES;
      cQ = pool[Math.floor(Math.random() * pool.length)];
    }

    function sortedByPitch(arr) {
      return arr.slice().sort(function (a, b) { return pitchVal(a) - pitchVal(b); });
    }

    function drawStaff() {
      var elNot = document.getElementById(uid + '_not');
      if (!elNot || typeof Vex === 'undefined') return;
      elNot.innerHTML = '';

      var sorted = sortedByPitch(placedNotes);

      var V = Vex.Flow;
      var r = new V.Renderer(elNot, V.Renderer.Backends.SVG);
      r.resize(SVG_W, SVG_H);
      var ctx = r.getContext();
      ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(10, STAVE_Y, STAVE_W);
      stave.addClef('treble').setContext(ctx).draw();

      if (sorted.length > 0) {
        var vfNotes = sorted.map(function (p) {
          var n = new V.StaveNote({ keys: [p.vfn + '/' + p.oct], duration: 'w' });
          var a = accStr(p.acc);
          if (a) n.addModifier(new V.Accidental(a), 0);
          return n;
        });
        var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false);
        voice.addTickables(vfNotes);
        new V.Formatter().joinVoices([voice]).format([voice], STAVE_W - 60);
        voice.draw(ctx, stave);
      }

      var svg = elNot.querySelector('svg');
      if (svg) {
        svg.setAttribute('viewBox', '0 0 ' + SVG_W + ' ' + SVG_H);
        svg.style.width = '100%'; svg.style.height = 'auto';
        currentSvg = svg;
      }
    }

    function drawLoupe(row) {
      var elLstaff = document.getElementById(uid + '_lstaff');
      if (!elLstaff || typeof Vex === 'undefined') return;
      /* la clave incluye lo ya escrito para refrescar al añadir/quitar notas */
      var key = placedNotes.map(function (p) { return p.vfn + p.oct + p.acc; }).join(',') +
                '|' + row.vfn + row.oct + activeTool;
      if (key === lastLoupeKey) return;
      lastLoupeKey = key;
      elLstaff.innerHTML = '';

      var V = Vex.Flow;
      var rend = new V.Renderer(elLstaff, V.Renderer.Backends.SVG);
      rend.resize(300, 120);
      var ctx = rend.getContext();
      ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(10, 20, 280);
      stave.addClef('treble').setContext(ctx).draw();

      /* notas ya escritas (negro) + la nota bajo el cursor (dorado), ordenadas */
      var preview = { vfn: row.vfn, oct: row.oct, acc: activeTool, _hover: true };
      var all = sortedByPitch(placedNotes.concat([preview]));
      var vfNotes = all.map(function (p) {
        var n = new V.StaveNote({ keys: [p.vfn + '/' + p.oct], duration: 'w' });
        if (p._hover && n.setKeyStyle) n.setKeyStyle(0, { fillStyle: '#8b6914', strokeStyle: '#8b6914' });
        var a = accStr(p.acc);
        if (a) {
          var accObj = new V.Accidental(a);
          if (p._hover && accObj.setStyle) accObj.setStyle({ fillStyle: '#8b6914', strokeStyle: '#8b6914' });
          n.addModifier(accObj, 0);
        }
        return n;
      });

      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false);
      voice.addTickables(vfNotes);
      new V.Formatter().joinVoices([voice]).format([voice], 220);
      voice.draw(ctx, stave);

      var svg = elLstaff.querySelector('svg');
      var dispW = placedNotes.length > 0 ? '240' : '160';
      var dispH = placedNotes.length > 0 ? '96' : '64';
      if (svg) {
        svg.setAttribute('viewBox', '0 0 300 120');
        svg.setAttribute('width', dispW);
        svg.setAttribute('height', dispH);
      }
    }

    function getRow(clientY) {
      if (!currentSvg) return ROWS[9];
      var sr = currentSvg.getBoundingClientRect();
      if (!sr.width) return ROWS[9];
      var scale = sr.width / SVG_W;
      var svgY = (clientY - sr.top) / scale;
      var idx = Math.round((svgY - FIRST_ROW_SVGY) / 5);
      return ROWS[Math.max(0, Math.min(ROWS.length - 1, idx))];
    }

    function attachInteraction() {
      var elWrap  = document.getElementById(uid + '_wrap');
      var elHigh  = document.getElementById(uid + '_high');
      var elLoupe = document.getElementById(uid + '_loupe');
      var isDragging = false, currentBest = null;

      function updatePreview(e) {
        if (!isDragging || answered || !currentSvg) return;
        var clientX = e.touches ? e.changedTouches[0].clientX : e.clientX;
        var clientY = e.touches ? e.changedTouches[0].clientY : e.clientY;
        var row = getRow(clientY);
        currentBest = row;
        var sr = currentSvg.getBoundingClientRect();
        var wr = elWrap.getBoundingClientRect();
        var sc = sr.width / SVG_W;
        var lineY = (sr.top - wr.top) + (STAVE_Y + row.line * 10) * sc;
        elHigh.style.display = 'block';
        elHigh.style.top = (lineY - 1) + 'px';
        elLoupe.style.transform = '';
        elLoupe.style.left = clientX + 'px';
        elLoupe.style.top  = clientY + 'px';
        elLoupe.style.display = 'block';
        drawLoupe(row);
        var lr = elLoupe.getBoundingClientRect();
        var pad = 8;
        if (lr.left < pad) elLoupe.style.left = (clientX - lr.left + pad) + 'px';
        else if (lr.right > window.innerWidth - pad) elLoupe.style.left = (clientX - (lr.right - window.innerWidth + pad)) + 'px';
        if (lr.top < pad) elLoupe.style.transform = 'translate(-50%,18px)';
      }

      function startAction(e) {
        if (answered || placedNotes.length >= 8) return;
        isDragging = true;
        updatePreview(e);
      }

      function endAction() {
        if (!isDragging) return;
        isDragging = false;
        if (currentBest && !answered && placedNotes.length < 8) {
          var newNote = { vfn: currentBest.vfn, oct: currentBest.oct, acc: activeTool };
          var existingIdx = -1;
          for (var i = 0; i < placedNotes.length; i++) {
            if (placedNotes[i].vfn === newNote.vfn && placedNotes[i].oct === newNote.oct) {
              existingIdx = i; break;
            }
          }
          if (existingIdx >= 0) {
            placedNotes[existingIdx].acc = activeTool;
          } else {
            placedNotes.push(newNote);
          }
          drawStaff(); updateBtn(); lastLoupeKey = null;
        }
        currentBest = null;
        elHigh.style.display = 'none';
        elLoupe.style.display = 'none';
      }

      elWrap.addEventListener('mousedown', startAction);
      elWrap.addEventListener('mousemove', function (e) { if (isDragging) updatePreview(e); });
      window.addEventListener('mouseup', endAction);
      elWrap.addEventListener('touchstart', function (e) { e.preventDefault(); startAction(e); }, { passive: false });
      elWrap.addEventListener('touchmove',  function (e) { e.preventDefault(); updatePreview(e); }, { passive: false });
      elWrap.addEventListener('touchend',   function (e) { e.preventDefault(); endAction(); }, { passive: false });
    }

    function updateBtn() {
      var b  = document.getElementById(uid + '_btn');
      var nc = document.getElementById(uid + '_nc');
      if (b)  b.classList.toggle('tm-ready', placedNotes.length === 8);
      if (nc) nc.textContent = 'Notas colocadas: ' + placedNotes.length + ' / 8';
    }

    function checkAnswer() {
      var elBtn = document.getElementById(uid + '_btn');
      if (!elBtn || !elBtn.classList.contains('tm-ready') || answered) return;
      answered = true;

      var expected = parseScale(cQ);
      var placed   = sortedByPitch(placedNotes);

      var ascending = placed.every(function (p, i) {
        return i === 0 || pitchVal(placed[i]) > pitchVal(placed[i - 1]);
      });
      var ok = ascending && placed.length === 8 && expected.every(function (e, i) {
        return placed[i].vfn === e.vfn && placed[i].acc === e.acc;
      });

      elBtn.style.display = 'none';
      document.getElementById(uid + '_nxt').className = 'tm-nxt tm-show';

      var scaleLbl = expected.map(function (e) {
        return NOTE_NAMES[VF_NAMES.indexOf(e.vfn)] + ACC_SYM[String(e.acc)];
      }).join(' — ');

      var elFb = document.getElementById(uid + '_fb');
      if (ok) {
        score++;
        elFb.className = 'tm-fb tm-ok tm-show';
        elFb.innerHTML = '<strong>✓ \xa1Correcto!</strong> ' + scaleLbl + '.';
      } else {
        placedNotes = expected.slice();
        drawStaff();
        elFb.className = 'tm-fb tm-ko tm-show';
        elFb.innerHTML = '<strong>✗ Incorrecto.</strong> La escala correcta: ' + scaleLbl + '.';
      }

      document.getElementById(uid + '_badge').textContent = '✓ ' + score;
      document.getElementById(uid + '_wrap').classList.add('tm-answered');
    }

    function nextQ() {
      if (currentQ >= totalQ) { showResults(); return; }
      currentQ++; answered = false; placedNotes = []; lastLoupeKey = null; currentSvg = null;
      document.getElementById(uid + '_fill').style.width = ((currentQ - 1) / totalQ * 100) + '%';
      document.getElementById(uid + '_cnt').textContent = currentQ + ' / ' + totalQ;
      var elBtn = document.getElementById(uid + '_btn');
      elBtn.style.display = ''; elBtn.classList.remove('tm-ready');
      document.getElementById(uid + '_fb').className = 'tm-fb';
      document.getElementById(uid + '_nxt').className = 'tm-nxt';
      document.getElementById(uid + '_wrap').classList.remove('tm-answered');
      document.getElementById(uid + '_nc').textContent = 'Notas colocadas: 0 / 8';
      genQ();
      document.getElementById(uid + '_q').innerHTML =
        'Dibuja la escala completa: <strong>' + cQ.name + '</strong>';
      drawStaff();
    }

    function showResults() {
      var pct = Math.round(score / totalQ * 100);
      var loupe = document.getElementById(uid + '_loupe');
      if (loupe) loupe.style.display = 'none';
      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-iv-score-box">',
            '<div class="tm-iv-score-num">' + score + '/' + totalQ + '</div>',
            '<div class="tm-iv-score-pct">' + pct + '%</div>',
          '</div>',
          '<button class="tm-submit tm-ready" id="' + uid + '_restart">Hacer otro test</button>',
        '</div>'
      ].join('');
      document.getElementById(uid + '_restart').addEventListener('click', function () {
        currentQ = 0; score = 0; showModeScreen();
      });
    }

    function init() { showModeScreen(); }
    if (typeof Vex !== 'undefined') { init(); }
    else { window.addEventListener('vexflow-ready', init, { once: true }); }
  }

  window.tmEsConstrEngine = tmEsConstrEngine;
})();
