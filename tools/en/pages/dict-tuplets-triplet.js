const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/tuplets/triplet/',
  esPath: '/diccionario-musical/grupos-de-valoracion-especial/tresillo/',
  title: 'Triplets in Music: What They Are and How to Count Them',
  description: 'A triplet fits three equal notes into the time of two. Learn how to write and count triplets, the main types, and how a triplet differs from 6/8.',
  h1: 'The Triplet',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Tuplets', '/diccionario-musical/grupos-de-valoracion-especial/']],
  body: `<p>A <strong>triplet</strong> is a <a href="/diccionario-musical/grupos-de-valoracion-especial/">tuplet</a>: <strong>three equal notes played in the time normally taken by two</strong> notes of the same kind. In other words, it divides a beat (or a note) into <strong>three equal parts</strong> instead of two, which is how you place a group of three inside simple meter. It is marked with a <strong>number 3</strong> over the group, usually with a bracket or under the same beam.</p>

<h2>Two eighth notes versus a triplet</h2>
<p>The easiest way to understand it is to compare a beat divided <strong>in two</strong> (the normal division in simple meter) with the same beat divided <strong>in three</strong> by a triplet. Both last exactly the same amount of time:</p>
<figure class="tm-staff"><img src="/assets/img/notacion/compases/tresillo-comparacion.svg" width="303" height="150" alt="In 2/4 time, one beat with two regular eighth notes next to another beat with a triplet of three eighth notes marked with the number 3" loading="lazy" decoding="async"><figcaption>The same beat: on the left, two eighth notes (UK: quavers); on the right, a <strong>triplet</strong> of three eighth notes (with its “3”). They last the same time.</figcaption></figure>

<h2>How it is written: the bracket and the number 3</h2>
<p>A triplet always has a <strong>number 3</strong>. What changes is what goes with it:</p>
<ul>
  <li>With notes that are <strong>joined by a beam</strong> (eighth notes, sixteenth notes), the beam already groups the notes, so the <strong>3</strong> above the group is usually enough, with no bracket.</li>
  <li>With <strong>separate</strong> notes (quarter notes, half notes), or when the group mixes notes and rests, a <strong>bracket</strong> is added over the whole group, with the 3 in the middle.</li>
</ul>
<p>The number and bracket go on the stem side of the notes, almost always above the group.</p>

<h2>How to count and play a triplet</h2>
<p>To play it, divide the beat into <strong>three perfectly equal parts</strong> instead of two. A reliable trick is to say a three-syllable word on each beat, spread evenly. The most common choice is the word <strong>“trip-a-let”</strong>:</p>
<ul>
  <li>Normal beat (two parts): <strong>“ONE – and”</strong>.</li>
  <li>Triplet (three equal parts): <strong>“TRIP-a-let”</strong>.</li>
</ul>
<p>The most common mistake is to squeeze the last two notes together so the triplet turns into a dotted rhythm. All three notes must be spaced exactly evenly.</p>
<p>To play it accurately, start <strong>very slowly</strong>, say “trip-a-let” out loud, and use the <a href="/herramientas/metronomo/">metronome</a> at a comfortable tempo before speeding up. The slower you practice, the more even the three notes will be.</p>

<h2>Types of triplet</h2>
<p>Any note value can be turned into a triplet. A triplet always <strong>equals two notes of the same kind</strong>:</p>
<figure class="tm-staff"><img src="/assets/img/notacion/compases/tipos-de-tresillo.svg" width="304" height="477" alt="Three types of triplet: quarter-note triplet (three quarter notes), eighth-note triplet (three eighth notes) and sixteenth-note triplet (three sixteenth notes), each with its number 3" loading="lazy" decoding="async"><figcaption><strong>Quarter-note</strong>, <strong>eighth-note</strong> and <strong>sixteenth-note</strong> triplets.</figcaption></figure>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Triplet</th><th>It is…</th><th>It takes the time of</th></tr></thead>
  <tbody>
    <tr><td>Half-note triplet</td><td>3 half notes</td><td>a whole note (2 half notes)</td></tr>
    <tr><td>Quarter-note triplet</td><td>3 quarter notes</td><td>a half note (2 quarter notes)</td></tr>
    <tr><td><strong>Eighth-note triplet</strong> (the most common)</td><td>3 eighth notes</td><td>a quarter note (2 eighth notes)</td></tr>
    <tr><td>Sixteenth-note triplet</td><td>3 sixteenth notes</td><td>an eighth note (2 sixteenth notes)</td></tr>
  </tbody>
</table>
</div>
<p>A triplet can also contain <strong>rests</strong> or <a href="/diccionario-musical/ligaduras/">tied notes</a> instead of three separate notes, as long as together they add up to the value of three.</p>

<h2>Triplet and 6/8: they are not the same</h2>
<p>This is the most common confusion, because in both cases you hear groups of three. The difference is whether that division into three is the <strong>exception</strong> or the <strong>rule</strong>:</p>
<ul>
  <li><strong>Triplet</strong>: appears <strong>occasionally</strong> inside <a href="/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-simples/">simple meter</a>, whose natural subdivision is into two. The “3” warns you that here, and only here, the beat is divided in three.</li>
  <li><strong>6/8</strong> and other <a href="/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-compuestos/">compound meters</a>: the division into three is the <strong>norm</strong> for the whole measure (UK: bar), so no “3” needs to be written.</li>
</ul>

<h2>The “Latin tresillo”: a rhythmic cell (that is not a triplet)</h2>
<p>To avoid confusion: the <strong>tresillo</strong> (also called the Cuban tresillo) is a <strong>rhythmic pattern</strong> that splits the eight eighth notes of a 4/4 measure into groups of <strong>3 + 3 + 2</strong>. Strictly speaking it is <strong>not a tuplet</strong>, because it does not divide any beat into three in an irregular way. It is a rhythmic cell whose name comes from the Spanish word for triplet because it groups the eighth notes in threes.</p>
<figure class="tm-staff"><img src="/assets/img/notacion/compases/tresillo-latino.svg" width="243" height="150" alt="The Latin tresillo pattern: in 4/4, two dotted quarter notes and a quarter note, grouping the eighth notes as 3+3+2" loading="lazy" decoding="async"><figcaption>The Latin tresillo: the eighth notes of the measure grouped as <strong>3 + 3 + 2</strong>.</figcaption></figure>
<p>It is the rhythmic basis of the <strong>habanera</strong> and of the <strong>Cuban son</strong>, and it appears in many Latin styles. Tito Puente’s “Oye cómo va” is built on it.</p>

<h2>Where are triplets used?</h2>
<p>Triplets (the tuplet kind) are everywhere: in the <strong>swing</strong> and <strong>shuffle</strong> feel of jazz and blues, in many ballads, and in countless popular melodies. In classical music they are just as common: the first movement of Beethoven’s <em>Moonlight Sonata</em> is built almost entirely on <strong>eighth-note triplets</strong>, and Chopin’s nocturnes use them constantly in the accompaniment. A single triplet can completely change the rhythmic feel.</p>

<h2>Common mistakes</h2>
<ul>
  <li><strong>Confusing it with compound meter:</strong> a triplet is occasional; 6/8 divides <em>the whole measure</em> in three.</li>
  <li><strong>Thinking triplets are always eighth notes:</strong> there are quarter-note, sixteenth-note and half-note triplets too.</li>
  <li><strong>Thinking “triplet” means three fast notes:</strong> what matters is that the three notes fill the time of two, not that they are quick.</li>
  <li><strong>Squeezing the last two notes:</strong> all three must last exactly the same time.</li>
</ul>

<p style="margin:1.4rem 0;padding:.8rem 1.1rem;background:var(--bg-alt);border-radius:var(--radius-sm);"><strong>Practice:</strong> internalize the triplet rhythm with the <a href="/herramientas/metronomo/">online metronome</a>. Set it slow and count “trip-a-let” on every beat until the three notes sound perfectly even.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a triplet?</div>
      <div class="tm-faq-a">A triplet is a group of three equal notes played in the time normally taken by two notes of the same kind. It divides a beat into three equal parts instead of two, and it is marked with the number 3 over the group.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you count a triplet?</div>
      <div class="tm-faq-a">Divide the beat into three perfectly equal parts instead of two. A useful trick is to say a three-syllable word, such as “trip-a-let”, evenly on each beat. The typical mistake is to squeeze the last two notes together.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How long is an eighth-note triplet?</div>
      <div class="tm-faq-a">An eighth-note triplet is three eighth notes in the time of two, so it equals one quarter note. It is the most common kind of triplet.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between a triplet and 6/8?</div>
      <div class="tm-faq-a">A triplet appears occasionally inside simple meter, whose beats divide in two, and so it carries a “3”. In 6/8 (compound meter) the division into three is the norm for the whole measure, so no 3 is written.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
