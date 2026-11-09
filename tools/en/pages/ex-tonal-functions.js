const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/tonal-functions/',
  esPath: '/ejercicios/funciones-tonales/',
  title: 'Harmonic Function Quiz: Tonic, Subdominant, Dominant',
  description: 'Identify whether a chord is tonic, subdominant or dominant in a major key, written on the staff. Includes ii, vi, vii°, inversions and V7. Free quiz.',
  h1: 'What Harmonic Function Does This Chord Have?',
  crumbs: [['Music Exercises', '/ejercicios/']],
  scripts: ['tm-mei', 'tm-notacion', 'funciones-tonales-engine'],
  body: `<p>In this exercise you see <strong>one chord</strong> written in a major key, with its key signature, and you must say which <strong>harmonic function</strong> it has: <strong>tonic</strong>, <strong>subdominant</strong> or <strong>dominant</strong>. Three levels, instant feedback and an explanation of each chord.</p>

<p>A tip to start: look in the chord for the <strong>leading tone</strong> (the note a half step below the tonic; UK: leading note). If the chord has it, it is a dominant.</p>

<div id="tmft"></div>

<h2>How to recognize the function of a chord</h2>

<p>For the chords in this exercise you can recognize the function with a practical three-step rule: look first for the leading tone and, if it is not there, check whether the 4th degree of the scale is present. This is a simplification designed for these chords in a major key, not a method for every chord in tonal harmony.</p>

<ol>
  <li><strong>Does it have the leading tone</strong> (the 7th degree of the scale)? Then it is a <strong>dominant</strong>. This is the case for V, V7 and vii°.</li>
  <li><strong>If not, does it have the 4th degree?</strong> Then it is a <strong>subdominant</strong>: IV (4-6-1) and ii (2-4-6).</li>
  <li><strong>If it has neither</strong>, it is a <strong>tonic</strong>: I (1-3-5) and its substitute vi (6-1-3).</li>
</ol>

<p>For example, in C major the leading tone is <em>B</em> and the 4th degree is <em>F</em>: G–B–D has the B (dominant); D–F–A has the F and not the B (subdominant); A–C–E has neither (tonic).</p>

<h3>Inversions do not change the function</h3>

<p>An inverted chord keeps the same function: it depends on the scale degree the chord is built on, not on the note in the bass. At level 3 you will see triads in root position, first inversion and second inversion, and the V7 in root position, first inversion and second inversion.</p>

<h3>Why does the iii chord not appear?</h3>

<p>Because, depending on the context, the iii chord acts as a tonic or as a dominant. An exercise with two possible answers would not be fair, so it is not asked. The full theory is on the page about <a href="/diccionario-musical/funciones-tonales/">harmonic functions</a>.</p>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (window.tmFuncionesTonales) tmFuncionesTonales('tmft');
  });
</script>

<h2>Before this exercise</h2>

<p>It helps to know the <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">degrees of the scale</a> and how to build <a href="/diccionario-musical/acordes/acordes-triadas/">triads</a>. After this exercise, practice with the <a href="/ejercicios/cadencias/">cadence exercises</a>, which combine these functions two at a time.</p>
<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you know if a chord is tonic, subdominant or dominant?</div>
      <div class="tm-faq-a">Look at its notes in the key: if it has the leading tone (7th degree) it is a dominant; if it does not but has the 4th degree it is a subdominant; and if it has neither it is a tonic.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which chords have a tonic function?</div>
      <div class="tm-faq-a">The chord on the 1st degree and, as a substitute, the chord on the 6th degree (vi), which shares two notes with the tonic. The iii chord can act as a tonic or as a dominant depending on the context, so it is not asked.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which chords have a dominant function?</div>
      <div class="tm-faq-a">The chord on the 5th degree (also with a seventh, V7) and the chord on the 7th degree (vii°), which has the leading tone and the tritone and asks to resolve to the tonic.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does the function change if the chord is inverted?</div>
      <div class="tm-faq-a">No. The function depends on the scale degree the chord is built on, not on the note in the bass. V in first inversion is still a dominant.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which keys are practiced?</div>
      <div class="tm-faq-a">Seven major keys: C, G, D, F, B♭, A and E♭, each with its own key signature. Level 1 uses only the first four.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
