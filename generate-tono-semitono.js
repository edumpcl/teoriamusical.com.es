'use strict';
// Genera un diagrama de teclado marcando un TONO (Do–Re, con tecla negra en medio)
// y los SEMITONOS naturales (Mi–Fa y Si–Do, sin tecla negra). Playwright screenshot.
// Salida: assets/img/intervalos/tono-semitono-teclado.png (+ webp).
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, 'assets/img/intervalos');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const WK = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do'];
const W = 52; // ancho tecla blanca
// Teclas negras tras las blancas de índice 0,1,3,4,5 (no tras Mi=2 ni Si=6)
const BLACK_AFTER = [0, 1, 3, 4, 5];
const whiteHtml = WK.map((n) => `<div class="wk">${n}</div>`).join('');
const blackHtml = BLACK_AFTER.map((i) => `<div class="bk" style="left:${(i + 1) * W - 16}px"></div>`).join('');
const center = (i) => i * W + W / 2;
function bracket(i1, i2, cls, label) {
  const l = center(i1), r = center(i2);
  return `<div class="br ${cls}" style="left:${l}px;width:${r - l}px"><span class="lbl">${label}</span></div>`;
}
const brackets = [
  bracket(0, 1, 'tono', '1 tono'),
  bracket(2, 3, 'semi', '½ tono'),
  bracket(6, 7, 'semi', '½ tono'),
].join('');

const HTML = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#fff; }
  .stage { display:inline-block; background:#fff; padding:26px 30px 22px; font-family:Arial,'Segoe UI',sans-serif; }
  .kb { position:relative; width:${WK.length * W}px; }
  .brackets { position:relative; height:48px; }
  .br { position:absolute; bottom:2px; height:15px; border:2.5px solid; border-bottom:none; }
  .br.tono { border-color:#b8860b; }
  .br.semi { border-color:#b0532a; }
  .br .lbl { position:absolute; left:50%; transform:translateX(-50%); bottom:17px; font-weight:700; font-size:14px; white-space:nowrap; }
  .br.tono .lbl { color:#9a6f08; }
  .br.semi .lbl { color:#8f3f1c; }
  .keys { position:relative; height:168px; display:flex; }
  .wk { width:${W}px; height:168px; background:#fff; border:1.5px solid #333; border-top:none;
        display:flex; align-items:flex-end; justify-content:center; padding-bottom:9px;
        font-weight:600; font-size:15px; color:#333; }
  .wk + .wk { border-left:none; }
  .keys { border-top:1.5px solid #333; }
  .bk { position:absolute; top:0; width:32px; height:104px; background:#1a1a1a;
        border-radius:0 0 4px 4px; z-index:2; }
</style></head><body>
  <div class="stage" id="stage">
    <div class="kb">
      <div class="brackets">${brackets}</div>
      <div class="keys">${whiteHtml}${blackHtml}</div>
    </div>
  </div>
</body></html>`;

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 700, height: 360 });
  await page.setContent(HTML);
  await page.waitForTimeout(160);
  const el = await page.$('#stage');
  await el.screenshot({ path: path.join(OUTPUT_DIR, 'tono-semitono-teclado.png') });
  console.log('  ok tono-semitono-teclado.png');
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
