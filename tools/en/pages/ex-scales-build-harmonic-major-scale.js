const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/build-harmonic-major-scale/',
  esPath: '/ejercicios/escalas/construir-escala-mayor-mixta-principal/',
  title: "Build Harmonic Major Scales on the Staff: Exercise",
  description: "Build harmonic major scales on the staff: the major scale with a lowered 6th and its augmented second. Free interactive exercise.",
  h1: "Build the Harmonic Major Scale",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-construir-data', 'escalas-construir-engine'],
  body: `<p>The name of a <strong>harmonic major scale</strong> appears (in Spanish-language theory, the <em>escala mayor mixta principal</em>). Your task is to draw its <strong>8 notes</strong> on the staff. It is the major scale with the <strong>6th lowered</strong> by a half step (♭6), which creates an <strong>augmented second</strong> between the 6th and the 7th degree.</p>

<div id="tmec_mixp"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEsConstrEngine("tmec_mixp", { scales: TM_CONSTRUIR_SCALES["mixta-principal"], titulo: "la Escala Mayor Mixta Principal" });
  });
</script>

<p><strong>How to use the exercise:</strong> Click (or drag) on the staff to place each note. First choose the accidental with the ♭ ♮ ♯ buttons if the note needs one. <em>Undo</em> removes the last note and <em>Clear</em> restarts the exercise. The notes are sorted automatically from low to high. The magnifier shows the note you are about to place.</p>

<h2>The pattern of the harmonic major scale</h2>
<p>The pattern is <strong>W – W – H – W – H – A2 – H</strong> (whole step, UK: tone; half step, UK: semitone; A2 = augmented second). Lowering the 6th turns the leap from the 6th to the 7th degree into an <strong>augmented second</strong> (three half steps), the sound that sets this scale apart.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Degree</th><th>Step</th><th>C major</th><th>G major</th><th>F major</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>1st</strong></td><td>&mdash;</td><td>C</td><td>G</td><td>F</td></tr>
    <tr><td><strong>2nd</strong></td><td>W</td><td>D</td><td>A</td><td>G</td></tr>
    <tr><td><strong>3rd</strong></td><td>W</td><td>E</td><td>B</td><td>A</td></tr>
    <tr><td><strong>4th</strong></td><td>H</td><td>F</td><td>C</td><td>B♭</td></tr>
    <tr><td><strong>5th</strong></td><td>W</td><td>G</td><td>D</td><td>C</td></tr>
    <tr><td><strong>6th</strong></td><td>H</td><td>A♭</td><td>E♭</td><td>D♭</td></tr>
    <tr><td><strong>7th</strong></td><td>A2</td><td>B</td><td>F♯</td><td>E</td></tr>
    <tr><td><strong>8th</strong></td><td>H</td><td>C</td><td>G</td><td>F</td></tr>
  </tbody>
</table>
</div>
<h2>The augmented second, its signature interval</h2>
<p>Unlike the plain major scale, the 3rd stays major but the 6th goes down. That leaves a distance of three half steps between the 6th and the 7th degree (the <strong>augmented second</strong>), just as in the harmonic minor scale between its 6th and 7th degrees. Write the 6th degree with a flat (or a natural) without changing the letter name of the note.</p>

<p>To lock these scales into your fingers, practice them with the <a href="/herramientas/metronomo/">online metronome</a> at 60-70% of your target tempo, raising it by 5 BPM each time you play three repetitions without mistakes. The <a href="/herramientas/afinador/">online tuner</a> lets you check your tuning before you start. The <a href="/diccionario-musical/tonalidades/">dictionary of keys and scales</a> has the full theory.</p>

<!-- ficha-escala-tipo -->
<h2>Printable worksheet (PDF)</h2>
<p>The same exercise on paper, for class: eight harmonic major scales to write without a key signature, with each accidental before its note. With a separate <strong>answer sheet</strong>, with the answers in red.</p>
<p>It goes from easier to harder: first key signatures with few accidentals in treble clef, then more accidentals and the bass clef.</p>
<figure class="tm-staff">
  <a href="/assets/img/escalas/fichas/ficha-escribir-escalas-mixta-principal.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/escalas/fichas/preview-ficha-escribir-escalas-mixta-principal.webp"><img src="/assets/img/escalas/fichas/preview-ficha-escribir-escalas-mixta-principal.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet for writing harmonic major scales"></picture></a>
  <figcaption>A4 sheet for writing harmonic major scales.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/escalas/fichas/ficha-escribir-escalas-mixta-principal.pdf" target="_blank" rel="noopener">Download the worksheet (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/escalas/fichas/ficha-escribir-escalas-mixta-principal-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>You may print and photocopy the worksheets freely for the classroom. There are also worksheets of this same type for <a href="/ejercicios/escalas/escalas-mayores-mixta-principal/">identifying</a> and <a href="/ejercicios/escalas/construir-escala-mayor-mixta-principal-con-armadura/">writing with a key signature</a>, and in the <a href="/ejercicios/escalas/#fichas">scales index</a> you can create custom worksheets, mixing whichever types you like.</p>
<!-- /ficha-escala-tipo -->

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the harmonic major scale?</div>
      <div class="tm-faq-a">It is a variant of the major scale in which the 6th is lowered by a half step (♭6). Its pattern is W-W-H-W-H-A2-H. It keeps the major 3rd but has an augmented second between the 6th and the 7th degree.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is it different from the major scale?</div>
      <div class="tm-faq-a">Only in the 6th, which is lowered. That changes the middle of the scale and creates the characteristic augmented second between the 6th and 7th degrees.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the augmented second in this scale?</div>
      <div class="tm-faq-a">It is the leap of three half steps between the 6th degree (lowered) and the 7th degree (unaltered). It is written between two notes with neighboring letter names, for example A♭ and B in C harmonic major.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Can it be confused with the harmonic minor scale?</div>
      <div class="tm-faq-a">They share the augmented second, but the harmonic major scale has a major 3rd (it is a major scale) and the harmonic minor scale has a minor 3rd. The context and the 3rd tell them apart.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I build it step by step?</div>
      <div class="tm-faq-a">Write the major scale on the tonic and lower only the 6th degree by a half step, keeping the letter name of that note. All the other degrees stay as in the major scale.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
