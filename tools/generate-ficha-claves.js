/**
 * Fichas imprimibles para aprender a dibujar las claves (infantil).
 *   node tools/generate-ficha-claves.js            -> las tres
 *   node tools/generate-ficha-claves.js fa         -> solo una
 *   node tools/generate-ficha-claves.js sol --png  -> + vista previa PNG
 * Salida: assets/img/claves/ficha-dibujar-clave-de-<x>.pdf (A4, 1 hoja)
 *
 * Ayuda decreciente: la clave se repasa sobre una linea de puntos que se va
 * separando fila a fila, hasta dibujarla sin ayuda.
 *
 * POR QUE UN TRAZO PROPIO Y NO EL GLIFO TIPOGRAFICO: el glifo es una silueta
 * RELLENA, asi que puntearlo dibuja su CONTORNO (dos bordes). Un lapiz no
 * dibuja contornos: dibuja una linea. Aqui se puntea la LINEA CENTRAL, el
 * recorrido que hace la mano, definido con curvas Bezier y verificado
 * superponiendolo sobre el glifo real de VexFlow.
 *
 * Coordenadas del trazo: 1 unidad = 1 espacio de pentagrama. y=0 es la LINEA
 * DE REFERENCIA de cada clave (2ª para Sol, 4ª para Fa, 3ª para Do); y crece
 * hacia abajo. 'refDesdeAbajo' es el indice de esa linea contando desde la de
 * abajo (0 = 1ª linea ... 4 = 5ª linea).
 */
const { chromium } = require('playwright');
const path = require('path');

const CLAVES = {
  sol: {
    nombre: 'Sol', refDesdeAbajo: 1, minY: -4.45, maxY: 2.92, ancho: 2.5,
    d: [
      'M 0.32 2.42', 'C 0.62 2.92, 1.32 2.78, 1.03 1.95',
      'C 1.07 1.10, 1.14 0.30, 1.17 -0.55',
      'C 1.20 -1.60, 1.27 -2.70, 1.50 -3.55',
      'C 1.67 -4.20, 2.25 -4.45, 2.35 -3.75',
      'C 2.45 -3.05, 1.90 -2.45, 1.40 -2.00',
      'C 0.70 -1.35, 0.00 -0.75, 0.03 0.10',
      'C 0.05 0.95, 0.75 1.35, 1.35 1.05',
      'C 2.00 0.72, 2.10 -0.10, 1.45 -0.35',
      'C 0.95 -0.52, 0.70 0.15, 1.10 0.42',
    ].join(' '),
    pasos: 'empieza abajo, en la colita; sube cruzando todo el pentagrama; da la '
         + 'vuelta por arriba hacia la <b>derecha</b>; baja en arco hacia la '
         + '<b>izquierda</b> haciendo la barriga; y termina cerrando el bucle '
         + 'alrededor de la <b>2ª línea</b> (la segunda contando desde abajo).',
  },
  fa: {
    nombre: 'Fa', refDesdeAbajo: 3, minY: -0.75, maxY: 3.00, ancho: 2.35,
    d: [
      'M 0.10 0.42',
      'C 0.05 -0.30, 0.70 -0.72, 1.20 -0.42',
      'C 1.72 -0.10, 1.80 0.72, 1.45 1.45',
      'C 1.15 2.10, 0.65 2.60, 0.05 2.95',
    ].join(' '),
    puntos: [[2.10, -0.5], [2.10, 0.5]],
    pasos: 'empieza con la cabeza gorda sobre la <b>4ª línea</b>; sube y curva '
         + 'hacia la derecha; baja en arco hasta cerca de la 1ª línea, como una '
         + 'coma grande; y coloca los <b>dos puntos</b> a la derecha, uno encima '
         + 'y otro debajo de la 4ª línea. Los dos puntos son los que dicen dónde '
         + 'está el Fa: si los pones en otra línea, ya no es una clave de Fa en 4ª.',
  },
  do: {
    nombre: 'Do', refDesdeAbajo: 2, minY: -2.15, maxY: 2.15, ancho: 2.15,
    d: [
      'M 0.12 -2.02 L 0.12 2.02',
      'M 0.44 -2.02 L 0.44 2.02',
      'M 0.62 -2.00',
      'C 1.55 -2.12, 2.00 -1.30, 1.52 -0.55',
      'C 1.28 -0.18, 0.98 -0.06, 0.64 0.00',
      'C 0.98 0.06, 1.28 0.18, 1.52 0.55',
      'C 2.00 1.30, 1.55 2.12, 0.62 2.00',
    ].join(' '),
    pasos: 'traza primero las <b>dos rayas verticales</b> de la izquierda, de '
         + 'arriba abajo del pentagrama; después la curva de arriba, que se abre '
         + 'a la derecha y vuelve al centro; y por último la de abajo, igual pero '
         + 'del revés. Las dos curvas tienen que juntarse <b>sobre la 3ª línea</b>: '
         + 'ese punto es el que dice dónde está el Do.',
  },
};

