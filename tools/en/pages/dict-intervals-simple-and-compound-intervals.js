const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/intervals/simple-and-compound-intervals/',
  esPath: '/diccionario-musical/intervalos/intervalos-simples-y-compuestos/',
  title: 'Simple and Compound Intervals: How to Reduce Them',
  description: 'A simple interval fits within an octave; a compound interval is larger than an octave. Learn how to reduce a compound interval to a simple one.',
  h1: 'Simple and Compound Intervals',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Intervals', '/diccionario-musical/intervalos/']],
  articleAttrs: 'data-tm-intervals',
  scripts: ['tm-piano-audio'],
  body: `<p>According to its <strong>size</strong>, an <a href="/diccionario-musical/intervalos/intervalos-musicales/">interval</a> is either <strong>simple</strong> or <strong>compound</strong>. The dividing line is the <strong>octave</strong>: what fits inside it is simple; what goes beyond it is compound.</p>

<h2>Simple interval</h2>
<p>A <strong>simple interval</strong> is one that <strong>fits within an octave</strong>: anything from the <a href="/diccionario-musical/intervalos/unisono-y-notas-enarmonicas/">unison</a> up to the <strong>octave</strong> (8th). These are the intervals used most often. For example, a 5th from C to G:</p>

<figure class="tm-staff">
<img src="/assets/img/notacion/intervalos/intervalo-simple.svg" width="319" height="122" alt="Simple interval: a 5th from C to G within the octave" loading="lazy" decoding="async">
<figcaption>Simple interval: a 5th from C to G (within the octave).</figcaption>
</figure>

<h2>Compound interval</h2>
<p>A <strong>compound interval</strong> is one that <strong>goes beyond the octave</strong>: it is larger than an 8th. It equals a simple interval <strong>plus one or more octaves</strong>. For example, C to G one octave higher forms a <strong>12th</strong> (a 5th + an octave):</p>

<figure class="tm-staff">
<img src="/assets/img/notacion/intervalos/intervalo-compuesto.svg" width="330" height="122" alt="Compound interval: a 12th from C to G, an octave higher" loading="lazy" decoding="async">
<figcaption>Compound interval: a 12th from C to G (a 5th + an octave).</figcaption>
</figure>

<p>The most common compound interval is the <strong>9th</strong> (a 2nd plus an octave), very present in harmony:</p>

<figure class="tm-staff">
<img src="/assets/img/notacion/intervalos/intervalo-novena.svg" width="330" height="122" alt="Compound interval of a 9th: from C to D an octave higher" loading="lazy" decoding="async">
<figcaption>The 9th (C to D): a 2nd plus an octave.</figcaption>
</figure>

<h2>How to reduce a compound interval to a simple one</h2>
<p>To find which simple interval a compound one equals, just <strong>subtract 7</strong> from its number. The <strong>quality</strong> (major, minor, perfect, augmented or diminished) <strong>does not change</strong>: a major 9th reduces to a major 2nd, a perfect 12th to a perfect 5th, and so on.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Compound interval</th><th>Equals (simple)</th></tr>
  </thead>
  <tbody>
    <tr><td>9th</td><td>2nd (+ octave)</td></tr>
    <tr><td>10th</td><td>3rd (+ octave)</td></tr>
    <tr><td>11th</td><td>4th (+ octave)</td></tr>
    <tr><td>12th</td><td>5th (+ octave)</td></tr>
    <tr><td>13th</td><td>6th (+ octave)</td></tr>
  </tbody>
</table>
</div>

<p>The <strong>octave</strong> marks the limit: every interval up to and including the 8th is simple, and only from the 9th upward do we speak of compound intervals. To review how intervals are counted and named, see the page on <a href="/diccionario-musical/intervalos/intervalos-musicales/">musical intervals</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a simple interval?</div>
      <div class="tm-faq-a">A simple interval is one that fits within an octave, that is, any interval from the unison up to the 8th. For example, a 5th from C to G is a simple interval.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a compound interval?</div>
      <div class="tm-faq-a">A compound interval is one that goes beyond the octave, that is, it is larger than an 8th. It equals a simple interval plus one or more octaves. For example, a 9th (C to the D in the next octave) is a 2nd plus an octave.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you reduce a compound interval to a simple one?</div>
      <div class="tm-faq-a">To find the equivalent simple interval, subtract 7 from the number of the compound interval: a 9th equals a 2nd, a 10th a 3rd, an 11th a 4th, a 12th a 5th and a 13th a 6th. The quality (major, minor, perfect…) stays the same.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is the octave a simple or a compound interval?</div>
      <div class="tm-faq-a">The octave is a simple interval: it marks the limit. Every interval up to and including the 8th is simple, and only from the 9th upward are intervals considered compound.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
