/* Motor — Construir Escala CON ARMADURA (2 fases: armadura + escala)
   Fase 1: el alumno dibuja la armadura a mano (herramienta ♯/♭ + clic en el
           pentagrama, en orden), como en el ejercicio de Dibujar la armadura.
   Fase 2: con la armadura ya puesta, escribe la escala; las notas heredan la
           armadura y solo se marca con ♮/♯/♭ lo que se desvía de ella. */
(function () {
  'use strict';

  var NS         = [0, 2, 4, 5, 7, 9, 11];
  var VF_NAMES   = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
  var NOTE_NAMES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
  var ACC_SYM    = { '-2': '♭♭', '-1': '♭', '0': '', '1': '♯', '2': '♯♯' };

  function glyphFor(a) { return a === 2 ? '##' : a === 1 ? '#' : a === -1 ? 'b' : a === -2 ? 'bb' : 'n'; }
  function accNum(s)   { return s === '##' ? 2 : s === '#' ? 1 : s === 'b' ? -1 : s === 'bb' ? -2 : 0; }
  function pitchVal(p) { return p.oct * 12 + NS[VF_NAMES.indexOf(p.vfn)]; }

  var SVG_W = 520, SVG_H = 200, STAVE_Y = 55, STAVE_W = 480;

  var ROWS = [
    { vfn:'b', oct:5, line:-1.5 }, { vfn:'a', oct:5, line:-1   }, { vfn:'g', oct:5, line:-0.5 },
    { vfn:'f', oct:5, line: 0   }, { vfn:'e', oct:5, line: 0.5 }, { vfn:'d', oct:5, line: 1   },
    { vfn:'c', oct:5, line: 1.5 }, { vfn:'b', oct:4, line: 2   }, { vfn:'a', oct:4, line: 2.5 },
    { vfn:'g', oct:4, line: 3   }, { vfn:'f', oct:4, line: 3.5 }, { vfn:'e', oct:4, line: 4   },
    { vfn:'d', oct:4, line: 4.5 }, { vfn:'c', oct:4, line: 5   }, { vfn:'b', oct:3, line: 5.5 },
    { vfn:'a', oct:3, line: 6   }, { vfn:'g', oct:3, line: 6.5 }, { vfn:'f', oct:3, line: 7   },
    { vfn:'e', oct:3, line: 7.5 }, { vfn:'d', oct:3, line: 8   }, { vfn:'c', oct:3, line: 8.5 }
  ];
  var FIRST_ROW_SVGY = STAVE_Y + ROWS[0].line * 10;

  /* posiciones canónicas de la armadura en clave de Sol */
  var SHARP_ORDER = [{vfn:'f',oct:5},{vfn:'c',oct:5},{vfn:'g',oct:5},{vfn:'d',oct:5},{vfn:'a',oct:4},{vfn:'e',oct:5},{vfn:'b',oct:4}];
  var FLAT_ORDER  = [{vfn:'b',oct:4},{vfn:'e',oct:5},{vfn:'a',oct:4},{vfn:'d',oct:5},{vfn:'g',oct:4},{vfn:'c',oct:5},{vfn:'f',oct:4}];
  /* armadura por tónica: nº de alteraciones y tipo (relativo menor y mayor) */
  var KSIG_MIN = {
    'La': {acc:'#', n:0},
    'Mi': {acc:'#', n:1}, 'Si': {acc:'#', n:2}, 'Fa♯': {acc:'#', n:3}, 'Do♯': {acc:'#', n:4}, 'Sol♯': {acc:'#', n:5}, 'Re♯': {acc:'#', n:6}, 'La♯': {acc:'#', n:7},
    'Re': {acc:'b', n:1}, 'Sol': {acc:'b', n:2}, 'Do': {acc:'b', n:3}, 'Fa': {acc:'b', n:4}, 'Si♭': {acc:'b', n:5}, 'Mi♭': {acc:'b', n:6}, 'La♭': {acc:'b', n:7}
  };
  var KSIG_MAJ = {
    'Do': {acc:'#', n:0},
    'Sol': {acc:'#', n:1}, 'Re': {acc:'#', n:2}, 'La': {acc:'#', n:3}, 'Mi': {acc:'#', n:4}, 'Si': {acc:'#', n:5}, 'Fa♯': {acc:'#', n:6}, 'Do♯': {acc:'#', n:7},
    'Fa': {acc:'b', n:1}, 'Si♭': {acc:'b', n:2}, 'Mi♭': {acc:'b', n:3}, 'La♭': {acc:'b', n:4}, 'Re♭': {acc:'b', n:5}, 'Sol♭': {acc:'b', n:6}, 'Do♭': {acc:'b', n:7}
  };
  var MAJ_SHARP = ['C','G','D','A','E','B','F#','C#'];
  var MAJ_FLAT  = ['C','F','Bb','Eb','Ab','Db','Gb','Cb'];

  function armaduraFor(scale) {
    var tonic = scale.name.split(' ')[0];
    /* mayor y mixolidia/mixtas → armadura mayor; menor y dórica → armadura menor */
    var tabla = /Mayor|Mixolidia/.test(scale.name) ? KSIG_MAJ : KSIG_MIN;
    var ks = tabla[tonic] || { acc:'#', n:0 };
    var pitches = (ks.acc === '#' ? SHARP_ORDER : FLAT_ORDER).slice(0, ks.n);
    var altByLetter = {};
    pitches.forEach(function (p) { altByLetter[p.vfn] = ks.acc === '#' ? 1 : -1; });
    var vex = ks.acc === '#' ? MAJ_SHARP[ks.n] : MAJ_FLAT[ks.n];
    return { acc: ks.acc, n: ks.n, pitches: pitches, altByLetter: altByLetter, vex: vex };
  }

  function isSeqScale(s) { return !!(s && s.seq); }

  /* notas de la escala en orden (secuencia asc+desc, o escala ascendente) */
  function scaleNotes(scale) {
    if (scale.seq) return scale.seq.map(function (t) { return { vfn: t[0], oct: parseInt(t[1], 10), alt: t[2] }; });
    return scale.notes.map(function (key) {
      var pr = key.split('/');
      return { vfn: pr[0], oct: parseInt(pr[1], 10), alt: accNum(scale.acc[key] || '') };
    });
  }

  /* recorre las notas en orden aplicando la persistencia de alteraciones del
     compás, partiendo de la armadura. Devuelve por nota la alteración efectiva
     y si el glifo escrito era redundante. cb(note, expAlt) decide el glifo. */
  function walk(notes, arm, glyphOf) {
    var active = {};
    return notes.map(function (n) {
      var key = n.vfn + n.oct;
      var cur = (key in active) ? active[key] : (arm.altByLetter[n.vfn] || 0);
      var r = glyphOf(n, cur);   // {alt, glyph, redundant}
      active[key] = r.alt;
      return { vfn: n.vfn, oct: n.oct, alt: r.alt, glyph: r.glyph, redundant: r.redundant };
    });
  }

  /* notas esperadas con el glifo canónico (null = hereda lo activo en el compás) */
  function expectedScale(scale, arm) {
    return walk(scaleNotes(scale), arm, function (n, cur) {
      return { alt: n.alt, glyph: n.alt === cur ? null : glyphFor(n.alt), redundant: false };
    });
  }

  /* evalúa las notas colocadas por el alumno: altura efectiva + redundancia */
  function evalPlaced(placed, arm) {
    return walk(placed, arm, function (n, cur) {
      if (n.glyph == null) return { alt: cur, glyph: null, redundant: false };
      var a = accNum(n.glyph);
      return { alt: a, glyph: n.glyph, redundant: a === cur };
    });
  }

  /* escalas mayores (no están en TM_CONSTRUIR_SCALES; viven en el motor) */
  var SCALES_MAYOR = [
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

  /* dificultad por armadura (igual criterio que el ejercicio sin armadura) */
  var DIFF_LBL = ['F\xe1cil', 'Medio', 'Dif\xedcil'];
  var DIFF_BASE = [1, 4, 99];
  var ICONOS = ['☀️', '⚡', '🔥'];
  function buildDifficulties(scales) {
    var minA = Math.min.apply(null, scales.map(function (s) { return armaduraFor(s).n; }));
    return DIFF_BASE.map(function (b, i) {
      var last = i === DIFF_BASE.length - 1;
      var maxA = last ? b : Math.max(b, minA);
      var desc = last ? 'Todas las tonalidades' : maxA <= 1 ? 'Sin alteraciones o con 1' : 'Hasta ' + maxA + ' alteraciones';
      return { lbl: DIFF_LBL[i], desc: desc, maxAlts: maxA };
    });
  }

  var CSS = [
    '.tm-esa-wrap *{box-sizing:border-box;margin:0;padding:0;}',
    '.tm-esa-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:24px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,0.05);}',
    '.tm-esa-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-esa-wrap .tm-submit{width:100%;margin-top:20px;padding:15px;background:#d8d0b8;color:#fff;border:none;border-radius:6px;font-weight:800;cursor:not-allowed;font-family:inherit;}',
    '.tm-esa-wrap .tm-submit.tm-ready{background:#8b6914;cursor:pointer;}',
    '.tm-esa-wrap .tm-fb{display:none;margin-top:15px;padding:15px;border-radius:6px;font-weight:600;line-height:1.5;}',
    '.tm-esa-wrap .tm-fb.tm-show{display:block;}',
    '.tm-esa-wrap .tm-fb.tm-ok{background:#e8f5e9;color:#2e7d32;}',
    '.tm-esa-wrap .tm-fb.tm-ko{background:#ffebee;color:#c62828;}',
    '.tm-esa-wrap .tm-nxt{display:none;width:100%;margin-top:10px;padding:15px;background:#1a1a1a;color:#fff;border:none;border-radius:6px;cursor:pointer;font-family:inherit;}',
    '.tm-esa-wrap .tm-nxt.tm-show{display:block;}',
    '.tm-esa-wrap .tm-iv-mode-screen{text-align:center;padding:.5rem 0 1rem;}',
    '.tm-esa-wrap .tm-iv-title{font-size:1.35rem;font-weight:700;margin:0 0 .3rem;color:#1a1a2e;}',
    '.tm-esa-wrap .tm-iv-subtitle{color:#666;margin:0 0 1.5rem;font-size:.92rem;}',
    '.tm-esa-wrap .tm-iv-modes{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}',
    '.tm-esa-wrap .tm-iv-mode-btn{background:#fff;border:2px solid #d8d0b8;border-radius:12px;padding:1.2rem 1.8rem;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:.4rem;min-width:120px;font-family:inherit;}',
    '.tm-esa-wrap .tm-iv-mode-btn:hover{border-color:#8b6914;background:#fdf8ee;}',
    '.tm-esa-wrap .tm-iv-mode-icon{font-size:1.5rem;line-height:1;}',
    '.tm-esa-wrap .tm-iv-mode-lbl{font-size:.88rem;font-weight:700;color:#1a1a2e;}',
    '.tm-esa-wrap .tm-iv-mode-desc{font-size:.75rem;color:#888;text-align:center;line-height:1.3;}',
    '.tm-esa-wrap .tm-iv-header{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap;}',
    '.tm-esa-wrap .tm-iv-progress-wrap{flex:1;display:flex;flex-direction:column;gap:.3rem;min-width:0;}',
    '.tm-esa-wrap .tm-iv-bar{height:6px;background:#e4e9f2;border-radius:3px;overflow:hidden;}',
    '.tm-esa-wrap .tm-iv-fill{height:100%;background:#8b6914;border-radius:3px;transition:width .4s ease;width:0%;}',
    '.tm-esa-wrap .tm-iv-counter{font-size:.82rem;color:#666;font-weight:500;}',
    '.tm-esa-wrap .tm-iv-badge{font-size:.92rem;font-weight:700;color:#8b6914;background:#fdf8ee;padding:.2rem .7rem;border-radius:8px;white-space:nowrap;}',
    '.tm-esa-wrap .tm-iv-score-box{text-align:center;padding:2rem;background:linear-gradient(135deg,#8b6914,#6b5010);border-radius:16px;color:#fff;margin-bottom:1.5rem;}',
    '.tm-esa-wrap .tm-iv-score-num{font-size:3rem;font-weight:800;line-height:1;}',
    '.tm-esa-wrap .tm-iv-score-pct{font-size:1.3rem;font-weight:600;opacity:.9;margin:.3rem 0;}',
    '.tm-esa-wrap .tm-step{text-align:center;font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#8b6914;margin:6px 0 0;}',
    '.tm-esa-wrap .tm-construir-q{text-align:center;font-size:1.05rem;margin:4px 0 10px;}',
    '.tm-esa-wrap .tm-staff-construir{position:relative;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;margin:15px 0;cursor:crosshair;user-select:none;touch-action:none;overflow:hidden;}',
    '.tm-esa-wrap .tm-staff-construir.tm-answered{cursor:default;}',
    '.tm-esa-wrap .tm-high{position:absolute;left:0;right:0;height:2px;background:rgba(139,105,20,0.45);pointer-events:none;display:none;}',
    '.tm-esa-wrap .tm-tools-row{display:flex;align-items:center;gap:8px;margin:10px 0;flex-wrap:wrap;}',
    '.tm-esa-wrap .tm-tools-acc{display:flex;gap:6px;flex-wrap:wrap;}',
    '.tm-esa-wrap .tm-tool{font-size:1rem;padding:8px 14px;border:1px solid #d8d0b8;background:#f5f2ea;cursor:pointer;border-radius:6px;font-family:inherit;transition:.15s;}',
    '.tm-esa-wrap .tm-tool.tm-active{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-esa-wrap .tm-tool-hint{font-size:.74rem;color:#888;align-self:center;line-height:1.3;max-width:260px;}',
    '.tm-esa-wrap .tm-tools-edit{display:flex;gap:6px;margin-left:auto;}',
    '.tm-esa-wrap .tm-tool-edit{font-size:.82rem;padding:8px 12px;border:1px solid #d8d0b8;background:#f5f2ea;cursor:pointer;border-radius:6px;font-family:inherit;color:#555;transition:.15s;}',
    '.tm-esa-wrap .tm-tool-edit:hover{border-color:#8b6914;color:#8b6914;}',
    '.tm-esa-wrap .tm-note-count{font-size:.82rem;color:#666;margin:4px 0 0;text-align:center;}',
    '.tm-esa-wrap .tm-iv-loupe{position:fixed;display:none;pointer-events:none;z-index:9999;background:#fdfcf9;border:2px solid #333;border-radius:12px;padding:6px 8px;box-shadow:0 8px 28px rgba(0,0,0,0.35);transform:translate(-50%,calc(-100% - 18px));max-width:calc(100vw - 16px);}',
    '.tm-esa-wrap .tm-iv-loupe::after{content:"";position:absolute;bottom:-13px;left:50%;transform:translateX(-50%);border:11px solid transparent;border-top-color:#333;border-bottom:none;}',
    '.tm-esa-wrap .tm-iv-loupe::before{content:"";position:absolute;bottom:-9px;left:50%;transform:translateX(-50%);border:9px solid transparent;border-top-color:#fdfcf9;border-bottom:none;z-index:1;}',
    '.tm-esa-wrap .tm-iv-loupe-staff{line-height:0;}',
    '.tm-esa-wrap .tm-iv-loupe-staff svg{display:block;max-width:100%;height:auto;}',
    '@media(max-width:500px){.tm-esa-wrap .tm-iv-modes{flex-direction:column;align-items:center;}.tm-esa-wrap .tm-iv-mode-btn{width:100%;max-width:220px;}}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-esa-css')) return;
    var s = document.createElement('style');
    s.id = 'tm-esa-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function tmEsArmaduraEngine(containerId, config) {
    injectCSS();
    config = config || {};
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-esa-wrap';
    var uid = containerId;

    var totalQ = 10;
    var SCALES = config.scales || SCALES_MAYOR;
    var tipo = config.tipo || 'escala';
    var DIFICULTADES = buildDifficulties(SCALES);

    var currentQ, score, maxAlts, cQ, arm, expNotes, phase, armOk;
    var placedAcc, placedNotes, activeTool, answered, currentSvg, lastLoupeKey;
    var vW = SVG_W;
    function seqMode() { return isSeqScale(cQ); }
    function target() { return expNotes ? expNotes.length : 8; }

    function showModeScreen() {
      wrap.innerHTML = [
        '<div class="tm-card"><div class="tm-iv-mode-screen">',
          '<h2 class="tm-iv-title">Test — Armadura + ' + (config.titulo || 'Escala') + '</h2>',
          '<p class="tm-iv-subtitle">Primero la armadura, luego la escala — ' + totalQ + ' preguntas</p>',
          '<div class="tm-iv-modes">',
            DIFICULTADES.map(function (d, i) {
              return '<button class="tm-iv-mode-btn" data-i="' + i + '"><span class="tm-iv-mode-icon">' + ICONOS[i] + '</span><span class="tm-iv-mode-lbl">' + d.lbl + '</span><span class="tm-iv-mode-desc">' + d.desc + '</span></button>';
            }).join(''),
          '</div>',
        '</div></div>'
      ].join('');
      wrap.querySelectorAll('.tm-iv-mode-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          maxAlts = DIFICULTADES[parseInt(btn.dataset.i, 10)].maxAlts;
          currentQ = 0; score = 0; startQuiz();
        });
      });
    }

    function startQuiz() {
      wrap.innerHTML = [
        '<div class="tm-card" id="' + uid + '_card">',
          '<div class="tm-iv-header">',
            '<div class="tm-iv-progress-wrap">',
              '<div class="tm-iv-bar"><div class="tm-iv-fill" id="' + uid + '_fill"></div></div>',
              '<span class="tm-iv-counter" id="' + uid + '_cnt">1 / ' + totalQ + '</span>',
            '</div>',
            '<span class="tm-iv-badge" id="' + uid + '_badge">✓ 0</span>',
          '</div>',
          '<p class="tm-step" id="' + uid + '_step"></p>',
          '<p class="tm-construir-q" id="' + uid + '_q"></p>',
          '<div class="tm-staff-construir" id="' + uid + '_wrap">',
            '<div id="' + uid + '_not"></div>',
            '<div class="tm-high" id="' + uid + '_high"></div>',
          '</div>',
          '<p class="tm-note-count" id="' + uid + '_nc"></p>',
          '<div class="tm-tools-row">',
            '<div class="tm-tools-acc" id="' + uid + '_tools"></div>',
            '<div class="tm-tools-edit">',
              '<button class="tm-tool-edit" id="' + uid + '_undo">↩ Deshacer</button>',
              '<button class="tm-tool-edit" id="' + uid + '_clear">\xd7 Limpiar</button>',
            '</div>',
          '</div>',
          '<button class="tm-submit" id="' + uid + '_btn"></button>',
          '<div class="tm-fb" id="' + uid + '_fb"></div>',
          '<button class="tm-nxt" id="' + uid + '_nxt">Siguiente →</button>',
        '</div>',
        '<div class="tm-iv-loupe" id="' + uid + '_loupe"><div class="tm-iv-loupe-staff" id="' + uid + '_lstaff"></div></div>'
      ].join('');

      document.getElementById(uid + '_undo').addEventListener('click', function () {
        if (answered) return;
        var arr = phase === 'arm' ? placedAcc : placedNotes;
        if (arr.length) { arr.pop(); draw(); updateBtn(); }
      });
      document.getElementById(uid + '_clear').addEventListener('click', function () {
        if (answered) return;
        if (phase === 'arm') placedAcc = []; else placedNotes = [];
        draw(); updateBtn();
      });
      document.getElementById(uid + '_btn').addEventListener('click', onSubmit);
      document.getElementById(uid + '_nxt').addEventListener('click', nextQ);
      attachInteraction();
      nextQ();
    }

    function syncTools() {
      var elT = document.getElementById(uid + '_tools');
      if (elT) elT.querySelectorAll('.tm-tool').forEach(function (b) {
        b.classList.toggle('tm-active', String(b.dataset.tool) === String(activeTool));
      });
    }
    function renderTools() {
      var defs = phase === 'arm'
        ? [['#', '♯ Sostenido'], ['b', '♭ Bemol']]
        : [[-1, '♭'], [0, '♮'], [1, '♯']];
      var elT = document.getElementById(uid + '_tools');
      var hint = phase === 'esc'
        ? '<span class="tm-tool-hint">Coloca la nota; pulsa ♭ ♮ ♯ solo si la necesitas</span>'
        : '';
      elT.innerHTML = defs.map(function (t) {
        return '<button class="tm-tool" data-tool="' + t[0] + '">' + t[1] + '</button>';
      }).join('') + hint;
      /* armadura: por defecto ♯ (como en Dibujar la armadura). escala: ninguna activa → hereda */
      activeTool = phase === 'arm' ? '#' : 'inherit';
      elT.querySelectorAll('.tm-tool').forEach(function (b) {
        b.addEventListener('click', function () {
          if (answered) return;
          var val = phase === 'arm' ? b.dataset.tool : parseInt(b.dataset.tool, 10);
          if (phase === 'esc' && activeTool === val) activeTool = 'inherit'; // re-clic = deseleccionar
          else activeTool = val;
          syncTools(); lastLoupeKey = null;
        });
      });
      syncTools();
    }

    function genQ() {
      var pool = SCALES.filter(function (s) { return armaduraFor(s).n <= maxAlts; });
      if (!pool.length) {
        var minA = Math.min.apply(null, SCALES.map(function (s) { return armaduraFor(s).n; }));
        pool = SCALES.filter(function (s) { return armaduraFor(s).n === minA; });
      }
      cQ = pool[Math.floor(Math.random() * pool.length)];
      arm = armaduraFor(cQ);
      expNotes = expectedScale(cQ, arm);
      vW = isSeqScale(cQ) ? 940 : SVG_W;   // las secuencias (15 notas) necesitan más ancho
    }

    function sortedByPitch(a) { return a.slice().sort(function (x, y) { return pitchVal(x) - pitchVal(y); }); }

    /* ── DIBUJO ── */
    function draw() {
      var elNot = document.getElementById(uid + '_not');
      if (!elNot || typeof Vex === 'undefined') return;
      elNot.innerHTML = '';
      var V = Vex.Flow;
      var staveW = vW - 40;
      var r = new V.Renderer(elNot, V.Renderer.Backends.SVG);
      r.resize(vW, SVG_H);
      var ctx = r.getContext();
      ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(10, STAVE_Y, staveW);
      stave.addClef('treble');
      if (phase === 'esc' && arm.vex !== 'C') stave.addKeySignature(arm.vex);
      stave.setContext(ctx).draw();

      if (phase === 'arm') {
        var startX = stave.getNoteStartX() + 6, sp = 16;
        placedAcc.forEach(function (p, i) {
          var line = lineFor(p.vfn, p.oct);
          V.Glyph.renderGlyph(ctx, startX + i * sp, stave.getYForLine(line), 38,
            p.acc === '#' ? 'accidentalSharp' : 'accidentalFlat');
        });
      } else if (placedNotes.length > 0) {
        /* en secuencia (melódica) se respeta el orden de colocación; si no, por altura */
        var ordered = seqMode() ? placedNotes.slice() : sortedByPitch(placedNotes);
        var vfNotes = ordered.map(function (p) {
          var n = new V.StaveNote({ keys: [p.vfn + '/' + p.oct], duration: 'w' });
          if (p.glyph) n.addModifier(new V.Accidental(p.glyph), 0);
          return n;
        });
        var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false);
        voice.addTickables(vfNotes);
        new V.Formatter().joinVoices([voice]).format([voice], staveW - 70 - arm.n * 12);
        voice.draw(ctx, stave);
      }

      var svg = elNot.querySelector('svg');
      if (svg) {
        svg.setAttribute('viewBox', '0 0 ' + vW + ' ' + SVG_H);
        svg.style.width = '100%'; svg.style.height = 'auto';
        currentSvg = svg;
      }
    }

    function lineFor(vfn, oct) {
      for (var i = 0; i < ROWS.length; i++) if (ROWS[i].vfn === vfn && ROWS[i].oct === oct) return ROWS[i].line;
      return 2;
    }

    /* ── LUPA ── */
    function drawLoupe(row) {
      var elL = document.getElementById(uid + '_lstaff');
      if (!elL || typeof Vex === 'undefined') return;
      var k = phase + '|' + placedAcc.length + '|' + placedNotes.length + '|' + row.vfn + row.oct + activeTool;
      if (k === lastLoupeKey) return;
      lastLoupeKey = k;
      elL.innerHTML = '';
      var V = Vex.Flow;
      var cw = 300;
      var r = new V.Renderer(elL, V.Renderer.Backends.SVG);
      r.resize(cw, 120);
      var ctx = r.getContext();
      ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(10, 20, cw - 20);
      stave.addClef('treble');
      if (phase === 'esc' && arm.vex !== 'C') stave.addKeySignature(arm.vex);
      stave.setContext(ctx).draw();

      if (phase === 'arm') {
        var sx = stave.getNoteStartX() + 6, sp = 16;
        placedAcc.forEach(function (p, i) {
          V.Glyph.renderGlyph(ctx, sx + i * sp, stave.getYForLine(lineFor(p.vfn, p.oct)), 38,
            p.acc === '#' ? 'accidentalSharp' : 'accidentalFlat');
        });
        ctx.setFillStyle('#8b6914'); ctx.setStrokeStyle('#8b6914');
        V.Glyph.renderGlyph(ctx, sx + placedAcc.length * sp, stave.getYForLine(row.line), 38,
          activeTool === '#' ? 'accidentalSharp' : 'accidentalFlat');
      } else {
        var preview = { vfn: row.vfn, oct: row.oct, glyph: activeTool === 'inherit' ? null : glyphFor(activeTool), _h: true };
        var all = seqMode() ? placedNotes.concat([preview]) : sortedByPitch(placedNotes.concat([preview]));
        if (seqMode() && all.length > 8) all = all.slice(all.length - 8);
        var notes = all.map(function (p) {
          var n = new V.StaveNote({ keys: [p.vfn + '/' + p.oct], duration: 'w' });
          if (p._h && n.setKeyStyle) n.setKeyStyle(0, { fillStyle:'#8b6914', strokeStyle:'#8b6914' });
          if (p.glyph) {
            var a = new V.Accidental(p.glyph);
            if (p._h && a.setStyle) a.setStyle({ fillStyle:'#8b6914', strokeStyle:'#8b6914' });
            n.addModifier(a, 0);
          }
          return n;
        });
        var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false);
        voice.addTickables(notes);
        new V.Formatter().joinVoices([voice]).format([voice], cw - 90);
        voice.draw(ctx, stave);
      }
      var svg = elL.querySelector('svg');
      if (svg) {
        var has = phase === 'arm' ? placedAcc.length > 0 : placedNotes.length > 0;
        svg.setAttribute('viewBox', '0 0 ' + cw + ' 120');
        svg.setAttribute('width', has ? 240 : 170);
        svg.setAttribute('height', has ? 96 : 68);
      }
    }

    function getRow(clientY) {
      if (!currentSvg) return ROWS[10];
      var sr = currentSvg.getBoundingClientRect();
      if (!sr.width) return ROWS[10];
      var sc = sr.width / vW;
      var svgY = (clientY - sr.top) / sc;
      var idx = Math.round((svgY - FIRST_ROW_SVGY) / 5);
      return ROWS[Math.max(0, Math.min(ROWS.length - 1, idx))];
    }

    function attachInteraction() {
      var elWrap = document.getElementById(uid + '_wrap');
      var elHigh = document.getElementById(uid + '_high');
      var elLoupe = document.getElementById(uid + '_loupe');
      var dragging = false, best = null;

      function update(e) {
        if (!dragging || answered || !currentSvg) return;
        var cy = e.touches ? e.changedTouches[0].clientY : e.clientY;
        var cx = e.touches ? e.changedTouches[0].clientX : e.clientX;
        var row = getRow(cy); best = row;
        var sr = currentSvg.getBoundingClientRect(), wr = elWrap.getBoundingClientRect();
        var sc = sr.width / vW;
        var lineY = (sr.top - wr.top) + (STAVE_Y + row.line * 10) * sc;
        elHigh.style.display = 'block'; elHigh.style.top = (lineY - 1) + 'px';
        elLoupe.style.transform = ''; elLoupe.style.left = cx + 'px'; elLoupe.style.top = cy + 'px';
        elLoupe.style.display = 'block';
        drawLoupe(row);
        var lr = elLoupe.getBoundingClientRect(), pad = 8;
        if (lr.left < pad) elLoupe.style.left = (cx - lr.left + pad) + 'px';
        else if (lr.right > window.innerWidth - pad) elLoupe.style.left = (cx - (lr.right - window.innerWidth + pad)) + 'px';
        if (lr.top < pad) elLoupe.style.transform = 'translate(-50%,18px)';
      }
      function start(e) { if (answered) return; dragging = true; update(e); }
      function end() {
        if (!dragging) return; dragging = false;
        if (best && !answered) {
          if (phase === 'arm') {
            if (placedAcc.length < 7) placedAcc.push({ vfn: best.vfn, oct: best.oct, acc: activeTool });
          } else {
            var glyph = activeTool === 'inherit' ? null : glyphFor(activeTool);
            if (seqMode()) {
              if (placedNotes.length < target()) placedNotes.push({ vfn: best.vfn, oct: best.oct, glyph: glyph });
            } else {
              var ex = -1;
              for (var i = 0; i < placedNotes.length; i++) if (placedNotes[i].vfn === best.vfn && placedNotes[i].oct === best.oct) { ex = i; break; }
              if (ex >= 0) placedNotes[ex].glyph = glyph;
              else if (placedNotes.length < target()) placedNotes.push({ vfn: best.vfn, oct: best.oct, glyph: glyph });
            }
            if (activeTool !== 'inherit') { activeTool = 'inherit'; syncTools(); } // vuelve a 'heredar'
          }
          draw(); updateBtn(); lastLoupeKey = null;
        }
        best = null; elHigh.style.display = 'none'; elLoupe.style.display = 'none';
      }
      elWrap.addEventListener('mousedown', start);
      elWrap.addEventListener('mousemove', function (e) { if (dragging) update(e); });
      window.addEventListener('mouseup', end);
      elWrap.addEventListener('touchstart', function (e) { e.preventDefault(); start(e); }, { passive: false });
      elWrap.addEventListener('touchmove', function (e) { e.preventDefault(); update(e); }, { passive: false });
      elWrap.addEventListener('touchend', function (e) { e.preventDefault(); end(); }, { passive: false });
    }

    function updateBtn() {
      var b = document.getElementById(uid + '_btn');
      var nc = document.getElementById(uid + '_nc');
      if (phase === 'arm') {
        b.classList.add('tm-ready');   // la armadura se puede comprobar siempre
        b.textContent = 'Comprobar armadura';
        nc.textContent = 'Alteraciones colocadas: ' + placedAcc.length;
      } else {
        b.classList.toggle('tm-ready', placedNotes.length === target());
        b.textContent = 'Comprobar escala';
        nc.textContent = 'Notas colocadas: ' + placedNotes.length + ' / ' + target();
      }
    }

    function setPhase(p) {
      phase = p;
      document.getElementById(uid + '_step').textContent = p === 'arm' ? 'Paso 1 de 2 — Armadura' : 'Paso 2 de 2 — Escala';
      document.getElementById(uid + '_q').innerHTML = p === 'arm'
        ? 'Escribe la <strong>armadura</strong> de: <strong>' + cQ.name + '</strong>'
        : 'Ahora escribe la <strong>escala</strong>: <strong>' + cQ.name + '</strong>';
      renderTools(); draw(); updateBtn();
    }

    function onSubmit() {
      var b = document.getElementById(uid + '_btn');
      if (!b.classList.contains('tm-ready') || answered) return;
      if (phase === 'arm') {
        armOk = placedAcc.length === arm.n && arm.pitches.every(function (e, i) {
          return placedAcc[i] && placedAcc[i].vfn === e.vfn && placedAcc[i].oct === e.oct && placedAcc[i].acc === arm.acc;
        });
        if (!armOk) {
          placedAcc = arm.pitches.map(function (e) { return { vfn: e.vfn, oct: e.oct, acc: arm.acc }; });
        }
        setPhase('esc');
        var fb = document.getElementById(uid + '_fb');
        if (!armOk) {
          fb.className = 'tm-fb tm-ko tm-show';
          fb.innerHTML = '<strong>✗ Armadura incorrecta.</strong> La correcta es ' + (arm.n === 0 ? 'sin alteraciones' : arm.n + (arm.acc === '#' ? ' ♯' : ' ♭')) + '. Continúa con la escala.';
        } else {
          fb.className = 'tm-fb'; fb.innerHTML = '';
        }
        return;
      }
      // fase escala
      answered = true;
      /* secuencia (melódica): orden de colocación; si no: ascendente por altura */
      var ordered = seqMode() ? placedNotes.slice() : sortedByPitch(placedNotes);
      var asc = seqMode() ? true : ordered.every(function (p, i) { return i === 0 || pitchVal(p) > pitchVal(ordered[i - 1]); });
      /* altura efectiva y redundancia con la persistencia de alteraciones del compás */
      var ev = evalPlaced(ordered, arm);
      var scaleOk = asc && ordered.length === expNotes.length;
      var redundant = [];
      if (scaleOk) {
        for (var i = 0; i < expNotes.length; i++) {
          var e = expNotes[i], pl = ordered[i];
          if (pl.vfn !== e.vfn || (seqMode() && pl.oct !== e.oct) || ev[i].alt !== e.alt) { scaleOk = false; break; }
          if (ev[i].redundant) {
            var lab = NOTE_NAMES[VF_NAMES.indexOf(e.vfn)] + ACC_SYM[String(e.alt)];
            if (redundant.indexOf(lab) < 0) redundant.push(lab);
          }
        }
      }
      var ok = armOk && scaleOk;
      document.getElementById(uid + '_btn').style.display = 'none';
      document.getElementById(uid + '_nxt').className = 'tm-nxt tm-show';
      var lbl = expNotes.map(function (e) { return NOTE_NAMES[VF_NAMES.indexOf(e.vfn)] + ACC_SYM[String(e.alt)]; }).join(' — ');
      var fb = document.getElementById(uid + '_fb');
      if (ok) {
        score++;
        fb.className = 'tm-fb tm-ok tm-show';
        var tip = redundant.length
          ? '<br><span style="font-weight:400">No hacía falta escribir la alteración de ' + redundant.join(', ') + ': ya queda definida por la armadura.</span>'
          : '';
        fb.innerHTML = '<strong>✓ ¡Correcto!</strong> ' + lbl + '.' + tip;
      } else {
        placedNotes = expNotes.map(function (e) { return { vfn: e.vfn, oct: e.oct, glyph: e.glyph }; });
        draw();
        fb.className = 'tm-fb tm-ko tm-show';
        fb.innerHTML = '<strong>✗ Incorrecto.</strong> ' + (armOk ? '' : 'La armadura estaba mal. ') + 'La escala correcta: ' + lbl + '.';
      }
      document.getElementById(uid + '_badge').textContent = '✓ ' + score;
      document.getElementById(uid + '_wrap').classList.add('tm-answered');
    }

    function nextQ() {
      if (currentQ >= totalQ) { showResults(); return; }
      currentQ++; answered = false; armOk = false;
      placedAcc = []; placedNotes = []; currentSvg = null; lastLoupeKey = null;
      document.getElementById(uid + '_fill').style.width = ((currentQ - 1) / totalQ * 100) + '%';
      document.getElementById(uid + '_cnt').textContent = currentQ + ' / ' + totalQ;
      var b = document.getElementById(uid + '_btn');
      b.style.display = ''; b.classList.remove('tm-ready');
      document.getElementById(uid + '_fb').className = 'tm-fb';
      document.getElementById(uid + '_nxt').className = 'tm-nxt';
      document.getElementById(uid + '_wrap').classList.remove('tm-answered');
      genQ();
      setPhase('arm');
    }

    function showResults() {
      var pct = Math.round(score / totalQ * 100);
      var loupe = document.getElementById(uid + '_loupe');
      if (loupe) loupe.style.display = 'none';
      wrap.innerHTML = [
        '<div class="tm-card"><div class="tm-iv-score-box">',
          '<div class="tm-iv-score-num">' + score + '/' + totalQ + '</div>',
          '<div class="tm-iv-score-pct">' + pct + '%</div>',
        '</div>',
        '<button class="tm-nxt tm-show" id="' + uid + '_restart">Volver a empezar</button></div>'
      ].join('');
      document.getElementById(uid + '_restart').addEventListener('click', showModeScreen);
    }

    showModeScreen();
  }

  window.tmEsArmaduraEngine = tmEsArmaduraEngine;
})();
