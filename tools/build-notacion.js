'use strict';
/**
 * Dibuja con Verovio la musica de una pagina AL CONSTRUIR y mete el SVG ya hecho en el HTML.
 *
 *   node tools/build-notacion.js sincopa                        -> verifica y dibuja, solo informa
 *   node tools/build-notacion.js sincopa --poner                -> escribe en la pagina
 *   node tools/build-notacion.js sincopa --poner --quitar-vexflow
 *   node tools/build-notacion.js sincopa --poner --pagina=pruebas/sincopa-verovio
 *
 * DE DONDE SALE LA MUSICA (tools/notacion/):
 *   <conjunto>/            una carpeta con un fichero por ejemplo, escrito en MuseScore y
 *                          exportado a MusicXML (.musicxml o .mxl). El nombre del fichero ES el
 *                          id del <div> de la pagina donde va el dibujo.
 *                            ex-sincopa-parte.musicxml        <- la musica (obligatorio)
 *                            ex-sincopa-parte.json            <- opcional: {"alt": "...", "espera": {...}}
 *   <conjunto>.js          alternativa heredada: ejemplos escritos a mano en MEI.
 * Si existen las dos cosas para un mismo conjunto, el constructor se niega: una sola fuente de
 * verdad, o acabarian discrepando.
 *
 * POR QUE AL CONSTRUIR Y NO EN EL NAVEGADOR: son ejemplos fijos. Dibujarlos en cada visita
 * obligaria a descargar Verovio (WebAssembly, varios MB) para pintar tres pentagramas. Aqui el
 * resultado son unos 7 KB de SVG dentro del HTML: sin JavaScript, sin peticion extra, y Google
 * y la IA lo leen como lo que es, un dibujo con descripcion. (En el proyecto "plataforma" si va
 * en el navegador, porque alli la partitura es interactiva y lleva cursor.)
 *
 * FLUJO: musica -> Verovio la lee y la pasa a MEI -> verificar-mei -> Verovio la dibuja ->
 * verificarSVG -> HTML. Si cualquier comprobacion falla NO se escribe nada.
 *
 * REQUISITOS LOCALES (no van a Vercel: package.json esta en .gitignore y el despliegue no ejecuta
 * npm): npm install verovio @xmldom/xmldom
 */
const fs = require('fs');
const path = require('path');
const { verificar, verificarSVG } = require('./verificar-mei.js');
const { describir } = require('./descripcion-mei.js');

const RAIZ = path.join(__dirname, '..');
const NOTACION = path.join(__dirname, 'notacion');

const CONJUNTOS = {
  sincopa: { pagina: 'diccionario-musical/compases/sincopa' },
  contratiempo: { pagina: 'diccionario-musical/compases/notas-a-contratiempo' },
};

/* Verovio mide el pentagrama en unidades internas: con scale 40 la separacion entre lineas son
   7,2 unidades del viewBox exterior. Para ~11 px entre lineas (un poco mas que el 10 de
   VexFlow, que se veia pequeño en movil) se multiplica por 11 / 7,2. */
const PX_POR_UNIDAD = 11 / 7.2;

const OPCIONES = {
  font: 'Leland',                 // la misma fuente musical que ya usa el resto de la web
  scale: 40,
  adjustPageWidth: true,
  adjustPageHeight: true,
  header: 'none',                 // el titulo de MuseScore no se dibuja: ya lo pone la pagina
  footer: 'none',
  breaks: 'none',                 // un solo sistema, sin saltos de linea que haya puesto MuseScore
  svgViewBox: true,
  svgRemoveXlink: true,
  pageMarginLeft: 10,
  pageMarginRight: 10,
  pageMarginTop: 10,
  pageMarginBottom: 10,
  spacingNonLinear: 0.7,          // un poco de aire entre notas: son ejemplos para mirar despacio
};

const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/* ---------- de donde se leen los ejemplos ---------- */

function cargarEjemplos(nombre) {
  const carpeta = path.join(NOTACION, nombre);
  const modulo = path.join(NOTACION, nombre + '.js');
  const hayCarpeta = fs.existsSync(carpeta) && fs.statSync(carpeta).isDirectory();
  const hayModulo = fs.existsSync(modulo);
  if (hayCarpeta && hayModulo) {
    throw new Error(`«${nombre}» tiene carpeta Y modulo .js: dos fuentes de verdad. Borra una (la que sobre).`);
  }
  if (hayModulo) {
    return require(modulo).EJEMPLOS.map((e) => ({ ...e, origen: 'MEI escrito a mano' }));
  }
  if (!hayCarpeta) throw new Error(`no hay ni tools/notacion/${nombre}/ ni tools/notacion/${nombre}.js`);

  const ficheros = fs.readdirSync(carpeta).filter((f) => /\.(musicxml|mxl|xml)$/i.test(f)).sort();
  if (!ficheros.length) throw new Error(`tools/notacion/${nombre}/ no tiene ningun .musicxml`);
  const comprimidos = ficheros.filter((f) => /\.mxl$/i.test(f));
  if (comprimidos.length) {
    // .mxl es un zip; leerlo exigiria descomprimirlo a mano (mas codigo, mas riesgo) y MuseScore
    // ofrece el formato sin comprimir en la misma ventana de exportar.
    throw new Error(`${comprimidos.join(', ')} esta comprimido (.mxl). En MuseScore: Archivo > Exportar > `
      + 'elige «MusicXML» (el de extension .musicxml), no «MusicXML comprimido».');
  }
  return ficheros.map((f) => {
    const id = f.replace(/\.(musicxml|xml)$/i, '');
    const lateral = path.join(carpeta, id + '.json');
    const extra = fs.existsSync(lateral) ? JSON.parse(fs.readFileSync(lateral, 'utf8')) : {};
    const crudo = fs.readFileSync(path.join(carpeta, f), 'utf8');
    return {
      id, origen: 'MuseScore (.musicxml)',
      musicxml: extra.etiquetas ? crudo : quitarEtiquetas(crudo),
      alt: extra.alt || null,
      espera: extra.espera || undefined,
    };
  });
}

