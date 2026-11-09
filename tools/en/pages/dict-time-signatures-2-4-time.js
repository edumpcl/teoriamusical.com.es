const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/time-signatures/2-4-time/',
  esPath: '/diccionario-musical/compases/compas-de-2-4/',
  title: '2/4 Time Signature: How to Count It, With Examples',
  description: '2/4 is a simple meter with two quarter-note beats per measure. Learn how to count it, how it differs from 6/8 and 4/4, and hear a melody in 2/4.',
  h1: '2/4 Time Signature',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Time Signatures', '/diccionario-musical/compases/']],
  scripts: ['tm-piano-audio'],
  body: `
<p><strong>2/4 time</strong> is a <strong>simple meter</strong> with two beats: each <strong>measure</strong> (UK: bar) holds <strong>two quarter notes</strong> (UK: crotchets), and each beat divides into <strong>two equal parts</strong> (duple subdivision). It is one of the most basic meters and the meter of the march, the polka and the pasodoble.</p>

<h2>What does 2/4 mean?</h2>

<p>In the <a href="/diccionario-musical/compases/unidad-de-tiempo-y-unidad-de-compas/">time signature</a>, the top number <strong>2</strong> says the measure has two beats, and the bottom number <strong>4</strong> says that the note value that gets one beat is the <strong>quarter note</strong> (one fourth of a whole note). Because 2/4 is a simple meter, each of the two beats divides in two. The strong accent falls on beat 1 and the weak one on beat 2 (strong–weak).</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/compas-2-4-pulso.svg" width="177" height="122" alt="A measure of 2/4 with two quarter notes, one for each beat" loading="lazy" decoding="async"><figcaption>2/4 is counted in <strong>two beats</strong>; each beat is a <strong>quarter note</strong>.</figcaption></figure>

<h2>How to count 2/4</h2>

<p>Count simply <strong>"1&nbsp;–&nbsp;2"</strong>, leaning on the 1. Each beat can be divided into <strong>two eighth notes</strong> (UK: quavers), which gives the familiar "one-two, one-two" feel of a march:</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/compas-2-4-subdivision.svg" width="203" height="122" alt="Four eighth notes in 2/4 beamed in two groups of two (2+2)" loading="lazy" decoding="async"><figcaption>Each quarter note divides into <strong>two eighth notes</strong>: the four are beamed <strong>2+2</strong>.</figcaption></figure>

<h2>2/4 at a glance</h2>

<div class="tm-table-wrap"><table class="tm-table">
  <thead><tr><th>Element</th><th>In 2/4</th></tr></thead>
  <tbody>
    <tr><td>Type of meter</td><td>Simple (duple)</td></tr>
    <tr><td>Beats per measure</td><td>2</td></tr>
    <tr><td>Beat unit</td><td>Quarter note</td></tr>
    <tr><td>Subdivision of each beat</td><td>2 eighth notes (binary)</td></tr>
    <tr><td>Notes that fill a measure</td><td>2 quarter notes, 1 half note, 4 eighth notes…</td></tr>
    <tr><td>Accent pattern</td><td>Strong – Weak</td></tr>
  </tbody>
</table></div>

<h2>Example melody in 2/4</h2>

<p>This melody in C major shows the marked, symmetrical character of 2/4. The last measure ends on a half note, which fills both beats:</p>

<figure class="tm-staff" data-tm-melody="c/4:q e/4:q | g/4:8 a/4:8 g/4:8 f/4:8 | e/4:q d/4:q | c/4:h" data-tm-bpm="100"><img src="/assets/img/notacion/compases/compas-2-4-melodia.svg" width="472" height="122" alt="Example melody of four measures in 2/4, in C major" loading="lazy" decoding="async"><figcaption>Example melody in 2/4: the clear duple pulse of a march. Press ▶ to listen.</figcaption></figure>

<h2>Where is 2/4 used?</h2>

<ul>
  <li><strong>Marches:</strong> the "left-right" duple pulse of marching is 2/4 by nature.</li>
  <li><strong>Polka:</strong> a fast, bouncy Central European dance.</li>
  <li><strong>Pasodoble:</strong> the typical meter of Spanish bullfighting and band music.</li>
  <li><strong>Folk and popular music:</strong> many traditional songs and dance styles.</li>
</ul>

<h2>2/4 compared with 6/8 and 4/4</h2>

<p>2/4 and <a href="/diccionario-musical/compases/compas-de-6-8/">6/8</a> are both counted in two, but 2/4 has a <strong>binary</strong> subdivision (each beat in two) and 6/8 a <strong>ternary</strong> one (each beat in three). That is why 6/8 sounds rocking and 2/4 sounds square and marked. Compared with <a href="/diccionario-musical/compases/compas-de-4-4/">4/4</a>, 2/4 is lighter, with only two beats instead of four, which gives it its continuous "oom-pah" character.</p>

<p>To learn to tell them apart by ear, try the listening exercise <a href="/ejercicios/auditivos/reconocer-el-compas/">recognize the meter by ear</a>: a melody plays with the first beat accented and you decide whether it is in 2/4, 4/4, 6/8 or another meter.</p>

<h2>How to practice 2/4</h2>

<p>Practice the duple pulse with a steady click on the <a href="/herramientas/metronomo/?meter=2/4&amp;bpm=100">online metronome with 2/4 already selected</a>: the accent on the first beat helps you feel the "1-2" without getting lost. To identify the time signature of a score, use the <a href="/diccionario-musical/compases/analizar-compases/">time signature analyzer</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is 2/4 time?</div>
      <div class="tm-faq-a">2/4 is a simple meter with two beats per measure. Each measure holds two quarter notes and each beat divides into two eighth notes. It is the meter of the march, the polka and the pasodoble.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is 2/4 simple or compound?</div>
      <div class="tm-faq-a">2/4 is a simple meter, because each beat divides into two equal parts (two eighth notes). Compound meters divide each beat into three.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many beats are in a measure of 2/4?</div>
      <div class="tm-faq-a">Two beats, and the note value that gets one beat is the quarter note. The first beat is strong and the second is weak.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between 2/4 and 4/4?</div>
      <div class="tm-faq-a">2/4 has two beats and 4/4 has four. 2/4 is lighter, with the continuous "oom-pah" feel of marches, while 4/4 allows longer phrases.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
