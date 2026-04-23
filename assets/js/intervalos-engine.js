/* Motor de ejercicios de intervalos — v3 con dificultades por alteraciones */
(function () {
  'use strict';

  var DEFS = {
    "1j":[0,0,"1","Justa"], "2d":[1,0,"2","Dis"],  "2m":[1,1,"2","menor"],
    "2M":[1,2,"2","Mayor"], "3d":[2,2,"3","Dis"],  "3m":[2,3,"3","menor"],
    "3M":[2,4,"3","Mayor"], "4d":[3,4,"4","Dis"],  "4j":[3,5,"4","Justa"],
    "4A":[3,6,"4","Aum"],   "5d":[4,6,"5","Dis"],  "5j":[4,7,"5","Justa"],
    "5A":[4,8,"5","Aum"],   "6m":[5,8,"6","menor"],"6M":[5,9,"6","Mayor"],
    "7m":[6,10,"7","menor"],"7M":[6,11,"7","Mayor"],"8j":[7,12,"8","Justa"],
    /* unísono aumentado (semitono cromático) */
    "1A":[0,1,"1","Aum"],
    /* dobles aumentadas */
    "2AA":[1,4,"2","DblAum"],"3AA":[2,6,"3","DblAum"],"4AA":[3,7,"4","DblAum"],
    "5AA":[4,9,"5","DblAum"],"6AA":[5,11,"6","DblAum"],
    /* dobles disminuidas */
    "3dd":[2,1,"3","DblDis"],"4dd":[3,3,"4","DblDis"],"5dd":[4,5,"5","DblDis"],
    "6dd":[5,7,"6","DblDis"],"7dd":[6,8,"7","DblDis"],
    /* intervalos compuestos (def[0] >= 8) — para el test completo */
    "9m":[8,13,"9","menor"], "9M":[8,14,"9","Mayor"],
    "10m":[9,15,"10","menor"],"10M":[9,16,"10","Mayor"],
    "11j":[10,17,"11","Justa"],
    "12j":[11,19,"12","Justa"],
    "13m":[12,20,"13","menor"],"13M":[12,21,"13","Mayor"],
    "14m":[13,22,"14","menor"],"14M":[13,23,"14","Mayor"],
    "15j":[14,24,"15","Justa"]
  };
  var NS = [0,2,4,5,7,9,11];
  var VF_NAMES = ["c","d","e","f","g","a","b"];

  /* Normaliza abreviaturas de DEFS a los textos que muestran los botones */
  var TIPO_LABEL = { "Dis":"Disminuida", "Aum":"Aumentada", "menor":"menor", "Mayor":"Mayor", "Justa":"Justa",
                     "DblAum":"Doble Aumentada", "DblDis":"Doble Disminuida" };

  var CONSONANCIA_MAP = {
    "1j":"Consonancia Perfecta","5j":"Consonancia Perfecta","8j":"Consonancia Perfecta",
    "4j":"Semiconsonancia",
    "3m":"Consonancia Imperfecta","3M":"Consonancia Imperfecta",
    "6m":"Consonancia Imperfecta","6M":"Consonancia Imperfecta",
    "2m":"Disonancia Absoluta","2M":"Disonancia Absoluta",
    "7m":"Disonancia Absoluta","7M":"Disonancia Absoluta",
    "4A":"Disonancia Condicional","5d":"Disonancia Condicional",
    "2d":"Disonancia Condicional","3d":"Disonancia Condicional",
    "4d":"Disonancia Condicional","5A":"Disonancia Condicional",
    "2AA":"Disonancia Condicional","3AA":"Disonancia Condicional",
    "4AA":"Disonancia Condicional","5AA":"Disonancia Condicional","6AA":"Disonancia Condicional",
    "3dd":"Disonancia Condicional","4dd":"Disonancia Condicional","5dd":"Disonancia Condicional",
    "6dd":"Disonancia Condicional","7dd":"Disonancia Condicional"
  };

  /*
   * Dificultades — filtran el máximo de alteraciones en la 2ª nota (|a2|):
   *   Fácil:     |a2| = 0  → solo notas naturales
   *   Medio:     |a2| ≤ 1  → hasta simples aumentados/disminuidos (# / b)
   *   Difícil:   |a2| ≤ 2  → hasta dobles aumentados/disminuidos (## / bb)
   */
  var DIFICULTADES = [
    { lbl: "F\xe1cil",     maxAlt: 0, id: 'easy'   },
    { lbl: "Medio",        maxAlt: 1, id: 'medium' },
    { lbl: "Dif\xedcil",  maxAlt: 2, id: 'hard'   }
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
    '@media(max-width:500px){.tm-iv-wrap .tm-iv-modes{flex-direction:column;align-items:center;}.tm-iv-wrap .tm-iv-mode-btn{width:100%;max-width:220px;}}',
    '.tm-iv-wrap .tm-cs-wrap{background:#fff;border:1px solid #e8e0cc;border-radius:8px;margin:8px 0;-webkit-user-select:none;user-select:none;overflow:hidden;}',
    '.tm-iv-wrap .tm-cs-row{position:relative;height:32px;display:flex;align-items:center;padding:0 8px;cursor:pointer;box-sizing:border-box;touch-action:manipulation;}',
    '.tm-iv-wrap .tm-cs-row:active{background:#fdfcf9;}',
    '.tm-iv-wrap .tm-cs-row.tm-cs-sel{background:#fdf8ee;}',
    '.tm-iv-wrap .tm-cs-row.is-line::after{content:"";position:absolute;left:0;right:0;top:50%;height:1.5px;background:#444;pointer-events:none;}',
    '.tm-iv-wrap .tm-cs-row.is-ledger::after{content:"";position:absolute;left:22%;right:22%;top:50%;height:1.5px;background:#444;pointer-events:none;}',
    '.tm-iv-wrap .tm-cs-dot{width:14px;height:14px;border-radius:50%;flex-shrink:0;background:transparent;margin-right:6px;position:relative;z-index:2;}',
    '.tm-iv-wrap .tm-cs-row.tm-cs-sel .tm-cs-dot{background:#8b6914;}',
    '.tm-iv-wrap .tm-cs-row.tm-ok .tm-cs-dot{background:#27ae60;}',
    '.tm-iv-wrap .tm-cs-row.tm-ko .tm-cs-dot{background:#c0392b;}',
    '.tm-iv-wrap .tm-cs-lbl{font-size:.7rem;font-weight:700;color:#aaa;position:relative;z-index:2;background:#fff;padding:0 3px;border-radius:2px;margin-left:auto;}',
    '.tm-iv-wrap .tm-cs-row.tm-cs-sel .tm-cs-lbl{color:#8b6914;background:#fdf8ee;}',
    '.tm-iv-wrap .tm-cs-row.tm-ok{background:#e8f5e9!important;}.tm-iv-wrap .tm-cs-row.tm-ok .tm-cs-lbl{color:#2e7d32;background:#e8f5e9;}',
    '.tm-iv-wrap .tm-cs-row.tm-ko{background:#ffebee!important;}.tm-iv-wrap .tm-cs-row.tm-ko .tm-cs-lbl{color:#c62828;background:#ffebee;}',
    '.tm-iv-wrap .tm-cs-acc{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0;justify-content:center;}',
    '.tm-iv-wrap .tm-cs-acc-btn{font-size:1.1rem;font-weight:700;padding:9px 14px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;cursor:pointer;min-width:44px;min-height:44px;touch-action:manipulation;font-family:inherit;}',
    '.tm-iv-wrap .tm-cs-acc-btn.tm-sel{background:#8b6914!important;color:#fff!important;border-color:#8b6914!important;}',
    '.tm-iv-wrap .tm-cs-acc-btn.tm-ok{background:#27ae60!important;color:#fff!important;border-color:#27ae60!important;}',
    '.tm-iv-wrap .tm-cs-acc-btn.tm-ko{background:#c0392b!important;color:#fff!important;border-color:#c0392b!important;}',
    '.tm-iv-wrap .tm-construir-dir{font-size:.88rem;color:#555;text-align:center;margin:4px 0 8px;padding:5px 10px;background:#f5f2ea;border-radius:6px;font-weight:600;}',
    '.tm-iv-wrap .tm-construir-hint{font-size:.78rem;color:#999;text-align:center;margin:0 0 4px;font-style:italic;}',
    '.tm-iv-wrap .tm-staff[data-construir]{cursor:crosshair;}'
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
    var currentQ, score, cQ, sel, answered, maxAlt, currentDiff;

    var TITULOS = {
      'grupo':      'Intervalos de ' + (config.val || '') + '\xaa',
      'completo':   'An\xe1lisis completo de intervalos',
      'numero':     'N\xfamero del intervalo',
      'consonancia':'Consonancia y disonancia',
      'arm_mel':    'Arm\xf3nicos y mel\xf3dicos',
      'asc_des':    'Ascendentes y descendentes',
      'con_dis':    'Conjuntos y disjuntos',
      'construir':  config.val ? 'Construir ' + ({'2':'Segundas','3':'Terceras','4':'Cuartas','5':'Quintas','6':'Sextas','7':'S\xe9ptimas','8':'Octavas'}[config.val] || config.val + '\xaa') : 'Construir intervalos'
    };

    var ICONOS_DIFICULTAD = ['\u2600\ufe0f', '\u26a1', '\ud83d\udd25'];
    var DESCS_DIFICULTAD = [
      'Solo notas naturales',
      'Con sostenidos y bemoles',
      'Con dobles alteraciones'
    ];

    var NOTE_NAMES_ES = ['Do','Re','Mi','Fa','Sol','La','Si'];
    var ACC_DISPLAY = {'-2':'bb','-1':'♭','0':'','1':'♯','2':'×'};
    function noteLabel(n, a) { return NOTE_NAMES_ES[n] + (ACC_DISPLAY[String(a)] || ''); }

    /* Posiciones del pentagrama de Do4 (grave) a Sol5 (agudo) */
    var CS_ROWS = [
      {vfn:'b',n:6,oct:5,lbl:'Si⁵', ln:false,ldg:true},
      {vfn:'a',n:5,oct:5,lbl:'La⁵', ln:true, ldg:true},
      {vfn:'g',n:4,oct:5,lbl:'Sol⁵',ln:false,ldg:false},
      {vfn:'f',n:3,oct:5,lbl:'Fa⁵', ln:true, ldg:false},
      {vfn:'e',n:2,oct:5,lbl:'Mi⁵', ln:false,ldg:false},
      {vfn:'d',n:1,oct:5,lbl:'Re⁵', ln:true, ldg:false},
      {vfn:'c',n:0,oct:5,lbl:'Do⁵', ln:false,ldg:false},
      {vfn:'b',n:6,oct:4,lbl:'Si⁴', ln:true, ldg:false},
      {vfn:'a',n:5,oct:4,lbl:'La⁴', ln:false,ldg:false},
      {vfn:'g',n:4,oct:4,lbl:'Sol⁴',ln:true, ldg:false},
      {vfn:'f',n:3,oct:4,lbl:'Fa⁴', ln:false,ldg:false},
      {vfn:'e',n:2,oct:4,lbl:'Mi⁴', ln:true, ldg:false},
      {vfn:'d',n:1,oct:4,lbl:'Re⁴', ln:false,ldg:false},
      {vfn:'c',n:0,oct:4,lbl:'Do⁴', ln:false,ldg:true},
      {vfn:'b',n:6,oct:3,lbl:'Si³', ln:false,ldg:false},
      {vfn:'a',n:5,oct:3,lbl:'La³', ln:true, ldg:true}
    ];

    function keysForDiff() {
      var k = Object.keys(DEFS);
      if (config.test === 'grupo') k = k.filter(function(x){ return DEFS[x][2] === config.val; });
      /* completo: excluir unísonos (1ª) — no aparecen en las opciones de número */
      if (config.test === 'completo') {
        k = k.filter(function(x){ return DEFS[x][0] > 0; });
        /* en fácil solo intervalos simples (hasta 8ª) */
        if (currentDiff === 'easy') k = k.filter(function(x){ return DEFS[x][0] < 8; });
      }
      /* consonancia/construir: solo intervalos simples (hasta 8ª) */
      if (config.test === 'consonancia' || config.test === 'construir') {
        k = k.filter(function(x){ return DEFS[x][0] <= 7; });
      }
      /* construir: sin unísonos; filtro por número si config.val */
      if (config.test === 'construir') {
        k = k.filter(function(x){ return DEFS[x][0] > 0; });
        if (config.val) k = k.filter(function(x){ return DEFS[x][2] === config.val; });
      }
      if (currentDiff === 'easy') {
        k = k.filter(function(x){ var t = DEFS[x][3]; return t==='Mayor'||t==='menor'||t==='Justa'; });
      } else if (currentDiff === 'medium') {
        k = k.filter(function(x){ var t = DEFS[x][3]; return t!=='DblAum'&&t!=='DblDis'; });
      }
      return k;
    }

    var SEMITIPO_LABEL = {
      'unisono':     'Un\xedsono',
      'diaton':      'Semitono diat\xf3nico',
      'cromatico':   'Semitono crom\xe1tico',
      'enarmonicas': 'Enarm\xf3nicas'
    };

    /* Genera pregunta con tipo válido para la dificultad y |a2| <= maxAlt. */
    function genQ() {
      /* Semitono: 4 categorías a partes iguales */
      if (config.test === 'semitono') {
        var tipos = ['unisono','diaton','cromatico','enarmonicas'];
        var tipo  = tipos[Math.floor(Math.random() * tipos.length)];
        var n1s, n2s, a2s, ks, defs, nds;
        if (tipo === 'unisono') {
          ks = '1j'; defs = DEFS['1j'];
          n1s = Math.floor(Math.random() * 7); n2s = n1s;
          /* Ambas notas pueden estar alteradas (do#-do#, reb-reb…) */
          var altOpts = [-1, 0, 0, 1]; /* natural más probable */
          a2s = altOpts[Math.floor(Math.random() * altOpts.length)];
        } else if (tipo === 'diaton') {
          ks = '2m'; defs = DEFS['2m'];
          n1s = Math.floor(Math.random() * 7);
          n2s = (n1s + 1) % 7;
          nds = NS[n2s] - NS[n1s]; if (nds < 0) nds += 12;
          a2s = 1 - nds;
        } else if (tipo === 'cromatico') {
          ks = '1A'; defs = DEFS['1A'];
          n1s = Math.floor(Math.random() * 7); n2s = n1s; a2s = 1;
        } else {
          /* Enarmónicas: E-Fb o B-Cb (2ª disminuida, a2=-1) */
          ks = '2d'; defs = DEFS['2d'];
          n1s = [2, 6][Math.floor(Math.random() * 2)];
          n2s = (n1s + 1) % 7;
          nds = NS[n2s] - NS[n1s]; if (nds < 0) nds += 12;
          a2s = 0 - nds;
        }
        /* a1: alteración en nota1 (solo unísono la usa) */
        var a1s = (tipo === 'unisono') ? a2s : 0;
        cQ = { k: ks, def: defs, n1: n1s, n2: n2s, a1: a1s, a2: a2s, semitipo: tipo,
               harmonic: true, ascending: true, conjunto: false };
        return;
      }
      var keys = keysForDiff();
      /* Con/dis: balancear 50/50 conjunto (2ª) vs disjunto (>2ª) */
      if (config.test === 'con_dis') {
        var wantConj = Math.random() < 0.5;
        var sub = keys.filter(function(x){ return wantConj ? DEFS[x][0] === 1 : DEFS[x][0] > 1; });
        if (sub.length) keys = sub;
      }
      /* completo: balancear 50/50 simple vs compuesto */
      if (config.test === 'completo') {
        var wantComp = Math.random() < 0.5;
        var sub2 = keys.filter(function(x){ return wantComp ? DEFS[x][0] >= 8 : DEFS[x][0] < 8; });
        if (sub2.length) keys = sub2;
      }
      var construirAsc = config.test === 'construir' ? Math.random() < 0.5 : true;
      var attempts = 0, k, def, n1, n2, nd, a2;
      do {
        k   = keys[Math.floor(Math.random() * keys.length)];
        def = DEFS[k];
        n1  = Math.floor(Math.random() * 7);
        if (config.test === 'construir' && !construirAsc) {
          /* Descendente: n2 < n1 → oct4; n2 >= n1 → oct3 */
          n2 = (n1 - def[0] + 70) % 7;
          a2 = (n2 < n1) ? NS[n1] - NS[n2] - def[1]
                         : NS[n1] - NS[n2] + 12 - def[1];
        } else if (config.test === 'construir') {
          /* Construir ascendente: corrige 8ª (def[0]=7 → n2==n1, nd=0, a2 debe ser 0) */
          n2  = (n1 + def[0]) % 7;
          nd  = NS[n2] - NS[n1]; if (nd < 0) nd += 12;
          a2  = def[0] >= 7 ? (def[1] - 12) - nd : def[1] - nd;
        } else {
          n2  = (n1 + def[0]) % 7;
          nd  = NS[n2] - NS[n1]; if (nd < 0) nd += 12;
          a2  = def[0] >= 8 ? (def[1] - 12) - nd : def[1] - nd;
        }
        attempts++;
      } while (Math.abs(a2) > maxAlt && attempts < 100);
      cQ = { k: k, def: def, n1: n1, n2: n2, a2: a2,
             harmonic:   (config.test === 'arm_mel' || config.test === 'completo') ? Math.random() < 0.5 : true,
             ascending:  (config.test === 'asc_des' || config.test === 'completo') ? Math.random() < 0.5 : (config.test === 'construir' ? construirAsc : true),
             conjunto:   config.test === 'con_dis'  ? def[0] === 1         : false };
      if (config.test === 'construir') {
        if (cQ.ascending) {
          /* n2 < n1 → sube a oct5; 8ª (def[0]=7, n2==n1) → también oct5 */
          cQ.oct2 = (cQ.n2 < cQ.n1 || cQ.def[0] === 7) ? 5 : 4;
        } else {
          /* n2 >= n1 (incluye 8ª descendente) → baja a oct3; n2 < n1 → oct4 */
          cQ.oct2 = (cQ.n2 >= cQ.n1) ? 3 : 4;
        }
      }
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

    function drawConstruirPreview(vfn, oct, acc) {
      var elNot = document.getElementById(uid + '_not');
      elNot.innerHTML = '';
      var V = Vex.Flow;
      var r = new V.Renderer(elNot, V.Renderer.Backends.SVG);
      r.resize(300, 160);
      var ctx = r.getContext();
      var stave = new V.Stave(10, 20, 280);
      stave.addClef('treble').setContext(ctx).draw();
      var key1 = VF_NAMES[cQ.n1] + '/4';
      var key2 = vfn + '/' + oct;
      var acc2str = accidental(acc);
      var sn1 = new V.StaveNote({ keys: [key1], duration: 'w' });
      var sn2 = new V.StaveNote({ keys: [key2], duration: 'w' });
      if (acc2str) sn2.addModifier(new V.Accidental(acc2str), 0);
      var notes = [sn1, sn2];
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables(notes);
      new V.Formatter().joinVoices([voice]).format([voice], 180);
      voice.draw(ctx, stave);
      var svg = elNot.querySelector('svg');
      if (svg) svg.style.cursor = 'crosshair';
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
          var d    = DIFICULTADES[parseInt(btn.dataset.i, 10)];
          maxAlt      = d.maxAlt;
          currentDiff = d.id;
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

      if (config.test === 'construir') {
        var elNotDiv = document.getElementById(uid + '_not');
        elNotDiv.style.cursor = 'crosshair';
        var onConstruirStaffInteract = function(e) {
          if (answered) return;
          var rect = elNotDiv.getBoundingClientRect();
          var clientY = (e.changedTouches || e.touches)
            ? (e.changedTouches || e.touches)[0].clientY
            : e.clientY;
          var clickY = clientY - rect.top;
          /* staveY=20 → top line (F5) at px=60; cada paso = 5px
             noteStep -3=Si5, -2=La5, -1=Sol5, 0=Fa5, …, 12=La3 */
          var noteStep = Math.round((clickY - 60) / 5);
          noteStep = Math.max(-3, Math.min(12, noteStep));
          var rd = CS_ROWS[noteStep + 3];
          sel.construirNote = rd;
          sel.ans = rd.n + '_' + rd.oct + '_' + sel.acc;
          drawConstruirPreview(rd.vfn, rd.oct, sel.acc);
          document.getElementById(uid + '_btn').classList.add('tm-ready');
          var hintEl = document.getElementById(uid + '_content').querySelector('.tm-construir-hint');
          if (hintEl) hintEl.textContent = 'Pulsa de nuevo para cambiar la nota';
        };
        elNotDiv.addEventListener('click', onConstruirStaffInteract);
        elNotDiv.addEventListener('touchend', function(e) {
          e.preventDefault();
          onConstruirStaffInteract(e);
        }, {passive: false});
      }

      nextQ();
    }

    function renderContent() {
      var elCont = document.getElementById(uid + '_content');
      var h = '';
      if (config.test === 'completo') {
        var numOpts = currentDiff === 'easy'
          ? ['2','3','4','5','6','7','8']
          : ['2','3','4','5','6','7','8','9','10','11','12','13','14','15'];
        h += '<div><div class="tm-grid">' +
          numOpts.map(function(n){
            return '<button class="tm-opt" data-g="num" data-v="' + n + '">' + n + '\xaa</button>';
          }).join('') + '</div></div>';
        var tiposCompleto = currentDiff === 'hard'
          ? ['Doble Disminuida','Disminuida','menor','Justa','Mayor','Aumentada','Doble Aumentada']
          : ['Disminuida','menor','Justa','Mayor','Aumentada'];
        h += '<div style="margin-top:10px"><div class="tm-grid">' +
          tiposCompleto.map(function(t){
            return '<button class="tm-opt" data-g="tipo" data-v="' + t + '">' + t + '</button>';
          }).join('') + '</div></div>';
        h += '<div style="margin-top:10px"><div class="tm-grid">' +
          ['Simple','Compuesto'].map(function(t){
            return '<button class="tm-opt" data-g="simcomp" data-v="' + t + '">' + t + '</button>';
          }).join('') + '</div></div>';
        h += '<div style="margin-top:10px"><div class="tm-grid">' +
          ['Conjunto','Disjunto'].map(function(t){
            return '<button class="tm-opt" data-g="conjdis" data-v="' + t + '">' + t + '</button>';
          }).join('') + '</div></div>';
        h += '<div style="margin-top:10px"><div class="tm-grid">' +
          ['Arm\xf3nico','Mel\xf3dico'].map(function(t){
            return '<button class="tm-opt" data-g="arm_mel" data-v="' + t + '">' + t + '</button>';
          }).join('') + '</div></div>';
        h += '<div id="' + uid + '_asdrow" style="margin-top:10px;display:none"><div class="tm-grid">' +
          ['Ascendente','Descendente'].map(function(t){
            return '<button class="tm-opt" data-g="asc_des" data-v="' + t + '">' + t + '</button>';
          }).join('') + '</div></div>';
      } else if (config.test === 'consonancia') {
        h += '<div class="tm-grid">' +
          ['Consonancia Perfecta','Consonancia Imperfecta','Semiconsonancia','Disonancia Absoluta','Disonancia Condicional'].map(function(t){
            return '<button class="tm-opt" data-g="ans" data-v="' + t + '">' + t + '</button>';
          }).join('') + '</div>';
      } else if (config.test === 'arm_mel') {
        h += '<div class="tm-grid">' +
          ['Arm\xf3nico','Mel\xf3dico'].map(function(t){
            return '<button class="tm-opt" data-g="ans" data-v="' + t + '">' + t + '</button>';
          }).join('') + '</div>';
      } else if (config.test === 'asc_des') {
        h += '<div class="tm-grid">' +
          ['Ascendente','Descendente'].map(function(t){
            return '<button class="tm-opt" data-g="ans" data-v="' + t + '">' + t + '</button>';
          }).join('') + '</div>';
      } else if (config.test === 'semitono') {
        h += '<div class="tm-grid">' +
          ['Un\xedsono','Semitono diat\xf3nico','Semitono crom\xe1tico','Enarm\xf3nicas'].map(function(t){
            return '<button class="tm-opt" data-g="ans" data-v="' + t + '">' + t + '</button>';
          }).join('') + '</div>';
      } else if (config.test === 'con_dis') {
        h += '<div class="tm-grid">' +
          ['Conjunto','Disjunto'].map(function(t){
            return '<button class="tm-opt" data-g="ans" data-v="' + t + '">' + t + '</button>';
          }).join('') + '</div>';
      } else if (config.test === 'numero') {
        h += '<div class="tm-grid">' +
          ['1','2','3','4','5','6','7','8'].map(function(n){
            return '<button class="tm-opt" data-g="ans" data-v="' + n + '">' + n + '\xaa</button>';
          }).join('') + '</div>';
      } else if (config.test === 'construir') {
        var intLbl = cQ.def[2] + '\xaa ' + tipoLabel(cQ.def[3]);
        var dirTxt = cQ.ascending ? '↑' : '↓';
        h += '<div class="tm-construir-dir">' + noteLabel(cQ.n1, 0) + ' &mdash; <strong>' + intLbl + '</strong> &mdash; ' + dirTxt + '</div>';
        h += '<p class="tm-construir-hint">Pulsa en el pentagrama para colocar la segunda nota</p>';
        var accOpts;
        if (maxAlt >= 2) {
          accOpts = [{v:-2,t:'bb'},{v:-1,t:'♭'},{v:0,t:'♮'},{v:1,t:'♯'},{v:2,t:'×'}];
        } else if (maxAlt >= 1) {
          accOpts = [{v:-1,t:'♭'},{v:0,t:'♮'},{v:1,t:'♯'}];
        } else {
          accOpts = [{v:0,t:'♮'}];
        }
        h += '<div class="tm-cs-acc" id="' + uid + '_acc"' + (maxAlt === 0 ? ' style="display:none"' : '') + '>';
        accOpts.forEach(function(o) {
          h += '<button class="tm-cs-acc-btn' + (o.v === 0 ? ' tm-sel' : '') + '" data-acc="' + o.v + '">' + o.t + '</button>';
        });
        h += '</div>';
      } else {
        var PERFECTAS = ['1','4','5','8'];
        var esPerfecta = PERFECTAS.indexOf(config.val) !== -1;
        if (currentDiff === 'hard') {
          var tiposGrupo = esPerfecta
            ? ['Doble Disminuida','Disminuida','Justa','Aumentada','Doble Aumentada']
            : ['Doble Disminuida','Disminuida','menor','Mayor','Aumentada','Doble Aumentada'];
        } else {
          var tiposGrupo = esPerfecta
            ? ['Disminuida','Justa','Aumentada']
            : ['Disminuida','menor','Mayor','Aumentada'];
        }
        h += '<div class="tm-grid">' +
          tiposGrupo.map(function(t){
            return '<button class="tm-opt" data-g="ans" data-v="' + t + '">' + t + '</button>';
          }).join('') + '</div>';
      }
      elCont.innerHTML = h;
      sel = {};
      document.getElementById(uid + '_btn').classList.remove('tm-ready');

      if (config.test === 'construir') {
        sel.acc = 0;
        sel.construirNote = null;
        var accBtns = elCont.querySelectorAll('.tm-cs-acc-btn');
        accBtns.forEach(function(btn) {
          btn.addEventListener('click', function() {
            if (answered) return;
            accBtns.forEach(function(b){ b.classList.remove('tm-sel'); });
            btn.classList.add('tm-sel');
            sel.acc = parseInt(btn.dataset.acc, 10);
            if (sel.construirNote) {
              sel.ans = sel.construirNote.n + '_' + sel.construirNote.oct + '_' + sel.acc;
              drawConstruirPreview(sel.construirNote.vfn, sel.construirNote.oct, sel.acc);
            }
          });
        });
      } else {
        elCont.querySelectorAll('.tm-opt').forEach(function(btn) {
          btn.addEventListener('click', function() { selOpt(btn.dataset.g, btn.dataset.v, btn); });
        });
      }
    }

    function selOpt(g, v, btn) {
      if (answered) return;
      var elCont = document.getElementById(uid + '_content');
      elCont.querySelectorAll('.tm-opt[data-g="' + g + '"]').forEach(function(x){ x.classList.remove('tm-sel'); });
      btn.classList.add('tm-sel');
      sel[g] = v;
      /* completo: mostrar/ocultar fila asc/des según arm_mel */
      if (config.test === 'completo' && g === 'arm_mel') {
        var row = document.getElementById(uid + '_asdrow');
        if (v === 'Mel\xf3dico') {
          row.style.display = '';
        } else {
          row.style.display = 'none';
          /* limpiar selección previa de asc_des */
          elCont.querySelectorAll('.tm-opt[data-g="asc_des"]').forEach(function(x){ x.classList.remove('tm-sel'); });
          delete sel.asc_des;
        }
      }
      var ready;
      if (config.test === 'completo') {
        var baseOk = !!(sel.num && sel.tipo && sel.simcomp && sel.conjdis && sel.arm_mel);
        var asdOk  = sel.arm_mel === 'Arm\xf3nico' || !!sel.asc_des;
        ready = baseOk && asdOk;
      } else {
        ready = !!sel.ans;
      }
      if (ready) document.getElementById(uid + '_btn').classList.add('tm-ready');
    }

    function drawStaff() {
      var elNot = document.getElementById(uid + '_not');
      elNot.innerHTML = '';
      var V = Vex.Flow;
      var r = new V.Renderer(elNot, V.Renderer.Backends.SVG);
      var staveH = config.test === 'construir' ? 160 : 130;
      var staveY = config.test === 'construir' ? 20 : 10;
      r.resize(300, staveH);
      var ctx = r.getContext();
      var stave = new V.Stave(10, staveY, 280);
      stave.addClef('treble').setContext(ctx).draw();
      var key1 = VF_NAMES[cQ.n1] + '/4';
      /* compuesto: oct 6 si n2<=n1 (wrap, ej. 15ª), oct 5 si n2>n1; simple: 5 si n2<n1, 4 si no */
      var oct2 = (cQ.def[0] >= 8) ? (cQ.n2 <= cQ.n1 ? 6 : 5) : (cQ.n2 < cQ.n1 ? 5 : 4);
      var key2 = VF_NAMES[cQ.n2] + '/' + oct2;
      var acc = accidental(cQ.a2);
      var voice;
      if (config.test === 'arm_mel' && cQ.harmonic) {
        /* Armónico: acorde — ambas notas en el mismo StaveNote */
        var chord = new V.StaveNote({ keys: [key1, key2], duration: 'w' });
        if (acc) chord.addModifier(new V.Accidental(acc), 1);
        voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([chord]);
      } else if (config.test === 'arm_mel' && !cQ.harmonic) {
        /* Melódico: dos redondas consecutivas */
        var sn1 = new V.StaveNote({ keys: [key1], duration: 'w' });
        var sn2 = new V.StaveNote({ keys: [key2], duration: 'w' });
        if (acc) sn2.addModifier(new V.Accidental(acc), 0);
        voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([sn1, sn2]);
      } else if (config.test === 'asc_des' || (config.test === 'completo' && !cQ.harmonic)) {
        /* Melódico: Ascendente key1→key2 | Descendente key2→key1 */
        var first, second;
        if (cQ.ascending) {
          first  = new V.StaveNote({ keys: [key1], duration: 'w' });
          second = new V.StaveNote({ keys: [key2], duration: 'w' });
          if (acc) second.addModifier(new V.Accidental(acc), 0);
        } else {
          first  = new V.StaveNote({ keys: [key2], duration: 'w' });
          second = new V.StaveNote({ keys: [key1], duration: 'w' });
          if (acc) first.addModifier(new V.Accidental(acc), 0);
        }
        voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([first, second]);
      } else if (config.test === 'completo' && cQ.harmonic) {
        /* Armónico en completo: acorde */
        var chord = new V.StaveNote({ keys: [key1, key2], duration: 'w' });
        if (acc) chord.addModifier(new V.Accidental(acc), 1);
        voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([chord]);
      } else if (config.test === 'consonancia') {
        /* Consonancia: siempre armónico — acorde */
        var chord = new V.StaveNote({ keys: [key1, key2], duration: 'w' });
        if (acc) chord.addModifier(new V.Accidental(acc), 1);
        voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([chord]);
      } else if (config.test === 'construir') {
        /* Construir: solo nota raíz */
        var sn1c = new V.StaveNote({ keys: [key1], duration: 'w' });
        voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([sn1c]);
      } else {
        /* Resto de tests: dos redondas lado a lado */
        var sn1 = new V.StaveNote({ keys: [key1], duration: 'w' });
        var sn2 = new V.StaveNote({ keys: [key2], duration: 'w' });
        var acc1 = cQ.a1 ? accidental(cQ.a1) : null;
        if (acc1) sn1.addModifier(new V.Accidental(acc1), 0);
        if (acc)  sn2.addModifier(new V.Accidental(acc), 0);
        voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([sn1, sn2]);
      }
      new V.Formatter().joinVoices([voice]).format([voice], 180);
      voice.draw(ctx, stave);
    }

    function correctTipo() {
      return tipoLabel(cQ.def[3]);
    }

    function isCorrect() {
      if (config.test === 'completo') {
        var numOk     = sel.num     === cQ.def[2];
        var tipoOk    = sel.tipo    === correctTipo();
        var simcompOk = sel.simcomp === (cQ.def[0] >= 8 ? 'Compuesto' : 'Simple');
        var conjdisOk = sel.conjdis === (cQ.def[0] === 1 ? 'Conjunto' : 'Disjunto');
        var armMelOk  = sel.arm_mel === (cQ.harmonic ? 'Arm\xf3nico' : 'Mel\xf3dico');
        var ascDesOk  = cQ.harmonic || sel.asc_des === (cQ.ascending ? 'Ascendente' : 'Descendente');
        return numOk && tipoOk && simcompOk && conjdisOk && armMelOk && ascDesOk;
      }
      if (config.test === 'numero')      return sel.ans === cQ.def[2];
      if (config.test === 'consonancia') return sel.ans === (CONSONANCIA_MAP[cQ.k] || '');
      if (config.test === 'arm_mel')     return sel.ans === (cQ.harmonic  ? 'Arm\xf3nico'   : 'Mel\xf3dico');
      if (config.test === 'asc_des')     return sel.ans === (cQ.ascending ? 'Ascendente'    : 'Descendente');
      if (config.test === 'semitono')    return sel.ans === (SEMITIPO_LABEL[cQ.semitipo] || '');
      if (config.test === 'con_dis')     return sel.ans === (cQ.conjunto  ? 'Conjunto'      : 'Disjunto');
      if (config.test === 'construir')   return sel.ans === (cQ.n2 + '_' + cQ.oct2 + '_' + cQ.a2);
      return sel.ans === correctTipo();
    }

    function correctLabel() {
      if (config.test === 'completo') {
        var lbl = cQ.def[2] + '\xaa ' + correctTipo();
        lbl += ' — ' + (cQ.def[0] >= 8 ? 'Compuesto' : 'Simple');
        lbl += ' — ' + (cQ.def[0] === 1 ? 'Conjunto' : 'Disjunto');
        lbl += ' — ' + (cQ.harmonic ? 'Arm\xf3nico' : 'Mel\xf3dico');
        if (!cQ.harmonic) lbl += ' — ' + (cQ.ascending ? 'Ascendente' : 'Descendente');
        return lbl;
      }
      if (config.test === 'numero')      return cQ.def[2] + '\xaa';
      if (config.test === 'consonancia') return CONSONANCIA_MAP[cQ.k] || '\u2014';
      if (config.test === 'arm_mel')     return cQ.harmonic  ? 'Arm\xf3nico'  : 'Mel\xf3dico';
      if (config.test === 'asc_des')     return cQ.ascending ? 'Ascendente'   : 'Descendente';
      if (config.test === 'semitono')    return SEMITIPO_LABEL[cQ.semitipo] || '\u2014';
      if (config.test === 'con_dis')     return cQ.conjunto  ? 'Conjunto'     : 'Disjunto';
      if (config.test === 'construir')   return noteLabel(cQ.n2, cQ.a2);
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

      var elCnt = document.getElementById(uid + '_content');
      if (config.test === 'construir') {
        elCnt.querySelectorAll('.tm-cs-acc-btn').forEach(function(b){
          b.disabled = true;
          if (parseInt(b.dataset.acc, 10) === cQ.a2) b.classList.add('tm-ok');
          else if (b.classList.contains('tm-sel') && !correct) b.classList.add('tm-ko');
        });
        /* Siempre mostrar la respuesta correcta en el pentagrama */
        drawConstruirPreview(VF_NAMES[cQ.n2], cQ.oct2, cQ.a2);
      } else {
        elCnt.querySelectorAll('.tm-opt').forEach(function(b) {
          b.disabled = true;
          var isCorrectOpt = false;
          if (config.test === 'completo') {
            isCorrectOpt = (b.dataset.g === 'num'     && b.dataset.v === cQ.def[2]) ||
                           (b.dataset.g === 'tipo'    && b.dataset.v === correctTipo()) ||
                           (b.dataset.g === 'simcomp' && b.dataset.v === (cQ.def[0] >= 8 ? 'Compuesto' : 'Simple')) ||
                           (b.dataset.g === 'conjdis' && b.dataset.v === (cQ.def[0] === 1 ? 'Conjunto' : 'Disjunto')) ||
                           (b.dataset.g === 'arm_mel' && b.dataset.v === (cQ.harmonic ? 'Arm\xf3nico' : 'Mel\xf3dico')) ||
                           (!cQ.harmonic && b.dataset.g === 'asc_des' && b.dataset.v === (cQ.ascending ? 'Ascendente' : 'Descendente'));
          } else if (config.test === 'numero') {
            isCorrectOpt = b.dataset.v === cQ.def[2];
          } else if (config.test === 'consonancia') {
            isCorrectOpt = b.dataset.v === (CONSONANCIA_MAP[cQ.k] || '');
          } else if (config.test === 'arm_mel') {
            isCorrectOpt = b.dataset.v === (cQ.harmonic ? 'Arm\xf3nico' : 'Mel\xf3dico');
          } else if (config.test === 'asc_des') {
            isCorrectOpt = b.dataset.v === (cQ.ascending ? 'Ascendente' : 'Descendente');
          } else if (config.test === 'con_dis') {
            isCorrectOpt = b.dataset.v === (cQ.conjunto ? 'Conjunto' : 'Disjunto');
          } else if (config.test === 'semitono') {
            isCorrectOpt = b.dataset.v === (SEMITIPO_LABEL[cQ.semitipo] || '');
          } else {
            isCorrectOpt = b.dataset.v === correctTipo();
          }
          if (isCorrectOpt) b.classList.add('tm-ok');
          else if (b.classList.contains('tm-sel')) b.classList.add('tm-ko');
        });
      }
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
      document.getElementById(uid + '_restart').addEventListener('click', function() {
        if (config.test === 'arm_mel' || config.test === 'asc_des' || config.test === 'con_dis' || config.test === 'semitono') { currentQ = 0; score = 0; startQuiz(); }
        else showModeScreen();
      });
    }

    function init() {
      if (config.test === 'arm_mel' || config.test === 'asc_des' || config.test === 'con_dis' || config.test === 'semitono') {
        maxAlt = 1; currentDiff = 'medium';
        currentQ = 0; score = 0;
        startQuiz();
      } else {
        showModeScreen();
      }
    }

    if (typeof Vex !== 'undefined') {
      init();
    } else {
      window.addEventListener('vexflow-ready', init, { once: true });
    }
  }

  window.tmIvEngine = tmIvEngine;
})();
