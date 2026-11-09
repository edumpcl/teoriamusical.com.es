const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/identify-all-scales/',
  esPath: '/ejercicios/escalas/todas-las-escalas/',
  title: "All Scales Quiz: Identify 90 Major and Minor Scales",
  description: "Identify any of 90 scales on the staff: 6 scale types in 15 keys. Name the root, major or minor, and the scale type. Free interactive quiz.",
  h1: "Identify All Scales",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-todas-engine'],
  body: `<p>A scale appears on the staff, taken from the <strong>90 possible scales</strong> (6 types in 15 keys). On <strong>easy</strong> you choose from 4 full names. On <strong>hard</strong> you answer in three steps: first the <strong>root note</strong> with its accidental, then <strong>major or minor</strong>, and finally the <strong>scale type</strong> among the six available.</p>

<div id="tmesc_todas"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEscTodas("tmesc_todas");
  });
</script>

<p><strong>Tip:</strong> Find the lowest note on the staff first: it is the tonic. Then look at the 3rd degree: a major 3rd means a major-type scale, a minor 3rd means a minor-type scale. Finally check the 6th and 7th degrees, because those are the degrees that separate the three forms of each type.</p>

<h2>The six scale types</h2>
<p>This exercise gathers the <strong>90 scales</strong> that are practiced separately in the other exercises of this section. Each scale belongs to one of six types.</p>

<h3>Major-type scales (major 3rd)</h3>
<ul>
  <li><strong>Major</strong>: pattern W-W-H-W-W-W-H (W = whole step, H = half step; UK: tone and semitone). The standard major scale, with no accidentals beyond the key signature.</li>
  <li><strong>Harmonic major</strong>: like the major scale but with the 6th degree lowered by a half step. It creates an augmented second between the 6th and the 7th.</li>
  <li><strong>Melodic major</strong>: 6th and 7th degrees lowered by a half step. No augmented second; it moves more smoothly than the harmonic major.</li>
</ul>
<h3>Minor-type scales (minor 3rd)</h3>
<ul>
  <li><strong>Natural minor</strong>: pattern W-H-W-W-H-W-W. It shares its key signature with its relative major.</li>
  <li><strong>Harmonic minor</strong>: 7th degree raised by a half step. The augmented second between the 6th and the 7th gives it its sound.</li>
  <li><strong>Melodic minor</strong>: 6th and 7th degrees raised in the ascending form, which removes the augmented second and gives a more vocal line.</li>
</ul>

<p>To lock these scales into your fingers, practice them with the <a href="/herramientas/metronomo/">online metronome</a> at 60-70% of your target tempo, raising it by 5 BPM each time you play three repetitions without mistakes. The <a href="/herramientas/afinador/">online tuner</a> lets you check your tuning before you start.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many different scales are in the all-scales exercise?</div>
      <div class="tm-faq-a">The exercise mixes 90 scales: 15 major, 15 harmonic major, 15 melodic major, 15 natural minor, 15 harmonic minor and 15 melodic minor. All 90 appear at random for full identification training.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How can I quickly tell whether a scale is major or minor?</div>
      <div class="tm-faq-a">Look at the 3rd degree. If the step from the 2nd to the 3rd degree is a half step, the scale is minor. If it is a whole step, the scale is major. That one interval gives the scale its major or minor character.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I tell the major-type scales apart?</div>
      <div class="tm-faq-a">If there is an augmented second (3 half steps) between the 6th and the 7th, it is a harmonic major scale. If both the 6th and the 7th are lowered and there is no augmented second, it is a melodic major scale. If the pattern is exactly W-W-H-W-W-W-H, it is a plain major scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I tell the minor-type scales apart?</div>
      <div class="tm-faq-a">If there is an augmented second between the 6th and the 7th, it is a harmonic minor scale. If the 6th and 7th are both raised (like those of the parallel major scale), it is an ascending melodic minor scale. If there are no accidentals beyond the key signature, it is a natural minor scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">In what order should I study the 90 scales?</div>
      <div class="tm-faq-a">Master each type on its own before mixing them: 1) major, 2) natural minor, 3) harmonic major, 4) harmonic minor, 5) melodic major, 6) melodic minor. When each group feels secure, the mixed exercise is the final challenge.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
