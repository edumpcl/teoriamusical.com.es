/* Diagrama de digitaciones del trombón de varas (tenor, Si♭) — interactivo, sobre FOTO REAL: la vara exterior
   está recortada de la foto y se desliza hasta la posición de cada nota (Eduardo, nov-2026: como los demás metales,
   con imagen real y no con un dibujo).
   Primer instrumento de VARA del cluster: no hay pistones ni agujeros, la nota se
   elige alargando o acortando la vara en una de SIETE POSICIONES y ajustando el
   armónico con los labios (igual mecánica que la trompeta, pero con vara en vez
   de pistones). El trombón NO transpone: lo escrito es exactamente lo que suena.
   Uso: <div id="x"></div><script>tmTrombonEngine('x');</script>
   Digitaciones estándar del trombón tenor, Mi2–Si♭4, calculadas desde la física real
   de la serie armónica de cada posición (verificable: 1ª posición = serie de Si♭,
   cada posición siguiente baja un semitono). */
(function () {
  'use strict';

  // Inglés: la misma página sirve a <html lang="en"> (el español queda intacto).
  const EN = document.documentElement.lang === 'en';
  const T = (es, en) => EN ? en : es;
  // Nombre de nota en español -> letras (solo se muestra así en inglés; la lógica sigue con los nombres españoles).
  const NOTE_EN = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  const nm = s => EN ? String(s).replace(/Sol|Do|Re|Mi|Fa|La|Si/g, m => NOTE_EN[m]) : s;
  const ordEn = n => n + (n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th');

  /* El diagrama es la FOTO REAL del trombón en dos capas (tools/gen_trombon_vara.py): el cuerpo, con los tubos interiores
     a la vista, y la vara exterior recortada, que se desliza por encima. GEO sale de ese script (píxeles del lienzo):
     vara = [x, y, ancho, alto] de la vara en 1.ª posición; pend = inclinación de los tubos en la foto; pos = lo que sale
     la vara en cada posición, con las distancias reales (un semitono más de tubo cada vez: 0, 86, 177, 274, 377, 485 y
     600 mm; por eso cada posición está un poco más lejos que la anterior); punta = el extremo del codo. */
  var GEO = { W: 2356, H: 504, vara: [687.0, 206.5, 880, 164], pend: 0.0537,
    pos: [0.0, 102.6, 211.3, 326.4, 448.4, 577.6, 714.5], punta: [1565.0, 295.0], rotor: [490, 269.5, 25] };
  /* Con el transpositor el tubo es una cuarta más largo (fundamental Fa en vez de Si♭), así que cada semitono pide más vara:
     las mismas distancias multiplicadas por 2^(5/12) = 1,335. Por eso las posiciones quedan más separadas y solo caben
     SEIS: la 6.ª con transpositor (648 mm) ya está un poco más allá de la 7.ª normal (600 mm). */
  GEO.posT = GEO.pos.slice(0, 6).map(function (d) { return d * Math.pow(2, 5 / 12); });
  var IMG = '/assets/img/trombon/';
  var pct = function (v, total) { return (v / total * 100).toFixed(3) + '%'; };

  // Nota escrita -> { pos: posición de vara (1-7), harm: armónico usado }
  // NO hay transposición: escrito = sonido real.
  var FING = {
    'Mi2':  { pos: 7, harm: 2 }, 'Fa2':  { pos: 6, harm: 2 }, 'Fa#2': { pos: 5, harm: 2 },
    'Sol2': { pos: 4, harm: 2 }, 'Sol#2':{ pos: 3, harm: 2 }, 'La2':  { pos: 2, harm: 2 },
    'La#2': { pos: 1, harm: 2 },
    'Si2':  { pos: 7, harm: 3 }, 'Do3':  { pos: 6, harm: 3 }, 'Do#3': { pos: 5, harm: 3 },
    'Re3':  { pos: 4, harm: 3 }, 'Re#3': { pos: 3, harm: 3 }, 'Mi3':  { pos: 2, harm: 3 },
    'Fa3':  { pos: 1, harm: 3 },
    'Fa#3': { pos: 5, harm: 4 }, 'Sol3': { pos: 4, harm: 4 }, 'Sol#3':{ pos: 3, harm: 4 },
    'La3':  { pos: 2, harm: 4 }, 'La#3': { pos: 1, harm: 4 },
    'Si3':  { pos: 4, harm: 5 }, 'Do4':  { pos: 3, harm: 5 }, 'Do#4': { pos: 2, harm: 5 },
    'Re4':  { pos: 1, harm: 5 },
    'Re#4': { pos: 3, harm: 6 }, 'Mi4':  { pos: 2, harm: 6 }, 'Fa4':  { pos: 1, harm: 6 },
    'Fa#4': { pos: 5, harm: 8 }, 'Sol4': { pos: 4, harm: 8 }, 'Sol#4':{ pos: 3, harm: 8 },
    'La4':  { pos: 2, harm: 8 }, 'La#4': { pos: 1, harm: 8 }
  };
  /* Con transpositor (Eduardo, nov-2026): el trombón pasa a estar en Fa, con seis posiciones, y muchas notas tienen una
     segunda forma de tocarse. ALT_T (se calcula abajo) las da TODAS, desde la serie armónica de cada posición. REC_T son
     las de uso corriente: las cuatro graves que solo existen con él y las que ahorran la 6.ª y la 7.ª; son las que salen
     elegidas de entrada. En las demás, de entrada sale la posición normal y la del transpositor se puede ver. */
  var REC_T = { 'Do2': 1, 'Do#2': 1, 'Re2': 1, 'Re#2': 1, 'Mi2': 1, 'Fa2': 1, 'Si2': 1, 'Do3': 1 };
  var GRAVES_T = ['Do2', 'Do#2', 'Re2', 'Re#2'];   // solo con transpositor
  var FUND_T = { 1: 'Fa', 2: 'Mi', 3: 'Mi♭', 4: 'Re', 5: 'Re♭', 6: 'Do' };
  /* Nota -> { pos, harm } con el transpositor: la posición más cercana que la da. Fundamental de la 1.ª con transpositor:
     Fa1 (29 en MIDI); cada posición, un semitono menos. Armónicos 2.º a 8.º, sin el 7.º (queda bajo), como sin transpositor. */
  var SEMIS = { Do: 0, Re: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 };
  var ARM = { 2: 12, 3: 19, 4: 24, 5: 28, 6: 31, 8: 36 };
  function midiDe(n) { var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n); return 12 * (+m[3] + 1) + SEMIS[m[1]] + (m[2] ? 1 : 0); }
  var ALT_T = {};
  var ORDEN = [
    'Mi2', 'Fa2', 'Fa#2', 'Sol2', 'Sol#2', 'La2', 'La#2',
    'Si2', 'Do3', 'Do#3', 'Re3', 'Re#3', 'Mi3', 'Fa3',
    'Fa#3', 'Sol3', 'Sol#3', 'La3', 'La#3',
    'Si3', 'Do4', 'Do#4', 'Re4', 'Re#4', 'Mi4', 'Fa4',
    'Fa#4', 'Sol4', 'Sol#4', 'La4', 'La#4'
  ];
  // Fundamental (nota al aire, 1er armónico) de cada una de las 7 posiciones
  var FUND = { 1: 'Si♭', 2: 'La', 3: 'La♭', 4: 'Sol', 5: 'Fa♯', 6: 'Fa', 7: 'Mi' };
  GRAVES_T.concat(ORDEN).forEach(function (n) {
    var mi = midiDe(n);
    for (var pos = 1; pos <= 6 && !ALT_T[n]; pos++) for (var h in ARM) if (29 - (pos - 1) + ARM[h] === mi) { ALT_T[n] = { pos: pos, harm: +h }; break; }
  });
  var ORDINAL = { 1: '1ª', 2: '2ª', 3: '3ª', 4: '4ª', 5: '5ª', 6: '6ª', 7: '7ª' };
  if (EN) ORDINAL = { 1: '1st', 2: '2nd', 3: '3rd', 4: '4th', 5: '5th', 6: '6th', 7: '7th' };

  var SUB = { '2': '₂', '3': '₃', '4': '₄' };
  var FLAT = {
    'Do#2': 'Re♭₂', 'Re#2': 'Mi♭₂',
    'Fa#2': 'Sol♭₂', 'Sol#2': 'La♭₂', 'La#2': 'Si♭₂', 'Do#3': 'Re♭₃', 'Re#3': 'Mi♭₃',
    'Fa#3': 'Sol♭₃', 'Sol#3': 'La♭₃', 'La#3': 'Si♭₃', 'Do#4': 'Re♭₄', 'Re#4': 'Mi♭₄',
    'Fa#4': 'Sol♭₄', 'Sol#4': 'La♭₄', 'La#4': 'Si♭₄'
  };
  function label(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return n;
    return nm(m[1] + (m[2] ? '♯' : '') + SUB[m[3]]);
  }
  function registro(n) {
    if (GRAVES_T.indexOf(n) >= 0) return T('Registro grave (solo con transpositor)', 'Low register (F attachment only)');
    var i = ORDEN.indexOf(n);
    if (i >= 0 && i <= ORDEN.indexOf('Si2')) return T('Registro grave', 'Low register');
    if (i <= ORDEN.indexOf('Si3')) return T('Registro medio', 'Middle register');
    return T('Registro agudo', 'High register');
  }

  var LETTER = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  var AUDIO_BASE = '/assets/audio/trombon/';
  var AUDIO_V = '4'; // bumpear al corregir cualquier fichero de audio (evita cache de navegador)
  function sampleFile(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    return m ? LETTER[m[1]] + (m[2] ? 's' : '') + m[3] : null;
  }
  function intl(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    return m ? LETTER[m[1]] + (m[2] ? '♯' : '') + m[3] : n;
  }
  function vfNote(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return null;
    var acc = m[2] ? '#' : null;
    return { key: LETTER[m[1]].toLowerCase() + (acc || '') + '/' + m[3], acc: acc };
  }

  var CSS = [
    '.tm-tb-wrap{margin:18px 0;}',
    '.tm-tb-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-tb-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-tb-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-tb-hint{font-size:1.02rem;color:#686868;font-weight:600;}',
    '.tm-tb-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;}',
    '.tm-tb-foto{max-width:900px;margin:0 auto;overflow:hidden;}',
    '.tm-tb-lienzo{position:relative;width:100%;aspect-ratio:' + GEO.W + '/' + GEO.H + ';}',
    '.tm-tb-foto img{display:block;width:100%;height:auto;max-width:none;}',
    '.tm-tb-vara{position:absolute;transition:left .55s cubic-bezier(.3,.1,.2,1),top .55s cubic-bezier(.3,.1,.2,1);}',
    '.tm-tb-marca{position:absolute;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;background:#f1efe8;border:1.5px solid #8f9199;color:#555;font:700 13px/23px Arial,Helvetica,sans-serif;text-align:center;transition:background .3s,color .3s,transform .3s;}',
    '.tm-tb-marca.on{background:#8b6914;border-color:#6b5010;color:#fff;transform:scale(1.25);}',
    // el transpositor: un aro sobre el rotor, que se enciende; las posiciones con transpositor, en naranja
    '.tm-tb-rotor{position:absolute;aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%);border:2px solid transparent;transition:all .2s;pointer-events:none;}',
    '.tm-tb-rotor.on{border-color:#c9730a;background:rgba(255,149,0,.5);box-shadow:0 0 10px 3px rgba(255,149,0,.8);}',
    '.tm-tb-marca.t{background:#fff3df;border-color:#c9930a;color:#7a4a00;}',
    '.tm-tb-marca.t.on{background:#ff9500;border-color:#c9730a;color:#3a2b00;}',
    '.tm-tb-marca[hidden]{display:none;}',
    '.tm-tb-modo{display:flex;gap:6px;justify-content:center;margin-top:12px;}',
    '.tm-tb-modo button{font:inherit;font-size:.9rem;font-weight:700;padding:9px 14px;border-radius:999px;border:2px solid #d8d0b8;background:#fff;color:#1a1a2e;cursor:pointer;}',
    '.tm-tb-modo button[aria-pressed="true"]{border-color:#8b6914;background:#8b6914;color:#fff;}',
    '.tm-tb-nota{font-size:.85rem;color:#666;text-align:center;margin:8px 0 0;min-height:1.3em;}',
    '.tm-tb-btn.val{border-color:#c9930a;background:#fff3df;}',
    '.tm-tb-btn.val.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-tb-btn.alt{border:1.5px dashed #c9930a;}',
    '.tm-tb-btn[hidden]{display:none;}',
    '.tm-tb-ops{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:8px;}',
    '.tm-tb-ops button{font:inherit;font-size:.85rem;font-weight:600;padding:6px 12px;border-radius:999px;border:1.5px solid #d8d0b8;background:#fff;color:#1a1a2e;cursor:pointer;}',
    '.tm-tb-ops button[aria-pressed="true"]{border-color:#8b6914;background:#fdf3dc;}',
    '.tm-tb-ops button.t[aria-pressed="true"]{border-color:#c9730a;background:#ffe2b8;}',
    '.tm-tb-credito{font-size:.75rem;color:#777;text-align:center;margin:4px 0 0;}',
    '.tm-tb-credito a{color:inherit;}',
    // en el móvil se recorta la bomba de afinación (el 15 % de la izquierda): lo que importa, la vara, se ve más grande
    '@media(max-width:600px){.tm-tb-lienzo{width:117.6%;margin-left:-17.6%;}.tm-tb-marca{width:16px;height:16px;margin:-8px 0 0 -8px;font-size:9.5px;line-height:13.5px;border-width:1px;}}',
    '@media(prefers-reduced-motion:reduce){.tm-tb-vara{transition:none;}}',
    '.tm-tb-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-tb-btn{min-width:46px;padding:10px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-tb-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-tb-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-tb-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-tb-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-tb-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-tb-play:hover{background:#6b5010;}',
    '.tm-tb-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-tb-staff svg{max-width:100%;height:auto;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-tb-css')) return;
    var s = document.createElement('style'); s.id = 'tm-tb-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* Los números de las 7 posiciones, debajo de donde queda la punta de la vara en cada una */
  function marcas() {
    var out = '';
    [[GEO.pos, ''], [GEO.posT, ' t']].forEach(function (juego) {
      juego[0].forEach(function (d, k) {
        out += '<span class="tm-tb-marca' + juego[1] + '" data-pos="' + (k + 1) + '"' + (juego[1] ? ' hidden' : '') + ' style="left:' + pct(GEO.punta[0] + d - 34, GEO.W) + ';top:' + pct(GEO.punta[1] + d * GEO.pend + 112, GEO.H) + '">' + (k + 1) + '</span>';
      });
    });
    return out;
  }

  function tmTrombonEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var btns = GRAVES_T.concat(ORDEN).map(function (n) {
      return '<button class="tm-tb-btn" data-n="' + n + '"' + (GRAVES_T.indexOf(n) >= 0 ? ' hidden' : '') + '>' + label(n) + '</button>';
    }).join('');
    var conT = false, actual = null;

    wrap.innerHTML =
      '<div class="tm-tb-wrap">' +
        '<div class="tm-tb-readout" id="' + uid + '_ro"><span class="tm-tb-hint">' + T('Elige una nota para ver su posición de vara', 'Choose a note to see its slide position') + '</span></div>' +
        '<div class="tm-tb-diagram"><div class="tm-tb-foto"><div class="tm-tb-lienzo" role="img" aria-label="' + T('Foto de un trombón tenor: la vara se desliza hasta la posición de la nota elegida, de la 1.ª (recogida) a la 7.ª (extendida del todo); debajo, los números de las siete posiciones', 'Photo of a tenor trombone: the slide moves to the position of the chosen note, from 1st (closed) to 7th (fully extended); below, the numbers of the seven positions') + '">' +
          '<picture><source type="image/webp" srcset="' + IMG + 'vara-cuerpo.webp"><img src="' + IMG + 'vara-cuerpo.jpg" width="' + GEO.W + '" height="' + GEO.H + '" alt="" decoding="async"></picture>' +
          '<picture class="tm-tb-vara" id="' + uid + '_vara" style="width:' + pct(GEO.vara[2], GEO.W) + '"><source type="image/webp" srcset="' + IMG + 'vara-movil.webp"><img src="' + IMG + 'vara-movil.png" width="' + GEO.vara[2] + '" height="' + GEO.vara[3] + '" alt="" decoding="async"></picture>' +
          '<span class="tm-tb-rotor" id="' + uid + '_rotor" style="left:' + pct(GEO.rotor[0], GEO.W) + ';top:' + pct(GEO.rotor[1], GEO.H) + ';width:' + pct(2 * GEO.rotor[2], GEO.W) + '"></span>' +
          marcas() +
        '</div></div>' +
        '<p class="tm-tb-credito">' + T('Foto: ', 'Photo: ') + '<a href="https://commons.wikimedia.org/wiki/File:Yamaha_Tenor_trombone_YSL-882OR.tif" rel="nofollow">Yamaha Corporation</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>' + T(' (vara separada y movida)', ' (slide cut out and moved)') + '</p></div>' +
        '<div class="tm-tb-modo" role="group" aria-label="' + T('Transpositor', 'F attachment') + '">' +
          '<button type="button" data-t="0" aria-pressed="true">' + T('Sin transpositor', 'Without F attachment') + '</button>' +
          '<button type="button" data-t="1" aria-pressed="false">' + T('Con transpositor (Fa)', 'With F attachment') + '</button></div>' +
        '<p class="tm-tb-nota" id="' + uid + '_nota"></p>' +
        '<div class="tm-tb-btns">' + btns + '</div>' +
      '</div>';

    var ro = document.getElementById(uid + '_ro');
    var audio = new Audio();
    var vara = document.getElementById(uid + '_vara');

    var rotor = document.getElementById(uid + '_rotor');
    /* valv: la nota se toca con el transpositor pulsado (rotor encendido y distancias del tubo de Fa) */
    function setSlide(pos, valv) {
      var d = (valv ? GEO.posT : GEO.pos)[pos - 1];
      vara.style.left = pct(GEO.vara[0] + d, GEO.W);
      vara.style.top = pct(GEO.vara[1] + d * GEO.pend, GEO.H);
      rotor.classList.toggle('on', !!valv);
      wrap.querySelectorAll('.tm-tb-marca').forEach(function (m) {
        var esT = m.classList.contains('t');
        m.hidden = esT !== !!valv;
        m.classList.toggle('on', esT === !!valv && parseInt(m.dataset.pos, 10) === pos);
      });
    }
    /* La digitación de una nota en el modo elegido */
    function digit(n, opc) {
      var v = conT && ALT_T[n];
      if (v && (!FING[n] || opc === 'valv' || (!opc && REC_T[n]))) return { pos: v.pos, harm: v.harm, valv: true };
      return FING[n];
    }
    function modo(con) {
      conT = con;
      wrap.querySelectorAll('.tm-tb-modo button').forEach(function (b) { b.setAttribute('aria-pressed', String((b.dataset.t === '1') === con)); });
      wrap.querySelectorAll('.tm-tb-btn').forEach(function (b) {
        var n = b.dataset.n;
        b.hidden = !con && GRAVES_T.indexOf(n) >= 0;
        b.classList.toggle('val', con && !!REC_T[n]);
        b.classList.toggle('alt', con && !!ALT_T[n] && !REC_T[n]);
      });
      document.getElementById(uid + '_nota').textContent = con ? T('En naranja, las notas que se suelen tocar con el transpositor: las cuatro graves que solo existen con él y las que ahorran la 6.ª y la 7.ª posición. Con borde discontinuo, las que también se pueden tocar con él: al elegirlas ves las dos formas. Con transpositor hay seis posiciones, más separadas.', 'In orange, the notes usually played with the F attachment: the four low notes that only exist with it and those that avoid 6th and 7th position. With a dashed border, the notes that can also be played with it: choose one to see both ways. With the F attachment there are six positions, farther apart.') : '';
      if (actual && (con || GRAVES_T.indexOf(actual) < 0)) pick(actual, wrap.querySelector('.tm-tb-btn[data-n="' + actual + '"]'), true);
      else { actual = null; wrap.querySelectorAll('.tm-tb-btn').forEach(function (b) { b.classList.remove('sel'); }); setSlide(1, false); ro.innerHTML = '<span class="tm-tb-hint">' + T('Elige una nota para ver su posición de vara', 'Choose a note to see its slide position') + '</span>'; }
    }

    function play(n) {
      var f = sampleFile(n);
      if (!f) return;
      try { audio.pause(); } catch (e) {}
      audio.src = AUDIO_BASE + f + '.mp3?v=' + AUDIO_V;
      audio.currentTime = 0;
      var pr = audio.play();
      if (pr && pr.catch) pr.catch(function () {});
    }

    function renderStaff(n) {
      var el = document.getElementById(uid + '_staff');
      if (!el) return;
      el.innerHTML = '';
      var vn = vfNote(n); if (!vn) return;
      if (window.tmPentNota) tmPentNota(el, 'bass', vn.key);
    }

    function pick(n, btn, callado, opc) {
      actual = n;
      wrap.querySelectorAll('.tm-tb-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = digit(n, opc);
      if (data) setSlide(data.pos, data.valv);
      // con transpositor, si la nota se puede tocar de las dos formas, se elige cuál ver
      var dos = conT && ALT_T[n] && FING[n], ops = '';
      if (dos) ops = '<div class="tm-tb-ops" role="group" aria-label="' + T('Forma de tocarla', 'Way to play it') + '">' +
        '<button type="button" data-o="normal" aria-pressed="' + !data.valv + '">' + T('Sin pulsarlo: ', 'Not pressed: ') + ORDINAL[FING[n].pos] + '</button>' +
        '<button type="button" class="t" data-o="valv" aria-pressed="' + !!data.valv + '">' + T('Con transpositor: ', 'F attachment: ') + ORDINAL[ALT_T[n].pos] + (REC_T[n] ? T(' (habitual)', ' (usual)') : '') + '</button></div>';
      ro.innerHTML =
        '<div class="tm-tb-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-tb-noterow"><span class="tm-tb-intl">' + label(n) + (FLAT[n] ? ' (' + nm(FLAT[n]) + ')' : '') + '</span>' +
        '<button class="tm-tb-play" type="button" aria-label="' + T('Reproducir la nota', 'Play the note') + '">▶</button></div>' +
        '<div class="tm-tb-reg">' + intl(n) + ' · ' + registro(n) + '</div>' +
        '<div class="tm-tb-keysline">' + (!data ? '' : data.valv
          ? (EN ? ORDINAL[data.pos] + ' position with the F attachment · ' + ordEn(data.harm) + ' harmonic above ' + nm(FUND_T[data.pos]) : ORDINAL[data.pos] + ' posición con transpositor · armónico ' + data.harm + 'º sobre el ' + FUND_T[data.pos])
          : (EN ? ORDINAL[data.pos] + ' position · ' + ordEn(data.harm) + ' harmonic above ' + nm(FUND[data.pos]) : ORDINAL[data.pos] + ' posición · armónico ' + data.harm + 'º sobre el ' + FUND[data.pos])) + '</div>' + ops;
      ro.querySelectorAll('.tm-tb-ops button').forEach(function (b) { b.addEventListener('click', function () { pick(n, btn, true, b.dataset.o); }); });
      renderStaff(n);
      var pb = ro.querySelector('.tm-tb-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      if (!callado) play(n);
    }

    setSlide(1, false);
    wrap.querySelectorAll('.tm-tb-modo button').forEach(function (b) { b.addEventListener('click', function () { modo(b.dataset.t === '1'); }); });
    wrap.querySelectorAll('.tm-tb-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmTrombonEngine = tmTrombonEngine;
})();
