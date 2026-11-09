const dictionaryPage = require('../dictionary-page');
const CL = '/assets/img/notacion/claves/';
module.exports = dictionaryPage({
  path: '/en/music-dictionary/note-names/',
  esPath: '/diccionario-musical/nombres-de-las-notas-musicales/',
  title: 'Note Names: Letters, Do-Re-Mi and German H Explained',
  description: 'The 7 musical notes and their names in letters (C-B), fixed-do solfège (Do-Si) and German (C-H). Full equivalence tables and note positions in every clef.',
  h1: 'Note Names: Letters and Solfège',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  scripts: ['tm-piano-audio', 'tm-mei', 'tm-notacion'],
  body: `<p>There are <strong>seven musical notes</strong>. In English-speaking countries they are named with the letters <strong>C, D, E, F, G, A and B</strong>. In Spanish-, French- and Italian-speaking countries they are named with the <strong>fixed-do solfège</strong> syllables <strong>Do, Re, Mi, Fa, Sol, La and Si</strong>. In the German system the natural B is written <strong>H</strong>, and the German <strong>B</strong> is B♭.</p>

<ul>
  <li><strong>English (letters):</strong> C · D · E · F · G · A · B</li>
  <li><strong>Fixed-do (Spanish, French, Italian):</strong> Do · Re · Mi · Fa · Sol · La · Si (French writes Ré)</li>
  <li><strong>German:</strong> C · D · E · F · G · A · H &nbsp;(B♮ is H and B♭ is B)</li>
</ul>

<p>"Fixed do" means that Do is always the note C, whatever the key. (Some countries use "movable do", where Do is the tonic of the key; that is a different system.) This site uses letters as the main names and gives the fixed-do names where they help.</p>

<p>The syllables come from a medieval hymn to St. John, whose lines began on the syllables <em>Ut, Re, Mi, Fa, Sol, La</em>. Guido d'Arezzo used them in the 11th century to teach singers. Over time <em>Ut</em> became <em>Do</em> and <em>Si</em> was added.</p>

<h2>Equivalence table: letters, fixed-do and German</h2>

<p>The letters A–G are the standard in English-speaking countries and are also used to name instruments' transpositions (for example, "clarinet in B♭"). German adds one peculiarity: the letter B means B♭ and the letter H means B natural.</p>

<div class="tm-table-wrap">
<table class="tm-table">
<thead><tr><th>English</th><th>Fixed-do</th><th>German</th></tr></thead>
<tbody>
<tr><td>C</td><td>Do</td><td>C</td></tr>
<tr><td>D</td><td>Re</td><td>D</td></tr>
<tr><td>E</td><td>Mi</td><td>E</td></tr>
<tr><td>F</td><td>Fa</td><td>F</td></tr>
<tr><td>G</td><td>Sol</td><td>G</td></tr>
<tr><td>A</td><td>La</td><td>A</td></tr>
<tr><td>B</td><td>Si</td><td>H</td></tr>
<tr><td>B♭</td><td>Si♭</td><td>B</td></tr>
</tbody>
</table>
</div>

<p><strong>Fun fact:</strong> this German peculiarity allowed <strong>Johann Sebastian Bach</strong> to sign his music with the notes <strong>B♭–A–C–B♮</strong>, which are spelled <strong>B–A–C–H</strong> in German. This "BACH motif" appears, among other works, in the unfinished fugue of his <em>Art of Fugue</em>, and later composers such as Liszt, Schumann and Schoenberg used it as a tribute.</p>

<h2 id="h-octaves">Registers: notes repeat in every octave</h2>

<p>The 7 note names repeat across the whole range of sound. To say which register a note is in, we add an octave number: <strong>C4</strong> is middle C (<a href="/diccionario-musical/notas-del-piano/">the middle key of the piano</a>), C5 is an octave higher and C3 an octave lower. The higher the number, the higher the sound. There are two ways to number octaves: the international system (scientific pitch notation), in which middle C is C4, and the French-Belgian system, in which it is C3. See the page on <a href="/diccionario-musical/indice-acustico/">octave numbering</a>. A4 = 440 Hz in the international system.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Register</th><th>Approximate range</th><th>Examples</th></tr>
  </thead>
  <tbody>
    <tr><td>Very low (sub-bass)</td><td>C0 – B1</td><td>Contrabassoon, lowest notes of tuba and double bass</td></tr>
    <tr><td>Low</td><td>C2 – B2</td><td>Cello, bass voice</td></tr>
    <tr><td>Medium-low</td><td>C3 – B3</td><td>Viola, baritone voice</td></tr>
    <tr><td>Middle</td><td>C4 – B4</td><td>Middle C and the octave above it</td></tr>
    <tr><td>High</td><td>C5 – B5</td><td>Flute, soprano voice, violin</td></tr>
    <tr><td>Very high</td><td>C6 – B7</td><td>Piccolo, highest notes of the piano</td></tr>
  </tbody>
</table>
</div>

<h2 id="h-chromatic">The 12 notes with accidentals</h2>

<p>Each of the 7 natural notes can be raised by a half step (UK: semitone) with a ♯ (sharp) or lowered by a half step with a ♭ (flat). This gives 12 different notes within an octave, which form the <strong>chromatic scale</strong>:</p>

<p><strong>C – C♯/D♭ – D – D♯/E♭ – E – F – F♯/G♭ – G – G♯/A♭ – A – A♯/B♭ – B – C</strong></p>

<p>Notes joined by a slash (such as C♯ and D♭) sound the same on the piano but are named differently depending on the harmonic context. They are called <a href="/diccionario-musical/intervalos/unisono-y-notas-enarmonicas/">enharmonic notes</a>. Between E and F, and between B and C, there is no note in between: they are already natural <a href="/diccionario-musical/intervalos/tono-y-semitono/">half steps</a>.</p>

<h3>Accidentals in fixed-do and German</h3>

<p>In English the words <em>sharp</em> (♯) and <em>flat</em> (♭) follow the letter. In fixed-do Spanish and French the syllable is followed by "sharp" or "flat" in the local language (Do♯, Si♭). German has its own rules: <strong>sharps</strong> end in <strong>-is</strong> and <strong>flats</strong> end in <strong>-es</strong>. The exception to remember is <strong>B♭</strong>, which in German is simply <strong>B</strong> (and B natural, remember, is H).</p>

<div class="tm-table-wrap">
<table class="tm-table">
<thead><tr><th>English</th><th>Fixed-do</th><th>German</th></tr></thead>
<tbody>
<tr><td>C♯ (C sharp)</td><td>Do♯</td><td>Cis</td></tr>
<tr><td>D♭ (D flat)</td><td>Re♭</td><td>Des</td></tr>
<tr><td>D♯</td><td>Re♯</td><td>Dis</td></tr>
<tr><td>E♭</td><td>Mi♭</td><td>Es</td></tr>
<tr><td>F♯</td><td>Fa♯</td><td>Fis</td></tr>
<tr><td>G♭</td><td>Sol♭</td><td>Ges</td></tr>
<tr><td>G♯</td><td>Sol♯</td><td>Gis</td></tr>
<tr><td>A♭</td><td>La♭</td><td>As</td></tr>
<tr><td>A♯</td><td>La♯</td><td>Ais</td></tr>
<tr><td>B♭</td><td>Si♭</td><td>B</td></tr>
</tbody>
</table>
</div>

<p>The same rule forms the less common accidentals: E♯ is <em>Eis</em>, B♯ is <em>His</em>, C♭ is <em>Ces</em> and F♭ is <em>Fes</em>.</p>

<h2 id="h-clefs">Where are the notes placed in the different clefs?</h2>

<p>There are <a href="/diccionario-musical/claves-musicales/">7 clefs</a> in common use (treble, F clef on the 3rd and 4th lines, and C clef on the 1st, 2nd, 3rd and 4th lines). Each clef defines which note sits on its reference line of the staff, and that sets the position of all the others.</p>

<h3 id="h-treble-clef">Treble clef</h3>

<figure data-tm-clef="sol2"><img src="${CL}nombres-clave-de-sol.svg" width="405" height="154" alt="Treble clef" loading="lazy" decoding="async"></figure>

<p>In the <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a>, G4 is on the 2nd line. The lines of the <a href="/diccionario-musical/pentagramas/">staff</a> (from the bottom up) are <strong>E–G–B–D–F</strong> and the spaces are <strong>F–A–C–E</strong>. The 1st ledger line below the staff is C4 (middle C).</p>
<p class="tm-embed-cap">Practice also by <a href="/ejercicios/escribir-notas/clave-de-sol/">writing notes in the treble clef</a> · <a href="/ejercicios/identificar-notas/clave-de-sol/">identify notes in the treble clef →</a></p>

<h3 id="h-bass-clef">Bass clef (F clef on the 4th line)</h3>

<figure data-tm-clef="fa4"><img src="${CL}nombres-clave-de-fa-en-4.svg" width="406" height="144" alt="Bass clef (F clef on the 4th line)" loading="lazy" decoding="async"></figure>

<p>In the <a href="/diccionario-musical/claves-musicales/clave-de-fa/">bass clef</a>, F3 is on the 4th line. The lines (from the bottom up) are <strong>G–B–D–F–A</strong> and the spaces are <strong>A–C–E–G</strong>. Middle C appears on the 1st ledger line above the staff.</p>
<p class="tm-embed-cap">Practice also by <a href="/ejercicios/escribir-notas/clave-de-fa-en-4/">writing notes in the bass clef</a> · <a href="/ejercicios/identificar-notas/clave-de-fa-en-4/">identify notes in the bass clef →</a></p>

<h3 id="h-f-clef-3rd-line">F clef on the 3rd line</h3>

<figure data-tm-clef="fa3"><img src="${CL}nombres-clave-de-fa-en-3.svg" width="406" height="144" alt="F clef on the 3rd line" loading="lazy" decoding="async"></figure>

<p>In the F clef on the 3rd line (baritone clef), F is on the 3rd line. The lines (from the bottom up) are <strong>B–D–F–A–C</strong>. It is rare in current music and appears in some older baritone vocal and cello scores.</p>
<p class="tm-embed-cap">Practice also by <a href="/ejercicios/escribir-notas/clave-de-fa-en-3/">writing notes in the F clef on the 3rd line</a> · <a href="/ejercicios/identificar-notas/clave-de-fa-en-3/">identify notes →</a></p>

<h3 id="h-c-clef-1st-line">C clef on the 1st line</h3>

<figure data-tm-clef="do1"><img src="${CL}nombres-clave-de-do-en-1.svg" width="405" height="144" alt="C clef on the 1st line" loading="lazy" decoding="async"></figure>

<p>In the <a href="/diccionario-musical/claves-musicales/clave-de-do/">C clef</a> on the 1st line (soprano clef), C4 is on the 1st line. The lines (from the bottom up) are <strong>C–E–G–B–D</strong>. It was used for soprano voices in Renaissance and Baroque vocal music.</p>
<p class="tm-embed-cap">Practice also by <a href="/ejercicios/escribir-notas/clave-de-do-en-1/">writing notes in the C clef on the 1st line</a> · <a href="/ejercicios/identificar-notas/clave-de-do-en-1/">identify notes →</a></p>

<h3 id="h-c-clef-2nd-line">C clef on the 2nd line</h3>

<figure data-tm-clef="do2"><img src="${CL}nombres-clave-de-do-en-2.svg" width="405" height="144" alt="C clef on the 2nd line" loading="lazy" decoding="async"></figure>

<p>In the C clef on the 2nd line (mezzo-soprano clef), C4 is on the 2nd line. The lines (from the bottom up) are <strong>A–C–E–G–B</strong>. It is rare in modern music and was used for mezzo-soprano voices in older vocal music.</p>
<p class="tm-embed-cap">Practice also by <a href="/ejercicios/escribir-notas/clave-de-do-en-2/">writing notes in the C clef on the 2nd line</a> · <a href="/ejercicios/identificar-notas/clave-de-do-en-2/">identify notes →</a></p>

<h3 id="h-c-clef-3rd-line">C clef on the 3rd line</h3>

<figure data-tm-clef="do3"><img src="${CL}nombres-clave-de-do-en-3.svg" width="405" height="144" alt="C clef on the 3rd line" loading="lazy" decoding="async"></figure>

<p>In the C clef on the 3rd line (alto clef), C4 is on the 3rd line. It is the standard clef of the viola and is also used in some alto trombone passages. The lines (from the bottom up) are <strong>F–A–C–E–G</strong>.</p>
<p class="tm-embed-cap">Practice also by <a href="/ejercicios/escribir-notas/clave-de-do-en-3/">writing notes in the C clef on the 3rd line</a> · <a href="/ejercicios/identificar-notas/clave-de-do-en-3/">identify notes →</a></p>

<h3 id="h-c-clef-4th-line">C clef on the 4th line</h3>

<figure data-tm-clef="do4"><img src="${CL}nombres-clave-de-do-en-4.svg" width="405" height="144" alt="C clef on the 4th line" loading="lazy" decoding="async"></figure>

<p>In the C clef on the 4th line (tenor clef), C4 is on the 4th line. It is used by the bassoon, the tenor trombone and the cello in high-register passages. The lines (from the bottom up) are <strong>D–F–A–C–E</strong> and the spaces are <strong>E–G–B–D</strong>.</p>
<p class="tm-embed-cap">Practice also by <a href="/ejercicios/escribir-notas/clave-de-do-en-4/">writing notes in the C clef on the 4th line</a> · <a href="/ejercicios/identificar-notas/clave-de-do-en-4/">identify notes →</a></p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
<div class="tm-faq-item">
<div class="tm-faq-q">Why is the first letter A and not C?</div>
<div class="tm-faq-a">Medieval theorists labeled the notes of their system with the letters A to G, starting from the lowest note, A. C is simply the third letter. Later, the scale starting on C became the reference scale, which is why Do (the first solfège syllable) corresponds to C.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">Why learn the German note names?</div>
<div class="tm-faq-a">The German system is needed to read scores and analyses of Germanic music (Bach, Beethoven, Brahms) and chord symbols such as H7 or B-dur. The key difference: B = B♭ and H = B♮.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How many notes are there in total with accidentals?</div>
<div class="tm-faq-a">With sharps and flats there are 12 different pitches within an octave. The 7 natural notes plus their enharmonic alterations form the 12-note chromatic scale.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What are the musical notes called in English?</div>
<div class="tm-faq-a">In English, notes are named with letters: C (Do), D (Re), E (Mi), F (Fa), G (Sol), A (La) and B (Si). Sharps add "sharp" (♯) and flats add "flat" (♭): C♯ is C sharp, B♭ is B flat.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">Why does B have two names in German: H and B?</div>
<div class="tm-faq-a">Historically, B♭ was the only note that was often altered, and it received the letter B. A new letter, H, was adopted for natural B. So in German B = B♭ and H = B♮. This distinction is essential for reading harmonic analyses of Bach, Brahms or Wagner.</div>
</div>
</div>
</div>
</div>
</section>`,
});
