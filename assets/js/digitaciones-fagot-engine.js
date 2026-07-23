/* Diagrama de digitaciones del fagot (sistema alemán/Heckel) — interactivo.
   Fagot horizontal propio: caña y tudel a la izquierda, culata a la derecha y
   campana volviendo hacia la izquierda (los dos tubos paralelos). Llave plateada =
   abierta, llave dorada = pulsada. Los pulgares (9 llaves el izquierdo, 3 dibujadas
   del derecho) van entre los dos tubos; los meñiques, bajo el tubo grave.
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

  // Elementos que se ENCIENDEN (data-k). El resto del dibujo es decorativo.
  // Diagrama vertical fiel a la silueta real: tudel y campana arriba, culata
  // (junta doble, la pieza más gruesa) abajo. Mano izquierda en la junta del
  // ala (agujeros 1-3), mano derecha en la culata (agujeros 4-6).
  var KEYS = [
    // Pulgar izquierdo (lado derecho del tubo, junta del ala, cerca de la culata)
    { id: 'W',   sh: 'small', x: 255, y: 340 },  // llave de piano (whisper)
    { id: 'HD',  sh: 'oct',   x: 255, y: 361 },  // llave aguda de Re
    { id: 'HC',  sh: 'oct',   x: 255, y: 382 },  // llave aguda de Do
    { id: 'HA',  sh: 'oct',   x: 255, y: 403 },  // llave aguda de La
    { id: 'LD',  sh: 'touch', x: 255, y: 424 },  // Re grave
    { id: 'LC',  sh: 'touch', x: 255, y: 445 },  // Do grave
    { id: 'LB',  sh: 'touch', x: 255, y: 466 },  // Si grave
    { id: 'LBB', sh: 'touch', x: 255, y: 487 },  // Si♭ grave
    { id: 'CS',  sh: 'oct',   x: 255, y: 508 },  // Do♯ (pulgar izq.)
    // Pulgar derecho (lado derecho del tubo, en la culata)
    { id: 'BB',  sh: 'loop',  x: 258, y: 540 },  // Si♭ (pulgar dcho.)
    { id: 'LE',  sh: 'pan',   x: 258, y: 575 },  // Mi grave («pancake»)
    { id: 'FS',  sh: 'oct',   x: 258, y: 610 },  // Fa♯ (pulgar dcho.)
    // Agujeros del tubo (mano izq. 1-3 junta del ala, mano dcha. 4-6 culata)
    { id: 'H1',  sh: 'hole',  x: 220, y: 355 },
    { id: 'H1h', sh: 'half',  x: 220, y: 355 },  // medio agujero sobre el 1
    { id: 'H2',  sh: 'hole',  x: 220, y: 390 },
    { id: 'H3',  sh: 'hole',  x: 220, y: 425 },
    { id: 'H4',  sh: 'hole',  x: 220, y: 545 },
    { id: 'H5',  sh: 'hole',  x: 220, y: 575 },
    { id: 'G6',  sh: 'hole',  x: 220, y: 605, r: 10 },  // plato del 6 (Sol)
    // Meñiques y frontales (lado izquierdo del tubo)
    { id: 'TRC', sh: 'tiny',  x: 182, y: 522 },  // trino de Do♯ (mano dcha.)
    { id: 'EBR', sh: 'spat',  x: 182, y: 450 },  // Mi♭ de resonancia (meñique izq.)
    { id: 'LCS', sh: 'spat',  x: 182, y: 475 },  // Do♯ grave (meñique izq.)
    { id: 'FK',  sh: 'loop',  x: 182, y: 613 },  // llave de Fa (meñique dcho.)
    { id: 'AB',  sh: 'loop',  x: 182, y: 636 }   // Sol♯/La♭ (meñique dcho.)
  ];
  var SVG_W = 420, SVG_H = 690;

  // Nombres para el desglose de la digitación en el marcador
  var NAMES = {
    W: 'll. de piano', HD: 'll. aguda de Re', HC: 'll. aguda de Do', HA: 'll. aguda de La',
    LD: 'Re grave', LC: 'Do grave', LB: 'Si grave', LBB: 'Si♭ grave', CS: 'Do♯ (pulgar)',
    BB: 'Si♭ (pulgar dcho.)', LE: 'Mi grave', FS: 'Fa♯ (pulgar dcho.)',
    H1: 'agujero 1', H1h: '½ agujero 1', H2: 'agujero 2', H3: 'agujero 3',
    H4: 'agujero 4', H5: 'agujero 5', G6: 'plato 6 (Sol)',
    TRC: 'trino de Do♯', EBR: 'Mi♭ resonancia', LCS: 'Do♯ grave (meñique)',
    FK: 'll. de Fa', AB: 'Sol♯ (meñique)'
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
    return m[1] + (m[2] ? '♯' : '') + SUB[m[3]];
  }
  // Registros como en la página: grave Si♭1–Sol2, medio –Sol3, agudo –Sol4, sobreagudo –Mi♭5.
  function registro(n) {
    var i = ORDEN.indexOf(n);
    if (i >= 0 && i <= ORDEN.indexOf('Sol2')) return 'Registro grave';
    if (i <= ORDEN.indexOf('Sol3')) return 'Registro medio';
    if (i <= ORDEN.indexOf('Sol4')) return 'Registro agudo';
    return 'Registro sobreagudo';
  }
  // Clave real de lectura según el registro (evita líneas adicionales)
  function claveDe(n) {
    var i = ORDEN.indexOf(n);
    if (i >= 0 && i <= ORDEN.indexOf('Sol3')) return 'bass';
    if (i <= ORDEN.indexOf('Sol4')) return 'tenor';
    return 'treble';
  }
  var CLAVE_ES = { bass: 'fa en 4ª', tenor: 'do en 4ª', treble: 'sol' };

  var LETTER = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  var AUDIO_BASE = '/assets/audio/fagot/';
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
    '.tm-fg-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-fg-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;display:flex;justify-content:center;}',
    '.tm-fg-svg{display:block;max-width:300px;width:100%;height:auto;margin:0 auto;}',
    '.tm-fg-key .k-pad{fill:#e9eaee;stroke:#8f9199;stroke-width:1.5;}',
    '.tm-fg-key.on .k-pad{fill:#8b6914;stroke:#6b5010;}',
    '.tm-fg-key .k-ring{fill:none;stroke:#8f9199;stroke-width:1.2;}',
    '.tm-fg-key.on .k-ring{stroke:#e8dcc0;}',
    '.tm-fg-half .k-pad{fill:transparent;stroke:none;}',
    '.tm-fg-half.on .k-pad{fill:#8b6914;}',
    '.tm-fg-klab{font-family:Arial,Helvetica,sans-serif;font-size:11px;fill:#555;text-anchor:middle;}',
    '.tm-fg-klab2{font-family:Arial,Helvetica,sans-serif;font-size:9px;fill:#777;text-anchor:middle;}',
    '.tm-fg-grp{font-family:Arial,Helvetica,sans-serif;font-size:12px;fill:#8b6914;text-anchor:middle;font-weight:bold;}',
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

  // Dibujo estático: silueta real del fagot, un único tubo cónico doblado
  // internamente (campana arriba, tudel curvo saliendo hacia el lateral,
  // culata gruesa abajo), anillas, ejes de mecánica y etiquetas.
  var DECO =
    '<defs><linearGradient id="tmFgWood" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#7d4e28"/><stop offset="0.3" stop-color="#5a3418"/>' +
      '<stop offset="0.6" stop-color="#3f2210"/><stop offset="1" stop-color="#2a1408"/>' +
    '</linearGradient></defs>' +
    // campana (arriba): abocinado + anillo metálico + resalte del hueco
    '<path d="M197 110 C190 88 178 60 163 34 L277 34 C262 60 250 88 243 110 Z" fill="url(#tmFgWood)" stroke="#1c0f06" stroke-width="1"/>' +
    '<ellipse cx="220" cy="34" rx="57" ry="11" fill="#17100a" stroke="#0d0805" stroke-width="1"/>' +
    '<ellipse cx="220" cy="34" rx="40" ry="7" fill="#4a3020"/>' +
    '<rect x="203" y="98" width="34" height="16" rx="2.5" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    // junta larga (tubo entre campana y ala) y junta del ala + culata: un único
    // tubo cónico (más estrecho arriba, más grueso hacia la culata)
    '<path d="M197 110 L195 330 L191 520 L184 640 L256 640 L249 520 L245 330 L243 110 Z" fill="url(#tmFgWood)" stroke="#1c0f06" stroke-width="1"/>' +
    '<line x1="208" y1="115" x2="200" y2="635" stroke="#96684044" stroke-width="1.4"/>' +
    // anillas de las uniones (campana/junta larga, junta larga/ala, ala/culata)
    '<rect x="207" y="100" width="26" height="18" rx="3" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    '<rect x="196" y="320" width="48" height="20" rx="3" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    '<rect x="192" y="510" width="56" height="20" rx="3" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    // remate y anilla metálica de la culata (la pieza más gruesa, abajo)
    '<path d="M184 640 L256 640 L250 662 L190 662 Z" fill="url(#tmFgWood)" stroke="#1c0f06" stroke-width="1"/>' +
    '<ellipse cx="220" cy="662" rx="32" ry="7" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    // tudel curvo (metal) con la caña en la punta
    '<path d="M220 330 C204 309 176 294 156 269 C144 253 135 244 127 234" stroke="#c9cbd0" stroke-width="7" fill="none" stroke-linecap="round"/>' +
    '<path d="M126 232 L152 253 L142 271 L116 250 Z" fill="#d9b26a" stroke="#a8843e" stroke-width="1"/>' +
    '<rect x="94" y="197" width="16" height="10" rx="2" fill="#7a3040" stroke="#5e2432" stroke-width="1" transform="rotate(52 102 202)"/>' +
    '<path d="M116 250 L96 220" stroke="#d9b26a" stroke-width="6" stroke-linecap="round"/>' +
    // ejes de mecánica: varillas largas donde pivotan las llaves de los pulgares
    '<line x1="246" y1="336" x2="246" y2="512" stroke="#b9bbc1" stroke-width="1.6"/>' +
    '<line x1="249" y1="533" x2="249" y2="616" stroke="#b9bbc1" stroke-width="1.6"/>' +
    // varillas cortas hacia las llaves de los meñiques
    '<line x1="196" y1="450" x2="182" y2="450" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="195" y1="475" x2="182" y2="475" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="189" y1="522" x2="182" y2="522" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="187" y1="613" x2="182" y2="613" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="186" y1="636" x2="182" y2="636" stroke="#b9bbc1" stroke-width="1.3"/>' +
    // muletilla (apoyo de la mano derecha en la culata): decorativa, no es una llave
    '<line x1="254" y1="612" x2="279" y2="607" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<path d="M280 605 C293 604 301 613 298 623 C296 630 287 633 279 629 C283 624 285 618 283 612 C282 609 281 607 280 605 Z" fill="#2a2a2a" stroke="#151515" stroke-width="1"/>' +
    '<circle cx="281" cy="606" r="2" fill="#9a9ca3"/>' +
    // etiquetas
    '<text class="tm-fg-klab" x="220" y="16">Campana</text>' +
    '<text class="tm-fg-klab" x="85" y="188">Caña</text>' +
    '<text class="tm-fg-klab" x="85" y="200">y tudel</text>' +
    '<text class="tm-fg-klab" x="305" y="585">Culata</text>' +
    '<text class="tm-fg-klab2" x="292" y="646">Muletilla</text>' +
    '<text class="tm-fg-grp" x="255" y="332">Pulgar izquierdo</text>' +
    '<text class="tm-fg-grp" x="258" y="530">Pulgar derecho</text>' +
    '<text class="tm-fg-klab2" x="279" y="343">piano</text>' +
    '<text class="tm-fg-klab2" x="279" y="364">Re</text>' +
    '<text class="tm-fg-klab2" x="279" y="385">Do</text>' +
    '<text class="tm-fg-klab2" x="279" y="406">La</text>' +
    '<text class="tm-fg-klab2" x="279" y="427">Re</text>' +
    '<text class="tm-fg-klab2" x="279" y="448">Do</text>' +
    '<text class="tm-fg-klab2" x="279" y="469">Si</text>' +
    '<text class="tm-fg-klab2" x="279" y="490">Si♭</text>' +
    '<text class="tm-fg-klab2" x="279" y="511">Do♯</text>' +
    '<text class="tm-fg-klab2" x="282" y="543">Si♭</text>' +
    '<text class="tm-fg-klab2" x="282" y="578">Mi</text>' +
    '<text class="tm-fg-klab2" x="282" y="613">Fa♯</text>' +
    '<text class="tm-fg-klab" style="fill:#e8dcc0" x="238" y="359">1</text><text class="tm-fg-klab" style="fill:#e8dcc0" x="238" y="394">2</text><text class="tm-fg-klab" style="fill:#e8dcc0" x="238" y="429">3</text>' +
    '<text class="tm-fg-klab" style="fill:#e8dcc0" x="238" y="549">4</text><text class="tm-fg-klab" style="fill:#e8dcc0" x="238" y="579">5</text><text class="tm-fg-klab" style="fill:#e8dcc0" x="238" y="609">6</text>' +
    '<text class="tm-fg-klab" x="170" y="525">tr</text>' +
    '<text class="tm-fg-grp" x="140" y="390">Mano</text>' +
    '<text class="tm-fg-grp" x="140" y="403">izquierda</text>' +
    '<text class="tm-fg-grp" x="140" y="573">Mano</text>' +
    '<text class="tm-fg-grp" x="140" y="586">derecha</text>' +
    '<text class="tm-fg-klab" x="160" y="500">Meñique izq.</text>' +
    '<text class="tm-fg-klab" x="150" y="650">Meñique dcho.</text>';

  function keyShape(k) {
    if (k.sh === 'half') {
      // semicírculo superior del agujero 1; invisible salvo cuando está .on
      return '<g class="tm-fg-key tm-fg-half" data-k="' + k.id + '">' +
        '<path class="k-pad" d="M' + (k.x - 9) + ' ' + k.y + ' A9 9 0 0 1 ' + (k.x + 9) + ' ' + k.y + ' Z"/></g>';
    }
    var open = '<g class="tm-fg-key" data-k="' + k.id + '">', close = '</g>';
    if (k.sh === 'oct') {
      return open + '<ellipse class="k-pad" cx="' + k.x + '" cy="' + k.y + '" rx="5.5" ry="8"/>' + close;
    }
    if (k.sh === 'small') {
      return open + '<circle class="k-pad" cx="' + k.x + '" cy="' + k.y + '" r="7"/>' + close;
    }
    if (k.sh === 'touch') {
      return open + '<rect class="k-pad" x="' + (k.x - 7.5) + '" y="' + (k.y - 9) + '" width="15" height="18" rx="5"/>' + close;
    }
    if (k.sh === 'pan') {
      return open + '<circle class="k-pad" cx="' + k.x + '" cy="' + k.y + '" r="10"/>' +
        '<circle class="k-ring" cx="' + k.x + '" cy="' + k.y + '" r="4"/>' + close;
    }
    if (k.sh === 'loop') {
      return open + '<ellipse class="k-pad" cx="' + k.x + '" cy="' + k.y + '" rx="8" ry="6"/>' + close;
    }
    if (k.sh === 'tiny') {
      return open + '<ellipse class="k-pad" cx="' + k.x + '" cy="' + k.y + '" rx="5" ry="4"/>' + close;
    }
    if (k.sh === 'spat') {
      return open + '<rect class="k-pad" x="' + (k.x - 7.5) + '" y="' + (k.y - 4) + '" width="15" height="8" rx="4"/>' + close;
    }
    // hole: plato con anillo decorativo
    var r = k.r || 9;
    return open +
      '<circle class="k-pad" cx="' + k.x + '" cy="' + k.y + '" r="' + r + '"/>' +
      '<circle class="k-ring" cx="' + k.x + '" cy="' + k.y + '" r="4"/>' + close;
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

    wrap.innerHTML =
      '<div class="tm-fg-wrap">' +
        '<div class="tm-fg-readout" id="' + uid + '_ro"><span class="tm-fg-hint">Elige una nota para ver su digitación</span></div>' +
        '<div class="tm-fg-diagram"><svg class="tm-fg-svg" viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '" role="img" aria-label="Diagrama de digitación del fagot: instrumento vertical con la campana arriba, el tudel y la caña saliendo hacia el lateral y la culata (la parte más gruesa) abajo; las llaves pulsadas se muestran en dorado">' +
          DECO + keysSvg +
        '</svg></div>' +
        '<div class="tm-fg-btns">' + btns + '</div>' +
      '</div>';

    var svg = wrap.querySelector('.tm-fg-svg');
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
      var clef = claveDe(n);
      var V = Vex.Flow;
      var r = new V.Renderer(el, V.Renderer.Backends.SVG);
      r.resize(150, 150);
      var ctx = r.getContext(); ctx.setFillStyle('#1a1a1a'); ctx.setStrokeStyle('#1a1a1a');
      var stave = new V.Stave(2, 34, 132);
      stave.addClef(clef).setContext(ctx).draw();
      var note = new V.StaveNote({ keys: [vn.key], duration: 'w', clef: clef });
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
        '<div class="tm-fg-noterow"><span class="tm-fg-intl">' + label(n) + (FLAT[n] ? ' (' + FLAT[n] + ')' : '') + '</span>' +
        '<button class="tm-fg-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-fg-reg">' + intl(n) + ' · ' + registro(n) + ' · clave de ' + CLAVE_ES[claveDe(n)] + '</div>' +
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
