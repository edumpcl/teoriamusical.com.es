const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/identify-notes/",
  esPath: "/ejercicios/identificar-notas/",
  title: "Identify Notes on the Staff: Note Reading Quiz by Clef",
  description: "Free note reading quizzes for the treble, bass, alto, tenor and other clefs. A note appears on the staff and you name it. Choose a clef or mix them all.",
  h1: "Identify Notes on the Staff",
  crumbs: [["Music Exercises","/ejercicios/"],["Note exercises","/en/exercises/notes/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>Learn to <strong>read notes on the staff</strong> with these interactive quizzes. Choose the clef you want to practice, or mix them all, and answer one question: what note is it? Each quiz has 10 questions on a real staff, and you see your score at the end. The notes are named with letters (C D E F G A B); in fixed-do countries these are Do Re Mi Fa Sol La Si.</p>

<div class="tm-grid-diccionario">
  <a href="/ejercicios/identificar-notas/clave-de-sol/" class="tm-card-dic"><div class="tm-card-dic-titulo">Treble Clef</div><div class="tm-card-dic-desc">Name notes in the treble clef, the clef of the violin, flute, trumpet and the right hand of the piano.</div></a>
  <a href="/ejercicios/identificar-notas/clave-de-fa-en-3/" class="tm-card-dic"><div class="tm-card-dic-titulo">F Clef on the 3rd Line</div><div class="tm-card-dic-desc">Name notes in the F clef on the 3rd line (the baritone clef), a rare clef found in older editions.</div></a>
  <a href="/ejercicios/identificar-notas/clave-de-fa-en-4/" class="tm-card-dic"><div class="tm-card-dic-titulo">Bass Clef</div><div class="tm-card-dic-desc">Name notes in the bass clef, used by the cello, bassoon, trombone, tuba and the left hand of the piano.</div></a>
  <a href="/ejercicios/identificar-notas/clave-de-do-en-1/" class="tm-card-dic"><div class="tm-card-dic-titulo">C Clef on the 1st Line</div><div class="tm-card-dic-desc">Name notes in the C clef on the 1st line, also called the soprano clef.</div></a>
  <a href="/ejercicios/identificar-notas/clave-de-do-en-2/" class="tm-card-dic"><div class="tm-card-dic-titulo">C Clef on the 2nd Line</div><div class="tm-card-dic-desc">Name notes in the C clef on the 2nd line, the mezzo-soprano clef.</div></a>
  <a href="/ejercicios/identificar-notas/clave-de-do-en-3/" class="tm-card-dic"><div class="tm-card-dic-titulo">Alto Clef</div><div class="tm-card-dic-desc">Name notes in the alto clef (C clef on the 3rd line), the clef of the viola.</div></a>
  <a href="/ejercicios/identificar-notas/clave-de-do-en-4/" class="tm-card-dic"><div class="tm-card-dic-titulo">Tenor Clef</div><div class="tm-card-dic-desc">Name notes in the tenor clef (C clef on the 4th line), used by cellists, bassoonists and trombonists.</div></a>
  <a href="/ejercicios/identificar-notas/todas-las-claves/" class="tm-card-dic"><div class="tm-card-dic-titulo">All Clefs</div><div class="tm-card-dic-desc">A different clef in every question: treble, bass, alto, tenor and the rarer ones.</div></a>
</div>

<p>Start with the treble or bass clef if you are new to reading music, and move on to the alto and tenor clefs if you play the viola, cello, bassoon or trombone. When you can read confidently, try to <a href="/ejercicios/escribir-notas/">write the notes</a> yourself, or review the theory of <a href="/diccionario-musical/claves-musicales/">musical clefs</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which clef should I practice first?</div>
      <div class="tm-faq-a">Start with the treble clef or the bass clef, depending on your instrument. They cover most written music. Add the alto and tenor clefs later if your instrument uses them.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many questions does each quiz have?</div>
      <div class="tm-faq-a">Ten. Every question shows one note on a staff, and you choose its letter name. At the end you see your score and can practice again.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What do the quizzes ask for?</div>
      <div class="tm-faq-a">Only the letter name of the note. The octave follows from the position on the staff and the clef, and you pick it up with practice.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
