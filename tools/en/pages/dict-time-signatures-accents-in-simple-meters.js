const dictionaryPage = require('../dictionary-page');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/time-signatures/accents-in-simple-meters/',
  esPath: '/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-simples/',
  title: 'Accents in Simple Meter: Beats in 2/4, 3/4 and 4/4',
  description: 'Strong and weak beats in simple meter: 2/4, 3/4 and 4/4. The waltz pattern S-W-W and the 4/4 pattern S-W-M-W explained with staff examples.',
  h1: 'Rhythmic Accents in Simple Meters',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Time Signatures', '/diccionario-musical/compases/']],
  body: `<p>The <strong>rhythmic accents</strong> of simple meters describe how <strong>strong and weak beats</strong> are distributed inside each measure (UK: bar). This is the basis of musical meter: the ear groups the <strong>pulse</strong> into measures because the <strong>first beat</strong>, the strongest, marks the start of each one. Simple meters are the ones whose top number is 2, 3 or 4. Understanding this distribution is essential for <a href="/diccionario-musical/compases/sincopa/">syncopation</a>, for <a href="/diccionario-musical/compases/notas-a-contratiempo/">off-beat notes</a>, and for <a href="/diccionario-musical/compases/analizar-compases/">analyzing any time signature</a>. To see how it works in compound meters, read <a href="/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-compuestos/">accents in compound meters</a>.</p>

<p>This accent on the first beat is what lets you recognize the meter by ear. You can practice with the ear-training exercise <a href="/ejercicios/auditivos/reconocer-el-compas/">recognize the meter by ear</a>.</p>

<h2>Summary of accents in simple meters</h2>

<div class="tm-table-wrap"><table class="tm-table">
  <thead>
    <tr><th>Time signature</th><th>Beat 1</th><th>Beat 2</th><th>Beat 3</th><th>Beat 4</th><th>Typical styles</th></tr>
  </thead>
  <tbody>
    <tr><td>2/4 (duple)</td><td>Strong (S)</td><td>Weak (W)</td><td>—</td><td>—</td><td>Pasodoble, march, polka</td></tr>
    <tr><td>3/4 (triple)</td><td>Strong (S)</td><td>Weak (W)</td><td>Weak (W)</td><td>—</td><td>Waltz, minuet</td></tr>
    <tr><td>4/4 (quadruple)</td><td>Strong (S)</td><td>Weak (W)</td><td>Medium (M)</td><td>Weak (W)</td><td>Pop, rock, blues</td></tr>
  </tbody>
</table></div>

<p>The key difference from <a href="/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-compuestos/">compound meters</a> is that in simple meters each beat divides into two equal parts, while in compound meters it divides into three. When that duple subdivision is broken for a moment by putting three notes where two would fit, you get a <a href="/diccionario-musical/grupos-de-valoracion-especial/tresillo/">triplet</a>, the most common tuplet in these meters.</p>

<h2>Simple meter with 2 beats (2/4)</h2>

<p>Two beats: the first is <strong>strong</strong> and the second is <strong>weak</strong> (S-W). This is the simplest scheme. It is typical of the <strong>pasodoble</strong> (a Spanish march-like dance), the march and the polka.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/acentuacion-2-4.svg" width="215" height="150" alt="Accents in 2/4: beat 1 is strong and beat 2 is weak" loading="lazy" decoding="async"></figure>

<h2>Simple meter with 3 beats (3/4)</h2>

<p>Three beats: the first is <strong>strong</strong> and the other two are <strong>weak</strong> (S-W-W). This is the characteristic pattern of the waltz and the minuet.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/acentuacion-3-4.svg" width="277" height="150" alt="Accents in 3/4: beat 1 is strong and beats 2 and 3 are weak" loading="lazy" decoding="async"></figure>

<h2>Simple meter with 4 beats (4/4)</h2>

<p>Four beats: the first is <strong>strong</strong>, the third is <strong>medium-strong</strong> (a lighter secondary accent), and the second and fourth are <strong>weak</strong> (S-W-M-W). It is the most used meter in pop, rock and blues.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/compases/acentuacion-4-4.svg" width="434" height="150" alt="Accents in 4/4: strong, weak, medium-strong and weak" loading="lazy" decoding="async"></figure>

<h2>How it feels when you count</h2>

<p>The easiest way to internalize the accents is to count out loud, stressing the first beat (in capitals, the strongest):</p>
<ul>
  <li><strong>2/4</strong>: <strong>ONE</strong>-two · <strong>ONE</strong>-two</li>
  <li><strong>3/4</strong>: <strong>ONE</strong>-two-three · <strong>ONE</strong>-two-three (the sway of the waltz)</li>
  <li><strong>4/4</strong>: <strong>ONE</strong>-two-<strong>THREE</strong>-four (the "THREE" is the secondary, medium-strong accent)</li>
</ul>

<h2>The accent pattern repeats inside each beat</h2>

<p>The same principle works at every level of the measure. Inside each beat, its first <strong>half</strong> is strong compared with the second; and inside each half, the first <strong>subdivision</strong> is strong compared with the next. So although the main accent always falls on the first beat, every fraction has its own small strong-weak accent. Performers feel this hierarchy naturally, and it is what gives rhythm its natural flow.</p>

<h2>How do accents differ in simple and compound meters?</h2>

<p>The hierarchy of accents is the same; what changes is the <strong>subdivision</strong>. In <strong>simple</strong> meters each beat divides into <strong>two</strong> equal parts; in <a href="/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-compuestos/">compound meters</a> it divides into <strong>three</strong>, which gives a more swaying feel. That is why every simple meter has a compound "twin" with the same number of beats and the same accent pattern:</p>

<div class="tm-table-wrap"><table class="tm-table">
  <thead><tr><th>Simple meter</th><th>Compound meter</th><th>Beats</th><th>Accent pattern</th></tr></thead>
  <tbody>
    <tr><td>2/4</td><td>6/8</td><td>2</td><td>S-W</td></tr>
    <tr><td>3/4</td><td>9/8</td><td>3</td><td>S-W-W</td></tr>
    <tr><td>4/4</td><td>12/8</td><td>4</td><td>S-W-M-W</td></tr>
  </tbody>
</table></div>

<h2>Conclusion</h2>

<p>The rhythmic accents of simple meters organize the beats in a regular way, which makes the music easier to read and to perform. Identifying the <strong>strong and weak beats</strong> in 2/4, 3/4 and 4/4 is one of the first steps to understanding rhythm and how <a href="/diccionario-musical/figuras-musicales/">note values</a> combine inside each measure.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are rhythmic accents in simple meters?</div>
      <div class="tm-faq-a">Rhythmic accent is the distribution of strong and weak beats in each measure. In simple meters the first beat is always strong. In 2/4 the second beat is weak; in 3/4 beats 2 and 3 are weak; and in 4/4 the third beat is medium-strong and the fourth is weak.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which beat is strong in 3/4?</div>
      <div class="tm-faq-a">In 3/4, the first beat is strong and the second and third beats are weak. The strong-weak-weak pattern (S-W-W) is characteristic of the waltz.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a medium-strong beat in 4/4?</div>
      <div class="tm-faq-a">In 4/4, the third beat has an intermediate accent. The full pattern is: beat 1 strong, beat 2 weak, beat 3 medium-strong, beat 4 weak. This is the most common pattern in pop and rock.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the accents of 2/4?</div>
      <div class="tm-faq-a">In 2/4, the first beat is strong and the second is weak. The strong-weak pattern (S-W) is typical of the pasodoble, the march and the polka, and it is the simplest accent scheme of the simple meters.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How are rhythmic accents marked in the score?</div>
      <div class="tm-faq-a">The natural accents of a meter are not written: they are a convention that performers apply automatically. Explicit marks (&gt;, sf, fp) are expressive accents that go beyond the natural accentuation, and they are written only when the composer wants them.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a strong beat?</div>
      <div class="tm-faq-a">It is the accented beat of the measure, the one that is felt with the most weight. In every simple meter the first beat is always strong: it marks the start of each measure.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a weak beat?</div>
      <div class="tm-faq-a">It is a beat without a main accent, felt lighter than the strong beat. In 2/4 the weak beat is beat 2; in 3/4, beats 2 and 3; and in 4/4, beats 2 and 4 (beat 3 is medium-strong).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do simple meters always divide into two?</div>
      <div class="tm-faq-a">Yes: in a simple meter each beat divides into two equal parts. If each beat divides into three, it is a compound meter. That is why 3/4 (simple) and 6/8 (compound) are not the same, even though both add up to six eighth notes.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
