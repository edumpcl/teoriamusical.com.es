# Translating a game to English (/en/games/…)

Pilot: **100-Meter Dash** (`/en/games/singing/100-metres-dash/`). Files:
- Landing page (SEO article + iframe): `tools/en/pages/game-100-metres-dash.js` (built by `build.js` like any `dictionaryPage`).
- Game page (the iframe content): `en/games/singing/100-metres-dash/play/index.html` — **a final file, not built**, `<html lang="en">`, `noindex`.
- Generator used for the game page: `tools/en/games-make/100-metres-dash.js` (reads the Spanish game, applies exact replacements, writes the English copy). Copy it for the next game and edit the list of replacements.

Nothing in Spanish is touched. Shared files (`api/clasificacion.js`, `assets/js/*`, `layout.js`, `build.js`) are NOT edited by game work: report what they need (see "Shared things to report").

## Method (steps)
1. Read the Spanish landing (`juegos/<section>/<slug>/index.html`) and the game (`…/juego/index.html`). The game is one HTML with inline CSS+JS (~1500 lines); about 85% is drawing code and engine that never changes.
2. **Find every string the player sees or hears**: HTML text, `aria-label`, `title`, `alt`, `placeholder`, JS strings (messages, `textContent`, `confirm`), canvas text (`fillText`/`strokeText`), the footer, the `<title>`, the `<noscript>`. Useful sweep: strip comments and print lines with `[áéíóúñ¿¡ª]`, plus a grep for `textContent|fillText|strokeText|aria-label|placeholder`.
3. **Copy the game page** to `en/games/<section-en>/<slug-en>/play/index.html` through a generator script with a list `[old, new, expectedCount]`. The script fails if an `old` string does not appear exactly `expectedCount` times, so a later change in the Spanish game cannot silently leave Spanish behind. Run it again whenever the Spanish game changes.
4. Landing module: `dictionaryPage({ path, esPath, title (≤60), description (≤155), h1, crumbs: [['Games','/juegos/'],['Singing games','/juegos/entonacion/']], scripts:['juego-embed'], body })`. Body = intro, iframe (`src` = the English `play/` URL, `allow="microphone"`), how to play, tables, FAQ (`tm-faq-item`, the builder makes FAQ JSON-LD from it), Salamander credit, `tm-related` aside with **Spanish hrefs** (build rewrites or unlinks). No ads (`tm-ad`), no JSON-LD, no h1 in the body.
5. Verify with Playwright (see below). Check `node -e "const p=require('./tools/en/pages/game-….js');console.log(p.path,p.title.length,p.description.length)"`.
6. Do not run `build.js`, `version_assets`, or commit.

## What to KEEP (never translate)
- Game id sent to the API (`JUEGO_MUNDIAL = '100-metros'`; use whatever the Spanish file has — the pilot brief said `100-metros-lisos` but the real id is `100-metros`), analytics event names (`juego_inicio`, `juego_fin`, `juego_mic_error`, `mundial_publicar`) and parameters (`juego: 'cien_metros'`, `dificultad`, `melodias`, …), difficulty values (`facil|normal|maestro`), group values (`sencillas|con_saltos|todas`), localStorage keys (`cienmetros-clasificacion`, `cienmetros-musico`, `cienmetros-nombre`, `tm-jugador`), element ids/classes, `window.__cienMetros`.
- **Musician names in `MUSICOS[].n`** (`'Clarinete'`, `'Violín'`…): they are the closed list the API accepts (`api/clasificacion.js` MUSICOS), they are stored in the local leaderboard, and they are sent in the POST. They are keys. Display them through a map (`MUS_EN`/`mEn`).
- Note names inside the data tables (`ESCALAS.r`, `.n`) and `'mayor'|'menor'`: used in the melody key (`clave`) and logic. Translate only when rendering (`nn()`, `QUAL_EN`).
- The default nickname `'Corredor/a'` stored in the local leaderboard (shown as `Runner` through `nomEn`). The English page writes the same key so both language editions share one local leaderboard (same origin, same localStorage).
- All numbers and logic: tolerance in cents, windows, penalties, REC, thresholds (`18.0`, `23.0`, `30.0`), drawing code.
- Spanish code comments: left as is (not visible).

