'use strict';
// Diagrama del Circulo de Quintas (VexFlow 5 + Playwright).
// Armaduras como pentagramas REALES; las 3 posiciones inferiores son enarmonicas
// y muestran DOBLE armadura (5#/7b, 6#/6b, 5b/7#) -> las 15 tonalidades.
// Nombres mayores fuera, relativas menores dentro, branding (Bach + URL) al centro.
// Salida: assets/img/tonalidades/circulo-de-quintas.png
// IMPORTANTE: no poner "svg text{font-family}" en el CSS (rompe la fuente musical).
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VEXFLOW_PATH = path.join(__dirname, 'node_modules/vexflow/build/cjs/vexflow.js');
const OUT_DIR = path.join(__dirname, 'assets/img/tonalidades');
fs.mkdirSync(OUT_DIR, { recursive: true });

const BACH_PATH = path.join(__dirname, 'assets/img/2026/04/bach_favicon.png');
const bachB64 = 'data:image/png;base64,' + fs.readFileSync(BACH_PATH).toString('base64');

// Cada posicion: nombre mayor, relativa menor y spec de armadura (VexFlow).
// Listas de 2 en las posiciones enarmonicas (5, 6, 7).
const POS = [
  { maj: 'Do M',        min: 'la m',          specs: ['C'] },
  { maj: 'Sol M',       min: 'mi m',          specs: ['G'] },
  { maj: 'Re M',        min: 'si m',          specs: ['D'] },
  { maj: 'La M',        min: 'fa♯ m',         specs: ['A'] },
  { maj: 'Mi M',        min: 'do♯ m',         specs: ['E'] },
  { maj: 'Si / Do♭ M',  min: 'sol♯ / la♭ m',  specs: ['B', 'Cb'] },
  { maj: 'Fa♯ / Sol♭ M',min: 're♯ / mi♭ m',   specs: ['F#', 'Gb'] },
  { maj: 'Re♭ / Do♯ M', min: 'si♭ / la♯ m',   specs: ['Db', 'C#'] },
  { maj: 'La♭ M',       min: 'fa m',          specs: ['Ab'] },
  { maj: 'Mi♭ M',       min: 'do m',          specs: ['Eb'] },
  { maj: 'Si♭ M',       min: 'sol m',         specs: ['Bb'] },
  { maj: 'Fa M',        min: 're m',          specs: ['F'] },
];

