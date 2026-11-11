/* Diagrama de digitaciones del TROMBÓN BAJO (config B♭/F/G♭/D) — interactivo.
   Como el tenor, la nota se elige con la VARA (7 posiciones) y el armónico de los
   labios; pero el bajo añade DOS VÁLVULAS (gatillos de pulgar): la de Fa y la de
   Sol♭. Juntas dan Re, y sirven para bajar al registro grave y rellenar el hueco
   cromático entre el Si♭ pedal y el Mi grave (Si₁, Do₂, Do♯₂, Re₂, Re♯₂).
   NO transpone: lo escrito es lo que suena (clave de fa). Rango Si♭₁–Si♭₄.
   Digitaciones preferentes de la tabla cromática B♭/F/G♭/D (Micah Everett, Univ. of
   Mississippi); de Mi₂ hacia arriba coinciden con el trombón tenor.
   Uso: <div id="x"></div><script>tmTrombonBajoEngine('x');</script> */
(function () {
  'use strict';

  // Inglés: la misma página sirve a <html lang="en"> (el español queda intacto).
  const EN = document.documentElement.lang === 'en';
  const T = (es, en) => EN ? en : es;
  // Nombre de nota en español -> letras (solo se muestra así en inglés; la lógica sigue con los nombres españoles).
  const NOTE_EN = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  const nm = s => EN ? String(s).replace(/Sol|Do|Re|Mi|Fa|La|Si/g, m => NOTE_EN[m]) : s;
  const ordEn = n => n + (n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th');

  /* El diagrama es la FOTO REAL en dos capas, como en el tenor (tools/gen_trombon_vara.py bajo): el cuerpo, con los tubos
     interiores a la vista, y la vara exterior recortada, que se desliza. GEO sale de ese script (píxeles del lienzo): vara =
     [x, y, ancho, alto] en 1.ª posición; pend = inclinación de los tubos; pos = lo que sale la vara en cada posición (0, 86,
     177, 274, 377, 485 y 600 mm reales); punta = el extremo del codo. rotor: centro y radio de cada rotor en la foto (el de
     Fa es el primero que encuentra el aire al salir de la vara: el de abajo a la derecha; el otro, el de Sol♭). */
  var GEO = { W: 2268, H: 682, vara: [581.0, 268.0, 902, 179], pend: 0.0653,
    pos: [0.0, 107.4, 221.3, 341.9, 469.7, 605.0, 748.4], punta: [1480.0, 373.5],
    rotor: { F: [374, 337, 27], Gb: [322, 284, 27] } };
  var IMG = '/assets/img/trombon-bajo/';
  var pct = function (v, total) { return (v / total * 100).toFixed(3) + '%'; };

  // Nota escrita -> { pos: 1-7, harm: armónico (solo notas al aire), valves: null|'F'|'Gb'|'both' }
  var FING = {
    // --- Extensión grave con válvulas (lo propio del bajo) ---
    'La#1': { pos: 5, valves: 'both' },   // Si♭1 (pedal) — Δ5
    'Si1':  { pos: 4, valves: 'both' },   // Δ4
    'Do2':  { pos: 3, valves: 'both' },   // Δ3
    'Do#2': { pos: 2, valves: 'both' },   // Δ2
    'Re2':  { pos: 1, valves: 'both' },   // Δ1
    'Re#2': { pos: 3, valves: 'F' },      // V3
    // --- De aquí arriba, igual que el trombón tenor (al aire) ---
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
  var ORDEN = [
    'La#1', 'Si1', 'Do2', 'Do#2', 'Re2', 'Re#2',
    'Mi2', 'Fa2', 'Fa#2', 'Sol2', 'Sol#2', 'La2', 'La#2',
    'Si2', 'Do3', 'Do#3', 'Re3', 'Re#3', 'Mi3', 'Fa3',
    'Fa#3', 'Sol3', 'Sol#3', 'La3', 'La#3',
    'Si3', 'Do4', 'Do#4', 'Re4', 'Re#4', 'Mi4', 'Fa4',
    'Fa#4', 'Sol4', 'Sol#4', 'La4', 'La#4'
  ];
  var FUND = { 1: 'Si♭', 2: 'La', 3: 'La♭', 4: 'Sol', 5: 'Fa♯', 6: 'Fa', 7: 'Mi' };
  var ORDINAL = { 1: '1ª', 2: '2ª', 3: '3ª', 4: '4ª', 5: '5ª', 6: '6ª', 7: '7ª' };
  if (EN) ORDINAL = { 1: '1st', 2: '2nd', 3: '3rd', 4: '4th', 5: '5th', 6: '6th', 7: '7th' };
  var VTXT = { 'F': 'válvula F', 'Gb': 'válvula G♭', 'both': 'válvulas F + G♭ (dan Re)' };
  if (EN) VTXT = { 'F': 'F valve', 'Gb': 'G♭ valve', 'both': 'F + G♭ valves (together they give D)' };

  var SUB = { '1': '₁', '2': '₂', '3': '₃', '4': '₄' };
  var FLAT = {
    'La#1': 'Si♭₁', 'Do#2': 'Re♭₂', 'Re#2': 'Mi♭₂',
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
    var i = ORDEN.indexOf(n);
    if (i <= ORDEN.indexOf('Re#2')) return T('Registro subgrave (con válvulas)', 'Extended low register (with valves)');
    if (i <= ORDEN.indexOf('Si2')) return T('Registro grave', 'Low register');
    if (i <= ORDEN.indexOf('Si3')) return T('Registro medio', 'Middle register');
    return T('Registro agudo', 'High register');
  }
  var LETTER = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  var AUDIO_BASE = '/assets/audio/trombon-bajo/';
  var AUDIO_V = '1';
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
    '.tm-tbj-wrap{margin:18px 0;}',
    '.tm-tbj-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-tbj-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-tbj-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-tbj-hint{font-size:1.02rem;color:#686868;font-weight:600;}',
    '.tm-tbj-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;}',
    '.tm-tbj-foto{max-width:900px;margin:0 auto;overflow:hidden;}',
    '.tm-tbj-lienzo{position:relative;width:100%;aspect-ratio:' + GEO.W + '/' + GEO.H + ';margin-bottom:-4%;}',   // al lienzo le sobra blanco por abajo
    '.tm-tbj-lienzo img{display:block;width:100%;height:auto;max-width:none;}',
    '.tm-tbj-vara{position:absolute;transition:left .55s cubic-bezier(.3,.1,.2,1),top .55s cubic-bezier(.3,.1,.2,1);}',
    '.tm-tbj-marca{position:absolute;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;background:#f1efe8;border:1.5px solid #8f9199;color:#555;font:700 13px/23px Arial,Helvetica,sans-serif;text-align:center;transition:background .3s,color .3s,transform .3s;}',
    '.tm-tbj-marca.on{background:#8b6914;border-color:#6b5010;color:#fff;transform:scale(1.25);}',
    // los rotores: un aro sobre cada uno, que se enciende, y su nombre debajo
    '.tm-tbj-rotor{position:absolute;aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%);border:2px solid transparent;transition:all .2s;}',
    '.tm-tbj-rotor.on{border-color:#c9730a;background:rgba(255,149,0,.55);box-shadow:0 0 10px 3px rgba(255,149,0,.8);}',
    '.tm-tbj-rnom{position:absolute;transform:translate(-50%,0);padding:1px 7px;border-radius:999px;background:#f1efe8;border:1.5px solid #8f9199;color:#555;font:700 12px/18px Arial,Helvetica,sans-serif;white-space:nowrap;transition:all .2s;}',
    '.tm-tbj-rnom.on{background:#ff9500;border-color:#c9730a;color:#3a2b00;}',
    '.tm-tbj-credito{font-size:.75rem;color:#777;text-align:center;margin:4px 0 0;}',
    '.tm-tbj-credito a{color:inherit;}',
    '@media(max-width:600px){.tm-tbj-marca{width:16px;height:16px;margin:-8px 0 0 -8px;font-size:9.5px;line-height:13.5px;border-width:1px;}.tm-tbj-rnom{font-size:9.5px;line-height:13px;padding:0 4px;border-width:1px;}}',
    '@media(prefers-reduced-motion:reduce){.tm-tbj-vara{transition:none;}}',
    '.tm-tbj-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-tbj-btn{min-width:44px;padding:9px 11px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-tbj-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-tbj-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-tbj-btn.val{border-color:#c9930a;}',
    '.tm-tbj-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-tbj-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-tbj-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-tbj-play:hover{background:#6b5010;}',
    '.tm-tbj-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-tbj-staff svg{max-width:100%;height:auto;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-tbj-css')) return;
    var s = document.createElement('style'); s.id = 'tm-tbj-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  var VALVES = [{ id: 'Gb', label: T('Sol♭', 'G♭'), dx: -78 }, { id: 'F', label: T('Fa', 'F'), dx: 30 }];
  function valvulas() {
    return VALVES.map(function (v) {
      var c = GEO.rotor[v.id];
      return '<span class="tm-tbj-rotor tm-tbj-valve" data-v="' + v.id + '" style="left:' + pct(c[0], GEO.W) + ';top:' + pct(c[1], GEO.H) + ';width:' + pct(2 * c[2], GEO.W) + '"></span>' +
        '<span class="tm-tbj-rnom tm-tbj-valve" data-v="' + v.id + '" style="left:' + pct(c[0] + v.dx, GEO.W) + ';top:' + pct(425, GEO.H) + '">' + v.label + '</span>';
    }).join('');
  }
  /* Los números de las 7 posiciones, debajo de donde queda la punta de la vara en cada una */
  function marcas() {
    var out = '';
    for (var p = 1; p <= 7; p++) {
      var d = GEO.pos[p - 1];
      out += '<span class="tm-tbj-marca" data-pos="' + p + '" style="left:' + pct(GEO.punta[0] + d - 34, GEO.W) + ';top:' + pct(GEO.punta[1] + d * GEO.pend + 112, GEO.H) + '">' + p + '</span>';
    }
    return out;
  }

  function tmTrombonBajoEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var btns = ORDEN.map(function (n) {
      var val = FING[n] && FING[n].valves ? ' val' : '';
      return '<button class="tm-tbj-btn' + val + '" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-tbj-wrap">' +
        '<div class="tm-tbj-readout" id="' + uid + '_ro"><span class="tm-tbj-hint">' + T('Elige una nota para ver su posición y válvulas', 'Choose a note to see its position and valves') + '</span></div>' +
        '<div class="tm-tbj-diagram"><div class="tm-tbj-foto"><div class="tm-tbj-lienzo" role="img" aria-label="' + T('Foto de un trombón bajo: la vara se desliza hasta la posición de la nota elegida, de la 1.ª (recogida) a la 7.ª (extendida del todo), y los dos rotores (Fa y Sol bemol) se iluminan cuando la nota los usa; debajo, los números de las siete posiciones', 'Photo of a bass trombone: the slide moves to the position of the chosen note, from 1st (closed) to 7th (fully extended), and the two rotary valves (F and G flat) light up when the note uses them; below, the numbers of the seven positions') + '">' +
          '<picture><source type="image/webp" srcset="' + IMG + 'vara-cuerpo.webp"><img src="' + IMG + 'vara-cuerpo.jpg" width="' + GEO.W + '" height="' + GEO.H + '" alt="" decoding="async"></picture>' +
          '<picture class="tm-tbj-vara" id="' + uid + '_vara" style="width:' + pct(GEO.vara[2], GEO.W) + '"><source type="image/webp" srcset="' + IMG + 'vara-movil.webp"><img src="' + IMG + 'vara-movil.png" width="' + GEO.vara[2] + '" height="' + GEO.vara[3] + '" alt="" decoding="async"></picture>' +
          valvulas() + marcas() +
        '</div></div>' +
        '<p class="tm-tbj-credito">' + T('Foto: ', 'Photo: ') + '<a href="https://commons.wikimedia.org/wiki/File:Yamaha_Bass_trombone_YBL-822_G_horizontal.tif" rel="nofollow">Yamaha Corporation</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>' + T(' (vara separada y movida)', ' (slide cut out and moved)') + '</p></div>' +
        '<div class="tm-tbj-btns">' + btns + '</div>' +
      '</div>';

    var ro = document.getElementById(uid + '_ro');
    var audio = new Audio();
    var vara = document.getElementById(uid + '_vara');

    function setSlide(pos) {
      var d = GEO.pos[pos - 1];
      vara.style.left = pct(GEO.vara[0] + d, GEO.W);
      vara.style.top = pct(GEO.vara[1] + d * GEO.pend, GEO.H);
      wrap.querySelectorAll('.tm-tbj-marca').forEach(function (m) { m.classList.toggle('on', parseInt(m.dataset.pos, 10) === pos); });
    }
    function setValves(v) {
      var onF = v === 'F' || v === 'both';
      var onG = v === 'Gb' || v === 'both';
      wrap.querySelectorAll('.tm-tbj-valve').forEach(function (g) {
        var id = g.dataset.v;
        g.classList.toggle('on', (id === 'F' && onF) || (id === 'Gb' && onG));
      });
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

    function pick(n, btn) {
      wrap.querySelectorAll('.tm-tbj-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = FING[n];
      if (data) { setSlide(data.pos); setValves(data.valves || null); }
      var detail = data
        ? ORDINAL[data.pos] + T(' posición', ' position') + (data.valves ? ' · ' + VTXT[data.valves]
            : (data.harm ? (EN ? ' · ' + ordEn(data.harm) + ' harmonic above ' + nm(FUND[data.pos]) : ' · armónico ' + data.harm + 'º sobre el ' + FUND[data.pos]) : ''))
        : '';
      ro.innerHTML =
        '<div class="tm-tbj-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-tbj-noterow"><span class="tm-tbj-intl">' + label(n) + (FLAT[n] ? ' (' + nm(FLAT[n]) + ')' : '') + '</span>' +
        '<button class="tm-tbj-play" type="button" aria-label="' + T('Reproducir la nota', 'Play the note') + '">▶</button></div>' +
        '<div class="tm-tbj-reg">' + intl(n) + ' · ' + registro(n) + '</div>' +
        '<div class="tm-tbj-keysline">' + detail + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-tbj-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    setSlide(1); setValves(null);
    wrap.querySelectorAll('.tm-tbj-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmTrombonBajoEngine = tmTrombonBajoEngine;
})();
