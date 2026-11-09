# Writing an English dictionary page (/en/music-dictionary/…)

Each Spanish dictionary page becomes **one file**: `tools/en/pages/dict-<en-path-with-dashes>.js`
(example: `/en/music-dictionary/intervals/musical-intervals/` → `dict-intervals-musical-intervals.js`; a section hub `/en/music-dictionary/intervals/` → `dict-intervals.js`; the dictionary home → `dict-home.js`).
Never edit any shared file (`layout.js`, `build.js`, `links.js`, `dictionary-page.js`, the JS in `assets/`, the Spanish pages…), never run `build.js` or `version_assets`, never commit. Your only outputs are your page files (plus `tools/en/instruments/` untouched).

## Workflow for each page
1. `node tools/en/extract-es.js diccionario-musical/<path>/` (no leading slash, or prefix the command with `MSYS_NO_PATHCONV=1`; Git Bash rewrites a leading slash) prints the Spanish title, description, h1, breadcrumb, article attributes, scripts, warnings and the article body (ads and inline scripts removed). Read it all.
2. Write the English page module (template below). Keep the **structure** of the original (headings, figures, tables, FAQ) but write natural, accurate English for a reader who wants to learn the topic, not a word-by-word translation. Cut or rewrite passages that only make sense in Spanish (Spanish exam system, Spanish names of notes as the main notation, etc.).
3. Validate: `node -e "const p=require('./tools/en/pages/dict-xxx.js'); console.log(p.path, p.title.length, p.description.length)"` (must load; title ≤ 60, description ≤ 155).

## Module template
```js
const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/intervals/musical-intervals/',
  esPath: '/diccionario-musical/intervalos/intervalos-musicales/',
  title: 'Musical Intervals: Full Chart, Types and Quality',     // ≤ 60 chars, how an English reader would search
  description: 'What a musical interval is and how it is classified …', // ≤ 155 chars
  h1: 'Musical Intervals',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Intervals', '/diccionario-musical/intervalos/']],  // ancestors, Spanish hrefs
  articleClass: 'tm-article tm-article--wide',  // only if extract-es.js prints an article class other than plain tm-article
  articleAttrs: 'data-tm-intervals',   // the article attributes printed by extract-es.js (omit if none)
  scripts: ['tm-piano-audio'],          // only the supported scripts used by the page (see below)
  body: `...HTML of the article...`,
});
```
`crumbLabel` (optional) = last breadcrumb text when it should differ from the h1.

## URL tree (English paths)
`/en/music-dictionary/` (home). Sections (hub page = the section path itself, children inside):
`chords/` (acordes) · `time-signatures/` (compases) · `keys-and-scales/` (tonalidades; `major-scales/` and `minor-scales/` inside it for escalas-mayores / escalas-menores) · `intervals/` (intervalos) · `clefs/` (claves-musicales) · `performance-effects/` (efectos-de-ejecucion) · `tuplets/` (grupos-de-valoracion-especial) · `musical-phrase/` (la-frase-musical).
Single pages directly under `/en/music-dictionary/<english-slug>/` (e.g. `note-values/`, `accidentals/`). Slugs: lowercase English words with hyphens, short and searchable (`circle-of-fifths`, `harmonic-minor-scale`, `compound-time`).

## Links
- **Write every internal link with the Spanish path exactly as in the original** (`<a href="/diccionario-musical/acordes/">chords</a>`). The build replaces it with the English page when that exists and removes the link (keeping the text) when it does not. Do not write `/en/…` links yourself.
- Links to exercises/games/tools/blog: keep the Spanish href too (they are linked or unlinked automatically). Exception: the metronome and tuners already exist; also write them with the Spanish href.
- Never link to a Spanish page on purpose (no `hreflang="es"` links) unless it is the only place the topic exists.

## Language rules
- **American English**; glossary `tools/en/GLOSSARY.md` (quarter note, measure, whole step, staff…). The first time a term that differs in the UK appears on a page, add `(UK: …)`: *quarter note (UK: crotchet)*, *measure (UK: bar)*, *whole step (UK: tone)*, *half step (UK: semitone)*, *staff (UK: stave)*. Plain English, short sentences, no idioms.
- **Notes in letters**: C D E F G A B with ♯ ♭ (never Do Re Mi as the main names). Where the Spanish page teaches solfège names, explain once that the fixed-do names (Do Re Mi…) are used in Spanish-, French- and Italian-speaking countries, and give the equivalence.
- Octaves in scientific pitch notation (C4 = middle C, A4 = 440 Hz).
- Chord symbols and degree names: use the glossary (tonic, supertonic, mediant, subdominant, dominant, submediant, leading tone (UK: leading note)).
- Keep Italian/Latin musical terms (allegro, crescendo…) unchanged.
- Titles/descriptions are written for search: natural phrases an English learner types, not a literal translation of the Spanish title.

