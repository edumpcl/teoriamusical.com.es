const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/identify-melodic-major-scales/',
  esPath: '/ejercicios/escalas/escalas-mayores-mixta-secundaria/',
  title: "Melodic Major Scale Quiz: Identify It on the Staff",
  description: "Practice recognizing the 15 melodic major scales on the staff: a major scale with a lowered 6th and 7th. Free interactive quiz, easy and hard modes.",
  h1: "Identify Melodic Major Scales",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-mayores-mixta-engine'],
  body: `<p>The staff shows the 8 notes of a melodic major scale, and your task is to recognize which one it is. On <strong>easy</strong> you choose from 4 options; on <strong>hard</strong> you first pick the root note and then its accidental.</p>

<div id="tmesc_mixta_s"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEscMixtasMayores("tmesc_mixta_s", "secundaria");
  });
</script>

<p><strong>Tip:</strong> Find the tonic, then check the 6th and 7th degrees: both are lowered by a half step compared with the plain major scale, while the 3rd stays major. If only the 6th is lowered, it is a harmonic major scale; if the 7th is lowered too, it is a melodic major scale.</p>

<h2>What is the melodic major scale?</h2>
<p>The <strong>melodic major scale</strong> is a major scale in which <strong>both the 6th and the 7th degree are lowered by a half step</strong>. In Spanish-language theory it is called the <em>escala mayor mixta secundaria</em>. The pattern of whole steps (UK: tones) and half steps (UK: semitones) is <strong>W-W-H-W-H-W-W</strong>.</p>
<p>Unlike the harmonic major scale, the melodic major scale has <strong>no augmented second</strong>: every step is a whole step or a half step. Its upper half is the same as the descending natural minor scale.</p>

<h3>Example: C melodic major</h3>
<p>Start from C major (C-D-E-F-G-A-B-C) and lower the 6th and the 7th by a half step (A becomes A♭, B becomes B♭): <strong>C-D-E-F-G-A♭-B♭-C</strong>. This is the same set of notes as the Mixolydian scale with a lowered 6th.</p>

<h3>How it differs from the harmonic major scale</h3>
<p>The <strong>harmonic major scale</strong> lowers only the 6th, which leaves an augmented second between the 6th and the natural 7th. The <strong>melodic major scale</strong> lowers the 7th too, which removes that augmented second and gives a smoother line.</p>

<h3>The 15 melodic major scales</h3>
<p>There are 15 melodic major scales, one for each major key. Each one uses the key signature of the matching major key, with the lowered 6th and 7th written as accidentals on the notes.</p>

<p>To lock these scales into your fingers, practice them with the <a href="/herramientas/metronomo/">online metronome</a> at 60-70% of your target tempo, raising it by 5 BPM each time you play three repetitions without mistakes. The <a href="/herramientas/afinador/">online tuner</a> lets you check your tuning before you start.</p>

<!-- ficha-escala-tipo -->
<h2>Printable worksheet (PDF)</h2>
<p>The same exercise on paper, for class: eight melodic major scales written on one side of an A4 sheet, half with a key signature and half with the accidentals before each note. The name of each scale is written below it. With a separate <strong>answer sheet</strong>, with the answers in red.</p>
<p>It goes from easier to harder: first key signatures with few accidentals in treble clef, then more accidentals and the bass clef.</p>
<figure class="tm-staff">
  <a href="/assets/img/escalas/fichas/ficha-identificar-escalas-mixta-secundaria.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/escalas/fichas/preview-ficha-identificar-escalas-mixta-secundaria.webp"><img src="/assets/img/escalas/fichas/preview-ficha-identificar-escalas-mixta-secundaria.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet for identifying melodic major scales"></picture></a>
  <figcaption>A4 sheet for identifying melodic major scales.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/escalas/fichas/ficha-identificar-escalas-mixta-secundaria.pdf" target="_blank" rel="noopener">Download the worksheet (PDF A4)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/escalas/fichas/ficha-identificar-escalas-mixta-secundaria-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>You may print and photocopy the worksheets freely for the classroom. There are also worksheets of this same type for <a href="/ejercicios/escalas/construir-escala-mayor-mixta-secundaria/">writing</a> and <a href="/ejercicios/escalas/construir-escala-mayor-mixta-secundaria-con-armadura/">writing with a key signature</a>, and in the <a href="/ejercicios/escalas/#fichas">scales index</a> you can create custom worksheets, mixing whichever types you like.</p>
<!-- /ficha-escala-tipo -->

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the melodic major scale?</div>
      <div class="tm-faq-a">It is the major scale with the 6th and 7th degrees lowered by a half step. Lowering both degrees removes the augmented second of the harmonic major scale, so the scale moves entirely by whole steps and half steps.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the interval pattern of the melodic major scale?</div>
      <div class="tm-faq-a">W-W-H-W-H-W-W. Compared with the major scale (W-W-H-W-W-W-H), the 6th degree is a half step lower (the step from the 5th to the 6th becomes a half step) and so is the 7th (the step from the 7th to the octave becomes a whole step).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How does it differ from the harmonic major scale?</div>
      <div class="tm-faq-a">Both have the 6th degree lowered. The difference is the 7th: in the harmonic major scale it stays natural, which creates the augmented second. In the melodic major scale it is lowered too, so the augmented second disappears.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you identify a melodic major scale on the staff?</div>
      <div class="tm-faq-a">Check the 3rd first: it is major, so the scale is not a minor scale. Then look for lowered 6th and 7th degrees. The last three steps of the scale are H-W-W, ending with a whole step into the tonic instead of a half step.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why are these scales called mixed scales in Spanish?</div>
      <div class="tm-faq-a">In Spanish-language conservatories, the harmonic and melodic major scales are called "mixed" major scales because a major scale borrows its lowered 6th (and 7th) from the minor mode. In English they are usually called harmonic major and melodic major.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
