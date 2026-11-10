const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/intervals/whole-step-and-half-step/',
  esPath: '/diccionario-musical/intervalos/tono-y-semitono/',
  title: 'Whole Steps and Half Steps: What They Are, How to Count',
  description: 'How many half steps are in a whole step? A whole step is 2 half steps. Learn how to count them on piano and guitar, with charts and scale patterns.',
  h1: 'Whole Steps and Half Steps',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Intervals', '/diccionario-musical/intervalos/']],
  scripts: ['tm-piano-audio', 'tono-semitono-engine'],
  body: `<p>The <strong>half step</strong> (UK: semitone) is the smallest distance between two notes in Western equal temperament, equal to moving one key on the piano. The <strong>whole step</strong> (UK: tone) is two half steps joined together. These two ideas are the basis for building scales, <a href="/diccionario-musical/intervalos/intervalos-musicales/">intervals</a> and chords in Western music.</p>

<ul>
  <li><strong>Half step:</strong> the smallest distance between two notes; on the piano, moving to the next key (white or black).</li>
  <li><strong>Whole step:</strong> the sum of two consecutive half steps; on the piano, a distance of two keys with one key in between.</li>
</ul>

<div class="tm-table-wrap">
<table class="tm-table">
  <tbody>
    <tr><td><strong>Half step</strong></td><td>The smallest distance (neighboring keys on the piano).</td></tr>
    <tr><td><strong>Whole step</strong></td><td>Two half steps in a row.</td></tr>
    <tr><td><strong>Major scale pattern</strong></td><td>Whole · Whole · <strong>Half</strong> · Whole · Whole · Whole · <strong>Half</strong></td></tr>
    <tr><td><strong>One octave</strong></td><td>12 half steps = 6 whole steps (the 12 notes of the chromatic scale)</td></tr>
    <tr><td><strong>The complete major scale</strong></td><td>5 whole steps and 2 half steps (5 × 2 + 2 = 12 half steps)</td></tr>
  </tbody>
</table>
</div>

<h2 id="c-major">Whole steps and half steps in the C major scale</h2>

<p>The C major scale is the clearest example for understanding whole steps and half steps: it has no accidentals, so the distances can be seen directly on the natural notes.</p>

<figure class="tm-staff" data-tm-melody="c/4:q d/4:q e/4:q f/4:q g/4:q a/4:q b/4:q c/5:q" data-tm-bpm="100"><img src="/assets/img/escalas/do-mayor-dentro.svg" width="840" height="147" alt="C major scale, no accidentals: C, D, E, F, G, A, B, C. Between one note and the next: whole step, whole step, half step, whole step, whole step, whole step, half step." loading="lazy" decoding="async"><figcaption>Press ▶ to hear the C major scale: the narrowest steps, the half steps, are E–F and B–C.</figcaption></figure>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Scale degrees</th><th>Notes</th><th>Distance</th></tr>
  </thead>
  <tbody>
    <tr><td>1 → 2</td><td>C → D</td><td>Whole step</td></tr>
    <tr><td>2 → 3</td><td>D → E</td><td>Whole step</td></tr>
    <tr><td>3 → 4</td><td>E → F</td><td><strong>Half step</strong></td></tr>
    <tr><td>4 → 5</td><td>F → G</td><td>Whole step</td></tr>
    <tr><td>5 → 6</td><td>G → A</td><td>Whole step</td></tr>
    <tr><td>6 → 7</td><td>A → B</td><td>Whole step</td></tr>
    <tr><td>7 → 8</td><td>B → C</td><td><strong>Half step</strong></td></tr>
  </tbody>
</table>
</div>

<p>The resulting pattern is <strong>W–W–H–W–W–W–H</strong> (W = whole step, H = half step). The two natural half steps of the major scale always fall between degrees 3–4 (E–F in C major) and 7–8 (B–C in C major).</p>

<h3 id="measure">Measure it yourself: the keyboard</h3>

<p>On a keyboard, the <strong>whole step</strong> C–D skips over one black key, and the <strong>natural half steps</strong> (E–F and B–C) are neighboring white keys with no black key between them. Check it: <strong>press one key and then another</strong> and the page counts the steps between the two (each key, white or black, is one step) and converts them into whole steps and half steps. You can also try the example buttons.</p>

<div id="tmtonosemi" style="min-height:300px;margin:18px 0"></div>
<script>document.addEventListener("DOMContentLoaded",function(){if(window.tmTonoSemitonoEngine)tmTonoSemitonoEngine("tmtonosemi");});</script>

<h3 id="half-step">Half step</h3>

<p>The half step is the smallest possible distance between two notes in Western equal temperament. On the piano it means moving from one key to the nearest adjacent key, white or black. There are two pairs of white keys with no black key between them: <strong>E–F</strong> and <strong>B–C</strong>. That is where the natural half steps are.</p>

<figure class="tm-staff" data-tm-melody="e/4:h f/4:h" data-tm-bpm="80"><img src="/assets/img/notacion/tono-semitono/semitono.svg" width="295" height="122" alt="E and F on the staff: from E to F there is a half step, with no note in between." loading="lazy" decoding="async"><figcaption>E–F: a <strong>half step</strong>. Press ▶ to hear it.</figcaption></figure>

<p>There are two kinds of half step that sound the same but are written differently:</p>
<ul>
  <li><strong>Diatonic half step</strong>: between notes with different letter names (E–F, B–C, C–D♭).</li>
  <li><strong>Chromatic half step</strong>: between notes with the same letter name, one natural and one altered (C–C♯, F–F♯).</li>
</ul>
<p>See the page on <a href="/diccionario-musical/intervalos/semitono-diatonico-y-semitono-cromatico/">diatonic and chromatic half steps</a> for a closer look.</p>

<h3 id="whole-step">Whole step</h3>

<p>A whole step equals exactly two half steps. On the piano it means moving from one key to the next key of the same color, two steps along the chromatic keyboard. Some examples:</p>
<ul>
  <li><strong>C → D</strong>: C♯/D♭ lies between them. Result: 1 whole step (2 half steps).</li>
  <li><strong>D → E</strong>: D♯/E♭ lies between them. Result: 1 whole step.</li>
  <li><strong>F → G</strong>: F♯/G♭ lies between them. Result: 1 whole step.</li>
</ul>

<figure class="tm-staff" data-tm-melody="c/4:h d/4:h" data-tm-bpm="80"><img src="/assets/img/notacion/tono-semitono/tono.svg" width="295" height="122" alt="C and D on the staff: from C to D there is a whole step, two half steps (C sharp lies in between)." loading="lazy" decoding="async"><figcaption>C–D: a <strong>whole step</strong> (two half steps). Press ▶ and compare it with the half step E–F.</figcaption></figure>

<figure class="tm-staff" style="max-width:560px;margin:1.5rem auto;">
<svg viewBox="0 0 640 190" width="100%" role="img" aria-label="Guitar fretboard: each fret equals one half step">
  <rect x="30" y="48" width="580" height="98" fill="#c9a06a"/>
  <rect x="30" y="48" width="8" height="98" fill="#3a2a1a"/>
  <g stroke="#777" stroke-width="3"><line x1="70" y1="48" x2="70" y2="146"/><line x1="150" y1="48" x2="150" y2="146"/><line x1="230" y1="48" x2="230" y2="146"/><line x1="310" y1="48" x2="310" y2="146"/><line x1="390" y1="48" x2="390" y2="146"/><line x1="470" y1="48" x2="470" y2="146"/><line x1="550" y1="48" x2="550" y2="146"/></g>
  <g stroke="#eee" stroke-width="1.2" opacity="0.8"><line x1="38" y1="68" x2="610" y2="68"/><line x1="38" y1="88" x2="610" y2="88"/><line x1="38" y1="108" x2="610" y2="108"/><line x1="38" y1="128" x2="610" y2="128"/></g>
  <g fill="#b8860b"><circle cx="54" cy="97" r="9"/><circle cx="110" cy="97" r="9"/><circle cx="190" cy="97" r="9"/></g>
  <g fill="#5a4630" font-family="Inter,Arial,sans-serif" font-size="13" text-anchor="middle"><text x="54" y="138">1</text><text x="110" y="138">2</text><text x="190" y="138">3</text><text x="270" y="138">4</text><text x="350" y="138">5</text><text x="430" y="138">6</text></g>
  <g font-family="Inter,Arial,sans-serif" font-weight="700">
    <path d="M54 42 V34 H110 V42" fill="none" stroke="#b8860b" stroke-width="2"/>
    <text x="82" y="28" text-anchor="middle" font-size="15" fill="#b8860b">half step</text>
    <path d="M54 158 V166 H190 V158" fill="none" stroke="#333" stroke-width="2"/>
    <text x="122" y="184" text-anchor="middle" font-size="15" fill="#333">whole step</text>
  </g>
</svg>
<figcaption>On the guitar, moving <strong>one fret</strong> up raises the pitch by a <strong>half step</strong>; <strong>two frets</strong>, a whole step.</figcaption>
</figure>

<h2 id="major-pattern">The same pattern in every major scale</h2>

<p>The pattern W–W–H–W–W–W–H is the "signature" of the major scale, and it applies the same way in every key. It is the accidentals in the key signature that keep the distances the same:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Scale</th><th>Notes</th><th>1→2</th><th>2→3</th><th>3→4</th><th>4→5</th><th>5→6</th><th>6→7</th><th>7→8</th></tr>
  </thead>
  <tbody>
    <tr><td>C major</td><td>C D E F G A B C</td><td>W</td><td>W</td><td>H</td><td>W</td><td>W</td><td>W</td><td>H</td></tr>
    <tr><td>G major</td><td>G A B C D E F♯ G</td><td>W</td><td>W</td><td>H</td><td>W</td><td>W</td><td>W</td><td>H</td></tr>
    <tr><td>F major</td><td>F G A B♭ C D E F</td><td>W</td><td>W</td><td>H</td><td>W</td><td>W</td><td>W</td><td>H</td></tr>
    <tr><td>D major</td><td>D E F♯ G A B C♯ D</td><td>W</td><td>W</td><td>H</td><td>W</td><td>W</td><td>W</td><td>H</td></tr>
  </tbody>
</table>
</div>

<p>The notes of each scale are on the page for <a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-naturales/">natural major scales</a>.</p>

<h2 id="minor-scale">Whole steps and half steps in the natural minor scale</h2>

<p>The natural minor scale has a different pattern: <strong>W–H–W–W–H–W–W</strong>. Its half steps fall between degrees 2–3 and 5–6, which gives it its characteristic sound compared with the major scale.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Scale degrees</th><th>Notes (A minor)</th><th>Distance</th></tr>
  </thead>
  <tbody>
    <tr><td>1 → 2</td><td>A → B</td><td>Whole step</td></tr>
    <tr><td>2 → 3</td><td>B → C</td><td><strong>Half step</strong></td></tr>
    <tr><td>3 → 4</td><td>C → D</td><td>Whole step</td></tr>
    <tr><td>4 → 5</td><td>D → E</td><td>Whole step</td></tr>
    <tr><td>5 → 6</td><td>E → F</td><td><strong>Half step</strong></td></tr>
    <tr><td>6 → 7</td><td>F → G</td><td>Whole step</td></tr>
    <tr><td>7 → 8</td><td>G → A</td><td>Whole step</td></tr>
  </tbody>
</table>
</div>

<p>See the page on <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-naturales/">natural minor scales</a> for this pattern in all the minor keys.</p>

<h2 id="chromatic">The chromatic scale: 12 half steps in an octave</h2>

<p>Chaining all the possible half steps one after another gives the <strong>chromatic scale</strong>. It contains the 12 notes of Western equal temperament and spans exactly one octave:</p>

<p>C – C♯ – D – D♯ – E – F – F♯ – G – G♯ – A – A♯ – B – C</p>

<p>An octave equals <strong>12 half steps</strong> or, in other words, 6 whole steps.</p>

<h2 id="intervals">Whole steps, half steps and intervals</h2>

<p>The number of half steps is the most precise way to measure the size of a <a href="/diccionario-musical/intervalos/intervalos-musicales/">musical interval</a>. Each interval corresponds to a fixed number of half steps:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Half steps</th><th>Equivalent in whole steps</th><th>Interval</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>½ step</td><td>minor 2nd</td></tr>
    <tr><td>2</td><td>1 whole step</td><td>Major 2nd</td></tr>
    <tr><td>3</td><td>1½ steps</td><td>minor 3rd</td></tr>
    <tr><td>4</td><td>2 whole steps</td><td>Major 3rd</td></tr>
    <tr><td>5</td><td>2½ steps</td><td>Perfect 4th</td></tr>
    <tr><td>6</td><td>3 whole steps</td><td>Tritone (Augmented 4th / Diminished 5th)</td></tr>
    <tr><td>7</td><td>3½ steps</td><td>Perfect 5th</td></tr>
    <tr><td>8</td><td>4 whole steps</td><td>minor 6th</td></tr>
    <tr><td>9</td><td>4½ steps</td><td>Major 6th</td></tr>
    <tr><td>10</td><td>5 whole steps</td><td>minor 7th</td></tr>
    <tr><td>11</td><td>5½ steps</td><td>Major 7th</td></tr>
    <tr><td>12</td><td>6 whole steps</td><td>Perfect octave</td></tr>
  </tbody>
</table>
</div>

<h2 id="altered-notes">Altered notes</h2>

<p>Accidentals (♯ and ♭) change the pitch of a note by a half step, and they directly affect the distance between notes:</p>
<ul>
  <li>If the upper note is raised with ♯, the distance <strong>grows</strong> by a half step.</li>
  <li>If the upper note is lowered with ♭, the distance <strong>shrinks</strong> by a half step.</li>
  <li>If the lower note is raised with ♯, the distance <strong>shrinks</strong>; if it is lowered with ♭, the distance <strong>grows</strong>.</li>
</ul>

<p>Specific examples:</p>
<ul>
  <li><strong>E–F♯</strong>: E–F is a half step; raising F to F♯ adds a half step → <strong>whole step</strong>.</li>
  <li><strong>C–D♭</strong>: C–D is a whole step; lowering D to D♭ takes away a half step → <strong>half step</strong>.</li>
  <li><strong>C♯–D</strong>: C–D is a whole step; raising C to C♯ makes the distance shorter → <strong>half step</strong>.</li>
  <li><strong>E♭–F</strong>: E–F is a half step; lowering E to E♭ makes the distance larger → <strong>whole step</strong>.</li>
</ul>

<h2>How to tell whether there is a whole step or a half step between two notes</h2>
<ol>
  <li>Find the two notes on a <strong>keyboard</strong> (or picture their positions).</li>
  <li>Count the <strong>smallest steps</strong> between them, counting both white and black keys.</li>
  <li><strong>One step = half step</strong>; <strong>two steps = whole step</strong>.</li>
</ol>
<p>The key is the two pairs of white notes that are already a half step apart: <strong>E–F</strong> and <strong>B–C</strong> (there is no black key between them). Between every other pair of neighboring white notes there is a whole step.</p>

<h2>What are whole steps and half steps for?</h2>
<p>They are the unit of measurement of all Western music. They are used to:</p>
<ul>
  <li><strong>Build <a href="/diccionario-musical/tonalidades/">scales</a>:</strong> every scale is a fixed pattern of whole steps and half steps.</li>
  <li><strong>Calculate <a href="/diccionario-musical/intervalos/intervalos-musicales/">intervals</a></strong> and form <a href="/diccionario-musical/acordes/">chords</a>.</li>
  <li><strong>Transpose</strong> a melody to another key without changing its shape.</li>
  <li><strong>Understand harmony:</strong> why there are tensions and points of rest.</li>
</ul>

<h2>Common mistakes</h2>
<ul>
  <li><strong>Believing there is a whole step between all white notes:</strong> between <strong>E–F</strong> and <strong>B–C</strong> there is a half step.</li>
  <li><strong>Thinking a half step always involves a black key:</strong> E–F and B–C are half steps between white keys.</li>
  <li><strong>Forgetting that accidentals change the distance:</strong> E–F is a half step, but E–F♯ is a whole step.</li>
</ul>

<h2>Practice whole steps and half steps</h2>

<aside class="tm-callout">
  <p><strong>Exercises to practice.</strong> The site already has several, with automatic feedback:</p>
  <ul style="margin:.5rem 0 0">
    <li><a href="/ejercicios/ejercicios-de-intervalos-musicales/semitono-diatonico-semitono-cromatico-notas-enarmonicas-y-unisono/">Diatonic half step, chromatic half step, enharmonic notes and unison</a>: tell the two kinds of half step apart.</li>
    <li><a href="/ejercicios/ejercicios-de-intervalos-musicales/segundas/">2nd exercises</a>: the major 2nd is a whole step and the minor 2nd a half step.</li>
    <li><a href="/ejercicios/escalas/construir-escala-cromatica/">Build the chromatic scale</a>: the 12 half steps of an octave.</li>
    <li><a href="/ejercicios/escalas/construir-escala-mayor/">Build the major scale</a>: the pattern whole–whole–half–whole–whole–whole–half.</li>
  </ul>
</aside>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is a half step in music?</div>
    <div class="tm-faq-a">The half step (UK: semitone) is the smallest possible distance between two notes in Western equal temperament. On the keyboard it equals two adjacent keys, such as C and C sharp or E and F.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">How many half steps are in a whole step?</div>
    <div class="tm-faq-a">A whole step (UK: tone) equals two half steps. For example, the distance between C and D is a whole step, and it passes through C sharp or D flat, which is the half step in between.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">Where are the natural half steps in the C major scale?</div>
    <div class="tm-faq-a">The C major scale has two natural half steps: between E and F, and between B and C. The other consecutive distances are whole steps: C–D, D–E, F–G, G–A and A–B.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">How many whole steps and half steps does the major scale have?</div>
    <div class="tm-faq-a">The major scale follows the pattern W–W–H–W–W–W–H (W = whole step, H = half step): there is a whole step between degrees 1–2, 2–3, 4–5, 5–6 and 6–7, and a half step between 3–4 and 7–8. The pattern is the same in every key.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is the difference between a diatonic and a chromatic half step?</div>
    <div class="tm-faq-a">A diatonic half step occurs between two notes with different letter names (such as E–F or B–C). A chromatic half step occurs between two notes with the same letter name, one natural and one altered (such as C–C♯). In equal temperament they sound the same, but they are written and analyzed differently.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">How many half steps are in an octave?</div>
    <div class="tm-faq-a">An octave has 12 half steps, which is 6 whole steps. These are the 12 notes of the chromatic scale (C, C sharp, D, D sharp, E, F, F sharp, G, G sharp, A, A sharp and B) up to the next C.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">How do you count whole steps and half steps between two notes?</div>
    <div class="tm-faq-a">On the keyboard you count the steps between the two notes, counting white and black keys: one step is a half step and two steps are a whole step. With an odd number of steps there is a half step left over (three steps are a whole step and a half step). E–F and B–C are a half step apart because there is no black key between them.</div>
  </div>
</div>
</div>
</div>
</section>
`,
});
