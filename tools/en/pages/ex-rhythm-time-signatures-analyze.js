const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/rhythm/time-signatures/analyze-time-signatures/',
  esPath: '/ejercicios/compases/analizar-compas/',
  title: 'Time Signature Analysis Quiz: Simple or Compound?',
  description: 'Practice analyzing time signatures: simple or compound, number of beats, subdivision and beat, subdivision and measure units. Free online quiz.',
  h1: 'Time Signature Analysis Exercises',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Time Signature Exercises', '/ejercicios/compases/']],
  scripts: ['compases-engine'],
  body: `<p>Each question shows a time signature. You identify its characteristics by clicking the options, and you press <strong>Check</strong> once you have answered all six questions.</p>

      <!-- WIDGET -->
      <div>
        <div id="tmcompas1"></div>
        <script>
          document.addEventListener('DOMContentLoaded', function () {
            tmCompasesEngine('tmcompas1');
            document.querySelectorAll('.tm-ref-nota').forEach(function (td) {
              var nota = td.dataset.nota;
              if (!nota || !window.tmNotaSVG) return;
              var parts = nota.split('+');
              if (parts.length === 2) {
                td.innerHTML = '<span class="tm-ref-nota-pair">'
                  + tmNotaSVG(parts[0])
                  + '<svg class="tm-ref-nota-tie" viewBox="0 0 38 8" xmlns="http://www.w3.org/2000/svg"><path d="M1,2 C9,7 29,7 37,2" fill="none" stroke="#333" stroke-width="1.6" stroke-linecap="round"/></svg>'
                  + tmNotaSVG(parts[1])
                  + '</span>';
              } else {
                td.innerHTML = tmNotaSVG(nota);
              }
            });
          });
        </script>
      </div>

      <!-- REFERENCE THEORY -->
      <h2>Quick guide: how to analyze a time signature</h2>

      <h3>Simple vs. compound meter</h3>
      <p>A meter is <strong>simple</strong> when each beat divides into two equal parts (binary subdivision). It is <strong>compound</strong> when each beat divides into three (ternary subdivision). The practical rule: if the top number is 2, 3 or 4, the meter is simple; if it is 6, 9 or 12, it is compound. (This is a rule of thumb: for instance 3/8 and 6/8 follow it, while irregular meters such as 5/4 or 7/8 are a separate case.)</p>

      <h3>Number of beats</h3>
      <p>In simple meters the top number is the number of beats. In compound meters, divide the top number by 3: 6/8 has 2 beats, 9/8 has 3 and 12/8 has 4.</p>

      <h3>Units</h3>
      <p>The <strong>beat unit</strong> is the note value that lasts one beat. In simple meters it matches the bottom number (4 = quarter note, 2 = half note, 8 = eighth note). In compound meters the bottom number gives the note value that is grouped in threes (for example, the eighth note when the bottom number is 8), and the beat unit is the next larger note value with a dot (a dotted quarter note when the bottom number is 8). The <strong>subdivision unit</strong> is half the beat unit in simple meters, and the note value of the bottom number itself in compound meters. The <strong>measure unit</strong> is the note value that lasts the whole measure (UK: bar): you get it by multiplying the beat unit by the number of beats.</p>

      <h3>Summary table</h3>
      <style>
        .tm-ref-nota { padding:6px 8px !important; text-align:center; border:1px solid #e8e0cc; }
        .tm-ref-nota svg:not(.tm-ref-nota-tie) { height:42px; width:auto; min-width:38px; display:inline-block; vertical-align:middle; }
        .tm-ref-nota-pair { display:inline-flex; align-items:center; gap:0; }
        .tm-ref-nota-tie { width:32px !important; height:8px !important; display:inline-block; flex-shrink:0; margin-top:22px; }
      </style>
      <div class="tm-table-wrap">
        <table class="tm-table" id="tm-tabla-compases">
          <thead>
            <tr>
              <th>Time signature</th>
              <th>Type</th>
              <th>Beats</th>
              <th>Subdivision</th>
              <th>Beat unit</th>
              <th>Subdivision unit</th>
              <th>Measure unit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>2/4</strong></td>
              <td>Simple</td>
              <td>2</td>
              <td>Binary</td>
              <td class="tm-ref-nota" data-nota="n">♩</td>
              <td class="tm-ref-nota" data-nota="c">♪</td>
              <td class="tm-ref-nota" data-nota="b">𝅗𝅥</td>
            </tr>
            <tr>
              <td><strong>3/4</strong></td>
              <td>Simple</td>
              <td>3</td>
              <td>Binary</td>
              <td class="tm-ref-nota" data-nota="n"></td>
              <td class="tm-ref-nota" data-nota="c"></td>
              <td class="tm-ref-nota" data-nota="bP"></td>
            </tr>
            <tr>
              <td><strong>4/4</strong></td>
              <td>Simple</td>
              <td>4</td>
              <td>Binary</td>
              <td class="tm-ref-nota" data-nota="n"></td>
              <td class="tm-ref-nota" data-nota="c"></td>
              <td class="tm-ref-nota" data-nota="r"></td>
            </tr>
            <tr>
              <td><strong>2/2</strong></td>
              <td>Simple</td>
              <td>2</td>
              <td>Binary</td>
              <td class="tm-ref-nota" data-nota="b"></td>
              <td class="tm-ref-nota" data-nota="n"></td>
              <td class="tm-ref-nota" data-nota="r"></td>
            </tr>
            <tr>
              <td><strong>3/8</strong></td>
              <td>Simple</td>
              <td>3</td>
              <td>Binary</td>
              <td class="tm-ref-nota" data-nota="c"></td>
              <td class="tm-ref-nota" data-nota="sc"></td>
              <td class="tm-ref-nota" data-nota="nP"></td>
            </tr>
            <tr>
              <td><strong>6/8</strong></td>
              <td>Compound</td>
              <td>2</td>
              <td>Ternary</td>
              <td class="tm-ref-nota" data-nota="nP"></td>
              <td class="tm-ref-nota" data-nota="c"></td>
              <td class="tm-ref-nota" data-nota="bP"></td>
            </tr>
            <tr>
              <td><strong>9/8</strong></td>
              <td>Compound</td>
              <td>3</td>
              <td>Ternary</td>
              <td class="tm-ref-nota" data-nota="nP"></td>
              <td class="tm-ref-nota" data-nota="c"></td>
              <td class="tm-ref-nota" data-nota="bP+nP"></td>
            </tr>
            <tr>
              <td><strong>12/8</strong></td>
              <td>Compound</td>
              <td>4</td>
              <td>Ternary</td>
              <td class="tm-ref-nota" data-nota="nP"></td>
              <td class="tm-ref-nota" data-nota="c"></td>
              <td class="tm-ref-nota" data-nota="rP"></td>
            </tr>
            <tr>
              <td><strong>6/4</strong></td>
              <td>Compound</td>
              <td>2</td>
              <td>Ternary</td>
              <td class="tm-ref-nota" data-nota="bP"></td>
              <td class="tm-ref-nota" data-nota="n"></td>
              <td class="tm-ref-nota" data-nota="rP"></td>
            </tr>
            <tr>
              <td><strong>9/4</strong></td>
              <td>Compound</td>
              <td>3</td>
              <td>Ternary</td>
              <td class="tm-ref-nota" data-nota="bP"></td>
              <td class="tm-ref-nota" data-nota="n"></td>
              <td class="tm-ref-nota" data-nota="rP+bP"></td>
            </tr>
          </tbody>
        </table>
      </div>

<p>The next step is <a href="/ejercicios/compases/completar-compas/">completing measures</a>: a measure is missing a note or a rest and you say which one. And to check that you really understand the time signature, <a href="/ejercicios/compases/reconocer-compas/">recognize the time signature</a> works the other way around: you see the written rhythm, without the time signature, and you work it out. All the exercises are in the <a href="/ejercicios/compases/">time signature exercises index</a>.</p>

<!-- ficha-compases -->
<h2>Time signature worksheet to print (PDF)</h2>
<p>The same exercise on paper, for class: <strong>20 time signatures</strong> on one A4 sheet, with a column for each thing to work out (type, beats, subdivision, beat unit, subdivision unit and measure unit) and a separate <strong>answer sheet</strong>.</p>
<p>The time signatures go from the common to the unusual: first the usual simple ones (2/4, 3/4, 4/4…), then the common compound ones (6/8, 9/8, 12/8…), and finally those with a rare denominator (2/1, 9/4, 9/16…), which are the ones that really force you to reason out the rule instead of recalling it from memory.</p>
<figure class="tm-staff">
  <a href="/assets/img/compases/fichas/ficha-analizar-compases.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/compases/fichas/preview-ficha-analizar-compases.webp"><img src="/assets/img/compases/fichas/preview-ficha-analizar-compases.png" width="300" height="424" loading="lazy" alt="Printable PDF worksheet with 20 time signatures to analyze: type, beats, subdivision and units"></picture></a>
  <figcaption>A4 sheet with 20 time signatures to analyze.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/compases/fichas/ficha-analizar-compases.pdf" target="_blank" rel="noopener">Download the worksheet (A4 PDF)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/compases/fichas/ficha-analizar-compases-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>You can print and photocopy it freely for class. The answer sheet is the same worksheet with the answers in red, so you check it by laying one over the other. Units are written with the note, not with its name: the reference table above works as a reminder while you fill it in.</p>
<!-- /ficha-compases -->

<p>The full theory is on the page about <a href="/diccionario-musical/compases/">time signatures</a>. The 2/2 in the table is <a href="/diccionario-musical/compases/compas-partido/">cut time (alla breve)</a>, which has its own page. The <a href="/herramientas/metronomo/">online metronome</a> helps you internalize the different kinds of meter.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I tell whether a time signature is simple or compound?</div>
      <div class="tm-faq-a">Look at how the beat divides. If each beat splits into two equal parts, the meter is simple; if it splits into three, it is compound. As a quick rule, a top number of 2, 3 or 4 means simple, and 6, 9 or 12 means compound.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many beats does 6/8 have?</div>
      <div class="tm-faq-a">Two. In compound meters you divide the top number by 3, because the eighth notes are grouped in threes: 6/8 has 2 beats, 9/8 has 3 and 12/8 has 4. The beat unit is the dotted quarter note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the beat unit, subdivision unit and measure unit?</div>
      <div class="tm-faq-a">The beat unit is the note value that lasts one beat. The subdivision unit is the note value into which the beat divides (half the beat unit in simple meters, a third in compound meters). The measure unit is the single note value that lasts the whole measure, such as a dotted half note in 3/4.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
