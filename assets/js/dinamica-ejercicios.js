/* Ejercicios de dinámica — /ejercicios/dinamica/

   Dos ejercicios (decisión de Eduardo, 16-09-2026), con el mismo modelo que tempo:
     tmDinamicaSignificados('x')  qué significa cada matiz y cada término de cambio
     tmDinamicaOrdenar('x')       ordenar matices de más suave a más fuerte y al revés

   Escala de ppp a fff. Los signos, términos y significados son los MISMOS que la
   tabla de /diccionario-musical/dinamica-musical/; el verificador
   (tools/verificar-dinamica-ejercicios.js) lo comprueba.

   A diferencia de los tempos, los matices no tienen rangos que se toquen: la escala
   es un orden estricto, así que en «ordenar» pueden salir vecinos (mp y mf). Es
   justo la frontera entre lo suave y lo fuerte, la que más conviene practicar.
   Sin ejercicio de oído: un matiz suelto no se reconoce por el sonido, depende del
   volumen del aparato. */
(function () {
  'use strict';

  var EN = typeof document !== 'undefined' && document.documentElement.lang === 'en';
  var T = function (es, en) { return EN ? en : es; };

  /* De más suave a más fuerte. */
  var GRADOS = [
    { s: 'ppp', t: 'pianississimo', sig: T('Lo más suave posible', 'As soft as possible') },
    { s: 'pp', t: 'pianissimo', sig: T('Muy suave', 'Very soft') },
    { s: 'p', t: 'piano', sig: T('Suave', 'Soft') },
    { s: 'mp', t: 'mezzopiano', sig: T('Medio suave', 'Medium soft') },
    { s: 'mf', t: 'mezzoforte', sig: T('Medio fuerte', 'Medium loud') },
    { s: 'f', t: 'forte', sig: T('Fuerte', 'Loud') },
    { s: 'ff', t: 'fortissimo', sig: T('Muy fuerte', 'Very loud') },
    { s: 'fff', t: 'fortississimo', sig: T('Lo más fuerte posible', 'As loud as possible') }
  ];

  var CAMBIOS = [
    { t: 'Crescendo', abr: 'cresc.', sig: T('Ir aumentando el volumen poco a poco', 'Gradually get louder') },
    { t: 'Diminuendo', abr: 'dim.', sig: T('Ir disminuyendo el volumen poco a poco', 'Gradually get softer') },
    { t: 'Sforzando', abr: 'sfz', sig: T('Acento súbito y enérgico sobre una nota o acorde', 'A sudden, forceful accent on a note or chord') },
    { t: 'Fortepiano', abr: 'fp', sig: T('Atacar fuerte y pasar inmediatamente a suave', 'Attack loudly and drop immediately to soft') },
    { t: 'Rinforzando', abr: 'rinf.', sig: T('Reforzar momentáneamente un grupo de notas', 'Briefly reinforce a group of notes') },
    { t: 'Subito', abr: 'sub.', sig: T('De golpe, sin transición (por ejemplo, subito piano)', 'Suddenly, with no transition (for example, subito piano)') },
    { t: 'Morendo', abr: null, sig: T('Muriendo: bajar la intensidad, y también el tempo, hasta apagarse', 'Dying away: decrease the intensity, and the tempo too, until it fades out') },
    { t: 'Perdendosi', abr: null, sig: T('Perdiéndose: el sonido se va apagando y frenando', 'Losing itself: the sound fades away and slows down') },
    { t: 'Calando', abr: null, sig: T('Decreciendo en intensidad y en tempo a la vez', 'Decreasing in volume and in tempo at the same time') }
  ];

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function azar(rnd) {
    return {
      entero: function (n) { return Math.floor(rnd() * n); },
      barajar: function (a) {
        var c = a.slice();
        for (var i = c.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = c[i]; c[i] = c[j]; c[j] = t; }
        return c;
      }
    };
  }

  /* Un signo de dinámica se escribe en cursiva y negrita, como en la partitura. */
  function signo(s) { return '<span class="tm-di-signo">' + s + '</span>'; }

  /* ---- Ejercicio 1: significados ---- */
  function generarSignificados(o, rnd) {
    var A = azar(rnd);
    var fuente = o.nivel === 'grados' ? GRADOS : o.nivel === 'cambios' ? CAMBIOS : GRADOS.concat(CAMBIOS);
    var pool = A.barajar(fuente), out = [];
    for (var i = 0; out.length < o.n; i++) {
      var x = pool[i % pool.length];
      var esGrado = x.s !== undefined;
      if (esGrado) {
        var otros = A.barajar(GRADOS.filter(function (g) { return g.s !== x.s; })).slice(0, 3);
        // Tres formas de preguntar por un matiz: qué significa, cómo se llama y qué signo es.
        var forma = A.entero(3);
        if (forma === 0) {
          out.push({ tipo: 'grado-significado', clave: x.s, enunciado: T('¿Qué significa ' + signo(x.s) + '?', 'What does ' + signo(x.s) + ' mean?'),
            correcta: x.sig, opciones: A.barajar([x.sig].concat(otros.map(function (g) { return g.sig; }))) });
        } else if (forma === 1) {
          out.push({ tipo: 'grado-nombre', clave: x.s, enunciado: T('¿Cómo se llama el matiz ' + signo(x.s) + '?', 'What is the dynamic marking ' + signo(x.s) + ' called?'),
            correcta: x.t, opciones: A.barajar([x.t].concat(otros.map(function (g) { return g.t; }))) });
        } else {
          out.push({ tipo: 'grado-signo', clave: x.s, enunciado: T('¿Qué signo indica «' + x.sig.toLowerCase() + '»?', 'Which marking means "' + x.sig.toLowerCase() + '"?'),
            correcta: x.s, opciones: A.barajar([x.s].concat(otros.map(function (g) { return g.s; }))), signos: true });
        }
      } else {
        var otras = A.barajar(CAMBIOS.filter(function (c) { return c.t !== x.t; })).slice(0, 3);
        // Si tiene abreviatura, la mitad de las veces se pregunta por ella.
        var porAbr = x.abr && rnd() < 0.5;
        out.push({ tipo: 'cambio', clave: x.t,
          enunciado: T('¿Qué indica ' + (porAbr ? signo(x.abr) : '<strong>' + x.t.toLowerCase() + '</strong>') + '?', 'What does ' + (porAbr ? signo(x.abr) : '<strong>' + x.t.toLowerCase() + '</strong>') + ' indicate?'),
          correcta: x.sig, opciones: A.barajar([x.sig].concat(otras.map(function (c) { return c.sig; }))) });
      }
    }
    return out;
  }

  /* ---- Ejercicio 2: ordenar ---- */
  function generarOrdenar(o, rnd) {
    var A = azar(rnd), out = [];
    for (var k = 0; k < o.n; k++) {
      var cuantos = o.cuantos || 4;
      var elegidos = A.barajar(GRADOS.map(function (_, i) { return i; })).slice(0, cuantos)
        .sort(function (a, b) { return a - b; })
        .map(function (i) { return GRADOS[i]; });
      var sube = o.sentido === 'suave-fuerte' ? true : o.sentido === 'fuerte-suave' ? false : rnd() < 0.5;
      var sol = sube ? elegidos : elegidos.slice().reverse();
      var nombres = !!o.nombres;
      out.push({
        tipo: 'ordenar', sentido: sube ? 'suave-fuerte' : 'fuerte-suave', nombres: nombres,
        enunciado: sube ? T('Ordena de <strong>más suave a más fuerte</strong>', 'Order from <strong>softest to loudest</strong>') : T('Ordena de <strong>más fuerte a más suave</strong>', 'Order from <strong>loudest to softest</strong>'),
        fichas: A.barajar(elegidos).map(function (g) { return nombres ? g.t : g.s; }),
        solucion: sol.map(function (g) { return nombres ? g.t : g.s; }),
        signos: sol.map(function (g) { return g.s; })
      });
    }
    return out;
  }

  function generar(tipo, o, semilla) {
    var rnd = mulberry32(semilla || Math.floor(Math.random() * 1e9));
    return tipo === 'ordenar' ? generarOrdenar(o, rnd) : generarSignificados(o, rnd);
  }

  function porSigno(s) { for (var i = 0; i < GRADOS.length; i++) if (GRADOS[i].s === s) return GRADOS[i]; return null; }
  function porTermino(t) { for (var i = 0; i < CAMBIOS.length; i++) if (CAMBIOS[i].t === t) return CAMBIOS[i]; return null; }

  function explicar(it) {
    if (it.tipo === 'ordenar') {
      return it.solucion.map(function (x, i) { return it.nombres ? x + ' (' + it.signos[i] + ')' : x; }).join(' → ') + '.';
    }
    if (it.tipo === 'cambio') {
      var c = porTermino(it.clave);
      return c.t + (c.abr ? ' (' + c.abr + ')' : '') + ': ' + c.sig.charAt(0).toLowerCase() + c.sig.slice(1) + '.';
    }
    var g = porSigno(it.clave);
    return T(g.s + ' es ' + g.t + ': ' + g.sig.toLowerCase() + '.', g.s + ' is ' + g.t + ': ' + g.sig.toLowerCase() + '.');
  }

  /* ------------------------------------------------------------------- UI */

  var CSS = [
    '.tm-di{font-family:"Inter",system-ui,-apple-system,sans-serif;color:#333;}',
    '.tm-di-signo{font-family:Georgia,"Times New Roman",serif;font-style:italic;font-weight:700;letter-spacing:.02em;}',
    '.tm-di-card{background:#fff;border:1px solid #e8e0cc;border-radius:12px;padding:22px;margin:8px 0;box-shadow:0 2px 8px rgba(0,0,0,.05);}',
    '.tm-di-tit{font-size:1.2rem;font-weight:700;color:#1a1208;margin-bottom:6px;}',
    '.tm-di-sub{color:#514232;font-size:.9rem;margin-bottom:16px;line-height:1.5;}',
    '.tm-di-modos{display:flex;flex-direction:column;gap:10px;}',
    '.tm-di-modo{background:#faf7f2;border:2px solid #d8d0b8;border-radius:10px;padding:14px 18px;cursor:pointer;text-align:left;font-family:inherit;}',
    '.tm-di-modo:hover{border-color:#8b6914;background:#fff8ee;}',
    '.tm-di-modo strong{display:block;font-size:1rem;color:#1a1208;margin-bottom:3px;}',
    '.tm-di-modo span{font-size:.82rem;color:#8b6914;}',
    '.tm-di-prog{font-size:.8rem;color:#8b6914;font-weight:600;margin-bottom:5px;}',
    '.tm-di-barra{background:#e4e9f2;border-radius:3px;height:6px;margin-bottom:16px;}',
    '.tm-di-barra div{background:#8b6914;height:100%;border-radius:3px;transition:width .4s ease;}',
    '.tm-di-preg{font-size:1.1rem;font-weight:700;color:#1a1208;text-align:center;margin:6px 0 14px;line-height:1.4;}',
    '.tm-di-preg .tm-di-signo{font-size:1.5em;}',
    '.tm-di-ops{display:flex;flex-direction:column;gap:10px;}',
    '.tm-di-ops.tm-di-cortas{flex-direction:row;flex-wrap:wrap;}',
    '.tm-di-ops.tm-di-cortas .tm-di-op{flex:1 1 calc(50% - 10px);text-align:center;font-size:1.25rem;}',
    '.tm-di-op{border:2px solid #d8d0b8;background:#fff;border-radius:8px;padding:12px 16px;cursor:pointer;font-weight:600;font-size:.95rem;color:#514232;font-family:inherit;text-align:left;min-height:44px;}',
    '.tm-di-op:hover:not([disabled]){border-color:#8b6914;}',
    '.tm-di-op.tm-sel{border-color:#8b6914;background:#8b6914;color:#fff;}',
    '.tm-di-op.tm-ok{border-color:#1c7e46!important;background:#1c7e46!important;color:#fff!important;}',
    '.tm-di-op.tm-ko{border-color:#c0392b!important;background:#c0392b!important;color:#fff!important;}',
    '.tm-di-op.tm-buena{border-color:#1c7e46!important;background:#e8f5e9!important;color:#2e7d32!important;}',
    '.tm-di-op[disabled]{cursor:default;}',
    '.tm-di-huecos{display:flex;flex-wrap:wrap;gap:8px;min-height:52px;padding:10px;background:#faf7f2;border:1px dashed #d8d0b8;border-radius:8px;margin-bottom:12px;}',
    '.tm-di-hueco{display:inline-flex;align-items:center;gap:6px;background:#fff;border:2px solid #8b6914;border-radius:8px;padding:6px 12px;font-weight:700;font-size:1rem;}',
    '.tm-di-hueco small{color:#8b6914;font-size:.75rem;font-style:normal;}',
    '.tm-di-vacio{color:#6f6f6f;font-size:.88rem;align-self:center;}',
    '.tm-di-fichas{display:flex;flex-wrap:wrap;gap:8px;}',
    '.tm-di-ficha{border:2px solid #d8d0b8;background:#fff;border-radius:8px;padding:8px 16px;font-size:1.1rem;cursor:pointer;font-family:inherit;min-height:44px;color:#514232;}',
    '.tm-di-ficha:hover:not([disabled]){border-color:#8b6914;}',
    '.tm-di-ficha[disabled]{opacity:.35;cursor:default;}',
    '.tm-di-deshacer{background:#fff;border:1px solid #d8d0b8;border-radius:8px;padding:9px 14px;font:inherit;font-size:.85rem;font-weight:600;cursor:pointer;margin-top:6px;}',
    '.tm-di-deshacer[hidden],.tm-di-fb[hidden]{display:none;}',
    '.tm-di-fb{margin-top:14px;padding:12px 14px;border-radius:8px;font-size:.92rem;line-height:1.5;}',
    '.tm-di-fb.tm-ok{background:#e8f5e9;color:#1f5d24;}',
    '.tm-di-fb.tm-ko{background:#ffebee;color:#8e1f1f;}',
    '.tm-di-btn{width:100%;padding:14px;margin-top:14px;border:none;border-radius:8px;font-size:1rem;font-weight:700;font-family:inherit;background:#d8d0b8;color:#686868;cursor:not-allowed;}',
    '.tm-di-btn.tm-listo{background:#8b6914;color:#fff;cursor:pointer;}',
    '.tm-di-res{text-align:center;padding:10px 0;}',
    '.tm-di-nota{font-size:3.5rem;font-weight:900;color:#8b6914;line-height:1;}',
    '.tm-di-de{font-size:.9rem;color:#514232;margin:4px 0 16px;}',
    '.tm-di-msg{font-size:1rem;color:#1a1208;font-weight:600;margin-bottom:20px;line-height:1.5;}',
    '.tm-di-otra{background:#8b6914;color:#fff;border:none;border-radius:8px;padding:12px 24px;font-size:1rem;font-weight:700;cursor:pointer;font-family:inherit;margin:4px;}',
    '.tm-di-otra.tm-2{background:#fff;color:#1a1208;border:1px solid #d8d0b8;}'
  ].join('');

  function css() {
    if (document.getElementById('tm-di-css')) return;
    var st = document.createElement('style');
    st.id = 'tm-di-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  function armazon(cont, cfg, empezar) {
    cont.className = 'tm-di';
    cont.innerHTML = '<div class="tm-di-card"><div class="tm-di-tit">' + cfg.tit + '</div><div class="tm-di-sub">' + cfg.sub + '</div>'
      + '<div class="tm-di-modos">' + cfg.modos.map(function (m, i) {
        return '<button type="button" class="tm-di-modo" data-i="' + i + '"><strong>' + m.t + '</strong><span>' + m.d + '</span></button>';
      }).join('') + '</div></div>';
    Array.prototype.forEach.call(cont.querySelectorAll('.tm-di-modo'), function (b) {
      b.addEventListener('click', function () { empezar(cfg.modos[Number(b.getAttribute('data-i'))].v); });
    });
  }

  function resultado(cont, aciertos, total, otra, inicio) {
    var nota = aciertos / total;
    var msg = nota === 1 ? T('¡Perfecto! Lo dominas.', 'Perfect! You have it down.') : nota >= 0.8 ? T('Muy bien: casi todo correcto.', 'Very good: almost everything correct.')
      : nota >= 0.5 ? T('Vas bien. Repasa las explicaciones y vuelve a intentarlo.', 'You are doing well. Review the explanations and try again.') : T('Conviene repasar la teoría antes de volver a intentarlo.', 'It is worth reviewing the theory before trying again.');
    cont.innerHTML = '<div class="tm-di-card tm-di-res"><div class="tm-di-nota">' + aciertos + '</div><div class="tm-di-de">' + T('aciertos de ' + total, 'correct out of ' + total) + '</div>'
      + '<div class="tm-di-msg">' + msg + '</div>'
      + '<button type="button" class="tm-di-otra" data-a="otra">' + T('Otra ronda', 'Another round') + '</button>'
      + '<button type="button" class="tm-di-otra tm-2" data-a="modo">' + T('Cambiar de nivel', 'Change level') + '</button></div>';
    cont.querySelector('[data-a="otra"]').addEventListener('click', otra);
    cont.querySelector('[data-a="modo"]').addEventListener('click', inicio);
  }

  function cabecera(pos, total, enunciado) {
    return '<div class="tm-di-prog">' + T('Pregunta ' + (pos + 1) + ' de ' + total, 'Question ' + (pos + 1) + ' of ' + total) + '</div>'
      + '<div class="tm-di-barra"><div style="width:' + (pos / total * 100) + '%"></div></div>'
      + '<div class="tm-di-preg">' + enunciado + '</div>';
  }

  /* ---- widget 1 ---- */
  window.tmDinamicaSignificados = function (id) {
    var cont = document.getElementById(id);
    if (!cont) return;
    css();
    var cfg = {
      tit: T('¿Qué significa este matiz?', 'What does this dynamic marking mean?'),
      sub: T('Aparece un signo o un término de dinámica y hay que elegir qué indica, cómo se llama o qué signo le corresponde.', 'A dynamics sign or term appears and you choose what it indicates, what it is called or which sign matches it.'),
      modos: [
        { v: { nivel: 'grados' }, t: T('Los matices, de ppp a fff', 'The dynamic markings, from ppp to fff'), d: T('Qué significa cada signo, cómo se llama y qué signo es', 'What each sign means, what it is called and which sign it is') },
        { v: { nivel: 'cambios' }, t: T('Cambios de intensidad', 'Changes in intensity'), d: 'Crescendo, diminuendo, sforzando, fortepiano, subito…' },
        { v: { nivel: 'mezcla' }, t: T('Todo mezclado', 'Everything mixed'), d: T('Matices y cambios en la misma ronda', 'Markings and changes in the same round') }
      ]
    };
    var cola = [], pos = 0, aciertos = 0, nivel = null;
    function inicio() { armazon(cont, cfg, empezar); }
    function empezar(v) { nivel = v; cola = generar('significados', { nivel: v.nivel, n: 10 }); pos = 0; aciertos = 0; pregunta(); }
    function pregunta() {
      var it = cola[pos];
      cont.innerHTML = '<div class="tm-di-card">' + cabecera(pos, cola.length, it.enunciado)
        + '<div class="tm-di-ops' + (it.signos ? ' tm-di-cortas' : '') + '">' + it.opciones.map(function (o, i) {
          return '<button type="button" class="tm-di-op" data-i="' + i + '">' + (it.signos ? signo(o) : o) + '</button>';
        }).join('') + '</div><div class="tm-di-fb" hidden></div><button type="button" class="tm-di-btn">' + T('Comprobar', 'Check') + '</button></div>';
      var sel = null, corregida = false, btn = cont.querySelector('.tm-di-btn');
      cont.querySelector('.tm-di-ops').addEventListener('click', function (ev) {
        var op = ev.target.closest('.tm-di-op');
        if (!op || corregida) return;
        Array.prototype.forEach.call(cont.querySelectorAll('.tm-di-op'), function (b) { b.classList.remove('tm-sel'); });
        op.classList.add('tm-sel');
        sel = Number(op.getAttribute('data-i'));
        btn.classList.add('tm-listo');
      });
      btn.addEventListener('click', function () {
        if (!corregida) {
          if (sel === null) return;
          corregida = true;
          var bien = it.opciones.indexOf(it.correcta), ok = sel === bien;
          if (ok) aciertos++;
          Array.prototype.forEach.call(cont.querySelectorAll('.tm-di-op'), function (b) {
            var i = Number(b.getAttribute('data-i'));
            b.disabled = true;
            b.classList.remove('tm-sel');
            if (i === sel) b.classList.add(ok ? 'tm-ok' : 'tm-ko');
            else if (i === bien) b.classList.add('tm-buena');
          });
          var fb = cont.querySelector('.tm-di-fb');
          fb.hidden = false;
          fb.className = 'tm-di-fb ' + (ok ? 'tm-ok' : 'tm-ko');
          fb.innerHTML = '<strong>' + (ok ? T('¡Correcto!', 'Correct!') : T('No es correcto.', 'Not correct.')) + '</strong> ' + explicar(it);
          btn.textContent = pos + 1 < cola.length ? T('Siguiente', 'Next') : T('Ver resultado', 'See result');
        } else {
          pos++;
          if (pos < cola.length) pregunta(); else resultado(cont, aciertos, cola.length, function () { empezar(nivel); }, inicio);
        }
      });
    }
    inicio();
  };

  /* ---- widget 2 ---- */
  window.tmDinamicaOrdenar = function (id) {
    var cont = document.getElementById(id);
    if (!cont) return;
    css();
    var cfg = {
      tit: T('Ordena los matices', 'Order the dynamic markings'),
      sub: T('Toca los matices en orden. Si te equivocas al colocar, puedes deshacer el último.', 'Tap the markings in order. If you place one wrongly, you can undo the last one.'),
      modos: [
        { v: { sentido: 'suave-fuerte', cuantos: 4 }, t: T('De más suave a más fuerte', 'Softest to loudest'), d: T('Cuatro signos por pregunta', 'Four signs per question') },
        { v: { sentido: 'fuerte-suave', cuantos: 4 }, t: T('De más fuerte a más suave', 'Loudest to softest'), d: T('El orden inverso', 'The reverse order') },
        { v: { sentido: 'mezcla', cuantos: 5, nombres: true }, t: T('Con los nombres italianos', 'With the Italian names'), d: T('Pianissimo, mezzoforte… y el sentido cambia en cada pregunta', 'Pianissimo, mezzoforte… and the direction changes on every question') }
      ]
    };
    var cola = [], pos = 0, aciertos = 0, nivel = null;
    function inicio() { armazon(cont, cfg, empezar); }
    function empezar(v) { nivel = v; cola = generar('ordenar', { sentido: v.sentido, cuantos: v.cuantos, nombres: v.nombres, n: 6 }); pos = 0; aciertos = 0; pregunta(); }
    function pinta(it, x) { return it.nombres ? x : signo(x); }
    function pregunta() {
      var it = cola[pos], puestos = [];
      cont.innerHTML = '<div class="tm-di-card">' + cabecera(pos, cola.length, it.enunciado)
        + '<div class="tm-di-huecos"><span class="tm-di-vacio">' + T('Toca los matices en orden…', 'Tap the markings in order…') + '</span></div>'
        + '<div class="tm-di-fichas">' + it.fichas.map(function (x, i) {
          return '<button type="button" class="tm-di-ficha" data-v="' + x + '" data-i="' + i + '">' + pinta(it, x) + '</button>';
        }).join('') + '</div>'
        + '<button type="button" class="tm-di-deshacer" hidden>' + T('Deshacer', 'Undo') + '</button>'
        + '<div class="tm-di-fb" hidden></div><button type="button" class="tm-di-btn">' + T('Comprobar', 'Check') + '</button></div>';
      var huecos = cont.querySelector('.tm-di-huecos'), btn = cont.querySelector('.tm-di-btn');
      var deshacer = cont.querySelector('.tm-di-deshacer'), corregida = false;
      function pintar() {
        huecos.innerHTML = puestos.length
          ? puestos.map(function (x, i) { return '<span class="tm-di-hueco"><small>' + (i + 1) + '</small>' + pinta(it, x) + '</span>'; }).join('')
          : '<span class="tm-di-vacio">' + T('Toca los matices en orden…', 'Tap the markings in order…') + '</span>';
        deshacer.hidden = !puestos.length || corregida;
        btn.classList.toggle('tm-listo', puestos.length === it.fichas.length);
      }
      cont.querySelector('.tm-di-fichas').addEventListener('click', function (ev) {
        var f = ev.target.closest('.tm-di-ficha');
        if (!f || corregida || f.disabled) return;
        puestos.push(f.getAttribute('data-v'));
        f.disabled = true;
        pintar();
      });
      deshacer.addEventListener('click', function () {
        if (corregida || !puestos.length) return;
        var x = puestos.pop();
        Array.prototype.forEach.call(cont.querySelectorAll('.tm-di-ficha'), function (f) { if (f.getAttribute('data-v') === x) f.disabled = false; });
        pintar();
      });
      btn.addEventListener('click', function () {
        if (!corregida) {
          if (puestos.length !== it.fichas.length) return;
          corregida = true;
          var ok = puestos.join('|') === it.solucion.join('|');
          if (ok) aciertos++;
          huecos.innerHTML = puestos.map(function (x, i) {
            return '<span class="tm-di-hueco" style="border-color:' + (x === it.solucion[i] ? '#1c7e46' : '#c0392b') + '"><small>' + (i + 1) + '</small>' + pinta(it, x) + '</span>';
          }).join('');
          deshacer.hidden = true;
          Array.prototype.forEach.call(cont.querySelectorAll('.tm-di-ficha'), function (f) { f.disabled = true; });
          var fb = cont.querySelector('.tm-di-fb');
          fb.hidden = false;
          fb.className = 'tm-di-fb ' + (ok ? 'tm-ok' : 'tm-ko');
          fb.innerHTML = '<strong>' + (ok ? T('¡Correcto!', 'Correct!') : T('No es correcto.', 'Not correct.')) + '</strong> ' + T('El orden era: ', 'The order was: ') + explicar(it);
          btn.textContent = pos + 1 < cola.length ? T('Siguiente', 'Next') : T('Ver resultado', 'See result');
          btn.classList.add('tm-listo');
        } else {
          pos++;
          if (pos < cola.length) pregunta(); else resultado(cont, aciertos, cola.length, function () { empezar(nivel); }, inicio);
        }
      });
      pintar();
    }
    inicio();
  };

  window.tmDinamicaEjercicios = { GRADOS: GRADOS, CAMBIOS: CAMBIOS, generar: generar, explicar: explicar };
})();
