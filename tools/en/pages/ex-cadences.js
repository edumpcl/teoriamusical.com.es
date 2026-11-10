const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/cadences/',
  esPath: '/ejercicios/cadencias/',
  title: 'Cadence Quiz: Identify Authentic, Plagal, Deceptive',
  description: 'Identify perfect and imperfect authentic, plagal and deceptive cadences, and phrases ending on V or IV, from two chords on the staff. Worksheets included.',
  h1: 'Which Cadence Is It?',
  crumbs: [['Music Exercises', '/ejercicios/']],
  scripts: ['tm-mei', 'tm-notacion', 'completar-compas-engine', 'tipo-de-comienzo-engine', 'cadencias-engine', 'ficha-cadencias-engine'],
  body: `<p>In this exercise you see the last two chords of a phrase, written as in a piano score (treble and bass clef, four-part writing, in whole notes), and you must say which <strong>cadence</strong> it is. Three levels, with answers checked right away.</p>

<p>Look at the chord each one is built on (tonic, dominant, subdominant or vi?) and, if it is a dominant, whether it has the leading tone and which voice carries the tonic in the final chord.</p>

<div id="tmcd"></div>

<h2>How to recognize each cadence</h2>

<ol>
  <li><strong>Identify the two chords</strong> by their notes: are they the tonic (I), the dominant (V), the subdominant (IV) or the vi chord?</li>
  <li><strong>If the first chord is V</strong> (with the leading tone) <strong>and the second is I</strong>, it is an authentic cadence: <strong>perfect</strong> if the highest voice of the final chord is the tonic, <strong>imperfect</strong> if it is not.</li>
  <li><strong>If the first chord is IV and the second is I</strong>, it is <strong>plagal</strong>. If V resolves to vi instead of the tonic, it is <strong>deceptive</strong> (UK: interrupted). And if the phrase ends on V or on IV without reaching the tonic, it is a <strong>half cadence</strong> (ending on V) or a <strong>phrase ending on IV</strong>. Both leave the phrase open.</li>
</ol>

<p>The complete explanation, with the chords of each cadence in C major, is on the page about <a href="/diccionario-musical/cadencias/">musical cadences</a>.</p>

<h2>Printable worksheets</h2>
<p>The same exercise on paper, for class: <strong>sixteen piano cadences</strong> per A4 sheet, four conclusive, four suspensive and eight mixed. The student ticks the box for the type of cadence. Everything on one side of A4, with a separate <strong>answer sheet</strong>.</p>
<figure class="tm-staff">
  <a href="/assets/img/cadencias/fichas/ficha-cadencias.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/cadencias/fichas/preview-ficha-cadencias.webp"><img src="/assets/img/cadencias/fichas/preview-ficha-cadencias.png" width="300" height="424" loading="lazy" alt="Printable A4 worksheet for recognizing musical cadences"></picture></a>
  <figcaption>A4 sheet with sixteen piano cadences.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/cadencias/fichas/ficha-cadencias.pdf" target="_blank" rel="noopener">Download the worksheet (A4 PDF)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/cadencias/fichas/ficha-cadencias-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>It is designed for working without a computer, as a class exercise, homework or review. You can print and photocopy it freely for the classroom.</p>

<p>Need more than one sheet? Generate <strong>more worksheets</strong> here, each with different cadences, and print them straight from your browser.</p>
<div id="tmcf"></div>

<h2>Before this exercise</h2>

<p>It helps to be comfortable with the <a href="/diccionario-musical/acordes/acordes-triadas/">triads</a> built on the degrees of the scale and to read in treble and bass clef. The full theory of each cadence is on the page about <a href="/diccionario-musical/cadencias/">musical cadences</a>.</p>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (window.tmCadencias) tmCadencias('tmcd');
    if (window.tmFichaCadencias) tmFichaCadencias('tmcf');
  });
</script>
<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you recognize a cadence in a score?</div>
      <div class="tm-faq-a">Look at the chord each of the last two chords is built on (tonic, dominant, subdominant or vi) and, when the first one is the dominant, whether it contains the leading tone and which voice carries the tonic in the final chord.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between a perfect and an imperfect authentic cadence?</div>
      <div class="tm-faq-a">Both are V-I with the leading tone resolving to the tonic. It is perfect when the highest voice of the final chord is also the tonic; if that top voice has the 3rd or the 5th instead of the tonic, it is imperfect.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is the deceptive cadence grouped with the half cadences?</div>
      <div class="tm-faq-a">Because, like them, it does not resolve to the tonic: the dominant goes to the vi chord instead of the tonic and the phrase does not conclude. It is not literally a half cadence (it does not end on V or IV), but it shares with them that it leaves the phrase open.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why are the chords written for piano, with treble and bass clef?</div>
      <div class="tm-faq-a">Because that is how cadences are studied in theory and harmony classes: reduced to four voices (soprano and alto in the treble clef, tenor and bass in the bass clef), as in a chorale. In this exercise they are always in whole notes.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which keys are in the exercise?</div>
      <div class="tm-faq-a">Seven major keys: C, G, D, F, B♭, A and E♭, each with its own key signature.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
