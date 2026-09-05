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

  // Coordenadas sobre la FOTO de cada instrumento (viewBox = píxeles de la imagen).
  // Vista FRONTAL: la mano IZQUIERDA del intérprete aparece a la DERECHA de la imagen
  // (palmas y racimo del meñique izquierdo) y la derecha, a la izquierda (laterales,
  // Mi bemol y Do del meñique). La llave de OCTAVA no sale: va en el pulgar, detrás.
  //
  // El ALTO se calibró a mano sobre la foto. El TENOR se DERIVÓ del alto: se detectan sus
  // siete perlas de nácar por color y se ajusta una similitud (escala+giro+traslación)
  // POR BLOQUE —uno con las cuatro perlas de la mano izquierda y otro con las tres de la
  // derecha—, y cada llave se mapea con la transformada de su bloque. Un único ajuste
  // global da 9,6 px de error (casi una llave de desvío); por bloques, 0,7-1,0 px.
  var FOTOS = {
    alto: {
      img: 'digitacion-frente', w: 500, h: 1140, rp: 12, rs: 8,
      alt: 'Saxofón alto visto de frente, con la boquilla arriba y la campana abajo a la derecha; las llaves que se pulsan se iluminan en dorado',
      credito: 'saxofón alto Yamaha YAS-62',
      commons: 'https://commons.wikimedia.org/wiki/File:Yamaha_Saxophone_YAS-62.tif',
      k: { L1:[270,420], BIS:[272,447], L2:[273,474], L3:[291,500],
           P1:[313,397], P2:[326,437], P3:[311,462],
           GS:[314,526], LCS:[331,542], LB:[307,552], LBB:[325,576],
           SE:[167,728], SC:[164,767], SBB:[167,800], SFS:[198,821],
           R4:[234,810], R5:[244,865], R6:[228,920],
           TEB:[183,935], TC:[185,962] }
    },
    soprano: {
      // El soprano es recto y larguisimo (aspecto 0,21 entero), asi que la imagen es un
      // RECORTE de la zona de llaves: si no, en pantalla queda una tira inservible.
      // Calibrado a mano: no se pudo derivar del alto porque su espaciado crece hacia
      // abajo (47/57/68 px entre perlas, frente a 26/28/25 en el alto).
      img: 'digitacion-frente-soprano', w: 500, h: 1450, rp: 26, rs: 17,
      alt: 'Saxofón soprano recto visto de frente, ampliado a la zona de llaves; las llaves que se pulsan se iluminan en dorado',
      credito: 'saxofón soprano Yamaha YSS-875 EX',
      commons: 'https://commons.wikimedia.org/wiki/File:Yamaha_Saxophone_YSS-875_EX.jpg',
      k: { L1:[274,267], BIS:[276,326], L2:[287,397], L3:[329,481],
           P1:[395,263], P2:[422,324], P3:[396,392],
           GS:[383,529], LCS:[423,578], LB:[371,595], LBB:[437,658],
           SE:[94,674], SC:[105,753], SBB:[100,826], SFS:[168,902],
           R4:[245,840], R5:[246,959], R6:[233,1062],
           TEB:[161,1136], TC:[111,1201] }
    },
    tenor: {
      img: 'digitacion-frente-tenor', w: 500, h: 1062, rp: 9, rs: 6,
      alt: 'Saxofón tenor visto de frente, con la boquilla arriba y la campana abajo a la derecha; las llaves que se pulsan se iluminan en dorado',
      credito: 'saxofón tenor Yamaha YTS-62',
      commons: 'https://commons.wikimedia.org/wiki/File:Yamaha_Saxophone_YTS-62.tif',
      k: { L1:[280,382], BIS:[280,403], L2:[279,425], L3:[292,446],
           P1:[315,366], P2:[323,399], P3:[310,417],
           GS:[308,468], LCS:[321,482], LB:[301,488], LBB:[314,509],
           SE:[202,688], SC:[197,717], SBB:[196,743], SFS:[219,761],
           R4:[247,755], R5:[251,798], R6:[235,840],
           TEB:[199,848], TC:[199,869] }
    }
  };
  var NUM = { L1:1, L2:2, L3:3, R4:4, R5:5, R6:6 };   // número de dedo sobre la perla
  var ORDEN_K = ['L1','BIS','L2','L3','P1','P2','P3','GS','LCS','LB','LBB',
                 'SE','SC','SBB','SFS','R4','R5','R6','TEB','TC'];

  var NAMES = {
    OCT: 'llave de octava',
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
    // Fa#6 = la digitacion del Fa6 mas la llave de Fa# agudo (dedo corazon derecho).
    // Es la estandar en cualquier saxo moderno. La alternativa clasica —Fa frontal +
    // agujero 2 + lateral Si bemol— tambien da la nota, pero es eso: una alternativa,
    // util en pasajes rapidos y puerta de entrada al sobreagudo. Se explica en el texto.
    'Fa#6': { keys: ['OCT', 'P1', 'P2', 'P3', 'SE', 'SFS'] }
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
  // Miembros de la familia. `st` = semitonos por debajo de lo escrito.
  // `foto` = qué imagen usa (soprano y barítono aún no tienen la suya; se digitan
  // EXACTAMENTE igual, así que muestran la del alto y se avisa debajo).
  // `audio` = banco de muestras; `dsp` = semitonos que hay que desplazar ese banco para
  // que suene la altura real del miembro (0 si el banco ya es suyo).
  var MIEMBROS = {
    soprano:  { et: 'Soprano en Si♭',   st: 2,  foto: 'soprano', audio: 'soprano', dsp: 0, propio: true },
    alto:     { et: 'Alto en Mi♭',      st: 9,  foto: 'alto',  audio: 'alto',  dsp: 0,   propio: true },
    tenor:    { et: 'Tenor en Si♭',     st: 14, foto: 'tenor', audio: 'tenor', dsp: 0,   propio: true },
    // El barítono no tiene banco libre (buscado: VCSL, Philharmonia, Iowa, VSCO2 CE,
    // FreePats, Karoryfer, Musical Artifacts, Freesound). Se deriva del TENOR y no del
    // alto: son 7 semitonos de estiramiento en vez de 12, y el tenor está más cerca en
    // tamaño y timbre. Sigue siendo prestado y así se avisa.
    baritono: { et: 'Barítono en Mi♭', st: 21, foto: 'alto',  audio: 'tenor', dsp: -7,  propio: false }
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

  var BANCOS = {
    alto:    '/assets/audio/saxofon/',
    soprano: '/assets/audio/saxofon-soprano/',
    tenor:   '/assets/audio/saxofon-tenor/'
  };
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
    '.tm-sx-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:10px 8px;}',
    // dos columnas: la foto de frente y el pulgar (llave de octava, que va detrás)
    '.tm-sx-photos{display:flex;gap:18px;justify-content:center;align-items:flex-start;flex-wrap:wrap;}',
    '.tm-sx-photo{position:relative;flex:0 0 auto;}',
    '.tm-sx-front img{display:block;height:min(64vh,600px);width:auto;border-radius:6px;}',
    // object-fit:contain es OBLIGATORIO: en movil el max-height recorta el alto pero no
    // el ancho, y la foto se deformaria mientras la capa SVG (preserveAspectRatio
    // xMidYMid meet) mantiene la proporcion -> los marcadores se saldrian de las llaves.
    // Con contain, imagen y SVG encajan en la misma caja exactamente igual.
    '.tm-sx-img{display:block;border-radius:6px;object-fit:contain;}',
    '.tm-sx-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;}',
    '.tm-sx-back{display:flex;flex-direction:column;align-items:center;gap:6px;flex:0 0 auto;align-self:center;}',
    '.tm-sx-backsvg{width:min(26vw,120px);height:auto;}',
    '.tm-sx-backcap{font-size:.8rem;color:#777;max-width:190px;text-align:center;margin:0;line-height:1.3;}',
    '.tm-sx-backcap strong{color:#555;}',
    '.tm-sx-oct-pad{fill:url(#tmSxMet);stroke:#7f828a;stroke-width:1.5;transition:fill .15s,stroke .15s;}',
    '.tm-sx-key.on .tm-sx-oct-pad{fill:url(#tmSxMetOn);stroke:#fff;stroke-width:2.4;filter:drop-shadow(0 0 6px #ff9500);}',
    '.tm-sx-oct-hl{fill:#fff;opacity:.5;pointer-events:none;}',
    // marcador sobre la foto: invisible en reposo, dorado brillante al pulsar
    '.tm-sx-key .k-dot{fill:#ff9500;fill-opacity:0;stroke:rgba(255,255,255,0);stroke-width:0;transition:all .16s;}',
    '.tm-sx-key.on .k-dot{fill:#ff9500;fill-opacity:.92;stroke:#fff;stroke-width:2.4;filter:drop-shadow(0 0 6px #ff9500);}',
    '.tm-sx-key .k-num{font-family:Arial,Helvetica,sans-serif;font-weight:bold;fill:#fff;fill-opacity:.55;text-anchor:middle;dominant-baseline:central;paint-order:stroke;stroke:#000;stroke-width:.6px;stroke-opacity:.5;transition:all .16s;pointer-events:none;}',
    '.tm-sx-key.on .k-num{fill:#3a2b00;fill-opacity:1;stroke-opacity:0;}',
    '.tm-sx-credit{font-size:.72rem;color:#9a9a9a;text-align:center;margin-top:8px;}',
    '.tm-sx-credit a{color:inherit;}',
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
    '.tm-sx-staff svg{max-width:100%;height:auto;}',
    /* Móvil: las dos columnas siguen en fila (si se apilan, el diagrama mide más que la
       pantalla y la digitación se ilumina fuera de la vista). Ancho por flex-basis según
       el aspecto de la foto. VA AL FINAL: los media queries no suman especificidad, así
       que una regla base posterior con el mismo peso les ganaría en cascada. */
    '@media(max-width:600px){.tm-sx-photos{flex-wrap:nowrap;gap:8px;justify-content:center;}.tm-sx-photo,.tm-sx-front,.tm-sx-back{min-width:0;}.tm-sx-front{flex:0 1 50%;}.tm-sx-front img{width:100%;height:auto;max-height:52vh;}.tm-sx-back{flex:0 1 30%;}.tm-sx-backsvg{width:100%;}.tm-sx-backcap{font-size:.6rem;max-width:100%;}}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-sx-css')) return;
    var s = document.createElement('style'); s.id = 'tm-sx-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  // Cada control = grupo que se ilumina sobre la foto (círculo + número de dedo).
  function keysSvgDe(cfg) {
    return ORDEN_K.map(function (id) {
      var c = cfg.k[id]; if (!c) return '';
      var r = NUM[id] ? cfg.rp : cfg.rs;
      var s = '<g class="tm-sx-key" data-k="' + id + '">' +
        '<circle class="k-dot" cx="' + c[0] + '" cy="' + c[1] + '" r="' + r + '"/>';
      if (NUM[id]) {
        s += '<text class="k-num" x="' + c[0] + '" y="' + c[1] + '" style="font-size:' + (r + 2) + 'px">' + NUM[id] + '</text>';
      }
      return s + '</g>';
    }).join('');
  }

  // La llave de OCTAVA no se ve de frente: la acciona el pulgar izquierdo por detrás,
  // apoyado en su gatillo. Se dibuja como panel aparte y se ilumina igual (data-k="OCT").
  function buildBack() {
    return '<svg class="tm-sx-backsvg" viewBox="0 0 120 210" role="img" aria-label="Pulgar izquierdo del saxofón, por detrás: el gatillo de la llave de octava se ilumina cuando hay que pulsarlo">' +
      '<defs>' +
        '<linearGradient id="tmSxMet" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0" stop-color="#c9ccd3"/><stop offset=".45" stop-color="#f2f3f6"/><stop offset="1" stop-color="#9fa3ab"/>' +
        '</linearGradient>' +
        '<linearGradient id="tmSxMetOn" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0" stop-color="#ffb347"/><stop offset=".45" stop-color="#ffd08a"/><stop offset="1" stop-color="#e08800"/>' +
        '</linearGradient>' +
        '<linearGradient id="tmSxTube" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0" stop-color="#7d6a30"/><stop offset=".35" stop-color="#a99553"/><stop offset="1" stop-color="#6a5a28"/>' +
        '</linearGradient>' +
      '</defs>' +
      // trozo de tubo visto por detrás (latón mate: si va tan dorado como la foto,
      // el gatillo encendido no se distingue del fondo)
      '<rect x="40" y="4" width="44" height="202" rx="18" fill="url(#tmSxTube)" stroke="#5f5222" stroke-width="1.2"/>' +
      // varilla que baja del mecanismo de octava hasta el gatillo
      '<line x1="62" y1="16" x2="62" y2="70" stroke="#b9bbc1" stroke-width="2.6"/>' +
      '<circle cx="62" cy="16" r="4" fill="#b9bbc1"/>' +
      // gatillo de la llave de octava: sobresale a la izquierda, que es por donde
      // el pulgar bascula para empujarlo. Es lo ÚNICO que se ilumina.
      '<g class="tm-sx-key" data-k="OCT">' +
        '<rect class="tm-sx-oct-pad" x="22" y="70" width="62" height="24" rx="12"/>' +
        '<ellipse class="tm-sx-oct-hl" cx="44" cy="78" rx="16" ry="4"/>' +
      '</g>' +
      // apoyo del pulgar: en el saxo es una pieza NEGRA, y de paso da el contraste
      // que necesita el gatillo de arriba. Decorativo: no se pulsa, solo sostiene.
      '<rect x="44" y="126" width="36" height="44" rx="10" fill="#2c2c30" stroke="#171719" stroke-width="1.2"/>' +
      '<ellipse cx="62" cy="148" rx="11" ry="14" fill="#3f3f45"/>' +
      '<ellipse cx="58" cy="140" rx="5" ry="7" fill="#55555c" opacity=".7"/>' +
      '</svg>';
  }

  function tmSaxofonEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;
    var miembro = 'alto';
    var seleccion = null;

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
        '<div class="tm-sx-diagram">' +
          '<div class="tm-sx-photos">' +
            '<div class="tm-sx-photo tm-sx-front" id="' + uid + '_foto"></div>' +
            '<div class="tm-sx-back">' +
              buildBack() +
              '<p class="tm-sx-backcap"><strong>Por detrás</strong><br>el <strong>pulgar izquierdo</strong> descansa en su apoyo y empuja el gatillo de la <strong>llave de octava</strong>.</p>' +
            '</div>' +
          '</div>' +
          '<p class="tm-sx-credit" id="' + uid + '_credito"></p>' +
        '</div>' +
        '<div class="tm-sx-btns">' + btns + '</div>' +
      '</div>';

    var ro = document.getElementById(uid + '_ro');
    var audio = new Audio();

    // La columna de la foto se repinta al cambiar de miembro: cambia la imagen, las
    // coordenadas de las llaves y la línea de crédito.
    function pintaFoto() {
      var m = MIEMBROS[miembro], cfg = FOTOS[m.foto];
      document.getElementById(uid + '_foto').innerHTML =
        '<picture><source type="image/webp" srcset="/assets/img/saxofon/' + cfg.img + '.webp">' +
        '<img class="tm-sx-img" src="/assets/img/saxofon/' + cfg.img + '.jpg" width="' + cfg.w + '" height="' + cfg.h + '" loading="lazy" alt="' + cfg.alt + '"></picture>' +
        '<svg class="tm-sx-svg" viewBox="0 0 ' + cfg.w + ' ' + cfg.h + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Digitación del saxofón sobre una fotografía real (vista frontal)">' + keysSvgDe(cfg) + '</svg>';
      document.getElementById(uid + '_credito').innerHTML =
        (m.propio ? '' : 'Los cuatro saxofones se digitan igual, así que el diagrama muestra la foto de un <strong>alto</strong>. ') +
        'Foto: ' + cfg.credito + ', Yamaha Corporation vía <a href="' + cfg.commons + '" target="_blank" rel="noopener">Wikimedia Commons</a>, CC BY-SA 4.0. Llave de octava: diagrama propio.';
    }
    pintaFoto();

    function play(n) {
      var f = sampleFile(n);
      if (!f) return;
      try { audio.pause(); } catch (e) {}
      audio.src = BANCOS[MIEMBROS[miembro].audio] + f + '.mp3';
      // Si el miembro tiene banco propio (alto, tenor) suena tal cual. Si lo toma
      // prestado del alto (soprano, barítono), se desplaza el tono de la muestra para
      // que suene su altura REAL: se cambia la velocidad sin conservar el tono.
      audio.preservesPitch = false;
      audio.mozPreservesPitch = false;
      audio.webkitPreservesPitch = false;
      audio.playbackRate = Math.pow(2, MIEMBROS[miembro].dsp / 12);
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
      seleccion = n;
      wrap.querySelectorAll('.tm-sx-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = FING[n];
      wrap.querySelectorAll('.tm-sx-key').forEach(function (c) { c.classList.remove('on'); });
      var nombres = [];
      if (data) data.keys.forEach(function (id) {
        var c = wrap.querySelector('.tm-sx-key[data-k="' + id + '"]'); if (c) c.classList.add('on');
        if (NAMES[id]) nombres.push(NAMES[id]);
      });
      var real = suenaLabel(toMidi(n) - MIEMBROS[miembro].st);
      // Si el banco no es suyo, decir de QUE saxo sale prestado el timbre.
      var donante = MIEMBROS[miembro].audio;
      var bancoPropio = donante === miembro;
      ro.innerHTML =
        '<div class="tm-sx-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-sx-noterow"><span class="tm-sx-intl">' + label(n) + (FLAT[n] ? ' (' + FLAT[n] + ')' : '') + '</span>' +
        '<button class="tm-sx-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-sx-reg">' + intl(n) + ' · en el ' + MIEMBROS[miembro].et.toLowerCase() + ' suena ' + real +
        '<br>' + registro(n) + (bancoPropio ? '' : ' · timbre derivado del saxo ' + donante) + '</div>' +
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
        pintaFoto();
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
