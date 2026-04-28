/* Motor de ejercicios de tonalidades vecinas */
(function () {
  'use strict';

  var KEYS = [
    { pos: -7, maj: "Dob Mayor",  min: "Lab menor"  },
    { pos: -6, maj: "Solb Mayor", min: "Mib menor"  },
    { pos: -5, maj: "Reb Mayor",  min: "Sib menor"  },
    { pos: -4, maj: "Lab Mayor",  min: "Fa menor"   },
    { pos: -3, maj: "Mib Mayor",  min: "Do menor"   },
    { pos: -2, maj: "Sib Mayor",  min: "Sol menor"  },
    { pos: -1, maj: "Fa Mayor",   min: "Re menor"   },
    { pos:  0, maj: "Do Mayor",   min: "La menor"   },
    { pos:  1, maj: "Sol Mayor",  min: "Mi menor"   },
    { pos:  2, maj: "Re Mayor",   min: "Si menor"   },
    { pos:  3, maj: "La Mayor",   min: "Fa# menor"  },
    { pos:  4, maj: "Mi Mayor",   min: "Do# menor"  },
    { pos:  5, maj: "Si Mayor",   min: "Sol# menor" },
    { pos:  6, maj: "Fa# Mayor",  min: "Re# menor"  },
    { pos:  7, maj: "Do# Mayor",  min: "La# menor"  }
  ];

  /* Excluye pos ±7 para garantizar que las 5 vecinas siempre existen */
  var ALL = [];
  KEYS.forEach(function (k) {
    if (k.pos >= -6 && k.pos <= 6) {
      ALL.push({ key: k, mode: 'maj', label: k.maj });
      ALL.push({ key: k, mode: 'min', label: k.min });
    }
  });

  function findKey(pos) {
    for (var i = 0; i < KEYS.length; i++) {
      if (KEYS[i].pos === pos) return KEYS[i];
    }
    return null;
  }

  function getTon(pos, mode) {
    var k = findKey(pos);
    if (!k) return null;
    return { key: k, mode: mode, label: mode === 'maj' ? k.maj : k.min };
  }

  /*
   * Cuadrícula 3×2 — fila superior SIEMPRE Mayores, fila inferior SIEMPRE menores.
   * La celda BASE (null) va en el centro de su fila correspondiente.
   *
   * Base Mayor → BASE en top-center [1]:
   *   [0] Subdominante Mayor  [1] BASE Mayor      [2] Dominante Mayor
   *   [3] Rel. subdominante   [4] Relativa menor  [5] Rel. dominante
   *
   * Base menor → BASE en bot-center [4]:
   *   [0] Rel. subdominante   [1] Relativa Mayor  [2] Rel. dominante
   *   [3] Subdominante menor  [4] BASE menor      [5] Dominante menor
   */
  function getGrid(base) {
    var p = base.key.pos;
    if (base.mode === 'maj') {
      return [
        { rel: 'IV',  ton: getTon(p - 1, 'maj') },
        null,
        { rel: 'V',   ton: getTon(p + 1, 'maj') },
        { rel: 'II',  ton: getTon(p - 1, 'min') },
        { rel: 'VI',  ton: getTon(p,     'min') },
        { rel: 'III', ton: getTon(p + 1, 'min') }
      ];
    } else {
      return [
        { rel: 'VI',  ton: getTon(p - 1, 'maj') },
        { rel: 'III', ton: getTon(p,     'maj') },
        { rel: 'VII', ton: getTon(p + 1, 'maj') },
        { rel: 'IV',  ton: getTon(p - 1, 'min') },
        null,
        { rel: 'V',   ton: getTon(p + 1, 'min') }
      ];
    }
  }

  function normalize(s) {
    return s.trim().toLowerCase()
      .replace(/♭/g, 'b')
      .replace(/♯/g, '#')
      .replace(/\s+/g, ' ');
  }

  function isNeighbor(a, b) {
    if (a === b) return false;
    return Math.abs(a.key.pos - b.key.pos) <= 1;
  }

  function explainRelation(a, b) {
    var diff = Math.abs(a.key.pos - b.key.pos);
    if (diff === 0) return 'son <strong>relativas</strong>: comparten exactamente la misma armadura.';
    if (diff === 1) return 'sus armaduras solo difieren en <strong>1 alteración</strong>.';
    return 'sus armaduras difieren en <strong>' + diff + ' alteraciones</strong> — están demasiado lejos en el círculo de quintas.';
  }

  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function injectCSS(id, css) {
    if (document.getElementById(id)) return;
    var s = document.createElement('style');
    s.id = id; s.textContent = css;
    document.head.appendChild(s);
  }

  /* ── CSS: tabla de vecinas ───────────────────────────────────────────── */
  var CSS_TAB = [
    '.tmtab-wrap{font-family:inherit;color:inherit;width:100%;margin:0 auto;}',
    '.tmtab-wrap *{box-sizing:border-box;margin:0;padding:0;}',
    '.tmtab-wrap .tm-controls{display:flex;gap:8px;align-items:center;margin-bottom:18px;flex-wrap:wrap;}',
    '.tmtab-wrap .tm-lbl{font-size:.75rem;color:#999;letter-spacing:.08em;text-transform:uppercase;}',
    '.tmtab-wrap .tm-btn{font-size:.78rem;padding:6px 14px;border:1px solid #d8d0b8;background:#fff;color:#999;cursor:pointer;border-radius:3px;transition:all .15s;font-family:inherit;}',
    '.tmtab-wrap .tm-btn:hover{border-color:#8b6914;color:#8b6914;}',
    '.tmtab-wrap .tm-btn.tm-on{background:#8b6914;color:#fff;border-color:#8b6914;font-weight:600;}',
    '.tmtab-wrap .tm-stats{display:flex;border:1px solid #d8d0b8;border-radius:3px;overflow:hidden;margin-bottom:18px;background:#fff;}',
    '.tmtab-wrap .tm-stat{flex:1;padding:9px 8px;border-right:1px solid #d8d0b8;text-align:center;}',
    '.tmtab-wrap .tm-stat:last-child{border-right:none;}',
    '.tmtab-wrap .tm-sv{font-size:1.5rem;font-weight:700;color:#8b6914;line-height:1;}',
    '.tmtab-wrap .tm-sl{font-size:.6rem;color:#aaa;letter-spacing:.06em;text-transform:uppercase;margin-top:2px;}',
    '.tmtab-wrap .tm-pbar-wrap{height:3px;background:#e8e0cc;border-radius:2px;overflow:hidden;margin-bottom:18px;}',
    '.tmtab-wrap .tm-pbar{height:100%;background:linear-gradient(90deg,#8b6914,#2a7a6e);transition:width .4s;width:0%;}',
    '.tmtab-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:4px;padding:24px 20px 20px;margin-bottom:16px;position:relative;overflow:hidden;}',
    '.tmtab-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#8b6914,#2a7a6e);}',
    '.tmtab-wrap .tm-qlbl{font-size:.68rem;color:#aaa;letter-spacing:.1em;text-transform:uppercase;margin-bottom:7px;}',
    '.tmtab-wrap .tm-qnum{color:#8b6914;font-weight:700;}',
    '.tmtab-wrap .tm-qtxt{font-size:1.05rem;font-weight:600;margin-bottom:16px;line-height:1.4;}',
    /* Grid */
    '.tmtab-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:18px;}',
    '.tmtab-cell{border:1px solid #d8d0b8;border-radius:4px;padding:8px 6px 7px;background:#fff;display:flex;flex-direction:column;gap:5px;min-height:72px;}',
    '.tmtab-cell-base{background:#1a1a2e;color:#d4a843;align-items:center;justify-content:center;font-weight:700;font-size:.95rem;text-align:center;line-height:1.3;cursor:default;}',
    '.tmtab-cell-lbl{font-size:.58rem;color:#999;text-transform:uppercase;letter-spacing:.04em;}',
    /* Valor clicable dentro de cada celda */
    '.tmtab-cell-val{flex:1;display:flex;align-items:center;justify-content:center;min-height:34px;border:1px dashed #ccc4a8;border-radius:3px;font-size:.82rem;font-weight:600;color:#1a1a2e;cursor:pointer;background:#fafaf5;transition:all .15s;text-align:center;padding:3px 4px;line-height:1.2;}',
    '.tmtab-cell-val:hover{border-color:#8b6914;background:#fff8e8;}',
    '.tmtab-cell-val.tm-empty{color:#c0b898;font-weight:400;font-size:.72rem;font-style:italic;}',
    '.tmtab-cell-val.tm-ok{border:1px solid #27ae60 !important;background:rgba(39,174,96,.07);color:#1e8449;cursor:default;}',
    '.tmtab-cell-val.tm-ko{border:1px solid #c0392b !important;background:rgba(192,57,43,.05);color:#a93226;cursor:default;}',
    '.tmtab-wrap .tm-hint{font-size:.7rem;color:#a93226;margin-top:1px;font-weight:600;}',
    /* Overlay y builder */
    '.tmtab-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:900;display:none;}',
    '.tmtab-overlay.tm-show{display:block;}',
    '.tmtab-bld{position:fixed;left:50%;transform:translateX(-50%);bottom:0;width:100%;max-width:460px;background:#fff;border-radius:16px 16px 0 0;z-index:901;padding:22px 20px 32px;display:none;box-shadow:0 -4px 28px rgba(0,0,0,.18);}',
    '@media(min-width:560px){.tmtab-bld{bottom:auto;top:50%;transform:translate(-50%,-50%);border-radius:10px;padding:24px 24px 20px;}}',
    '.tmtab-bld.tm-show{display:block;}',
    '.tmtab-bld-head{font-size:.65rem;color:#aaa;text-transform:uppercase;letter-spacing:.09em;margin-bottom:10px;}',
    '.tmtab-bld-preview{font-size:1.3rem;font-weight:700;color:#1a1a2e;min-height:1.6em;margin-bottom:18px;text-align:center;padding:10px;background:#f5f0e8;border-radius:6px;}',
    '.tmtab-bld-step{margin-bottom:14px;}',
    '.tmtab-bld-slbl{font-size:.62rem;color:#888;text-transform:uppercase;letter-spacing:.07em;margin-bottom:6px;}',
    '.tmtab-bld-row{display:flex;gap:5px;flex-wrap:wrap;}',
    '.tmtab-bld-btn{flex:1;min-width:36px;padding:11px 4px;border:1px solid #d8d0b8;background:#fdfcf9;color:#333;border-radius:4px;cursor:pointer;font-size:.9rem;font-family:inherit;font-weight:500;transition:all .12s;text-align:center;}',
    '.tmtab-bld-btn:hover:not(:disabled){border-color:#8b6914;color:#8b6914;}',
    '.tmtab-bld-btn.tm-on{background:#1a1a2e;color:#d4a843;border-color:#1a1a2e;font-weight:700;}',
    '.tmtab-bld-btn:disabled{opacity:.28;cursor:default;}',
    '.tmtab-bld-cancel{width:100%;margin-top:10px;padding:10px;font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;background:transparent;color:#bbb;border:1px solid #e0d8c0;border-radius:4px;cursor:pointer;font-family:inherit;}',
    '.tmtab-bld-cancel:hover{color:#888;border-color:#bbb;}',
    /* Botones de acción */
    '.tmtab-wrap .tm-submit{width:100%;padding:11px;font-size:.85rem;letter-spacing:.07em;text-transform:uppercase;background:#8b6914;color:#fff;border:none;border-radius:3px;cursor:pointer;font-weight:600;font-family:inherit;transition:opacity .15s;margin-bottom:8px;}',
    '.tmtab-wrap .tm-submit:hover{opacity:.87;}',
    '.tmtab-wrap .tm-fb{display:none;margin-top:10px;margin-bottom:10px;padding:11px 14px;border-radius:3px;font-size:.86rem;line-height:1.6;}',
    '.tmtab-wrap .tm-fb.tm-show{display:block;}',
    '.tmtab-wrap .tm-fb.tm-ok{background:rgba(39,174,96,.08);border:1px solid rgba(39,174,96,.3);color:#1e8449;}',
    '.tmtab-wrap .tm-fb.tm-ko{background:rgba(192,57,43,.07);border:1px solid rgba(192,57,43,.3);color:#a93226;}',
    '.tmtab-wrap .tm-fb.tm-partial{background:rgba(184,134,11,.07);border:1px solid rgba(184,134,11,.3);color:#7a5c00;}',
    '.tmtab-wrap .tm-nxt{display:none;width:100%;margin-top:8px;padding:11px;font-size:.82rem;letter-spacing:.07em;text-transform:uppercase;background:#2a7a6e;color:#fff;border:none;border-radius:3px;cursor:pointer;font-weight:600;font-family:inherit;transition:opacity .15s;}',
    '.tmtab-wrap .tm-nxt:hover{opacity:.85;}',
    '.tmtab-wrap .tm-nxt.tm-show{display:block;}',
    '@keyframes tmtab-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translateX(-2px)}80%{transform:translateX(2px)}}',
    '.tmtab-wrap .tm-shake{animation:tmtab-shake 0.4s ease;}'
  ].join('');

  /* ── CSS: ¿son vecinas? ──────────────────────────────────────────────── */
  var CSS_SON = [
    '.tmson-wrap{font-family:inherit;color:inherit;width:100%;margin:0 auto;}',
    '.tmson-wrap *{box-sizing:border-box;margin:0;padding:0;}',
    '.tmson-wrap .tm-stats{display:flex;border:1px solid #d8d0b8;border-radius:3px;overflow:hidden;margin-bottom:18px;background:#fff;}',
    '.tmson-wrap .tm-stat{flex:1;padding:9px 8px;border-right:1px solid #d8d0b8;text-align:center;}',
    '.tmson-wrap .tm-stat:last-child{border-right:none;}',
    '.tmson-wrap .tm-sv{font-size:1.5rem;font-weight:700;color:#8b6914;line-height:1;}',
    '.tmson-wrap .tm-sl{font-size:.6rem;color:#aaa;letter-spacing:.06em;text-transform:uppercase;margin-top:2px;}',
    '.tmson-wrap .tm-pbar-wrap{height:3px;background:#e8e0cc;border-radius:2px;overflow:hidden;margin-bottom:18px;}',
    '.tmson-wrap .tm-pbar{height:100%;background:linear-gradient(90deg,#8b6914,#2a7a6e);transition:width .4s;width:0%;}',
    '.tmson-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:4px;padding:24px 20px 20px;margin-bottom:16px;position:relative;overflow:hidden;}',
    '.tmson-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#8b6914,#2a7a6e);}',
    '.tmson-wrap .tm-qlbl{font-size:.68rem;color:#aaa;letter-spacing:.1em;text-transform:uppercase;margin-bottom:7px;}',
    '.tmson-wrap .tm-qnum{color:#8b6914;font-weight:700;}',
    '.tmson-wrap .tm-qtxt{font-size:1.05rem;font-weight:600;margin-bottom:18px;line-height:1.4;}',
    '.tmson-wrap .tm-pair{display:flex;gap:12px;justify-content:center;align-items:center;margin-bottom:22px;flex-wrap:wrap;}',
    '.tmson-wrap .tm-tag{background:#1a1a2e;color:#d4a843;font-size:1.1rem;font-weight:700;padding:10px 22px;border-radius:4px;text-align:center;}',
    '.tmson-wrap .tm-vsep{color:#aaa;font-size:1.3rem;font-weight:300;}',
    '.tmson-wrap .tm-yn{display:flex;gap:12px;margin-bottom:4px;}',
    '.tmson-wrap .tm-yn-btn{flex:1;padding:14px;font-size:.95rem;font-weight:700;border:2px solid #d8d0b8;background:#fdfcf9;border-radius:4px;cursor:pointer;font-family:inherit;transition:all .15s;}',
    '.tmson-wrap .tm-yn-btn:hover:not(:disabled){border-color:#8b6914;color:#8b6914;}',
    '.tmson-wrap .tm-yn-btn.tm-ok{border-color:#27ae60;background:rgba(39,174,96,.1);color:#1e8449;}',
    '.tmson-wrap .tm-yn-btn.tm-ko{border-color:#c0392b;background:rgba(192,57,43,.08);color:#a93226;}',
    '.tmson-wrap .tm-yn-btn:disabled{cursor:default;}',
    '.tmson-wrap .tm-fb{display:none;margin-top:14px;padding:11px 14px;border-radius:3px;font-size:.86rem;line-height:1.6;}',
    '.tmson-wrap .tm-fb.tm-show{display:block;}',
    '.tmson-wrap .tm-fb.tm-ok{background:rgba(39,174,96,.08);border:1px solid rgba(39,174,96,.3);color:#1e8449;}',
    '.tmson-wrap .tm-fb.tm-ko{background:rgba(192,57,43,.07);border:1px solid rgba(192,57,43,.3);color:#a93226;}',
    '.tmson-wrap .tm-nxt{display:none;width:100%;margin-top:12px;padding:11px;font-size:.82rem;letter-spacing:.07em;text-transform:uppercase;background:#8b6914;color:#fff;border:none;border-radius:3px;cursor:pointer;font-weight:600;font-family:inherit;transition:opacity .15s;}',
    '.tmson-wrap .tm-nxt:hover{opacity:.85;}',
    '.tmson-wrap .tm-nxt.tm-show{display:block;}',
    '@keyframes tmson-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translateX(-2px)}80%{transform:translateX(2px)}}',
    '.tmson-wrap .tm-shake{animation:tmson-shake 0.4s ease;}'
  ].join('');

  /* ══════════════════════════════════════════════════════════════════════
     tmVecinaTabla — Cuadrícula 3×2 con constructor de tonalidad
  ══════════════════════════════════════════════════════════════════════ */
  function tmVecinaTabla(containerId) {
    injectCSS('tmtab-css', CSS_TAB);
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tmtab-wrap';
    var uid = containerId;

    var NOTES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
    var ALTS  = [{ sym: '♭', val: 'b' }, { sym: '—', val: '' }, { sym: '♯', val: '#' }];
    var MODES = ['Mayor', 'menor'];

    wrap.innerHTML = [
      '<div class="tm-controls">',
        '<div class="tm-lbl">Dificultad:</div>',
        '<button class="tm-btn tm-on" id="' + uid + '_d_easy">Fácil</button>',
        '<button class="tm-btn" id="' + uid + '_d_med">Medio</button>',
        '<button class="tm-btn" id="' + uid + '_d_hard">Difícil</button>',
      '</div>',
      '<div class="tm-stats">',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_tot">0</div><div class="tm-sl">Tablas</div></div>',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_perf">0</div><div class="tm-sl">Perfectas</div></div>',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_pts">—</div><div class="tm-sl">Aciertos</div></div>',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_str">0</div><div class="tm-sl">Racha</div></div>',
      '</div>',
      '<div class="tm-pbar-wrap"><div class="tm-pbar" id="' + uid + '_pbar"></div></div>',
      '<div class="tm-card" id="' + uid + '_card">',
        '<div class="tm-qlbl">Tabla <span class="tm-qnum" id="' + uid + '_qnum">1</span></div>',
        '<div class="tm-qtxt">Toca cada celda para escribir las 5 tonalidades vecinas:</div>',
        '<div id="' + uid + '_grid"></div>',
        '<button class="tm-submit" id="' + uid + '_submit">Comprobar →</button>',
        '<div class="tm-fb" id="' + uid + '_fb"></div>',
        '<button class="tm-nxt" id="' + uid + '_nxt">Siguiente tabla →</button>',
      '</div>',
      /* Overlay */
      '<div class="tmtab-overlay" id="' + uid + '_ov"></div>',
      /* Builder */
      '<div class="tmtab-bld" id="' + uid + '_bld">',
        '<div class="tmtab-bld-head">Constructor de tonalidad</div>',
        '<div class="tmtab-bld-preview" id="' + uid + '_bld_prev">…</div>',
        '<div class="tmtab-bld-step">',
          '<div class="tmtab-bld-slbl">1 · Nota</div>',
          '<div class="tmtab-bld-row" id="' + uid + '_bld_notes"></div>',
        '</div>',
        '<div class="tmtab-bld-step">',
          '<div class="tmtab-bld-slbl">2 · Alteración</div>',
          '<div class="tmtab-bld-row" id="' + uid + '_bld_alts"></div>',
        '</div>',
        '<div class="tmtab-bld-step">',
          '<div class="tmtab-bld-slbl">3 · Modo</div>',
          '<div class="tmtab-bld-row" id="' + uid + '_bld_modes"></div>',
        '</div>',
        '<button class="tmtab-bld-cancel" id="' + uid + '_bld_cancel">Cancelar</button>',
      '</div>'
    ].join('');

    var st = { total: 0, perfect: 0, points: 0, possible: 0, streak: 0, qnum: 0, answered: false, diff: 'easy' };
    var cQ = null;
    var inputDefs  = [];   /* { inpIdx, cell } */
    var cellValues = [];   /* string por celda */
    var activeCellIdx = -1;
    var bldNote = '', bldAlt = null, bldMode = '';

    var elTot    = document.getElementById(uid + '_tot');
    var elPerf   = document.getElementById(uid + '_perf');
    var elPts    = document.getElementById(uid + '_pts');
    var elStr    = document.getElementById(uid + '_str');
    var elPbar   = document.getElementById(uid + '_pbar');
    var elQnum   = document.getElementById(uid + '_qnum');
    var elGrid   = document.getElementById(uid + '_grid');
    var elSubmit = document.getElementById(uid + '_submit');
    var elFb     = document.getElementById(uid + '_fb');
    var elNxt    = document.getElementById(uid + '_nxt');
    var elCard   = document.getElementById(uid + '_card');
    var elOv     = document.getElementById(uid + '_ov');
    var elBld    = document.getElementById(uid + '_bld');
    var elPrev   = document.getElementById(uid + '_bld_prev');
    var elNotes  = document.getElementById(uid + '_bld_notes');
    var elAlts   = document.getElementById(uid + '_bld_alts');
    var elModes  = document.getElementById(uid + '_bld_modes');

    /* ── Builder ────────────────────────────────────────────────────────── */
    function buildPreviewLabel() {
      if (!bldNote) return '…';
      var alt = bldAlt === null ? '' : bldAlt;
      var mode = bldMode || '';
      return (bldNote + alt + (mode ? ' ' + mode : '')).trim() || '…';
    }

    function refreshBuilderUI() {
      elPrev.textContent = buildPreviewLabel();
      /* Notas */
      Array.prototype.forEach.call(elNotes.querySelectorAll('button'), function (btn) {
        btn.classList.toggle('tm-on', btn.dataset.note === bldNote);
      });
      /* Alteraciones */
      Array.prototype.forEach.call(elAlts.querySelectorAll('button'), function (btn) {
        var active = bldAlt !== null && btn.dataset.alt === bldAlt;
        btn.classList.toggle('tm-on', active);
        btn.disabled = !bldNote;
      });
      /* Modos */
      Array.prototype.forEach.call(elModes.querySelectorAll('button'), function (btn) {
        btn.classList.toggle('tm-on', btn.dataset.mode === bldMode);
        btn.disabled = !bldNote || bldAlt === null;
      });
    }

    /* Inicializa botones del builder (solo una vez) */
    NOTES.forEach(function (n) {
      var b = document.createElement('button');
      b.className = 'tmtab-bld-btn'; b.textContent = n; b.dataset.note = n;
      b.addEventListener('click', function () {
        bldNote = n; bldAlt = null; bldMode = '';
        refreshBuilderUI();
      });
      elNotes.appendChild(b);
    });
    ALTS.forEach(function (a) {
      var b = document.createElement('button');
      b.className = 'tmtab-bld-btn'; b.textContent = a.sym; b.dataset.alt = a.val;
      b.disabled = true;
      b.addEventListener('click', function () {
        bldAlt = a.val; bldMode = '';
        refreshBuilderUI();
      });
      elAlts.appendChild(b);
    });
    MODES.forEach(function (m) {
      var b = document.createElement('button');
      b.className = 'tmtab-bld-btn'; b.textContent = m; b.dataset.mode = m;
      b.disabled = true;
      b.addEventListener('click', function () {
        bldMode = m;
        refreshBuilderUI();
        /* Confirma automáticamente al elegir el modo */
        var label = bldNote + bldAlt + ' ' + m;
        confirmCell(label);
      });
      elModes.appendChild(b);
    });

    function openBuilder(idx) {
      activeCellIdx = idx;
      /* Restaura selección previa si la hubiera */
      var prev = cellValues[idx] || '';
      bldNote = ''; bldAlt = null; bldMode = '';
      if (prev) {
        /* Intenta recuperar nota/alt/modo del valor guardado */
        var parts = prev.split(' ');
        var modeStr = parts[parts.length - 1];
        if (modeStr === 'Mayor' || modeStr === 'menor') {
          bldMode = modeStr;
          var notePart = parts.slice(0, parts.length - 1).join(' ');
          ALTS.forEach(function (a) {
            if (a.val && notePart.slice(-a.val.length) === a.val) {
              bldAlt = a.val;
              bldNote = notePart.slice(0, notePart.length - a.val.length);
            }
          });
          if (bldAlt === null) { bldAlt = ''; bldNote = notePart; }
        }
      }
      refreshBuilderUI();
      elOv.classList.add('tm-show');
      elBld.classList.add('tm-show');
    }

    function closeBuilder() {
      elOv.classList.remove('tm-show');
      elBld.classList.remove('tm-show');
      activeCellIdx = -1;
    }

    function confirmCell(label) {
      cellValues[activeCellIdx] = label;
      var valEl = document.getElementById(uid + '_val_' + activeCellIdx);
      if (valEl) {
        valEl.textContent = label;
        valEl.classList.remove('tm-empty');
      }
      closeBuilder();
    }

    elOv.addEventListener('click', closeBuilder);
    document.getElementById(uid + '_bld_cancel').addEventListener('click', closeBuilder);

    /* ── Dificultad ─────────────────────────────────────────────────────── */
    function setDiff(d) {
      st.diff = d;
      ['easy', 'med', 'hard'].forEach(function (x) {
        document.getElementById(uid + '_d_' + x).className = 'tm-btn' + (x === d ? ' tm-on' : '');
      });
      st.total = 0; st.perfect = 0; st.points = 0; st.possible = 0; st.streak = 0; st.qnum = 0;
      updateStats(); nextQ();
    }
    document.getElementById(uid + '_d_easy').addEventListener('click', function () { setDiff('easy'); });
    document.getElementById(uid + '_d_med').addEventListener('click', function () { setDiff('med'); });
    document.getElementById(uid + '_d_hard').addEventListener('click', function () { setDiff('hard'); });
    document.getElementById(uid + '_submit').addEventListener('click', checkAnswer);
    elNxt.addEventListener('click', nextQ);

    function updateStats() {
      elTot.textContent  = st.total;
      elPerf.textContent = st.perfect;
      elPts.textContent  = st.possible > 0 ? st.points + '/' + st.possible : '—';
      elStr.textContent  = st.streak;
      elPbar.style.width = st.possible > 0 ? Math.round(st.points / st.possible * 100) + '%' : '0%';
    }

    function pickBase() {
      var pool;
      if (st.diff === 'easy') {
        pool = ALL.filter(function (t) { return t.key.pos >= -2 && t.key.pos <= 2; });
      } else if (st.diff === 'med') {
        pool = ALL.filter(function (t) { return t.key.pos >= -3 && t.key.pos <= 3; });
      } else {
        pool = ALL;
      }
      return rand(pool);
    }

    /* ── Renderiza la cuadrícula ─────────────────────────────────────────── */
    function renderGrid(grid, base) {
      var html = '<div class="tmtab-grid">';
      var inpIdx = 0;
      inputDefs  = [];
      cellValues = [];

      grid.forEach(function (cell) {
        if (cell === null) {
          html += '<div class="tmtab-cell tmtab-cell-base">' + base.label + '</div>';
        } else {
          html += '<div class="tmtab-cell">';
          html += '<div class="tmtab-cell-lbl">' + cell.rel + '</div>';
          html += '<div class="tmtab-cell-val tm-empty" id="' + uid + '_val_' + inpIdx + '" data-idx="' + inpIdx + '">toca</div>';
          html += '<div class="tm-hint" id="' + uid + '_hint_' + inpIdx + '" style="display:none"></div>';
          html += '</div>';
          inputDefs.push({ inpIdx: inpIdx, cell: cell });
          cellValues.push('');
          inpIdx++;
        }
      });

      html += '</div>';
      elGrid.innerHTML = html;

      inputDefs.forEach(function (def) {
        var valEl = document.getElementById(uid + '_val_' + def.inpIdx);
        valEl.addEventListener('click', function () {
          if (st.answered) return;
          openBuilder(def.inpIdx);
        });
      });
    }

    /* ── Comprobación ────────────────────────────────────────────────────── */
    function checkAnswer() {
      if (st.answered) return;
      st.answered = true;
      st.total++;
      st.possible += 5;

      var correct = 0;
      inputDefs.forEach(function (def) {
        var valEl = document.getElementById(uid + '_val_' + def.inpIdx);
        var hint  = document.getElementById(uid + '_hint_' + def.inpIdx);
        var given = cellValues[def.inpIdx] || '';
        if (normalize(given) === normalize(def.cell.ton.label)) {
          correct++;
          valEl.classList.add('tm-ok');
        } else {
          valEl.classList.add('tm-ko');
          hint.innerHTML = '→ ' + def.cell.ton.label;
          hint.style.display = 'block';
        }
      });

      st.points += correct;
      var isPerfect = correct === 5;
      if (isPerfect) { st.perfect++; st.streak++; } else { st.streak = 0; }
      updateStats();

      elSubmit.style.display = 'none';
      var cls = isPerfect ? 'tm-ok' : correct >= 3 ? 'tm-partial' : 'tm-ko';
      elFb.className = 'tm-fb ' + cls + ' tm-show';
      elFb.innerHTML = isPerfect
        ? '<strong>✓ ¡Tabla perfecta!</strong> Las 5 tonalidades vecinas son correctas.'
        : '<strong>' + correct + ' de 5 correctas.</strong> Las marcadas en rojo muestran la respuesta correcta debajo.';
      if (!isPerfect) {
        elCard.classList.add('tm-shake');
        setTimeout(function () { elCard.classList.remove('tm-shake'); }, 400);
      }
      elNxt.className = 'tm-nxt tm-show';
    }

    function nextQ() {
      st.answered = false;
      st.qnum++;
      var base = pickBase();
      cQ = { base: base, grid: getGrid(base) };
      elQnum.textContent     = st.qnum;
      elFb.className         = 'tm-fb';
      elNxt.className        = 'tm-nxt';
      elSubmit.style.display = 'block';
      renderGrid(cQ.grid, cQ.base);
    }

    nextQ();
  }

  /* ══════════════════════════════════════════════════════════════════════
     tmVecinaSonVecinas — ¿Son vecinas estas dos tonalidades? (sí / no)
  ══════════════════════════════════════════════════════════════════════ */
  function tmVecinaSonVecinas(containerId) {
    injectCSS('tmson-css', CSS_SON);
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tmson-wrap';
    var uid = containerId;

    wrap.innerHTML = [
      '<div class="tm-stats">',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_tot">0</div><div class="tm-sl">Preguntas</div></div>',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_cor">0</div><div class="tm-sl">Correctas</div></div>',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_pct">—</div><div class="tm-sl">Acierto</div></div>',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_str">0</div><div class="tm-sl">Racha</div></div>',
      '</div>',
      '<div class="tm-pbar-wrap"><div class="tm-pbar" id="' + uid + '_pbar"></div></div>',
      '<div class="tm-card" id="' + uid + '_card">',
        '<div class="tm-qlbl">Pregunta <span class="tm-qnum" id="' + uid + '_qnum">1</span></div>',
        '<div class="tm-qtxt">¿Son estas dos tonalidades <strong>vecinas</strong>?</div>',
        '<div class="tm-pair" id="' + uid + '_pair"></div>',
        '<div class="tm-yn">',
          '<button class="tm-yn-btn" id="' + uid + '_yes">✓&nbsp;&nbsp;Sí, son vecinas</button>',
          '<button class="tm-yn-btn" id="' + uid + '_no">✗&nbsp;&nbsp;No, son lejanas</button>',
        '</div>',
        '<div class="tm-fb" id="' + uid + '_fb"></div>',
        '<button class="tm-nxt" id="' + uid + '_nxt">Siguiente →</button>',
      '</div>'
    ].join('');

    var st = { total: 0, correct: 0, streak: 0, qnum: 0, answered: false };
    var cQ = null;

    var elTot  = document.getElementById(uid + '_tot');
    var elCor  = document.getElementById(uid + '_cor');
    var elPct  = document.getElementById(uid + '_pct');
    var elStr  = document.getElementById(uid + '_str');
    var elPbar = document.getElementById(uid + '_pbar');
    var elQnum = document.getElementById(uid + '_qnum');
    var elPair = document.getElementById(uid + '_pair');
    var elFb   = document.getElementById(uid + '_fb');
    var elNxt  = document.getElementById(uid + '_nxt');
    var elCard = document.getElementById(uid + '_card');
    var elYes  = document.getElementById(uid + '_yes');
    var elNo   = document.getElementById(uid + '_no');

    var ALL_SV = [];
    KEYS.forEach(function (k) {
      ALL_SV.push({ key: k, mode: 'maj', label: k.maj });
      ALL_SV.push({ key: k, mode: 'min', label: k.min });
    });

    elYes.addEventListener('click', function () { answer(true); });
    elNo.addEventListener('click', function () { answer(false); });
    elNxt.addEventListener('click', nextQ);

    function updateStats() {
      elTot.textContent = st.total;
      elCor.textContent = st.correct;
      elPct.textContent = st.total > 0 ? Math.round(st.correct / st.total * 100) + '%' : '—';
      elStr.textContent = st.streak;
      elPbar.style.width = st.total > 0 ? Math.round(st.correct / st.total * 100) + '%' : '0%';
    }

    function genQ() {
      var a = rand(ALL_SV);
      var neighbors    = ALL_SV.filter(function (x) { return isNeighbor(x, a); });
      var nonNeighbors = ALL_SV.filter(function (x) { return !isNeighbor(x, a) && x !== a; });
      var useNeighbor  = Math.random() > 0.45;
      var b, areNeighbors;
      if (useNeighbor && neighbors.length > 0) {
        b = rand(neighbors); areNeighbors = true;
      } else {
        b = rand(nonNeighbors); areNeighbors = false;
      }
      return { a: a, b: b, areNeighbors: areNeighbors };
    }

    function answer(userSaysYes) {
      if (st.answered) return;
      st.answered = true; st.total++;
      var correct = userSaysYes === cQ.areNeighbors;
      var rel = explainRelation(cQ.a, cQ.b);

      if (correct) {
        st.correct++; st.streak++;
        (userSaysYes ? elYes : elNo).classList.add('tm-ok');
        elFb.className = 'tm-fb tm-ok tm-show';
        elFb.innerHTML = (cQ.areNeighbors
          ? '<strong>✓ ¡Correcto! Sí son vecinas.</strong>'
          : '<strong>✓ ¡Correcto! No son vecinas.</strong>')
          + ' — <strong>' + cQ.a.label + '</strong> y <strong>' + cQ.b.label + '</strong> ' + rel;
      } else {
        st.streak = 0;
        (userSaysYes ? elYes : elNo).classList.add('tm-ko');
        (userSaysYes ? elNo : elYes).classList.add('tm-ok');
        elFb.className = 'tm-fb tm-ko tm-show';
        elFb.innerHTML = (cQ.areNeighbors
          ? '<strong>✗ Incorrecto. Sí son vecinas.</strong>'
          : '<strong>✗ Incorrecto. No son vecinas.</strong>')
          + ' — <strong>' + cQ.a.label + '</strong> y <strong>' + cQ.b.label + '</strong> ' + rel;
        elCard.classList.add('tm-shake');
        setTimeout(function () { elCard.classList.remove('tm-shake'); }, 400);
      }
      elYes.disabled = true;
      elNo.disabled  = true;
      updateStats();
      elNxt.className = 'tm-nxt tm-show';
    }

    function nextQ() {
      st.answered = false; st.qnum++;
      cQ = genQ();
      elQnum.textContent = st.qnum;
      elPair.innerHTML   = '<div class="tm-tag">' + cQ.a.label + '</div><div class="tm-vsep">↔</div><div class="tm-tag">' + cQ.b.label + '</div>';
      elFb.className     = 'tm-fb';
      elNxt.className    = 'tm-nxt';
      elYes.className    = 'tm-yn-btn'; elYes.disabled = false;
      elNo.className     = 'tm-yn-btn'; elNo.disabled  = false;
    }

    nextQ();
  }

  window.tmVecinaTabla      = tmVecinaTabla;
  window.tmVecinaSonVecinas = tmVecinaSonVecinas;
})();
