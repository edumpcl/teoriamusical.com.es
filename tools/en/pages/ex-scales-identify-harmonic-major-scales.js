const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/identify-harmonic-major-scales/',
  esPath: '/ejercicios/escalas/escalas-mayores-mixta-principal/',
  title: "Harmonic Major Scale Quiz: Identify It on the Staff",
  description: "Practice recognizing the 15 harmonic major scales on the staff: a major scale with a lowered 6th and an augmented second. Free interactive quiz.",
  h1: "Identify Harmonic Major Scales",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-mayores-mixta-engine'],
  body: `<p>The staff shows the 8 notes of a harmonic major scale, and your task is to recognize which one it is. On <strong>easy</strong> you choose from 4 options; on <strong>hard</strong> you first pick the root note and then its accidental.</p>

<div id="tmesc_mixta_p"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEscMixtasMayores("tmesc_mixta_p", "principal");
  });
</script>

<p><strong>Tip:</strong> First find the tonic, then look for the scale degrees that do not fit the plain major scale. In the harmonic major scale the 6th degree is lowered by a half step, which creates an augmented second between the 6th and the 7th note.</p>

<h2>What is the harmonic major scale?</h2>
<p>The <strong>harmonic major scale</strong> is a major scale with the <strong>6th degree lowered by a half step</strong> (UK: semitone). In Spanish-language theory it is called the <em>escala mayor mixta principal</em>. The pattern of whole steps (W, UK: tones), half steps (H) and one augmented second (A2) is <strong>W-W-H-W-H-A2-H</strong>.</p>
<p>The characteristic interval is the <strong>augmented second</strong> between the lowered 6th and the natural 7th. It spans three half steps, the same size as a minor third, but it is written between two neighboring letter names. This leap gives the scale its sound, halfway between major and minor.</p>

<h3>Example: C harmonic major</h3>
<p>Start from C major (C-D-E-F-G-A-B-C) and lower the 6th note by a half step (A becomes A♭): <strong>C-D-E-F-G-A♭-B-C</strong>. The leap from A♭ to B is an augmented second.</p>

<h3>The 15 harmonic major scales</h3>
<p>As with the plain major scales, there are 15 harmonic major scales, one for each major key. In keys with sharps, lowering the 6th degree can produce a natural (A♯ becomes A♮ in C♯ major, for example). In D♭, G♭ and C♭ major the 6th is already flat, so the lowered note is a double flat: B𝄫, E𝄫 and A𝄫.</p>

<p>To lock these scales into your fingers, practice them with the <a href="/herramientas/metronomo/">online metronome</a> at 60-70% of your target tempo, raising it by 5 BPM each time you play three repetitions without mistakes. The <a href="/herramientas/afinador/">online tuner</a> lets you check your tuning before you start.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the harmonic major scale?</div>
      <div class="tm-faq-a">It is the major scale with the 6th degree lowered by a half step. The change creates a characteristic augmented second (3 half steps) between the 6th and the 7th degree. The scale keeps the major 3rd, so it still sounds major, with a darker color near the top.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the interval pattern of the harmonic major scale?</div>
      <div class="tm-faq-a">W-W-H-W-H-A2-H, where A2 is an augmented second (3 half steps). Compared with the major scale (W-W-H-W-W-W-H), only the 6th degree changes: the step from the 5th to the 6th becomes a half step, and the step from the 6th to the 7th becomes an augmented second.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you identify a harmonic major scale on the staff?</div>
      <div class="tm-faq-a">Look for the augmented second: a leap of 3 half steps between two notes with neighboring letter names. It always sits between the 6th and the 7th degree. If the 3rd is major and the rest of the pattern matches the major scale, it is a harmonic major scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">In which keys is it practiced?</div>
      <div class="tm-faq-a">In the same 15 keys as the major scale. The 6th degree is lowered in every key: in C harmonic major the 6th (A) becomes A♭, and in G harmonic major the 6th (E) becomes E♭.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is it different from the harmonic minor scale?</div>
      <div class="tm-faq-a">Both have an augmented second between the 6th and the 7th degree. The harmonic major scale has a major 3rd; the harmonic minor scale has a minor 3rd. Check the 3rd to tell them apart.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
