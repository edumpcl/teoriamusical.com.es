/* ¿Cómo termina la melodía? — /ejercicios/final-tiempo-fuerte-y-debil/

   Uso: <div id="x"></div><script>tmFinal('x');</script>

   Decisión de Eduardo (21-09-2026): mismo formato que el ejercicio del comienzo
   (comienzo-tetico-anacrusico-acefalo): test con el FINAL de una melodía (los
   dos últimos compases, con doble barra final) y dos respuestas: final en
   tiempo fuerte (íctico) o en tiempo débil (posíctico).

   REGLA (página de teoría del sitio + respuestas de Eduardo): lo que decide es
   EN QUÉ TIEMPO EMPIEZA la última nota, no cuánto dura. Q = posición de la
   última nota dentro del último compás, contada desde el principio de ese
   compás:
     - Q = 0 (tiempo 1) ......................... FINAL EN TIEMPO FUERTE (íctico)
     - Q > 0 (cualquier otro punto) .............. FINAL EN TIEMPO DÉBIL (posíctico)
   El único tiempo fuerte es el 1: la última nota en el tiempo 3 de 4/4 (o de
   12/8) es final en tiempo débil, igual que un contratiempo dentro del tiempo 1.
   El último compás puede salir INCOMPLETO (compensa una anacrusa); su tiempo
   fuerte sigue siendo el primero, el del principio de ese compás. Detrás de la
   última nota puede haber silencios: no cambian el tipo.

   Niveles: 1 compases simples, la última nota llega hasta el final del compás;
   2 simples y compuestos, con silencios tras la última nota y último compás
   incompleto; 3 además contratiempos, figuras muy pequeñas y silencios ANTES de
   la última nota.

   Modelo: it = { nivel, tipo ('fuerte'|'debil'), forma ('completo'|'incompleto'),
   compas, tonalidad, compases: [{elems}, {elems}] } con los mismos elems que el
   ejercicio del comienzo (t0 contado desde el principio de cada compás; el
   último compás incompleto es más corto). La melodía acaba en la tónica.
   Se audita con tools/verificar-final-frase.js. Necesita
   completar-compas-engine.js y tipo-de-comienzo-engine.js (dibujo, ritmo y
   melodía). */
