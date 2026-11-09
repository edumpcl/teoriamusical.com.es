const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/rhythm/note-values/note-value-in-each-time-signature/',
  esPath: '/ejercicios/figuras/valor-de-las-figuras/',
  title: 'Note Values in Each Time Signature: Beats Quiz',
  description: 'Quiz on how many beats each note and rest lasts in 2/4, 3/4, 4/4, 6/8, 9/8 and 12/8, with dots and double dots. Instant answers, no sign-up.',
  h1: 'Note Values in Each Time Signature',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Note Value and Rhythm Exercises', '/ejercicios/figuras/']],
  scripts: ['tm-mei', 'tm-notacion', 'figuras-engine'],
  body: `<p>The value of a note <strong>in beats depends on the time signature</strong>; the relationship between notes does not change (a quarter note (UK: crotchet) always lasts twice as long as an eighth note (UK: quaver)). A dotted quarter note lasts 1½ beats in 2/4 and exactly one beat in 6/8, because in compound meters the beat is the dotted quarter note. In this exercise you see a measure and a note or a rest, and you say how long it lasts, in beats.</p>

<div id="tmfg"></div>
<script>
  document.addEventListener('DOMContentLoaded', function () { if (window.tmFigurasEjercicio) tmFigurasEjercicio('tmfg', 'valor'); });
</script>

<h2>How long each note lasts in each time signature</h2>

<p>The first step is to look at the time signature and know <strong>which note lasts one beat</strong>:</p>
<ul>
  <li>In the <strong>simple</strong> meters with a 4 at the bottom (<strong>2/4, 3/4 and 4/4</strong>) the beat is the <strong>quarter note</strong>, which divides into two eighth notes.</li>
  <li>In the <strong>compound</strong> meters with an 8 at the bottom (<strong>6/8, 9/8 and 12/8</strong>) the beat is the <strong>dotted quarter note</strong>, which divides into three eighth notes. That is why each eighth note lasts <strong>one third</strong> of a beat.</li>
</ul>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Note</th><th>In 2/4, 3/4 and 4/4</th><th>In 6/8, 9/8 and 12/8</th></tr></thead>
  <tbody>
    <tr><td><strong>Whole note</strong></td><td>4 beats</td><td>2⅔ beats</td></tr>
    <tr><td><strong>Dotted half note</strong></td><td>3 beats</td><td>2 beats</td></tr>
    <tr><td><strong>Half note</strong></td><td>2 beats</td><td>1⅓ beats</td></tr>
    <tr><td><strong>Dotted quarter note</strong></td><td>1½ beats</td><td>1 beat</td></tr>
    <tr><td><strong>Quarter note</strong></td><td>1 beat</td><td>⅔ of a beat</td></tr>
    <tr><td><strong>Dotted eighth note</strong></td><td>¾ of a beat</td><td>½ a beat</td></tr>
    <tr><td><strong>Eighth note</strong></td><td>½ a beat</td><td>⅓ of a beat</td></tr>
    <tr><td><strong>Sixteenth note</strong></td><td>¼ of a beat</td><td>⅙ of a beat</td></tr>
  </tbody>
</table>
</div>

<p>A <strong>dot</strong> adds to the note half of its value, and with a <strong>double dot</strong> the second dot adds half of what the first one adds. So a double-dotted quarter note lasts 1 + ½ + ¼ = <strong>1¾ beats</strong> in 2/4, and ⅔ + ⅓ + ⅙ = <strong>1⅙ beats</strong> in 6/8. <strong>Rests</strong> last exactly the same as their note, also with a dot.</p>

<p>In the exercise only notes that fit in the measure appear (a whole note does not fit in 2/4). And the <strong>whole rest</strong> appears only in 4/4: in a score it is used to show a whole measure of silence in any time signature, however long the measure lasts, so outside 4/4 it would not last the four beats of a whole note.</p>

<p>The full theory is in <a href="/diccionario-musical/puntillo/">the dot</a> and in <a href="/diccionario-musical/compases/">time signatures</a>, and there are more exercises in <a href="/ejercicios/figuras/">note value and rhythm exercises</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How long does a dotted quarter note last?</div>
      <div class="tm-faq-a">It depends on the time signature. In 2/4, 3/4 and 4/4, where the beat is the quarter note, it lasts one and a half beats. In 6/8, 9/8 and 12/8, where the beat is the dotted quarter note, it lasts one beat.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How long does an eighth note last in 6/8?</div>
      <div class="tm-faq-a">One third of a beat. In 6/8 each beat is a dotted quarter note, which divides into three eighth notes.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How long does a dotted half note last?</div>
      <div class="tm-faq-a">Three beats in the meters with a 4 at the bottom, like 3/4, and two beats in the meters with an 8 at the bottom, like 6/8.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does the value of a note depend on the time signature?</div>
      <div class="tm-faq-a">Because what changes is the reference, not the note: its length is expressed in beats, and the note that lasts one beat is the quarter note in simple meters with a 4 at the bottom and the dotted quarter note in compound meters with an 8 at the bottom.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
