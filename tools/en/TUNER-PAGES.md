# Writing an English instrument tuner page

Each instrument = **two files** and nothing else (never edit shared files, never run `build.js`, never commit):

1. `tools/en/instruments/<slug>.json`
2. `tools/en/pages/tools-tuner-<slug>.js`

Models to copy: `tools/en/pages/tools-tuner-guitar.js` (strings, alternate tunings), `tools-tuner-violin.js`, `tools-tuner-bass.js` (low notes), `tools-tuner-ukulele.js`. The builder is `tools/en/tuner-instrument.js` (read its header comment). The Spanish source of each page is `herramientas/afinador/<esSlug>/index.html`; the glossary is `tools/en/GLOSSARY.md`.

## 1. The JSON file
```json
{ "slug": "clarinet", "name": "Clarinet", "label": "Clarinet tuner", "desc": "B♭ transposing, written and sounding note",
  "family": "woodwind", "order": 1, "sub": "Free · Uses your microphone · B♭ clarinet", "chips": ["B♭ transposing", "Written note", "Cents meter"] }
```
`family` ∈ strings | woodwind | brass | percussion. `desc` is a short fragment with no final period (used in lists). `chips` = 3-5 short labels for the social image; `sub` ≤ 55 characters.

## 2. The page module
```js
const tunerInstrument = require('../tuner-instrument');
module.exports = tunerInstrument({ slug, esSlug, name, title, description, swDescription, h1, intro:[...], strings?, transp?, sections:[{h2, html}], faqH2, faq:[[q,a]], closing });
```
- `esSlug` = the folder name in `herramientas/afinador/` (Spanish). `slug` = the English URL slug given to you.
- `strings`: only if the Spanish page has `window.AFIN_STRINGS`: copy it with **letter names** (`Sol`→`G`, `Do`→`C`, `Re`→`D`, `Mi`→`E`, `Fa`→`F`, `La`→`A`, `Si`→`B`), keeping `oct` and `midi`.
- `transp`: only if the Spanish page has `window.AFIN_TRANSP=N`: copy the number.
- `title` ≤ 60 characters, pattern "Free Online X Tuner — …". `description` ≤ 160 characters. `h1` = "Online X Tuner". `faqH2` = "Frequently asked questions: X tuner". Use the same section structure as the Spanish page (intro, standard tuning/range table, tips, FAQ), translated and adapted. `closing` links only to `/en/tools/metronome/`.
- `sections[].html` is raw HTML (tables with `tm-table-wrap` / `tm-table`, lists). FAQ answers may contain inline HTML (`<strong>`, `<em>`, `<kbd>`).

## 3. Language rules
- Write in **American English** (glossary: `quarter note (UK: crotchet)` the first time a differing term appears on a page; instruments: English horn (UK: cor anglais), horn = French horn, etc.). Plain English, no idioms, short sentences, US spelling.
- Note names in **letters** (C D E F G A B, ♯ ♭). Frequencies with a decimal point (329.6 Hz), A4 = 440 Hz.
- **Never link to the Spanish dictionary or any Spanish page** (no English version exists). Links allowed: `/en/tools/metronome/`, `/en/tools/tuner/` and the other instrument pages that exist. Delete every "see the notes of the X" link.
- Do not mention the Spanish edition, solfège names or Spanish regional context unless it is truly useful for an English reader.

## 4. Facts: verify, do not copy
The Spanish pages contain mistakes. **Check every number and claim** (tunings, frequencies, transpositions, ranges, history). Examples already found: the double bass FAQ said it sounds an octave below the electric bass (it sounds the same); the viola C string was given as 261 Hz (it is 131 Hz); the bass page said B0 was "at the limit" of detection (it is out of range). If you cannot verify a claim, leave it out. List in your report every error you found in the Spanish page (file, sentence, correct fact) so it can be fixed there too.

**Tuner limits (important for low instruments):** `assets/tools/afinador.js` ignores sounds below 40 Hz and above 4200 Hz. A note below 40 Hz (contrabassoon, tuba, bass clarinet and baritone sax low notes, timpani low D…) can't be read directly. Say so honestly and teach the workaround (play the note an octave higher, or a harmonic, or tune with the written/sounding note shown for a higher octave). Never claim the tuner detects what it can't.
**Transposing instruments:** the panel shows both the sounding and the written note. State the transposition correctly (e.g. B♭ clarinet sounds a major second lower than written; E♭ alto saxophone sounds a major sixth lower; F horn a perfect fifth lower). `transp` is in semitones as in the Spanish page.

## 5. Check and report
From the repo root run `node -e "const p=require('./tools/en/pages/tools-tuner-<slug>.js'); console.log(p.path, p.title.length, p.description.length)"` for each page (it builds the page and fails if the Spanish panel is not fully translated). Fix any error. Then reply with: files written; for each instrument, a one-line summary; **errors found in the Spanish pages** (exact sentence + correct fact); anything you left out because you could not verify it.
