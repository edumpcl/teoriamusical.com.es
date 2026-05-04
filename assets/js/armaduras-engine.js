/* Motor de ejercicios de armaduras — identificar y dibujar */
(function () {
  'use strict';

  var KEYS = [
    { vex: "C",  maj: "Do Mayor",   min: "La menor",   seq: [] },
    { vex: "G",  maj: "Sol Mayor",  min: "Mi menor",   seq: ["f/5/#"] },
    { vex: "D",  maj: "Re Mayor",   min: "Si menor",   seq: ["f/5/#","c/5/#"] },
    { vex: "A",  maj: "La Mayor",   min: "Fa# menor",  seq: ["f/5/#","c/5/#","g/5/#"] },
    { vex: "E",  maj: "Mi Mayor",   min: "Do# menor",  seq: ["f/5/#","c/5/#","g/5/#","d/5/#"] },
    { vex: "B",  maj: "Si Mayor",   min: "Sol# menor", seq: ["f/5/#","c/5/#","g/5/#","d/5/#","a/4/#"] },
    { vex: "F#", maj: "Fa# Mayor",  min: "Re# menor",  seq: ["f/5/#","c/5/#","g/5/#","d/5/#","a/4/#","e/5/#"] },
    { vex: "C#", maj: "Do# Mayor",  min: "La# menor",  seq: ["f/5/#","c/5/#","g/5/#","d/5/#","a/4/#","e/5/#","b/4/#"] },
    { vex: "F",  maj: "Fa Mayor",   min: "Re menor",   seq: ["b/4/b"] },
    { vex: "Bb", maj: "Sib Mayor",  min: "Sol menor",  seq: ["b/4/b","e/5/b"] },
    { vex: "Eb", maj: "Mib Mayor",  min: "Do menor",   seq: ["b/4/b","e/5/b","a/4/b"] },
    { vex: "Ab", maj: "Lab Mayor",  min: "Fa menor",   seq: ["b/4/b","e/5/b","a/4/b","d/5/b"] },
    { vex: "Db", maj: "Reb Mayor",  min: "Sib menor",  seq: ["b/4/b","e/5/b","a/4/b","d/5/b","g/4/b"] },
    { vex: "Gb", maj: "Solb Mayor", min: "Mib menor",  seq: ["b/4/b","e/5/b","a/4/b","d/5/b","g/4/b","c/5/b"] },
    { vex: "Cb", maj: "Dob Mayor",  min: "Lab menor",  seq: ["b/4/b","e/5/b","a/4/b","d/5/b","g/4/b","c/5/b","f/4/b"] }
  ];

  var LANES = [
    { pitch: "g/5", line: -0.5 },
    { pitch: "f/5", line: 0 },
    { pitch: "e/5", line: 0.5 },
    { pitch: "d/5", line: 1 },
    { pitch: "c/5", line: 1.5 },
    { pitch: "b/4", line: 2 },
    { pitch: "a/4", line: 2.5 },
    { pitch: "g/4", line: 3 },
    { pitch: "f/4", line: 3.5 },
    { pitch: "e/4", line: 4 }
  ];

  function waitVex(cb) {
    if (typeof Vex !== 'undefined') { cb(); return; }
    var i = 0, iv = setInterval(function () {
      i++;
      if (typeof Vex !== 'undefined') { clearInterval(iv); cb(); }
      else if (i > 30) clearInterval(iv);
    }, 200);
  }

  /* ── CSS compartido ─────────────────────────────────────────────────────── */
  var CSS_IDENTIFICAR = [
    '.tmar-wrap{font-family:inherit;color:inherit;width:100%;margin:0 auto;}',
    '.tmar-wrap *{box-sizing:border-box;margin:0;padding:0;}',
    '.tmar-wrap .tm-controls{display:flex;gap:8px;align-items:center;margin-bottom:18px;flex-wrap:wrap;}',
    '.tmar-wrap .tm-lbl{font-size:.75rem;color:#999;letter-spacing:.08em;text-transform:uppercase;}',
    '.tmar-wrap .tm-btn{font-size:.78rem;padding:6px 14px;border:1px solid #d8d0b8;background:#fff;color:#999;cursor:pointer;border-radius:3px;transition:all .15s;font-family:inherit;}',
    '.tmar-wrap .tm-btn:hover{border-color:#8b6914;color:#8b6914;}',
    '.tmar-wrap .tm-btn.tm-on{background:#8b6914;color:#fff;border-color:#8b6914;font-weight:600;}',
    '.tmar-wrap .tm-stats{display:flex;border:1px solid #d8d0b8;border-radius:3px;overflow:hidden;margin-bottom:18px;background:#fff;}',
    '.tmar-wrap .tm-stat{flex:1;padding:9px 8px;border-right:1px solid #d8d0b8;text-align:center;}',
    '.tmar-wrap .tm-stat:last-child{border-right:none;}',
    '.tmar-wrap .tm-sv{font-size:1.5rem;font-weight:700;color:#8b6914;line-height:1;}',
    '.tmar-wrap .tm-sl{font-size:.6rem;color:#aaa;letter-spacing:.06em;text-transform:uppercase;margin-top:2px;}',
    '.tmar-wrap .tm-pbar-wrap{height:3px;background:#e8e0cc;border-radius:2px;overflow:hidden;margin-bottom:18px;}',
    '.tmar-wrap .tm-pbar{height:100%;background:linear-gradient(90deg,#8b6914,#2a7a6e);transition:width .4s;width:0%;}',
    '.tmar-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:4px;padding:24px 20px 20px;margin-bottom:16px;position:relative;overflow:hidden;}',
    '.tmar-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#8b6914,#2a7a6e);}',
    '.tmar-wrap .tm-qlbl{font-size:.68rem;color:#aaa;letter-spacing:.1em;text-transform:uppercase;margin-bottom:7px;}',
    '.tmar-wrap .tm-qnum{color:#8b6914;font-weight:700;}',
    '.tmar-wrap .tm-qtxt{font-size:1.1rem;font-weight:600;margin-bottom:20px;}',
    '.tmar-wrap .tm-staff-wrap{display:flex;justify-content:center;align-items:center;margin-bottom:18px;background:#f5f2ea;border:1px solid #e0d8c0;border-radius:3px;padding:10px;min-height:120px;}',
    '.tmar-wrap .tm-staff-wrap svg{display:block;}',
    '.tmar-wrap .tm-opts-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;}',
    '.tmar-wrap .tm-opt{font-size:.88rem;font-weight:500;padding:10px 15px;border:1px solid #d8d0b8;background:#fdfcf9;color:#1a1a1a;cursor:pointer;border-radius:3px;transition:all .15s;text-align:left;font-family:inherit;position:relative;overflow:hidden;}',
    '.tmar-wrap .tm-opt::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:#8b6914;transform:scaleY(0);transition:transform .15s;}',
    '.tmar-wrap .tm-opt:hover:not(:disabled):not(.tm-ok):not(.tm-ko){border-color:#8b6914;}',
    '.tmar-wrap .tm-opt:hover:not(:disabled):not(.tm-ok):not(.tm-ko)::before{transform:scaleY(1);}',
    '.tmar-wrap .tm-opt.tm-ok{border-color:#27ae60;background:rgba(39,174,96,.08);color:#1e8449;}',
    '.tmar-wrap .tm-opt.tm-ok::before{background:#27ae60;transform:scaleY(1);}',
    '.tmar-wrap .tm-opt.tm-ko{border-color:#c0392b;background:rgba(192,57,43,.07);color:#a93226;}',
    '.tmar-wrap .tm-opt.tm-ko::before{background:#c0392b;transform:scaleY(1);}',
    '.tmar-wrap .tm-opt:disabled{cursor:default;}',
    '.tmar-wrap .tm-fb{display:none;margin-top:14px;padding:11px 14px;border-radius:3px;font-size:.86rem;line-height:1.6;}',
    '.tmar-wrap .tm-fb.tm-show{display:block;}',
    '.tmar-wrap .tm-fb.tm-ok{background:rgba(39,174,96,.08);border:1px solid rgba(39,174,96,.3);color:#1e8449;}',
    '.tmar-wrap .tm-fb.tm-ko{background:rgba(192,57,43,.07);border:1px solid rgba(192,57,43,.3);color:#a93226;}',
    '.tmar-wrap .tm-nxt{display:none;width:100%;margin-top:12px;padding:11px;font-size:.82rem;letter-spacing:.07em;text-transform:uppercase;background:#8b6914;color:#fff;border:none;border-radius:3px;cursor:pointer;font-weight:600;font-family:inherit;transition:opacity .15s;}',
    '.tmar-wrap .tm-nxt:hover{opacity:.85;}',
    '.tmar-wrap .tm-nxt.tm-show{display:block;}'
  ].join('');

  var CSS_DIBUJAR = [
    '.tmdib-wrap{font-family:inherit;color:inherit;width:100%;margin:0 auto;}',
    '.tmdib-wrap *{box-sizing:border-box;margin:0;padding:0;}',
    '.tmdib-wrap .tm-stats{display:flex;border:1px solid #d8d0b8;border-radius:3px;overflow:hidden;margin-bottom:18px;background:#fff;}',
    '.tmdib-wrap .tm-stat{flex:1;padding:9px 8px;border-right:1px solid #d8d0b8;text-align:center;}',
    '.tmdib-wrap .tm-stat:last-child{border-right:none;}',
    '.tmdib-wrap .tm-sv{font-size:1.5rem;font-weight:700;color:#8b6914;line-height:1;}',
    '.tmdib-wrap .tm-sl{font-size:.6rem;color:#aaa;letter-spacing:.06em;text-transform:uppercase;margin-top:2px;}',
    '.tmdib-wrap .tm-pbar-wrap{height:3px;background:#e8e0cc;border-radius:2px;overflow:hidden;margin-bottom:18px;}',
    '.tmdib-wrap .tm-pbar{height:100%;background:linear-gradient(90deg,#8b6914,#2a7a6e);transition:width .4s;width:0%;}',
    '.tmdib-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:4px;padding:24px 20px 20px;margin-bottom:16px;position:relative;overflow:hidden;}',
    '.tmdib-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#8b6914,#2a7a6e);}',
    '.tmdib-wrap .tm-qlbl{font-size:.68rem;color:#aaa;letter-spacing:.1em;text-transform:uppercase;margin-bottom:7px;}',
    '.tmdib-wrap .tm-qnum{color:#8b6914;font-weight:700;}',
    '.tmdib-wrap .tm-qtxt{font-size:1.2rem;font-weight:700;margin-bottom:5px;}',
    '.tmdib-wrap .tm-qsub{font-size:0.85rem;color:#666;margin-bottom:15px;line-height:1.4;}',
    '.tmdib-wrap .tm-tools{display:flex;gap:8px;margin-bottom:15px;justify-content:center;}',
    '.tmdib-wrap .tm-tool{flex:1;padding:12px;font-size:1.1rem;font-weight:600;background:#f5f2ea;border:2px solid #e0d8c0;color:#666;border-radius:4px;cursor:pointer;transition:all 0.2s;}',
    '.tmdib-wrap .tm-tool.tm-active{background:rgba(139,105,20,0.1);border-color:#8b6914;color:#8b6914;transform:scale(1.02);}',
    '.tmdib-wrap .tm-staff-wrap{position:relative;margin-bottom:15px;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:4px;padding:15px 0;min-height:160px;display:flex;justify-content:center;overflow:hidden;cursor:crosshair;user-select:none;touch-action:none;}',
    '.tmdib-wrap .tm-staff-wrap.tm-answered{cursor:default;}',
    '.tmdib-wrap .tm-notacion{position:relative;width:100%;display:flex;justify-content:center;pointer-events:none;}',
    '.tmdib-wrap .tm-ghost{position:absolute;pointer-events:none;opacity:0.5;font-size:36px;font-family:serif;font-weight:700;color:#1a1a1a;z-index:20;line-height:1;transform:translate(-50%,-50%);}',
    '.tmdib-wrap .tm-highlight{position:absolute;left:0;right:0;height:12px;background:rgba(139,105,20,0.1);pointer-events:none;z-index:5;border-top:1px dashed rgba(139,105,20,0.2);border-bottom:1px dashed rgba(139,105,20,0.2);}',
    '.tmdib-wrap .tm-actions{display:flex;gap:10px;margin-bottom:18px;}',
    '.tmdib-wrap .tm-btn-undo{flex:1;padding:10px;font-size:0.85rem;background:#e8e0cc;color:#555;border:none;border-radius:4px;cursor:pointer;font-weight:600;}',
    '.tmdib-wrap .tm-btn-undo:hover{background:#d8d0b8;}',
    '.tmdib-wrap .tm-submit{width:100%;padding:12px;font-size:0.95rem;text-transform:uppercase;letter-spacing:.05em;background:#8b6914;color:#fff;border:none;border-radius:4px;cursor:pointer;font-weight:700;transition:opacity 0.2s;}',
    '.tmdib-wrap .tm-submit:hover{opacity:0.9;}',
    '.tmdib-wrap .tm-fb{display:none;margin-top:14px;padding:14px;border-radius:4px;font-size:0.95rem;line-height:1.5;}',
    '.tmdib-wrap .tm-fb.tm-show{display:block;}',
    '.tmdib-wrap .tm-fb.tm-ok{background:rgba(39,174,96,.1);border:1px solid rgba(39,174,96,.4);color:#196f3d;}',
    '.tmdib-wrap .tm-fb.tm-ko{background:rgba(192,57,43,.08);border:1px solid rgba(192,57,43,.4);color:#922b21;}',
    '.tmdib-wrap .tm-nxt{display:none;width:100%;margin-top:15px;padding:12px;font-size:0.95rem;letter-spacing:.05em;text-transform:uppercase;background:#2a7a6e;color:#fff;border:none;border-radius:4px;cursor:pointer;font-weight:700;}',
    '.tmdib-wrap .tm-nxt:hover{opacity:0.9;}',
    '.tmdib-wrap .tm-nxt.tm-show{display:block;}',
    '@keyframes tmdib-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translateX(-2px)}80%{transform:translateX(2px)}}',
    '.tmdib-wrap .tm-shake{animation:tmdib-shake 0.4s ease;}',
    '@media(max-width:480px){.tmdib-wrap .tm-tool{font-size:.9rem;padding:10px 6px;white-space:nowrap;}}',
    '.tmdib-wrap .tm-loupe{position:fixed;display:none;pointer-events:none;z-index:9999;background:#fdfcf9;border:2px solid #333;border-radius:12px;padding:6px 8px;box-shadow:0 8px 28px rgba(0,0,0,0.35);transform:translate(-50%,calc(-100% - 18px));}',
    '.tmdib-wrap .tm-loupe::after{content:"";position:absolute;bottom:-13px;left:50%;transform:translateX(-50%);border:11px solid transparent;border-top-color:#333;border-bottom:none;}',
    '.tmdib-wrap .tm-loupe::before{content:"";position:absolute;bottom:-9px;left:50%;transform:translateX(-50%);border:9px solid transparent;border-top-color:#fdfcf9;border-bottom:none;z-index:1;}',
    '.tmdib-wrap .tm-loupe-staff{line-height:0;}'
  ].join('');

  function injectCSS(id, css) {
    if (document.getElementById(id)) return;
    var s = document.createElement('style');
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ══════════════════════════════════════════════════════════════════════════
     tmArIdentificar — Identificar la tonalidad de una armadura
  ══════════════════════════════════════════════════════════════════════════ */
  function tmArIdentificar(containerId) {
    injectCSS('tmar-css', CSS_IDENTIFICAR);
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tmar-wrap';
    var uid = containerId;

    wrap.innerHTML = [
      '<div class="tm-controls">',
        '<div class="tm-lbl">Dificultad:</div>',
        '<button class="tm-btn tm-on" id="' + uid + '_d_easy">Fácil</button>',
        '<button class="tm-btn" id="' + uid + '_d_med">Medio</button>',
        '<button class="tm-btn" id="' + uid + '_d_hard">Difícil</button>',
      '</div>',
      '<div class="tm-stats">',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_tot">0</div><div class="tm-sl">Preguntas</div></div>',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_cor">0</div><div class="tm-sl">Correctas</div></div>',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_pct">—</div><div class="tm-sl">Acierto</div></div>',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_str">0</div><div class="tm-sl">Racha</div></div>',
      '</div>',
      '<div class="tm-pbar-wrap"><div class="tm-pbar" id="' + uid + '_pbar"></div></div>',
      '<div class="tm-card" id="' + uid + '_card">',
        '<div class="tm-qlbl">Pregunta <span class="tm-qnum" id="' + uid + '_qnum">1</span></div>',
        '<div class="tm-qtxt" id="' + uid + '_quest">¿Cuál es la Tonalidad MAYOR?</div>',
        '<div class="tm-staff-wrap"><div id="' + uid + '_staff"></div></div>',
        '<div class="tm-opts-grid" id="' + uid + '_opts"></div>',
        '<div class="tm-fb" id="' + uid + '_fb"></div>',
        '<button class="tm-nxt" id="' + uid + '_nxt">Siguiente →</button>',
      '</div>'
    ].join('');

    var st = { total: 0, correct: 0, streak: 0, qnum: 0, answered: false, diff: 'easy' };
    var cQ = null;

    var elTot  = document.getElementById(uid + '_tot');
    var elCor  = document.getElementById(uid + '_cor');
    var elPct  = document.getElementById(uid + '_pct');
    var elStr  = document.getElementById(uid + '_str');
    var elPbar = document.getElementById(uid + '_pbar');
    var elQnum = document.getElementById(uid + '_qnum');
    var elQuest = document.getElementById(uid + '_quest');
    var elStaff = document.getElementById(uid + '_staff');
    var elOpts = document.getElementById(uid + '_opts');
    var elFb   = document.getElementById(uid + '_fb');
    var elNxt  = document.getElementById(uid + '_nxt');
    var elCard = document.getElementById(uid + '_card');

    function setDiff(d) {
      st.diff = d;
      ['easy','med','hard'].forEach(function (x) {
        document.getElementById(uid + '_d_' + x).className = 'tm-btn' + (x === d ? ' tm-on' : '');
      });
      st.total = 0; st.correct = 0; st.streak = 0; st.qnum = 0;
      updateStats();
      nextQ();
    }

    document.getElementById(uid + '_d_easy').addEventListener('click', function () { setDiff('easy'); });
    document.getElementById(uid + '_d_med').addEventListener('click', function () { setDiff('med'); });
    document.getElementById(uid + '_d_hard').addEventListener('click', function () { setDiff('hard'); });
    elNxt.addEventListener('click', nextQ);

    function updateStats() {
      elTot.textContent = st.total;
      elCor.textContent = st.correct;
      elPct.textContent = st.total > 0 ? Math.round(st.correct / st.total * 100) + '%' : '—';
      elStr.textContent = st.streak;
      elPbar.style.width = st.total > 0 ? Math.round(st.correct / st.total * 100) + '%' : '0%';
    }

    function genQ() {
      var base = KEYS[Math.floor(Math.random() * KEYS.length)];
      var askMinor = st.diff !== 'easy' && Math.random() > 0.5;
      var correctLabel = askMinor ? base.min : base.maj;
      var wrongPool = KEYS.filter(function (k) { return k.vex !== base.vex; });
      var wrongs = wrongPool.sort(function () { return Math.random() - 0.5; }).slice(0, 3);
      var opts = [{ label: correctLabel, ok: true }].concat(wrongs.map(function (k) {
        return { label: askMinor ? k.min : k.maj, ok: false };
      })).sort(function () { return Math.random() - 0.5; });
      return { keyDef: base, askMinor: askMinor, opts: opts };
    }

    function renderStaff(q) {
      elStaff.innerHTML = '';
      var VF = Vex.Flow;
      var rend = new VF.Renderer(elStaff, VF.Renderer.Backends.SVG);
      rend.resize(200, 130);
      var ctx = rend.getContext();
      ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var clef = 'treble';
      if (st.diff === 'hard') {
        clef = ['treble','bass','alto'][Math.floor(Math.random() * 3)];
      }
      var stave = new VF.Stave(10, 25, 180);
      stave.addClef(clef).addKeySignature(q.keyDef.vex);
      stave.setContext(ctx).draw();
    }

    function nextQ() {
      st.answered = false;
      st.qnum++;
      cQ = genQ();
      elQnum.textContent = st.qnum;
      elQuest.textContent = cQ.askMinor ? '¿Cuál es la Tonalidad MENOR?' : '¿Cuál es la Tonalidad MAYOR?';
      elFb.className = 'tm-fb';
      elNxt.className = 'tm-nxt';
      renderStaff(cQ);
      elOpts.innerHTML = '';
      cQ.opts.forEach(function (o) {
        var b = document.createElement('button');
        b.className = 'tm-opt';
        b.textContent = o.label;
        b.addEventListener('click', function () {
          if (st.answered) return;
          st.answered = true; st.total++;
          if (o.ok) {
            st.correct++; st.streak++;
            b.classList.add('tm-ok');
            elFb.className = 'tm-fb tm-ok tm-show';
            elFb.innerHTML = '<strong>✓ ¡Correcto!</strong> — Exacto, es <strong>' + o.label + '</strong>.';
          } else {
            st.streak = 0;
            b.classList.add('tm-ko');
            var realAns = cQ.askMinor ? cQ.keyDef.min : cQ.keyDef.maj;
            elOpts.querySelectorAll('.tm-opt').forEach(function (x) {
              if (x.textContent === realAns) x.classList.add('tm-ok');
            });
            elFb.className = 'tm-fb tm-ko tm-show';
            elFb.innerHTML = '<strong>✗ Incorrecto</strong> — La respuesta correcta era: <strong>' + realAns + '</strong>.';
            elCard.classList.add('tm-shake');
            setTimeout(function () { elCard.classList.remove('tm-shake'); }, 400);
          }
          elOpts.querySelectorAll('.tm-opt').forEach(function (x) { x.disabled = true; });
          updateStats();
          elNxt.className = 'tm-nxt tm-show';
        });
        elOpts.appendChild(b);
      });
    }

    waitVex(nextQ);
  }

  /* ══════════════════════════════════════════════════════════════════════════
     tmArDibujar — Dibujar la armadura en el pentagrama
  ══════════════════════════════════════════════════════════════════════════ */
  function tmArDibujar(containerId) {
    injectCSS('tmdib-css', CSS_DIBUJAR);
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tmdib-wrap';
    var uid = containerId;

    wrap.innerHTML = [
      '<div class="tm-stats">',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_tot">0</div><div class="tm-sl">Total</div></div>',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_cor">0</div><div class="tm-sl">Correctas</div></div>',
        '<div class="tm-stat"><div class="tm-sv" id="' + uid + '_str">0</div><div class="tm-sl">Racha</div></div>',
      '</div>',
      '<div class="tm-pbar-wrap"><div class="tm-pbar" id="' + uid + '_pbar"></div></div>',
      '<div class="tm-card" id="' + uid + '_card">',
        '<div class="tm-qlbl">Ejercicio <span class="tm-qnum" id="' + uid + '_qnum">1</span></div>',
        '<div class="tm-qtxt" id="' + uid + '_quest">Dibuja la armadura de: --</div>',
        '<div class="tm-qsub"><strong>Instrucciones:</strong> Elige qué añadir (sostenido o bemol) y luego <strong>toca la línea o espacio del pentagrama</strong> para colocarlo. ¡Recuerda seguir el orden horizontal estricto!</div>',
        '<div class="tm-tools">',
          '<button class="tm-tool tm-active" id="' + uid + '_tool_sharp">Sostenidos ( # )</button>',
          '<button class="tm-tool" id="' + uid + '_tool_flat">Bemoles ( b )</button>',
        '</div>',
        '<div class="tm-staff-wrap" id="' + uid + '_staffwrap">',
          '<div class="tm-notacion" id="' + uid + '_notacion"></div>',
          '<div id="' + uid + '_ghost" class="tm-ghost" style="display:none"></div>',
          '<div id="' + uid + '_highlight" class="tm-highlight" style="display:none"></div>',
        '</div>',
        '<div class="tm-actions">',
          '<button class="tm-btn-undo" id="' + uid + '_undo">↶ Deshacer</button>',
          '<button class="tm-btn-undo" id="' + uid + '_clear">🧹 Borrar todo</button>',
        '</div>',
        '<button class="tm-submit" id="' + uid + '_submit">Comprobar Dibujo</button>',
        '<div class="tm-fb" id="' + uid + '_fb"></div>',
        '<button class="tm-nxt" id="' + uid + '_nxt">Siguiente Tonalidad →</button>',
      '</div>',
      '<div class="tm-loupe" id="' + uid + '_loupe">',
        '<div class="tm-loupe-staff" id="' + uid + '_lstaff"></div>',
      '</div>'
    ].join('');

    var st = { total: 0, correct: 0, streak: 0, qnum: 0, answered: false };
    var activeTool = '#';
    var userDrawing = [];
    var currentQ = null;
    var currentStave = null;

    var elTot    = document.getElementById(uid + '_tot');
    var elCor    = document.getElementById(uid + '_cor');
    var elStr    = document.getElementById(uid + '_str');
    var elPbar   = document.getElementById(uid + '_pbar');
    var elQnum   = document.getElementById(uid + '_qnum');
    var elQuest  = document.getElementById(uid + '_quest');
    var elNotac  = document.getElementById(uid + '_notacion');
    var elWrap   = document.getElementById(uid + '_staffwrap');
    var elGhost  = document.getElementById(uid + '_ghost');
    var elHigh   = document.getElementById(uid + '_highlight');
    var elFb     = document.getElementById(uid + '_fb');
    var elNxt    = document.getElementById(uid + '_nxt');
    var elSubmit = document.getElementById(uid + '_submit');
    var elCard   = document.getElementById(uid + '_card');
    var elLoupe  = document.getElementById(uid + '_loupe');
    var elLstaff = document.getElementById(uid + '_lstaff');
    var lastLoupeKey = null;

    document.getElementById(uid + '_tool_sharp').addEventListener('click', function () { setTool('#'); });
    document.getElementById(uid + '_tool_flat').addEventListener('click', function () { setTool('b'); });
    document.getElementById(uid + '_undo').addEventListener('click', function () {
      if (st.answered) return;
      if (userDrawing.length > 0) { userDrawing.pop(); renderM(); }
    });
    document.getElementById(uid + '_clear').addEventListener('click', function () {
      if (st.answered) return;
      userDrawing = []; renderM();
    });
    elSubmit.addEventListener('click', checkAnswer);
    elNxt.addEventListener('click', nextQ);

    function setTool(tool) {
      if (st.answered) return;
      activeTool = tool;
      lastLoupeKey = null;
      document.getElementById(uid + '_tool_sharp').className = 'tm-tool' + (tool === '#' ? ' tm-active' : '');
      document.getElementById(uid + '_tool_flat').className = 'tm-tool' + (tool === 'b' ? ' tm-active' : '');
    }

    function updateScore() {
      elTot.textContent = st.total;
      elCor.textContent = st.correct;
      elStr.textContent = st.streak;
      if (st.total > 0) elPbar.style.width = Math.round(st.correct / st.total * 100) + '%';
    }

    function addNote(pitch) {
      if (st.answered || userDrawing.length >= 7) return;
      userDrawing.push(pitch + '/' + activeTool);
      renderM();
    }

    function renderM() {
      elNotac.innerHTML = '';
      if (typeof Vex === 'undefined') return;
      var VF = Vex.Flow;
      var rend = new VF.Renderer(elNotac, VF.Renderer.Backends.SVG);
      var totalW = Math.min(elNotac.offsetWidth || elWrap.offsetWidth || 500, 500);
      if (totalW < 200) totalW = 200;
      var staveW = totalW - 20;
      rend.resize(totalW, 140);
      var ctx = rend.getContext();
      ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new VF.Stave(10, 30, staveW);
      stave.addClef('treble');
      stave.setContext(ctx).draw();
      currentStave = stave;
      if (userDrawing.length === 0) return;
      var tickables = userDrawing.map(function (val) {
        var parts = val.split('/');
        var pitch = parts[0] + '/' + parts[1];
        var alt = parts[2];
        var note = new VF.StaveNote({ keys: [pitch], duration: 'w' });
        note.setStyle({ fillStyle: 'transparent', strokeStyle: 'transparent' });
        var acc = new VF.Accidental(alt);
        if (acc.setStyle) acc.setStyle({ fillStyle: '#1a1a1a', strokeStyle: '#1a1a1a' });
        note.addModifier(acc, 0);
        return note;
      });
      var voice = new VF.Voice({ num_beats: userDrawing.length, beat_value: 4 }).setStrict(false);
      voice.addTickables(tickables);
      new VF.Formatter().joinVoices([voice]).format([voice], Math.max(staveW - 120, 80));
      voice.draw(ctx, stave);
    }

    function renderLoupeStaff(pitch, accType) {
      var key = pitch + accType;
      if (key === lastLoupeKey) return;
      lastLoupeKey = key;
      elLstaff.innerHTML = '';
      if (typeof Vex === 'undefined') return;
      var VF = Vex.Flow;
      var rend = new VF.Renderer(elLstaff, VF.Renderer.Backends.SVG);
      rend.resize(300, 120);
      var ctx = rend.getContext();
      ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new VF.Stave(10, 20, 280);
      stave.addClef('treble');
      stave.setContext(ctx).draw();
      var note = new VF.StaveNote({ keys: [pitch], duration: 'w' });
      note.setStyle({ fillStyle: 'transparent', strokeStyle: 'transparent' });
      var acc = new VF.Accidental(accType);
      if (acc.setStyle) acc.setStyle({ fillStyle: '#1a1a1a', strokeStyle: '#1a1a1a' });
      note.addModifier(acc, 0);
      var voice = new VF.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false);
      voice.addTickables([note]);
      new VF.Formatter().joinVoices([voice]).format([voice], 180);
      voice.draw(ctx, stave);
      var svg = elLstaff.querySelector('svg');
      if (svg) { svg.setAttribute('viewBox','0 0 300 120'); svg.setAttribute('width','180'); svg.setAttribute('height','72'); }
    }

    function attachStaffListener() {
      var isDragging = false;
      var currentBest = null;

      function updatePreview(e) {
        if (!isDragging || st.answered || !currentStave) return;
        var wrapRect = elWrap.getBoundingClientRect();
        var clientX = e.touches ? e.changedTouches[0].clientX : e.clientX;
        var clientY = e.touches ? e.changedTouches[0].clientY : e.clientY;
        var relY = clientY - wrapRect.top - (e.touches ? 40 : 0);
        var relX = clientX - wrapRect.left;
        var svgElem = elNotac.querySelector('svg');
        var svgOffsetY = svgElem ? (svgElem.getBoundingClientRect().top - wrapRect.top) : 15;
        var best = null, bestDist = 9999;
        LANES.forEach(function (lane) {
          var laneY = svgOffsetY + currentStave.getYForLine(lane.line);
          var dist = Math.abs(relY - laneY);
          if (dist < bestDist) { bestDist = dist; best = lane; }
        });
        if (best && bestDist < 30) {
          currentBest = best;
          var finalY = svgOffsetY + currentStave.getYForLine(best.line);
          elGhost.style.display = 'block';
          elGhost.style.top = finalY + 'px';
          elGhost.style.left = relX + 'px';
          elGhost.textContent = activeTool === '#' ? '♯' : '♭';
          elHigh.style.display = 'block';
          elHigh.style.top = (finalY - 6) + 'px';
          /* lupa encima del dedo */
          elLoupe.style.left = clientX + 'px';
          elLoupe.style.top  = clientY + 'px';
          elLoupe.style.display = 'block';
          renderLoupeStaff(best.pitch, activeTool);
        } else {
          currentBest = null;
          elGhost.style.display = 'none';
          elHigh.style.display = 'none';
          elLoupe.style.display = 'none';
        }
      }

      function startAction(e) {
        if (st.answered) return;
        isDragging = true;
        updatePreview(e);
      }

      function endAction() {
        if (!isDragging) return;
        if (currentBest && !st.answered) addNote(currentBest.pitch);
        isDragging = false;
        currentBest = null;
        lastLoupeKey = null;
        elGhost.style.display = 'none';
        elHigh.style.display = 'none';
        elLoupe.style.display = 'none';
      }

      elWrap.addEventListener('mousedown', startAction);
      window.addEventListener('mousemove', updatePreview);
      window.addEventListener('mouseup', endAction);
      elWrap.addEventListener('touchstart', function (e) { e.preventDefault(); startAction(e); }, { passive: false });
      elWrap.addEventListener('touchmove', function (e) { e.preventDefault(); updatePreview(e); }, { passive: false });
      elWrap.addEventListener('touchend', function (e) { e.preventDefault(); endAction(); }, { passive: false });
    }

    function checkAnswer() {
      if (st.answered) return;
      st.answered = true; st.total++;
      var isOk = userDrawing.length === currentQ.seq.length;
      if (isOk) {
        for (var i = 0; i < currentQ.seq.length; i++) {
          if (userDrawing[i] !== currentQ.seq[i]) { isOk = false; break; }
        }
      }
      if (isOk) {
        st.correct++; st.streak++;
        elFb.className = 'tm-fb tm-ok tm-show';
        elFb.innerHTML = '<strong>✓ ¡Dibujo Perfecto!</strong> — Has colocado cada alteración en su sitio exacto y orden correcto.';
      } else {
        st.streak = 0;
        elFb.className = 'tm-fb tm-ko tm-show';
        if (currentQ.seq.length === 0) {
          elFb.innerHTML = '<strong>✗ Te has equivocado</strong> — ' + currentQ.maj + ' no tiene NINGUNA alteración.';
        } else {
          var sol = currentQ.seq.map(function (s) {
            var p = s.split('/');
            return p[0].toUpperCase() + (p[2] === '#' ? ' Sostenido' : ' Bemol');
          }).join(', ');
          elFb.innerHTML = '<strong>✗ Dibujo Incorrecto</strong> — En solfeo el orden importa.<br><br>👉 La solución era: <strong>' + sol + '</strong>.';
        }
        elCard.classList.add('tm-shake');
        setTimeout(function () { elCard.classList.remove('tm-shake'); }, 400);
      }
      elWrap.classList.add('tm-answered');
      elSubmit.style.display = 'none';
      elNxt.className = 'tm-nxt tm-show';
      updateScore();
    }

    function nextQ() {
      currentQ = KEYS[Math.floor(Math.random() * KEYS.length)];
      st.answered = false; st.qnum++;
      userDrawing = [];
      elQnum.textContent = st.qnum;
      elQuest.innerHTML = 'Dibuja la armadura de: <strong>' + currentQ.maj + '</strong>';
      elFb.className = 'tm-fb';
      elNxt.className = 'tm-nxt';
      elSubmit.style.display = 'block';
      elWrap.classList.remove('tm-answered');
      renderM();
    }

    attachStaffListener();
    waitVex(nextQ);
  }

  window.tmArIdentificar = tmArIdentificar;
  window.tmArDibujar = tmArDibujar;
})();
