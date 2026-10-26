/* Filtros de /agenda-conciertos-bandas-orquestas/. El contenido ya está en el HTML (lo pinta tools/gen-conciertos.js);
   aquí solo se filtra por tipo y por fechas, y se ocultan los conciertos que ya han pasado desde la última regeneración.
   Las páginas de comunidad llevan además botones de fecha rápida y un rango «Desde / Hasta»; el filtro se guarda en la
   dirección (?desde=2026-11-01&hasta=2026-11-07&tipo=banda) para poder compartirlo.
   El portal (data-global en el formulario) busca en TODOS los conciertos próximos: con cualquier filtro activo carga
   conciertos.json, pinta los resultados y oculta el contenido estático; sin filtros, la página queda como está. */
(function () {
  'use strict';
  // Páginas sin filtros (agrupaciones): basta con ocultar lo que ya ha pasado desde la última regeneración
  var d0 = new Date(), hoy0 = d0.getFullYear() + '-' + ('0' + (d0.getMonth() + 1)).slice(-2) + '-' + ('0' + d0.getDate()).slice(-2);
  Array.prototype.forEach.call(document.querySelectorAll('.tm-co'), function (t) { if (t.getAttribute('data-fecha') < hoy0) t.hidden = true; });
  var form = document.getElementById('co-filtros');
  if (!form) return;
  var selTipo = document.getElementById('co-f-tipo');
  var selCcaa = document.getElementById('co-f-ccaa');
  var urlGlobal = form.getAttribute('data-global');
  var estatico = document.getElementById('co-estatico');
  var resultados = document.getElementById('co-resultados');
  var datos = null, promesa = null;
  var inDesde = document.getElementById('co-f-desde');
  var inHasta = document.getElementById('co-f-hasta');
  var contador = document.getElementById('co-contador');
  var vacio = document.getElementById('co-vacio');
  var chips = Array.prototype.slice.call(form.querySelectorAll('[data-rango]'));
  var tarjetas = Array.prototype.slice.call(document.querySelectorAll('.tm-co'));
  var ISO = /^\d{4}-\d{2}-\d{2}$/;

  function iso(d) {
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }
  function sumar(d, n) { var r = new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); return r; }
  var ahora = new Date();
  var hoy = iso(ahora);

  // Rangos rápidos, con la semana de lunes a domingo
  function rango(k) {
    var dow = (ahora.getDay() + 6) % 7;            // 0 = lunes ... 6 = domingo
    var domingo = sumar(ahora, 6 - dow);
    switch (k) {
      case 'hoy': return [hoy, hoy];
      case 'semana': return [hoy, iso(domingo)];
      case 'proxima': return [iso(sumar(domingo, 1)), iso(sumar(domingo, 7))];
      case 'finde': return [iso(dow >= 5 ? ahora : sumar(ahora, 5 - dow)), iso(domingo)];
      case 'mes': return [hoy, iso(new Date(ahora.getFullYear(), ahora.getMonth() + 1, 0))];
      default: return ['', ''];                     // todas
    }
  }

  function marcar(k) {
    chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-rango') === k)); });
  }
  function chipActivo() {
    for (var i = 0; i < chips.length; i++) if (chips[i].getAttribute('aria-pressed') === 'true') return chips[i].getAttribute('data-rango');
    return 'todas';
  }

  function guardarEnURL() {
    if (!window.history || !history.replaceState) return;
    var p = [];
    if (inDesde && inDesde.value) p.push('desde=' + inDesde.value);
    if (inHasta && inHasta.value) p.push('hasta=' + inHasta.value);
    if (selTipo && selTipo.value) p.push('tipo=' + encodeURIComponent(selTipo.value));
    if (selCcaa && selCcaa.value) p.push('comunidad=' + encodeURIComponent(selCcaa.value));
    try { history.replaceState(null, '', location.pathname + (p.length ? '?' + p.join('&') : '') + location.hash); } catch (e) { /* sin historial: da igual */ }
  }

  // ---- Búsqueda en todos los conciertos (portal) ----
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var TIPOS = { orquesta: 'Orquesta', banda: 'Banda profesional', sociedad: 'Banda de música', conservatorio: 'Conservatorio', escuela: 'Escuela de música' };
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]; });
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function fechaLarga(f) {
    var p = f.split('-'), d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    return cap(DIAS[d.getDay()]) + ' ' + Number(p[2]) + ' de ' + MESES[Number(p[1]) - 1] + ' de ' + p[0];
  }
  function mesTitulo(k) { var p = k.split('-'); return cap(MESES[Number(p[1]) - 1]) + ' de ' + p[0]; }
  function fila(k, v) { return v ? '<dt>' + k + '</dt><dd>' + esc(v) + '</dd>' : ''; }
  // Misma ficha que pinta tools/gen-conciertos.js (tarjeta)
  function tarjetaHTML(c) {
    var fuentes = c.s.map(function (x) { return '<a href="' + esc(x[1]) + '" rel="noopener">' + esc(x[0]) + '</a>'; }).join(' · ');
    var ag = c.au ? '<a href="' + esc(c.au) + '">' + esc(c.a) + '</a>' : esc(c.a);
    var cc = c.cu ? '<a href="' + esc(c.cu) + '">' + esc(c.c) + '</a>' : esc(c.c);
    return '<div class="tm-op tm-co" data-tipo="' + esc(c.ty) + '" data-ccaa="' + esc(c.c) + '" data-fecha="' + c.f + '">' +
      '<p class="tm-op-meta"><span class="tm-op-tipo tm-op-tipo--' + esc(c.ty) + '">' + esc(TIPOS[c.ty] || c.ty) + '</span><span>' + cc + '</span></p>' +
      '<h3>' + esc(c.t) + '</h3>' +
      '<p class="tm-op-entidad">' + ag + '</p>' +
      '<p class="tm-op-plazo"><strong>' + fechaLarga(c.f) + (c.h ? ' · ' + esc(c.h) + ' h' : '') + '</strong></p>' +
      '<dl class="tm-op-datos">' + fila('Dónde', c.l) + fila('Programa', c.p) + fila('Entrada', c.e) + '</dl>' +
      (c.n ? '<p class="tm-op-nota">' + esc(c.n) + '</p>' : '') +
      '<p class="tm-op-fuentes">Fuente: ' + fuentes + '. <span class="tm-op-nota">Confirma fecha y hora en la fuente enlazada.</span></p>' +
      '</div>';
  }
  function cargar() {
    if (promesa) return promesa;
    promesa = fetch(urlGlobal).then(function (r) {
      if (!r.ok) throw new Error('http ' + r.status);
      return r.json();
    }).then(function (j) { datos = j.conciertos; }).catch(function (e) {
      promesa = null;
      contador.textContent = 'No se han podido cargar los conciertos. Recarga la página e inténtalo de nuevo.';
      throw e;
    });
    return promesa;
  }
  function aplicarGlobal() {
    var tipo = selTipo ? selTipo.value : '', ccaa = selCcaa ? selCcaa.value : '';
    var desde = inDesde ? inDesde.value : '', hasta = inHasta ? inHasta.value : '';
    var activo = !!(tipo || ccaa || desde || hasta);
    if (estatico) estatico.hidden = activo;
    if (resultados) resultados.hidden = !activo;
    if (!activo) { contador.textContent = ''; if (vacio) vacio.hidden = true; return; }
    if (!datos) {
      contador.textContent = 'Cargando conciertos…';
      cargar().then(aplicarGlobal, function () { /* el aviso ya está en el contador */ });
      return;
    }
    var res = datos.filter(function (c) {
      return c.f >= hoy && (!desde || c.f >= desde) && (!hasta || c.f <= hasta) &&
             (!tipo || c.ty === tipo) && (!ccaa || c.c === ccaa);
    });
    var html = '', mes = '';
    res.forEach(function (c) {
      var m = c.f.slice(0, 7);
      if (m !== mes) {
        if (mes) html += '</div>';
        mes = m;
        html += '<h2 class="co-mes">' + mesTitulo(m) + '</h2><div class="tm-op-lista co-lista">';
      }
      html += tarjetaHTML(c);
    });
    if (mes) html += '</div>';
    resultados.innerHTML = html;
    contador.textContent = res.length + (res.length === 1 ? ' concierto' : ' conciertos');
    if (vacio) vacio.hidden = res.length !== 0;
  }

  function aplicar() {
    if (urlGlobal) { aplicarGlobal(); return; }
    var tipo = selTipo ? selTipo.value : '';
    var desde = inDesde ? inDesde.value : '', hasta = inHasta ? inHasta.value : '';
    var visibles = 0;
    tarjetas.forEach(function (t) {
      var f = t.getAttribute('data-fecha');
      var ok = f >= hoy &&
               (!desde || f >= desde) && (!hasta || f <= hasta) &&
               (!tipo || t.getAttribute('data-tipo') === tipo);
      t.hidden = !ok;
      if (ok) visibles++;
    });
    Array.prototype.forEach.call(document.querySelectorAll('.co-mes'), function (h) {
      var lista = h.nextElementSibling;
      var hay = lista && lista.querySelectorAll('.tm-co:not([hidden])').length > 0;
      h.hidden = !hay;
      if (lista) lista.hidden = !hay;
    });
    var nav = document.querySelector('.co-nav');
    if (nav) nav.hidden = visibles === 0;
    contador.textContent = visibles + (visibles === 1 ? ' concierto' : ' conciertos');
    if (vacio) vacio.hidden = visibles !== 0;
  }

  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      var k = c.getAttribute('data-rango'), r = rango(k);
      if (inDesde) inDesde.value = r[0];
      if (inHasta) inHasta.value = r[1];
      marcar(k); aplicar(); guardarEnURL();
    });
  });
  [inDesde, inHasta].forEach(function (el) {
    if (!el) return;
    el.min = hoy;
    el.addEventListener('change', function () {
      // Si el rango queda al revés, la otra fecha acompaña a la que se acaba de cambiar
      if (inDesde.value && inHasta.value && inDesde.value > inHasta.value) {
        if (el === inDesde) inHasta.value = inDesde.value; else inDesde.value = inHasta.value;
      }
      marcar((inDesde.value || inHasta.value) ? '' : 'todas');   // un rango a mano desmarca los botones
      aplicar(); guardarEnURL();
    });
  });
  form.addEventListener('change', function (e) { if (e.target === selTipo || e.target === selCcaa) { aplicar(); guardarEnURL(); } });
  form.addEventListener('submit', function (e) { e.preventDefault(); });

  // Estado inicial desde la dirección (filtro compartido)
  var q = {};
  location.search.replace(/^\?/, '').split('&').forEach(function (kv) { var a = kv.split('='); if (a[0]) q[a[0]] = decodeURIComponent(a[1] || ''); });
  if (inDesde && ISO.test(q.desde || '')) inDesde.value = q.desde;
  if (inHasta && ISO.test(q.hasta || '')) inHasta.value = q.hasta;
  if (selCcaa && q.comunidad) for (var j = 0; j < selCcaa.options.length; j++) if (selCcaa.options[j].value === q.comunidad) selCcaa.value = q.comunidad;
  if (selTipo && q.tipo) for (var i = 0; i < selTipo.options.length; i++) if (selTipo.options[i].value === q.tipo) selTipo.value = q.tipo;
  if (inDesde && inHasta && inDesde.value && inHasta.value && inDesde.value > inHasta.value) { var t0 = inDesde.value; inDesde.value = inHasta.value; inHasta.value = t0; }
  if (chips.length) marcar((inDesde && inDesde.value) || (inHasta && inHasta.value) ? '' : 'todas');
  aplicar();
})();