## What changes
Only what the player sees or hears: texts, `aria-label`, `title`, `alt`, `placeholder`, `<title>`, canvas texts, locale of `toLocaleString` (`es-ES` → `en-US`: `6,5` → `6.5`), unit abbreviations (`seg` → `sec`), note names, intervals, instrument names, API error messages (see below).

## Translation patterns
| Pattern | Spanish | English |
|---|---|---|
| display map for keys | `esc.r + ' ' + esc.q` → `Do mayor` | `nn(esc.r) + ' ' + QUAL_EN[esc.q]` → `C major` |
| note letters | `Fa♯`, `Si♭`, `Sol` | `F♯`, `B♭`, `G` (`nn = n => n.replace(/^(Sol\|Do\|Re\|Mi\|Fa\|La\|Si)/, x => NOTA_EN[x])`; put `Sol` first in the regex) |
| ordinals + gender | `1ª nota La · superada` | `Note 1: A · cleared` (whole sentence, never fragments) |
| plurals | `' carrera.'`/`' carreras.'` | `' race.'`/`' races.'` |
| rank | `Puesto n.º 3 de 8 carreras.` | `Rank #3 of 8 races.` |
| world rank | `Tú: n.º 4 de 30 esta semana, con 7,5 s.` | `You: #4 of 30 this week, with 7.5 s.` |
| inverted punctuation | `¡Vamos!` | `Nice!` (drop `¡` `¿`) |
| fixed-width canvas text | `¡CANTA!` in a 124 px box | `SING!` (check the box with a screenshot) |
| soft hyphens in `CORTES` | `Violon­chelo` | `Eupho­nium`, `Clari­net`, `Wood­winds`, `Per­cussion` (the keys are the **English** labels now) — check the family tabs at 320 px |

## Glossary (game terms)
| ES | EN |
|---|---|
| entonación (section) | singing games / pitch games (breadcrumb `Singing games`) |
| juego de entonación | singing game |
| afinar / afinado | tune (a note) / in tune; "hold it in tune"; "hit the pitch" only in explanations |
| tropezar / tropiezo | stumble |
| superar una nota | clear a note |
| descalificado | disqualified |
| marca de referencia | benchmark (never "record") ; `MARCA 7,0 s` → `BENCHMARK 7.0 s` |
| récord de atletismo | track and field record |
| 100 metros lisos | 100-meter dash (UK: 100 metres); slug `100-metres-dash` |
| 110 m vallas / vallas | hurdles |
| triple salto / salto de longitud / de altura | triple jump / long jump / high jump |
| lanzamiento de jabalina | javelin throw |
| carrera de obstáculos | obstacle race |
| Tu nombre / apodo | Your name / nickname |
| Fácil / Normal / Maestro | Easy / Normal / Master |
| Sencillas / Con saltos / Todas | Simple / With leaps / All |
| grados conjuntos | stepwise motion (steps) |
| saltos de 4ª/5ª/6ª | leaps of a 4th/5th/6th |
| grados (1 = tónica) | scale degrees (1 = tonic) |
| ¡A correr! | Let's run! |
| ¡Cantar! | Sing! |
| Escuchar otra vez | Listen again |
| Cambiar de músico | Change musician |
| Correr otra vez | Run again |
| Prepárate… / Respira hondo | Get ready… / Take a deep breath |
| Un poco más grave ↓ / agudo ↑ | A bit lower ↓ / A bit higher ↑ (sung pitch too high → "lower") |
| ¡Afinado! ¡Sigue así! | In tune! Keep it up! |
| ¡Último tramo! | Final stretch! |
| Clasificación (local) | Leaderboard |
| Clasificación mundial | World leaderboard (`This week` / `All time`) |
| Publicar en la clasificación mundial | Publish to the world leaderboard |
| Borrar clasificación | Clear leaderboard |
| Micrófono | Microphone |
| Corredor/a | Runner |
| Viento madera / metal / Percusión / Cuerda | Woodwinds / Brass / Percussion / Strings |
| Clarinete, Trompeta, Bombo, Caja, Flauta, Trombón, Tuba, Platillos, Saxofón, Trompa, Violín, Contrabajo, Oboe, Fagot, Bombardino, Xilófono, Viola, Violonchelo, Arpa, Piano, Guitarra | Clarinet, Trumpet, Bass drum, Snare drum, Flute, Trombone, Tuba, Cymbals, Saxophone, French horn, Violin, Double bass, Oboe, Bassoon, Euphonium, Xylophone, Viola, Cello, Harp, Piano, Guitar |
| Do Re Mi Fa Sol La Si | C D E F G A B (Si = B) |
| mayor / menor (natural) | major / minor |
| semitono | half step (UK: semitone) once on the landing page |

