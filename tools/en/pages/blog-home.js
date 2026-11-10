const dictionaryPage = require('../dictionary-page');
// Post card: [href (Spanish path, rewritten by the build), title, text]
const card = ([href, title, text]) => `  <article class="tm-postlist-item">
    <h3><a href="${href}">${title}</a></h3>
    <p>${text}</p>
    <a class="tm-postlist-more" href="${href}">Read more →</a>
  </article>`;
const list = items => `<div class="tm-postlist">\n${items.map(card).join('\n')}\n</div>`;

const PRACTICAL = [
  ['/blog/como-leer-cifrado-de-acordes/', 'How to Read Chord Symbols',
    'What C, Am, G7 or Cmaj7 mean: the letters, major and minor, the seventh numbers, slash chords (C/G) and a summary table for decoding any lead sheet.'],
  ['/blog/como-calcular-intervalos-paso-a-paso/', 'How to Calculate Intervals Step by Step',
    'The two-step method, number and quality, for naming any interval, with a table of half steps and worked examples.'],
  ['/blog/trucos-memorizar-escalas-armaduras/', 'How to Memorize Scales and Key Signatures',
    'Five tricks for reading a key signature at a glance: the order of sharps and flats, finding the key instantly, and the circle of fifths as a cheat sheet.'],
];
const METRONOME = [
  ['/blog/como-usar-el-metronomo/', 'How to Practice With a Metronome',
    'The method for raising the tempo little by little, plus exercises on the staff (a scale with different rhythms and the subdivision pyramid) to gain accuracy and technique on any instrument.'],
];
const HARMONY = [
  ['/blog/armonia/', 'Harmony',
    'Step-by-step harmony exercises, from the most basic chord connections to more complex progressions, with audio and commented solutions.'],
  ['/blog/practica-no-4-a/', 'Harmony Exercise 4a: Common-Tone Chord Connections',
    'Connect the chords keeping the common tone in the same voice and name the key where possible. First exercise of the series, with audio and a commented solution.'],
  ['/blog/practica-no-4-b/', 'Harmony Exercise 4b: Chords Keeping the Common Tone',
    'The second common-tone exercise, with the same method, audio of the exercise and of the solution.'],
  ['/blog/practica-no-4-c/', 'Harmony Exercise 4c: Common-Tone Connections in Keys',
    'The third common-tone exercise, now with key signatures, audio and a commented solution.'],
  ['/blog/practica-no-5-a/', 'Harmony Exercise 5a: Connections Without Common Tone',
    'Chord connections where the bass moves by a 3rd or a 4th and the common tone is not kept, with audio and a commented solution.'],
  ['/blog/practica-no-5-b/', 'Harmony Exercise 5b: Chords Without Common Tone, Bass by 3rd or 4th',
    'More connections without keeping the common tone, in a progressive practice with reference audio and a commented solution.'],
];
const HISTORY = [
  ['/blog/himno-a-san-juan/', 'Hymn to St. John: Where Do Re Mi Comes From',
    'Where do, re, mi, fa, sol, la and si come from? The medieval hymn Ut queant laxis, Guido d’Arezzo and how ut became do.'],
];
const RESOURCES = [
  ['/blog/recursos-gratuitos-teoria-musical/', 'Free Resources for Studying Music Theory',
    'Open textbooks, public-domain scores and a notation program that are really free, with their language, level and limits: from Open Music Theory to IMSLP and MuseScore.'],
];

module.exports = dictionaryPage({
  path: '/en/blog/',
  esPath: '/blog/',
  title: 'Music Theory Blog: Articles and Curiosities',
  description: 'Articles on music theory and music history: chord symbols, intervals, key signatures, practicing with a metronome, harmony exercises and free resources.',
  h1: 'Blog',
  crumbs: [],
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
  body: `<p>This blog collects musical curiosities, both historical and theoretical, and articles that help with the parts of music theory that are hardest to grasp. It complements the <a href="/diccionario-musical/">music dictionary</a> and the <a href="/ejercicios/">interactive exercises</a>.</p>

<h2>Practical theory</h2>

${list(PRACTICAL)}

<h2>Practicing with a metronome</h2>

${list(METRONOME)}

<h2>Harmony</h2>

${list(HARMONY)}

<h2>History</h2>

${list(HISTORY)}

<h2>Free resources</h2>

${list(RESOURCES)}

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
  <div class="tm-faq-item">
    <div class="tm-faq-q">What topics does the Music Theory blog cover?</div>
    <div class="tm-faq-a">Historical and theoretical curiosities: the origin of the note names, chord symbols, intervals, key signatures, practice methods with the metronome, harmony exercises (connections with and without a common tone) and free resources that complement the interactive exercises on this site.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What level are the harmony exercises for?</div>
    <div class="tm-faq-a">They are aimed at early to intermediate conservatory students. They start with the most basic chord connections keeping a common tone and move on to connections without a common tone, suitable for students who already know triads and keys.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is a chord connection with a common tone?</div>
    <div class="tm-faq-a">It is the connection between two chords that share at least one note, which stays in the same voice without moving. The other voices move by step or by the smallest possible interval, which gives a smooth and natural connection.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">Do the harmony exercises include audio?</div>
    <div class="tm-faq-a">Yes. Each exercise includes audio of both the exercise and the solution, so you can hear the result and compare it before looking at the written solution.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is the Hymn to St. John and how does it relate to music theory?</div>
    <div class="tm-faq-a">It is a medieval Latin hymn whose words are traditionally attributed to Paul the Deacon, in the 8th century. Guido d’Arezzo used the first syllable of each line (ut, re, mi, fa, sol, la) to teach singers, and those syllables became the note names used in fixed-do countries today.</div>
  </div>
</div>
</div>
</div>
</section>
`,
});
