/* Motor: ampliar, reducir e invertir intervalos (nov-2026).
   Se da un intervalo melódico escrito; en el compás siguiente se repite la primera nota y el alumno escribe la segunda,
   como en los exámenes de lenguaje musical. Convención de la web (páginas de teoría de ampliación/reducción y de inversión):
   la primera nota se queda fija y se mueve la segunda.
     ampliar:  la segunda se aleja una 8ª (sube si el intervalo es ascendente, baja si es descendente) → simple a compuesto
     reducir:  la segunda se acerca una 8ª → compuesto a simple
     invertir: la segunda se mueve una 8ª en sentido contrario (intervalos simples) → los números suman 9
   La alteración no se copia sola: el alumno la elige con los botones (empiezan en ♮ en cada pregunta), como en clase, donde hay que
   acordarse de escribirla (Eduardo, nov-2026). Solo es correcto si coinciden la altura y la alteración.
   Uso: tmTransformarIv('id', { op: 'ampliar' | 'reducir' | 'invertir' }) */
(function () {
  'use strict';

  var EN = document.documentElement.lang === 'en';
  var T = function (es, en) { return EN ? en : es; };

  var NS = [0, 2, 4, 5, 7, 9, 11];
  var VF = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
  var NOM = EN ? ['C', 'D', 'E', 'F', 'G', 'A', 'B'] : ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
  var ACC_SYM = { '-2': '♭♭', '-1': '♭', '0': '', '1': '♯', '2': '𝄪' };
  var ACC_KEY = { '-2': 'bb', '-1': 'b', '0': '', '1': '#', '2': '##' };

  /* Registro admitido para todas las notas: La3 (2 líneas adicionales abajo) a Mi6 (3 arriba). */
  var DIA_MIN = 3 * 7 + 5, DIA_MAX = 6 * 7 + 2;
  var DIA_TOP = 5 * 7 + 3;              /* Fa5, la línea superior del pentagrama */
  var PASO_MIN = DIA_TOP - DIA_MAX, PASO_MAX = DIA_TOP - DIA_MIN;   /* -6 .. 12 (medias líneas desde la línea superior) */

  function dia(p) { return p.oct * 7 + p.n; }
  function semis(p) { return p.oct * 12 + NS[p.n] + p.acc; }
  function deDia(d, acc) { return { n: ((d % 7) + 7) % 7, oct: Math.floor(d / 7), acc: acc }; }
  function clave(p) { return VF[p.n] + ACC_KEY[String(p.acc)] + '/' + p.oct; }
  function nombreNota(p) { return NOM[p.n] + ACC_SYM[String(p.acc)] + p.oct; }

  var CAL_ES = { DblDis: 'doble disminuida', Dis: 'disminuida', menor: 'menor', Justa: 'justa', Mayor: 'mayor', Aum: 'aumentada', DblAum: 'doble aumentada' };
  var CAL_EN = { DblDis: 'doubly diminished', Dis: 'diminished', menor: 'minor', Justa: 'perfect', Mayor: 'major', Aum: 'augmented', DblAum: 'doubly augmented' };
  function ordEn(n) { var s = { 1: 'st', 2: 'nd', 3: 'rd' }; var r = n % 100; return n + ((r > 10 && r < 14) ? 'th' : (s[n % 10] || 'th')); }

  /* Número, especie y sentido del intervalo p1 → p2 */
  function intervalo(p1, p2) {
    var d = dia(p2) - dia(p1), asc = d >= 0;
    var lo = asc ? p1 : p2, hi = asc ? p2 : p1;
    var num = Math.abs(d) + 1;
    var oc = Math.floor((num - 1) / 7), simple = num - 7 * oc;
    var s = semis(hi) - semis(lo) - 12 * oc;
    var base = [0, 0, 2, 4, 5, 7, 9, 11][simple];
    var dif = s - base, cal;
    if (simple === 1 || simple === 4 || simple === 5) cal = { '-2': 'DblDis', '-1': 'Dis', '0': 'Justa', '1': 'Aum', '2': 'DblAum' }[String(dif)];
    else cal = { '-3': 'DblDis', '-2': 'Dis', '-1': 'menor', '0': 'Mayor', '1': 'Aum', '2': 'DblAum' }[String(dif)];
    return { num: num, cal: cal || null, asc: asc };
  }
  function nombreIv(iv) {
    var sentido = iv.asc ? T('ascendente', 'ascending') : T('descendente', 'descending');
    if (EN) return CAL_EN[iv.cal] + ' ' + (iv.num === 8 ? 'octave' : ordEn(iv.num)) + ' ' + sentido;
    return iv.num + '\xaa ' + CAL_ES[iv.cal] + ' ' + sentido;
  }

  var NIVELES = [
    { id: 'easy',   lbl: T('F\xe1cil', 'Easy'),     icon: '☀️', desc: T('Ascendentes, notas naturales', 'Ascending, natural notes'),   accs: [0],                     dobles: false, soloAsc: true },
    { id: 'medium', lbl: T('Medio', 'Medium'),      icon: '⚡',       desc: T('Ascendentes y descendentes, con ♯ y ♭', 'Ascending and descending, with ♯ and ♭'), accs: [-1, 0, 0, 0, 1], dobles: false, soloAsc: false },
    { id: 'hard',   lbl: T('Dif\xedcil', 'Hard'),   icon: '🔥', desc: T('Con dobles alteraciones', 'With double accidentals'),        accs: [-2, -1, -1, 0, 0, 1, 1, 2], dobles: true, soloAsc: false }
  ];
  var PREGUNTAS = 10;

  var OPS = {
    ampliar: {
      titulo: T('Ampliar intervalos', 'Widening intervals'),
      nums: [2, 3, 4, 5, 6, 7, 8],
      mover: function (asc) { return asc ? 7 : -7; },
      orden: T('Ampl\xeda el intervalo una octava', 'Widen the interval by an octave'),
      regla: function (asc) { return asc ? T('El intervalo sube: la segunda nota sube una octava.', 'The interval goes up: the second note goes up an octave.')
                                         : T('El intervalo baja: la segunda nota baja una octava.', 'The interval goes down: the second note goes down an octave.'); }
    },
    reducir: {
      titulo: T('Reducir intervalos', 'Narrowing intervals'),
      nums: [9, 10, 11, 12, 13, 14, 15],
      mover: function (asc) { return asc ? -7 : 7; },
      orden: T('Reduce el intervalo a simple', 'Narrow the interval to a simple one'),
      regla: function (asc) { return asc ? T('El intervalo sube: la segunda nota baja una octava.', 'The interval goes up: the second note goes down an octave.')
                                         : T('El intervalo baja: la segunda nota sube una octava.', 'The interval goes down: the second note goes up an octave.'); }
    },
    invertir: {
      titulo: T('Invertir intervalos', 'Inverting intervals'),
      nums: [2, 3, 4, 5, 6, 7],
      mover: function (asc) { return asc ? -7 : 7; },
      orden: T('Invierte el intervalo', 'Invert the interval'),
      regla: function (asc) { return asc ? T('El intervalo sube: la segunda nota baja una octava.', 'The interval goes up: the second note goes down an octave.')
                                         : T('El intervalo baja: la segunda nota sube una octava.', 'The interval goes down: the second note goes up an octave.'); }
    }
  };

  var CSS = [
    '.tm-ti-wrap .tm-card{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:24px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,0.05);}',
    '.tm-ti-wrap .tm-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-ti-wrap .tm-ti-staff{background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;margin:12px 0;cursor:crosshair;-webkit-user-select:none;user-select:none;touch-action:none;}',
    '.tm-ti-wrap .tm-ti-staff>div{width:100%;height:175px;}',
    '.tm-ti-wrap .tm-ti-orden{font-size:.95rem;color:#1a1a1a;text-align:center;margin:4px 0 6px;padding:7px 10px;background:#f5f2ea;border-radius:6px;font-weight:600;}',
    '.tm-ti-wrap .tm-ti-acc{display:flex;gap:8px;flex-wrap:wrap;margin:6px 0 8px;justify-content:center;}',
    '.tm-ti-wrap .tm-ti-acc-btn{font-size:1.1rem;font-weight:700;padding:8px 14px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;cursor:pointer;min-width:46px;min-height:44px;touch-action:manipulation;font-family:inherit;color:#1a1a1a;}',
    '.tm-ti-wrap .tm-ti-acc-btn.tm-sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-ti-wrap .tm-ti-acc-btn.tm-ok{background:#1c7e46;color:#fff;border-color:#1c7e46;}',
    '.tm-ti-wrap .tm-ti-acc-btn.tm-ko{background:#c0392b;color:#fff;border-color:#c0392b;}',
    '.tm-ti-wrap .tm-ti-acc-btn:disabled{cursor:default;}',
    '.tm-ti-wrap .tm-ti-hint{font-size:.8rem;color:#686868;text-align:center;margin:0 0 4px;font-style:italic;}',
    '.tm-ti-wrap .tm-submit{width:100%;margin-top:16px;padding:15px;background:#d8d0b8;color:#fff;border:none;border-radius:6px;font-weight:800;cursor:not-allowed;font-family:inherit;font-size:1rem;}',
    '.tm-ti-wrap .tm-submit.tm-ready{background:#8b6914;cursor:pointer;}',
    '.tm-ti-wrap .tm-fb{display:none;margin-top:15px;padding:15px;border-radius:6px;font-weight:600;line-height:1.5;}',
    '.tm-ti-wrap .tm-fb.tm-show{display:block;}',
    '.tm-ti-wrap .tm-fb.tm-ok{background:#e8f5e9;color:#2e7d32;}',
    '.tm-ti-wrap .tm-fb.tm-ko{background:#ffebee;color:#c62828;}',
    '.tm-ti-wrap .tm-fb small{display:block;font-weight:500;color:#444;margin-top:4px;}',
    '.tm-ti-wrap .tm-nxt{display:none;width:100%;margin-top:10px;padding:15px;background:#1a1a1a;color:#fff;border:none;border-radius:6px;cursor:pointer;font-family:inherit;font-size:1rem;}',
    '.tm-ti-wrap .tm-nxt.tm-show{display:block;}',
    '.tm-ti-wrap .tm-ti-mode{text-align:center;padding:.5rem 0 1rem;}',
    '.tm-ti-wrap .tm-ti-title{font-size:1.35rem;font-weight:700;margin:0 0 .3rem;color:#1a1a2e;}',
    '.tm-ti-wrap .tm-ti-sub{color:#666;margin:0 0 1.5rem;font-size:.92rem;}',
    '.tm-ti-wrap .tm-ti-modes{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}',
    '.tm-ti-wrap .tm-ti-mode-btn{background:#fff;border:2px solid #d8d0b8;border-radius:12px;padding:1.2rem 1.4rem;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:.4rem;min-width:130px;max-width:200px;font-family:inherit;}',
    '.tm-ti-wrap .tm-ti-mode-btn:hover{border-color:#8b6914;background:#fdf8ee;}',
    '.tm-ti-wrap .tm-ti-mode-icon{font-size:1.5rem;line-height:1;}',
    '.tm-ti-wrap .tm-ti-mode-lbl{font-size:.88rem;font-weight:700;color:#1a1a2e;}',
    '.tm-ti-wrap .tm-ti-mode-desc{font-size:.75rem;color:#666;text-align:center;line-height:1.3;}',
    '.tm-ti-wrap .tm-ti-header{display:flex;align-items:center;gap:1rem;margin-bottom:.5rem;}',
    '.tm-ti-wrap .tm-ti-prog{flex:1;display:flex;flex-direction:column;gap:.3rem;min-width:0;}',
    '.tm-ti-wrap .tm-ti-bar{height:6px;background:#e4e9f2;border-radius:3px;overflow:hidden;}',
    '.tm-ti-wrap .tm-ti-fill{height:100%;background:#8b6914;border-radius:3px;transition:width .4s ease;width:0%;}',
    '.tm-ti-wrap .tm-ti-counter{font-size:.82rem;color:#666;font-weight:500;}',
    '.tm-ti-wrap .tm-ti-badge{font-size:.92rem;font-weight:700;color:#8b6914;background:#fdf8ee;padding:.2rem .7rem;border-radius:8px;white-space:nowrap;}',
    '.tm-ti-wrap .tm-ti-score{text-align:center;padding:2rem;background:linear-gradient(135deg,#8b6914,#6b5010);border-radius:16px;color:#fff;margin-bottom:1.5rem;}',
    '.tm-ti-wrap .tm-ti-score-num{font-size:3rem;font-weight:800;line-height:1;}',
    '.tm-ti-wrap .tm-ti-score-pct{font-size:1.3rem;font-weight:600;opacity:.9;margin:.3rem 0;}',
    '@media(max-width:500px){.tm-ti-wrap .tm-card{padding:16px;}.tm-ti-wrap .tm-ti-modes{flex-direction:column;align-items:center;}.tm-ti-wrap .tm-ti-mode-btn{width:100%;max-width:240px;}}',
    /* lupa: ancho fijo, para que no se encoja cerca del borde derecho */
    '.tm-ti-wrap .tm-ti-loupe{position:fixed;display:none;pointer-events:none;z-index:9999;background:#fdfcf9;border:2px solid #333;border-radius:12px;padding:6px 8px;box-shadow:0 8px 28px rgba(0,0,0,0.35);transform:translate(-50%,calc(-100% - 18px));width:min(300px,calc(100vw - 16px));box-sizing:border-box;}',
    '.tm-ti-wrap .tm-ti-loupe::after{content:"";position:absolute;bottom:-13px;left:50%;transform:translateX(-50%);border:11px solid transparent;border-top-color:#333;border-bottom:none;}',
    '.tm-ti-wrap .tm-ti-loupe::before{content:"";position:absolute;bottom:-9px;left:50%;transform:translateX(-50%);border:9px solid transparent;border-top-color:#fdfcf9;border-bottom:none;z-index:1;}',
    '.tm-ti-wrap .tm-ti-lstaff{line-height:0;height:210px;overflow:hidden;}',
    '.tm-ti-wrap .tm-ti-lstaff svg{display:block;max-width:100%;height:auto;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-ti-css')) return;
    var s = document.createElement('style');
    s.id = 'tm-ti-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function azar(a) { return a[Math.floor(Math.random() * a.length)]; }

  function tmTransformarIv(containerId, config) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-ti-wrap';
    var uid = containerId;
    var OP = OPS[config.op] || OPS.ampliar;
    var nivel, cQ, puesta, answered, currentQ, score, usados, ultimaLupa, selAcc = 0;

    /* ---------- pregunta ---------- */
    function calidadValida(cal) {
      if (!cal) return false;
      if (!nivel.dobles && (cal === 'DblAum' || cal === 'DblDis')) return false;
      return true;
    }
    function genQ() {
      for (var intento = 0; intento < 2000; intento++) {
        var num = azar(OP.nums);
        var asc = nivel.soloAsc ? true : Math.random() < 0.5;
        var p1 = { n: Math.floor(Math.random() * 7), oct: 3 + Math.floor(Math.random() * 3), acc: azar(nivel.accs) };
        var d2 = dia(p1) + (asc ? num - 1 : -(num - 1));
        var p2 = deDia(d2, azar(nivel.accs));
        var meta = deDia(d2 + OP.mover(asc), p2.acc);
        if ([p1, p2, meta].some(function (p) { return dia(p) < DIA_MIN || dia(p) > DIA_MAX; })) continue;
        var iv = intervalo(p1, p2), ivMeta = intervalo(p1, meta);
        if (!calidadValida(iv.cal) || !ivMeta.cal) continue;
        var huella = clave(p1) + '|' + clave(p2);
        if (usados.indexOf(huella) !== -1 && intento < 1500) continue;
        usados.push(huella);
        cQ = { p1: p1, p2: p2, meta: meta, iv: iv, ivMeta: ivMeta };
        wrap._pregunta = cQ;   /* para las pruebas automáticas */
        return;
      }
    }

    /* ---------- dibujo ---------- */
    /* Compás 1: el intervalo dado. Compás 2: la primera nota y el hueco (o la nota) de la respuesta. */
    function fila(segunda, color) {
      var hueco = segunda ? { key: clave(segunda), d: 'w', color: color } : { espacio: true, d: 'w' };
      return { clave: 'sol', barraFinal: 'end', compases: [
        [{ key: clave(cQ.p1), d: 'w' }, { key: clave(cQ.p2), d: 'w' }],
        [{ key: clave(cQ.p1), d: 'w' }, hueco]
      ] };
    }
    function dibujar(segunda, color) {
      var el = document.getElementById(uid + '_not');
      /* en el móvil las notas más juntas: el dibujo cabe con menos reducción y el pentagrama sale más grande */
      var estrecho = el.clientWidth < 520;
      window.tmNotacion.dibujarAlineado(el, fila(segunda, color), { escala: 1.0, separacion: estrecho ? 0.18 : 0.25, top: 70, id: uid, alt: '' });
    }
    function pasoEn(clientY) {
      var svg = document.getElementById(uid + '_not').querySelector('svg');
      if (!svg) return 0;
      var sr = svg.getBoundingClientRect(), g = window.tmNotacion.geometria(svg);
      if (!g.lineas) return 0;
      var sp = (g.lineas[4] - g.lineas[0]) / 4;
      return Math.max(PASO_MIN, Math.min(PASO_MAX, Math.round((clientY - sr.top - g.lineas[0]) / (sp / 2))));
    }
    function notaEn(clientY) { return deDia(DIA_TOP - pasoEn(clientY), selAcc); }
    function opcionesAcc() { return nivel.dobles ? [-2, -1, 0, 1, 2] : [-1, 0, 1]; }
    function pintarAcc() {
      document.querySelectorAll('#' + uid + '_acc .tm-ti-acc-btn').forEach(function (b) { b.classList.toggle('tm-sel', parseInt(b.dataset.acc, 10) === selAcc); });
    }

    /* ---------- pantallas ---------- */
    function pantallaNiveles() {
      wrap.innerHTML = '<div class="tm-card"><div class="tm-ti-mode">' +
        '<h2 class="tm-ti-title">' + OP.titulo + '</h2>' +
        '<p class="tm-ti-sub">' + T('Elige el nivel de dificultad &mdash; ' + PREGUNTAS + ' preguntas', 'Choose the difficulty level &mdash; ' + PREGUNTAS + ' questions') + '</p>' +
        '<div class="tm-ti-modes">' + NIVELES.map(function (d, i) {
          return '<button class="tm-ti-mode-btn" data-i="' + i + '"><span class="tm-ti-mode-icon">' + d.icon + '</span><span class="tm-ti-mode-lbl">' + d.lbl + '</span><span class="tm-ti-mode-desc">' + d.desc + '</span></button>';
        }).join('') + '</div></div></div>';
      wrap.querySelectorAll('.tm-ti-mode-btn').forEach(function (b) {
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
          '<div class="tm-ti-header"><div class="tm-ti-prog"><div class="tm-ti-bar"><div class="tm-ti-fill" id="' + uid + '_fill"></div></div>',
          '<span class="tm-ti-counter" id="' + uid + '_cnt">1 / ' + PREGUNTAS + '</span></div>',
          '<span class="tm-ti-badge" id="' + uid + '_badge">✓ 0</span></div>',
          '<div class="tm-ti-orden" id="' + uid + '_orden"></div>',
          '<div class="tm-ti-staff" id="' + uid + '_staff"><div id="' + uid + '_not"></div></div>',
          '<div class="tm-ti-acc" id="' + uid + '_acc">' + opcionesAcc().map(function (a) {
            return '<button class="tm-ti-acc-btn" data-acc="' + a + '" aria-label="' + ({ '-2': T('doble bemol', 'double flat'), '-1': T('bemol', 'flat'), '0': T('becuadro (sin alteración)', 'natural'), '1': T('sostenido', 'sharp'), '2': T('doble sostenido', 'double sharp') })[String(a)] + '">' + (a === 2 ? '×' : a ? ACC_SYM[String(a)] : '♮') + '</button>';
          }).join('') + '</div>',
          '<p class="tm-ti-hint" id="' + uid + '_hint"></p>',
          '<button class="tm-submit" id="' + uid + '_btn">' + T('Comprobar', 'Check') + '</button>',
          '<div class="tm-fb" id="' + uid + '_fb"></div>',
          '<button class="tm-nxt" id="' + uid + '_nxt">' + T('Siguiente', 'Next') + ' →</button>',
        '</div>',
        '<div class="tm-ti-loupe" id="' + uid + '_loupe"><div class="tm-ti-lstaff" id="' + uid + '_lstaff"></div></div>'
      ].join('');
      document.getElementById(uid + '_btn').addEventListener('click', window.tmNotacion.diferido(comprobar));
      document.getElementById(uid + '_nxt').addEventListener('click', window.tmNotacion.diferido(siguiente));
      document.querySelectorAll('#' + uid + '_acc .tm-ti-acc-btn').forEach(function (b) {
        b.addEventListener('click', window.tmNotacion.diferido(function () {
          if (answered) return;
          selAcc = parseInt(b.dataset.acc, 10);
          pintarAcc();
          if (puesta) { puesta = deDia(dia(puesta), selAcc); dibujar(puesta, '#8b6914'); }
        }));
      });
      engancharPentagrama();
      siguiente();
    }

    function engancharPentagrama() {
      var area = document.getElementById(uid + '_staff');
      var lupa = document.getElementById(uid + '_loupe');
      var lstaff = document.getElementById(uid + '_lstaff');

      function pintarLupa(p) {
        var k = clave(cQ.p1) + '|' + clave(p);
        if (k === ultimaLupa) return;
        ultimaLupa = k;
        window.tmNotacion.dibujarAlineado(lstaff, { clave: 'sol', compases: [[{ key: clave(cQ.p1), d: 'w' }, { key: clave(p), d: 'w', color: '#8b6914' }]] },
          { escala: 1.7, separacion: 0.15, top: 80, id: uid + 'l', alt: '' });   /* lupa: más grande que el pentagrama (Eduardo, nov-2026) */
      }
      function mostrarLupa(x, y) {
        if (answered) return;
        lupa.style.transform = '';
        lupa.style.left = x + 'px'; lupa.style.top = y + 'px';
        lupa.style.display = 'block';
        pintarLupa(notaEn(y));
        var r = lupa.getBoundingClientRect(), pad = 8;
        if (r.left < pad) lupa.style.left = (x - r.left + pad) + 'px';
        else if (r.right > window.innerWidth - pad) lupa.style.left = (x - (r.right - window.innerWidth + pad)) + 'px';
        if (r.top < pad) lupa.style.transform = 'translate(-50%, 18px)';
      }
      function ocultarLupa() { lupa.style.display = 'none'; ultimaLupa = null; }
      function poner(y) {
        if (answered) return;
        puesta = notaEn(y);
        dibujar(puesta, '#8b6914');
        document.getElementById(uid + '_btn').classList.add('tm-ready');
        document.getElementById(uid + '_hint').textContent = T('Pulsa de nuevo para cambiar la nota', 'Tap again to change the note');
      }

      /* la nota se pone al SOLTAR (ratón o dedo): así se puede arrastrar buscando la línea con la lupa */
      area.addEventListener('mouseup', function (e) { if (e.button === 0) { var y = e.clientY; window.tmNotacion.trasPintar(function () { poner(y); }); } });
      area.addEventListener('mousemove', function (e) { mostrarLupa(e.clientX, e.clientY); });
      area.addEventListener('mouseleave', ocultarLupa);
      area.addEventListener('touchstart', function (e) { e.preventDefault(); var t = e.touches[0]; mostrarLupa(t.clientX, t.clientY); }, { passive: false });
      area.addEventListener('touchmove', function (e) { e.preventDefault(); var t = e.touches[0]; mostrarLupa(t.clientX, t.clientY); }, { passive: false });
      area.addEventListener('touchend', function (e) {
        e.preventDefault();
        ocultarLupa();
        var y = e.changedTouches[0].clientY;
        window.tmNotacion.trasPintar(function () { poner(y); });
      }, { passive: false });
    }

    function siguiente() {
      if (currentQ >= PREGUNTAS) { resultados(); return; }
      currentQ++; answered = false; puesta = null; ultimaLupa = null; selAcc = 0;
      document.querySelectorAll('#' + uid + '_acc .tm-ti-acc-btn').forEach(function (x) { x.disabled = false; x.classList.remove('tm-ok', 'tm-ko'); });
      pintarAcc();
      document.getElementById(uid + '_fill').style.width = ((currentQ - 1) / PREGUNTAS * 100) + '%';
      document.getElementById(uid + '_cnt').textContent = currentQ + ' / ' + PREGUNTAS;
      var b = document.getElementById(uid + '_btn');
      b.style.display = ''; b.classList.remove('tm-ready');
      document.getElementById(uid + '_fb').className = 'tm-fb';
      document.getElementById(uid + '_nxt').className = 'tm-nxt';
      genQ();
      document.getElementById(uid + '_orden').textContent = OP.orden + T(': escribe la segunda nota en el segundo comp\xe1s', ': write the second note in the second bar');
      document.getElementById(uid + '_hint').textContent = T('Elige la alteración y pulsa en el pentagrama (o arrastra con la lupa) para colocar la nota', 'Choose the accidental and tap the staff (or drag with the magnifier) to place the note');
      dibujar(null);
    }

    function comprobar() {
      var b = document.getElementById(uid + '_btn');
      if (!b.classList.contains('tm-ready') || answered) return;
      answered = true;
      document.getElementById(uid + '_loupe').style.display = 'none';
      var alturaOk = dia(puesta) === dia(cQ.meta), accOk = puesta.acc === cQ.meta.acc;
      var ok = alturaOk && accOk;
      document.querySelectorAll('#' + uid + '_acc .tm-ti-acc-btn').forEach(function (x) {
        var a = parseInt(x.dataset.acc, 10); x.disabled = true;
        if (a === cQ.meta.acc) x.classList.add('tm-ok'); else if (a === puesta.acc) x.classList.add('tm-ko');
      });
      if (ok) score++;
      b.style.display = 'none';
      document.getElementById(uid + '_nxt').className = 'tm-nxt tm-show';
      document.getElementById(uid + '_badge').textContent = '✓ ' + score;
      dibujar(cQ.meta, '#1c7e46');
      var cambio = nombreIv(cQ.iv) + ' → ' + nombreIv(cQ.ivMeta);
      var fb = document.getElementById(uid + '_fb');
      fb.className = 'tm-fb tm-show ' + (ok ? 'tm-ok' : 'tm-ko');
      fb.innerHTML = (ok
        ? T('¡Correcto! ', 'Correct! ') + cambio + '.'
        : T('Incorrecto: has puesto ', 'Incorrect: you placed ') + nombreNota(puesta) + T(' y era ', '; the answer is ') + nombreNota(cQ.meta) + '. ' +
          (alturaOk ? T('Está en la línea o el espacio correcto, pero la alteración no: al cambiar de octava la nota conserva la suya. ', 'It is on the right line or space, but the accidental is wrong: the note keeps its own accidental when it changes octave. ') : '') + cambio + '.') +
        '<small>' + OP.regla(cQ.iv.asc) + '</small>';
    }

    function resultados() {
      var pct = Math.round(score / PREGUNTAS * 100);
      wrap.innerHTML = '<div class="tm-card"><div class="tm-ti-score"><div class="tm-ti-score-num">' + score + '/' + PREGUNTAS + '</div><div class="tm-ti-score-pct">' + pct + '%</div></div>' +
        '<button class="tm-submit tm-ready" id="' + uid + '_restart">' + T('Hacer otro test', 'Take another quiz') + '</button></div>';
      document.getElementById(uid + '_restart').addEventListener('click', window.tmNotacion.diferido(pantallaNiveles));
    }

    /* Verovio se carga bajo demanda: el motor arranca cuando ya está. */
    wrap.innerHTML = '<div class="tm-card"><p class="tm-ti-sub">' + T('Cargando el ejercicio…', 'Loading the exercise…') + '</p></div>';
    window.tmNotacion.listo().then(pantallaNiveles).catch(function () {
      wrap.innerHTML = '<div class="tm-card"><p class="tm-ti-sub">' + T('No se ha podido cargar el ejercicio. Recarga la p\xe1gina.', 'The exercise could not be loaded. Reload the page.') + '</p></div>';
    });
  }

  window.tmTransformarIv = tmTransformarIv;
  /* para las pruebas */
  window.tmTransformarIv._intervalo = intervalo;
})();
