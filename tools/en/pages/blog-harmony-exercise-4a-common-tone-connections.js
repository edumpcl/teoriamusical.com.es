const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/blog/harmony-exercise-4a-common-tone-connections/',
  esPath: '/blog/practica-no-4-a/',
  title: "Harmony Exercise 4a: Common-Tone Chord Connections",
  description: "Harmony exercise 4a: connect chords keeping the common tone and name the key. Four-part writing practice with audio and a proposed solution.",
  h1: "Harmony Exercise 4a",
  crumbs: [['Blog', '/blog/'], ['Harmony exercises', '/blog/armonia/']],
  datePublished: '2020-01-01',
  dateModified: '2026-05-29',
  body: `
<h2 id="h-exercise">Exercise</h2>
<p>These are exercises in <strong>four-part harmony</strong> (soprano, alto, tenor and bass) in the style taught in Spanish conservatories. In a <strong>connection that keeps the common tone</strong>, any note that two consecutive chords share stays in the <em>same voice</em>, while the other voices move to the nearest chord tone. This gives smooth voice leading and avoids parallel fifths and octaves.</p>
<p>Connect the following chords keeping the common tone, and name the key in the cases where it can be determined. Each numbered pair is one connection; the sheet gives the bass line with its figures.</p>
<p><strong>Reading the bass figures.</strong> This practice uses the Spanish conservatory system of figured bass. A sign alone under a bass note alters the <em>third</em> above it: <strong>+</strong> means the third is the leading tone (a major third, as in a dominant chord), <strong>♯</strong> raises the third and <strong>♭</strong> lowers it. A number with a sign alters that interval: <strong>♯5</strong> raises the fifth, and <strong>♭5</strong> together with <strong>♭</strong> gives a diminished triad. A bass note with no figure carries the plain chord of the key. The sheet shows only the bass and its figures; you write the three upper voices.</p>
<figure><a href="/assets/img/2021/01/Practica-no-4-a-enunciado-1-1-scaled.jpeg"><picture><source type="image/webp" srcset="/assets/img/2021/01/Practica-no-4-a-enunciado-1-1-scaled.webp"><img src="/assets/img/2021/01/Practica-no-4-a-enunciado-1-1-scaled.jpeg" width="1811" height="2560" alt="Harmony exercise 4a: bass line with figures for 30 connections"/></picture></a></figure>
<h3 id="h-audio">Audio</h3>
<figure><audio controls src="/assets/img/2021/01/Practica-no-4-a.mp3"></audio></figure>
<h2 id="h-solution">Proposed solution</h2>
<p>Below is one possible solution. In harmony there is no single correct answer: other voicings that follow the rules are just as valid. The bass is shown in blue.</p>
<figure><a href="/assets/img/2021/01/Practica_no_4_a_resolucion.png"><picture><source type="image/webp" srcset="/assets/img/2021/01/Practica_no_4_a_resolucion.webp"><img src="/assets/img/2021/01/Practica_no_4_a_resolucion.png" width="2500" height="4636" alt="Harmony exercise 4a: proposed four-part solution, bass in blue"/></picture></a></figure>
<h3 id="h-which-key-does-each-connection-belong-to">Which key does each connection belong to?</h3>
<p id="h-keys">Keys</p>
<ol><li>D major</li><li>B major or B minor</li><li>G minor</li><li>D major</li><li>A major</li><li>E major</li><li>D minor</li><li>F♯ minor</li><li>B♭ major</li><li>E minor</li><li>C♭ major</li><li>G♭ major</li><li>F minor</li><li>B♭ minor</li><li>G minor</li><li>E♭ minor</li><li>D major, although it cannot be confirmed with certainty</li><li>C major</li><li>G major, although it cannot be confirmed with certainty</li><li>G major, although it cannot be confirmed with certainty</li><li>D major, although it cannot be confirmed with certainty</li><li>G major, although it cannot be confirmed with certainty</li><li>D major</li><li>A major</li><li>A minor</li><li>F♯ minor</li><li>C minor</li><li>C major, although it cannot be confirmed with certainty</li><li>C major, although it cannot be confirmed with certainty</li><li>D major, although it cannot be confirmed with certainty</li></ol>
<p>Where the answer says “although it cannot be confirmed with certainty”, the two chords fit that key but also other keys, so the key cannot be fixed from this pair alone.</p>
<h3 id="h-audio-1">Audio</h3>
<figure><audio controls src="/assets/img/2021/01/Practica_no_4_a_resolucion.mp3"></audio></figure>
<h2 id="h-next-exercise">Next exercise</h2>
<p>To keep moving forward in your harmony studies, try the next exercise: <a href="/blog/practica-no-4-b/">Harmony exercise 4b</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a chord connection that keeps the common tone?</div>
      <div class="tm-faq-a">It means holding in the same voice the note (or notes) that two consecutive chords have in common, while the other voices move as little as possible.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which voice should hold the common tone?</div>
      <div class="tm-faq-a">The voice that already has it in the first chord. If the soprano has G in the first chord and G also belongs to the second chord, the soprano holds that G.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">When can you keep a common tone between two chords?</div>
      <div class="tm-faq-a">When the two chords share at least one note. In C major, I and IV share C, and I and V share G. Chords with nothing in common, such as IV and V, cannot be connected this way.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does it mean to name the key of a connection?</div>
      <div class="tm-faq-a">It means finding the major or minor key in which both chords make sense, by working out the functions (tonic, subdominant, dominant) they could have there. A single pair of chords often fits more than one key.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What mistakes should you avoid?</div>
      <div class="tm-faq-a">Moving the common tone instead of holding it, writing parallel fifths or octaves in the other voices, not resolving the leading tone, and crossing voices without a reason.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
