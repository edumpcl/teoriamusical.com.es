const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/performance-effects/tremolo/',
  esPath: '/diccionario-musical/efectos-de-ejecucion/tremolo/',
  title: 'Tremolo in Music: Meaning, Notation and Vibrato Difference',
  description: 'What tremolo is, how it is written with slashes on the stem, and how it differs from vibrato and the trill. Notation examples and audio.',
  h1: 'Tremolo',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Performance Effects', '/diccionario-musical/efectos-de-ejecucion/']],
  articleClass: 'tm-article tm-article--wide',
  scripts: ['tm-piano-audio', 'efectos-audio'],
  body: `<style>
.tm-gl-btn { margin: .25rem .5rem .25rem 0; font: inherit; font-weight: 600; font-size: .95rem; padding: .55rem 1rem; border: 2px solid #8c6609; border-radius: 8px; background: #fff; color: #6b5210; cursor: pointer; }
.tm-gl-btn:hover, .tm-gl-btn:focus-visible { background: #fdf8ee; color: #6b5210; }
.tm-gl-btn.tm-gl-sonando { background: #8c6609; color: #fff; border-color: #8c6609; }
</style>

<p><strong>Tremolo</strong> means <strong>repeating the same note very fast</strong>, or <strong>alternating very fast between two notes</strong>, for the whole written value. It is shown by <strong>slanted slashes</strong> across the stem of the note. It is one of the <a href="/diccionario-musical/efectos-de-ejecucion/">performance effects</a>, and it gives a long note movement, tension or shimmer.</p>

<h2>How it is written</h2>

<p>The slanted slashes show the <strong>rhythmic subdivision</strong> of the tremolo. In the examples below, one slash means eighth notes, two mean sixteenth notes and three mean thirty-second notes. So a half note (UK: minim) with three slashes is played as repeated thirty-second notes for the length of the half note. In other contexts, especially on bowed strings, <strong>unmeasured tremolo</strong> is used: the player repeats the note as fast as possible, and each repetition does not need to be heard or counted as an exact subdivision. How it is played depends on the type of tremolo and on the musical context.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/efectos/tremolo-rayas.svg" width="527" height="122" alt="Single-note tremolo with one, two and three slashes on the stems of three half-note C's: the note is repeated in eighth notes, sixteenth notes or thirty-second notes." decoding="async"><figcaption>Single-note tremolo with one, two and three slashes: eighth, sixteenth and thirty-second notes.</figcaption></figure>

<p><strong>Alternating tremolo</strong> is written with two notes joined by diagonal beams: the two notes alternate quickly at the subdivision shown. In this example, the two half notes with three beams mean an alternation of C and E in thirty-second notes for the combined length of a whole note.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/efectos/tremolo-alternado.svg" width="232" height="122" alt="Alternating tremolo between two notes, C and E, joined by three beams: the two notes alternate in thirty-second notes for the length of the two half notes." decoding="async"><figcaption>Alternating tremolo between C and E, with three beams.</figcaption></figure>

<h2>Listen to it</h2>

<p>First, one long note without tremolo, for comparison. Then the same note struck many times in a row, and finally the alternating piano tremolo between C and E:</p>

<p>
<button type="button" class="tm-gl-btn" data-modo="vibrato" data-nota="69" data-prof="0" data-vel="0" data-dur="3" aria-pressed="false">▶ Long note (no tremolo)</button>
<button type="button" class="tm-gl-btn" data-modo="repetida" data-nota="69" data-veces="30" data-dur="3" aria-pressed="false">▶ Repeated note (10 per second)</button>
<button type="button" class="tm-gl-btn" data-modo="piano" data-eventos="60:0:0.1 64:0.0625:0.1 60:0.125:0.1 64:0.1875:0.1 60:0.25:0.1 64:0.3125:0.1 60:0.375:0.1 64:0.4375:0.1 60:0.5:0.1 64:0.5625:0.1 60:0.625:0.1 64:0.6875:0.1 60:0.75:0.1 64:0.8125:0.1 60:0.875:0.1 64:0.9375:0.1 60:1:0.1 64:1.0625:0.1 60:1.125:0.1 64:1.1875:0.1 60:1.25:0.1 64:1.3125:0.1 60:1.375:0.1 64:1.4375:0.1 60:1.5:1" aria-pressed="false">▶ Alternating tremolo (piano, C–E)</button>
</p>

<p>The repeated note uses a synthetic sound, not the tone of a violin: it demonstrates the mechanism and is not a recreation of a bow tremolo. It helps you recognize a fast repetition of the same pitch; a bow tremolo has a different sound and articulation.</p>

<h2>Where it is used</h2>

<ul>
  <li><strong>Bowed strings:</strong> the bow moves very fast, back and forth, on the same string: this is the "bow tremolo". See the <a href="/diccionario-musical/notas-del-violin/">violin</a> and the <a href="/diccionario-musical/notas-del-violonchelo/">cello</a>.</li>
  <li><strong>Piano:</strong> tremolo is usually a fast alternation between two notes or two chords. See the <a href="/diccionario-musical/notas-del-piano/">piano</a>.</li>
  <li><strong>Mandolin and guitar:</strong> the mandolin, whose pick cannot sustain a sound, uses tremolo to prolong a note. On classical guitar there is a famous tremolo piece: <em>Recuerdos de la Alhambra</em> by Francisco Tárrega, where the fingers repeat the melody note while the thumb plays the bass accompaniment. See the <a href="/diccionario-musical/notas-de-la-guitarra/">guitar</a>.</li>
  <li><strong>Percussion:</strong> the usual term is the <strong>roll</strong>, a very fast repetition of strokes that is played in different ways depending on the instrument. See the <a href="/diccionario-musical/notas-de-los-timbales/">timpani</a>.</li>
</ul>

<h2>Tremolo vs. vibrato</h2>

<p><a href="/diccionario-musical/efectos-de-ejecucion/vibrato/">Vibrato</a> is a gentle oscillation of the <strong>pitch</strong> of a single note; tremolo, on the other hand, <strong>repeats</strong> the note (or alternates two) and does not change the pitch of each note. The names of some devices add to the confusion. On the <a href="/diccionario-musical/notas-del-vibrafono/">vibraphone</a>, the motor switch labeled "vibrato" makes the volume oscillate, not the pitch, so strictly speaking it is a tremolo. On the electric guitar, the "tremolo" of some amplifiers varies the volume. The so-called tremolo arm (whammy bar), however, changes the tension of the strings and so changes their pitch; when it is used to oscillate periodically between pitches, it produces a vibrato effect.</p>

<p>It is not a <a href="/diccionario-musical/ornamentos-musicales/">trill</a> either: a trill alternates a note with the note just above it, while an alternating tremolo joins any two notes, often farther apart.</p>

<h2>Related performance effects</h2>

<p>For other effects with notes following one another, see the <a href="/diccionario-musical/efectos-de-ejecucion/arpegiado/">arpeggiated chord</a>, which spreads the notes of a chord over time, and the <a href="/diccionario-musical/efectos-de-ejecucion/glissando/">glissando</a>, which slides the pitch between two notes.</p>

<p class="tm-credito-piano" style="font-size:.8rem;color:#686868;margin-top:1.5rem">Piano audio: <em>Salamander Grand Piano</em> samples by Alexander Holm, licensed under <a href="https://creativecommons.org/licenses/by/3.0/" rel="nofollow noopener">CC BY 3.0</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is tremolo in music?</div>
      <div class="tm-faq-a">It is the very fast repetition of the same note, or the very fast alternation of two notes, for the written value. It is shown by slanted slashes across the stem of the note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What do the slashes of a tremolo mean?</div>
      <div class="tm-faq-a">The slashes show the rhythmic subdivision of the tremolo: one slash means eighth notes, two mean sixteenth notes and three mean thirty-second notes. On bowed strings, unmeasured tremolo is also used, in which the note is repeated very fast without counting each repetition. It depends on the type of tremolo and the context.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is alternating tremolo?</div>
      <div class="tm-faq-a">It is tremolo between two notes, written joined by diagonal beams: the notes alternate quickly at the subdivision shown. It is very common on the piano.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between tremolo and vibrato?</div>
      <div class="tm-faq-a">Vibrato is a gentle oscillation of the pitch of a note. Tremolo repeats the note (or alternates two) and does not change the pitch of each note. On the vibraphone, the so-called vibrato is really a tremolo, because the volume oscillates.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">On which instruments is tremolo used?</div>
      <div class="tm-faq-a">On bowed strings with the bow, on the piano by alternating two notes, on the mandolin and guitar by plucking the same note many times, and in percussion, where the equivalent is the roll.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
