/* Diagrama de digitaciones del saxofón (familia, sistema Boehm-saxo) — interactivo.
   Los cuatro saxofones de banda/orquesta (soprano, alto, tenor y barítono) comparten
   EXACTAMENTE la misma digitación y la misma escritura; solo cambia la transposición.
   Por eso el diagrama es único y un selector permite elegir el miembro: cambia la
   nota REAL que suena ("suena X"), no los dedos. El sonido de ejemplo es de saxo alto.
   Uso: <div id="x"></div><script>tmSaxofonEngine('x');</script>
   Datos decodificados celda a celda de la carta oficial Yamaha "Saxophone Fingerings"
   (FC-SX), verificados dos veces (clasificación por ROI + lectura visual). Rango de la
   carta: Si♭3–Fa♯6 escritos (el La3 grave solo lo da el barítono y se comenta aparte).
   Notación en clave de sol, idéntica para los cuatro miembros. */
(function () {
  'use strict';

  // Elementos que se ENCIENDEN (data-k). El resto del dibujo es decorativo.
  // Vista frontal de un saxo vertical: tudel/boquilla arriba, campana abocinada
  // abajo a la derecha. Mano izquierda arriba, mano derecha abajo.
  var KEYS = [
    // Pulgar izquierdo / índice: octava y Fa frontal
    { id: 'OCT', sh: 'oct',  x: 128, y: 226 },  // llave de octava (pulgar izq.)
    { id: 'FR',  sh: 'tiny', x: 150, y: 214 },  // Fa frontal (altísimo)
    // Palmas de la mano izquierda (lado derecho del tubo)
    { id: 'P1',  sh: 'palm', x: 214, y: 232 },  // palma Re
    { id: 'P2',  sh: 'palm', x: 228, y: 256 },  // palma Mi♭
    { id: 'P3',  sh: 'palm', x: 242, y: 280 },  // palma Fa
    // Agujeros mano izquierda (1-3) + bis
    { id: 'L1',  sh: 'hole', x: 175, y: 258 },
    { id: 'BIS', sh: 'small',x: 150, y: 286 },  // llave «bis» (Si♭)
    { id: 'L2',  sh: 'hole', x: 175, y: 312 },
    { id: 'L3',  sh: 'hole', x: 175, y: 366 },
    // Llaves laterales derechas (canto de la mano derecha)
    { id: 'SE',  sh: 'side', x: 236, y: 356 },  // lateral Mi (altísimo)
    { id: 'SBB', sh: 'side', x: 232, y: 402 },  // lateral Si♭
    { id: 'SC',  sh: 'side', x: 236, y: 430 },  // lateral Do
    { id: 'SFS', sh: 'side', x: 238, y: 470 },  // Fa♯ agudo
    // Racimo del meñique izquierdo (lado izquierdo): Sol♯ y graves
    { id: 'GS',  sh: 'spat', x: 132, y: 430 },  // Sol♯
    { id: 'LCS', sh: 'spat', x: 122, y: 470 },  // Do♯ grave
    { id: 'LB',  sh: 'spat', x: 118, y: 500 },  // Si grave
    { id: 'LBB', sh: 'spat', x: 126, y: 528 },  // Si♭ grave
    // Agujeros mano derecha (4-6)
    { id: 'R4',  sh: 'hole', x: 175, y: 470 },
    { id: 'R5',  sh: 'hole', x: 175, y: 524 },
    { id: 'R6',  sh: 'hole', x: 175, y: 578 },
    // Meñique derecho: Mi♭ grave y Do grave
    { id: 'TEB', sh: 'spat', x: 214, y: 612 },  // Mi♭ grave
    { id: 'TC',  sh: 'spat', x: 150, y: 628 }   // Do grave
  ];
  var SVG_W = 360, SVG_H = 760;

  var NAMES = {
    OCT: 'llave de octava', FR: 'Fa frontal',
    P1: 'palma Re', P2: 'palma Mi♭', P3: 'palma Fa',
    L1: 'agujero 1', BIS: 'llave bis (Si♭)', L2: 'agujero 2', L3: 'agujero 3',
    SE: 'lateral Mi', SBB: 'lateral Si♭', SC: 'lateral Do', SFS: 'Fa♯ agudo',
    GS: 'Sol♯ (meñique izq.)', LCS: 'Do♯ grave', LB: 'Si grave', LBB: 'Si♭ grave',
    R4: 'agujero 4', R5: 'agujero 5', R6: 'agujero 6',
    TEB: 'Mi♭ grave', TC: 'Do grave'
  };

  // Digitaciones estándar (carta Yamaha FC-SX), Si♭3–Fa♯6 escritos.
  var FING = {
    'La#3': { keys: ['L1', 'L2', 'L3', 'R4', 'R5', 'R6', 'LBB', 'TC'] },
    'Si3':  { keys: ['L1', 'L2', 'L3', 'R4', 'R5', 'R6', 'LB', 'TC'] },
    'Do4':  { keys: ['L1', 'L2', 'L3', 'R4', 'R5', 'R6', 'TC'] },
    'Do#4': { keys: ['L1', 'L2', 'L3', 'R4', 'R5', 'R6', 'LCS', 'TC'] },
    'Re4':  { keys: ['L1', 'L2', 'L3', 'R4', 'R5', 'R6'] },
    'Re#4': { keys: ['L1', 'L2', 'L3', 'R4', 'R5', 'R6', 'TEB'] },
    'Mi4':  { keys: ['L1', 'L2', 'L3', 'R4', 'R5'] },
    'Fa4':  { keys: ['L1', 'L2', 'L3', 'R4'] },
    'Fa#4': { keys: ['L1', 'L2', 'L3', 'R5'] },
    'Sol4': { keys: ['L1', 'L2', 'L3'] },
    'Sol#4':{ keys: ['L1', 'L2', 'L3', 'GS'] },
    'La4':  { keys: ['L1', 'L2'] },
    'La#4': { keys: ['L1', 'L2', 'SBB'] },
    'Si4':  { keys: ['L1'] },
    'Do5':  { keys: ['L2'] },
    'Do#5': { keys: [] },
    'Re5':  { keys: ['OCT', 'L1', 'L2', 'L3', 'R4', 'R5', 'R6'] },
    'Re#5': { keys: ['OCT', 'L1', 'L2', 'L3', 'R4', 'R5', 'R6', 'TEB'] },
    'Mi5':  { keys: ['OCT', 'L1', 'L2', 'L3', 'R4', 'R5'] },
    'Fa5':  { keys: ['OCT', 'L1', 'L2', 'L3', 'R4'] },
    'Fa#5': { keys: ['OCT', 'L1', 'L2', 'L3', 'R5'] },
    'Sol5': { keys: ['OCT', 'L1', 'L2', 'L3'] },
    'Sol#5':{ keys: ['OCT', 'L1', 'L2', 'L3', 'GS'] },
    'La5':  { keys: ['OCT', 'L1', 'L2'] },
    'La#5': { keys: ['OCT', 'L1', 'L2', 'SBB'] },
    'Si5':  { keys: ['OCT', 'L1'] },
    'Do6':  { keys: ['OCT', 'L2'] },
    'Do#6': { keys: ['OCT'] },
    'Re6':  { keys: ['OCT', 'P1'] },
    'Re#6': { keys: ['OCT', 'P1', 'P2'] },
    'Mi6':  { keys: ['OCT', 'P1', 'P2', 'SE'] },
    'Fa6':  { keys: ['OCT', 'P1', 'P2', 'P3', 'SE'] },
    'Fa#6': { keys: ['OCT', 'FR', 'L2', 'SBB'] }
  };
  var ORDEN = [
    'La#3', 'Si3', 'Do4', 'Do#4', 'Re4', 'Re#4', 'Mi4', 'Fa4', 'Fa#4', 'Sol4', 'Sol#4', 'La4', 'La#4', 'Si4',
    'Do5', 'Do#5', 'Re5', 'Re#5', 'Mi5', 'Fa5', 'Fa#5', 'Sol5', 'Sol#5', 'La5', 'La#5', 'Si5',
    'Do6', 'Do#6', 'Re6', 'Re#6', 'Mi6', 'Fa6', 'Fa#6'
  ];
  var SUB = { '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇' };
  var FLAT = {
    'La#3': 'Si♭₃', 'Re#4': 'Mi♭₄', 'Fa#4': 'Sol♭₄', 'Sol#4': 'La♭₄', 'La#4': 'Si♭₄',
    'Do#5': 'Re♭₅', 'Re#5': 'Mi♭₅', 'Fa#5': 'Sol♭₅', 'Sol#5': 'La♭₅', 'La#5': 'Si♭₅',
    'Do#6': 'Re♭₆', 'Re#6': 'Mi♭₆', 'Fa#6': 'Sol♭₆'
  };
  // Miembros de la familia: transposición en semitonos por debajo de lo escrito.
  var MIEMBROS = {
    soprano:  { et: 'Soprano en Si♭', st: 2 },
    alto:     { et: 'Alto en Mi♭',   st: 9 },
    tenor:    { et: 'Tenor en Si♭',  st: 14 },
    baritono: { et: 'Barítono en Mi♭', st: 21 }
  };
  var ORDEN_MIEMBROS = ['soprano', 'alto', 'tenor', 'baritono'];

  var LETTER = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  var ES_SHARP = ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'];
  var ES_FLAT = ['Do', 'Re♭', 'Re', 'Mi♭', 'Mi', 'Fa', 'Sol♭', 'Sol', 'La♭', 'La', 'Si♭', 'Si'];

  function label(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return n;
    return m[1] + (m[2] ? '♯' : '') + SUB[m[3]];
  }
  function toMidi(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return null;
    var pc = ES_SHARP.indexOf(m[1] + (m[2] || ''));
    return pc + (parseInt(m[3], 10) + 1) * 12;
  }
  // nombre real (bemoles) a partir de un midi
  function suenaLabel(midi) {
    var pc = ((midi % 12) + 12) % 12;
    var oct = Math.floor(midi / 12) - 1;
    var nm = ES_FLAT[pc];
    var base = nm.replace('♭', '');
    return base + (nm.indexOf('♭') >= 0 ? '♭' : '') + (SUB[String(oct)] || ('' + oct));
  }
  function registro(n) {
    var i = ORDEN.indexOf(n);
    if (i >= 0 && i <= ORDEN.indexOf('Do#5')) return 'Registro grave';
    if (i <= ORDEN.indexOf('Do#6')) return 'Registro agudo (con octava)';
    return 'Registro sobreagudo';
  }

  var AUDIO_BASE = '/assets/audio/saxofon/';
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
    '.tm-sx-wrap{margin:18px 0;}',
    '.tm-sx-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-sx-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-sx-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-sx-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-sx-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;display:flex;justify-content:center;}',
    '.tm-sx-svg{display:block;max-width:270px;width:100%;height:auto;margin:0 auto;}',
    '.tm-sx-key .k-pad{fill:#e9eaee;stroke:#8f9199;stroke-width:1.5;}',
    '.tm-sx-key.on .k-pad{fill:#8b6914;stroke:#6b5010;}',
    '.tm-sx-key .k-ring{fill:none;stroke:#8f9199;stroke-width:1.2;}',
    '.tm-sx-key.on .k-ring{stroke:#e8dcc0;}',
    '.tm-sx-klab{font-family:Arial,Helvetica,sans-serif;font-size:11px;fill:#555;text-anchor:middle;}',
    '.tm-sx-klab2{font-family:Arial,Helvetica,sans-serif;font-size:9px;fill:#777;text-anchor:middle;}',
    '.tm-sx-grp{font-family:Arial,Helvetica,sans-serif;font-size:12px;fill:#8b6914;text-anchor:middle;font-weight:bold;}',
    '.tm-sx-sel{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:12px;}',
    '.tm-sx-selbtn{padding:8px 14px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:20px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.9rem;}',
    '.tm-sx-selbtn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-sx-selbtn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-sx-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-sx-btn{min-width:46px;padding:10px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-sx-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-sx-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-sx-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-sx-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-sx-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-sx-play:hover{background:#6b5010;}',
    '.tm-sx-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-sx-staff svg{max-width:100%;height:auto;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-sx-css')) return;
    var s = document.createElement('style'); s.id = 'tm-sx-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  // Dibujo estático: saxofón vertical estilizado (tudel curvo con boquilla arriba,
  // cuerpo cónico, campana abocinada abajo a la derecha) con la mecánica plateada.
  var DECO =
    '<defs><linearGradient id="tmSxBrass" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#f4c542"/><stop offset="0.4" stop-color="#d9a520"/>' +
      '<stop offset="0.75" stop-color="#b8860b"/><stop offset="1" stop-color="#8a6208"/>' +
    '</linearGradient></defs>' +
    // tudel curvo + boquilla (arriba a la izquierda)
    '<path d="M150 150 C150 118 132 96 108 84" stroke="#c9a53a" stroke-width="10" fill="none" stroke-linecap="round"/>' +
    '<path d="M108 84 C96 78 84 76 74 78 L70 66 C82 62 98 63 110 70 Z" fill="#2a2a2a" stroke="#151515" stroke-width="1"/>' +
    '<ellipse cx="72" cy="72" rx="7" ry="9" fill="#3a3a3a"/>' +
    // cuerpo cónico principal (vertical, ensancha hacia abajo)
    '<path d="M158 150 L150 560 C150 600 160 632 182 650 L214 640 C204 610 200 585 200 560 L200 160 Z" fill="url(#tmSxBrass)" stroke="#7a5a08" stroke-width="1.4"/>' +
    // campana abocinada (abajo a la derecha)
    '<path d="M182 650 C168 690 176 726 214 738 C258 748 292 726 300 690 C304 664 296 642 276 628 L214 640 C206 646 192 650 182 650 Z" fill="url(#tmSxBrass)" stroke="#7a5a08" stroke-width="1.4"/>' +
    '<ellipse cx="266" cy="702" rx="40" ry="14" fill="#c8960f" stroke="#7a5a08" stroke-width="1.2" transform="rotate(24 266 702)"/>' +
    // aro del tudel y anilla del cuerpo
    '<rect x="150" y="146" width="52" height="12" rx="3" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    // varilla larga de la mecánica (lado derecho del cuerpo)
    '<line x1="196" y1="240" x2="196" y2="590" stroke="#b9bbc1" stroke-width="1.6"/>' +
    '<line x1="152" y1="300" x2="152" y2="590" stroke="#b9bbc1" stroke-width="1.4"/>' +
    // varillas cortas a las llaves del meñique izquierdo
    '<line x1="150" y1="430" x2="138" y2="430" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="150" y1="470" x2="128" y2="470" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="150" y1="500" x2="124" y2="500" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="150" y1="528" x2="132" y2="528" stroke="#b9bbc1" stroke-width="1.3"/>' +
    // etiquetas
    '<text class="tm-sx-klab" x="70" y="54">Boquilla</text>' +
    '<text class="tm-sx-klab" x="300" y="726">Campana</text>' +
    '<text class="tm-sx-grp" x="250" y="250">Palmas</text>' +
    '<text class="tm-sx-klab2" x="258" y="266">(Re·Mi♭·Fa)</text>' +
    '<text class="tm-sx-grp" x="92" y="250">Mano</text>' +
    '<text class="tm-sx-grp" x="92" y="263">izquierda</text>' +
    '<text class="tm-sx-grp" x="92" y="560">Mano</text>' +
    '<text class="tm-sx-grp" x="92" y="573">derecha</text>' +
    '<text class="tm-sx-klab2" x="100" y="430">Sol♯</text>' +
    '<text class="tm-sx-klab2" x="92" y="500">graves</text>' +
    '<text class="tm-sx-klab2" x="262" y="404">laterales</text>' +
    '<text class="tm-sx-klab" style="fill:#7a5a08" x="175" y="262">1</text>' +
    '<text class="tm-sx-klab" style="fill:#7a5a08" x="175" y="316">2</text>' +
    '<text class="tm-sx-klab" style="fill:#7a5a08" x="175" y="370">3</text>' +
    '<text class="tm-sx-klab" style="fill:#7a5a08" x="175" y="474">4</text>' +
    '<text class="tm-sx-klab" style="fill:#7a5a08" x="175" y="528">5</text>' +
    '<text class="tm-sx-klab" style="fill:#7a5a08" x="175" y="582">6</text>';

  function keyShape(k) {
    var open = '<g class="tm-sx-key" data-k="' + k.id + '">', close = '</g>';
    if (k.sh === 'oct') {
      return open + '<ellipse class="k-pad" cx="' + k.x + '" cy="' + k.y + '" rx="6" ry="9"/>' + close;
    }
    if (k.sh === 'tiny') {
      return open + '<ellipse class="k-pad" cx="' + k.x + '" cy="' + k.y + '" rx="5" ry="4"/>' + close;
    }
    if (k.sh === 'small') {
      return open + '<circle class="k-pad" cx="' + k.x + '" cy="' + k.y + '" r="7"/>' + close;
    }
    if (k.sh === 'palm') {
      return open + '<rect class="k-pad" x="' + (k.x - 6) + '" y="' + (k.y - 10) + '" width="12" height="20" rx="6" transform="rotate(28 ' + k.x + ' ' + k.y + ')"/>' + close;
    }
    if (k.sh === 'side') {
      return open + '<rect class="k-pad" x="' + (k.x - 5) + '" y="' + (k.y - 9) + '" width="10" height="18" rx="5"/>' + close;
    }
    if (k.sh === 'spat') {
      return open + '<rect class="k-pad" x="' + (k.x - 8) + '" y="' + (k.y - 5) + '" width="16" height="10" rx="5"/>' + close;
    }
    // hole: plato con anillo decorativo
    var r = k.r || 11;
    return open +
      '<circle class="k-pad" cx="' + k.x + '" cy="' + k.y + '" r="' + r + '"/>' +
      '<circle class="k-ring" cx="' + k.x + '" cy="' + k.y + '" r="5"/>' + close;
  }

  function tmSaxofonEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;
    var miembro = 'alto';
    var seleccion = null;

    var keysSvg = KEYS.map(keyShape).join('');
    var selBtns = ORDEN_MIEMBROS.map(function (mk) {
      return '<button class="tm-sx-selbtn' + (mk === miembro ? ' sel' : '') + '" data-m="' + mk + '">' + MIEMBROS[mk].et + '</button>';
    }).join('');
    var btns = ORDEN.map(function (n) {
      return '<button class="tm-sx-btn" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-sx-wrap">' +
        '<div class="tm-sx-sel">' + selBtns + '</div>' +
        '<div class="tm-sx-readout" id="' + uid + '_ro"><span class="tm-sx-hint">Elige un saxofón y una nota para ver su digitación</span></div>' +
        '<div class="tm-sx-diagram"><svg class="tm-sx-svg" viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '" role="img" aria-label="Diagrama de digitación del saxofón: instrumento vertical con la boquilla arriba y la campana abocinada abajo; las llaves pulsadas se muestran en dorado">' +
          DECO + keysSvg +
        '</svg></div>' +
        '<div class="tm-sx-btns">' + btns + '</div>' +
      '</div>';

    var svg = wrap.querySelector('.tm-sx-svg');
    var ro = document.getElementById(uid + '_ro');
    var audio = new Audio();

    function play(n) {
      var f = sampleFile(n);
      if (!f) return;
      try { audio.pause(); } catch (e) {}
      audio.src = AUDIO_BASE + f + '.mp3';
      // El banco es de saxo alto (suena escrito−9). Para que cada miembro suene su
      // altura REAL, se desplaza el tono de la muestra: shift = 9 − transposición.
      // (alto = 0; soprano +7; tenor −5; barítono −12.) Se cambia la velocidad de
      // reproducción sin conservar el tono, así el sonido sube o baja al concert real.
      var shift = 9 - MIEMBROS[miembro].st;
      audio.preservesPitch = false;
      audio.mozPreservesPitch = false;
      audio.webkitPreservesPitch = false;
      audio.playbackRate = Math.pow(2, shift / 12);
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
      if (s) { s.setAttribute('viewBox', '0 0 150 150'); s.style.width = '140px'; s.style.maxWidth = '100%'; s.style.height = 'auto'; }
    }

    function pick(n, btn) {
      seleccion = n;
      wrap.querySelectorAll('.tm-sx-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = FING[n];
      svg.querySelectorAll('.tm-sx-key').forEach(function (c) { c.classList.remove('on'); });
      var nombres = [];
      if (data) data.keys.forEach(function (id) {
        var c = svg.querySelector('.tm-sx-key[data-k="' + id + '"]'); if (c) c.classList.add('on');
        if (NAMES[id]) nombres.push(NAMES[id]);
      });
      var real = suenaLabel(toMidi(n) - MIEMBROS[miembro].st);
      var esAlto = miembro === 'alto';
      ro.innerHTML =
        '<div class="tm-sx-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-sx-noterow"><span class="tm-sx-intl">' + label(n) + (FLAT[n] ? ' (' + FLAT[n] + ')' : '') + '</span>' +
        '<button class="tm-sx-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-sx-reg">' + intl(n) + ' · en el ' + MIEMBROS[miembro].et.toLowerCase() + ' suena ' + real +
        '<br>' + registro(n) + (esAlto ? '' : ' · timbre derivado del saxo alto') + '</div>' +
        '<div class="tm-sx-keysline">' + (nombres.length ? nombres.join(' · ') : 'todas las llaves abiertas') + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-sx-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    wrap.querySelectorAll('.tm-sx-selbtn').forEach(function (b) {
      b.addEventListener('click', function () {
        miembro = b.dataset.m;
        wrap.querySelectorAll('.tm-sx-selbtn').forEach(function (x) { x.classList.remove('sel'); });
        b.classList.add('sel');
        if (seleccion) {
          var cur = wrap.querySelector('.tm-sx-btn[data-n="' + seleccion + '"]');
          pick(seleccion, cur);
        }
      });
    });
    wrap.querySelectorAll('.tm-sx-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmSaxofonEngine = tmSaxofonEngine;
})();