Result titles (thresholds in seconds, 100 m): `≤7.0` Benchmark beaten! · `≤18` Spectacular! · `≤23` Great race! · `≤30` Good race · else Warming up · disqualified: Disqualified! Mic errors: three messages (file/insecure context, permission denied, no microphone) — see the pilot file.

## API messages (important)
`api/clasificacion.js` answers some errors in Spanish (`motivo: 'Ese apodo no se puede publicar. Prueba con otro.'`). The English page never shows server text: it maps `d.error === 'apodo'` to an English message and anything else to a generic English one. Keep this branch in every game (same code block in all of them).

## Verification (mandatory, done for the pilot)
Server: `node tools/serve.js <own port>`. Playwright with `--use-fake-device-for-media-stream --use-fake-ui-for-media-stream`.
1. Load the English game: no console errors (a 404 from `/api/clasificacion/` locally is normal; the world block hides itself exactly as in Spanish).
2. Walk every screen: menu (all family tabs, difficulty, melodies), listen, count-down, race, final stretch, result; check each visible text node and each `aria-label|title|alt|placeholder` against `/[áéíóúñ¿¡ª]|\b(el|la|los|nota|escala|…)\b/`.
3. Same-logic check with seeded `Math.random`: both pages expose `nuevaMelodia` as a global; call `Math.random = mulberry32(seed); nuevaMelodia(gru, null)` on each page for 75 seeds and compare `clave`, `pat` and `targets.f` → identical. Adapt to the generator function of each game.
4. Fake microphone beep is not a pitch → the race ends disqualified. To test a full valid race, override `window.readPitch = () => { S.rms = 1; return S.note.f * Math.pow(2, off/1200); }` (off = 0 → tuned, +60 → "lower", −60 → "higher"); the final time must equal the Spanish run's (it did: 8.2 s with 5 notes at 1.0 s).
5. World leaderboard flow with `page.route('**/api/clasificacion/**', …)`: mock GET (top + yo), POST `inicio` (token), POST `enviar` OK / `{error:'apodo', motivo:…}` / `{error:'marca'}` / abort; force a valid result by setting `S.nulo=false; S.cleared…; S.total; S.wTok='tok'` and calling `finishRound()`. Check texts and that the POST body carries the **Spanish** musician key.
6. Also check: 320/360/390 px (family tabs overflow), screenshot of race and menu, `docOverflow` false.

## Traps found
- `Woodwinds` overflowed its tab on phones: soft-hyphen it (`Wood­winds`).
- `\p{L}`-style nickname validation is server-side and accepts letters and numbers; profanity list is mostly Spanish (see report).
- The generator's `[old,new,count]` check caught repeated strings (`Clasificación`, `Publicar…`, `¡A correr!`, `Cambiar de músico` appear 2–4 times): use the count, do not use a loose regex replace.
- `CORTES` contains real U+00AD characters in the Spanish source; write them as `­` in the generator.
- Words built by concatenation in Spanish (`'Puesto n.º '`, `ª nota`) cannot be translated fragment by fragment.
- Canvas texts are fixed-size (`BENCHMARK 7.0 s`, `100 m dash (game reference)`): English is a little longer than Spanish; check them on a screenshot.
- Duplicate code in the Spanish game: `drawHead` paints the band cap twice (harmless; left alone).
- The English landing must not promise things the game does not do: the Spanish landing mentions a "demo mode without microphone" that does not exist in the game; it was left out.

