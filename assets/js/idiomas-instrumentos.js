/* Buscador de la tabla de nombres de instrumentos.
 *
 * El caso de uso es al revés de lo normal: tienes una partitura delante, lees "Posaune"
 * y quieres saber qué instrumento es. Por eso se busca en las cinco lenguas a la vez y se
 * marca la celda por la que ha coincidido, que es la que responde a la pregunta.
 * Sin tildes ni mayúsculas: "flute", "Flöte" y "flauto" tienen que encontrarse igual.
 */
(function () {
  'use strict';

  function plano(s) {
    return s.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[\u266d\u266f]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
  }

  function init() {
    var campo = document.getElementById('tm-idi-campo');
    var cuenta = document.getElementById('tm-idi-cuenta');
    if (!campo) return;

    var grupos = [].slice.call(document.querySelectorAll('.tm-idi-grupo'));
    var filas = [].slice.call(document.querySelectorAll('.tm-idi tbody tr')).map(function (tr) {
      var celdas = [].slice.call(tr.querySelectorAll('td'));
      return { tr: tr, celdas: celdas, textos: celdas.map(function (td) { return plano(td.textContent); }) };
    });
    var total = filas.length;

    function pinta() {
      var q = plano(campo.value);
      var vistas = 0;

      filas.forEach(function (f) {
        var hay = false;
        f.textos.forEach(function (t, i) {
          var coincide = q !== '' && t.indexOf(q) !== -1;
          f.celdas[i].classList.toggle('tm-idi-hit', coincide);
          if (coincide) hay = true;
        });
        var visible = q === '' || hay;
        f.tr.classList.toggle('tm-idi-fila-oculta', !visible);
        if (visible) vistas++;
      });

      /* una familia entera sin resultados estorba: se esconde con su titulo */
      grupos.forEach(function (g) {
        var quedan = g.querySelectorAll('tbody tr:not(.tm-idi-fila-oculta)').length;
        g.hidden = quedan === 0;
      });

      if (q === '') {
        cuenta.textContent = total + ' instrumentos en la tabla. Escribe en la casilla para filtrar.';
        cuenta.classList.remove('tm-idi-nada');
      } else if (vistas === 0) {
        cuenta.textContent = 'Ningún instrumento contiene «' + campo.value.trim() + '». Prueba con menos letras: ' +
                             'buscar «pos» encuentra Posaune, y «clar» encuentra todos los clarinetes.';
        cuenta.classList.add('tm-idi-nada');
      } else {
        cuenta.textContent = vistas + (vistas === 1 ? ' instrumento' : ' instrumentos') +
                             ' con «' + campo.value.trim() + '»';
        cuenta.classList.remove('tm-idi-nada');
      }
    }

    campo.addEventListener('input', pinta);
    /* Enter no debe recargar nada: aqui no hay formulario que enviar */
    campo.addEventListener('keydown', function (e) { if (e.key === 'Enter') e.preventDefault(); });
    pinta();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