(function () {
  'use strict';

  function D() { return window.tmCompletarCompasData; }
  function C() { return window.tmComienzoTest; }

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

  var TIPOS = ['fuerte', 'debil'];
  var NOMBRE_TIPO = { fuerte: 'tiempo fuerte', debil: 'tiempo débil' };
  var ETIQUETA = { fuerte: 'Tiempo fuerte', debil: 'Tiempo débil' };
  var DURS = [4, 8, 12, 16, 24, 32, 48, 64, 96];
  var FIG_U = { 4: 'sc', 8: 'c', 12: 'cP', 16: 'n', 24: 'nP', 32: 'b', 48: 'bP', 64: 'r', 96: 'rP' };

  /* ¿Puede una figura de duración D empezar en Q sin cruzar la barra de un
     tiempo? (las de varios tiempos, solo si están alineadas). */
  function cabe(t, Q, D) {
    if (!FIG_U[D]) return false;
    if (D <= t) return (Q % t) + D <= t;
    if (Q % t !== 0) return false;
    if (D === 2 * t) return Q % (2 * t) === 0;
    return D % t === 0 && Q === 0;
  }

  function hayDescomp(len, nivel) {
    var d = C().DESCOMP[len];
    return !!d && d.some(function (x) { return x[1] <= nivel; });
  }
  /* ¿Se puede rellenar [desde, hasta) con figuras, cortando en los tiempos? */
  function celdasOk(t, desde, hasta, nivel) {
    var pos = desde;
    while (pos < hasta) {
      var fin = Math.min((Math.floor(pos / t) + 1) * t, hasta);
      if (!hayDescomp(fin - pos, nivel)) return false;
      pos = fin;
    }
    return true;
  }

  /* Silencios de [desde, hasta): las figuras más grandes que caben alineadas y,
     si no, un silencio por tiempo (o por parte de tiempo). */
  function silencios(compas, desde, hasta) {
    var t = D().COMPASES[compas].tiempo, pos = desde, out = [];
    function poner(u) { out.push({ f: FIG_U[u], s: true, u: u, t0: pos, p: null }); pos += u; }
    while (pos < hasta) {
      var hecho = false;
      [4, 3, 2].forEach(function (k) {
        if (!hecho && pos % t === 0 && pos + k * t <= hasta && cabe(t, pos, k * t)) { poner(k * t); hecho = true; }
      });
      if (hecho) continue;
      var fin = Math.min((Math.floor(pos / t) + 1) * t, hasta), L = fin - pos;
      if (L === 12) { poner(8); poner(4); }
      else if (L === 20) { poner(16); poner(4); }
      else poner(L);
    }
    return out;
  }

  /* Todas las posiciones/duraciones posibles de la última nota. */
  function candidatos(compas, nivel, tipo) {
    var d = D().COMPASES[compas], t = d.tiempo, T = t * d.tiempos, out = [];
    var paso = nivel === 1 ? t : nivel === 2 ? 8 : 4;
    var qs = [];
    if (tipo === 'fuerte') qs = [0]; else for (var q = paso; q < T; q += paso) qs.push(q);
    qs.forEach(function (Q) {
      if (!celdasOk(t, 0, Q, nivel)) return;
      DURS.forEach(function (Dur) {
        if (Q + Dur > T || !cabe(t, Q, Dur)) return;
        if (nivel === 1 && Q + Dur !== T) return;
        if (nivel === 2 && (Dur === 4 || Dur === 12)) return;
        out.push({ Q: Q, D: Dur, peso: ((Q + Dur) % t === 0) ? 3 : 1 });
      });
    });
    return out;
  }

  function silencioDeMentira(elems, t, A) {
    var cand = [];
    for (var i = 1; i < elems.length; i++) if (elems[i].u <= t && !elems[i].s) cand.push(i);
    if (cand.length) elems[A.uno(cand)].s = true;
  }

  function generarUno(o, rnd) {
    var A = azar(rnd), CT = C();
    var nivel = o.nivel || 1;
    var tipo = o.tipo || A.uno(TIPOS);
    var pool = A.barajar(o.compas ? [o.compas] : (nivel === 1 ? CT.SIMPLES : CT.TODOS));
    var compas, cands = [];
    for (var i = 0; i < pool.length && !cands.length; i++) { compas = pool[i]; cands = candidatos(compas, nivel, tipo); }
    var d = D().COMPASES[compas], t = d.tiempo, T = t * d.tiempos;
    var ponderados = [];
    cands.forEach(function (c) { for (var k = 0; k < c.peso; k++) ponderados.push(c); });
    var elegido = A.uno(ponderados), Q = elegido.Q, Dur = elegido.D;
    var tonalidad = A.uno(nivel === 1 ? CT.TONALIDADES.slice(0, 4) : CT.TONALIDADES).id;

    var bar1 = CT.segmento(compas, 0, T, nivel, A);
    if (nivel === 3 && A.uno([0, 1]) === 1) silencioDeMentira(bar1, t, A);

    var pre = [];
    if (Q > 0) {
      if (nivel === 3 && A.uno([0, 1, 1]) === 0) pre = silencios(compas, 0, Q);
      else pre = CT.segmento(compas, 0, Q, nivel, A);
    }
    var ultima = { f: FIG_U[Dur], s: false, u: Dur, t0: Q, p: null };
    var fin = Q + Dur, forma = 'completo', cola = [];
    if (nivel >= 2 && fin < T && fin >= 8 && A.uno([0, 1, 1]) === 0) forma = 'incompleto';
    else if (fin < T) cola = silencios(compas, fin, T);
    var bar2 = pre.concat([ultima], cola);

    var it = { nivel: nivel, tipo: tipo, forma: forma, compas: compas, tonalidad: tonalidad, compases: [{ elems: bar1 }, { elems: bar2 }] };
    tonos(it, A);
    return it;
  }

  /* La melodía acaba en la tónica; se camina hacia atrás desde ella. */
  function tonos(it, A) {
    var CT = C(), notas = [];
    it.compases.forEach(function (c) { c.elems.forEach(function (e) { if (!e.s) notas.push(e); }); });
    var tonal = CT.TONALIDADES.filter(function (x) { return x.id === it.tonalidad; })[0];
    var fins = [];
    for (var p = CT.P_MIN + 1; p <= CT.P_MAX - 2; p++) if ((((p - tonal.tonica) % 7) + 7) % 7 === 0) fins.push(p);
    var pitches = CT.caminar(A.uno(fins), notas.length, A).reverse();
    notas.forEach(function (e, i) { e.p = pitches[i]; });
  }

  function generarLote(o, semilla) {
    var rnd = mulberry32(semilla === undefined ? Math.floor(Math.random() * 4294967296) : semilla);
    var A = azar(rnd), n = o.n || 8, tipos;
    for (var intento = 0; intento < 30; intento++) {
      var base = [];
      while (base.length < n) base = base.concat(TIPOS);
      tipos = A.barajar(base.slice(0, n));
      var seguidos = false;
      for (var i = 3; i < n; i++) if (tipos[i] === tipos[i - 1] && tipos[i] === tipos[i - 2] && tipos[i] === tipos[i - 3]) seguidos = true;
      if (!seguidos) break;
    }
    return tipos.map(function (tipo) { return generarUno({ nivel: o.nivel, tipo: tipo }, rnd); });
  }

  /* --------------------------------------------------------- Explicación */

  function ultimaNota(it) {
    var elems = it.compases[1].elems, r = null;
    elems.forEach(function (e) { if (!e.s) r = e; });
    return r;
  }

  function explicar(it) {
    var t = D().COMPASES[it.compas].tiempo, FIG = D().FIG;
    var e = ultimaNota(it), elems = it.compases[1].elems;
    var hayCola = elems[elems.length - 1].s;
    if (it.tipo === 'fuerte') {
      return 'Final en tiempo fuerte (íctico): la última nota empieza en el tiempo 1 del último compás, justo sobre el acento'
        + (it.forma === 'incompleto' ? ' (el compás está incompleto, pero su tiempo fuerte sigue siendo el primero)' : '')
        + (hayCola ? '. Después hay silencio, pero lo que cuenta es dónde empieza la nota' : '')
        + '. No importa cuánto dure: es una ' + FIG[e.f].nombre + '.';
    }
    var n = Math.floor(e.t0 / t) + 1;
    var donde = e.t0 % t === 0 ? 'en el tiempo ' + n : 'en la parte débil del tiempo ' + n;
    return 'Final en tiempo débil (posíctico): la última nota empieza ' + donde
      + ', después del acento: el único tiempo fuerte del compás es el 1'
      + (it.forma === 'incompleto' ? ' (el compás está incompleto, pero se cuenta desde su principio)' : '')
      + (hayCola ? '. Después hay silencio, pero lo que cuenta es dónde empieza la nota' : '') + '.';
  }

  function pista(correcto, elegido) {
    if (correcto === elegido) return '';
    if (correcto === 'fuerte') return ' Fíjate en dónde empieza la última nota, no en cuánto dura ni en si hay silencio después: aquí empieza justo en el tiempo 1.';
    return ' Aunque la última nota dure lo que dure, no empieza en el tiempo 1 sino después del acento, y solo el tiempo 1 es fuerte.';
  }

  /* ------------------------------------------------------------------ UI */

  var NIVELES = [
    { nivel: 1, t: 'Fácil', d: 'Compases simples; la última nota llega hasta el final del compás' },
    { nivel: 2, t: 'Medio', d: 'Simples y compuestos; silencios tras la última nota y último compás incompleto' },
    { nivel: 3, t: 'Difícil', d: 'Contratiempos, figuras pequeñas y silencios antes de la última nota' }
  ];
  var PREGUNTAS = 8;

  var CSS = [
    '.tm-fi{font-family:"Inter",system-ui,-apple-system,sans-serif;color:#333;}',
    '.tm-fi-card{background:#fff;border:1px solid #e8e0cc;border-radius:12px;padding:22px;margin:8px 0;box-shadow:0 2px 8px rgba(0,0,0,.05);}',
    '.tm-fi-tit{font-size:1.2rem;font-weight:700;color:#1a1208;margin-bottom:6px;}',
    '.tm-fi-sub{color:#514232;font-size:.9rem;margin-bottom:16px;line-height:1.5;}',
    '.tm-fi-recuerda{background:#faf7f2;border:1px solid #e8e0cc;border-radius:8px;padding:10px 14px;margin:0 0 16px;font-size:.85rem;line-height:1.55;color:#514232;}',
    '.tm-fi-recuerda b{color:#1a1208;}',
    '.tm-fi-modos{display:flex;flex-direction:column;gap:10px;}',
    '.tm-fi-modo{background:#faf7f2;border:2px solid #d8d0b8;border-radius:10px;padding:14px 18px;cursor:pointer;text-align:left;font-family:inherit;}',
    '.tm-fi-modo:hover{border-color:#8b6914;background:#fff8ee;}',
    '.tm-fi-modo strong{display:block;font-size:1rem;color:#1a1208;margin-bottom:3px;}',
    '.tm-fi-modo span{font-size:.82rem;color:#8b6914;}',
    '.tm-fi-prog{font-size:.8rem;color:#8b6914;font-weight:600;margin-bottom:5px;}',
    '.tm-fi-barra{background:#e4e9f2;border-radius:3px;height:6px;margin-bottom:16px;}',
    '.tm-fi-barra div{background:#8b6914;height:100%;border-radius:3px;transition:width .4s ease;}',
    '.tm-fi-preg{font-size:1.05rem;font-weight:700;color:#1a1208;text-align:center;margin:4px 0 8px;}',
    '.tm-fi-dibujo{display:flex;justify-content:center;margin:0 auto 12px;}',
    '.tm-fi-dibujo > div{width:100%;display:flex;justify-content:center;}',
    '.tm-fi-ops{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;}',
    '.tm-fi-op{flex:1 1 150px;max-width:220px;border:2px solid #d8d0b8;background:#fff;border-radius:10px;padding:12px 8px;min-height:48px;cursor:pointer;font-family:inherit;font-weight:700;font-size:1rem;color:#1a1208;}',
    '.tm-fi-op:hover:not([disabled]){border-color:#8b6914;background:#fff8ee;}',
    '.tm-fi-op.tm-ok{border-color:#27ae60!important;background:#27ae60!important;color:#fff!important;}',
    '.tm-fi-op.tm-ko{border-color:#c0392b!important;background:#c0392b!important;color:#fff!important;}',
    '.tm-fi-op.tm-buena{border-color:#27ae60!important;background:#e8f5e9!important;color:#2e7d32!important;}',
    '.tm-fi-op[disabled]{cursor:default;opacity:.9;}',
    '.tm-fi-fb{margin-top:14px;padding:12px 14px;border-radius:8px;font-size:.92rem;line-height:1.5;}',
    '.tm-fi-fb[hidden]{display:none;}',
    '.tm-fi-fb.tm-ok{background:#e8f5e9;color:#1f5d24;}',
    '.tm-fi-fb.tm-ko{background:#ffebee;color:#8e1f1f;}',
    '.tm-fi-btn{width:100%;padding:14px;margin-top:14px;border:none;border-radius:8px;font-size:1rem;font-weight:700;font-family:inherit;background:#8b6914;color:#fff;cursor:pointer;}',
    '.tm-fi-btn[hidden]{display:none;}',
    '.tm-fi-res{text-align:center;padding:10px 0;}',
    '.tm-fi-nota{font-size:3.5rem;font-weight:900;color:#8b6914;line-height:1;}',
    '.tm-fi-de{font-size:.9rem;color:#514232;margin:4px 0 16px;}',
    '.tm-fi-msg{font-size:1rem;color:#1a1208;font-weight:600;margin-bottom:20px;line-height:1.5;}',
    '.tm-fi-otra{background:#8b6914;color:#fff;border:none;border-radius:8px;padding:12px 24px;font-size:1rem;font-weight:700;cursor:pointer;font-family:inherit;margin:4px;}',
    '.tm-fi-otra.tm-2{background:#fff;color:#1a1208;border:1px solid #d8d0b8;}'
  ].join('');

  function css() {
    if (document.getElementById('tm-fi-css')) return;
    var st = document.createElement('style');
    st.id = 'tm-fi-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  window.tmFinal = function (id) {
    var cont = document.getElementById(id);
    if (!cont || !D() || !C()) return;
    css();
    cont.className = 'tm-fi';
    var cola = [], pos = 0, aciertos = 0, nivelActual = 1;
    window.tmFinalDebug = function () { return cola[pos] || null; };

    function inicio() {
      cont.innerHTML = '<div class="tm-fi-card"><div class="tm-fi-tit">¿Cómo termina la melodía?</div>'
        + '<div class="tm-fi-sub">Verás los dos últimos compases de una melodía. Decide si la frase termina en tiempo fuerte o en tiempo débil.</div>'
        + '<div class="tm-fi-recuerda">Fíjate en <b>en qué tiempo empieza la última nota</b>, no en cuánto dura. '
        + '<b>Tiempo fuerte (íctico):</b> empieza en el tiempo 1 del último compás. '
        + '<b>Tiempo débil (posíctico):</b> empieza después del tiempo fuerte.</div>'
        + '<div class="tm-fi-modos">' + NIVELES.map(function (m) {
          return '<button type="button" class="tm-fi-modo" data-n="' + m.nivel + '"><strong>' + m.t + '</strong><span>' + m.d + '</span></button>';
        }).join('') + '</div></div>';
      Array.prototype.forEach.call(cont.querySelectorAll('.tm-fi-modo'), function (b) {
        b.addEventListener('click', function () { empezar(Number(b.getAttribute('data-n'))); });
      });
    }

    function empezar(nivel) {
      nivelActual = nivel;
      cola = generarLote({ nivel: nivel, n: PREGUNTAS });
      pos = 0; aciertos = 0;
      pregunta();
    }

    function pregunta() {
      var it = cola[pos];
      cont.innerHTML = '<div class="tm-fi-card">'
        + '<div class="tm-fi-prog">Pregunta ' + (pos + 1) + ' de ' + cola.length + '</div>'
        + '<div class="tm-fi-barra"><div style="width:' + (pos / cola.length * 100) + '%"></div></div>'
        + '<div class="tm-fi-preg">¿En qué tiempo termina la frase?</div>'
        + '<div class="tm-fi-dibujo"><div></div></div>'
        + '<div class="tm-fi-ops">' + TIPOS.map(function (t) {
          return '<button type="button" class="tm-fi-op" data-t="' + t + '">' + ETIQUETA[t] + '</button>';
        }).join('') + '</div>'
        + '<div class="tm-fi-fb" hidden></div>'
        + '<button type="button" class="tm-fi-btn" hidden></button></div>';
      C().dibujar(cont.querySelector('.tm-fi-dibujo > div'), it, { final: true });

      var btn = cont.querySelector('.tm-fi-btn'), fb = cont.querySelector('.tm-fi-fb');
      var botones = Array.prototype.slice.call(cont.querySelectorAll('.tm-fi-op'));
      botones.forEach(function (b) {
        b.addEventListener('click', function () {
          var elegido = b.getAttribute('data-t'), ok = elegido === it.tipo;
          if (ok) aciertos++;
          botones.forEach(function (x) {
            x.disabled = true;
            var t = x.getAttribute('data-t');
            if (t === it.tipo) x.classList.add(t === elegido ? 'tm-ok' : 'tm-buena');
            else if (t === elegido) x.classList.add('tm-ko');
          });
          fb.hidden = false;
          fb.className = 'tm-fi-fb ' + (ok ? 'tm-ok' : 'tm-ko');
          fb.innerHTML = '<strong>' + (ok ? '¡Correcto!' : 'No es correcto, es final en ' + NOMBRE_TIPO[it.tipo] + '.') + '</strong> ' + explicar(it) + pista(it.tipo, elegido);
          btn.hidden = false;
          btn.textContent = pos + 1 < cola.length ? 'Siguiente' : 'Ver resultado';
        });
      });
      btn.addEventListener('click', function () {
        pos++;
        if (pos < cola.length) pregunta(); else resultado();
      });
    }

    function resultado() {
      var nota = aciertos / cola.length;
      var msg = nota === 1 ? '¡Perfecto! Distingues los finales sin dudar.' : nota >= 0.8 ? 'Muy bien: casi todo correcto.' : nota >= 0.5 ? 'Vas bien. Repasa las explicaciones y vuelve a intentarlo.' : 'Conviene repasar en qué tiempo empieza la última nota antes de volver a intentarlo.';
      cont.innerHTML = '<div class="tm-fi-card tm-fi-res"><div class="tm-fi-nota">' + aciertos + '</div><div class="tm-fi-de">aciertos de ' + cola.length + '</div>'
        + '<div class="tm-fi-msg">' + msg + '</div>'
        + '<button type="button" class="tm-fi-otra" data-a="otra">Otra ronda</button>'
        + '<button type="button" class="tm-fi-otra tm-2" data-a="modo">Cambiar de nivel</button></div>';
      cont.querySelector('[data-a="otra"]').addEventListener('click', function () { empezar(nivelActual); });
      cont.querySelector('[data-a="modo"]').addEventListener('click', inicio);
    }

    inicio();
  };

  window.tmFinalTest = { generarLote: generarLote, explicar: explicar, dibujar: function (div, it, opts) { opts = opts || {}; opts.final = true; C().dibujar(div, it, opts); }, TIPOS: TIPOS, ETIQUETA: ETIQUETA };
})();
