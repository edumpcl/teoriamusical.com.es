const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/ornaments/',
  esPath: '/diccionario-musical/ornamentos-musicales/',
  title: 'Musical Ornaments: Trill, Mordent, Turn, Appoggiatura',
  description: 'Musical ornaments explained: appoggiatura, acciaccatura, mordent, turn and trill. How each is written and played, with examples you can listen to.',
  h1: 'Musical Ornaments',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  scripts: ['tm-piano-audio'],
  body: `
<p><strong>Ornaments (or embellishments) are short notes that decorate a melody without changing its main line.</strong> They are written with small symbols or smaller notes, and each one "translates" into a specific realization, a group of quick notes, when played. In each example on this page you will see <strong>how the ornament is written</strong> and <strong>how it is played</strong>, and you can <strong>press ▶ to hear its realization</strong>.</p>

<p>Ornaments are usually grouped in two kinds: those of <strong>a single note</strong> (the appoggiatura and the acciaccatura) and those of <strong>several notes</strong> (the mordent, the turn and the trill).</p>

<p>We take <strong>G</strong> as the main note, with its upper neighbor (<strong>A</strong>) and its lower neighbor (<strong>F</strong>).</p>

<h2>The appoggiatura</h2>

<p>The <strong>appoggiatura</strong> (Italian for "leaning note") is an ornamental note that "leans" on the main note and <strong>takes part of its duration</strong>. The long appoggiatura takes <strong>half</strong> the value of the main note (or two thirds if the main note is dotted). It is written as a small note without a slash, slurred to the main note.</p>

<figure class="tm-staff" data-tm-melody="a/4:8 g/4:8" data-tm-bpm="76"><img src="/assets/img/notacion/ornamentos/apoyatura.svg" width="236" height="153" alt="Appoggiatura: small note A slurred to a G, and its realization, A and G as eighth notes" loading="lazy" decoding="async"><figcaption>Left: how it is written (appoggiatura A before G). Right: how it is played. Press ▶.</figcaption></figure>

<h2>The acciaccatura (short appoggiatura)</h2>

<p>The <strong>acciaccatura</strong> or <strong>short appoggiatura</strong> is a small note with a <strong>slash</strong> through its flag, played <strong>as fast as possible</strong>, taking almost no time from the main note: it sounds like a quick tap just before the beat.</p>

<figure class="tm-staff" data-tm-melody="a/4:16 g/4:q" data-tm-bpm="76"><img src="/assets/img/notacion/ornamentos/acciaccatura.svg" width="254" height="153" alt="Acciaccatura: slashed small note A before G, and its quick realization" loading="lazy" decoding="async"><figcaption>Left: how it is written (slashed acciaccatura). Right: how it is played, very briefly. Press ▶.</figcaption></figure>

<h2>The mordent</h2>

<p>The <strong>mordent</strong> is a very quick alternation of the main note with one of its neighbors, played as the beat arrives. Depending on which neighbor it uses, there are two: the <strong>upper mordent</strong> and the <strong>lower mordent</strong>.</p>

<p>The <strong>upper mordent</strong> alternates with the note <strong>immediately above</strong> (main → upper → main). Its sign is a short wavy line.</p>

<figure class="tm-staff" data-tm-melody="g/4:16 a/4:16 g/4:8" data-tm-bpm="84"><img src="/assets/img/notacion/ornamentos/mordente.svg" width="231" height="153" alt="Upper mordent on G and its realization: G, A, G very fast" loading="lazy" decoding="async"><figcaption>Left: how the upper mordent is written (wavy line above G). Right: how it is played (G-A-G). Press ▶.</figcaption></figure>

<p>The <strong>lower mordent</strong> alternates with the note <strong>immediately below</strong> (main → lower → main). It is written with the same wavy line <strong>crossed by a short vertical stroke</strong>.</p>

<figure class="tm-staff" data-tm-melody="g/4:16 f/4:16 g/4:8" data-tm-bpm="84"><img src="/assets/img/notacion/ornamentos/mordente-inferior.svg" width="231" height="153" alt="Lower mordent on G (wavy line with a vertical stroke) and its realization: G, F, G" loading="lazy" decoding="async"><figcaption>Left: how the lower mordent is written (wavy line with a vertical stroke above G). Right: how it is played (G-F-G). Press ▶.</figcaption></figure>

<h2>The turn</h2>

<p>The <strong>turn</strong> (Italian <em>grupetto</em>) is a group of <strong>four notes</strong> that circle around the main note. Depending on which auxiliary note it starts on, there are two: the <strong>turn</strong> and the <strong>inverted turn</strong>.</p>

<p>The <strong>turn</strong> starts on the <strong>upper</strong> note: upper, main, lower and the main note again. Its sign is a small sideways S (<span aria-hidden="true">∾</span>).</p>

<figure class="tm-staff" data-tm-melody="a/4:16 g/4:16 f/4:16 g/4:16" data-tm-bpm="84"><img src="/assets/img/notacion/ornamentos/grupeto.svg" width="246" height="153" alt="Turn on G and its realization: A, G, F, G" loading="lazy" decoding="async"><figcaption>Left: how the turn is written (sideways S above G). Right: how it is played (A-G-F-G). Press ▶.</figcaption></figure>

<p>The <strong>inverted turn</strong> starts on the <strong>lower</strong> note: lower, main, upper and the main note again. Its sign is the same sideways S with a <strong>short vertical stroke</strong>.</p>

<figure class="tm-staff" data-tm-melody="f/4:16 g/4:16 a/4:16 g/4:16" data-tm-bpm="84"><img src="/assets/img/notacion/ornamentos/grupeto-inferior.svg" width="246" height="153" alt="Inverted turn on G (sideways S with a vertical stroke) and its realization: F, G, A, G" loading="lazy" decoding="async"><figcaption>Left: how the inverted turn is written (sideways S with a vertical stroke above G). Right: how it is played (F-G-A-G). Press ▶.</figcaption></figure>

<!-- Spanish-only section left out: "Otras grafías del grupeto" (S vertical, Dionisio de Pedro's Spanish treatise) -->

<h2>The trill</h2>

<p>The <strong>trill</strong> is the <strong>fast, sustained</strong> alternation of the main note with its <strong>upper neighbor</strong>, kept up for the whole value of the written note. It is shown with the letters <strong>tr</strong> (often followed by a wavy line showing how long it lasts). It is the showiest and longest of the ornaments.</p>

<p>One important detail: the starting note depends on the period. In <strong>Baroque and Classical</strong> music a trill normally begins on the <strong>upper note</strong>, like a small appoggiatura before the main note. In later music, and in many modern editions, it often begins on the <strong>main note</strong>, as in the example below. When in doubt, follow the style of the piece.</p>

<figure class="tm-staff" data-tm-melody="g/4:16 a/4:16 g/4:16 a/4:16 g/4:16 a/4:16 g/4:16 a/4:16" data-tm-bpm="120"><img src="/assets/img/notacion/ornamentos/trino.svg" width="374" height="153" alt="Trill on a G half note and its realization: fast alternation G-A" loading="lazy" decoding="async"><figcaption>Left: how it is written (tr above G). Right: how it is played, alternating G-A. Press ▶.</figcaption></figure>

<h2>Summary of ornaments</h2>

<div class="tm-table-wrap"><table class="tm-table">
  <thead><tr><th>Ornament</th><th>Symbol</th><th>Notes</th><th>How it is played (on G)</th></tr></thead>
  <tbody>
    <tr><td><strong>Appoggiatura</strong></td><td>Small note (no slash)</td><td>1 (+ the main note)</td><td>The ornamental note takes half the value: A–G.</td></tr>
    <tr><td><strong>Acciaccatura</strong></td><td>Small slashed note</td><td>1 (+ the main note)</td><td>The ornamental note, very short, before the beat: A–G.</td></tr>
    <tr><td><strong>Upper mordent</strong></td><td>Wavy line</td><td>3</td><td>Main–upper–main: G–A–G.</td></tr>
    <tr><td><strong>Lower mordent</strong></td><td>Wavy line with a vertical stroke</td><td>3</td><td>Main–lower–main: G–F–G.</td></tr>
    <tr><td><strong>Turn</strong></td><td>Sideways S <span aria-hidden="true">∾</span></td><td>4</td><td>Upper–main–lower–main: A–G–F–G.</td></tr>
    <tr><td><strong>Inverted turn</strong></td><td>Sideways S with a vertical stroke</td><td>4</td><td>Lower–main–upper–main: F–G–A–G.</td></tr>
    <tr><td><strong>Trill</strong></td><td>tr (with a wavy line)</td><td>varies</td><td>Fast, sustained alternation with the upper note: G–A–G–A…</td></tr>
  </tbody>
</table></div>

<p>Ornaments rely on the second <a href="/diccionario-musical/intervalos/intervalos-musicales/">intervals</a> to neighboring notes, and they enrich the <a href="/diccionario-musical/la-frase-musical/">musical phrase</a> together with <a href="/diccionario-musical/articulacion-musical/">articulation</a>. Be clear about the <a href="/diccionario-musical/alteraciones/">accidentals</a> of the auxiliary notes, and practice ornaments with a steady beat on the <a href="/herramientas/metronomo/">online metronome</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are musical ornaments?</div>
      <div class="tm-faq-a">Ornaments, or embellishments, are short notes that decorate a melody without changing its main line. They are written with small symbols or smaller notes and become a group of quick notes when played. The main ones are the appoggiatura, acciaccatura, mordent, turn and trill.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between an appoggiatura and an acciaccatura?</div>
      <div class="tm-faq-a">The long appoggiatura takes half the value of the main note and is written as a small note without a slash. The acciaccatura (short appoggiatura) is written with a slash and played as fast as possible, taking almost no time from the main note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is a mordent played?</div>
      <div class="tm-faq-a">The mordent is a very quick alternation of the main note with its neighbor, played as the beat arrives. The lower mordent is played main-lower-main (for example G-F-G), and the upper mordent main-upper-main (G-A-G).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a turn?</div>
      <div class="tm-faq-a">The turn is a group of four notes that circle around the main note. The turn starts on the upper note (upper-main-lower-main: A-G-F-G) and its sign is a sideways S. The inverted turn starts on the lower note (lower-main-upper-main: F-G-A-G) and its sign has a short vertical stroke.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between a mordent and a trill?</div>
      <div class="tm-faq-a">Both alternate the main note quickly with a neighbor, but the mordent is very brief (a single alternation, as the beat arrives), while the trill is sustained and lasts for the whole value of the note. Also, a mordent can be upper or lower, while a trill is made with the upper neighbor.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a trill?</div>
      <div class="tm-faq-a">The trill is the fast, sustained alternation of the main note with its upper neighbor for the whole value of the note. It is shown with the letters tr, often followed by a wavy line showing how long it lasts.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
