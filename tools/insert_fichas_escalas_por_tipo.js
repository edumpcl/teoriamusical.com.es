'use strict';
/**
 * Mete (o actualiza) la ficha PDF de cada tipo de escala en su página de ejercicio.
 *
 *   node tools/insert_fichas_escalas_por_tipo.js         -> aplica
 *   node tools/insert_fichas_escalas_por_tipo.js --dry   -> solo informa
 *
 * Decisión de Eduardo (14-09-2026): en cada página, la ficha que le corresponde.
 *   /escalas-<tipo>/                          -> ficha de identificar
 *   /construir-escala-<tipo>/                 -> ficha de escribir
 *   /construir-escala-<tipo>-con-armadura/    -> ficha de escribir con armadura
 * Cada bloque enlaza a las otras dos fichas del mismo tipo y a las mezcladas del
 * índice. Las generales (mayores, menores y mezcla) siguen en /ejercicios/escalas/.
 *
 * Idempotente: quitar el bloque es el inverso exacto de ponerlo.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMG = '/assets/img/escalas/fichas';
const BASE = 'ejercicios/escalas';
/* Las páginas de identificar y construir tienen la sección de preguntas dentro
   del artículo; las de «con armadura» no, y llevan un h2 normal. */
const ANCLAS = ['<section class="tm-seccion">', '<h2>Preguntas frecuentes</h2>'];
const MARCA_INI = '<!-- ficha-escala-tipo -->';
const MARCA_FIN = '<!-- /ficha-escala-tipo -->';

const TIPOS = [
  { id: 'mayor', titulo: 'escalas mayores naturales', ident: 'escalas-mayores', constr: 'construir-escala-mayor' },
  { id: 'mixta-principal', titulo: 'escalas mayores mixtas principales', ident: 'escalas-mayores-mixta-principal', constr: 'construir-escala-mayor-mixta-principal' },
  { id: 'mixta-secundaria', titulo: 'escalas mayores mixtas secundarias', ident: 'escalas-mayores-mixta-secundaria', constr: 'construir-escala-mayor-mixta-secundaria' },
  { id: 'mixolidia', titulo: 'escalas mixolidias', ident: 'escalas-mixolidia', constr: 'construir-escala-mixolidia' },
  { id: 'menor-natural', titulo: 'escalas menores naturales', ident: 'escalas-menores-natural', constr: 'construir-escala-menor-natural' },
  { id: 'menor-armonica', titulo: 'escalas menores armónicas', ident: 'escalas-menores-armonica', constr: 'construir-escala-menor-armonica' },
  { id: 'menor-melodica', titulo: 'escalas menores melódicas', ident: 'escalas-menores-melodica', constr: 'construir-escala-menor-melodica' },
  { id: 'menor-dorica', titulo: 'escalas dóricas', ident: 'escalas-menores-dorica', constr: 'construir-escala-menor-dorica' },
];
const MODOS = [
  { id: 'identificar', pagina: t => t.ident, nombre: 'identificar' },
  { id: 'escribir', pagina: t => t.constr, nombre: 'escribir' },
  { id: 'escribir-con-armadura', pagina: t => t.constr + '-con-armadura', nombre: 'escribir con armadura' },
];

function bloque(t, modo) {
  const pdf = sol => `${IMG}/ficha-${modo.id}-escalas-${t.id}${sol ? '-soluciones' : ''}.pdf`;
  const prev = ext => `${IMG}/preview-ficha-${modo.id}-escalas-${t.id}.${ext}`;
  const que = {
    identificar: `ocho ${t.titulo} escritas en una cara de A4, la mitad con armadura y la mitad con las alteraciones delante de cada nota. Debajo de cada una se escribe su nombre`,
    escribir: `ocho ${t.titulo} para escribir sin armadura, con cada alteración delante de su nota`,
    'escribir-con-armadura': `ocho ${t.titulo} para escribir con armadura: primero la armadura y después la escala, solo con las alteraciones que se aparten de ella`,
  }[modo.id];
  const melodica = t.id === 'menor-melodica' ? ' La melódica se escribe completa, subiendo y bajando.' : '';
  const otras = MODOS.filter(m => m.id !== modo.id)
    .map(m => `<a href="/${BASE}/${m.pagina(t)}/">${m.nombre}</a>`).join(' y ');

  return `${MARCA_INI}
<h2>Ficha para imprimir (PDF)</h2>
<p>El mismo ejercicio en papel, para clase: ${que}. Con <strong>hoja de soluciones</strong> aparte, con la respuesta en rojo.${melodica}</p>
<p>Va de menos a más: primero armaduras con pocas alteraciones en clave de sol, y después más alteraciones y la clave de fa.</p>
<figure class="tm-staff">
  <a href="${pdf(false)}" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="${prev('webp')}"><img src="${prev('png')}" width="300" height="424" loading="lazy" alt="Ficha imprimible en PDF para ${modo.nombre} ${t.titulo}"></picture></a>
  <figcaption>Hoja A4 para ${modo.nombre} ${t.titulo}.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="${pdf(false)}" target="_blank" rel="noopener">Descargar la ficha (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="${pdf(true)}" target="_blank" rel="noopener">Soluciones</a></p>
<p>Se puede imprimir y fotocopiar libremente para el aula. De este mismo tipo hay también fichas para ${otras}, y en el <a href="/${BASE}/#fichas">índice de escalas</a> puedes crear fichas a medida, mezclando los tipos que quieras.</p>
${MARCA_FIN}`;
}

const dry = process.argv.includes('--dry');
let errores = 0, cambios = 0;

for (const t of TIPOS) {
  for (const modo of MODOS) {
    const rel = `${BASE}/${modo.pagina(t)}/index.html`;
    const file = path.join(ROOT, rel);
    if (!fs.existsSync(file)) { console.log('  ! no existe ' + rel); errores++; continue; }
    let html = fs.readFileSync(file, 'utf8');
    const original = html;
    const inicioDeLinea = pos => { while (pos > 0 && (html[pos - 1] === ' ' || html[pos - 1] === '\t')) pos--; return pos; };

    const ini = html.indexOf(MARCA_INI);
    if (ini >= 0) {
      const fin = html.indexOf(MARCA_FIN, ini) + MARCA_FIN.length;
      html = html.slice(0, inicioDeLinea(ini)) + html.slice(fin).replace(/^\n\n/, '');
    }

    const art = html.indexOf('<article'), finArt = html.indexOf('</article>');
    const ancla = ANCLAS.map(a => html.indexOf(a)).find(p => p > art && p < finArt);
    if (ancla === undefined) { console.log('  ! sin ancla dentro del artículo: ' + rel); errores++; continue; }
    const i = inicioDeLinea(ancla);
    html = html.slice(0, i) + bloque(t, modo) + '\n\n' + html.slice(i);

    if (html === original) console.log('  = igual: ' + rel);
    else { cambios++; if (!dry) fs.writeFileSync(file, html); console.log('  ✓ ' + (ini >= 0 ? 'recolocado' : 'insertado') + ': ' + rel); }
  }
}
console.log(`\n  ${cambios} página(s) cambiadas · ${errores} error(es)`);
process.exit(errores ? 1 : 0);