## Shared things to report (not edited)
- `assets/js/juego-embed.js` (loaded by the landing): analytics are identical for both languages (it only forwards whitelisted params; there is no language param, so the languages can only be told apart by the host page path).
- `api/clasificacion.js`: Spanish `motivo` text; Spanish-only profanity list; `MUSICOS` closed list in Spanish (required by the design: keys stay Spanish); week boundaries use Europe/Madrid time.
- `/en/privacy-policy/#games` exists (the English footer link points to it directly, since the game page is not built).
- The English game page is outside `build.js`: it will not get the sitemap/hreflang/link-rewriting treatment. `noindex` is on, like the Spanish one. If the build later regenerates `/en/games/…`, make sure it does not delete `play/`.

## Estimate for the other singing games
The nine singing games share the same skeleton: menu, picker with families, leaderboards, world leaderboard, microphone errors, footer, count-down, hints. `diff` against the 100 m: 200 m and 400 m differ in ~50 lines; hurdles ~130; long jump ~200; triple jump ~240. Roughly **60–70% of the strings are identical across games** (everything in this file's menu/leaderboard/error/publish sections: copy the replacement list). Each game adds its own: rules text under the difficulty selector, result titles/texts, canvas texts, scale/chord/interval names, and the landing page. Estimated effort: 200 m / 400 m minutes (reuse the list, change numbers and result thresholds); hurdles / javelin / jumps need 40–60 new strings each.

## Glossary added while translating the other 16 games (9-11-2026)
Page names: 100-Meter Dash, 200-Meter Dash, 400-Meter Dash, Hurdles, Obstacle Race, High Jump, Long Jump, Triple Jump, Javelin Throw (singing); Bowling, Darts, Basketball, Billiards, Soccer (UK: football), Clay Target Shooting (UK: clay pigeon shooting) (theory); Track Cycling, Memorize (ear training). Section names: Singing games, Music theory games, Ear training games.
- Shared: Easy / Medium / Hard (singing games: Easy / Normal / Master), Player N, Musician (default nickname; stored as `Músico`), Next player, Rank #, Add to the world leaderboard (theory) / publish (singing), tiebreaker, shootout (penalties).
- Singing: benchmark (100 m reference mark, never "record"), world record (jumps, hurdles: real records), water jump (ría), hurdle, obstacle, Base note, Leap, run-up, lane, glissando, finish, No jump! / No throw!, Starting height, Time in tune, mark, Stumble, Master, Preview the obstacles.
- Theory: Frame, Strike (pleno), Extra ball, GUTTER!, pins, Roll!, BULLSEYE / TRIPLE / DOUBLE / OUTER / OFF BOARD, Round, Dart, Throw!, Free throw, 2-pointer, 3-pointer, SWISH!, OFF THE BOARD, OFF THE RIM, ROLLS IN, AIR BALL, Shoot!, SUNK! / MISSED!, Table cleared!, Kick off!, GOOOAL! / SAVED! / STOLEN!, Goal rush!, A consolation goal, HIT! / MISS!, Fire!, target, Perfect round!, Key signature done.
- Ear training: bonk (pájara), lap, velodrome, kilometer, sequence (Memorize), score, Board, sector, Boomwhackers colors (C red, D orange, E yellow, F light green, G dark green, A purple, B pink), Keep pedaling, Lap!.
- Chords/intervals/scales in games follow the engines: `C♯ major triad`, `root position / 1st inversion / 2nd inversion`, `Major 3rd`, `Perfect 5th`, `A natural minor` (melodic = one 15-note form), double sharp `♯♯` (soccer uses `×`).
- Technique: each game has a generator `tools/en/games-make/<slug>.js` that reads the Spanish game and applies `[old, new, count]` pairs (fails if the count changes). When the Spanish game changes, re-run it; shared pairs live in `_singing-common.js`, `_jumps-common.js`, `_intervals-common.js`, `_theory-common.js`, `_theory-common-bdb.js`.
- API: `api/clasificacion.js` nickname filter now also blocks the main English insults (substring match, so avoid adding short words that appear inside names).
