const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/articulation/',
  esPath: '/diccionario-musical/articulacion-musical/',
  title: 'Articulation in Music: Legato, Staccato, Accent, Tenuto',
  description: 'Musical articulation: how each note is attacked and joined. Legato, staccato, accent, tenuto and marcato, with their symbols, effect and staff examples.',
  h1: 'Articulation in Music',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  body: `
<p><strong>Articulation</strong> is the way each note is <strong>attacked, joined or separated</strong>. While <a href="/diccionario-musical/dinamica-musical/">dynamics</a> show <em>how loud</em> and <a href="/diccionario-musical/tempo-musical/">tempo</a> shows <em>how fast</em>, articulation shows <strong><em>how</em></strong> each note is played: whether notes are linked smoothly or released short, whether they stand out or are sustained. It is one of the performer's main expressive tools.</p>

<h2>The main articulations</h2>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Articulation</th><th>Symbol</th><th>Effect</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Legato</strong> (connected)</td><td>slur (curved line)</td><td>Notes joined, with no gap</td></tr>
    <tr><td><strong>Staccato</strong> (detached)</td><td>small dot above or below the note</td><td>Short, separated notes</td></tr>
    <tr><td><strong>Accent</strong></td><td>&gt; (angle)</td><td>Note attacked with more force</td></tr>
    <tr><td><strong>Tenuto</strong></td><td>horizontal line (—)</td><td>Hold the note for its full value, with weight</td></tr>
    <tr><td><strong>Marcato</strong></td><td>^ (strong accent)</td><td>Very marked and energetic</td></tr>
  </tbody>
</table>
</div>

<p><strong>Above or below the note?</strong> Articulation signs (dots, accents, etc.) go on the <strong>side opposite the stem</strong>: if the stem points up, the sign sits <em>below</em> the notehead. If the stem points down, it sits <em>above</em>. In the examples below the notes have stems pointing up, so the articulations appear under the noteheads.</p>

<h2>Legato (connected)</h2>
<p>The notes are played <strong>joined and without interruption</strong>, moving smoothly from one to the next. It is shown with a <a href="/diccionario-musical/ligaduras/">slur</a>, a curved line over the group of notes. It is the opposite of staccato.</p>
<figure class="tm-staff"><img src="/assets/img/notacion/articulacion/legato.svg" width="278" height="146" alt="Four notes under a slur marking legato on the staff" loading="lazy" decoding="async"><figcaption>Legato: the notes are joined under a slur.</figcaption></figure>

<h2>Staccato (detached)</h2>
<p>The notes are played <strong>short and separated</strong>, released before their full value (roughly halfway). It gives a light, bouncy character. It is shown with a <strong>dot</strong> above or below the notehead.</p>
<figure class="tm-staff"><img src="/assets/img/notacion/articulacion/staccato.svg" width="278" height="146" alt="Four notes with staccato dots on the staff" loading="lazy" decoding="async"><figcaption>Staccato: a dot under each note means it is played short.</figcaption></figure>

<h2>Accent</h2>
<p>The note is attacked with <strong>more force</strong> than the notes around it, standing out without changing the overall dynamic level. It is written with an angle-shaped sign (<strong>&gt;</strong>) above or below the note.</p>
<figure class="tm-staff"><img src="/assets/img/notacion/articulacion/acento.svg" width="278" height="146" alt="Four notes with accent signs on the staff" loading="lazy" decoding="async"><figcaption>Accent: each note is attacked with more force.</figcaption></figure>

<h2>Tenuto</h2>
<p>It means <strong>hold the note for its full value</strong>, giving it some weight or emphasis, without shortening it or accenting it sharply. It is written with a small <strong>horizontal line</strong> above or below the note.</p>
<figure class="tm-staff"><img src="/assets/img/notacion/articulacion/tenuto.svg" width="278" height="146" alt="Four notes with tenuto signs on the staff" loading="lazy" decoding="async"><figcaption>Tenuto: a line means sustain the note with weight.</figcaption></figure>

<h2>Marcato</h2>
<p>An accent that is <strong>stronger and more energetic</strong> than the normal one: the note is attacked in a very marked way. It is written with a vertical wedge-shaped sign (<strong>^</strong>) next to the note.</p>
<figure class="tm-staff"><img src="/assets/img/notacion/articulacion/marcato.svg" width="278" height="146" alt="Four notes with marcato signs on the staff" loading="lazy" decoding="async"><figcaption>Marcato: a strong, energetic accent.</figcaption></figure>

<p>There are also combinations, such as <strong>staccatissimo</strong> (even shorter, with a wedge instead of a dot) and <strong>portato</strong> or <em>mezzo-staccato</em> (dots under a slur: notes slightly separated but smooth; not to be confused with <a href="/diccionario-musical/efectos-de-ejecucion/portamento/">portamento</a>, which slides the pitch between two notes). Articulation is always combined with <a href="/diccionario-musical/dinamica-musical/">dynamics</a> and <a href="/diccionario-musical/tempo-musical/">tempo</a> to bring life and expression to a performance.</p>

<p><strong>Practice:</strong> test whether you recognize the main articulation marks with our <a href="/ejercicios/articulacion/">interactive quiz</a>, in both directions (name to symbol and symbol to name).</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is articulation in music?</div>
      <div class="tm-faq-a">Articulation is the way each note is attacked, joined or separated: it shows how a note is played, not how long it lasts or how loud it is. It ranges from legato (joined notes) to staccato (short, separated notes), and includes accents and other shades of attack.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between legato and staccato?</div>
      <div class="tm-faq-a">Legato joins the notes without interruption, smoothly and continuously, and is shown with a slur. Staccato separates and shortens them, giving a light, bouncy character, and is shown with a small dot above or below the note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does the dot above a note mean?</div>
      <div class="tm-faq-a">A dot above or below the notehead means staccato: shorten the note and play it brief and detached from the next one, usually about half its written value.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the accent (&gt;) in music?</div>
      <div class="tm-faq-a">The accent, written as an angle-shaped sign (&gt;) above or below the note, means that note should be attacked with more force than the notes around it, standing out without changing the overall dynamic level.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
