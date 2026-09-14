/* Generador de fichas de acordes tríada para imprimir.
   Uso: <div id="tmfa"></div><script>tmFichasAcordes('tmfa');</script>

   Es la versión con opciones de las fichas en PDF (tools/generate-fichas-acordes.js):
   mismas reglas de colocación, mismos nombres que los tests de /ejercicios/acordes/
   y la misma idea de «escribir», donde se da la nota más grave y se añaden las
   otras dos. Solo hace fichas: la práctica en pantalla ya la cubren los tests.

   Cada hoja sale de una semilla («hoja n.º …»): con el enlace que se muestra se
   vuelve a obtener exactamente la misma, para reimprimirla o darla a toda la clase.
   La teoría se audita con: node tools/verificar-fichas-acordes.js --web */
(function () {
  'use strict';

  var LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
  var SEMI = [0, 2, 4, 5, 7, 9, 11];
  var ES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
  var ACC_TXT = { '-2': '♭♭', '-1': '♭', '0': '', '1': '♯', '2': '♯♯' };
  var ACC_VF = { '-2': 'bb', '-1': 'b', '0': '', '1': '#', '2': '##' };

  var TIPOS = [
    { id: 'mayor', t3: 4, t5: 7, nombre: 'Perfecta Mayor', corto: 'PM' },
    { id: 'menor', t3: 3, t5: 7, nombre: 'Perfecta menor', corto: 'Pm' },
    { id: 'dis', t3: 3, t5: 6, nombre: '5ª Disminuida', corto: '5dis' },
    { id: 'aum', t3: 4, t5: 8, nombre: '5ª Aumentada', corto: '5Aum' }
  ];
  var INV_NOMBRE = ['Fundamental', '1ª inversión', '2ª inversión'];
  var INV_CORTO = ['fund.', '1ª inv.', '2ª inv.'];
  var MAX_EJERCICIOS = 60;

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* Todas las tríadas: fundamental con como mucho una alteración, tercera y
     quinta con como mucho dos. nivel = alteración más fuerte del acorde. */
  function acordesPosibles() {
    var out = [];
    for (var l = 0; l < 7; l++) {
      for (var a = -1; a <= 1; a++) {
        TIPOS.forEach(function (tipo) {
          var l3 = (l + 2) % 7, l5 = (l + 4) % 7;
          var a3 = tipo.t3 - (SEMI[l3] - SEMI[l] + 12) % 12 + a;
          var a5 = tipo.t5 - (SEMI[l5] - SEMI[l] + 12) % 12 + a;
          if (Math.abs(a3) > 2 || Math.abs(a5) > 2) return;
          out.push({
            tipo: tipo,
            miembros: [{ l: l, a: a }, { l: l3, a: a3 }, { l: l5, a: a5 }],
            nivel: Math.max(Math.abs(a), Math.abs(a3), Math.abs(a5))
          });
        });
      }
    }
    return out;
  }

  /* Nota grave desde una línea adicional por debajo (Si3 en sol, Re2 en fa) y
     las otras dos apiladas encima: la nota aguda no pasa nunca de la quinta
     línea, y así los bemoles de arriba no se salen de la celda. */
  function voicing(miembros, inv, clave) {
    var base = clave === 'sol' ? 27 : 15;
    var notas = [], previo = -Infinity;
    [0, 1, 2].forEach(function (k) {
      var m = miembros[(inv + k) % 3];
      var desde = k === 0 ? base : previo + 1;
      var idx = m.l + 7 * Math.ceil((desde - m.l) / 7);
      previo = idx;
      var oct = Math.floor(idx / 7);
      notas.push({ key: LETRAS[m.l] + '/' + oct, acc: ACC_VF[String(m.a)] });
    });
    return notas;
  }

  /* o = { tipos: ['mayor', ...], invs: [0, 1, 2], clave: 'sol'|'fa'|'ambas',
           dificultad: 'naturales'|'progresiva'|'alteradas', total, semilla } */
  function generarHoja(o) {
    var rnd = mulberry32(o.semilla);
    function barajar(arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(rnd() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }
    var todos = acordesPosibles().filter(function (c) { return o.tipos.indexOf(c.tipo.id) >= 0; });
    var fases = o.dificultad === 'naturales' ? [{ niveles: [0], fa: 0.5 }]
      : o.dificultad === 'alteradas' ? [{ niveles: [1, 2], fa: 0.5 }]
      : [{ niveles: [0], fa: 0 }, { niveles: [1], fa: 0.35 }, { niveles: [2], fa: 0.5 }];
    var claves = o.clave === 'ambas' ? ['sol', 'fa'] : [o.clave];

    var out = [];
    var pendiente = 0;
    fases.forEach(function (f, fi) {
      var meta = Math.floor(o.total / fases.length) + (fi < o.total % fases.length ? 1 : 0) + pendiente;
      var enFa = o.clave === 'ambas' ? Math.round(meta * f.fa) : null;
      var casos = [];
      todos.forEach(function (c) {
        if (f.niveles.indexOf(c.nivel) < 0) return;
        claves.forEach(function (clave) {
          // Regla dura, no un coste: en la progresiva con las dos claves, la de fa
          // no entra en el tramo inicial aunque se acaben los acordes en sol (con
          // 60 acordes en fundamental pasaba). Lo que falte pasa a la fase siguiente.
          if (clave === 'fa' && f.fa === 0) return;
          o.invs.forEach(function (inv) {
            casos.push({ tipo: c.tipo, miembros: c.miembros, nivel: c.nivel, clave: clave, inv: inv });
          });
        });
      });

      /* Por costes, no por cortes: cuota de clave de fa, reparto de tipos y de
         posiciones y sin repetir fundamental del mismo tipo… pero nada de eso
         puede dejar la hoja corta. Repetido exacto no hay nunca: cada caso sale
         una sola vez del montón. Si una fase se queda sin acordes, lo que falta
         pasa a la siguiente; nunca se rellena con acordes más difíciles de los
         que se han pedido. */
      var elegidos = [];
      var libres = barajar(casos);
      while (elegidos.length < meta && libres.length) {
        var hoja = out.concat(elegidos);
        var nFa = elegidos.filter(function (x) { return x.clave === 'fa'; }).length;
        var mejor = 0, mejorCoste = Infinity;
        libres.forEach(function (c, idx) {
          var coste = 0;
          if (enFa !== null) {
            if (c.clave === 'fa' && nFa >= enFa) coste += 6;
            if (c.clave === 'sol' && elegidos.length - nFa >= meta - enFa) coste += 6;
          }
          coste += hoja.filter(function (x) { return x.tipo.id === c.tipo.id; }).length * 1.5;
          if (o.invs.length > 1) coste += hoja.filter(function (x) { return x.inv === c.inv; }).length * 1.5;
          if (hoja.some(function (x) {
            return x.tipo.id === c.tipo.id && x.miembros[0].l === c.miembros[0].l && x.miembros[0].a === c.miembros[0].a;
          })) coste += 4;
          if (coste < mejorCoste) { mejorCoste = coste; mejor = idx; }
        });
        elegidos.push(libres.splice(mejor, 1)[0]);
      }
      pendiente = meta - elegidos.length;
      barajar(elegidos).forEach(function (c) {
        out.push({
          // miembros se conserva: la función de costes de las fases siguientes lo
          // consulta para no repetir fundamental del mismo tipo.
          miembros: c.miembros,
          tipo: c.tipo, inv: c.inv, clave: c.clave, nivel: c.nivel, fase: fi,
          raiz: ES[c.miembros[0].l] + ACC_TXT[String(c.miembros[0].a)],
          notas: voicing(c.miembros, c.inv, c.clave)
        });
      });
    });
    return out;
  }

  /* ----------------------------------------------------------------- dibujo */

  function dibujarCelda(div, e, opts) {
    var V = Vex.Flow;
    div.innerHTML = '';
    var W = opts.w, H = 88;
    var r = new V.Renderer(div, V.Renderer.Backends.SVG);
    r.resize(W, H);
    var ctx = r.getContext();
    var clef = e.clave === 'sol' ? 'treble' : 'bass';
    var stave = new V.Stave(2, 3, W - 8, { space_above_staff_ln: 2 });
    stave.addClef(clef).setContext(ctx).draw();

    var soloGrave = opts.modo === 'escribir' && !opts.solucion;
    var notas = soloGrave ? e.notas.slice(0, 1) : e.notas;
    var sn = new V.StaveNote({ keys: notas.map(function (n) { return n.key; }), duration: 'w', clef: clef });
    var accs = [];
    notas.forEach(function (n, i) {
      if (!n.acc) return;
      accs[i] = new V.Accidental(n.acc);
      sn.addModifier(accs[i], i);
    });
    // En la solución de escribir, las dos notas añadidas van en rojo y la dada en negro.
    if (opts.modo === 'escribir' && opts.solucion) {
      [1, 2].forEach(function (i) {
        var st = { fillStyle: '#c0392b', strokeStyle: '#c0392b' };
        if (sn.setKeyStyle) sn.setKeyStyle(i, st);
        if (accs[i] && accs[i].setStyle) accs[i].setStyle(st);
      });
    }
    sn.setStave(stave);
    sn.addToModifierContext(new V.ModifierContext());
    var tc = new V.TickContext();
    tc.addTickable(sn);
    tc.preFormat();
    var x0 = stave.getNoteStartX(), fin = stave.getX() + stave.getWidth();
    tc.setX(x0 + (fin - x0) * 0.52 - x0);
    sn.setContext(ctx).draw();

    var svg = div.querySelector('svg');
    if (svg) { svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.style.width = '100%'; svg.style.height = 'auto'; }
  }

  /* --------------------------------------------------------------------- UI */

  var CSS = [
    '.tm-fa{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:20px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,.05);}',
    '.tm-fa::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-fa-fila{margin-bottom:14px;}',
    '.tm-fa-lbl{display:block;font-size:.82rem;font-weight:700;color:#1a1a2e;margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em;}',
    '.tm-fa-ops{display:flex;flex-wrap:wrap;gap:8px;}',
    '.tm-fa-op{font-size:.9rem;font-weight:600;padding:9px 14px;border:1px solid #d8d0b8;background:#f5f2ea;color:#1a1a2e;border-radius:6px;cursor:pointer;font-family:inherit;min-height:40px;}',
    '.tm-fa-op[aria-pressed="true"]{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-fa-otro{display:inline-flex;align-items:center;gap:6px;font-size:.85rem;color:#555;}',
    '.tm-fa-num{width:72px;font-size:.9rem;font-weight:700;font-family:inherit;padding:9px 8px;border:1px solid #d8d0b8;border-radius:6px;background:#fff;color:#1a1a2e;min-height:40px;}',
    '.tm-fa-acciones{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px;padding-top:16px;border-top:1px solid #eee6d6;}',
    '.tm-fa-btn{font-size:.95rem;font-weight:700;padding:12px 20px;border-radius:8px;border:1px solid transparent;cursor:pointer;font-family:inherit;}',
    '.tm-fa-btn-1{background:#8b6914;color:#fff;}',
    '.tm-fa-btn-2{background:#fff;color:#1a1a2e;border-color:#d8d0b8;}',
    '.tm-fa-aviso{font-size:.85rem;color:#8a6d1a;background:#fdf8ee;border-radius:6px;padding:8px 12px;margin-top:12px;}',
    '.tm-fa-aviso[hidden],.tm-fa-enlace[hidden]{display:none!important;}',
    '.tm-fa-enlace{font-size:.82rem;color:#666;margin:10px 0 0;}',
    '.tm-fa-hoja{margin-top:20px;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:16px 14px 10px;}',
    '.tm-fa-cab{display:flex;justify-content:space-between;align-items:baseline;gap:12px;border-bottom:2px solid #8b6914;padding-bottom:6px;margin-bottom:10px;flex-wrap:wrap;}',
    '.tm-fa-tit{font-weight:700;font-size:1rem;color:#1a1a2e;margin:0;}',
    '.tm-fa-ref{font-size:.75rem;color:#8a8a8a;}',
    '.tm-fa-instr{font-size:.85rem;color:#555;margin:0 0 10px;}',
    '.tm-fa-datos{display:none;}',
    '.tm-fa-rejilla{display:grid;grid-template-columns:repeat(var(--tm-fa-cols,3),1fr);gap:6px 10px;}',
    '.tm-fa-celda{position:relative;border:1px solid #e8e0cc;border-radius:6px;padding:3px 5px 5px;break-inside:avoid;page-break-inside:avoid;}',
    '.tm-fa-n{position:absolute;top:2px;left:6px;font-size:.72rem;font-weight:700;color:#9a7b28;}',
    '.tm-fa-pide{font-size:.85rem;text-align:center;margin:0;color:#1a1a1a;min-height:1.1em;}',
    '.tm-fa-linea{display:flex;align-items:baseline;gap:5px;font-size:.85rem;margin:2px 4px 0;}',
    '.tm-fa-linea > span{flex:1;border-bottom:1px solid #9a9a9a;min-height:1.05em;}',
    '.tm-fa-linea .tm-fa-val{border:0;color:#c0392b;font-weight:700;text-align:center;}',
    /* La impresión solo se activa desde el botón (clase en <body>): con Ctrl+P
       normal la página se imprime entera, como cualquier otra. */
    /* Se imprime un CLON de la hoja colgado directamente de <body>, y el resto se
       quita con display:none. Con visibility:hidden lo oculto seguía ocupando
       sitio y la ficha salía en cuatro páginas, casi todas en blanco. */
    '@media screen{.tm-fa-impresion{display:none!important;}}',
    '@media print{',
    '  body.tm-fa-print > *:not(.tm-fa-impresion){display:none!important;}',
    '  body.tm-fa-print .tm-fa-impresion{display:block!important;border:0;padding:0;margin:0;}',
    '  body.tm-fa-print .tm-fa-datos{display:flex!important;gap:18px;font-size:.8rem;color:#666;margin:0 0 8px;}',
    '  body.tm-fa-print .tm-fa-datos span{flex:1;border-bottom:1px solid #bbb;}',
    /* Una hoja llena (21 acordes, 3×7) se quedaba unos píxeles por encima del A4
       y saltaba a una segunda página: en papel se aprieta un poco. */
    '  body.tm-fa-print .tm-fa-cab{margin-bottom:6px;padding-bottom:4px;}',
    '  body.tm-fa-print .tm-fa-instr{font-size:.78rem;margin:0 0 6px;}',
    '  body.tm-fa-print .tm-fa-rejilla{gap:4px 8px;}',
    '  body.tm-fa-print .tm-fa-celda{padding:2px 4px 3px;}',
    '  body.tm-fa-print .tm-fa-svg svg{width:90%!important;display:block;margin:0 auto;}',
    '  body.tm-fa-print .tm-fa-linea{font-size:.78rem;margin:0 4px;line-height:1.2;}',
    '  body.tm-fa-print .tm-fa-linea > span{min-height:.9em;}',
    '  @page{size:A4;margin:10mm;}',
    '}'
  ].join('\n');

  window.tmFichasAcordesTest = { generarHoja: generarHoja, TIPOS: TIPOS };

  window.tmFichasAcordes = function (id, opciones) {
    var cont = document.getElementById(id);
    if (!cont || typeof Vex === 'undefined') return;
    if (!document.getElementById('tm-fa-css')) {
      var st = document.createElement('style');
      st.id = 'tm-fa-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    var op = opciones || {};
    var estado = {
      tipos: op.tipos || ['mayor', 'menor', 'dis', 'aum'],
      invs: op.invs || [0],
      modo: op.modo || 'analizar',
      clave: op.clave || 'sol',
      dificultad: op.dificultad || 'progresiva',
      total: op.total || 21,
      semilla: 0,
      solucion: false
    };

    // ?hoja=…&t=…&p=…&m=…&c=…&d=…&n=… reproduce exactamente una hoja.
    var q = new URLSearchParams(window.location.search);
    var semillaURL = Number(q.get('hoja')) || null;
    if (semillaURL) {
      var lista = function (v, validos, num) {
        if (!v) return null;
        var r = v.split(',').map(function (x) { return num ? Number(x) : x; })
          .filter(function (x) { return validos.indexOf(x) >= 0; });
        return r.length ? r : null;
      };
      estado.tipos = lista(q.get('t'), ['mayor', 'menor', 'dis', 'aum']) || estado.tipos;
      estado.invs = lista(q.get('p'), [0, 1, 2], true) || estado.invs;
      if (['analizar', 'escribir'].indexOf(q.get('m')) >= 0) estado.modo = q.get('m');
      if (['sol', 'fa', 'ambas'].indexOf(q.get('c')) >= 0) estado.clave = q.get('c');
      if (['naturales', 'progresiva', 'alteradas'].indexOf(q.get('d')) >= 0) estado.dificultad = q.get('d');
      var nq = Math.round(Number(q.get('n')));
      if (nq >= 1) estado.total = Math.min(nq, MAX_EJERCICIOS);
    }

    function botones(grupo, lista, activo) {
      return '<div class="tm-fa-ops" data-g="' + grupo + '">' + lista.map(function (o) {
        return '<button type="button" class="tm-fa-op" data-v="' + o.v + '" aria-pressed="'
          + (activo(o.v) ? 'true' : 'false') + '">' + o.t + '</button>';
      }).join('') + '</div>';
    }
    function fila(lbl, html) { return '<div class="tm-fa-fila"><span class="tm-fa-lbl">' + lbl + '</span>' + html + '</div>'; }

    cont.innerHTML = '<div class="tm-fa">'
      + fila('Qué tríadas', botones('tipos', TIPOS.map(function (t) { return { v: t.id, t: t.nombre }; }),
        function (v) { return estado.tipos.indexOf(v) >= 0; }))
      + fila('En qué posición', botones('invs', [0, 1, 2].map(function (i) { return { v: i, t: INV_NOMBRE[i] }; }),
        function (v) { return estado.invs.indexOf(Number(v)) >= 0; }))
      + fila('Qué hay que hacer', botones('modo', [{ v: 'analizar', t: 'Analizar el acorde' }, { v: 'escribir', t: 'Escribir el acorde' }],
        function (v) { return estado.modo === v; }))
      + fila('Clave', botones('clave', [{ v: 'sol', t: 'Sol' }, { v: 'fa', t: 'Fa' }, { v: 'ambas', t: 'Sol y fa' }],
        function (v) { return estado.clave === v; }))
      + fila('Dificultad', botones('dificultad', [{ v: 'naturales', t: 'Sin alteraciones' }, { v: 'progresiva', t: 'Progresiva' }, { v: 'alteradas', t: 'Con alteraciones' }],
        function (v) { return estado.dificultad === v; }))
      + fila('Cuántos acordes', botones('total', [{ v: 12, t: '12' }, { v: 21, t: '21 (hoja llena)' }, { v: 30, t: '30' }],
        function (v) { return estado.total === Number(v); })
        // Cantidad libre: en clase se piden cosas como «uno por alumno».
        .replace(/<\/div>$/, '<label class="tm-fa-otro">otro: <input type="number" class="tm-fa-num" min="1" max="'
          + MAX_EJERCICIOS + '" step="1" value="' + estado.total + '" aria-label="Número de acordes"></label></div>'))
      + '<div class="tm-fa-acciones">'
      + '<button type="button" class="tm-fa-btn tm-fa-btn-1" data-a="generar">Generar ficha nueva</button>'
      + '<button type="button" class="tm-fa-btn tm-fa-btn-2" data-a="soluciones">Ver soluciones</button>'
      + '<button type="button" class="tm-fa-btn tm-fa-btn-2" data-a="imprimir">Imprimir</button>'
      + '</div>'
      + '<div class="tm-fa-aviso" hidden></div>'
      + '<p class="tm-fa-enlace" hidden>Para volver a sacar esta misma hoja: <a href="#"></a></p>'
      + '</div>'
      + '<div class="tm-fa-hoja"><div class="tm-fa-cab"><p class="tm-fa-tit"></p><span class="tm-fa-ref"></span></div>'
      + '<div class="tm-fa-datos"><span>Nombre:</span><span>Curso:</span><span>Fecha:</span></div>'
      + '<p class="tm-fa-instr"></p><div class="tm-fa-rejilla"></div></div>';

    var elAviso = cont.querySelector('.tm-fa-aviso');
    var elEnlace = cont.querySelector('.tm-fa-enlace');
    var elTit = cont.querySelector('.tm-fa-tit');
    var elRef = cont.querySelector('.tm-fa-ref');
    var elInstr = cont.querySelector('.tm-fa-instr');
    var elRej = cont.querySelector('.tm-fa-rejilla');
    var ejercicios = [];
    var anchoForzado = null;

    function enQuePosicion() {
      var inv = estado.invs.slice().sort();
      if (inv.length === 3) return 'en las tres posiciones';
      if (inv.length === 1) return inv[0] === 0 ? 'en posición fundamental' : 'en ' + INV_NOMBRE[inv[0]];
      if (inv[0] === 0) return 'en fundamental y ' + INV_NOMBRE[inv[1]];
      return 'en 1ª y 2ª inversión';
    }

    function textos() {
      var tipos = TIPOS.filter(function (t) { return estado.tipos.indexOf(t.id) >= 0; })
        .map(function (t) { return t.nombre + ' (' + t.corto + ')'; });
      var lista = tipos.length > 1 ? tipos.slice(0, -1).join(', ') + ' o ' + tipos[tipos.length - 1] : tipos[0];
      var varias = estado.invs.length > 1;
      if (estado.modo === 'analizar') {
        return {
          tit: 'Analizar tríadas ' + enQuePosicion(),
          instr: 'Escribe debajo de cada acorde su tipo: ' + lista + (varias ? '; y su posición: fundamental, 1ª o 2ª inversión.' : '.')
            + (estado.clave === 'ambas' ? ' Fíjate primero en la clave.' : '')
        };
      }
      var dada = ['la nota dada es la fundamental: añade la 3ª y la 5ª', 'la nota dada es la 3ª: añade la 5ª y la fundamental', 'la nota dada es la 5ª: añade la fundamental y la 3ª'];
      return {
        tit: 'Escribir tríadas ' + enQuePosicion(),
        instr: 'Cada pentagrama trae la nota más grave del acorde. Añade las otras dos por encima para formar la tríada indicada'
          + (varias ? ' en la posición que se pide (en fundamental la nota dada es la fundamental, en 1ª inversión la 3ª y en 2ª inversión la 5ª).'
            : ': ' + dada[estado.invs[0]] + '.')
      };
    }

    function pintar() {
      var ancho = anchoForzado || elRej.clientWidth || 640;
      var cols = ancho >= 600 ? 3 : ancho >= 400 ? 2 : 1;
      elRej.style.setProperty('--tm-fa-cols', cols);
      var anchoCelda = Math.floor((ancho - (cols - 1) * 10) / cols) - 12;
      var varias = estado.invs.length > 1;
      elRej.innerHTML = ejercicios.map(function (e, i) {
        var hueco = function (v) { return estado.solucion ? '<span class="tm-fa-val">' + v + '</span>' : '<span></span>'; };
        var html = '<div class="tm-fa-celda"><span class="tm-fa-n">' + (i + 1) + '</span>';
        if (estado.modo === 'escribir') {
          html += '<p class="tm-fa-pide"><b>' + e.raiz + ' — ' + e.tipo.corto + '</b>' + (varias ? ' · ' + INV_CORTO[e.inv] : '') + '</p>';
        }
        html += '<div class="tm-fa-svg"></div>';
        if (estado.modo === 'analizar') {
          html += '<p class="tm-fa-linea"><b>Tipo:</b>' + hueco(e.tipo.nombre) + '</p>';
          if (varias) html += '<p class="tm-fa-linea"><b>Posición:</b>' + hueco(INV_NOMBRE[e.inv]) + '</p>';
        }
        return html + '</div>';
      }).join('');
      Array.prototype.forEach.call(elRej.querySelectorAll('.tm-fa-svg'), function (div, i) {
        dibujarCelda(div, ejercicios[i], { w: Math.max(170, anchoCelda), modo: estado.modo, solucion: estado.solucion });
      });
    }

    function avisar(texto) { elAviso.hidden = !texto; elAviso.textContent = texto || ''; }

    function generar(semilla) {
      if (!estado.tipos.length || !estado.invs.length) {
        avisar(!estado.tipos.length ? 'Elige al menos un tipo de tríada.' : 'Elige al menos una posición.');
        return;
      }
      estado.semilla = semilla || Math.floor(Math.random() * 90000 + 10000);
      estado.solucion = false;
      cont.querySelector('[data-a="soluciones"]').textContent = 'Ver soluciones';

      ejercicios = generarHoja(estado);
      if (!ejercicios.length) {
        avisar(estado.tipos.length === 1 && estado.tipos[0] === 'aum' && estado.dificultad === 'naturales'
          ? 'No existe ninguna tríada aumentada solo con notas naturales: elige otra dificultad o añade otro tipo.'
          : 'Con estas opciones no hay ningún acorde: amplía la selección.');
      } else if (ejercicios.length < estado.total) {
        avisar('Con estas opciones solo hay ' + ejercicios.length + ' acordes distintos, así que la ficha lleva esos.');
      } else {
        avisar('');
      }

      var t = textos();
      elTit.textContent = t.tit;
      elInstr.textContent = t.instr;
      elRef.textContent = 'teoriamusical.com.es · hoja n.º ' + estado.semilla;

      var params = '?hoja=' + estado.semilla + '&t=' + estado.tipos.join(',') + '&p=' + estado.invs.join(',')
        + '&m=' + estado.modo + '&c=' + estado.clave + '&d=' + estado.dificultad + '&n=' + estado.total;
      var a = elEnlace.querySelector('a');
      a.href = window.location.pathname + params + '#generador';
      a.textContent = 'hoja n.º ' + estado.semilla;
      elEnlace.hidden = !ejercicios.length;

      pintar();
    }

    var esperaNum;
    cont.addEventListener('input', function (ev) {
      var campo = ev.target.closest('.tm-fa-num');
      if (!campo) return;
      clearTimeout(esperaNum);
      esperaNum = setTimeout(function () {
        var n = Math.round(Number(campo.value));
        if (!n || n < 1) return;
        n = Math.min(n, MAX_EJERCICIOS);
        if (n !== Number(campo.value)) campo.value = n;
        estado.total = n;
        Array.prototype.forEach.call(cont.querySelectorAll('[data-g="total"] .tm-fa-op'), function (b) {
          b.setAttribute('aria-pressed', Number(b.getAttribute('data-v')) === n ? 'true' : 'false');
        });
        generar();
      }, 500);
    });

    cont.addEventListener('click', function (ev) {
      var op = ev.target.closest('.tm-fa-op');
      if (op) {
        var grupo = op.parentElement.getAttribute('data-g');
        var v = op.getAttribute('data-v');
        if (grupo === 'tipos' || grupo === 'invs') {
          var valor = grupo === 'invs' ? Number(v) : v;
          var i = estado[grupo].indexOf(valor);
          if (i >= 0) estado[grupo].splice(i, 1); else estado[grupo].push(valor);
          op.setAttribute('aria-pressed', i >= 0 ? 'false' : 'true');
        } else {
          estado[grupo] = grupo === 'total' ? Number(v) : v;
          if (grupo === 'total') cont.querySelector('.tm-fa-num').value = estado.total;
          Array.prototype.forEach.call(op.parentElement.querySelectorAll('.tm-fa-op'), function (b) {
            b.setAttribute('aria-pressed', b === op ? 'true' : 'false');
          });
        }
        generar();
        return;
      }
      var btn = ev.target.closest('[data-a]');
      if (!btn) return;
      var accion = btn.getAttribute('data-a');
      if (accion === 'generar') generar();
      else if (accion === 'soluciones') {
        estado.solucion = !estado.solucion;
        btn.textContent = estado.solucion ? 'Ocultar soluciones' : 'Ver soluciones';
        pintar();
      } else if (accion === 'imprimir') {
        prepararImpresion();
        window.print();
        if (!('onafterprint' in window)) setTimeout(terminarImpresion, 1000);
      }
    });

    /* Al imprimir, la hoja se redibuja al ancho del A4 (tres columnas aunque en
       el móvil se vea una) y se clona como hija directa de <body>. Se hace antes
       de llamar a print() y no en beforeprint: así no depende de ese evento. */
    function prepararImpresion() {
      anchoForzado = 700;
      pintar();
      var viejo = document.querySelector('.tm-fa-impresion');
      if (viejo) viejo.parentNode.removeChild(viejo);
      var clon = cont.querySelector('.tm-fa-hoja').cloneNode(true);
      clon.classList.add('tm-fa-impresion');
      document.body.appendChild(clon);
      document.body.classList.add('tm-fa-print');
    }
    function terminarImpresion() {
      document.body.classList.remove('tm-fa-print');
      var clon = document.querySelector('.tm-fa-impresion');
      if (clon) clon.parentNode.removeChild(clon);
      if (anchoForzado !== null) { anchoForzado = null; pintar(); }
    }
    window.addEventListener('afterprint', function () {
      if (document.body.classList.contains('tm-fa-print')) terminarImpresion();
    });

    var reajuste, anchoPrevio = elRej.clientWidth;
    window.addEventListener('resize', function () {
      clearTimeout(reajuste);
      reajuste = setTimeout(function () {
        if (!ejercicios.length || elRej.clientWidth === anchoPrevio) return;
        anchoPrevio = elRej.clientWidth;
        pintar();
      }, 250);
    });

    generar(semillaURL);
  };
})();
