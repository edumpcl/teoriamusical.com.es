const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/intervals/conjunct-and-disjunct-intervals/',
  esPath: '/diccionario-musical/intervalos/intervalos-conjuntos-y-disjuntos/',
  title: 'Conjunct and Disjunct Intervals: Steps vs. Leaps',
  description: 'Conjunct intervals move by step (a 2nd); disjunct intervals move by leap (a 3rd or more). See examples on the staff and how they shape a melody.',
  h1: 'Conjunct and Disjunct Intervals',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Intervals', '/diccionario-musical/intervalos/']],
  articleAttrs: 'data-tm-intervals',
  scripts: ['tm-piano-audio'],
  body: `<p>Depending on the <strong>distance</strong> between its two notes, an <a href="/diccionario-musical/intervalos/intervalos-musicales/">interval</a> is either <strong>conjunct</strong> or <strong>disjunct</strong>. This is a useful way to describe how a melody moves: does it go <strong>note by note</strong> (by step) or <strong>by leaps</strong>?</p>

<h2>Conjunct interval</h2>
<p>A <strong>conjunct interval</strong> (moving "by conjunct degrees", or by step) joins two <strong>neighboring notes of the scale</strong>, that is, a <strong>2nd</strong> (major or minor). The two notes are next to each other, with no note between them. For example, from <strong>C to D</strong>:</p>

<figure class="tm-staff">
<img src="/assets/img/notacion/intervalos/intervalo-conjunto.svg" width="299" height="122" alt="Conjunct interval from C to D (a 2nd) on the staff" loading="lazy" decoding="async">
<figcaption>Conjunct interval: from C to D, a 2nd (neighboring notes).</figcaption>
</figure>

<h2>Disjunct interval</h2>
<p>A <strong>disjunct interval</strong> (a leap) joins two notes that are <strong>not neighbors</strong>: the melody <strong>skips</strong> one or more notes in between. It is any interval of a <strong>3rd or larger</strong>. For example, from <strong>C to G</strong> (a 5th):</p>

<figure class="tm-staff">
<img src="/assets/img/notacion/intervalos/intervalo-disjunto.svg" width="299" height="122" alt="Disjunct interval from C to G (a 5th, a leap) on the staff" loading="lazy" decoding="async">
<figcaption>Disjunct interval: from C to G, a leap of a 5th.</figcaption>
</figure>

<p>The boundary is simple: only the <strong>2nd</strong> is conjunct; <strong>everything else</strong> (3rd, 4th, 5th, 6th…) is disjunct.</p>

<h2>Stepwise and leaping motion in a melody</h2>
<p>These two kinds of interval describe <strong>melodic motion</strong>. A melody that moves by <strong>steps</strong> (from 2nd to 2nd) sounds <strong>smooth, gradual and singable</strong>. For example, C–D–E–F:</p>

<figure class="tm-staff">
<img src="/assets/img/notacion/intervalos/movimiento-conjunto.svg" width="299" height="122" alt="Melody by step: C, D, E, F, rising note by note" loading="lazy" decoding="async">
<figcaption>Conjunct motion: C–D–E–F, note by note.</figcaption>
</figure>

<p>A melody that moves by <strong>leaps</strong> sounds more <strong>angular and energetic</strong>. It is typical of arpeggios and instrumental themes. For example, C–G–E–C:</p>

<figure class="tm-staff">
<img src="/assets/img/notacion/intervalos/movimiento-disjunto.svg" width="299" height="122" alt="Melody by leaps: C, G, E, C" loading="lazy" decoding="async">
<figcaption>Disjunct motion: C–G–E–C, by leaps.</figcaption>
</figure>

<p>Most melodies mix both: stepwise stretches give flow, and an occasional leap adds interest and expression.</p>

<h2>Comparison table</h2>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th></th><th>Conjunct</th><th>Disjunct</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Distance</strong></td><td>2nd (neighboring notes)</td><td>3rd or larger (leap)</td></tr>
    <tr><td><strong>Notes in between</strong></td><td>None</td><td>At least one is skipped</td></tr>
    <tr><td><strong>Melodic motion</strong></td><td>Note by note, stepwise</td><td>By leaps</td></tr>
    <tr><td><strong>Character</strong></td><td>Smooth, singable</td><td>Angular, energetic</td></tr>
    <tr><td><strong>Example</strong></td><td>C–D</td><td>C–G</td></tr>
  </tbody>
</table>
</div>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a conjunct interval?</div>
      <div class="tm-faq-a">A conjunct interval is the interval between two neighboring notes of the scale, that is, a 2nd (major or minor), for example from C to D. Conjunct motion moves note by note, without leaps.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a disjunct interval?</div>
      <div class="tm-faq-a">A disjunct interval separates two notes that are not neighbors, that is, a leap of a 3rd or more, for example from C to G. Disjunct motion moves by leaps and skips the notes in between.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between conjunct and disjunct?</div>
      <div class="tm-faq-a">A conjunct interval joins neighboring notes (a 2nd) in a smooth, stepwise way; a disjunct interval joins notes separated by a leap (a 3rd or more). The difference is the distance: adjacent notes in conjunct motion, separated notes in disjunct motion.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is a 3rd conjunct or disjunct?</div>
      <div class="tm-faq-a">A 3rd is disjunct, because one note between the two is skipped. Only the 2nd (from one scale degree to the next) is conjunct; every interval from the 3rd upward is disjunct.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
