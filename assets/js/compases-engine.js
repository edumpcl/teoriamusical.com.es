/* Motor de análisis de compases — v2 */
(function () {
  'use strict';

  var CSS = [
    '.tm-cp-wrap{font-family:"Inter",system-ui,-apple-system,sans-serif;color:#333;}',
    '.tm-cp-card{background:#fff;border:1px solid #e8e0cc;border-radius:12px;padding:22px;margin:8px 0;box-shadow:0 2px 8px rgba(0,0,0,.05);}',
    '.tm-cp-mode-title{font-size:1.25rem;font-weight:700;color:#1a1208;margin-bottom:6px;}',
    '.tm-cp-mode-sub{color:#514232;font-size:.9rem;margin-bottom:18px;line-height:1.5;}',
    '.tm-cp-mode-btns{display:flex;flex-direction:column;gap:10px;}',
    '.tm-cp-mode-btn{background:#faf7f2;border:2px solid #d8d0b8;border-radius:10px;padding:14px 18px;cursor:pointer;text-align:left;transition:all .15s;}',
    '.tm-cp-mode-btn:hover{border-color:#8b6914;background:#fff8ee;}',
    '.tm-cp-mode-btn strong{display:block;font-size:1rem;color:#1a1208;margin-bottom:3px;}',
    '.tm-cp-mode-btn span{font-size:.82rem;color:#8b6914;}',
    '.tm-cp-prog-label{font-size:.8rem;color:#8b6914;font-weight:600;margin-bottom:5px;}',
    '.tm-cp-prog-bar{background:#e4e9f2;border-radius:3px;height:6px;margin-bottom:18px;}',
    '.tm-cp-prog-fill{background:#8b6914;height:100%;border-radius:3px;transition:width .4s ease;}',
    '.tm-cp-sig-wrap{text-align:center;margin:10px 0 18px;}',
    '.tm-cp-sig{display:inline-block;font-family:"Times New Roman","Georgia",serif;font-size:80px;font-weight:900;line-height:.85;color:#1a1208;letter-spacing:-2px;}',
    '.tm-cp-sig-n,.tm-cp-sig-d{display:block;}',
    '.tm-cp-section{margin:12px 0;padding:14px;background:#faf7f2;border:1px solid #e8e0cc;border-radius:8px;transition:border-color .2s,background .2s;}',
    '.tm-cp-section.tm-sec-ok{border-color:#27ae60;background:#f0faf2;}',
    '.tm-cp-section.tm-sec-ko{border-color:#c0392b;background:#fff5f5;}',
    '.tm-cp-qlabel{font-size:.78rem;font-weight:700;color:#8b6914;margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;}',
    '.tm-cp-pills{display:flex;gap:10px;flex-wrap:wrap;}',
    '.tm-cp-pill{border:2px solid #d8d0b8;background:#fff;border-radius:8px;padding:10px 18px;cursor:pointer;font-weight:600;font-size:.9rem;color:#514232;transition:all .15s;user-select:none;}',
    '.tm-cp-pill:hover:not(.tm-disabled){border-color:#8b6914;}',
    '.tm-cp-pill.tm-sel{border-color:#8b6914;background:#8b6914;color:#fff;}',
    '.tm-cp-pill.tm-ok{border-color:#27ae60!important;background:#27ae60!important;color:#fff!important;}',
    '.tm-cp-pill.tm-ko{border-color:#c0392b!important;background:#c0392b!important;color:#fff!important;}',
    '.tm-cp-pill.tm-correct{border-color:#27ae60!important;background:#e8f5e9!important;color:#2e7d32!important;}',
    '.tm-cp-pill.tm-disabled{cursor:default;}',
    /* paired note grid */
    '.tm-cp-pairs{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-end;}',
    '.tm-cp-pair{display:flex;gap:3px;}',
    '.tm-cp-note{border:2px solid #d8d0b8;background:#fff;border-radius:8px;padding:6px 5px 5px;cursor:pointer;text-align:center;transition:all .15s;user-select:none;min-width:50px;}',
    '.tm-cp-note:hover:not(.tm-disabled){border-color:#8b6914;background:#fffbf2;}',
    '.tm-cp-note.tm-sel{border-color:#8b6914;background:#fff8ee;}',
    '.tm-cp-note.tm-ok{border-color:#27ae60!important;background:#e8f5e9!important;}',
    '.tm-cp-note.tm-ko{border-color:#c0392b!important;background:#ffebee!important;}',
    '.tm-cp-note.tm-correct{border-color:#27ae60!important;background:#e8f5e9!important;}',
    '.tm-cp-note.tm-disabled{cursor:default;}',
    '.tm-cp-note svg{display:block;margin:0 auto;height:62px;width:auto;}',
    '.tm-cp-note-lbl{font-size:.55rem;color:#777;margin-top:3px;line-height:1.2;white-space:nowrap;}',
    /* ligadura */
    '.tm-cp-liga-row{display:flex;align-items:center;gap:8px;margin:12px 0 0;cursor:pointer;}',
    '.tm-cp-liga-row input[type=checkbox]{width:16px;height:16px;cursor:pointer;accent-color:#8b6914;flex-shrink:0;}',
    '.tm-cp-liga-row span{font-size:.85rem;color:#514232;font-weight:600;user-select:none;}',
    '.tm-cp-grid2{margin-top:10px;padding-top:10px;border-top:1px dashed #d8d0b8;}',
    '.tm-cp-grid2-lbl{font-size:.72rem;color:#8b6914;font-weight:700;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px;}',
    /* feedback */
    '.tm-cp-fb{margin-top:14px;padding:12px 14px;border-radius:8px;font-weight:600;font-size:.9rem;display:none;}',
    '.tm-cp-fb.tm-show{display:block;}',
    '.tm-cp-fb.tm-ok{background:#e8f5e9;color:#2e7d32;}',
    '.tm-cp-fb.tm-ko{background:#ffebee;color:#c62828;}',
    /* buttons */
    '.tm-cp-submit{width:100%;padding:14px;margin-top:16px;border:none;border-radius:8px;font-size:1rem;font-weight:700;background:#d8d0b8;color:#999;cursor:not-allowed;transition:all .2s;}',
    '.tm-cp-submit.tm-ready{background:#8b6914;color:#fff;cursor:pointer;}',
    /* results */
    '.tm-cp-results{text-align:center;padding:10px 0;}',
    '.tm-cp-res-score{font-size:3.5rem;font-weight:900;color:#8b6914;line-height:1;}',
    '.tm-cp-res-total{font-size:.9rem;color:#514232;margin:4px 0 16px;}',
    '.tm-cp-res-msg{font-size:1rem;color:#1a1208;font-weight:600;margin-bottom:22px;line-height:1.5;}',
    '.tm-cp-retry{background:#8b6914;color:#fff;border:none;border-radius:8px;padding:12px 28px;font-size:1rem;font-weight:700;cursor:pointer;}',
    '@media(max-width:500px){.tm-cp-note svg{height:50px;}.tm-cp-note{min-width:42px;}}',
  ].join('');

  /* ═══ SVG NOTE SYMBOLS — Leland (MuseScore font, SMuFL) ═══
     Glyph codepoints (PUA, all SMuFL fonts share these):
       E1D2 redonda · E1D3 blanca↑ · E1D5 negra↑
       E1D7 corchea↑ · E1D9 semicorchea↑ · E1DB fusa↑ · E1DD semifusa↑
       E1E7 puntillo
     Font: Leland.woff2 (open-source, licencia SIL OFL)
  */
  (function () {
    if (!document.getElementById('tm-leland-ff')) {
      var s = document.createElement('style');
      s.id = 'tm-leland-ff';
      s.textContent = '@font-face{font-family:"Leland";'
        + 'src:url("/assets/fonts/Leland.woff2") format("woff2");}';
      document.head.appendChild(s);
      if (document.fonts && document.fonts.load) { document.fonts.load('36px Leland'); }
    }
  }());

  var FS = 38;
  var FA = 'font-family="Leland" font-size="' + FS + '" fill="#333" text-anchor="middle"';
  var NY = 52;  /* baseline = centro de la cabeza */

  /* SMuFL glyph strings (PUA codepoints, Leland/MuseScore font) */
  var G = {
    r: '', b: '', n: '',
    c: '', sc: '', f: '', sf: '',
    dot: '',
  };

  function bvNote(g, vbW, dotX_) {
    var dot = dotX_
      ? '<text x="' + dotX_ + '" y="' + NY + '" ' + FA + '>' + G.dot + '</text>'
      : '';
    return '<svg viewBox="0 0 ' + vbW + ' 66" xmlns="http://www.w3.org/2000/svg">'
      + '<text x="30" y="' + NY + '" ' + FA + '>' + g + '</text>'
      + dot + '</svg>';
  }

  var SV = {
    r:   bvNote(G.r,  60),
    rP:  bvNote(G.r,  76, 46),
    b:   bvNote(G.b,  60),
    bP:  bvNote(G.b,  76, 41),
    n:   bvNote(G.n,  60),
    nP:  bvNote(G.n,  76, 41),
    c:   bvNote(G.c,  60),
    cP:  bvNote(G.c,  76, 50),
    sc:  bvNote(G.sc, 60),
    scP: bvNote(G.sc, 76, 53),
    f:   bvNote(G.f,  60),
    fP:  bvNote(G.f,  76, 56),
    sf:  bvNote(G.sf, 60),
    sfP: bvNote(G.sf, 76, 59),
  };

  /* Exposed for external use (e.g. reference tables in HTML) */
  window.tmNotaSVG = function (id) { return SV[id] || ''; };

  var PAIRS = [
    { base: { id:'sf',  lbl:'Semifusa'     }, dot: { id:'sfP', lbl:'Semifusa c/p.'  } },
    { base: { id:'f',   lbl:'Fusa'         }, dot: { id:'fP',  lbl:'Fusa c/p.'      } },
    { base: { id:'sc',  lbl:'Semicorchea'  }, dot: { id:'scP', lbl:'Semico. c/p.'   } },
    { base: { id:'c',   lbl:'Corchea'      }, dot: { id:'cP',  lbl:'Corchea c/p.'   } },
    { base: { id:'n',   lbl:'Negra'        }, dot: { id:'nP',  lbl:'Negra c/p.'     } },
    { base: { id:'b',   lbl:'Blanca'       }, dot: { id:'bP',  lbl:'Blanca c/p.'    } },
    { base: { id:'r',   lbl:'Redonda'      }, dot: { id:'rP',  lbl:'Redonda c/p.'   } },
  ];

  /* uC uses {n1, n2} — n2 null for non-ligated.
     Values verified in fusas (f=1): sc=2 c=4 n=8 b=16 r=32; dotted ×1.5
     Compound /1 omitted (uC >2 tied notes). Simple /1 only 2/1. */
  var COMPASES = [
    /* ── Simples ── */
    { sig:'2/1',   tipo:'s', tiempos:2, subdiv:'b', uT:'r',  uS:'b',  uC:{n1:'r',   n2:'r'  } }, /* 2r = r+r */
    { sig:'2/2',   tipo:'s', tiempos:2, subdiv:'b', uT:'b',  uS:'n',  uC:{n1:'r',   n2:null } },
    { sig:'3/2',   tipo:'s', tiempos:3, subdiv:'b', uT:'b',  uS:'n',  uC:{n1:'rP',  n2:null } }, /* 3b = rP */
    { sig:'2/4',   tipo:'s', tiempos:2, subdiv:'b', uT:'n',  uS:'c',  uC:{n1:'b',   n2:null } },
    { sig:'3/4',   tipo:'s', tiempos:3, subdiv:'b', uT:'n',  uS:'c',  uC:{n1:'bP',  n2:null } },
    { sig:'4/4',   tipo:'s', tiempos:4, subdiv:'b', uT:'n',  uS:'c',  uC:{n1:'r',   n2:null } },
    { sig:'2/8',   tipo:'s', tiempos:2, subdiv:'b', uT:'c',  uS:'sc', uC:{n1:'n',   n2:null } },
    { sig:'3/8',   tipo:'s', tiempos:3, subdiv:'b', uT:'c',  uS:'sc', uC:{n1:'nP',  n2:null } },
    { sig:'4/8',   tipo:'s', tiempos:4, subdiv:'b', uT:'c',  uS:'sc', uC:{n1:'b',   n2:null } },
    { sig:'2/16',  tipo:'s', tiempos:2, subdiv:'b', uT:'sc', uS:'f',  uC:{n1:'c',   n2:null } },
    { sig:'3/16',  tipo:'s', tiempos:3, subdiv:'b', uT:'sc', uS:'f',  uC:{n1:'cP',  n2:null } },
    { sig:'4/16',  tipo:'s', tiempos:4, subdiv:'b', uT:'sc', uS:'f',  uC:{n1:'n',   n2:null } },
    { sig:'2/32',  tipo:'s', tiempos:2, subdiv:'b', uT:'f',  uS:'sf', uC:{n1:'sc',  n2:null } },
    { sig:'3/32',  tipo:'s', tiempos:3, subdiv:'b', uT:'f',  uS:'sf', uC:{n1:'scP', n2:null } },
    { sig:'4/32',  tipo:'s', tiempos:4, subdiv:'b', uT:'f',  uS:'sf', uC:{n1:'c',   n2:null } },
    /* ── Compuestos ── */
    { sig:'6/2',   tipo:'c', tiempos:2, subdiv:'t', uT:'rP', uS:'b',  uC:{n1:'rP',  n2:'rP' } }, /* uT=3b=rP; uC=6b=rP+rP */
    { sig:'6/4',   tipo:'c', tiempos:2, subdiv:'t', uT:'bP', uS:'n',  uC:{n1:'rP',  n2:null } }, /* uC=6n=rP */
    { sig:'9/4',   tipo:'c', tiempos:3, subdiv:'t', uT:'bP', uS:'n',  uC:{n1:'rP',  n2:'bP' } }, /* uC=9n=rP(6)+bP(3) */
    { sig:'12/4',  tipo:'c', tiempos:4, subdiv:'t', uT:'bP', uS:'n',  uC:{n1:'rP',  n2:'rP' } }, /* uC=12n=rP+rP */
    { sig:'6/8',   tipo:'c', tiempos:2, subdiv:'t', uT:'nP', uS:'c',  uC:{n1:'bP',  n2:null } },
    { sig:'9/8',   tipo:'c', tiempos:3, subdiv:'t', uT:'nP', uS:'c',  uC:{n1:'bP',  n2:'nP' } },
    { sig:'12/8',  tipo:'c', tiempos:4, subdiv:'t', uT:'nP', uS:'c',  uC:{n1:'rP',  n2:null } },
    { sig:'6/16',  tipo:'c', tiempos:2, subdiv:'t', uT:'cP', uS:'sc', uC:{n1:'nP',  n2:null } },
    { sig:'9/16',  tipo:'c', tiempos:3, subdiv:'t', uT:'cP', uS:'sc', uC:{n1:'nP',  n2:'cP' } },
    { sig:'12/16', tipo:'c', tiempos:4, subdiv:'t', uT:'cP', uS:'sc', uC:{n1:'bP',  n2:null } },
    { sig:'6/32',  tipo:'c', tiempos:2, subdiv:'t', uT:'scP',uS:'f',  uC:{n1:'cP',  n2:null } },
    { sig:'9/32',  tipo:'c', tiempos:3, subdiv:'t', uT:'scP',uS:'f',  uC:{n1:'cP',  n2:'scP'} },
    { sig:'12/32', tipo:'c', tiempos:4, subdiv:'t', uT:'scP',uS:'f',  uC:{n1:'nP',  n2:null } },
  ];

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function injectCSS() {
    if (document.getElementById('tm-cp-css')) return;
    var s = document.createElement('style');
    s.id = 'tm-cp-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function noteCard(nota, gridId) {
    return '<div class="tm-cp-note" data-grid="' + gridId + '" data-val="' + nota.id + '">'
      + (SV[nota.id] || '')
      + '<div class="tm-cp-note-lbl">' + nota.lbl + '</div>'
      + '</div>';
  }

  function pairsGrid(gridId) {
    return '<div class="tm-cp-pairs" id="' + gridId + '">'
      + PAIRS.map(function (p) {
          return '<div class="tm-cp-pair">'
            + noteCard(p.base, gridId)
            + noteCard(p.dot, gridId)
            + '</div>';
        }).join('')
      + '</div>';
  }

  function tmCompasesEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-cp-wrap';

    var modo = 's', queue = [], current = 0, score = 0;
    var TOTAL = 10;

    function showModeScreen() {
      wrap.innerHTML = '<div class="tm-cp-card">'
        + '<div class="tm-cp-mode-title">Análisis de compases</div>'
        + '<div class="tm-cp-mode-sub">Identifica el tipo de compás, el número de tiempos, la subdivisión y las unidades de tiempo, subdivisión y compás.</div>'
        + '<div class="tm-cp-mode-btns">'
        + '<button class="tm-cp-mode-btn" data-modo="s"><strong>Simples</strong><span>Denominadores 1, 2, 4, 8, 16 y 32 — subdivisión binaria</span></button>'
        + '<button class="tm-cp-mode-btn" data-modo="c"><strong>Compuestos</strong><span>Denominadores 2, 4, 8, 16 y 32 — subdivisión ternaria</span></button>'
        + '<button class="tm-cp-mode-btn" data-modo="all"><strong>Todos</strong><span>Simples y compuestos mezclados</span></button>'
        + '</div></div>';

      wrap.querySelectorAll('.tm-cp-mode-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          modo = this.dataset.modo;
          buildQueue();
          current = 0; score = 0;
          showQuestion();
        });
      });
    }

    function buildQueue() {
      var pool = modo === 'all'
        ? COMPASES
        : COMPASES.filter(function (c) { return c.tipo === modo; });
      queue = [];
      while (queue.length < TOTAL) queue = queue.concat(shuffle(pool.slice()));
      queue = shuffle(queue).slice(0, TOTAL);
    }

    function showQuestion() {
      var cQ = queue[current];
      var sp  = cQ.sig.split('/');
      var pct = Math.round((current / TOTAL) * 100);
      var sel   = { tipo: null, tiempos: null, subdiv: null, uT: null, uS: null };
      var selUC = { n1: null, n2: null, liga: false };

      wrap.innerHTML = '<div class="tm-cp-card">'
        + '<div class="tm-cp-prog-label">Pregunta ' + (current + 1) + ' de ' + TOTAL + '</div>'
        + '<div class="tm-cp-prog-bar"><div class="tm-cp-prog-fill" style="width:' + pct + '%"></div></div>'
        + '<div class="tm-cp-sig-wrap"><div class="tm-cp-sig"><span class="tm-cp-sig-n">' + sp[0] + '</span><span class="tm-cp-sig-d">' + sp[1] + '</span></div></div>'
        /* Q1 */
        + '<div class="tm-cp-section" id="sec-tipo"><div class="tm-cp-qlabel">Tipo de compás</div>'
        + '<div class="tm-cp-pills"><div class="tm-cp-pill" data-q="tipo" data-val="s">Simple</div><div class="tm-cp-pill" data-q="tipo" data-val="c">Compuesto</div></div></div>'
        /* Q2 */
        + '<div class="tm-cp-section" id="sec-tiempos"><div class="tm-cp-qlabel">Número de tiempos</div>'
        + '<div class="tm-cp-pills"><div class="tm-cp-pill" data-q="tiempos" data-val="2">2</div><div class="tm-cp-pill" data-q="tiempos" data-val="3">3</div><div class="tm-cp-pill" data-q="tiempos" data-val="4">4</div></div></div>'
        /* Q3 */
        + '<div class="tm-cp-section" id="sec-subdiv"><div class="tm-cp-qlabel">Tipo de subdivisión</div>'
        + '<div class="tm-cp-pills"><div class="tm-cp-pill" data-q="subdiv" data-val="b">Binaria</div><div class="tm-cp-pill" data-q="subdiv" data-val="t">Ternaria</div></div></div>'
        /* Q4 uT */
        + '<div class="tm-cp-section" id="sec-uT"><div class="tm-cp-qlabel">Unidad de tiempo</div>'
        + pairsGrid('grid-uT') + '</div>'
        /* Q5 uS */
        + '<div class="tm-cp-section" id="sec-uS"><div class="tm-cp-qlabel">Unidad de subdivisión</div>'
        + pairsGrid('grid-uS') + '</div>'
        /* Q6 uC */
        + '<div class="tm-cp-section" id="sec-uC"><div class="tm-cp-qlabel">Unidad de compás</div>'
        + pairsGrid('grid-uC-1')
        + '<label class="tm-cp-liga-row"><input type="checkbox" id="chk-liga"><span>Con ligadura (dos figuras ligadas)</span></label>'
        + '<div class="tm-cp-grid2" id="grid-uC-2-wrap" style="display:none">'
        + '<div class="tm-cp-grid2-lbl">Segunda figura (ligada a la anterior)</div>'
        + pairsGrid('grid-uC-2')
        + '</div></div>'
        /* feedback + buttons */
        + '<div class="tm-cp-fb" id="tm-cp-fb"></div>'
        + '<button class="tm-cp-submit" id="tm-cp-submit">Comprobar</button>'
        + '<button id="tm-cp-next" style="display:none;width:100%;padding:14px;margin-top:10px;border:none;border-radius:8px;font-size:1rem;font-weight:700;background:#8b6914;color:#fff;cursor:pointer;">'
        + (current + 1 < TOTAL ? 'Siguiente →' : 'Ver resultados')
        + '</button>'
        + '</div>';

      var submitBtn = document.getElementById('tm-cp-submit');
      var nextBtn   = document.getElementById('tm-cp-next');
      var chkLiga   = document.getElementById('chk-liga');

      /* Pills */
      wrap.querySelectorAll('.tm-cp-pill').forEach(function (pill) {
        pill.addEventListener('click', function () {
          if (this.classList.contains('tm-disabled')) return;
          var q = this.dataset.q;
          wrap.querySelectorAll('.tm-cp-pill[data-q="' + q + '"]').forEach(function (p) { p.classList.remove('tm-sel'); });
          this.classList.add('tm-sel');
          sel[q] = this.dataset.val;
          checkReady();
        });
      });

      /* uT and uS grids */
      ['uT', 'uS'].forEach(function (qk) {
        var gid = 'grid-' + qk;
        wrap.querySelectorAll('#' + gid + ' .tm-cp-note').forEach(function (card) {
          card.addEventListener('click', function () {
            if (this.classList.contains('tm-disabled')) return;
            wrap.querySelectorAll('#' + gid + ' .tm-cp-note').forEach(function (c) { c.classList.remove('tm-sel'); });
            this.classList.add('tm-sel');
            sel[qk] = this.dataset.val;
            checkReady();
          });
        });
      });

      /* uC grid 1 */
      wrap.querySelectorAll('#grid-uC-1 .tm-cp-note').forEach(function (card) {
        card.addEventListener('click', function () {
          if (this.classList.contains('tm-disabled')) return;
          wrap.querySelectorAll('#grid-uC-1 .tm-cp-note').forEach(function (c) { c.classList.remove('tm-sel'); });
          this.classList.add('tm-sel');
          selUC.n1 = this.dataset.val;
          checkReady();
        });
      });

      /* Ligadura toggle */
      chkLiga.addEventListener('change', function () {
        selUC.liga = this.checked;
        var g2 = document.getElementById('grid-uC-2-wrap');
        g2.style.display = this.checked ? 'block' : 'none';
        if (!this.checked) {
          selUC.n2 = null;
          wrap.querySelectorAll('#grid-uC-2 .tm-cp-note').forEach(function (c) { c.classList.remove('tm-sel'); });
        }
        checkReady();
      });

      /* uC grid 2 */
      wrap.querySelectorAll('#grid-uC-2 .tm-cp-note').forEach(function (card) {
        card.addEventListener('click', function () {
          if (this.classList.contains('tm-disabled')) return;
          wrap.querySelectorAll('#grid-uC-2 .tm-cp-note').forEach(function (c) { c.classList.remove('tm-sel'); });
          this.classList.add('tm-sel');
          selUC.n2 = this.dataset.val;
          checkReady();
        });
      });

      function checkReady() {
        var ucOk  = selUC.n1 !== null && (!selUC.liga || selUC.n2 !== null);
        var ready = !!(sel.tipo && sel.tiempos && sel.subdiv && sel.uT && sel.uS && ucOk);
        submitBtn.classList.toggle('tm-ready', ready);
      }

      submitBtn.addEventListener('click', function () {
        if (!this.classList.contains('tm-ready')) return;
        var correct = checkAnswers(cQ, sel, selUC);
        if (correct === 6) score++;
        renderFeedback(correct);
        wrap.querySelectorAll('.tm-cp-pill, .tm-cp-note').forEach(function (el) { el.classList.add('tm-disabled'); });
        chkLiga.disabled = true;
        this.style.display = 'none';
        nextBtn.style.display = 'block';
      });

      nextBtn.addEventListener('click', function () {
        current++;
        if (current >= TOTAL) {
          showResults();
        } else {
          showQuestion();
          wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    function checkAnswers(cQ, sel, selUC) {
      var correct = 0;

      var checks = [
        { key: 'tipo',    val: cQ.tipo,           isNote: false },
        { key: 'tiempos', val: String(cQ.tiempos), isNote: false },
        { key: 'subdiv',  val: cQ.subdiv,          isNote: false },
        { key: 'uT',      val: cQ.uT,              isNote: true  },
        { key: 'uS',      val: cQ.uS,              isNote: true  },
      ];

      checks.forEach(function (chk) {
        var userVal = sel[chk.key];
        var ok      = userVal === chk.val;
        if (ok) correct++;

        var sec = document.getElementById('sec-' + chk.key);
        if (sec) sec.classList.add(ok ? 'tm-sec-ok' : 'tm-sec-ko');

        if (chk.isNote) {
          var gid = 'grid-' + chk.key;
          wrap.querySelectorAll('#' + gid + ' .tm-cp-note').forEach(function (el) {
            var v = el.dataset.val;
            el.classList.remove('tm-sel');
            if (v === userVal && !ok) el.classList.add('tm-ko');
            if (v === chk.val)       el.classList.add(ok ? 'tm-ok' : 'tm-correct');
          });
        } else {
          wrap.querySelectorAll('.tm-cp-pill[data-q="' + chk.key + '"]').forEach(function (el) {
            var v = el.dataset.val;
            el.classList.remove('tm-sel');
            if (v === userVal && !ok) el.classList.add('tm-ko');
            if (v === chk.val)       el.classList.add(ok ? 'tm-ok' : 'tm-correct');
          });
        }
      });

      /* uC */
      var ansUC = cQ.uC;
      var ucOk  = selUC.n1 === ansUC.n1 && selUC.n2 === ansUC.n2;
      if (ucOk) correct++;

      var secUC = document.getElementById('sec-uC');
      if (secUC) secUC.classList.add(ucOk ? 'tm-sec-ok' : 'tm-sec-ko');

      wrap.querySelectorAll('#grid-uC-1 .tm-cp-note').forEach(function (el) {
        var v = el.dataset.val;
        el.classList.remove('tm-sel');
        if (v === selUC.n1 && selUC.n1 !== ansUC.n1) el.classList.add('tm-ko');
        if (v === ansUC.n1) el.classList.add(selUC.n1 === ansUC.n1 ? 'tm-ok' : 'tm-correct');
      });

      /* if correct answer is ligated, reveal grid 2 so user can see answer */
      if (ansUC.n2) {
        var g2w = document.getElementById('grid-uC-2-wrap');
        if (g2w) g2w.style.display = 'block';
      }

      wrap.querySelectorAll('#grid-uC-2 .tm-cp-note').forEach(function (el) {
        var v = el.dataset.val;
        el.classList.remove('tm-sel');
        if (!ansUC.n2) return;
        if (v === selUC.n2 && selUC.n2 !== ansUC.n2) el.classList.add('tm-ko');
        if (v === ansUC.n2) el.classList.add(selUC.n2 === ansUC.n2 ? 'tm-ok' : 'tm-correct');
      });

      return correct;
    }

    function renderFeedback(correct) {
      var fb = document.getElementById('tm-cp-fb');
      if (!fb) return;
      fb.classList.add('tm-show');
      if (correct === 6) {
        fb.classList.add('tm-ok');
        fb.textContent = '✓ ¡Correcto! Las 6 respuestas son correctas.';
      } else {
        fb.classList.add('tm-ko');
        fb.textContent = '✗ ' + correct + ' de 6 correctas. Las respuestas correctas están marcadas en verde.';
      }
    }

    function showResults() {
      var pct = Math.round((score / TOTAL) * 100);
      var msg = pct === 100 ? '¡Perfecto! Dominas el análisis de compases.'
              : pct >= 80  ? 'Muy bien. Casi lo tienes dominado.'
              : pct >= 60  ? 'Vas por buen camino. Repasa los compases compuestos.'
              : pct >= 40  ? 'Necesitas repasar. Presta atención a las unidades.'
              :              '¡Sigue practicando! Empieza por el nivel Fácil.';

      wrap.innerHTML = '<div class="tm-cp-card tm-cp-results">'
        + '<div class="tm-cp-res-score">' + score + '/' + TOTAL + '</div>'
        + '<div class="tm-cp-res-total">' + pct + '% de compases completamente correctos</div>'
        + '<div class="tm-cp-res-msg">' + msg + '</div>'
        + '<button class="tm-cp-retry" id="tm-cp-retry">Intentar de nuevo</button>'
        + '</div>';

      document.getElementById('tm-cp-retry').addEventListener('click', showModeScreen);
    }

    showModeScreen();
  }

  window.tmCompasesEngine = tmCompasesEngine;
})();
