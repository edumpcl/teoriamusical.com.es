const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/performance-effects/arpeggiated-chord/',
  esPath: '/diccionario-musical/efectos-de-ejecucion/arpegiado/',
  title: 'Arpeggiated (Rolled) Chord: Meaning and Notation',
  description: 'What an arpeggiated or rolled chord is, how the wavy line is written, and how it differs from an arpeggio. Notation examples and audio.',
  h1: 'Arpeggiated Chord (Rolled Chord)',
  crumbLabel: 'Arpeggiated Chord',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Performance Effects', '/diccionario-musical/efectos-de-ejecucion/']],
  articleClass: 'tm-article tm-article--wide',
  scripts: ['tm-piano-audio', 'efectos-audio'],
  body: `<style>
.tm-gl-btn { margin: .25rem .5rem .25rem 0; font: inherit; font-weight: 600; font-size: .95rem; padding: .55rem 1rem; border: 2px solid #8c6609; border-radius: 8px; background: #fff; color: #6b5210; cursor: pointer; }
.tm-gl-btn:hover, .tm-gl-btn:focus-visible { background: #fdf8ee; color: #6b5210; }
.tm-gl-btn.tm-gl-sonando { background: #8c6609; color: #fff; border-color: #8c6609; }
</style>

<p>An <strong>arpeggiated chord</strong> (also called a <strong>rolled chord</strong>, or a chord that is <em>arpeggiated</em> or <em>spread</em>) is a chord whose notes are not played at the same time but <strong>one after another</strong>, usually from the lowest note to the highest. It is shown by a <strong>vertical wavy line</strong> in front of the chord. It is one of the <a href="/diccionario-musical/efectos-de-ejecucion/">performance effects</a>: it does not change the notes of the chord, only the way they are played.</p>

<h2>How it is written</h2>

<p>The chord is written with all its notes lined up vertically, and a <strong>wavy line</strong> is added in front of it, covering the lowest to the highest note. The line means that the notes are played in succession. <strong>Normally the roll goes upward</strong>, from the lowest note to the highest. An <strong>arrow pointing down</strong> at the end of the line means the roll goes downward.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/efectos/acorde-bloque.svg" width="217" height="122" alt="A C major chord written the usual way: a half note with four notes, C, E, G and C, played together." decoding="async"><figcaption>A C major chord written the usual way: all four notes sound together.</figcaption></figure>

<figure class="tm-staff"><img src="/assets/img/notacion/efectos/arpegiado.svg" width="222" height="122" alt="An arpeggiated C major chord (C, E, G and C): the same chord with a vertical wavy line in front; the notes are played one after another, from lowest to highest." decoding="async"><figcaption>The same chord with the wavy line: it is played from the lowest note to the highest.</figcaption></figure>

<figure class="tm-staff"><img src="/assets/img/notacion/efectos/arpegiado-descendente.svg" width="228" height="122" alt="A C major chord (C, E, G and C) rolled downward: the wavy line in front of the chord ends in a downward arrow; the notes are played from highest to lowest." decoding="async"><figcaption>With a downward arrow, the roll goes from the highest note to the lowest.</figcaption></figure>

<p>In piano music, the wavy line can span both staves (UK: staves) when the chord is shared between the two hands and a single roll is wanted.</p>

<h2>Listen to it</h2>

<p>Listen to the same C major chord (C, E, G, C) in four ways. In the block chord, all the notes start together. In the arpeggiated chord, they enter one after another, as the wavy line asks; <strong>in this example</strong>, the notes keep sounding while the others enter. In the arpeggio, the notes form a melodic line with their own rhythm and, here, each one is released before the next begins.</p>

<p>
<button type="button" class="tm-gl-btn" data-modo="piano" data-eventos="60:0:2.2 64:0:2.2 67:0:2.2 72:0:2.2" aria-pressed="false">▶ Block chord (all together)</button>
<button type="button" class="tm-gl-btn" data-modo="piano" data-eventos="60:0:2.2 64:0.1:2.1 67:0.2:2 72:0.3:1.9" aria-pressed="false">▶ Arpeggiated, upward</button>
<button type="button" class="tm-gl-btn" data-modo="piano" data-eventos="72:0:2.2 67:0.1:2.1 64:0.2:2 60:0.3:1.9" aria-pressed="false">▶ Arpeggiated, downward</button>
<button type="button" class="tm-gl-btn" data-modo="piano" data-eventos="60:0:0.45 64:0.45:0.45 67:0.9:0.45 72:1.35:1" aria-pressed="false">▶ Arpeggio (note by note)</button>
</p>

<h2>Arpeggiated chord vs. arpeggio</h2>

<p>They are similar, but they are not the same thing:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Aspect</th><th>Arpeggiated chord</th><th>Arpeggio</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>What it is</strong></td><td>A chord whose notes are played in succession instead of together.</td><td>A series of notes that runs through the notes of a chord, usually as a melodic figure.</td></tr>
    <tr><td><strong>How it is written</strong></td><td>The notes are stacked vertically like a chord, with a wavy line in front.</td><td>The notes are written one after another, each with its own pitch and rhythmic value.</td></tr>
    <tr><td><strong>Length of the notes</strong></td><td>They can overlap and keep sounding while the others enter, depending on the instrument and the performance.</td><td>Set by the note value of each note; the notes may overlap or be separated.</td></tr>
    <tr><td><strong>Rhythm</strong></td><td>The wavy line says the notes are played in succession; the exact timing is left to the performer.</td><td>The rhythm is written with note values and the other signs in the score.</td></tr>
  </tbody>
</table>
</div>

<p>To review how the chord is built, see the <a href="/diccionario-musical/acordes/acorde-perfecto-mayor/">major triad</a> and <a href="/diccionario-musical/acordes/acordes-triadas/">triads</a>. To sing an arpeggio, the <a href="/juegos/entonacion/triple-salto/">triple jump</a> game asks you for the three notes of a chord one after another.</p>

<h2>What it is used for, and on which instruments</h2>

<ul>
  <li><strong>Piano:</strong> it spreads the notes of a chord over time, giving a sense of breadth and motion, and it can make very wide chords easier to play. See the <a href="/diccionario-musical/notas-del-piano/">piano</a>.</li>
  <li><strong>Harp:</strong> the notes of the chord are plucked in succession, one string after another, which is very natural on this instrument.</li>
  <li><strong>Guitar:</strong> the notes can be plucked one by one with the fingers or a pick instead of strumming the chord. See the <a href="/diccionario-musical/notas-de-la-guitarra/">guitar</a>.</li>
  <li><strong>Bowed strings:</strong> chords of three or four notes are usually played in succession or split over several bow strokes, because the bow cannot normally keep all those strings sounding with the same strength at once. Two-note intervals (double stops), however, can be played together. See <a href="/diccionario-musical/instrumentos-de-cuerda-frotada/">bowed strings</a> and, as an example, the <a href="/diccionario-musical/notas-del-violin/">violin</a>.</li>
</ul>

<h2>Related performance effects</h2>

<p>The arpeggiated chord makes the notes of a chord enter one after another. The <a href="/diccionario-musical/efectos-de-ejecucion/glissando/">glissando</a> connects two pitches with a slide or a fast run of notes. The <a href="/diccionario-musical/efectos-de-ejecucion/tremolo/">tremolo</a> repeats one note quickly or alternates quickly between notes.</p>

<p class="tm-credito-piano" style="font-size:.8rem;color:#686868;margin-top:1.5rem">Piano audio: <em>Salamander Grand Piano</em> samples by Alexander Holm, licensed under <a href="https://creativecommons.org/licenses/by/3.0/" rel="nofollow noopener">CC BY 3.0</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is an arpeggiated chord?</div>
      <div class="tm-faq-a">It is a chord whose notes are played one after another instead of all at once. It is usually shown by a vertical wavy line in front of the chord. It is also called a rolled chord.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you write an arpeggiated chord?</div>
      <div class="tm-faq-a">The notes are written stacked like a chord, with a wavy line in front of them from the lowest to the highest note. In piano music, the sign can span both staves if the roll includes both hands.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is it always played from the bottom up?</div>
      <div class="tm-faq-a">Normally, yes: the roll goes upward from the lowest note to the highest. An arrow pointing down means it should be played downward.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between an arpeggiated chord and an arpeggio?</div>
      <div class="tm-faq-a">An arpeggiated chord is written as a vertical chord with a sign saying its notes are played in succession. An arpeggio presents the notes of a chord as a melodic line, written note by note with its own rhythm.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which instruments can arpeggiate a chord?</div>
      <div class="tm-faq-a">The piano, harp and guitar can play arpeggiated chords. On bowed string instruments such as the violin, chords of three or four notes are usually played in succession or split over several bow strokes, while some two-note combinations can sound together.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
