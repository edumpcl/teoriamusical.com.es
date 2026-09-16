/* Ejercicios de tempo y agógica — /ejercicios/tempo/

   Dos ejercicios (decisión de Eduardo, 16-09-2026):
     tmTempoSignificados('x')  ¿qué significa este término? (y su rango de BPM)
     tmTempoOrdenar('x')       ordenar términos de más lento a más rápido y al revés

   Los términos de velocidad, sus BPM y sus rangos son los MISMOS que la tabla del
   metrónomo (/herramientas/metronomo/), que sigue a la app Soundcorset, y los de
   agógica salen de /diccionario-musical/agogica/. El verificador
   (tools/verificar-tempo-ejercicios.js) compara ambas cosas, así que no pueden
   separarse. Las mismas preguntas se imprimen en la ficha con
   tools/generate-fichas-tempo.js. */
(function () {
  'use strict';

  /* Velocidad: orden de más lento a más rápido; bpm = el que suena en la web. */
  var VELOCIDADES = [
    { t: 'Grave', bpm: 30, rango: '15–39', sig: 'Muy lento y solemne' },
    { t: 'Largo', bpm: 50, rango: '40–59', sig: 'Amplio y sostenido' },
    { t: 'Larghetto', bpm: 63, rango: '60–65', sig: 'Algo menos lento que el Largo' },
    { t: 'Adagio', bpm: 70, rango: '66–75', sig: 'Lento y expresivo' },
    { t: 'Andante', bpm: 80, rango: '76–89', sig: 'Al paso, tranquilo' },
    { t: 'Moderato', bpm: 96, rango: '90–104', sig: 'Moderado, equilibrado' },
    { t: 'Allegretto', bpm: 108, rango: '105–114', sig: 'Algo vivo, ligero' },
    { t: 'Allegro', bpm: 120, rango: '115–129', sig: 'Rápido y alegre' },
    { t: 'Vivace', bpm: 144, rango: '130–167', sig: 'Vivo y enérgico' },
    { t: 'Presto', bpm: 176, rango: '168–199', sig: 'Muy rápido' },
    { t: 'Prestissimo', bpm: 208, rango: '200–300', sig: 'Extremadamente rápido' }
  ];

  var AGOGICA = [
    { t: 'Accelerando', sig: 'Acelerar poco a poco' },
    { t: 'Stringendo', sig: '«Apretando»: avanzar con más tensión, tendiendo a acelerar' },
    { t: 'Doppio movimento', sig: 'Pasar de inmediato a un movimiento doble' },
    { t: 'Ritardando', sig: 'Frenar poco a poco' },
    { t: 'Rallentando', sig: 'Frenar poco a poco, con sensación de mayor amplitud' },
    { t: 'Ritenuto', sig: 'Retener el tempo de golpe y seguir a esa velocidad' },
    { t: 'Allargando', sig: 'Frenar ampliando el carácter de la frase' },
    { t: 'Morendo', sig: 'Apagarse poco a poco, perdiendo intensidad' },
    { t: 'A tempo', sig: 'Volver a la velocidad que había antes del cambio' },
    { t: 'Tempo primo', sig: 'Volver al tempo del principio de la obra' },
    { t: 'Più mosso', sig: 'Un tempo nuevo y más rápido, desde esa misma nota' },
    { t: 'Meno mosso', sig: 'Un tempo nuevo y más lento, desde esa misma nota' },
    { t: 'L’istesso tempo', sig: 'El mismo tempo aunque cambie el compás o la figura del pulso' },
    { t: 'Rubato', sig: 'Robar tiempo a unas notas y devolverlo en otras' },
    { t: 'Calderón', sig: 'Prolongar la nota o el silencio a voluntad del intérprete' }
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
      uno: function (a) { return a[Math.floor(rnd() * a.length)]; },
      entero: function (n) { return Math.floor(rnd() * n); },
      barajar: function (a) {
        var c = a.slice();
        for (var i = c.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = c[i]; c[i] = c[j]; c[j] = t; }
        return c;
      }
    };
  }

  /* ---- Ejercicio 1: qué significa este término ---- */
  function generarSignificados(o, rnd) {
    var A = azar(rnd);
    var fuente = o.nivel === 'velocidad' ? VELOCIDADES : o.nivel === 'agogica' ? AGOGICA : VELOCIDADES.concat(AGOGICA);
    var pool = A.barajar(fuente);
    var out = [];
    for (var i = 0; out.length < o.n; i++) {
      var x = pool[i % pool.length];
      var esVel = x.rango !== undefined;
      // En los términos de velocidad, una de cada tres pregunta por el rango de BPM.
      var porBpm = esVel && rnd() < 0.34;
      if (porBpm) {
        var otras = A.barajar(VELOCIDADES.filter(function (v) { return v.t !== x.t; })).slice(0, 3);
        out.push({
          tipo: 'bpm', termino: x.t,
          enunciado: '¿Cuál es el rango de BPM del <strong>' + x.t + '</strong>?',
          correcta: x.rango,
          opciones: A.barajar([x.rango].concat(otras.map(function (v) { return v.rango; })))
        });
      } else {
        // Distractores de la misma familia: si no, se acierta por descarte.
        var mismos = (esVel ? VELOCIDADES : AGOGICA).filter(function (v) { return v.t !== x.t; });
        var dis = A.barajar(mismos).slice(0, 3);
        out.push({
          tipo: 'significado', termino: x.t, familia: esVel ? 'velocidad' : 'agogica',
          enunciado: '¿Qué significa <strong>' + x.t + '</strong>?',
          correcta: x.sig,
          opciones: A.barajar([x.sig].concat(dis.map(function (v) { return v.sig; })))
        });
      }
    }
    return out;
  }

  /* ---- Ejercicio 2: ordenar velocidades ---- */
  function generarOrdenar(o, rnd) {
    var A = azar(rnd);
    var out = [];
    for (var k = 0; k < o.n; k++) {
      var cuantos = o.cuantos || (4 + A.entero(2));
      /* Nunca dos términos vecinos en la escala (petición de Eduardo): si salieran
         juntos Allegretto (105–114) y Allegro (115–129), sus rangos se tocan y el
         orden sería discutible. Se eligen índices separados al menos 2, así entre
         dos términos de la pregunta siempre queda otro por medio. */
      var indices = [];
      var libres = [];
      for (var q = 0; q < VELOCIDADES.length; q++) libres.push(q);
      libres = A.barajar(libres);
      libres.forEach(function (idx) {
        if (indices.length >= cuantos) return;
        if (indices.every(function (y) { return Math.abs(y - idx) >= 2; })) indices.push(idx);
      });
      indices.sort(function (a, b) { return a - b; });
      var elegidos = indices.map(function (idx) { return VELOCIDADES[idx]; });
      var haciaArriba = o.sentido === 'lento-rapido' ? true : o.sentido === 'rapido-lento' ? false : rnd() < 0.5;
      var solucion = haciaArriba ? elegidos : elegidos.slice().reverse();
      out.push({
        tipo: 'ordenar',
        sentido: haciaArriba ? 'lento-rapido' : 'rapido-lento',
        enunciado: haciaArriba ? 'Ordena de <strong>más lento a más rápido</strong>' : 'Ordena de <strong>más rápido a más lento</strong>',
        fichas: A.barajar(elegidos).map(function (v) { return v.t; }),
        solucion: solucion.map(function (v) { return v.t; }),
        bpm: solucion.map(function (v) { return v.bpm; })
      });
    }
    return out;
  }


  /* ---- Ejercicio 3: reconocer de oído el cambio de tempo ----
     Usa las demostraciones de /diccionario-musical/agogica/ (agogica-audio.js):
     suena un cambio de tempo y hay que decir cuál es. */
  var OIDO = [
    { tipo: 'accelerando', t: 'Accelerando', pista: 'el pulso se va acelerando poco a poco' },
    { tipo: 'ritardando', t: 'Ritardando', pista: 'el pulso frena poco a poco' },
    { tipo: 'ritenuto', t: 'Ritenuto', pista: 'el tempo baja de golpe y se mantiene' },
    { tipo: 'a-tempo', t: 'A tempo', pista: 'frena y después recupera la velocidad de antes' },
    { tipo: 'calderon', t: 'Calderón', pista: 'el pulso se detiene y luego sigue igual' },
    { tipo: 'rubato', t: 'Rubato', pista: 'el pulso va y viene alrededor del mismo tempo' }
  ];

  function generarOido(o, rnd) {
    var A = azar(rnd), out = [], bolsa = [];
    for (var i = 0; i < o.n; i++) {
      if (!bolsa.length) bolsa = A.barajar(OIDO);
      var x = bolsa.shift();
      var otras = A.barajar(OIDO.filter(function (y) { return y.t !== x.t; })).slice(0, 3);
      out.push({
        tipo: 'oido', demo: x.tipo, termino: x.t, pista: x.pista,
        enunciado: '¿Qué cambio de tempo estás escuchando?',
        correcta: x.t,
        opciones: A.barajar([x.t].concat(otras.map(function (y) { return y.t; })))
      });
    }
    return out;
  }

  function generar(tipo, o, semilla) {
    var rnd = mulberry32(semilla || Math.floor(Math.random() * 1e9));
    return tipo === 'ordenar' ? generarOrdenar(o, rnd)
      : tipo === 'oido' ? generarOido(o, rnd)
      : generarSignificados(o, rnd);
  }

  function explicar(item) {
    if (item.tipo === 'oido') return 'Era un ' + item.termino.toLowerCase() + ': ' + item.pista + '.';
    if (item.tipo === 'bpm') return 'El ' + item.termino + ' va a ' + item.correcta + ' pulsaciones por minuto.';
    if (item.tipo === 'significado') return item.termino + ': ' + item.correcta + '.';
    return item.solucion.map(function (t, i) { return t + ' (' + item.bpm[i] + ')'; }).join(' → ') + '.';
  }

  /* ------------------------------------------------------------------- UI */

  var CSS = [
    '.tm-te{font-family:"Inter",system-ui,-apple-system,sans-serif;color:#333;}',
    '.tm-te-card{background:#fff;border:1px solid #e8e0cc;border-radius:12px;padding:22px;margin:8px 0;box-shadow:0 2px 8px rgba(0,0,0,.05);}',
    '.tm-te-tit{font-size:1.2rem;font-weight:700;color:#1a1208;margin-bottom:6px;}',
    '.tm-te-sub{color:#514232;font-size:.9rem;margin-bottom:16px;line-height:1.5;}',
    '.tm-te-modos{display:flex;flex-direction:column;gap:10px;}',
    '.tm-te-modo{background:#faf7f2;border:2px solid #d8d0b8;border-radius:10px;padding:14px 18px;cursor:pointer;text-align:left;font-family:inherit;}',
    '.tm-te-modo:hover{border-color:#8b6914;background:#fff8ee;}',
    '.tm-te-modo strong{display:block;font-size:1rem;color:#1a1208;margin-bottom:3px;}',
    '.tm-te-modo span{font-size:.82rem;color:#8b6914;}',
    '.tm-te-prog{font-size:.8rem;color:#8b6914;font-weight:600;margin-bottom:5px;}',
    '.tm-te-barra{background:#e4e9f2;border-radius:3px;height:6px;margin-bottom:16px;}',
    '.tm-te-barra div{background:#8b6914;height:100%;border-radius:3px;transition:width .4s ease;}',
    '.tm-te-preg{font-size:1.05rem;font-weight:700;color:#1a1208;text-align:center;margin:6px 0 14px;line-height:1.4;}',
    '.tm-te-ops{display:flex;flex-direction:column;gap:10px;}',
    '.tm-te-op{border:2px solid #d8d0b8;background:#fff;border-radius:8px;padding:12px 16px;cursor:pointer;font-weight:600;font-size:.95rem;color:#514232;font-family:inherit;text-align:left;min-height:44px;}',
    '.tm-te-op:hover:not([disabled]){border-color:#8b6914;}',
    '.tm-te-op.tm-sel{border-color:#8b6914;background:#8b6914;color:#fff;}',
    '.tm-te-op.tm-ok{border-color:#27ae60!important;background:#27ae60!important;color:#fff!important;}',
    '.tm-te-op.tm-ko{border-color:#c0392b!important;background:#c0392b!important;color:#fff!important;}',
    '.tm-te-op.tm-buena{border-color:#27ae60!important;background:#e8f5e9!important;color:#2e7d32!important;}',
    '.tm-te-op[disabled]{cursor:default;}',
    /* ordenar */
    '.tm-te-huecos{display:flex;flex-wrap:wrap;gap:8px;min-height:52px;padding:10px;background:#faf7f2;border:1px dashed #d8d0b8;border-radius:8px;margin-bottom:12px;}',
    '.tm-te-hueco{display:inline-flex;align-items:center;gap:6px;background:#fff;border:2px solid #8b6914;border-radius:8px;padding:8px 12px;font-weight:700;font-size:.9rem;}',
    '.tm-te-hueco small{color:#8b6914;font-size:.75rem;}',
    '.tm-te-vacio{color:#8a8a8a;font-size:.88rem;align-self:center;}',
    '.tm-te-fichas{display:flex;flex-wrap:wrap;gap:8px;}',
    '.tm-te-ficha{border:2px solid #d8d0b8;background:#fff;border-radius:8px;padding:10px 14px;font-weight:600;font-size:.92rem;cursor:pointer;font-family:inherit;min-height:42px;color:#514232;}',
    '.tm-te-ficha:hover:not([disabled]){border-color:#8b6914;}',
    '.tm-te-ficha[disabled]{opacity:.35;cursor:default;}',
    '.tm-te-acc{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px;}',
    '.tm-te-deshacer{background:#fff;border:1px solid #d8d0b8;border-radius:8px;padding:9px 14px;font:inherit;font-size:.85rem;font-weight:600;cursor:pointer;}',
    '.tm-te-fb{margin-top:14px;padding:12px 14px;border-radius:8px;font-size:.92rem;line-height:1.5;}',
    '.tm-te-fb[hidden]{display:none;}',
    '.tm-te-fb.tm-ok{background:#e8f5e9;color:#1f5d24;}',
    '.tm-te-fb.tm-ko{background:#ffebee;color:#8e1f1f;}',
    '.tm-te-btn{width:100%;padding:14px;margin-top:14px;border:none;border-radius:8px;font-size:1rem;font-weight:700;font-family:inherit;background:#d8d0b8;color:#777;cursor:not-allowed;}',
    '.tm-te-btn.tm-listo{background:#8b6914;color:#fff;cursor:pointer;}',
    '.tm-te-res{text-align:center;padding:10px 0;}',
    '.tm-te-nota{font-size:3.5rem;font-weight:900;color:#8b6914;line-height:1;}',
    '.tm-te-de{font-size:.9rem;color:#514232;margin:4px 0 16px;}',
    '.tm-te-msg{font-size:1rem;color:#1a1208;font-weight:600;margin-bottom:20px;line-height:1.5;}',
    '.tm-te-otra{background:#8b6914;color:#fff;border:none;border-radius:8px;padding:12px 24px;font-size:1rem;font-weight:700;cursor:pointer;font-family:inherit;margin:4px;}',
    '.tm-te-otra.tm-2{background:#fff;color:#1a1208;border:1px solid #d8d0b8;}'
  ].join('');

  var PREGUNTAS = 10;

  function css() {
    if (document.getElementById('tm-te-css')) return;
    var st = document.createElement('style');
    st.id = 'tm-te-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  function armazon(cont, cfg, empezar) {
    cont.className = 'tm-te';
    cont.innerHTML = '<div class="tm-te-card"><div class="tm-te-tit">' + cfg.tit + '</div><div class="tm-te-sub">' + cfg.sub + '</div>'
      + '<div class="tm-te-modos">' + cfg.modos.map(function (m, i) {
        return '<button type="button" class="tm-te-modo" data-i="' + i + '"><strong>' + m.t + '</strong><span>' + m.d + '</span></button>';
      }).join('') + '</div></div>';
    Array.prototype.forEach.call(cont.querySelectorAll('.tm-te-modo'), function (b) {
      b.addEventListener('click', function () { empezar(cfg.modos[Number(b.getAttribute('data-i'))].v); });
    });
  }

  function resultado(cont, aciertos, total, otra, inicio) {
    var nota = aciertos / total;
    var msg = nota === 1 ? '¡Perfecto! Lo dominas.' : nota >= 0.8 ? 'Muy bien: casi todo correcto.'
      : nota >= 0.5 ? 'Vas bien. Repasa las explicaciones y vuelve a intentarlo.' : 'Conviene repasar la teoría antes de volver a intentarlo.';
    cont.innerHTML = '<div class="tm-te-card tm-te-res"><div class="tm-te-nota">' + aciertos + '</div><div class="tm-te-de">aciertos de ' + total + '</div>'
      + '<div class="tm-te-msg">' + msg + '</div>'
      + '<button type="button" class="tm-te-otra" data-a="otra">Otra ronda</button>'
      + '<button type="button" class="tm-te-otra tm-2" data-a="modo">Cambiar de nivel</button></div>';
    cont.querySelector('[data-a="otra"]').addEventListener('click', otra);
    cont.querySelector('[data-a="modo"]').addEventListener('click', inicio);
  }

  /* ---- widget 1 ---- */
  window.tmTempoSignificados = function (id) {
    var cont = document.getElementById(id);
    if (!cont) return;
    css();
    var cfg = {
      tit: '¿Qué significa este término?',
      sub: 'Se muestra un término italiano y hay que elegir qué indica. En los de velocidad, algunas preguntas piden su rango de BPM.',
      modos: [
        { v: { nivel: 'velocidad' }, t: 'Términos de velocidad', d: 'Grave, Largo, Andante, Allegro, Presto…' },
        { v: { nivel: 'agogica' }, t: 'Cambios de tempo (agógica)', d: 'Accelerando, ritenuto, a tempo, rubato, calderón…' },
        { v: { nivel: 'mezcla' }, t: 'Todo mezclado', d: 'Velocidad y agógica en la misma ronda' }
      ]
    };
    var cola = [], pos = 0, aciertos = 0, nivel = null;

    function inicio() { armazon(cont, cfg, empezar); }
    function empezar(v) {
      nivel = v;
      cola = generar('significados', { nivel: v.nivel, n: PREGUNTAS });
      pos = 0; aciertos = 0;
      pregunta();
    }
    function pregunta() {
      var it = cola[pos];
      cont.innerHTML = '<div class="tm-te-card">'
        + '<div class="tm-te-prog">Pregunta ' + (pos + 1) + ' de ' + cola.length + '</div>'
        + '<div class="tm-te-barra"><div style="width:' + (pos / cola.length * 100) + '%"></div></div>'
        + '<div class="tm-te-preg">' + it.enunciado + '</div>'
        + '<div class="tm-te-ops">' + it.opciones.map(function (o, i) {
          return '<button type="button" class="tm-te-op" data-i="' + i + '">' + o + '</button>';
        }).join('') + '</div>'
        + '<div class="tm-te-fb" hidden></div>'
        + '<button type="button" class="tm-te-btn">Comprobar</button></div>';
      var sel = null, corregida = false;
      var btn = cont.querySelector('.tm-te-btn');
      cont.querySelector('.tm-te-card').addEventListener('click', function (ev) {
        var op = ev.target.closest('.tm-te-op');
        if (!op || corregida) return;
        Array.prototype.forEach.call(cont.querySelectorAll('.tm-te-op'), function (b) { b.classList.remove('tm-sel'); });
        op.classList.add('tm-sel');
        sel = Number(op.getAttribute('data-i'));
        btn.classList.add('tm-listo');
      });
      btn.addEventListener('click', function () {
        if (!corregida) {
          if (sel === null) return;
          corregida = true;
          var bien = it.opciones.indexOf(it.correcta);
          var ok = sel === bien;
          if (ok) aciertos++;
          Array.prototype.forEach.call(cont.querySelectorAll('.tm-te-op'), function (b) {
            var i = Number(b.getAttribute('data-i'));
            b.disabled = true;
            b.classList.remove('tm-sel');
            if (i === sel) b.classList.add(ok ? 'tm-ok' : 'tm-ko');
            else if (i === bien) b.classList.add('tm-buena');
          });
          var fb = cont.querySelector('.tm-te-fb');
          fb.hidden = false;
          fb.className = 'tm-te-fb ' + (ok ? 'tm-ok' : 'tm-ko');
          fb.innerHTML = '<strong>' + (ok ? '¡Correcto!' : 'No es correcto.') + '</strong> ' + explicar(it);
          btn.textContent = pos + 1 < cola.length ? 'Siguiente' : 'Ver resultado';
        } else {
          pos++;
          if (pos < cola.length) pregunta();
          else resultado(cont, aciertos, cola.length, function () { empezar(nivel); }, inicio);
        }
      });
    }
    inicio();
  };

  /* ---- widget 2 ---- */
  window.tmTempoOrdenar = function (id) {
    var cont = document.getElementById(id);
    if (!cont) return;
    css();
    var cfg = {
      tit: 'Ordena las velocidades',
      sub: 'Toca los términos en orden. Si te equivocas al colocar, puedes deshacer el último.',
      modos: [
        { v: { sentido: 'lento-rapido', cuantos: 4 }, t: 'De más lento a más rápido', d: 'Cuatro términos por ronda' },
        { v: { sentido: 'rapido-lento', cuantos: 4 }, t: 'De más rápido a más lento', d: 'El orden inverso' },
        { v: { sentido: 'mezcla', cuantos: 5 }, t: 'Mezclado y más largo', d: 'Cinco términos y el sentido cambia en cada pregunta' }
      ]
    };
    var cola = [], pos = 0, aciertos = 0, nivel = null;

    function inicio() { armazon(cont, cfg, empezar); }
    function empezar(v) {
      nivel = v;
      cola = generar('ordenar', { sentido: v.sentido, cuantos: v.cuantos, n: 6 });
      pos = 0; aciertos = 0;
      pregunta();
    }
    function pregunta() {
      var it = cola[pos], puestos = [];
      cont.innerHTML = '<div class="tm-te-card">'
        + '<div class="tm-te-prog">Pregunta ' + (pos + 1) + ' de ' + cola.length + '</div>'
        + '<div class="tm-te-barra"><div style="width:' + (pos / cola.length * 100) + '%"></div></div>'
        + '<div class="tm-te-preg">' + it.enunciado + '</div>'
        + '<div class="tm-te-huecos"><span class="tm-te-vacio">Toca los términos en orden…</span></div>'
        + '<div class="tm-te-fichas">' + it.fichas.map(function (t, i) {
          return '<button type="button" class="tm-te-ficha" data-i="' + i + '">' + t + '</button>';
        }).join('') + '</div>'
        + '<div class="tm-te-acc"><button type="button" class="tm-te-deshacer" hidden>Deshacer</button></div>'
        + '<div class="tm-te-fb" hidden></div>'
        + '<button type="button" class="tm-te-btn">Comprobar</button></div>';
      var huecos = cont.querySelector('.tm-te-huecos');
      var btn = cont.querySelector('.tm-te-btn');
      var deshacer = cont.querySelector('.tm-te-deshacer');
      var corregida = false;

      function pintar() {
        huecos.innerHTML = puestos.length
          ? puestos.map(function (t, i) { return '<span class="tm-te-hueco"><small>' + (i + 1) + '</small>' + t + '</span>'; }).join('')
          : '<span class="tm-te-vacio">Toca los términos en orden…</span>';
        deshacer.hidden = !puestos.length || corregida;
        btn.classList.toggle('tm-listo', puestos.length === it.fichas.length);
      }
      cont.querySelector('.tm-te-fichas').addEventListener('click', function (ev) {
        var f = ev.target.closest('.tm-te-ficha');
        if (!f || corregida || f.disabled) return;
        puestos.push(f.textContent);
        f.disabled = true;
        pintar();
      });
      deshacer.addEventListener('click', function () {
        if (corregida || !puestos.length) return;
        var t = puestos.pop();
        Array.prototype.forEach.call(cont.querySelectorAll('.tm-te-ficha'), function (f) { if (f.textContent === t) f.disabled = false; });
        pintar();
      });
      btn.addEventListener('click', function () {
        if (!corregida) {
          if (puestos.length !== it.fichas.length) return;
          corregida = true;
          var ok = puestos.join('|') === it.solucion.join('|');
          if (ok) aciertos++;
          huecos.innerHTML = puestos.map(function (t, i) {
            var bien = t === it.solucion[i];
            return '<span class="tm-te-hueco" style="border-color:' + (bien ? '#27ae60' : '#c0392b') + '"><small>' + (i + 1) + '</small>' + t + '</span>';
          }).join('');
          deshacer.hidden = true;
          Array.prototype.forEach.call(cont.querySelectorAll('.tm-te-ficha'), function (f) { f.disabled = true; });
          var fb = cont.querySelector('.tm-te-fb');
          fb.hidden = false;
          fb.className = 'tm-te-fb ' + (ok ? 'tm-ok' : 'tm-ko');
          fb.innerHTML = '<strong>' + (ok ? '¡Correcto!' : 'No es correcto.') + '</strong> El orden era: ' + explicar(it);
          btn.textContent = pos + 1 < cola.length ? 'Siguiente' : 'Ver resultado';
          btn.classList.add('tm-listo');
        } else {
          pos++;
          if (pos < cola.length) pregunta();
          else resultado(cont, aciertos, cola.length, function () { empezar(nivel); }, inicio);
        }
      });
      pintar();
    }
    inicio();
  };


  /* ---- widget 3: de oído ---- */
  window.tmTempoOido = function (id) {
    var cont = document.getElementById(id);
    if (!cont) return;
    css();
    if (!window.tmAgogicaAudio) {
      cont.innerHTML = '<div class="tm-te-card"><div class="tm-te-sub">Este ejercicio necesita el audio de la página de agógica.</div></div>';
      return;
    }
    var cfg = {
      tit: '¿Qué cambio de tempo escuchas?',
      sub: 'Suena un cambio de tempo y hay que reconocerlo. Se puede repetir las veces que haga falta.',
      modos: [
        { v: { n: 8 }, t: 'Empezar', d: 'Ocho ejemplos: accelerando, ritardando, ritenuto, a tempo, calderón y rubato' }
      ]
    };
    var cola = [], pos = 0, aciertos = 0, nivel = null;

    function inicio() { armazon(cont, cfg, empezar); }
    function empezar(v) {
      nivel = v;
      cola = generar('oido', { n: v.n });
      pos = 0; aciertos = 0;
      pregunta();
    }
    function pregunta() {
      var it = cola[pos];
      cont.innerHTML = '<div class="tm-te-card">'
        + '<div class="tm-te-prog">Pregunta ' + (pos + 1) + ' de ' + cola.length + '</div>'
        + '<div class="tm-te-barra"><div style="width:' + (pos / cola.length * 100) + '%"></div></div>'
        + '<div class="tm-te-preg">' + it.enunciado + '</div>'
        + '<div class="tm-te-acc"><button type="button" class="tm-te-deshacer tm-te-oir">Escuchar el ejemplo</button></div>'
        + '<div class="tm-te-ops">' + it.opciones.map(function (o, i) {
          return '<button type="button" class="tm-te-op" data-i="' + i + '">' + o + '</button>';
        }).join('') + '</div>'
        + '<div class="tm-te-fb" hidden></div>'
        + '<button type="button" class="tm-te-btn">Comprobar</button></div>';
      var sel = null, corregida = false;
      var btn = cont.querySelector('.tm-te-btn');
      var oir = cont.querySelector('.tm-te-oir');
      oir.addEventListener('click', function () {
        if (window.tmAgogicaAudio.sonando() === it.demo) window.tmAgogicaAudio.parar();
        else window.tmAgogicaAudio.tocarTipo(it.demo);
      });
      cont.querySelector('.tm-te-ops').addEventListener('click', function (ev) {
        var op = ev.target.closest('.tm-te-op');
        if (!op || corregida) return;
        Array.prototype.forEach.call(cont.querySelectorAll('.tm-te-op'), function (b) { b.classList.remove('tm-sel'); });
        op.classList.add('tm-sel');
        sel = Number(op.getAttribute('data-i'));
        btn.classList.add('tm-listo');
      });
      btn.addEventListener('click', function () {
        if (!corregida) {
          if (sel === null) return;
          corregida = true;
          window.tmAgogicaAudio.parar();
          var bien = it.opciones.indexOf(it.correcta);
          var ok = sel === bien;
          if (ok) aciertos++;
          Array.prototype.forEach.call(cont.querySelectorAll('.tm-te-op'), function (b) {
            var i = Number(b.getAttribute('data-i'));
            b.disabled = true;
            b.classList.remove('tm-sel');
            if (i === sel) b.classList.add(ok ? 'tm-ok' : 'tm-ko');
            else if (i === bien) b.classList.add('tm-buena');
          });
          var fb = cont.querySelector('.tm-te-fb');
          fb.hidden = false;
          fb.className = 'tm-te-fb ' + (ok ? 'tm-ok' : 'tm-ko');
          fb.innerHTML = '<strong>' + (ok ? '¡Correcto!' : 'No es correcto.') + '</strong> ' + explicar(it);
          btn.textContent = pos + 1 < cola.length ? 'Siguiente' : 'Ver resultado';
        } else {
          window.tmAgogicaAudio.parar();
          pos++;
          if (pos < cola.length) pregunta();
          else resultado(cont, aciertos, cola.length, function () { empezar(nivel); }, inicio);
        }
      });
    }
    inicio();
  };

  window.tmTempoEjercicios = {
    VELOCIDADES: VELOCIDADES, AGOGICA: AGOGICA, OIDO: OIDO,
    generar: generar, explicar: explicar
  };
})();
