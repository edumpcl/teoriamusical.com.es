const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/rhythm/note-values/ties-and-slurs/',
  esPath: '/ejercicios/figuras/ligaduras-de-union-y-expresion/',
  title: 'Tie or Slur? Free Online Exercise With Answers',
  description: 'Exercise to tell a tie from a slur and work out how long the tied note lasts in each time signature. Instant answers, no sign-up.',
  h1: 'Ties and Slurs Exercise',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Note Value and Rhythm Exercises', '/ejercicios/figuras/']],
  scripts: ['tm-mei', 'tm-notacion', 'figuras-engine'],
  body: `<p>The two kinds of <a href="/diccionario-musical/ligaduras/">curved line</a> are drawn the same way, but they do very different things: a <strong>tie</strong> adds up the lengths of the notes and a <strong>slur</strong> does not change them. In this exercise you say which one it is and <strong>how long the first note lasts</strong> that it covers, in the time signature shown.</p>

<div id="tmfg"></div>
<script>
  document.addEventListener('DOMContentLoaded', function () { if (window.tmFigurasEjercicio) tmFigurasEjercicio('tmfg', 'ligaduras'); });
</script>

<h2>Tie or slur: how to tell them apart</h2>

<p>It is enough to look at the notes the curve connects:</p>
<ul>
  <li>If they are <strong>the same note</strong> (the same pitch), it is a <strong>tie</strong>. The second note is not played again: the first one is prolonged, and their lengths <strong>add up</strong>. It is what is used to extend a note across the <strong>bar line</strong>, and it appears that way in the exercise.</li>
  <li>If they are <strong>different notes</strong>, it is a <strong>slur</strong>. They are played smoothly, without a break in the sound, but each note <strong>keeps its own length</strong>.</li>
</ul>

<p>For example, in <strong>3/4</strong>, a quarter note tied to an eighth note of the same pitch sounds as a single note of 1 + ½ = <strong>1½ beats</strong>. If the two notes were different, the curve would be a slur and the first note would still last <strong>1 beat</strong>. In <strong>6/8</strong> the same quarter note tied to an eighth note would last ⅔ + ⅓ = <strong>1 beat</strong>, because there the beat is the dotted quarter note.</p>

<p>There are more rhythm exercises in <a href="/ejercicios/figuras/">note value and rhythm exercises</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I know if a curved line is a tie or a slur?</div>
      <div class="tm-faq-a">Look at the notes it connects: if they are the same note, it is a tie; if they are different notes, it is a slur.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How long does a note with a tie last?</div>
      <div class="tm-faq-a">What the two notes add up to in that time signature. For example, in 3/4 a quarter note tied to an eighth note lasts one and a half beats.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does a slur change the length of the notes?</div>
      <div class="tm-faq-a">No. It shows that the notes are played smoothly, without a break in the sound, but each one keeps its own length.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
