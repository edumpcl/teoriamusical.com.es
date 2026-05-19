// Playwright visual check — afinador overflow with transpositor + accidentals
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = 'http://localhost:8787';

const MOBILE  = { width: 375, height: 812 };   // iPhone X portrait
const DESKTOP = { width: 1280, height: 800 };

const PAGES = [
  { slug: 'trompeta',  transp: 2,  label: 'Trompeta (Sib)' },
  { slug: 'trompa',    transp: -5, label: 'Trompa (Fa)' },
  { slug: 'clarinete', transp: 2,  label: 'Clarinete (Sib)' },
];

// Inject a fake note into the display without mic
async function injectNote(page, noteName, octave, centsOff = 0) {
  await page.evaluate(({ noteName, octave, centsOff }) => {
    // Find the display elements and set them directly
    const nameEl = document.getElementById('note-name');
    const octEl  = document.getElementById('note-octave');
    const freqEl = document.getElementById('note-freq');
    const writEl = document.getElementById('note-written');
    const woctEl = document.getElementById('note-written-oct');
    const centsEl = document.getElementById('cents-display');
    const display = document.getElementById('note-display');

    if (!nameEl) return;

    // Remove no-transp so 2-column layout shows
    display.classList.remove('no-transp');

    nameEl.className = 'note-name in-tune';
    nameEl.textContent = noteName;
    octEl.textContent = octave;
    freqEl.textContent = '440.0 Hz';

    // Compute written note from transpSemitones (already set by AFIN_TRANSP)
    const NOTE_NAMES = ['Do','Do♯','Re','Re♯','Mi','Fa','Fa♯','Sol','Sol♯','La','La♯','Si'];
    const noteIdx = NOTE_NAMES.indexOf(noteName);
    if (noteIdx !== -1) {
      // Just show a plausible written note
      const writIdx = ((noteIdx + 14) % 12); // +2 for Sib approx
      writEl.className = 'note-name written in-tune';
      writEl.textContent = NOTE_NAMES[writIdx];
      woctEl.textContent = octave;
    }

    centsEl.className = 'cents-display in-tune';
    centsEl.textContent = '+0 ¢';
  }, { noteName, octave, centsOff });
}

async function checkOverflow(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    return {
      left: rect.left,
      right: rect.right,
      width: rect.width,
      vw,
      overflowsLeft:  rect.left < 0,
      overflowsRight: rect.right > vw,
    };
  }, selector);
}

async function run() {
  const browser = await chromium.launch();
  const screenshotDir = path.join(__dirname, 'pw_screenshots');

  // Ensure screenshot dir exists
  const fs = await import('fs');
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir);

  const results = [];

  for (const { slug, transp, label } of PAGES) {
    const url = `${BASE}/herramientas/afinador/${slug}/`;

    for (const [modeName, viewport] of [['mobile', MOBILE], ['desktop', DESKTOP]]) {
      const ctx  = await browser.newContext({ viewport });
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: 'domcontentloaded' });

      // Wait for JS to init (transpositor default)
      await page.waitForTimeout(600);

      // Take screenshot: initial state (transpositor active, no note)
      await page.screenshot({
        path: path.join(screenshotDir, `${slug}_${modeName}_idle.png`),
        fullPage: false,
      });

      // Simulate the worst-case note: Sol♯
      await injectNote(page, 'Sol♯', 4);
      await page.waitForTimeout(100);

      const noteInfo  = await checkOverflow(page, '#note-name');
      const writInfo  = await checkOverflow(page, '#note-written');

      const overflow = noteInfo?.overflowsRight || noteInfo?.overflowsLeft ||
                       writInfo?.overflowsRight || writInfo?.overflowsLeft;

      results.push({
        label,
        mode: modeName,
        slug,
        overflow,
        noteRight: noteInfo?.right?.toFixed(0),
        writRight: writInfo?.right?.toFixed(0),
        vw: noteInfo?.vw,
      });

      await page.screenshot({
        path: path.join(screenshotDir, `${slug}_${modeName}_note.png`),
        fullPage: false,
      });

      // Test fullscreen mode
      const fsBtn = page.locator('#afin-btn-fullscreen');
      if (await fsBtn.isVisible()) {
        await fsBtn.click();
        await page.waitForTimeout(300);
        await injectNote(page, 'Sol♯', 4);
        await page.waitForTimeout(100);

        const fsNoteInfo = await checkOverflow(page, '#note-name');
        const fsWritInfo = await checkOverflow(page, '#note-written');
        const fsOverflow = fsNoteInfo?.overflowsRight || fsNoteInfo?.overflowsLeft ||
                           fsWritInfo?.overflowsRight || fsWritInfo?.overflowsLeft;

        results.push({
          label,
          mode: `${modeName}+fullscreen`,
          slug,
          overflow: fsOverflow,
          noteRight: fsNoteInfo?.right?.toFixed(0),
          writRight: fsWritInfo?.right?.toFixed(0),
          vw: fsNoteInfo?.vw,
        });

        await page.screenshot({
          path: path.join(screenshotDir, `${slug}_${modeName}_fullscreen.png`),
          fullPage: false,
        });
      }

      await ctx.close();
    }
  }

  await browser.close();

  console.log('\n── RESULTADOS ──────────────────────────────────────────');
  console.log('Instrumento           Modo                   Overflow  noteRight  writRight  vw');
  for (const r of results) {
    const status = r.overflow ? '❌ SÍ' : '✅ NO';
    console.log(
      `${r.label.padEnd(22)}${r.mode.padEnd(23)}${status.padEnd(10)}${String(r.noteRight ?? '-').padEnd(11)}${String(r.writRight ?? '-').padEnd(11)}${r.vw}`
    );
  }

  const anyOverflow = results.some(r => r.overflow);
  console.log(`\n${anyOverflow ? '❌ Hay overflow' : '✅ Sin overflow en ningún caso'}`);
  console.log(`Screenshots en: pw_screenshots/`);
}

run().catch(e => { console.error(e); process.exit(1); });
