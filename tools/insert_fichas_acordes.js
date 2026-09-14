'use strict';
/**
 * Mete (o actualiza) la ficha PDF de acordes en cada pagina de ejercicio.
 *
 *   node tools/insert_fichas_acordes.js         -> aplica
 *   node tools/insert_fichas_acordes.js --dry   -> solo informa
 *
 * Cada ficha va en la pagina del test que practica lo mismo: las de analizar en
 * /triadas-en-.../ y las de escribir en /construir-triadas-.../. Nada de URL
 * nueva: "acordes triadas pdf" apenas tiene demanda y una pagina con solo PDF
 * competiria con los tests. Cada bloque enlaza ademas a la ficha contraria
 * (analizar <-> escribir) de la misma posicion.
 *
 * Idempotente: el bloque se quita y se vuelve a poner siempre al principio de
 * linea, y se comprueba que queda dentro del <article>.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMG = '/assets/img/acordes/fichas';
const ANCLA = '<section class="tm-seccion">';
const MARCA_INI = '<!-- ficha-acordes -->';
const MARCA_FIN = '<!-- /ficha-acordes -->';

const POS = [
  { archivo: 'fundamental', titulo: 'en posición fundamental', analizar: 'ejercicios/acordes/triadas-en-fundamental', escribir: 'ejercicios/acordes/construir-triadas' },
  { archivo: 'primera-inversion', titulo: 'en 1ª inversión', analizar: 'ejercicios/acordes/triadas-en-primera-inversion', escribir: 'ejercicios/acordes/construir-triadas-primera-inversion' },
  { archivo: 'segunda-inversion', titulo: 'en 2ª inversión', analizar: 'ejercicios/acordes/triadas-en-segunda-inversion', escribir: 'ejercicios/acordes/construir-triadas-segunda-inversion' },
  { archivo: 'todas-las-posiciones', titulo: 'en las tres posiciones', analizar: 'ejercicios/acordes/triadas-todas-las-posiciones', escribir: 'ejercicios/acordes/construir-triadas-todas-posiciones' },
];

function bloque(p, modo) {
  const pdf = sol => `${IMG}/ficha-${modo}-triadas-${p.archivo}${sol ? '-soluciones' : ''}.pdf`;
  const prev = ext => `${IMG}/preview-ficha-${modo}-triadas-${p.archivo}.${ext}`;
  const otro = modo === 'analizar' ? 'escribir' : 'analizar';
  const esAnalizar = modo === 'analizar';

  const intro = esAnalizar
    ? `El mismo ejercicio en papel, para clase: <strong>21 tríadas ${p.titulo}</strong> en una cara de A4, y debajo de cada una se escribe su tipo${p.archivo === 'todas-las-posiciones' ? ' y su posición' : ''}. Con <strong>hoja de soluciones</strong> aparte.`
    : `El mismo ejercicio en papel, para clase: <strong>21 tríadas ${p.titulo}</strong> en una cara de A4. Cada pentagrama trae la nota más grave del acorde y hay que añadir las otras dos. Con <strong>hoja de soluciones</strong> aparte, donde las notas añadidas aparecen en rojo.`;
  const alt = esAnalizar
    ? `Ficha imprimible en PDF con 21 acordes tríada ${p.titulo} para analizar`
    : `Ficha imprimible en PDF para escribir 21 acordes tríada ${p.titulo}`;

  return `${MARCA_INI}
<h2>Ficha para imprimir (PDF)</h2>
<p>${intro}</p>
<p>Va de menos a más: primero acordes con notas naturales en clave de sol, después con sostenidos y bemoles y con la clave de fa entrando poco a poco, y al final alguno con doble alteración.</p>
<figure class="tm-staff">
  <a href="${pdf(false)}" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="${prev('webp')}"><img src="${prev('png')}" width="300" height="424" loading="lazy" alt="${alt}"></picture></a>
  <figcaption>Hoja A4 con 21 tríadas ${p.titulo} para ${modo}.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="${pdf(false)}" target="_blank" rel="noopener">Descargar la ficha (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="${pdf(true)}" target="_blank" rel="noopener">Soluciones</a></p>
<p>Se puede imprimir y fotocopiar libremente para el aula. Para practicarlo en la otra dirección está la ficha de <a href="/${p[otro]}/">${otro} tríadas ${p.titulo}</a>.</p>
${MARCA_FIN}`;
}

const dry = process.argv.includes('--dry');
let errores = 0;

for (const p of POS) {
  for (const modo of ['analizar', 'escribir']) {
    const rel = p[modo] + '/index.html';
    const file = path.join(ROOT, rel);
    let html = fs.readFileSync(file, 'utf8');
    const original = html;

    const inicioDeLinea = pos => { while (pos > 0 && (html[pos - 1] === ' ' || html[pos - 1] === '\t')) pos--; return pos; };

    /* Quitar es el inverso EXACTO de poner: el bloque se inserta al principio de
       línea seguido de "\n\n", así que se quita desde el principio de línea y
       con esos dos saltos. Recortar saltos "a ojo" dejaba una línea en blanco de
       más en la segunda pasada y el archivo cambiaba sin cambiar el bloque. */
    const ini = html.indexOf(MARCA_INI);
    if (ini >= 0) {
      const fin = html.indexOf(MARCA_FIN, ini) + MARCA_FIN.length;
      html = html.slice(0, inicioDeLinea(ini)) + html.slice(fin).replace(/^\n\n/, '');
    }

    const encontrado = html.indexOf(ANCLA);
    if (encontrado < 0) { console.log('  ! sin ancla: ' + rel); errores++; continue; }
    const i = inicioDeLinea(encontrado);
    html = html.slice(0, i) + bloque(p, modo) + '\n\n' + html.slice(i);

    const art = html.indexOf('<article'), finArt = html.indexOf('</article>'), pos = html.indexOf(MARCA_INI);
    if (!(pos > art && pos < finArt)) { console.log('  ! quedaría fuera del <article>: ' + rel); errores++; continue; }

    if (html === original) console.log('  = igual: ' + rel);
    else { if (!dry) fs.writeFileSync(file, html); console.log('  ✓ ' + (ini >= 0 ? 'recolocado' : 'insertado') + ': ' + rel); }
  }
}
process.exit(errores ? 1 : 0);
