const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/identify-harmonic-minor-scales/',
  esPath: '/ejercicios/escalas/escalas-menores-armonica/',
  title: "Harmonic Minor Scale Quiz: Identify It on the Staff",
  description: "Practice recognizing the 15 harmonic minor scales on the staff: the natural minor with a raised 7th. Free interactive quiz, easy and hard modes.",
  h1: "Identify Harmonic Minor Scales",
  crumbs: [['Music Exercises', '/ejercicios/'], ['Scale exercises', '/ejercicios/escalas/']],
  scripts: ['tm-mei', 'tm-notacion', 'escalas-menores-engine'],
  body: `<p>The staff shows the 8 notes of a harmonic minor scale, and your task is to recognize which one it is. On <strong>easy</strong> you choose from 4 options; on <strong>hard</strong> you first pick the root note and then its accidental.</p>

<div id="tmesc_menor_a"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmEscMenores("tmesc_menor_a", "armónica");
  });
</script>

<p><strong>Tip:</strong> The feature that defines the harmonic minor scale is the <strong>augmented second</strong> between the 6th and the 7th degree. This leap of three half steps comes just before the last note and is wider than the steps around it.</p>

<h2>What is the harmonic minor scale?</h2>
<p>The <strong>harmonic minor scale</strong> is the natural minor scale with the <strong>7th degree raised by a half step</strong> (UK: semitone). The pattern is <strong>W-H-W-W-H-A2-H</strong> (whole step, half step, whole, whole, half, augmented second, half step).</p>
<p>Its characteristic interval is the <strong>augmented second</strong> between the unaltered 6th degree and the raised 7th. The raised 7th is a leading tone that resolves naturally to the tonic, which makes this scale essential for tonal harmony in minor keys.</p>

<h3>Example: A harmonic minor</h3>
<p>Start from A natural minor (A-B-C-D-E-F-G-A) and raise the 7th degree (G becomes G♯): <strong>A-B-C-D-E-F-G♯-A</strong>. The leap from F to G♯ is an augmented second.</p>

<h3>The 15 harmonic minor scales</h3>
<p>There are 15 harmonic minor scales, one for each key. Each uses the key signature of the natural minor, with the raised 7th written directly on the note. In some sharp keys the raised 7th is a double sharp: in G♯ minor it is F𝄪, in D♯ minor it is C𝄪 and in A♯ minor it is G𝄪. In flat keys the raised 7th is often a natural, as in C minor, where B♭ becomes B♮.</p>

<p>To lock these scales into your fingers, practice them with the <a href="/herramientas/metronomo/">online metronome</a> at 60-70% of your target tempo, raising it by 5 BPM each time you play three repetitions without mistakes. The <a href="/herramientas/afinador/">online tuner</a> lets you check your tuning before you start.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the harmonic minor scale?</div>
      <div class="tm-faq-a">It is the form of the minor scale that raises the 7th degree by a half step compared with the natural minor. The raised 7th is the leading tone, which pulls toward the tonic and is needed for dominant chords. The price is an augmented second (3 half steps) between the 6th and the 7th degree.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the pattern of the harmonic minor scale?</div>
      <div class="tm-faq-a">W-H-W-W-H-A2-H, where A2 is an augmented second (3 half steps). The change from the natural minor is in the 7th degree: it goes up a half step, so the step from the 7th to the octave becomes a half step, and the step from the 6th to the 7th becomes an augmented second.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is it called "harmonic"?</div>
      <div class="tm-faq-a">Because its notes supply the chords that work best in a minor key. The raised 7th makes it possible to build a major dominant chord (or a dominant seventh chord) on the 5th degree, which resolves strongly to the minor tonic.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you see an augmented second on the staff?</div>
      <div class="tm-faq-a">An augmented second spans two neighboring letter names, like any second, but it covers 3 half steps instead of 2 (major second) or 1 (minor second). In the harmonic minor scale one of the notes usually carries an accidental, a sharp or a natural, that raises the 7th degree.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you build any harmonic minor scale from the natural minor?</div>
      <div class="tm-faq-a">Raise the 7th degree by a half step. For example, A natural minor is A-B-C-D-E-F-G; A harmonic minor is A-B-C-D-E-F-G♯. The rule is the same in every key, however many accidentals the key signature has.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
