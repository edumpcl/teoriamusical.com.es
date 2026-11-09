const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/write-notes/",
  esPath: "/ejercicios/escribir-notas/",
  title: "Write Notes on the Staff: Exercises for Every Clef",
  description: "Free exercises to write notes on the staff. You get a note name and place it in the treble, bass, alto, tenor or other clefs. 10 questions per quiz.",
  h1: "Write Notes on the Staff",
  crumbs: [["Music Exercises","/ejercicios/"],["Note exercises","/en/exercises/notes/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>Writing a note is the next step after reading it. In these exercises you are given a <strong>note name</strong> (C, D, E…) and you place the note on the staff in the clef you choose, or in all of them. Click or tap the staff to place the note; any octave is accepted. Each quiz has 10 questions. If you are used to Do Re Mi, remember that C is Do in fixed-do countries.</p>

<div class="tm-grid-diccionario">
  <a href="/ejercicios/escribir-notas/clave-de-sol/" class="tm-card-dic"><div class="tm-card-dic-titulo">Treble Clef</div><div class="tm-card-dic-desc">Place notes in the treble clef: you get a letter and click the right spot on the staff.</div></a>
  <a href="/ejercicios/escribir-notas/clave-de-fa-en-3/" class="tm-card-dic"><div class="tm-card-dic-titulo">F Clef on the 3rd Line</div><div class="tm-card-dic-desc">Place notes in the F clef on the 3rd line: you get a letter and mark its place on the staff.</div></a>
  <a href="/ejercicios/escribir-notas/clave-de-fa-en-4/" class="tm-card-dic"><div class="tm-card-dic-titulo">Bass Clef</div><div class="tm-card-dic-desc">Place notes in the bass clef: you get a letter and click its position on the staff.</div></a>
  <a href="/ejercicios/escribir-notas/clave-de-do-en-1/" class="tm-card-dic"><div class="tm-card-dic-titulo">C Clef on the 1st Line</div><div class="tm-card-dic-desc">Place notes in the C clef on the 1st line (soprano clef): you get a letter and click its position.</div></a>
  <a href="/ejercicios/escribir-notas/clave-de-do-en-2/" class="tm-card-dic"><div class="tm-card-dic-titulo">C Clef on the 2nd Line</div><div class="tm-card-dic-desc">Place notes in the C clef on the 2nd line (mezzo-soprano clef) on the staff.</div></a>
  <a href="/ejercicios/escribir-notas/clave-de-do-en-3/" class="tm-card-dic"><div class="tm-card-dic-titulo">Alto Clef</div><div class="tm-card-dic-desc">Place notes in the alto clef: you get a letter and click the right place on the staff.</div></a>
  <a href="/ejercicios/escribir-notas/clave-de-do-en-4/" class="tm-card-dic"><div class="tm-card-dic-titulo">Tenor Clef</div><div class="tm-card-dic-desc">Place notes in the tenor clef: you get a letter and click its position on the staff.</div></a>
  <a href="/ejercicios/escribir-notas/todas-las-claves/" class="tm-card-dic"><div class="tm-card-dic-titulo">All Clefs</div><div class="tm-card-dic-desc">Place notes in a different clef each time, from treble to the C clefs.</div></a>
</div>

<p>If you find writing hard, begin with the <a href="/ejercicios/identificar-notas/">note reading exercises</a>, which use the same clefs, or review the <a href="/diccionario-musical/claves-musicales/">musical clefs</a> in the dictionary.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I place a note on the staff?</div>
      <div class="tm-faq-a">Click or tap the staff at the position where the note belongs, then press Check. Lines and spaces are both valid positions. Use the anchor note of the clef to count to the right place.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is any octave accepted?</div>
      <div class="tm-faq-a">The exercise checks the letter name only. A given letter can be written in several places on the staff, and each one is a different octave of the same note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Are sharps and flats included?</div>
      <div class="tm-faq-a">No. These exercises use natural notes only, so you can focus on learning the positions in each clef.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
