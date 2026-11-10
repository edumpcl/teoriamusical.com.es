/* Generador de fichas de escalas para imprimir.
   Uso: <div id="tmfe"></div><script>tmFichasEscalas('tmfe');</script>

   Es la versión a medida de las fichas en PDF (tools/generate-fichas-escalas.js):
   mismas 15 tónicas por tipo, misma armadura (la de la tonalidad mayor para Mayor,
   mixtas y mixolidia; la de la menor para las menores y la dórica), mismo arrastre
   de alteraciones en el compás y la melódica como una sola escala de 15 notas que
   sube y baja. Un pentagrama por escala.

   Cada hoja sale de una semilla («hoja n.º …»): con el enlace que se muestra se
   vuelve a obtener exactamente la misma, para reimprimirla o darla a toda la clase.
   La teoría se audita con: node tools/verificar-fichas-escalas.js --web */
(function () {
  'use strict';

  var EN = document.documentElement.lang === 'en';
  var T = function (es, en) { return EN ? en : es; };

  var ALT_ESCALA = T('Pentagrama con una escala', 'Staff with a scale');
  var LETRAS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
  var NAT = [0, 2, 4, 5, 7, 9, 11];
  var ES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
  var ACC_TXT = { '-1': '♭', '0': '', '1': '♯' };
  var ROJO = '#c0392b';

  /* 15 tónicas por tipo (tools/scale_keys.py). ARM va en paralelo: nº de
     alteraciones de la armadura y si son sostenidos o bemoles. */
  var TONICAS_MAY = [['c', 0], ['g', 0], ['d', 0], ['a', 0], ['e', 0], ['b', 0], ['f', 1], ['c', 1],
    ['f', 0], ['b', -1], ['e', -1], ['a', -1], ['d', -1], ['g', -1], ['c', -1]];
  var TONICAS_MEN = [['a', 0], ['e', 0], ['b', 0], ['f', 1], ['c', 1], ['g', 1], ['d', 1], ['a', 1],
    ['d', 0], ['g', 0], ['c', 0], ['f', 0], ['b', -1], ['e', -1], ['a', -1]];
  var ARM = [[0, '#'], [1, '#'], [2, '#'], [3, '#'], [4, '#'], [5, '#'], [6, '#'], [7, '#'],
    [1, 'b'], [2, 'b'], [3, 'b'], [4, 'b'], [5, 'b'], [6, 'b'], [7, 'b']];
  var VEX_SOST = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
  var VEX_BEM = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];
  var ORDEN_SOST = ['f', 'c', 'g', 'd', 'a', 'e', 'b'];
  var ORDEN_BEM = ['b', 'e', 'a', 'd', 'g', 'c', 'f'];

  var TIPOS = [
    { id: 'mayor', familia: 'mayor', nombre: 'Mayor', boton: 'Mayor natural', titulo: 'escalas mayores naturales', offsets: [0, 2, 4, 5, 7, 9, 11, 12] },
    { id: 'mixta-principal', familia: 'mayor', nombre: 'Mayor mixta principal', boton: 'Mixta principal', titulo: 'escalas mayores mixtas principales', offsets: [0, 2, 4, 5, 7, 8, 11, 12] },
    { id: 'mixta-secundaria', familia: 'mayor', nombre: 'Mayor mixta secundaria', boton: 'Mixta secundaria', titulo: 'escalas mayores mixtas secundarias', offsets: [0, 2, 4, 5, 7, 8, 10, 12] },
    { id: 'mixolidia', familia: 'mayor', nombre: 'mixolidia', boton: 'Mixolidia', titulo: 'escalas mixolidias', offsets: [0, 2, 4, 5, 7, 9, 10, 12] },
    { id: 'menor-natural', familia: 'menor', nombre: 'menor natural', boton: 'Natural', titulo: 'escalas menores naturales', offsets: [0, 2, 3, 5, 7, 8, 10, 12] },
    { id: 'menor-armonica', familia: 'menor', nombre: 'menor armónica', boton: 'Armónica', titulo: 'escalas menores armónicas', offsets: [0, 2, 3, 5, 7, 8, 11, 12] },
    { id: 'menor-melodica', familia: 'menor', nombre: 'menor melódica', boton: 'Melódica', titulo: 'escalas menores melódicas', melodica: true },
    { id: 'menor-dorica', familia: 'menor', nombre: 'dórica', boton: 'Dórica', titulo: 'escalas dóricas', offsets: [0, 2, 3, 5, 7, 9, 10, 12] }
  ];
  var TIPOS_EN = {
    'mayor': { nombre: 'major', boton: 'Natural major', titulo: 'natural major scales' },
    'mixta-principal': { nombre: 'harmonic major', boton: 'Harmonic major', titulo: 'harmonic major scales' },
    'mixta-secundaria': { nombre: 'melodic major', boton: 'Melodic major', titulo: 'melodic major scales' },
    'mixolidia': { nombre: 'Mixolydian', boton: 'Mixolydian', titulo: 'Mixolydian scales' },
    'menor-natural': { nombre: 'natural minor', boton: 'Natural', titulo: 'natural minor scales' },
    'menor-armonica': { nombre: 'harmonic minor', boton: 'Harmonic', titulo: 'harmonic minor scales' },
    'menor-melodica': { nombre: 'melodic minor', boton: 'Melodic', titulo: 'melodic minor scales' },
    'menor-dorica': { nombre: 'Dorian', boton: 'Dorian', titulo: 'Dorian scales' }
  };
  var NOTA_EN = { 'do': 'C', 're': 'D', 'mi': 'E', 'fa': 'F', 'sol': 'G', 'la': 'A', 'si': 'B' };
  /* Nombre que se muestra: 'do♯ menor armónica' -> 'C♯ harmonic minor' (en inglés la tónica va siempre en mayúscula) */
  function mostrarNombre(e) {
    if (!EN) return e.nombre;
    var m = /^(do|re|mi|fa|sol|la|si)([♯♭]?)/i.exec(e.nombre);
    return m ? NOTA_EN[m[1].toLowerCase()] + m[2] + ' ' + TIPOS_EN[e.tipo.id].nombre : e.nombre;
  }
  function nombreTipo(t) { return EN ? TIPOS_EN[t.id].nombre : t.nombre; }
  function tituloTipo(t) { return EN ? TIPOS_EN[t.id].titulo : t.titulo; }
  function botonTipo(t) { return EN ? TIPOS_EN[t.id].boton : t.boton; }
  var IDS = TIPOS.map(function (t) { return t.id; });
  var MAYORES = IDS.slice(0, 4), MENORES = IDS.slice(4);
  var MODOS = ['identificar', 'escribir', 'escribir-con-armadura'];

  /* nivel = alteraciones de la armadura; fa = proporción en clave de fa cuando se
     piden las dos claves. La progresiva es la de las fichas en PDF. */
  var DIFICULTADES = {
    pocas: [{ niveles: [0, 1, 2], fa: 0.5 }],
    progresiva: [{ niveles: [0, 1, 2], fa: 0 }, { niveles: [3, 4], fa: 0.35 }, { niveles: [5, 6, 7], fa: 0.5 }],
    muchas: [{ niveles: [3, 4, 5, 6, 7], fa: 0.5 }]
  };
  var MAX_EJERCICIOS = 32;

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* Grado a 'off' semitonos y 'paso' letras de la tónica (como scale_keys.note_for). */
  function nota(ton, off, paso) {
    var l = (ton.l + paso) % 7;
    var objetivo = ((NAT[ton.l] + ton.a + off) % 12 + 12) % 12;
    var a = ((objetivo - NAT[l]) % 12 + 12) % 12;
    if (a > 6) a -= 12;
    return { l: l, a: a, paso: paso };
  }

  function escala(tipo, ton) {
    if (tipo.melodica) {
      var sube = [0, 2, 3, 5, 7, 9, 11, 12];   // 6ª y 7ª elevadas
      var nat = [0, 2, 3, 5, 7, 8, 10, 12];    // al bajar, como la natural
      return sube.map(function (o, i) { return nota(ton, o, i); })
        .concat([6, 5, 4, 3, 2, 1, 0].map(function (i) { return nota(ton, nat[i], i); }));
    }
    return tipo.offsets.map(function (o, i) { return nota(ton, o, i); });
  }

  /* Tónica desde una línea adicional por debajo (Si3 en sol, Re2 en fa): la
     octava de arriba no pasa de una línea adicional. */
  function colocar(notas, ton, clave) {
    var base = clave === 'sol' ? 27 : 15;
    var idx0 = ton.l + 7 * Math.ceil((base - ton.l) / 7);
    return notas.map(function (n) {
      var oct = Math.floor((idx0 + n.paso) / 7);
      return { l: n.l, a: n.a, key: LETRAS[n.l] + '/' + oct };
    });
  }

  function armaduraDe(tipo, i) {
    var n = ARM[i][0], acc = ARM[i][1];
    var porLetra = {};
    (acc === '#' ? ORDEN_SOST : ORDEN_BEM).slice(0, n).forEach(function (l) { porLetra[l] = acc === '#' ? 1 : -1; });
    return { n: n, acc: acc, vex: acc === '#' ? VEX_SOST[n] : VEX_BEM[n], porLetra: porLetra };
  }

  /* Signo de cada nota: el compás arrastra las alteraciones por letra y octava,
     partiendo de la armadura (o de natural, si no hay); becuadro al cancelar. */
  function glifos(notas, porLetra) {
    var activo = {};
    return notas.map(function (n) {
      var cur = n.key in activo ? activo[n.key] : (porLetra[LETRAS[n.l]] || 0);
      activo[n.key] = n.a;
      var glyph = n.a === cur ? '' : n.a === 2 ? '##' : n.a === 1 ? '#' : n.a === -1 ? 'b' : n.a === -2 ? 'bb' : 'n';
      return { key: n.key, a: n.a, glyph: glyph };
    });
  }

  function nombreEscala(tipo, ton) {
    var t = ES[ton.l] + ACC_TXT[String(ton.a)];
    return (tipo.familia === 'menor' ? t.toLowerCase() : t) + ' ' + tipo.nombre;
  }

  /* o = { tipos: [...], modo, presentacion: 'mezcla'|'armadura'|'alteraciones',
           clave: 'sol'|'fa'|'ambas', dificultad: 'pocas'|'progresiva'|'muchas',
           total, semilla } */
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
    var tipos = TIPOS.filter(function (t) { return o.tipos.indexOf(t.id) >= 0; });
    var fases = DIFICULTADES[o.dificultad];
    var ambas = o.clave === 'ambas';
    var claves = ambas ? ['sol', 'fa'] : [o.clave];

    var out = [];
    var pendiente = 0;
    fases.forEach(function (f, fi) {
      var meta = Math.floor(o.total / fases.length) + (fi < o.total % fases.length ? 1 : 0) + pendiente;
      var enFa = ambas ? Math.round(meta * f.fa) : null;
      var casos = [];
      tipos.forEach(function (tipo) {
        (tipo.familia === 'mayor' ? TONICAS_MAY : TONICAS_MEN).forEach(function (t, i) {
          if (f.niveles.indexOf(ARM[i][0]) < 0) return;
          claves.forEach(function (clave) {
            // Regla dura: con las dos claves, la de fa no entra en el tramo inicial.
            if (ambas && clave === 'fa' && f.fa === 0) return;
            casos.push({ tipo: tipo, ton: { l: LETRAS.indexOf(t[0]), a: t[1] }, iTon: i, clave: clave });
          });
        });
      });

      /* Por costes: cuota de clave de fa, reparto de tipos, no repetir tónica y,
         sobre todo, no repetir la misma escala (aunque sea en otra clave). Nada de
         eso deja la hoja corta: cada caso sale una sola vez del montón y lo que
         falte en una fase pasa a la siguiente, nunca a una más fácil. */
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
          hoja.forEach(function (x) {
            if (x.tipo.id === c.tipo.id) coste += 2;
            if (x.ton.l === c.ton.l && x.ton.a === c.ton.a) coste += x.tipo.id === c.tipo.id ? 40 : 3;
          });
          if (coste < mejorCoste) { mejorCoste = coste; mejor = idx; }
        });
        elegidos.push(libres.splice(mejor, 1)[0]);
      }
      pendiente = meta - elegidos.length;
      barajar(elegidos).forEach(function (c) { c.fase = fi; out.push(c); });
    });

    // En identificar: con armadura, sin ella o la mitad de cada, como se pida.
    var conArm = o.modo === 'identificar'
      ? (o.presentacion === 'armadura' ? out.map(function () { return true; })
        : o.presentacion === 'alteraciones' ? out.map(function () { return false; })
          : barajar(out.map(function (_, i) { return i % 2 === 0; })))
      : out.map(function () { return o.modo === 'escribir-con-armadura'; });

    return out.map(function (c, i) {
      var arm = armaduraDe(c.tipo, c.iTon);
      return {
        tipo: { id: c.tipo.id, familia: c.tipo.familia, nombre: c.tipo.nombre },
        nombre: nombreEscala(c.tipo, c.ton),
        clave: c.clave, fase: c.fase, nivel: arm.n, conArmadura: conArm[i],
        arm: { n: arm.n, acc: arm.acc, vex: arm.vex },
        notas: glifos(colocar(escala(c.tipo, c.ton), c.ton, c.clave), conArm[i] ? arm.porLetra : {})
      };
    });
  }

  /* ----------------------------------------------------------------- dibujo */

  /* Un pentagrama por escala, a ancho completo, dibujado con Verovio: una escala de 8 notas y la melódica de 15 quedan igual de ordenadas
     (huecos invisibles al final hasta llenar el ancho), y ficha y solución comparten maqueta (los signos los fija el ejercicio: `mostrar`). */
  function dibujarEscala(div, ej, opts) {
    var T = window.tmNotacion;
    div.innerHTML = '';
    var H = 104, TOPE = 34;
    div.style.height = H + 'px';
    var notas = opts.notas ? ej.notas.map(function (n) {
      var q = n.key.split('/');
      return { key: q[0] + (n.a > 0 ? '##'.slice(0, n.a) : n.a < 0 ? 'bb'.slice(0, -n.a) : '') + '/' + q[1], d: 'w', mostrar: !!n.glyph };
    }) : [];
    var fila = { clave: ej.clave === 'sol' ? 'sol' : 'fa', armadura: opts.firma && ej.arm.n > 0 ? (ej.arm.acc === '#' ? ej.arm.n : -ej.arm.n) : 0, compases: [notas] };
    var res = T.dibujarAAncho(div, fila, opts.w - 10, { escala: 1.0, llenar: true, id: 'fes', alt: ALT_ESCALA });
    var svg = res.elemento;
    svg.style.display = 'block'; svg.style.height = 'auto';
    svg.style.width = '100%';
    // el dibujo se escala al ancho de la hoja: el hueco de arriba y el alto de la caja se escalan con él (la línea superior siempre en el mismo sitio)
    var esc = svg.getBoundingClientRect().width / Number(svg.getAttribute('width'));
    svg.style.margin = Math.round(TOPE * esc - T.geometria(svg).lineas[0]) + 'px 0 0';
    div.style.height = Math.round(H * esc) + 'px';
    // En las soluciones de escribir, lo que escribe el alumno (armadura y notas) va en rojo.
    if (opts.rojo) {
      Array.prototype.forEach.call(svg.querySelectorAll('.note, .keySig'), function (g) {
        g.setAttribute('fill', ROJO);
        Array.prototype.forEach.call(g.querySelectorAll('*'), function (el) { el.setAttribute('fill', ROJO); });
      });
    }
  }

  /* --------------------------------------------------------------------- UI */

  var CSS = [
    '.tm-fe{background:#fff;border:1px solid #d8d0b8;border-radius:12px;padding:20px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,.05);}',
    '.tm-fe::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:#8b6914;border-radius:12px 12px 0 0;}',
    '.tm-fe-fila-op{margin-bottom:14px;}',
    '.tm-fe-fila-op[hidden],.tm-fe-aviso[hidden],.tm-fe-enlace[hidden]{display:none!important;}',
    '.tm-fe-lbl{display:block;font-size:.82rem;font-weight:700;color:#1a1a2e;margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em;}',
    '.tm-fe-sub{display:block;font-size:.8rem;color:#666;margin:6px 0 4px;}',
    '.tm-fe-ops{display:flex;flex-wrap:wrap;gap:8px;}',
    '.tm-fe-op{font-size:.9rem;font-weight:600;padding:9px 14px;border:1px solid #d8d0b8;background:#f5f2ea;color:#1a1a2e;border-radius:6px;cursor:pointer;font-family:inherit;min-height:40px;}',
    '.tm-fe-op[aria-pressed="true"]{background:#8b6914;color:#fff;border-color:#8b6914;}',
    '.tm-fe-atajo{background:#fff;font-weight:500;font-size:.85rem;}',
    '.tm-fe-otro{display:inline-flex;align-items:center;gap:6px;font-size:.85rem;color:#555;}',
    '.tm-fe-num{width:72px;font-size:.9rem;font-weight:700;font-family:inherit;padding:9px 8px;border:1px solid #d8d0b8;border-radius:6px;background:#fff;color:#1a1a2e;min-height:40px;}',
    '.tm-fe-acciones{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px;padding-top:16px;border-top:1px solid #eee6d6;}',
    '.tm-fe-btn{font-size:.95rem;font-weight:700;padding:12px 20px;border-radius:8px;border:1px solid transparent;cursor:pointer;font-family:inherit;}',
    '.tm-fe-btn-1{background:#8b6914;color:#fff;}',
    '.tm-fe-btn-2{background:#fff;color:#1a1a2e;border-color:#d8d0b8;}',
    '.tm-fe-aviso{font-size:.85rem;color:#8a6d1a;background:#fdf8ee;border-radius:6px;padding:8px 12px;margin-top:12px;}',
    '.tm-fe-enlace{font-size:.82rem;color:#666;margin:10px 0 0;}',
    '.tm-fe-hoja{margin-top:20px;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:16px 14px 10px;}',
    '.tm-fe-cab{display:flex;justify-content:space-between;align-items:baseline;gap:12px;border-bottom:2px solid #8b6914;padding-bottom:6px;margin-bottom:10px;flex-wrap:wrap;}',
    '.tm-fe-tit{font-weight:700;font-size:1rem;color:#1a1a2e;margin:0;}',
    '.tm-fe-ref{font-size:.75rem;color:#6f6f6f;}',
    '.tm-fe-instr{font-size:.85rem;color:#555;margin:0 0 4px;}',
    '.tm-fe-ley{font-size:.78rem;color:#686868;margin:0 0 10px;}',
    '.tm-fe-datos{display:none;}',
    '.tm-fe-fila{position:relative;border:1px solid #e8e0cc;border-radius:6px;padding:3px 6px 4px;margin-bottom:5px;break-inside:avoid;page-break-inside:avoid;}',
    '.tm-fe-fila svg{display:block;}',
    '.tm-fe-n{position:absolute;top:3px;left:7px;font-size:.72rem;font-weight:700;color:#85600a;}',
    '.tm-fe-pide{font-size:.9rem;margin:0 0 2px 22px;line-height:1.3;color:#1a1a1a;}',
    '.tm-fe-linea{display:flex;align-items:baseline;gap:6px;font-size:.85rem;margin:0 6px 2px;}',
    '.tm-fe-linea > span{flex:1;border-bottom:1px solid #9a9a9a;min-height:1.05em;}',
    '.tm-fe-linea .tm-fe-val{border:0;color:#c0392b;font-weight:700;}',
    /* Se imprime un CLON de la hoja colgado de <body> y el resto se quita con
       display:none (con visibility:hidden salían páginas en blanco). La
       impresión solo se activa desde el botón: Ctrl+P imprime la página entera. */
    '@media screen{.tm-fe-impresion{display:none!important;}}',
    '@media print{',
    '  body.tm-fe-print > *:not(.tm-fe-impresion){display:none!important;}',
    '  body.tm-fe-print .tm-fe-impresion{display:block!important;border:0;padding:0;margin:0;}',
    '  body.tm-fe-print .tm-fe-datos{display:flex!important;gap:18px;font-size:.78rem;color:#666;margin:4px 0 6px;}',
    '  body.tm-fe-print .tm-fe-datos span{flex:1;border-bottom:1px solid #bbb;}',
    /* Ocho escalas por cara de A4, como las fichas en PDF: en papel se aprieta. */
    '  body.tm-fe-print .tm-fe-cab{margin-bottom:4px;padding-bottom:3px;}',
    '  body.tm-fe-print .tm-fe-instr{font-size:.76rem;margin:0 0 2px;line-height:1.3;}',
    '  body.tm-fe-print .tm-fe-ley{font-size:.7rem;margin:0;}',
    '  body.tm-fe-print .tm-fe-fila{padding:1px 5px 2px;margin-bottom:3px;}',
    '  body.tm-fe-print .tm-fe-pide{font-size:.8rem;margin:0 0 1px 20px;}',
    '  body.tm-fe-print .tm-fe-linea{font-size:.78rem;margin:0 6px;line-height:1.2;}',
    '  body.tm-fe-print .tm-fe-linea > span{min-height:.9em;}',
    '  @page{size:A4;margin:10mm;}',
    '}'
  ].join('\n');

  window.tmFichasEscalasTest = { generarHoja: generarHoja, dibujarEscala: dibujarEscala, TIPOS: TIPOS, DIFICULTADES: DIFICULTADES, MODOS: MODOS };

  window.tmFichasEscalas = function (id, opciones) {
    var cont = document.getElementById(id);
    if (!cont || !window.tmNotacion) return;
    if (!window.tmNotacion.cargado()) {   // Verovio se carga bajo demanda
      window.tmNotacion.listo().then(function () { window.tmFichasEscalas(id, opciones); });
      return;
    }
    if (!document.getElementById('tm-fe-css')) {
      var st = document.createElement('style');
      st.id = 'tm-fe-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }

    var op = opciones || {};
    var estado = {
      tipos: op.tipos || IDS.slice(),
      modo: op.modo || 'identificar',
      presentacion: op.presentacion || 'mezcla',
      clave: op.clave || 'sol',
      dificultad: op.dificultad || 'progresiva',
      total: op.total || 8,
      semilla: 0,
      solucion: false
    };

    // ?hoja=…&t=…&m=…&p=…&c=…&d=…&n=… reproduce exactamente una hoja.
    var q = new URLSearchParams(window.location.search);
    var semillaURL = Number(q.get('hoja')) || null;
    if (semillaURL) {
      var t = (q.get('t') || '').split(',').filter(function (x) { return IDS.indexOf(x) >= 0; });
      if (t.length) estado.tipos = t;
      if (MODOS.indexOf(q.get('m')) >= 0) estado.modo = q.get('m');
      if (['mezcla', 'armadura', 'alteraciones'].indexOf(q.get('p')) >= 0) estado.presentacion = q.get('p');
      if (['sol', 'fa', 'ambas'].indexOf(q.get('c')) >= 0) estado.clave = q.get('c');
      if (DIFICULTADES[q.get('d')]) estado.dificultad = q.get('d');
      var nq = Math.round(Number(q.get('n')));
      if (nq >= 1) estado.total = Math.min(nq, MAX_EJERCICIOS);
    }

    function botones(grupo, lista, activo, extra) {
      return '<div class="tm-fe-ops" data-g="' + grupo + '">' + lista.map(function (o) {
        return '<button type="button" class="tm-fe-op' + (extra ? ' ' + extra : '') + '" data-v="' + o.v + '" aria-pressed="'
          + (activo(o.v) ? 'true' : 'false') + '">' + o.t + '</button>';
      }).join('') + '</div>';
    }
    function fila(lbl, html, clase) {
      return '<div class="tm-fe-fila-op' + (clase ? ' ' + clase : '') + '"><span class="tm-fe-lbl">' + lbl + '</span>' + html + '</div>';
    }
    function botonesTipos(ids) {
      return botones('tipos', TIPOS.filter(function (t) { return ids.indexOf(t.id) >= 0; })
        .map(function (t) { return { v: t.id, t: botonTipo(t) }; }), function (v) { return estado.tipos.indexOf(v) >= 0; });
    }
    var ATAJOS = { mayores: MAYORES, menores: MENORES, todas: IDS };

    cont.innerHTML = '<div class="tm-fe">'
      + fila(T('Qué escalas', 'Which scales'),
        '<span class="tm-fe-sub">' + T('Mayores', 'Major') + '</span>' + botonesTipos(MAYORES)
        + '<span class="tm-fe-sub">' + T('Menores', 'Minor') + '</span>' + botonesTipos(MENORES)
        + '<span class="tm-fe-sub">' + T('De golpe', 'All at once') + '</span>'
        + botones('atajo', [{ v: 'mayores', t: T('Todas las mayores', 'All major') }, { v: 'menores', t: T('Todas las menores', 'All minor') }, { v: 'todas', t: T('Mayores y menores', 'Major and minor') }],
          function () { return false; }, 'tm-fe-atajo'))
      + fila(T('Qué hay que hacer', 'What to do'), botones('modo', [{ v: 'identificar', t: T('Identificar la escala', 'Identify the scale') }, { v: 'escribir', t: T('Escribirla con alteraciones', 'Write it with accidentals') }, { v: 'escribir-con-armadura', t: T('Escribirla con armadura', 'Write it with a key signature') }],
        function (v) { return estado.modo === v; }))
      + fila(T('Cómo se presentan', 'How they are shown'), botones('presentacion', [{ v: 'mezcla', t: T('Mitad con armadura', 'Half with key signature') }, { v: 'armadura', t: T('Todas con armadura', 'All with key signature') }, { v: 'alteraciones', t: T('Todas sin armadura', 'All without key signature') }],
        function (v) { return estado.presentacion === v; }), 'tm-fe-solo-identificar')
      + fila(T('Clave', 'Clef'), botones('clave', [{ v: 'sol', t: T('Sol', 'Treble') }, { v: 'fa', t: T('Fa', 'Bass') }, { v: 'ambas', t: T('Sol y fa', 'Treble and bass') }],
        function (v) { return estado.clave === v; }))
      + fila(T('Alteraciones de la armadura', 'Accidentals in the key signature'), botones('dificultad', [{ v: 'pocas', t: T('Hasta 2', 'Up to 2') }, { v: 'progresiva', t: T('Progresiva', 'Progressive') }, { v: 'muchas', t: T('De 3 a 7', '3 to 7') }],
        function (v) { return estado.dificultad === v; }))
      + fila(T('Cuántas escalas', 'How many scales'), botones('total', [{ v: 4, t: '4' }, { v: 8, t: T('8 (hoja llena)', '8 (full sheet)') }, { v: 16, t: T('16 (dos hojas)', '16 (two sheets)') }],
        function (v) { return estado.total === Number(v); })
        .replace(/<\/div>$/, '<label class="tm-fe-otro">' + T('otro: ', 'other: ') + '<input type="number" class="tm-fe-num" min="1" max="'
          + MAX_EJERCICIOS + '" step="1" value="' + estado.total + '" aria-label="' + T('Número de escalas', 'Number of scales') + '"></label></div>'))
      + '<div class="tm-fe-acciones">'
      + '<button type="button" class="tm-fe-btn tm-fe-btn-1" data-a="generar">' + T('Generar ficha nueva', 'Generate new sheet') + '</button>'
      + '<button type="button" class="tm-fe-btn tm-fe-btn-2" data-a="soluciones">' + T('Ver soluciones', 'Show answers') + '</button>'
      + '<button type="button" class="tm-fe-btn tm-fe-btn-2" data-a="imprimir">' + T('Imprimir', 'Print') + '</button>'
      + '</div>'
      + '<div class="tm-fe-aviso" hidden></div>'
      + '<p class="tm-fe-enlace" hidden>' + T('Para volver a sacar esta misma hoja: ', 'To get this same sheet again: ') + '<a href="#"></a></p>'
      + '</div>'
      + '<div class="tm-fe-hoja"><div class="tm-fe-cab"><p class="tm-fe-tit"></p><span class="tm-fe-ref"></span></div>'
      + '<p class="tm-fe-instr"></p><p class="tm-fe-ley"></p>'
      + '<div class="tm-fe-datos"><span>' + T('Nombre:', 'Name:') + '</span><span>' + T('Curso:', 'Class:') + '</span><span>' + T('Fecha:', 'Date:') + '</span></div>'
      + '<div class="tm-fe-rejilla"></div></div>';

    var elAviso = cont.querySelector('.tm-fe-aviso');
    var elEnlace = cont.querySelector('.tm-fe-enlace');
    var elTit = cont.querySelector('.tm-fe-tit');
    var elRef = cont.querySelector('.tm-fe-ref');
    var elInstr = cont.querySelector('.tm-fe-instr');
    var elLey = cont.querySelector('.tm-fe-ley');
    var elRej = cont.querySelector('.tm-fe-rejilla');
    var elPres = cont.querySelector('.tm-fe-solo-identificar');
    var ejercicios = [];
    var anchoForzado = null;

    function textos() {
      var tipos = TIPOS.filter(function (t) { return estado.tipos.indexOf(t.id) >= 0; });
      var ids = tipos.map(function (t) { return t.id; }).join();
      var cuales = EN
        ? (tipos.length === 1 ? tituloTipo(tipos[0])
          : ids === IDS.join() ? 'major and minor scales'
            : ids === MAYORES.join() ? 'major scales'
              : ids === MENORES.join() ? 'minor scales' : 'scales')
        : (tipos.length === 1 ? tipos[0].titulo
          : ids === IDS.join() ? 'escalas mayores y menores'
            : ids === MAYORES.join() ? 'escalas mayores'
              : ids === MENORES.join() ? 'escalas menores' : 'escalas');
      var nombres = tipos.map(nombreTipo);
      var lista = nombres.length > 1 ? nombres.slice(0, -1).join(', ') + T(' y ', ' and ') + nombres[nombres.length - 1] : nombres[0];
      var melodica = tipos.some(function (t) { return t.melodica; }) ? T(' La menor melódica se escribe subiendo y bajando: 15 notas.', ' The melodic minor is written ascending and descending: 15 notes.') : '';
      var clave = estado.clave === 'ambas' ? T(' Fíjate primero en la clave.', ' Look at the clef first.') : '';
      var tit = EN
        ? (estado.modo === 'identificar' ? 'Identify ' : 'Write ') + cuales + (estado.modo === 'escribir-con-armadura' ? ' with a key signature' : '')
        : (estado.modo === 'identificar' ? 'Identificar ' : 'Escribir ') + cuales
          + (estado.modo === 'escribir-con-armadura' ? ' con armadura' : '');
      var instr;
      if (estado.modo === 'identificar') {
        var pres = EN
          ? { mezcla: ' Some have a key signature and others have the accidentals written before each note.', armadura: ' All have the key signature.', alteraciones: ' None has a key signature: the accidentals go before each note.' }
          : { mezcla: ' Unas llevan armadura y otras las alteraciones delante de cada nota.', armadura: ' Todas llevan la armadura.', alteraciones: ' Ninguna lleva armadura: las alteraciones van delante de cada nota.' };
        instr = (tipos.length === 1
          ? T('Todas son ' + tituloTipo(tipos[0]) + ': escribe debajo de cada una su nombre, con la tónica.', 'All are ' + tituloTipo(tipos[0]) + ': write each one\u2019s name below it, with the tonic.')
          : T('Escribe debajo de cada escala su nombre: la tónica y el tipo (' + lista + ').', 'Write each scale\u2019s name below it: the tonic and the type (' + lista + ').'))
          + pres[estado.presentacion]
          + clave;
      } else if (estado.modo === 'escribir') {
        instr = T('Escribe en cada pentagrama la escala indicada, subiendo desde la tónica, sin armadura: cada alteración delante de su nota.',
          'On each staff, write the scale indicated, ascending from the tonic, without a key signature: each accidental before its note.') + melodica + clave;
      } else {
        var familias = {};
        tipos.forEach(function (t) { familias[t.familia] = true; });
        var regla = familias.mayor && familias.menor
          ? T('Las mayores, las mixtas y la mixolidia llevan la armadura de su tonalidad mayor; las menores y la dórica, la de su tonalidad menor.',
            'The major, harmonic major, melodic major and Mixolydian scales use the key signature of their major key; the minor and Dorian scales, that of their minor key.')
          : familias.menor ? T('Todas llevan la armadura de su tonalidad menor.', 'All use the key signature of their minor key.')
            : T('Todas llevan la armadura de su tonalidad mayor.', 'All use the key signature of their major key.');
        instr = T('Escribe primero la armadura y después la escala, subiendo desde la tónica. Escribe solo las alteraciones que no estén en la armadura. ',
          'First write the key signature, then the scale, ascending from the tonic. Write only the accidentals that are not in the key signature. ') + regla + melodica + clave;
      }
      var enClave = estado.clave === 'sol' ? T(', en clave de sol', ', in treble clef') : estado.clave === 'fa' ? T(', en clave de fa', ', in bass clef') : T(', en clave de sol y de fa', ', in treble and bass clef');
      var ley = {
        pocas: T('Tonalidades de hasta dos alteraciones en la armadura' + enClave + '.', 'Keys with up to two accidentals in the key signature' + enClave + '.'),
        muchas: T('Tonalidades de tres a siete alteraciones en la armadura' + enClave + '.', 'Keys with three to seven accidentals in the key signature' + enClave + '.'),
        progresiva: estado.clave === 'ambas'
          ? T('De menos a más: armaduras con pocas alteraciones en clave de sol, y después más alteraciones y la clave de fa.',
            'From easier to harder: key signatures with few accidentals in treble clef, then more accidentals and the bass clef.')
          : T('De menos a más: primero armaduras con pocas alteraciones y después con más' + enClave + '.',
            'From easier to harder: first key signatures with few accidentals, then with more' + enClave + '.')
      }[estado.dificultad];
      return { tit: tit, instr: instr, ley: ley };
    }

    function pintar() {
      var ancho = elRej.clientWidth || 700;
      // Ancho lógico del pentagrama: el SVG se escala al de la hoja. En el móvil no
      // baja de 600 para que la melódica con siete alteraciones no se apelotone.
      var W = anchoForzado || Math.max(600, Math.min(860, Math.round(ancho)));
      var escribir = estado.modo !== 'identificar';
      elRej.innerHTML = ejercicios.map(function (e, i) {
        var html = '<div class="tm-fe-fila"><span class="tm-fe-n">' + (i + 1) + '</span>';
        if (escribir) html += '<p class="tm-fe-pide"><b>' + mostrarNombre(e) + '</b></p>';
        html += '<div class="tm-fe-svg"></div>';
        if (!escribir) {
          html += '<p class="tm-fe-linea"><b>' + T('Escala:', 'Scale:') + '</b>'
            + (estado.solucion ? '<span class="tm-fe-val">' + mostrarNombre(e) + '</span>' : '<span></span>') + '</p>';
        }
        return html + '</div>';
      }).join('');
      Array.prototype.forEach.call(elRej.querySelectorAll('.tm-fe-svg'), function (div, i) {
        var e = ejercicios[i];
        dibujarEscala(div, e, {
          w: W,
          notas: !escribir || estado.solucion,
          firma: escribir ? estado.solucion && e.conArmadura : e.conArmadura,
          rojo: escribir && estado.solucion
        });
      });
    }

    function avisar(texto) { elAviso.hidden = !texto; elAviso.textContent = texto || ''; }

    function marcarAtajos() {
      var ids = estado.tipos.slice().sort().join();
      Array.prototype.forEach.call(cont.querySelectorAll('[data-g="atajo"] .tm-fe-op'), function (b) {
        b.setAttribute('aria-pressed', ATAJOS[b.getAttribute('data-v')].slice().sort().join() === ids ? 'true' : 'false');
      });
      Array.prototype.forEach.call(cont.querySelectorAll('[data-g="tipos"] .tm-fe-op'), function (b) {
        b.setAttribute('aria-pressed', estado.tipos.indexOf(b.getAttribute('data-v')) >= 0 ? 'true' : 'false');
      });
      elPres.hidden = estado.modo !== 'identificar';
    }

    function generar(semilla) {
      marcarAtajos();
      if (!estado.tipos.length) {
        avisar(T('Elige al menos un tipo de escala.', 'Choose at least one type of scale.'));
        return;
      }
      estado.semilla = semilla || Math.floor(Math.random() * 90000 + 10000);
      estado.solucion = false;
      cont.querySelector('[data-a="soluciones"]').textContent = T('Ver soluciones', 'Show answers');

      ejercicios = generarHoja(estado);
      avisar(ejercicios.length < estado.total
        ? T('Con estas opciones solo hay ' + ejercicios.length + ' escalas distintas, así que la ficha lleva esas.', 'With these options there are only ' + ejercicios.length + ' different scales, so the sheet has those.') : '');

      var t = textos();
      elTit.textContent = t.tit;
      elInstr.textContent = t.instr;
      elLey.textContent = t.ley;
      elRef.textContent = 'teoriamusical.com.es · ' + T('hoja n.º ', 'sheet no. ') + estado.semilla;

      // Orden fijo de los tipos en el enlace: el mismo enlace para la misma hoja.
      var tiposURL = IDS.filter(function (x) { return estado.tipos.indexOf(x) >= 0; });
      var params = '?hoja=' + estado.semilla + '&t=' + tiposURL.join(',') + '&m=' + estado.modo
        + (estado.modo === 'identificar' ? '&p=' + estado.presentacion : '')
        + '&c=' + estado.clave + '&d=' + estado.dificultad + '&n=' + estado.total;
      var a = elEnlace.querySelector('a');
      a.href = window.location.pathname + params + '#fichas';
      a.textContent = T('hoja n.º ', 'sheet no. ') + estado.semilla;
      elEnlace.hidden = !ejercicios.length;

      pintar();
    }

    var esperaNum;
    cont.addEventListener('input', function (ev) {
      var campo = ev.target.closest('.tm-fe-num');
      if (!campo) return;
      clearTimeout(esperaNum);
      esperaNum = setTimeout(function () {
        var n = Math.round(Number(campo.value));
        if (!n || n < 1) return;
        n = Math.min(n, MAX_EJERCICIOS);
        if (n !== Number(campo.value)) campo.value = n;
        estado.total = n;
        Array.prototype.forEach.call(cont.querySelectorAll('[data-g="total"] .tm-fe-op'), function (b) {
          b.setAttribute('aria-pressed', Number(b.getAttribute('data-v')) === n ? 'true' : 'false');
        });
        generar();
      }, 500);
    });

    cont.addEventListener('click', function (ev) {
      var op = ev.target.closest('.tm-fe-op');
      if (op) {
        var grupo = op.parentElement.getAttribute('data-g');
        var v = op.getAttribute('data-v');
        if (grupo === 'tipos') {
          var i = estado.tipos.indexOf(v);
          if (i >= 0) estado.tipos.splice(i, 1); else estado.tipos.push(v);
        } else if (grupo === 'atajo') {
          estado.tipos = ATAJOS[v].slice();
        } else {
          estado[grupo] = grupo === 'total' ? Number(v) : v;
          if (grupo === 'total') cont.querySelector('.tm-fe-num').value = estado.total;
          Array.prototype.forEach.call(op.parentElement.querySelectorAll('.tm-fe-op'), function (b) {
            b.setAttribute('aria-pressed', b === op ? 'true' : 'false');
          });
        }
        window.tmNotacion.trasPintar(generar);   // INP: dibujar tras el pintado
        return;
      }
      var btn = ev.target.closest('[data-a]');
      if (!btn) return;
      var accion = btn.getAttribute('data-a');
      if (accion === 'generar') window.tmNotacion.trasPintar(generar);
      else if (accion === 'soluciones') {
        estado.solucion = !estado.solucion;
        btn.textContent = estado.solucion ? T('Ocultar soluciones', 'Hide answers') : T('Ver soluciones', 'Show answers');
        window.tmNotacion.trasPintar(pintar);
      } else if (accion === 'imprimir') {
        window.tmNotacion.trasPintar(function () {   // INP: redibujar al A4 tras el pintado; el navegador permite print() poco después del clic
          prepararImpresion();
          window.print();
          if (!('onafterprint' in window)) setTimeout(terminarImpresion, 1000);
        });
      }
    });

    /* Al imprimir, la hoja se redibuja al ancho de las fichas en PDF y se clona
       como hija directa de <body>. Se hace antes de print() y no en beforeprint,
       para no depender de ese evento. */
    function prepararImpresion() {
      anchoForzado = 860;
      pintar();
      var viejo = document.querySelector('.tm-fe-impresion');
      if (viejo) viejo.parentNode.removeChild(viejo);
      var clon = cont.querySelector('.tm-fe-hoja').cloneNode(true);
      clon.classList.add('tm-fe-impresion');
      document.body.appendChild(clon);
      document.body.classList.add('tm-fe-print');
    }
    function terminarImpresion() {
      document.body.classList.remove('tm-fe-print');
      var clon = document.querySelector('.tm-fe-impresion');
      if (clon) clon.parentNode.removeChild(clon);
      if (anchoForzado !== null) { anchoForzado = null; pintar(); }
    }
    window.addEventListener('afterprint', function () {
      if (document.body.classList.contains('tm-fe-print')) terminarImpresion();
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
