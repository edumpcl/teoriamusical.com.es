/* Motor de ejercicios de acordes tríada — v2 con inversiones */
(function () {
  'use strict';

  var NS = [0, 2, 4, 5, 7, 9, 11]; /* C D E F G A B */
  var VF_NAMES = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];

  var TRIADS = [
    { id: 'mayor', third: 4, fifth: 7, label: 'Perfecta Mayor', short: 'PM'   },
    { id: 'menor', third: 3, fifth: 7, label: 'Perfecta menor', short: 'Pm'   },
    { id: 'dis',   third: 3, fifth: 6, label: '5\xaa Disminuida', short: '5dis' },
    { id: 'aum',   third: 4, fifth: 8, label: '5\xaa Aumentada',  short: '5Aum' }
  ];

  var DIFICULTADES = [
    { lbl: 'F\xe1cil',    maxAlt: 0, id: 'easy'   },
    { lbl: 'Medio',       maxAlt: 1, id: 'medium' },
    { lbl: 'Dif\xedcil', maxAlt: 2, id: 'hard'   }
  ];

  var INV_LABEL = ['Fundamental', '1\xaa inversi\xf3n', '2\xaa inversi\xf3n'];

  var INV_TITLES = {
    'fundamental': 'Tr\xedadas en Fundamental',
    '1a':          'Tr\xedadas en 1\xaa Inversi\xf3n',
    '2a':          'Tr\xedadas en 2\xaa Inversi\xf3n',
    'todas':       'Tr\xedadas — Las tres posiciones'
  };

  var PREGUNTAS_POR_TEST = 10;
  var ICONOS = ['☀️', '⚡', '🔥'];
  var DESCS  = ['Solo acordes con notas naturales', 'Con sostenidos y bemoles', 'Con dobles alteraciones'];

  var CSS = [
    '.tm-iv-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:24px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,0.05);}',
    '.tm-iv-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-iv-wrap .tm-staff{background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;margin:15px 0;min-height:140px;display:flex;justify-content:center;}',
    '.tm-iv-wrap .tm-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(90px,1fr));gap:10px;margin-top:10px;}',
    '.tm-iv-wrap .tm-opt{font-size:.85rem;font-weight:700;padding:12px;border:1px solid #d8d0b8;background:#f5f2ea;cursor:pointer;border-radius:6px;transition:0.2s;text-align:center;font-family:inherit;}',
    '.tm-iv-wrap .tm-opt.tm-sel{background:#8b6914!important;color:#fff!important;border-color:#8b6914!important;box-shadow:0 4px 10px rgba(139,105,20,0.3);}',
    '.tm-iv-wrap .tm-opt.tm-ok{background:#27ae60!important;color:#fff!important;border-color:#27ae60!important;}',
    '.tm-iv-wrap .tm-opt.tm-ko{background:#c0392b!important;color:#fff!important;border-color:#c0392b!important;}',
    '.tm-iv-wrap .tm-submit{width:100%;margin-top:20px;padding:15px;background:#d8d0b8;color:#fff;border:none;border-radius:6px;font-weight:800;cursor:not-allowed;font-family:inherit;}',
    '.tm-iv-wrap .tm-submit.tm-ready{background:#8b6914;cursor:pointer;}',
    '.tm-iv-wrap .tm-fb{display:none;margin-top:15px;padding:15px;border-radius:6px;font-weight:600;}',
    '.tm-iv-wrap .tm-fb.tm-show{display:block;}',
    '.tm-iv-wrap .tm-fb.tm-ok{background:#e8f5e9;color:#2e7d32;}',
    '.tm-iv-wrap .tm-fb.tm-ko{background:#ffebee;color:#c62828;}',
    '.tm-iv-wrap .tm-nxt{display:none;width:100%;margin-top:10px;padding:15px;background:#1a1a1a;color:#fff;border:none;border-radius:6px;cursor:pointer;font-family:inherit;}',
    '.tm-iv-wrap .tm-nxt.tm-show{display:block;}',
    '.tm-iv-wrap .tm-iv-mode-screen{text-align:center;padding:.5rem 0 1rem;}',
    '.tm-iv-wrap .tm-iv-title{font-size:1.35rem;font-weight:700;margin:0 0 .3rem;color:#1a1a2e;}',
    '.tm-iv-wrap .tm-iv-subtitle{color:#666;margin:0 0 1.5rem;font-size:.92rem;}',
    '.tm-iv-wrap .tm-iv-modes{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}',
    '.tm-iv-wrap .tm-iv-mode-btn{background:#fff;border:2px solid #d8d0b8;border-radius:12px;padding:1.2rem 1.8rem;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:.4rem;min-width:120px;font-family:inherit;}',
    '.tm-iv-wrap .tm-iv-mode-btn:hover{border-color:#8b6914;background:#fdf8ee;}',
    '.tm-iv-wrap .tm-iv-mode-icon{font-size:1.5rem;line-height:1;}',
    '.tm-iv-wrap .tm-iv-mode-lbl{font-size:.88rem;font-weight:700;color:#1a1a2e;}',
    '.tm-iv-wrap .tm-iv-mode-desc{font-size:.75rem;color:#888;text-align:center;line-height:1.3;}',
    '.tm-iv-wrap .tm-iv-header{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap;}',
    '.tm-iv-wrap .tm-iv-progress-wrap{flex:1;display:flex;flex-direction:column;gap:.3rem;min-width:0;}',
    '.tm-iv-wrap .tm-iv-bar{height:6px;background:#e4e9f2;border-radius:3px;overflow:hidden;}',
    '.tm-iv-wrap .tm-iv-fill{height:100%;background:#8b6914;border-radius:3px;transition:width .4s ease;width:0%;}',
    '.tm-iv-wrap .tm-iv-counter{font-size:.82rem;color:#666;font-weight:500;}',
    '.tm-iv-wrap .tm-iv-badge{font-size:.92rem;font-weight:700;color:#8b6914;background:#fdf8ee;padding:.2rem .7rem;border-radius:8px;white-space:nowrap;}',
    '.tm-iv-wrap .tm-iv-score-box{text-align:center;padding:2rem;background:linear-gradient(135deg,#8b6914,#6b5010);border-radius:16px;color:#fff;margin-bottom:1.5rem;}',
    '.tm-iv-wrap .tm-iv-score-num{font-size:3rem;font-weight:800;line-height:1;}',
    '.tm-iv-wrap .tm-iv-score-pct{font-size:1.3rem;font-weight:600;opacity:.9;margin:.3rem 0;}',
    '@media(max-width:500px){.tm-iv-wrap .tm-iv-modes{flex-direction:column;align-items:center;}.tm-iv-wrap .tm-iv-mode-btn{width:100%;max-width:220px;}}',
    /* Loupe */
    '.tm-iv-wrap .tm-iv-loupe{position:fixed;display:none;pointer-events:none;z-index:9999;background:#fdfcf9;border:2px solid #333;border-radius:12px;padding:6px 8px;box-shadow:0 8px 28px rgba(0,0,0,0.35);transform:translate(-50%,calc(-100% - 18px));}',
    '.tm-iv-wrap .tm-iv-loupe::after{content:"";position:absolute;bottom:-13px;left:50%;transform:translateX(-50%);border:11px solid transparent;border-top-color:#333;border-bottom:none;}',
    '.tm-iv-wrap .tm-iv-loupe::before{content:"";position:absolute;bottom:-9px;left:50%;transform:translateX(-50%);border:9px solid transparent;border-top-color:#fdfcf9;border-bottom:none;z-index:1;}',
    '.tm-iv-wrap .tm-iv-loupe-staff{line-height:0;}',
    /* Construir triadas */
    '.tm-iv-wrap .tm-construir-q{text-align:center;font-size:1.05rem;margin:10px 0;}',
    '.tm-iv-wrap .tm-staff-construir{position:relative;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;margin:15px 0;cursor:crosshair;user-select:none;touch-action:none;overflow:hidden;}',
    '.tm-iv-wrap .tm-staff-construir.tm-answered{cursor:default;}',
    '.tm-iv-wrap .tm-high{position:absolute;left:0;right:0;height:2px;background:rgba(139,105,20,0.45);pointer-events:none;display:none;}',
    '.tm-iv-wrap .tm-tools-row{display:flex;align-items:center;gap:8px;margin:10px 0;flex-wrap:wrap;}',
    '.tm-iv-wrap .tm-tools-acc{display:flex;gap:6px;}',
    '.tm-iv-wrap .tm-tool{font-size:1.1rem;padding:8px 14px;border:1px solid #d8d0b8;background:#f5f2ea;cursor:pointer;border-radius:6px;font-family:inherit;transition:.15s;}',
    '.tm-iv-wrap .tm-tool.tm-active{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-iv-wrap .tm-tools-edit{display:flex;gap:6px;margin-left:auto;}',
    '.tm-iv-wrap .tm-tool-edit{font-size:.82rem;padding:8px 12px;border:1px solid #d8d0b8;background:#f5f2ea;cursor:pointer;border-radius:6px;font-family:inherit;color:#555;transition:.15s;}',
    '.tm-iv-wrap .tm-tool-edit:hover{border-color:#8b6914;color:#8b6914;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-iv-css')) return;
    var s = document.createElement('style');
    s.id = 'tm-iv-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function accStr(a) {
    if (a ===  2) return '##';
    if (a ===  1) return '#';
    if (a === -1) return 'b';
    if (a === -2) return 'bb';
    return null;
  }

  /* ================================================================
     Motor principal
     config.inversion: 'fundamental' | '1a' | '2a' | 'todas'
     ================================================================ */
  function tmAcEngine(containerId, config) {
    injectCSS();
    config = config || {};
    if (config.test === 'construir') { startConstruirMode(containerId); return; }
    var invType = config.inversion || 'fundamental';

    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-iv-wrap';
    var uid = containerId;

    var totalQ = PREGUNTAS_POR_TEST;
    var currentQ, score, cQ, selAns, answered, maxAlt;

    /* ---- Pantalla de selección de dificultad ---- */
    function showModeScreen() {
      var btns = DIFICULTADES.map(function (d, i) {
        return [
          '<button class="tm-iv-mode-btn" data-i="' + i + '">',
            '<span class="tm-iv-mode-icon">' + ICONOS[i] + '</span>',
            '<span class="tm-iv-mode-lbl">' + d.lbl + '</span>',
            '<span class="tm-iv-mode-desc">' + DESCS[i] + '</span>',
          '</button>'
        ].join('');
      }).join('');

      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-iv-mode-screen">',
            '<h2 class="tm-iv-title">Test &mdash; ' + (INV_TITLES[invType] || 'Tr\xedadas') + '</h2>',
            '<p class="tm-iv-subtitle">Elige el nivel de dificultad &mdash; ' + totalQ + ' preguntas</p>',
            '<div class="tm-iv-modes">' + btns + '</div>',
          '</div>',
        '</div>'
      ].join('');

      wrap.querySelectorAll('.tm-iv-mode-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var d = DIFICULTADES[parseInt(btn.dataset.i, 10)];
          maxAlt   = d.maxAlt;
          currentQ = 0;
          score    = 0;
          startQuiz();
        });
      });
    }

    /* ---- Pantalla de quiz ---- */
    function startQuiz() {
      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-iv-header">',
            '<div class="tm-iv-progress-wrap">',
              '<div class="tm-iv-bar"><div class="tm-iv-fill" id="' + uid + '_fill"></div></div>',
              '<span class="tm-iv-counter" id="' + uid + '_cnt">1 / ' + totalQ + '</span>',
            '</div>',
            '<span class="tm-iv-badge" id="' + uid + '_badge">✓ 0</span>',
          '</div>',
          '<div class="tm-staff"><div id="' + uid + '_not"></div></div>',
          '<div class="tm-grid" id="' + uid + '_opts"></div>',
          '<button class="tm-submit" id="' + uid + '_btn">Comprobar</button>',
          '<div id="' + uid + '_fb" class="tm-fb"></div>',
          '<button id="' + uid + '_nxt" class="tm-nxt">Siguiente →</button>',
        '</div>'
      ].join('');

      document.getElementById(uid + '_btn').addEventListener('click', checkAnswer);
      document.getElementById(uid + '_nxt').addEventListener('click', nextQ);
      nextQ();
    }

    /* ---- Genera una pregunta válida para la dificultad actual ---- */
    function genQ() {
      var attempts = 0;
      var n1, a1, triad, n2, n3, nd3, nd5, a2, a3;

      do {
        n1    = Math.floor(Math.random() * 7);
        a1    = Math.floor(Math.random() * (2 * maxAlt + 1)) - maxAlt;
        triad = TRIADS[Math.floor(Math.random() * TRIADS.length)];

        n2 = (n1 + 2) % 7;
        n3 = (n1 + 4) % 7;

        nd3 = NS[n2] - NS[n1]; if (nd3 < 0) nd3 += 12;
        nd5 = NS[n3] - NS[n1]; if (nd5 < 0) nd5 += 12;

        a2 = triad.third - nd3 + a1;
        a3 = triad.fifth  - nd5 + a1;

        attempts++;
      } while ((Math.abs(a1) > maxAlt || Math.abs(a2) > maxAlt || Math.abs(a3) > maxAlt) && attempts < 300);

      /* Inversión para esta pregunta */
      var inv;
      if      (invType === 'fundamental') inv = 0;
      else if (invType === '1a')          inv = 1;
      else if (invType === '2a')          inv = 2;
      else                                inv = Math.floor(Math.random() * 3);

      cQ = { n1: n1, a1: a1, n2: n2, a2: a2, n3: n3, a3: a3, triad: triad, inv: inv };
    }

    /* ---- Dibuja el acorde con la inversión correcta ---- */
    function drawStaff() {
      var elNot = document.getElementById(uid + '_not');
      elNot.innerHTML = '';
      var V = Vex.Flow;
      var r = new V.Renderer(elNot, V.Renderer.Backends.SVG);
      r.resize(300, 130);
      var ctx = r.getContext();
      var stave = new V.Stave(10, 10, 280);
      stave.addClef('treble').setContext(ctx).draw();

      /*
       * Orden de notas según inversión:
       *   Fundamental (0): [fundamental, 3ª, 5ª]
       *   1ª inversión (1): [3ª, 5ª, fundamental]
       *   2ª inversión (2): [5ª, fundamental, 3ª]
       */
      var order = [
        [cQ.n1, cQ.a1, cQ.n2, cQ.a2, cQ.n3, cQ.a3],
        [cQ.n2, cQ.a2, cQ.n3, cQ.a3, cQ.n1, cQ.a1],
        [cQ.n3, cQ.a3, cQ.n1, cQ.a1, cQ.n2, cQ.a2]
      ][cQ.inv];

      var bn  = order[0], ba  = order[1];
      var mn  = order[2], ma  = order[3];
      var tn  = order[4], ta  = order[5];

      /* Octavas — cada nota debe estar por encima de la anterior */
      var boct = 4;
      var moct = (mn > bn) ? boct : boct + 1;
      var toct = (tn > mn) ? moct : moct + 1;

      var key1 = VF_NAMES[bn] + '/' + boct;
      var key2 = VF_NAMES[mn] + '/' + moct;
      var key3 = VF_NAMES[tn] + '/' + toct;

      var chord = new V.StaveNote({ keys: [key1, key2, key3], duration: 'w' });
      var acc1 = accStr(ba), acc2 = accStr(ma), acc3 = accStr(ta);
      if (acc1) chord.addModifier(new V.Accidental(acc1), 0);
      if (acc2) chord.addModifier(new V.Accidental(acc2), 1);
      if (acc3) chord.addModifier(new V.Accidental(acc3), 2);

      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([chord]);
      new V.Formatter().joinVoices([voice]).format([voice], 180);
      voice.draw(ctx, stave);
    }

    /* ---- Renderiza los 4 botones de opción (orden aleatorio) ---- */
    function renderOptions() {
      var elOpts = document.getElementById(uid + '_opts');
      var shuffled = TRIADS.slice().sort(function () { return Math.random() - 0.5; });
      elOpts.innerHTML = shuffled.map(function (t) {
        return '<button class="tm-opt" data-v="' + t.id + '">' + t.label + '</button>';
      }).join('');
      selAns = null;
      document.getElementById(uid + '_btn').classList.remove('tm-ready');
      elOpts.querySelectorAll('.tm-opt').forEach(function (btn) {
        btn.addEventListener('click', function () { selectOpt(btn); });
      });
    }

    function selectOpt(btn) {
      if (answered) return;
      document.getElementById(uid + '_opts').querySelectorAll('.tm-opt').forEach(function (b) {
        b.classList.remove('tm-sel');
      });
      btn.classList.add('tm-sel');
      selAns = btn.dataset.v;
      document.getElementById(uid + '_btn').classList.add('tm-ready');
    }

    function checkAnswer() {
      var elBtn = document.getElementById(uid + '_btn');
      if (!elBtn.classList.contains('tm-ready')) return;
      answered = true;
      elBtn.style.display = 'none';
      document.getElementById(uid + '_nxt').className = 'tm-nxt tm-show';

      var correct = selAns === cQ.triad.id;
      if (correct) score++;

      var elFb = document.getElementById(uid + '_fb');
      elFb.className = 'tm-fb tm-show ' + (correct ? 'tm-ok' : 'tm-ko');

      if (correct) {
        elFb.textContent = '¡Correcto!';
      } else {
        /* En el ejercicio combinado, también se indica la inversión */
        var extra = invType === 'todas' ? ' (' + INV_LABEL[cQ.inv] + ')' : '';
        elFb.textContent = 'Incorrecto. La respuesta es: ' + cQ.triad.label + extra + '.';
      }

      document.getElementById(uid + '_badge').textContent = '✓ ' + score;

      document.getElementById(uid + '_opts').querySelectorAll('.tm-opt').forEach(function (b) {
        b.disabled = true;
        if (b.dataset.v === cQ.triad.id) b.classList.add('tm-ok');
        else if (b.classList.contains('tm-sel')) b.classList.add('tm-ko');
      });
    }

    function nextQ() {
      if (currentQ >= totalQ) { showResults(); return; }
      currentQ++;
      answered = false;

      document.getElementById(uid + '_fill').style.width = ((currentQ - 1) / totalQ * 100) + '%';
      document.getElementById(uid + '_cnt').textContent  = currentQ + ' / ' + totalQ;
      var elBtn = document.getElementById(uid + '_btn');
      elBtn.style.display = '';
      elBtn.classList.remove('tm-ready');
      document.getElementById(uid + '_fb').className = 'tm-fb';
      document.getElementById(uid + '_nxt').className = 'tm-nxt';

      genQ();
      renderOptions();
      drawStaff();
    }

    function showResults() {
      var pct = Math.round(score / totalQ * 100);
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
        currentQ = 0; score = 0;
        showModeScreen();
      });
    }

    function init() { showModeScreen(); }

    if (typeof Vex !== 'undefined') {
      init();
    } else {
      window.addEventListener('vexflow-ready', init, { once: true });
    }
  }

  /* ================================================================
     Modo construir tríadas
     ================================================================ */
  function startConstruirMode(containerId) {
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-iv-wrap';
    var uid = containerId;

    var NOTE_NAMES = ['Do','Re','Mi','Fa','Sol','La','Si'];
    var ACC_SYM = {'-2':'♭♭','-1':'♭','0':'','1':'♯','2':'♯♯'};

    var SVG_W = 300, SVG_H = 170, STAVE_Y = 30, STAVE_W = 280;

    /* Staff positions G5 → B3, each 5px apart in SVG space */
    var ROWS = [
      {vfn:'g',n:4,oct:5,line:-0.5},
      {vfn:'f',n:3,oct:5,line: 0  },
      {vfn:'e',n:2,oct:5,line: 0.5},
      {vfn:'d',n:1,oct:5,line: 1  },
      {vfn:'c',n:0,oct:5,line: 1.5},
      {vfn:'b',n:6,oct:4,line: 2  },
      {vfn:'a',n:5,oct:4,line: 2.5},
      {vfn:'g',n:4,oct:4,line: 3  },
      {vfn:'f',n:3,oct:4,line: 3.5},
      {vfn:'e',n:2,oct:4,line: 4  },
      {vfn:'d',n:1,oct:4,line: 4.5},
      {vfn:'c',n:0,oct:4,line: 5  },
      {vfn:'b',n:6,oct:3,line: 5.5}
    ];

    var totalQ = PREGUNTAS_POR_TEST;
    var currentQ, score, maxAlt, cQ, answered, placedNotes, activeTool, lastLoupeKey, currentSvg;

    /* ---- Mode selection ---- */
    function showModeScreen() {
      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-iv-mode-screen">',
            '<h2 class="tm-iv-title">Test — Construir Tr\xedadas</h2>',
            '<p class="tm-iv-subtitle">Elige el nivel de dificultad — ' + totalQ + ' preguntas</p>',
            '<div class="tm-iv-modes">',
              DIFICULTADES.map(function(d,i){
                return '<button class="tm-iv-mode-btn" data-i="'+i+'"><span class="tm-iv-mode-icon">'+ICONOS[i]+'</span><span class="tm-iv-mode-lbl">'+d.lbl+'</span><span class="tm-iv-mode-desc">'+DESCS[i]+'</span></button>';
              }).join(''),
            '</div>',
          '</div>',
        '</div>'
      ].join('');
      wrap.querySelectorAll('.tm-iv-mode-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var d = DIFICULTADES[parseInt(btn.dataset.i, 10)];
          maxAlt = d.maxAlt; currentQ = 0; score = 0;
          startQuiz();
        });
      });
    }

    /* ---- Quiz UI ---- */
    function startQuiz() {
      var tools = (maxAlt >= 2
        ? [[-2,'♭♭'],[-1,'♭'],[0,'♮'],[1,'♯'],[2,'♯♯']]
        : [[-1,'♭'],[0,'♮'],[1,'♯']]
      ).map(function(t){
        return '<button class="tm-tool" data-acc="'+t[0]+'">'+t[1]+'</button>';
      }).join('');

      wrap.innerHTML = [
        '<div class="tm-card" id="'+uid+'_card">',
          '<div class="tm-iv-header">',
            '<div class="tm-iv-progress-wrap">',
              '<div class="tm-iv-bar"><div class="tm-iv-fill" id="'+uid+'_fill"></div></div>',
              '<span class="tm-iv-counter" id="'+uid+'_cnt">1 / '+totalQ+'</span>',
            '</div>',
            '<span class="tm-iv-badge" id="'+uid+'_badge">✓ 0</span>',
          '</div>',
          '<p class="tm-construir-q" id="'+uid+'_q"></p>',
          '<div class="tm-staff-construir" id="'+uid+'_wrap">',
            '<div id="'+uid+'_not"></div>',
            '<div class="tm-high" id="'+uid+'_high"></div>',
          '</div>',
          '<div class="tm-tools-row">',
            '<div class="tm-tools-acc">'+tools+'</div>',
            '<div class="tm-tools-edit">',
              '<button class="tm-tool-edit" id="'+uid+'_undo">↩ Deshacer</button>',
              '<button class="tm-tool-edit" id="'+uid+'_clear">× Limpiar</button>',
            '</div>',
          '</div>',
          '<button class="tm-submit" id="'+uid+'_btn">Comprobar</button>',
          '<div class="tm-fb" id="'+uid+'_fb"></div>',
          '<button class="tm-nxt" id="'+uid+'_nxt">Siguiente →</button>',
        '</div>',
        '<div class="tm-iv-loupe" id="'+uid+'_loupe">',
          '<div class="tm-iv-loupe-staff" id="'+uid+'_lstaff"></div>',
        '</div>'
      ].join('');

      activeTool = 0; placedNotes = []; currentSvg = null; lastLoupeKey = null;

      wrap.querySelectorAll('.tm-tool').forEach(function(btn) {
        btn.addEventListener('click', function() {
          activeTool = parseInt(btn.dataset.acc, 10);
          lastLoupeKey = null;
          wrap.querySelectorAll('.tm-tool').forEach(function(b){ b.classList.remove('tm-active'); });
          btn.classList.add('tm-active');
        });
      });
      var nat = wrap.querySelector('.tm-tool[data-acc="0"]');
      if (nat) nat.classList.add('tm-active');

      document.getElementById(uid+'_undo').addEventListener('click', function() {
        if (answered || !placedNotes.length) return;
        placedNotes.pop(); drawStaff(); updateBtn();
      });
      document.getElementById(uid+'_clear').addEventListener('click', function() {
        if (answered) return;
        placedNotes = []; drawStaff(); updateBtn();
      });
      document.getElementById(uid+'_btn').addEventListener('click', checkAnswer);
      document.getElementById(uid+'_nxt').addEventListener('click', nextQ);

      attachInteraction();
      nextQ();
    }

    /* ---- Generate question ---- */
    function genQ() {
      var att = 0, n1, a1, triad, n2, n3, nd3, nd5, a2, a3;
      var maxRes = Math.max(1, maxAlt);
      do {
        n1    = Math.floor(Math.random() * 7);
        a1    = maxAlt === 0 ? 0 : (Math.floor(Math.random() * (2*maxAlt+1)) - maxAlt);
        triad = TRIADS[Math.floor(Math.random() * TRIADS.length)];
        n2 = (n1+2)%7; n3 = (n1+4)%7;
        nd3 = (NS[n2]-NS[n1]+12)%12;
        nd5 = (NS[n3]-NS[n1]+12)%12;
        a2 = triad.third - nd3 + a1;
        a3 = triad.fifth  - nd5 + a1;
        att++;
      } while ((Math.abs(a1)>maxAlt || Math.abs(a2)>maxRes || Math.abs(a3)>maxRes) && att<300);
      var oct2 = n2 > n1 ? 4 : 5;
      var oct3 = n3 > n1 ? 4 : 5;
      cQ = {n1:n1,a1:a1,n2:n2,a2:a2,oct2:oct2,n3:n3,a3:a3,oct3:oct3,triad:triad};
    }

    /* ---- Draw main staff (root + placed notes) ---- */
    function drawStaff() {
      var elNot = document.getElementById(uid+'_not');
      if (!elNot || typeof Vex === 'undefined') return;
      elNot.innerHTML = '';
      var V = Vex.Flow;
      var r = new V.Renderer(elNot, V.Renderer.Backends.SVG);
      r.resize(SVG_W, SVG_H);
      var ctx = r.getContext();
      ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(10, STAVE_Y, STAVE_W);
      stave.addClef('treble').setContext(ctx).draw();
      var keys = [VF_NAMES[cQ.n1]+'/4'];
      placedNotes.forEach(function(p){ keys.push(p.vfn+'/'+p.oct); });
      var chord = new V.StaveNote({keys:keys,duration:'w'});
      var a0 = accStr(cQ.a1); if (a0) chord.addModifier(new V.Accidental(a0),0);
      placedNotes.forEach(function(p,i){
        var a = accStr(p.acc); if (a) chord.addModifier(new V.Accidental(a),i+1);
      });
      var voice = new V.Voice({num_beats:4,beat_value:4}).setStrict(false);
      voice.addTickables([chord]);
      new V.Formatter().joinVoices([voice]).format([voice],180);
      voice.draw(ctx, stave);
      var svg = elNot.querySelector('svg');
      if (svg) {
        svg.setAttribute('viewBox','0 0 '+SVG_W+' '+SVG_H);
        svg.style.width='100%'; svg.style.height='auto';
        currentSvg = svg;
      }
    }

    /* ---- Draw loupe (root + placed + preview amber) ---- */
    function drawLoupe(row) {
      var elLstaff = document.getElementById(uid+'_lstaff');
      if (!elLstaff || typeof Vex === 'undefined') return;
      var key = cQ.n1+','+cQ.a1+'|'+placedNotes.map(function(p){return p.vfn+p.oct+p.acc;}).join(',')+'|'+row.vfn+row.oct+activeTool;
      if (key === lastLoupeKey) return;
      lastLoupeKey = key;
      elLstaff.innerHTML = '';
      var V = Vex.Flow;
      var rend = new V.Renderer(elLstaff, V.Renderer.Backends.SVG);
      rend.resize(300,160);
      var ctx = rend.getContext();
      ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(10,20,280);
      stave.addClef('treble').setContext(ctx).draw();

      /* Collect all notes, sort bottom-to-top so setKeyStyle index matches VF rendering */
      var all = [{vfn:VF_NAMES[cQ.n1],oct:4,acc:cQ.a1,pre:false}];
      placedNotes.forEach(function(p){ all.push({vfn:p.vfn,oct:p.oct,acc:p.acc,pre:false}); });
      all.push({vfn:row.vfn,oct:row.oct,acc:activeTool,pre:true});
      all.sort(function(a,b){
        return (a.oct*12+NS[VF_NAMES.indexOf(a.vfn)]+a.acc)-(b.oct*12+NS[VF_NAMES.indexOf(b.vfn)]+b.acc);
      });

      var keys = all.map(function(n){return n.vfn+'/'+n.oct;});
      var chord = new V.StaveNote({keys:keys,duration:'w'});
      all.forEach(function(n,i){
        var st = n.pre ? {fillStyle:'#8b6914',strokeStyle:'#8b6914'} : {fillStyle:'#1a1a1a',strokeStyle:'#1a1a1a'};
        if (chord.setKeyStyle) chord.setKeyStyle(i,st);
        var a = accStr(n.acc);
        if (a) {
          var obj = new V.Accidental(a);
          if (n.pre && obj.setStyle) obj.setStyle(st);
          chord.addModifier(obj,i);
        }
      });
      var voice = new V.Voice({num_beats:4,beat_value:4}).setStrict(false);
      voice.addTickables([chord]);
      new V.Formatter().joinVoices([voice]).format([voice],180);
      voice.draw(ctx,stave);
      var svg = elLstaff.querySelector('svg');
      var w = placedNotes.length > 0 ? '240' : '180';
      var h = placedNotes.length > 0 ? '96' : '72';
      if (svg) { svg.setAttribute('viewBox','0 0 300 160'); svg.setAttribute('width',w); svg.setAttribute('height',h); }
    }

    /* ---- Map screen Y to ROWS index ---- */
    function getRow(clientY) {
      if (!currentSvg) return ROWS[7];
      var sr = currentSvg.getBoundingClientRect();
      if (!sr.width) return ROWS[7];
      var scale = sr.width / SVG_W;
      var svgY = (clientY - sr.top) / scale;
      /* Row 0 (G5) is at svgY = STAVE_Y + (-0.5)*10 = STAVE_Y - 5 */
      var idx = Math.round((svgY - STAVE_Y + 5) / 5);
      return ROWS[Math.max(0, Math.min(ROWS.length-1, idx))];
    }

    /* ---- Interaction ---- */
    function attachInteraction() {
      var elWrap  = document.getElementById(uid+'_wrap');
      var elHigh  = document.getElementById(uid+'_high');
      var elLoupe = document.getElementById(uid+'_loupe');
      var isDragging = false, currentBest = null;

      function updatePreview(e) {
        if (!isDragging || answered || !currentSvg) return;
        var clientX = e.touches ? e.changedTouches[0].clientX : e.clientX;
        var clientY = e.touches ? e.changedTouches[0].clientY : e.clientY;
        var row = getRow(clientY);
        currentBest = row;
        /* Highlight line */
        var sr = currentSvg.getBoundingClientRect();
        var wr = elWrap.getBoundingClientRect();
        var scale = sr.width / SVG_W;
        var lineY = (sr.top - wr.top) + (STAVE_Y + row.line*10)*scale;
        elHigh.style.display = 'block';
        elHigh.style.top = (lineY-1)+'px';
        /* Loupe */
        elLoupe.style.transform = '';
        elLoupe.style.left = clientX+'px';
        elLoupe.style.top  = clientY+'px';
        elLoupe.style.display = 'block';
        drawLoupe(row);
        var lr = elLoupe.getBoundingClientRect();
        var pad = 8;
        if (lr.left < pad) {
          elLoupe.style.left = (clientX - lr.left + pad)+'px';
        } else if (lr.right > window.innerWidth - pad) {
          elLoupe.style.left = (clientX - (lr.right - window.innerWidth + pad))+'px';
        }
        if (lr.top < pad) elLoupe.style.transform = 'translate(-50%,18px)';
      }

      function startAction(e) {
        if (answered || placedNotes.length >= 2) return;
        isDragging = true; updatePreview(e);
      }
      function endAction() {
        if (!isDragging) return;
        isDragging = false;
        if (currentBest && !answered && placedNotes.length < 2) {
          placedNotes.push({vfn:currentBest.vfn,oct:currentBest.oct,acc:activeTool});
          drawStaff(); updateBtn(); lastLoupeKey = null;
        }
        currentBest = null;
        elHigh.style.display = 'none';
        elLoupe.style.display = 'none';
      }

      elWrap.addEventListener('mousedown', startAction);
      elWrap.addEventListener('mousemove', function(e){ if (isDragging) updatePreview(e); });
      window.addEventListener('mouseup', endAction);
      elWrap.addEventListener('touchstart', function(e){ e.preventDefault(); startAction(e); }, {passive:false});
      elWrap.addEventListener('touchmove',  function(e){ e.preventDefault(); updatePreview(e); }, {passive:false});
      elWrap.addEventListener('touchend',   function(e){ e.preventDefault(); endAction(); }, {passive:false});
    }

    function updateBtn() {
      var b = document.getElementById(uid+'_btn');
      if (b) b.classList.toggle('tm-ready', placedNotes.length === 2);
    }

    /* ---- Check answer ---- */
    function checkAnswer() {
      var elBtn = document.getElementById(uid+'_btn');
      if (!elBtn || !elBtn.classList.contains('tm-ready') || answered) return;
      answered = true;
      var exp3 = {vfn:VF_NAMES[cQ.n2],oct:cQ.oct2,acc:cQ.a2};
      var exp5 = {vfn:VF_NAMES[cQ.n3],oct:cQ.oct3,acc:cQ.a3};
      function match(p,e){ return p.vfn===e.vfn && p.oct===e.oct && p.acc===e.acc; }
      var ok = placedNotes.length===2 && (
        (match(placedNotes[0],exp3)&&match(placedNotes[1],exp5)) ||
        (match(placedNotes[0],exp5)&&match(placedNotes[1],exp3))
      );
      elBtn.style.display = 'none';
      document.getElementById(uid+'_nxt').className = 'tm-nxt tm-show';
      var elFb = document.getElementById(uid+'_fb');
      var r3 = NOTE_NAMES[cQ.n2]+ACC_SYM[String(cQ.a2)];
      var r5 = NOTE_NAMES[cQ.n3]+ACC_SYM[String(cQ.a3)];
      if (ok) {
        score++;
        elFb.className = 'tm-fb tm-ok tm-show';
        elFb.innerHTML = '<strong>✓ \xa1Correcto!</strong> — 3\xaa: '+r3+', 5\xaa: '+r5+'.';
      } else {
        /* Show correct answer on staff */
        placedNotes = [{vfn:VF_NAMES[cQ.n2],oct:cQ.oct2,acc:cQ.a2},{vfn:VF_NAMES[cQ.n3],oct:cQ.oct3,acc:cQ.a3}];
        drawStaff();
        elFb.className = 'tm-fb tm-ko tm-show';
        elFb.innerHTML = '<strong>✗ Incorrecto.</strong> La soluci\xf3n: 3\xaa '+r3+', 5\xaa '+r5+'.';
      }
      document.getElementById(uid+'_badge').textContent = '✓ '+score;
      document.getElementById(uid+'_wrap').classList.add('tm-answered');
    }

    /* ---- Next question ---- */
    function nextQ() {
      if (currentQ >= totalQ) { showResults(); return; }
      currentQ++; answered = false; placedNotes = []; lastLoupeKey = null; currentSvg = null;
      document.getElementById(uid+'_fill').style.width = ((currentQ-1)/totalQ*100)+'%';
      document.getElementById(uid+'_cnt').textContent = currentQ+' / '+totalQ;
      var elBtn = document.getElementById(uid+'_btn');
      elBtn.style.display=''; elBtn.classList.remove('tm-ready');
      document.getElementById(uid+'_fb').className = 'tm-fb';
      document.getElementById(uid+'_nxt').className = 'tm-nxt';
      document.getElementById(uid+'_wrap').classList.remove('tm-answered');
      genQ();
      var rootLbl = NOTE_NAMES[cQ.n1]+ACC_SYM[String(cQ.a1)];
      document.getElementById(uid+'_q').innerHTML =
        'Dibuja la 3\xaa y la 5\xaa del acorde: <strong>'+rootLbl+' — '+cQ.triad.short+'</strong>';
      drawStaff();
    }

    /* ---- Results ---- */
    function showResults() {
      var pct = Math.round(score/totalQ*100);
      var loupe = document.getElementById(uid+'_loupe');
      if (loupe) loupe.style.display = 'none';
      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-iv-score-box">',
            '<div class="tm-iv-score-num">'+score+'/'+totalQ+'</div>',
            '<div class="tm-iv-score-pct">'+pct+'%</div>',
          '</div>',
          '<button class="tm-submit tm-ready" id="'+uid+'_restart">Hacer otro test</button>',
        '</div>'
      ].join('');
      document.getElementById(uid+'_restart').addEventListener('click',function(){
        currentQ=0; score=0; showModeScreen();
      });
    }

    function init() { showModeScreen(); }
    if (typeof Vex !== 'undefined') { init(); }
    else { window.addEventListener('vexflow-ready', init, {once:true}); }
  }

  window.tmAcEngine = tmAcEngine;
})();
