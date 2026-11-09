const dictionaryPage = require('../dictionary-page');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/time-signatures/accents-in-compound-meters/',
  esPath: '/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-compuestos/',
  title: 'Accents in Compound Meter: Beats in 6/8, 9/8 and 12/8',
  description: 'Strong and weak beats in compound meter: 6/8, 9/8 and 12/8. Why 6/8 is not 3/4, and how compound meters differ from simple ones.',
  h1: 'Rhythmic Accents in Compound Meters',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Time Signatures', '/diccionario-musical/compases/']],
  body: `<p>The <strong>rhythmic accents</strong> of compound meters describe how strong and weak beats are distributed when the subdivision is triple. In practice the most common ones have 6, 9 or 12 as the top number, but their defining feature is that <strong>each beat divides into three equal parts</strong> (triple subdivision). Understanding this distribution is essential for <a href="/diccionario-musical/compases/sincopa/">syncopation</a> and <a href="/diccionario-musical/compases/notas-a-contratiempo/">off-beat notes</a>. To see how it works in simple meters, read <a href="/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-simples/">accents in simple meters</a>.</p>

<p>This accent on the first beat is what lets you recognize the meter by ear. You can practice with the ear-training exercise <a href="/ejercicios/auditivos/reconocer-el-compas/">recognize the meter by ear</a>.</p>

<h2>Summary of accents in compound meters</h2>

<div class="tm-table-wrap"><table class="tm-table">
  <thead>
    <tr><th>Time signature</th><th>Beats</th><th>Beat 1</th><th>Beat 2</th><th>Beat 3</th><th>Beat 4</th><th>Typical styles</th></tr>
  </thead>
  <tbody>
    <tr><td>6/8</td><td>2 triple beats</td><td>Strong (S)</td><td>Weak (W)</td><td>—</td><td>—</td><td>Jig, tarantella</td></tr>
    <tr><td>9/8</td><td>3 triple beats</td><td>Strong (S)</td><td>Weak (W)</td><td>Weak (W)</td><td>—</td><td>Some Baroque dances, folk music</td></tr>
    <tr><td>12/8</td><td>4 triple beats</td><td>Strong (S)</td><td>Weak (W)</td><td>Medium (M)</td><td>Weak (W)</td><td>Slow ballad, blues</td></tr>
  </tbody>
</table></div>

<p>The essential difference from <a href="/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-simples/">simple meters</a> is the subdivision: in compound meters each beat divides into <strong>three</strong> equal parts (eighth notes in 6/8, 9/8 and 12/8; UK: quavers), while in simple meters it divides into two. When that triple subdivision is altered by putting two notes where three would fit, you get a <a href="/diccionario-musical/grupos-de-valoracion-especial/dosillo/">duplet</a>, the tuplet typical of compound meters.</p>

<h2>Compound meter with 2 beats (6/8)</h2>

<p>Two triple beats: the first is <strong>strong</strong> and the second is <strong>weak</strong> (S-W). Each beat is a <strong>dotted quarter note</strong> (UK: dotted crotchet), which equals three eighth notes. This is the pattern of the jig and the tarantella. See the page on <a href="/diccionario-musical/compases/compas-de-6-8/">the 6/8 time signature</a>, with examples on the staff.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/acentuacion-6-8.svg" width="220" height="150" alt="Accents in 6/8: beat 1 is strong and beat 2 is weak" loading="lazy" decoding="async"></figure>

<h2>Compound meter with 3 beats (9/8)</h2>

<p>Three triple beats: the first is <strong>strong</strong> and the other two are <strong>weak</strong> (S-W-W). It appears in some Baroque dances and in a lot of folk music.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/acentuacion-9-8.svg" width="286" height="150" alt="Accents in 9/8: beat 1 is strong and beats 2 and 3 are weak" loading="lazy" decoding="async"></figure>

<h2>Compound meter with 4 beats (12/8)</h2>

<p>Four triple beats: the first is <strong>strong</strong>, the third is <strong>medium-strong</strong>, and the second and fourth are <strong>weak</strong> (S-W-M-W). It is typical of slow ballads and of a lot of blues and slow rock.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/acentuacion-12-8.svg" width="416" height="150" alt="Accents in 12/8: strong, weak, medium-strong and weak" loading="lazy" decoding="async"></figure>

<h2>The accent pattern repeats inside each beat</h2>

<p>As in <a href="/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-simples/">simple meters</a>, inside each beat the <strong>first</strong> of its three subdivisions (eighth notes) gets a small relative accent and the other two are lighter. This inner pattern <strong>does not replace</strong> the main accent of the measure, which always falls on the first beat.</p>

<h2>Why is 6/8 not the same as 3/4?</h2>
<p>This is the most common confusion, because <strong>both contain six eighth notes</strong>. The difference is in how they are grouped:</p>
<ul>
  <li><strong>3/4</strong>: <strong>three</strong> beats, each divided into <strong>two</strong> (duple subdivision). The eighth notes are grouped 2+2+2.</li>
  <li><strong>6/8</strong>: <strong>two</strong> beats, each divided into <strong>three</strong> (triple subdivision). The eighth notes are grouped 3+3.</li>
</ul>
<figure class="tm-staff"><img src="/assets/img/notacion/compases/seis-corcheas-34-vs-68.svg" width="383" height="386" alt="The same six eighth notes grouped as 3/4 (three beats, 2+2+2) and as 6/8 (two beats, 3+3)" loading="lazy" decoding="async"><figcaption>The same six eighth notes: in 3/4 they are grouped <strong>2+2+2</strong> (three beats); in 6/8, <strong>3+3</strong> (two beats).</figcaption></figure>
<p>That is why <strong>6/8 sounds more flowing and rocking</strong>, like Irish jigs and barcarolles, while <strong>3/4 gives a clear three-beat pulse</strong>, like the waltz.</p>

<h2>Simple and compound meters side by side</h2>
<p>Every compound meter has a simple "twin" with the same number of beats and the same hierarchy of accents. The only thing that changes is the subdivision: duple in the simple meter, triple in the compound one.</p>
<div class="tm-table-wrap"><table class="tm-table">
  <thead><tr><th>Simple meter</th><th>Compound meter</th><th>Beats</th><th>Accent pattern</th></tr></thead>
  <tbody>
    <tr><td>2/4</td><td>6/8</td><td>2</td><td>S-W</td></tr>
    <tr><td>3/4</td><td>9/8</td><td>3</td><td>S-W-W</td></tr>
    <tr><td>4/4</td><td>12/8</td><td>4</td><td>S-W-M-W</td></tr>
  </tbody>
</table></div>

<details style="margin:1.3rem 0;padding:.7rem 1.1rem;background:var(--bg-alt);border-radius:var(--radius-sm);">
  <summary><strong>Check yourself:</strong> what accent pattern does 12/8 have?</summary>
  <p style="margin:.6rem 0 0;">Four triple beats with the pattern <strong>S-W-M-W</strong> (strong, weak, medium-strong, weak), the same as its simple twin, 4/4.</p>
</details>

<h2>In summary</h2>
<p>In compound meters the hierarchy of beats is the same as in the equivalent simple meters; what changes is that <strong>each beat divides into three equal parts</strong>. This triple subdivision gives a more rocking rhythmic feel and affects how <a href="/diccionario-musical/compases/sincopa/">syncopation</a>, <a href="/diccionario-musical/compases/notas-a-contratiempo/">off-beat notes</a> and <a href="/diccionario-musical/grupos-de-valoracion-especial/">tuplets</a> are written.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are rhythmic accents in compound meters?</div>
      <div class="tm-faq-a">In compound meters each beat divides into three equal parts. The first beat is always strong. In 6/8 the second beat is weak; in 9/8 beats 2 and 3 are weak; and in 12/8 the third beat is medium-strong and the fourth is weak.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which beat is strong in 6/8?</div>
      <div class="tm-faq-a">In 6/8, the first beat is strong and the second beat is weak. This meter, with triple subdivision and two beats, is typical of the jig and many folk styles.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between 6/8 and 3/4?</div>
      <div class="tm-faq-a">Both contain six eighth notes, but 3/4 has three beats with duple subdivision (simple meter), while 6/8 has two beats with triple subdivision (compound meter). 6/8 sounds more flowing and rocking than 3/4.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the accents of 9/8?</div>
      <div class="tm-faq-a">9/8 has three beats with triple subdivision. The pattern is strong-weak-weak (S-W-W), the same as in 3/4 but with each beat divided into three eighth notes. It is the compound triple meter.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the accents of 12/8?</div>
      <div class="tm-faq-a">12/8 has four triple beats with the pattern S-W-M-W (strong, weak, medium-strong, weak), equivalent to 4/4 but with triple subdivision. It is used in slow ballads, where the triple subdivision gives a flowing, rocking character.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
