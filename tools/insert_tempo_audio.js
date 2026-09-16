'use strict';
/**
 * Pone la tabla de tempos con botón «Escuchar» en /diccionario-musical/tempo-musical/.
 *
 *   node tools/insert_tempo_audio.js         -> aplica
 *   node tools/insert_tempo_audio.js --dry   -> solo informa
 *
 * Por qué: la página tiene 13.632 impresiones y 62 clics (GSC, 15-06 a 12-09) y no
 * tenía nada interactivo; la consulta «allegro tempo» suma 3.300 impresiones y 0
 * clics. Ahora cada término se puede OÍR sin salir de la página, y el enlace al
 * metrónomo sigue ahí para practicar de verdad (?bpm= lo deja ya puesto).
 *
 * Idempotente: quitar el bloque es el inverso exacto de ponerlo.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PAGINA = 'diccionario-musical/tempo-musical/index.html';
const MARCA_INI = '<!-- tabla-tempos -->';
const MARCA_FIN = '<!-- /tabla-tempos -->';

/* Los rangos y los bpm son los MISMOS que la tabla del metrónomo (/herramientas/metronomo/),
   que sigue a la app Soundcorset: las dos páginas tienen que decir lo mismo. El verificador
   compara ambas tablas y comprueba que cada bpm cae dentro de su rango. */
const TEMPOS = [
  { t: 'Grave', sig: 'Muy lento y solemne', rango: '15–39', bpm: 30 },
  { t: 'Largo', sig: 'Amplio y sostenido', rango: '40–59', bpm: 50 },
  { t: 'Larghetto', sig: 'Algo menos lento que el Largo', rango: '60–65', bpm: 63 },
  { t: 'Adagio', sig: 'Lento y expresivo', rango: '66–75', bpm: 70 },
  { t: 'Andante', sig: '«Caminando», al paso y tranquilo', rango: '76–89', bpm: 80 },
  { t: 'Moderato', sig: 'Moderado, equilibrado', rango: '90–104', bpm: 96 },
  { t: 'Allegretto', sig: 'Algo vivo, ligero', rango: '105–114', bpm: 108 },
  { t: 'Allegro', sig: 'Rápido y alegre', rango: '115–129', bpm: 120 },
  { t: 'Vivace', sig: 'Vivo y enérgico', rango: '130–167', bpm: 144 },
  { t: 'Presto', sig: 'Muy rápido', rango: '168–199', bpm: 176 },
  { t: 'Prestissimo', sig: 'Extremadamente rápido', rango: '200–300', bpm: 208 },
];

const fila = x => `    <tr><td><strong>${x.t}</strong></td><td>${x.sig}</td><td>${x.rango}</td>`
  + `<td class="tm-tempo-celda"><button class="tm-tempo-play" data-bpm="${x.bpm}" data-nombre="${x.t}" hidden>Escuchar</button>`
  + `<a class="tm-tempo-metro" href="/herramientas/metronomo/?bpm=${x.bpm}" target="_blank" rel="noopener">Metrónomo</a></td></tr>`;

const BLOQUE = `${MARCA_INI}
<style>
.tm-tempo-celda { white-space: nowrap; }
.tm-tempo-play[hidden] { display: none; }
.tm-tempo-play { display: inline-flex; align-items: center; gap: 6px; border: 1px solid #d8d0b8; background: #faf7f2; color: #1a1208; border-radius: 6px; padding: 7px 12px; font: inherit; font-size: .85rem; font-weight: 600; cursor: pointer; min-height: 38px; }
.tm-tempo-play:hover { border-color: #8b6914; background: #fff8ee; }
.tm-tempo-play .tm-tempo-ico { width: 0; height: 0; border-style: solid; border-width: 6px 0 6px 10px; border-color: transparent transparent transparent #8b6914; }
.tm-tempo-play[aria-pressed="true"] { background: #8b6914; border-color: #8b6914; color: #fff; }
.tm-tempo-play[aria-pressed="true"] .tm-tempo-ico { width: 10px; height: 10px; border: 0; background: #fff; }
.tm-tempo-metro { display: inline-block; margin-left: 10px; font-size: .82rem; }
/* En el móvil la tabla tiene 350 px: sin apretar botón y celdas, las cuatro
   columnas suman 387 y la cabecera «Oír el pulso» se corta. */
@media (max-width: 600px) { .tm-tempo-metro { display: block; margin: 3px 0 0; font-size: .72rem; }
  .tm-tempo-play { padding: 5px 8px; font-size: .75rem; min-height: 32px; gap: 5px; }
  .tm-tempo-play .tm-tempo-ico { border-width: 5px 0 5px 8px; }
  .tm-table td, .tm-table th { padding: 8px 4px; font-size: .78rem; line-height: 1.3; }
  .tm-tempo-celda { white-space: normal; } }
</style>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Término</th><th>Significado</th><th>BPM orientativos</th><th>Oír el pulso</th></tr>
  </thead>
  <tbody>
${TEMPOS.map(fila).join('\n')}
  </tbody>
</table>
</div>
<p>Pulsa <strong>Escuchar</strong> para oír el pulso a esa velocidad: es la mejor forma de hacerse una idea de qué significa cada término. Cada muestra se para sola a los 30 segundos. Para trabajar con ella —cambiar el compás, la subdivisión o hacer un acelerando— abre el <a href="/herramientas/metronomo/">metrónomo online</a>, que se abre con ese tempo ya puesto.</p>
<script src="/assets/js/tempo-audio.js" defer></script>
${MARCA_FIN}`;

const dry = process.argv.includes('--dry');
const file = path.join(ROOT, PAGINA);
let html = fs.readFileSync(file, 'utf8');
const original = html;
const inicioDeLinea = pos => { while (pos > 0 && (html[pos - 1] === ' ' || html[pos - 1] === '\t')) pos--; return pos; };

const ini = html.indexOf(MARCA_INI);
if (ini >= 0) {
  const fin = html.indexOf(MARCA_FIN, ini) + MARCA_FIN.length;
  html = html.slice(0, inicioDeLinea(ini)) + html.slice(fin).replace(/^\n\n/, '');
} else {
  // Primera vez: se sustituye la tabla de tempos que ya estaba (la que tiene «Término»).
  const desde = html.indexOf('<div class="tm-table-wrap">');
  const hasta = html.indexOf('</div>', html.indexOf('</table>', desde)) + '</div>'.length;
  if (desde < 0 || hasta < desde || !html.slice(desde, hasta).includes('<th>Término</th>')) {
    console.log('  ! no encuentro la tabla de tempos'); process.exit(1);
  }
  html = html.slice(0, inicioDeLinea(desde)) + html.slice(hasta).replace(/^\n/, '');
  var puntoDeEntrada = inicioDeLinea(desde);
}
const i = puntoDeEntrada !== undefined ? puntoDeEntrada : html.indexOf('<h2>Términos de tempo combinados');
if (i < 0) { console.log('  ! no encuentro dónde colocar la tabla'); process.exit(1); }
const pos = inicioDeLinea(i);
html = html.slice(0, pos) + BLOQUE + '\n\n' + html.slice(pos);

const art = html.indexOf('<article'), finArt = html.indexOf('</article>'), donde = html.indexOf(MARCA_INI);
if (!(donde > art && donde < finArt)) { console.log('  ! quedaría fuera del <article>'); process.exit(1); }

if (html === original) console.log('  = ya estaba igual: ' + PAGINA);
else { if (!dry) fs.writeFileSync(file, html); console.log('  ✓ ' + (ini >= 0 ? 'recolocada' : 'insertada') + ' la tabla con audio en ' + PAGINA); }
