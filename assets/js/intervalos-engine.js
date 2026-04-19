/* Motor de ejercicios de intervalos — v3 con dificultades por alteraciones */
(function () {
  'use strict';

  var DEFS = {
    "1j":[0,0,"1","Justa"], "2d":[1,0,"2","Dis"],  "2m":[1,1,"2","menor"],
    "2M":[1,2,"2","Mayor"], "3d":[2,2,"3","Dis"],  "3m":[2,3,"3","menor"],
    "3M":[2,4,"3","Mayor"], "4d":[3,4,"4","Dis"],  "4j":[3,5,"4","Justa"],
    "4A":[3,6,"4","Aum"],   "5d":[4,6,"5","Dis"],  "5j":[4,7,"5","Justa"],
    "5A":[4,8,"5","Aum"],   "6m":[5,8,"6","menor"],"6M":[5,9,"6","Mayor"],
    "7m":[6,10,"7","menor"],"7M":[6,11,"7","Mayor"],"8j":[7,12,"8","Justa"]
  };
  var NS = [0,2,4,5,7,9,11];
  var VF_NAMES = ["c","d","e","f","g","a","b"];

  /* Normaliza abreviaturas de DEFS a los textos que muestran los botones */
  var TIPO_LABEL = { "Dis":"Disminuida", "Aum":"Aumentada", "menor":"menor", "Mayor":"Mayor", "Justa":"Justa" };

  var CONSONANCIA_MAP = {
    "1j":"Consonancia Perfecta","5j":"Consonancia Perfecta","8j":"Consonancia Perfecta",
    "4j":"Semiconsonancia",
    "3m":"Consonancia Imperfecta","3M":"Consonancia Imperfecta",
    "6m":"Consonancia Imperfecta","6M":"Consonancia Imperfecta",
    "2m":"Disonancia Absoluta","2M":"Disonancia Absoluta",
    "7m":"Disonancia Absoluta","7M":"Disonancia Absoluta",
    "4A":"Disonancia Condicional","5d":"Disonancia Condicional",
    "2d":"Disonancia Condicional","3d":"Disonancia Condicional",
    "4d":"Disonancia Condicional","5A":"Disonancia Condicional"
  };

  /*
   * Dificultades — filtran el máximo de alteraciones en la 2ª nota (|a2|):
   *   Fácil:     |a2| = 0  → solo notas naturales
   *   Medio:     |a2| ≤ 1  → hasta simples aumentados/disminuidos (# / b)
   *   Difícil:   |a2| ≤ 2  → hasta dobles aumentados/disminuidos (## / bb)
   */
  var DIFICULTADES = [
    { lbl: "F\xe1cil",      maxAlt: 0 },
    { lbl: "Medio",         maxAlt: 1 },
    { lbl: "Dif\xedcil",   maxAlt: 2 }
  ];
  var PREGUNTAS_POR_TEST = 10;

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
    /* pantalla de selección de dificultad */
    '.tm-iv-wrap .tm-iv-mode-screen{text-align:center;padding:.5rem 0 1rem;}',
    '.tm-iv-wrap .tm-iv-title{font-size:1.35rem;font-weight:700;margin:0 0 .3rem;color:#1a1a2e;}',
    '.tm-iv-wrap .tm-iv-subtitle{color:#666;margin:0 0 1.5rem;font-size:.92rem;}',
    '.tm-iv-wrap .tm-iv-modes{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}',
    '.tm-iv-wrap .tm-iv-mode-btn{background:#fff;border:2px solid #d8d0b8;border-radius:12px;padding:1.2rem 1.8rem;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:.4rem;min-width:120px;font-family:inherit;}',
    '.tm-iv-wrap .tm-iv-mode-btn:hover{border-color:#8b6914;background:#fdf8ee;}',
    '.tm-iv-wrap .tm-iv-mode-icon{font-size:1.5rem;line-height:1;}',
    '.tm-iv-wrap .tm-iv-mode-lbl{font-size:.88rem;font-weight:700;color:#1a1a2e;}',
    '.tm-iv-wrap .tm-iv-mode-desc{font-size:.75rem;color:#888;text-align:center;line-height:1.3;}',
    /* cabecera de progreso */
    '.tm-iv-wrap .tm-iv-header{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap;}',
    '.tm-iv-wrap .tm-iv-progress-wrap{flex:1;display:flex;flex-direction:column;gap:.3rem;min-width:0;}',
    '.tm-iv-wrap .tm-iv-bar{height:6px;background:#e4e9f2;border-radius:3px;overflow:hidden;}',
    '.tm-iv-wrap .tm-iv-fill{height:100%;background:#8b6914;border-radius:3px;transition:width .4s ease;width:0%;}',
    '.tm-iv-wrap .tm-iv-counter{font-size:.82rem;color:#666;font-weight:500;}',
    '.tm-iv-wrap .tm-iv-badge{font-size:.92rem;font-weight:700;color:#8b6914;background:#fdf8ee;padding:.2rem .7rem;border-radius:8px;white-space:nowrap;}',
    /* pantalla de resultados */
    '.tm-iv-wrap .tm-iv-score-box{text-align:center;padding:2rem;background:linear-gradient(135deg,#8b6914,#6b5010);border-radius:16px;color:#fff;margin-bottom:1.5rem;}',
    '.tm-iv-wrap .tm-iv-score-num{font-size:3rem;font-weight:800;line-height:1;}',
    '.tm-iv-wrap .tm-iv-score-pct{font-size:1.3rem;font-weight:600;opacity:.9;margin:.3rem 0;}',
    '@media(max-width:500px){.tm-iv-wrap .tm-iv-modes{flex-direction:column;align-items:center;}.tm-iv-wrap .tm-iv-mode-btn{width:100%;max-width:220px;}}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-iv-css')) return;
    var s = document.createElement('style');
    s.id = 'tm-iv-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function tmIvEngine(containerId, config) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-iv-wrap';
    var uid = containerId;

    var totalQ = PREGUNTAS_POR_TEST;
    var currentQ, score, cQ, sel, answered, maxAlt;

    var TITULOS = {
      'grupo':      'Intervalos de ' + (config.val || '') + '\xaa',
      'completo':   'An\xe1lisis completo de intervalos',
      'numero':     'N\xfamero del intervalo',
      'consonancia':'Consonancia y disonancia',
      'arm_mel':    'Arm\xf3nicos y mel\xf3dicos',
      'asc_des':    'Ascendentes y descendentes',
      'con_dis':    'Conjuntos y disjuntos'
    };

    var ICONOS_DIFICULTAD = ['\u2600\ufe0f', '\u26a1', '\ud83d\udd25'];
    var DESCS_DIFICULTAD = [
      'Solo notas naturales',
      'Con sostenidos y bemoles',
      'Con dobles alteraciones'
    ];

    function baseKeys() {
      var k = Object.keys(DEFS);
      if (config.test === 'grupo') return k.filter(function(x){ return DEFS[x][2] === config.val; });
      return k;
    }

    /* Genera pregunta cumpliendo |a2| <= maxAlt. Reintenta hasta 100 veces. */
    function genQ() {
      var keys = baseKeys();
      var attempts = 0, k, def, n1, n2, nd, a2;
      do {
        k   = keys[Math.floor(Math.random() * keys.length)];
        def = DEFS[k];
        n1  = Math.floor(Math.random() * 7);
        n2  = (n1 + def[0]) % 7;
        nd  = NS[n2] - NS[n1]; if (nd < 0) nd += 12;
        a2  = def[1] - nd;
        attempts++;
      } while (Math.abs(a2) > maxAlt && attempts < 100);
      cQ = { k: k, def: def, n1: n1, n2: n2, a2: a2 };
    }

    function accidental(a2) {
      if (a2 ===  2) return '##';
      if (a2 ===  1) return '#';
      if (a2 === -1) return 'b';
      if (a2 === -2) return 'bb';
      return null;
    }

    function tipoLabel(abrev) {
      return TIPO_LABEL[abrev] || abrev;
    }

    /* -------- pantalla de selección de dificultad -------- */
    function showModeScreen() {
      var btns = DIFICULTADES.map(function(d, i) {
        return [
          '<button class="tm-iv-mode-btn" data-i="' + i + '">',
            '<span class="tm-iv-mode-icon">' + ICONOS_DIFICULTAD[i] + '</span>',
            '<span class="tm-iv-mode-lbl">' + d.lbl + '</span>',
            '<span class="tm-iv-mode-desc">' + DESCS_DIFICULTAD[i] + '</span>',
          '</button>'
        ].join('');
      }).join('');

      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-iv-mode-screen">',
            '<h2 class="tm-iv-title">Test de ' + (TITULOS[config.test] || 'Intervalos') + '</h2>',
            '<p class="tm-iv-subtitle">Elige el nivel de dificultad &mdash; ' + totalQ + ' preguntas</p>',
            '<div class="tm-iv-modes">' + btns + '</div>',
          '</div>',
        '</div>'
      ].join('');

      wrap.querySelectorAll('.tm-iv-mode-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          maxAlt   = DIFICULTADES[parseInt(btn.dataset.i, 10)].maxAlt;
          currentQ = 0;
          score    = 0;
          startQuiz();
        });
      });
    }

    /* -------- pantalla de quiz -------- */
    function startQuiz() {
      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-iv-header">',
            '<div class="tm-iv-progress-wrap">',
              '<div class="tm-iv-bar"><div class="tm-iv-fill" id="' + uid + '_fill"></div></div>',
              '<span class="tm-iv-counter" id="' + uid + '_counter">1 / ' + totalQ + '</span>',
            '</div>',
            '<span class="tm-iv-badge" id="' + uid + '_badge">\u2713 0</span>',
          '</div>',
          '<div class="tm-staff"><div id="' + uid + '_not"></div></div>',
          '<div id="' + uid + '_content"></div>',
          '<button class="tm-submit" id="' + uid + '_btn">Comprobar</button>',
          '<div id="' + uid + '_fb" class="tm-fb"></div>',
          '<button id="' + uid + '_nxt" class="tm-nxt">Siguiente \u2192</button>',
        '</div>'
      ].join('');

      document.getElementById(uid + '_btn').addEventListener('click', checkAnswer);
      document.getElementById(uid + '_nxt').addEventListener('click', nextQ);
      nextQ();
    }

    function renderContent() {
      var elCont = document.getElementById(uid + '_content');
      var h = '';
      if (config.test === 'completo') {
        h += '<div><div class="tm-grid">' +
          ['2','3','4','5','6','7','8'].map(function(n){
            return '<button class="tm-opt" data-g="num" data-v="' + n + '">' + n + '\xaa</button>';
          }).join('') + '</div></div>';
        h += '<div style="margin-top:10px"><div class="tm-grid">' +
          ['Mayor','menor','Justa','Aumentada','Disminuida'].map(function(t){
            return '<button class="tm-opt" data-g="tipo" data-v="' + t + '">' + t + '</button>';
          }).join('') + '</div></div>';
      } else if (config.test === 'consonancia') {
        h += '<div class="tm-grid">' +
          ['Consonancia Perfecta','Consonancia Imperfecta','Semiconsonancia','Disonancia Absoluta','Disonancia Condicional'].map(function(t){
            return '<button class="tm-opt" data-g="ans" data-v="' + t + '">' + t + '</button>';
          }).join('') + '</div>';
      } else if (config.test === 'numero') {
        h += '<div class="tm-grid">' +
          ['1','2','3','4','5','6','7','8'].map(function(n){
            return '<button class="tm-opt" data-g="ans" data-v="' + n + '">' + n + '\xaa</button>';
          }).join('') + '</div>';
      } else {
        h += '<div class="tm-grid">' +
          ['Mayor','menor','Justa','Aumentada','Disminuida'].map(function(t){
            return '<button class="tm-opt" data-g="ans" data-v="' + t + '">' + t + '</button>';
          }).join('') + '</div>';
      }
      elCont.innerHTML = h;
      sel = {};
      document.getElementById(uid + '_btn').classList.remove('tm-ready');
      elCont.querySelectorAll('.tm-opt').forEach(function(btn) {
        btn.addEventListener('click', function() { selOpt(btn.dataset.g, btn.dataset.v, btn); });
      });
    }

    function selOpt(g, v, btn) {
      if (answered) return;
      var elCont = document.getElementById(uid + '_content');
      elCont.querySelectorAll('.tm-opt[data-g="' + g + '"]').forEach(function(x){ x.classList.remove('tm-sel'); });
      btn.classList.add('tm-sel');
      sel[g] = v;
      var ready = config.test === 'completo' ? (sel.num && sel.tipo) : !!sel.ans;
      if (ready) document.getElementById(uid + '_btn').classList.add('tm-ready');
    }

    function drawStaff() {
      var elNot = document.getElementById(uid + '_not');
      elNot.innerHTML = '';
      var V = Vex.Flow;
      var r = new V.Renderer(elNot, V.Renderer.Backends.SVG);
      r.resize(300, 130);
      var ctx = r.getContext();
      var stave = new V.Stave(10, 10, 280);
      stave.addClef('treble').setContext(ctx).draw();
      var sn1 = new V.StaveNote({ keys: [VF_NAMES[cQ.n1] + '/4'], duration: 'w' });
      var sn2 = new V.StaveNote({ keys: [VF_NAMES[cQ.n2] + '/' + (cQ.n2 < cQ.n1 ? 5 : 4)], duration: 'w' });
      var acc = accidental(cQ.a2);
      if (acc) sn2.addModifier(new V.Accidental(acc), 0);
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([sn1, sn2]);
      new V.Formatter().joinVoices([voice]).format([voice], 180);
      voice.draw(ctx, stave);
    }

    function correctTipo() {
      return tipoLabel(cQ.def[3]);
    }

    function isCorrect() {
      if (config.test === 'completo')    return sel.num === cQ.def[2] && sel.tipo === correctTipo();
      if (config.test === 'numero')      return sel.ans === cQ.def[2];
      if (config.test === 'consonancia') return sel.ans === (CONSONANCIA_MAP[cQ.k] || '');
      return sel.ans === correctTipo();
    }

    function correctLabel() {
      if (config.test === 'completo')    return cQ.def[2] + '\xaa ' + correctTipo();
      if (config.test === 'numero')      return cQ.def[2] + '\xaa';
      if (config.test === 'consonancia') return CONSONANCIA_MAP[cQ.k] || '\u2014';
      return cQ.def[2] + '\xaa ' + correctTipo();
    }

    function checkAnswer() {
      var elBtn = document.getElementById(uid + '_btn');
      if (!elBtn.classList.contains('tm-ready')) return;
      answered = true;
      elBtn.style.display = 'none';
      document.getElementById(uid + '_nxt').className = 'tm-nxt tm-show';

      var correct = isCorrect();
      if (correct) score++;

      var elFb = document.getElementById(uid + '_fb');
      elFb.className = 'tm-fb tm-show ' + (correct ? 'tm-ok' : 'tm-ko');
      elFb.textContent = correct
        ? '\u00a1Correcto!'
        : 'Incorrecto. La respuesta es: ' + correctLabel() + '.';

      document.getElementById(uid + '_badge').textContent = '\u2713 ' + score;

      document.getElementById(uid + '_content').querySelectorAll('.tm-opt').forEach(function(b) {
        b.disabled = true;
        var isCorrectOpt = false;
        if (config.test === 'completo') {
          isCorrectOpt = (b.dataset.g === 'num'  && b.dataset.v === cQ.def[2]) ||
                         (b.dataset.g === 'tipo' && b.dataset.v === correctTipo());
        } else if (config.test === 'numero') {
          isCorrectOpt = b.dataset.v === cQ.def[2];
        } else if (config.test === 'consonancia') {
          isCorrectOpt = b.dataset.v === (CONSONANCIA_MAP[cQ.k] || '');
        } else {
          isCorrectOpt = b.dataset.v === correctTipo();
        }
        if (isCorrectOpt) b.classList.add('tm-ok');
        else if (b.classList.contains('tm-sel')) b.classList.add('tm-ko');
      });
    }

    function nextQ() {
      if (currentQ >= totalQ) { showResults(); return; }
      currentQ++;
      answered = false;

      document.getElementById(uid + '_fill').style.width = ((currentQ - 1) / totalQ * 100) + '%';
      document.getElementById(uid + '_counter').textContent = currentQ + ' / ' + totalQ;
      var elBtn = document.getElementById(uid + '_btn');
      elBtn.style.display = '';
      elBtn.classList.remove('tm-ready');
      document.getElementById(uid + '_fb').className = 'tm-fb';
      document.getElementById(uid + '_nxt').className = 'tm-nxt';

      genQ();
      renderContent();
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
      document.getElementById(uid + '_restart').addEventListener('click', showModeScreen);
    }

    if (typeof Vex !== 'undefined') {
      showModeScreen();
    } else {
      window.addEventListener('vexflow-ready', showModeScreen, { once: true });
    }
  }

  window.tmIvEngine = tmIvEngine;
})();
