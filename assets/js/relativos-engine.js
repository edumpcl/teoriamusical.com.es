/* Motor: relativo mayor y relativo menor (nov-2026).
   Pregunta corta de examen: «¿Cuál es el relativo menor de La M?» / «¿Cuál es el relativo mayor de Sol m?».
   Se responde eligiendo la nota y su alteración; al corregir se dibuja la armadura que comparten las dos tonalidades.
   Uso: tmRelativos('id') */
(function () {
  'use strict';

  var EN = document.documentElement.lang === 'en';
  var T = function (es, en) { return EN ? en : es; };
  var NOM = EN ? ['C', 'D', 'E', 'F', 'G', 'A', 'B'] : ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
  var ACC = { '-1': '♭', '0': '', '1': '♯' };

  /* Las 15 armaduras (de 7 bemoles a 7 sostenidos): tónica mayor y tónica menor relativa, como [letra 0-6, alteración] */
  var ARM = [
    [-7, [0, -1], [5, -1]], [-6, [4, -1], [2, -1]], [-5, [1, -1], [6, -1]], [-4, [5, -1], [3, 0]], [-3, [2, -1], [0, 0]],
    [-2, [6, -1], [4, 0]], [-1, [3, 0], [1, 0]], [0, [0, 0], [5, 0]], [1, [4, 0], [2, 0]], [2, [1, 0], [6, 0]],
    [3, [5, 0], [3, 1]], [4, [2, 0], [0, 1]], [5, [6, 0], [4, 1]], [6, [3, 1], [1, 1]], [7, [0, 1], [5, 1]]
  ];
  function nombre(t) { return NOM[t[0]] + ACC[String(t[1])]; }
  function tonalidad(t, mayor) { return nombre(t) + (EN ? (mayor ? ' major' : ' minor') : (mayor ? ' M' : ' m')); }
  function tonalidadLarga(t, mayor) { return nombre(t) + (EN ? (mayor ? ' major' : ' minor') : (mayor ? ' mayor' : ' menor')); }

  var NIVELES = [
    { id: 'easy',   lbl: T('F\xe1cil', 'Easy'),   icon: '☀️', desc: T('Hasta 2 alteraciones', 'Up to 2 sharps or flats'), max: 2 },
    { id: 'medium', lbl: T('Medio', 'Medium'),    icon: '⚡',       desc: T('Hasta 4 alteraciones', 'Up to 4 sharps or flats'), max: 4 },
    { id: 'hard',   lbl: T('Dif\xedcil', 'Hard'), icon: '🔥', desc: T('Las 30 tonalidades', 'All 30 keys'),              max: 7 }
  ];
  var PREGUNTAS = 10;

  var CSS = [
    '.tm-rel-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:24px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,0.05);}',
    '.tm-rel-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-rel-wrap .tm-rel-q{font-size:1.2rem;text-align:center;margin:12px 0 16px;color:#1a1a1a;}.tm-rel-wrap .tm-rel-q strong{white-space:nowrap;}',
    '.tm-rel-wrap .tm-rel-fila{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:8px 0;}',
    '.tm-rel-wrap .tm-rel-btn{font-size:1rem;font-weight:700;min-width:52px;min-height:44px;padding:8px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;cursor:pointer;font-family:inherit;color:#1a1a1a;touch-action:manipulation;}',
    '.tm-rel-wrap .tm-rel-btn.tm-sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-rel-wrap .tm-rel-btn.tm-ok{background:#1c7e46;color:#fff;border-color:#1c7e46;}',
    '.tm-rel-wrap .tm-rel-btn.tm-ko{background:#c0392b;color:#fff;border-color:#c0392b;}',
    '.tm-rel-wrap .tm-rel-btn:disabled{cursor:default;}',
    '.tm-rel-wrap .tm-rel-resp{text-align:center;font-size:1.05rem;font-weight:700;color:#8b6914;min-height:1.6em;margin:8px 0 0;}',
    '.tm-rel-wrap .tm-rel-arm{display:none;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;margin:12px 0 0;padding:4px 0;}',
    '.tm-rel-wrap .tm-rel-arm.tm-show{display:block;}',
    '.tm-rel-wrap .tm-rel-arm>div{height:110px;}',
    '.tm-rel-wrap .tm-submit{width:100%;margin-top:16px;padding:15px;background:#d8d0b8;color:#fff;border:none;border-radius:6px;font-weight:800;cursor:not-allowed;font-family:inherit;font-size:1rem;}',
    '.tm-rel-wrap .tm-submit.tm-ready{background:#8b6914;cursor:pointer;}',
    '.tm-rel-wrap .tm-fb{display:none;margin-top:15px;padding:15px;border-radius:6px;font-weight:600;line-height:1.5;}',
    '.tm-rel-wrap .tm-fb.tm-show{display:block;}',
    '.tm-rel-wrap .tm-fb.tm-ok{background:#e8f5e9;color:#2e7d32;}',
    '.tm-rel-wrap .tm-fb.tm-ko{background:#ffebee;color:#c62828;}',
    '.tm-rel-wrap .tm-fb small{display:block;font-weight:500;color:#444;margin-top:4px;}',
    '.tm-rel-wrap .tm-nxt{display:none;width:100%;margin-top:10px;padding:15px;background:#1a1a1a;color:#fff;border:none;border-radius:6px;cursor:pointer;font-family:inherit;font-size:1rem;}',
    '.tm-rel-wrap .tm-nxt.tm-show{display:block;}',
    '.tm-rel-wrap .tm-rel-mode{text-align:center;padding:.5rem 0 1rem;}',
    '.tm-rel-wrap .tm-rel-title{font-size:1.35rem;font-weight:700;margin:0 0 .3rem;color:#1a1a2e;}',
    '.tm-rel-wrap .tm-rel-sub{color:#666;margin:0 0 1.5rem;font-size:.92rem;}',
    '.tm-rel-wrap .tm-rel-modes{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}',
    '.tm-rel-wrap .tm-rel-mode-btn{background:#fff;border:2px solid #d8d0b8;border-radius:12px;padding:1.2rem 1.6rem;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:.4rem;min-width:130px;font-family:inherit;}',
    '.tm-rel-wrap .tm-rel-mode-btn:hover{border-color:#8b6914;background:#fdf8ee;}',
    '.tm-rel-wrap .tm-rel-mode-icon{font-size:1.5rem;line-height:1;}',
    '.tm-rel-wrap .tm-rel-mode-lbl{font-size:.88rem;font-weight:700;color:#1a1a2e;}',
    '.tm-rel-wrap .tm-rel-mode-desc{font-size:.75rem;color:#666;text-align:center;line-height:1.3;}',
    '.tm-rel-wrap .tm-rel-header{display:flex;align-items:center;gap:1rem;}',
    '.tm-rel-wrap .tm-rel-prog{flex:1;display:flex;flex-direction:column;gap:.3rem;min-width:0;}',
    '.tm-rel-wrap .tm-rel-bar{height:6px;background:#e4e9f2;border-radius:3px;overflow:hidden;}',
    '.tm-rel-wrap .tm-rel-fill{height:100%;background:#8b6914;border-radius:3px;transition:width .4s ease;width:0%;}',
    '.tm-rel-wrap .tm-rel-counter{font-size:.82rem;color:#666;font-weight:500;}',
    '.tm-rel-wrap .tm-rel-badge{font-size:.92rem;font-weight:700;color:#8b6914;background:#fdf8ee;padding:.2rem .7rem;border-radius:8px;white-space:nowrap;}',
    '.tm-rel-wrap .tm-rel-score{text-align:center;padding:2rem;background:linear-gradient(135deg,#8b6914,#6b5010);border-radius:16px;color:#fff;margin-bottom:1.5rem;}',
    '.tm-rel-wrap .tm-rel-score-num{font-size:3rem;font-weight:800;line-height:1;}',
    '.tm-rel-wrap .tm-rel-score-pct{font-size:1.3rem;font-weight:600;opacity:.9;margin:.3rem 0;}',
    '@media(max-width:500px){.tm-rel-wrap .tm-card{padding:16px;}.tm-rel-wrap .tm-rel-modes{flex-direction:column;align-items:center;}.tm-rel-wrap .tm-rel-mode-btn{width:100%;max-width:240px;}.tm-rel-wrap .tm-rel-fila{gap:5px;}.tm-rel-wrap .tm-rel-btn{min-width:38px;padding:8px 4px;font-size:.92rem;}}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-rel-css')) return;
    var s = document.createElement('style');
    s.id = 'tm-rel-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function tmRelativos(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-rel-wrap';
    var uid = containerId;
    var nivel, cQ, sel, answered, currentQ, score, usados;

    function genQ() {
      var pool = ARM.filter(function (a) { return Math.abs(a[0]) <= nivel.max; });
      for (var i = 0; i < 200; i++) {
        var a = pool[Math.floor(Math.random() * pool.length)];
        var deMayor = Math.random() < 0.5;
        var h = a[0] + (deMayor ? 'M' : 'm');
        if (usados.indexOf(h) !== -1 && i < 150) continue;
        usados.push(h);
        cQ = { arm: a[0], dada: deMayor ? a[1] : a[2], resp: deMayor ? a[2] : a[1], deMayor: deMayor };
        return;
      }
    }

    function pantallaNiveles() {
      wrap.innerHTML = '<div class="tm-card"><div class="tm-rel-mode">' +
        '<h2 class="tm-rel-title">' + T('Relativo mayor y menor', 'Relative major and minor') + '</h2>' +
        '<p class="tm-rel-sub">' + T('Elige el nivel de dificultad &mdash; ' + PREGUNTAS + ' preguntas', 'Choose the difficulty level &mdash; ' + PREGUNTAS + ' questions') + '</p>' +
        '<div class="tm-rel-modes">' + NIVELES.map(function (d, i) {
          return '<button class="tm-rel-mode-btn" data-i="' + i + '"><span class="tm-rel-mode-icon">' + d.icon + '</span><span class="tm-rel-mode-lbl">' + d.lbl + '</span><span class="tm-rel-mode-desc">' + d.desc + '</span></button>';
        }).join('') + '</div></div></div>';
      wrap.querySelectorAll('.tm-rel-mode-btn').forEach(function (b) {
        b.addEventListener('click', window.tmNotacion.diferido(function () {
          nivel = NIVELES[parseInt(b.dataset.i, 10)];
          currentQ = 0; score = 0; usados = [];
          pantallaTest();
        }));
      });
    }

    function pantallaTest() {
      wrap.innerHTML = [
        '<div class="tm-card">',
          '<div class="tm-rel-header"><div class="tm-rel-prog"><div class="tm-rel-bar"><div class="tm-rel-fill" id="' + uid + '_fill"></div></div>',
          '<span class="tm-rel-counter" id="' + uid + '_cnt">1 / ' + PREGUNTAS + '</span></div>',
          '<span class="tm-rel-badge" id="' + uid + '_badge">✓ 0</span></div>',
          '<p class="tm-rel-q" id="' + uid + '_q"></p>',
          '<div class="tm-rel-fila" id="' + uid + '_notas">' + NOM.map(function (n, i) { return '<button class="tm-rel-btn" data-n="' + i + '">' + n + '</button>'; }).join('') + '</div>',
          '<div class="tm-rel-fila" id="' + uid + '_alts">' + [-1, 0, 1].map(function (a) { return '<button class="tm-rel-btn" data-a="' + a + '">' + (a ? ACC[String(a)] : '♮') + '</button>'; }).join('') + '</div>',
          '<p class="tm-rel-resp" id="' + uid + '_resp"></p>',
          '<div class="tm-rel-arm" id="' + uid + '_armbox"><div id="' + uid + '_arm"></div></div>',
          '<button class="tm-submit" id="' + uid + '_btn">' + T('Comprobar', 'Check') + '</button>',
          '<div class="tm-fb" id="' + uid + '_fb"></div>',
          '<button class="tm-nxt" id="' + uid + '_nxt">' + T('Siguiente', 'Next') + ' →</button>',
        '</div>'
      ].join('');
      wrap.querySelectorAll('#' + uid + '_notas button').forEach(function (b) {
        b.addEventListener('click', function () { if (answered) return; sel.n = parseInt(b.dataset.n, 10); pintarSel(); });
      });
      wrap.querySelectorAll('#' + uid + '_alts button').forEach(function (b) {
        b.addEventListener('click', function () { if (answered) return; sel.a = parseInt(b.dataset.a, 10); pintarSel(); });
      });
      document.getElementById(uid + '_btn').addEventListener('click', window.tmNotacion.diferido(comprobar));
      document.getElementById(uid + '_nxt').addEventListener('click', window.tmNotacion.diferido(siguiente));
      siguiente();
    }

    function pintarSel() {
      wrap.querySelectorAll('#' + uid + '_notas button').forEach(function (b) { b.classList.toggle('tm-sel', parseInt(b.dataset.n, 10) === sel.n); });
      wrap.querySelectorAll('#' + uid + '_alts button').forEach(function (b) { b.classList.toggle('tm-sel', parseInt(b.dataset.a, 10) === sel.a); });
      document.getElementById(uid + '_resp').textContent = sel.n === null ? '' : tonalidad([sel.n, sel.a], !cQ.deMayor);
      document.getElementById(uid + '_btn').classList.toggle('tm-ready', sel.n !== null);
    }

    function siguiente() {
      if (currentQ >= PREGUNTAS) { resultados(); return; }
      currentQ++; answered = false; sel = { n: null, a: 0 };
      document.getElementById(uid + '_fill').style.width = ((currentQ - 1) / PREGUNTAS * 100) + '%';
      document.getElementById(uid + '_cnt').textContent = currentQ + ' / ' + PREGUNTAS;
      var b = document.getElementById(uid + '_btn');
      b.style.display = ''; b.classList.remove('tm-ready');
      document.getElementById(uid + '_fb').className = 'tm-fb';
      document.getElementById(uid + '_nxt').className = 'tm-nxt';
      document.getElementById(uid + '_armbox').className = 'tm-rel-arm';
      wrap.querySelectorAll('.tm-rel-btn').forEach(function (x) { x.disabled = false; x.classList.remove('tm-ok', 'tm-ko'); });
      genQ();
      document.getElementById(uid + '_q').innerHTML = cQ.deMayor
        ? T('¿Cu\xe1l es el relativo menor de <strong>' + tonalidad(cQ.dada, true) + '</strong>?', 'What is the relative minor of <strong>' + tonalidad(cQ.dada, true) + '</strong>?')
        : T('¿Cu\xe1l es el relativo mayor de <strong>' + tonalidad(cQ.dada, false) + '</strong>?', 'What is the relative major of <strong>' + tonalidad(cQ.dada, false) + '</strong>?');
      pintarSel();
    }

    function comprobar() {
      var b = document.getElementById(uid + '_btn');
      if (!b.classList.contains('tm-ready') || answered) return;
      answered = true;
      var ok = sel.n === cQ.resp[0] && sel.a === cQ.resp[1];
      if (ok) score++;
      b.style.display = 'none';
      document.getElementById(uid + '_nxt').className = 'tm-nxt tm-show';
      document.getElementById(uid + '_badge').textContent = '✓ ' + score;
      wrap.querySelectorAll('#' + uid + '_notas button').forEach(function (x) {
        var n = parseInt(x.dataset.n, 10); x.disabled = true;
        if (n === cQ.resp[0]) x.classList.add('tm-ok'); else if (n === sel.n) x.classList.add('tm-ko');
      });
      wrap.querySelectorAll('#' + uid + '_alts button').forEach(function (x) {
        var a = parseInt(x.dataset.a, 10); x.disabled = true;
        if (a === cQ.resp[1]) x.classList.add('tm-ok'); else if (a === sel.a) x.classList.add('tm-ko');
      });
      var mayor = cQ.deMayor ? cQ.dada : cQ.resp, menor = cQ.deMayor ? cQ.resp : cQ.dada;
      var n = Math.abs(cQ.arm);
      var arm = n === 0 ? T('sin alteraciones', 'no sharps or flats')
              : n + ' ' + (cQ.arm > 0 ? T(n === 1 ? 'sostenido' : 'sostenidos', n === 1 ? 'sharp' : 'sharps') : T(n === 1 ? 'bemol' : 'bemoles', n === 1 ? 'flat' : 'flats'));
      var fb = document.getElementById(uid + '_fb');
      fb.className = 'tm-fb tm-show ' + (ok ? 'tm-ok' : 'tm-ko');
      fb.innerHTML = (ok ? T('¡Correcto! ', 'Correct! ') : T('Incorrecto. Es ', 'Incorrect. It is ') + tonalidadLarga(cQ.resp, !cQ.deMayor) + '. ') +
        '<small>' + tonalidadLarga(mayor, true) + T(' y ', ' and ') + tonalidadLarga(menor, false) +
        T(' comparten armadura: ', ' share the same key signature: ') + arm + '. ' +
        T('El relativo menor est\xe1 una 3\xaa menor por debajo del mayor.', 'The relative minor is a minor 3rd below the major.') + '</small>';
      var box = document.getElementById(uid + '_armbox');
      box.className = 'tm-rel-arm tm-show';
      window.tmNotacion.dibujarAlineado(document.getElementById(uid + '_arm'), { clave: 'sol', armadura: cQ.arm, sinBarraFinal: true, compases: [[]] },
        { escala: 1.0, top: 34, id: uid + 'a', alt: T('Armadura de ', 'Key signature of ') + tonalidadLarga(mayor, true) });
    }

    function resultados() {
      var pct = Math.round(score / PREGUNTAS * 100);
      wrap.innerHTML = '<div class="tm-card"><div class="tm-rel-score"><div class="tm-rel-score-num">' + score + '/' + PREGUNTAS + '</div><div class="tm-rel-score-pct">' + pct + '%</div></div>' +
        '<button class="tm-submit tm-ready" id="' + uid + '_restart">' + T('Hacer otro test', 'Take another quiz') + '</button></div>';
      document.getElementById(uid + '_restart').addEventListener('click', window.tmNotacion.diferido(pantallaNiveles));
    }

    wrap.innerHTML = '<div class="tm-card"><p class="tm-rel-sub">' + T('Cargando el ejercicio…', 'Loading the exercise…') + '</p></div>';
    window.tmNotacion.listo().then(pantallaNiveles).catch(function () {
      wrap.innerHTML = '<div class="tm-card"><p class="tm-rel-sub">' + T('No se ha podido cargar el ejercicio. Recarga la p\xe1gina.', 'The exercise could not be loaded. Reload the page.') + '</p></div>';
    });
  }

  window.tmRelativos = tmRelativos;
})();
