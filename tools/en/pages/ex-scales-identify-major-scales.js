const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/identify-major-scales/',
  esPath: '/ejercicios/escalas/escalas-mayores/',
  title: 'Identify Major Scales: Interactive Exercise on the Staff',
  description: 'Practice recognizing the 15 major scales on the staff, with a key signature or with written accidentals. Free quiz with two difficulty levels.',
  h1: 'Identify Major Scales',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-mayores-engine'],
  body: `<p>The staff shows the 8 notes of a major scale, and your task is to recognize which one it is. Scales appear in two ways: <strong>with a key signature</strong> at the start of the staff, or <strong>with the accidentals written note by note</strong>, so you practice both ways of reading. On <strong>easy</strong> you choose from 4 options; on <strong>hard</strong> you first pick the root note and then its accidental.</p>

<div id="tmesc_mayores"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEscMayores("tmesc_mayores");
  });
</script>

<p><strong>Tip:</strong> The key is the tonic (the first and last notes) and the accidentals. With a key signature, counting the sharps or flats tells you the key through the <a href="/diccionario-musical/tonalidades/circulo-de-quintas/">circle of fifths</a>. With loose accidentals, just spot the altered scale degrees directly.</p>

<h2>The 15 major scales</h2>
<p>In Western music there are <strong>15 major scales</strong>: 7 with sharps, 7 with flats, and C major (no accidentals). They all follow the same pattern of whole steps (UK: tones) and half steps (UK: semitones): <strong>W-W-H-W-W-W-H</strong> (whole, whole, half, whole, whole, whole, half).</p>

<h3>Scales with sharps (♯)</h3>
<p>They are built by moving up the <strong>circle of fifths</strong>: G major (1♯), D major (2♯), A major (3♯), E major (4♯), B major (5♯), F♯ major (6♯) and C♯ major (7♯). Each new key adds one sharp to the previous one.</p>

<h3>Scales with flats (♭)</h3>
<p>They are built by moving down in fifths: F major (1♭), B♭ major (2♭), E♭ major (3♭), A♭ major (4♭), D♭ major (5♭), G♭ major (6♭) and C♭ major (7♭). Each key adds one flat to the key signature.</p>

<h3>How to read a scale on the staff</h3>
<p>When the scale appears <strong>with a key signature</strong>, the accidentals are written once at the start of the staff and apply to every note of that letter throughout the piece. When it appears <strong>with loose accidentals</strong>, each altered note carries its own symbol in front of it. Both spellings are equally valid, and reading them fluently is essential.</p>

<p>To lock these scales into your fingers, practice them with the <a href="/herramientas/metronomo/">online metronome</a> at 60-70% of your target tempo, raising it by 5 BPM each time you play three repetitions without mistakes. The <a href="/herramientas/afinador/">online tuner</a> lets you check your tuning before you start.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you identify a natural major scale on the staff?</div>
      <div class="tm-faq-a">Check the key signature to find the tonic, then verify the interval pattern W-W-H-W-W-W-H (whole, whole, half, whole, whole, whole, half). If every interval fits that pattern, it is a natural major scale. There should be no augmented second between consecutive scale degrees.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many natural major scales are practiced?</div>
      <div class="tm-faq-a">Students work on 15 natural major scales: C (no accidentals), 7 with sharps (G, D, A, E, B, F♯, C♯) and 7 with flats (F, B♭, E♭, A♭, D♭, G♭, C♭). There are 15 rather than 12 because the enharmonic scales (C♯/D♭, F♯/G♭, B/C♭) are written both ways.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you build a natural major scale?</div>
      <div class="tm-faq-a">Apply the pattern W-W-H-W-W-W-H starting from the tonic. A whole step is 2 half steps; a half step is 1. For example, D major: D (W) E (W) F♯ (H) G (W) A (W) B (W) C♯ (H) D. The result is always 7 different notes with a single pattern of whole steps and half steps.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How does the natural major scale differ from the mixed major scales?</div>
      <div class="tm-faq-a">The natural major has the pure pattern W-W-H-W-W-W-H. The mixed major scales are variants of the major that lower one or two degrees: the harmonic major lowers the 6th degree, which creates an augmented second between the 6th and the 7th. The melodic major lowers the 6th and the 7th, which removes that augmented second.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are scales with a key signature and scales with loose accidentals?</div>
      <div class="tm-faq-a">In the exercises, scales appear in two ways: with a key signature (the accidentals are written at the start next to the clef, as in real scores) and with loose accidentals (each altered note has its own sharp or flat). Practicing both is essential because you meet both in printed music.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
