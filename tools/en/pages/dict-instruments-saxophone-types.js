const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/saxophone-types/',
  esPath: '/diccionario-musical/tipos-de-saxofon/',
  title: 'Types of Saxophone: Soprano, Alto, Tenor, Baritone',
  description: 'Saxophone types and how they differ: sopranino, soprano, alto, tenor, baritone, bass and contrabass. Tuning, transposition, range and use, in a chart.',
  h1: 'The Saxophone Family',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  scripts: [],
  body: `
<p>The <strong>saxophone</strong> is not a single instrument but a whole <strong>family</strong>: from the tiny <strong>sopranino</strong> to the gigantic <strong>contrabass</strong>, including the four best known, <strong>soprano, alto, tenor and baritone</strong>. They all share the same <strong>single reed</strong> and, above all, <strong>the same fingering</strong>: whoever plays one can play them all. What changes is the <strong>size</strong> and, with it, the pitch. Here are the <strong>types of saxophone</strong>, what they have in common and what sets them apart, with a <strong>comparison chart</strong> and a link to the guide to <a href="/diccionario-musical/notas-del-saxofon/">saxophone notes and fingering</a>.</p>

<h2>What is the saxophone family?</h2>

<p>The saxophone is a <strong>woodwind</strong>, even though it is made of <strong>brass</strong>: it sounds with a <strong>single reed</strong> on the mouthpiece, just like the <a href="/diccionario-musical/notas-del-clarinete/">clarinet</a>. Its bore, however, is <strong>conical</strong> (it widens), and that makes it <strong>overblow at the octave</strong> with the octave key (not at the twelfth like the clarinet). That regularity is what lets <strong>all saxophones share one fingering</strong>: only the size of the tube changes.</p>

<p>All of them are <strong>transposing instruments</strong> and are read in <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a>, alternating two tunings: <strong>E♭</strong> and <strong>B♭</strong>. So when a player changes instrument, they <strong>read and finger exactly the same</strong>, and only the real pitch that sounds changes.</p>

<h2>The saxophones, from highest to lowest</h2>

<ul>
  <li><strong>Sopranino</strong> (E♭): small and very high; rare, found in contemporary music and in saxophone ensembles.</li>
  <li><strong>Soprano</strong> (B♭): bright and penetrating, often <strong>straight</strong>; widely used as a solo voice.</li>
  <li><strong>Alto</strong> (E♭): the <strong>most common</strong>; it rules in classical music, the band and teaching.</li>
  <li><strong>Tenor</strong> (B♭): warm and expressive, <strong>the great voice of jazz</strong>.</li>
  <li><strong>Baritone</strong> (E♭): large, with a loop above the mouthpiece; the low base of the sax section.</li>
  <li><strong>Bass</strong> (B♭): uncommon; reinforces the low register in big bands and saxophone ensembles.</li>
  <li><strong>Contrabass</strong> (E♭): enormous and very rare, among the lowest saxophones ever built.</li>
</ul>

<p>There is even a member smaller than the sopranino, the <strong>soprillo</strong> (or sopranissimo, in B♭), and another lower than the contrabass, the <strong>subcontrabass</strong>. They are curiosities that are almost never seen. There was also a <strong>saxophone in C</strong> (the "C&nbsp;melody"), which <strong>does not transpose</strong>. It became very popular in the 1920s for playing piano or vocal sheet music directly at home, but fell out of use around the 1930s.</p>

<figure class="tm-figure">
<picture><source type="image/webp" srcset="/assets/img/tipos-de-saxofon/familia.webp"><img src="/assets/img/tipos-de-saxofon/familia.jpg" width="1226" height="974" alt="The types of saxophone compared at true relative size, from the smallest (soprillo and sopranino) to the contrabass" loading="lazy"></picture>
<figcaption>The saxophones at true relative size, from the smallest (soprillo and sopranino) to the enormous contrabass. Photo by <a href="https://commons.wikimedia.org/wiki/File:Eight_saxophone_sizes_smaller.png" rel="nofollow">Jonathanischoice</a> (Wikimedia Commons, CC&nbsp;BY&nbsp;4.0).</figcaption>
</figure>

<h2>What they have in common</h2>

<ul>
  <li><strong>The same fingering.</strong> A saxophonist who can play the alto <strong>can already play all four</strong> (and the others), which is why doubling instruments is so normal in a big band.</li>
  <li><strong>Single reed and conical bore</strong>, which overblows at the octave with the octave key: a regular fingering that is easy to learn.</li>
  <li><strong>All transpose</strong> and are read in treble clef, alternating <strong>E♭</strong> (sopranino, alto, baritone, contrabass) and <strong>B♭</strong> (soprano, tenor, bass).</li>
  <li>Neighboring members are a <strong>fourth or a fifth</strong> apart: this is the pattern that organizes the whole family.</li>
</ul>

<h2>Comparison chart of the saxophone types</h2>

<p>From highest to lowest, with the tuning, how much each one transposes, its register and where it is mainly used:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Saxophone</th><th>Tuning</th><th>Transposition</th><th>Register</th><th>Main use</th></tr></thead>
<tbody>
<tr><td>Sopranino</td><td>E♭</td><td>Sounds a minor 3rd higher</td><td>Very high</td><td>Rare; contemporary music</td></tr>
<tr><td>Soprano</td><td>B♭</td><td>Sounds a major 2nd lower</td><td>High</td><td>Solo, jazz</td></tr>
<tr><td><strong>Alto</strong></td><td>E♭</td><td>Sounds a major 6th lower</td><td>Middle</td><td>The most common: classical, band</td></tr>
<tr><td>Tenor</td><td>B♭</td><td>Sounds a major 9th lower</td><td>Middle-low</td><td>The voice of jazz</td></tr>
<tr><td>Baritone</td><td>E♭</td><td>Sounds a major 13th lower</td><td>Low</td><td>Base of the section</td></tr>
<tr><td>Bass</td><td>B♭</td><td>Sounds a major 16th lower</td><td>Very low</td><td>Rare; big band</td></tr>
<tr><td>Contrabass</td><td>E♭</td><td>Sounds a major 20th lower</td><td>Extremely low</td><td>Very rare</td></tr>
</tbody>
</table></div>

<p>Notice the pattern: the <strong>E♭</strong> and <strong>B♭</strong> instruments alternate, and each pair in the same key is an octave apart. Reference pitches use scientific pitch notation (C4 is middle C). It is the same transposition logic as in the <a href="/diccionario-musical/tipos-de-clarinete/">clarinet family</a>.</p>

<h2>The saxophone in the band and in jazz</h2>

<p>The saxophone never caught on in the <strong>symphony orchestra</strong> (it appears only in a few works), but it is a <strong>leading voice</strong> in two other worlds. In the <strong>concert band</strong> it forms a section of its own (altos, tenors and baritone) that adds body and color. In <strong>jazz</strong> it is, together with the trumpet, the king of instruments: the sax section of a typical <em>big band</em> has <strong>two altos, two tenors and a baritone</strong>, and the tenor and alto saxophones have produced some of the most famous soloists in history.</p>

<h2>A little history</h2>

<p>The saxophone was invented by the Belgian <strong>Adolphe Sax</strong>, who patented it in <strong>Paris in 1846</strong>. His idea was a <strong>homogeneous family</strong>, with one mechanism and one tone color covering the whole range, that would join the <strong>power of brass</strong> with the <strong>agility of woodwinds</strong>. He actually designed <strong>two parallel families</strong>: one in <strong>C and F</strong>, meant for the orchestra, and another in <strong>B♭ and E♭</strong>, meant for military bands. The second one triumphed and is the one still alive today, while the orchestral family fell out of use. In the <strong>20th century</strong>, the saxophone found its lasting home in <strong>jazz</strong> and in the band, far from the concert hall it was partly designed for.</p>

<h2>Tune your saxophone</h2>

<p>Check your pitch with the online tuner: <a href="/en/tools/tuner/soprano-saxophone/">soprano</a>, <a href="/en/tools/tuner/alto-saxophone/">alto</a>, <a href="/en/tools/tuner/tenor-saxophone/">tenor</a> and <a href="/en/tools/tuner/baritone-saxophone/">baritone saxophone</a>.</p>

<h2>Summary</h2>

<ul>
  <li>The saxophone family runs from the <strong>sopranino</strong> to the <strong>contrabass</strong>; the four common ones are <strong>soprano, alto, tenor and baritone</strong>.</li>
  <li>All share a <strong>single reed</strong>, a <strong>conical bore</strong> (it overblows at the octave) and <strong>the same fingering</strong>.</li>
  <li>They are <strong>transposing instruments</strong> in <strong>E♭</strong> (sopranino, alto, baritone, contrabass) and <strong>B♭</strong> (soprano, tenor, bass), read in treble clef.</li>
  <li>They are the base of <strong>jazz</strong> and a section of their own in the <strong>concert band</strong>; they hardly appear in the orchestra.</li>
</ul>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many types of saxophone are there?</div>
      <div class="tm-faq-a">The main ones, from highest to lowest, are sopranino, soprano, alto, tenor, baritone, bass and contrabass (E♭ and B♭ alternating). The four most used are soprano, alto, tenor and baritone, and the alto is the most common. There are also rarities such as the even higher soprillo and the subcontrabass.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the most common saxophone?</div>
      <div class="tm-faq-a">The alto saxophone, by far: it is the one students learn first and the one that rules in classical music, the band and teaching. The tenor follows closely, especially in jazz.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Are they all played the same way?</div>
      <div class="tm-faq-a">Yes: all saxophones use the same fingering and are read in treble clef, so a saxophonist moves from one to another without relearning anything. Only the size of the instrument and the real pitch change, because each one transposes differently.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is the saxophone brass or woodwind?</div>
      <div class="tm-faq-a">It is a woodwind, even though it is made of brass: what classifies it is that it sounds with a single reed, like the clarinet. Its conical bore makes it overblow at the octave, which gives the whole family a very regular fingering.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
