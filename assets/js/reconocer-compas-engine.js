/* Reconocer compás — /ejercicios/compases/reconocer-compas/

   Uso: <div id="x"></div><script>tmReconocerCompas('x');</script>

   Se ve un compás escrito SIN la cifra, y hay que adivinarla tocando una ficha de
   numerador y una de denominador (petición de Eduardo, 17-09-2026: «que se pueda
   elegir numerador y denominador»).

   El mismo número de tiempos puede escribirse con más de una cifra: un compás de
   3/4 y uno de 6/8 duran lo mismo (3 negras = 2 negras con puntillo). Hay dos
   formas de que esto sea ambiguo — las dos cifras correctas —:
     1) que no haya ninguna figura corta que muestre cómo se agrupan los tiempos
        (una sola blanca con puntillo llenando todo el compás), o
     2) que haya una síncopa: una figura suelta (negra, no beameable) que empieza
        justo a mitad de un tiempo y dura un tiempo entero — «corchea-negra-corchea»
        con silencios o sin ellos —, que es una forma normal de escribir esa
        síncopa en cualquiera de las dos cifras (Eduardo, 17-09-2026, sobre un caso
        real: «esa negra se puede escribir así, es normal ver las síncopas escritas
        así»; antes el motor exigía que TODA figura respetase la frontera del
        tiempo o empezase justo en uno, lo cual rechazaba de más este caso).
   `equivalentes()` acepta una cifra candidata si (a) ninguna figura cruza un
   tiempo de forma inválida (`sinCruces`, con la excepción de la síncopa) y (b)
   las corcheas/semicorcheas se agrupan en las mismas barras bajo esa cifra que
   bajo la cifra de partida (`gruposDeBarras`). Cuando SÍ hay corcheas agrupadas
   de forma distinta según la cifra, esa agrupación desenmascara la cifra real y
   ya no hay ambigüedad — es la razón por la que el solfeo enseña a distinguir
   3/4 de 6/8 mirando cómo van agrupadas las corcheas.

   El mismo caso se repite un nivel más arriba entre 4/4 y 2/2 (cuatro tiempos de
   negra = dos tiempos de blanca): 2/2 NUNCA se genera como base del ejercicio
   (no está en GRUPOS), pero sí se acepta como lectura alternativa de CUALQUIER
   4/4, siempre, sin comprobar agrupación (a diferencia de 3/4↔6/8, que depende
   del ritmo). Eduardo lo pidió así expresamente tras dos casos reales en los
   que hacía falta ir añadiendo excepciones a la comprobación de cruces: «para
   hacerlo rápido todo lo que sea 4/4 es 2/2» (17-09-2026) — en la práctica se
   usan indistintamente y no compensa afinar caso a caso. Ver `EXTRA_CANDIDATAS`
   y el atajo al principio de `equivalentes()`.

   Reutiliza /assets/js/completar-compas-engine.js (tabla de compases, generación
   del ritmo y dibujo); tiene que cargarse antes en la página.
   Se audita con tools/verificar-reconocer-compas.js. */