## Text that the page audio reads (important)
Many tables/figures are wired to audio by `assets/js/tm-piano-audio.js`, which reads text and `data-tm-*` attributes. A separate agent is teaching that script to read English labels. **Use exactly these English conventions** wherever the Spanish page has the corresponding text, and keep every `data-tm-*` attribute and class as in the original (only translate note names inside attribute values: `data-tm-scale="Do Re Mi"` → `data-tm-scale="C D E"`, `Fa♯` → `F♯`, `Si♭` → `B♭`):
- Notes: `C D E F G A B`, with `♯` `♭` (`C♯`, `B♭`); `F double sharp`, `B double flat` as words where the Spanish says "doble sostenido/bemol".
- Scale names (a table cell, heading or label that names a scale): `C major`, `A natural minor`, `A harmonic minor`, `A melodic minor`, `D Dorian`, `G Mixolydian`, `F Lydian`, `E Phrygian`, `B Locrian`, `C Ionian`, `A Aeolian`, `C pentatonic`, `C whole-tone`, `C chromatic`, `A blues`.
- Interval names (quality first, then the ordinal): `Major 3rd`, `minor 3rd`, `Perfect 5th`, `Augmented 4th`, `Diminished 5th`, `Augmented 2nd`, `Perfect unison`, `Perfect octave`; abbreviations `M3`, `m3`, `P5`, `A4`, `d5` are fine in tables.
- Melodies in `data-tm-melody` use VexFlow-style tokens (`a/4:16`) that are already language-neutral: copy them unchanged.
- Chord progressions `data-tm-prog`: unchanged (language-neutral).
If the Spanish text for such a label has no clear equivalent among these, keep the closest form and mention it in your report.

## Scripts and widgets
- Supported (an agent is adapting them to English): `tm-piano-audio`, `tm-pent-nota`, `tm-notacion`, `tm-mei`, `efectos-audio`, `progresion-audio`, `tempo-audio`. List the ones the Spanish page loads (extract-es.js shows them) in `scripts`, except `main` and `consent` (added automatically).
- **Not supported yet**: `lectura-notas-engine`, `laminas-engine`, `grados-engine`, `tono-semitono-engine`, `teclado-engine`, `timbre-engine`, `timbre-datos`, `timbales-rango-engine`, `serie-armonica-engine`, `equivalencias-engine`, `idiomas-instrumentos`, and any inline `<script>` block. If the page uses one, write the page **without** that widget (leave out its container markup and script) and report "needs engine X" so it can be done later.

## Images
- Reuse images as they are (`/assets/img/...svg`): keep `width`/`height`, `loading`, class names; translate `alt` and captions (notes in letters).
- `extract-es.js` lists SVGs that contain Spanish text (`tools/en/svg-spanish-text.txt`). **Do not use those**: where the figure would go write `<!-- TODO-IMG: /assets/img/…svg -->` plus a one-line description of what it shows, and report them.

## HTML conventions
Same classes as the Spanish page (`tm-staff`, `tm-img-grid-3`, `tm-table-wrap`, `tm-table`, `tm-faq-list`/`tm-faq-item`/`tm-faq-q`/`tm-faq-a`, `tm-callout`… copy whatever the original uses). Do not include ad blocks (`tm-ad`), JSON-LD, HowTo schema, breadcrumbs or the `<h1>` in the body (the builder adds them; the FAQ JSON-LD is built from your `tm-faq-item` blocks, so the visible FAQ text is the schema text). Keep `id` attributes on headings if the Spanish page has them and other pages link to them (translate the id to an English slug).

## Facts
Check every statement, number and example; the Spanish pages have mistakes (examples found: wrong octaves, reversed physical effects, a contradicting table). If you cannot verify something, leave it out. In your report list **every error you found in the Spanish page** (file, sentence, correct fact). Do not repeat errors.

## Report (your final message)
For each page: path, one line on what you changed or adapted; then **Errors found in the Spanish pages**; **Needs engine X / needs English image** list (page + file); **Labels without a clear convention**; anything left out because it was unverifiable.
