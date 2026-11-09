# Shared JavaScript on English pages

English mode is switched on by `document.documentElement.lang === 'en'` (`const EN`, `T(es, en)` helper, as in `assets/tools/afinador.js`).
Spanish pages behave exactly as before: every English branch sits behind `EN`.

## Files changed
- `assets/js/tm-piano-audio.js` (most of the work): note parser, accidental words, interval-name parser, scale-name parser, aria-labels, credit line.
- `assets/js/tm-pent-nota.js` and its generator `tools/gen-pentagramas-motores.js` (the file is generated; both edited identically): `alt` of the single-note staff in English (`A♯₃ in treble clef`; clefs: treble, bass, alto, tenor).
- `assets/js/tm-notacion.js`: default `alt` of `dibujarEscala` (`Scale in treble clef`).
- `assets/js/progresion-audio.js`: aria-label (`Listen to the progression`).
- `assets/js/tempo-audio.js`: `Stop` / `Listen` / aria-label (`Listen to the pulse of <name> at <bpm> beats per minute`).
- `assets/js/main.js`: TOC summary (`Table of contents`), lightbox (`Enlarged image`, `Close`).
- Nothing language dependent in `tm-mei.js` (only clef names in a Node-side table, never shown) or `efectos-audio.js` (everything comes from `data-*`).
Versioned asset hashes were NOT regenerated (`version_assets.cjs` not run).

## English conventions supported (tm-piano-audio.js)
**Notes in tokens** (table cells, `data-tm-scale`, `data-tm-notes`, figcaption after the last `:`, `data-scale-grid` captions): `C D E F G A B`, optionally followed by `♯ ♭ # b ♯♯ ♭♭ ## bb 𝄪 𝄫` (`C`, `F♯`, `Bb`, `B♭♭`, `F𝄪`); the word forms `F sharp`, `B flat`, `F double sharp`, `B double flat` are joined in table cells / captions. A token must be the whole letter+accidental (`Dorian`, `Be` are not notes). Spanish names (`Do`, `Fa♯`, `Sib`) are still accepted as whole tokens.
**Notes in free text** (alt of images in `data-tm-chords`, `data-tm-intervals`, and `data-tm-chord-notes` parts): capital letters standing alone: `C E G`, `C to E`, `B flat and D`, `F sharp`, `F double sharp`. A bare capital `A` that opens a sentence (start, or after `. ! ? : ; (`) followed by a lowercase word is read as the article (`A major third from F sharp to B flat` -> F♯, B♭), except before `to/and/or/on/in/at/up/down` (`from C to A on the staff` -> A). `A4`, `A5`... are not notes (see intervals). Octave numbers in free text are ignored, as in Spanish.
**Scale roots** (`normRoot`, used to match `data-figures` tables with figure alts and in `data-scale-compare`): first `[A-G]` + `♯ ♭ # b / sharp / flat`; a bare `A` only counts if a scale word follows (`major minor natural harmonic melodic dorian phrygian lydian mixolydian locrian ionian aeolian pentatonic whole chromatic blues mixed scale`, any case).
**Scale names** (`data-scale-compare` figure alts), case-insensitive, checked in this order: `melodic minor` (15 notes up and down), `harmonic minor`, `harmonic major` or `mixed … main/principal/primary`, `melodic major` or `mixed … secondary` or `Mixolydian ♭6`, `Mixolydian`, `Dorian`, `Phrygian`, `Lydian`, `Locrian`, `Aeolian` or `natural minor`, `pentatonic` (`minor pentatonic` for minor), `whole-tone`/`whole tone`/`wholetone`, `chromatic`, `blues`, `Ionian` or `major` (without `minor`). Plain `A minor` (no qualifier) gives no button, as in Spanish. Spanish names are not read on English pages.
**Interval names** (alt of `data-tm-intervals` figures when the alt names fewer than two notes): quality first + ordinal: `Major 3rd`, `minor 3rd`, `Perfect 5th`, `Augmented 4th`, `Diminished 5th`, `Augmented 2nd`, `Perfect unison`, `Perfect octave`, compound ones too (`Major 10th`); also ordinal first (`3rd Major`) and abbreviations `M3 m3 P5 A4 d5` (case sensitive, whole token). If the text says `reduc…`/`result…` the last interval is used. Quality is mandatory (`an octave higher` alone is not an interval name).
**Keywords in interval alts**: `keyboard` or `melody` -> no button; `unison`, `enharmonic` -> same pitch; `harmonic` or `simultaneous` -> notes together (not `enharmonic`); `descending` -> down; `compound`, `ninth … thirteenth`, `an octave higher/more` -> last note +1 octave. Spanish keywords still work too.
**Attributes** (`data-tm-scale="C D E G A"`, `data-tm-chord-notes="C E G | F A C"`, `data-tm-notes="C F G"`): same letter rules. `data-tm-melody`, `data-tm-prog`, `data-scale-grid`, `data-tm-clef`, `data-tm-baseoct` are language-neutral and unchanged.
**Visible text** in English: `Listen`, `Listen to the scale / chord / cadence / interval / melody / notes`, and the Salamander credit line (skipped if the page already mentions `Salamander`).

## Still Spanish-only / limits
- Spanish note names inside English free text (alts, `data-tm-chord-notes`) are NOT read; only English letters are. In tokens both work.
- Octave numbers written in alts (`C4`) are ignored (same as Spanish `Do4`); `A4` always means augmented 4th.
- `tm-mei.js` clef names (`clave de sol`…) are Spanish but never shown in the browser.
- Not touched (per task): lectura-notas, laminas, grados, tono-semitono, teclado, timbre, serie-armonica, equivalencias and all other engines.
- Pre-existing Spanish quirk left as is: `Fa doble sostenido` -> `Fa♯♯` is read as a single sharp by `nameToPc` (Spanish regex takes one accidental). The English parser handles double accidentals correctly (F double sharp = G).

## Testing
Playwright (`chromium`) against the static server on :8765, with `AudioContext` and `fetch` of `.ogg` stubbed to record every note actually started (sample file + detune + time).
1. Before editing: recorded buttons, aria-labels, host elements and the notes played by clicking each button on the five Spanish pages (`intervalos-musicales`, `escalas-mayores-naturales`, `comparar-los-tipos-de-escalas-menores`, `acordes-triadas`, `compas-de-4-4`; 46/29/60/19/1 buttons). After editing: byte-identical JSON (`cmp`), no page errors.
2. English: the same pages were fetched and rewritten on the fly (`lang="en"`, note names to letters, `sostenido/bemol` to `sharp/flat`, `3ª Mayor` to `Major 3rd`, scale names to `A natural minor`/`A harmonic minor`/`D Dorian`…). The button counts (46/29/60/19/1) and the multiset of notes played are identical to the Spanish originals.
3. A synthetic English page with extra cases (all names listed above, abbreviations, `F double sharp`, `B flat`, article `A`, `E flat` in cells, pentatonic/whole-tone/chromatic/blues, cadence, `data-tm-notes`) gave the expected MIDI notes.
Scratch scripts live in the session scratchpad, not in the repo.

## Suggestions for page writers
- Write scale names in alts as `A natural minor`, `A harmonic minor`, `A melodic minor` (not `A minor natural`); mixed scales as `C harmonic major` / `C melodic major` (or `C mixed principal/secondary`).
- Start interval alts with the quality-first name (`Major 3rd, C to E`); avoid beginning an alt with a bare `A` + lowercase word unless it is the article.
- Keep octave digits out of alts.
