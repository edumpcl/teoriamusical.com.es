/* Explorador de acordes de séptima y de tríada: el acorde elegido (tipo + nota fundamental + posición) dibujado en el pentagrama con Verovio
   (tm-mei.js + tm-notacion.js), con cada nota coloreada según su función, las notas nombradas, los intervalos, el cifrado
   (americano y de bajo) y audio (tm-piano-audio.js). Sin teclado ni mástil: solo pentagrama.

   Uso en una página:  <div class="tm-xs" data-tipo="maj7"></div>   (data-tipo: maj7 | m7 | 7 | ø7 | o7 → el tipo inicial)
   Tríadas:  <div class="tm-xs" data-familia="triada" data-tipo="M"></div>   (data-tipo: M | m | aug | dim)
   data-fijo: sin selector de tipo (páginas de un solo acorde)
   Verovio (1,7 MB) no se descarga hasta que el explorador está a punto de verse en pantalla. */
(function () {
  'use strict';
  var EN = document.documentElement.lang === 'en';
  var T = function (es, en) { return EN ? en : es; };

  var LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
  var PC = [0, 2, 4, 5, 7, 9, 11];
  var NOMBRE = T(['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'], ['C', 'D', 'E', 'F', 'G', 'A', 'B']);
  var LETRA_CIFRADO = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  var SIGNO = { '-2': '♭♭', '-1': '♭', '0': '', '1': '♯', '2': '♯♯' };

  /* 14 fundamentales con su ortografía habitual: (letra, alteración) */
  var RAICES = [[0, 0], [0, 1], [1, -1], [1, 0], [2, -1], [2, 0], [3, 0], [3, 1], [4, -1], [4, 0], [5, -1], [5, 0], [6, -1], [6, 0]];

  var TIPOS7 = [
    { id: 'maj7', semis: [0, 4, 7, 11], suf: ['maj7', 'M7', '△7'],
      nombre: T('Séptima mayor', 'Major seventh'), ints: T(['3ª mayor', '5ª justa', '7ª mayor'], ['major 3rd', 'perfect 5th', 'major 7th']), corto: 'maj7' },
    { id: 'm7', semis: [0, 3, 7, 10], suf: ['m7', 'min7', '−7'],
      nombre: T('Séptima menor', 'Minor seventh'), ints: T(['3ª menor', '5ª justa', '7ª menor'], ['minor 3rd', 'perfect 5th', 'minor 7th']), corto: 'm7' },
    { id: '7', semis: [0, 4, 7, 10], suf: ['7'],
      nombre: T('Séptima de dominante', 'Dominant seventh'), ints: T(['3ª mayor', '5ª justa', '7ª menor'], ['major 3rd', 'perfect 5th', 'minor 7th']), corto: '7' },
    { id: 'ø7', semis: [0, 3, 6, 10], suf: ['m7♭5', 'ø7'],
      nombre: T('Séptima de sensible (semidisminuida)', 'Half-diminished seventh'), ints: T(['3ª menor', '5ª disminuida', '7ª menor'], ['minor 3rd', 'diminished 5th', 'minor 7th']), corto: 'ø7' },
    { id: 'o7', semis: [0, 3, 6, 9], suf: ['dim7', '°7'],
      nombre: T('Séptima disminuida', 'Diminished seventh'), ints: T(['3ª menor', '5ª disminuida', '7ª disminuida'], ['minor 3rd', 'diminished 5th', 'diminished 7th']), corto: '°7' }
  ];

  var POS7 = [
    { nombre: T('Fundamental', 'Root position'), cifra: '7', barra: false },
    { nombre: T('1ª inversión', '1st inversion'), cifra: '6/5', barra: true },
    { nombre: T('2ª inversión', '2nd inversion'), cifra: '4/3', barra: true },
    { nombre: T('3ª inversión', '3rd inversion'), cifra: '4/2', barra: true }
  ];
  var ROLES7 = T(['Fundamental', '3ª', '5ª', '7ª'], ['Root', '3rd', '5th', '7th']);

  /* Tríadas */
  var TIPOS_TRI = [
    { id: 'M', semis: [0, 4, 7], suf: [''],
      nombre: T('Acorde mayor', 'Major triad'), ints: T(['3ª mayor', '5ª justa'], ['major 3rd', 'perfect 5th']) },
    { id: 'm', semis: [0, 3, 7], suf: ['m', 'min', '−'],
      nombre: T('Acorde menor', 'Minor triad'), ints: T(['3ª menor', '5ª justa'], ['minor 3rd', 'perfect 5th']) },
    { id: 'aug', semis: [0, 4, 8], suf: ['aug', '+'],
      nombre: T('Acorde aumentado', 'Augmented triad'), ints: T(['3ª mayor', '5ª aumentada'], ['major 3rd', 'augmented 5th']) },
    { id: 'dim', semis: [0, 3, 6], suf: ['dim', '°'],
      nombre: T('Acorde disminuido', 'Diminished triad'), ints: T(['3ª menor', '5ª disminuida'], ['minor 3rd', 'diminished 5th']) }
  ];
  var POS_TRI = [
    { nombre: T('Fundamental', 'Root position'), cifra: '5/3' },
    { nombre: T('1ª inversión', '1st inversion'), cifra: '6' },
    { nombre: T('2ª inversión', '2nd inversion'), cifra: '6/4' }
  ];
  var ROLES_TRI = T(['Fundamental', '3ª', '5ª'], ['Root', '3rd', '5th']);
  var COLORES = ['#8b6914', '#1f5fa6', '#1a7a43', '#b3261e'];

  function dec(l, a) { return NOMBRE[l] + SIGNO[a]; }
  function decCifra(l, a) { return LETRA_CIFRADO[l] + SIGNO[a]; }

  /* Las 4 notas del acorde: [{ letra, alt, paso, rol }] (paso = octava*7 + letra, en diatónico) ya en la posición elegida y de grave a agudo. */
  function acorde(tipo, raiz, pos) {
    var l = RAICES[raiz][0], a = RAICES[raiz][1];
    var rpc = PC[l] + a;
    var notas = tipo.semis.map(function (s, k) {
      var letra = (l + 2 * k) % 7;
      var alt = ((rpc + s - PC[letra] + 18) % 12) - 6;
      var paso = 4 * 7 + l + 2 * k;   // fundamental en la 4.ª octava (empieza en Do4..Si4)
      return { letra: letra, alt: alt, paso: paso, rol: k };
    });
    for (var i = 0; i < pos; i++) notas[i].paso += 7;
    var max = Math.max.apply(null, notas.map(function (n) { return n.paso; }));
    if (max > 5 * 7 + 5) notas.forEach(function (n) { n.paso -= 7; });   // nada por encima del La5
    notas.sort(function (x, y) { return x.paso - y.paso; });
    notas.forEach(function (n) {
      n.oct = Math.floor(n.paso / 7);
      n.tecla = LETRAS[n.letra] + (n.alt > 0 ? '##'.slice(0, n.alt) : n.alt < 0 ? 'bb'.slice(0, -n.alt) : '') + '/' + n.oct;
      n.midi = (n.oct + 1) * 12 + PC[n.letra] + n.alt;
    });
    return notas;
  }

  var CSS = [
    '.tm-xs{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:22px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,.05);margin:24px 0;color:#1a1a1a;font-family:inherit}',
    '.tm-xs::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0}',
    '.tm-xs-titulo{font-size:1.05rem;font-weight:800;margin:0 0 4px}',
    '.tm-xs-ayuda{font-size:.95rem;color:#444;margin:0 0 14px}',
    '.tm-xs-grupo{margin:12px 0 4px;font-size:.9rem;font-weight:700;color:#1a1a1a}',
    '.tm-xs-fila{display:flex;flex-wrap:wrap;gap:8px}',
    '.tm-xs-btn{font:inherit;font-size:1rem;font-weight:700;min-width:44px;min-height:44px;padding:8px 12px;border:1px solid #d8d0b8;background:#f5f2ea;color:#1a1a1a;border-radius:6px;cursor:pointer}',
    '.tm-xs-btn:hover{border-color:#8b6914}',
    '.tm-xs-btn[aria-pressed="true"]{background:#8b6914;border-color:#8b6914;color:#fff;box-shadow:0 4px 10px rgba(139,105,20,.3)}',
    '.tm-xs-btn:focus-visible{outline:3px solid #1f5fa6;outline-offset:2px}',
    '.tm-xs-pent{background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;margin:16px 0 8px;min-height:150px;display:flex;justify-content:center;align-items:center;padding:6px;overflow:hidden}',
    '.tm-xs-cargando{color:#555;font-size:.95rem}',
    '.tm-xs-chips{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 0;padding:0;list-style:none}',
    '.tm-xs-chip{display:flex;align-items:center;gap:8px;background:#fff;border:1px solid #e8e0cc;border-radius:999px;padding:6px 14px;font-size:1rem;color:#1a1a1a}',
    '.tm-xs-punto{width:14px;height:14px;border-radius:50%;flex:none}',
    '.tm-xs-datos{margin:16px 0 0;display:grid;grid-template-columns:max-content 1fr;gap:6px 14px;font-size:1rem}',
    '.tm-xs-datos dt{font-weight:700}.tm-xs-datos dd{margin:0}',
    '.tm-xs-audio{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}',
    '.tm-xs-play{font:inherit;font-weight:800;padding:12px 18px;border:none;border-radius:6px;background:#1a1a1a;color:#fff;cursor:pointer;min-height:44px}',
    '.tm-xs-play.tm-sec{background:#f5f2ea;color:#1a1a1a;border:1px solid #d8d0b8}',
    '.tm-xs-play:focus-visible{outline:3px solid #1f5fa6;outline-offset:2px}',
    '@media(max-width:520px){.tm-xs{padding:16px}.tm-xs-datos{grid-template-columns:1fr}.tm-xs-datos dt{margin-top:6px}}'
  ].join('');

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  var cuenta = 0;

  function montar(el) {
    var uid = 'xs' + (++cuenta);
    var triada = el.getAttribute('data-familia') === 'triada';
    var TIPOS = triada ? TIPOS_TRI : TIPOS7, POSICIONES = triada ? POS_TRI : POS7, ROLES = triada ? ROLES_TRI : ROLES7;
    var ini = el.getAttribute('data-tipo');
    var fijo = el.hasAttribute('data-fijo');   // una página de un solo acorde: sin selector de tipo
    var estado = { tipo: Math.max(0, TIPOS.map(function (t) { return t.id; }).indexOf(ini)), raiz: 0, pos: 0 };

    var botonesRaiz = RAICES.map(function (r, i) {
      return '<button type="button" class="tm-xs-btn" data-r="' + i + '" aria-pressed="false" aria-label="' + esc(T('Fundamental ', 'Root ') + dec(r[0], r[1])) + '">' + esc(dec(r[0], r[1])) + '</button>';
    }).join('');
    var botonesTipo = TIPOS.map(function (t, i) {
      return '<button type="button" class="tm-xs-btn" data-t="' + i + '" aria-pressed="false">' + esc(t.nombre) + '</button>';
    }).join('');
    var botonesPos = POSICIONES.map(function (p, i) {
      return '<button type="button" class="tm-xs-btn" data-p="' + i + '" aria-pressed="false">' + esc(p.nombre) + '</button>';
    }).join('');

    var tt = TIPOS[estado.tipo];
    el.innerHTML =
      '<p class="tm-xs-titulo">' + (fijo ? T('Explorador: ' + tt.nombre.toLowerCase() + ' sobre cualquier nota', tt.nombre + ' on any note') : (triada ? T('Explorador de acordes triadas', 'Triad explorer') : T('Explorador de acordes de séptima', 'Seventh-chord explorer'))) + '</p>' +
      '<p class="tm-xs-ayuda">' + (fijo ? T('Elige la nota fundamental y la posición: el acorde se dibuja en el pentagrama.', 'Choose the root and the position: the chord is drawn on the staff.') : T('Elige el tipo de acorde, la nota fundamental y la posición: el acorde se dibuja en el pentagrama.', 'Choose the chord type, the root and the position: the chord is drawn on the staff.')) + '</p>' +
      (fijo ? '' : '<div class="tm-xs-grupo" id="' + uid + '_t">' + T('Tipo de acorde', 'Chord type') + '</div><div class="tm-xs-fila" role="group" aria-labelledby="' + uid + '_t">' + botonesTipo + '</div>') +
      '<div class="tm-xs-grupo" id="' + uid + '_r">' + T('Nota fundamental', 'Root note') + '</div><div class="tm-xs-fila" role="group" aria-labelledby="' + uid + '_r">' + botonesRaiz + '</div>' +
      '<div class="tm-xs-grupo" id="' + uid + '_p">' + T('Posición', 'Position') + '</div><div class="tm-xs-fila" role="group" aria-labelledby="' + uid + '_p">' + botonesPos + '</div>' +
      '<div class="tm-xs-pent" aria-live="polite"><span class="tm-xs-cargando">' + T('Cargando el pentagrama…', 'Loading the staff…') + '</span></div>' +
      '<ul class="tm-xs-chips" aria-label="' + T('Función de cada nota', 'Role of each note') + '"></ul>' +
      '<dl class="tm-xs-datos"></dl>' +
      '<div class="tm-xs-audio"><button type="button" class="tm-xs-play" data-a="acorde">▶ ' + T('Escuchar el acorde', 'Play the chord') + '</button>' +
      '<button type="button" class="tm-xs-play tm-sec" data-a="arpegio">▶ ' + T('Escuchar en arpegio', 'Play as arpeggio') + '</button></div>';

    var pent = el.querySelector('.tm-xs-pent'), chips = el.querySelector('.tm-xs-chips'), datos = el.querySelector('.tm-xs-datos');
    var actual = null;

    function textos(notas, tipo, raiz, pos) {
      var l = RAICES[raiz][0], a = RAICES[raiz][1];
      var rootTxt = dec(l, a), cifra = decCifra(l, a);
      var bajo = notas[0];
      var nombres = notas.map(function (n) { return dec(n.letra, n.alt); });
      chips.innerHTML = notas.slice().sort(function (x, y) { return x.rol - y.rol; }).map(function (n) {
        return '<li class="tm-xs-chip"><span class="tm-xs-punto" style="background:' + COLORES[n.rol] + '"></span><span><strong>' + ROLES[n.rol] + '</strong>: ' + esc(dec(n.letra, n.alt)) + '</span></li>';
      }).join('');
      var cif = tipo.suf.map(function (s) { return cifra + s; });
      var primero = cif[0] + (pos ? '/' + decCifra(bajo.letra, bajo.alt) : '');
      datos.innerHTML =
        '<dt>' + T('Acorde', 'Chord') + '</dt><dd>' + esc(T(tipo.nombre + ' sobre ' + rootTxt, tipo.nombre + ' on ' + rootTxt)) + ' (<strong>' + esc(cif[0]) + '</strong>)</dd>' +
        '<dt>' + T('Notas (de grave a agudo)', 'Notes (low to high)') + '</dt><dd>' + esc(nombres.join(' – ')) + '</dd>' +
        '<dt>' + T('Intervalos sobre la fundamental', 'Intervals above the root') + '</dt><dd>' + esc(tipo.ints.join(' · ')) + '</dd>' +
        '<dt>' + T('Cifrado americano', 'Chord symbol') + '</dt><dd>' + esc(cif.join(' · ')) + (pos ? ' — ' + esc(T('en esta posición: ', 'in this position: ')) + '<strong>' + esc(primero) + '</strong>' : '') + '</dd>' +
        '<dt>' + T('Cifrado de bajo', 'Figured bass') + '</dt><dd>' + esc(POSICIONES[pos].nombre) + ': <strong>' + POSICIONES[pos].cifra + '</strong></dd>';
      return nombres;
    }

    /* Lo barato (botones y textos) se actualiza al instante; lo caro (Verovio) va aparte, tras el pintado */
    function refrescar() {
      var tipo = TIPOS[estado.tipo], notas = acorde(tipo, estado.raiz, estado.pos);
      actual = notas;
      el.querySelectorAll('[data-t]').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-t') === estado.tipo)); });
      el.querySelectorAll('[data-r]').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-r') === estado.raiz)); });
      el.querySelectorAll('[data-p]').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-p') === estado.pos)); });
      var nombres = textos(notas, tipo, estado.raiz, estado.pos);
      return { tipo: tipo, notas: notas, nombres: nombres };
    }

    function dibujar(r) {
      r = r || refrescar();
      var tipo = r.tipo, notas = r.notas, nombres = r.nombres;
      var alt = T((triada ? tipo.nombre : 'Acorde de ' + tipo.nombre.toLowerCase()) + ' sobre ' + dec(RAICES[estado.raiz][0], RAICES[estado.raiz][1]) + ', ' + POSICIONES[estado.pos].nombre.toLowerCase() + ', en el pentagrama: ',
        tipo.nombre + (triada ? ' on ' : ' chord on ') + dec(RAICES[estado.raiz][0], RAICES[estado.raiz][1]) + ', ' + POSICIONES[estado.pos].nombre.toLowerCase() + ', on the staff: ') + nombres.join(', ');
      var fila = { pentagramas: [{ clave: 'sol', compases: [[{ notas: notas.map(function (n) { return { key: n.tecla, color: COLORES[n.rol] }; }), d: 'w' }]] }] };
      window.tmNotacion.dibujar(pent, fila, { escala: 1.5, separacion: 0.15, noLineal: 0.2, id: uid, alt: alt }).catch(function () {
        pent.innerHTML = '<span class="tm-xs-cargando">' + T('No se ha podido dibujar el pentagrama. Notas: ', 'The staff could not be drawn. Notes: ') + esc(nombres.join(', ')) + '</span>';
      });
    }

    var redibujar = window.tmNotacion.diferido(function () { dibujar(); });
    function cambiar() { refrescar(); redibujar(); }
    el.addEventListener('click', function (ev) {
      var b = ev.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.hasAttribute('data-t')) { estado.tipo = +b.getAttribute('data-t'); cambiar(); }
      else if (b.hasAttribute('data-r')) { estado.raiz = +b.getAttribute('data-r'); cambiar(); }
      else if (b.hasAttribute('data-p')) { estado.pos = +b.getAttribute('data-p'); cambiar(); }
      else if (b.hasAttribute('data-a')) {
        if (!window.tmPiano || !actual) return;
        var arp = b.getAttribute('data-a') === 'arpegio';
        window.tmPiano.playEvents(actual.map(function (n, i) { return { midi: n.midi, when: arp ? i * 0.4 : 0, dur: arp ? 2.2 - i * 0.4 : 2 }; }));
      }
    });

    /* Verovio solo cuando el explorador está a punto de verse */
    var arrancado = false;
    function arrancar() { if (arrancado) return; arrancado = true; dibujar(); }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); arrancar(); } }, { rootMargin: '300px' });
      io.observe(el);
      // aunque aún no esté a la vista, los textos y botones ya reflejan el acorde inicial
      if (!fijo) el.querySelectorAll('[data-t]')[estado.tipo].setAttribute('aria-pressed', 'true');
      el.querySelectorAll('[data-r]')[0].setAttribute('aria-pressed', 'true');
      el.querySelectorAll('[data-p]')[0].setAttribute('aria-pressed', 'true');
      textos(acorde(TIPOS[estado.tipo], 0, 0), TIPOS[estado.tipo], 0, 0);
    } else arrancar();
  }

  function iniciar() {
    if (!document.querySelector('style[data-tm-xs]')) {
      var st = document.createElement('style'); st.setAttribute('data-tm-xs', ''); st.textContent = CSS; document.head.appendChild(st);
    }
    Array.prototype.forEach.call(document.querySelectorAll('.tm-xs'), montar);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();

  if (typeof module === 'object' && module.exports) module.exports = { acorde: acorde, TIPOS: TIPOS7, TIPOS_TRI: TIPOS_TRI, RAICES: RAICES, dec: dec };
})();
