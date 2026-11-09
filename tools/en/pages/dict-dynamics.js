const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/dynamics/',
  esPath: '/diccionario-musical/dinamica-musical/',
  title: 'Dynamics in Music: pp, mf, ff and Hairpins Explained',
  description: 'Musical dynamics from pianissimo to fortissimo (pp, p, mp, mf, f, ff), crescendo and diminuendo hairpins, and sudden changes such as sf and fp.',
  h1: 'Musical Dynamics',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  body: `
<p><strong>Dynamics</strong> are the degree of <strong>intensity or volume</strong> with which music is played, and the signs that show them are called <strong>dynamic markings</strong>. Dynamics are one of the <a href="/diccionario-musical/cualidades-del-sonido/">qualities of sound</a> (intensity) and one of the most important expressive tools: the same melody sounds completely different played <em>pianissimo</em> or <em>fortissimo</em>. Dynamic markings are written as Italian abbreviations.</p>

<h2>The levels of intensity</h2>

<p>From softest to loudest, the basic dynamic markings are:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Symbol</th><th>Italian term</th><th>Meaning</th></tr>
  </thead>
  <tbody>
    <tr><td><strong><em>ppp</em></strong></td><td>pianississimo</td><td>as soft as possible</td></tr>
    <tr><td><strong><em>pp</em></strong></td><td>pianissimo</td><td>very soft</td></tr>
    <tr><td><strong><em>p</em></strong></td><td>piano</td><td>soft</td></tr>
    <tr><td><strong><em>mp</em></strong></td><td>mezzo piano</td><td>moderately soft</td></tr>
    <tr><td><strong><em>mf</em></strong></td><td>mezzo forte</td><td>moderately loud</td></tr>
    <tr><td><strong><em>f</em></strong></td><td>forte</td><td>loud</td></tr>
    <tr><td><strong><em>ff</em></strong></td><td>fortissimo</td><td>very loud</td></tr>
    <tr><td><strong><em>fff</em></strong></td><td>fortississimo</td><td>as loud as possible</td></tr>
  </tbody>
</table>
</div>

<p>The border between soft and loud lies between <strong><em>mp</em></strong> and <strong><em>mf</em></strong>. The “p” comes from <em>piano</em> (soft) and the “f” from <em>forte</em> (loud); repeating the letter strengthens the marking.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/dinamica/grados.svg" width="784" height="122" alt="The eight dynamic markings written under eight quarter notes: ppp, pp, p, mp, mf, f, ff and fff, from softest to loudest." loading="lazy" decoding="async"><figcaption>The eight dynamic markings, from softest to loudest, written under the note where they start.</figcaption></figure>

<h2>Where dynamics are written and how long they last</h2>

<p>In instrumental scores, dynamic markings are written <strong>below the staff</strong>, right under the note where they begin. In vocal music, because the lyrics go underneath, they usually go above, and in piano music, which has two staves, they go <strong>between the two</strong>.</p>

<p>A dynamic marking <strong>lasts until another one appears</strong>: if a piece starts at <em>mf</em>, everything is played <em>mezzo forte</em> until the next sign, and there is no need to repeat it in every measure (UK: bar).</p>

<h2>Dynamics are relative</h2>

<p>Dynamic markings are not decibels: there is no exact volume for a <em>forte</em>. It depends on the instrument (a tuba's <em>piano</em> is not a piccolo's), on the hall and on the context: an <em>f</em> that comes after a <em>pp</em> sounds louder than the same <em>f</em> after an <em>ff</em>. What matters is the <strong>proportion</strong>: each marking must sound clearly different from its neighbors, especially at the border between <em>mp</em> and <em>mf</em>.</p>

<p>In a band or an orchestra, the marking also belongs to each instrument: if a flute carries the melody at <em>mf</em>, the brass accompaniment, even if it is also marked <em>mf</em>, usually has to play a little softer so the melody can be heard. This is called <strong>balance</strong> and it is worked on in rehearsal.</p>

<h2>Gradual changes: crescendo and diminuendo</h2>

<p>When the intensity must change little by little, <strong>hairpins</strong> (angle-shaped signs) or the Italian words are used:</p>

<ul>
  <li><strong>Crescendo</strong> (<em>cresc.</em>) — a hairpin that <strong>opens</strong>: gradually <strong>increase</strong> the volume.
  </li>
  <li><strong>Diminuendo</strong> or <strong>decrescendo</strong> (<em>dim.</em> / <em>decresc.</em>) — a hairpin that <strong>closes</strong>: gradually <strong>decrease</strong> the volume.
  </li>
</ul>

<figure class="tm-staff"><img src="/assets/img/notacion/dinamica/reguladores.svg" width="784" height="122" alt="Crescendo and diminuendo: in the first measure, from p to f with a hairpin that opens; in the second, from f to p with a hairpin that closes." loading="lazy" decoding="async"><figcaption>A hairpin that opens (crescendo) and one that closes (diminuendo), between two dynamic markings.</figcaption></figure>

<p>A hairpin usually goes <strong>between two dynamic markings</strong>, and those two markings say where it starts and ends: in <em>p</em> &lt; <em>f</em> the sound grows from soft to loud. When the change lasts several measures, the word (<em>cresc.</em>, <em>dim.</em>) is written followed by a dotted or dashed line that shows how far it goes.</p>

<p>There are also terms that shape the end of a sound or phrase, such as <em>morendo</em> (dying away), <em>calando</em> (growing softer and slower) or <em>perdendosi</em> (fading away), which combine a drop in volume with a drop in tempo.</p>

<h2>Sudden changes and accents</h2>

<p>Some signs show a <strong>sudden</strong> change, not a gradual one:</p>

<ul>
  <li><strong><em>sf</em></strong> or <strong><em>sfz</em></strong> (<em>sforzando</em>): a sudden, forceful accent on a note or chord.</li>
  <li><strong><em>fp</em></strong> (<em>fortepiano</em>): attack <strong>loud</strong> and drop <strong>immediately to soft</strong>.</li>
  <li><strong><em>rf</em></strong> or <strong><em>rinf.</em></strong> (<em>rinforzando</em>): briefly reinforce a group of notes.</li>
  <li><strong><em>subito</em></strong> (<em>sub.</em>): suddenly; for example <em>subito piano</em> = switch to soft all at once.</li>
</ul>

<figure class="tm-staff"><img src="/assets/img/notacion/dinamica/subitos.svg" width="443" height="122" alt="Three examples of sudden change: sfz on a quarter note, fp on a half note and rf on a quarter note." loading="lazy" decoding="async"><figcaption>Sforzando (<em>sfz</em>) on one note, fortepiano (<em>fp</em>) and rinforzando (<em>rf</em>).</figcaption></figure>

<h2>A little history</h2>

<p>In the Baroque period dynamics were written only occasionally, and when they appeared it was to contrast loud and soft passages suddenly, which is called <strong>terraced dynamics</strong>. One of the first works with marked dynamics is Giovanni Gabrieli's <em>Sonata pian' e forte</em> (1597). The gradual crescendo and diminuendo became widespread in the 18th century, with the Mannheim orchestra, and since the Romantic period composers have asked for ever more extreme markings, even <em>pppp</em> or <em>ffff</em>.</p>

<h2>Common mistakes with dynamics</h2>

<ul>
  <li><strong>Playing everything at the same volume.</strong> Most dynamics problems come from a lack of contrast: between <em>p</em> and <em>f</em> there has to be a difference you can hear.</li>
  <li><strong>Mixing up <em>mp</em> and <em>mf</em>.</strong> They are neighbors, but one is on the soft side and the other on the loud side.</li>
  <li><strong>Spending the crescendo too early.</strong> If you reach <em>f</em> halfway through the hairpin, there is nothing left for the end.</li>
  <li><strong>Holding a <em>sfz</em>.</strong> A sforzando is an accent on a single note or chord; afterwards you go back to the previous dynamic.</li>
  <li><strong>Reading <em>fp</em> backwards.</strong> You attack loud and drop to soft right away, not the other way around.</li>
</ul>

<h2>Practice dynamics</h2>

<aside class="tm-callout">
  <p><strong>Dynamics exercises.</strong> On the exercises page you will find three levels: <strong>the markings from ppp to fff</strong> (what each sign means and what it is called), <strong>changes of intensity</strong> (crescendo, diminuendo, sforzando, fortepiano, subito…) and <strong>everything mixed</strong>. There is also an exercise for <strong>ordering the markings</strong> from softest to loudest and a <strong>printable PDF worksheet with answers</strong>.</p>
  <p style="margin-top:.9rem"><a class="tm-btn tm-btn-dorado" href="/ejercicios/dinamica/">Go to the dynamics exercises</a></p>
</aside>

<p>Dynamics always combine with <a href="/diccionario-musical/figuras-musicales/">note values</a>, the <a href="/diccionario-musical/compases/analizar-compases/">meter</a> and the <a href="/diccionario-musical/tempo-musical/">tempo</a> to give music its expressive shape; they affect <strong>intensity</strong>, one of the four qualities of sound, along with pitch, duration and timbre.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are dynamics in music?</div>
      <div class="tm-faq-a">Dynamics are the degree of intensity or volume with which music is played, and the signs that show them are called dynamic markings. They range from pianissimo (very soft) to fortissimo (very loud), and include gradual changes (crescendo and diminuendo) and sudden ones.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What do pp, p, mf, f and ff mean?</div>
      <div class="tm-faq-a">They are the Italian abbreviations for the levels of intensity: pp (pianissimo) very soft, p (piano) soft, mp (mezzo piano) moderately soft, mf (mezzo forte) moderately loud, f (forte) loud and ff (fortissimo) very loud. There are also extremes such as ppp and fff.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a hairpin in music?</div>
      <div class="tm-faq-a">A hairpin is the angle-shaped sign that shows a gradual change of intensity: if it opens (&lt;) it is a crescendo and the volume gradually increases; if it closes (&gt;) it is a diminuendo or decrescendo and the volume gradually decreases.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between crescendo and sforzando?</div>
      <div class="tm-faq-a">A crescendo (cresc. or an open hairpin) is a gradual, progressive increase in intensity. A sforzando (sf or sfz) is a sudden, forceful accent on a single note or chord, not a progressive change.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Where are dynamic markings written in the score?</div>
      <div class="tm-faq-a">In instrumental scores, below the staff; in piano music, between the two staves; and in vocal music, usually above, because the lyrics go below. A dynamic marking lasts until another one appears.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many decibels is a forte?</div>
      <div class="tm-faq-a">There is no fixed value: dynamic markings are relative. They depend on the instrument, the hall and the context, and what matters is proportion: each marking must sound clearly different from its neighbor.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the order of the dynamic markings from softest to loudest?</div>
      <div class="tm-faq-a">ppp (pianississimo), pp (pianissimo), p (piano), mp (mezzo piano), mf (mezzo forte), f (forte), ff (fortissimo) and fff (fortississimo). The border between soft and loud lies between mp and mf.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