/**
 * MuseScore exporta el nombre que tenga la parte («Piano», «Pentagrama»...) y Verovio lo dibuja
 * como una etiqueta al principio del sistema, que ademas ensancha el dibujo. En un ejemplo
 * didactico de un solo pentagrama no se quiere. Se vacia el nombre antes de leerlo; si alguna vez
 * hace falta (p. ej. «Violín» y «Piano» en una partitura de dos instrumentos), basta poner
 * "etiquetas": true en el .json de ese ejemplo.
 */
function quitarEtiquetas(xml) {
  return xml
    .replace(/<part-name[^>]*>[^<]*<\/part-name>/g, '<part-name></part-name>')
    .replace(/<part-abbreviation[^>]*>[^<]*<\/part-abbreviation>/g, '')
    .replace(/<group-name[^>]*>[^<]*<\/group-name>/g, '')
    .replace(/<group-abbreviation[^>]*>[^<]*<\/group-abbreviation>/g, '');
}

/** SVG de Verovio -> SVG listo para ir dentro del HTML. */
function preparar(svg, alt) {
  const vb = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const w = Math.round(Number(vb[1]) * PX_POR_UNIDAD);
  const h = Math.round(Number(vb[2]) * PX_POR_UNIDAD);
  let s = svg
    .replace(/<desc>[\s\S]*?<\/desc>\s*/, '')                 // la version de Verovio es ruido en los diffs
    .replace(/xlink:href=/g, 'href=')
    .replace(/\s*xmlns:xlink="[^"]*"/, '');
  // Medidas explicitas: sin ellas un SVG con solo viewBox se colapsa dentro de un contenedor que
  // se ajusta al contenido, y con ellas la caja se reserva antes de pintar (sin saltos de layout).
  // EL ID DEL <svg> RAIZ SE CONSERVA. Verovio mete dentro un <style> cuyas reglas estan ligadas a
  // ese id ("#a1b2c3 path { stroke: currentcolor }"). Si se pierde, la regla ya no casa con nada
  // y se pintan las cabezas de nota (que son relleno) pero NO las lineas del pentagrama, las
  // plicas ni las barras de compas (que son trazo). Paso en el primer intento: el DOM tenia todos
  // los elementos y la pagina no mostraba la mitad.
  const id = (svg.match(/<svg [^>]* id="([^"]+)"/) || [])[1];
  if (!id) throw new Error('el SVG de Verovio no trae id en la raiz');
  s = s.replace(/<svg [^>]*>/, `<svg id="${id}" class="tm-vero" viewBox="0 0 ${vb[1]} ${vb[2]}" width="${w}" height="${h}" `
    + `role="img" aria-label="${escAttr(alt)}" xmlns="http://www.w3.org/2000/svg" `
    + 'style="display:block;max-width:100%;height:auto">');
  return { svg: s.trim(), w, h };
}

/**
 * Para cada ejemplo: lo lee Verovio, saca su MEI (para verificarlo) y lo dibuja.
 * Devuelve tambien el MEI porque es lo que se verifica: el de la fuente si era MEI, y el que
 * Verovio deduce del MusicXML si era MuseScore.
 */
async function leerYDibujar(ejemplos) {
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const M = await createVerovioModule();
  const tk = new VerovioToolkit(M);
  const salida = [];
  let semilla = 1;
  for (const e of ejemplos) {
    // Semilla propia por ejemplo: ids estables entre builds (diffs limpios) y distintos entre los
    // SVG de una misma pagina (dos <defs> con el mismo id se pisarian).
    tk.setOptions(Object.assign({}, OPCIONES, { xmlIdSeed: semilla++ }));
    if (!tk.loadData(e.mei || e.musicxml)) throw new Error(`${e.id}: Verovio no ha podido leer el fichero`);
    const mei = e.mei || tk.getMEI({});
    const paginas = tk.getPageCount();
    const svg = tk.renderToSVG(1);
    salida.push({ e, mei, paginas, svg });
  }
  return salida;
}

