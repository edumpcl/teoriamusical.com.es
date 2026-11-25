/* Convertidor de transposición: lo escrito → lo que suena (y al revés) para cada instrumento transpositor, dibujado en pentagramas con
   Verovio (tm-mei.js + tm-notacion.js). Dos modos:
     «Tengo la nota escrita» → qué suena realmente;   «Quiero que suene…» → qué hay que escribir en la parte.
   Uso:  <div class="tm-tr"></div>   (Verovio solo se descarga cuando el convertidor está a punto de verse). */
(function () {
  'use strict';
  var EN = document.documentElement.lang === 'en';
  var T = function (es, en) { return EN ? en : es; };

  var LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
  var PC = [0, 2, 4, 5, 7, 9, 11];
  var NOMBRE = T(['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'], ['C', 'D', 'E', 'F', 'G', 'A', 'B']);
  var SIGNO = { '-2': '♭♭', '-1': '♭', '0': '', '1': '♯', '2': '♯♯' };

  /* pasos = distancia diatónica (+ arriba, − abajo) de lo escrito a lo que suena; semis = semitonos. */
  var I = {
    M2a: { pasos: -1, semis: -2, txt: T('una 2ª mayor más grave', 'a major 2nd lower') },
    m3a: { pasos: -2, semis: -3, txt: T('una 3ª menor más grave', 'a minor 3rd lower') },
    P5a: { pasos: -4, semis: -7, txt: T('una 5ª justa más grave', 'a perfect 5th lower') },
    M6a: { pasos: -5, semis: -9, txt: T('una 6ª mayor más grave', 'a major 6th lower') },
    M9a: { pasos: -8, semis: -14, txt: T('una 9ª mayor más grave', 'a major 9th lower') },
    M13a: { pasos: -12, semis: -21, txt: T('una 13ª mayor más grave (6ª mayor + octava)', 'a major 13th lower (major 6th + octave)') },
    M16a: { pasos: -15, semis: -26, txt: T('una 16ª mayor más grave (dos octavas + un tono)', 'a major 16th lower (two octaves + a tone)') },
    m3b: { pasos: 2, semis: 3, txt: T('una 3ª menor más aguda', 'a minor 3rd higher') },
    O8a: { pasos: -7, semis: -12, txt: T('una octava más grave', 'an octave lower') },
    O8b: { pasos: 7, semis: 12, txt: T('una octava más aguda', 'an octave higher') },
    O15b: { pasos: 14, semis: 24, txt: T('dos octavas más agudo', 'two octaves higher') }
  };

  var GRUPOS = [
    { g: T('En Si♭ (suena una 2ª mayor más grave)', 'In B♭ (sounds a major 2nd lower)'), items: [
      ['trompeta', T('Trompeta en Si♭', 'B♭ trumpet'), 'M2a'], ['clarinete', T('Clarinete en Si♭', 'B♭ clarinet'), 'M2a'],
      ['fliscorno', T('Fliscorno en Si♭', 'B♭ flugelhorn'), 'M2a'], ['saxo-soprano', T('Saxofón soprano (Si♭)', 'Soprano saxophone (B♭)'), 'M2a']] },
    { g: T('En La (suena una 3ª menor más grave)', 'In A (sounds a minor 3rd lower)'), items: [['clarinete-la', T('Clarinete en La', 'A clarinet'), 'm3a']] },
    { g: T('En Fa (suena una 5ª justa más grave)', 'In F (sounds a perfect 5th lower)'), items: [
      ['trompa', T('Trompa en Fa', 'F horn'), 'P5a'], ['corno-ingles', T('Corno inglés (Fa)', 'English horn (F)'), 'P5a']] },
    { g: T('En Mi♭ (alto y barítono)', 'In E♭ (alto and baritone)'), items: [
      ['saxo-alto', T('Saxofón alto (Mi♭)', 'Alto saxophone (E♭)'), 'M6a'], ['clarinete-alto', T('Clarinete alto (Mi♭)', 'Alto clarinet (E♭)'), 'M6a'],
      ['saxo-baritono', T('Saxofón barítono (Mi♭)', 'Baritone saxophone (E♭)'), 'M13a'], ['requinto', T('Requinto, clarinete en Mi♭', 'E♭ clarinet (requinto)'), 'm3b']] },
    { g: T('En Si♭ grave (suena una 9ª mayor más grave)', 'Low B♭ (sounds a major 9th lower)'), items: [
      ['saxo-tenor', T('Saxofón tenor (Si♭)', 'Tenor saxophone (B♭)'), 'M9a'], ['clarinete-bajo', T('Clarinete bajo (Si♭)', 'Bass clarinet (B♭)'), 'M9a'],
      ['bombardino-sol', T('Bombardino en clave de sol (brass band)', 'Euphonium in treble clef (brass band)'), 'M9a'],
      ['clarinete-contrabajo', T('Clarinete contrabajo (Si♭)', 'Contrabass clarinet (B♭)'), 'M16a']] },
    { g: T('Transpositores de octava', 'Octave transposers'), items: [
      ['contrafagot', T('Contrafagot', 'Contrabassoon'), 'O8a'], ['guitarra', T('Guitarra', 'Guitar'), 'O8a'], ['bajo', T('Bajo eléctrico', 'Electric bass'), 'O8a'], ['contrabajo', T('Contrabajo', 'Double bass'), 'O8a'],
      ['flautin', T('Flautín', 'Piccolo'), 'O8b'], ['xilofono', T('Xilófono', 'Xylophone'), 'O8b'],
      ['glockenspiel', T('Glockenspiel', 'Glockenspiel'), 'O15b'], ['crotalos', T('Crótalos afinados', 'Antique cymbals (crotales)'), 'O15b']] }
  ];

  var INSTR = {};
  GRUPOS.forEach(function (g) { g.items.forEach(function (it) { INSTR[it[0]] = { id: it[0], nombre: it[1], I: I[it[2]] }; }); });

  function nombreNota(n) { return NOMBRE[n.letra] + SIGNO[n.alt] + n.oct; }
  function midiDe(n) { return (n.oct + 1) * 12 + PC[n.letra] + n.alt; }

  /* nota + intervalo → nota (ortografía por distancia diatónica); si hiciera falta una triple alteración, se escribe el equivalente enarmónico */
  function mover(n, iv, signo) {
    var paso = n.oct * 7 + n.letra + signo * iv.pasos;
    var letra = ((paso % 7) + 7) % 7, oct = Math.floor(paso / 7);
    var midi = midiDe(n) + signo * iv.semis;
    var alt = midi - ((oct + 1) * 12 + PC[letra]);
    var enarm = false;
    if (Math.abs(alt) > 2) {   // triple alteración: se busca la ortografía más sencilla para ese sonido
      var mejor = null;
      for (var d = -3; d <= 3; d++) {
        var p2 = paso + d, l2 = ((p2 % 7) + 7) % 7, o2 = Math.floor(p2 / 7), a2 = midi - ((o2 + 1) * 12 + PC[l2]);
        if (Math.abs(a2) <= 1 && (!mejor || Math.abs(a2) < Math.abs(mejor.alt) || (Math.abs(a2) === Math.abs(mejor.alt) && Math.abs(d) < Math.abs(mejor.d)))) mejor = { letra: l2, oct: o2, alt: a2, d: d };
      }
      letra = mejor.letra; oct = mejor.oct; alt = mejor.alt; enarm = true;
    }
    return { letra: letra, oct: oct, alt: alt, enarm: enarm };
  }

  /* «una 2ª mayor más grave» → «una 2ª mayor más aguda» (lo que hay que escribir respecto a lo que suena) */
  function opuesto(t) {
    return t.replace(/más grave|lower|más aguda|más agudo|higher/g, function (m) { return { 'más grave': 'más aguda', 'lower': 'higher', 'más aguda': 'más grave', 'más agudo': 'más grave', 'higher': 'lower' }[m]; });
  }
  function tecla(n) { return LETRAS[n.letra] + (n.alt > 0 ? '##'.slice(0, n.alt) : n.alt < 0 ? 'bb'.slice(0, -n.alt) : '') + '/' + n.oct; }

  var CSS = [
    '.tm-tr{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:22px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,.05);margin:24px 0;color:#1a1a1a;font-family:inherit}',
    '.tm-tr::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0}',
    '.tm-tr-titulo{font-size:1.05rem;font-weight:800;margin:0 0 4px}',
    '.tm-tr-ayuda{font-size:.95rem;color:#444;margin:0 0 14px}',
    '.tm-tr-grupo{margin:12px 0 4px;font-size:.9rem;font-weight:700}',
    '.tm-tr-fila{display:flex;flex-wrap:wrap;gap:8px}',
    '.tm-tr-btn{font:inherit;font-size:1rem;font-weight:700;min-width:44px;min-height:44px;padding:8px 12px;border:1px solid #d8d0b8;background:#f5f2ea;color:#1a1a1a;border-radius:6px;cursor:pointer}',
    '.tm-tr-btn:hover{border-color:#8b6914}',
    '.tm-tr-btn[aria-pressed="true"]{background:#8b6914;border-color:#8b6914;color:#fff;box-shadow:0 4px 10px rgba(139,105,20,.3)}',
    '.tm-tr-btn:focus-visible,.tm-tr-sel:focus-visible,.tm-tr-play:focus-visible{outline:3px solid #1f5fa6;outline-offset:2px}',
    '.tm-tr-sel{font:inherit;font-size:1rem;min-height:44px;padding:8px 10px;border:1px solid #d8d0b8;border-radius:6px;background:#fff;color:#1a1a1a;max-width:100%}',
    '.tm-tr-etq{font-size:.95rem;font-weight:800;margin:16px 0 4px}',
    '.tm-tr-pent{background:#fdfcf9;border:1px solid #e8e0cc;border-radius:8px;min-height:120px;display:flex;justify-content:center;align-items:center;padding:6px;overflow:hidden}',
    '.tm-tr-res{margin:16px 0 0;padding:14px 16px;background:#f5f2ea;border-left:4px solid #8b6914;border-radius:6px;font-size:1.02rem;line-height:1.5}',
    '.tm-tr-audio{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}',
    '.tm-tr-play{font:inherit;font-weight:800;padding:12px 18px;border:none;border-radius:6px;background:#1a1a1a;color:#fff;cursor:pointer;min-height:44px}',
    '.tm-tr-play.tm-sec{background:#f5f2ea;color:#1a1a1a;border:1px solid #d8d0b8}',
    '.tm-tr-cargando{color:#555;font-size:.95rem}',
    '@media(max-width:520px){.tm-tr{padding:16px}}'
  ].join('');

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  var cuenta = 0;

  function montar(el) {
    var uid = 'tr' + (++cuenta);
    var st = { instr: 'clarinete', modo: 'escrito', letra: 0, alt: 0, oct: 4 };

    var opciones = GRUPOS.map(function (g) {
      return '<optgroup label="' + esc(g.g) + '">' + g.items.map(function (it) { return '<option value="' + it[0] + '">' + esc(it[1]) + '</option>'; }).join('') + '</optgroup>';
    }).join('');
    var letras = NOMBRE.map(function (n, i) { return '<button type="button" class="tm-tr-btn" data-l="' + i + '" aria-pressed="false">' + n + '</button>'; }).join('');
    var alts = [[-1, '♭'], [0, '♮'], [1, '♯']].map(function (a) {
      return '<button type="button" class="tm-tr-btn" data-a="' + a[0] + '" aria-pressed="false" aria-label="' + (a[0] < 0 ? T('bemol', 'flat') : a[0] > 0 ? T('sostenido', 'sharp') : T('natural', 'natural')) + '">' + a[1] + '</button>';
    }).join('');
    var octs = [3, 4, 5].map(function (o) { return '<button type="button" class="tm-tr-btn" data-o="' + o + '" aria-pressed="false">' + o + '</button>'; }).join('');

    el.innerHTML =
      '<p class="tm-tr-titulo">' + T('Convertidor de transposición', 'Transposition converter') + '</p>' +
      '<p class="tm-tr-ayuda">' + T('Elige el instrumento y una nota: verás en el pentagrama lo que se lee y lo que suena de verdad, y podrás oír las dos.', 'Choose the instrument and a note: you will see on the staff what is read and what really sounds, and you can hear both.') + '</p>' +
      '<div class="tm-tr-grupo"><label for="' + uid + '_i">' + T('Instrumento', 'Instrument') + '</label></div><select class="tm-tr-sel" id="' + uid + '_i">' + opciones + '</select>' +
      '<div class="tm-tr-grupo" id="' + uid + '_m">' + T('¿Qué quieres saber?', 'What do you want to know?') + '</div><div class="tm-tr-fila" role="group" aria-labelledby="' + uid + '_m">' +
      '<button type="button" class="tm-tr-btn" data-m="escrito" aria-pressed="true">' + T('Tengo la nota escrita: ¿qué suena?', 'I have the written note: what sounds?') + '</button>' +
      '<button type="button" class="tm-tr-btn" data-m="suena" aria-pressed="false">' + T('Quiero que suene una nota: ¿qué escribo?', 'I want a note to sound: what do I write?') + '</button></div>' +
      '<div class="tm-tr-grupo" id="' + uid + '_n"></div>' +
      '<div class="tm-tr-fila" role="group" aria-labelledby="' + uid + '_n">' + letras + '<span style="width:12px"></span>' + alts + '<span style="width:12px"></span><span class="tm-tr-grupo" style="align-self:center;margin:0">' + T('Octava', 'Octave') + '</span>' + octs + '</div>' +
      '<div class="tm-tr-etq" id="' + uid + '_e1"></div><div class="tm-tr-pent" id="' + uid + '_p1" aria-live="polite"><span class="tm-tr-cargando">' + T('Cargando el pentagrama…', 'Loading the staff…') + '</span></div>' +
      '<div class="tm-tr-etq" id="' + uid + '_e2"></div><div class="tm-tr-pent" id="' + uid + '_p2"></div>' +
      '<p class="tm-tr-res" id="' + uid + '_r"></p>' +
      '<div class="tm-tr-audio"><button type="button" class="tm-tr-play" data-s="1">▶ </button><button type="button" class="tm-tr-play tm-sec" data-s="2">▶ </button></div>';

    var $ = function (s) { return el.querySelector(s); };
    var sel = $('#' + uid + '_i');
    var actual = null;

    function dibujaPent(cont, n, etqAlt) {
      var m = midiDe(n);
      var clave = m < 55 ? 'fa' : 'sol';
      var fila = { pentagramas: [{ clave: clave, compases: [[{ notas: [tecla(n)], d: 'w' }]] }] };
      return window.tmNotacion.dibujar(cont, fila, { escala: 1.4, separacion: 0.15, noLineal: 0.2, id: uid + cont.id, alt: etqAlt });
    }

    function actualizar() {
      var ins = INSTR[st.instr], iv = ins.I;
      var entrada = { letra: st.letra, alt: st.alt, oct: st.oct };
      var salida = mover(entrada, iv, st.modo === 'escrito' ? 1 : -1);
      actual = { entrada: entrada, salida: salida };
      var escrita = st.modo === 'escrito' ? entrada : salida, suena = st.modo === 'escrito' ? salida : entrada;
      $('#' + uid + '_n').textContent = st.modo === 'escrito' ? T('Nota escrita en la parte', 'Note written in the part') : T('Nota que quieres que suene', 'Note you want to sound');
      var e1 = st.modo === 'escrito' ? T('Lo que lees (escrito)', 'What you read (written)') : T('Lo que quieres que suene', 'What you want to sound');
      var e2 = st.modo === 'escrito' ? T('Lo que suena de verdad', 'What really sounds') : T('Lo que debes escribir en la parte', 'What you must write in the part');
      $('#' + uid + '_e1').textContent = e1; $('#' + uid + '_e2').textContent = e2;
      el.querySelectorAll('[data-m]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-m') === st.modo)); });
      el.querySelectorAll('[data-l]').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-l') === st.letra)); });
      el.querySelectorAll('[data-a]').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-a') === st.alt)); });
      el.querySelectorAll('[data-o]').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-o') === st.oct)); });
      var nom = '<strong>' + esc(ins.nombre) + '</strong>';
      var txt = st.modo === 'escrito'
        ? nom + T(': la nota escrita <strong>' + nombreNota(escrita) + '</strong> suena <strong>' + nombreNota(suena) + '</strong>, ' + iv.txt + ' que lo escrito.',
            ': the written note <strong>' + nombreNota(escrita) + '</strong> sounds <strong>' + nombreNota(suena) + '</strong>, ' + iv.txt + ' than written.')
        : nom + T(': para que suene <strong>' + nombreNota(suena) + '</strong>, hay que escribir <strong>' + nombreNota(escrita) + '</strong>, ' + opuesto(iv.txt) + ' que lo que suena.',
            ': for <strong>' + nombreNota(suena) + '</strong> to sound, you must write <strong>' + nombreNota(escrita) + '</strong>, ' + opuesto(iv.txt) + ' than it sounds.');
      if (salida.enarm) txt += ' ' + T('(Se escribe con su equivalente enarmónico para no usar una triple alteración.)', '(Written with its enharmonic equivalent to avoid a triple accidental.)');
      $('#' + uid + '_r').innerHTML = txt;
      var b1 = el.querySelector('[data-s="1"]'), b2 = el.querySelector('[data-s="2"]');
      b1.textContent = '▶ ' + (st.modo === 'escrito' ? T('Oír lo escrito', 'Hear the written note') : T('Oír lo que quieres que suene', 'Hear the note you want'));
      b2.textContent = '▶ ' + (st.modo === 'escrito' ? T('Oír lo que suena', 'Hear what sounds') : T('Oír lo que se escribe', 'Hear the written note'));
      var altEntrada = e1 + ': ' + nombreNota(entrada), altSalida = e2 + ': ' + nombreNota(salida);
      dibujaPent($('#' + uid + '_p1'), entrada, altEntrada).then(function () { return dibujaPent($('#' + uid + '_p2'), salida, altSalida); }).catch(function () {
        $('#' + uid + '_p1').innerHTML = '<span class="tm-tr-cargando">' + T('No se ha podido dibujar el pentagrama.', 'The staff could not be drawn.') + '</span>';
      });
    }

    var redibujar = window.tmNotacion.diferido(actualizar);
    sel.addEventListener('change', function () { st.instr = sel.value; redibujar(); });
    el.addEventListener('click', function (ev) {
      var b = ev.target.closest('button'); if (!b || !el.contains(b)) return;
      if (b.hasAttribute('data-m')) { st.modo = b.getAttribute('data-m'); redibujar(); }
      else if (b.hasAttribute('data-l')) { st.letra = +b.getAttribute('data-l'); redibujar(); }
      else if (b.hasAttribute('data-a')) { st.alt = +b.getAttribute('data-a'); redibujar(); }
      else if (b.hasAttribute('data-o')) { st.oct = +b.getAttribute('data-o'); redibujar(); }
      else if (b.hasAttribute('data-s') && window.tmPiano && actual) {
        var n = b.getAttribute('data-s') === '1' ? actual.entrada : actual.salida;
        window.tmPiano.playMidi(midiDe(n));
      }
    });

    sel.value = st.instr;
    var arrancado = false;
    function arrancar() { if (arrancado) return; arrancado = true; actualizar(); }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); arrancar(); } }, { rootMargin: '300px' });
      io.observe(el);
    } else arrancar();
  }

  function iniciar() {
    if (!document.querySelector('style[data-tm-tr]')) { var s = document.createElement('style'); s.setAttribute('data-tm-tr', ''); s.textContent = CSS; document.head.appendChild(s); }
    Array.prototype.forEach.call(document.querySelectorAll('.tm-tr'), montar);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
  if (typeof module === 'object' && module.exports) module.exports = { mover: mover, INSTR: INSTR, I: I, nombreNota: nombreNota, midiDe: midiDe };
})();
