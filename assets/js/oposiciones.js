/* Filtro y plazos de /oposiciones-de-musica/. El contenido ya está en el HTML (lo pinta tools/gen-oposiciones.js);
   aquí solo se filtra, se marca cuánto queda de plazo y se pasan a «cerradas» las que han vencido. */
(function () {
  'use strict';
  var form = document.getElementById('op-filtros');
  if (!form) return;
  var selTipo = document.getElementById('op-f-tipo');
  var selInstr = document.getElementById('op-f-instr');
  var selCcaa = document.getElementById('op-f-ccaa');
  var contador = document.getElementById('op-contador');
  var cerradas = document.getElementById('op-cerradas');
  var cerradasTitulo = document.getElementById('op-cerradas-titulo');
  var tarjetas = Array.prototype.slice.call(document.querySelectorAll('.tm-op'));

  function hoyISO() {
    var d = new Date();
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }
  function dias(fin) { return Math.round((Date.parse(fin + 'T00:00:00Z') - Date.parse(hoyISO() + 'T00:00:00Z')) / 864e5); }

  tarjetas.forEach(function (t) {
    var fin = t.getAttribute('data-fin');
    if (!fin) return;
    var n = dias(fin);
    var chip = t.querySelector('[data-op-dias]');
    if (n < 0) {
      t.classList.add('tm-op--cerrada');
      if (chip) chip.textContent = 'Plazo cerrado';
      if (cerradas && t.parentNode !== cerradas) cerradas.appendChild(t);
    } else if (chip && n <= 30) {
      chip.textContent = n === 0 ? 'Cierra hoy' : n === 1 ? 'Cierra mañana' : 'Quedan ' + n + ' días';
      if (n <= 3) chip.classList.add('is-urgente');
    }
  });

  function aplicar() {
    var tipo = selTipo.value, instr = selInstr.value, ccaa = selCcaa.value, visibles = 0;
    tarjetas.forEach(function (t) {
      var ok = (!tipo || t.getAttribute('data-tipo') === tipo) &&
               (!ccaa || t.getAttribute('data-ccaa') === ccaa) &&
               (!instr || t.getAttribute('data-instr').split('|').indexOf(instr) !== -1);
      t.hidden = !ok;
      if (ok) visibles++;
    });
    ['op-abiertas', 'op-anunciadas', 'op-cerradas'].forEach(function (id) {
      var cont = document.getElementById(id), tit = document.getElementById(id + '-titulo') || document.getElementById(id.replace('op-', 'op-') + '-titulo');
      if (!cont || !tit) return;
      var hay = cont.querySelectorAll('.tm-op:not([hidden])').length > 0;
      cont.hidden = !hay; tit.hidden = !hay;
    });
    contador.textContent = visibles + (visibles === 1 ? ' convocatoria' : ' convocatorias');
  }
  form.addEventListener('change', aplicar);
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  aplicar();
})();
