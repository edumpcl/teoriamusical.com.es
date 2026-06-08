'use strict';
// Genera una infografía-tabla de intervalos musicales (PNG) optimizada para el
// pack de imágenes de Google ("tabla/cuadro de intervalos"). Render con Playwright
// para un acabado on-brand. Salida: assets/img/intervalos/tabla-de-intervalos-musicales.png
// (luego convert_to_webp.py). Datos espejo de la tabla HTML de la página.
// Incluye el ejemplo en pentagrama: ejecuta antes generate-intervalos-ejemplos.js.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, 'assets/img/intervalos');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });
// Incrusta los PNG del pentagrama como data URI (Chromium bloquea file:// en setContent).
function dataUri(name) {
  const b64 = fs.readFileSync(path.join(OUTPUT_DIR, name + '.png')).toString('base64');
  return 'data:image/png;base64,' + b64;
}
// Favicon de Bach (mascota del sitio), el mismo que usan las imágenes OG.
const BACH_URI = 'data:image/png;base64,' +
  fs.readFileSync(path.join(__dirname, 'assets/img/2026/04/bach_favicon.png')).toString('base64');

// intervalo, calificación, semitonos, ejemplo (texto), fichero del pentagrama
const ROWS = [
  ['Unísono', 'Justo', '0', 'Do – Do', 'ejemplo-do-do'],
  ['2ª', 'menor', '1', 'Do – Re♭', 'ejemplo-do-reb'],
  ['2ª', 'Mayor', '2', 'Do – Re', 'ejemplo-do-re'],
  ['3ª', 'menor', '3', 'Do – Mi♭', 'ejemplo-do-mib'],
  ['3ª', 'Mayor', '4', 'Do – Mi', 'ejemplo-do-mi'],
  ['4ª', 'Justa', '5', 'Do – Fa', 'ejemplo-do-fa'],
  ['4ª Aum. / Tritono', 'Aumentada', '6', 'Do – Fa♯', 'ejemplo-do-fas'],
  ['5ª', 'Justa', '7', 'Do – Sol', 'ejemplo-do-sol'],
  ['6ª', 'menor', '8', 'Do – La♭', 'ejemplo-do-lab'],
  ['6ª', 'Mayor', '9', 'Do – La', 'ejemplo-do-la'],
  ['7ª', 'menor', '10', 'Do – Si♭', 'ejemplo-do-sib'],
  ['7ª', 'Mayor', '11', 'Do – Si', 'ejemplo-do-si'],
  ['8ª', 'Justa', '12', "Do – Do'", 'ejemplo-do-do8'],
];

const rowsHtml = ROWS.map(([a, b, c, d, img], i) =>
  `<tr class="${i % 2 ? 'odd' : 'even'}">
     <td class="c-int">${a}</td>
     <td>${b}</td>
     <td class="c-num">${c}</td>
     <td class="c-ex">${d}</td>
     <td class="c-staff"><img src="${dataUri(img)}" alt=""></td>
   </tr>`).join('');

const HTML = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#ffffff; }
  /* Proporción A3 vertical (1000 / 1414 = 0,707) para que llene la hoja al imprimir. */
  .card { width:1000px; height:1414px; display:flex; flex-direction:column;
          background:#fffdf9; border:1px solid #e6dcc6;
          border-radius:18px; overflow:hidden; font-family:'Segoe UI',Arial,sans-serif;
          box-shadow:0 10px 30px rgba(120,90,20,.10); }
  .head { flex:none; background:linear-gradient(135deg,#b8860b,#9a6f08); padding:30px 34px 24px; }
  .tbl { flex:1 1 auto; }
  .tbl table { height:100%; }
  .head h1 { color:#fff; font-family:Georgia,'Times New Roman',serif; font-size:36px;
             font-weight:700; letter-spacing:.2px; }
  .head p { color:#f6e9c8; font-size:17px; margin-top:6px; }
  table { width:100%; border-collapse:collapse; }
  thead th { background:#f3e8cf; color:#5b4406; font-size:15px; text-transform:uppercase;
             letter-spacing:.5px; text-align:left; padding:13px 30px; }
  thead th.c-num, tbody td.c-num { text-align:center; }
  thead th.c-staff, tbody td.c-staff { text-align:center; }
  tbody td { padding:9px 30px; font-size:19px; color:#2a2113;
             vertical-align:middle; border-top:1px solid #efe6d2; }
  tbody tr.odd { background:#faf6ec; }
  td.c-int { font-weight:700; color:#1d1708; }
  td.c-num { font-weight:700; color:#b8860b; font-size:19px; }
  td.c-ex { color:#5a5240; white-space:nowrap; }
  td.c-staff img { display:block; margin:0 auto; height:58px; width:auto;
                   background:#fff; border:1px solid #ece3cf; border-radius:6px; }
  .foot { flex:none; display:flex; justify-content:space-between; align-items:center;
          padding:16px 34px; background:#f7efde; border-top:2px solid #b8860b; }
  .foot .note { color:#9a6f08; font-size:22px; }
  .foot .brand { display:flex; align-items:center; gap:11px;
                 color:#7a6a3a; font-size:17px; font-family:Georgia,serif; font-weight:700; }
  .foot .brand img.bach { height:40px; width:auto; display:block; }
</style></head><body>
  <div class="card" id="card">
    <div class="head">
      <h1>Tabla de intervalos musicales</h1>
      <p>Calificación, distancia en semitonos y ejemplo desde <strong>Do</strong></p>
    </div>
    <div class="tbl">
    <table>
      <thead><tr><th class="c-int">Intervalo</th><th>Calificación</th>
        <th class="c-num">Semitonos</th><th>Ejemplo desde Do</th>
        <th class="c-staff">En el pentagrama</th></tr></thead>
      <tbody>${rowsHtml}</tbody>
    </table>
    </div>
    <div class="foot"><span class="note">𝄞 ♪ ♩</span>
      <span class="brand"><img class="bach" src="${BACH_URI}" alt="">teoriamusical.com.es</span></div>
  </div>
</body></html>`;

async function main() {
  const browser = await chromium.launch();
  // deviceScaleFactor 4 → ~4000 px de ancho: imprime nítida a A3 (~340 DPI).
  // La imagen solo se sirve como descarga (no incrustada), así que el peso no afecta a la página.
  const ctx = await browser.newContext({ deviceScaleFactor: 4 });
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 1080, height: 1480 });
  await page.setContent(HTML);
  await page.waitForTimeout(400);
  const card = await page.$('#card');
  await card.screenshot({ path: path.join(OUTPUT_DIR, 'tabla-de-intervalos-musicales.png') });
  console.log('  ok tabla-de-intervalos-musicales.png');
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
