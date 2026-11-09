const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/time-signatures/3-4-time/',
  esPath: '/diccionario-musical/compases/compas-de-3-4/',
  title: '3/4 Time Signature: The Waltz Meter, With Examples',
  description: '3/4 is a simple meter with three quarter-note beats per measure, the waltz meter. Learn how to count it, how it differs from 6/8, and hear an example.',
  h1: '3/4 Time Signature',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Time Signatures', '/diccionario-musical/compases/']],
  scripts: ['tm-piano-audio'],
  body: `
<p><strong>3/4 time</strong> is a <strong>simple meter</strong> with three <strong>quarter-note</strong> (UK: crotchet) beats per measure (UK: bar). It is the meter of the <strong>waltz</strong> and, in general, of music with a characteristic triple "one-two-three" pulse.</p>

<h2>What does 3/4 mean?</h2>

<p>In the <a href="/diccionario-musical/compases/unidad-de-tiempo-y-unidad-de-compas/">time signature</a>, the top number <strong>3</strong> says the measure has three beats and the bottom number <strong>4</strong> says the note value that gets one beat is the <strong>quarter note</strong>. Because it is a simple meter, each of the three beats divides into two eighth notes (UK: quavers), and the accent pattern is Strong–Weak–Weak.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/compas-3-4-pulso.svg" width="220" height="122" alt="A measure of 3/4 with three quarter notes, one for each beat" loading="lazy" decoding="async"><figcaption>3/4 is counted in <strong>three beats</strong>; each beat is a <strong>quarter note</strong>.</figcaption></figure>

<h2>How to count 3/4</h2>

<p>Count <strong>"1&nbsp;–&nbsp;2&nbsp;–&nbsp;3"</strong>, with a strong accent on the first beat and two weak ones after it. This is the typical sway of a waltz: one marked accent followed by two lighter pulses. Each beat divides into two eighth notes, giving six eighth notes per measure grouped 2+2+2:</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/compas-3-4-subdivision.svg" width="258" height="122" alt="Six eighth notes in 3/4 beamed in pairs (2+2+2)" loading="lazy" decoding="async"><figcaption>Each quarter note divides into <strong>two eighth notes</strong>: the six are grouped <strong>2+2+2</strong>.</figcaption></figure>

<h2>3/4 at a glance</h2>

<div class="tm-table-wrap"><table class="tm-table">
  <thead><tr><th>Element</th><th>In 3/4</th></tr></thead>
  <tbody>
    <tr><td>Type of meter</td><td>Simple (triple)</td></tr>
    <tr><td>Beats per measure</td><td>3</td></tr>
    <tr><td>Beat unit</td><td>Quarter note</td></tr>
    <tr><td>Subdivision of each beat</td><td>2 eighth notes (binary)</td></tr>
    <tr><td>Eighth notes per measure</td><td>6 (grouped 2+2+2)</td></tr>
    <tr><td>Accent pattern</td><td>Strong – Weak – Weak</td></tr>
  </tbody>
</table></div>

<h2>Example melody in 3/4</h2>

<p>This melody in C major shows the triple sway of the waltz. The last measure ends on a dotted half note, which fills all three beats:</p>

<figure class="tm-staff" data-tm-melody="c/4:q e/4:q g/4:q | a/4:q g/4:q e/4:q | f/4:q d/4:q g/4:q | c/4:h." data-tm-bpm="150"><img src="/assets/img/notacion/compases/compas-3-4-melodia.svg" width="590" height="122" alt="Example melody of four measures in 3/4, in C major" loading="lazy" decoding="async"><figcaption>Example melody in 3/4: the triple pulse of the waltz. Press ▶ to listen.</figcaption></figure>

<h2>Where is 3/4 used?</h2>

<ul>
  <li><strong>Waltz:</strong> 3/4 is the waltz meter par excellence, with its "oom-pah-pah."</li>
  <li><strong>Minuet and mazurka:</strong> classical and folk triple-meter dances.</li>
  <li><strong>Ballads and songs:</strong> many gentle, swaying songs are in 3/4.</li>
</ul>

<h2>3/4 compared with 6/8: the most common confusion</h2>

<p>3/4 and <a href="/diccionario-musical/compases/compas-de-6-8/">6/8</a> both contain <strong>six eighth notes</strong>, but they are grouped differently: 3/4 has <strong>three</strong> beats with a binary subdivision (2+2+2), while 6/8 has <strong>two</strong> beats with a ternary subdivision (3+3). That is why 3/4 gives a clear triple pulse (the waltz) and 6/8 sounds rocking. Its compound counterpart is <a href="/diccionario-musical/compases/compas-de-9-8/">9/8</a>, which has the same three beats but divides each one in three.</p>

<p>To check whether you can tell them apart by ear, try the listening exercise <a href="/ejercicios/auditivos/reconocer-el-compas/">recognize the meter by ear</a>. Pay attention to how the eighth notes group: 2+2+2 is 3/4, 3+3 is 6/8.</p>

<h2>How to practice 3/4</h2>

<p>Practice the waltz sway with the <a href="/herramientas/metronomo/?meter=3/4&amp;bpm=120">online metronome with 3/4 already selected</a>: the accent on the first beat marks the "one" of each measure. To identify the time signature of a score, use the <a href="/diccionario-musical/compases/analizar-compases/">time signature analyzer</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is 3/4 time?</div>
      <div class="tm-faq-a">3/4 is a simple meter with three beats per measure, each worth a quarter note. It is the meter of the waltz, with a triple strong–weak–weak pulse.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is 3/4 simple or compound?</div>
      <div class="tm-faq-a">3/4 is a simple meter, because each beat divides into two eighth notes. Its compound counterpart is 9/8, which divides each beat into three.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between 3/4 and 6/8?</div>
      <div class="tm-faq-a">Both contain six eighth notes, but 3/4 has three beats with a binary subdivision (2+2+2) and 6/8 has two beats with a ternary subdivision (3+3). 3/4 sounds like a waltz and 6/8 sounds rocking.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many beats are in a measure of 3/4?</div>
      <div class="tm-faq-a">Three beats, and the note value that gets one beat is the quarter note. The first beat is strong and the other two are weak.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
