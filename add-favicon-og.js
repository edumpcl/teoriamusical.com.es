'use strict';
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ROOT = __dirname;
const FAVICON = path.join(ROOT, 'assets/img/favicon.png');

// Each image + where to place the favicon (relative to image edges)
// anchor: 'right' or 'left'  |  x/y = distance from that edge/bottom
const TARGETS = [
  { file: 'assets/img/og-afinador.png',                anchor:'right', x:22, y:50, size:36 },
  { file: 'assets/img/og-metronomo.png',               anchor:'right', x:22, y:50, size:36 },
  { file: 'assets/img/og-compases.png',                anchor:'right', x:22, y:50, size:36 },
  { file: 'assets/img/og/intervalos-musicales.png',    anchor:'left',  x:52, y:68, size:36 },
];

async function composite(page, target, faviconB64) {
  const imgPath = path.join(ROOT, target.file);
  const imgB64  = fs.readFileSync(imgPath).toString('base64');
  const ext     = imgPath.endsWith('.jpg') ? 'jpeg' : 'png';

  const pos = target.anchor === 'right'
    ? `right:${target.x}px; bottom:${target.y}px;`
    : `left:${target.x}px;  bottom:${target.y}px;`;

  const html = `<!DOCTYPE html><html><body style="margin:0;padding:0;width:1200px;height:630px;position:relative;overflow:hidden;">
  <img src="data:image/${ext};base64,${imgB64}" style="width:1200px;height:630px;display:block;position:absolute;top:0;left:0;">
  <img src="data:image/png;base64,${faviconB64}"
       style="position:absolute;${pos}width:${target.size}px;height:${target.size}px;
              border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,.45);">
</body></html>`;

  await page.setContent(html);
  await page.waitForTimeout(150);
  const buf = await page.screenshot({ clip: { x:0, y:0, width:1200, height:630 } });
  fs.writeFileSync(imgPath, buf);
  console.log(`  ✓ ${target.file}`);
}

async function main() {
  const browser   = await chromium.launch();
  const ctx       = await browser.newContext({ deviceScaleFactor: 1 });
  const page      = await ctx.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });

  const faviconB64 = fs.readFileSync(FAVICON).toString('base64');

  for (const t of TARGETS) {
    await composite(page, t, faviconB64);
  }

  await browser.close();
  console.log('\nDone!');
}

main().catch(err => { console.error(err); process.exit(1); });
