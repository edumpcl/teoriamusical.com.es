const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/performance-effects/portamento/',
  esPath: '/diccionario-musical/efectos-de-ejecucion/portamento/',
  title: 'Portamento in Music: Meaning and Glissando Difference',
  description: 'What portamento is: an expressive slide from one note to the next. How it sounds, how it differs from glissando and portato, and which instruments use it.',
  h1: 'Portamento',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Performance Effects', '/diccionario-musical/efectos-de-ejecucion/']],
  articleClass: 'tm-article tm-article--wide',
  scripts: ['tm-piano-audio', 'efectos-audio'],
  body: `<style>
.tm-gl-btn { margin: .25rem .5rem .25rem 0; font: inherit; font-weight: 600; font-size: .95rem; padding: .55rem 1rem; border: 2px solid #8c6609; border-radius: 8px; background: #fff; color: #6b5210; cursor: pointer; }
.tm-gl-btn:hover, .tm-gl-btn:focus-visible { background: #fdf8ee; color: #6b5210; }
.tm-gl-btn.tm-gl-sonando { background: #8c6609; color: #fff; border-color: #8c6609; }
</style>

<p><strong>Portamento</strong> is an <strong>expressive slide</strong> from one note to another: the voice or the instrument "carries" the pitch from the first note to the second instead of jumping from one to the other. It is typical of singing and string playing, and it is often <strong>not written</strong> in the score: the performer decides. It is one of the <a href="/diccionario-musical/efectos-de-ejecucion/">performance effects</a>, and it is very close to the <a href="/diccionario-musical/efectos-de-ejecucion/glissando/">glissando</a>.</p>

<p>The word comes from the Italian <em>portare</em>, "to carry": in singing, <em>portamento di voce</em> meant "carrying the voice" from one note to the next.</p>

<h2>How it sounds and how it looks</h2>

<p>The same interval, from C to E, played in three different ways. The graph shows the pitch of the note over time:</p>

<figure class="tm-staff"><img src="/assets/img/efectos/portamento-curvas.svg" width="480" height="312" alt="Three graphs of pitch going from C to E: a direct jump with no sliding; a 0.3-second portamento with a smooth curve that starts slowly, speeds up and slows down on arrival; and a 2-second glissando at constant speed, a straight line." decoding="async"><figcaption>C → E: direct jump, portamento and glissando.</figcaption></figure>

<p>
<button type="button" class="tm-gl-btn" data-modo="continuo" data-de="60" data-a="64" data-dur="0.01" aria-pressed="false">▶ Direct jump C → E</button>
<button type="button" class="tm-gl-btn" data-modo="portamento" data-de="60" data-a="64" data-dur="0.3" aria-pressed="false">▶ Portamento C → E (0.3 s)</button>
<button type="button" class="tm-gl-btn" data-modo="continuo" data-de="60" data-a="64" data-dur="2" aria-pressed="false">▶ Glissando C → E (2 s)</button>
</p>

<p>Notice the difference. In the <strong>portamento</strong> the change of pitch is short and smooth; it feels like a "drag" toward the arrival note, and the curve starts slowly, speeds up and slows down on arrival. In the <strong>glissando</strong> the slide is long and at constant speed, and it is heard as an effect in itself.</p>

<h2>Portamento and glissando</h2>

<p>The two names are sometimes used as synonyms, and the border between them is not absolute: it depends on the instrument and the tradition. As a rough guide:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Aspect</th><th>Portamento</th><th>Glissando</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>What it is</strong></td><td>An expressive link between two notes, in which the pitch slides toward the target note.</td><td>A run between two pitches, often a wide one, heard as an effect.</td></tr>
    <tr><td><strong>Usual length</strong></td><td>Normally short.</td><td>Usually takes more time of its own.</td></tr>
    <tr><td><strong>In the score</strong></td><td>Usually decided by the performer.</td><td>Usually marked with a line and <em>gliss.</em></td></tr>
    <tr><td><strong>Typical instruments</strong></td><td>Voice and bowed strings.</td><td>Voice, strings, slide trombone; stepped on piano and harp.</td></tr>
  </tbody>
</table>
</div>

<h2>Where it is used</h2>

<ul>
  <li><strong>Singing:</strong> it has been an expressive device for centuries, and taste has changed a lot with period and style: what is natural in some repertoires is avoided in others. In popular music, sliding between notes is very common.</li>
  <li><strong>Bowed strings:</strong> when shifting position, the finger can slide along the string and let the slide be heard. On the <a href="/diccionario-musical/notas-del-violin/">violin</a> and the <a href="/diccionario-musical/notas-del-violonchelo/">cello</a>, its use has varied across periods.</li>
  <li><strong>Slide trombone:</strong> the slide lets the pitch move continuously between notes. See the <a href="/diccionario-musical/notas-del-trombon/">trombone</a>.</li>
  <li><strong>Synthesizers:</strong> many have a function called exactly <em>portamento</em> (or <em>glide</em>), which slides the pitch between notes played one after another.</li>
</ul>

<h2>Not to be confused with portato</h2>

<p><strong>Portato</strong> has nothing to do with sliding pitch: it is an <a href="/diccionario-musical/articulacion-musical/">articulation</a> halfway between legato and staccato, in which the notes are played slightly separated. The names look alike, but one affects pitch and the other affects how notes are attacked and joined. It is also not the same as <strong>legato</strong>, which joins notes without a gap but without sliding the pitch between them.</p>

<h2>How it is written</h2>

<p>Portamento has no universal sign. Some scores use a short line between the two notes or markings such as <em>port.</em>, while in many styles it is left to the performer's judgment. For the glissando sign, with its line and the abbreviation <em>gliss.</em>, see the <a href="/diccionario-musical/efectos-de-ejecucion/glissando/">glissando</a> page.</p>

<p>To train control of your voice between two notes, try the <a href="/juegos/entonacion/lanzamiento-de-jabalina/">javelin throw</a> game, where you have to slide from one note to another at a steady speed.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is portamento?</div>
      <div class="tm-faq-a">It is an expressive slide from one note to another, in which the pitch glides toward the target note instead of jumping. It is typical of singing and bowed strings, and it is often decided by the performer rather than written.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between portamento and glissando?</div>
      <div class="tm-faq-a">They are related effects and are sometimes used as synonyms. As a rough guide, portamento is a short expressive link between two notes that the performer usually decides, and glissando is a longer run, often written in the score. The border is not absolute.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is portato, and is it the same as portamento?</div>
      <div class="tm-faq-a">No. Portato is an articulation between legato and staccato, with the notes slightly separated. Portamento slides the pitch between two notes; portato does not change the pitch.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is portamento written in the score?</div>
      <div class="tm-faq-a">It has no universal sign. Sometimes it appears as a short line between the two notes or with the marking port., but it is often left to the judgment of the performer and the style.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which instruments can play portamento?</div>
      <div class="tm-faq-a">The voice, bowed string instruments by sliding the finger when changing position, and the slide trombone. Many synthesizers also have a portamento or glide function.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
