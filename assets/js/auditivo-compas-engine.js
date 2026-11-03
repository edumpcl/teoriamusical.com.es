/* Motor — Ejercicio auditivo «Adivina el compás»
   Suena una melodía de 8 compases al piano, con el 1.er tiempo de cada compás acentuado, y hay que
   decir en qué compás está: 2/4, 3/4, 4/4 (simples) o 6/8, 9/8, 12/8 (compuestos). Hasta 3 escuchas;
   se puede responder mientras suena. Tras responder se ve la melodía escrita.

   La melodía sale del generador de «¿Mayor o menor?» (auditivo-modo-engine.js: frases, armonía,
   conducción de voces y filtro tonal), con ritmos propios pensados para que el compás no deje dudas:
   - el 1.er tiempo de cada compás suena claramente más fuerte (y siempre hay nota en él);
   - sin síncopas ni ligaduras: cada figura empieza en un pulso o en su subdivisión;
   - 3/4 y 6/8 duran lo mismo (6 corcheas): cada compás de uno de ellos, escrito en el otro, tendría
     una síncopa o le faltaría un pulso. Por eso no salen figuras que valdrían para los dos, como las
     seis corcheas, negra-dos corcheas-negra, blanca-negra o negra y cuatro corcheas;
   - la subdivisión se oye: al menos 3 pulsos partidos en dos corcheas (simples) o en tres (compuestos),
     para que un 9/8 no suene a 3/4 lento ni un 6/8 a 2/4;
   - el tempo cambia un poco de una melodía a otra, para que no se adivine por la velocidad. */
