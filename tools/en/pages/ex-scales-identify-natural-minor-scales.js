const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/identify-natural-minor-scales/',
  esPath: '/ejercicios/escalas/escalas-menores-natural/',
  title: "Natural Minor Scale Quiz: Identify It on the Staff",
  description: "Practice recognizing the 15 natural minor scales on the staff. Interactive quiz with easy and hard modes. Free, no sign-up.",
  h1: "Identify Natural Minor Scales",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-menores-engine'],
  body: `<p>The staff shows the 8 notes of a natural minor scale, and your task is to recognize which one it is. On <strong>easy</strong> you choose from 4 options; on <strong>hard</strong> you first pick the root note and then its accidental.</p>

<div id="tmesc_menor_n"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEscMenores("tmesc_menor_n", "natural");
  });
</script>

<p><strong>Tip:</strong> The natural minor scale has exactly the same notes as its relative major. Find the tonic (the lowest note, where the scale starts) and check the pattern of whole steps and half steps: W-H-W-W-H-W-W.</p>

<h2>What is the natural minor scale?</h2>
<p>The <strong>natural minor scale</strong> (also called the Aeolian mode) has 8 notes and the pattern <strong>W-H-W-W-H-W-W</strong> (whole step, half step, whole step, whole step, half step, whole step, whole step; UK: tone and semitone). It is the basic form of the minor scale and the starting point for the harmonic and melodic forms.</p>
<p>Its key signature is the same as the one of its <strong>relative major</strong>, whose tonic is a minor third above the minor tonic. A natural minor and C major, for example, use exactly the same notes and no accidentals.</p>

<h3>Example: A natural minor</h3>
<p>A natural minor: <strong>A-B-C-D-E-F-G-A</strong>. It has no accidentals and uses the white keys of the piano from one A to the next. Its relative major is C major.</p>

<h3>The 15 natural minor scales</h3>
<p>As with the major scales, there are 15 natural minor scales, one for each key. Each shares its key signature with the relative major: A minor with C major (no accidentals), E minor with G major (1♯), B minor with D major (2♯), and so on up to seven accidentals. On the flat side: D minor (1♭), G minor (2♭), C minor (3♭).</p>

<p>To lock these scales into your fingers, practice them with the <a href="/herramientas/metronomo/">online metronome</a> at 60-70% of your target tempo, raising it by 5 BPM each time you play three repetitions without mistakes. The <a href="/herramientas/afinador/">online tuner</a> lets you check your tuning before you start.</p>

<!-- ficha-escala-tipo -->
<h2>Printable worksheet (PDF)</h2>
<p>The same exercise on paper, for class: eight natural minor scales written on one side of an A4 sheet, half with a key signature and half with the accidentals before each note. The name of each scale is written below it. With a separate <strong>answer sheet</strong>, with the answers in red.</p>
<p>It goes from easier to harder: first key signatures with few accidentals in treble clef, then more accidentals and the bass clef.</p>
<figure class="tm-staff">
  <a href="/assets/img/escalas/fichas/ficha-identificar-escalas-menor-natural.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/escalas/fichas/preview-ficha-identificar-escalas-menor-natural.webp"><img src="/assets/img/escalas/fichas/preview-ficha-identificar-escalas-menor-natural.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet for identifying natural minor scales"></picture></a>
  <figcaption>A4 sheet for identifying natural minor scales.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/escalas/fichas/ficha-identificar-escalas-menor-natural.pdf" target="_blank" rel="noopener">Download the worksheet (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/escalas/fichas/ficha-identificar-escalas-menor-natural-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>You may print and photocopy the worksheets freely for the classroom. There are also worksheets of this same type for <a href="/ejercicios/escalas/construir-escala-menor-natural/">writing</a> and <a href="/ejercicios/escalas/construir-escala-menor-natural-con-armadura/">writing with a key signature</a>, and in the <a href="/ejercicios/escalas/#fichas">scales index</a> you can create custom worksheets, mixing whichever types you like.</p>
<!-- /ficha-escala-tipo -->

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the natural minor scale?</div>
      <div class="tm-faq-a">It is the minor scale that uses the key signature of its relative major, starting from the 6th degree of that major scale. Its pattern is W-H-W-W-H-W-W. A natural minor, the relative of C major, has the notes A-B-C-D-E-F-G-A.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the pattern of the natural minor scale?</div>
      <div class="tm-faq-a">W-H-W-W-H-W-W. Compared with the major scale (W-W-H-W-W-W-H), the half steps fall in different places: between the 2nd and 3rd degrees and between the 5th and 6th, instead of between the 3rd and 4th and between the 7th and 8th.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you identify a natural minor scale?</div>
      <div class="tm-faq-a">Read the key signature to know which notes are altered, then find the tonic (the first and last note). Check that the pattern W-H-W-W-H-W-W holds. The clearest sign is the half step between the 2nd and the 3rd degree, which gives the minor 3rd.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many natural minor scales are practiced?</div>
      <div class="tm-faq-a">15, one for each key signature. They use the same key signatures as their relative majors: A minor (none), E minor (1♯), B minor (2♯), and so on; D minor (1♭), G minor (2♭), C minor (3♭), and so on.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between the natural, harmonic and melodic minor scales?</div>
      <div class="tm-faq-a">The natural minor scale is the basic form, with no extra accidentals. The harmonic minor scale raises the 7th degree by a half step to create a leading tone, which leaves an augmented second between the 6th and the 7th. The melodic minor scale raises the 6th degree too, in its ascending form, to remove that augmented second.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
