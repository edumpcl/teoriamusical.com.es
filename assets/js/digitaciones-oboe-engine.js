/* Diagrama de digitaciones del oboe (sistema Conservatorio) — interactivo, estilo flauta.
   Diagrama horizontal propio (caña a la izq., campana a la dcha.), en el estilo del
   motor de la flauta: llave plateada = abierta, llave dorada = pulsada.
   Uso: <div id="x"></div><script>tmOboeEngine('x');</script>
   Datos verificados contra las tablas de Cdang de Commons: "Tablature hautbois 18 clefs
   deux octaves" (Si♭3–Do6) y "Tablature hautbois 18 clefs contre notes" (Do#6–Sol6),
   decodificadas del SVG original forma a forma. */
(function () {
  'use strict';

  // Elementos que se ENCIENDEN (data-k). El resto de la mecánica es decorativa (estática).
  // hole: 6 agujeros/platos (L1-L3 mano izq., R1-R3 mano der.). half: medio agujero sobre L1.
  // oct: llaves de octava. loop/spat: llaves de meñique y llave de Fa.
  /* Coordenadas sobre las DOS FOTOS del oboe (Yamaha YOB-831). El instrumento es
     finisimo (proporcion 0,12): entero y en vertical se quedaria en 74 px de ancho, asi
     que se parte por la union de las articulaciones y se muestran en dos columnas, que
     ademas es como se dibujan las cartas de oboe.

     Se calibro a mano. Detalles que costaron:
       - El corte entre articulaciones va en y=1760 del original. En y=1830 partia por la
         mitad el plato de R1 y lo dejaba pegado al borde.
       - Los agujeros 1, 2, 3 y 6 son ANILLOS con el centro oscuro; el 4 y el 5 son platos
         lisos. Por eso el oboe si se puede calibrar y el flautin no.
       - La llave de Fa (FK) es la palanca alargada entre los agujeros 5 y 6.
       - El racimo del menique izquierdo tiene CINCO palancas: Sol#, Mi bemol, Si y Si
         bemol son cuatro de ellas; el Mi bemol es la que se separa hacia la izquierda.
     La 1a llave de octava (OCT1) va en el pulgar, detras, y no sale en ninguna foto:
     se dibuja aparte en buildPulgar(). El MEDIO AGUJERO (L1h) no es una llave: es el
     agujero 1 tapado a medias, asi que se pinta como media luna sobre L1. */
  var FOTOS = {
    sup: {
      img: 'digitacion-sup', w: 495, h: 1460,
      titulo: 'Articulaci\u00f3n superior \u00b7 mano izquierda',
      alt: 'Articulaci\u00f3n superior de un oboe vista de frente; las llaves que se pulsan se iluminan en dorado',
      k: {
        L1:  [251,  579, 26], L2: [248, 802, 26], L3: [248, 1021, 26],
        OCT2:[250,  648, 16], OCT3:[401, 514, 16],
        LP1: [395, 1059, 18], LP2:[341, 1155, 18], LP3:[423, 1133, 18], LP4:[460, 1171, 18]
      }
    },
    inf: {
      img: 'digitacion-inf', w: 495, h: 1340,
      titulo: 'Articulaci\u00f3n inferior \u00b7 mano derecha',
      alt: 'Articulaci\u00f3n inferior de un oboe vista de frente; las llaves que se pulsan se iluminan en dorado',
      k: {
        R1: [250,  77, 26], R2: [248, 187, 26], R3: [247, 387, 26],
        FK: [248, 298, 20],
        RP1:[ 76, 448, 18], RP2:[130, 505, 18], RP3:[ 46, 534, 18]
      }
    }
  };
  var ORDEN_FOTOS = ['sup', 'inf'];

  var ALL6 = ['L1', 'L2', 'L3', 'R1', 'R2', 'R3'];
  // Digitaciones verificadas contra la tabla de Cdang (Commons,
  // "Tablature hautbois 18 clefs deux octaves"), columna a columna.
  // L1h = medio agujero en L1. FK = llave de Fa.
  var FING = {
    'La#3': { keys: ALL6.concat(['LP4', 'RP1']) },            // Sib3: 6 + Sib grave + Do
    'Si3':  { keys: ALL6.concat(['LP3', 'RP1']) },            // 6 + Si grave + Do
    'Do4':  { keys: ALL6.concat(['RP1']) },                   // 6 + Do grave
    'Do#4': { keys: ALL6.concat(['RP2']) },                   // 6 + Do#
    'Re4':  { keys: ALL6.slice() },
    'Re#4': { keys: ALL6.concat(['RP3']) },                   // alt: ALL6 + LP2 (Mib izq.)
    'Mi4':  { keys: ['L1', 'L2', 'L3', 'R1', 'R2'] },
    'Fa4':  { keys: ['L1', 'L2', 'L3', 'R1', 'R2', 'FK'] },   // alt horquilla: L1 L2 L3 R1 R3
    'Fa#4': { keys: ['L1', 'L2', 'L3', 'R1'] },
    'Sol4': { keys: ['L1', 'L2', 'L3'] },
    'Sol#4':{ keys: ['L1', 'L2', 'L3', 'LP1'] },
    'La4':  { keys: ['L1', 'L2'] },
    'La#4': { keys: ['L1', 'L2', 'R1'] },                     // Sib4: 1-2 + 4
    'Si4':  { keys: ['L1'] },
    'Do5':  { keys: ['L1', 'R1'] },                           // 1 + 4
    'Do#5': { keys: ['L1h', 'L2', 'L3', 'R1', 'R2', 'R3', 'RP2'] },
    'Re5':  { keys: ['L1h', 'L2', 'L3', 'R1', 'R2', 'R3'] },  // ½ + 2-6 (SIN llave de octava)
    'Re#5': { keys: ['L1h', 'L2', 'L3', 'R1', 'R2', 'R3', 'RP3'] }, // alt: con LP2
    'Mi5':  { keys: ['OCT1', 'L1', 'L2', 'L3', 'R1', 'R2'] },
    'Fa5':  { keys: ['OCT1', 'L1', 'L2', 'L3', 'R1', 'R2', 'FK'] }, // alt horquilla: OCT1 + 1 2 3 4 6
    'Fa#5': { keys: ['OCT1', 'L1', 'L2', 'L3', 'R1'] },
    'Sol5': { keys: ['OCT1', 'L1', 'L2', 'L3'] },
    'Sol#5':{ keys: ['OCT1', 'L1', 'L2', 'L3', 'LP1'] },
    'La5':  { keys: ['OCT2', 'L1', 'L2'] },                   // 2ª octava desde La5
    'La#5': { keys: ['OCT2', 'L1', 'L2', 'R1'] },             // Sib5: 1-2 + 4
    'Si5':  { keys: ['OCT2', 'L1'] },
    'Do6':  { keys: ['OCT2', 'L1', 'R1'] },                   // 1 + 4
    // Sobreagudo (tabla "contre notes" de Cdang). OCT3 = 3ª llave de octava.
    'Do#6': { keys: ['L2', 'L3', 'R1', 'RP1'] },              // 2-3 + 4 + Do grave
    'Re6':  { keys: ['L1h', 'L2', 'L3', 'RP1'] },             // ½ + 2-3 + Do grave
    'Re#6': { keys: ['L1h', 'L2', 'L3', 'R2', 'R3', 'LP3'] }, // ½ + 2-3 + 5-6 + Si grave
    'Mi6':  { keys: ['OCT3', 'L1h', 'L2', 'L3', 'R2', 'R3', 'LP1', 'LP2'] }, // alt: con Mib dcho.
    'Fa6':  { keys: ['OCT3', 'L1h', 'L2', 'R2', 'R3', 'LP1', 'LP2'] },       // alt: con Mib dcho.
    'Fa#6': { keys: ['OCT3', 'L1', 'L2', 'R1', 'RP1'] },      // alt cromática: 1 + 5-6 + Mib dcho.
    'Sol6': { keys: ['OCT3', 'L1', 'L3', 'R1'] }
  };
  var ORDEN = [
    'La#3', 'Si3', 'Do4', 'Do#4', 'Re4', 'Re#4', 'Mi4', 'Fa4', 'Fa#4', 'Sol4', 'Sol#4', 'La4', 'La#4', 'Si4',
    'Do5', 'Do#5', 'Re5', 'Re#5', 'Mi5', 'Fa5', 'Fa#5', 'Sol5', 'Sol#5', 'La5', 'La#5', 'Si5',
    'Do6', 'Do#6', 'Re6', 'Re#6', 'Mi6', 'Fa6', 'Fa#6', 'Sol6'
  ];
  var SUB = { '3': '₃', '4': '₄', '5': '₅', '6': '₆' };
  var FLAT = { 'La#3': 'Si♭₃', 'La#4': 'Si♭₄', 'La#5': 'Si♭₅' };
  function label(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return n;
    return m[1] + (m[2] ? '♯' : '') + SUB[m[3]];
  }
  // Registros como en la página: grave Si♭3–Sol4, medio –Sol5, agudo –Re6, sobreagudo –Sol6.
  function registro(n) {
    var i = ORDEN.indexOf(n);
    if (i >= 0 && i <= ORDEN.indexOf('Sol4')) return 'Registro grave';
    if (i <= ORDEN.indexOf('Sol5')) return 'Registro medio';
    if (i <= ORDEN.indexOf('Re6')) return 'Registro agudo';
    return 'Registro sobreagudo';
  }
  var LETTER = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  var AUDIO_BASE = '/assets/audio/oboe/';
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
    '.tm-ob-wrap{margin:18px 0;}',
    '.tm-ob-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-ob-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-ob-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-ob-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-ob-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:10px 8px;}',
    '.tm-ob-cols{display:flex;gap:14px;justify-content:center;align-items:flex-start;flex-wrap:nowrap;}',
    '.tm-ob-col{position:relative;flex:0 1 auto;min-width:0;display:flex;flex-direction:column;align-items:center;gap:6px;}',
    '.tm-ob-foto{position:relative;}',
    // Se fija la ANCHURA, no la altura: las dos fotos son de 495 px de ancho, asi que
    // asi las dos articulaciones salen a la MISMA escala y un mismo agujero mide igual
    // en las dos. Fijando la altura, la inferior (mas larga) se encogia de ancho.
    '.tm-ob-img{display:block;width:min(30vw,178px);height:auto;border-radius:6px;object-fit:contain;}',
    '.tm-ob-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;}',
    '.tm-ob-cap{font-size:.75rem;color:#888;text-align:center;margin:0;line-height:1.3;}',
    // marcador sobre la foto
    '.tm-ob-key .k-dot{fill:#ff9500;fill-opacity:0;stroke:rgba(255,255,255,0);stroke-width:0;transition:all .16s;}',
    '.tm-ob-key.on .k-dot{fill:#ff9500;fill-opacity:.92;stroke:#fff;stroke-width:5;filter:drop-shadow(0 0 14px #ff9500);}',
    // medio agujero: media luna sobre el agujero 1
    '.tm-ob-key .k-half{fill:#ff9500;fill-opacity:0;stroke:rgba(255,255,255,0);stroke-width:0;transition:all .16s;}',
    '.tm-ob-key.on .k-half{fill:#ff9500;fill-opacity:.92;stroke:#fff;stroke-width:5;filter:drop-shadow(0 0 14px #ff9500);}',
    // panel del pulgar (dibujado)
    '.tm-ob-pulgar{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:12px;flex-wrap:wrap;}',
    '.tm-ob-pulgarsvg{width:min(52vw,190px);height:auto;}',
    '.tm-ob-pulgarcap{font-size:.8rem;color:#777;max-width:290px;margin:0;line-height:1.35;}',
    '.tm-ob-pulgarcap strong{color:#555;}',
    '.tm-ob-th-pad{fill:url(#tmObMet);stroke:#7f828a;stroke-width:1.5;transition:fill .15s,stroke .15s;}',
    '.tm-ob-key.on .tm-ob-th-pad{fill:url(#tmObMetOn);stroke:#fff;stroke-width:2.4;filter:drop-shadow(0 0 6px #ff9500);}',
    '.tm-ob-thlab{font-family:Arial,Helvetica,sans-serif;font-size:12px;fill:#666;text-anchor:middle;}',
    '.tm-ob-credit{font-size:.72rem;color:#9a9a9a;text-align:center;margin-top:8px;}',
    '.tm-ob-credit a{color:inherit;}',
    '.tm-ob-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-ob-btn{min-width:46px;padding:10px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-ob-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-ob-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-ob-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-ob-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-ob-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-ob-play:hover{background:#6b5010;}',
    '.tm-ob-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-ob-staff svg{max-width:100%;height:auto;}',
    /* Movil: las dos columnas siguen en fila (si se apilan, el diagrama mide mas que la
       pantalla). Ancho por flex-basis. VA AL FINAL: los media queries no suman
       especificidad y una regla base posterior les ganaria en cascada. */
    '@media(max-width:600px){.tm-ob-cols{gap:8px;}.tm-ob-col{flex:0 1 48%;min-width:0;}.tm-ob-img{width:100%;}.tm-ob-cap{font-size:.62rem;}}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-ob-css')) return;
    var s = document.createElement('style'); s.id = 'tm-ob-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  // Un marcador por llave. El medio agujero se dibuja como media luna sobre el agujero 1.
  function marcadores(cfg) {
    var s = '';
    for (var id in cfg.k) {
      var c = cfg.k[id];
      s += '<g class="tm-ob-key" data-k="' + id + '">' +
           '<circle class="k-dot" cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '"/></g>';
      if (id === 'L1') {
        // media luna inferior, del mismo radio: el agujero 1 tapado a medias
        s += '<g class="tm-ob-key" data-k="L1h"><path class="k-half" d="M ' + (c[0] - c[2]) + ' ' + c[1] +
             ' a ' + c[2] + ' ' + c[2] + ' 0 0 0 ' + (2 * c[2]) + ' 0 z"/></g>';
      }
    }
    return s;
  }

  function columna(cfg) {
    // El viewBox tiene que coincidir EXACTAMENTE con la foto: aqui la imagen es un <img>
    // aparte y el SVG se superpone encima, asi que cualquier margen cambia la proporcion
    // y descoloca los marcadores. Lo que sobresale no se recorta porque .tm-ob-svg lleva
    // overflow:visible.
    var vb = '0 0 ' + cfg.w + ' ' + cfg.h;
    return '<div class="tm-ob-col">' +
      '<p class="tm-ob-cap">' + cfg.titulo + '</p>' +
      '<div class="tm-ob-foto">' +
        '<picture><source type="image/webp" srcset="/assets/img/oboe/' + cfg.img + '.webp">' +
        '<img class="tm-ob-img" src="/assets/img/oboe/' + cfg.img + '.jpg" width="' + cfg.w + '" height="' + cfg.h + '" loading="lazy" alt="' + cfg.alt + '"></picture>' +
        '<svg class="tm-ob-svg" viewBox="' + vb + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + cfg.alt + '">' + marcadores(cfg) + '</svg>' +
      '</div>' +
    '</div>';
  }

  // La 1a llave de octava va en el pulgar izquierdo, por detras: no sale en la foto.
  function buildPulgar() {
    return '<svg class="tm-ob-pulgarsvg" viewBox="0 0 200 120" role="img" aria-label="Cara oculta del oboe: la primera llave de octava, que acciona el pulgar izquierdo, se ilumina cuando hay que pulsarla">' +
      '<defs>' +
        '<linearGradient id="tmObMet" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0" stop-color="#c9ccd3"/><stop offset=".45" stop-color="#f2f3f6"/><stop offset="1" stop-color="#9fa3ab"/>' +
        '</linearGradient>' +
        '<linearGradient id="tmObMetOn" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0" stop-color="#ffb347"/><stop offset=".45" stop-color="#ffd08a"/><stop offset="1" stop-color="#e08800"/>' +
        '</linearGradient>' +
      '</defs>' +
      // trozo de cuerpo visto por detras: granadillo, oscuro
      '<rect x="72" y="6" width="56" height="108" rx="14" fill="#241f1d" stroke="#0f0d0c" stroke-width="1.2"/>' +
      '<rect x="80" y="12" width="8" height="96" rx="4" fill="#3b3532" opacity=".8"/>' +
      // varilla y gatillo de la 1a octava
      '<line x1="100" y1="22" x2="100" y2="48" stroke="#b9bbc1" stroke-width="2.4"/>' +
      '<g class="tm-ob-key" data-k="OCT1">' +
        '<rect class="tm-ob-th-pad" x="66" y="46" width="68" height="22" rx="11"/>' +
        '<ellipse fill="#fff" opacity=".45" cx="90" cy="53" rx="16" ry="4"/>' +
      '</g>' +
      // apoyo del pulgar (decorativo)
      '<rect x="78" y="82" width="44" height="24" rx="8" fill="#4a4340" stroke="#2b2624" stroke-width="1"/>' +
      '<text class="tm-ob-thlab" x="100" y="118">pulgar izquierdo</text>' +
      '</svg>';
  }

  function tmOboeEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var btns = ORDEN.map(function (n) {
      var hasData = !!FING[n];
      return '<button class="tm-ob-btn' + (hasData ? '' : ' todo') + '" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-ob-wrap">' +
        '<div class="tm-ob-readout" id="' + uid + '_ro"><span class="tm-ob-hint">Elige una nota para ver su digitaci\u00f3n</span></div>' +
        '<div class="tm-ob-diagram">' +
          '<div class="tm-ob-cols">' +
            ORDEN_FOTOS.map(function (n) { return columna(FOTOS[n]); }).join('') +
          '</div>' +
          '<div class="tm-ob-pulgar">' +
            buildPulgar() +
            '<p class="tm-ob-pulgarcap"><strong>Por detr\u00e1s.</strong> La <strong>1.\u00aa llave de octava</strong> la acciona el <strong>pulgar izquierdo</strong> en la cara oculta del tubo, as\u00ed que no sale en las fotos y se dibuja aparte.</p>' +
          '</div>' +
          '<p class="tm-ob-credit">Fotos: oboe Yamaha YOB-831, Yamaha Corporation v\u00eda <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Oboe_YOB-831.tif" target="_blank" rel="noopener">Wikimedia Commons</a>, CC BY-SA 4.0. Llave de octava del pulgar: diagrama propio.</p>' +
        '</div>' +
        '<div class="tm-ob-btns">' + btns + '</div>' +
      '</div>';

    var ro = document.getElementById(uid + '_ro');
    var audio = new Audio();

    function play(n) {
      var f = sampleFile(n);
      if (!f) return;
      try { audio.pause(); } catch (e) {}
      audio.src = AUDIO_BASE + f + '.mp3';
      audio.currentTime = 0;
      var pr = audio.play();
      if (pr && pr.catch) pr.catch(function () {});
    }

    function renderStaff(n) {
      var el = document.getElementById(uid + '_staff');
      if (!el) return;
      el.innerHTML = '';
      if (typeof Vex === 'undefined') return;
      var vn = vfNote(n); if (!vn) return;
      var V = Vex.Flow;
      var r = new V.Renderer(el, V.Renderer.Backends.SVG);
      r.resize(150, 150);
      var ctx = r.getContext(); ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(2, 34, 132);
      stave.addClef('treble').setContext(ctx).draw();
      var note = new V.StaveNote({ keys: [vn.key], duration: 'w', clef: 'treble' });
      if (vn.acc) note.addModifier(new V.Accidental(vn.acc), 0);
      var voice = new V.Voice({ num_beats: 4, beat_value: 4 }).setStrict(false).addTickables([note]);
      new V.Formatter().joinVoices([voice]).format([voice], 80);
      voice.draw(ctx, stave);
      var s = el.querySelector('svg');
      if (s) {
        var vb = '0 0 150 150';
        try { var bb = s.getBBox(); if (bb && bb.height) { var p = 6; vb = (bb.x - p) + ' ' + (bb.y - p) + ' ' + (bb.width + 2 * p) + ' ' + (bb.height + 2 * p); } } catch (e) {}
        s.setAttribute('viewBox', vb);
        s.style.width = '140px'; s.style.maxWidth = '100%'; s.style.height = 'auto';
      }
    }

    function pick(n, btn) {
      wrap.querySelectorAll('.tm-ob-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = FING[n];
      wrap.querySelectorAll('.tm-ob-key').forEach(function (c) { c.classList.remove('on'); });
      if (data) data.keys.forEach(function (id) {
        wrap.querySelectorAll('.tm-ob-key[data-k="' + id + '"]').forEach(function (c) { c.classList.add('on'); });
      });
      var estado = data ? '' : ' · <span class="tm-ob-prov">digitación por confirmar</span>';
      ro.innerHTML =
        '<div class="tm-ob-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-ob-noterow"><span class="tm-ob-intl">' + label(n) + (FLAT[n] ? ' (' + FLAT[n] + ')' : '') + '</span>' +
        '<button class="tm-ob-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-ob-reg">' + intl(n) + ' · ' + registro(n) + estado + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-ob-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    wrap.querySelectorAll('.tm-ob-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmOboeEngine = tmOboeEngine;
})();