(function () {
  'use strict';

  /* Ritmos (unidad = corchea; 0,5 = semicorchea, 1,5 = corchea con puntillo). Las semicorcheas van en
     los grupos propios de cada pulso: cuatro o dos+corchea en el de negra, dos en lugar de una corchea
     (o corchea con puntillo y semicorchea) en el de negra con puntillo. */
  var COMPASES = [
    { num: 2, den: 4, pulso: 2, tempo: [84, 108], tipo: 'simple', tiempos: 2,
      ritmos: [[2, 2], [1, 1, 2], [2, 1, 1], [1, 1, 1, 1], [3, 1],
        [0.5, 0.5, 1, 2], [2, 0.5, 0.5, 1], [1, 0.5, 0.5, 2], [0.5, 0.5, 0.5, 0.5, 2], [2, 0.5, 0.5, 0.5, 0.5], [1.5, 0.5, 2], [1.5, 0.5, 1, 1], [1, 1, 0.5, 0.5, 1], [0.5, 0.5, 1, 0.5, 0.5, 1]],
      semi: [[2, 2]], fin: [[4]] },
    { num: 3, den: 4, pulso: 2, tempo: [84, 108], tipo: 'simple', tiempos: 3,
      ritmos: [[2, 2, 2], [1, 1, 2, 2], [2, 2, 1, 1], [1, 1, 2, 1, 1],
        [0.5, 0.5, 1, 2, 2], [0.5, 0.5, 0.5, 0.5, 2, 2], [2, 2, 0.5, 0.5, 1], [2, 2, 0.5, 0.5, 0.5, 0.5], [1.5, 0.5, 2, 1, 1], [1, 0.5, 0.5, 2, 1, 1], [0.5, 0.5, 1, 2, 0.5, 0.5, 1], [1, 1, 1.5, 0.5, 2], [2, 1.5, 0.5, 2]],
      semi: [[2, 4]], fin: [[6]] },
    { num: 4, den: 4, pulso: 2, tempo: [84, 108], tipo: 'simple', tiempos: 4,
      ritmos: [[2, 2, 2, 2], [4, 2, 2], [1, 1, 2, 2, 2], [2, 1, 1, 2, 2], [2, 2, 1, 1, 2], [2, 2, 2, 1, 1], [1, 1, 1, 1, 2, 2],
        [0.5, 0.5, 1, 2, 2, 2], [2, 0.5, 0.5, 1, 2, 2], [2, 2, 0.5, 0.5, 0.5, 0.5, 2], [1.5, 0.5, 2, 2, 2], [2, 2, 1.5, 0.5, 2], [0.5, 0.5, 0.5, 0.5, 2, 1, 1, 2], [1, 0.5, 0.5, 1, 1, 2, 2], [2, 2, 2, 0.5, 0.5, 1]],
      semi: [[2, 2, 4]], fin: [[8]] },
    { num: 6, den: 8, pulso: 3, tempo: [58, 76], tipo: 'compuesto', tiempos: 2,
      ritmos: [[3, 3], [2, 1, 3], [1, 1, 1, 3], [3, 2, 1], [2, 1, 2, 1], [1, 1, 1, 2, 1],
        [0.5, 0.5, 1, 1, 3], [1.5, 0.5, 1, 3], [3, 1.5, 0.5, 1], [1, 0.5, 0.5, 1, 2, 1], [1.5, 0.5, 1, 1.5, 0.5, 1], [0.5, 0.5, 1, 1, 2, 1], [3, 1, 0.5, 0.5, 1], [1, 1, 0.5, 0.5, 3]],
      semi: [[3, 3]], fin: [[6]] },
    { num: 9, den: 8, pulso: 3, tempo: [58, 76], tipo: 'compuesto', tiempos: 3,
      ritmos: [[3, 3, 3], [2, 1, 3, 3], [3, 2, 1, 3], [1, 1, 1, 3, 3], [2, 1, 2, 1, 3], [3, 1, 1, 1, 2, 1],
        [0.5, 0.5, 1, 1, 3, 3], [1.5, 0.5, 1, 3, 3], [3, 1, 0.5, 0.5, 1, 3], [3, 3, 1.5, 0.5, 1], [2, 1, 1.5, 0.5, 1, 3], [1, 0.5, 0.5, 1, 3, 2, 1]],
      semi: [[3, 6]], fin: [[6, -3]] },
    { num: 12, den: 8, pulso: 3, tempo: [58, 76], tipo: 'compuesto', tiempos: 4,
      ritmos: [[3, 3, 3, 3], [2, 1, 3, 2, 1, 3], [1, 1, 1, 3, 3, 3], [3, 3, 2, 1, 3], [2, 1, 2, 1, 3, 3], [3, 1, 1, 1, 3, 2, 1],
        [1.5, 0.5, 1, 3, 3, 3], [0.5, 0.5, 1, 1, 3, 2, 1, 3], [3, 3, 1.5, 0.5, 1, 3], [3, 1.5, 0.5, 1, 3, 3]],
      semi: [[3, 3, 6]], fin: [[12]] }
  ];
  var ACENTO = 1, NORMAL = 0.42, MAX_ESCUCHAS = 3, TOTAL = 10;
  var nombre = function (c) { return c.num + '/' + c.den; };
  var rnd = function (n) { return Math.floor(Math.random() * n); };
  function barajar(a) {   // Fisher-Yates
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = rnd(i + 1), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  /* Pulsos con la subdivisión a la vista: en los simples, un pulso de dos corcheas; en los compuestos,
     uno con corcheas dentro (corchea-corchea-corchea o negra-corchea). */
  function subdivisiones(mel) {
    var p = mel.compas.pulso, n = 0, porCompas = {};
    mel.notas.forEach(function (x) { if (!x.silencio) (porCompas[x.c] = porCompas[x.c] || []).push(x); });
    Object.keys(porCompas).forEach(function (c) {
      var pulsos = {};
      porCompas[c].forEach(function (x) { var b = Math.floor(x.ini / p); (pulsos[b] = pulsos[b] || []).push(x.ini % p); });
      Object.keys(pulsos).forEach(function (b) { if (pulsos[b].length >= 2) n++; });
    });
    return n;
  }
  /* 3/4 y 6/8 duran lo mismo: cada compás, leído en el otro, tiene que tener una síncopa (una nota que
     atraviesa el comienzo de un pulso sin articularlo); si no, valdría para los dos. Con los ritmos de
     arriba no salta nunca (los ambiguos ya se quitaron): es una red de seguridad por si se añaden más. */
  function pulsoClaro(mel) {
    var c = mel.compas;
    if (c.num !== 3 && c.num !== 6) return true;
    var otro = c.pulso === 2 ? 3 : 2;   // pulso del compás gemelo, en corcheas
    for (var k = 0; k < 7; k++) {   // el compás 8 es la nota final, larga
      var sinc = mel.notas.some(function (x) {
        if (x.c !== k || x.silencio) return false;
        for (var b = otro; b < 6; b += otro) if (x.ini < b && b < x.ini + x.dur) return true;
        return false;
      });
      if (!sinc) return false;
    }
    return true;
  }
  /* modo y tono son opcionales: el ejercicio de compás y tonalidad (auditivo-tonalidad-engine.js, opción
     compas) los fija; si no, al azar. */
  function generar(compas, modoFijo, tonoFijo) {
    var M = window.tmAudModo;
    for (var k = 0; k < 600; k++) {
      var c = Object.assign({}, compas, { bpm: compas.tempo[0] + rnd(compas.tempo[1] - compas.tempo[0] + 1) });
      var modo = modoFijo || (Math.random() < 0.5 ? 'mayor' : 'menor'), tonos = M.TONOS[modo];
      var mel = M.intentar(modo, tonoFijo || tonos[rnd(tonos.length)], c);
      if (!mel || subdivisiones(mel) < 3 || !pulsoClaro(mel)) continue;
      // el compás 1 también enseña la subdivisión
      var c1 = mel.notas.filter(function (x) { return x.c === 0; });
      if (!c1.some(function (x) { return x.dur <= 1; })) continue;
      // semicorcheas en al menos dos compases
      var con16 = {}; mel.notas.forEach(function (x) { if (x.dur === 0.5) con16[x.c] = 1; });
      if (Object.keys(con16).length < 2) continue;
      // acento en el 1.er tiempo de cada compás
      mel.notas.forEach(function (x) { if (x.ev) x.ev.vel = x.ini === 0 ? ACENTO : NORMAL; });
      return mel;
    }
    throw new Error('no se ha podido generar la melodía');
  }

  /* Por qué es el compás que es (y, si se ha fallado, en qué se diferencia del elegido) */
  function explicar(c, elegido) {
    var unidad = c.tipo === 'simple' ? 'negra' : 'negra con puntillo';
    var sub = c.tipo === 'simple' ? 'dos corcheas' : 'tres corcheas';
    var txt = 'Es un compás ' + c.tipo + ' de ' + c.tiempos + ' tiempos: el acento vuelve cada ' + c.tiempos + ' pulsos (de ' + unidad + '), y cada pulso se divide en ' + sub + '.';
    if (!elegido || elegido === c) return txt;
    if (elegido.tiempos === c.tiempos) txt += ' El ' + nombre(elegido) + ' también tiene ' + c.tiempos + ' tiempos, pero es ' + elegido.tipo + ': sus pulsos se dividen en ' + (elegido.tipo === 'simple' ? 'dos' : 'tres') + ', no en ' + (c.tipo === 'simple' ? 'dos' : 'tres') + '.';
    else if (elegido.tipo === c.tipo) txt += ' El ' + nombre(elegido) + ' también es ' + c.tipo + ', pero tiene ' + elegido.tiempos + ' tiempos: cuenta los pulsos que hay de un acento al siguiente.';
    else if (elegido.num * (elegido.den === 4 ? 2 : 1) === c.num * (c.den === 4 ? 2 : 1)) txt += ' El ' + nombre(elegido) + ' dura lo mismo (' + (c.num * (c.den === 4 ? 2 : 1)) + ' corcheas), pero las agrupa de otra forma: ' + (elegido.tipo === 'simple' ? 'de dos en dos' : 'de tres en tres') + ' en lugar de ' + (c.tipo === 'simple' ? 'de dos en dos' : 'de tres en tres') + '.';
    return txt;
  }

  var CSS_EXTRA = [
    '.tm-aud-wrap .tm-audc-grupo{display:grid;grid-template-columns:auto repeat(3,minmax(0,1fr));gap:10px;align-items:center;margin-bottom:10px}',
    '.tm-aud-wrap .tm-audc-lbl{font-size:.85rem;font-weight:700;color:#555;min-width:88px}',
    '.tm-aud-wrap .tm-audc-grupo .tm-aud-opt{padding:14px 6px;font-size:1.25rem}',
    '@media(max-width:480px){.tm-aud-wrap .tm-audc-grupo{grid-template-columns:repeat(3,minmax(0,1fr))}.tm-aud-wrap .tm-audc-lbl{grid-column:1/-1;min-width:0}}',
    '.tm-aud-wrap .tm-audc-niveles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:18px 0 6px}',
    '.tm-aud-wrap .tm-audc-niv{display:flex;flex-direction:column;gap:4px;padding:14px 8px;text-align:center}',
    '.tm-aud-wrap .tm-audc-niv b{font-size:1.05rem}.tm-aud-wrap .tm-audc-niv span{font-size:.85rem;font-weight:400}',
    '.tm-aud-wrap .tm-audc-nivres{display:block;margin-top:8px;font-size:1rem;font-weight:600;opacity:.9}',
    '@media(max-width:480px){.tm-aud-wrap .tm-audc-niveles{grid-template-columns:1fr}}'
  ].join('');

  /* Niveles: 1 = simples, 2 = compuestos, 3 = los seis mezclados */
  var NIVELES = [
    { nombre: 'Simples', desc: '2/4, 3/4 y 4/4', tipos: ['simple'] },
    { nombre: 'Compuestos', desc: '6/8, 9/8 y 12/8', tipos: ['compuesto'] },
    { nombre: 'Simples y compuestos', desc: 'Los seis compases', tipos: ['simple', 'compuesto'] }
  ];

  function tmAudCompasEngine(containerId) {
    var M = window.tmAudModo;
    M.injectCSS();
    if (!document.getElementById('tm-audc-css')) { var st = document.createElement('style'); st.id = 'tm-audc-css'; st.textContent = CSS_EXTRA; document.head.appendChild(st); }
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.className = 'tm-aud-wrap';
    var uid = containerId;
    var n, aciertos, mel, escuchas, respondido, sonando = 0, gen = 0, orden = [], nivel = NIVELES[2];
    var $ = function (s) { return document.getElementById(uid + s); };

    function inicio() {
      wrap.innerHTML = '<div class="tm-card"><div class="tm-aud-ini">' +
        '<h2 class="tm-aud-tit">Adivina el compás — ' + TOTAL + ' melodías</h2>' +
        '<p class="tm-aud-sub">Escucharás una melodía de 8 compases al piano, con el <strong>1.er tiempo de cada compás acentuado</strong>, y tendrás que decidir en qué compás está. Puedes escuchar cada melodía hasta ' + MAX_ESCUCHAS + ' veces y responder mientras suena. Elige el nivel para empezar:</p>' +
        '<div class="tm-audc-niveles" role="group" aria-label="Nivel">' + NIVELES.map(function (v, i) {
          return '<button class="tm-aud-opt tm-audc-niv" type="button" data-n="' + i + '"><span>Nivel ' + (i + 1) + '</span><b>' + v.nombre + '</b><span>' + v.desc + '</span></button>';
        }).join('') + '</div></div></div>';
      Array.prototype.forEach.call(wrap.querySelectorAll('.tm-audc-niv'), function (b) {
        b.addEventListener('click', function () { empezar(NIVELES[+b.dataset.n]); });
      });
    }
    function empezar(v) {
      nivel = v; n = 0; aciertos = 0;
      var lista = COMPASES.filter(function (c) { return v.tipos.indexOf(c.tipo) >= 0; });
      if (window.tmNotacion) window.tmNotacion.listo().catch(function () {});   // la partitura (Verovio) se va cargando mientras se escucha
      // los compases del nivel salen las mismas veces (o una de diferencia); los que sobran, al azar y sin repetir
      orden = [];
      while (orden.length + lista.length <= TOTAL) orden = orden.concat(lista);
      orden = barajar(orden.concat(barajar(lista).slice(0, TOTAL - orden.length)));
      montar(); siguiente();
    }
    function botones(tipo, lbl) {
      return '<div class="tm-audc-grupo"><span class="tm-audc-lbl">' + lbl + '</span>' +
        COMPASES.filter(function (c) { return c.tipo === tipo; }).map(function (c) {
          return '<button class="tm-aud-opt" type="button" data-c="' + COMPASES.indexOf(c) + '" aria-label="' + c.num + ' por ' + c.den + '">' + nombre(c) + '</button>';
        }).join('') + '</div>';
    }
    function montar() {
      wrap.innerHTML = '<div class="tm-card">' +
        '<div class="tm-aud-head"><div class="tm-aud-prog"><div class="tm-aud-bar"><div class="tm-aud-fill" id="' + uid + '_fill"></div></div>' +
        '<span class="tm-aud-cnt" id="' + uid + '_cnt"></span></div><span class="tm-aud-badge" id="' + uid + '_badge">✓ 0</span></div>' +
        '<div class="tm-aud-play"><button class="tm-aud-btnplay" id="' + uid + '_play" type="button"></button>' +
        '<p class="tm-aud-estado" id="' + uid + '_estado" aria-live="polite"></p></div>' +
        '<div id="' + uid + '_opts" role="group" aria-label="Compás">' +
        (nivel.tipos.indexOf('simple') >= 0 ? botones('simple', 'Simples') : '') + (nivel.tipos.indexOf('compuesto') >= 0 ? botones('compuesto', 'Compuestos') : '') + '</div>' +
        '<div class="tm-aud-fb" id="' + uid + '_fb"></div>' +
        '<div class="tm-aud-part" id="' + uid + '_part"></div>' +
        '<div class="tm-aud-acc" id="' + uid + '_acc"><button class="tm-aud-sec" id="' + uid + '_otra" type="button">▶ Escuchar otra vez</button>' +
        '<button class="tm-aud-nxt" id="' + uid + '_nxt" type="button">Siguiente →</button></div></div>';
      $('_play').addEventListener('click', function () { if (!respondido && escuchas < MAX_ESCUCHAS) { escuchas++; tocar(); } });
      $('_otra').addEventListener('click', tocar);
      $('_nxt').addEventListener('click', siguiente);
      opciones().forEach(function (b) { b.addEventListener('click', function () { responder(COMPASES[+b.dataset.c]); }); });
    }
    var opciones = function () { return Array.prototype.slice.call($('_opts').querySelectorAll('.tm-aud-opt')); };
    function siguiente() {
      parar();
      if (n >= TOTAL) { resultado(); return; }
      n++; escuchas = 0; respondido = false;
      mel = generar(orden[n - 1]);
      $('_fill').style.width = ((n - 1) / TOTAL * 100) + '%';
      $('_cnt').textContent = nivel.nombre + ' · Melodía ' + n + ' de ' + TOTAL;
      $('_fb').className = 'tm-aud-fb'; $('_part').className = 'tm-aud-part'; $('_acc').className = 'tm-aud-acc';
      opciones().forEach(function (b) { b.className = 'tm-aud-opt'; b.disabled = true; });
      $('_estado').textContent = 'Pulsa para escuchar la melodía.';
      actualizarPlay();
    }
    function actualizarPlay() {
      var b = $('_play'), quedan = MAX_ESCUCHAS - escuchas;
      if (respondido) { b.style.display = 'none'; return; }
      b.style.display = '';
      b.disabled = !!sonando || quedan <= 0;
      b.textContent = sonando ? 'Sonando…' : escuchas === 0 ? '▶ Escuchar' : quedan > 0 ? '▶ Escuchar otra vez (' + quedan + (quedan === 1 ? ' vez más)' : ' veces más)') : 'Sin más escuchas';
    }
    function parar() { gen++; sonando = 0; if (window.tmPiano && window.tmPiano.stopAll) window.tmPiano.stopAll(); }
    function tocar() {
      parar();
      var g = gen;
      sonando = 1; actualizarPlay();
      if (!respondido) opciones().forEach(function (b) { b.disabled = false; });   // se puede responder mientras suena
      $('_estado').textContent = respondido ? '' : 'Suena la melodía… cuenta los pulsos de un acento al siguiente.';
      window.tmPiano.playEvents(mel.ev).then(function (d) {
        if (g !== gen) return;
        if (!d) {
          sonando = 0; escuchas--; actualizarPlay();
          $('_estado').textContent = 'No se ha podido reproducir el sonido. Comprueba la conexión y vuelve a pulsar.';
          return;
        }
        setTimeout(function () {
          if (g !== gen) return;
          sonando = 0;
          if (!respondido) $('_estado').textContent = escuchas < MAX_ESCUCHAS ? '¿En qué compás está?' : 'Ya no quedan escuchas: ¿en qué compás está?';
          actualizarPlay();
        }, (mel.dur + 0.4) * 1000);
      });
    }
    function responder(c) {
      if (respondido || escuchas === 0) return;
      respondido = true; parar();
      var ok = c === mel.compas || (c.num === mel.compas.num && c.den === mel.compas.den);
      if (ok) aciertos++;
      $('_badge').textContent = '✓ ' + aciertos;
      opciones().forEach(function (b) {
        var cb = COMPASES[+b.dataset.c];
        b.disabled = true;
        if (cb.num === mel.compas.num) b.className = 'tm-aud-opt tm-ok';
        else if (cb === c) b.className = 'tm-aud-opt tm-ko';
      });
      var fb = $('_fb');
      fb.className = 'tm-aud-fb tm-show ' + (ok ? 'tm-ok' : 'tm-ko');
      fb.innerHTML = (ok ? '<strong>✓ ¡Correcto!</strong> ' : '<strong>✗ No.</strong> ') + 'Estaba en <strong>' + nombre(mel.compas) + '</strong>.' +
        '<br><span style="font-weight:400">' + explicar(mel.compas, ok ? null : COMPASES.filter(function (x) { return x.num === c.num; })[0]) + '</span>';
      $('_estado').textContent = '';
      actualizarPlay();
      var part = $('_part');
      part.className = 'tm-aud-part tm-show';
      var ancho = Math.max(240, part.clientWidth - 16), porFila = ancho < 520 ? 2 : 4, fs = M.filas(mel, porFila);
      part.innerHTML = fs.map(function (f, k) { return '<div id="' + uid + '_s' + k + '"></div>'; }).join('');
      window.tmNotacion.listo().then(function () {
        fs.forEach(function (f, k) {
          window.tmNotacion.dibujarAAncho($('_s' + k), f, ancho, { escala: 0.9, id: uid + 's' + k, alt: 'La melodía escrita, compases ' + (k * porFila + 1) + ' a ' + (k * porFila + porFila) });
        });
      }).catch(function () {});
      $('_acc').className = 'tm-aud-acc tm-show';
      if (n >= TOTAL) $('_nxt').textContent = 'Ver resultado →';
    }
    function resultado() {
      parar();
      var sig = NIVELES[NIVELES.indexOf(nivel) + 1];
      wrap.innerHTML = '<div class="tm-card"><div class="tm-aud-score"><b>' + aciertos + '/' + TOTAL + '</b><span>' + Math.round(aciertos / TOTAL * 100) + '%</span>' +
        '<span class="tm-audc-nivres">' + nivel.nombre + ' · ' + nivel.desc + '</span></div>' +
        '<div class="tm-aud-acc tm-show"><button class="tm-aud-sec" id="' + uid + '_ini" type="button">Elegir nivel</button>' +
        '<button class="tm-aud-sec" id="' + uid + '_re" type="button">Repetir</button>' +
        (sig ? '<button class="tm-aud-nxt" id="' + uid + '_sig" type="button">' + sig.nombre + ' →</button>' : '') + '</div></div>';
      $('_ini').addEventListener('click', inicio);
      $('_re').addEventListener('click', function () { empezar(nivel); });
      if (sig) $('_sig').addEventListener('click', function () { empezar(sig); });
    }
    inicio();
  }

  window.tmAudCompasEngine = tmAudCompasEngine;
  window.tmAudCompas = { generar: generar, COMPASES: COMPASES, explicar: explicar, subdivisiones: subdivisiones, pulsoClaro: pulsoClaro };
})();
