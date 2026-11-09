const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/intervals/widening-narrowing-intervals/',
  esPath: '/diccionario-musical/intervalos/ampliacion-reduccion-de-intervalos/',
  title: 'Widening and Narrowing Intervals by an Octave',
  description: 'How moving one note of an interval by an octave widens or narrows it, the two ways to do it depending on the exercise, and what happens to the number.',
  h1: 'Widening and Narrowing Intervals',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Intervals', '/diccionario-musical/intervalos/']],
  articleAttrs: 'data-tm-intervals',
  scripts: ['tm-piano-audio'],
  body: `
<p><strong>Widening an interval</strong> means moving one of its notes an octave outward so the distance between the two notes is larger. <strong>Narrowing</strong> it is the opposite: moving one note an octave inward so the interval gets smaller. Both operations are common in music-theory exercises in Spanish conservatory courses. Do not confuse them with <em>augmented</em> and <em>diminished</em> intervals: widening and narrowing change the interval's <em>number</em> by moving a note an octave, while augmented and diminished are <em>qualities</em> that change by half steps (UK: semitones). To review the concepts of interval and octave, see the section on <a href="/diccionario-musical/intervalos/intervalos-musicales/">musical intervals</a>.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Operation</th><th>Note to move</th><th>Direction of the move</th></tr>
  </thead>
  <tbody>
    <tr><td rowspan="2"><strong>Widening</strong></td><td>Higher note</td><td>Up an octave</td></tr>
    <tr><td>Lower note</td><td>Down an octave</td></tr>
    <tr><td rowspan="2"><strong>Narrowing</strong></td><td>Lower note</td><td>Up an octave</td></tr>
    <tr><td>Higher note</td><td>Down an octave</td></tr>
  </tbody>
</table>
</div>

<p>If the exercise only lets you move the second note: in <strong>ascending</strong> intervals, widening raises the second note and narrowing lowers it. In <strong>descending</strong> intervals, it is the other way around.</p>

<h2>Widening intervals</h2>

<p>To widen an interval is to make it one octave (or more) larger.</p>

<p>Widening can be done in several ways, depending on whether the exercise lets you move either note or only the second one.</p>

<h3>Free to move either note</h3>

<p>With no restriction on which note moves, there are two equivalent procedures.</p>

<h4>The higher note</h4>

<p>Move the higher note up an octave.</p>

<div class="tm-img-grid-2">
  <figure>
    <img src="/assets/img/notacion/intervalos/ampliacion-1-original.svg" width="420" height="122" alt="Original interval before being widened" loading="lazy" decoding="async">
    <figcaption>Original interval</figcaption>
  </figure>
  <figure>
    <img src="/assets/img/notacion/intervalos/ampliacion-1-subir-agudo.svg" width="420" height="122" alt="Interval widened by raising the higher note an octave" loading="lazy" decoding="async">
    <figcaption>Widened interval</figcaption>
  </figure>
</div>
<div class="tm-img-grid-2">
  <figure>
    <img src="/assets/img/notacion/intervalos/ampliacion-2-original.svg" width="420" height="122" alt="Second example of an original interval before widening" loading="lazy" decoding="async">
    <figcaption>Original interval</figcaption>
  </figure>
  <figure>
    <img src="/assets/img/notacion/intervalos/ampliacion-2-subir-agudo.svg" width="420" height="122" alt="Second example of an interval widened by raising the higher note" loading="lazy" decoding="async">
    <figcaption>Widened interval</figcaption>
  </figure>
</div>
<h4>The lower note</h4>

<p>Move the lower note down an octave.</p>

<div class="tm-img-grid-2">
  <figure>
    <img src="/assets/img/notacion/intervalos/ampliacion-1-original.svg" width="420" height="122" alt="Original interval before widening by lowering the lower note" loading="lazy" decoding="async">
    <figcaption>Original interval</figcaption>
  </figure>
  <figure>
    <img src="/assets/img/notacion/intervalos/ampliacion-1-bajar-grave.svg" width="420" height="134" alt="Interval widened by lowering the lower note an octave" loading="lazy" decoding="async">
    <figcaption>Widened interval</figcaption>
  </figure>
</div>
<div class="tm-img-grid-2">
  <figure>
    <img src="/assets/img/notacion/intervalos/ampliacion-2-original.svg" width="420" height="122" alt="Second original example before widening by lowering the lower note" loading="lazy" decoding="async">
    <figcaption>Original interval</figcaption>
  </figure>
  <figure>
    <img src="/assets/img/notacion/intervalos/ampliacion-2-bajar-grave.svg" width="420" height="122" alt="Second example of an interval widened by lowering the lower note" loading="lazy" decoding="async">
    <figcaption>Widened interval</figcaption>
  </figure>
</div>
<h3>Restricted to the second note</h3>

<p>First decide the direction of the interval. If it is ascending, the second note goes up an octave. If it is descending, the second note goes down an octave.</p>

<div class="tm-img-grid-2">
  <figure>
    <img src="/assets/img/notacion/intervalos/ampliacion-1-original.svg" width="420" height="122" alt="Original ascending interval before widening by moving the second note" loading="lazy" decoding="async">
    <figcaption>Original interval</figcaption>
  </figure>
  <figure>
    <img src="/assets/img/notacion/intervalos/ampliacion-1-subir-agudo.svg" width="420" height="122" alt="Ascending interval widened by raising the second note" loading="lazy" decoding="async">
    <figcaption>Widened interval</figcaption>
  </figure>
</div>
<div class="tm-img-grid-2">
  <figure>
    <img src="/assets/img/notacion/intervalos/ampliacion-2-original.svg" width="420" height="122" alt="Original descending interval before widening by moving the second note" loading="lazy" decoding="async">
    <figcaption>Original interval</figcaption>
  </figure>
  <figure>
    <img src="/assets/img/notacion/intervalos/ampliacion-2-bajar-grave.svg" width="420" height="122" alt="Descending interval widened by lowering the second note" loading="lazy" decoding="async">
    <figcaption>Widened interval</figcaption>
  </figure>
</div>
<h2 id="narrowing">Narrowing intervals</h2>

<p>To narrow an interval is to make it one octave (or more) smaller. For that reason the starting interval must be larger than an octave (a compound interval).</p>

<p>Narrowing can be done in several ways, depending on whether the exercise lets you move either note or only the second one.</p>

<h3>Free to move either note</h3>

<h4>The lower note</h4>

<p>Move the lower note up an octave.</p>

<div class="tm-img-grid-2">
  <figure>
    <img src="/assets/img/notacion/intervalos/reduccion-1-original.svg" width="420" height="122" alt="Original compound interval before being narrowed" loading="lazy" decoding="async">
    <figcaption>Original interval</figcaption>
  </figure>
  <figure>
    <img src="/assets/img/notacion/intervalos/reduccion-1-subir-grave.svg" width="420" height="122" alt="Interval narrowed by raising the lower note an octave" loading="lazy" decoding="async">
    <figcaption>Narrowed interval</figcaption>
  </figure>
</div>
<div class="tm-img-grid-2">
  <figure>
    <img src="/assets/img/notacion/intervalos/reduccion-2-original.svg" width="420" height="122" alt="Second example of an original compound interval before narrowing" loading="lazy" decoding="async">
    <figcaption>Original interval</figcaption>
  </figure>
  <figure>
    <img src="/assets/img/notacion/intervalos/reduccion-2-subir-grave.svg" width="420" height="122" alt="Second example of an interval narrowed by raising the lower note" loading="lazy" decoding="async">
    <figcaption>Narrowed interval</figcaption>
  </figure>
</div>
<h4>The higher note</h4>

<p>Move the higher note down an octave.</p>

<div class="tm-img-grid-2">
  <figure>
    <img src="/assets/img/notacion/intervalos/reduccion-1-original.svg" width="420" height="122" alt="Original compound interval before narrowing by lowering the higher note" loading="lazy" decoding="async">
    <figcaption>Original interval</figcaption>
  </figure>
  <figure>
    <img src="/assets/img/notacion/intervalos/reduccion-1-bajar-agudo.svg" width="420" height="122" alt="Interval narrowed by lowering the higher note an octave" loading="lazy" decoding="async">
    <figcaption>Narrowed interval</figcaption>
  </figure>
</div>
<div class="tm-img-grid-2">
  <figure>
    <img src="/assets/img/notacion/intervalos/reduccion-2-original.svg" width="420" height="122" alt="Second original example before narrowing by lowering the higher note" loading="lazy" decoding="async">
    <figcaption>Original interval</figcaption>
  </figure>
  <figure>
    <img src="/assets/img/notacion/intervalos/reduccion-2-bajar-agudo.svg" width="420" height="122" alt="Second example of an interval narrowed by lowering the higher note" loading="lazy" decoding="async">
    <figcaption>Narrowed interval</figcaption>
  </figure>
</div>
<h3>Restricted to the second note</h3>

<p>First decide the direction of the interval. If it is ascending, the second note goes down an octave. If it is descending, the second note goes up an octave.</p>

<div class="tm-img-grid-2">
  <figure>
    <img src="/assets/img/notacion/intervalos/reduccion-1-original.svg" width="420" height="122" alt="Original ascending compound interval before narrowing by moving the second note" loading="lazy" decoding="async">
    <figcaption>Original interval</figcaption>
  </figure>
  <figure>
    <img src="/assets/img/notacion/intervalos/reduccion-1-bajar-agudo.svg" width="420" height="122" alt="Ascending interval narrowed by lowering the second note" loading="lazy" decoding="async">
    <figcaption>Narrowed interval</figcaption>
  </figure>
</div>
<div class="tm-img-grid-2">
  <figure>
    <img src="/assets/img/notacion/intervalos/reduccion-2-original.svg" width="420" height="122" alt="Original descending compound interval before narrowing by moving the second note" loading="lazy" decoding="async">
    <figcaption>Original interval</figcaption>
  </figure>
  <figure>
    <img src="/assets/img/notacion/intervalos/reduccion-2-subir-grave.svg" width="420" height="122" alt="Descending interval narrowed by raising the second note" loading="lazy" decoding="async">
    <figcaption>Narrowed interval</figcaption>
  </figure>
</div>
<p>See also the <a href="/diccionario-musical/intervalos/inversion/">inversion of intervals</a>: a related operation that changes the number and quality of the interval by moving one note an octave.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
  <div class="tm-faq-item">
    <div class="tm-faq-q">What does it mean to widen a musical interval?</div>
    <div class="tm-faq-a">Widening an interval means moving one of its notes an octave outward: the higher note goes up an octave or the lower note goes down an octave, increasing the distance between them.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What does it mean to narrow a musical interval?</div>
    <div class="tm-faq-a">Narrowing an interval is the opposite process: one of the notes moves an octave toward the middle of the interval, reducing the distance between the two notes.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">Can you move either note when widening an interval?</div>
    <div class="tm-faq-a">It depends on the wording of the exercise. If any note may move, there are two options: raise the higher note or lower the lower note. If only the second note may move, follow the direction of the interval: ascending goes up, descending goes down.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What happens to the interval number when it is widened?</div>
    <div class="tm-faq-a">Widening an interval increases its number by 7: a 3rd becomes a 10th, a 5th becomes a 12th. The quality is kept: a major 3rd widened is a major 10th. Narrowing does the opposite: the number decreases by 7.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">How is widening an interval different from changing it with an accidental?</div>
    <div class="tm-faq-a">Widening moves a note an octave: it changes the number but keeps the quality. Adding an accidental (sharp, flat) changes the quality but not the number. For example, widening a minor 3rd gives a minor 10th, while adding a sharp to the upper note gives a major 3rd.</div>
  </div>
</div>
</div>
</div>
</section>
`,
});
