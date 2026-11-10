const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/build-mixolydian-scale/',
  esPath: '/ejercicios/escalas/construir-escala-mixolidia/',
  title: "Build Mixolydian Scales on the Staff: Exercise",
  description: "Build Mixolydian scales on the staff: the major scale with a lowered 7th. Free interactive exercise: place the 8 notes with the right accidentals.",
  h1: "Build the Mixolydian Scale",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-construir-data', 'escalas-construir-engine'],
  body: `<p>The name of a <strong>Mixolydian scale</strong> appears. Your task is to draw its <strong>8 notes</strong> on the staff. The Mixolydian scale is the major scale with the <strong>7th lowered</strong> by a half step (♭7): it sounds major but with a more open, "modal" ending, common in blues, rock and folk music.</p>

<div id="tmec_mixol"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEsConstrEngine("tmec_mixol", { scales: TM_CONSTRUIR_SCALES["mixolidia"], titulo: "la Escala Mixolidia" });
  });
</script>

<p><strong>How to use the exercise:</strong> Click (or drag) on the staff to place each note. First choose the accidental with the ♭ ♮ ♯ buttons if the note needs one. <em>Undo</em> removes the last note and <em>Clear</em> restarts the exercise. The notes are sorted automatically from low to high. The magnifier shows the note you are about to place.</p>

<h2>The pattern of the Mixolydian scale</h2>
<p>The Mixolydian scale follows the pattern <strong>W – W – H – W – W – H – W</strong> (UK: tone and semitone). It is the same as the major scale except at the end: the 7th is a <strong>whole step</strong> below the octave (not a half step), because it has been lowered by a half step compared with the major scale.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Degree</th><th>Step</th><th>C Mixolydian</th><th>G Mixolydian</th><th>F Mixolydian</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>1st</strong></td><td>&mdash;</td><td>C</td><td>G</td><td>F</td></tr>
    <tr><td><strong>2nd</strong></td><td>W</td><td>D</td><td>A</td><td>G</td></tr>
    <tr><td><strong>3rd</strong></td><td>W</td><td>E</td><td>B</td><td>A</td></tr>
    <tr><td><strong>4th</strong></td><td>H</td><td>F</td><td>C</td><td>B♭</td></tr>
    <tr><td><strong>5th</strong></td><td>W</td><td>G</td><td>D</td><td>C</td></tr>
    <tr><td><strong>6th</strong></td><td>W</td><td>A</td><td>E</td><td>D</td></tr>
    <tr><td><strong>7th</strong></td><td>H</td><td>B♭</td><td>F</td><td>E♭</td></tr>
    <tr><td><strong>8th</strong></td><td>W</td><td>C</td><td>G</td><td>F</td></tr>
  </tbody>
</table>
</div>
<h2>Mixolydian and the major scale: one accidental apart</h2>
<p>Each Mixolydian scale uses the notes of the major scale on the same tonic with one change, the lowered 7th. So <strong>G Mixolydian</strong> has exactly the notes of C major (no accidentals), and <strong>C Mixolydian</strong> only adds one B♭. Thinking "major with the leading tone lowered" is the fastest way to build it.</p>

<p>To lock these scales into your fingers, practice them with the <a href="/herramientas/metronomo/">online metronome</a> at 60-70% of your target tempo, raising it by 5 BPM each time you play three repetitions without mistakes. The <a href="/herramientas/afinador/">online tuner</a> lets you check your tuning before you start.</p>

<!-- ficha-escala-tipo -->
<h2>Printable worksheet (PDF)</h2>
<p>The same exercise on paper, for class: eight Mixolydian scales to write without a key signature, with each accidental before its note. With a separate <strong>answer sheet</strong>, with the answers in red.</p>
<p>It goes from easier to harder: first key signatures with few accidentals in treble clef, then more accidentals and the bass clef.</p>
<figure class="tm-staff">
  <a href="/assets/img/escalas/fichas/ficha-escribir-escalas-mixolidia.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/escalas/fichas/preview-ficha-escribir-escalas-mixolidia.webp"><img src="/assets/img/escalas/fichas/preview-ficha-escribir-escalas-mixolidia.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet for writing Mixolydian scales"></picture></a>
  <figcaption>A4 sheet for writing Mixolydian scales.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/escalas/fichas/ficha-escribir-escalas-mixolidia.pdf" target="_blank" rel="noopener">Download the worksheet (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/escalas/fichas/ficha-escribir-escalas-mixolidia-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>You may print and photocopy the worksheets freely for the classroom. There are also worksheets of this same type for <a href="/ejercicios/escalas/escalas-mixolidia/">identifying</a> and <a href="/ejercicios/escalas/construir-escala-mixolidia-con-armadura/">writing with a key signature</a>, and in the <a href="/ejercicios/escalas/#fichas">scales index</a> you can create custom worksheets, mixing whichever types you like.</p>
<!-- /ficha-escala-tipo -->

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the Mixolydian scale?</div>
      <div class="tm-faq-a">It is the fifth mode of the major scale: a major scale with the 7th lowered by a half step (♭7). Its pattern is W-W-H-W-W-H-W. It keeps the major 3rd (a bright character) but has a minor 7th that gives it a modal sound.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is the Mixolydian scale different from the major scale?</div>
      <div class="tm-faq-a">In one degree only: the 7th. In the major scale the 7th is a leading tone (a half step below the tonic); in Mixolydian it is lowered, a whole step below the octave. Everything else, including the major 3rd, is the same.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How can I build a Mixolydian scale quickly?</div>
      <div class="tm-faq-a">Build the major scale on that tonic and lower the 7th by a half step. For example, D major is D-E-F♯-G-A-B-C♯-D; D Mixolydian is D-E-F♯-G-A-B-C-D (C natural instead of C♯).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does G Mixolydian have no accidentals?</div>
      <div class="tm-faq-a">Because the Mixolydian mode is built on the 5th degree of the major scale, and G is the 5th degree of C major. G Mixolydian uses the white keys: G-A-B-C-D-E-F-G, with F natural as the lowered 7th.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the Mixolydian scale used for?</div>
      <div class="tm-faq-a">It is basic in blues, rock, jazz and a great deal of folk music. It fits dominant seventh chords (7) and gives a color that is bright and also "unresolved".</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
