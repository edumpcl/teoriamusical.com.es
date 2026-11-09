const dictionaryPage = require('../dictionary-page');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/time-signatures/analyzing-time-signatures/',
  esPath: '/diccionario-musical/compases/analizar-compases/',
  title: 'How to Analyze Time Signatures: A Practical Guide',
  description: 'How to read a time signature: the top number gives the beats and the bottom number the note value. Tell simple from compound meter step by step.',
  h1: 'Analyzing Time Signatures',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Time Signatures', '/diccionario-musical/compases/']],
  crumbLabel: 'Analyzing Time Signatures',
  body: `<p>To analyze a time signature, you read its two stacked numbers at the beginning of the score and work out four key facts: whether the meter is simple or compound, how many beats each measure (UK: bar) has, what the beat unit is, and what the subdivision unit is. Each step is explained below.</p>

<p>Analyzing a time signature takes four steps:</p>

<ol>
  <li><strong>Decide whether it is simple or compound</strong> by looking at the top number (2, 3 or 4 → simple; 6, 9 or 12 → compound).</li>
  <li><strong>Count the beats</strong> in each measure.</li>
  <li><strong>Identify the beat unit:</strong> the note value that lasts one beat.</li>
  <li><strong>Identify the subdivision unit:</strong> the note value each beat is divided into.</li>
</ol>

<h2>What does each number mean?</h2>

<p>The <strong>top number</strong> (numerator) tells you how many times the bottom number's note value fits in the measure.</p>

<p>The <strong>bottom number</strong> (denominator) stands for a note value. It tells you how many notes of that value fit in a whole note (UK: semibreve):</p>

<ul>
  <li>1 = whole note</li>
  <li>2 = half note (UK: minim)</li>
  <li>4 = quarter note (UK: crotchet)</li>
  <li>8 = eighth note (UK: quaver)</li>
  <li>16 = sixteenth note (UK: semiquaver)</li>
  <li>32 = thirty-second note (UK: demisemiquaver)</li>
  <li>64 = sixty-fourth note (UK: hemidemisemiquaver)</li>
</ul>

<h2>Common time (C) and cut time (¢)</h2>
<p>Besides numbers, there are <strong>two symbols</strong>, inherited from early notation, that stand in for certain time signatures:</p>
<div class="tm-img-grid-2">
  <figure class="tm-staff"><img src="/assets/img/notacion/compases/compasillo.svg" width="186" height="122" alt="The common time symbol (C) on the staff, equivalent to 4/4" loading="lazy" decoding="async"><figcaption><strong>C</strong> (common time) = 4/4</figcaption></figure>
  <figure class="tm-staff"><img src="/assets/img/notacion/compases/alla-breve.svg" width="186" height="122" alt="The cut time or alla breve symbol (C with a vertical line) on the staff, equivalent to 2/2" loading="lazy" decoding="async"><figcaption><strong>¢</strong> (cut time) = 2/2</figcaption></figure>
</div>
<p>The <strong>C</strong> (common time) equals <strong>4/4</strong>. The <strong>crossed C</strong> (<a href="/diccionario-musical/compases/compas-partido/"><em>cut time</em></a> or <em>alla breve</em>) equals <strong>2/2</strong>: the same music is counted in <strong>two half-note beats</strong> instead of four quarter-note beats, which gives it a lighter, quicker feel.</p>

<h2>Simple or compound meter</h2>

<p>To decide whether a meter is simple or compound, look at the top number:</p>

<ul>
  <li>If the top number is <strong>2, 3 or 4</strong>, the meter is <strong>simple</strong>.</li>
  <li>If the top number is <strong>6, 9 or 12</strong>, the meter is <strong>compound</strong>.</li>
</ul>

<div class="tm-img-grid-2">
  <figure class="tm-staff"><img src="/assets/img/notacion/compases/unidad-de-tiempo.svg" width="263" height="122" alt="A measure of 4/4: four quarter notes, a simple meter" loading="lazy" decoding="async"><figcaption>4/4 — simple meter (4 quarter-note beats).</figcaption></figure>
  <figure class="tm-staff"><img src="/assets/img/notacion/compases/compas-compuesto-68.svg" width="257" height="122" alt="A measure of 6/8: six eighth notes in two groups, a compound meter" loading="lazy" decoding="async"><figcaption>6/8 — compound meter (2 dotted-quarter-note beats).</figcaption></figure>
</div>

<h2>Number of beats</h2>

<h3>If the meter is simple</h3>

<p>The top number gives the number of beats directly.</p>

<p>Examples:</p>

<ul>
  <li>2/4 → 2 beats</li>
  <li>2/1 → 2 beats</li>
  <li>3/1 → 3 beats</li>
  <li>4/16 → 4 beats</li>
</ul>

<h3>If the meter is compound</h3>

<p>Divide the top number by 3 to get the number of beats.</p>

<p>Examples:</p>

<ul>
  <li>6/4 → 2 beats (6÷3)</li>
  <li>6/2 → 2 beats (6÷3)</li>
  <li>9/8 → 3 beats (9÷3)</li>
  <li>12/16 → 4 beats (12÷3)</li>
</ul>

<h2>Beat unit</h2>

<p>To find the note value of one beat, first decide whether the meter is simple or compound.</p>

<h3>If the meter is simple</h3>

<p>The bottom number gives the beat unit directly: the note value that matches that number is one beat.</p>

<p>Examples:</p>

<ul>
  <li>3/2 → beat unit: half note</li>
  <li>4/1 → beat unit: whole note</li>
  <li>2/16 → beat unit: sixteenth note</li>
</ul>

<h3>If the meter is compound</h3>

<p>Take the note value that matches the bottom number, move up one step in the scale of note values, and add a dot.</p>

<p>Examples:</p>

<ul>
  <li>6/2 → beat unit: dotted whole note</li>
  <li>9/4 → beat unit: dotted half note</li>
  <li>12/16 → beat unit: dotted eighth note</li>
</ul>

<h2>Subdivision unit</h2>

<p>The subdivision unit is the note value that each beat is divided into.</p>

<h3>If the meter is simple</h3>

<p>Start from the beat unit and move down one step in the scale of note values.</p>

<p>Examples:</p>

<ul>
  <li>4/16 → subdivision unit: thirty-second note</li>
  <li>3/2 → subdivision unit: quarter note</li>
  <li>2/8 → subdivision unit: sixteenth note</li>
</ul>

<h3>If the meter is compound</h3>

<p>The bottom number itself gives the subdivision unit.</p>

<p>Examples:</p>

<ul>
  <li>6/4 → subdivision unit: quarter note</li>
  <li>9/2 → subdivision unit: half note</li>
  <li>12/8 → subdivision unit: eighth note</li>
</ul>

<h2>Measure unit</h2>

<p>The measure unit is the total length of one whole measure. You get it by multiplying the beat unit by the number of beats.</p>

<p>Examples:</p>

<ul>
  <li>2/2 → measure unit: whole note</li>
  <li>3/8 → measure unit: dotted quarter note</li>
  <li>6/4 → measure unit: dotted whole note</li>
  <li>9/16 → measure unit: dotted quarter note tied to a dotted eighth note</li>
</ul>

<h2 id="h-table-of-time-signatures">Table of the most common time signatures</h2>

<p>The following table sums up the full analysis of the most common time signatures in Western music:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Time signature</th><th>Type</th><th>Beats</th><th>Beat unit</th><th>Subdivision unit</th></tr>
  </thead>
  <tbody>
    <tr><td><strong><a href="/diccionario-musical/compases/compas-de-2-4/">2/4</a></strong></td><td>Simple duple</td><td>2</td><td>Quarter note</td><td>Eighth note</td></tr>
    <tr><td><strong><a href="/diccionario-musical/compases/compas-de-3-4/">3/4</a></strong></td><td>Simple triple</td><td>3</td><td>Quarter note</td><td>Eighth note</td></tr>
    <tr><td><strong><a href="/diccionario-musical/compases/compas-de-4-4/">4/4</a></strong></td><td>Simple quadruple</td><td>4</td><td>Quarter note</td><td>Eighth note</td></tr>
    <tr><td><strong>2/2</strong></td><td>Simple duple</td><td>2</td><td>Half note</td><td>Quarter note</td></tr>
    <tr><td><strong><a href="/diccionario-musical/compases/compas-de-3-2/">3/2</a></strong></td><td>Simple triple</td><td>3</td><td>Half note</td><td>Quarter note</td></tr>
    <tr><td><strong><a href="/diccionario-musical/compases/compas-de-3-8/">3/8</a></strong></td><td>Simple triple</td><td>3</td><td>Eighth note</td><td>Sixteenth note</td></tr>
    <tr><td><strong><a href="/diccionario-musical/compases/compas-de-6-8/">6/8</a></strong></td><td>Compound duple</td><td>2</td><td>Dotted quarter note</td><td>Eighth note</td></tr>
    <tr><td><strong><a href="/diccionario-musical/compases/compas-de-9-8/">9/8</a></strong></td><td>Compound triple</td><td>3</td><td>Dotted quarter note</td><td>Eighth note</td></tr>
    <tr><td><strong><a href="/diccionario-musical/compases/compas-de-12-8/">12/8</a></strong></td><td>Compound quadruple</td><td>4</td><td>Dotted quarter note</td><td>Eighth note</td></tr>
    <tr><td><strong><a href="/diccionario-musical/compases/compas-de-6-4/">6/4</a></strong></td><td>Compound duple</td><td>2</td><td>Dotted half note</td><td>Quarter note</td></tr>
    <tr><td><strong>9/4</strong></td><td>Compound triple</td><td>3</td><td>Dotted half note</td><td>Quarter note</td></tr>
    <tr><td><strong>12/16</strong></td><td>Compound quadruple</td><td>4</td><td>Dotted eighth note</td><td>Sixteenth note</td></tr>
  </tbody>
</table>
</div>

<h2 id="h-duple-triple-quadruple">Duple, triple and quadruple</h2>

<p>Besides simple or compound, meters are classified by the number of beats:</p>
<ul>
  <li><strong>Duple:</strong> 2 beats. Strong-weak accents (2/4, 6/8).</li>
  <li><strong>Triple:</strong> 3 beats. Strong-weak-weak accents (3/4, 9/8). Typical of waltzes.</li>
  <li><strong>Quadruple:</strong> 4 beats. Strong-weak-medium-weak accents (4/4, 12/8). The most common meter in popular music.</li>
</ul>

<p>To <strong>identify the time signature</strong> step by step, practice with the <a href="/ejercicios/compases/analizar-compas/">interactive time signature analysis exercises</a>, which show you the numbers and check your answer. See also the full catalog of <a href="/diccionario-musical/compases/">time signatures</a> with examples of each category.</p>

<h2>Irregular (asymmetrical) meters</h2>
<p>Some meters are neither purely simple nor purely compound, because they combine groups of different lengths. These are <strong>irregular</strong> or asymmetrical meters, with top numbers such as <strong>5</strong> or <strong>7</strong>. Their beats are grouped unevenly:</p>
<ul>
  <li><strong>5/8</strong>: grouped as 2+3 or 3+2 eighth notes.</li>
  <li><strong>7/8</strong>: grouped as 2+2+3, 3+2+2, and so on.</li>
</ul>
<p>They appear in traditional music (such as the Basque <em>zortziko</em>, in 5/8), in Balkan folk music and in progressive rock.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How can you tell if a meter is simple or compound?</div>
      <div class="tm-faq-a">The top number of the time signature decides it. If the top number is 2, 3 or 4, the meter is simple. If it is 6, 9 or 12, the meter is compound.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does the bottom number of a time signature mean?</div>
      <div class="tm-faq-a">The bottom number stands for the reference note value: 1 = whole note, 2 = half note, 4 = quarter note, 8 = eighth note, 16 = sixteenth note. In simple meters the bottom number is directly the beat unit.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many beats does a compound meter have?</div>
      <div class="tm-faq-a">In a compound meter, the number of beats is the top number divided by 3. For example: 6/8 has 2 beats, 9/8 has 3 beats and 12/8 has 4 beats.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the measure unit and how is it calculated?</div>
      <div class="tm-faq-a">The measure unit is the total length of one whole measure: the beat unit multiplied by the number of beats. For example, in 6/8 the beat unit is a dotted quarter note and there are 2 beats, so the measure unit is a dotted half note (six eighth notes). In 3/4 it is a dotted half note as well (three quarter notes).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you analyze 4/4?</div>
      <div class="tm-faq-a">In 4/4 the top number (4) gives 4 beats per measure and the bottom number (4 = quarter note) tells you that each beat is a quarter note. It is a simple quadruple meter. Each measure holds 4 quarter notes, 8 eighth notes or 2 half notes.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