const W = 2260, H = 2340;
const RENDER = `
function build(def) {
  const { Renderer, Stave } = VexFlow;
  const root = document.getElementById('root');
  const cx = ${W/2}, cy = 1255;
  const R_OUT = 1010, R_MID = 490, R_CEN = 218;
  const R_MAJ = 810, R_STAFF = 625, R_MIN = 355;
  const K = 1.4;                  // escala visual del pentagrama (via CSS, uniforme)
  const SWU = 146;                // ancho del pentagrama a tamano natural (linea con cola tras la armadura)
  const STY = 24;                 // y del pentagrama dentro del lienzo (margen para el rizo superior)
  const WN = SWU + 8, HN = 120;   // lienzo natural amplio: la clave de sol cabe entera arriba y abajo

  // Renderiza un pentagrama a tamano natural (VexFlow lo dibuja perfecto) y lo
  // coloca escalado por CSS, centrado en (x,y). Asi nunca se corta la clave.
  function staff(spec, x, y) {
    const holder = document.createElement('div');
    holder.style.width = WN + 'px'; holder.style.height = HN + 'px';
    const r = new Renderer(holder, Renderer.Backends.SVG);
    r.resize(WN, HN);
    const ctx = r.getContext();
    const st = new Stave(2, STY, SWU, { space_above_staff_ln: 0, space_below_staff_ln: 0 });
    st.addClef('treble');
    if (spec !== 'C') st.addKeySignature(spec);
    st.setContext(ctx).draw();
    holder.style.position = 'absolute';
    holder.style.transformOrigin = 'top left';
    holder.style.left = (x - WN*K/2) + 'px';
    holder.style.top  = (y - HN*K/2) + 'px';
    holder.style.transform = 'scale(' + K + ')';
    root.appendChild(holder);
  }

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', ${W}); svg.setAttribute('height', ${H});
  svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0';
  function circle(r, fill, sw) {
    const c = document.createElementNS(svgNS, 'circle');
    c.setAttribute('cx', cx); c.setAttribute('cy', cy); c.setAttribute('r', r);
    c.setAttribute('fill', fill); c.setAttribute('stroke', '#8b6914'); c.setAttribute('stroke-width', sw);
    svg.appendChild(c);
  }
  circle(R_OUT, '#f4ecde', 3);
  circle(R_MID, '#ece2ce', 2);
  circle(R_CEN, '#faf7f2', 3);
  for (let i = 0; i < 12; i++) {
    const a = (-90 + i*30 + 15) * Math.PI/180;
    const l = document.createElementNS(svgNS, 'line');
    l.setAttribute('x1', cx + R_CEN*Math.cos(a)); l.setAttribute('y1', cy + R_CEN*Math.sin(a));
    l.setAttribute('x2', cx + R_OUT*Math.cos(a)); l.setAttribute('y2', cy + R_OUT*Math.sin(a));
    l.setAttribute('stroke', '#c8b896'); l.setAttribute('stroke-width', 2);
    svg.appendChild(l);
  }
  root.appendChild(svg);

  function place(el, x, y) {
    el.style.position = 'absolute';
    el.style.left = x + 'px'; el.style.top = y + 'px';
    el.style.transform = 'translate(-50%, -50%)';
    root.appendChild(el);
  }
  function label(text, cls, x, y) {
    const d = document.createElement('div');
    d.className = cls; d.innerHTML = text;
    place(d, x, y);
  }

  def.forEach(function (p, i) {
    const a = (-90 + i*30) * Math.PI/180;
    const dual = p.specs.length > 1;
    const rMaj = dual ? R_MAJ + 40 : R_MAJ;   // en las enarmonicas el nombre va mas afuera (la pareja ocupa mas)
    label(p.maj, 'maj', cx + rMaj*Math.cos(a), cy + rMaj*Math.sin(a));
    label(p.min, 'min', cx + R_MIN*Math.cos(a), cy + R_MIN*Math.sin(a));
    const px = cx + R_STAFF*Math.cos(a), py = cy + R_STAFF*Math.sin(a);
    if (!dual) {
      staff(p.specs[0], px, py);
    } else {
      const dy = 78;             // separacion vertical entre los dos pentagramas enarmonicos
      staff(p.specs[0], px, py - dy);
      staff(p.specs[1], px, py + dy);
    }
  });

  label('Círculo de Quintas', 'title', cx, 120);
  label('Tonalidades mayores · sus relativas menores · sus armaduras', 'subtitle', cx, 198);
  label('↺ bemoles', 'side', cx - 690, 320);
  label('sostenidos ↻', 'side', cx + 690, 320);

  const c = document.createElement('div'); c.className = 'brandc';
  const img = document.createElement('img'); img.src = '${bachB64}'; img.className = 'bach';
  const u = document.createElement('div'); u.className = 'brandu'; u.textContent = 'teoriamusical.com.es';
  c.appendChild(img); c.appendChild(u);
  place(c, cx, cy);
}
`;

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.setViewportSize({ width: W, height: H });
  await page.setContent(`<!DOCTYPE html><html><head><style>
    html,body{margin:0;padding:0;}
    #root{position:relative;width:${W}px;height:${H}px;background:#faf7f2;font-family:Georgia,'Times New Roman',serif;}
    .maj{font-weight:700;font-size:44px;color:#2b2212;text-align:center;white-space:nowrap;}
    .min{font-style:italic;font-size:27px;color:#a0522d;text-align:center;white-space:nowrap;}
    .title{font-weight:700;font-size:70px;color:#2b2212;text-align:center;white-space:nowrap;}
    .subtitle{font-size:29px;color:#8b6914;text-align:center;white-space:nowrap;}
    .side{font-size:28px;color:#8b6914;text-align:center;white-space:nowrap;}
    .brandc{display:flex;flex-direction:column;align-items:center;justify-content:center;}
    .bach{width:140px;height:140px;display:block;}
    .brandu{font-weight:700;font-size:27px;color:#8b6914;margin-top:6px;white-space:nowrap;}
  </style></head><body><div id="root"></div></body></html>`);
  await page.addScriptTag({ path: VEXFLOW_PATH });
  await page.addScriptTag({ content: RENDER });
  await page.evaluate((d) => build(d), POS);
  await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; });
  await page.waitForTimeout(600);
  const png = path.join(OUT_DIR, 'circulo-de-quintas.png');
  await page.screenshot({ path: png, clip: { x: 0, y: 0, width: W, height: H } });
  console.log('OK', png);
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
