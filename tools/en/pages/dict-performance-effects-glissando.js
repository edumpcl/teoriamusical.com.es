const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/performance-effects/glissando/',
  esPath: '/diccionario-musical/efectos-de-ejecucion/glissando/',
  title: 'Glissando: Meaning, Notation and Examples',
  description: 'What a glissando is: a slide between two notes. How it is written, continuous vs. stepped types, glissando vs. portamento, famous examples and audio.',
  h1: 'Glissando',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Performance Effects', '/diccionario-musical/efectos-de-ejecucion/']],
  articleClass: 'tm-article tm-article--wide',
  scripts: ['tm-piano-audio', 'efectos-audio'],
  body: `<style>
.tm-gl-btn { margin: .25rem .5rem .25rem 0; font: inherit; font-weight: 600; font-size: .95rem; padding: .55rem 1rem; border: 2px solid #8c6609; border-radius: 8px; background: #fff; color: #6b5210; cursor: pointer; }
.tm-gl-btn:hover, .tm-gl-btn:focus-visible { background: #fdf8ee; color: #6b5210; }
.tm-gl-btn.tm-gl-sonando { background: #8c6609; color: #fff; border-color: #8c6609; }
</style>

<p>A <strong>glissando</strong> (abbreviated <em>gliss.</em>) is an effect in which the sound <strong>slides from one note to another</strong>. Depending on the instrument, it can be a <strong>continuous slide</strong> through all the pitches in between (voice, violin, slide trombone) or a <strong>very fast run through the notes of a scale</strong> (piano, harp), where you hear the individual notes. It is written with a line joining the two notes.</p>

<h2>How it is written</h2>

<p>A glissando is shown by a <strong>straight line</strong> (sometimes wavy) that goes from the first notehead to the second, often with the abbreviation <em>gliss.</em> above it. The exact notation can vary with the instrument, the edition and the effect wanted. The starting note and the arrival note are written; the pitches in between are not. If the line goes up, the glissando is <strong>ascending</strong>; if it goes down, it is <strong>descending</strong>.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/glissando/ascendente.svg" width="373" height="122" alt="Ascending glissando: a straight line joins a low C to the C an octave higher, marked gliss." decoding="async"><figcaption>Ascending glissando: from a C to the C an octave higher.</figcaption></figure>

<figure class="tm-staff"><img src="/assets/img/notacion/glissando/descendente.svg" width="373" height="122" alt="Descending glissando: a straight line goes down from G to a low C, marked gliss." decoding="async"><figcaption>Descending glissando: from G down to C.</figcaption></figure>

<p>Listen to the first and the second as continuous glissandos, with a pitch that slides without steps:</p>

<p>
<button type="button" class="tm-gl-btn" data-modo="continuo" data-de="60" data-a="72" data-dur="2" aria-pressed="false">▶ C → C (up an octave)</button>
<button type="button" class="tm-gl-btn" data-modo="continuo" data-de="67" data-a="60" data-dur="2" aria-pressed="false">▶ G → C (down a 5th)</button>
</p>

<p>Sometimes only the starting note is written, with a line that rises or falls and no arrival note. This is a glissando of <strong>indefinite pitch</strong>: the performer decides how far it goes.</p>

<h2>Types of glissando</h2>

<p>Depending on the instrument, a glissando can be continuous or stepped:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Type</th><th>What it is like</th><th>Instruments</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Continuous</strong></td><td>The pitch changes smoothly between the starting note and the arrival note.</td><td>Voice, <a href="/diccionario-musical/instrumentos-de-cuerda-frotada/">bowed strings</a> (the finger slides along the string), the <a href="/diccionario-musical/notas-del-trombon/">slide trombone</a>, pedal timpani and slide guitar. The clarinet can do it by combining special fingerings and the embouchure, especially in certain registers.</td></tr>
    <tr><td><strong>Stepped</strong></td><td>Fixed pitches are played very fast, like the keys of a piano: you hear the successive notes, but so close together that it sounds like a slide.</td><td>Piano, harp and mallet percussion (xylophone, marimba, vibraphone), drawing the mallets across the bars.</td></tr>
  </tbody>
</table>
</div>

<h3>The piano glissando</h3>

<p>On the piano, it is played by quickly sliding one or more fingers (often the fingernail) across the keys, with a technique adapted to the direction of the movement so it does not hurt. On the <strong>white keys</strong> you hear the C major scale, and on the <strong>black keys</strong> the F♯ major <a href="/diccionario-musical/tonalidades/escala-pentatonica/">pentatonic scale</a> (F♯, G♯, A♯, C♯, D♯). In both cases the effect is <strong>stepped</strong>: you hear successive notes, not a continuous slide of pitch. This is how it is written and how it sounds on the white keys:</p>

<figure class="tm-staff"><img src="/assets/img/notacion/glissando/piano.svg" width="709" height="122" alt="A written piano glissando and what sounds: on the left, two C notes joined by a line marked gliss.; on the right, the notes heard on the white keys: C, D, E, F, G, A, B, C." decoding="async"><figcaption>Piano glissando: as written (left) and what sounds on the white keys (right).</figcaption></figure>

<p>Compare the two piano glissandos with the continuous one above:</p>

<p>
<button type="button" class="tm-gl-btn" data-modo="escalonado" data-melodia="c/4:32 d/4:32 e/4:32 f/4:32 g/4:32 a/4:32 b/4:32 c/5:h" data-bpm="120" aria-pressed="false">▶ Piano, white keys (C → C)</button>
<button type="button" class="tm-gl-btn" data-modo="escalonado" data-melodia="f#/4:32 g#/4:32 a#/4:32 c#/5:32 d#/5:32 f#/5:h" data-bpm="120" aria-pressed="false">▶ Piano, black keys (F♯ → F♯)</button>
</p>

<p>On the <strong>harp</strong>, the player sets the pedals so that the strings form the scale (or even a chord) to be slid across, and then runs the fingers over the strings.</p>

<h2>Glissando and portamento</h2>

<p>The glissando and the <strong><a href="/diccionario-musical/efectos-de-ejecucion/portamento/">portamento</a></strong> are related effects, and in some contexts their names are used almost interchangeably. As a rough guide, a glissando usually marks a run between two pitches, often with a written instruction in the score; a portamento is an expressive link between two notes, especially in singing and on bowed strings, where the pitch slides toward the target note and which is often decided by the performer. The difference is not absolute: it depends on the instrument and the tradition. In the examples below, the glissando moves at a constant speed, while the portamento starts slowly, speeds up and slows down on arrival. Hear the difference between a direct C → E jump, a portamento and a long glissando:</p>

<figure class="tm-staff"><img src="/assets/img/efectos/portamento-curvas.svg" width="480" height="312" alt="Three graphs of pitch going from C to E: a direct jump with no sliding; a 0.3-second portamento with a smooth curve that starts slowly, speeds up and slows down on arrival; and a 2-second glissando at constant speed, a straight line." decoding="async"><figcaption>C → E: direct jump, portamento and glissando.</figcaption></figure>

<p>
<button type="button" class="tm-gl-btn" data-modo="continuo" data-de="60" data-a="64" data-dur="0.01" aria-pressed="false">▶ Direct jump C → E</button>
<button type="button" class="tm-gl-btn" data-modo="portamento" data-de="60" data-a="64" data-dur="0.3" aria-pressed="false">▶ Portamento C → E (0.3 s)</button>
<button type="button" class="tm-gl-btn" data-modo="continuo" data-de="60" data-a="64" data-dur="2" aria-pressed="false">▶ Glissando C → E (2 s)</button>
</p>

<h2>Famous examples</h2>

<ul>
  <li><strong>Rhapsody in Blue</strong> (1924), by George Gershwin: the piece opens with a clarinet trill and a rising 17-note scale that the clarinetist turns into a glissando, one of the best-known in 20th-century music. The most repeated story says it began in a rehearsal, when clarinetist Ross Gorman slid up the top of the scale as a joke and Gershwin decided to keep it.</li>
  <li><strong>Beethoven's "Waldstein" Sonata</strong> (Op. 53): in the coda of the last movement there are glissandos in octaves.</li>
  <li><strong>The trombone</strong> uses it in the orchestra, the wind band and jazz for rising and falling effects; it is the brass instrument that does it most naturally.</li>
</ul>

<h2>How to practice a glissando with your voice</h2>

<p>Singing a glissando is a good exercise in <strong>pitch control</strong>: you have to change pitch continuously and at a steady speed, and arrive on the target note on time. It is practiced with a "siren": a long vowel ("oo" or "oh") that rises and falls without jumps. To turn it into a game, try <a href="/juegos/entonacion/lanzamiento-de-jabalina/">javelin throw</a>, where a lane guides you and measures how long you stay on the ideal path.</p>

<p>To know how far apart the two notes are, review <a href="/diccionario-musical/intervalos/intervalos-musicales/">musical intervals</a>. The glissando is one of the <a href="/diccionario-musical/efectos-de-ejecucion/">performance effects</a>, along with <a href="/diccionario-musical/efectos-de-ejecucion/portamento/">portamento</a>, the <a href="/diccionario-musical/efectos-de-ejecucion/arpegiado/">arpeggiated chord</a>, <a href="/diccionario-musical/efectos-de-ejecucion/vibrato/">vibrato</a> and <a href="/diccionario-musical/efectos-de-ejecucion/tremolo/">tremolo</a>. For other signs that change how a note sounds, see <a href="/diccionario-musical/ornamentos-musicales/">musical ornaments</a> and <a href="/diccionario-musical/articulacion-musical/">articulation</a>.</p>

<p class="tm-credito-piano" style="font-size:.8rem;color:#686868;margin-top:1.5rem">Piano audio: <em>Salamander Grand Piano</em> samples by Alexander Holm, licensed under <a href="https://creativecommons.org/licenses/by/3.0/" rel="nofollow noopener">CC BY 3.0</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a glissando?</div>
      <div class="tm-faq-a">A glissando is an effect in which the sound slides from one note to another. Depending on the instrument, it can be a continuous slide through all the pitches in between, or a very fast run through the notes of a scale, as on the piano. It is abbreviated gliss. and written with a line joining the two notes.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is a glissando written in a score?</div>
      <div class="tm-faq-a">With a straight line, or sometimes a wavy one, from the first note to the second, often with the abbreviation gliss. above it. If the line goes up, the glissando is ascending; if it goes down, descending. The notation can vary with the instrument and the edition.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between glissando and portamento?</div>
      <div class="tm-faq-a">They are related effects, and their names are sometimes used alike. As a rough guide, a glissando usually marks a run between two pitches, often written in the score; a portamento is an expressive link between two notes, typical of singing and strings, that the performer often decides. The difference is not absolute: it depends on the instrument and the tradition.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which instruments can play a continuous glissando?</div>
      <div class="tm-faq-a">Those that can vary pitch continuously: the voice, bowed strings, the slide trombone, pedal timpani and slide guitar. The clarinet can do it by combining special fingerings and the embouchure, as in the opening of Rhapsody in Blue.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you play a glissando on the piano?</div>
      <div class="tm-faq-a">By quickly sliding one or more fingers, often the fingernail, across the keys, with a technique adapted to the direction of the movement. On the white keys you hear the C major scale and on the black keys the F♯ major pentatonic scale. It is a stepped glissando: you hear the successive notes, not a continuous slide of pitch.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
