const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/ties-and-slurs/',
  esPath: '/diccionario-musical/ligaduras/',
  title: 'Tie vs Slur in Music: Differences and Examples',
  description: 'A tie joins notes of the same pitch and adds their duration; a slur (legato) joins different pitches. Learn the difference, with examples and a quick rule.',
  h1: 'Ties and Slurs',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Note Values', '/diccionario-musical/figuras-musicales/']],
  articleClass: 'tm-article tm-article--wide',
  body: `<p>A <strong>tie or slur</strong> is a curved line that connects two or more notes in a score. They are drawn in a similar way, but there are <strong>two very different types</strong>: the <strong>tie</strong> and the <strong>slur</strong>. Telling them apart is essential, because one affects <em>duration</em> and the other affects <em>performance</em>.</p>

<h2>The tie</h2>

<p>The <strong>tie</strong> joins two <a href="/diccionario-musical/figuras-musicales/">notes</a> of the <strong>same pitch</strong> (the same note) and <strong>adds their durations</strong> into one sustained sound: the second note is not played again, the first one is simply held longer. It is mostly used to hold a note across the bar line of a <a href="/diccionario-musical/compases/">measure</a> (UK: bar) or to get lengths that a single note value cannot write.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/figuras/ligadura-union.svg" width="309" height="195" alt="Tie between two notes of the same pitch" decoding="async"><figcaption>Tie: two Gs of the same pitch sound as one long note.</figcaption></figure>

<h2>The slur</h2>

<p>The <strong>slur</strong> joins notes of <strong>different pitches</strong> and tells the performer to play them <strong>smoothly connected</strong>, with no break between them. The Italian word for this is <strong>legato</strong>. A slur does not change the length of the notes. It is a mark of articulation and phrasing (a phrase mark is a longer slur that shows a musical phrase).</p>

<figure class="tm-staff"><img src="/assets/img/notacion/figuras/ligadura-expresion.svg" width="371" height="195" alt="Slur over several notes of different pitches" decoding="async"><figcaption>Slur: different notes played smoothly connected (legato).</figcaption></figure>

<h2>How to tell them apart</h2>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Aspect</th><th>Tie</th><th>Slur</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Notes it joins</strong></td><td>Same pitch</td><td>Different pitches</td></tr>
    <tr><td><strong>What it does</strong></td><td>Adds the durations</td><td>Indicates legato (play smoothly)</td></tr>
    <tr><td><strong>Affects</strong></td><td>Duration</td><td>Performance</td></tr>
    <tr><td><strong>Is the note played again?</strong></td><td>No: a single sound</td><td>Yes: all notes sound, but connected</td></tr>
    <tr><td><strong>Spanish name</strong></td><td>Ligadura de unión</td><td>Ligadura de expresión</td></tr>
  </tbody>
</table>
</div>

<p><strong>Rule of thumb:</strong> if the curve joins two <strong>identical</strong> notes, it is a tie (one sustained note sounds). If it joins <strong>different</strong> notes, it is a slur (they are played connected, without changing their length).</p>

<p>To practice, try the exercise on <a href="/ejercicios/figuras/ligaduras-de-union-y-expresion/">ties and slurs</a>: you have to tell them apart and work out how long the tied note lasts in its measure. It has a PDF worksheet with answers.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
<div class="tm-faq-item">
<div class="tm-faq-q">What is a tie or slur in music?</div>
<div class="tm-faq-a">It is a curved line that connects two or more notes. There are two types: the tie, which joins notes of the same pitch and adds their duration, and the slur, which joins different notes so they are played smoothly connected (legato).</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What is the difference between a tie and a slur?</div>
<div class="tm-faq-a">A tie joins two notes of the same pitch and adds their durations into one sound. A slur joins notes of different pitches and tells the performer to play them connected (legato), without changing their length.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">Does a tie change the length of the note?</div>
<div class="tm-faq-a">Yes. A tie adds the durations of the two joined notes into a single sustained sound. The second note is not played again; the first one is just held longer.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What is legato?</div>
<div class="tm-faq-a">Legato is the smooth, connected way of playing a group of notes, marked with a slur. It is the opposite of staccato, where notes are played short and separated. You can see them alongside the other signs on the page about <a href="/diccionario-musical/articulacion-musical/">articulation</a>.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How do I know if a curve is a tie or a slur?</div>
<div class="tm-faq-a">Look at the notes it joins. If they have the same pitch (the same note), it is a tie and one sustained sound is heard. If they have different pitches, it is a slur and the notes are played connected.</div>
</div>
</div>
</div>
</div>
</section>`,
});
