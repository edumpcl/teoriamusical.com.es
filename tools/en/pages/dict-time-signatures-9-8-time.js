const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/time-signatures/9-8-time/',
  esPath: '/diccionario-musical/compases/compas-de-9-8/',
  title: '9/8 Time Signature: How to Count It, With Examples',
  description: '9/8 is a compound meter with three dotted-quarter-note beats per measure. Learn how to count it, how it differs from 3/4, and hear a melody in 9/8.',
  h1: '9/8 Time Signature',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Time Signatures', '/diccionario-musical/compases/']],
  scripts: ['tm-piano-audio'],
  body: `
<p><strong>9/8 time</strong> is a <strong>compound meter</strong> with three beats. Although nine <strong>eighth notes</strong> (UK: quavers) fit in a measure (UK: bar), they group in threes to form <strong>three pulses</strong>, each equal to a <a href="/diccionario-musical/puntillo/">dotted quarter note</a> (UK: dotted crotchet). It is the compound triple meter, the "twin" of 3/4.</p>

<h2>What does 9/8 mean?</h2>

<p>In the <a href="/diccionario-musical/compases/unidad-de-tiempo-y-unidad-de-compas/">time signature</a>, the top number <strong>9</strong> says how many eighth notes fit in the measure, and the bottom number <strong>8</strong> says the reference note value is the eighth note. But those nine eighth notes are not nine beats: they group into <strong>three sets of three</strong>, so 9/8 is counted in <strong>three</strong>.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/compas-9-8-pulso.svg" width="252" height="122" alt="A measure of 9/8 with three dotted quarter notes, one for each beat" loading="lazy" decoding="async"><figcaption>9/8 is counted in <strong>three pulses</strong>; each is a <strong>dotted quarter note</strong>.</figcaption></figure>

<h2>How to count 9/8</h2>

<p>Each of the three beats divides into <strong>three eighth notes</strong> (ternary subdivision). Count <strong>"1&nbsp;2&nbsp;3&nbsp;–&nbsp;4&nbsp;5&nbsp;6&nbsp;–&nbsp;7&nbsp;8&nbsp;9"</strong>, leaning on the eighth notes 1, 4 and 7. The first is strong and the other two are weak (strong–weak–weak):</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/compas-9-8-subdivision.svg" width="339" height="122" alt="Nine eighth notes in 9/8 grouped in threes (3+3+3)" loading="lazy" decoding="async"><figcaption>The nine eighth notes group <strong>3+3+3</strong>: each group is one beat.</figcaption></figure>

<h2>9/8 at a glance</h2>

<div class="tm-table-wrap"><table class="tm-table">
  <thead><tr><th>Element</th><th>In 9/8</th></tr></thead>
  <tbody>
    <tr><td>Type of meter</td><td>Compound (triple)</td></tr>
    <tr><td>Beats per measure</td><td>3</td></tr>
    <tr><td>Beat unit</td><td>Dotted quarter note</td></tr>
    <tr><td>Subdivision of each beat</td><td>3 eighth notes (ternary)</td></tr>
    <tr><td>Eighth notes per measure</td><td>9 (grouped 3+3+3)</td></tr>
    <tr><td>Accent pattern</td><td>Strong – Weak – Weak</td></tr>
  </tbody>
</table></div>

<h2>Example melody in 9/8</h2>

<p>This melody in C major shows the ternary flow of 9/8. Each beat is either a group of three eighth notes or a dotted quarter note:</p>

<figure class="tm-staff" data-tm-melody="c/4:8 e/4:8 g/4:8 a/4:8 g/4:8 f/4:8 e/4:q. | d/4:8 e/4:8 f/4:8 e/4:8 d/4:8 c/4:8 c/4:q." data-tm-bpm="144"><img src="/assets/img/notacion/compases/compas-9-8-melodia.svg" width="541" height="122" alt="Example melody of two measures in 9/8, in C major, with eighth notes grouped 3+3+3" loading="lazy" decoding="async"><figcaption>Example melody in 9/8: three ternary beats with a flowing character. Press ▶ to listen.</figcaption></figure>

<h2>Where is 9/8 used?</h2>

<ul>
  <li><strong>Baroque music:</strong> common in gigues and in movements of a pastoral character.</li>
  <li><strong>Folk music:</strong> it appears in traditional dances of many cultures.</li>
  <li><strong>Contemporary music:</strong> progressive rock and jazz use it for its broad ternary sway.</li>
</ul>

<h2>9/8 compared with 3/4</h2>

<p>9/8 is the <strong>compound twin of <a href="/diccionario-musical/compases/compas-de-3-4/">3/4</a></strong>: both have three beats with the same accent pattern (strong–weak–weak). The difference is the subdivision: in 3/4 each beat divides in two (it is a quarter note), and in 9/8 it divides in three (it is a dotted quarter note). You can see the full accent hierarchy on the page about <a href="/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-compuestos/">accents in compound meters</a>.</p>

<p>To practice the difference by ear, try the listening exercise <a href="/ejercicios/auditivos/reconocer-el-compas/">recognize the meter by ear</a>: 9/8 and 3/4 have the same three beats, but the beat in 9/8 divides in three.</p>

<h2>How to practice 9/8</h2>

<p>Practice the three ternary beats with the <a href="/herramientas/metronomo/?meter=9/8&amp;bpm=120">online metronome with 9/8 already selected</a>: you will hear the accent on the first beat of each group of three. To identify the time signature of a score, use the <a href="/diccionario-musical/compases/analizar-compases/">time signature analyzer</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is 9/8 time?</div>
      <div class="tm-faq-a">9/8 is a compound meter with three beats. Each measure holds nine eighth notes that group in threes (3+3+3), so it is counted in three pulses, each equal to a dotted quarter note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is 9/8 simple or compound?</div>
      <div class="tm-faq-a">9/8 is a compound meter, because each of its three beats divides into three eighth notes (ternary subdivision).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many beats are in a measure of 9/8?</div>
      <div class="tm-faq-a">It is counted in three beats. The nine eighth notes group in three sets of three, with the accent pattern Strong–Weak–Weak.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between 9/8 and 3/4?</div>
      <div class="tm-faq-a">9/8 is the compound twin of 3/4: both have three beats with the same accent pattern. The difference is the subdivision: 3/4 divides each beat in two and 9/8 divides it in three.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
