/* Diagrama de digitaciones del contrafagot (sistema Fox/Heckel) — interactivo.
   Esquema vertical simplificado: dos tubos paralelos de madera (el recorrido
   real dobla cuatro veces), tudel metálico largo con la caña arriba a la
   izquierda, campana arriba y culata abajo. Llave plateada = abierta, llave
   dorada = pulsada. Es transpositor de octava: suena una octava más grave de
   lo escrito.
   Uso: <div id="x"></div><script>tmContrafagotEngine('x');</script>
   Datos decodificados celda a celda de la "Contrabassoon Fingering Chart
   (Fox)" de Joseph Grimmer (2018), verificados dos veces (lectura visual +
   clasificación por posición). A diferencia del fagot, el contrafagot no usa
   medio agujero: tiene una llave específica y dos llaves de venteo (octava)
   para el pulgar izquierdo; tampoco tiene llave de piano (whisper).
   El pentagrama usa la clave real de lectura: fa en 4ª hasta Sol3, do en 4ª
   hasta Sol4 y sol por encima (se evitan líneas adicionales). */
(function () {
  'use strict';

  // Elementos que se ENCIENDEN (data-k). El resto del dibujo es decorativo.
  var KEYS = [
    // Pulgar izquierdo (lado derecho del tubo principal)
    { id: 'V1',  sh: 'small', x: 255, y: 340 },  // 1ª llave de venteo (octava)
    { id: 'V2',  sh: 'oct',   x: 255, y: 361 },  // 2ª llave de venteo
    { id: 'LD',  sh: 'touch', x: 255, y: 424 },  // Re grave
    { id: 'LC',  sh: 'touch', x: 255, y: 445 },  // Do grave
    { id: 'LB',  sh: 'touch', x: 255, y: 466 },  // Si grave
    { id: 'LBB', sh: 'touch', x: 255, y: 487 },  // Si♭ grave
    { id: 'CS',  sh: 'oct',   x: 255, y: 508 },  // Do♯ (pulgar izq.)
    // Pulgar derecho (en la culata)
    { id: 'BB',  sh: 'loop',  x: 258, y: 540 },  // Si♭ (pulgar dcho.)
    { id: 'LE',  sh: 'pan',   x: 258, y: 575 },  // Mi grave («pancake»)
    { id: 'FS',  sh: 'oct',   x: 258, y: 610 },  // Fa♯ (pulgar dcho.)
    // Agujeros/platos del tubo (mano izq. 1-3, mano dcha. 4-6)
    { id: 'H1',  sh: 'hole',  x: 220, y: 355 },
    { id: 'H2',  sh: 'hole',  x: 220, y: 390 },
    { id: 'H3',  sh: 'hole',  x: 220, y: 425 },
    { id: 'H4',  sh: 'hole',  x: 220, y: 545 },
    { id: 'H5',  sh: 'hole',  x: 220, y: 575 },
    { id: 'G6',  sh: 'hole',  x: 220, y: 605, r: 10 },  // plato del 6 (Sol)
    // Llave de medio agujero y meñiques (lado izquierdo)
    { id: 'MH',  sh: 'spat',  x: 182, y: 425 },  // ll. de medio agujero
    { id: 'EBR', sh: 'spat',  x: 182, y: 450 },  // Mi♭ (meñique izq.)
    { id: 'LCS', sh: 'spat',  x: 182, y: 475 },  // Do♯ grave (meñique izq.)
    { id: 'FK',  sh: 'loop',  x: 182, y: 613 },  // llave de Fa (meñique dcho.)
    { id: 'AB',  sh: 'loop',  x: 182, y: 636 }   // Sol♯/La♭ (meñique dcho.)
  ];
  var SVG_W = 420, SVG_H = 690;

  // Nombres para el desglose de la digitación en el marcador
  var NAMES = {
    V1: '1ª ll. de venteo', V2: '2ª ll. de venteo',
    LD: 'Re grave', LC: 'Do grave', LB: 'Si grave', LBB: 'Si♭ grave', CS: 'Do♯ (pulgar)',
    BB: 'Si♭ (pulgar dcho.)', LE: 'Mi grave', FS: 'Fa♯ (pulgar dcho.)',
    H1: 'agujero 1', H2: 'agujero 2', H3: 'agujero 3',
    H4: 'agujero 4', H5: 'agujero 5', G6: 'plato 6 (Sol)',
    MH: 'll. de medio agujero', EBR: 'Mi♭ (meñique izq.)', LCS: 'Do♯ grave (meñique)',
    FK: 'll. de Fa', AB: 'Sol♯ (meñique)'
  };

  // Digitaciones estándar (carta Grimmer/Fox), Si♭1–Re5 escritos.
  var FING = {
    'La#1': { keys: ['LBB', 'LB', 'LC', 'LD', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Si1':  { keys: ['LB', 'LC', 'LD', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Do2':  { keys: ['LC', 'LD', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Do#2': { keys: ['LC', 'LD', 'LCS', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Re2':  { keys: ['LD', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Re#2': { keys: ['LD', 'EBR', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Mi2':  { keys: ['LCS', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK', 'LE'] },
    'Fa2':  { keys: ['LC', 'LD', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK'] },
    'Fa#2': { keys: ['H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FS', 'FK'] },
    'Sol2': { keys: ['H1', 'H2', 'H3', 'H4', 'H5', 'G6'] },
    'Sol#2':{ keys: ['H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'LE', 'AB'] },
    'La2':  { keys: ['H1', 'H2', 'H3', 'H4', 'H5', 'LE'] },
    'La#2': { keys: ['H1', 'H2', 'H3', 'H4', 'H5', 'LE', 'BB'] },
    'Si2':  { keys: ['H1', 'H2', 'H3', 'H4', 'LE', 'AB'] },
    'Do3':  { keys: ['H1', 'H2', 'H3', 'H5', 'G6', 'LE', 'FS', 'AB'] },
    'Do#3': { keys: ['CS', 'H1', 'H2', 'H3', 'H5', 'G6'] },
    'Re3':  { keys: ['H1', 'H2', 'H5', 'G6'] },
    'Re#3': { keys: ['H1', 'H2', 'EBR', 'H5', 'G6'] },
    'Mi3':  { keys: ['H1', 'H5', 'G6'] },
    'Fa3':  { keys: ['H5', 'G6'] },
    'Fa#3': { keys: ['LC', 'LD', 'H2', 'H3', 'H4', 'H5', 'G6', 'FS'] },
    'Sol3': { keys: ['H2', 'H3', 'MH', 'H4', 'H5', 'G6'] },
    'Sol#3':{ keys: ['V1', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'AB'] },
    'La3':  { keys: ['V1', 'H1', 'H2', 'H3', 'H4', 'H5'] },
    'La#3': { keys: ['V1', 'H1', 'H2', 'H3', 'H4', 'H5', 'BB'] },
    'Si3':  { keys: ['V1', 'H1', 'H2', 'H3', 'H4'] },
    'Do4':  { keys: ['V1', 'H1', 'H2', 'H3'] },
    'Do#4': { keys: ['CS', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6', 'FK'] },
    'Re4':  { keys: ['CS', 'H1', 'H2', 'H3', 'H4', 'H5', 'G6'] },
    'Re#4': { keys: ['V2', 'H2', 'BB', 'H4', 'H5'] },
    'Mi4':  { keys: ['V1', 'H1', 'H3', 'MH', 'H4', 'H5', 'G6'] },
    'Fa4':  { keys: ['V2', 'H1', 'H3', 'MH', 'H4', 'H5'] },
    'Fa#4': { keys: ['V2', 'H2', 'H3', 'H4', 'H5', 'G6', 'FS'] },
    'Sol4': { keys: ['V2', 'H2', 'H3', 'H4', 'H5', 'G6'] },
    'Sol#4':{ keys: ['CS', 'H2', 'H3', 'MH', 'H5', 'G6', 'BB'] },
    'La4':  { keys: ['V1', 'CS', 'H1', 'H2', 'H3', 'H4', 'H5'] },
    'La#4': { keys: ['V1', 'H1', 'H2', 'H4', 'H5', 'FK'] },
    'Si4':  { keys: ['V1', 'H1', 'H2', 'EBR', 'H4', 'H5', 'FK'] },
    'Do5':  { keys: ['V1', 'H1'] },
    'Do#5': { keys: ['CS', 'H2', 'H3'] },
    'Re5':  { keys: ['CS', 'H2'] }
  };
  var ORDEN = [
    'La#1', 'Si1', 'Do2', 'Do#2', 'Re2', 'Re#2', 'Mi2', 'Fa2', 'Fa#2', 'Sol2', 'Sol#2', 'La2', 'La#2', 'Si2',
    'Do3', 'Do#3', 'Re3', 'Re#3', 'Mi3', 'Fa3', 'Fa#3', 'Sol3', 'Sol#3', 'La3', 'La#3', 'Si3',
    'Do4', 'Do#4', 'Re4', 'Re#4', 'Mi4', 'Fa4', 'Fa#4', 'Sol4', 'Sol#4', 'La4', 'La#4', 'Si4',
    'Do5', 'Do#5', 'Re5'
  ];
  var SUB = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅' };
  var FLAT = {
    'La#1': 'Si♭₁', 'Re#2': 'Mi♭₂', 'Sol#2': 'La♭₂', 'La#2': 'Si♭₂',
    'Re#3': 'Mi♭₃', 'Sol#3': 'La♭₃', 'La#3': 'Si♭₃',
    'Re#4': 'Mi♭₄', 'Sol#4': 'La♭₄', 'La#4': 'Si♭₄'
  };
  function label(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return n;
    return m[1] + (m[2] ? '♯' : '') + SUB[m[3]];
  }
  // Nota real: una octava por debajo de la escrita
  function suenaLabel(n) {
    var m = /^(Do|Re|Mi|Fa|Sol|La|Si)(#?)(\d)$/.exec(n);
    if (!m) return n;
    return m[1] + (m[2] ? '♯' : '') + SUB[String(parseInt(m[3], 10) - 1)];
  }
  // Registros: grave Si♭1–Sol2, medio –Fa3, agudo –Sol4, sobreagudo –Re5.
  function registro(n) {
    var i = ORDEN.indexOf(n);
    if (i >= 0 && i <= ORDEN.indexOf('Sol2')) return 'Registro grave';
    if (i <= ORDEN.indexOf('Fa3')) return 'Registro medio';
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
  var AUDIO_BASE = '/assets/audio/contrafagot/';
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
    '.tm-cf-wrap{margin:18px 0;}',
    '.tm-cf-readout{text-align:center;background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;padding:14px;margin-bottom:12px;min-height:54px;}',
    '.tm-cf-reg{font-size:.9rem;color:#666;margin-top:2px;}',
    '.tm-cf-keysline{font-size:.88rem;color:#8b6914;margin-top:4px;}',
    '.tm-cf-hint{font-size:1.02rem;color:#999;font-weight:600;}',
    '.tm-cf-diagram{background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:6px;display:flex;justify-content:center;}',
    '.tm-cf-svg{display:block;max-width:300px;width:100%;height:auto;margin:0 auto;}',
    '.tm-cf-key .k-pad{fill:#e9eaee;stroke:#8f9199;stroke-width:1.5;}',
    '.tm-cf-key.on .k-pad{fill:#8b6914;stroke:#6b5010;}',
    '.tm-cf-key .k-ring{fill:none;stroke:#8f9199;stroke-width:1.2;}',
    '.tm-cf-key.on .k-ring{stroke:#e8dcc0;}',
    '.tm-cf-klab{font-family:Arial,Helvetica,sans-serif;font-size:11px;fill:#555;text-anchor:middle;}',
    '.tm-cf-klab2{font-family:Arial,Helvetica,sans-serif;font-size:9px;fill:#777;text-anchor:middle;}',
    '.tm-cf-grp{font-family:Arial,Helvetica,sans-serif;font-size:12px;fill:#8b6914;text-anchor:middle;font-weight:bold;}',
    '.tm-cf-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:14px;}',
    '.tm-cf-btn{min-width:46px;padding:10px 12px;border:1px solid #d8d0b8;background:#f5f2ea;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '.tm-cf-btn:hover{background:#fdf8ee;border-color:#8b6914;}',
    '.tm-cf-btn.sel{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-cf-noterow{display:flex;align-items:center;justify-content:center;gap:10px;}',
    '.tm-cf-intl{font-size:1.5rem;font-weight:800;color:#1a1a1a;line-height:1.1;}',
    '.tm-cf-play{width:34px;height:34px;border-radius:50%;border:none;background:#8b6914;color:#fff;font-size:.85rem;cursor:pointer;line-height:1;flex:0 0 auto;}',
    '.tm-cf-play:hover{background:#6b5010;}',
    '.tm-cf-staff{display:flex;justify-content:center;align-items:center;min-height:120px;}',
    '.tm-cf-staff svg{max-width:100%;height:auto;}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('tm-cf-css')) return;
    var s = document.createElement('style'); s.id = 'tm-cf-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  // Dibujo estático: silueta simplificada del contrafagot. El tubo real dobla
  // cuatro veces; aquí se dibujan los dos tramos visibles de frente (tubo
  // principal con la mecánica y tubo paralelo), la campana arriba, la culata
  // con la vuelta en U abajo y el tudel metálico largo con la caña.
  var DECO =
    '<defs><linearGradient id="tmCfWood" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#7d4e28"/><stop offset="0.3" stop-color="#5a3418"/>' +
      '<stop offset="0.6" stop-color="#3f2210"/><stop offset="1" stop-color="#2a1408"/>' +
    '</linearGradient></defs>' +
    // tubo paralelo (segundo tramo del recorrido, a la izquierda)
    '<path d="M150 128 L154 618 L188 618 L185 128 Z" fill="url(#tmCfWood)" stroke="#1c0f06" stroke-width="1" opacity="0.95"/>' +
    '<line x1="162" y1="134" x2="166" y2="612" stroke="#96684044" stroke-width="1.2"/>' +
    '<rect x="147" y="120" width="41" height="14" rx="3" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    '<rect x="149" y="315" width="40" height="16" rx="3" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    // campana (arriba): abocinado + anillo metálico + resalte del hueco
    '<path d="M197 110 C190 88 178 60 163 34 L277 34 C262 60 250 88 243 110 Z" fill="url(#tmCfWood)" stroke="#1c0f06" stroke-width="1"/>' +
    '<ellipse cx="220" cy="34" rx="57" ry="11" fill="#17100a" stroke="#0d0805" stroke-width="1"/>' +
    '<ellipse cx="220" cy="34" rx="40" ry="7" fill="#4a3020"/>' +
    '<rect x="203" y="98" width="34" height="16" rx="2.5" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    // tubo principal (junta del ala + culata): cónico, con la mecánica
    '<path d="M197 110 L195 330 L191 520 L184 640 L256 640 L249 520 L245 330 L243 110 Z" fill="url(#tmCfWood)" stroke="#1c0f06" stroke-width="1"/>' +
    '<line x1="208" y1="115" x2="200" y2="635" stroke="#96684044" stroke-width="1.4"/>' +
    // anillas de las uniones
    '<rect x="207" y="100" width="26" height="18" rx="3" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    '<rect x="196" y="320" width="48" height="20" rx="3" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    '<rect x="192" y="510" width="56" height="20" rx="3" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    // culata ancha con la vuelta en U (une los dos tubos) y tapa metálica
    '<path d="M154 618 L188 618 L184 640 L256 640 L249 662 L158 662 Z" fill="url(#tmCfWood)" stroke="#1c0f06" stroke-width="1"/>' +
    '<ellipse cx="206" cy="662" rx="50" ry="8" fill="#d7d8dc" stroke="#9a9ca3" stroke-width="0.8"/>' +
    '<path d="M162 655 C168 660 240 660 248 655" stroke="#9a9ca3" stroke-width="1" fill="none"/>' +
    // tudel metálico largo (baja hasta el tubo paralelo) con la caña arriba
    '<path d="M168 128 C160 96 142 76 120 62" stroke="#c9cbd0" stroke-width="7" fill="none" stroke-linecap="round"/>' +
    '<path d="M119 60 L143 78 L134 96 L110 77 Z" fill="#d9b26a" stroke="#a8843e" stroke-width="1"/>' +
    '<rect x="86" y="26" width="16" height="10" rx="2" fill="#7a3040" stroke="#5e2432" stroke-width="1" transform="rotate(50 94 31)"/>' +
    '<path d="M110 77 L90 48" stroke="#d9b26a" stroke-width="6" stroke-linecap="round"/>' +
    // ejes de mecánica: varillas largas donde pivotan las llaves de los pulgares
    '<line x1="246" y1="336" x2="246" y2="512" stroke="#b9bbc1" stroke-width="1.6"/>' +
    '<line x1="249" y1="533" x2="249" y2="616" stroke="#b9bbc1" stroke-width="1.6"/>' +
    // varillas cortas hacia las llaves del lado izquierdo
    '<line x1="196" y1="425" x2="189" y2="425" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="196" y1="450" x2="189" y2="450" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="195" y1="475" x2="189" y2="475" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="187" y1="613" x2="182" y2="613" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<line x1="186" y1="636" x2="182" y2="636" stroke="#b9bbc1" stroke-width="1.3"/>' +
    // muletilla (apoyo de la mano derecha): decorativa, no es una llave
    '<line x1="254" y1="612" x2="279" y2="607" stroke="#b9bbc1" stroke-width="1.3"/>' +
    '<path d="M280 605 C293 604 301 613 298 623 C296 630 287 633 279 629 C283 624 285 618 283 612 C282 609 281 607 280 605 Z" fill="#2a2a2a" stroke="#151515" stroke-width="1"/>' +
    '<circle cx="281" cy="606" r="2" fill="#9a9ca3"/>' +
    // etiquetas
    '<text class="tm-cf-klab" x="220" y="16">Campana</text>' +
    '<text class="tm-cf-klab" x="72" y="88">Caña</text>' +
    '<text class="tm-cf-klab" x="72" y="100">y tudel</text>' +
    '<text class="tm-cf-klab" x="305" y="585">Culata</text>' +
    '<text class="tm-cf-klab2" x="292" y="646">Muletilla</text>' +
    '<text class="tm-cf-grp" x="255" y="332">Pulgar izquierdo</text>' +
    '<text class="tm-cf-grp" x="258" y="530">Pulgar derecho</text>' +
    '<text class="tm-cf-klab2" x="279" y="343">vent. 1</text>' +
    '<text class="tm-cf-klab2" x="279" y="364">vent. 2</text>' +
    '<text class="tm-cf-klab2" x="279" y="427">Re</text>' +
    '<text class="tm-cf-klab2" x="279" y="448">Do</text>' +
    '<text class="tm-cf-klab2" x="279" y="469">Si</text>' +
    '<text class="tm-cf-klab2" x="279" y="490">Si♭</text>' +
    '<text class="tm-cf-klab2" x="279" y="511">Do♯</text>' +
    '<text class="tm-cf-klab2" x="282" y="543">Si♭</text>' +
    '<text class="tm-cf-klab2" x="282" y="578">Mi</text>' +
    '<text class="tm-cf-klab2" x="282" y="613">Fa♯</text>' +
    '<text class="tm-cf-klab" style="fill:#e8dcc0" x="238" y="359">1</text><text class="tm-cf-klab" style="fill:#e8dcc0" x="238" y="394">2</text><text class="tm-cf-klab" style="fill:#e8dcc0" x="238" y="429">3</text>' +
    '<text class="tm-cf-klab" style="fill:#e8dcc0" x="238" y="549">4</text><text class="tm-cf-klab" style="fill:#e8dcc0" x="238" y="579">5</text><text class="tm-cf-klab" style="fill:#e8dcc0" x="238" y="609">6</text>' +
    '<text class="tm-cf-klab2" x="124" y="428">½ agujero</text>' +
    '<text class="tm-cf-grp" x="112" y="390">Mano</text>' +
    '<text class="tm-cf-grp" x="112" y="403">izquierda</text>' +
    '<text class="tm-cf-grp" x="112" y="573">Mano</text>' +
    '<text class="tm-cf-grp" x="112" y="586">derecha</text>' +
    '<text class="tm-cf-klab" x="114" y="466">Meñique</text>' +
    '<text class="tm-cf-klab" x="114" y="478">izq.</text>' +
    '<text class="tm-cf-klab" x="112" y="620">Meñique</text>' +
    '<text class="tm-cf-klab" x="112" y="632">dcho.</text>';

  function keyShape(k) {
    var open = '<g class="tm-cf-key" data-k="' + k.id + '">', close = '</g>';
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
    if (k.sh === 'spat') {
      return open + '<rect class="k-pad" x="' + (k.x - 7.5) + '" y="' + (k.y - 4) + '" width="15" height="8" rx="4"/>' + close;
    }
    // hole: plato con anillo decorativo
    var r = k.r || 9;
    return open +
      '<circle class="k-pad" cx="' + k.x + '" cy="' + k.y + '" r="' + r + '"/>' +
      '<circle class="k-ring" cx="' + k.x + '" cy="' + k.y + '" r="4"/>' + close;
  }

  function tmContrafagotEngine(containerId) {
    injectCSS();
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    var uid = containerId;

    var keysSvg = KEYS.map(keyShape).join('');
    var btns = ORDEN.map(function (n) {
      return '<button class="tm-cf-btn" data-n="' + n + '">' + label(n) + '</button>';
    }).join('');

    wrap.innerHTML =
      '<div class="tm-cf-wrap">' +
        '<div class="tm-cf-readout" id="' + uid + '_ro"><span class="tm-cf-hint">Elige una nota para ver su digitación</span></div>' +
        '<div class="tm-cf-diagram"><svg class="tm-cf-svg" viewBox="0 0 ' + SVG_W + ' ' + SVG_H + '" role="img" aria-label="Diagrama de digitación del contrafagot: esquema vertical simplificado con dos tubos paralelos, la campana arriba, el tudel largo con la caña saliendo hacia el lateral y la culata abajo; las llaves pulsadas se muestran en dorado">' +
          DECO + keysSvg +
        '</svg></div>' +
        '<div class="tm-cf-btns">' + btns + '</div>' +
      '</div>';

    var svg = wrap.querySelector('.tm-cf-svg');
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
      wrap.querySelectorAll('.tm-cf-btn').forEach(function (b) { b.classList.remove('sel'); });
      if (btn) btn.classList.add('sel');
      var data = FING[n];
      svg.querySelectorAll('.tm-cf-key').forEach(function (c) { c.classList.remove('on'); });
      var nombres = [];
      if (data) data.keys.forEach(function (id) {
        var c = svg.querySelector('.tm-cf-key[data-k="' + id + '"]'); if (c) c.classList.add('on');
        if (NAMES[id]) nombres.push(NAMES[id]);
      });
      ro.innerHTML =
        '<div class="tm-cf-staff" id="' + uid + '_staff"></div>' +
        '<div class="tm-cf-noterow"><span class="tm-cf-intl">' + label(n) + (FLAT[n] ? ' (' + FLAT[n] + ')' : '') + '</span>' +
        '<button class="tm-cf-play" type="button" aria-label="Reproducir la nota">▶</button></div>' +
        '<div class="tm-cf-reg">' + intl(n) + ' · suena ' + suenaLabel(n) + ' (octava abajo) · ' + registro(n) + ' · clave de ' + CLAVE_ES[claveDe(n)] + '</div>' +
        '<div class="tm-cf-keysline">' + (nombres.length ? nombres.join(' · ') : '—') + '</div>';
      renderStaff(n);
      var pb = ro.querySelector('.tm-cf-play');
      if (pb) pb.addEventListener('click', function () { play(n); });
      play(n);
    }

    wrap.querySelectorAll('.tm-cf-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { pick(btn.dataset.n, btn); });
    });
  }

  window.tmContrafagotEngine = tmContrafagotEngine;
})();
