const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/tuplets/',
  esPath: '/diccionario-musical/grupos-de-valoracion-especial/',
  title: 'Tuplets in Music: Triplets, Duplets, Quintuplets',
  description: 'What tuplets are: triplet, duplet, quadruplet, quintuplet, sextuplet and septuplet. How they are written and how long they last, with examples.',
  h1: 'Tuplets (Irregular Groups)',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  articleClass: 'tm-article tm-article--wide',
  body: `<p><strong>Tuplets</strong> (also called <em>irregular groups</em> or <em>artificial groups</em>; in Spanish, <em>grupos de valoración especial</em>) are groups of notes that <strong>temporarily change the normal division of a note value</strong>. Instead of splitting a value into the number of notes that the <a href="/diccionario-musical/compases/">meter</a> would normally give, they fit <strong>more (or fewer) notes</strong> into the same space. The best known is the <strong><a href="/diccionario-musical/grupos-de-valoracion-especial/tresillo/">triplet</a></strong>, but there are also the <a href="/diccionario-musical/grupos-de-valoracion-especial/dosillo/">duplet</a>, the quadruplet, the quintuplet, the sextuplet and the septuplet, among others.</p>

<h2>What is a tuplet?</h2>

<p>Normally, each <a href="/diccionario-musical/figuras-musicales/">note value</a> divides into equal parts that are powers of two: a quarter note (UK: crotchet) into two eighth notes (UK: quavers), an eighth note into two sixteenth notes (UK: semiquavers), and so on. This is the <strong>regular division</strong>. A tuplet breaks that rule: it spreads the same value over a number of notes that <strong>does not fit the natural subdivision</strong> of the meter.</p>

<p>You recognize a tuplet by a <strong>number</strong> above (or below) the group, and almost always a bracket or beam that joins it. The number tells you <strong>how many notes form the group</strong>. That number is the signal that the time is not divided in the usual way.</p>

<h2>The most common tuplets</h2>

<p>Each tuplet is named after the number of notes it contains. These are the six most frequent, with the space they take and the kind of meter where they usually appear:</p>

<div class="tm-table-wrap">
<table class="tm-table tm-table--tarjetas">
  <thead>
    <tr><th>Tuplet</th><th>Notation</th><th>Notes</th><th>In the space of</th><th>Usual meter</th></tr>
  </thead>
  <tbody>
    <tr><td data-label="Tuplet"><strong><a href="/diccionario-musical/grupos-de-valoracion-especial/dosillo/">Duplet</a></strong></td><td class="tm-celda-img" data-label="Notation"><img src="/assets/img/notacion/figuras/grupo-dosillo.svg" width="201" height="183" alt="Duplet: two eighth notes with the number 2" decoding="async"></td><td data-label="Notes">2</td><td data-label="In the space of">3 notes</td><td data-label="Usual meter">Compound</td></tr>
    <tr><td data-label="Tuplet"><strong><a href="/diccionario-musical/grupos-de-valoracion-especial/tresillo/">Triplet</a></strong></td><td class="tm-celda-img" data-label="Notation"><img src="/assets/img/notacion/figuras/grupo-tresillo.svg" width="195" height="183" alt="Triplet: three eighth notes with the number 3" decoding="async"></td><td data-label="Notes">3</td><td data-label="In the space of">2 notes</td><td data-label="Usual meter">Simple</td></tr>
    <tr><td data-label="Tuplet"><strong>Quadruplet</strong></td><td class="tm-celda-img" data-label="Notation"><img src="/assets/img/notacion/figuras/grupo-cuatrillo.svg" width="308" height="183" alt="Quadruplet: four eighth notes with the number 4" decoding="async"></td><td data-label="Notes">4</td><td data-label="In the space of">6 notes (see the note below)</td><td data-label="Usual meter">Compound</td></tr>
    <tr><td data-label="Tuplet"><strong>Quintuplet</strong></td><td class="tm-celda-img" data-label="Notation"><img src="/assets/img/notacion/figuras/grupo-quintillo.svg" width="245" height="183" alt="Quintuplet: five sixteenth notes with the number 5" decoding="async"></td><td data-label="Notes">5</td><td data-label="In the space of">4 or 6 notes</td><td data-label="Usual meter">Depends on context</td></tr>
    <tr><td data-label="Tuplet"><strong>Sextuplet</strong></td><td class="tm-celda-img" data-label="Notation"><img src="/assets/img/notacion/figuras/grupo-seisillo.svg" width="275" height="183" alt="Sextuplet: six sixteenth notes with the number 6" decoding="async"></td><td data-label="Notes">6</td><td data-label="In the space of">4 notes</td><td data-label="Usual meter">Simple</td></tr>
    <tr><td data-label="Tuplet"><strong>Septuplet</strong></td><td class="tm-celda-img" data-label="Notation"><img src="/assets/img/notacion/figuras/grupo-septillo.svg" width="305" height="183" alt="Septuplet: seven sixteenth notes with the number 7" decoding="async"></td><td data-label="Notes">7</td><td data-label="In the space of">6 or 8 notes</td><td data-label="Usual meter">Depends on context</td></tr>
  </tbody>
</table>
</div>

<p>Larger groups exist (eight, nine and so on) but they are rare.</p>

<p>The "usual meter" column shows only where each tuplet appears <strong>most often</strong>. It is not a strict rule. What makes a tuplet "irregular" is the normal division of the meter: in <a href="/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-simples/">simple meters</a> the beat divides into two, so the typical tuplet is the triplet. In <a href="/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-compuestos/">compound meters</a> the beat divides into three, so the typical ones are the duplet and the quadruplet. But any tuplet can appear in any meter: a <strong>sixteenth-note triplet</strong>, for example, is perfectly normal inside 6/8. What matters is not the meter itself but the <strong>value</strong> that the group subdivides.</p>

<h2>The triplet</h2>

<p>The <strong>triplet</strong> is by far the most used tuplet. It is <strong>three equal notes played in the time that two would normally take</strong>. It is typical of simple meters, whose natural subdivision is binary: it brings a ternary division where a binary one is expected. It can also appear in a compound meter whenever it subdivides a value that would normally divide into two.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/figuras/grupo-tresillo.svg" width="195" height="183" alt="Eighth-note triplet on the staff" decoding="async"><figcaption>Eighth-note triplet: three eighth notes in the time of two (one quarter note).</figcaption></figure>

<p>A triplet can be made from any note value: an <strong>eighth-note triplet</strong> (the most common, it takes one quarter note), a <strong>quarter-note triplet</strong> (it takes a half note, two beats), a <strong>sixteenth-note triplet</strong> (it takes one eighth note), and so on. In every case, the three notes share equally the value of <strong>two</strong> notes of the same kind.</p>

<h2>The duplet</h2>

<p>The <strong>duplet</strong> is, in a way, the triplet "in reverse": <strong>two equal notes played in the time that three would normally take</strong>. That is why it is typical of <a href="/diccionario-musical/compases/">compound meters</a> (6/8, 9/8, 12/8...), where each beat divides naturally into three parts. The duplet brings a binary division into a ternary setting. It appears wherever a ternary value is subdivided, whatever the meter.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/figuras/grupo-dosillo.svg" width="201" height="183" alt="Eighth-note duplet on the staff" decoding="async"><figcaption>Duplet: two eighth notes in the time of three (one dotted quarter note).</figcaption></figure>

<h2>Quadruplet, quintuplet, sextuplet and septuplet</h2>

<p>The larger the number, the rarer the group, but all follow the same logic: the number says how many notes share a space that would hold a different number of notes.</p>

<ul>
  <li><strong>Quadruplet</strong> (4): in the Spanish-language tradition, four notes in the place of six, which is equivalent to a duplet with each note subdivided. Typical of compound meters. Many English-language sources instead define a quadruplet as four notes in the time of three (4:3), so when in doubt look for a written ratio.</li>
  <li><strong>Quintuplet</strong> (5): five notes in the place of four or of six, depending on whether it subdivides a binary or a ternary value.</li>
  <li><strong>Sextuplet</strong> (6): six notes in the place of four. It should not be confused with two triplets in a row: a sextuplet feels like a single group.</li>
  <li><strong>Septuplet</strong> (7): seven notes in the place of six or of eight, depending on the value it fills.</li>
</ul>

<p>Here is the delicate part: when the number of the group falls <strong>between two regular numbers</strong>, its equivalence is no longer unique. The <strong>quintuplet</strong> (5) sits between 4 and 6, and the <strong>septuplet</strong> (7) between 6 and 8. Depending on whether they fill a binary or a ternary value, they equal one or the other, and <strong>the context decides</strong>. When there is a risk of ambiguity, the full <strong>ratio</strong> is written, for example <em>5:4</em> versus <em>5:6</em>, to make clear how many notes the group replaces. The quadruplet (4) and the sextuplet (6) are treated as having a fixed equivalence in the Spanish-language tradition: 6 and 4, respectively. <strong>This site follows the Spanish-language tradition</strong>: a quadruplet is four notes in the place of six. Be aware that <strong>another definition also exists</strong>: outside that tradition, and especially in English-language sources, a quadruplet is four notes in the place of three (4:3), that is, a surplus group; this is the reading attributed to H. Riemann. If you are unsure in front of a score, look for the written ratio, because it rules.</p>

<h2>How to work out their duration</h2>

<p>The rule is always the same: the tuplet <strong>lasts as long as the number of notes it replaces</strong>, and that time is shared equally among its notes. The question is <em>how many</em> it replaces. That regular number is the <strong>normal subdivision of the value the group fills</strong>. If that value divides in a binary way, the group is measured against a power of two (2, 4, 8...). If it divides in a ternary way, it is measured against a multiple of three (3, 6...). For the triplet, duplet, quadruplet and sextuplet the reference is fixed. For the quintuplet and septuplet, as we have seen, the context sets it.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Tuplet</th><th>Fills the time of</th><th>Each note lasts (in quarter notes)</th></tr>
  </thead>
  <tbody>
    <tr><td>Eighth-note triplet</td><td>2 eighth notes = 1 quarter note</td><td>⅓ of a quarter note</td></tr>
    <tr><td>Quarter-note triplet</td><td>2 quarter notes = 1 half note</td><td>⅔ of a quarter note</td></tr>
    <tr><td>Eighth-note duplet</td><td>3 eighth notes = 1 dotted quarter note</td><td>¾ of a quarter note</td></tr>
    <tr><td>Sixteenth-note quintuplet</td><td>4 sixteenth notes = 1 quarter note</td><td>⅕ of a quarter note</td></tr>
  </tbody>
</table>
</div>

<p>In practice, you do not need to think in fractions to play a triplet: just <strong>divide the beat into three equal parts</strong> instead of two. Practicing with a <a href="/herramientas/metronomo/">metronome</a> helps you absorb the feel of the group inside the beat.</p>

<h2>Do not confuse tuplets with dots or ties</h2>

<p>Tuplets change <strong>how many notes</strong> fit in a beat. They should not be confused with other devices that also affect duration:</p>

<ul>
  <li>The <a href="/diccionario-musical/puntillo/">dot</a> lengthens a single note by half of its value.</li>
  <li>The <a href="/diccionario-musical/ligaduras/">tie</a> adds together the durations of two notes of the same pitch.</li>
</ul>

<p>To practice how many notes each group replaces, with triplets, duplets, quadruplets and sextuplets, see the <a href="/ejercicios/grupos-de-valoracion-especial/">tuplet exercises</a>, with three levels and a PDF worksheet. To go further, <a href="/ejercicios/grupos-de-valoracion-especial/que-compas-es/">What time signature is it?</a> gives a whole measure full of irregular groups and you have to work out the time signature by simplifying.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
<div class="tm-faq-item">
<div class="tm-faq-q">What is a tuplet?</div>
<div class="tm-faq-a">A tuplet is a group of notes that temporarily changes the normal division of a note value: it spreads the value over more (or fewer) notes than the subdivision of the meter would give. It is written with a number above the group, usually with a bracket, that says how many notes form the group. The triplet (3), duplet (2), quadruplet (4), quintuplet (5), sextuplet (6) and septuplet (7) are the most frequent.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What is a triplet?</div>
<div class="tm-faq-a">A triplet is a group of three equal notes played in the time that two would normally take. For example, an eighth-note triplet lasts as long as two eighth notes (one quarter note, one beat in 4/4), but that time is shared among three equal notes. It is the most common tuplet.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What is the difference between a triplet and a duplet?</div>
<div class="tm-faq-a">A triplet puts three notes where two fit and is typical of simple meters (binary subdivision), such as 2/4 or 4/4. A duplet is the opposite: it puts two notes where three fit and is typical of compound meters (ternary subdivision), such as 6/8 or 9/8. This is not a rigid rule: either can appear in other meters depending on the value it subdivides.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How do you work out the duration of a triplet?</div>
<div class="tm-faq-a">A triplet takes the same total time as the two notes it replaces. An eighth-note triplet equals two eighth notes (one quarter note), so each note of the triplet lasts one third of a quarter note. A quarter-note triplet equals two quarter notes (one half note, two beats), so each note lasts two thirds of a quarter note.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What are groups of 5, 6 and 7 notes called?</div>
<div class="tm-faq-a">The group of five notes is the quintuplet, the group of six is the sextuplet and the group of seven is the septuplet. The quintuplet and septuplet have no fixed equivalent: a quintuplet takes the space of four or six notes, and a septuplet the space of six or eight, depending on whether it subdivides a binary or a ternary value. When there is a risk of ambiguity, the full ratio is written (for example 5:4 or 5:6).</div>
</div>
</div>
</div>
</div>
</section>`,
});