// 'dash' en PIXELES de la ficha; se normaliza dividiendo por la escala, porque
// stroke-dasharray se expresa en coordenadas del trazo (que va escalado).
const FILAS = [
  { etiqueta: '1. Mira el modelo',               n: 5, solido: true },
  { etiqueta: '2. Repasa los puntos',            n: 5, dash: [2.2, 1.6] },
  { etiqueta: '3. Repasa los puntos otra vez',   n: 5, dash: [2.2, 1.6] },
  { etiqueta: '4. Puntos más sueltos',           n: 5, dash: [1.8, 3.0] },
  { etiqueta: '5. Puntos más sueltos otra vez',  n: 5, dash: [1.8, 3.0] },
  { etiqueta: '6. Ya casi sin ayuda',            n: 5, dash: [1.4, 5.2] },
  { etiqueta: '7. Solo el punto de referencia',  n: 5, punto: true },
  { etiqueta: '8. Dibújala tú',                  n: 5 },
];

(async () => {
  const args = process.argv.slice(2);
  const png = args.includes('--png');
  const cuales = args.filter(a => CLAVES[a]);
  const lista = cuales.length ? cuales : Object.keys(CLAVES);

  const browser = await chromium.launch();
  const altoUtil = Math.round((297 - 22) / 25.4 * 96);   // A4 menos margenes

  for (const c of lista) {
    const page = await browser.newPage();

    // Las claves no miden lo mismo (la de Fa ocupa menos alto que la de Sol),
    // asi que se mide una pasada y se anaden filas de practica hasta llenar el
    // folio: no tiene sentido imprimir una hoja con un tercio en blanco.
    let filas = FILAS.slice();
    await page.setContent(construirFicha(CLAVES[c], filas));
    let alto = await page.evaluate(() => document.body.scrollHeight);
    const altoFila = await page.evaluate(
      () => document.querySelector('.fila').getBoundingClientRect().height + 4);
    let extra = 0;
    while (alto + altoFila <= altoUtil && extra < 6) {
      // Se repiten los niveles intermedios, que son los que de verdad se
      // practican. La copia va JUNTO A SU NIVEL, no al final: si se anade
      // detras, la dificultad deja de ser creciente y la ficha pierde sentido.
      const plantilla = FILAS[3 + (extra % 3)];
      const firma = JSON.stringify(plantilla.dash);
      const idx = filas.map(f => JSON.stringify(f.dash)).lastIndexOf(firma);
      filas.splice(idx + 1, 0, { ...plantilla });
      extra++;
      await page.setContent(construirFicha(CLAVES[c], filas));
      alto = await page.evaluate(() => document.body.scrollHeight);
    }
    // renumerar las etiquetas tras insertar
    filas = filas.map((f, i) => ({ ...f, etiqueta: f.etiqueta.replace(/^\d+\.\s*/, (i + 1) + '. ') }));
    await page.setContent(construirFicha(CLAVES[c], filas));
    await page.evaluate(() => document.fonts.ready);
    alto = await page.evaluate(() => document.body.scrollHeight);

    const cabe = alto <= altoUtil;
    console.log(`clave de ${CLAVES[c].nombre}: ${filas.length} filas, ${alto}px de ${altoUtil}px ` +
                (cabe ? '-> CABE EN 1 HOJA' : '-> SE PARTE EN 2 HOJAS'));

    const salida = path.join(__dirname, '..', 'assets', 'img', 'claves',
                             `ficha-dibujar-clave-de-${c}.pdf`);
    await page.pdf({ path: salida, format: 'A4', printBackground: true,
                     margin: { top: '12mm', bottom: '10mm', left: '12mm', right: '12mm' } });
    if (png) {
      await page.setViewportSize({ width: 780, height: 1100 });
      await page.screenshot({ path: salida.replace('.pdf', '-preview.png'), fullPage: true });
    }
    await page.close();
    console.log('  OK ->', path.basename(salida));
  }
  await browser.close();
})();

