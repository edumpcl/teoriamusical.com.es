/* Filtro de /agenda-conciertos-bandas-orquestas/. El contenido ya está en el HTML (lo pinta tools/gen-conciertos.js);
   aquí solo se filtra y se ocultan los conciertos que ya han pasado desde la última regeneración. */
(function () {
  'use strict';
  var form = document.getElementById('co-filtros');
  if (!form) return;
  var selTipo = document.getElementById('co-f-tipo');
  var selCcaa = document.getElementById('co-f-ccaa'); // opcional: ya no hay filtro de comunidad (una página por comunidad)
  var contador = document.getElementById('co-contador');
  var tarjetas = Array.prototype.slice.call(document.querySelectorAll('.tm-co'));

  function hoyISO() {
    var d = new Date();
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }
  var hoy = hoyISO();

  function aplicar() {
    var tipo = selTipo ? selTipo.value : '', ccaa = selCcaa ? selCcaa.value : '', visibles = 0;
    tarjetas.forEach(function (t) {
      var pasado = t.getAttribute('data-fecha') < hoy;
      var ok = !pasado &&
               (!tipo || t.getAttribute('data-tipo') === tipo) &&
               (!ccaa || t.getAttribute('data-ccaa') === ccaa);
      t.hidden = !ok;
      if (ok) visibles++;
    });
    Array.prototype.forEach.call(document.querySelectorAll('.co-mes'), function (h) {
      var lista = h.nextElementSibling;
      var hay = lista && lista.querySelectorAll('.tm-co:not([hidden])').length > 0;
      h.hidden = !hay;
      if (lista) lista.hidden = !hay;
    });
    contador.textContent = visibles + (visibles === 1 ? ' concierto' : ' conciertos');
  }
  form.addEventListener('change', aplicar);
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  aplicar();
})();
