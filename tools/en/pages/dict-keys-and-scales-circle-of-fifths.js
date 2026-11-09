const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/keys-and-scales/circle-of-fifths/',
  esPath: '/diccionario-musical/tonalidades/circulo-de-quintas/',
  title: 'Circle of Fifths: What It Is and How to Read It',
  description: 'The circle of fifths explained: how to read it and what it is for. The 12 major keys, their relative minors and key signatures (sharps and flats).',
  h1: 'Circle of Fifths',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Keys and Scales', '/diccionario-musical/tonalidades/']],
  body: `
<p>The <strong>circle of fifths</strong> is a diagram that arranges the 12 major keys in a circle, each one a <strong>perfect 5th</strong> away from the next. At a glance it shows how many <strong>sharps or flats</strong> each key signature has, which keys are neighbors and what the <strong>relative minor</strong> of each major key is. It is one of the most useful reference tools in music theory.</p>

<!-- TODO-IMG: /assets/img/tonalidades/circulo-de-quintas.webp (+ .png and the PDF /assets/img/tonalidades/circulo-de-quintas.pdf): the circle-of-fifths diagram has Spanish note names (Do, Sol, Re…) and needs an English version. It shows the 12 major keys on the outer ring, the relative minors on the inner ring and each key signature written on a staff; the three bottom positions are enharmonic (B and C♭, F♯ and G♭, D♭ and C♯), covering 7 flats to 7 sharps. Caption: "The complete circle of fifths." -->

<h2>How to read the circle of fifths</h2>

<p>Reading the diagram follows four simple rules:</p>

<ul>
  <li><strong>C major at the top</strong> (no accidentals). This is the starting point.</li>
  <li><strong>Clockwise = sharps.</strong> Each step to the right goes up a perfect 5th and <strong>adds one sharp</strong>: G (1), D (2), A (3), E (4), B (5), F♯ (6).</li>
  <li><strong>Counterclockwise = flats.</strong> Each step to the left goes down a perfect 5th (or up a perfect 4th) and <strong>adds one flat</strong>: F (1), B♭ (2), E♭ (3), A♭ (4), D♭ (5).</li>
  <li><strong>Inner ring = relative minors.</strong> Under each major key is its relative minor, which shares the same key signature: A minor under C major, E minor under G major, and so on.</li>
</ul>

<p>At the bottom, the keys with six accidentals are <strong>enharmonic</strong>: <strong>F♯ major</strong> (6 sharps) sounds the same as <strong>G♭ major</strong> (6 flats). That is why the circle "closes" on itself: after twelve fifths you are back at the starting point.</p>

<h2>What the circle of fifths is for</h2>

<p>It is not just a pretty diagram: it is a practical tool used every day in harmony and composition.</p>

<p>It also helps your ear: when you recognize a key by ear you have to name it and know its key signature, and the circle is the quickest way to remember them. You can practice with the listening exercises <a href="/ejercicios/auditivos/reconocer-la-tonalidad-mayor/">recognize the major key</a>, <a href="/ejercicios/auditivos/reconocer-la-tonalidad-menor/">recognize the minor key</a> and, with both modes mixed, <a href="/ejercicios/auditivos/reconocer-la-tonalidad/">recognize the key: major and minor</a>.</p>

<ul>
  <li><strong>Remembering key signatures.</strong> You can tell at once how many sharps or flats any key has, without memorizing them one by one. To write them on the staff, follow the <a href="/diccionario-musical/tonalidades/orden-de-los-sostenidos-y-bemoles/">order of the accidentals in the key signature</a>.</li>
  <li><strong>Finding closely related keys.</strong> The keys next to each other on the circle (and their relatives) are the <a href="/diccionario-musical/tonalidades/tonalidades-vecinas/">closely related keys</a>: they share almost their whole key signature and are the ones you modulate to most naturally.</li>
  <li><strong>Finding the relative minor.</strong> Useful for moving from a major key to its <a href="/diccionario-musical/tonalidades/escalas-menores/">relative minor</a> without changing the key signature.</li>
  <li><strong>Understanding progressions by fifths.</strong> Many progressions, starting with the <strong>V–I</strong> cadence and the <strong>ii–V–I</strong> turnaround, move around the circle. The motion from the <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">dominant to the tonic</a> is precisely a step of a fifth.</li>
</ul>

<h2>Key signature chart for all keys</h2>

<p>This table summarizes what the circle shows: each major key, its relative minor and the accidentals of its key signature. It answers questions such as "which key has three sharps?" or "which key has two flats?"</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Key signature</th><th>Major key</th><th>Relative minor</th><th>Accidentals</th></tr>
  </thead>
  <tbody>
    <tr><td>0</td><td><strong>C major</strong></td><td>A minor</td><td>—</td></tr>
    <tr><td>1 ♯</td><td><strong>G major</strong></td><td>E minor</td><td>F♯</td></tr>
    <tr><td>2 ♯</td><td><strong>D major</strong></td><td>B minor</td><td>F♯ C♯</td></tr>
    <tr><td>3 ♯</td><td><strong>A major</strong></td><td>F♯ minor</td><td>F♯ C♯ G♯</td></tr>
    <tr><td>4 ♯</td><td><strong>E major</strong></td><td>C♯ minor</td><td>F♯ C♯ G♯ D♯</td></tr>
    <tr><td>5 ♯</td><td><strong>B major</strong></td><td>G♯ minor</td><td>F♯ C♯ G♯ D♯ A♯</td></tr>
    <tr><td>6 ♯</td><td><strong>F♯ major</strong></td><td>D♯ minor</td><td>F♯ C♯ G♯ D♯ A♯ E♯</td></tr>
    <tr><td>7 ♯</td><td><strong>C♯ major</strong></td><td>A♯ minor</td><td>all 7 sharps</td></tr>
    <tr><td>1 ♭</td><td><strong>F major</strong></td><td>D minor</td><td>B♭</td></tr>
    <tr><td>2 ♭</td><td><strong>B♭ major</strong></td><td>G minor</td><td>B♭ E♭</td></tr>
    <tr><td>3 ♭</td><td><strong>E♭ major</strong></td><td>C minor</td><td>B♭ E♭ A♭</td></tr>
    <tr><td>4 ♭</td><td><strong>A♭ major</strong></td><td>F minor</td><td>B♭ E♭ A♭ D♭</td></tr>
    <tr><td>5 ♭</td><td><strong>D♭ major</strong></td><td>B♭ minor</td><td>B♭ E♭ A♭ D♭ G♭</td></tr>
    <tr><td>6 ♭</td><td><strong>G♭ major</strong></td><td>E♭ minor</td><td>B♭ E♭ A♭ D♭ G♭ C♭</td></tr>
    <tr><td>7 ♭</td><td><strong>C♭ major</strong></td><td>A♭ minor</td><td>all 7 flats</td></tr>
  </tbody>
</table>
</div>

<h2>How to memorize the circle of fifths</h2>

<p>There are classic tricks that save you from memorizing the diagram:</p>

<ul>
  <li><strong>The order of sharps</strong> is <strong>F - C - G - D - A - E - B</strong>. Each new key with sharps adds the next one on the list.</li>
  <li><strong>The order of flats</strong> is the reverse: <strong>B - E - A - D - G - C - F</strong>.</li>
  <li>To find the major key from a <strong>sharp</strong> key signature, go up a half step (UK: semitone) from the last sharp (with three sharps, the last is G♯ → A major). With <strong>flats</strong>, the key is the second-to-last flat (with three flats, B♭-E♭-A♭ → E♭ major). The flat rule works from two flats up; F major, with one flat, has to be memorized.</li>
</ul>

<p>The solfège names used in Spanish-, French- and Italian-speaking countries (Do, Re, Mi, Fa, Sol, La, Si) correspond to C, D, E, F, G, A, B.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the circle of fifths?</div>
      <div class="tm-faq-a">The circle of fifths is a diagram that arranges the 12 major keys in a circle, each a perfect fifth from the next. It shows at a glance how many sharps or flats each key signature has, which keys are neighbors and what the relative minor of each major key is.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is it called the circle of fifths?</div>
      <div class="tm-faq-a">Because each key is a perfect fifth from the next one going clockwise: from C to G is a fifth, from G to D is another, and so on until you return to C after all 12 keys. Going the other way, the steps are perfect fourths (the so-called circle of fourths).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you read sharps and flats on the circle of fifths?</div>
      <div class="tm-faq-a">Starting from C major (no accidentals), each step clockwise adds one sharp to the key signature (G = 1, D = 2, A = 3…). Each step counterclockwise adds one flat (F = 1, B♭ = 2, E♭ = 3…). At the bottom, the keys with six accidentals are enharmonic: F♯ major is the same as G♭ major.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you find the relative minor with the circle of fifths?</div>
      <div class="tm-faq-a">Each major key on the outer ring has its relative minor in the same position on the inner ring. The relative minor shares exactly the same key signature as its major and lies a minor third below it: the relative of C major is A minor, that of G major is E minor, and so on.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the circle of fifths used for?</div>
      <div class="tm-faq-a">It is used to remember the key signatures of all keys, find the closely related keys you can modulate to naturally, locate the relative minor of each major key and understand chord progressions that move by fifths, such as the ii–V–I cadence. It is a basic reference tool in harmony and composition.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
