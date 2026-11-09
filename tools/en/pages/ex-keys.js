const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/keys/',
  esPath: '/ejercicios/tonalidades/',
  title: 'Key Signature Exercises: Identify and Write Keys',
  description: 'Free key signature quiz: identify any major or minor key from its sharps or flats, and write key signatures on the staff. Free, no sign-up.',
  h1: 'Key Signatures',
  crumbs: [['Music Exercises', '/ejercicios/']],
  scripts: ['tm-mei', 'tm-notacion', 'armaduras-engine'],
  body: `<h2 id="h-recognize-any-key-at-a-glance">Recognize any key at a glance</h2>

<p>Being able to name the key of a piece just by looking at the sharps or flats at the start of the staff (the <strong>key signature</strong>) saves a lot of guessing. Once you know the trick, you do not need to analyze a single note.</p>

<p>These exercises are built around two visual shortcuts that let you find the key in a fraction of a second. First, memorize the order in which accidentals always appear.</p>

<h2 id="h-order-of-sharps-and-flats">The fixed order of sharps and flats</h2>

<p>Memorize these two sequences as one block each. They are the order in which accidentals are always written on the staff:</p>

<ul>
<li><strong>Order of sharps (♯):</strong> F - C - G - D - A - E - B</li>

<li><strong>Order of flats (♭):</strong> B - E - A - D - G - C - F <em>(exactly the reverse of the sharps)</em></li>
</ul>

<h2 id="h-trick-sharps">1. The shortcut for key signatures with sharps</h2>

<p>When the key signature has one or more sharps, the method is almost automatic:</p>

<ol>
<li>Look at the <strong>last sharp</strong> (the one farthest to the right, just before the music begins).</li>

<li>Go up a <strong>half step</strong> (UK: semitone) from the name of that note.</li>

<li>That note <strong>is the name of the major key.</strong></li>
</ol>

<p><strong>Example:</strong> The key signature has three sharps (F♯, C♯, G♯). The last one is G♯. A half step above G♯ is A, so the key is <strong>A major</strong>.</p>

<h2 id="h-trick-flats">2. The shortcut for key signatures with flats</h2>

<p>With flats, the shortcut is even quicker, because you do not have to count any distance on the keyboard:</p>

<ol>
<li>Find the <strong>second-to-last flat</strong> in the key signature (the one just to the left of the last flat).</li>

<li>That flat, with its own name, <strong>is the name of the major key.</strong></li>
</ol>

<p><strong>Example:</strong> The key signature has four flats in this order (B♭, E♭, A♭, D♭). The second-to-last is A♭, so the key is <strong>A♭ major</strong>.</p>

<p><em>The one exception:</em> this shortcut does not work with a single flat, because there is no second-to-last. A key signature with <strong>one flat (B♭) is always F major</strong>.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
      <th>Type of key signature</th>
      <th>Shortcut for the major key</th>
      <th>How to find the minor key (relative)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sharps</strong></td>
      <td>Last sharp + a half step up = major tonic.</td>
      <td>Go down a minor 3rd (3 half steps) from the major tonic.</td>
    </tr>
    <tr>
      <td><strong>Flats</strong></td>
      <td>The second-to-last flat is the major tonic (exception: one flat = F major).</td>
      <td>Go down a minor 3rd (3 half steps) from the major tonic.</td>
    </tr>
  </tbody>
</table>
</div>

<p>Every major key has a <strong>relative minor key</strong> that shares the same notes and the same key signature but has a different character. Once you know the major key, go down a <strong>minor 3rd</strong> (a whole step plus a half step) to get the name of its relative minor.</p>

<div id="tmar_identificar"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmArIdentificar("tmar_identificar");
  });
</script>

<div id="tmdib_dibujar"></div>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    tmArDibujar("tmdib_dibujar");
  });
</script>

<p>The next step is to practice <a href="/ejercicios/tonalidades/tonalidades-vecinas/"><strong>neighboring keys</strong></a>: finding out which keys can be reached easily by modulation.</p>

<p>Once you can recognize keys on paper, try recognizing them <strong>by ear</strong>. In the ear-training exercises <a href="/ejercicios/auditivos/reconocer-la-tonalidad-mayor/">recognize the major key</a>, <a href="/ejercicios/auditivos/reconocer-la-tonalidad-menor/">recognize the minor key</a> and <a href="/ejercicios/auditivos/reconocer-la-tonalidad/">recognize the key (major and minor)</a>, you hear an A4 and then a melody, and you write its key with the same builder used in the neighboring keys exercise.</p>

<p>Playing scales with the <a href="/herramientas/metronomo/">online metronome</a> builds muscle memory. The <a href="/herramientas/afinador/">online tuner</a> lets you check that the altered notes of each key signature are in tune.</p>

<p>If you need to review the theory first, read the pages on <a href="/diccionario-musical/tonalidades/tonalidades-y-armaduras/">keys and key signatures</a> and the <a href="/diccionario-musical/tonalidades/circulo-de-quintas/">circle of fifths</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I identify the key of a piece from its key signature?</div>
      <div class="tm-faq-a">The sharps or flats at the start of the staff show the key. With sharps: go up a half step from the last sharp to get the major key. With flats: the second-to-last flat is the name of the major key. Exception: a single flat always means F major.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the shortcut for key signatures with sharps?</div>
      <div class="tm-faq-a">Take the last sharp in the key signature (the one farthest to the right) and go up a half step. That gives the major key. Example: 3 sharps (F♯, C♯, G♯) means the last is G♯, a half step up is A, so the key is A major.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the shortcut for key signatures with flats?</div>
      <div class="tm-faq-a">The second-to-last flat gives the name of the major key directly. Example: 4 flats (B♭, E♭, A♭, D♭) means the second-to-last is A♭, so the piece is in A♭ major. If there is only one flat (B♭), the key is always F major.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a relative minor key?</div>
      <div class="tm-faq-a">Every major key has a relative minor with the same key signature. To find it, go down a minor 3rd (a whole step and a half step) from the major tonic. For example, the relative of C major is A minor; both have no sharps or flats.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many keys are there to learn?</div>
      <div class="tm-faq-a">Students usually work on 30 keys: 15 major and 15 minor. There are 15 different key signatures (no accidentals, 7 with sharps and 7 with flats), and each one belongs to one major key and its relative minor.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