function construirFicha(cfg, filas) {
  // Ancho imprimible de un A4 con margenes de 12mm: (210-24)mm a 96dpi.
  const ANCHO = Math.round((210 - 24) / 25.4 * 96);   // ~703
  const ESP = 11;
  const PAD = 6;   // aire minimo alrededor

  // Cuanto sobresale la clave por arriba/abajo respecto del pentagrama.
  const staffArriba = 4 - cfg.refDesdeAbajo;     // espacios de pentagrama sobre la ref
  const staffAbajo = cfg.refDesdeAbajo;
  const MARGEN_SUP = Math.max(staffArriba, -cfg.minY) * ESP + PAD;
  const MARGEN_INF = Math.max(staffAbajo, cfg.maxY) * ESP + PAD;
  const ALTO = MARGEN_SUP + MARGEN_INF;
  const Y_REF = MARGEN_SUP;                       // y de la linea de referencia

  const fila = (f) => {
    const lineas = [0, 1, 2, 3, 4].map(i =>
      `<line x1="0" y1="${Y_REF + (cfg.refDesdeAbajo - i) * ESP}" x2="${ANCHO}"
             y2="${Y_REF + (cfg.refDesdeAbajo - i) * ESP}" stroke="#111" stroke-width="1"/>`).join('');

    let claves = '';
    for (let k = 0; k < f.n; k++) {
      const x = 22 + k * ((ANCHO - 44 - cfg.ancho * ESP) / (f.n - 1));
      const t = `translate(${x},${Y_REF}) scale(${ESP})`;
      if (f.solido || f.dash) {
        const dash = f.dash
          ? ` stroke-dasharray="${f.dash.map(v => (v / ESP).toFixed(4)).join(' ')}"` : '';
        claves += `<path d="${cfg.d}" transform="${t}" fill="none" stroke="#222"`
                + ` stroke-width="${(f.solido ? 1.5 : 1.25) / ESP}" stroke-linecap="round"`
                + ` stroke-linejoin="round"${dash}/>`;
        (cfg.puntos || []).forEach(([px, py]) => {
          const r = f.solido ? 2.4 : 1.9;
          claves += `<circle cx="${x + px * ESP}" cy="${Y_REF + py * ESP}" r="${r}"`
                  + (f.solido ? ' fill="#222"/>'
                              : ` fill="none" stroke="#222" stroke-width="0.9"/>`);
        });
      }
      if (f.punto) {
        claves += `<circle cx="${x + 1.0 * ESP}" cy="${Y_REF}" r="3" fill="#b08d3f"/>`;
      }
    }
    return `<div class="fila">
      <div class="et">${f.etiqueta}</div>
      <svg width="${ANCHO}" height="${ALTO}" style="display:block">${lineas}${claves}</svg>
    </div>`;
  };

  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
    @page { size: A4 portrait; }
    body { font-family: Arial, Helvetica, sans-serif; color:#1a1a1a; margin:0; }
    h1 { font-size: 19px; margin:0 0 2px; }
    .sub { font-size: 12px; color:#444; margin:0 0 6px; }
    .pasos { font-size: 11.5px; color:#333; background:#faf7ef; border:1px solid #e6dcc4;
             border-radius:6px; padding:7px 10px; margin:0 0 8px; line-height:1.45; }
    .pasos b { color:#7a5f1e; }
    .fila { margin: 0 0 4px; break-inside: avoid; }
    .et { font-size: 11px; font-weight: bold; color:#7a5f1e; margin: 0 0 1px; }
    .pie { margin-top:6px; font-size:10px; color:#666; text-align:center;
           border-top:1px solid #ddd; padding-top:5px; }
  </style></head><body>
    <h1>Aprende a dibujar la clave de ${cfg.nombre}</h1>
    <p class="sub">Ficha para imprimir · teoriamusical.com.es</p>
    <div class="pasos">
      <b>Cómo se dibuja:</b> ${cfg.pasos}<br>
      <b>Se dibuja con una línea fina, sin levantar el lápiz.</b> En las partituras
      la clave se ve más gruesa porque está impresa, pero a mano se hace así.
    </div>
    ${(filas || FILAS).map(fila).join('')}
    <div class="pie">teoriamusical.com.es — puedes imprimir y fotocopiar esta ficha libremente para uso en el aula o en casa.</div>
  </body></html>`;
}
