const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/rhythm/note-values/dotted-notes-and-ties/',
  esPath: '/ejercicios/figuras/puntillo-y-ligadura/',
  title: 'A Dot Is a Tie: Dotted Notes and Tied Notes Exercise',
  description: 'Interactive exercise: every dotted note sounds the same as a pair of tied notes. Match them in both directions, with single and double dots.',
  h1: 'A Dot Is a Tie',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Note Value and Rhythm Exercises', '/ejercicios/figuras/']],
  scripts: ['tm-mei', 'tm-notacion', 'figuras-engine'],
  body: `<p>This exercise practices something that is often overlooked: every note with a <a href="/diccionario-musical/puntillo/">dot</a> sounds <strong>exactly the same</strong> as a pair of <a href="/diccionario-musical/ligaduras/">tied</a> notes of the same pitch (with a double dot, three tied notes instead of two). More precisely, with a <strong>tie</strong>, the kind of curve that adds up the lengths of the notes instead of only joining them expressively. A dot is just a shortened way of writing that tie. You have to recognize the equivalence in both directions: given the dotted note, find the tied pair, and the other way around.</p>

<div id="tmfg"></div>
<script>
  document.addEventListener('DOMContentLoaded', function () { if (window.tmFigurasEjercicio) tmFigurasEjercicio('tmfg', 'puntillo'); });
</script>

<h2>Why a dot is a tie</h2>

<p>A dot adds to a note <strong>half of its value</strong>. And that half, in the series of note values, is always <strong>the next note down</strong> (half of a half note is a quarter note; half of a quarter note is an eighth note, and so on). That is why:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>With a dot</th><th>Sounds the same as</th></tr></thead>
  <tbody>
    <tr><td><strong>Dotted whole note</strong></td><td>Whole note tied to a half note</td></tr>
    <tr><td><strong>Dotted half note</strong></td><td>Half note tied to a quarter note</td></tr>
    <tr><td><strong>Dotted quarter note</strong></td><td>Quarter note tied to an eighth note</td></tr>
    <tr><td><strong>Dotted eighth note</strong></td><td>Eighth note tied to a sixteenth note</td></tr>
  </tbody>
</table>
</div>

<p>With a <strong>double dot</strong> the reasoning repeats once more: the second dot adds half of what the first one adds, so a <strong>double-dotted quarter note</strong> sounds the same as a <strong>quarter note tied to an eighth note tied to a sixteenth note</strong>. This equivalence <strong>does not depend on the time signature</strong>: it is always the same proportion, unlike how many beats the note lasts, which does change with the time signature (that is practiced in <a href="/ejercicios/figuras/valor-de-las-figuras/">note values in each time signature</a>).</p>

<h2>How it differs from "note value equivalences"</h2>

<p>It is not the same exercise as <a href="/ejercicios/figuras/equivalencias-de-figuras/">note value equivalences</a>, although both use the dot. Equivalences asks <strong>how many equal notes</strong> fit in another (how many eighth notes in a dotted quarter note: three). Here the question is different: which <strong>pair of different notes, tied together</strong>, replaces the dotted note exactly. One counts; the other recognizes the tie.</p>

<p>You can practice one direction at a time or both mixed. Each test has 10 questions and the same one never comes up twice in a row.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is a dot the same as a tie?</div>
      <div class="tm-faq-a">Because a dot adds to the note half of its value, and that half is exactly the next note in the series (half note, quarter note, eighth note…). Writing a dotted quarter note or writing a quarter note tied to an eighth note of the same pitch sounds identical: the dot is only a shortened way of writing that tie.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What about the double dot?</div>
      <div class="tm-faq-a">The same, with three tied notes instead of two: the second dot adds half of what the first adds, so a double-dotted quarter note sounds the same as a quarter note tied to an eighth note tied to a sixteenth note (same pitch).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does this depend on the time signature?</div>
      <div class="tm-faq-a">No. Unlike how many beats a note lasts, the equivalence between a dot and a tie is always the same proportion, in whatever time signature.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is this different from "note value equivalences"?</div>
      <div class="tm-faq-a">Equivalences asks how many EQUAL notes fit in another (how many eighth notes in a dotted quarter note). Here it is something else: which pair of DIFFERENT notes, tied together, replaces the dotted note exactly.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
