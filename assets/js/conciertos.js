/* Filtros de /agenda-conciertos-bandas-orquestas/. El contenido ya está en el HTML (lo pinta tools/gen-conciertos.js);
   aquí solo se filtra por tipo y por fechas, y se ocultan los conciertos que ya han pasado desde la última regeneración.
   Las páginas de comunidad llevan además botones de fecha rápida y un rango «Desde / Hasta»; el filtro se guarda en la
   dirección (?desde=2026-11-01&hasta=2026-11-07&tipo=banda) para poder compartirlo. */
(function () {
  'use strict';
  // Páginas sin filtros (agrupaciones): basta con ocultar lo que ya ha pasado desde la última regeneración
  var d0 = new Date(), hoy0 = d0.getFullYear() + '-' + ('0' + (d0.getMonth() + 1)).slice(-2) + '-' + ('0' + d0.getDate()).slice(-2);
  Array.prototype.forEach.call(document.querySelectorAll('.tm-co'), function (t) { if (t.getAttribute('data-fecha') < hoy0) t.hidden = true; });
  var form = document.getElementById('co-filtros');
  if (!form) return;
  var selTipo = document.getElementById('co-f-tipo');
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
    try { history.replaceState(null, '', location.pathname + (p.length ? '?' + p.join('&') : '') + location.hash); } catch (e) { /* sin historial: da igual */ }
  }

  function aplicar() {
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
  form.addEventListener('change', function (e) { if (e.target === selTipo) { aplicar(); guardarEnURL(); } });
  form.addEventListener('submit', function (e) { e.preventDefault(); });

  // Estado inicial desde la dirección (filtro compartido)
  var q = {};
  location.search.replace(/^\?/, '').split('&').forEach(function (kv) { var a = kv.split('='); if (a[0]) q[a[0]] = decodeURIComponent(a[1] || ''); });
  if (inDesde && ISO.test(q.desde || '')) inDesde.value = q.desde;
  if (inHasta && ISO.test(q.hasta || '')) inHasta.value = q.hasta;
  if (selTipo && q.tipo) for (var i = 0; i < selTipo.options.length; i++) if (selTipo.options[i].value === q.tipo) selTipo.value = q.tipo;
  if (inDesde && inHasta && inDesde.value && inHasta.value && inDesde.value > inHasta.value) { var t0 = inDesde.value; inDesde.value = inHasta.value; inHasta.value = t0; }
  if (chips.length) marcar((inDesde && inDesde.value) || (inHasta && inHasta.value) ? '' : 'todas');
  aplicar();
})();
