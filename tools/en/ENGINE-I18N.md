# Internationalizing an exercise engine (assets/js/*-engine.js and friends)

Goal: the same JavaScript file serves the Spanish page (unchanged) and the English page (`<html lang="en">`), showing English text and English note/interval names. You edit **only the engine files assigned to you** (and, where the file is generated, its generator in `tools/`; check with `grep -rl <file> tools/` and edit both identically). Never edit other JS, HTML pages, `tools/en/`, or run `build.js` / `version_assets.cjs`; never commit.

## Mechanism
At the top of the file (inside its IIFE if it has one) add, as `afinador.js` and `tm-piano-audio.js` already do:
```js
const EN = document.documentElement.lang === 'en';
const T = (es, en) => EN ? en : es;
```
Use `T('Correcto', 'Correct')` for every text the user can see or hear read out: messages, feedback, button labels, headings, `aria-label`/`title`/`alt` strings, placeholders, error and empty-state messages, print-sheet headings and captions, `confirm`-like texts, units and counters ("aciertos" → "correct"). Longer templates: `T(\`...${x}...\`, \`...${x}...\`)`. Keep the Spanish strings byte-identical.

## Names (must follow the rest of the English site)
- **Notes shown to the user**: letters `C D E F G A B` with `♯ ♭` (double: `𝄪 𝄫` or the same symbols the Spanish version uses). Keep Spanish names as internal keys if the logic uses them: add a display mapping only where text is rendered. Where the user *types or picks* a note name, the options shown in English are letters.
- **Intervals**: quality first: `Major 3rd`, `minor 3rd`, `Perfect 5th`, `Augmented 4th`, `Diminished 5th`, `Perfect unison`, `Perfect octave`; ordinals `2nd 3rd 4th 5th 6th 7th 8th`. Compound: `9th`…
- **Scales / modes**: `C major`, `A natural minor`, `A harmonic minor`, `A melodic minor`, Dorian, Mixolydian…; the Spanish "mixta principal/secundaria" = `harmonic major` / `melodic major` (same names as the dictionary pages).
- **Chords**: triads `major / minor / augmented / diminished triad`; sevenths: `dominant seventh`, `major seventh`, `minor seventh`, `leading-tone (half-diminished) seventh`, `diminished seventh`; inversions `root position`, `1st inversion` / `first inversion`, `2nd`/`3rd`; figured bass `7, 6/5, 4/3, 4/2`, `6`, `6/4` (not the Spanish "+" figures).
- **Rhythm and meter**: US names (`quarter note`, `eighth note`, `measure`, `whole step`/`half step`, `staff`), and `(UK: …)` only where a term is explained in prose. `compás` → *time signature* / *meter* / *measure* by context; `tiempo fuerte/débil` → *strong/weak beat*; `anacrusa` → *pickup (anacrusis)*; `síncopa` → *syncopation*; `contratiempo` → *off-beat*.
- Keep Italian terms (allegro…). Glossary: `tools/en/GLOSSARY.md`; wording of explanations should match `tools/en/pages/dict-*.js` (read the relevant dictionary page in English when you need the exact term).

## Keep intact
Logic, random generation, scoring, localStorage keys, ids, classes, data attributes, URLs (Spanish paths such as `/diccionario-musical/...` links inside feedback are rewritten for English pages by the build, leave them), event wiring, drawing code. Do not rename anything. If text is built by concatenating Spanish fragments (gender/number agreement, "una/un"), restructure into whole sentences per language rather than translating fragments.

## Verify (mandatory)
1. A static server serves the repo at `http://localhost:8765/` (start `python -m http.server 8765` from the repo root if it is down). Use the repo's Playwright: `import { chromium } from 'file:///C:/Users/edues/Documents/Claude/Projects/teoriamusical.com.es/node_modules/playwright/index.mjs'`; run node with `MSYS_NO_PATHCONV=1`.
2. **Spanish unchanged**: before editing, save a baseline for each Spanish exercise page that uses your engine (find them with `grep -rl "<engine>.js" ejercicios`; pick 2–3 pages per engine, covering different modes). With `page.addInitScript` replace `Math.random` by a seeded generator (e.g. mulberry32(12345)) so the run is deterministic, interact (click start, answer, hit check/next several times, open all modes/tabs) and dump `document.querySelector('main').innerText` plus key attributes after each step. After editing, repeat and diff: they must be byte-identical.
3. **English works**: load the same Spanish page through `page.route('**/ejercicios/**', ...)` replacing `<html lang="es">` with `<html lang="en">` in the response (the page text around the widget stays Spanish; only the widget matters). Run the same interaction with the same seed: no Spanish word may remain inside the widget (check against accented characters and a Spanish word list such as `correcto|incorrecto|siguiente|comprobar|nota|escala|intervalo|acorde|compás|tiempo|mayor|menor`), and the behavior (what counts as right/wrong, scoring) must equal the Spanish run. Console must have no errors.
4. If the engine renders with VexFlow/Verovio and prints text on the score (clefs, labels, note names), check those too.

## Report (final message)
Per file: what changed (counts of strings), how you verified (pages, seeds, steps), any text you could not translate or that depends on something outside your files (e.g. a shared helper, a data file, PDF sheets), any Spanish error you found, and any English term you were unsure about.
