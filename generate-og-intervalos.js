'use strict';
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUTPUT_PATH  = path.join(__dirname, 'assets/img/og/intervalos-musicales.png');

const HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  width:1200px; height:630px;
  background:#faf8f4;
  font-family:'Georgia',serif;
  overflow:hidden;
  position:relative;
}
.bar-left   { position:absolute; left:0; top:0; bottom:0; width:10px; background:#7a3e1a; }
.bar-top    { position:absolute; left:0; right:0; top:0; height:5px; background:linear-gradient(to right,#7a3e1a,#b8860b,#7a3e1a); }
.bar-bottom { position:absolute; left:0; right:0; bottom:0; height:5px; background:linear-gradient(to right,#7a3e1a,#b8860b,#7a3e1a); }

.layout {
  position:absolute; left:10px; right:0; top:5px; bottom:5px;
  display:flex;
}

/* LEFT COLUMN */
.col-left {
  width:560px; padding:48px 40px 40px 52px;
  display:flex; flex-direction:column; justify-content:space-between;
}
.brand {
  font-family:'Arial',sans-serif; font-size:20px;
  color:#b8860b; font-weight:700; letter-spacing:1px;
  text-transform:uppercase;
}
.title-block { flex:1; display:flex; flex-direction:column; justify-content:center; }
h1 {
  font-size:68px; line-height:1.08; color:#2a0e00;
  font-weight:700; margin-bottom:18px;
}
.subtitle {
  font-family:'Arial',sans-serif; font-size:22px;
  color:#7a3e1a; line-height:1.5;
}
.divider {
  width:60px; height:3px; background:#b8860b; margin:18px 0;
}
.tags {
  font-family:'Arial',sans-serif; font-size:15px;
  color:#a07050; letter-spacing:0.5px;
}
.url {
  font-family:'Arial',sans-serif; font-size:18px;
  color:#b8860b; font-weight:600; letter-spacing:0.5px;
}

/* RIGHT COLUMN */
.col-right {
  flex:1;
  background:linear-gradient(135deg,#f0e8d8 0%,#e8dcc8 100%);
  display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  gap:24px; padding:30px 40px;
  border-left:1px solid #d4c4a0;
}
.stave-row {
  display:flex; gap:24px; align-items:flex-start;
}
.stave-item {
  display:flex; flex-direction:column; align-items:center; gap:6px;
}
.stave-label {
  font-family:'Arial',sans-serif; font-size:14px;
  color:#7a3e1a; font-weight:700; text-align:center;
  line-height:1.3;
}
</style>
</head>
<body>
  <div class="bar-left"></div>
  <div class="bar-top"></div>
  <div class="bar-bottom"></div>

  <div class="layout">
    <div class="col-left">
      <div class="brand">Teoría Musical</div>
      <div class="title-block">
        <h1>Intervalos<br>Musicales</h1>
        <div class="divider"></div>
        <div class="subtitle">Definición, tipos y<br>ejemplos en pentagrama</div>
        <div class="tags" style="margin-top:14px">Armónicos · Melódicos · Simples · Compuestos</div>
      </div>
      <div class="url">teoriamusical.com.es</div>
    </div>

    <div class="col-right">
      <div class="stave-row">
        <div class="stave-item"><div id="vf1"></div><div class="stave-label">2ª Mayor</div></div>
        <div class="stave-item"><div id="vf2"></div><div class="stave-label">3ª menor</div></div>
        <div class="stave-item"><div id="vf3"></div><div class="stave-label">4ª Justa</div></div>
      </div>
      <div class="stave-row">
        <div class="stave-item"><div id="vf4"></div><div class="stave-label">5ª Justa</div></div>
        <div class="stave-item"><div id="vf5"></div><div class="stave-label">6ª Mayor</div></div>
        <div class="stave-item"><div id="vf6"></div><div class="stave-label">8ª Justa</div></div>
      </div>
    </div>
  </div>
</body>
</html>`;

const RENDER_FN = `
function renderStave(divId, keys, accs) {
  const { Renderer, Stave, StaveNote, Formatter, Accidental, Voice } = VexFlow;
  const div = document.getElementById(divId);
  const vw = 180, vh = 130, sy = 16;
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  renderer.resize(vw, vh);
  const context = renderer.getContext();
  const stave = new Stave(8, sy, vw - 16);
  stave.addClef('treble');
  stave.setContext(context).draw();
  const sn = new StaveNote({ keys, duration: 'w', clef: 'treble' });
  for (const [ki, t] of accs) sn.addModifier(new Accidental(t), ki);
  const voice = new Voice({ num_beats: 4, beat_value: 4 });
  voice.setMode(Voice.Mode.SOFT);
  voice.addTickables([sn]);
  new Formatter().joinVoices([voice]).format([voice], vw - 55);
  voice.draw(context, stave);
}
renderStave('vf1', ['c/4','d/4'],  []);           // 2ª Mayor
renderStave('vf2', ['c/4','eb/4'], [[1,'b']]);    // 3ª menor
renderStave('vf3', ['c/4','f/4'],  []);           // 4ª Justa
renderStave('vf4', ['c/4','g/4'],  []);           // 5ª Justa
renderStave('vf5', ['c/4','a/4'],  []);           // 6ª Mayor
renderStave('vf6', ['c/4','c/5'],  []);           // 8ª Justa
`;

async function main() {
  const browser = await chromium.launch();
  const ctx  = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(HTML);
  await page.addScriptTag({ path: VEXFLOW_PATH });
  await page.addScriptTag({ content: RENDER_FN });
  await page.waitForTimeout(300);
  const buf = await page.screenshot({ fullPage: false, clip: { x:0, y:0, width:1200, height:630 } });
  fs.writeFileSync(OUTPUT_PATH, buf);
  console.log('✓ assets/img/og/intervalos-musicales.png');
  await browser.close();
}

main().catch(err => { console.error(err); process.exit(1); });
