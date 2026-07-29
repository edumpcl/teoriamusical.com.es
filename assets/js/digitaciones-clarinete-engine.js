/* Diagrama de digitaciones del clarinete en Si♭ (sistema Boehm) — interactivo.
   Sobre FOTOS REALES del clarinete (frontal + trasera): al elegir una nota, las
   llaves y agujeros que se pulsan se ILUMINAN en dorado sobre la foto. La cara
   frontal lleva los seis agujeros con anillo, las de garganta (La y Sol♯), la
   «banana», la deslizante y los racimos del meñique; la cara trasera lleva el
   agujero del pulgar y la llave de registro (12ª).
   Uso: <div id="x"></div><script>tmClarineteEngine('x');</script>
   Datos verificados contra la carta oficial de Yamaha ("Musical Instrument Guide —
   Clarinet fingering chart", PDF), decodificada celda a celda: cubre Mi3–La6 escritos.
   El clarinete en Si♭ TRANSPone: suena un tono por debajo de lo escrito; el marcador
   muestra ambas alturas y el audio reproduce el sonido real.
   Foto: clarinete Yamaha de Eduardo Escrig (autor del sitio). */
(function () {
  'use strict';

  // Coordenadas de cada control sobre la FOTO, en el sistema del viewBox de cada
  // imagen. Frontal (Yamaha YCL-457II recto): viewBox 880×3270 (los 6 agujeros
  // están AUTODETECTADOS sobre la foto nítida; las llaves pequeñas, ajustadas a
  // mano). Trasera (foto propia): 170×334. r = radio; num = nº de agujero (1-6).
  var FRONT_KEYS = [
    { id: 'GS',   x: 641, y: 562,  r: 24 },  // Sol♯ de garganta
    { id: 'A',    x: 430, y: 545,  r: 26 },  // La de garganta
    { id: 'H1',   x: 452, y: 722,  r: 42, num: 1 },
    { id: 'H2',   x: 454, y: 1035, r: 42, num: 2 },
    { id: 'EBBA', x: 443, y: 1191, r: 24 },  // banana Mi♭/Si♭ (entre 2 y 3)
    { id: 'H3',   x: 455, y: 1353, r: 42, num: 3 },
    { id: 'H4',   x: 476, y: 1813, r: 42, num: 4 },
    { id: 'SLI',  x: 437, y: 2285, r: 24 },  // deslizante Si/Fa♯
    { id: 'H5',   x: 474, y: 2141, r: 42, num: 5 },
    { id: 'H6',   x: 473, y: 2441, r: 42, num: 6 }
  ];
  var FRONT_W = 880, FRONT_H = 3270;
  var BACK_KEYS = [
    { id: 'T', x: 78, y: 250, r: 13 },      // agujero del pulgar
    { id: 'R', x: 78, y: 202, r: 11 }       // llave de registro (12ª)
  ];
  var BACK_W = 170, BACK_H = 334;

  // Racimos del MEÑIQUE sobre RECORTES de la propia foto Yamaha en alta resolución
  // (izquierdo = 4 espátulas del meñique izq.; derecho = 4 del meñique dcho.). Cada
  // marcador se ilumina igual que en las fotos de frente/dorso (mismo .k-dot). Las
  // coordenadas (x,y en el sistema del recorte) sitúan el marcador sobre su espátula;
  // se pueden afinar con la herramienta de calibración. El id debe existir en FING.
  // Racimos del MEÑIQUE dibujados como espátulas metálicas (paddles con degradado);
  // la que se pulsa se ilumina en dorado. Geometría {id, cx, cy, w, h, a(ngulo)} en
  // el sistema de cada SVG. id = llave de FING (debe existir).
  var PK_IZQ_VB = '0 0 200 180', PK_DER_VB = '0 0 190 130';
  var PK_IZQ = [
    { id: 'CSGS', cx: 96,  cy: 50,  w: 58, h: 26, a: -20 },  // Do♯/Sol♯
    { id: 'LFCS', cx: 120, cy: 78,  w: 58, h: 24, a: -8 },   // Fa♯/Do♯
    { id: 'LEB',  cx: 80,  cy: 92,  w: 56, h: 24, a: -13 },  // Mi/Si
    { id: 'LAB',  cx: 110, cy: 120, w: 54, h: 24, a: -5 }    // La♭/Mi♭
  ];
  var PK_DER = [
    { id: 'RFCS', cx: 74,  cy: 40, w: 56, h: 24, a: 12 },    // Fa♯/Do♯
    { id: 'RAB',  cx: 132, cy: 50, w: 56, h: 24, a: 8 },     // La♭/Mi♭
    { id: 'REB',  cx: 74,  cy: 82, w: 56, h: 24, a: 7 },     // Mi/Si
    { id: 'RFC',  cx: 120, cy: 90, w: 56, h: 24, a: 4 }      // Fa/Do
  ];
  function pkGrad() {
    return '<defs><linearGradient id="tmclPkMet" x1="0" y1="0" x2="0.4" y2="1">' +
      '<stop offset="0" stop-color="#fdfdfe"/><stop offset="0.45" stop-color="#d8dae0"/>' +
      '<stop offset="0.75" stop-color="#b3b6bd"/><stop offset="1" stop-color="#9a9da5"/></linearGradient>' +
      '<linearGradient id="tmclPkMetOn" x1="0" y1="0" x2="0.4" y2="1">' +
      '<stop offset="0" stop-color="#ffd98a"/><stop offset="0.5" stop-color="#ff9f1a"/>' +
      '<stop offset="1" stop-color="#e07d00"/></linearGradient></defs>';
  }
  function pkSpat(s) {
    var hw = s.w / 2, hh = s.h / 2;
    return '<g class="tm-cl-key" data-k="' + s.id + '" transform="translate(' + s.cx + ' ' + s.cy + ') rotate(' + s.a + ')">' +
      '<rect class="tm-cl-pk-pad" x="' + (-hw) + '" y="' + (-hh) + '" width="' + s.w + '" height="' + s.h + '" rx="' + hh + '"/>' +
      '<rect class="tm-cl-pk-hl" x="' + (-hw + 5) + '" y="' + (-hh + 3) + '" width="' + (s.w - 10) + '" height="' + (s.h * 0.28).toFixed(1) + '" rx="' + (s.h * 0.14).toFixed(1) + '"/>' +
      '</g>';
  }
  function buildPinkySvg(list, vb, label) {
    return '<div class="tm-cl-pkcluster">' +
      '<svg class="tm-cl-pksvg" viewBox="' + vb + '" role="img" aria-label="Espátulas del ' + label + '; la que se pulsa se ilumina en dorado">' +
      pkGrad() + list.map(pkSpat).join('') + '</svg>' +
      '<p class="tm-cl-pkcap">' + label + '</p></div>';
  }

  var NAMES = {
    R: 'registro', T: 'pulgar', A: 'La (garganta)', GS: 'Sol♯ (garganta)',
    H1: 'agujero 1', H2: 'agujero 2', H3: 'agujero 3', H4: 'agujero 4', H5: 'agujero 5', H6: 'agujero 6',
    EBBA: 'banana Mi♭/Si♭', SLI: 'deslizante Si/Fa♯',
    LEB: 'Mi/Si (meñique izq.)', LFCS: 'Fa♯/Do♯ (meñique izq.)', CSGS: 'Do♯/Sol♯ (meñique izq.)',
    RFC: 'Fa/Do (meñique dcho.)', RAB: 'La♭/Mi♭ (meñique dcho.)',
    REB: 'Mi/Si (meñique dcho.)', RFCS: 'Fa♯/Do♯ (meñique dcho.)'
  };

  var ALL6 = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
  // Digitaciones estándar (carta Yamaha), notas ESCRITAS Mi3–La6.
  var FING = {
    'Mi3':  { keys: ['T'].concat(ALL6, ['LEB']) },
    'Fa3':  { keys: ['T'].concat(ALL6, ['RFC']) },
    'Fa#3': { keys: ['T'].concat(ALL6, ['LFCS']) },
    'Sol3': { keys: ['T'].concat(ALL6) },
    'Sol#3':{ keys: ['T'].concat(ALL6, ['RAB']) },
    'La3':  { keys: ['T', 'H1', 'H2', 'H3', 'H4', 'H5'] },
    'La#3': { keys: ['T', 'H1', 'H2', 'H3', 'H4'] },
    'Si3':  { keys: ['T', 'H1', 'H2', 'H3', 'H5'] },          // horquilla clásica
    'Do4':  { keys: ['T', 'H1', 'H2', 'H3'] },
    'Do#4': { keys: ['T', 'H1', 'H2', 'H3', 'CSGS'] },
    'Re4':  { keys: ['T', 'H1', 'H2'] },
    'Re#4': { keys: ['T', 'H1', 'H2', 'EBBA'] },
    'Mi4':  { keys: ['T', 'H1'] },
    'Fa4':  { keys: ['T'] },
    'Fa#4': { keys: ['H1'] },                                  // sin pulgar
    'Sol4': { keys: [] },                                      // al aire
    'Sol#4':{ keys: ['GS'] },
    'La4':  { keys: ['A'] },
    'La#4': { keys: ['A', 'R'] },
    // Clarín = chalumeau + llave de registro (12ª)
    'Si4':  { keys: ['R', 'T'].concat(ALL6, ['LEB']) },
    'Do5':  { keys: ['R', 'T'].concat(ALL6, ['RFC']) },
    'Do#5': { keys: ['R', 'T'].concat(ALL6, ['LFCS']) },
    'Re5':  { keys: ['R', 'T'].concat(ALL6) },
    'Re#5': { keys: ['R', 'T'].concat(ALL6, ['RAB']) },
    'Mi5':  { keys: ['R', 'T', 'H1', 'H2', 'H3', 'H4', 'H5'] },
    'Fa5':  { keys: ['R', 'T', 'H1', 'H2', 'H3', 'H4'] },
    'Fa#5': { keys: ['R', 'T', 'H1', 'H2', 'H3', 'H5'] },
    'Sol5': { keys: ['R', 'T', 'H1', 'H2', 'H3'] },
    'Sol#5':{ keys: ['R', 'T', 'H1', 'H2', 'H3', 'CSGS'] },
    'La5':  { keys: ['R', 'T', 'H1', 'H2'] },
    'La#5': { keys: ['R', 'T', 'H1', 'H2', 'EBBA'] },
    'Si5':  { keys: ['R', 'T', 'H1'] },
    'Do6':  { keys: ['R', 'T'] },
    // Sobreagudo (altissimo)
    'Do#6': { keys: ['R', 'T', 'H2', 'H3', 'H4', 'H5'] },
    'Re6':  { keys: ['R', 'T', 'H2', 'H3', 'H4', 'RAB'] },
    'Re#6': { keys: ['R', 'T', 'H2', 'H3', 'H4', 'SLI', 'RAB'] },
    'Mi6':  { keys: ['R', 'T', 'H2', 'H3', 'RAB'] },
    'Fa6':  { keys: ['R', 'T', 'H2', 'CSGS', 'RAB'] },
    'Fa#6': { keys: ['R', 'T', 'H2', 'RAB'] },
    'Sol6': { keys: ['R', 'T', 'H2', 'H4', 'H5', 'RAB'] },
    'Sol#6':{ keys: ['R', 'T', 'H2', 'H3', 'H4', 'SLI', 'RAB'] }, // mismo dedaje que Re#6 (otro parcial)
    'La6':  { keys: ['R', 'T', 'H2', 'H3', 'LFCS', 'RAB'] }
  };
  var ORDEN = [
    'Mi3', 'Fa3', 'Fa#3', 'Sol3', 'Sol#3', 'La3', 'La#3', 'Si3',
    'Do4', 'Do#4', 'Re4', 'Re#4', 'Mi4', 'Fa4', 'Fa#4', 'Sol4', 'Sol#4', 'La4', 'La#4', 'Si4',
    'Do5', 'Do#5', 'Re5', 'Re#5', 'Mi5', 'Fa5', 'Fa#5', 'Sol5', 'Sol#5', 'La5', 'La#5', 'Si5',
    'Do6', 'Do#6', 'Re6', 'Re#6', 'Mi6', 'Fa6', 'Fa#6', 'Sol6', 'Sol#6', 'La6'
  ];
  var SUB = { '3': '₃', '4': '₄', '5': '₅', '6': '₆' };
  var FLAT = {
    'Fa#3': 'Sol♭₃', 'Sol#3': 'La♭₃', 'La#3': 'Si♭₃', 'Do#4': 'Re♭₄', 'Re#4': 'Mi♭₄',
    'Fa#4': 'Sol♭₄', 'Sol#4': 'La♭₄', 'La#4': 'Si♭₄', 'Do#5': 'Re♭₅', 'Re#5': 'Mi♭₅',
    'Fa#5': 'Sol♭₅', 'Sol#5': 'La♭₅', 'La#5': 'Si♭₅', 'Do#6': 'Re♭₆', 'Re#6': 'Mi♭₆',
    'Fa#6': 'Sol♭₆', 'Sol#6': 'La♭₆'
  };
  function label(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return n;
    return m[1] + (m[2] ? '♯' : '') + SUB[m[3]];
  }
  function registro(n) {
    var i = ORDEN.indexOf(n);
    if (i >= 0 && i <= ORDEN.indexOf('Fa#4')) return 'Chalumeau (grave)';
    if (i <= ORDEN.indexOf('La#4')) return 'Garganta';
    if (i <= ORDEN.indexOf('Do6')) return 'Clarín (medio)';
    return 'Sobreagudo';
  }

  var LETTER = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  var ES_FLAT = ['Do', 'Re♭', 'Re', 'Mi♭', 'Mi', 'Fa', 'Sol♭', 'Sol', 'La♭', 'La', 'Si♭', 'Si'];
  function midiOf(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return null;
    var semis = { Do: 0, Re: 2, Mi: 4, Fa: 5, Sol: 7, La: 9, Si: 11 };
    return semis[m[1]] + (m[2] ? 1 : 0) + (parseInt(m[3], 10) + 1) * 12;
  }
  // El clarinete en Si♭ suena un tono (2 semitonos) por debajo de lo escrito
  function suena(n) {
    var midi = midiOf(n) - 2;
    return ES_FLAT[midi % 12] + SUB[String(Math.floor(midi / 12) - 1)];
  }
  var AUDIO_BASE = '/assets/audio/clarinete/';
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
    '.tm-cl-wrap{margin:18px 0;}',
    '.tm-cl-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-cl-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-cl-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-cl-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-cl-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:10px 8px;}',
    // dos fotos verticales, una al lado de la otra
    '.tm-cl-photos{display:flex;gap:16px;justify-content:center;align-items:flex-start;flex-wrap:wrap;}',
    '.tm-cl-photo{position:relative;flex:0 0 auto;}',
    '.tm-cl-front img{display:block;height:min(50vh,440px);width:auto;border-radius:6px;}',
    '.tm-cl-back{display:flex;flex-direction:column;align-items:center;gap:6px;flex:0 0 auto;align-self:center;}',
    '.tm-cl-backsvg{width:min(22vw,100px);height:auto;}',
    '.tm-cl-holeD{fill:#241f1b;stroke:#0c0a08;stroke-width:2;transition:fill .15s,stroke .15s;}',
    '.tm-cl-key.on .tm-cl-holeD{fill:#ff9f1a;stroke:#fff;}',
    '.tm-cl-img{display:block;border-radius:6px;}',
    '.tm-cl-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;}',
    '.tm-cl-backcap{font-size:.8rem;color:#777;max-width:180px;text-align:center;margin:0;line-height:1.3;}',
    '.tm-cl-backcap strong{color:#555;}',
    // diagramas de meñiques (espátulas metálicas dibujadas, apiladas izq. arriba / dcho. abajo)
    '.tm-cl-pinky{display:flex;flex-direction:column;align-items:center;flex:0 0 auto;align-self:center;gap:10px;}',
    '.tm-cl-pkcluster{display:flex;flex-direction:column;align-items:center;gap:2px;}',
    '.tm-cl-pksvg{width:min(38vw,170px);height:auto;}',
    '.tm-cl-pk-pad{fill:url(#tmclPkMet);stroke:#7f828a;stroke-width:1.5;transition:fill .15s,stroke .15s;}',
    '.tm-cl-key.on .tm-cl-pk-pad{fill:url(#tmclPkMetOn);stroke:#b06a00;}',
    '.tm-cl-pk-hl{fill:#fff;opacity:.5;pointer-events:none;}',
    '.tm-cl-pkcap{font-size:.8rem;color:#777;max-width:230px;text-align:center;margin:2px 0 0;line-height:1.3;}',
    // marcador: invisible en reposo, dorado brillante al pulsar
    '.tm-cl-key .k-dot{fill:#ff9500;fill-opacity:0;stroke:rgba(255,255,255,0);stroke-width:0;transition:all .16s;}',
    '.tm-cl-key.on .k-dot{fill:#ff9500;fill-opacity:.92;stroke:#fff;stroke-width:2.4;filter:drop-shadow(0 0 6px #ff9500);}',
    '.tm-cl-key .k-num{font-family:Arial,Helvetica,sans-serif;font-weight:bold;fill:#fff;fill-opacity:.55;text-anchor:middle;dominant-baseline:central;paint-order:stroke;stroke:#000;stroke-width:.6px;stroke-opacity:.5;transition:all .16s;pointer-events:none;}',
    '.tm-cl-key.on .k-num{fill:#3a2b00;fill-opacity:1;stroke-opacity:0;}',
    '.tm-cl-credit{font-size:.72rem;color:#9a9a9a;text-align:center;margin-top:8px;}',
    '.tm-cl-credit a{color:inherit;}',
    '.tm-cl-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-cl-btn{min-width:46px;padding:10px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-cl-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-cl-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-cl-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-cl-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-cl-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-cl-play:hover{background:#6b5010;}',
    '.tm-cl-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-cl-staff svg{max-width:100%;height:auto;}',
    /* Móvil: mantener las 3 columnas (frente | dorso | meñiques) sin apilar, para que el diagrama quepa sin scroll y los botones queden a la vista. Va al final para ganar en cascada a las reglas base. */
    '@media(max-width:600px){.tm-cl-photos{flex-wrap:nowrap;gap:6px;justify-content:center;}.tm-cl-photo,.tm-cl-front,.tm-cl-back,.tm-cl-pinky{min-width:0;}.tm-cl-front{flex:0 1 24%;}.tm-cl-front img{width:100%;height:auto;max-height:52vh;}.tm-cl-back{flex:0 1 20%;}.tm-cl-backsvg{width:100%;}.tm-cl-pinky{flex:0 1 30%;gap:6px;}.tm-cl-pksvg{width:100%;}.tm-cl-pkcap,.tm-cl-backcap{font-size:.6rem;max-width:100%;}}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-cl-css')) return;
    var s = document.createElement('style'); s.id = 'tm-cl-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  // Cada control = grupo que se ilumina al pulsar (círculo + número opcional).
  function keyShape(k) {
    var s = '<g class="tm-cl-key" data-k="' + k.id + '">' +
      '<circle class="k-dot" cx="' + k.x + '" cy="' + k.y + '" r="' + k.r + '"/>';
    if (k.num) {
      s += '<text class="k-num" x="' + k.x + '" y="' + k.y + '" style="font-size:' + (k.r + 3) + 'px">' + k.num + '</text>';
    }
    return s + '</g>';
  }

  // Parte de ATRÁS como diagrama: cuerpo oscuro + llave de registro (paleta metálica)
  // + agujero del pulgar. Se iluminan igual que el resto (data-k = R / T).
  function buildBack() {
    return '<svg class="tm-cl-backsvg" viewBox="46 104 112 158" role="img" aria-label="Parte de atrás del clarinete (diagrama): la llave de registro (arriba) y el agujero del pulgar (abajo) se iluminan al usarse">' +
      pkGrad() +
      '<g class="tm-cl-key" data-k="R">' +                                              // llave de registro
        '<rect class="tm-cl-pk-pad" x="70" y="118" width="62" height="20" rx="10" transform="rotate(-6 101 128)"/>' +
        '<circle class="tm-cl-pk-pad" cx="84" cy="150" r="13"/>' +
      '</g>' +
      '<g class="tm-cl-key" data-k="T">' +                                              // agujero del pulgar
        '<circle class="tm-cl-holeD" cx="91" cy="222" r="21"/>' +
      '</g>' +
      '</svg>';
  }

  function tmClarineteEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var frontSvg = FRONT_KEYS.map(keyShape).join('');
    var pinkyIzq = buildPinkySvg(PK_IZQ, PK_IZQ_VB, 'meñique izquierdo');
    var pinkyDer = buildPinkySvg(PK_DER, PK_DER_VB, 'meñique derecho');
    var btns = ORDEN.map(function (n) {
      return '<button class="tm-cl-btn" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-cl-wrap">' +
        '<div class="tm-cl-readout" id="' + uid + '_ro"><span class="tm-cl-hint">Elige una nota para ver su digitación</span></div>' +
        '<div class="tm-cl-diagram">' +
          '<div class="tm-cl-photos">' +
            '<div class="tm-cl-photo tm-cl-front">' +
              '<picture><source type="image/webp" srcset="/assets/img/clarinete/digitacion-frente.webp">' +
              '<img class="tm-cl-img" src="/assets/img/clarinete/digitacion-frente.jpg" width="300" height="1114" loading="lazy" alt="Clarinete en Si bemol vertical, visto de frente (boquilla arriba, campana abajo); los agujeros y llaves que se pulsan se iluminan en dorado"></picture>' +
              '<svg class="tm-cl-svg" viewBox="0 0 ' + FRONT_W + ' ' + FRONT_H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Digitación del clarinete sobre una fotografía real (cara frontal)">' + frontSvg + '</svg>' +
            '</div>' +
            '<div class="tm-cl-back">' +
              buildBack() +
              '<p class="tm-cl-backcap"><strong>Parte de atrás</strong><br>el pulgar izquierdo tapa su agujero y aprieta la <strong>llave de registro</strong> (la 12ª).</p>' +
            '</div>' +
            '<div class="tm-cl-pinky">' +
              pinkyIzq + pinkyDer +
              '<p class="tm-cl-pkcap">Los <strong>meñiques</strong>: racimos laterales que no se ven de frente.</p>' +
            '</div>' +
          '</div>' +
          '<p class="tm-cl-credit">Foto del frente: clarinete Yamaha YCL-457II, Yamaha Corporation vía <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Clarinet_YCL-457II-22.png" target="_blank" rel="noopener">Wikimedia Commons</a>, CC BY-SA 4.0. Trasera y meñiques: diagrama propio.</p>' +
        '</div>' +
        '<div class="tm-cl-btns">' + btns + '</div>' +
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
      wrap.querySelectorAll('.tm-cl-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = FING[n];
      wrap.querySelectorAll('.tm-cl-key').forEach(function (c) { c.classList.remove('on'); });
      var nombres = [];
      if (data) data.keys.forEach(function (id) {
        wrap.querySelectorAll('.tm-cl-key[data-k="' + id + '"]').forEach(function (c) { c.classList.add('on'); });
        if (NAMES[id]) nombres.push(NAMES[id]);
      });
      ro.innerHTML =
        '<div class="tm-cl-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-cl-noterow"><span class="tm-cl-intl">' + label(n) + (FLAT[n] ? ' (' + FLAT[n] + ')' : '') + '</span>' +
        '<button class="tm-cl-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-cl-reg">' + intl(n) + ' · ' + registro(n) + ' · suena ' + suena(n) + '</div>' +
        '<div class="tm-cl-keysline">' + (nombres.length ? nombres.join(' · ') : 'al aire (nada pulsado)') + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-cl-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    wrap.querySelectorAll('.tm-cl-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmClarineteEngine = tmClarineteEngine;
})();
