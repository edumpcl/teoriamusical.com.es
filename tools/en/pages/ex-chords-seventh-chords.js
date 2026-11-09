const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/chords/seventh-chords/",
  esPath: "/ejercicios/acordes/septimas/",
  title: "Seventh Chord Exercises: Identify and Build 7th Chords",
  description: "Free seventh chord exercises: identify and write dominant, half-diminished and diminished seventh chords in root position and all inversions.",
  h1: "Seventh Chord Exercises",
  crumbs: [['Music Exercises','/ejercicios/'],['Chord exercises','/ejercicios/acordes/']],
  articleClass: "tm-article tm-article--wide",
  scripts: [],
  body: `<p>Quizzes to identify and build seventh chords on the staff.</p>

<p>One step beyond the <a href="/ejercicios/acordes/triadas/">triad</a>: a fourth note is added, one more third above the fifth, and the result is a seventh chord. Here you work on three of the most common types in classical tonal practice: the <strong>dominant seventh</strong>, the <strong>half-diminished</strong> (leading-tone) <strong>seventh</strong> and the <strong>diminished seventh</strong>. With four notes, each chord has <strong>root position and three inversions</strong> (not two, as the triad has).</p>

<style>
.tm-ruta { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 16px 0 24px; }
.tm-ruta a { display: block; background: #fff; border: 1px solid #e8e0cc; border-radius: 12px; padding: 20px; text-decoration: none; color: inherit; transition: border-color .2s, box-shadow .2s; }
.tm-ruta a:hover { border-color: #8b6914; box-shadow: 0 4px 10px rgba(0,0,0,.06); }
.tm-ruta a > div:first-child { font-size: 1.8rem; margin-bottom: 8px; }
.tm-ruta h3 { margin: 0 0 6px; font-size: 1.05rem; color: #1a1a2e; }
.tm-ruta p { margin: 0; color: #666; font-size: .88rem; }
@media (max-width: 600px) { .tm-ruta { grid-template-columns: 1fr; } }
</style>

<h2>Identify</h2>
<p>A chord is written on the staff and you name its type. The exercises are organized by position first, and in the final challenge the four positions appear mixed. The three types are always mixed in the same quiz.</p>
<div class="tm-ruta">

    <a href="/ejercicios/acordes/septimas-en-fundamental/">
      <div>①</div>
      <h3>Root position</h3>
      <p>The chord in its natural position: the root in the bass.</p>
    </a>

    <a href="/ejercicios/acordes/septimas-en-primera-inversion/">
      <div>②</div>
      <h3>First inversion</h3>
      <p>The third of the chord moves to the bass.</p>
    </a>

    <a href="/ejercicios/acordes/septimas-en-segunda-inversion/">
      <div>③</div>
      <h3>Second inversion</h3>
      <p>The fifth of the chord moves to the bass.</p>
    </a>

    <a href="/ejercicios/acordes/septimas-en-tercera-inversion/">
      <div>④</div>
      <h3>Third inversion</h3>
      <p>The seventh of the chord moves to the bass.</p>
    </a>

    <a href="/ejercicios/acordes/septimas-todas-las-posiciones/">
      <div>🏆</div>
      <h3>Final challenge</h3>
      <p>All four positions mixed. The top level.</p>
    </a>

</div>

<h2>Build</h2>
<p>You are given the lowest note of the chord and you write the other three. Each type has its own page, with the four positions linked from inside:</p>
<div class="tm-ruta">

    <a href="/ejercicios/acordes/construir-septima-de-dominante/">
      <div>①</div>
      <h3>Dominant seventh</h3>
      <p>M3 + P5 + m7. The chord that asks to resolve to the tonic.</p>
    </a>

    <a href="/ejercicios/acordes/construir-septima-de-sensible/">
      <div>②</div>
      <h3>Half-diminished seventh</h3>
      <p>The leading-tone seventh: a diminished triad plus a minor 7th.</p>
    </a>

    <a href="/ejercicios/acordes/construir-septima-disminuida/">
      <div>③</div>
      <h3>Diminished seventh</h3>
      <p>Three minor thirds stacked: symmetrical and very useful for modulating.</p>
    </a>

    <a href="/ejercicios/acordes/construir-septimas-mezcladas/">
      <div>🏆</div>
      <h3>Build: final challenge</h3>
      <p>Random type and position, mixing the three types and the four positions.</p>
    </a>

</div>

<h2>Printable worksheets</h2>
<p>You can also practice on paper: every quiz page has a worksheet generator that makes as many sheets as you want, each with different chords and with an answer key. You find them inside each page: <a href="/ejercicios/acordes/septimas-en-fundamental/">identify</a> by position (root position, first, second and third inversion, and all mixed) and <a href="/ejercicios/acordes/construir-septima-de-dominante/">build</a> by type (dominant, half-diminished, diminished and mixed).</p>

<p>If you practice these chords on an instrument, the <a href="/herramientas/metronomo/">online metronome</a> helps you build speed gradually, starting slowly (50-60 BPM).</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a seventh chord?</div>
      <div class="tm-faq-a">It is a triad with a fourth note stacked above it, one more third on top: the seventh. These exercises cover the three types with a classical harmonic function: the dominant seventh (major triad + minor 7th), the half-diminished or leading-tone seventh (diminished triad + minor 7th) and the diminished seventh (diminished triad + diminished 7th).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many inversions does a seventh chord have?</div>
      <div class="tm-faq-a">Three, one more than a triad: with four different notes, any of them can go in the bass. Root position (the root in the bass), first inversion (the third in the bass), second inversion (the fifth in the bass) and third inversion (the seventh in the bass).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between the half-diminished and the diminished seventh chord?</div>
      <div class="tm-faq-a">Both share the same diminished triad (minor 3rd + diminished 5th), but the half-diminished seventh adds a minor 7th and the diminished seventh adds a diminished 7th, one half step lower. That is why the diminished seventh chord is symmetrical (three minor thirds stacked) and the half-diminished one is not.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is the diminished seventh chord useful for modulating?</div>
      <div class="tm-faq-a">Because it is symmetrical: only three different diminished seventh chords exist, and each one can be respelled to function in four different keys. That lets you reinterpret the same chord as the diminished seventh of keys that are far from each other, and move from one to another.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
