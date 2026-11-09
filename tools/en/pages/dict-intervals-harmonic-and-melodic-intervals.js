const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/intervals/harmonic-and-melodic-intervals/',
  esPath: '/diccionario-musical/intervalos/intervalos-armonicos-y-melodicos/',
  title: 'Harmonic vs Melodic Intervals: Difference and Examples',
  description: 'The difference between a melodic interval (notes in succession) and a harmonic interval (notes together), with staff examples. Size stays the same.',
  h1: 'Harmonic and Melodic Intervals',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Intervals', '/diccionario-musical/intervalos/']],
  articleAttrs: 'data-tm-intervals',
  scripts: ['tm-piano-audio'],
  body: `
<p>An <a href="/diccionario-musical/intervalos/intervalos-musicales/">interval</a> is the distance between two notes. Depending on <strong>how those two notes are played</strong>, the interval can be <strong>melodic</strong> (one after the other) or <strong>harmonic</strong> (both at once). It is important to understand that this classification <strong>does not change the size of the interval</strong>: from C to G there is always a perfect 5th, however it sounds. The only thing that changes is <em>how it is performed</em>.</p>

<h2>Melodic interval</h2>
<p>In a <strong>melodic interval</strong> the two notes sound <strong>successively</strong>, one after the other. It is the basis of <strong>melody</strong>: when we sing or play a line of notes, we are chaining melodic intervals. On the staff (UK: stave), the notes are written <strong>one after the other</strong>.</p>

<figure class="tm-staff">
<img src="/assets/img/notacion/intervalos/intervalo-melodico.svg" width="319" height="122" alt="Ascending melodic interval from C to G: two successive notes on the staff" loading="lazy" decoding="async">
<figcaption>Melodic interval from C to G (perfect 5th): the notes sound one after the other.</figcaption>
</figure>

<p>A melodic interval can be <strong>ascending</strong>, if the second note is higher than the first, or <strong>descending</strong>, if it is lower:</p>

<figure class="tm-staff">
<img src="/assets/img/notacion/intervalos/intervalo-melodico-desc.svg" width="319" height="122" alt="Descending melodic interval from G to C on the staff" loading="lazy" decoding="async">
<figcaption>The same interval, now <strong>descending</strong> (from G to C).</figcaption>
</figure>

<p>Depending on the distance between the two notes, a melodic interval can also be <a href="/diccionario-musical/intervalos/intervalos-conjuntos-y-disjuntos/">conjunct or disjunct</a> (by step or by leap). And depending on its size it is also classified as <a href="/diccionario-musical/intervalos/intervalos-simples-y-compuestos/">simple or compound</a>.</p>

<h2>Harmonic interval</h2>
<p>In a <strong>harmonic interval</strong> the two notes sound <strong>simultaneously</strong>, at the same time. It is the basis of <strong>harmony</strong> and of <a href="/diccionario-musical/acordes/">chords</a>: stacking several harmonic intervals builds a chord. On the staff, the notes are written <strong>vertically aligned</strong>, one above the other.</p>

<figure class="tm-staff">
<img src="/assets/img/notacion/intervalos/intervalo-armonico.svg" width="319" height="122" alt="Harmonic interval of C and G: two simultaneous notes aligned on the staff" loading="lazy" decoding="async">
<figcaption>Harmonic interval of C and G (perfect 5th): the notes sound together.</figcaption>
</figure>

<h2>Comparison table</h2>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th></th><th>Melodic interval</th><th>Harmonic interval</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>How it sounds</strong></td><td>One note after the other (successive)</td><td>Both at once (simultaneous)</td></tr>
    <tr><td><strong>Notation</strong></td><td>Notes in a row, horizontally</td><td>Notes aligned vertically</td></tr>
    <tr><td><strong>It is the basis of…</strong></td><td>Melody</td><td>Harmony and chords</td></tr>
    <tr><td><strong>Direction</strong></td><td>Ascending or descending</td><td>Has no direction</td></tr>
    <tr><td><strong>Size</strong></td><td colspan="2" style="text-align:center">The same (a 5th is a 5th in both)</td></tr>
  </tbody>
</table>
</div>

<p>In short: <strong>melodic = succession, harmonic = simultaneity</strong>. To measure and name the interval (2nd, 3rd, 5th…) and its quality (major, minor, perfect…), the procedure is identical in both cases. You can review it on the page about <a href="/diccionario-musical/intervalos/intervalos-musicales/">musical intervals</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between a melodic and a harmonic interval?</div>
      <div class="tm-faq-a">The difference is in how the two notes sound: in a melodic interval they are played one after the other (successively), and in a harmonic interval they are played together (simultaneously). The size and name of the interval (3rd, 5th, etc.) are identical in both cases.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a melodic interval?</div>
      <div class="tm-faq-a">A melodic interval is the distance between two notes played one after the other. It is the basis of melody. It can be ascending (if the second note is higher) or descending (if it is lower).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a harmonic interval?</div>
      <div class="tm-faq-a">A harmonic interval is the distance between two notes that sound at the same time. It is the basis of harmony and chords. On the staff it is written with the two notes aligned vertically.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Are melodic and harmonic intervals measured the same way?</div>
      <div class="tm-faq-a">Yes. An interval from C to G is a perfect 5th whether the notes sound successively (melodic) or together (harmonic). The classification as melodic or harmonic only describes how they are performed and does not change the size of the interval.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
