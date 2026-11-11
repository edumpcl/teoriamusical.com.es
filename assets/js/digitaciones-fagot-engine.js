/* Diagrama de digitaciones del fagot (sistema alemán/Heckel) — interactivo, sobre FOTO REAL (nov-2026; antes, un
   dibujo): las dos caras del instrumento, la delantera (agujeros y meñiques) y la trasera (los dos pulgares), y sobre
   cada llave un aro que se enciende cuando se pulsa.
   Foto: «FoxBassoon.jpg», Gregory F. Maxwell, Wikimedia Commons, licencia GFDL 1.2 (solo esa): la página lleva el
   crédito, el enlace al texto de la licencia (/licencias/gfdl-1.2.txt) y el aviso de que está modificada (recortada a la
   zona de llaves, x 330-1250 e y 2150-3880 del original de 2000x4575, y con las llaves marcadas); la versión
   modificada queda bajo la misma licencia.
   Cada llave se localizó con el esquema rotulado de Commons «Standard Bassoon Fingering Keys Diagram.png» (pulgar
   izquierdo, pulgar derecho, dedos izquierdos y dedos derechos), comparando forma y posición con la foto.
   Uso: <div id="x"></div><script>tmFagotEngine('x');</script>
   Datos verificados contra la carta oficial de Fox Products ("Let's Play Bassoon",
   Hugo Fox, págs. 14-20), decodificada del PDF celda a celda; es la carta base de
   afinación de los fagotes Fox y "aplica a la mayoría de Heckel".
   Nota: en Si♭1–Mi2 la carta no marca la llave de piano (whisper) porque la cierra
   el puente mecánico de las llaves graves del pulgar.
   El pentagrama usa la clave real de lectura: fa en 4ª hasta Sol3, do en 4ª hasta
   Sol4 y sol en el sobreagudo (se evitan líneas adicionales). */
