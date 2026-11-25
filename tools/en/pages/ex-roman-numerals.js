const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/roman-numerals/',
  esPath: '/ejercicios/cifrado-romano/',
  title: 'Roman Numeral Analysis Quiz: Identify and Build Chords',
  description: 'Practice Roman numerals online: identify the figures of a chord or write it on the staff. Triads and seventh chords, inversions, major and minor keys.',
  h1: 'Roman Numeral Analysis Exercises',
  crumbs: [['Music Exercises', '/ejercicios/']],
  scripts: ['tm-piano-audio', 'tm-mei', 'tm-notacion', 'cifrado-romano-engine'],
  body: `<p>In this exercise you practice <strong>Roman numeral analysis</strong>: writing each chord with the Roman numeral of its <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">scale degree</a> in the key, followed by the <strong>figures</strong> that show its position and special notes. You get two exercises in one: <strong>identify</strong> the figures of a written chord, or <strong>build</strong> the chord from its figures. The levels progress by type of chord: triads in root position, inverted triads, seventh chords in root position, inverted seventh chords and everything mixed.</p>

<div id="tmcr"></div>

<h2>How Roman numerals are written</h2>

<p>The label of a chord has two parts: <strong>the Roman numeral</strong>, which says which degree it is built on, and <strong>the figures</strong>, stacked to its right, which say what notes are above the bass. They are read like this:</p>

<ul>
  <li><strong>The Roman numeral is always written in upper case</strong> (I to VII) and is the scale degree the chord is built on. Whether the chord is major, minor or diminished comes from the key and shows in the notes, not in the sign of the numeral.</li>
  <li><strong>No figure</strong> is a triad in root position. <strong>6</strong> is the first inversion and <strong>6/4</strong> the second. Seventh chords use the figure <strong>7</strong> and their inversions <strong>6/5</strong>, <strong>4/3</strong> and <strong>4/2</strong> (in this site's method they are figured differently, as you will see below).</li>
  <li><strong>The + sign</strong> marks the <strong>leading tone</strong>: the note a half step below the tonic. On V it is the third of the chord; on VII it is the root.</li>
  <li><strong>A struck-through number</strong> is a <strong>diminished</strong> interval. The struck-through 5 shows the diminished fifth, and struck-through numbers are reserved for diminished chords.</li>
</ul>

<p>To review how chords are built, see <a href="/diccionario-musical/acordes/acordes-triadas/">triads</a> and <a href="/diccionario-musical/acordes/acordes-de-septima/">seventh chords</a>, where their figures are explained with images.</p>

<h3>The chords of C major</h3>

<p>A triad is built on each degree of the major scale. In root position, I, II, IV and VI have no figure; V carries the <strong>+</strong> of the leading tone and VII the <strong>struck-through 5</strong> of its diminished fifth:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Figures</th><th>Notes</th><th>Chord</th></tr></thead>
  <tbody>
    <tr><td><span class="tm-cr-rom">I</span></td><td>C – E – G</td><td>major triad</td></tr>
    <tr><td><span class="tm-cr-rom">II</span></td><td>D – F – A</td><td>minor triad</td></tr>
    <tr><td><span class="tm-cr-rom">IV</span></td><td>F – A – C</td><td>major triad</td></tr>
    <tr><td><span class="tm-cr-rom">V</span><span class="tm-cr-fig"><span>+</span></span></td><td>G – B – D</td><td>major triad</td></tr>
    <tr><td><span class="tm-cr-rom">VI</span></td><td>A – C – E</td><td>minor triad</td></tr>
    <tr><td><span class="tm-cr-rom">VII</span><span class="tm-cr-fig"><span class="tm-cr-t">5</span></span></td><td>B – D – F</td><td>diminished triad</td></tr>
  </tbody>
</table>
</div>

<h3>In a minor key: the leading tone</h3>

<p>In minor keys the figures are worked out with the <strong>harmonic</strong> minor scale: the 7th degree is raised a half step, to have a <strong>leading tone</strong>. That is why <strong>V</strong> is major and <strong>VII</strong> is diminished, even though the key signature does not carry that accidental. In A minor the leading tone is G♯, and on the 2nd degree the fifth is already diminished. These are the chords of A minor:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Figures</th><th>Notes</th><th>Chord</th></tr></thead>
  <tbody>
    <tr><td><span class="tm-cr-rom">I</span></td><td>A – C – E</td><td>minor triad</td></tr>
    <tr><td><span class="tm-cr-rom">II</span><span class="tm-cr-fig"><span class="tm-cr-t">5</span></span></td><td>B – D – F</td><td>diminished triad</td></tr>
    <tr><td><span class="tm-cr-rom">IV</span></td><td>D – F – A</td><td>minor triad</td></tr>
    <tr><td><span class="tm-cr-rom">V</span><span class="tm-cr-fig"><span>+</span></span></td><td>E – G♯ – B</td><td>major triad</td></tr>
    <tr><td><span class="tm-cr-rom">VI</span></td><td>F – A – C</td><td>major triad</td></tr>
    <tr><td><span class="tm-cr-rom">VII</span><span class="tm-cr-fig"><span class="tm-cr-t">5</span></span></td><td>G♯ – B – D</td><td>diminished triad</td></tr>
  </tbody>
</table>
</div>

<p>The <strong>III chord is not asked</strong>: depending on the context it is major or augmented, and an exercise with two possible answers would not be fair. You can review the <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-armonicas/">harmonic minor scale</a> on its page.</p>

<h3>Inverted triads</h3>

<p>In inversions, the figures say which intervals are above the bass. The first inversion is figured with a <strong>6</strong> and the second with <strong>6/4</strong>, and the leading tone is marked with the <strong>+</strong> on whichever note it is. Examples in C major:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Chord</th><th>Figures</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>I · 1st inversion</td><td><span class="tm-cr-rom">I</span><span class="tm-cr-fig"><span>6</span></span></td><td>E – G – C</td></tr>
    <tr><td>I · 2nd inversion</td><td><span class="tm-cr-rom">I</span><span class="tm-cr-fig"><span>6</span><span>4</span></span></td><td>G – C – E</td></tr>
    <tr><td>V · 1st inversion</td><td><span class="tm-cr-rom">V</span><span class="tm-cr-fig"><span>6</span></span></td><td>B – D – G</td></tr>
    <tr><td>V · 2nd inversion</td><td><span class="tm-cr-rom">V</span><span class="tm-cr-fig"><span>+6</span><span>4</span></span></td><td>D – G – B</td></tr>
    <tr><td>VII · 1st inversion</td><td><span class="tm-cr-rom">VII</span><span class="tm-cr-fig"><span>+6</span><span>3</span></span></td><td>D – F – B</td></tr>
    <tr><td>VII · 2nd inversion</td><td><span class="tm-cr-rom">VII</span><span class="tm-cr-fig"><span>6</span><span>+4</span></span></td><td>F – B – D</td></tr>
  </tbody>
</table>
</div>

<p>Look at the first inversion of VII: the <strong>+6</strong> says that the leading tone is a sixth above the bass, and the <strong>3</strong> below tells it apart from the second inversion of the dominant seventh.</p>

<h3>The seventh chords in the exercise</h3>

<p>The levels with seventh chords include the three that are figured in this site's method: the <strong>dominant seventh</strong> (on V), the <strong>leading-tone seventh</strong> (on VII of a major key) and the <strong>diminished seventh</strong> (on VII of a minor key). Their figures are the same in any key. With the leading-tone seventh of C major and the dominant seventh:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Chord</th><th>Figures</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>V7 · root position</td><td><span class="tm-cr-rom">V</span><span class="tm-cr-fig"><span>7</span><span>+</span></span></td><td>G – B – D – F</td></tr>
    <tr><td>V7 · 1st inversion</td><td><span class="tm-cr-rom">V</span><span class="tm-cr-fig"><span>6</span><span class="tm-cr-t">5</span></span></td><td>B – D – F – G</td></tr>
    <tr><td>V7 · 2nd inversion</td><td><span class="tm-cr-rom">V</span><span class="tm-cr-fig"><span>+6</span></span></td><td>D – F – G – B</td></tr>
    <tr><td>V7 · 3rd inversion</td><td><span class="tm-cr-rom">V</span><span class="tm-cr-fig"><span>+4</span></span></td><td>F – G – B – D</td></tr>
    <tr><td>VII7 · root position</td><td><span class="tm-cr-rom">VII</span><span class="tm-cr-fig"><span>7</span><span class="tm-cr-t">5</span></span></td><td>B – D – F – A</td></tr>
    <tr><td>VII7 · 1st inversion</td><td><span class="tm-cr-rom">VII</span><span class="tm-cr-fig"><span>+6</span><span>5</span></span></td><td>D – F – A – B</td></tr>
    <tr><td>VII7 · 2nd inversion</td><td><span class="tm-cr-rom">VII</span><span class="tm-cr-fig"><span>+4</span><span>3</span></span></td><td>F – A – B – D</td></tr>
    <tr><td>VII7 · 3rd inversion</td><td><span class="tm-cr-rom">VII</span><span class="tm-cr-fig"><span>4</span><span>+2</span></span></td><td>A – B – D – F</td></tr>
  </tbody>
</table>
</div>

<p>The diminished seventh has its own figures: the struck-through 7 and 5, +6 and a struck-through 5, +4 and ♭3, and +2. They are explained in <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant seventh</a>, <a href="/diccionario-musical/acordes/acorde-de-septima-de-sensible/">leading-tone seventh</a> and <a href="/diccionario-musical/acordes/acorde-de-septima-disminuida/">diminished seventh</a>.</p>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (window.tmCifradoRomano) tmCifradoRomano('tmcr');
  });
</script>

<h2>Before and after this exercise</h2>

<p>It helps to know <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">the degrees of the scale</a> and how to build <a href="/diccionario-musical/acordes/acordes-triadas/">triads</a>. To see the role each chord plays in the key, continue with the <a href="/ejercicios/funciones-tonales/">harmonic functions</a> exercise and the <a href="/ejercicios/cadencias/">cadences</a> exercise.</p>
<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is the Roman numeral always written in upper case?</div>
      <div class="tm-faq-a">Because the Roman numeral only says which degree the chord is built on. Whether the chord is major, minor or diminished comes from the key and can be seen in the notes; what marks it in the figures is, for example, the + of the leading tone or the struck-through 5 of the diminished fifth.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does the + sign mean in the figures?</div>
      <div class="tm-faq-a">The + marks the leading tone, the note a half step below the tonic. On V it is the third of the chord (figure +), on VII it is the root, and in inversions the + goes with the figure of the note that is the leading tone: for example +6 or +4.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a struck-through number?</div>
      <div class="tm-faq-a">A struck-through number shows a diminished interval, like the struck-through 5 of the diminished fifth of the VII chord. Struck-through numbers are reserved for diminished chords and are not used in others.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is the III chord not asked?</div>
      <div class="tm-faq-a">Because its quality depends on the context: in a minor key it is major with the natural scale and augmented with the harmonic scale. An exercise should not have two valid answers, so the III chord is studied separately.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between Roman numerals and chord symbols?</div>
      <div class="tm-faq-a">Roman numerals talk about degrees and depend on the key: V7 is the dominant seventh in any key. Chord symbols (C, Am, G7) name the chord by its root and do not depend on the key. Roman numerals are what you use to analyze the function of each chord.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