function poner(htmlPath, dibujos, quitarVex) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  for (const { e, svg } of dibujos) {
    const re = new RegExp(`(<div id="${e.id}"[^>]*>)([\\s\\S]*?)(</div>)`);
    if (!re.test(html)) throw new Error(`no encuentro <div id="${e.id}"> en la pagina`);
    html = html.replace(re, (m, a, _b, c) => `${a}<!--VEROVIO-->${svg}<!--/VEROVIO-->${c}`);
  }
  if (quitarVex) {
    const antes = html.length;
    html = html.replace(/<script[^>]*vexflow[^>]*><\/script>\s*/i, '');
    html = html.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded', function\(\) \{\s*if \(!window\.Vex\) return;[\s\S]*?<\/script>\s*/, '');
    if (/\bVex\b|VF\./.test(html)) throw new Error('queda codigo de VexFlow en la pagina; no lo toco a medias');
    console.log(`  VexFlow fuera: la pagina pierde ${antes - html.length} bytes de HTML y la libreria de la CDN`);
  }
  fs.writeFileSync(htmlPath, html);
}

(async () => {
  const args = process.argv.slice(2);
  const nombre = args.find((a) => !a.startsWith('--'));
  // Un conjunto nuevo (una carpeta con musica) se puede verificar y dibujar en seco ANTES de
  // asignarle pagina. Para escribir hace falta una: o esta en CONJUNTOS o se pasa con --pagina=.
  const hayMusica = nombre && (fs.existsSync(path.join(NOTACION, nombre))
    || fs.existsSync(path.join(NOTACION, nombre + '.js')));
  const cfg = CONJUNTOS[nombre] || (hayMusica ? { pagina: null } : null);
  if (!cfg) { console.log('conjuntos con pagina: ' + Object.keys(CONJUNTOS).join(', ')); process.exit(1); }

  const destino = (args.find((a) => a.startsWith('--pagina=')) || '').slice(9).replace(/^\/+|\/+$/g, '') || cfg.pagina;
  if (args.includes('--poner') && !destino) {
    console.log(`«${nombre}» aun no tiene pagina asignada: añadela a CONJUNTOS o usa --pagina=ruta`);
    process.exit(1);
  }
  const paginaHtml = destino ? path.join(RAIZ, destino, 'index.html') : null;

  const ejemplos = cargarEjemplos(nombre);
  const leidos = await leerYDibujar(ejemplos);
  let fallos = 0;
  const falla = (e, etapa, lista) => {
    if (!lista.length) return;
    fallos += lista.length;
    console.log(`✗ ${e.id} (${etapa})`);
    lista.forEach((x) => console.log('     - ' + x));
  };

  // 1) la musica debe ser coherente ANTES de fiarse del dibujo
  for (const l of leidos) {
    falla(l.e, 'la musica', verificar(l.mei, l.e.espera));
    if (l.paginas !== 1) falla(l.e, 'el dibujo', [`Verovio lo ha partido en ${l.paginas} paginas: ¿es mas largo de lo que cabe en un sistema?`]);
  }
  if (fallos) { console.log('\nNo se dibuja nada: hay que arreglar la musica.'); process.exit(1); }

  // 2) y lo dibujado tiene que ser lo descrito
  const dibujos = leidos.map((l) => {
    const alt = l.e.alt || describir(l.mei);
    return Object.assign({ e: l.e, mei: l.mei, alt }, preparar(l.svg, alt));
  });
  for (const d of dibujos) falla(d.e, 'el dibujo', verificarSVG(d.svg, d.mei, d.e.espera));
  if (fallos) { console.log('\nNo se escribe nada: lo dibujado no coincide con lo descrito.'); process.exit(1); }

  // 3) ids unicos entre TODOS los SVG de la pagina, y un <div> para cada ejemplo
  const ids = dibujos.flatMap((d) => [...d.svg.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]));
  const rep = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (rep.length) { console.log('✗ ids repetidos entre ejemplos: ' + rep.slice(0, 3).join(', ')); process.exit(1); }
  if (paginaHtml && fs.existsSync(paginaHtml)) {
    const html = fs.readFileSync(paginaHtml, 'utf8');
    const sinDiv = dibujos.filter((d) => !html.includes(`id="${d.e.id}"`)).map((d) => d.e.id);
    if (sinDiv.length) {
      console.log(`✗ la pagina ${destino} no tiene un <div id="..."> para: ${sinDiv.join(', ')}`);
      console.log('  (el nombre del fichero tiene que ser igual que el id del <div>; ¿hay una errata?)');
      process.exit(1);
    }
  }

  let total = 0;
  for (const d of dibujos) {
    total += d.svg.length;
    console.log(`✓ ${d.e.id.padEnd(20)} ${String(d.svg.length).padStart(5)} bytes · ${d.w}×${d.h} px · ${d.e.origen}`);
    console.log(`     «${d.alt}»`);
  }
  console.log(`  total ${total} bytes de SVG · ${ids.length} ids, todos distintos`);

  if (args.includes('--poner')) {
    poner(paginaHtml, dibujos, args.includes('--quitar-vexflow'));
    console.log(`  escrito ${destino}/index.html`);
  }
})().catch((e) => { console.error(e.message || e); process.exit(1); });