(function () {
  'use strict';

  const EN = document.documentElement.lang === 'en';
  const T = (es, en) => EN ? en : es;
  // Nombres de nota (Do Re Mi...) -> letras (C D E...) en la edicion inglesa
  const NOTA_EN = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  function enNote(s) { return EN ? s.replace(/Sol|Do|Re|Mi|Fa|La|Si/g, function (x) { return NOTA_EN[x]; }) : s; }

  // Llaves que se ENCIENDEN (data-k): centro (x, y) y radios (rx, ry) sobre el recorte de la foto (920 x 1730).
  // Cara DELANTERA = el fagot de la izquierda de la foto; cara TRASERA (pulgares) = el de la derecha.
  var KEYS = [
    // Pulgar izquierdo (cara trasera, junta del ala): de arriba abajo, Re agudo, Do agudo, La agudo, Do♯ y piano
    { id: 'HD',  x: 708, y: 150, rx: 26, ry: 22 },
    { id: 'HC',  x: 726, y: 182, rx: 26, ry: 20 },
    { id: 'HA',  x: 722, y: 224, rx: 46, ry: 22 },
    { id: 'CS',  x: 708, y: 260, rx: 34, ry: 20 },
    { id: 'W',   x: 701, y: 300, rx: 24, ry: 18 },
    // Pulgar izquierdo (cara trasera, junta larga): Do grave (el plato), Si y Si♭ (las dos varillas) y Re (la espátula larga)
    { id: 'LC',  x: 586, y: 150, rx: 26, ry: 28 },
    { id: 'LB',  x: 615, y: 159, rx: 16, ry: 26 },
    { id: 'LBB', x: 649, y: 159, rx: 16, ry: 26 },
    { id: 'LD',  x: 592, y: 230, rx: 18, ry: 50 },
    // Pulgar derecho (cara trasera, culata): Si♭ (el arco), Mi grave (el plato grande) y Fa♯
    { id: 'BB',  x: 716, y: 1102, rx: 60, ry: 20 },
    { id: 'LE',  x: 722, y: 1170, rx: 50, ry: 46 },
    { id: 'FS',  x: 748, y: 1242, rx: 30, ry: 26 },
    // Agujeros (cara delantera): mano izquierda 1-3 en la junta del ala, mano derecha 4-5 y plato de Sol en la culata
    { id: 'H1',  x: 262, y: 215, rx: 26, ry: 26 },
    { id: 'H1h', x: 262, y: 215, rx: 26, ry: 26, half: true },  // medio agujero sobre el 1
    { id: 'H2',  x: 260, y: 355, rx: 30, ry: 30 },
    { id: 'H3',  x: 260, y: 472, rx: 36, ry: 36 },
    { id: 'H4',  x: 241, y: 1169, rx: 26, ry: 26 },
    { id: 'H5',  x: 246, y: 1327, rx: 32, ry: 32 },
    { id: 'G6',  x: 215, y: 1437, rx: 52, ry: 24 },  // plato del 6 (Sol)
    // Meñiques y trino (cara delantera)
    { id: 'TRC', x: 204, y: 1106, rx: 30, ry: 22 },  // trino de Do♯ (mano dcha.)
    { id: 'EBR', x: 330, y: 480, rx: 42, ry: 22 },   // Mi♭ de resonancia (meñique izq.): el plato de arriba
    { id: 'LCS', x: 338, y: 547, rx: 40, ry: 22 },   // Do♯ grave (meñique izq.): el de abajo
    { id: 'FK',  x: 135, y: 1462, rx: 34, ry: 24 },  // llave de Fa (meñique dcho.): el plato de arriba
    { id: 'AB',  x: 129, y: 1531, rx: 36, ry: 24 }   // Sol♯/La♭ (meñique dcho.): el de abajo
  ];
  var FOTO_W = 920, FOTO_H = 1730, IMG = '/assets/img/fagot/';

  // Nombres para el desglose de la digitación en el marcador
  var NAMES = {
    W: T('ll. de piano', 'whisper key'), HD: T('ll. aguda de Re', 'high D key'), HC: T('ll. aguda de Do', 'high C key'), HA: T('ll. aguda de La', 'high A key'),
    LD: T('Re grave', 'low D'), LC: T('Do grave', 'low C'), LB: T('Si grave', 'low B'), LBB: T('Si♭ grave', 'low B♭'), CS: T('Do♯ (pulgar)', 'C♯ (thumb)'),
    BB: T('Si♭ (pulgar dcho.)', 'B♭ (right thumb)'), LE: T('Mi grave', 'low E'), FS: T('Fa♯ (pulgar dcho.)', 'F♯ (right thumb)'),
    H1: T('agujero 1', 'hole 1'), H1h: T('½ agujero 1', '½ hole 1'), H2: T('agujero 2', 'hole 2'), H3: T('agujero 3', 'hole 3'),
    H4: T('agujero 4', 'hole 4'), H5: T('agujero 5', 'hole 5'), G6: T('plato 6 (Sol)', 'plate 6 (G)'),
    TRC: T('trino de Do♯', 'C♯ trill'), EBR: T('Mi♭ resonancia', 'E♭ resonance'), LCS: T('Do♯ grave (meñique)', 'low C♯ (little finger)'),
    FK: T('ll. de Fa', 'F key'), AB: T('Sol♯ (meñique)', 'G♯ (little finger)')
  };

  // Digitaciones estándar (carta Fox), Si♭1–Mi♭5.
  var FING = {
    'La#1': { keys: ['LBB', 'LB', 'LC', 'LD', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Si1':  { keys: ['LB', 'LC', 'LD', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Do2':  { keys: ['LC', 'LD', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Do#2': { keys: ['LC', 'LD', 'LCS', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Re2':  { keys: ['LD', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Re#2': { keys: ['LD', 'EBR', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Mi2':  { keys: ['H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Fa2':  { keys: ['W', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK'] },
    'Fa#2': { keys: ['W', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FS'] },
    'Sol2': { keys: ['W', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6'] },
    'Sol#2':{ keys: ['W', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'AB'] },
    'La2':  { keys: ['W', 'H1', 'H2', 'H3', 'H4', 'H5'] },
    'La#2': { keys: ['W', 'H1', 'H2', 'H3', 'H4', 'H5', 'BB'] },
    'Si2':  { keys: ['W', 'H1', 'H2', 'H3', 'H4'] },
    'Do3':  { keys: ['W', 'H1', 'H2', 'H3'] },
    'Do#3': { keys: ['W', 'H1', 'H2', 'H3', 'CS', 'LD'] },
    'Re3':  { keys: ['W', 'H1', 'H2'] },
    'Re#3': { keys: ['W', 'H1', 'H3'] },
    'Mi3':  { keys: ['W', 'H1'] },
    'Fa3':  { keys: ['W'] },
    'Fa#3': { keys: ['W', 'H1h', 'H2', 'H3', 'H4', 'H5', 'G6', 'FS'] },
    'Sol3': { keys: ['W', 'H1h', 'H2', 'H3', 'H4', 'H5', 'G6', 'EBR'] },
    'Sol#3':{ keys: ['W', 'H1h', 'H2', 'H3', 'H4', 'H5', 'G6', 'AB'] },
    'La3':  { keys: ['H1', 'H2', 'H3', 'H4', 'H5'] },
    'La#3': { keys: ['H1', 'H2', 'H3', 'H4', 'H5', 'BB'] },
    'Si3':  { keys: ['H1', 'H2', 'H3', 'H4'] },
    'Do4':  { keys: ['H1', 'H2', 'H3'] },
    'Do#4': { keys: ['H1', 'H2', 'H3', 'CS', 'LD'] },
    'Re4':  { keys: ['H1', 'H2'] },
    'Re#4': { keys: ['H1', 'H2', 'H4', 'H5', 'G6'] },
    'Mi4':  { keys: ['H1', 'H3', 'EBR', 'H4', 'H5', 'G6'] },
    'Fa4':  { keys: ['H1', 'H3', 'EBR', 'H4', 'H5'] },
    'Fa#4': { keys: ['H2', 'H3', 'EBR', 'H4', 'H5', 'FK'] },
    'Sol4': { keys: ['W', 'H1h', 'H2', 'H3', 'EBR', 'H4', 'FK'] },
    'Sol#4':{ keys: ['W', 'H1h', 'H2', 'H3', 'EBR', 'G6'] },
    'La4':  { keys: ['HA', 'CS', 'H1', 'H2', 'H3', 'EBR', 'G6'] },
    'La#4': { keys: ['HA', 'CS', 'H1', 'H2', 'H3', 'EBR', 'H4', 'H5', 'FK'] },
    'Si4':  { keys: ['HC', 'H1', 'H2', 'EBR', 'H4', 'H5', 'FK'] },
    'Do5':  { keys: ['HC', 'H1', 'EBR', 'H4', 'H5', 'BB', 'FK'] },
    'Do#5': { keys: ['HD', 'HC', 'H1', 'H3', 'EBR', 'H4', 'G6'] },
    'Re5':  { keys: ['HD', 'H3', 'EBR', 'BB', 'G6', 'AB'] },
    'Re#5': { keys: ['H1h', 'H2', 'H3', 'CS', 'EBR', 'TRC', 'AB'] }
  };
  var ORDEN = [
    'La#1', 'Si1', 'Do2', 'Do#2', 'Re2', 'Re#2', 'Mi2', 'Fa2', 'Fa#2', 'Sol2', 'Sol#2', 'La2', 'La#2', 'Si2',
    'Do3', 'Do#3', 'Re3', 'Re#3', 'Mi3', 'Fa3', 'Fa#3', 'Sol3', 'Sol#3', 'La3', 'La#3', 'Si3',
    'Do4', 'Do#4', 'Re4', 'Re#4', 'Mi4', 'Fa4', 'Fa#4', 'Sol4', 'Sol#4', 'La4', 'La#4', 'Si4',
    'Do5', 'Do#5', 'Re5', 'Re#5'
  ];
  var SUB = { '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅' };
  var FLAT = {
    'La#1': 'Si♭₁', 'Re#2': 'Mi♭₂', 'Sol#2': 'La♭₂', 'La#2': 'Si♭₂',
    'Re#3': 'Mi♭₃', 'Sol#3': 'La♭₃', 'La#3': 'Si♭₃',
    'Re#4': 'Mi♭₄', 'Sol#4': 'La♭₄', 'La#4': 'Si♭₄', 'Re#5': 'Mi♭₅'
  };
  function label(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return n;
    return enNote(m[1]) + (m[2] ? '♯' : '') + SUB[m[3]];
  }
  // Registros como en la página: grave Si♭1–Sol2, medio –Sol3, agudo –Sol4, sobreagudo –Mi♭5.
  function registro(n) {
    var i = ORDEN.indexOf(n);
    if (i >= 0 && i <= ORDEN.indexOf('Sol2')) return T('Registro grave', 'Low register');
    if (i <= ORDEN.indexOf('Sol3')) return T('Registro medio', 'Middle register');
    if (i <= ORDEN.indexOf('Sol4')) return T('Registro agudo', 'High register');
    return T('Registro sobreagudo', 'Very high register');
  }
  // Clave real de lectura según el registro (evita líneas adicionales)
  function claveDe(n) {
    var i = ORDEN.indexOf(n);
    if (i >= 0 && i <= ORDEN.indexOf('Sol3')) return 'bass';
    if (i <= ORDEN.indexOf('Sol4')) return 'tenor';
    return 'treble';
  }
  var CLAVE_ES = { bass: 'fa en 4ª', tenor: 'do en 4ª', treble: 'sol' };
  var CLAVE_EN = { bass: 'bass clef', tenor: 'tenor clef', treble: 'treble clef' };

  var LETTER = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  var AUDIO_BASE = '/assets/audio/fagot/';
  var AUDIO_V = '2'; // bumpear al cambiar cualquier fichero de audio (los mp3 se sirven con caché de un año). v2 (nov-2026): las 45 notas igualadas a -20 dB de sonoridad
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
    '.tm-fg-wrap{margin:18px 0;}',
    '.tm-fg-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-fg-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-fg-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-fg-hint{font-size:1.02rem;color:#686868;font-weight:600;}',
    '.tm-fg-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;}',
    '.tm-fg-foto{position:relative;max-width:360px;margin:0 auto;aspect-ratio:' + FOTO_W + '/' + FOTO_H + ';}',
    '.tm-fg-foto img{display:block;width:100%;height:auto;}',
    '.tm-fg-svg{position:absolute;inset:0;width:100%;height:100%;}',
    '.tm-fg-caras{display:grid;grid-template-columns:1fr 1fr;max-width:360px;margin:0 auto 2px;font-size:.78rem;font-weight:700;color:#7a5c0f;text-align:center;line-height:1.2;}',
    '.tm-fg-key .k-pad{fill:transparent;stroke:transparent;stroke-width:5;transition:fill .15s,stroke .15s;}',
    '.tm-fg-key.on .k-pad{fill:rgba(255,128,0,.8);stroke:#7a3a00;stroke-width:6;filter:drop-shadow(0 0 12px #ff9500);}',   // opaco y con borde oscuro: sobre la llave plateada, un naranja suave parece dorado y no se distingue
    '.tm-fg-credito{font-size:.75rem;color:#777;text-align:center;margin:4px 0 0;}',
    '.tm-fg-credito a{color:inherit;}',
    // en pantallas anchas, la foto a la izquierda y la nota con los botones a la derecha: la foto es alta
    '@media(min-width:760px){.tm-fg-wrap{display:grid;grid-template-columns:minmax(0,380px) minmax(0,1fr);grid-template-rows:auto 1fr;column-gap:16px;align-items:start;}.tm-fg-cuerpo{display:contents;}.tm-fg-col{grid-column:1;grid-row:1 / span 2;}.tm-fg-readout{grid-column:2;grid-row:1;}.tm-fg-btns{grid-column:2;grid-row:2;margin-top:0!important;}}',
    // en el móvil, la foto y los botones lado a lado, para ver la digitación sin tener que bajar
    '@media(max-width:759px){.tm-fg-cuerpo{display:grid;grid-template-columns:minmax(0,46%) minmax(0,1fr);gap:8px;align-items:start;}.tm-fg-col{position:sticky;top:76px;}.tm-fg-btns{margin-top:0!important;gap:5px!important;}.tm-fg-btn{min-width:0!important;padding:8px 4px!important;font-size:.85rem;flex:1 0 28%;}.tm-fg-caras{font-size:.62rem;}.tm-fg-credito{font-size:.62rem;}}',
    '.tm-fg-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-fg-btn{min-width:46px;padding:10px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-fg-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-fg-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-fg-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-fg-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-fg-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-fg-play:hover{background:#6b5010;}',
    '.tm-fg-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-fg-staff svg{max-width:100%;height:auto;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-fg-css')) return;
    var s = document.createElement('style'); s.id = 'tm-fg-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function keyShape(k) {
    if (k.half)   // medio agujero: solo la mitad de arriba del agujero 1
      return '<g class="tm-fg-key" data-k="' + k.id + '"><path class="k-pad" d="M' + (k.x - k.rx) + ' ' + k.y + ' A' + k.rx + ' ' + k.ry + ' 0 0 1 ' + (k.x + k.rx) + ' ' + k.y + ' Z"/></g>';
    return '<g class="tm-fg-key" data-k="' + k.id + '"><ellipse class="k-pad" cx="' + k.x + '" cy="' + k.y + '" rx="' + k.rx + '" ry="' + k.ry + '"/></g>';
  }

  function tmFagotEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var keysSvg = KEYS.map(keyShape).join('');
    var btns = ORDEN.map(function (n) {
      return '<button class="tm-fg-btn" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    var foto =
      '<div class="tm-fg-diagram">' +
        '<div class="tm-fg-caras"><span>' + T('Por delante', 'Front') + '<br>' + T('(dedos)', '(fingers)') + '</span><span>' + T('Por detrás', 'Back') + '<br>' + T('(pulgares)', '(thumbs)') + '</span></div>' +
        '<div class="tm-fg-foto"><picture><source type="image/webp" srcset="' + IMG + 'llaves.webp"><img src="' + IMG + 'llaves.jpg" width="552" height="1038" alt="" decoding="async"></picture>' +
        '<svg class="tm-fg-svg" viewBox="0 0 ' + FOTO_W + ' ' + FOTO_H + '" role="img" aria-label="' + T('Foto de un fagot por sus dos caras: a la izquierda, la delantera, con los agujeros y las llaves de los meñiques; a la derecha, la trasera, con las llaves de los dos pulgares. Las llaves y agujeros que se tapan para la nota elegida se iluminan en naranja', 'Photo of a bassoon from both sides: on the left the front, with the tone holes and the little-finger keys; on the right the back, with the keys for both thumbs. The keys and holes closed for the chosen note light up in orange') + '">' + keysSvg + '</svg></div>' +
        '<p class="tm-fg-credito">' + T('Foto: ', 'Photo: ') + '<a href="https://commons.wikimedia.org/wiki/File:FoxBassoon.jpg" rel="nofollow">Gregory F. Maxwell</a>, ' + T('licencia ', 'licensed under the ') + '<a href="/licencias/gfdl-1.2.txt" rel="license">GFDL 1.2</a>' + T('. Modificada: recortada y con las llaves marcadas; esta versión, bajo la misma licencia.', '. Modified: cropped, with the keys marked; this version is under the same licence.') + '</p>' +
      '</div>';
    wrap.innerHTML =
      '<div class="tm-fg-wrap">' +
        '<div class="tm-fg-readout" id="' + uid + '_ro"><span class="tm-fg-hint">' + T('Elige una nota para ver su digitación', 'Choose a note to see its fingering') + '</span></div>' +
        '<div class="tm-fg-cuerpo"><div class="tm-fg-col">' + foto + '</div><div class="tm-fg-btns">' + btns + '</div></div>' +
      '</div>';

    var svg = wrap.querySelector('.tm-fg-svg');
    var ro = document.getElementById(uid + '_ro');
    var audio = new Audio();

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
      var clef = claveDe(n);
      if (window.tmPentNota) tmPentNota(el, clef, vn.key);
    }

    function pick(n, btn) {
      wrap.querySelectorAll('.tm-fg-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = FING[n];
      svg.querySelectorAll('.tm-fg-key').forEach(function (c) { c.classList.remove('on'); });
      var nombres = [];
      if (data) data.keys.forEach(function (id) {
        var c = svg.querySelector('.tm-fg-key[data-k="' + id + '"]'); if (c) c.classList.add('on');
        if (NAMES[id]) nombres.push(NAMES[id]);
      });
      ro.innerHTML =
        '<div class="tm-fg-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-fg-noterow"><span class="tm-fg-intl">' + label(n) + (FLAT[n] ? ' (' + enNote(FLAT[n]) + ')' : '') + '</span>' +
        '<button class="tm-fg-play" type="button" aria-label="' + T('Reproducir la nota', 'Play the note') + '">▶</button></div>' +
        '<div class="tm-fg-reg">' + intl(n) + ' · ' + registro(n) + T(' · clave de ' + CLAVE_ES[claveDe(n)], ' · ' + CLAVE_EN[claveDe(n)]) + '</div>' +
        '<div class="tm-fg-keysline">' + (nombres.length ? nombres.join(' · ') : '—') + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-fg-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    wrap.querySelectorAll('.tm-fg-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmFagotEngine = tmFagotEngine;
})();
