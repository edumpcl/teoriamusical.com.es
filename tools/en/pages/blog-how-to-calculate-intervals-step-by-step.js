const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/blog/how-to-calculate-intervals-step-by-step/',
  esPath: '/blog/como-calcular-intervalos-paso-a-paso/',
  title: 'How to Calculate Intervals Step by Step (With Examples)',
  description: 'A 2-step method to name any musical interval: count the number, then find the quality (major, minor, perfect…). With a half-step chart and examples.',
  h1: 'How to Calculate Intervals Step by Step',
  crumbs: [['Blog', '/blog/']],
  articleAttrs: 'data-tm-intervals',
  scripts: ['tm-piano-audio'],
  datePublished: '2026-06-17',
  dateModified: '2026-06-17',
  body: `
<p>Being able to <strong>calculate an interval</strong>, that is, to give a name to the distance between two notes, is one of the first skills in music theory. Here is a <strong>two-step method</strong> that always works, with worked examples and a reference chart. If you need to review the theory first, see the page on <a href="/diccionario-musical/intervalos/intervalos-musicales/">musical intervals</a>.</p>

<h2>Every interval has a number and a quality</h2>
<p>To name an interval you need two pieces of information:</p>
<ul>
  <li>The <strong>number</strong> (2nd, 3rd, 4th, 5th…): how many note names it spans.</li>
  <li>The <strong>quality</strong> (major, minor, perfect, augmented or diminished): its exact size in <a href="/diccionario-musical/intervalos/tono-y-semitono/">whole steps and half steps</a> (UK: tones and semitones).</li>
</ul>
<p>For example, a “Major 3rd” or a “Perfect 5th”. Let’s take each step in turn.</p>

<h2>Step 1: count the number</h2>
<p>Count the <strong>letter names</strong> from the lower note up to the upper note, <strong>including both</strong>. Ignore sharps and flats for now: C♯ and C count the same.</p>
<p>From <strong>C to G</strong>: C(1) – D(2) – E(3) – F(4) – G(5) → a <strong>5th</strong>. From <strong>E up to C</strong>: E(1) – F(2) – G(3) – A(4) – B(5) – C(6) → a <strong>6th</strong>.</p>
<p>⚠️ A common mistake is to count the “steps” between the notes instead of the notes themselves. You count the notes, which is why a unison is 1 and an octave is 8.</p>

<h2>Step 2: find the quality</h2>
<p>Now count the exact distance in <strong>half steps</strong> (UK: semitones) and compare it with this chart of the intervals within an octave:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Half steps</th><th>Interval</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>0</td><td>Perfect unison</td><td>C–C</td></tr>
    <tr><td>1</td><td>minor 2nd</td><td>E–F</td></tr>
    <tr><td>2</td><td>Major 2nd</td><td>C–D</td></tr>
    <tr><td>3</td><td>minor 3rd</td><td>D–F</td></tr>
    <tr><td>4</td><td>Major 3rd</td><td>C–E</td></tr>
    <tr><td>5</td><td>Perfect 4th</td><td>C–F</td></tr>
    <tr><td>6</td><td>Augmented 4th / Diminished 5th (tritone)</td><td>F–B</td></tr>
    <tr><td>7</td><td>Perfect 5th</td><td>C–G</td></tr>
    <tr><td>8</td><td>minor 6th</td><td>E–C</td></tr>
    <tr><td>9</td><td>Major 6th</td><td>C–A</td></tr>
    <tr><td>10</td><td>minor 7th</td><td>D–C</td></tr>
    <tr><td>11</td><td>Major 7th</td><td>C–B</td></tr>
    <tr><td>12</td><td>Perfect octave</td><td>C–C</td></tr>
  </tbody>
</table>
</div>
<p>The golden rule of qualities: <strong>2nds, 3rds, 6ths and 7ths</strong> can be <strong>major or minor</strong>; <strong>unisons, 4ths, 5ths and octaves</strong> are <strong>perfect</strong>. Make a perfect interval a half step larger and it becomes <strong>augmented</strong>; make it a half step smaller and it becomes <strong>diminished</strong>. In the same way, a major interval made a half step larger is augmented, and a minor interval made a half step smaller is diminished.</p>

<h2>Worked examples</h2>
<p><strong>C → A.</strong> Step 1: C-D-E-F-G-A = 6 notes → a 6th. Step 2: 9 half steps → <strong>Major 6th</strong>.</p>
<figure class="tm-staff"><img src="/assets/img/notacion/intervalos/blog-iv-do-la.svg" width="251" height="159" alt="Interval from C to A (Major 6th) on the staff" loading="lazy" decoding="async"></figure>
<p><strong>D → F.</strong> Step 1: D-E-F = 3 notes → a 3rd. Step 2: 3 half steps → <strong>minor 3rd</strong>.</p>
<figure class="tm-staff"><img src="/assets/img/notacion/intervalos/blog-iv-re-fa.svg" width="251" height="159" alt="Interval from D to F (minor 3rd) on the staff" loading="lazy" decoding="async"></figure>
<p><strong>F → B.</strong> Step 1: F-G-A-B = 4 notes → a 4th. Step 2: 6 half steps (one more than a perfect 4th) → <strong>Augmented 4th</strong> (the famous tritone).</p>
<figure class="tm-staff"><img src="/assets/img/notacion/intervalos/blog-iv-fa-si.svg" width="251" height="159" alt="Interval from F to B (Augmented 4th or tritone) on the staff" loading="lazy" decoding="async"></figure>
<p><strong>C → E♭.</strong> Step 1: C-D-E = a 3rd (the flat does not change the number). Step 2: 3 half steps → <strong>minor 3rd</strong>.</p>
<figure class="tm-staff"><img src="/assets/img/notacion/intervalos/blog-iv-do-mib.svg" width="251" height="159" alt="Interval from C to E flat (minor 3rd) on the staff" loading="lazy" decoding="async"></figure>

<h2>Useful shortcuts</h2>
<ul>
  <li>Memorize the “natural” intervals above C (C–D Major 2nd, C–E Major 3rd, C–F Perfect 4th, C–G Perfect 5th, C–A Major 6th, C–B Major 7th). They are your reference for comparing other intervals.</li>
  <li>If an interval is larger than an octave, subtract 7 from its number to reduce it: a 9th is a 2nd plus an octave. This is covered in <a href="/diccionario-musical/intervalos/intervalos-simples-y-compuestos/">simple and compound intervals</a>.</li>
  <li>To invert an interval (put the lower note on top), the number and quality change in a predictable way. See <a href="/diccionario-musical/intervalos/inversion/">interval inversion</a>.</li>
  <li>Two notes that sound the same but are spelled differently (C♯ and D♭) form intervals of the same size with different names. They are <a href="/diccionario-musical/intervalos/unisono-y-notas-enarmonicas/">enharmonic notes</a>.</li>
  <li>Depending on how they sound together, intervals are also classified as <a href="/diccionario-musical/intervalos/intervalos-consonantes-y-disonantes/">consonant and dissonant</a>.</li>
</ul>

<p>Once you master the calculation, practice with the <a href="/ejercicios/ejercicios-de-intervalos-musicales/">interval exercises</a> and learn the difference between <a href="/diccionario-musical/intervalos/intervalos-armonicos-y-melodicos/">harmonic and melodic intervals</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you calculate a musical interval?</div>
      <div class="tm-faq-a">In two steps. First count the number: the letter names from the lower note to the upper note, including both. Then find the quality by measuring the exact distance in half steps. For example, from C to G there are 5 notes (a 5th) and 7 half steps, so it is a Perfect 5th.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I know if an interval is major, minor or perfect?</div>
      <div class="tm-faq-a">2nds, 3rds, 6ths and 7ths can be major or minor; unisons, 4ths, 5ths and octaves are perfect. The number of half steps decides which: a 3rd of 4 half steps is major and a 3rd of 3 half steps is minor.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do accidentals change the number of an interval?</div>
      <div class="tm-faq-a">No. The number depends only on the letter names: C to E and C to E♭ are both 3rds. Accidentals change only the quality: C to E is a Major 3rd and C to E♭ is a minor 3rd.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a tritone?</div>
      <div class="tm-faq-a">The tritone is the interval of 6 half steps. It is spelled as an Augmented 4th (for example F–B) or as a Diminished 5th (B–F). It is the most unstable interval in tonal music.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