(function () {
  'use strict';

  function D() { return window.tmCompletarCompasData; }

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
      barajar: function (a) {
        var c = a.slice();
        for (var i = c.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = c[i]; c[i] = c[j]; c[j] = t; }
        return c;
      }
    };
  }

  /* Una figura suelta (no beameable: negra, blanca...) puede cruzar una frontera
     de tiempo sin ligadura cuando es la síncopa de manual: empieza justo a mitad
     de un tiempo y dura un tiempo entero (corchea-negra-corchea, o con silencios
     en vez de corcheas). Eduardo, 17-09-2026, sobre un caso real del ejercicio:
     «esa negra se puede escribir así, es normal ver las síncopas escritas así».
     Fuera de esa forma exacta, ninguna figura puede cruzar un tiempo a medias:
     o cabe entera dentro de uno, o empieza justo en uno y ocupa tiempos enteros
     (como una blanca con puntillo llenando dos tiempos de 6/8). */
  /* El desplazamiento es SIEMPRE una corchea (8 semifusas): «tiempo/2» solo
     coincide con eso en compás simple (tiempo=16); en compuesto (tiempo=24) la
     mitad del tiempo cae a 1,5 corcheas, un sitio que no existe en la escritura
     real. Bug encontrado al comprobar el ejemplo de Eduardo en 2/4 con otro en
     6/8: la fórmula original solo se había probado en simple. */
  function esSincopa(u, t0, tiempo) { return u === tiempo && (t0 % tiempo) === 8; }

  /* Una figura con puntillo que empieza justo en un tiempo también puede llegar
     hasta la mitad del tiempo siguiente sin ligadura: es la forma normal de
     escribir puntillo cruzando el pulso (blanca con puntillo en un 4/4 que
     también se lee como 2/2 — Eduardo, 17-09-2026, viendo el ejercicio: «la
     respuesta 2/2 también es correcta»). Distinta de la síncopa de arriba: aquí
     la figura SÍ empieza en la frontera, no a mitad de tiempo, y dura tiempo y
     medio, no un tiempo justo. */
  function esPuntilloCruzado(u, t0, tiempo) { return t0 % tiempo === 0 && u === tiempo * 1.5; }

  function sinCruces(elems, tiempo) {
    var FIG = D().FIG;
    return elems.every(function (e) {
      var u = FIG[e.f].u;
      var w0 = Math.floor(e.t0 / tiempo), w1 = Math.floor((e.t0 + u - 1) / tiempo);
      if (w0 === w1) return true;
      if (e.t0 % tiempo === 0 && u % tiempo === 0) return true;
      if (esPuntilloCruzado(u, e.t0, tiempo)) return true;
      return esSincopa(u, e.t0, tiempo);
    });
  }

  /* Lo que de verdad se ve distinto entre dos cifras no es la ventana de CADA
     figura (una síncopa cambia de ventana sin que eso signifique nada visual),
     sino cómo quedan las BARRAS: qué corcheas/semicorcheas seguidas se unen con
     una barra. Se agrupan igual que dibujar() (silencios y figuras largas
     cortan la barra; el resto se une mientras siga en el mismo tiempo). */
  function gruposDeBarras(elems, tiempo) {
    var FIG = D().FIG;
    var grupos = [], actual = null, ventanaActual = null;
    elems.forEach(function (e, k) {
      var u = FIG[e.f].u;
      var beameable = u < 16 && !e.s;
      if (!beameable) { if (actual) grupos.push(actual); actual = null; return; }
      var v = Math.floor(e.t0 / tiempo);
      if (actual && v === ventanaActual) actual.push(k);
      else { if (actual) grupos.push(actual); actual = [k]; ventanaActual = v; }
    });
    if (actual) grupos.push(actual);
    return grupos;
  }

  /* Cifras que NUNCA se generan como base (no están en GRUPOS: no se eligen
     para fabricar el ritmo ni aparecen como el «compás correcto» de una
     pregunta), pero SÍ se aceptan como lectura alternativa cuando de verdad
     encajan. 2/2 es, en compás simple, el mismo caso que 3/4↔6/8: el mismo
     compás sentido en dos tiempos de blanca en vez de en cuatro de negra.
     Eduardo, 17-09-2026, sobre un 4/4: «puede ser tanto 2/2 como 4/4». */
  var EXTRA_CANDIDATAS = { '2/2': { tiempo: 32, tiempos: 2 } };

  function equivalentes(compasBase, elems) {
    var COMP = D().COMPASES;
    var total = COMP[compasBase].tiempo * COMP[compasBase].tiempos;
    var baseGrupos = gruposDeBarras(elems, COMP[compasBase].tiempo);
    var validos = [];
    Object.keys(COMP).concat(Object.keys(EXTRA_CANDIDATAS)).forEach(function (sig) {
      // 4/4 y 2/2 se dan siempre por equivalentes, sin comprobar agrupación: en
      // la práctica se usan indistintamente y no merece la pena afinar caso a
      // caso (Eduardo, 17-09-2026: «para hacerlo rápido todo lo que sea 4/4 es
      // 2/2»).
      if (compasBase === '4/4' && sig === '2/2') { validos.push(sig); return; }
      var d = COMP[sig] || EXTRA_CANDIDATAS[sig];
      if (d.tiempo * d.tiempos !== total) return;
      if (!sinCruces(elems, d.tiempo)) return;
      if (JSON.stringify(gruposDeBarras(elems, d.tiempo)) !== JSON.stringify(baseGrupos)) return;
      validos.push(sig);
    });
    return validos;
  }

  /* o = { grupo: 'simples'|'compuestos'|'mezcla', n } */
  function generarLote(o, semilla) {
    var rnd = mulberry32(semilla || Math.floor(Math.random() * 1e9));
    var A = azar(rnd);
    var posibles = D().GRUPOS[o.grupo];
    var out = [], vistos = {};
    for (var intento = 0; out.length < o.n && intento < o.n * 60; intento++) {
      var c = A.uno(posibles);
      var elems = D().generarMedida({ compas: c, silencios: true, semilla: Math.floor(rnd() * 1e9) });
      var clave = c + elems.map(function (e) { return e.f + (e.s ? 's' : ''); }).join();
      if (vistos[clave]) continue;
      vistos[clave] = 1;
      out.push({ compasBase: c, elems: elems, validos: equivalentes(c, elems) });
    }
    return out;
  }

  function compasDe(sig) { return D().COMPASES[sig] || EXTRA_CANDIDATAS[sig]; }

  /* Explicación: tiempos y unidad de cada cifra válida, y por qué hay más de una
     cuando las hay. */
  function unidadDe(sig) {
    var d = compasDe(sig);
    if (d.tiempo === 32) return 'blanca';
    return d.tiempo === 24 ? 'negra con puntillo' : 'negra';
  }
  function explicar(it) {
    var partes = it.validos.map(function (sig) {
      var d = compasDe(sig);
      return sig + ' (' + d.tiempos + ' tiempos de ' + unidadDe(sig) + ')';
    });
    if (it.validos.length === 1) return 'Es un compás de ' + partes[0] + '.';
    var lista = partes.slice(0, -1).join(', ') + ' y ' + partes[partes.length - 1];
    return 'Esta escritura no permite distinguir el compás: lo escrito dura lo mismo en ' + lista
      + ' y se lee igual de bien en cualquiera de los dos. Las dos cifras son correctas.';
  }

  /* ------------------------------------------------------------------- UI */

  /* Numeradores: todos los de compás simple (2,3,4) y compuesto (6,9,12) — nada
     de amalgama (5,7...). Denominadores: todos los válidos (redonda a fusa), la
     misma tabla que usa /ejercicios/compases/analizar-compas/ (compases-engine.js);
     los compases que se generan aquí solo usan 4 y 8, así que el resto son
     distractores reales, no adorno (petición de Eduardo, 17-09-2026). */
  var NUMERADORES = [2, 3, 4, 6, 9, 12];
  var DENOMINADORES = [1, 2, 4, 8, 16, 32];
  var PREGUNTAS = 8;

  var CSS = [
    '.tm-rc{font-family:"Inter",system-ui,-apple-system,sans-serif;color:#333;}',
    '.tm-rc-card{background:#fff;border:1px solid #e8e0cc;border-radius:12px;padding:22px;margin:8px 0;box-shadow:0 2px 8px rgba(0,0,0,.05);}',
    '.tm-rc-tit{font-size:1.2rem;font-weight:700;color:#1a1208;margin-bottom:6px;}',
    '.tm-rc-sub{color:#514232;font-size:.9rem;margin-bottom:16px;line-height:1.5;}',
    '.tm-rc-grupo{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 14px;}',
    '.tm-rc-grupo button{border:1px solid #d8d0b8;background:#fff;border-radius:6px;padding:7px 12px;font:inherit;font-size:.82rem;font-weight:600;cursor:pointer;color:#514232;}',
    '.tm-rc-grupo button[aria-pressed="true"]{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-rc-empezar{width:100%;padding:14px;border:none;border-radius:8px;font-size:1rem;font-weight:700;font-family:inherit;background:#8b6914;color:#fff;cursor:pointer;}',
    '.tm-rc-prog{font-size:.8rem;color:#8b6914;font-weight:600;margin-bottom:5px;}',
    '.tm-rc-barra{background:#e4e9f2;border-radius:3px;height:6px;margin-bottom:16px;}',
    '.tm-rc-barra div{background:#8b6914;height:100%;border-radius:3px;transition:width .4s ease;}',
    '.tm-rc-preg{font-size:1.05rem;font-weight:700;color:#1a1208;text-align:center;margin:4px 0 8px;}',
    '.tm-rc-dibujo{display:flex;justify-content:center;margin:0 auto 10px;}',
    '.tm-rc-dibujo > div{width:100%;display:flex;justify-content:center;}',
    '.tm-rc-q{font-size:.78rem;font-weight:700;color:#8b6914;margin:12px 0 8px;text-transform:uppercase;letter-spacing:.5px;text-align:center;}',
    '.tm-rc-fichas{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}',
    '.tm-rc-cifra{border:2px solid #d8d0b8;background:#fff;border-radius:8px;padding:8px 4px;cursor:pointer;font-family:inherit;width:50px;text-align:center;font-weight:700;font-size:1.05rem;min-height:44px;color:#514232;}',
    '.tm-rc-cifra:hover:not([disabled]):not(.tm-sel){border-color:#8b6914;background:#fffbf2;}',
    '.tm-rc-cifra.tm-sel{border-color:#8b6914;background:#8b6914;color:#fff;}',
    '.tm-rc-cifra.tm-ok{border-color:#27ae60!important;background:#27ae60!important;color:#fff!important;}',
    '.tm-rc-cifra.tm-ko{border-color:#c0392b!important;background:#c0392b!important;color:#fff!important;}',
    '.tm-rc-cifra.tm-buena{border-color:#27ae60!important;background:#e8f5e9!important;color:#2e7d32!important;}',
    '.tm-rc-cifra[disabled]{cursor:default;opacity:.85;}',
    '.tm-rc-previa{text-align:center;margin:14px 0;min-height:2.2em;}',
    '.tm-rc-previa .tm-rc-num{display:inline-block;font-family:Georgia,serif;font-weight:700;font-size:1.6rem;line-height:1.05;vertical-align:middle;}',
    '.tm-rc-previa .tm-rc-num span{display:block;}',
    '.tm-rc-previa .tm-rc-vacia{color:#a89b7e;font-size:.9rem;}',
    '.tm-rc-fb{margin-top:14px;padding:12px 14px;border-radius:8px;font-size:.92rem;line-height:1.5;}',
    '.tm-rc-fb[hidden]{display:none;}',
    '.tm-rc-fb.tm-ok{background:#e8f5e9;color:#1f5d24;}',
    '.tm-rc-fb.tm-ko{background:#ffebee;color:#8e1f1f;}',
    '.tm-rc-btn{width:100%;padding:14px;margin-top:14px;border:none;border-radius:8px;font-size:1rem;font-weight:700;font-family:inherit;background:#d8d0b8;color:#777;cursor:not-allowed;}',
    '.tm-rc-btn.tm-listo{background:#8b6914;color:#fff;cursor:pointer;}',
    '.tm-rc-res{text-align:center;padding:10px 0;}',
    '.tm-rc-nota{font-size:3.5rem;font-weight:900;color:#8b6914;line-height:1;}',
    '.tm-rc-de{font-size:.9rem;color:#514232;margin:4px 0 16px;}',
    '.tm-rc-msg{font-size:1rem;color:#1a1208;font-weight:600;margin-bottom:20px;line-height:1.5;}',
    '.tm-rc-otra{background:#8b6914;color:#fff;border:none;border-radius:8px;padding:12px 24px;font-size:1rem;font-weight:700;cursor:pointer;font-family:inherit;margin:4px;}',
    '.tm-rc-otra.tm-2{background:#fff;color:#1a1208;border:1px solid #d8d0b8;}'
  ].join('');

  function css() {
    if (document.getElementById('tm-rc-css')) return;
    var st = document.createElement('style');
    st.id = 'tm-rc-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  window.tmReconocerCompas = function (id) {
    var cont = document.getElementById(id);
    if (!cont || !D()) return;
    css();
    cont.className = 'tm-rc';
    var cola = [], pos = 0, aciertos = 0, grupo = 'mezcla';
    window.tmReconocerCompasDebug = function () { return cola[pos] || null; };   // para tools/verificar-reconocer-compas.js

    function inicio() {
      cont.innerHTML = '<div class="tm-rc-card"><div class="tm-rc-tit">¿Qué compás es?</div>'
        + '<div class="tm-rc-sub">Se ve un compás escrito, pero sin su cifra. Toca el numerador y el denominador que le corresponden.</div>'
        + '<div class="tm-rc-grupo" data-g="grupo">'
        + [['simples', '2/4, 3/4 y 4/4'], ['compuestos', '6/8, 9/8 y 12/8'], ['mezcla', 'Todos']].map(function (g) {
          return '<button type="button" data-v="' + g[0] + '" aria-pressed="' + (grupo === g[0]) + '">' + g[1] + '</button>';
        }).join('') + '</div>'
        + '<button type="button" class="tm-rc-empezar">Empezar</button></div>';
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-rc-grupo button'), function (b) {
        b.addEventListener('click', function () {
          grupo = b.getAttribute('data-v');
          Array.prototype.forEach.call(cont.querySelectorAll('.tm-rc-grupo button'), function (x) { x.setAttribute('aria-pressed', x === b); });
        });
      });
      cont.querySelector('.tm-rc-empezar').addEventListener('click', empezar);
    }

    function empezar() {
      cola = generarLote({ grupo: grupo, n: PREGUNTAS });
      pos = 0; aciertos = 0;
      pregunta();
    }

    function pregunta() {
      var it = cola[pos];
      cont.innerHTML = '<div class="tm-rc-card">'
        + '<div class="tm-rc-prog">Pregunta ' + (pos + 1) + ' de ' + cola.length + '</div>'
        + '<div class="tm-rc-barra"><div style="width:' + (pos / cola.length * 100) + '%"></div></div>'
        + '<div class="tm-rc-preg">¿Qué compás es?</div>'
        + '<div class="tm-rc-dibujo"><div></div></div>'
        + '<div class="tm-rc-q">Numerador</div>'
        + '<div class="tm-rc-fichas" data-g="num">' + NUMERADORES.map(function (n) {
          return '<button type="button" class="tm-rc-cifra" data-v="' + n + '">' + n + '</button>';
        }).join('') + '</div>'
        + '<div class="tm-rc-q">Denominador</div>'
        + '<div class="tm-rc-fichas" data-g="den">' + DENOMINADORES.map(function (n) {
          return '<button type="button" class="tm-rc-cifra" data-v="' + n + '">' + n + '</button>';
        }).join('') + '</div>'
        + '<div class="tm-rc-previa"><span class="tm-rc-vacia">Elige numerador y denominador…</span></div>'
        + '<div class="tm-rc-fb" hidden></div>'
        + '<button type="button" class="tm-rc-btn">Comprobar</button></div>';

      D().dibujarMedida(cont.querySelector('.tm-rc-dibujo > div'), it.compasBase, it.elems, { w: 460, sinCifra: true });

      var num = null, den = null, corregida = false;
      var btn = cont.querySelector('.tm-rc-btn'), previa = cont.querySelector('.tm-rc-previa');
      function pintarPrevia() {
        previa.innerHTML = (num && den)
          ? '<span class="tm-rc-num"><span>' + num + '</span><span>' + den + '</span></span>'
          : '<span class="tm-rc-vacia">Elige numerador y denominador…</span>';
        btn.classList.toggle('tm-listo', !!(num && den));
      }
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-rc-fichas'), function (fila) {
        var g = fila.getAttribute('data-g');
        fila.addEventListener('click', function (ev) {
          var c = ev.target.closest('.tm-rc-cifra');
          if (!c || corregida) return;
          Array.prototype.forEach.call(fila.querySelectorAll('.tm-rc-cifra'), function (x) { x.classList.remove('tm-sel'); });
          c.classList.add('tm-sel');
          if (g === 'num') num = c.getAttribute('data-v'); else den = c.getAttribute('data-v');
          pintarPrevia();
        });
      });

      btn.addEventListener('click', function () {
        if (!corregida) {
          if (!num || !den) return;
          corregida = true;
          var elegida = num + '/' + den;
          var ok = it.validos.indexOf(elegida) >= 0;
          if (ok) aciertos++;
          Array.prototype.forEach.call(cont.querySelectorAll('.tm-rc-cifra'), function (x) { x.disabled = true; });
          D().dibujarMedida(cont.querySelector('.tm-rc-dibujo > div'), it.compasBase, it.elems, { w: 460 });   // se revela la cifra real
          var fb = cont.querySelector('.tm-rc-fb');
          fb.hidden = false;
          fb.className = 'tm-rc-fb ' + (ok ? 'tm-ok' : 'tm-ko');
          var extra = ok && it.validos.length > 1
            ? ' También sería correcto ' + it.validos.filter(function (v) { return v !== elegida; }).join(' o ') + '.'
            : '';
          fb.innerHTML = '<strong>' + (ok ? '¡Correcto!' : 'No es correcto.') + '</strong>' + extra + ' ' + explicar(it);
          btn.textContent = pos + 1 < cola.length ? 'Siguiente' : 'Ver resultado';
          btn.classList.add('tm-listo');
        } else {
          pos++;
          if (pos < cola.length) pregunta(); else resultado();
        }
      });
      pintarPrevia();
    }

    function resultado() {
      var nota = aciertos / cola.length;
      var msg = nota === 1 ? '¡Perfecto! Lo dominas.' : nota >= 0.8 ? 'Muy bien: casi todo correcto.' : nota >= 0.5 ? 'Vas bien. Repasa las explicaciones y vuelve a intentarlo.' : 'Conviene repasar cuántos tiempos tiene cada compás antes de volver a intentarlo.';
      cont.innerHTML = '<div class="tm-rc-card tm-rc-res"><div class="tm-rc-nota">' + aciertos + '</div><div class="tm-rc-de">aciertos de ' + cola.length + '</div>'
        + '<div class="tm-rc-msg">' + msg + '</div>'
        + '<button type="button" class="tm-rc-otra" data-a="otra">Otra ronda</button>'
        + '<button type="button" class="tm-rc-otra tm-2" data-a="modo">Cambiar de grupo</button></div>';
      cont.querySelector('[data-a="otra"]').addEventListener('click', empezar);
      cont.querySelector('[data-a="modo"]').addEventListener('click', inicio);
    }

    inicio();
  };

  window.tmReconocerCompasTest = { equivalentes: equivalentes, generarLote: generarLote, explicar: explicar };
})();
